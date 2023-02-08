# nuxt-reactive-form
<a href="https://www.npmjs.com/package/nuxt-reactive-form" target="_blank">nuxt-reatctive-form</a>  
This module provides a composable and a bunch of validation rules to deal with forms.

## Installation
`npm i nuxt-reactive-form`

## Usage
```vue
<script lang="ts" setup>

// Import validation rules by destructuring ReactiveFormValidationRules
const {
  required,
  minLength
} = ReactiveFormValidationRules

// Or you can create yours
const onlyThisOrThat = (params?: { message?: string }) => {
  return ({ value, state }) => {
    return value === 'This' || value === 'That' || params?.message;
  }
}

// Instantiate reactive form from an object
const form = useReactiveForm({

  // Init with a single value
  // [key: string]: any|Ref<any>
  // No validation or custom resetting. By default, reset to the initial value
  firstname: 'John',

  // Or init with an object:
  // [key: string]: {
  //   value: any|Ref<any>,
  //   reset?: any|Ref<any>, if omitted, the value will be reset to the initial value,
  //   validation?: TValidationRule[], an array of validation rules imported/created above. If omitted, no validation
  // }
  lastname: {
    value: 'Doe',
    reset: 'Something else',
    validation: [
      required(), // Some rules don't need any param. A default error message will be displayed if rule is not verified
      minLength({ message: 'This field must contain at least {min} characters', min: 3 }), // You can use placeholders matching other params keys in your message
      onlyThisOrThat({ message: 'This field must contain the values "This" or "That"' }) // Or use your own rules
    ]
  }

});

// Destructure the instance of reactive form.
// See "useReactiveForm return values" below for more informations
const {
  state,
  resetForm,
  formIsValid,
  getError,
  forHasChanged
} = form;

const submit = () => {
  if(formIsValid()) {
    console.log('Form is valid! :D');
    resetForm();
    return;
  }
  console.log('Form is invalid... :(');
}

</script>

<template>

  <h1>Testing ReactiveForm</h1>

  <form>

    <div>
      <input
        type="text"
        v-model="state.firstname.value"
      >
      <template v-if="getError('firstname')">
        <p
          style="color: red"
          v-for="(error, index) in getError('firstname')"
          :key="index"
        >{{ error }}</p>
      </template>
    </div>

    <div>
      <input
        type="text"
        v-model="state.lastname.value"
      >
      <template v-if="getError('lastname')">
        <p
          style="color: red"
          v-for="(error, index) in getError('lastname')"
          :key="index"
        >{{ error }}</p>
      </template>
    </div>

    <button @click.prevent="submit()">Submit</button>

    <button @click.prevent="resetForm()">Reset</button>

  </form>

</template>

```

## `useReactiveForm` return values
An instance of `useReactiveForm` returns the following values.
### `state`
The current state of form values. It can be used by example in `v-model`:
```vue
<input
  v-model="state.whatever.value"
>
```
### `errorMessages`
The collection of error messages depending on the validation rules.
### `resetForm()`
A method that allows to reset form to initial values or reset values if specified
in initialization object.
### `validateState(stateKey: string)`
A method that allows to validate a specific form value.
It can be used by example in events:
```vue
<input
  v-model="state.whatever.value"
  @change="validateState('whatever')"
>
```
### `validateForm()`
A method that allows to validate all form values.
### `formIsValid(validate: boolean = false)`
A method that returns true or false whether all form values are valid or not,
after validating form by running `validateForm()` whether `validate` is set to `true` or `false`
(`false` by default).
### `getError(key: string)`
A method that returns all error messages for a specific value, or `false` if there isn't any.
It can be used by example like this:
```vue
<input
  v-model="state.whatever.value"
  @change="validateState('whatever')"
>
<template v-if="getError('lastname')">
  <p
    style="color: red"
    v-for="(error, index) in getError('lastname')"
    :key="index"
  >{{ error }}</p>
</template>
```
### `formHasChanged`
A computed returning `true` or `false` whether any form value has changed or not.
