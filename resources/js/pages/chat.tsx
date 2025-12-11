import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, Send } from "lucide-react";
import { router } from "@inertiajs/react";
import LMSLayout from "@/layouts/lms-layout";
import useMediaQuery from "@/hooks/use-media-query";

interface ChatUser {
  id: number;
  name: string;
  role: "Teacher" | "Student";
  image: string;
  lastMessage: string;
  time: string;
  lastMessageTime: string;
}

interface ChatMessage {
  id: number;
  sender: "me" | "other";
  message: string;
  time: string;
}

const dummyUsers: ChatUser[] = [
  {
    id: 1,
    name: "Dodi Sudodi",
    role: "Teacher",
    image: "/images/regis-teacher.jpg",
    lastMessage: "Anda: Kursus tentang apa ya itu?",
    time: "11:11",
    lastMessageTime: "2025-11-12T11:11:00.000Z",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Teacher",
    image: "/images/regis-teacher.jpg",
    lastMessage: "Oke, nanti saya kirim materinya!",
    time: "15:00",
    lastMessageTime: "2025-11-12T15:00:00.000Z",
  },
];

const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, "");

const dummyChat: Record<number, ChatMessage[]> = {
  1: [
    { id: 1, sender: "other", message: "Halo mau join kursus kami?", time: "11:10" },
    { id: 2, sender: "me", message: "Kursus tentang apa ya itu?", time: "11:11" },
  ],
  2: [
    { id: 1, sender: "me", message: "Halo kak Jane!", time: "14:00" },
    { id: 2, sender: "other", message: "Hai! Ada yang bisa saya bantu?", time: "14:01" },
  ],
};

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? text.substring(0, maxLength - 3) + "..." : text;

export default function ChatPage() {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(dummyUsers[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(dummyChat[selectedUser?.id || 1] || []);
  const [newMessage, setNewMessage] = useState("");
  const [sortedUsers, setSortedUsers] = useState<ChatUser[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sorted = [...dummyUsers].sort(
      (a, b) => new Date(a.lastMessageTime).getTime() - new Date(b.lastMessageTime).getTime()
    );
    setSortedUsers(sorted);
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSend = () => {
    if (newMessage.trim() === "" || !selectedUser) return;

    const now = new Date();
    const time = getCurrentTime();

    const updatedMessages = [
      ...messages,
      { id: Date.now(), sender: "me", message: newMessage, time },
    ];

    setMessages(updatedMessages);
    setNewMessage("");

    const updatedUsers = sortedUsers.map((u) =>
      u.id === selectedUser.id
        ? {
          ...u,
          lastMessage: `Anda: ${newMessage}`,
          time,
          lastMessageTime: now.toISOString(),
        }
        : u
    );

    const reSorted = updatedUsers.sort(
      (a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    );

    setSortedUsers(reSorted);

    if (textareaRef.current) textareaRef.current.style.height = "40px";
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
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isMobile) {
    return (
      <div className="flex-1 bg-white overflow-hidden flex flex-col rounded-2xl shadow-sm">
        {!isChatOpen && (
          <div className="flex-1 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-3 px-4 pt-4">Chats</h2>

            {sortedUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className="flex items-center gap-3 p-4 bg-white shadow-sm cursor-pointer hover:bg-[#3ABEFF]/10 transition"
              >
                <img src={user.image} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
                </div>
                <span className="text-xs text-gray-400">{user.time}</span>
              </div>
            ))}
          </div>
        )}

        {isChatOpen && selectedUser && (
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-3 bg-white p-4 flex-shrink-0 border-b">
              <button onClick={handleBackFromChat}>
                <ChevronLeft size={22} />
              </button>
              <img src={selectedUser.image} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold">{selectedUser.name}</p>
                <p className="text-sm text-gray-500">{selectedUser.role}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${msg.sender === "me"
                        ? "bg-[#42C2FF] text-white rounded-br-none"
                        : "border border-[#42C2FF] text-gray-800 rounded-tl-none"
                      }`}
                  >
                    <p>{msg.message}</p>
                    <p className="text-[10px] text-right opacity-70 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-white border-t flex items-end flex-shrink-0">
              <textarea
                ref={textareaRef}
                value={newMessage}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type message..."
                rows={1}
                className="flex-1 border rounded-xl px-3 py-2 text-sm resize-none overflow-hidden"
              />
              <button onClick={handleSend} className="ml-2 bg-[#42C2FF] text-white p-2 rounded-xl">
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }


  return (
    <div>
      <h1 className="hidden md:flex text-2xl font-semibold text-gray-800 mb-6">Chat</h1>
      <div className="flex max-h-[80vh] my-8">
        <div className="border-r bg-white rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 px-4 py-3 border-b">
            <h2 className="text-lg font-semibold text-gray-700">Chats</h2>
          </div>

          <div className="overflow-y-auto h-[calc(80vh-60px)] md:w-[240px] 2xl:w-[320px]">
            {sortedUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className={`flex items-center gap-3 p-4 shadow-sm cursor-pointer transition ${selectedUser?.id === user.id ? "bg-[#3ABEFF]/20" : "hover:bg-[#3ABEFF]/10"
                  }`}
              >
                <img src={user.image} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                  <p className="text-sm text-gray-500 truncate">
                    {truncateText(user.lastMessage, 35)}
                  </p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{user.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm mx-4 p-6">
          {selectedUser ? (
            <>
              <div
                className="flex items-center gap-3 border-b pb-3 cursor-pointer"
                onClick={() =>
                  router.get(route("detail-teacher", { teacherName: slugify(selectedUser.name) }))
                }
              >
                <img
                  src={selectedUser.image}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">{selectedUser.name}</p>
                  <p className="text-sm text-gray-500">{selectedUser.role}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-6 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${msg.sender === "me"
                          ? "bg-[#42C2FF] text-white rounded-br-none"
                          : "border border-[#42C2FF] text-gray-800 rounded-tl-none"
                        }`}
                    >
                      <p>{msg.message}</p>
                      <p className="text-[10px] text-right opacity-70 mt-1">{msg.time}</p>
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
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm resize-none overflow-y-auto"
                  style={{ maxHeight: "120px" }}
                />
                <button
                  onClick={handleSend}
                  className="ml-2 bg-[#42C2FF] text-white p-2 rounded-xl hover:bg-[#42C2FF]/90"
                >
                  <Send size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ChatPage.layout = (page: React.ReactNode) => <LMSLayout title="Chat">{page}</LMSLayout>;
