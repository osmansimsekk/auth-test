import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  title: string;
  variant:
    | "outline"
    | "link"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  dialog: string;
  options: {
    type: string;
    text: string;
    onClick?: () => void;
  }[];
};

export function AlertDialogComponent({
  label,
  variant = "outline",
  dialog,
  title,
  options,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant}>{label}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{dialog}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {options.map((option) => {
            if (option.type === "cancel") {
              return (
                <AlertDialogCancel onClick={option.onClick} key={option.text}>
                  {option.text}
                </AlertDialogCancel>
              );
            } else if (option.type === "continue") {
              return (
                <AlertDialogAction key={option.text} onClick={option.onClick}>
                  {option.text}
                </AlertDialogAction>
              );
            }
          })}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
