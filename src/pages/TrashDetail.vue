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
import { NoteStatus } from '../helper/constants'

export default {
  name: 'TrashDetail',
  components: { Note },
  computed: {
    componentNote () {
      return { note: this.note, status: NoteStatus.Deleted }
    },
    note () {
      return this.$store.getters.getSingleDeletedNote(this.$route.params.id)
    }
  }
}
</script>
