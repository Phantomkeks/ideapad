<template>
  <q-list class="masonry" v-bind="notes">
    <q-card
      @mousedown="startTouchEvent(note)"
      @mouseleave="stopTouchEvent"
      @mouseup="stopTouchEvent"
      @touchstart="startTouchEvent(note)"
      @touchend="stopTouchEvent"
      @touchcancel="stopTouchEvent"
      @click="onNoteClick(note, status)"
      :class="{
        highlight: note.highlighted,
        disabled: status === NoteStatus.Deleted,
      }"
      class="note-card"
      bordered
      flat
      v-for="(note, id) in notes"
      v-bind:key="id"
    >
      <q-card-section v-if="note.title">
        <div class="text-h6">
          {{ note.title }}
        </div>
      </q-card-section>

      <q-card-section
        v-if="note.details.length > 0 && note.type === NoteTypes.Default"
      >
        <div v-for="(detail, index) in note.details" v-bind:key="index">
          <div v-if="index < 7 && detail.text.length < 10">
            {{ detail.text }}
          </div>

          <div v-if="index == 7">
            <p>{{ $t('placeholder.dots') }}</p>
          </div>

          <div v-if="detail.text.length > 10">
            <p>
              {{ detail.text.substring(0, 15) }} {{ $t('placeholder.dots') }}
            </p>
          </div>
        </div>
      </q-card-section>

      <q-card-section
        v-if="note.details.length > 0 && note.type === NoteTypes.Checkbox"
      >
        <div v-for="(detail, index) in note.details" v-bind:key="index">
          <div class="row items-start" v-if="index < 3">
            <q-checkbox disable color="primary" v-model="detail.ticked" />
            <q-item-label
              class="col label"
              :class="{ lineThrough: detail.ticked }"
              :lines="5"
            >
              {{ detail.text }}
            </q-item-label>
          </div>

          <div class="dots" v-if="index == 3">
            <p>{{ $t('placeholder.dots') }}</p>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-list>
</template>

<style lang="scss" scoped>
.note-card {
  //break-inside
  //avoid-column
  margin: 0 0 1rem;
  width: 100%;
  transition: border 0.2s ease-in-out;
}

.masonry {
  column-count: 2;
  column-gap: 0.5rem;
  padding: 0.5rem;
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

<script lang="ts">
import { NoteTypes, NoteStatus } from '../helper/constants';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'NoteList',
  // props: ['notes', 'status'],
  data() {
    return {
      touchDuration: 250,
      longTouchDuration: 250,
      afterScrollingDuration: 1000,
      timer: undefined,
      scrolling: false,
      scrollingEndTimer: undefined,
      NoteTypes,
      NoteStatus,
    };
  },
  // created() {
  //   window.addEventListener('scroll', this.handleScrolling);
  // },
  // destroyed() {
  //   window.removeEventListener('scroll', this.handleScrolling);
  // },
  methods: {
    // handleScrolling() {
    //   if (this.scrolling) {
    //     return;
    //   }
    //   this.scrolling = true;
    //   this.scrollingEndTimer = setTimeout(
    //     function () {
    //       this.scrolling = false;
    //     }.bind(this),
    //     this.afterScrollingDuration
    //   );
    // },
    // startTouchEvent(note) {
    //   if (!this.scrolling) {
    //     this.timer = setTimeout(
    //       this.onLongTouch.bind(this, note),
    //       this.touchDuration
    //     );
    //   }
    // },
    // stopTouchEvent() {
    //   if (this.timer) {
    //     clearTimeout(this.timer);
    //   }
    // },
    // onLongTouch(note) {
    //   if (!this.scrolling) {
    //     if (note.highlighted) {
    //     }
    //     note.highlighted = !note.highlighted;
    //   }
    // },
    onNoteClick(note, status) {
      if (this.selecting) {
        note.highlighted = true;
        return;
      }
      let routerPath;
      if (status === NoteStatus.Created) {
        routerPath = '/notes/detail/';
      } else {
        routerPath = '/deletedNotes/detail/';
      }
      this.$router.push(routerPath + note.id);
    },
    onAddNoteClick() {
      this.$router.push('/notes/detail/' + uuidv4());
    },
  },
  computed: {
    notes: [{id: "Test", title: "Titel"}],
    selecting: function () {
      return this.notes.findIndex((note) => note.highlighted) !== -1;
    },
  },
};
</script>
