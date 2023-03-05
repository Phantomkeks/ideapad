<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="gradient">
      <q-toolbar>
        <q-btn flat dense round @click="onBackButtonClick" icon="arrow_back" />

        <q-toolbar-title>
          {{ $t('appTitle') }}
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          :icon="
            note.type === NoteTypes.Default ? 'format_list_bulleted' : 'notes'
          "
          @click="changeNoteType()"
          v-if="!trashMoreButtons && note"
        />

        <q-btn
          flat
          dense
          round
          icon="more_vert"
          v-if="overviewMoreButtons || trashMoreButtons"
        >
          <q-menu auto-close>
            <q-list style="min-width: 100px" v-if="overviewMoreButtons">
              <q-item clickable @click="onCopyNoteCLick">
                <q-item-section avatar>
                  <q-icon name="file_copy" />
                </q-item-section>
                <q-item-section>
                  {{ $t('menuItem.copy') }}
                </q-item-section>
              </q-item>
              <q-item clickable @click="onDeleteNoteCLick">
                <q-item-section avatar>
                  <q-icon name="delete" />
                </q-item-section>
                <q-item-section>
                  {{ $t('menuItem.delete') }}
                </q-item-section>
              </q-item>
            </q-list>

            <q-list style="min-width: 100px" v-if="trashMoreButtons">
              <q-item clickable @click="onRestoreClick">
                <q-item-section avatar>
                  <q-icon name="restore" />
                </q-item-section>
                <q-item-section>
                  {{ $t('menuItem.restore') }}
                </q-item-section>
              </q-item>
              <q-item clickable @click="openConfirmDialog">
                <q-item-section avatar>
                  <q-icon name="delete" />
                </q-item-section>
                <q-item-section>
                  {{ $t('menuItem.permDelete') }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      bordered
      class="background-color: bg-grey-2"
      v-if="noteHistory.length > 1"
    >
      <q-toolbar class="footerButtons">
        <q-btn
          flat
          dense
          round
          color="black"
          icon="undo"
          @click="undo"
          :disabled="historyPointer === 0"
          :disable="historyPointer === 0"
        />
        <q-btn
          flat
          dense
          round
          color="black"
          icon="redo"
          @click="redo"
          :disabled="historyPointer + 1 === noteHistory.length"
          :disable="historyPointer + 1 === noteHistory.length"
        />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style lang="scss" scoped>
.footerButtons
  justify-content: center
</style>

<script>
import { NoteTypes } from '../helper/constants';

export default {
  name: 'DetailLayout',
  data() {
    return {
      overviewMoreButtons: false,
      trashMoreButtons: false,
      NoteTypes,
      noteHistory: [],
      historyPointer: 0,
    };
  },
  created() {
    this.noteHistory.push(Object.assign({}, this.note));
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (
        mutation.type === 'updateNote' ||
        mutation.type === 'changeNoteType'
      ) {
        this.noteHistory.push(Object.assign({}, mutation.payload.note));
        this.historyPointer = this.noteHistory.length - 1;
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  watch: {
    $route: {
      handler: function (route) {
        const id = route.params.id;

        if (route.fullPath.indexOf('/notes/') !== -1) {
          this.$store.getters.getSingleNote(id)
            ? (this.overviewMoreButtons = true)
            : (this.overviewMoreButtons = false);
        } else if (route.fullPath.indexOf('/deletedNotes/') !== -1) {
          this.$store.getters.getSingleDeletedNote(id)
            ? (this.trashMoreButtons = true)
            : (this.trashMoreButtons = false);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    onBackButtonClick() {
      this.$router.go(-1);
    },
    onCopyNoteCLick() {
      this.$store.commit({
        type: 'copyNote',
        noteId: this.$route.params.id,
      });

      this.$router.push('/notes');
    },
    onDeleteNoteCLick() {
      this.$store.commit({
        type: 'removeNote',
        noteId: this.$route.params.id,
      });

      this.$router.push('/notes');
    },
    onRestoreClick() {
      this.$store.commit({
        type: 'restoreNote',
        noteId: this.$route.params.id,
      });

      this.$router.push('/trash');
    },
    onPermanentlyDelete() {
      this.$store.commit({
        type: 'deleteNote',
        noteId: this.$route.params.id,
      });

      this.$router.push('/trash');
    },
    openConfirmDialog() {
      this.$q
        .dialog({
          title: this.$t('confirmDialog.permanentDeleteTitle'),
          message: this.$t('confirmDialog.permanentDeleteMessage'),
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.onPermanentlyDelete();
        })
        .onCancel(() => {})
        .onDismiss(() => {});
    },
    changeNoteType() {
      const note = this.$store.getters.getSingleNote(this.$route.params.id);
      const newNoteType =
        note.type === NoteTypes.Default
          ? NoteTypes.Checkbox
          : NoteTypes.Default;
      this.$store.commit({
        type: 'changeNoteType',
        note: note,
        noteType: newNoteType,
      });
    },
    undo() {
      // console.log(this.noteHistory)
      if (this.historyPointer > 0) {
        this.historyPointer--;
        this.note = this.noteHistory[this.historyPointer];
      }
    },
    redo() {
      if (this.historyPointer < this.noteHistory.length - 1) {
        this.historyPointer++;
        this.note = this.noteHistory[this.historyPointer];
      }
    },
  },
  computed: {
    note: {
      get: function () {
        const id = this.$route.params.id;
        return this.$store.getters.getSingleNote(id);
      },
      set: function (note) {
        return this.$store.commit({
          type: 'undoRedoNote',
          note: note,
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
// $ -> Needed to enable Quasar to load the variables from quasar.variables.styl
.gradient {
  headerGradient();
}
</style>
