<!--<template>-->
<!--  <div id="q-app">-->
<!--    <router-view />-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--export default {-->
<!--  name: 'App'-->
<!--  // beforeCreate() {-->
<!--  //   this.$store.commit('initialiseStore');-->
<!--  //   this.$i18n.locale = this.$store.getters.getLanguageSetting;-->
<!--  // },-->
<!--};-->
<!--</script>-->
<!--&lt;!&ndash;<style lang="scss">&ndash;&gt;-->
<!--&lt;!&ndash;  body&ndash;&gt;-->
<!--&lt;!&ndash;    background-color: $grey-2&ndash;&gt;-->
<!--&lt;!&ndash;</style>&ndash;&gt;-->

<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>
