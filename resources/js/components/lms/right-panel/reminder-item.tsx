import React from "react";

interface ReminderItemProps {
  title: string;
}

export default function ReminderItem({ title }: ReminderItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
      <span className="text-sm text-gray-700">{title}</span>
    </div>
  );
}
