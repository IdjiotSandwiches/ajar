import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import { router } from "@inertiajs/react";

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
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(dummyUsers[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(dummyChat[selectedUser?.id || 1] || []);
  const [newMessage, setNewMessage] = useState("");
  const [sortedUsers, setSortedUsers] = useState<ChatUser[]>([]);
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
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSend = () => {
    if (newMessage.trim() === "" || !selectedUser) return;

    const now = new Date();
    const currentTime = getCurrentTime();

    const updatedMessages = [
      ...messages,
      { id: Date.now(), sender: "me", message: newMessage, time: currentTime },
    ];
    setMessages(updatedMessages);
    setNewMessage("");

    const updatedUsers = sortedUsers.map((user) =>
      user.id === selectedUser.id
        ? {
            ...user,
            lastMessage: `Anda: ${newMessage}`,
            time: currentTime,
            lastMessageTime: now.toISOString(),
          }
        : user
    );

    const reSorted = updatedUsers.sort(
      (a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    );
    setSortedUsers(reSorted);

    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
    }
  };

  const handleSelectUser = (user: ChatUser) => {
    setSelectedUser(user);
    setMessages(dummyChat[user.id] || []);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`; // max height 120px
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex max-h-[80vh] bg-[#F9FEFF] my-16">
      <div className="border-r bg-white rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 px-4 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-700">Chats</h2>
        </div>

        <div className="overflow-y-auto h-[calc(80vh-60px)] p-2 w-[320px]">
          {sortedUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => handleSelectUser(user)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                selectedUser?.id === user.id ? "bg-[#D9F1FF]" : "hover:bg-gray-100"
              }`}
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
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
      <div className="flex-1 flex flex-col bg-white rounded-l-2xl shadow-sm mx-4 p-6">
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
                alt={selectedUser.name}
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
                  className={`flex ${
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                      msg.sender === "me"
                        ? "bg-[#42C2FF] text-white rounded-br-none"
                        : "border border-[#42C2FF] text-gray-800 rounded-tl-none"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className="text-[10px] text-right opacity-70 mt-1">
                      {msg.time}
                    </p>
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
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#42C2FF] resize-none overflow-y-auto"
                style={{ maxHeight: "120px" }}
              />
              <button
                onClick={handleSend}
                className="ml-2 bg-[#42C2FF] text-white p-2 rounded-xl hover:bg-[#30b3f2]"
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
  );
}

ChatPage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
