import { useState } from 'react';
import TeacherSelectModal from './select-teacher';
import PaymentSelectModal from '../../../pages/courses/payment';
import TimeSelectModal from './select-timetable';

const RegisterFlow = ({ isOpen, onClose }: any) => {
    const [step, setStep] = useState(1);

    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    if (!isOpen) return null;

    return (
        <>
            <TeacherSelectModal
                isOpen={step === 1}
                onClose={onClose}
                onSelect={(teacher: any) => {
                    setSelectedTeacher(teacher);
                    setStep(2);
                }}
            />
            <TimeSelectModal
                isOpen={step === 2}
                onClose={onClose}
                onPrevious={() => setStep(1)}
                selectedTeacherId={selectedTeacher}
                onNext={(time: any) => {
                    setSelectedTime(time);
                    setStep(3);
                }}
            />
            <PaymentSelectModal
                isOpen={step === 3}
                onClose={onClose}
                onPrevious={() => setStep(2)}
                schedule={selectedTime}
                onConfirm={() => {
                    setStep(1);
                    onClose();
                }}
            />
        </>
    );
};

export default RegisterFlow;
