<template>
  <q-page>
    <NoteList v-model="componentNotes"/>
    <div class="fixed-center text-center" v-if="deletedNotes.length === 0">
      <q-icon color="primary" size="5rem" name="delete"/>
    </div>
  </q-page>
</template>

<script>
import { NoteStatus } from '../helper/constants'
import NoteList from '../components/NoteList'

export default {
  name: 'Trash',
  components: { NoteList },
  created () {
    const MONTH_IN_SECONDS = 1000 * 60 * 60 * 24 * 30
    const oneMonthAgo = new Date(Date.now() - MONTH_IN_SECONDS)
    let overdueNoteIds = []

    this.deletedNotes.forEach(deletedNote => {
      const tmpDate = new Date(deletedNote.lastModified)

      if (tmpDate < oneMonthAgo) {
        overdueNoteIds.push(deletedNote.id)
      }
    })

    if (overdueNoteIds.length > 0) {
      this.$store.commit({
        type: 'deleteNotes',
        noteIds: overdueNoteIds
      })
    }
  },
  computed: {
    componentNotes () {
      return { notes: this.deletedNotes, status: NoteStatus.Deleted }
    },
    deletedNotes () {
      return this.$store.getters.getAllDeletedNotes
    }
  }
}
</script>
