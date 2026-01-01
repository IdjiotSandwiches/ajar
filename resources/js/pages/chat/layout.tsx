import useMediaQuery from '@/hooks/use-media-query';
import LMSLayout from '@/layouts/lms-layout';
import { router, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import UserList from '../../components/chat/user-list';

export default function ChatLayout({ children }: any) {
    const { chat_with: chatWithUser, auth }: any = usePage().props;
    const isMobile = useMediaQuery('(max-width: 1024px)');
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        if (!auth.user) return;

        const debouncedReload = debounce(() => {
            router.reload({
                only: ['messages', 'users'],
            });
        }, 350);

        window.Echo.private(`message.${auth.user.uuid}`)
            .listen('ReadMessageEvent', () => {
                debouncedReload();
            })
            .listen('NewMessageEvent', () => {
                debouncedReload();
            });

        return () => {
            window.Echo.private(`message.${auth.user.uuid}`)
                .stopListening('ReadMessageEvent', () => {
                    debouncedReload();
                })
                .stopListening('NewMessageEvent');
        };
    }, []);

    return (
        <LMSLayout title="Messages">
            {isMobile ? (
                <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border shadow-sm dark:border-white/20 dark:shadow-[#ffffff]/20">
                    {chatWithUser ? (
                        <div className="flex w-full flex-col h-full">{children}</div>
                    ) : (
                        <div className="w-full">
                            <div className="flex items-center gap-2 border-b px-4 py-3 dark:border-white/20">
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Chats</h2>
                            </div>
                            <UserList />
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex max-h-[80vh]">
                    <div className="rounded-2xl border shadow-sm dark:border-white/20 dark:shadow-[#ffffff]/20">
                        <div className="flex items-center gap-2 border-b px-4 py-3 dark:border-white/20">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Chats</h2>
                        </div>
                        <UserList />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col rounded-2xl border p-6 shadow-sm dark:border-white/20 dark:shadow-[#ffffff]/20">
                        {children}
                    </div>
                </div>
            )}
        </LMSLayout>
    );
}
