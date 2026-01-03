import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "./label";

export function InputSwitch({ name, checked: controlledChecked, onChange, label, ...props }: any) {
    const [isChecked, setIsChecked] = useState(controlledChecked ?? true);

    useEffect(() => {
        setIsChecked(controlledChecked);
    }, [controlledChecked]);

    const handleToggle = (val: boolean) => {
        setIsChecked(val);
        if (onChange) onChange(val);
    };

    return (
        <div className="flex items-center space-x-2">
            <Switch checked={isChecked} onCheckedChange={handleToggle} {...props} />
            <input type="hidden" name={name} value={isChecked ? "1" : "0"} />
            {label && (
                <Label htmlFor={name}>{label}</Label>
            )}
        </div>
    )
}
