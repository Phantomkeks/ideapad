<template>
  <q-page>
    <div class="q-pa-md">
      <q-input v-model="textAreaTitle" placeholder="Title" disable outlined autogrow type="textarea"/>
      <q-input v-model="textAreaInput" placeholder="Description" disable outlined autogrow type="textarea"/>
    </div>
  </q-page>
</template>

<style lang="stylus" scoped>
</style>

<script>
export default {
  name: 'TrashDetail',
  data () {
    return {
      note: {}
    }
  },
  created () {
    this.note = this.$store.getters.getSingleDeletedNote(this.$route.params.id)
  },
  methods: {
    commitChangesToStore (sNoteTitle, aNoteDetails) {
      this.note = {
        id: this.$route.params.id,
        title: sNoteTitle,
        details: aNoteDetails
      }
      // this.$store.commit({
      //   type: 'updateNote',
      //   oNote: this.note
      // })
    },
    transformTextToArray (sTextValue) {
      let aDetailTexts = sTextValue.split(/\r\n|\r|\n/)
      let aNoteDetails = []
      aDetailTexts.forEach(function (sText, iIndex) {
        aNoteDetails.push({ pos: iIndex, text: sText })
      })
      return aNoteDetails
    }
  },
  computed: {
    textAreaTitle: {
      get: function () {
        return this.note ? this.note.title : ''
      },
      set: function (sTextAreaTitle) {
        this.commitChangesToStore(sTextAreaTitle, this.transformTextToArray(this.textAreaInput))
      }
    },
    textAreaInput: {
      get: function () {
        let sTextAreaText = ''

        if (this.note) {
          let iLength = this.note.details.length
          this.note.details.forEach(function (oDetail, iIndex) {
            if (iIndex < iLength - 1) {
              sTextAreaText = sTextAreaText + oDetail.text + '\r\n'
            } else {
              sTextAreaText = sTextAreaText + oDetail.text
            }
          })
        }

        return sTextAreaText
      },
      set: function (sTextAreaValue) {
        this.commitChangesToStore(this.textAreaTitle, this.transformTextToArray(sTextAreaValue))
      }
    }
  }
}
</script>
