import useMediaQuery from '@/hooks/use-media-query';
import LMSLayout from '@/layouts/lms-layout';
import { router } from '@inertiajs/react';
import { ChevronLeft, Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface ChatUser {
    id: number;
    name: string;
    role: 'Teacher' | 'Student';
    image: string;
    lastMessage: string;
    time: string;
    lastMessageTime: string;
}

interface ChatMessage {
    id: number;
    sender: 'me' | 'other';
    message: string;
    time: string;
}

const dummyUsers: ChatUser[] = [
    {
        id: 1,
        name: 'Dodi Sudodi',
        role: 'Teacher',
        image: '/images/regis-teacher.jpg',
        lastMessage: 'Anda: Kursus tentang apa ya itu?',
        time: '11:11',
        lastMessageTime: '2025-11-12T11:11:00.000Z',
    },
    {
        id: 2,
        name: 'Jane Smith',
        role: 'Teacher',
        image: '/images/regis-teacher.jpg',
        lastMessage: 'Oke, nanti saya kirim materinya!',
        time: '15:00',
        lastMessageTime: '2025-11-12T15:00:00.000Z',
    },
];

const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '');

const dummyChat: Record<number, ChatMessage[]> = {
    1: [
        { id: 1, sender: 'other', message: 'Halo mau join kursus kami?', time: '11:10' },
        { id: 2, sender: 'me', message: 'Kursus tentang apa ya itu?', time: '11:11' },
    ],
    2: [
        { id: 1, sender: 'me', message: 'Halo kak Jane!', time: '14:00' },
        { id: 2, sender: 'other', message: 'Hai! Ada yang bisa saya bantu?', time: '14:01' },
    ],
};

const truncateText = (text: string, maxLength: number) => (text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text);

