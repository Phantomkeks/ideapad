<template>
  <q-page>
    <NoteList v-bind:notes="notes" v-bind:status="status"/>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <q-btn fab icon="add" text-color="white" class="add-button" @click="onAddNoteClick"/>
    </q-page-sticky>
    <div class="fixed-center text-center" v-if="notes.length === 0" style="width: 10rem">
      <q-img src="assets/three_post_its_752x752.png" style="height: 10rem"/>
    </div>
  </q-page>
</template>

<style lang="stylus" scoped>
  .add-button {
    headerGradient();
  }

  //  Needed to enable Quasar to use the variables from quasar.variables.styl
  .highlight {
    border: 2px solid $primary;
  }
</style>

<script>
import NoteList from '../components/NoteList'
import { v4 as uuidv4 } from 'uuid'
import { NoteStatus } from '../helper/constants'

export default {
  name: 'Notes',
  components: { NoteList },
  data () {
    return {
      status: NoteStatus.Created
    }
  },
  computed: {
    notes: {
      get: function () {
        return this.$store.getters.getAllNotes
      },
      set: function (notes) {
        this.$store.commit({
          type: 'overwriteNotes',
          notes: notes
        })
      }
    }
  },
  methods: {
    onAddNoteClick () {
      this.$router.push('/notes/detail/' + uuidv4())
    }
  }
}
</script>
