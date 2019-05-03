<template>
  <div class="fixed-center text-center">
    <p class="text-faded">{{ $t('error.404') }}</p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
    >
      {{ $t('button.back') }}
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
