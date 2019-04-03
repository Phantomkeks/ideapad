<template>
  <q-page>
    <div class="q-pa-md">
      <q-input v-model="textAreaInput" v-bind:label="note.title" filled borderless type="textarea"/>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'NoteDetail',
  data () {
    return {
      note: ''
    }
  },
  created () {
    // let sNoteId = this.$route.params.id
    // let oNote = this.$store.notes.find(oNote => oNote.id === sNoteId) // JSON.parse(localStorage.getItem('notes'))
    this.note = this.$store.getters.getSingleNote(this.$route.params.id)
  },
  computed: {
    textAreaInput: {
      get: function () {
        let sTextAreaText = ''
        let iLength = this.note.details.length
        this.note.details.forEach(function (oDetail, iIndex) {
          if (iIndex < iLength - 1) {
            sTextAreaText = sTextAreaText + oDetail.text + '\r\n'
          } else {
            sTextAreaText = sTextAreaText + oDetail.text
          }
        })
        return sTextAreaText
      },
      set: function (sTextAreaValue) {
        // this.note.details.push({ pos: 5, text: sValue })

        let aDetailTexts = sTextAreaValue.split(/\r\n|\r|\n/)
        let aNoteDetails = []
        aDetailTexts.forEach(function (sText, iIndex) {
          aNoteDetails.push({ pos: iIndex, text: sText })
        })

        this.$store.commit({
          type: 'updateNoteDetails',
          sNoteId: this.$route.params.id,
          aNoteDetails: aNoteDetails
        })
      }
    }
  }
}
</script>
