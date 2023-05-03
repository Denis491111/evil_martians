<template>
  <div class="login-popup" @click.self="$emit('close')">
    <div class="login-popup__inner">
      <button class="login-popup__closer" @click="$emit('close')">Close popup</button>
      <template v-if="componentInterface.isRecoveryMode">
        <p class="login-popup__inner-title">Password recovery</p>
        <p class="login-popup__inner-subtitle">Please, enter your email address to receive an instructions list</p>
        <div class="login-popup__inner-form">
          <div class="login-popup__inner-form-item">
            <EMInput :modelValue="formDataRecovery.email" @update:modelValue="onInputRecovery('email', $event)" @enter="recover" placeholder="Enter your email address" label="Email" :errors="errorsRecovery.email" />
          </div>
          <div class="login-popup__inner-form-item">
            <EMButton size="lg" :block="true" @click="recover" :loading="componentInterface.isLoadingRecovery">Send</EMButton>
            <p class="login-popup__inner-form-item-error" v-if="!!errorsRecovery.common">{{errorsRecovery.common}}</p>
          </div>
        </div>
      </template>

      <template v-else>
        <p class="login-popup__inner-title">Login</p>
        <p class="login-popup__inner-subtitle">Please, enter your email address and password to continue. If you forgot your password, please, use the
          <span class="login-popup__inner-subtitle-link" @click="componentInterface.isRecoveryMode = true">password recovery form</span></p>
        <div class="login-popup__inner-form">
          <div class="login-popup__inner-form-item">
            <EMInput :modelValue="formData.email" @update:modelValue="onInput('email', $event)" @enter="auth" placeholder="Enter your email address" label="Email" :errors="errors.email" />
          </div>
          <div class="login-popup__inner-form-item">
            <EMInput :modelValue="formData.password" @update:modelValue="onInput('password', $event)" @enter="auth" placeholder="Enter your password" label="Password" :errors="errors.password" />
          </div>
          <div class="login-popup__inner-form-item">
            <EMButton size="lg" :block="true" @click="auth" :loading="componentInterface.isLoadingAuth">Continue</EMButton>
            <p class="login-popup__inner-form-item-error" v-if="!!errors.common">{{errors.common}}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" src="./login-popup.ts"></script>
<style src="./login-popup.css"></style>
