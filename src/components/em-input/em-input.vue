<template>
  <div class="em-input">
    <p class="em-input__label" v-if="!!label">{{label}}</p>
    <input class="em-input-field" :class="{'em-input-field_has-error': errors && errors.length}" @keyup.enter="$emit('enter')" :value="modelValue" @input="onInput($event.target.value)" type="text" :placeholder="placeholder">
    <ul class="em-input__errors">
      <li class="em-input__errors-item" v-if="typeof errors === 'string'">{{errors}}</li>
      <li class="em-input__errors-item" v-else v-for="(item, key) in errors" :key="key">{{item}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "EMInput",
  props: ["placeholder", "errors", "modelValue", "type", "label"],
  emits: ['update:modelValue'],
  setup: (props: any, context: any) => {
    const onInput = (value: string) => {
      context.emit('update:modelValue', value);
    };

    return {onInput};
  }
}
</script>

<style>
.em-input-field {
  width: 100%;
  height: 40px;
  padding-left: 12px;
  padding-right: 12px;
  border: 1px solid #666;
  border-radius: 4px;
  font-size: 14px;
}

.em-input-field::placeholder {
  color: #999;
}

.em-input__errors {
  padding-top: 6px;
}

.em-input__errors-item {
  font-size: 12px;
  line-height: 1;
  color: #ff0000;
}

.em-input__errors-item:not(:last-child) {
  margin-bottom: 4px;
}

.em-input-field_has-error {
  border-color: red;
}

.em-input__label {
  margin-bottom: 4px;
  font-size: 12px;
  color: #666666;
}
</style>
