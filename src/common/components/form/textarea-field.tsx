import React from "react";
import { useFieldContext } from ".";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FieldErrors } from "./field-error";

type TextAreaFieldProps = {
  label: string;
  fullWidth?: boolean;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

export const TextAreaField = ({
  label,
  fullWidth = true,
  ...inputProps
}: TextAreaFieldProps) => {
  const field = useFieldContext<string>();
  return (
    <div className={`space-y-2 ${fullWidth ? "w-full" : ""}`}>
      <div className="space-y-1 w-full">
        <Label htmlFor={field.name}>{label}</Label>
        <Textarea
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
