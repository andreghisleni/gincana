import { CaretSortIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { CheckIcon, Loader2, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { ClientForm } from '@/app/(app)/clients/client-form'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Client, useClients } from '@/hooks/clients.hook'
import { nativeClient } from '@/lib/trpc/client'
import { cn } from '@/lib/utils'

import { Input } from './ui/input'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

type ClientInputProps = {
  clientId?: string
  setClientId: (clientId: string) => void
  disabled?: boolean
  placeholder?: string
  showScheduleItens?: boolean
  showConsultations?: boolean
}

export function ClientInput({
  clientId,
  setClientId,
  disabled,
  placeholder,
  showConsultations,
  showScheduleItens,
}: ClientInputProps) {
  const [open, setOpen] = useState(false)
  const [showNewClientDialog, setShowNewClientDialog] = useState(false)

  const { clients, isLoading, refetch, name, setName } = useClients()

  const [selectClient, setSelectedClient] = useState<Client | null>(null)

  useEffect(() => {
    async function getClient() {
      if (clientId) {
        const client = clients.find((client) => client.id === clientId)
        if (!client) {
          const fetchClient = await nativeClient.getClient.query({
            id: clientId,
          })

          if (fetchClient.client) {
            setSelectedClient(fetchClient.client)
          }
        }
      }
    }

    getClient()
  }, [clientId, clients])

  const selectedClient = useMemo(() => {
    return clients.find((client) => client.id === clientId) || selectClient
  }, [clients, clientId, selectClient])

  function setClient(clientId: string) {
    setClientId(clientId)
    setOpen(false)
  }

  return (
    <>
      <Dialog open={showNewClientDialog} onOpenChange={setShowNewClientDialog}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a client"
              className={cn('w-full justify-between')}
              disabled={disabled}
            >
              {/* {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
              {selectedClient
                ? `${selectedClient.name} - ${selectedClient.phone}`
                : placeholder || 'Selecione um paciente'}
              <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <ScrollArea>
              <Command>
                <CommandList>
                  <div className="flex items-center border-b px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <Input
                      className={
                        'flex h-11 w-full rounded-md border-none bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground hover:border-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50'
                      }
                      placeholder="Buscar paciente..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <CommandEmpty>Nem um paciente encontrado.</CommandEmpty>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {clients.map((client) => (
                    <CommandItem
                      key={client.id}
                      onSelect={() => setClient(client.id)}
                      className="text-sm"
                    >
                      {client.name}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          selectedClient?.id === client.id
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandList>
                <CommandSeparator />
                <CommandList>
                  <CommandGroup>
                    <DialogTrigger asChild>
                      <CommandItem
                        onSelect={() => {
                          setOpen(false)
                          setShowNewClientDialog(true)
                        }}
                      >
                        <PlusCircledIcon className="mr-2 h-5 w-5" />
                        Cadastrar paciente
                      </CommandItem>
                    </DialogTrigger>
                  </CommandGroup>
                </CommandList>
              </Command>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </PopoverContent>
        </Popover>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastrar paciente</DialogTitle>
          </DialogHeader>
          <ClientForm
            isOpen={showNewClientDialog}
            setIsOpen={setShowNewClientDialog}
            refetch={(client) =>
              (async () => {
                refetch()
                client && setClientId(client.id)
              })()
            }
          />
        </DialogContent>
      </Dialog>
      <div className="flex flex-col">
        {showConsultations && (
          <div className="">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Consultas</h2>
            </div>
            <div className="flex flex-col text-sm text-muted-foreground">
              {selectedClient?.consultations
                .map(
                  (consultation) =>
                    consultation.startedAt &&
                    format(new Date(consultation.startedAt), 'dd/MM/yyyy'),
                )
                .join(', ')}

              {selectedClient?.consultations.length === 0 && (
                <div className="text-muted-foreground">
                  Nenhuma consulta cadastrada.
                </div>
              )}
            </div>
          </div>
        )}
        {showScheduleItens && (
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Agendamentos cancelados</h2>
            </div>
            <div className="flex flex-col text-sm text-muted-foreground">
              {selectedClient?.scheduleItens
                .filter((scheduleItem) => !!scheduleItem.canceledAt)
                .map(
                  (scheduleItem) =>
                    scheduleItem.startAt &&
                    format(new Date(scheduleItem.startAt), 'dd/MM/yyyy'),
                )
                .join(', ')}
              {selectedClient?.scheduleItens.filter(
                (scheduleItem) => !!scheduleItem.canceledAt,
              ).length === 0 && (
                <div className="text-muted-foreground">
                  Nenhum agendamento cancelado.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
