import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const subscriptions = await prisma.subscription.findMany();
  return NextResponse.json(subscriptions);
}

export async function POST(request: Request) {
  const body = await request.json();
  const subscription = await prisma.subscription.create({
    data: {
      serviceName: body.serviceName,
      cost: parseFloat(body.cost),
      billingCycle: body.billingCycle,
      nextBillDate: new Date(body.nextBillDate),
    },
  });
  return NextResponse.json(subscription);
}
