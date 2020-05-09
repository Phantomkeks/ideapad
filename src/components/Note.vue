<template>
  <div class="q-pa-md">
    <q-input autogrow borderless v-model="textAreaTitle"
             :placeholder="$t('placeholder.title')"
             :class="{ disabled:status === noteStatus.Deleted }"
             :disable="status === noteStatus.Deleted"/>
    <div class="textAreaInput" v-if="note.type === noteTypes.Default">
      <q-input autogrow borderless :input-style="{ 'min-height': '200px' }" v-model="textAreaInput"
               :class="{ disabled:status === noteStatus.Deleted }"
               :placeholder="$t('placeholder.description')"
               type="textarea"
               :disable="status === noteStatus.Deleted"/>
    </div>

    <q-list v-if="note.type === noteTypes.Checkbox">
      <div class="row items-start" v-for="(detail,index) in note.details"
           v-bind:key="index">
        <q-checkbox class="checkBoxMargin" color="primary" v-model="detail.ticked"
                    :disable="status === noteStatus.Deleted"
                    @input="updateListEntryTicked($event, index)"/>
        <q-input class="col" autogrow borderless :value="detail.text" :placeholder="$t('placeholder.listEntry')"
                 :class="{ lineThrough:detail.ticked, disabled:status === noteStatus.Deleted }"
                 v-on:input="updateListEntryText($event, index)"
                 @focus="detail.deleteVisible = true"
                 @blur="detail.deleteVisible = false"
                 :disable="status === noteStatus.Deleted"
        />
        <div class="listEntryDelete checkBoxMargin" v-if="detail.deleteVisible && status !== noteStatus.Deleted">
          <q-icon name="clear" color="grey" @click="onDelete(note.id, index)"/>
        </div>
      </div>

      <div class="row justify-center" v-if="status !== noteStatus.Deleted">
        <q-btn fab icon="add" text-color="white" class="add-button" @click="addNewListEntry"/>
      </div>
    </q-list>
  </div>
</template>

<style lang="stylus" scoped>
  .textAreaInput
    margin-top: 0rem;

  .list
    margin-top: 1rem;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.24);
    border-radius: 4px;

  .listInput
    padding: 0;
    padding-top: 5px;

  .lineThrough
    text-decoration: line-through;
    text-decoration-color: $primary;

  .divPadding
    padding: 0 5px 0 5px;

  .checkBoxMargin
    margin-top: 10px;

  .add-button
    headerGradient();
    margin: 5px 0 5px 0;

  .listEntryDelete
    font-size: 1.5rem;
</style>

<script>
import { NoteTypes, NoteStatus } from '../helper/constants'

export default {
  name: 'Note',
  props: ['value'],
  data () {
    return {
      note: this.value.note,
      status: this.value.status,
      noteTypes: NoteTypes,
      noteStatus: NoteStatus
    }
  },
  methods: {
    commitChangesToStore (noteTitle, noteDetails, type, createdAt) {
      this.note = this.$noteHelper.noteConstructor(
        this.$route.params.id,
        false,
        type,
        createdAt,
        null,
        noteTitle,
        noteDetails
      )

      this.$store.commit({
        type: 'updateNote',
        note: this.note
      })
    },
    transformTextToArray (textValue) {
      const noteDetails = []
      if (textValue && textValue.length > 0) {
        const detailTexts = textValue.split(/\r\n|\r|\n/)
        detailTexts.forEach(text => {
          noteDetails.push({ text: text, ticked: false })
        })
      }
      return noteDetails
    },
    updateListEntryTicked: function (ticked, index) {
      let details = this.note.details
      details[index].ticked = ticked
      this.commitChangesToStore(this.textAreaTitle, details, this.note.type, this.note.createdAt)
    },
    updateListEntryText: function (listTextValue, index) {
      const details = this.note.details
      details[index].text = listTextValue
      this.commitChangesToStore(this.textAreaTitle, details, this.note.type, this.note.createdAt)
    },
    addNewListEntry: function () {
      this.note.details.push({ text: '', ticked: false })
    },
    onDelete: function (noteId, listEntryIndex) {
      this.$q.dialog({
        title: this.$t('confirmDialog.deleteListEntryTitle'),
        message: this.$t('confirmDialog.deleteListEntryMessage'),
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.commit({
          type: 'deleteNoteEntry',
          noteId: noteId,
          listEntryIndex: listEntryIndex
        })
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    }
  },
  computed: {
    textAreaTitle: {
      get: function () {
        return this.note ? this.note.title : ''
      },
      set: function (textAreaTitle) {
        this.commitChangesToStore(textAreaTitle, this.transformTextToArray(this.textAreaInput), this.note.type, this.note.createdAt)
      }
    },
    textAreaInput: {
      get: function () {
        let textAreaText = ''

        if (this.note) {
          let iLength = this.note.details.length
          this.note.details.forEach((oDetail, index) => {
            if (index < iLength - 1) {
              textAreaText = textAreaText + oDetail.text + '\r\n'
            } else {
              textAreaText = textAreaText + oDetail.text
            }
          })
        }

        return textAreaText
      },
      set: function (textAreaValue) {
        this.commitChangesToStore(this.textAreaTitle, this.transformTextToArray(textAreaValue), this.note.type, this.note.createdAt)
      }
    }
  }
}
</script>
