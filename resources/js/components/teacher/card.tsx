import { Send } from "lucide-react";
import { GitHub, Instagram, Linkedin } from "react-feather";

export default function TeacherProfileCard({ teacher }: any) {
    return (
        <div className="bg-[#42C2FF] rounded-2xl shadow-lg p-1">
            <div className="bg-white p-0.5 rounded-2xl">
                <div className="bg-[#42C2FF] rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white shadow-md mb-4 z-10">
                        <img
                            src={teacher.user?.profile_picture || "https://placehold.co/400"}
                            alt={teacher.user?.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-xl font-bold text-white z-10">{teacher.user?.name}</h2>
                    <p className="text-sm text-white/90 mb-4 z-10">{teacher.description}</p>

                    <p className="text-white/90 text-sm leading-relaxed mb-6 px-4 z-10">
                        {teacher.bio ??
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        }
                    </p>
                    <button className="flex items-center gap-2 bg-white text-[#42C2FF] font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-50 transition mb-5 z-10">
                        <Send size={18} /> Send Message
                    </button>
                    <div className="flex gap-8 text-white text-xl cursor-pointer z-10">
                        <Instagram size={28} />
                        <Linkedin size={28} />
                        <GitHub size={28} />
                    </div>

                    <div className="absolute right-0 bottom-0 pointer-events-none z-0">
                        <img
                            src="/images/gear.png"
                            alt="gear-bg"
                            className="w-48 object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}
