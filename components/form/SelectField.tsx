import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  error?: string;
};

const SelectField = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Seçiniz",
  error,
}: SelectFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          <FormLabel className="form-label">{label}</FormLabel>

          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger
                size={"default"}
                className={cn(
                  error && "border-destructive focus-visible:ring-destructive",
                  "font-figtree"
                )}
              >
                <SelectValue
                  placeholder={placeholder}
                  className="font-figtree"
                />
              </SelectTrigger>

              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          <p className="text-sm min-h-5 text-destructive">{error ?? ""}</p>
        </FormItem>
      )}
    />
  );
};

export default SelectField;
