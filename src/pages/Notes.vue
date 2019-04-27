<template>
  <q-page>
    <q-list class="masonry">
      <q-card v-touch:longtap="myFunction" class="note-card" bordered flat v-for="(note,id) in notes" v-bind:key="id" @click="onNoteClick(note.id)">
        <q-card-section v-if="note.title">
          <div class="text-h6">
            {{ note.title }}
          </div>
        </q-card-section>
        <q-card-section v-if="note.details.length > 0">
          <div v-for="(details,index) in note.details" v-bind:key="index">
            {{ details.text }}
          </div>
        </q-card-section>
      </q-card>
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" text-color="white" class="add-button" @click="onAddNoteClick"/>
    </q-page-sticky>

    <div class="fixed-center text-center" v-if="notes.length === 0" style="width: 10rem">
      <q-img src="assets/three_post_its_752x752.png" style="height: 10rem"/>
    </div>
  </q-page>
</template>

<style lang="stylus" scoped>
  @import '~quasar-variables'
  .note-card {
    break-inside avoid-column
    margin: 0 0 1rem;
    width: 100%;
  }
  .masonry {
    column-count: 2;
    column-gap: 0.5rem;
    padding: 0.5rem;
  }
  .add-button {
    headerGradient();
  }
</style>

<script>
export default {
  name: 'Notes',
  computed: {
    notes () {
      return this.$store.getters.getAllNotes
    }
  },
  methods: {
    myFunction (oEvent) {
      console.log(oEvent)
    },
    onNoteClick (sId) {
      this.$router.push('/notes/detail/' + sId)
    },
    onAddNoteClick () {
      const uuidv1 = require('uuid/v1')
      this.$router.push('/notes/detail/' + uuidv1())
    }
  }
}
</script>
