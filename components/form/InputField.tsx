import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

type InputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  type?: string;
  label: string;
  error?: string;
};

const InputField = <T extends FieldValues>({
  control,
  name,
  placeholder,
  type = "text",
  label,
  error,
}: InputFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          <FormLabel className="form-label" htmlFor={field.name}>
            {label}
          </FormLabel>

          <FormControl>
            <div className="relative">
              <Input
                {...field}
                placeholder={placeholder}
                type={isPassword ? (showPassword ? "text" : "password") : type}
                size={45}
                className={cn(
                  "text-sm font-figtree",
                  isPassword && "pr-10",
                  error && "border-destructive focus-visible:ring-destructive"
                )}
              />

              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            </div>
          </FormControl>

          <p className="form-error">{error ?? ""}</p>
        </FormItem>
      )}
    />
  );
};

export default InputField;
