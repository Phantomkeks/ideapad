<template>
  <q-page class="background">
    <div class="q-pa-md">
      <q-input autogrow borderless v-model="textAreaTitle" :placeholder="$t('placeholder.title')"/>

      <div class="textAreaInput" v-if="note.type === noteTypes.Default">
        <q-input autogrow borderless :input-style="{ 'min-height': '200px' }" v-model="textAreaInput" :placeholder="$t('placeholder.description')"
                 type="textarea"/>
      </div>

      <q-list class="list" v-if="note.type === noteTypes.Checkbox">

        <div class="row items-start divPadding" v-for="(detail,index) in note.details"
             v-bind:key="index">
          <q-checkbox class="checkBoxMargin" color="primary" v-model="detail.ticked" @input="updateListEntryTicked($event, index)"/>
          <q-input class="col" autogrow borderless :value="detail.text" :placeholder="$t('placeholder.listEntry')"
                   :class="{lineThrough:detail.ticked}" v-on:input="updateListEntryText($event, index)"/>
          <div class="listEntryDelete checkBoxMargin">
            <q-icon name="clear" color="primary" @click="onDelete(note.id, index)"/>
          </div>
        </div>

        <div class="row justify-center">
          <q-btn fab icon="add" text-color="white" class="add-button" @click="addNewListEntry"/>
        </div>
      </q-list>
    </div>
  </q-page>
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

  .background
    background-color: white;

  .listEntryDelete
    font-size: 1.5rem;
</style>

<script>
export default {
  name: 'NoteDetail',
  data () {
    return {
      note: {},
      noteTypes: this.$noteTypes
    }
  },
  created () {
    let oNote = this.$store.getters.getSingleNote(this.$route.params.id)

    if (oNote) {
      this.note = oNote
    } else {
      this.note = this.$noteHelper.noteConstructor(
        this.$route.params.id,
        false,
        this.noteTypes.Default,
        null,
        null,
        '',
        []
      )
    }
  },
  methods: {
    commitChangesToStore (sNoteTitle, aNoteDetails, sType, dCreatedAt) {
      this.note = this.$noteHelper.noteConstructor(
        this.$route.params.id,
        false,
        sType,
        dCreatedAt,
        null,
        sNoteTitle,
        aNoteDetails
      )

      this.$store.commit({
        type: 'updateNote',
        oNote: this.note
      })
    },
    transformTextToArray (sTextValue) {
      let aNoteDetails = []
      if (sTextValue && sTextValue.length > 0) {
        let aDetailTexts = sTextValue.split(/\r\n|\r|\n/)
        aDetailTexts.forEach(function (sText) {
          aNoteDetails.push({ text: sText, ticked: false })
        })
      }
      return aNoteDetails
    },
    updateListEntryTicked: function (bTicked, iIndex) {
      let aDetails = this.note.details
      aDetails[iIndex].ticked = bTicked
      this.commitChangesToStore(this.textAreaTitle, aDetails, this.note.type, this.note.createdAt)
    },
    updateListEntryText: function (sListTextValue, iIndex) {
      let aDetails = this.note.details
      aDetails[iIndex].text = sListTextValue
      this.commitChangesToStore(this.textAreaTitle, aDetails, this.note.type, this.note.createdAt)
    },
    addNewListEntry: function () {
      this.note.details.push({ text: '', ticked: false })
    },
    onDelete: function (sNoteId, iListEntryIndex) {
      this.$q.dialog({
        title: this.$t('confirmDialog.deleteListEntryTitle'),
        message: this.$t('confirmDialog.deleteListEntryMessage'),
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.commit({
          type: 'deleteNoteEntry',
          sNoteId: sNoteId,
          iListEntryIndex: iListEntryIndex
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
      set: function (sTextAreaTitle) {
        this.commitChangesToStore(sTextAreaTitle, this.transformTextToArray(this.textAreaInput), this.note.type, this.note.createdAt)
      }
    },
    textAreaInput: {
      get: function () {
        let sTextAreaText = ''

        if (this.note) {
          let iLength = this.note.details.length
          this.note.details.forEach(function (oDetail, iIndex) {
            if (iIndex < iLength - 1) {
              sTextAreaText = sTextAreaText + oDetail.text + '\r\n'
            } else {
              sTextAreaText = sTextAreaText + oDetail.text
            }
          })
        }

        return sTextAreaText
      },
      set: function (sTextAreaValue) {
        this.commitChangesToStore(this.textAreaTitle, this.transformTextToArray(sTextAreaValue), this.note.type, this.note.createdAt)
      }
    }
  }
}
</script>
