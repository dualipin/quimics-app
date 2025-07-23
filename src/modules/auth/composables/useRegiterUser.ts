import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { UserRegisterFormSchema, type TUserRegisterFormSchema } from '../schemas/User'
import { registerUser } from '../services/auth-services'
import { useAuthStore } from '../stores/auth-store'
import { useToastStore } from '@/stores'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export const useRegisterUser = () => {
  const auth = useAuthStore()
  const toast = useToastStore()
  const router = useRouter()
  const { defineField, handleSubmit, errors, isSubmitting, meta } =
    useForm<TUserRegisterFormSchema>({
      validationSchema: toTypedSchema(UserRegisterFormSchema),
      initialValues: {
        role: 'alumno',
      },
    })

  const [role] = defineField('role')
  const [email, emailAttr] = defineField('email')
  const [password, passwordAttr] = defineField('password')
  const [full_name, full_nameAttr] = defineField('full_name')
  const [confirmPasswordField] = defineField('confirmPassword')

  const isMatchingPassword = computed(() => {
    return confirmPasswordField.value && password.value === confirmPasswordField.value
  })

  const onSubmit = handleSubmit(async (values) => {
    isSubmitting.value = true
    console.log('Submitting registration:', values)
    try {
      const response = await registerUser({
        email: email.value,
        password: password.value,
        role: role.value,
        full_name: values.full_name,
      })
      toast.show('Usuario registrado exitosamente', 'success')
      auth.user = response
      router.push({ name: 'games' })
    } catch (error) {
      if (error instanceof Error) {
        toast.show(error.message, 'error')
      } else {
        toast.show('Error al registrar el usuario', 'error')
      }
    } finally {
      isSubmitting.value = false
    }
  })

  return {
    role,
    isMatchingPassword,
    email,
    password,
    confirmPasswordField,
    emailAttr,
    passwordAttr,
    errors,
    isSubmitting,
    onSubmit,
    meta,
    full_name,
    full_nameAttr,
  }
}
