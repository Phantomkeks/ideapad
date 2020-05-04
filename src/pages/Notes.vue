<template>
  <q-pull-to-refresh :disable="true">
<!--  <q-pull-to-refresh :disable="dragged">-->
    <q-page>
      <q-list class="masonry">
        <draggable :disabled="!!noteSelected" v-model="notes" @start="onStart" @end="onEnd" :options="{delay:50, supportPointer: false}">
          <q-card @mousedown="startTouchEvent(note)" @mouseleave="stopTouchEvent" @mouseup="stopTouchEvent"
                  @touchstart="startTouchEvent(note)" @touchend="stopTouchEvent" @touchcancel="stopTouchEvent"
                  @click="onNoteClick(note)"
                  :class="{highlight:note.highlighted}" class="note-card" bordered flat v-for="(note,id) in notes" v-bind:key="id">
            <q-card-section v-if="note.title">
              <div class="text-h6">
                {{ note.title }}
              </div>
            </q-card-section>

            <q-card-section v-if="note.details.length > 0 && note.type === noteTypes.Default">
              <div v-for="(detail,index) in note.details" v-bind:key="index">
                <div v-if="index < 7">
                  {{ detail.text }}
                </div>

                <div v-if="index == 7">
                  <p>{{ $t('placeholder.dots') }}</p>
                </div>
              </div>
            </q-card-section>

            <q-card-section v-if="note.details.length > 0 && note.type === noteTypes.Checkbox">
              <div v-for="(detail,index) in note.details" v-bind:key="index">
                <div class="row items-start" v-if="index < 3">
                  <q-checkbox disable color="primary" v-model="detail.ticked"/>
                  <q-item-label class="col label" :class="{lineThrough:detail.ticked}" :lines="5">
                    {{ detail.text }}
                  </q-item-label>
                </div>

                <div class="dots" v-if="index == 3">
                  <p>{{ $t('placeholder.dots') }}</p>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </draggable>
      </q-list>

<!--      <q-page-sticky position="bottom" :offset="[18, 18]">-->
<!--        <q-btn fab icon="add" text-color="white" class="add-button" @click="onAddNoteClick"/>-->
<!--      </q-page-sticky>-->

      <div class="fixed-center text-center" v-if="notes.length === 0" style="width: 10rem">
        <q-img src="assets/three_post_its_752x752.png" style="height: 10rem"/>
      </div>
    </q-page>
  </q-pull-to-refresh>
</template>

<style lang="stylus" scoped>
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
  .lineThrough {
    text-decoration: line-through;
    text-decoration-color: $primary;
  }
  .label {
    padding-top: 10px;
  }
  .dots {
    padding-left: 11px;
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
      touchDuration: 250,
      longTouchDuration: 400,
      afterScrollingDuration: 1000,
      timer: undefined,
      afterHighlightedTimer: undefined,
      afterHighlighted: false,
      scrolling: false,
      scrollingEndTimer: undefined,
      dragged: false,
      noteTypes: this.$noteTypes,
      sortable: undefined
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScrolling)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScrolling)
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
    },
    noteSelected () {
      return this.notes.find(function (oNote) {
        return oNote.highlighted === true
      })
    }
  },
  methods: {
    handleScrolling () {
      if (this.scrolling) {
        return
      }

      this.scrolling = true
      this.sortable.disabled = true

      this.scrollingEndTimer = setTimeout(function () {
        this.scrolling = false
        this.sortable.disabled = false
      }.bind(this), this.afterScrollingDuration)
    },
    startTouchEvent (oNote) {
      if (!this.scrolling) {
        this.timer = setTimeout(this.onLongTouch.bind(this, oNote), this.touchDuration)
      }
    },
    stopTouchEvent () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    onLongTouch (oNote) {
      if (!this.dragged && !this.scrolling) {
        if (oNote.highlighted) {
          this.revertAfterHighlighted()
          this.afterHighlightedTimer = setTimeout(this.revertAfterHighlighted, this.longTouchDuration)
        }
        oNote.highlighted = !oNote.highlighted
      }
    },
    revertAfterHighlighted () {
      this.afterHighlighted = !this.afterHighlighted
    },
    onNoteClick (oNote) {
      if (!this.noteSelected && !oNote.highlighted && !this.afterHighlighted) {
        this.$router.push('/notes/detail/' + oNote.id)
      }
    },
    onAddNoteClick () {
      const uuidv1 = require('uuid/v1')
      this.$router.push('/notes/detail/' + uuidv1())
    },
    refresh (done) {
      setTimeout(() => {
        console.log('Refresh')
        // TODO: send state commit and trigger cloud storage upload
        done()
      }, 1000)
    },
    onStart () {
      this.dragged = true
    },
    onEnd () {
      this.dragged = false
    }
  }
}
</script>
