CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");

ALTER TABLE "Subscription" ADD COLUMN "serviceId" TEXT;

ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO "Service" (id, name, imagePath) VALUES ('default_service', 'Default Service', 'default.png');

UPDATE "Subscription" SET "serviceId" = 'default_service' WHERE "serviceId" IS NULL;

ALTER TABLE "Subscription" ALTER COLUMN "serviceId" SET NOT NULL;