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
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button onClick={prevMonth} className="p-2">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button onClick={nextMonth} className="p-2">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4 mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center font-medium bg-neutral-200 dark:bg-neutral-700 rounded-full py-1"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: startDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square"></div>
        ))}
        {daysInMonth.map((date) => {
          const daySubscriptions = getSubscriptionsForDate(date);
          const isToday = isSameDay(date, today);
          return (
            <div
              key={date.toString()}
              className={`aspect-square p-2 rounded-3xl overflow-hidden relative font-light text-md sm:text-xl
                ${
                  isSameMonth(date, currentMonth)
                    ? "bg-neutral-100 dark:bg-neutral-800"
                    : "bg-neutral-50 dark:bg-neutral-900"
                }
                ${isToday ? "font-extrabold" : ""}
              `}
            >
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                {format(date, "d")}
              </div>
              <div className="h-full flex flex-wrap content-start justify-center gap-1 pt-1 pb-6 overflow-y-auto">
                {daySubscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="w-6 h-6 flex-shrink-0"
                    title={`${sub.service?.name || "Unknown Service"} - $${
                      sub.cost
                    }`}
                  >
                    <img
                      src={`/logos/${sub.service?.imagePath || "default.png"}`}
                      alt={sub.service?.name || "Unknown Service"}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
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
