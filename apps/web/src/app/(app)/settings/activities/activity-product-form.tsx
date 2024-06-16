'use client'

import { RouterOutput } from '@gincana/trpc'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'

export type Product =
  RouterOutput['getActivities']['activities'][0]['products'][0]

const activityProductSchema = z.object({
  products: z.array(z.object({ name: z.string(), price: z.coerce.number() })),
})

export function ActivityProductsForm({
  refetch,
  activityId,
  products,
}: {
  refetch: () => void
  activityId: string
  products: Product[]
}) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<z.infer<typeof activityProductSchema>>({
    resolver: zodResolver(activityProductSchema),
    defaultValues: {
      products: products.map(({ name, price }) => ({ name, price })),
    },
  })

  const updateProducts = trpc.updateProducts.useMutation({
    onSuccess: () => {
      form.reset()
      setIsOpen(false)
      refetch()

      toast({
        title: `Produtos atualizados com sucesso`,
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error) // eslint-disable-line no-console
      toast({
        title: `Erro ao atualizar os produtos`,
        description: error.response?.data as string,

        variant: 'destructive',
      })
    },
  })

  async function onSubmit(values: z.infer<typeof activityProductSchema>) {
    try {
      await updateProducts.mutateAsync({
        id: activityId,
        products: values.products,
      })

      console.log('values', values)
    } catch (error) { } // eslint-disable-line
  }

  useEffect(() => {
    if (!isOpen) {
      form.reset()
    }
  }, [isOpen, form])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products',
  })

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Produtos</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <h1 className="text-xl">Produtos</h1>

            <Button
              type="button"
              onClick={() =>
                append({
                  name: '',
                  price: 0,
                })
              }
            >
              Adicionar produto
            </Button>
            {form.formState.errors.products && (
              <FormMessage>
                {form.formState.errors.products.message}
              </FormMessage>
            )}

            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-4">
                <FormField
                  control={form.control}
                  name={`products.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Produto {index + 1}</FormLabel>
                      <FormControl>
                        <Input placeholder="Produto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`products.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço</FormLabel>
                      <FormControl>
                        <Input placeholder="Preço" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                >
                  Remover
                </Button>
              </div>
            ))}
            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Cadastrar'
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
