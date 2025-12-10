import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function MobileReminder() {
  return (
    <Card className="rounded-2xl shadow-sm border-none">
      <CardContent className="">
        <h3 className="font-semibold text-lg mb-4">Reminder</h3>

        <div className="flex flex-col gap-3">
          <ReminderItem title="Physics Homework" />
          <ReminderItem title="Teacher Amy's message" />
          <ReminderItem title="Teacher James message" />
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
