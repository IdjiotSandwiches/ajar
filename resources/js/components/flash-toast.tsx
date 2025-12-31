import { usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export default function FlashToast() {
    const { props } = usePage();
    const flash: any = props.flash;
    const shown = useRef<string | null>(null);

    useEffect(() => {
        if (!flash) return;

        const key = JSON.stringify(flash);
        if (shown.current === key) return;

        shown.current = key;

        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
        if (flash.info) toast.info(flash.info);
    }, [flash]);

    return null;
}
