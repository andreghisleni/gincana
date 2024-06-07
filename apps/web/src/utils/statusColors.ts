export enum StatusColors {
  PENDING = '#6c757d',
  CONFIRMED = '#3a87ad',
  CANCELED = '#d75353',
  STARTED = '#e3a62c',
  FINISHED = '#f76397',
  IN_THE_WAITING_ROOM = '#6aa300',
  AWAITING_PAYMENT = '#840000',
  PAYMENT_CONFIRMED = '#16d700',
}

export enum StatusTextColors {
  PENDING = '#ffffff', // Texto branco para fundo cinza escuro
  CONFIRMED = '#ffffff', // Texto branco para fundo azul
  CANCELED = '#ffffff', // Texto branco para fundo vermelho
  STARTED = '#000000', // Texto preto para fundo amarelo
  FINISHED = '#000000', // Texto branco para fundo rosa
  IN_THE_WAITING_ROOM = '#000000', // Texto preto para fundo verde
  AWAITING_PAYMENT = '#ffffff', // Texto branco para fundo marrom escuro
  PAYMENT_CONFIRMED = '#000000', // Texto preto para fundo verde claro
}

export enum StatusLabels {
  PENDING = 'Pendente',
  CONFIRMED = 'Confirmado',
  CANCELED = 'Cancelado',
  STARTED = 'Iniciado',
  FINISHED = 'Finalizado',
  IN_THE_WAITING_ROOM = 'Na sala de espera',
  AWAITING_PAYMENT = 'Aguardando pagamento',
  PAYMENT_CONFIRMED = 'Pagamento confirmado',
}

export const statusColors = (
  Object.keys(StatusLabels) as Array<keyof typeof StatusLabels>
).map((key) => ({
  label: StatusLabels[key],
  value: key,
  color: StatusColors[key],
}))
