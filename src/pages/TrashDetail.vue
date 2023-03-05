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
import { NoteStatus } from '../helper/constants';

export default {
  name: 'TrashDetail',
  components: { Note },
  data() {
    return {
      status: NoteStatus.Deleted,
    };
  },
  computed: {
    note() {
      return this.$store.getters.getSingleDeletedNote(this.$route.params.id);
    },
  },
};
</script>
