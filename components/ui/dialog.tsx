import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
    <DialogPrimitive.Content ref={ref} className={cn("fixed left-[50%] top-[50%] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white p-6 shadow-lg rounded-lg", className)} {...props}>
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

DialogContent.displayName = DialogPrimitive.Content.displayName;

export const DialogHeader = ({ className, ...props }: { className?: string; [key: string]: any }) => <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />;
DialogHeader.displayName = "DialogHeader";

export const DialogTitle = ({ className, ...props }: { className?: string; [key: string]: any }) => <DialogPrimitive.Title className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />;
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = ({ className, ...props }: { className?: string; [key: string]: any }) => <DialogPrimitive.Description className={cn("text-sm text-muted-foreground", className)} {...props} />;
DialogDescription.displayName = "DialogDescription";

export const DialogFooter = ({ className, ...props }: { className?: string; [key: string]: any }) => <div className={cn("flex justify-end space-x-2", className)} {...props} />;
DialogFooter.displayName = "DialogFooter";
