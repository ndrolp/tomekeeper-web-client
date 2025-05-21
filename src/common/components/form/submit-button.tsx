import { useStore } from "@tanstack/react-form";
import { useFormContext } from ".";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export const SubmitButton = ({
  children,
  className,
  style,
}: SubmitButtonProps) => {
  const form = useFormContext();

  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
  ]);

  return (
    <Button
      className={className}
      style={style}
      type="submit"
      disabled={isSubmitting || !canSubmit}
    >
      {children}
    </Button>
  );
};
