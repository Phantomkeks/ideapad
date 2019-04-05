<template>
  <q-page>
    <div class="q-pa-md">
      <q-input v-model="textAreaTitle" placeholder="Title" disable outlined autogrow type="textarea"/>
      <div class="textAreaInput">
        <q-input v-model="textAreaInput" placeholder="Description" disable outlined autogrow type="textarea"/>
      </div>
    </div>
  </q-page>
</template>

<style lang="stylus" scoped>
  .textAreaInput
    margin-top: 1rem
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
  computed: {
    textAreaTitle () {
      return this.note ? this.note.title : ''
    },
    textAreaInput () {
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
    }
  }
}
</script>
