'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Activity, Team } from "../columns"
import { ShowJson } from "@/components/show-json"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { trpc } from "@/lib/trpc/react"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

type UpdateDialogProps = {
  children: React.ReactNode
  team: Team
  activity: Activity
  refetch: () => Promise<void>
  value: number
  scoreId: string
}

const formSchema = z.object({
  newScore: z.coerce.number()
})

export function UpdateDialog({ children, team, activity, refetch, value, scoreId }: UpdateDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newScore: value
    },
    values: {
      newScore: value
    }
  })

  const updateScore = trpc.updateScore.useMutation({
    onSuccess: async () => {
      setDialogOpen(false)
      await refetch()
      form.reset()
      toast.success('Pontuação atualizada com sucesso')
    },
    onError: (error) => {
      toast.error('Erro ao atualizar pontuação')
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateScore.mutateAsync({
        newValue: values.newScore,
        scoreId,
      })
    } catch (error) { }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atividade {activity.number} - {activity.title}, {team.name}</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="newScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Valor
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {form.formState.isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    'Salvar'
                  )}
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}