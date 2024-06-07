'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { nativeClient } from '@/lib/trpc/client'

import { RegisterFormSchema, registerFormSchema } from './form-schema'

export function RegisterForm() {
  const { toast } = useToast()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      userName: '',
      password: '',
    },
  })

  async function handleRegister(data: RegisterFormSchema) {
    const { name, userName, password } = data

    try {
      const response = await nativeClient.createUser.mutate({
        name,
        userName,
        password,
      })

      console.log(response)

      if (response.id) {
        toast({
          title: 'Bem-vindo!',
          description: 'Usuário criado com sucesso',
        })
        router.push('/')
      }
    } catch (error) {
      toast({
        title: 'Erro na autenticação',
        description: JSON.stringify(error, null, 2),
        variant: 'destructive',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" {...register('name')} />
        {errors.name && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="userName">Nome de usuário</Label>
        <Input id="userName" type="userName" {...register('userName')} />
        {errors.userName && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {errors.userName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register('password')} />
        {errors.password && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <LogIn className="mr-2 h-4 w-4" />
        )}
        Register
      </Button>
    </form>
  )
}
