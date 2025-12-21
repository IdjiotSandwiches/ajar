import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"

export function InputSwitch({ name, checked: controlledChecked, onChange, ...props }: any) {
    const [isChecked, setIsChecked] = useState(controlledChecked ?? true);

    useEffect(() => {
        setIsChecked(controlledChecked);
    }, [controlledChecked]);

    const handleToggle = (val: boolean) => {
        setIsChecked(val);
        if (onChange) onChange(val);
    };

    return (
        <div className="inline-flex items-center">
            <Switch checked={isChecked} onCheckedChange={handleToggle} {...props} />
            <input type="hidden" name={name} value={isChecked ? "1" : "0"} />
        </div>
    )
}
