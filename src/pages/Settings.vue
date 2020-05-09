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
        <q-tab name="general" no-caps :label="$t('tab.general')" />
        <q-tab name="import" no-caps :label="$t('tab.import')" />
        <q-tab name="export" no-caps :label="$t('tab.export')" />
        <q-tab name="cloud" no-caps :label="$t('tab.cloud')" />
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

          <q-btn no-caps outline color="primary" class="q-mt-md full-width" :label="$t('button.deleteCSP')" @click="deleteCloudStorageProvider"/>
          <q-btn no-caps outline color="primary" class="q-mt-sm full-width" :label="$t('button.deleteAllSettings')" @click="deleteAllSettings"/>
          <q-btn no-caps outline color="primary" class="q-mt-sm full-width" :label="$t('button.resetApp')" @click="resetApplication"/>

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
                <label for="fileImport" class="btn">{{ $t('input.chooseSourceFile') }}</label>
                <input id="fileImport" style="visibility: hidden; display: none;" type="file" @change="onImportNotesClick"/>
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

          <q-btn outline no-caps color="primary" class="full-width" :label="$t('button.export')" @click="onExportNotesClick"/>
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
                  <q-btn outline no-caps color="primary" class="full-width" @click="cloudIntegrationStep = 2" :label="$t('button.continue')"/>
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
                  <q-btn outline no-caps color="primary" class="full-width" @click="cloudIntegrationStep = 3" :label="$t('button.continue')"/>
                  <q-btn outline no-caps color="primary" class="q-mt-sm full-width" @click="cloudIntegrationStep = 1" :label="$t('button.back')"/>
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
                  <q-btn flat no-caps color="primary" class="full-width" @click="cloudIntegrationStep = 1" icon="cloud" :label="$t('button.backToSelect')"/>
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
      handler: function (tab) {
        this.startTab = tab || 'general'
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onImportNotesClick (event) {
      if (event) {
        const file = event.target.files[0]
        this.filePath = event.target.files[0].name
        if (!file) {
          return
        }
        const fileReader = new FileReader()
        fileReader.onload = function (event) {
          const cryptoJS = window.CryptoJS
          const contents = event.target.result
          const decrypted = cryptoJS.AES.decrypt(contents, this.importPassphrase).toString(cryptoJS.enc.Utf8)
          this.$store.commit({
            type: 'overwriteNotes',
            notes: JSON.parse(decrypted)
          })
        }.bind(this)
        this.showLoadingIndicator = true

        const promise = new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve(fileReader.readAsText(file))
          }, 700)
        })

        promise.then(function () {
          this.showLoadingIndicator = false
          this.openAlertDialog()
        }.bind(this))
      }
    },
    onExportNotesClick () {
      const notes = this.$store.getters.getAllNotes
      const cryptoJS = window.CryptoJS

      let encrypted = cryptoJS.AES.encrypt(JSON.stringify(notes), this.exportPassphrase).toString()
      let encodedUri = encodeURI('data:application/json;charset=utf-8,' + encrypted)

      const link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', this.fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
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
        return this.languageOptions.find(function (languageOption) {
          return languageOption.value === this.settings.selectedLanguage
        }.bind(this))
      },
      set: function (locale) {
        import(`quasar/lang/${locale.value}`).then(({ default: messages }) => {
          this.$q.lang.set(messages)
        })
        import(`src/i18n/${locale.value}`).then(({ default: messages }) => {
          this.$i18n.locale = locale.value
          this.$i18n.setLocaleMessage(locale.value, messages)
        })

        this.$store.commit({
          type: 'updateSelectedLanguage',
          selectedLanguage: locale.value
        })
      }
    },
    importPassphrase: {
      get: function () {
        return this.settings ? this.settings.importPassphrase : ''
      },
      set: function (passphrase) {
        this.settings.importPassphrase = passphrase
        this.$store.commit({
          type: 'updateImportPassphrase',
          importPassphrase: passphrase
        })
      }
    },
    exportPassphrase: {
      get: function () {
        return this.settings ? this.settings.exportPassphrase : ''
      },
      set: function (passphrase) {
        this.settings.exportPassphrase = passphrase
        this.$store.commit({
          type: 'updateExportPassphrase',
          exportPassphrase: passphrase
        })
      }
    },
    cloudIntegrationStep: {
      get: function () {
        return this.settings ? this.settings.cloudIntegrationStep : 1
      },
      set: function (cloudIntegrationStep) {
        this.settings.cloudIntegrationStep = cloudIntegrationStep
        this.$store.commit({
          type: 'updateCloudIntegrationStep',
          cloudIntegrationStep: cloudIntegrationStep
        })
      }
    },
    dropboxAppId () {
      return this.settings ? 'https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=' + this.settings.dropboxAppId + '&redirect_uri=http://localhost:8080' : ''
    }
  }
}
</script>
