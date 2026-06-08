<script setup lang="ts">
import {useUserStore} from "~/stores/userStore";

const user = useUserStore()
const loginRef = ref<HTMLElement>()
useLocaleTransition(loginRef, 'h2, button')

function showModal(id: string) {
  document.getElementById(id)?.showModal()
}
</script>

<template>

  <div
      ref="loginRef"
      class="relative w-full mx-auto flex flex-col items-center justify-center pt-32  lg:pt-36 xl:pt-40 "
      id="login">
    <div class="text-center" >
      <h2 class="section-title">{{ $t('login.title') }}</h2>
      <button v-if="!user.isLoggedIn" class="button-orange py-4 transition-all cursor-pointer"
              @click="showModal('login_modal')">
        {{ $t('login.button') }}
      </button>
      <dialog v-if="!user.isLoggedIn" id="login_modal" class="modal z-auto">
        <div class="modal-box">
          <div class="w-full mx-auto flex justify-center">

            <FormKit
                type="form"
                :submit-label="$t('login.submitLabel')"
                messages-class="$reset hidden"
                :submit-attrs="{
      inputClass: 'button-orange text-white mx-auto mt-6 sm:mt-10 xl:mt-12 flex justify-center cursor-pointer',
    }"
                @submit="user.login"
            >
              <FormKit
                type="text"
                name="email"
                :label="$t('login.emailLabel')"
                autocomplete="username"
                :placeholder="$t('login.emailPlaceholder')"
                wrapper-class="$reset block"
                overlay-placeholder-class="text-[#3d3d3d]"
                label-class="form-label"
                input-class="$reset authInput form-input"
                inner-class="$reset"
                messages-class="$reset relative"
                message-class="$reset form-validation"
                validation="required|email|"
                :validation-messages="{
                  required: $t('validation.required'),
                  email: $t('validation.email'),
                }"
                validation-visibility="dirty"
            />
              <FormKit
                  type="password"
                  name="password"
                  autocomplete="current-password"
                  :label="$t('login.passwordLabel')"
                  :placeholder="$t('login.passwordPlaceholder')"
                  wrapper-class="$reset block"
                  overlay-placeholder-class="text-[#3d3d3d]"
                  label-class="form-label"
                  input-class="$reset authInput form-input"
                  inner-class="$reset"
                  messages-class="$reset relative"
                  message-class="$reset form-validation"
                  validation="required|alphanumeric|length:6,16"
                  :validation-messages="{
                    required: $t('validation.required'),
                    alphanumeric: $t('validation.alphanumeric'),
                    length: $t('login.minChars'),
                  }"
                  validation-visibility="dirty"
              />
            </FormKit>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <button  class="button-orange cursor-pointer">{{ $t('login.back') }}</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>

  </div>



</template>

<style scoped>

</style>
