import { PrismaClient } from "@prisma/client";
import AddSubscriptionForm from "@/components/add-subscription-form";
import Calendar from "@/components/subscription-calendar";

const prisma = new PrismaClient();

export default async function Home() {
  const services = await prisma.service.findMany();
  const subscriptions = await prisma.subscription.findMany({
    include: { service: true },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Subscription Tracker</h1>
      <AddSubscriptionForm services={services} />
      <Calendar subscriptions={subscriptions} />
    </main>
  );
}
