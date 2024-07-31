-- CreateTable
CREATE TABLE "activity_products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "activity_id" TEXT NOT NULL,

    CONSTRAINT "activity_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activity_products" ADD CONSTRAINT "activity_products_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
