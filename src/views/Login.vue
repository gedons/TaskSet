
<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="/task.svg"
        alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit="login">
        <div v-if="message" class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded">
          {{ message }}
          <span
            @click="message = ''"
            class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer  hover:bg-[rgba(0,0,0,0.2)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" v-model="user.email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-gray-800 hover:text-gray-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password" v-model="user.password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button :disabled="loading" type="submit" class="flex w-full justify-center rounded-md
                 bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6
                 text-white shadow-sm hover:bg-gray-700 focus-visible:outline 
                   focus-visible:outline-2 focus-visible:outline-offset-2
                 focus-visible:outline-gray-700" :class="{
                   'cursor-not-allowed': loading,
                   'hover:bg-gray-700': loading,
                 }">
            <svg v-if="loading" class="animate-spin -ml-1 mr-3  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            Login</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Don't have an Account ?
        {{ ' ' }}
        <router-link :to="{ name: 'Register' }" class="font-semibold leading-6 text-gray-800 hover:text-gray-700">Click to
          Register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import store from "../store";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Alert from "../components/Alert.vue";

const router = useRouter();

const user = {
  email: "",
  password: "",
};
let loading = ref(false);
const message = ref("");

function login(ev) {
  ev.preventDefault();

  loading.value = true;
  store
    .dispatch("login", user)
    .then(() => {
      loading.value = false;
      router.push({
        name: "Dashboard",
      });
    })
    .catch((error) => {
      loading.value = false;
      if (error.response.status === 422) {
        message.value = error.response.data.message;
      }
    });
}
</script>
  