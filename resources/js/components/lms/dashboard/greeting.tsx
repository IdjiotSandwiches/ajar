import { Card, CardContent } from '@/components/ui/card';

export default function Greeting() {
    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 4 && hour < 11) return 'Good Morning';
        if (hour >= 11 && hour < 15) return 'Good Afternoon';
        if (hour >= 15 && hour < 19) return 'Good Evening';
        return 'Good Night';
    };

    return (
        <Card className="overflow-hidden rounded-2xl border-none bg-[#3ABEFF]/10 shadow-sm">
            <CardContent className="flex items-center justify-between p-6">
                <div>
                    <h2 className="text-2xl font-semibold text-[#3ABEFF]">{getGreeting()}!</h2>
                    <p className="mt-2 max-w-lg text-sm text-[#3ABEFF]">
                        "Education is not the learning of facts, but the training of the mind to think."
                    </p>
                </div>
                <img src="https://illustrations.popsy.co/blue/student.svg" className="w-40" />
            </CardContent>
        </Card>
    );
}
