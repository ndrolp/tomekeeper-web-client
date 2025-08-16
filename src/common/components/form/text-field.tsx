import React from "react";
import { useFieldContext } from ".";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors } from "./field-errors";

type TextFieldProps = {
    label: string;
    fullWidth?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({
    label,
    fullWidth = true,
    ...inputProps
}: TextFieldProps) => {
    const field = useFieldContext<string>();

    return (
        <div className={`space-y-2 ${fullWidth ? "w-full" : ""}`}>
            <div className="space-y-2 w-full">
                <Label className="pl-1 font-normal" htmlFor={field.name}>{label}</Label>
                <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    {...inputProps}
                />
            </div>
            <FieldErrors meta={field.state.meta} />
        </div>
    );
};
