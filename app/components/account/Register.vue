<script setup lang="ts">
import {useUserStore} from "~/stores/userStore";

const user = useUserStore()

function showModal(id: string) {
  document.getElementById(id)?.showModal()
}
</script>

<template>
  <div
      class="text-center z-20 pb-12"
       :class="!user.isLoggedIn ? 'h-auto pt-20' : 'h-32'"
       id="register">
    <h2 v-if="!user.isLoggedIn" class="section-title xl:w-3/5 mx-auto">
      Create Account
    </h2>
    <button
        class="button-orange mt-8 py-4 z-20 transition-all "
        :class="user.isLoggedIn ? 'cursor-not-allowed' : ''"
        :disabled="user.isLoggedIn" @click="showModal('register_modal')">
      <span v-if="!user.isLoggedIn"> Register</span>
      <span v-else>Logged In</span>
    </button>
    <dialog v-if="!user.isLoggedIn" id="register_modal" class="modal">
      <div class="modal-box  max-h-lvh p-2 xl:p-4">
        <FormKit

              type="form"
              submit-label="Register"
              messages-class="$reset hidden"
              :submit-attrs="{
              inputClass: 'button-orange text-white mx-auto mt-6 sm:mt-10 xl:mt-12 flex justify-center'}"
              @submit="user.register"
              #default="{ value }"
          >
            <h2 class="font-bold py-1 text-primary text-xl sm:text-2xl xl:text-4xl uppercase transition-all duration-500">
              Register!</h2>
            <hr />
            <FormKit
                type="text"
                name="username"
                label="Your name"

                wrapper-class="$reset block"
                label-class="form-label "
                input-class="$reset form-input"
                inner-class="$reset"
                messages-class="$reset relative"
                message-class="$reset form-validation"
                overlay-placeholder-class="text-[#3d3d3d]"
                placeholder="Jane Doe"
                validation="required"
                validation-visibility="dirty"
                outer-class="$reset m-0"
            />
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
                outer-class="$reset m-0"
            />
            <FormKit
                type="password"
                name="password"
                label="Password"
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
          matches: 'Please include at least one symbol',
           length: 'Minimum 6 Characters',
        }"
                placeholder="Your password"
                validation-visibility="dirty"
            />
          </FormKit>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button  class="button-orange mb-4">Back</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>


</template>

<style scoped>

</style>