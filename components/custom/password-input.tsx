"use client";

import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  showPassword?: boolean;
  onToggleVisibility?: () => void;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      showPassword: externalShowPassword,
      onToggleVisibility,
      ...props
    },
    ref
  ) => {
    const [internalShowPassword, setInternalShowPassword] = useState(false);

    const isControlled = externalShowPassword !== undefined;
    const showPassword = isControlled
      ? externalShowPassword
      : internalShowPassword;

    const togglePasswordVisibility = () => {
      if (isControlled) {
        onToggleVisibility?.();
      } else {
        setInternalShowPassword(!internalShowPassword);
      }
    };

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={className}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 hover:bg-transparent hover:text-primaryGradientStart"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
          <span className="sr-only">
            {showPassword ? "Show password" : "Hide password"}
          </span>
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
