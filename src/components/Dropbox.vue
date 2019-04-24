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

    <q-btn @click="uploadFileToDropbox" icon="cloud_upload" color="primary" class="q-my-sm" label="Up"/>
    <q-btn @click="downloadFileFromDropbox" icon="cloud_download" color="primary" class="q-my-sm q-ml-sm" label="Down"/>

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
      fileName: 'mini-memo.txt',
      dropboxToken: undefined,
      dropboxAppId: 'zrsea953xfn7ytt',
      showLoadingIndicator: false,
      isPassword: true
    }
  },
  created () {
    this.dropboxToken = this.settings = this.$store.getters.getSettings.dropboxToken
    this.settings = this.$store.getters.getSettings
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
        this._openAlertDialog('Missing Dropbox Token', 'You need to authenticate with Dropbox first.')
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

      this._loadingIndicator()
      let dbx = new Dropbox.Dropbox({ fetch: Fetch, accessToken: this.dropboxToken })

      dbx.filesUpload({ path: '/' + oFile.name, contents: oFile, mode: 'overwrite' })
        .then(function (oResponse) {
          this._openAlertDialog('Cloud Upload Sync', 'Cloud synchronisation was successfully.')
        }.bind(this))
        .catch(function (oError) {
          this._openAlertDialog('Cloud Upload Sync Failed', 'Unable to synchronise or find a notes file. Please try it again or contact your system administrator.')
          console.log(oError)
        }.bind(this))
        .then(function () {
          // always executed
          this._loadingIndicator()
          this.filePath = ''
        }.bind(this))
    },
    downloadFileFromDropbox: function () {
      if (!this.dropboxToken) {
        this._openAlertDialog('Missing Dropbox Token', 'You need to authenticate with Dropbox first.')
        return
      }

      this._loadingIndicator()
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

          this._openAlertDialog('Cloud Download Sync', 'Cloud synchronisation was successfully.')
        }.bind(this))
        .catch(function (oError) {
          this._openAlertDialog('Cloud Sync Download Failed', 'Unable to synchronise or find a notes file. Please try it again or contact your system administrator.')
          console.log(oError)
        }.bind(this))
        .then(function () {
          // always executed
          this._loadingIndicator()
        }.bind(this))
    },
    _loadingIndicator () {
      this.showLoadingIndicator = !this.showLoadingIndicator
    },
    _openAlertDialog (sTitle, sMessage) {
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
