import React, { useState } from "react";
import { X } from "lucide-react";

export function AddReviewModal({
  onSubmit,
  onClose,
  teacher,
  institute,
  course,
}: {
  onSubmit: (review: {
    teacher: { rating: number; comment: string };
    institute: { rating: number; comment: string };
    course: { rating: number; comment: string };
  }) => void;
  onClose: () => void;

  teacher: { image: string; name: string; role: string };
  institute: { image: string; name: string; role: string };
  course: { image: string; name: string };
}) {
  const [step, setStep] = useState(1);

  const [teacherRating, setTeacherRating] = useState(0);
  const [teacherComment, setTeacherComment] = useState("");
  const [instituteRating, setInstituteRating] = useState(0);
  const [instituteComment, setInstituteComment] = useState("");
  const [courseRating, setCourseRating] = useState(0);
  const [courseComment, setCourseComment] = useState("");

  const handleSubmit = () => {
    onSubmit({
      teacher: { rating: teacherRating, comment: teacherComment },
      institute: { rating: instituteRating, comment: instituteComment },
      course: { rating: courseRating, comment: courseComment },
    });
  };

  const renderSection = (data: {
    title: string;
    subtitle: string;
    image: string;
    name: string;
    role?: string;
    rating: number;
    setRating: (v: number) => void;
    comment: string;
    setComment: (v: string) => void;
  }) => (
    <>
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">
        <X size={20} />
      </button>

      <h2 className="text-xl font-semibold text-gray-800 mb-1">Give Review</h2>
      <p className="text-sm text-gray-500 mb-6">{data.subtitle}</p>

      <div className="flex items-center gap-3 justify-center mb-3">
        <img src={`/${data.image || null}`} className="w-12 h-12 rounded-md object-cover" />
        <div className="text-left">
          <p className="font-medium text-gray-800">{data.name}</p>
          {data.role && <p className="text-xs text-gray-500">{data.role}</p>}
        </div>
      </div>

      <div className="flex justify-center mb-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => data.setRating(num)}
            className={`text-2xl ${
              num <= data.rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        value={data.comment}
        onChange={(e) => data.setComment(e.target.value)}
        placeholder="Type your review..."
        className="w-full border rounded-lg px-4 py-2 mb-4 text-sm h-24"
      />
    </>
  );

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#42C2FF]/40 backdrop-blur-sm z-99">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-lg relative">
        {step === 1 &&
          renderSection({
            title: "Teacher Review",
            subtitle: "Give your personal review of the teacher who taught you",
            image: teacher.image,
            name: teacher.name,
            role: teacher.role,
            rating: teacherRating,
            setRating: setTeacherRating,
            comment: teacherComment,
            setComment: setTeacherComment,
          })}

        {step === 2 &&
          renderSection({
            title: "Institute Review",
            subtitle: "Give your personal review of the institute you joined",
            image: institute.image,
            name: institute.name,
            role: institute.role,
            rating: instituteRating,
            setRating: setInstituteRating,
            comment: instituteComment,
            setComment: setInstituteComment,
          })}

        {step === 3 &&
          renderSection({
            title: "Course Review",
            subtitle: "Give your personal review of the course you have taken",
            image: course.image,
            name: course.name,
            rating: courseRating,
            setRating: setCourseRating,
            comment: courseComment,
            setComment: setCourseComment,
          })}

        <div className="flex justify-center mb-4">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-2 h-2 mx-1 rounded-full ${
                step === num ? "bg-[#42C2FF]" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 border border-gray-300 py-2 rounded-lg"
            >
              Back
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 py-2 rounded-lg"
            >
              Cancel
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 bg-[#42C2FF] text-white py-2 rounded-lg"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-[#42C2FF] text-white py-2 rounded-lg"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
