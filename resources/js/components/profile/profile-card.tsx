import { router } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import React, { useRef, useState } from 'react';

export default function ProfileCard({ user }: any) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [previewImage, setPreviewImage] = useState(user?.profile_picture);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);

        const formData = new FormData();
        formData.append("profile_picture", file);
        router.post(route('update-image'), formData, {
            forceFormData: true
        });
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full">
            <div className="w-full rounded-2xl bg-[#42C2FF] p-1 shadow-lg">
                <div className="w-full rounded-2xl bg-white p-0.5">
                    <div className="relative flex flex-col items-center overflow-hidden rounded-2xl bg-[#42C2FF] px-4 py-8 text-center md:px-6 md:py-12">
                        <div
                            className="group relative z-10 mb-4 h-24 w-24 cursor-pointer overflow-hidden rounded-full border-2 border-white shadow-md md:mb-6 md:h-32 md:w-32"
                            onClick={handleImageClick}
                        >
                            <img
                                src={previewImage || 'https://placehold.co/400'}
                                alt={user?.name}
                                className="h-full w-full object-cover transition duration-200 group-hover:opacity-80"
                            />

                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                <Pencil className="text-white" size={22} />
                            </div>

                            <input ref={fileInputRef} name="profile_picture" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </div>
                        <h2 className="z-10 mb-1 text-xl font-bold text-white md:text-2xl">{user?.name || 'Unnamed User'}</h2>
                        <p className="z-10 text-xs text-white/90 capitalize md:text-sm">{user?.role?.name || 'User'}</p>
                        <div className="pointer-events-none absolute right-0 bottom-0 z-0">
                            <img src="/images/gear.png" alt="gear-bg" className="w-48 object-contain" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
