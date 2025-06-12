import { Button, buttonVariants } from "@/components/ui/button";
import { useNavigate } from "react-router"; // Or use `next/router` for Next.js
import type { VariantProps } from "class-variance-authority";
import type { JSX } from "react";

type NavigateButtonProps = Omit<React.ComponentProps<"button">, "onClick"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    to: string;
  };

export const NavigateButton = (props: NavigateButtonProps): JSX.Element => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate(props.to)} {...props}></Button>;
};
