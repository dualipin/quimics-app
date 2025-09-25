import { UserLoginSchema, type TUserLoginSchema } from '../schemas/User'
import { useAuthStore } from '../stores/auth-store'
import { useForm } from 'vee-validate'
import { useToastStore } from '@/stores'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'

export const useLoginUser = () => {
  const auth = useAuthStore()
  const toast = useToastStore()
  const router = useRouter()

  const { defineField, handleSubmit, errors, isSubmitting, meta } = useForm<TUserLoginSchema>({
    validationSchema: toTypedSchema(UserLoginSchema),
  })

  const [email, emailAttr] = defineField('email')
  const [password, passwordAttr] = defineField('password')

  const onSubmit = handleSubmit(async (values) => {
    isSubmitting.value = true
    try {
      await auth.login({
        email: values.email,
        password: values.password,
      })
      toast.show('Inicio de sesión exitoso')
      router.push({ name: 'games' })
    } catch (error) {
      if (error instanceof Error) {
        toast.show(error.message, 'error')
      } else {
        toast.show('Error al iniciar sesión', 'error')
      }
    } finally {
      isSubmitting.value = false
    }
  })

  return {
    email,
    password,
    emailAttr,
    passwordAttr,
    errors,
    isSubmitting,
    onSubmit,
    meta,
  }
}

export const useLoginUsers = () => {
  const authStore = useAuthStore()
  const toastStore = useToastStore()

  const { defineField, errors, isSubmitting, handleSubmit, meta, isValidating, submitForm } =
    useForm<TUserLoginSchema>({
      validationSchema: toTypedSchema(UserLoginSchema),
    })

  const [email, emailAttr] = defineField('email')
  const [password, passwordAttr] = defineField('password')

  const loginUser = handleSubmit(async (e) => {
    try {
      await authStore.login({
        email: e.email,
        password: e.password,
      })
      toastStore.show('Inicio de sesión exitoso')
    } catch (error) {
      if (error instanceof Error) {
        toastStore.show(error.message, 'error')
      } else {
        toastStore.show('Error al iniciar sesión', 'error')
      }
    } finally {
      submitForm((e: TUserLoginSchema) => {
        email.value = e.email
        password.value = e.password
      })
    }
  })

  return {
    authStore,
    email,
    password,
    errors,
    isSubmitting,
    loginUser,
    emailAttr,
    passwordAttr,
    isValidating,
    isValid: meta.value.valid,
  }
}
