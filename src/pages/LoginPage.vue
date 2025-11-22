<template>
	<div class="q-pa-md row items-center justify-center" style="min-height: 70vh">
		<q-card style="max-width: 480px; width: 100%">
			<q-card-section>
				<div class="text-h6">Iniciar sesión</div>
			</q-card-section>

			<q-card-section>
				<q-input v-model="email" label="Email" type="email" dense autofocus />
				<q-input v-model="password" label="Contraseña" type="password" dense class="q-mt-sm" />
			</q-card-section>

			<q-card-actions align="right">
				<q-btn label="Entrar" color="primary" @click="onSubmit" :loading="loading" />
			</q-card-actions>

			<q-banner v-if="error" class="q-ma-sm" dense color="negative">{{ error }}</q-banner>
		</q-card>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authApi from 'src/services/authApi'

const email = ref('guerrero@peru.com')
const password = ref('12345678')
const loading = ref(false)
const error = ref(null)

const router = useRouter()

const onSubmit = async () => {
	error.value = null
	loading.value = true
	try {
		await authApi.signin({ email: email.value, password: password.value })
		// Al autenticarse, ir a DigimonPage
		router.push('/digimon')
	} catch (err) {
		error.value = err.message || 'Error al iniciar sesión'
	} finally {
		loading.value = false
	}
}
</script>

<style scoped>
.q-card { padding: 8px; }
</style>
