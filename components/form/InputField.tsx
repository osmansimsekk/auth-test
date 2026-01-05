import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

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
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          <FormLabel className="form-label">{label}</FormLabel>

          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              type={type}
              size={45}
              className={cn(
                error && "border-destructive focus-visible:ring-destructive",
                "text-sm font-figtree"
              )}
            />
          </FormControl>

          <p className="form-error">{error ?? ""}</p>
        </FormItem>
      )}
    />
  );
};

export default InputField;
