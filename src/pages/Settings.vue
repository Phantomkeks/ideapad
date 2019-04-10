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
          <q-input outlined v-model="importPassphrase" :type="isPasswordImport ? 'password' : 'text'" label="Passphrase for Decryption">
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
          <q-input outlined v-model="exportPassphrase" :type="isPasswordExport ? 'password' : 'text'" label="Passphrase for Encryption">
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
              v-model="step"
              vertical
              color="primary"
              animated
            >
              <q-step
                :name="1"
                title="Select Cloud Storage Provider"
                icon="cloud"
                :done="step > 1"
              >
                Select the cloud storage provider which fits your needs the best to save your encrypted notes file.
                <ul>
                  <li>
                    <a href="https://www.dropbox.com/developers/documentation/javascript#tutorial">
                      Dropbox
                    </a>
                  </li>
                  <li>
                    <a href="https://developers.google.com/api-client-library/javascript/start/start-js">
                      Google Drive
                    </a>
                  </li>
                  <li>
                    <a href="https://docs.microsoft.com/en-us/onedrive/developer/controls/file-pickers/js-v72/?view=odsp-graph-online">
                      Mircosoft OneDrive
                    </a>
                  </li>
                </ul>
                <q-stepper-navigation>
                  <q-btn @click="step = 2" color="primary" label="Continue" />
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="2"
                title="Title"
                caption="Optional"
                icon="create_new_folder"
                :done="step > 2"
              >
                Todo add description here

                <q-stepper-navigation>
                  <q-btn @click="step = 4" color="primary" label="Continue" />
                  <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
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
  div
    padding: 0.5rem 0.25rem
    > .q-btn
      margin: 0.25rem
</style>

<script>
export default {
  name: 'Settings',
  data () {
    return {
      startTab: 'import',
      step: 1,
      settings: {},
      filePath: null,
      isPasswordImport: true,
      isPasswordExport: true,
      showLoadingIndicator: false
    }
  },
  created () {
    this.settings = this.$store.getters.getSettings
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
      oLink.setAttribute('download', 'notes.txt')
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
    },
    updateSettings () {
      this.$store.commit({
        type: 'updateSettings',
        oSettings: this.settings
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
        this.updateSettings()
      }
    },
    exportPassphrase: {
      get: function () {
        return this.settings ? this.settings.exportPassphrase : ''
      },
      set: function (sPassphrase) {
        this.settings.exportPassphrase = sPassphrase
        this.updateSettings()
      }
    }
  }
}
</script>
