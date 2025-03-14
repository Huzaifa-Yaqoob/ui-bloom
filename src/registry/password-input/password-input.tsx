import * as React from "react";
import { Eye, EyeClosed } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFormField } from "@/components/ui/form";

function PasswordInput({
  className,
  disabled,
  ...props
}: Omit<React.ComponentProps<"input">, "type">) {
  const { error } = useFormField();
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div
      aria-invalid={!!error}
      className={cn(
        "selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 md:text-sm",
        "flex border border-input aria-invalid:border-destructive items-center",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        className
      )}
    >
      <input
        type={showPassword ? "text" : "password"}
        disabled={disabled}
        className="focus-visible:outline-0 flex-grow"
        {...props}
      />
      <button
        type="button"
        onClick={() => {
          setShowPassword((p) => !p);
        }}
        disabled={disabled}
      >
        {showPassword ? (
          <EyeClosed
            width={20}
            height={20}
            className={cn(
              "cursor-pointer opacity-50",
              error && "text-destructive"
            )}
          />
        ) : (
          <Eye
            width={20}
            height={20}
            className={cn(
              "cursor-pointer opacity-50",
              error && "text-destructive"
            )}
          />
        )}
      </button>
    </div>
  );
}

export { PasswordInput };
