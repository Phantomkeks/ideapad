<template>
  <q-page>
    <div class="q-pa-md">
      <q-input outlined autogrow class="bg-white"  v-model="textAreaTitle" :placeholder="$t('placeholder.title')" type="textarea"/>

      <div class="textAreaInput" v-if="note.type === noteTypes.Default">
        <q-input autogrow outlined class="bg-white" v-model="textAreaInput" :placeholder="$t('placeholder.description')" type="textarea"/>
      </div>

      <q-list class="listInput" v-if="note.type === noteTypes.Checkbox">
          <q-checkbox color="primary" v-model="details.ticked" v-for="(details,index) in note.details" v-bind:key="index">
            <q-input borderless :value="details.text" :placeholder="$t('placeholder.listEntry')" :class="{lineThrough:details.ticked}"/>
          </q-checkbox>
      </q-list>
    </div>
  </q-page>
</template>

<style lang="stylus" scoped>
  .textAreaInput
    margin-top: 1rem;
  .listInput
    margin-top: 1rem;
    background-color: white;
    border: 1px solid rgba(0,0,0,0.24);
    border-radius: 4px;
  .lineThrough {
    text-decoration: line-through;
    text-decoration-color: $primary;
  }
</style>

<script>
export default {
  name: 'NoteDetail',
  data () {
    return {
      note: {},
      readonly: true,
      noteTypes: this.$noteTypes
    }
  },
  created () {
    this.note = this.$store.getters.getSingleNote(this.$route.params.id)
  },
  methods: {
    commitChangesToStore (sNoteTitle, aNoteDetails) {
      this.note = {
        id: this.$route.params.id,
        highlighted: false,
        type: this.$noteTypes.Default,
        title: sNoteTitle,
        details: aNoteDetails
      }
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
    }
  },
  computed: {
    textAreaTitle: {
      get: function () {
        return this.note ? this.note.title : ''
      },
      set: function (sTextAreaTitle) {
        this.commitChangesToStore(sTextAreaTitle, this.transformTextToArray(this.textAreaInput))
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
        this.commitChangesToStore(this.textAreaTitle, this.transformTextToArray(sTextAreaValue))
      }
    }
  }
}
</script>
