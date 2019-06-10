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
        <q-tab name="general" :label="$t('tab.general')" />
        <q-tab name="import" :label="$t('tab.import')" />
        <q-tab name="export" :label="$t('tab.export')" />
        <q-tab name="cloud" :label="$t('tab.cloud')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="startTab" animated infinite>
        <q-tab-panel name="general">
          <div class="text-h6">{{ $t('setting.title.general') }}</div>

          <q-select
            :label="$t('select.language')"
            :options="languageOptions"
            v-model="locale"
          />

          <div class="q-my-sm column justify-between">
            <q-btn no-caps :label="$t('button.deleteCSP')" class="q-my-sm" @click="deleteCloudStorageProvider"/>
            <q-btn no-caps :label="$t('button.deleteAllSettings')" class="q-my-sm" @click="deleteAllSettings"/>
            <q-btn no-caps :label="$t('button.resetApp')" class="q-mt-sm" @click="resetApplication"/>
          </div>

        </q-tab-panel>

        <q-tab-panel name="import">
          <div class="text-h6">{{ $t('setting.title.importNotes') }}</div>
          <q-input outlined v-model="importPassphrase" :type="isPasswordImport ? 'password' : 'text'" :label="$t('input.importPassphrase')" class="q-my-sm">
            <template v-slot:append>
              <q-icon
                :name="isPasswordImport ? 'visibility_off' : 'visibility'"
                @click="isPasswordImport = !isPasswordImport"
              />
            </template>
          </q-input>

          <q-field outlined :label="$t('input.selectSourceFile')" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                <label for="files" class="btn">{{ $t('input.chooseSourceFile') }}</label>
                <input id="files" style="visibility: hidden; display: none;" type="file" @change="onImportNotesClick"/>
                <label class="q-ml-md">{{ filePath != null ? filePath : $t('placeholder.noFileChosen') }}</label>
              </div>
            </template>
          </q-field>
        </q-tab-panel>

        <q-tab-panel name="export">
          <div class="text-h6">{{ $t('setting.title.exportNotes') }}</div>
          <q-input outlined v-model="exportPassphrase" :type="isPasswordExport ? 'password' : 'text'" :label="$t('input.exportPassphrase')" class="q-my-sm">
            <template v-slot:append>
              <q-icon
                :name="isPasswordExport ? 'visibility_off' : 'visibility'"
                @click="isPasswordExport = !isPasswordExport"
              />
            </template>
          </q-input>

          <q-btn outline no-caps color="primary" :label="$t('button.export')" @click="onExportNotesClick" class="buttonSize"/>
        </q-tab-panel>

        <q-tab-panel name="cloud">
          <div class="text-h6">{{ $t('setting.title.cloudStorageIntegration') }}</div>
          <div class="q-pa-md">
            <q-stepper
              v-model="cloudIntegrationStep"
              vertical
              color="primary"
              animated
            >
              <q-step
                :name="1"
                :title="$t('step.select.title')"
                icon="cloud"
                :done="cloudIntegrationStep > 1"
              >
                <p>{{ $t('step.select.description') }}</p>

                <q-list dense>
                  <q-item tag="label">
                    <q-item-section avatar>
                      <q-radio v-model="cloudProvider" val="dropbox" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ $t('name.dropbox') }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item tag="label" disable>
                    <q-item-section avatar>
                      <q-radio v-model="cloudProvider" val="drive" disable/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ $t('name.googleDrive') }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-stepper-navigation>
                  <q-btn @click="cloudIntegrationStep = 2" color="primary" :label="$t('button.continue')" outline no-caps/>
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="2"
                :title="$t('step.authenticate.title')"
                icon="cloud"
                :done="cloudIntegrationStep > 2"
              >
                <p>{{ $t('step.authenticate.description') }}</p>

                <a v-bind:href="dropboxAppId">
                  {{ $t('link.dropboxAuth') }}
                </a>

                <q-stepper-navigation>
                  <q-btn @click="cloudIntegrationStep = 3" color="primary" :label="$t('button.continue')" outline no-caps/>
                  <q-btn @click="cloudIntegrationStep = 1" color="primary" :label="$t('button.back')" class="q-ml-sm" flat no-caps/>
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="3"
                :title="$t('step.synchronise.title')"
                icon="create_new_folder"
                :done="cloudIntegrationStep > 3"
              >
                <p>{{ $t('step.synchronise.description') }}</p>

                <Dropbox />

                <q-stepper-navigation>
                  <q-btn flat no-caps @click="cloudIntegrationStep = 1" color="primary" icon="cloud" :label="$t('button.backToSelect')"/>
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
      startTab: undefined,
      fileName: 'ideapad.txt',
      cloudProvider: 'dropbox',
      settings: {},
      filePath: null,
      isPasswordImport: true,
      isPasswordExport: true,
      showLoadingIndicator: false,
      languageOptions: [
        { label: this.$t('languageLabel.enUs'), value: 'en-us' },
        { label: this.$t('languageLabel.de'), value: 'de' }
      ]
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
          this.startTab = 'general'
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
        this.filePath = oEvent.target.files[0].name
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
        title: this.$t('alertDialog.noteImportSuccessfulTitle'),
        message: this.$t('alertDialog.noteImportSuccessfulMessage')
      }).onOk(() => {
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    deleteCloudStorageProvider () {
      this.$q.dialog({
        title: this.$t('confirmDialog.deleteCloudStorageProviderTitle'),
        message: this.$t('confirmDialog.deleteCloudStorageProviderMessage'),
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.commit({
          type: 'resetCloudSettings'
        })
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    deleteAllSettings () {
      this.$q.dialog({
        title: this.$t('confirmDialog.deleteAllSettingsTitle'),
        message: this.$t('confirmDialog.deleteAllSettingsMessage'),
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.commit({
          type: 'resetSettings'
        })

        this.locale = { value: 'en-us' }
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    resetApplication () {
      this.$q.dialog({
        title: this.$t('confirmDialog.resetApplicationTitle'),
        message: this.$t('confirmDialog.resetApplicationMessage'),
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.commit({
          type: 'resetSettings'
        })

        this.$store.commit({
          type: 'clearNoteState'
        })

        this.locale = { value: 'en-us' }
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    }
  },
  computed: {
    locale: {
      get: function () {
        return this.languageOptions.find(function (oLanguageOption) {
          return oLanguageOption.value === this.$q.lang.isoName
        }.bind(this))
      },
      set: function (oLocale) {
        import(`quasar/lang/${oLocale.value}`).then(({ default: messages }) => {
          this.$q.lang.set(messages)
        })
        import(`src/i18n/${oLocale.value}`).then(({ default: messages }) => {
          this.$i18n.locale = oLocale.value
          this.$i18n.setLocaleMessage(oLocale.value, messages)
        })
      }
    },
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
    },
    dropboxAppId () {
      return this.settings ? 'https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=' + this.settings.dropboxAppId + '&redirect_uri=http://localhost:8080' : ''
    }
  }
}
</script>
