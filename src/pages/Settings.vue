<template>
  <q-page padding>
    <q-input outlined color="black" label="Import Notes" stack-label v-model="filePath" placeholder="Export" type="file" @change="onImportNotesClick"/>

    <q-field outlined stack-label color="primary" label="Export Notes">
      <template v-slot:control>
        <q-btn outline label="Export" @click="onExportNotesClick"/>
      </template>
    </q-field>

    <q-inner-loading :showing="showLoadingIndicator">
      <q-spinner-gears size="4rem" color="primary" />
    </q-inner-loading>

<!--    <div class="q-pa-md">-->
<!--      <p>Add Cloud Storage to save encrypted File:</p>-->
<!--      <p>https://v1.quasar-framework.org/vue-components/stepper</p>-->
<!--      <q-stepper-->
<!--        v-model="step"-->
<!--        vertical-->
<!--        color="primary"-->
<!--        animated-->
<!--      >-->
<!--        <q-step-->
<!--          :name="1"-->
<!--          title="Select campaign settings"-->
<!--          icon="settings"-->
<!--          :done="step > 1"-->
<!--        >-->
<!--          For each ad campaign that you create, you can control how much you're willing to-->
<!--          spend on clicks and conversions, which networks and geographical locations you want-->
<!--          your ads to show on, and more.-->

<!--          <q-stepper-navigation>-->
<!--            <q-btn @click="step = 2" color="primary" label="Continue" />-->
<!--          </q-stepper-navigation>-->
<!--        </q-step>-->

<!--        <q-step-->
<!--          :name="2"-->
<!--          title="Create an ad group"-->
<!--          caption="Optional"-->
<!--          icon="create_new_folder"-->
<!--          :done="step > 2"-->
<!--        >-->
<!--          An ad group contains one or more ads which target a shared set of keywords.-->

<!--          <q-stepper-navigation>-->
<!--            <q-btn @click="step = 4" color="primary" label="Continue" />-->
<!--            <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />-->
<!--          </q-stepper-navigation>-->
<!--        </q-step>-->

<!--        <q-step-->
<!--          :name="3"-->
<!--          title="Ad template"-->
<!--          icon="assignment"-->
<!--          disable-->
<!--        >-->
<!--          This step won't show up because it is disabled.-->
<!--        </q-step>-->
<!--      </q-stepper>-->
<!--    </div>-->
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
      filePath: null,
      passphrase: 'Passphrase',
      showLoadingIndicator: false
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

      console.log(aNotes)
      let sEncrypted = oCryptoJS.AES.encrypt(JSON.stringify(aNotes), this.passphrase).toString()
      console.log(sEncrypted)

      let encodedUri = encodeURI('data:application/json;charset=utf-8,' + sEncrypted)

      let link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', 'notes.txt')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
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
  }
}
</script>
