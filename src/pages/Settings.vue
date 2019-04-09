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
          <q-input outlined color="black" label="Select Source File" stack-label v-model="filePath" placeholder="Export" type="file" @change="onImportNotesClick"/>
        </q-tab-panel>

        <q-tab-panel name="export">
          <div class="text-h6">Export Notes</div>
          <q-input outlined v-model="passphrase" :type="isPwd ? 'password' : 'text'" label="Passphrase for Encryption">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-btn outline label="Export" @click="onExportNotesClick"/>
        </q-tab-panel>

        <q-tab-panel name="cloud">
          <div class="text-h6">Cloud Storage Integration</div>
          <div class="q-pa-md">
                  <p>Add Cloud Storage to save encrypted File:</p>
                  <p>https://v1.quasar-framework.org/vue-components/stepper</p>
                  <q-stepper
                    v-model="step"
                    vertical
                    color="primary"
                    animated
                  >
                    <q-step
                      :name="1"
                      title="Select campaign settings"
                      icon="settings"
                      :done="step > 1"
                    >
                      For each ad campaign that you create, you can control how much you're willing to
                      spend on clicks and conversions, which networks and geographical locations you want
                      your ads to show on, and more.

                      <q-stepper-navigation>
                        <q-btn @click="step = 2" color="primary" label="Continue" />
                      </q-stepper-navigation>
                    </q-step>

                    <q-step
                      :name="2"
                      title="Create an ad group"
                      caption="Optional"
                      icon="create_new_folder"
                      :done="step > 2"
                    >
                      An ad group contains one or more ads which target a shared set of keywords.

                      <q-stepper-navigation>
                        <q-btn @click="step = 4" color="primary" label="Continue" />
                        <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                      </q-stepper-navigation>
                    </q-step>

                    <q-step
                      :name="3"
                      title="Ad template"
                      icon="assignment"
                      disable
                    >
                      This step won't show up because it is disabled.
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
      step: 0,
      settings: {},
      filePath: null,
      isPwd: true,
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
          let sDecrypted = oCryptoJS.AES.decrypt(oContents, this.passphrase).toString(oCryptoJS.enc.Utf8)
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

      let sEncrypted = oCryptoJS.AES.encrypt(JSON.stringify(aNotes), this.passphrase).toString()
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
    }
  },
  computed: {
    passphrase: {
      get: function () {
        return this.settings ? this.settings.exportPassphrase : ''
      },
      set: function (sPassphrase) {
        this.settings.exportPassphrase = sPassphrase

        this.$store.commit({
          type: 'updateSettings',
          oSettings: this.settings
        })
      }
    }
  }
}
</script>
