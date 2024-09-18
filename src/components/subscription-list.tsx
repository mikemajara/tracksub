import { prisma } from "@/lib/prisma";
import SubscriptionCard from "./subscription-card";

export default async function SubscriptionList() {
  const subscriptions = await prisma.subscription.findMany();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {subscriptions.map((subscription) => (
        <SubscriptionCard key={subscription.id} subscription={subscription} />
      ))}
    </div>
  );
}
