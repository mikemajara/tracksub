"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addSubscription(formData: {
  serviceId: string;
  cost: string;
  billingCycle: string;
  nextBillDate: string;
}) {
  const subscription = await prisma.subscription.create({
    data: {
      serviceId: formData.serviceId,
      cost: parseFloat(formData.cost),
      billingCycle: formData.billingCycle,
      nextBillDate: new Date(formData.nextBillDate),
    },
  });
  return subscription;
}
