"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Select, { StylesConfig } from "react-select";
import { addSubscription } from "@/app/actions";
import { Service } from "@prisma/client";
import { useTheme } from "next-themes";

const selectStyles = (theme: string): StylesConfig => ({
  control: (styles) => ({
    ...styles,
    backgroundColor: theme === "dark" ? "hsl(var(--background))" : "white",
    borderColor: theme === "dark" ? "hsl(var(--border))" : styles.borderColor,
    "&:hover": {
      borderColor: theme === "dark" ? "hsl(var(--border))" : styles.borderColor,
    },
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: theme === "dark" ? "hsl(var(--background))" : "white",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isFocused
      ? theme === "dark"
        ? "hsl(var(--accent))"
        : styles.backgroundColor
      : isSelected
      ? theme === "dark"
        ? "hsl(var(--accent))"
        : styles.backgroundColor
      : "transparent",
    color: theme === "dark" ? "hsl(var(--foreground))" : styles.color,
    ":active": {
      backgroundColor:
        theme === "dark"
          ? "hsl(var(--accent))"
          : styles[":active"]?.backgroundColor,
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: theme === "dark" ? "hsl(var(--foreground))" : styles.color,
  }),
  input: (styles) => ({
    ...styles,
    color: theme === "dark" ? "hsl(var(--foreground))" : styles.color,
  }),
});

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
  const { theme } = useTheme();

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
        onChange={(selectedOption: any) =>
          setFormData({ ...formData, serviceId: selectedOption?.value || "" })
        }
        placeholder="Select a service"
        styles={selectStyles(theme || "light")}
        theme={(baseTheme) => ({
          ...baseTheme,
          colors: {
            ...baseTheme.colors,
            primary:
              theme === "dark"
                ? "hsl(var(--primary))"
                : baseTheme.colors.primary,
            primary75:
              theme === "dark"
                ? "hsl(var(--primary))"
                : baseTheme.colors.primary75,
            primary50:
              theme === "dark"
                ? "hsl(var(--primary))"
                : baseTheme.colors.primary50,
            primary25:
              theme === "dark"
                ? "hsl(var(--primary))"
                : baseTheme.colors.primary25,
          },
        })}
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
        onChange={(selectedOption: any) =>
          setFormData({
            ...formData,
            billingCycle: selectedOption?.value || "monthly",
          })
        }
        placeholder="Billing Cycle"
        styles={selectStyles(theme || "light")}
        theme={(baseTheme) => ({
          ...baseTheme,
          colors: {
            ...baseTheme.colors,
            primary:
              theme === "dark"
                ? "hsl(var(--primary))"
                : baseTheme.colors.primary,
            primary75:
              theme === "dark"
                ? "hsl(var(--primary))"
                : baseTheme.colors.primary75,
            primary50:
              theme === "dark"
                ? "hsl(var(--primary))"
                : baseTheme.colors.primary50,
            primary25:
              theme === "dark"
                ? "hsl(var(--primary))"
                : baseTheme.colors.primary25,
          },
        })}
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
