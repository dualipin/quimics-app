import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { RecoverUserSchema, type TRecoverUserSchema } from '../schemas/User'
import { ref } from 'vue'
import { recoverPassword } from '../services/auth-services'

export const useRecoveryPassword = () => {
  const { handleSubmit, errors, isSubmitting, defineField, meta } = useForm<TRecoverUserSchema>({
    validationSchema: toTypedSchema(RecoverUserSchema),
  })

  const [email, emailAttr] = defineField('email')
  const message = ref<string>('')
  const errorMessage = ref<string>('')

  const onSubmit = handleSubmit(async (values) => {
    errorMessage.value = ''
    message.value = ''

    try {
      message.value = await recoverPassword(values.email)

      if (message.value == 'Usuario no encontrado') {
        errorMessage.value = 'No se encontró un usuario con ese correo electrónico.'
        message.value = ''
      }
    } catch (error) {
      console.error(error)
      errorMessage.value =
        'Error al recuperar la contraseña. Por favor, inténtalo de nuevo más tarde.'
    }
  })

  return {
    handleSubmit,
    errors,
    isSubmitting,
    email,
    onSubmit,
    message,
    emailAttr,
    errorMessage,
    meta,
  }
}
