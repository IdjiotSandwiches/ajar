import { Head } from "@inertiajs/react";
import { useState } from "react";
import {
    availableInstitutes,
    pendingInstitutes,
    joinedInstitutes,
} from "@/dummy-data/dummy-institutes";
import InstituteCard from "@/components/institute/card";
import LMSLayout from "@/layouts/lms-layout";
import Filter from "@/components/lms/filter/institute/filter-mycourses";

type Status = "available" | "pending" | "joined";

function StatusTabs({
    active,
    onChange,
    counts,
}: {
    active: Status;
    onChange: (status: Status) => void;
    counts: Record<Status, number>;
}) {
    return (
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
            {(["available", "pending", "joined"] as Status[]).map((status) => (
                <button
                    key={status}
                    onClick={() => onChange(status)}
                    className={`
                        px-4 py-2 text-sm font-medium rounded-md transition
                        ${
                            active === status
                                ? "bg-white shadow text-gray-800"
                                : "text-gray-500 hover:text-gray-700"
                        }
                    `}
                >
                    {status === "available" && "Available"}
                    {status === "pending" && "Pending"}
                    {status === "joined" && "My Institutes"}
                    <span className="ml-1 text-xs text-gray-400">
                        ({counts[status]})
                    </span>
                </button>
            ))}
        </div>
    );
}

export default function ApplyTeacherInstitutePage() {
    const [activeStatus, setActiveStatus] = useState<Status>("available");

    const dataMap = {
        available: availableInstitutes,
        pending: pendingInstitutes,
        joined: joinedInstitutes,
    };

    return (
        <>
            <Head title="Apply as Teacher" />

            <section className="min-h-screen bg-[#F7FDFD]">
                <div className="space-y-6">
                    <header>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Apply to Become Institute's Teachers
                        </h1>
                        <p className="text-gray-500">
                            Ajukan diri Anda sebagai guru di institute pilihan.
                        </p>
                    </header>

                    <StatusTabs
                        active={activeStatus}
                        onChange={setActiveStatus}
                        counts={{
                            available: availableInstitutes.length,
                            pending: pendingInstitutes.length,
                            joined: joinedInstitutes.length,
                        }}
                    />

                    <Filter />

                    {dataMap[activeStatus].length === 0 ? (
                        <p className="py-20 text-center text-gray-500 italic">
                            Tidak ada institute pada kategori ini.
                        </p>
                    ) : (
                        <div
                            className="
                                grid grid-cols-1 gap-6
                                sm:grid-cols-2
                                lg:grid-cols-3
                                xl:grid-cols-4
                                2xl:grid-cols-5
                            "
                        >
                            {dataMap[activeStatus].map((institute: any) => (
                                <InstituteCard
                                    key={institute.id}
                                    institute={institute}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

ApplyTeacherInstitutePage.layout = (page: React.ReactNode) => (
    <LMSLayout title="Apply as Institute's Teachers">{page}</LMSLayout>
);

