import {cn} from "@/lib/utils";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
    return (
        <textarea className={cn("min-h-28 w-full resize-y rounded-xl border border-input bg-white px-3 py-2.5 text-sm shadow-xs transition placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive", className)} {...props} />
    )
}
