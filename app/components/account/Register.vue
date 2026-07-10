<script setup lang="ts">
import { FormKit } from '@formkit/vue'
import {useUserStore} from "~/stores/userStore";

const user = useUserStore()
const registerRef = ref<HTMLElement>()
useLocaleTransition(registerRef, 'h2, button')

const isModalOpen = ref(false)

function showModal(id: string) {
  isModalOpen.value = true
  nextTick(() => document.getElementById(id)?.showModal())
}
</script>

<template>
  <div
    ref="registerRef"
    id="register"
    class="relative overflow-hidden py-16 lg:py-28 xl:py-36"
  >
    <div class="max-w-6xl mx-auto px-6 flex items-center gap-8 lg:gap-16">
      <!-- Decorative image – left -->
      <div class="hidden sm:flex flex-none justify-center sm:w-48 lg:w-72 xl:w-96">
        <NuxtImg
          src="/images/register/register-left.png"
          alt=""
          aria-hidden="true"
          class="w-full object-contain drop-shadow-xl"
          loading="lazy"
          format="webp"
        />
      </div>

      <!-- Content – right -->
      <div class="flex-1 text-center">
        <h2 v-if="!user.isLoggedIn" class="section-title text-primary mx-auto mb-6">
          {{ $t('register.title') }}
        </h2>
        <p v-else class="section-title mx-auto mb-6">
          {{ $t('register.loggedIn') }}
        </p>
        <button
          class="button-orange py-4 transition-all"
          :class="user.isLoggedIn ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'"
          :disabled="user.isLoggedIn"
          @click="!user.isLoggedIn && showModal('register_modal')"
        >
          <span v-if="!user.isLoggedIn">{{ $t('register.button') }}</span>
          <span v-else>{{ $t('register.button') }}</span>
        </button>
      </div>
    </div>

    <dialog v-if="!user.isLoggedIn" id="register_modal" class="modal">
      <div class="modal-box max-h-lvh p-2 xl:p-4">
        <FormKit v-if="isModalOpen"
          type="form"
          :submit-label="$t('register.submitLabel')"
          messages-class="$reset hidden"
          :submit-attrs="{
            inputClass: 'button-orange text-white mx-auto mt-6 sm:mt-10 xl:mt-12 flex justify-center cursor-pointer'}"
          @submit="user.register"
          #default="{ value }"
        >
          <h2 class="font-bold py-1 text-primary text-xl sm:text-2xl xl:text-4xl uppercase transition-all duration-500">
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
        <div class="modal-action text-center">
          <form method="dialog">
            <button class="button-orange mb-4 cursor-pointer">{{ $t('register.back') }}</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>
