"use client";
import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Subscription, Service } from "@prisma/client";

type SubscriptionWithService = Subscription & { service?: Service };

interface CalendarProps {
  subscriptions: SubscriptionWithService[];
}

const Calendar: React.FC<CalendarProps> = ({ subscriptions }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const startDayOfWeek = startOfMonth(currentMonth).getDay();

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const getSubscriptionsForDate = (date: Date) => {
    return subscriptions.filter((sub) =>
      isSameDay(new Date(sub.nextBillDate), date)
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button onClick={nextMonth} className="p-2">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className={`text-center font-medium ${
              isSameDay(today, new Date()) && format(today, "EEE") === day
                ? "font-bold"
                : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="h-24"></div>
        ))}
        {daysInMonth.map((date) => {
          const daySubscriptions = getSubscriptionsForDate(date);
          const isToday = isSameDay(date, today);
          return (
            <div
              key={date.toString()}
              className={`h-24 border p-1 ${
                isSameMonth(date, currentMonth)
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-100 dark:bg-gray-700"
              } ${isToday ? "border-blue-500 border-2" : ""}`}
            >
              <div className={`text-right ${isToday ? "font-bold" : ""}`}>
                {format(date, "d")}
              </div>
              <div className="mt-1">
                {daySubscriptions.map((sub) => (
                  <img
                    key={sub.id}
                    src={`/logos/${sub.service?.imagePath || "default.png"}`}
                    alt={sub.service?.name || "Unknown Service"}
                    className="w-6 h-6 inline-block mr-1"
                    title={`${sub.service?.name || "Unknown Service"} - $${
                      sub.cost
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
