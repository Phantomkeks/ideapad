<template>
  <q-page>
    <NoteList v-bind:notes="notes" v-bind:status="status" />
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        text-color="white"
        class="add-button"
        @click="onAddNoteClick"
      />
    </q-page-sticky>
    <div
      class="fixed-center text-center"
      v-if="notes.length === 0"
      style="width: 10rem"
    >
      <q-img src="~assets/three_post_its_752x752.png" style="height: 10rem" />
    </div>
  </q-page>
</template>

<!--<style lang="scss" scoped>-->
/*// $ -> Needed to enable Quasar to load the variables from
quasar.variables.styl*/ /*.add-button {*/ /* headerGradient();*/ /*}*/
<!--</style>-->

<script>
// import NoteList from '../components/NoteList';
import { v4 as uuidv4 } from 'uuid';
import { NoteStatus } from '../helper/constants';
import { useNoteStore } from '../stores/note';

const noteStore = useNoteStore();

export default {
  name: 'NotesPage',
  // components: { NoteList },
  data() {
    return {
      status: NoteStatus.Created,
    };
  },
  computed: {
    notes: {
      get: function () {
        return noteStore.getAllNotes;
      },
      set: function (notes) {
        this.$store.commit({
          type: 'overwriteNotes',
          notes: notes,
        });
      },
    },
  },
  methods: {
    onAddNoteClick() {
      this.$router.push('/notes/detail/' + uuidv4());
    },
  },
};
</script>
