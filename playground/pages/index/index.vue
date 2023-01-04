<script lang="ts" setup>
import { useForm } from '#imports'

const formStateInit = {
  name: 'Léo'
}
const form = useForm(formStateInit)
const {
  state,
  resetForm
} = form

const reset = () => {
  resetForm({
    name: 'Mon bonhomme d\'amour'
  })
}
</script>

<template>
  <div>
    <h1>Hello :)</h1>
    <input
      v-model="state.name.value"
      type="text"
    >
    <button @click.prevent="reset">
      Reset
    </button>
    <pre>{{ state }}</pre>
  </div>
</template>
