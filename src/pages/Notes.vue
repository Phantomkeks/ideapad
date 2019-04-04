<template>
  <q-page>
    <q-list class="row">
      <q-card class="note-card" v-for="(note,id) in notes" v-bind:key="id" @click="onNoteClick(note.id)">
        <q-card-section>
          <div class="text-h6">
            {{ note.title }}
          </div>
        </q-card-section>
        <q-card-section>
          <div v-for="(details,index) in note.details" v-bind:key="index">
            {{ details.text }}
          </div>
        </q-card-section>
      </q-card>
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" text-color="white" class="add-button" @click="onAddNoteClick"/>
    </q-page-sticky>
  </q-page>
</template>

<style lang="stylus" scoped>
  @import '~quasar-variables'
  .note-card {
    width: 46%
    margin: 2%
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
