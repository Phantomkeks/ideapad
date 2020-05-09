<template>
  <q-page class="background">
    <Note v-model="componentNote"/>
  </q-page>
</template>

<style lang="stylus" scoped>
  .background
    background-color: white;
</style>

<script>
import Note from '../components/Note'
import { NoteStatus, NoteTypes } from '../helper/constants'

export default {
  name: 'NoteDetail',
  components: { Note },
  computed: {
    componentNote () {
      return { note: this.note, status: NoteStatus.Created }
    },
    note () {
      const note = this.$store.getters.getSingleNote(this.$route.params.id)
      if (!note) {
        return this.$noteHelper.noteConstructor(
          this.$route.params.id,
          false,
          NoteTypes.Default,
          null,
          null,
          '',
          []
        )
      }
      return note
    }
  }
}
</script>
