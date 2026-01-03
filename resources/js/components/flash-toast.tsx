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

        const options = {
            onDismiss: () => {
                shown.current = null;
            },
            onAutoClose: () => {
                shown.current = null;
            },
        };

        if (flash.success) toast.success(flash.success, options);
        if (flash.error) toast.error(flash.error, options);
        if (flash.info) toast.info(flash.info, options);

    }, [flash]);

    return null;
}
