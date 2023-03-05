<template>
  <div class="q-pa-md">
    <q-input
      autogrow
      borderless
      v-model="textAreaTitle"
      class="titleFontSize"
      :placeholder="$t('placeholder.title')"
      :class="{ disabled: status === NoteStatus.Deleted }"
      :disable="status === NoteStatus.Deleted"
    />
    <div class="textAreaInput" v-if="note.type === NoteTypes.Default">
      <q-input
        autogrow
        borderless
        v-model="textAreaInput"
        type="textarea"
        class="textFontSize"
        :class="{ disabled: status === NoteStatus.Deleted }"
        :placeholder="$t('placeholder.description')"
        :disable="status === NoteStatus.Deleted"
      />
    </div>

    <q-list v-if="note.type === NoteTypes.Checkbox">
      <div
        class="row items-start"
        v-for="(detail, index) in note.details"
        v-bind:key="index"
      >
        <q-checkbox
          class="checkBoxMargin"
          color="primary"
          v-model="detail.ticked"
          :disable="status === NoteStatus.Deleted"
          @input="updateListEntryTicked($event, index)"
        />
        <q-input
          class="col textFontSize"
          autogrow
          borderless
          :value="detail.text"
          :placeholder="$t('placeholder.listEntry')"
          :class="{
            lineThrough: detail.ticked,
            disabled: status === NoteStatus.Deleted,
          }"
          @input="updateListEntryText($event, index)"
          @focus="updateShowDelete(detail)"
          @blur="updateShowDelete(detail)"
          :disable="status === NoteStatus.Deleted"
        />
        <div
          class="listEntryDelete checkBoxMargin"
          v-if="detail.showDelete && status !== NoteStatus.Deleted"
        >
          <q-icon name="clear" color="grey" @click="onDelete(note.id, index)" />
        </div>
      </div>

      <div class="row justify-center" v-if="status !== NoteStatus.Deleted">
        <q-btn
          fab
          icon="add"
          text-color="white"
          class="add-button"
          @click="addNewListEntry"
        />
      </div>
    </q-list>
  </div>
</template>

<style lang="scss" scoped>
/*//<!--.titleFontSize-->*/
/*//<!--  font-size: $titleFontSize-->*/
/*//*/
/*//<!--.textFontSize-->*/
/*//<!--  font-size: $textFontSize-->*/
/*//*/
/*//<!--.textAreaInput-->*/
/*//<!--  margin-top: 0rem;-->*/
/*//*/
/*//<!--.list-->*/
/*//<!--  margin-top: 1rem;-->*/
/*//<!--  background-color: white;-->*/
/*//<!--  border: 1px solid rgba(0, 0, 0, 0.24);-->*/
/*//<!--  border-radius: 4px;-->*/
/*//*/
/*//<!--.listInput-->*/
/*//<!--  padding: 0;-->*/
/*//<!--  padding-top: 5px;-->*/
/*//*/
/*//<!--.lineThrough-->*/
/*//<!--  text-decoration: line-through;-->*/
/*//<!--  text-decoration-color: $primary;-->*/
/*//*/
/*//<!--.divPadding-->*/
/*//<!--  padding: 0 5px 0 5px;-->*/
/*//*/
/*//<!--.checkBoxMargin-->*/
/*//<!--  margin-top: 10px;-->*/
/*//<!--.listEntryDelete-->*/
/*//<!--  font-size: 1.5rem;-->*/
</style>

<script>
import { NoteTypes, NoteStatus } from '../helper/constants';
import NoteHelper from '../helper/NoteHelper';

export default {
  name: 'Note',
  props: ['componentNote', 'status'],
  data() {
    return {
      note: this.componentNote,
      NoteTypes,
      NoteStatus,
    };
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'undoRedoNote') {
        const note = mutation.payload.note;
        if (note) {
          this.note = note;
        }
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    commitChangesToStore(noteTitle, noteDetails, type, createdAt) {
      this.note = NoteHelper.noteConstructor(
        this.$route.params.id,
        false,
        type,
        createdAt,
        null,
        noteTitle,
        noteDetails
      );

      this.$store.commit({
        type: 'updateNote',
        note: this.note,
      });
    },
    transformTextToArray(textValue) {
      const noteDetails = [];
      if (textValue && textValue.length > 0) {
        const detailTexts = textValue.split(/\r\n|\r|\n/);
        detailTexts.forEach((text) => {
          noteDetails.push({ text: text, ticked: false, showDelete: false });
        });
      }
      return noteDetails;
    },
    updateListEntryTicked: function (ticked, index) {
      let details = this.note.details;
      details[index].ticked = ticked;
      this.commitChangesToStore(
        this.textAreaTitle,
        details,
        this.note.type,
        this.note.createdAt
      );
    },
    updateListEntryText: function (listTextValue, index) {
      const details = this.note.details;
      details[index].text = listTextValue;
      this.commitChangesToStore(
        this.textAreaTitle,
        details,
        this.note.type,
        this.note.createdAt
      );
    },
    addNewListEntry: function () {
      this.note.details.push({ text: '', ticked: false, showDelete: false });
    },
    onDelete: function (noteId, listEntryIndex) {
      this.$q
        .dialog({
          title: this.$t('confirmDialog.deleteListEntryTitle'),
          message: this.$t('confirmDialog.deleteListEntryMessage'),
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$store.commit({
            type: 'deleteNoteEntry',
            noteId: noteId,
            listEntryIndex: listEntryIndex,
          });
        })
        .onCancel(() => {})
        .onDismiss(() => {});
    },
    updateShowDelete(detail) {
      detail.showDelete = !detail.showDelete;
    },
  },
  computed: {
    textAreaTitle: {
      get: function () {
        return this.note ? this.note.title : '';
      },
      set: function (textAreaTitle) {
        this.commitChangesToStore(
          textAreaTitle,
          this.transformTextToArray(this.textAreaInput),
          this.note.type,
          this.note.createdAt
        );
      },
    },
    textAreaInput: {
      get: function () {
        let textAreaText = '';

        if (this.note) {
          let iLength = this.note.details.length;
          this.note.details.forEach((oDetail, index) => {
            if (index < iLength - 1) {
              textAreaText = textAreaText + oDetail.text + '\r\n';
            } else {
              textAreaText = textAreaText + oDetail.text;
            }
          });
        }

        return textAreaText;
      },
      set: function (textAreaValue) {
        this.commitChangesToStore(
          this.textAreaTitle,
          this.transformTextToArray(textAreaValue),
          this.note.type,
          this.note.createdAt
        );
      },
    },
  },
};
</script>
