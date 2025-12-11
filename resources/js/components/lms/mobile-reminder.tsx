import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function MobileReminder() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="rounded-2xl shadow-sm border-none">
      <CardContent className="">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center justify-between w-full"
        >
          <h3 className="font-semibold text-lg">Reminder</h3>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-96 mt-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-3">
            <ReminderItem title="Physics Homework" />
            <ReminderItem title="Teacher Amy's message" />
            <ReminderItem title="Teacher James message" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReminderItem({ title }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
      <span className="text-sm text-gray-700">{title}</span>
    </div>
  );
}
