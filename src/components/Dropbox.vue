/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
<template>
  <div>
    <q-input outlined v-model="cloudPassphrase" :type="isPassword ? 'password' : 'text'" label="Passphrase">
      <template v-slot:append>
        <q-icon
          :name="isPassword ? 'visibility_off' : 'visibility'"
          @click="isPassword = !isPassword"
        />
      </template>
    </q-input>

    <q-btn @click="uploadFileToDropbox" color="primary" icon="cloud_upload" :label="$t('button.upload')" class="full-width q-my-sm" outline no-caps/>
    <q-btn @click="downloadFileFromDropbox" color="primary" icon="cloud_download" :label="$t('button.download')" class="full-width" outline no-caps/>

    <q-inner-loading :showing="showLoadingIndicator">
      <q-spinner-gears size="4rem" color="primary" />
    </q-inner-loading>
  </div>
</template>

<style lang="stylus" scoped>
</style>

<script>
import Dropbox from 'dropbox'
import Fetch from 'isomorphic-fetch'
export default {
  name: 'Dropbox',
  data () {
    return {
      filePath: '',
      fileName: 'ideapad.txt',
      dropboxToken: undefined,
      showLoadingIndicator: false,
      isPassword: true
    }
  },
  created () {
    this.settings = this.$store.getters.getSettings
    this.dropboxToken = this.$store.getters.getSettings.dropboxToken
  },
  computed: {
    cloudPassphrase: {
      get: function () {
        return this.settings ? this.settings.cloudPassphrase : ''
      },
      set: function (sPassphrase) {
        this.settings.cloudPassphrase = sPassphrase
        this.$store.commit({
          type: 'updateCloudPassphrase',
          cloudPassphrase: sPassphrase
        })
      }
    }
  },
  methods: {
    uploadFileToDropbox () {
      if (!this.dropboxToken) {
        this.openAlertDialog(this.$t('alertDialog.missingDropboxTokenTitle'), this.$t('alertDialog.missingDropboxTokenMessage'))
        return
      }

      const notes = this.$store.getters.getAllNotes
      const cryptoJS = window.CryptoJS
      const encrypted = cryptoJS.AES.encrypt(JSON.stringify(notes), this.cloudPassphrase).toString()

      const file = new File([encrypted], this.fileName, {
        type: 'text/plain'
      })

      if (!file) {
        return
      }

      this.loadingIndicator()
      let dbx = new Dropbox.Dropbox({ fetch: Fetch, accessToken: this.dropboxToken })

      dbx.filesUpload({ path: '/' + file.name, contents: file, mode: 'overwrite' })
        .then(function (response) {
          this.openAlertDialog(this.$t('alertDialog.cloudUploadSyncSuccessfulTitle'), this.$t('alertDialog.cloudUploadSyncSuccessfulMessage'))
        }.bind(this))
        .catch(function (error) {
          this.openAlertDialog(this.$t('alertDialog.cloudUploadSyncFailedTitle'), this.$t('alertDialog.cloudUploadSyncFailedMessage'))
          console.error(error)
        }.bind(this))
        .then(function () {
          // always executed
          this.loadingIndicator()
          this.filePath = ''
        }.bind(this))
    },
    downloadFileFromDropbox: function () {
      if (!this.dropboxToken) {
        this.openAlertDialog(this.$t('alertDialog.missingDropboxTokenTitle'), this.$t('alertDialog.missingDropboxTokenMessage'))
        return
      }

      this.loadingIndicator()
      let dbx = new Dropbox.Dropbox({ fetch: Fetch, accessToken: this.dropboxToken })

      dbx.filesDownload({ path: '/' + this.fileName })
        .then(function (response) {
          const cryptoJS = window.CryptoJS
          const blob = response.fileBlob
          const fileReader = new FileReader()

          fileReader.addEventListener('load', function () {
            const decrypted = cryptoJS.AES.decrypt(fileReader.result, this.cloudPassphrase).toString(cryptoJS.enc.Utf8)
            this.$store.commit({
              type: 'overwriteNotes',
              notes: JSON.parse(decrypted)
            })
          }.bind(this))

          fileReader.readAsText(blob)
          this.openAlertDialog(this.$t('alertDialog.cloudDownloadSyncSuccessfulTitle'), this.$t('alertDialog.cloudDownloadSyncSuccessfulMessage'))
        }.bind(this))
        .catch(function (error) {
          this.openAlertDialog(this.$t('alertDialog.cloudDownloadSyncFailedTitle'), this.$t('alertDialog.cloudDownloadSyncFailedMessage'))
          console.error(error)
        }.bind(this))
        .then(function () {
          // always executed
          this.loadingIndicator()
        }.bind(this))
    },
    loadingIndicator () {
      this.showLoadingIndicator = !this.showLoadingIndicator
    },
    openAlertDialog (title, message) {
      this.$q.dialog({
        title: title,
        message: message
      }).onOk(() => {
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    }
  }
}
</script>
