import { storageUrl } from '@/utils/storage';
import { router, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { MessageCircleOff } from 'lucide-react';

export default function UserList() {
    const { chat_with: chatWithUser, auth }: any = usePage().props;
    const { data: users }: any = usePage().props.users;

    const hasUsers = Array.isArray(users) && users.length > 0;

    if (!hasUsers) {
        return (
            <div className="flex h-[calc(80vh-60px)] flex-col items-center justify-center px-4 text-center">
                <MessageCircleOff className="mb-3 h-10 w-10 text-gray-400" />
                <p className="text-sm font-semibold text-gray-700 dark:text-white">
                    No conversations yet
                </p>
                <span className="mt-1 text-xs text-gray-500 dark:text-white/70">
                    There are no users available to chat
                </span>
            </div>
        );
    }

    return (
        <div className="h-[calc(80vh-60px)] overflow-y-auto md:w-[240px] 2xl:w-[320px]">
            {users.map((user: any) => {
                let chat = null;
                const receiveMessage = user?.receive_messages?.[0];
                const sendMessage = user?.send_messages?.[0];

                if (receiveMessage && sendMessage)
                    chat = receiveMessage.id > sendMessage.id ? receiveMessage : sendMessage;
                else if (receiveMessage) chat = receiveMessage;
                else if (sendMessage) chat = sendMessage;

                // Jika user belum pernah chat sama sekali → skip
                if (!chat) return null;

                return (
                    <div
                        key={user.uuid}
                        onClick={() => router.visit(route('chat.show', user.uuid))}
                        className={`flex cursor-pointer items-center gap-3 p-4 shadow-sm transition ${
                            chatWithUser?.id === user.id
                                ? 'bg-[#3ABEFF]/20'
                                : 'hover:bg-[#3ABEFF]/10'
                        }`}
                    >
                        <img
                            src={storageUrl(user.profile_picture)}
                            className="h-12 w-12 rounded-full object-cover"
                        />

                        <div className="flex min-w-0 flex-1 flex-col pr-2">
                            <div className="flex items-center justify-between">
                                <p className="truncate font-semibold text-gray-800 dark:text-white">
                                    {user.name}
                                </p>
                                <span className="flex-shrink-0 text-xs text-gray-400">
                                    {chat.sent_at}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-sm text-gray-500 dark:text-white/70">
                                    {chat.sender_id === auth.user.id &&
                                        !chat.message_deleted_at && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                className={clsx(
                                                    chat.seen_at
                                                        ? 'text-cyan-500'
                                                        : 'text-gray-400/80',
                                                    'mr-1 h-4 w-4'
                                                )}
                                                fill="currentColor"
                                            >
                                                <path d="M16.53 6.47a.75.75 0 0 1 0 1.06l-10 10a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 1.06-1.06L6 15.94l9.47-9.47a.75.75 0 0 1 1.06 0Z" />
                                                <path d="M22.53 6.47a.75.75 0 0 1 0 1.06l-10 10a.75.75 0 0 1-1.06 0l-1.5-1.5a.75.75 0 1 1 1.06-1.06L12 15.94l9.47-9.47a.75.75 0 0 1 1.06 0Z" />
                                            </svg>
                                        )}

                                    {chat.message_deleted_at ? (
                                        <span className="italic text-gray-500">
                                            {chat.message}
                                        </span>
                                    ) : (
                                        <div
                                            className="overflow-hidden break-all"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: 'vertical',
                                            }}
                                        >
                                            {chat.message}
                                        </div>
                                    )}
                                </div>

                                {user.messages_count > 0 && (
                                    <div className="rounded-full bg-[#3ABEFF] px-1.5 text-[10px] text-white">
                                        {user.messages_count}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
