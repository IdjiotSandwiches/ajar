import { Head } from "@inertiajs/react";
import { useState } from "react";
import {
    availableInstitutes,
    pendingInstitutes,
    joinedInstitutes,
} from "@/dummy-data/dummy-institutes";
import InstituteCard from "@/components/institute/card";
import LMSLayout from "@/layouts/lms-layout";
import { CourseStatusSwitch } from "@/components/lms/applications-teacher/CourseStatusSwitch";
import Filter from "@/components/lms/filter/filter";
import { instituteApplicationFilter } from "@/components/lms/filter/dictionary/institute-application";

type Status = "available" | "pending" | "joined";

export default function ApplyTeacherInstitutePage() {
    const [activeStatus, setActiveStatus] = useState<Status>("available");

    const instituteMap: Record<Status, any[]> = {
        available: availableInstitutes,
        pending: pendingInstitutes,
        joined: joinedInstitutes,
    };

    return (
        <>
            <Head title="Apply as Teacher" />

            <section>
                <div className="space-y-4">
                    <CourseStatusSwitch
                        active={activeStatus}
                        onChange={setActiveStatus}
                        labels={{
                            available: "Available",
                            pending: "Pending",
                            joined: "My Institutes",
                        }}
                        counts={{
                            available: availableInstitutes.length,
                            pending: pendingInstitutes.length,
                            joined: joinedInstitutes.length,
                        }}
                    />

                    <Filter
                        schema={instituteApplicationFilter}
                        onChange={(filters: any) => {
                            console.log(filters);
                        }}
                    />

                    {instituteMap[activeStatus].length === 0 ? (
                        <p className="py-20 text-center text-gray-500 italic">
                            Tidak ada institute pada kategori ini.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                            {instituteMap[activeStatus].map((institute: any) => (
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
    <LMSLayout title="Apply as Institute's Teachers">
        {page}
    </LMSLayout>
);
