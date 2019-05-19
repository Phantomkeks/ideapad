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

      const aNotes = this.$store.getters.getAllNotes
      const oCryptoJS = window.CryptoJS
      const sEncrypted = oCryptoJS.AES.encrypt(JSON.stringify(aNotes), this.cloudPassphrase).toString()

      let oFile = new File([sEncrypted], this.fileName, {
        type: 'text/plain'
      })

      if (!oFile) {
        return
      }

      this.loadingIndicator()
      let dbx = new Dropbox.Dropbox({ fetch: Fetch, accessToken: this.dropboxToken })

      dbx.filesUpload({ path: '/' + oFile.name, contents: oFile, mode: 'overwrite' })
        .then(function (oResponse) {
          this.openAlertDialog(this.$t('alertDialog.cloudUploadSyncSuccessfulTitle'), this.$t('alertDialog.cloudUploadSyncSuccessfulMessage'))
        }.bind(this))
        .catch(function (oError) {
          this.openAlertDialog(this.$t('alertDialog.cloudUploadSyncFailedTitle'), this.$t('alertDialog.cloudUploadSyncFailedMessage'))
          console.log(oError)
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
        .then(function (oResponse) {
          const oCryptoJS = window.CryptoJS
          let oBlob = oResponse.fileBlob
          let oFileReader = new FileReader()

          oFileReader.addEventListener('load', function () {
            let sDecrypted = oCryptoJS.AES.decrypt(oFileReader.result, this.cloudPassphrase).toString(oCryptoJS.enc.Utf8)

            this.$store.commit({
              type: 'overwriteNotes',
              notes: JSON.parse(sDecrypted)
            })
          }.bind(this))

          oFileReader.readAsText(oBlob)

          this.openAlertDialog(this.$t('alertDialog.cloudDownloadSyncSuccessfulTitle'), this.$t('alertDialog.cloudDownloadSyncSuccessfulMessage'))
        }.bind(this))
        .catch(function (oError) {
          this.openAlertDialog(this.$t('alertDialog.cloudDownloadSyncFailedTitle'), this.$t('alertDialog.cloudDownloadSyncFailedMessage'))
          console.log(oError)
        }.bind(this))
        .then(function () {
          // always executed
          this.loadingIndicator()
        }.bind(this))
    },
    loadingIndicator () {
      this.showLoadingIndicator = !this.showLoadingIndicator
    },
    openAlertDialog (sTitle, sMessage) {
      this.$q.dialog({
        title: sTitle,
        message: sMessage
      }).onOk(() => {
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    }
  }
}
</script>
