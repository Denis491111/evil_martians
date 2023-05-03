<template>
  <button class="em-button" :class="{['em-button_' + size]: !!size, 'em-button_block': !!block, 'em-button_loading': !!loading}" @click="$emit('click', $event)"><slot></slot></button>
</template>

<script lang="ts">
export default {
  name: "EMButton",
  props: ["size", "color", "block", "loading"],
  emits: ['click'],
  setup: () => {}
}
</script>

<style>
.em-button {
  display: inline-block;
  vertical-align: middle;
  padding: 12px 24px;
  min-width: 140px;
  text-align: center;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;

  -webkit-background-size: 40px;
  background-size: 40px;
  background-position: center;

  background-color: var(--primary);
  color: #fff;
}

.em-button:hover {
  opacity: 0.8;
}

.em-button_lg {
  padding: 16px 24px;
  font-size: 16px;
}

.em-button_block {
  width: 100%;
  display: block;
  padding-left: 4px;
  padding-right: 4px;
}

.em-button_loading {
  color: transparent;
  background-image: url("~@/assets/img/loader.svg");
  pointer-events: none;
  opacity: 0.7;
}
</style>
