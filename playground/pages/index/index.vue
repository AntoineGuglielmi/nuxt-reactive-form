<script lang="ts" setup>
import { useForm, required, IStateInit, maxLength, onlyLetters, onlyNumbers, TValidationRuleWrapper, TValidationRule, IValidationRuleParams, IValidationRulePayload } from '#imports'

const customRule: TValidationRuleWrapper = (params = {}) => {
  return (payload: IValidationRulePayload) => {
    const { value } = payload
    return value === 'aze' || (params.message ?? 'Nope, this needs to be \'aze\'')
  }
}

const formStateInit: IStateInit = {
  name: {
    value: 'Léo',
    reset: 'Mon bonhomme d\'amour',
    validation: [
      // required({ message: 'Ce champ est obligatoire' }),
      maxLength(/* { max: 3, message: 'Ce champ ne peut contenir que 3 caractères maximum' } */),
      // onlyLetters({ message: 'Ce champ ne peut contenir que des lettres minuscules et majuscules' }),
      customRule()
    ]
  }
}

const form = useForm(formStateInit)

const {
  state,
  resetForm,
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
    <h1>useForm development</h1>
    <div>
      <input
        v-model="state.name.value"
        type="text"
      >
      <template v-if="getError('name').length">
        <p v-for="(error, index) in getError('name')" :key="index">
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
