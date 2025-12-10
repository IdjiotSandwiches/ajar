import React from "react";
import ReminderItem from "./reminder-item";
import { Card, CardContent } from "@/components/ui/card";

export default function ReminderList() {
    const reminders = [
        "Physics Homework",
        "Teacher Amy's message",
        "Teacher James message",
    ];

    return (
        <Card className="rounded-2xl shadow-sm border-none">
            <CardContent className="">
                <h3 className="font-semibold text-lg mb-4">Reminder</h3>

                <div className="flex flex-col gap-3">
                    {reminders.map((r, i) => (
                        <ReminderItem key={i} title={r} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
