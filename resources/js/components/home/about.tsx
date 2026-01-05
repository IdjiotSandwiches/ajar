import React from "react";

const features = [
    {
        title: "Live Teaching Experience",
        description:
            "Teach and learn through scheduled live sessions that enable real-time interaction between teachers and students in technology and design."
    },
    {
        title: "Replay Learning Sessions",
        description:
            "All live classes are recorded, allowing students to revisit lessons anytime to strengthen understanding and catch up on missed sessions."
    },
    {
        title: "Structured Courses by Institutions",
        description:
            "Institutions curate well-designed courses to ensure learning paths are structured, relevant, and aligned with industry needs."
    },
    {
        title: "Flexible Learning Modes",
        description:
            "Students can choose between private sessions or group classes based on their learning preferences and goals."
    },
    {
        title: "Empowering Educators",
        description:
            "Teachers can manage schedules, deliver live classes, and focus on teaching without worrying about technical complexity."
    },
    {
        title: "Collaborative Learning Ecosystem",
        description:
            "A unified platform where institutions, teachers, and students collaborate to create meaningful learning experiences."
    }
];

export default function LearningToTeachSection() {
    return (
        <section className="pt-8 pb-4 md:pt-16 md:pb-8 px-4 sm:px-6 md:px-12 bg-white dark:bg-[#222831]">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-8">
                Learning to teach through Ajar
            </h2>

            <div className="grid lg:grid-cols-3 gap-6">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className="bg-[#3ABEFF]/5 p-6 rounded-lg shadow-sm dark:shadow-[#ffffff]/20"
                    >
                        <h3 className="font-semibold text-gray-700 dark:text-white mb-2">
                            {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-white/80">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
