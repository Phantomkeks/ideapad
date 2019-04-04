<template>
  <q-page>
    <q-list class="row">
      <q-card class="note-card" v-for="(note,id) in deletedNotes" v-bind:key="id" @click="onNoteClick(note.id)">
        <q-card-section>
          <div class="text-h6">
            {{ note.title }}
          </div>
        </q-card-section>
        <q-card-section>
          <div v-for="(details,pos) in note.details" v-bind:key="pos">
            {{ details.text }}
          </div>
        </q-card-section>
      </q-card>
    </q-list>
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
