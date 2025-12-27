import { Form, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';

interface AddLinkModalProps {
    title: string;
    placeholder: string;
    action: string;
    id: number;
    onClose: () => void;
}

export default function AddLinkModal({ title, placeholder, action, id, onClose }: AddLinkModalProps) {
    const { errors } = usePage<any>().props;
    const [value, setValue] = useState('');
    return (
        <div className="fixed inset-0 z-99 flex items-center justify-center bg-[#3ABEFF]/40 backdrop-blur-sm">
            <div className="relative w-[400px] rounded-2xl bg-[#FFF9F7] p-6 text-center shadow-xl">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                    <X size={18} />
                </button>

                <h2 className="mb-2 text-lg font-semibold text-gray-800">{title}</h2>

                <p className="mb-6 text-sm text-gray-500">
                    {title === 'Meeting Link'
                        ? 'Add a meeting link for course learning according to the schedule'
                        : 'Add recording link as proof of course learning'}
                </p>
                <Form onSuccess={() => onClose()} action={route(action, id)} method="post" className="text-left">
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        name="link"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-[#3ABEFF] focus:outline-none"
                    />
                    {errors.link && <p className="text-red-500 text-sm">{errors.link}</p>}
                    <button type="submit" className="mt-4 w-full rounded-lg bg-[#3ABEFF] py-2 font-medium text-white transition hover:bg-[#3ABEFF]/90">
                        Submit
                    </button>
                </Form>
            </div>
        </div>
    );
}
