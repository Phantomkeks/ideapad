<template>
  <q-page padding>
    <q-card>
      <q-tabs
        v-model="startTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="import" label="Import" />
        <q-tab name="export" label="Export" />
        <q-tab name="cloud" label="Cloud" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="startTab" animated>
        <q-tab-panel name="import">
          <div class="text-h6">Import Notes</div>
          <q-input outlined v-model="importPassphrase" :type="isPasswordImport ? 'password' : 'text'" label="Passphrase for Decryption" class="q-my-sm">
            <template v-slot:append>
              <q-icon
                :name="isPasswordImport ? 'visibility_off' : 'visibility'"
                @click="isPasswordImport = !isPasswordImport"
              />
            </template>
          </q-input>

          <q-input outlined color="black" label="Select Source File" stack-label v-model="filePath" placeholder="Export" type="file" @change="onImportNotesClick"/>
        </q-tab-panel>

        <q-tab-panel name="export">
          <div class="text-h6">Export Notes</div>
          <q-input outlined v-model="exportPassphrase" :type="isPasswordExport ? 'password' : 'text'" label="Passphrase for Encryption" class="q-my-sm">
            <template v-slot:append>
              <q-icon
                :name="isPasswordExport ? 'visibility_off' : 'visibility'"
                @click="isPasswordExport = !isPasswordExport"
              />
            </template>
          </q-input>

          <q-btn outline label="Export" @click="onExportNotesClick"/>
        </q-tab-panel>

        <q-tab-panel name="cloud">
          <div class="text-h6">Cloud Storage Integration</div>
          <div class="q-pa-md">
            <q-stepper
              v-model="cloudIntegrationStep"
              vertical
              color="primary"
              animated
            >
              <q-step
                :name="1"
                title="Select"
                icon="cloud"
                :done="cloudIntegrationStep > 1"
              >
                Select the cloud storage provider which fits your needs the best to save your encrypted notes file.

                <q-list dense>
                  <q-item tag="label">
                    <q-item-section avatar>
                      <q-radio v-model="cloudProvider" val="dropbox" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Dropbox</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item tag="label" disabled>
                    <q-item-section avatar>
                      <q-radio v-model="cloudProvider" val="onedrive" disable/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>OneDrive</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item tag="label" disable>
                    <q-item-section avatar>
                      <q-radio v-model="cloudProvider" val="drive" disable/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Google Drive</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-stepper-navigation>
                  <q-btn @click="cloudIntegrationStep = 2" color="primary" label="Continue" />
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="2"
                title="Authenticate"
                icon="cloud"
                :done="cloudIntegrationStep > 2"
              >
                <p>Authenticate with Dropbox and allow Mini-Memo to store your notes in the cloud storage.</p>

                <a href="https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=zrsea953xfn7ytt&redirect_uri=http://localhost:8080">
                  Authenticate with Dropbox
                </a>

                <q-stepper-navigation>
                  <q-btn @click="cloudIntegrationStep = 3" color="primary" label="Continue" />
                  <q-btn flat @click="cloudIntegrationStep = 1" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="3"
                title="Synchronise"
                icon="create_new_folder"
                :done="cloudIntegrationStep > 3"
              >
                <p>Synchronise your current notes with Dropbox.</p>

                <Dropbox />

                <q-stepper-navigation>
                  <q-btn flat @click="cloudIntegrationStep = 1" color="primary" icon="cloud" label="Back To Select"/>
                </q-stepper-navigation>
              </q-step>
            </q-stepper>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <q-inner-loading :showing="showLoadingIndicator">
      <q-spinner-gears size="4rem" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<style lang="stylus" scoped>
</style>

<script>
import Dropbox from '../components/Dropbox'
export default {
  name: 'Settings',
  components: { Dropbox },
  data () {
    return {
      startTab: 'import',
      fileName: 'mini-memo.txt',
      cloudProvider: 'dropbox',
      settings: {},
      filePath: null,
      filePath2: '',
      isPasswordImport: true,
      isPasswordExport: true,
      showLoadingIndicator: false
    }
  },
  created () {
    this.settings = this.$store.getters.getSettings
  },
  watch: {
    '$route.params.tab': {
      handler: function (sTab) {
        if (sTab) {
          this.startTab = sTab
        } else {
          this.startTab = 'import'
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onImportNotesClick (oEvent) {
      if (oEvent) {
        let oFile = oEvent.target.files[0]
        if (!oFile) {
          return
        }
        let oFileReader = new FileReader()
        oFileReader.onload = function (oEvent) {
          const oCryptoJS = window.CryptoJS
          let oContents = oEvent.target.result
          let sDecrypted = oCryptoJS.AES.decrypt(oContents, this.importPassphrase).toString(oCryptoJS.enc.Utf8)
          this.$store.commit({
            type: 'overwriteNotes',
            notes: JSON.parse(sDecrypted)
          })
        }.bind(this)
        this.showLoadingIndicator = true

        let oPromise = new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve(oFileReader.readAsText(oFile))
          }, 700)
        })

        oPromise.then(function () {
          this.showLoadingIndicator = false
          this.openAlertDialog()
        }.bind(this))
      }
    },
    onExportNotesClick () {
      const aNotes = this.$store.getters.getAllNotes
      const oCryptoJS = window.CryptoJS

      let sEncrypted = oCryptoJS.AES.encrypt(JSON.stringify(aNotes), this.exportPassphrase).toString()
      let sEncodedUri = encodeURI('data:application/json;charset=utf-8,' + sEncrypted)

      let oLink = document.createElement('a')
      oLink.setAttribute('href', sEncodedUri)
      oLink.setAttribute('download', this.fileName)
      document.body.appendChild(oLink)
      oLink.click()
      document.body.removeChild(oLink)
    },
    openAlertDialog () {
      this.$q.dialog({
        title: 'Note Import',
        message: 'The note import was successful.'
      }).onOk(() => {
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    }
  },
  computed: {
    importPassphrase: {
      get: function () {
        return this.settings ? this.settings.importPassphrase : ''
      },
      set: function (sPassphrase) {
        this.settings.importPassphrase = sPassphrase
        this.$store.commit({
          type: 'updateImportPassphrase',
          importPassphrase: sPassphrase
        })
      }
    },
    exportPassphrase: {
      get: function () {
        return this.settings ? this.settings.exportPassphrase : ''
      },
      set: function (sPassphrase) {
        this.settings.exportPassphrase = sPassphrase
        this.$store.commit({
          type: 'updateExportPassphrase',
          exportPassphrase: sPassphrase
        })
      }
    },
    cloudIntegrationStep: {
      get: function () {
        return this.settings ? this.settings.cloudIntegrationStep : 1
      },
      set: function (iCloudIntegrationStep) {
        this.settings.cloudIntegrationStep = iCloudIntegrationStep
        this.$store.commit({
          type: 'updateCloudIntegrationStep',
          cloudIntegrationStep: iCloudIntegrationStep
        })
      }
    }
  }
}
</script>
