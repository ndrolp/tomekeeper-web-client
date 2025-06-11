import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { TextField } from "./text-field";
import { CheckboxField } from "./checkbox-field";
import { SelectField } from "./select-field";
import { SubmitButton } from "./submit-button";
import { TextAreaField } from "./textarea-field";
import { AutoCompleteField } from "./auto-complete";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    CheckboxField,
    SelectField,
    TextAreaField,
    AutoCompleteField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
