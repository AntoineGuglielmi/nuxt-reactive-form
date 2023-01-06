# nuxt-reactive-form
This module provides a `useForm` composable and a bunch of validation rules to deal with forms.

## Installation
[nuxt-reatctive-form](https://www.npmjs.com/package/nuxt-reactive-form)
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
  return (payload: { value: any }) => {
    const { value } = payload;
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

// Destructure the instance of reactive form
const {
  state, // The state you can use in your inputs
  resetForm, // A function to reset values
  formIsValid, // A function that returns true or false whether all fields are valid or not
  getError // A function that returns all error messages for a specific field : getError(fieldKey: string)
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

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.
