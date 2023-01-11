<script lang="ts" setup>
import { useReactiveForm, ReactiveFormValidationRules } from '#imports'

const {
  maxLength,
  required,
  pattern,
  matches
} = ReactiveFormValidationRules

const customRule = (params: { message?: string } = {}) => {
  return (payload: any) => {
    const { value } = payload
    return value === 'aze' || (params.message ?? 'Nope, this needs to be \'aze\'')
  }
}

const formStateInit = {
  name: {
    value: 'Léo',
    reset: 'Mon bonhomme d\'amour',
    validation: [
      maxLength({ max: 3 })
    ]
  },
  nameRepeat: {
    value: '',
    reset: 'Mon bonhomme d\'amour',
    validation: [
      matches({ matches: 'name', message: 'Ce champ doit être identique au champ "nom"' })
    ]
  }
}

const form = useReactiveForm(formStateInit)

const {
  state,
  resetForm,
  validateState,
  formIsValid,
  getError
} = form

const submit = () => {
  if (formIsValid()) {
    console.log('Le formulaire est valide')
    resetForm()
    return
  }
  console.log('Le formulaire n\'est pas valide')
}
</script>

<template>
  <div>
    <h1>useReactiveForm development</h1>
    <div>
      <input
        v-model="state.name.value"
        @keyup="validateState('name')"
        type="text"
      >
      <template v-if="getError('name').length">
        <p v-for="(error, index) in getError('name')" :key="index">
          {{ error }}
        </p>
      </template>
    </div>
    <div>
      <input
        v-model="state.nameRepeat.value"
        @keyup="validateState('nameRepeat')"
        type="text"
      >
      <template v-if="getError('nameRepeat').length">
        <p v-for="(error, index) in getError('nameRepeat')" :key="index">
          {{ error }}
        </p>
      </template>
    </div>
    <div>
      <button @click.prevent="submit">
        Valider
      </button>
    </div>
    <div>
      <button @click.prevent="resetForm">
        Reset
      </button>
    </div>
  </div>
</template>
