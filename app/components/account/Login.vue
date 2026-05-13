<script setup lang="ts">
import {useUserStore} from "~/stores/userStore";

const user = useUserStore()

function showModal(id: string) {
  document.getElementById(id)?.showModal()
}
</script>

<template>

  <div
      class="relative w-full mx-auto flex flex-col items-center justify-center pt-32  lg:pt-36 xl:pt-40 "
      id="login">
    <div class="text-center" >
      <h2 class="section-title">Log in  <br>To Buy</h2>
      <button v-if="!user.isLoggedIn" class="button-orange py-4 transition-all"
              @click="showModal('login_modal')">
        Log In
      </button>
      <dialog v-if="!user.isLoggedIn" id="login_modal" class="modal z-auto">
        <div class="modal-box">
          <div class="w-full mx-auto flex justify-center">

            <FormKit
                type="form"
                submit-label="Log in"
                messages-class="$reset hidden"
                :submit-attrs="{
      inputClass: 'button-orange text-white mx-auto mt-6 sm:mt-10 xl:mt-12 flex justify-center ',
    }"
                @submit="user.login"
            >
              <FormKit

                type="text"
                name="email"
                label="E-Mail"
                autocomplete="username"
                placeholder="E-Mail"
                wrapper-class="$reset block"
                overlay-placeholder-class="text-[#3d3d3d]"
                label-class="form-label"
                input-class="$reset authInput form-input"
                inner-class="$reset"
                messages-class="$reset relative"
                message-class="$reset form-validation"
                validation="required|email|"
                validation-visibility="dirty"
            />
              <FormKit

                  type="password"
                  name="password"
                  autocomplete="current-password"
                  label="Password"
                  placeholder="PASSWORD"
                  wrapper-class="$reset block"
                  overlay-placeholder-class="text-[#3d3d3d]"
                  label-class="form-label"
                  input-class="$reset authInput form-input"
                  inner-class="$reset"
                  messages-class="$reset relative"
                  message-class="$reset form-validation"
                  validation="required|alphanumeric|length:6,16"
                  :validation-messages="{
          length: 'Minimum 6 Characters',
        }" validation-visibility="dirty"
              />
            </FormKit>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button  class="button-orange">Back</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>

  </div>



</template>

<style scoped>

</style>