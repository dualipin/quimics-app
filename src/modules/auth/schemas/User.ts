import z from 'zod'

export const BaseUserSchema = z
  .object({
    email: z.string().email({ message: 'Correo electrónico inválido' }),
    full_name: z.string().min(2).max(100),
    role: z.enum(['alumno', 'profesor']).default('alumno'),
  })
  .strict()

export const UserRegisterSchema = BaseUserSchema.extend({
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
}).strict()

export type TUserRegisterSchema = z.infer<typeof UserRegisterSchema>

export const UserRegisterFormSchema = UserRegisterSchema.extend({
  confirmPassword: z
    .string()
    .min(6, { message: 'La confirmación de contraseña debe tener al menos 6 caracteres' }), // Solo la validación de longitud aquí
})
  // ¡Aplica .refine() al objeto completo para comparar password y confirmPassword!
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'], // Asocia el error al campo confirmPassword
  })

export type TUserRegisterFormSchema = z.infer<typeof UserRegisterFormSchema>

export const UserLoginSchema = z
  .object({
    email: z.string().email({ message: 'Correo electrónico inválido' }),
    password: z.string().min(5, { message: 'La contraseña debe tener al menos 5 caracteres' }),
  })
  .strict()

export type TUserLoginSchema = z.infer<typeof UserLoginSchema>

export const UserSchema = BaseUserSchema.extend({
  id: z.string(),
  is_active: z.boolean(),
}).strict()

export type TUserSchema = z.infer<typeof UserSchema>

export const RecoverUserSchema = z.object({
  email: z.string().email({ message: 'Correo electrónico inválido' }),
})

export type TRecoverUserSchema = z.infer<typeof RecoverUserSchema>
