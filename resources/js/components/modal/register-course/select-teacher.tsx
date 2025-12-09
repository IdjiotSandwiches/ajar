import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { X } from 'react-feather';
import Pagination from '../../pagination';

export default function TeacherSelectModal({ isOpen, onClose, onSelect }: any) {
    const [selectedTeacher, setSelectedTeacher] = useState<any>(null);

    const { teachers } = usePage<any>().props;
    useEffect(() => {
        if (isOpen && !teachers) {
            router.reload({
                only: ['teachers'],
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSelect = () => {
        if (selectedTeacher) onSelect(selectedTeacher);
    };

    return (
        <>
            {teachers && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#42C2FF]/40 backdrop-blur-sm">
                    <div className="animate-fadeIn relative max-h-[85vh] w-[90%] max-w-lg overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:w-full sm:p-6">
                        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-[#42C2FF]">
                            <X size={20} />
                        </button>
                        <h2 className="mb-1 text-center text-lg font-semibold text-gray-800">Select a Teacher</h2>
                        <p className="mb-6 text-center text-sm text-gray-500">Select your preferred teacher</p>
                        <div className="flex max-h-[50vh] flex-col gap-3 overflow-y-auto pr-1">
                            {teachers?.data.length === 0 ? (
                                <p className="py-4 text-center text-gray-500 text-sm">No teachers found</p>
                            ) : (
                                teachers?.data.map((user: any, index: number) => {
                                    const teacher = user?.user;
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedTeacher(teacher?.id)}
                                            className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 ${
                                                selectedTeacher === teacher?.id
                                                    ? 'border-[#42C2FF] bg-[#42C2FF]/10'
                                                    : 'border-gray-200 hover:border-[#42C2FF]'
                                            } `}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                                    {teacher.image ? (
                                                        <img
                                                            src={teacher?.profile_picture || 'https://placehold.co/400'}
                                                            alt={teacher.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full bg-gray-300" />
                                                    )}
                                                </div>

                                                <div className="min-w-0">
                                                    <h3 className="truncate text-sm font-medium text-gray-800">{teacher.name}</h3>
                                                    <p className="max-w-[150px] truncate text-xs text-gray-500">{teacher.description}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    router.get(route('detail-teacher', teacher?.id));
                                                }}
                                                className="text-xs font-medium text-[#42C2FF] hover:text-[#42C2FF]/90 sm:text-sm"
                                            >
                                                Detail
                                            </button>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                        {teachers?.data.length > 5 && <Pagination links={teachers.links} />}
                        <div className="mt-5 flex justify-center">
                            <button
                                onClick={handleSelect}
                                disabled={!selectedTeacher}
                                className={`w-full cursor-pointer rounded-lg px-6 py-2 text-sm font-medium sm:w-auto ${
                                    selectedTeacher ? 'bg-[#42C2FF] text-white hover:bg-[#42C2FF]/90' : 'cursor-not-allowed bg-gray-300 text-gray-500'
                                } `}
                            >
                                Select
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
