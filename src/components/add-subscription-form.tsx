"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Select from "react-select";
import { addSubscription } from "@/app/actions";
import { Service } from "@prisma/client";

export default function AddSubscriptionForm({
  services,
}: {
  services: Service[];
}) {
  const [formData, setFormData] = useState({
    serviceId: "",
    cost: "",
    billingCycle: "monthly",
    nextBillDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addSubscription(formData);
    setFormData({
      serviceId: "",
      cost: "",
      billingCycle: "monthly",
      nextBillDate: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <Select
        options={services.map((service) => ({
          value: service.id,
          label: service.name,
        }))}
        onChange={(selectedOption) =>
          setFormData({ ...formData, serviceId: selectedOption?.value || "" })
        }
        placeholder="Select a service"
      />
      <Input
        type="number"
        placeholder="Cost"
        value={formData.cost}
        onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
      />
      <Select
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly" },
        ]}
        onChange={(selectedOption) =>
          setFormData({
            ...formData,
            billingCycle: selectedOption?.value || "monthly",
          })
        }
        placeholder="Billing Cycle"
      />
      <Input
        type="date"
        value={formData.nextBillDate}
        onChange={(e) =>
          setFormData({ ...formData, nextBillDate: e.target.value })
        }
      />
      <Button type="submit">Add Subscription</Button>
    </form>
  );
}
