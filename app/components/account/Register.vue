<script setup lang="ts">
import {useUserStore} from "~/stores/userStore";

const user = useUserStore()
const registerRef = ref<HTMLElement>()
useLocaleTransition(registerRef, 'h2, button')

function showModal(id: string) {
  document.getElementById(id)?.showModal()
}
</script>

<template>
  <div
      ref="registerRef"
      class="text-center z-20 pb-12"
       :class="!user.isLoggedIn ? 'h-auto pt-20' : 'h-32'"
       id="register">
    <h2 v-if="!user.isLoggedIn" class="section-title xl:w-3/5 mx-auto">
      {{ $t('register.title') }}
    </h2>
    <button
        class="button-orange mt-8 py-4 z-20 transition-all cursor-pointer"
        :class="user.isLoggedIn ? 'cursor-not-allowed' : ''"
        :disabled="user.isLoggedIn" @click="showModal('register_modal')">
      <span v-if="!user.isLoggedIn">{{ $t('register.button') }}</span>
      <span v-else>{{ $t('register.loggedIn') }}</span>
    </button>
    <dialog v-if="!user.isLoggedIn" id="register_modal" class="modal">
      <div class="modal-box  max-h-lvh p-2 xl:p-4">
        <FormKit
              type="form"
              :submit-label="$t('register.submitLabel')"
              messages-class="$reset hidden"
              :submit-attrs="{
              inputClass: 'button-orange text-white mx-auto mt-6 sm:mt-10 xl:mt-12 flex justify-center cursor-pointer'}"
              @submit="user.register"
              #default="{ value }"
          >
            <h2 class="font-bold py-1 text-primary text-xl sm:text-2xl xl:text-4xl uppercase transition-all duration-500 ">
              {{ $t('register.formTitle') }}</h2>
            <hr />
            <FormKit
                type="text"
                name="username"
                :label="$t('register.nameLabel')"
                wrapper-class="$reset block"
                label-class="form-label "
                input-class="$reset form-input"
                inner-class="$reset"
                messages-class="$reset relative"
                message-class="$reset form-validation"
                overlay-placeholder-class="text-[#3d3d3d]"
                :placeholder="$t('register.namePlaceholder')"
                validation="required"
                :validation-messages="{
                  required: $t('validation.required'),
                }"
                validation-visibility="dirty"
                outer-class="$reset m-0"
            />
            <FormKit
                type="text"
                name="email"
                :label="$t('register.emailLabel')"
                autocomplete="username"
                :placeholder="$t('register.emailPlaceholder')"
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
                }"
                validation-visibility="dirty"
                outer-class="$reset m-0"
            />
            <FormKit
                type="password"
                name="password"
                :label="$t('register.passwordLabel')"
                autocomplete="current-password"
                wrapper-class="$reset block"
                label-class="form-label"
                input-class="$reset form-input"
                inner-class="$reset"
                outer-class="$reset m-0"
                messages-class="$reset relative"
                message-class="$reset form-validation"
                overlay-placeholder-class="text-[#3d3d3d]"
                aria-placeholder="$reset m-0 text-sm"
                validation="required|length:6|matches:/[^a-zA-Z]/"
                :validation-messages="{
                  required: $t('validation.required'),
                  matches: $t('register.symbolRequired'),
                  length: $t('register.minChars'),
                }"
                :placeholder="$t('register.passwordPlaceholder')"
                validation-visibility="dirty"
            />
            <FormKit
                type="text"
                name="street"
                :label="$t('register.streetLabel')"
                wrapper-class="$reset block"
                label-class="form-label"
                input-class="$reset form-input"
                inner-class="$reset"
                messages-class="$reset relative"
                message-class="$reset form-validation"
                overlay-placeholder-class="text-[#3d3d3d]"
                :placeholder="$t('register.streetPlaceholder')"
                outer-class="$reset m-0"
            />
            <FormKit
                type="text"
                name="city"
                :label="$t('register.cityLabel')"
                wrapper-class="$reset block"
                label-class="form-label"
                input-class="$reset form-input"
                inner-class="$reset"
                messages-class="$reset relative"
                message-class="$reset form-validation"
                overlay-placeholder-class="text-[#3d3d3d]"
                :placeholder="$t('register.cityPlaceholder')"
                outer-class="$reset m-0"
            />
          </FormKit>
        <div class="modal-action">
          <form method="dialog">
            <button  class="button-orange mb-4 cursor-pointer">{{ $t('register.back') }}</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>


</template>

<style scoped>

</style>
