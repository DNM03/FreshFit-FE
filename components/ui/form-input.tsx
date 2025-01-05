import * as React from "react";
import { Text, TextInput, View, type TextInputProps } from "react-native";
import { cn } from "~/lib/utils";
import { Label } from "./label";

interface FormInputProps extends TextInputProps {
  label?: string;
  className?: string;
  placeholderClassName?: string;
  errorMessages?: string;
}

const FormInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  FormInputProps
>(
  (
    { className, placeholderClassName, label, errorMessages, ...props },
    ref
  ) => {
    return (
      <View style={{ marginBottom: 16, width: "100%" }}>
        {label && (
          <Label nativeID={label} className="text-[#176219]">
            {label}
          </Label>
        )}
        <TextInput
          ref={ref}
          className={cn(
            "web:flex  web:w-full rounded-md  border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-[#88C08C] web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
            "w-full border border-[#176219] py-5 px-4 focus:border-[#176219] text-[#176219] text-lg",
            props.editable === false && "opacity-50 web:cursor-not-allowed",
            className
          )}
          placeholderClassName={cn(
            "text-muted-foreground",
            placeholderClassName
          )}
          aria-labelledby={label}
          {...props}
        />
        {errorMessages && (
          <Label className="text-red-500" style={{ fontSize: 12 }}>
            {errorMessages}
          </Label>
        )}
      </View>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
