-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'RANGE');

-- CreateEnum
CREATE TYPE "DatasetStatus" AS ENUM ('DRAFT', 'PENDING_UPLOAD', 'PENDING_REVIEW', 'CONFIRMED');

-- CreateTable
CREATE TABLE "Account" (
    "account_id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "Session" (
    "session_id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT true,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "audit_log_id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "log" JSONB,
    "user_id" TEXT,
    "user_ip" TEXT,
    "type" TEXT,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("audit_log_id")
);

-- CreateTable
CREATE TABLE "Datasets" (
    "dataset_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "description" TEXT,
    "status" "DatasetStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Datasets_pkey" PRIMARY KEY ("dataset_id")
);

-- CreateTable
CREATE TABLE "DataTemplates" (
    "datatemplate_id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "template" JSONB,

    CONSTRAINT "DataTemplates_pkey" PRIMARY KEY ("datatemplate_id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "setting_id" SERIAL NOT NULL,
    "setting" JSONB,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("setting_id")
);

-- CreateTable
CREATE TABLE "Run" (
    "run_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "dataset_id" INTEGER NOT NULL,

    CONSTRAINT "Run_pkey" PRIMARY KEY ("run_id")
);

-- CreateTable
CREATE TABLE "_DatasetsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerId_providerAccountId_key" ON "Account"("providerId", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_accessToken_key" ON "Session"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "_DatasetsToUser_AB_unique" ON "_DatasetsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DatasetsToUser_B_index" ON "_DatasetsToUser"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_dataset_id_fkey" FOREIGN KEY ("dataset_id") REFERENCES "Datasets"("dataset_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DatasetsToUser" ADD CONSTRAINT "_DatasetsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Datasets"("dataset_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DatasetsToUser" ADD CONSTRAINT "_DatasetsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
