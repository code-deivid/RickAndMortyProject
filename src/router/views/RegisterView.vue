<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { registrar } from '@/services/auth'
import { useToast, POSITION } from 'vue-toastification'
const toast = useToast()

const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const coinciden = computed(() => password.value === confirmPassword.value)

const onSubmit = async () => {
  toast.success('Se ha registrado el usuario correctamente', {
    position: POSITION.TOP_CENTER,
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: 'button',
    icon: true,
    rtl: false,
  })
  if (!coinciden.value) {
    alert('Las contraseñas no coinciden')
    return
  }

  const res = await registrar(email.value, password.value)

  if (!res.ok) {
    alert(res.mensaje)
    return
  }

  alert(res.mensaje)
  router.push('/login')
}
</script>

<template>
  <div class="bg-(--background-app) text-(--text-header) min-h-screen flex flex-col">
    <header class="w-full flex justify-between items-center p-6 bg-(--background-header)">
      <router-link
        to="/personajes"
        class="font-bold text-(--text-header) hover:text-(--text-header-hover)"
      >
        <i class="fa-solid fa-arrow-left"></i> Volver a personajes
      </router-link>

      <router-link
        to="/login"
        class="font-bold text-(--text-header) hover:text-(--text-header-hover)"
      >
        <i class="fa-solid fa-right-to-bracket"></i> Login
      </router-link>
    </header>

    <main class="flex-1 flex items-center justify-center px-6">
      <div
        class="w-full max-w-md rounded-2xl bg-(--background-card-login) p-6 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      >
        <h2 class="text-2xl font-extrabold tracking-tight">Crear cuenta</h2>
        <p class="text-sm text-white/60 mt-1">Te enviaremos un email para verificar tu cuenta.</p>

        <form class="mt-6 flex flex-col gap-4" @submit.prevent="onSubmit">
          <label class="flex flex-col gap-2">
            <span class="text-sm font-semibold text-white/80">Correo electrónico</span>
            <input
              v-model="email"
              type="email"
              placeholder="tuemail@gmail.com"
              class="border-0 w-full rounded-xl bg-black/25 px-4 py-3 text-white placeholder:text-white/40 ring-1 ring-white/10 outline-none transition focus:ring-2 focus:ring-[#50881b]"
            />
          </label>

          <label class="flex flex-col gap-2">
            <span class="text-sm font-semibold text-white/80">Contraseña</span>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="border-0 w-full rounded-xl bg-black/25 px-4 py-3 text-white placeholder:text-white/40 ring-1 ring-white/10 outline-none transition focus:ring-2 focus:ring-[#50881b]"
            />
          </label>

          <label class="flex flex-col gap-2">
            <span class="text-sm font-semibold text-white/80">Confirmar contraseña</span>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="••••••••"
              class="border-0 w-full rounded-xl bg-black/25 px-4 py-3 text-white placeholder:text-white/40 ring-1 ring-white/10 outline-none transition focus:ring-2 focus:ring-[#50881b]"
            />
          </label>

          <button
            type="submit"
            :disabled="!coinciden"
            class="border-0 mt-2 w-full rounded-xl bg-(--button) px-4 py-3 font-extrabold text-[#0b1220] hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <i class="fa-solid fa-user-plus"></i>
            Crear cuenta
          </button>
        </form>

        <div class="mt-4 text-sm text-white/70">
          ¿Ya tienes cuenta?
          <RouterLink
            to="/login"
            class="font-bold text-(--text-header) hover:text-(--text-header-hover)"
            >Inicia sesión</RouterLink
          >
        </div>
      </div>
    </main>
  </div>
</template>
