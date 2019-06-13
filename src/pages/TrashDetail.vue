<template>
  <q-page>
    <div class="q-pa-md">
      <q-input disable outlined autogrow class="bg-white" v-model="textAreaTitle" :placeholder="$t('placeholder.title')" type="textarea"/>

      <div class="textAreaInput" v-if="note.type === noteTypes.Default">
        <q-input disable autogrow outlined class="bg-white" v-model="textAreaInput" :placeholder="$t('placeholder.description')"
                 type="textarea"/>
      </div>

      <q-list class="list" v-if="note.type === noteTypes.Checkbox">
          <div class="row items-start divPadding" v-for="(detail,index) in note.details" v-bind:key="index">
            <q-checkbox disable class="checkBoxMargin" color="primary" v-model="detail.ticked" @input="updateListEntryTicked($event, index)"/>
            <q-input disable class="col" autogrow borderless :value="detail.text" :placeholder="$t('placeholder.listEntry')"
                     :class="{lineThrough:detail.ticked}" v-on:input="updateListEntryText($event, index)"/>
          </div>
      </q-list>
    </div>
  </q-page>
</template>

<style lang="stylus" scoped>
  .textAreaInput
    margin-top: 1rem;

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
</style>

<script>
export default {
  name: 'TrashDetail',
  data () {
    return {
      note: {},
      noteTypes: this.$noteTypes
    }
  },
  created () {
    this.note = this.$store.getters.getSingleDeletedNote(this.$route.params.id)
  },
  computed: {
    textAreaTitle () {
      return this.note ? this.note.title : ''
    },
    textAreaInput () {
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
    }
  }
}
</script>
