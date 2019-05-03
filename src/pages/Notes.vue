<template>
  <q-page>
    <q-list class="masonry">
      <draggable v-model="notes" @start="dragged=true" @end="dragged=false">
        <q-card @mousedown="startTouchEvent(note)" @mouseleave="stopTouchEvent" @mouseup="stopTouchEvent"
                @touchstart="startTouchEvent(note)" @touchend="stopTouchEvent" @touchcancel="stopTouchEvent"
                @click="onNoteClick(note)"
                :class="{highlight:note.highlighted}" class="note-card" bordered flat v-for="(note,id) in notes" v-bind:key="id">
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
      </draggable>
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
import draggable from 'vuedraggable'
export default {
  name: 'Notes',
  components: {
    draggable
  },
  data () {
    return {
      touchDuration: 300,
      timer: undefined,
      afterHighlightedTimer: undefined,
      afterHighlighted: false,
      dragged: false
    }
  },
  computed: {
    notes: {
      get: function () {
        return this.$store.getters.getAllNotes
      },
      set: function (aNotes) {
        this.$store.commit({
          type: 'overwriteNotes',
          notes: aNotes
        })
      }
    }
  },
  methods: {
    startTouchEvent (oNote) {
      this.timer = setTimeout(this.onLongTouch.bind(this, oNote), this.touchDuration)
    },
    stopTouchEvent () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    onLongTouch (oNote) {
      if (!this.dragged) {
        if (oNote.highlighted) {
          this.revertAfterHighlighted()
          this.afterHighlightedTimer = setTimeout(this.revertAfterHighlighted, this.touchDuration)
        }
        oNote.highlighted = !oNote.highlighted
      }
    },
    revertAfterHighlighted () {
      this.afterHighlighted = !this.afterHighlighted
    },
    onNoteClick (oNote) {
      if (!this.dragged && !oNote.highlighted && !this.afterHighlighted) {
        this.$router.push('/notes/detail/' + oNote.id)
      }
    },
    onAddNoteClick () {
      const uuidv1 = require('uuid/v1')
      this.$router.push('/notes/detail/' + uuidv1())
    }
  }
}
</script>
