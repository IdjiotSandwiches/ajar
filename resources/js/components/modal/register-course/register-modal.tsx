import React, { useState } from "react";
import { dummyTeachers } from "@/dummy-data/dummy-teacher";
import TeacherSelectModal from "../select-teacher";
import TimeSelectModal from "./select-timetable";
import PaymentSelectModal from "./payment";

const RegisterFlow = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  if (!isOpen) return null;

  return (
    <>
      {/* STEP 1 — Select Teacher */}
      <TeacherSelectModal
        isOpen={step === 1}
        onClose={onClose}
        teachers={dummyTeachers}
        onSelect={(teacher) => {
          setSelectedTeacher(teacher);
          setStep(2);
        }}
      />

      {/* STEP 2 — Select Time */}
      <TimeSelectModal
        isOpen={step === 2}
        onClose={onClose}
        onPrevious={() => setStep(1)}
        onNext={(time) => {
          setSelectedTime(time);
          setStep(3);
        }}
      />

      {/* STEP 3 — Payment */}
      <PaymentSelectModal
        isOpen={step === 3}
        onClose={onClose}
        onPrevious={() => setStep(2)}
        onConfirm={(paymentMethod) => {
          console.log("FINAL DATA:", {
            selectedTeacher,
            selectedTime,
            paymentMethod,
          });

          alert("Registration Completed!");
          onClose();
        }}
      />
    </>
  );
};

export default RegisterFlow;
