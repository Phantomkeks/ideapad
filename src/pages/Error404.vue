<template>
  <div class="fixed-center text-center">
    <p class="text-faded">{{ $t('error.404') }}</p>
    <q-btn
      no-caps
      class="back-button"
      @click="onBackButtonClick"
    >
      {{ $t('button.back') }}
    </q-btn>
  </div>
</template>

<style lang="stylus" scoped>
  .back-button {
    headerGradient();
  }
</style>

<script>
export default {
  name: 'Error404',
  methods: {
    onBackButtonClick () {
      this.$router.go(-1)
    }
  }
}
</script>
