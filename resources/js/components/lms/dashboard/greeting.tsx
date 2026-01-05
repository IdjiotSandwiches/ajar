import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

const IMAGES = [
    '/images/greetings_man.png',
    '/images/greetings_woman.png',
];

export default function Greeting() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % IMAGES.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 4 && hour < 11) return 'Good Morning';
        if (hour >= 11 && hour < 15) return 'Good Afternoon';
        if (hour >= 15 && hour < 19) return 'Good Evening';
        return 'Good Night';
    };

    return (
        <div className="relative">
            <Card className="rounded-2xl border-none bg-[#3ABEFF]/10 shadow-sm">
                <CardContent className="flex items-center justify-between p-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-[#3ABEFF]">
                            {getGreeting()}!
                        </h2>
                        <p className="mt-2 max-w-lg text-sm text-[#3ABEFF]">
                            "Education is not the learning of facts, but the training of the mind to think."
                        </p>
                    </div>
                </CardContent>
            </Card>

            <img
                src={IMAGES[index]}
                alt="Greeting"
                className="hidden lg:block absolute right-[-24px] bottom-[-2px] h-[120%] object-contain pointer-events-none transition-all duration-700 ease-out"
            />
        </div>
    );
}
