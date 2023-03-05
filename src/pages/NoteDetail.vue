<template>
  <q-page class="background">
    <Note v-bind:componentNote="note" v-bind:status="status" />
  </q-page>
</template>

<style lang="scss" scoped>
.background
  background-color: white;
</style>

<script>
import Note from '../components/Note';
import NoteHelper from '../helper/NoteHelper';
import { NoteStatus, NoteTypes } from '../helper/constants';

export default {
  name: 'NoteDetail',
  components: { Note },
  data() {
    return {
      status: NoteStatus.Created,
    };
  },
  computed: {
    note() {
      const note = this.$store.getters.getSingleNote(this.$route.params.id);
      if (!note) {
        return NoteHelper.noteConstructor(
          this.$route.params.id,
          false,
          NoteTypes.Default,
          null,
          null,
          '',
          []
        );
      }
      return note;
    },
  },
};
</script>
