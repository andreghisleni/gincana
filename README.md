# Financeiro

## Métodos de entrada
- pix
  - taxas
- cartão
  - credito / debito
    - taxas
- Boleto
  - taxas
- dinheiro físico

## Saida
  - sem método pois nao tem taxa
  - Caso seja boleto, vincular o boleto e o comprovante
  - Se for um lançamento futuro, a data do lançamento
  - Status
    - Aguardando
    - Agendado
    - Cancelado
    - Pago


```prisma

model Transaction {
  id            String @id @default(uuid())
  clinicId      String
  clinic        Clinic @relation(fields: [clinicId], references: [id])
  incrementalId Int    @default(autoincrement())

  amount      Decimal @db.Decimal(10, 2)
  description String?

  outcomeDetails OutcomeDetails?

  incomeDetails IncomeDetails?

  status                TransactionStatus @default(PENDING)
  lastTransactionAmount Decimal?          @db.Decimal(10, 2)
  createdAt             DateTime          @default(now())
  updatedAt             DateTime          @updatedAt

  @@index([incrementalId])
  @@map("transactions")
}

model OutcomeDetails {
  id String @id @default(uuid())

  transactionId String      @unique
  transaction   Transaction @relation(fields: [transactionId], references: [id], onDelete: Cascade)

  scheduledDate  DateTime? // Data agendada para pagamento
  proofOfPayment String? // Comprovante de pagamento

  @@map("outcome_details")
}

model IncomeDetails {
  id String @id @default(uuid())

  transactionId String      @unique
  transaction   Transaction @relation(fields: [transactionId], references: [id], onDelete: Cascade)

  originalAmount Decimal @db.Decimal(10, 2)

  paymentMethodId String
  paymentMethod   PaymentMethod @relation(fields: [paymentMethodId], references: [id])

  discountId String?
  discount   Discount? @relation(fields: [discountId], references: [id])

  discountAmount Decimal? @db.Decimal(10, 2)

  scheduleItemId String?       @unique
  scheduleItem   ScheduleItem? @relation(fields: [scheduleItemId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("income_details")
}


enum TransactionStatus {
  PENDING
  SCHEDULED
  CANCELLED
  PAID
}

```


# Lançar pagamento
```
{
  amount
  description
  incomeDetails: {
    originalAmount
    paymentMethodId
    discountId
    discountAmount
    scheduleItemId
  }
}
```