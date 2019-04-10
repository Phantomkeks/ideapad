<template>
  <div>
    <div class="text-h6">Dropbox</div>
    <q-btn @click="chooseDropbox">Choose Dropbox</q-btn>
    <q-input outlined color="black" label="Select Source File" v-model="filePath" stack-label placeholder="Export" type="file" @change="uploadFileToDropbox"/>
    <q-btn @click="downloadFileFromDropbox">Download From Dropbox</q-btn>
    <a href="https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=zrsea953xfn7ytt&redirect_uri=http://localhost:8080">Auth Dropbox</a>
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
      dropboxAppId: 'zrsea953xfn7ytt'
    }
  },
  created () {
    this.dropboxToken = this.settings = this.$store.getters.getSettings.dropboxToken
  },
  methods: {
    chooseDropbox () {
      let dbx = new Dropbox.Dropbox({ fetch: Fetch, accessToken: this.dropboxToken })
      dbx.filesListFolder({ path: '' })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    uploadFileToDropbox (oEvent) {
      let sDropboxToken = this.dropboxToken
      let oFile = oEvent.target.files[0]

      if (!oFile) {
        return
      }

      var xhr = new XMLHttpRequest()

      xhr.upload.onprogress = function (evt) {
        let percentComplete = parseInt(100.0 * evt.loaded / evt.total)
        console.log(percentComplete)
      }

      xhr.onload = function () {
        if (xhr.status === 200) {
          let fileInfo = JSON.parse(xhr.response)
          console.log(fileInfo)
        } else {
          let errorMessage = xhr.response || 'Unable to upload file'
          console.log(errorMessage)
        }
      }

      xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload')
      xhr.setRequestHeader('Authorization', 'Bearer ' + sDropboxToken)
      xhr.setRequestHeader('Content-Type', 'application/octet-stream')
      xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
        path: '/' + oFile.name,
        mode: 'add',
        autorename: true,
        mute: false
      }))

      xhr.send(oFile)
    },
    downloadFileFromDropbox: function (oEvent, oFile) {
      let sDropboxToken = this.dropboxToken
      oEvent.preventDefault()
      let xhr = new XMLHttpRequest()
      xhr.responseType = 'arraybuffer'

      xhr.onload = function () {
        if (xhr.status === 200) {
          var blob = new Blob([xhr.response], { type: 'application/octet-stream' })
          FileSaver.saveAs(blob, oFile.name, true)
        } else {
          let errorMessage = xhr.response || 'Unable to download file'
          console.log(errorMessage)
        }
      }

      xhr.open('POST', 'https://content.dropboxapi.com/2/files/download')
      xhr.setRequestHeader('Authorization', 'Bearer ' + sDropboxToken)
      xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
        path: oFile.path_lower
      }))
      xhr.send()
    }
  }
}
</script>
