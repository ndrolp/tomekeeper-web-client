import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useState, useRef, useCallback, type KeyboardEvent } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useFieldContext } from ".";

export type Option = Record<"value" | "label", string> & Record<string, string>;

export type AutoCompleteProps<T> = {
  options: T[];
  emptyMessage: string;
  value?: T;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  label?: string;

  onValueChange?: (value: T) => void;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
};

export const AutoCompleteField = <T,>({
  options,
  placeholder,
  emptyMessage,
  value,
  disabled,
  isLoading = false,
  label = "Label",
  onValueChange,
  getOptionLabel,
  getOptionValue,
}: AutoCompleteProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<T>(value as T);

  const field = useFieldContext<string>();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find(
          (option) => getOptionLabel(option) === input.value,
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        }
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    },
    [isOpen, options, onValueChange],
  );

  const handleBlur = useCallback(() => {
    //field.handleChange(field.state.value);
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: T) => {
      field.handleChange(getOptionLabel(selectedOption));

      setSelected(selectedOption);
      onValueChange?.(selectedOption);

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange],
  );

  return (
    <div className="space-y-1 w-full" onBlur={() => {}}>
      <Label htmlFor={field.name}>{label}</Label>
      <CommandPrimitive onKeyDown={handleKeyDown}>
        <div className="border rounded-lg bg-input/20 [&>div:first-child]:border-0 focus-within:border-primary">
          <CommandInput
            id={field.name}
            ref={inputRef}
            value={field.state.value}
            onValueChange={(val) => {
              field.handleChange(val); // sync with form
            }}
            onBlur={handleBlur}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
            className="p-1 h-9"
          />
        </div>
        <div className="relative mt-1">
          <div
            className={`animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-accent border-input outline-none
            ${isOpen ? "block" : "hidden"}`}
          >
            <CommandList className="rounded-lg border-input">
              {isLoading ? (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              ) : null}
              {options.length > 0 && !isLoading ? (
                <CommandGroup>
                  {options.map((option, index) => {
                    const isSelected =
                      getOptionValue(selected) === getOptionValue(option);

                    return (
                      <CommandItem
                        key={index}
                        value={getOptionValue(option)}
                        onSelect={() => {
                          handleSelectOption(option);
                          setOpen(false);
                        }}
                      >
                        {isSelected ? <Check className="w-4" /> : null}
                        {getOptionLabel(option)}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ) : null}
              {!isLoading ? (
                <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                  {emptyMessage}
                </CommandPrimitive.Empty>
              ) : null}
            </CommandList>
          </div>
        </div>
      </CommandPrimitive>
    </div>
  );
};
