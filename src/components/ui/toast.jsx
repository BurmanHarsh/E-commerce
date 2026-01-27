import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/* Variants */
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/* Provider & Viewport */
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = ToastPrimitives.Viewport;

/* Root */
const Toast = React.forwardRef((props, ref) => {
  const { className, variant, ...rest } = props;

  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...rest}
    />
  );
});
Toast.displayName = "Toast";

/* Title */
const ToastTitle = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <ToastPrimitives.Title
      ref={ref}
      className={cn("text-sm font-semibold", className)}
      {...rest}
    />
  );
});
ToastTitle.displayName = "ToastTitle";

/* ✅ Description (THIS WAS MISSING) */
const ToastDescription = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <ToastPrimitives.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...rest}
    />
  );
});
ToastDescription.displayName = "ToastDescription";

/* Close */
const ToastClose = React.forwardRef((props, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 hover:text-foreground"
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = "ToastClose";

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
};
