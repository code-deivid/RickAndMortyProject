import { auth } from '@/firebase/config'
import { ref } from 'vue'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
    type User,
} from 'firebase/auth'

export const usuarioActual = ref<User | null>(null)

onAuthStateChanged(auth, (user) => {
    usuarioActual.value = user
})

// Helpers
export const getUsuarioActual = (): User | null => usuarioActual.value
export const isAutenticado = (): boolean => usuarioActual.value !== null


export const registrar = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user


        await sendEmailVerification(user, {
            url: window.location.origin + '/login',
        })

        return {
            ok: true,
            mensaje: 'Usuario creado. Revisa tu correo para verificar la cuenta.',
            usuario: user,
        }
    } catch (e) {
        console.error('❌ Error al registrar usuario:', e)
        return {
            ok: false,
            mensaje: 'Error al crear el usuario',
            usuario: null,
        }
    }
}

// Login + bloquear si no está verificado
export const login = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        if (!user.emailVerified) {

            await signOut(auth)
            return {
                ok: false,
                mensaje: 'Debes verificar tu email antes de iniciar sesión. Revisa tu bandeja.',
                usuario: null,
            }
        }

        return {
            ok: true,
            mensaje: 'Sesión iniciada correctamente',
            usuario: user,
        }
    } catch (e) {
        console.error('❌ Error al iniciar sesión:', e)
        return {
            ok: false,
            mensaje: 'Email o contraseña incorrectos',
            usuario: null,
        }
    }
}

// Logout
export const logout = async () => {
    try {
        await signOut(auth)
        return { ok: true }
    } catch (e) {
        console.error('❌ Error al cerrar sesión:', e)
        return { ok: false }
    }
}
