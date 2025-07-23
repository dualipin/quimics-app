import z from 'zod'

export const BaseUserSchema = z
  .object({
    email: z.string().email({ message: 'Correo electrónico inválido' }),
    full_name: z.string().min(2).max(100),
    role: z.enum(['user', 'profesor']),
  })
  .strict()

export const UserRegisterSchema = BaseUserSchema.extend({
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
}).strict()

export type TUserRegisterSchema = z.infer<typeof UserRegisterSchema>

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
