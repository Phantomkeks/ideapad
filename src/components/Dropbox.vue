<template>
  <div>
    <div class="text-h6">Dropbox</div>
    <q-btn @click="chooseDropbox">Choose Dropbox</q-btn>
    <q-input outlined color="black" label="Select Source File" v-model="filePath" stack-label placeholder="Export" type="file" @change="uploadFileToDropbox"/>
    <q-btn @click="downloadFileFromDropbox">Download From Dropbox</q-btn>
    <a href="https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=zrsea953xfn7ytt&redirect_uri=http://localhost:8080">Auth Dropbox</a>

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
import FileSaver from 'file-saver'
export default {
  name: 'Dropbox',
  data () {
    return {
      filePath: '',
      dropboxToken: '',
      dropboxAppId: 'zrsea953xfn7ytt',
      showLoadingIndicator: false
    }
  },
  created () {
    this.dropboxToken = this.settings = this.$store.getters.getSettings.dropboxToken
  },
  methods: {
    chooseDropbox () {
      let dbx = new Dropbox.Dropbox({ fetch: Fetch, accessToken: this.dropboxToken })
      dbx.filesListFolder({ path: '' })
        .then(function (oResponse) {
          console.log(oResponse)
        })
        .catch(function (oError) {
          console.log(oError)
        })
    },
    uploadFileToDropbox (oEvent) {
      let oFile = oEvent.target.files[0]

      if (!oFile) {
        return
      }

      this._loadingIndicator()
      let dbx = new Dropbox.Dropbox({ fetch: Fetch, accessToken: this.dropboxToken })

      dbx.filesUpload({ path: '/' + oFile.name, contents: oFile, mode: 'overwrite' })
        .then(function (oResponse) {
          this._openAlertDialog('File Upload Successful', 'Your file was successfully uploaded.')
          console.log(oResponse)
        }.bind(this))
        .catch(function (oError) {
          this._openAlertDialog('File Upload Failed', 'Unable to upload file. Please try it again or contact your system administrator.')
          console.log(oError)
        }.bind(this))
        .then(function () {
          // always executed
          this._loadingIndicator()
        }.bind(this))
    },
    downloadFileFromDropbox: function () {
      this._loadingIndicator()
      let dbx = new Dropbox.Dropbox({ fetch: Fetch, accessToken: this.dropboxToken })

      dbx.filesDownload({ path: '/Test.txt' })
        .then(function (oResponse) {
          this._openAlertDialog('File Download Successful', 'Your file was successfully downloaded.')
          FileSaver.saveAs(oResponse.fileBlob, oResponse.name, true)
        }.bind(this))
        .catch(function (oError) {
          this._openAlertDialog('File Download Failed', 'Unable to download file. Please try it again or contact your system administrator.')
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
