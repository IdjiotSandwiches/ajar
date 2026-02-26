import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { router } from '@inertiajs/react';
import DynamicModal from '../modal/modal';
import { useState } from 'react';

export default function SessionDetail({ session }: any) {
    const [modalType, setModalType] = useState<string | null>(null);
    const handleCancel = () => {
        router.post(route('teacher.cancel-schedule', { id: session.id }));
        setModalType(null);
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{session.name}</CardTitle>
                    <CardDescription>{session.schedule}</CardDescription>
                    <button
                        onClick={() => router.get(route('my-learning'))}
                        className={`w-fit rounded-lg bg-black/80 px-4 py-2 text-sm text-white transition-all hover:bg-black/70 dark:bg-gray-700 dark:hover:bg-gray-600`}
                    >
                        Back
                    </button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <CardTitle>Meeting Link</CardTitle>
                        <input
                            type="text"
                            value={session.meeting_link || ''}
                            disabled={true}
                            name="link"
                            className="w-full rounded-lg border px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#3ABEFF] focus:outline-none disabled:text-gray-500 dark:border-white/20 dark:text-white dark:shadow-white/20"
                        />
                    </div>
                    <div className="space-y-2">
                        <CardTitle>Recording Link</CardTitle>
                        <input
                            type="text"
                            value={session.recording_link || ''}
                            disabled={true}
                            name="link"
                            className="w-full rounded-lg border px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#3ABEFF] focus:outline-none disabled:text-gray-500 dark:border-white/20 dark:text-white dark:shadow-white/20"
                        />
                    </div>
                    <div className="space-y-2">
                        <CardTitle>Cancel Schedule</CardTitle>
                        <button
                            onClick={() => setModalType('confirmation')}
                            disabled={!session.can_modify}
                            className={`rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition-all hover:bg-red-600/90 disabled:cursor-not-allowed disabled:bg-red-400`}
                        >
                            Cancel
                        </button>
                    </div>
                </CardContent>
            </Card>

            {modalType === 'confirmation' && (
                <DynamicModal
                    type="confirmation"
                    isOpen
                    onClose={() => setModalType(null)}
                    onConfirm={handleCancel}
                    description="Are you sure you want to cancel this schedule?"
                    confirmText="Confirm"
                />
            )}
        </>
    );
}
