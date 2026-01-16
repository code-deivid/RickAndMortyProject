<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { login } from '@/services/auth'
import { useToast, POSITION } from 'vue-toastification'
const toast = useToast()

const router = useRouter()

const email = ref('')
const password = ref('')

const onSubmit = async () => {
  toast.success('Se ha iniciado sesión correctamente', {
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
  const res = await login(email.value, password.value)

  if (!res.ok) {
    alert(res.mensaje)
    return
  }

  router.push('/favoritos')
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
        to="/register"
        class="font-bold text-(--text-header) hover:text-(--text-header-hover)"
      >
        <i class="fa-solid fa-user-plus"></i> Register
      </router-link>
    </header>

    <main class="w-full flex-1 flex items-center justify-center">
      <section class="w-full max-w-125 items-center">
        <div
          class="rounded-2xl bg-(--background-card-login) p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
        >
          <h2 class="text-2xl font-extrabold tracking-tight">Iniciar sesión</h2>
          <p class="text-sm text-white/60 mt-1">
            Recuerda: si no verificas tu email, no podrás iniciar sesión.
          </p>

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

            <button
              type="submit"
              class="border-0 mt-2 w-full rounded-xl bg-(--button) px-4 py-3 font-extrabold text-[#0b1220] hover:brightness-110 transition"
            >
              <i class="fa-solid fa-right-to-bracket"></i>
              Entrar
            </button>
          </form>

          <div class="mt-4 text-sm text-white/70">
            ¿No tienes cuenta?
            <RouterLink
              to="/register"
              class="font-bold text-(--text-header) hover:text-(--text-header-hover)"
            >
              Regístrate
            </RouterLink>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
