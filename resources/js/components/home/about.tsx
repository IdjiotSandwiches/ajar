import React from "react";

export default function LearningToTeachSection() {
    return (
        <section className="py-16 px-6 md:px-12 bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-8">
                Learning to teach through Ajar
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="bg-[#3ABEFF]/5 p-6 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-gray-700 mb-2">👩‍🏫 Teacher</h3>
                        <p className="text-sm text-gray-600">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt recusandae velit aperiam nulla temporibus cumque unde blanditiis earum perferendis? In obcaecati maxime corrupti reiciendis iste, libero harum animi suscipit omnis a dolores, repellat distinctio, voluptatum aliquid earum? Consequatur odit optio molestiae eos odio eaque, qui, totam expedita assumenda amet porro.
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
