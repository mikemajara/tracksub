import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function SubscriptionCard({ subscription }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{subscription.serviceName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Cost: ${subscription.cost}</p>
        <p>Billing Cycle: {subscription.billingCycle}</p>
        <p>
          Next Bill Date:{" "}
          {new Date(subscription.nextBillDate).toLocaleDateString()}
        </p>
        <Button className="mt-4">Edit</Button>
      </CardContent>
    </Card>
  );
}
