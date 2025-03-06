-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('SYSTEM_ADMIN', 'BUSINESS_ADMIN', 'BUSINESS_USER', 'BUSINESS_CUSTOM_ROLE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "firebaseAuthId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRoles" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "business_id" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_firebaseAuthId_key" ON "users"("firebaseAuthId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
