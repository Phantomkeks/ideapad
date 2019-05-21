<template>
  <q-page>
    <q-list class="masonry">
        <q-card @mousedown="startTouchEvent(note)" @mouseleave="stopTouchEvent" @mouseup="stopTouchEvent"
                @touchstart="startTouchEvent(note)" @touchend="stopTouchEvent" @touchcancel="stopTouchEvent"
                @click="onNoteClick(note)"
                :class="{highlight:note.highlighted}" class="note-card" disabled bordered flat v-for="(note,id) in deletedNotes" v-bind:key="id">
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
      <q-icon color="primary" size="5rem" name="delete"/>
    </div>
  </q-page>
</template>

<style lang="stylus" scoped>
  @import '~quasar-variables'
  .note-card {
    break-inside avoid-column
    margin: 0 0 1rem;
    width: 100%;
    transition: border 0.2s ease-in-out;
  }
  .masonry {
    column-count: 2;
    column-gap: 0.5rem;
    padding: 0.5rem;
  }
  .add-button {
    headerGradient();
  }
  .highlight {
    border: 2px solid $primary;
  }
</style>

<script>
export default {
  name: 'Trash',
  data () {
    return {
      touchDuration: 100,
      longTouchDuration: 300,
      timer: undefined,
      afterHighlightedTimer: undefined,
      afterHighlighted: false
    }
  },
  computed: {
    deletedNotes () {
      return this.$store.getters.getAllDeletedNotes
    }
  },
  methods: {
    onNoteClick (oNote) {
      if (!oNote.highlighted && !this.afterHighlighted) {
        this.$router.push('/deletedNotes/detail/' + oNote.id)
      }
    },
    startTouchEvent (oNote) {
      this.timer = setTimeout(this.onLongTouch.bind(this, oNote), this.touchDuration)
    },
    stopTouchEvent () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    onLongTouch (oNote) {
      if (oNote.highlighted) {
        this.revertAfterHighlighted()
        this.afterHighlightedTimer = setTimeout(this.revertAfterHighlighted, this.longTouchDuration)
      }
      oNote.highlighted = !oNote.highlighted
    },
    revertAfterHighlighted () {
      this.afterHighlighted = !this.afterHighlighted
    }
  }
}
</script>
