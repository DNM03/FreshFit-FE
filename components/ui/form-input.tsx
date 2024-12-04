import * as React from "react";
import { TextInput, type TextInputProps } from "react-native";
import { cn } from "~/lib/utils";

const FormInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps
>(({ className, placeholderClassName, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        "web:flex h-10 native:h-12 web:w-full rounded-md  border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-[#ACE1AF] web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
        "w-full border border-[#ACE1AF] py-2 px-4 focus:border-[#176219] text-[#176219] text-lg",
        props.editable === false && "opacity-50 web:cursor-not-allowed",
        className
      )}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      {...props}
    />
  );
});

FormInput.displayName = "FormInput";

export { FormInput };