export default function ChatPage() {
    const isMobile = useMediaQuery('(max-width: 1024px)');

    const [selectedUser, setSelectedUser] = useState<ChatUser | null>(dummyUsers[0]);
    const [messages, setMessages] = useState<ChatMessage[]>(dummyChat[selectedUser?.id || 1] || []);
    const [newMessage, setNewMessage] = useState('');
    const [sortedUsers, setSortedUsers] = useState<ChatUser[]>([]);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sorted = [...dummyUsers].sort((a, b) => new Date(a.lastMessageTime).getTime() - new Date(b.lastMessageTime).getTime());
        setSortedUsers(sorted);
    }, []);

    const getCurrentTime = () => {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    };

    const handleSend = () => {
        if (newMessage.trim() === '' || !selectedUser) return;

        const now = new Date();
        const time = getCurrentTime();

        const updatedMessages = [...messages, { id: Date.now(), sender: 'me', message: newMessage, time }];

        setMessages(updatedMessages);
        setNewMessage('');

        const updatedUsers = sortedUsers.map((u) =>
            u.id === selectedUser.id
                ? {
                      ...u,
                      lastMessage: `Anda: ${newMessage}`,
                      time,
                      lastMessageTime: now.toISOString(),
                  }
                : u,
        );

        const reSorted = updatedUsers.sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());

        setSortedUsers(reSorted);

        if (textareaRef.current) textareaRef.current.style.height = '40px';
    };

    const handleSelectUser = (user: ChatUser) => {
        setSelectedUser(user);
        setMessages(dummyChat[user.id] || []);
        if (isMobile) setIsChatOpen(true);
    };

    const handleBackFromChat = () => {
        setIsChatOpen(false);
        setSelectedUser(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.target.value);

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (isMobile) {
        return (
            <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border shadow-sm dark:border-white/20 dark:shadow-[#ffffff]/20">
                {!isChatOpen && (
                    <div>
                        <div className="flex items-center gap-2 border-b px-4 py-4 dark:border-white/20">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Chats</h2>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {sortedUsers.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => handleSelectUser(user)}
                                    className="flex cursor-pointer items-center gap-3 p-4 shadow-sm transition hover:bg-[#3ABEFF]/10"
                                >
                                    <img src={user.image} className="h-12 w-12 rounded-full" />
                                    <div className="flex-1">
                                        <p className="font-semibold dark:text-white">{user.name}</p>
                                        <p className="truncate text-sm text-gray-500 dark:text-white/70">{user.lastMessage}</p>
                                    </div>
                                    <span className="text-xs text-gray-400">{user.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {isChatOpen && selectedUser && (
                    <div className="flex flex-1 flex-col">
                        <div className="flex flex-shrink-0 items-center gap-3 border-b p-2 dark:border-white/20">
                            <button onClick={handleBackFromChat}>
                                <ChevronLeft size={22} />
                            </button>
                            <img src={selectedUser.image} className="h-10 w-10 rounded-full" />
                            <div>
                                <p className="font-semibold dark:text-white">{selectedUser.name}</p>
                                <p className="text-sm text-gray-500 dark:text-white/70">{selectedUser.role}</p>
                            </div>
                        </div>

                        <div className="flex-1 space-y-3 overflow-y-auto p-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                                            msg.sender === 'me'
                                                ? 'rounded-br-none bg-[#3ABEFF] text-white'
                                                : 'rounded-tl-none border border-[#3ABEFF] text-gray-800 dark:text-white'
                                        }`}
                                    >
                                        <p>{msg.message}</p>
                                        <p className="mt-1 text-right text-[10px] opacity-70">{msg.time}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="flex flex-shrink-0 items-end border-t p-3 dark:border-white/20">
                            <textarea
                                ref={textareaRef}
                                value={newMessage}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Type message..."
                                rows={1}
                                className="flex-1 resize-none overflow-hidden rounded-xl border border-gray-200 px-3 py-2 text-sm"
                            />
                            <button onClick={handleSend} className="ml-2 rounded-xl bg-[#3ABEFF] p-2 text-white">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex max-h-[80vh]">
            <div className="rounded-2xl border shadow-sm dark:border-white/20 dark:shadow-[#ffffff]/20">
                <div className="flex items-center gap-2 border-b px-4 py-3 dark:border-white/20">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Chats</h2>
                </div>

                <div className="h-[calc(80vh-60px)] overflow-y-auto md:w-[240px] 2xl:w-[320px]">
                    {sortedUsers.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => handleSelectUser(user)}
                            className={`flex cursor-pointer items-center gap-3 p-4 shadow-sm transition ${
                                selectedUser?.id === user.id ? 'bg-[#3ABEFF]/20' : 'hover:bg-[#3ABEFF]/10'
                            }`}
                        >
                            <img src={user.image} className="h-12 w-12 rounded-full object-cover" />
                            <div className="flex min-w-0 flex-1 flex-col pr-2">
                                <div className="flex items-center justify-between">
                                    <p className="truncate font-semibold text-gray-800 dark:text-white">{user.name}</p>
                                    <span className="flex-shrink-0 text-xs text-gray-400">{user.time}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="truncate text-sm text-gray-500 dark:text-white/70">{truncateText(user.lastMessage, 35)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="ml-4 flex flex-1 flex-col rounded-2xl border p-6 shadow-sm dark:border-white/20 dark:shadow-[#ffffff]/20">
                {selectedUser ? (
                    <>
                        <div
                            className="flex cursor-pointer items-center gap-3 border-b pb-3 dark:border-white/20"
                            onClick={() => router.get(route('detail-teacher', { teacherName: slugify(selectedUser.name) }))}
                        >
                            <img src={selectedUser.image} className="h-12 w-12 rounded-full object-cover" />
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-white">{selectedUser.name}</p>
                                <p className="text-sm text-gray-500 dark:text-white/70">{selectedUser.role}</p>
                            </div>
                        </div>

                        <div className="flex-1 space-y-3 overflow-y-auto py-6">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                                            msg.sender === 'me'
                                                ? 'rounded-br-none bg-[#3ABEFF] text-white'
                                                : 'rounded-tl-none border border-[#3ABEFF] text-gray-800 dark:text-white'
                                        }`}
                                    >
                                        <p>{msg.message}</p>
                                        <p className="mt-1 text-right text-[10px] opacity-70">{msg.time}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="flex items-end border-t pt-3">
                            <textarea
                                ref={textareaRef}
                                value={newMessage}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Type message..."
                                rows={1}
                                className="flex-1 resize-none overflow-y-auto rounded-xl border border-gray-200 px-4 py-2 text-sm"
                                style={{ maxHeight: '120px' }}
                            />
                            <button onClick={handleSend} className="ml-2 rounded-xl bg-[#3ABEFF] p-2 text-white hover:bg-[#3ABEFF]/90">
                                <Send size={20} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">Select a conversation to start chatting</div>
                )}
            </div>
        </div>
    );
}

ChatPage.layout = (page: React.ReactNode) => <LMSLayout title="Messages">{page}</LMSLayout>;
