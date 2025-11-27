"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import DynamicModal from "@/components/modal/modal";
import { dummyTeachers } from "@/dummy-data/dummy-teacher";

export default function TeacherApplicationsPage() {
    const formattedTeachers = dummyTeachers.map((teacher, index) => ({
        id: index + 1,
        name: teacher.name,
        description: teacher.description,
        category: "Technology",
        submittedAt: new Date().toLocaleString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }),
        avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    }));

    const [applications, setApplications] = useState(formattedTeachers);
    const [showModal, setShowModal] = useState(false);
    const [selectedAction, setSelectedAction] = useState<{
        type: "accept" | "reject";
        name: string;
    } | null>(null);

    const handleAction = (type: "accept" | "reject", name: string) => {
        setSelectedAction({ type, name });
        setShowModal(true);
    };

    const confirmAction = () => {
        if (selectedAction) {
            setApplications((prev) =>
                prev.filter((t) => t.name !== selectedAction.name)
            );
        }
        setShowModal(false);
    };

    return (
        <div className="min-h-screen bg-[#f9fdfd] flex flex-col px-3 sm:px-6 py-6">
            <div className="max-w-6xl mx-auto w-full bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl p-4 sm:p-6 md:p-10 mt-4 sm:mt-10">
                
                <h1 className="text-xl sm:text-2xl font-semibold text-center text-[#42C2FF] mb-6 sm:mb-10 cursor-default">
                    Teacher Applications
                </h1>
                <div className="md:hidden flex flex-col gap-4">
                    {applications.map((app) => (
                        <div
                            key={app.id}
                            className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <img
                                    src={app.avatar}
                                    alt={app.name}
                                    className="w-12 h-12 rounded-full border border-gray-300 object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{app.name}</p>
                                    <p className="text-xs text-gray-500 -mt-1">
                                        {app.category}
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-2">
                                I applied to be a Teacher at Ajar, I am a specialist in{" "}
                                <span className="font-medium">
                                    Artificial Intelligence and Network
                                </span>
                            </p>

                            <p className="text-xs text-gray-500 mb-3">
                                <span className="font-medium">Submitted:</span>{" "}
                                {app.submittedAt}
                            </p>

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => handleAction("accept", app.name)}
                                    className="p-2 bg-[#42C2FF] hover:bg-[#42C2FF]/90 text-white rounded-md shadow-sm"
                                >
                                    <Check size={16} />
                                </button>
                                <button
                                    onClick={() => handleAction("reject", app.name)}
                                    className="p-2 bg-[#FF5C5C] hover:bg-[#E04343] text-white rounded-md shadow-sm"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-lg text-gray-700 text-sm">
                        <thead className="bg-[#42C2FF]/10 border-b border-gray-200">
                            <tr>
                                <th className="py-3 px-4 text-left font-medium">
                                    Teacher Applications
                                </th>
                                <th className="py-3 px-4 text-center font-medium w-32">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {applications.map((app, index) => (
                                <tr
                                    key={app.id}
                                    className={`border-b hover:bg-[#42C2FF]/10 transition ${
                                        index % 2 === 0 ? "bg-[#f9fcff]" : "bg-white"
                                    }`}
                                >
                                    <td className="py-4 px-4">
                                        <div className="flex items-start gap-4">
                                            <img
                                                src={app.avatar}
                                                alt={app.name}
                                                className="w-10 h-10 rounded-full object-cover border border-gray-300"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-800">
                                                    {app.name}
                                                </p>
                                                <p className="text-gray-600 text-sm mb-1">
                                                    I applied to be a Teacher at Ajar, I am a
                                                    specialist in{" "}
                                                    <span className="font-medium">
                                                        Artificial Intelligence and Network
                                                    </span>
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-medium">Category:</span>{" "}
                                                    {app.category}
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-medium">Submitted:</span>{" "}
                                                    {app.submittedAt}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleAction("accept", app.name)}
                                                className="p-2 bg-[#42C2FF] hover:bg-[#42C2FF]/90 text-white rounded-md shadow-sm transition"
                                            >
                                                <Check size={16} strokeWidth={2.5} />
                                            </button>
                                            <button
                                                onClick={() => handleAction("reject", app.name)}
                                                className="p-2 bg-[#FF5C5C] hover:bg-[#E04343] text-white rounded-md shadow-sm transition"
                                            >
                                                <X size={16} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <DynamicModal
                type="confirmation"
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmAction}
                description={
                    selectedAction
                        ? `Are you sure you want to ${
                              selectedAction.type === "accept" ? "accept" : "reject"
                          } ${selectedAction.name}'s application?`
                        : ""
                }
            />
        </div>
    );
}

TeacherApplicationsPage.layout = (page: React.ReactNode) => (
    <AppLayout>{page}</AppLayout>
);
