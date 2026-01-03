import { storageUrl } from '@/utils/storage';
import { router, usePage } from '@inertiajs/react';
import { Send } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function TeacherProfileCard({ teacher, canRedirect = false }: any) {
    console.log(teacher)
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;

    const icons: any = {
        Github: FaGithub,
        Instagram: FaInstagram,
        LinkedIn: FaLinkedinIn,
    };

    return (
        <div className="rounded-2xl bg-[#3ABEFF] p-1 shadow-lg dark:bg-[#222831]">
            <div className="rounded-2xl bg-white p-0.5">
                <div className="relative flex flex-col items-center overflow-hidden rounded-2xl bg-[#3ABEFF] p-6 text-center dark:bg-[#222831]">
                    <div
                        onClick={() => {
                            if (canRedirect) {
                                router.visit(route('detail-teacher', teacher.id));
                            }
                        }}
                        className={`z-10 mb-4 h-28 w-28 overflow-hidden rounded-full border-2 border-white shadow-md ${canRedirect ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                        <img src={storageUrl(teacher.profile_picture)} alt={teacher.name} className="h-full w-full object-cover" />
                    </div>
                    <h2 className="z-10 cursor-default text-xl font-bold text-white">{teacher.name}</h2>
                    <p className="z-10 mb-4 cursor-default text-sm text-white/90">{teacher.description}</p>
                    {(user?.role_id !== roles.Admin && user?.id !== teacher.id) && (
                        <button
                            onClick={() => router.visit(route('chat.show', teacher.uuid))}
                            className="z-10 mb-5 flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-2 font-medium text-[#3ABEFF] shadow transition hover:bg-blue-50 dark:bg-white/90"
                        >
                            <Send size={18} /> Send Message
                        </button>
                    )}
                    <div className="z-10 flex cursor-pointer gap-8 text-xl text-white">
                        {(() => {
                            const socials = teacher?.social_medias ?? [];
                            return socials
                                .filter((x: any) => icons[x.name])
                                .map((x: any, index: number) => {
                                    const Icon = icons[x.name];
                                    return (
                                        <a key={index} href={x.url} className="hover:text-blue-100" target="_blank" rel="noopener noreferrer">
                                            <Icon size={28} />
                                        </a>
                                    );
                                });
                        })()}
                    </div>
                    <div className="pointer-events-none absolute right-0 bottom-0 z-0">
                        <img src="/images/gear.png" alt="gear-bg" className="w-48 object-contain" />
                    </div>
                </div>
            </div>
        </div>
    );
}
