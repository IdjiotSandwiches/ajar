import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ReminderList from "./reminder-list";

export default function RightPanel() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="rounded-2xl shadow-sm border-none">
        <CardContent className="p-6 text-center">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            className="w-20 h-20 rounded-full mx-auto mb-3"
          />
          <h3 className="font-semibold text-lg">Alice Potter</h3>
          <p className="text-sm text-gray-500">Student Grade 8</p>
        </CardContent>
      </Card>

      <ReminderList />
    </div>
  );
}
