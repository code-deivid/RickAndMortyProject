<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUsuarioActual, isAutenticado } from '@/services/auth'
import { agregarFavorito, type IRMCharacter } from '@/services/favoritos'
import { useToast, POSITION } from 'vue-toastification'

const toast = useToast()

const router = useRouter()
const listaPersonajes = ref<IRMCharacter[]>([])

const getData = async () => {
  const res = await axios.get('https://rickandmortyapi.com/api/character')
  return res.data
}

onMounted(() => {
  getData().then((data) => {
    listaPersonajes.value = data.results
  })
})

const traducirGenero = (g: string) => {
  if (g === 'Male') return 'Masculino'
  if (g === 'Female') return 'Femenino'
  return 'Desconocido'
}

const traducirEstado = (s: string) => {
  if (s === 'Alive') return 'Vivo'
  if (s === 'Dead') return 'Muerto'
  return 'Desconocido'
}

const onFav = async (p: IRMCharacter) => {
  if (!isAutenticado()) {
    toast.error('Es necesario iniciar sesión para añadir a favoritos', {
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
      bodyClassName: 'mi-toast-texto', // 👈 color del texto aquí
      toastClassName: 'mi-toast-wrapper',
    })
    router.push('/login')
    return
  }

  const user = getUsuarioActual()
  if (!user) return

  const res = await agregarFavorito(user.uid, p)
  if (!res.ok) {
    alert(res.mensaje)
    return
  }

  router.push('/favoritos')
}
</script>

<template>
  <main class="min-h-screen bg-(--background-app) text-white flex flex-col w-full gap-5">
    <header class="flex justify-between items-center p-6 bg-(--background-header)">
      <div class="flex items-center gap-3">
        <img
          class="w-12 h-12 object-contain"
          src="https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-portal-shoes-white-clothing-zavvi-23.png"
          alt="logo"
        />
        <h1 class="text-(--text-header) text-2xl sm:text-3xl font-extrabold">Rick & Morty APP</h1>
      </div>

      <router-link
        to="/login"
        class="text-base sm:text-lg font-bold text-(--text-header) hover:text-(--text-header-hover)"
      >
        <i class="fa-solid fa-right-to-bracket"></i>
        Login
      </router-link>
    </header>

    <section class="px-6 pb-10">
      <div
        class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <dic
          v-for="character in listaPersonajes"
          :key="character.id"
          class="bg-(--background-card) rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition"
        >
          <img :src="character.image" :alt="character.name" class="w-full h-56 object-cover" />

          <div class="p-4 flex items-start justify-between gap-3">
            <div class="min-w-0">
              <h3 class="font-extrabold text-lg truncate">{{ character.name }}</h3>
              <p class="text-white/70 text-sm mt-1">
                <span class="font-semibold">Estado:</span> {{ traducirEstado(character.status) }}
              </p>
              <p class="text-white/70 text-sm">
                <span class="font-semibold">Género:</span> {{ traducirGenero(character.gender) }}
              </p>
            </div>

            <button
              @click="onFav(character)"
              class="border-0 rounded-xl px-3 py-2 bg-[#395121] hover:bg-[#2d3c1f] transition"
              title="Añadir a favoritos"
            >
              <i class="fa-solid fa-star text-[#facc15]"></i>
            </button>
          </div>
        </dic>
      </div>
    </section>
  </main>
</template>

<style scoped>
.mi-toast-wrapper {
  background: #d32f2f !important;
}
.mi-toast-texto,
.mi-toast-texto * {
  color: #fff !important;
}
</style>
