-- CreateTable
CREATE TABLE "report_motives" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "descriptiion" TEXT,
    "discount_pontuation" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "report_motives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "motive_id" TEXT NOT NULL,
    "spy_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "report_motives_name_key" ON "report_motives"("name");

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_motive_id_fkey" FOREIGN KEY ("motive_id") REFERENCES "report_motives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_spy_id_fkey" FOREIGN KEY ("spy_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
