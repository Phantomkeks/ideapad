<template>
  <q-page>
    <q-list class="masonry">
      <q-card disabled class="note-card" bordered flat v-for="(note,id) in deletedNotes" v-bind:key="id" @click="onNoteClick(note.id)">
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

    <div class="fixed-center text-center" v-if="deletedNotes.length === 0">
      <q-icon size="5rem" name="delete"/>
    </div>
  </q-page>
</template>

<style lang="stylus" scoped>
  @import '~quasar-variables'
  .note-card {
    display: inline-block;
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
  name: 'Trash',
  computed: {
    deletedNotes () {
      return this.$store.getters.getAllDeletedNotes
    }
  },
  methods: {
    onNoteClick (sId) {
      this.$router.push('/deletedNotes/detail/' + sId)
    }
  }
}
</script>
