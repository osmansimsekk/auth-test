import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = {
  label: string;
  value: string;
};

type CountrySelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  error?: string;
};

const CountrySelectField = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select country",
  error,
}: CountrySelectFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selected = options.find((opt) => opt.value === field.value);

        return (
          <FormItem className="flex flex-col gap-1">
            <FormLabel className="form-label">{label}</FormLabel>

            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "justify-between",
                      !field.value && "text-muted-foreground",
                      error &&
                        "border-destructive focus-visible:ring-destructive"
                    )}
                  >
                    {selected ? selected.label : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="p-0 w-[250px]">
                <Command>
                  <CommandInput
                    placeholder="Ülkenizi Seçiniz..."
                    className="font-fightree"
                  />
                  <CommandEmpty>No country found.</CommandEmpty>

                  <CommandGroup>
                    {options.map((opt) => (
                      <CommandItem
                        key={opt.value}
                        value={opt.label}
                        onSelect={() => field.onChange(opt.value)}
                        className="font-figtree"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            opt.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {opt.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <p className="text-sm min-h-5 text-destructive">{error ?? ""}</p>
          </FormItem>
        );
      }}
    />
  );
};

export default CountrySelectField;
