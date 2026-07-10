<script setup lang="ts">
import { FormKit } from '@formkit/vue'
import {useUserStore} from "~/stores/userStore";

const user = useUserStore()
const loginRef = ref<HTMLElement>()
useLocaleTransition(loginRef, 'h2, button')

const isModalOpen = ref(false)

function showModal(id: string) {
  isModalOpen.value = true
  nextTick(() => document.getElementById(id)?.showModal())
}
</script>

<template>
  <div
    ref="loginRef"
    id="login"
    class="relative overflow-hidden "
  >
    <div class="max-w-6xl mx-auto px-6 flex items-center gap-8 lg:gap-16">
      <!-- Content – left -->
      <div class="flex-1 text-center">
        <h2 class="section-title text-primary mx-auto mb-6">{{ $t('login.title') }}</h2>
        <button
          v-if="!user.isLoggedIn"
          class="button-orange py-4 cursor-pointer transition-all"
          @click="showModal('login_modal')"
        >
          {{ $t('login.button') }}
        </button>
      </div>

      <!-- Decorative image – right -->
      <div class="hidden sm:flex flex-none justify-center sm:w-48 lg:w-72 xl:w-96">
        <NuxtImg
          src="/images/register/register-right.png"
          alt=""
          aria-hidden="true"
          class="w-full object-contain drop-shadow-xl"
          loading="lazy"
          format="webp"
        />
      </div>
    </div>

    <dialog v-if="!user.isLoggedIn" id="login_modal" class="modal z-auto">
      <div class="modal-box">
        <div class="w-full mx-auto flex justify-center">
          <FormKit v-if="isModalOpen"
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
        <div class="modal-action text-center">
          <form method="dialog">
            <button class="button-orange cursor-pointer">{{ $t('login.back') }}</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>
