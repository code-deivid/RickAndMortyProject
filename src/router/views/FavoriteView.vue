<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUsuarioActual, isAutenticado, logout } from '@/services/auth'
import { obtenerFavoritos, type IRMCharacter } from '@/services/favoritos'
import { useToast, POSITION } from 'vue-toastification'
const toast = useToast()

const router = useRouter()
const favoritos = ref<IRMCharacter[]>([])
const email = ref('')

onMounted(async () => {
  if (!isAutenticado()) {
    alert('Debes iniciar sesión para ver tus favoritos.')
    router.push('/login')
    return
  }

  const user = getUsuarioActual()
  if (!user) return

  email.value = user.email ?? '(sin email)'
  const res = await obtenerFavoritos(user.uid)
  favoritos.value = res.personajes
})

const cerrarSesion = async () => {
  toast.success('Se ha cerrado sesión correctamente', {
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
  await logout()
  router.push('/personajes')
}
</script>

<template>
  <div class="bg-(--background-app) text-white min-h-screen flex flex-col">
    <header class="w-full flex justify-between items-center px-6 py-4 bg-(--background-header)">
      <div class="flex items-center gap-3">
        <img
          class="w-12 h-12 object-contain"
          src="https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-portal-shoes-white-clothing-zavvi-23.png"
          alt="logo"
        />
      </div>

      <button
        @click="cerrarSesion"
        class="p-2 rounded-[10px] border-0 font-bold text-(--background-app) bg-(--background-card) hover:bg-(--background-card-login) transition hover:cursor-pointer"
      >
        <i class="fa-solid fa-right-from-bracket"></i> Cerrar sesión
      </button>
    </header>

    <main class="px-6 py-10 max-w-6xl w-full mx-auto">
      <h1 class="text-3xl font-extrabold">Hola, {{ email }}</h1>
      <p class="text-white/60 mt-2">Estos son tus personajes favoritos:</p>

      <div v-if="favoritos.length === 0" class="mt-8 text-white/70">Aún no tienes favoritos</div>

      <div v-else class="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <article
          v-for="p in favoritos"
          :key="p.id"
          class="bg-(--background-card) rounded-2xl overflow-hidden ring-1 ring-white/10"
        >
          <img :src="p.image" :alt="p.name" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="font-extrabold text-lg truncate">{{ p.name }}</h3>
            <p class="text-white/70 text-sm mt-1">{{ p.status }} · {{ p.gender }}</p>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>
