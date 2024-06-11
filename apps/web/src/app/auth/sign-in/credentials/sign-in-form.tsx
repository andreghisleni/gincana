'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

const signInFormSchema = z.object({
  userName: z.string().min(1, { message: 'Use admin' }),
  password: z.string().min(1, { message: 'Use 123456' }),
})

type SignInFormSchema = z.infer<typeof signInFormSchema>

export function SignInForm({ user, pass }: { user?: string; pass?: string }) {
  const { toast } = useToast()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      userName: user || '',
      password: pass || '',
    },
  })

  async function handleSignIn(data: SignInFormSchema) {
    const { userName, password } = data

    const response = await signIn('credentials', {
      userName,
      password,
      redirect: false,
      callbackUrl: '/',
    })

    if (response?.error) {
      toast({
        title: 'Erro na autenticação',
        description: response.error,
        variant: 'destructive',
      })
    }

    if (response?.error === null) {
      toast({
        title: 'Bem-vindo!',
        description: 'Você foi autenticado com sucesso.',
      })

      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
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
        Sign in
      </Button>
    </form>
  )
}
