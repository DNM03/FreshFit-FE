import * as React from "react";
import { Text, TextInput, type TextInputProps } from "react-native";
import { cn } from "~/lib/utils";

interface InputProps extends TextInputProps {
  error?: string; // Optional error prop
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, placeholderClassName, error, ...props }, ref) => {
    return (
      <>
        <TextInput
          ref={ref}
          className={cn(
            "web:flex h-10 native:h-12 web:w-full rounded-md  border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-[#ACE1AF] web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
            "w-full border-b border-[#ACE1AF] py-2 px-4 focus:outline-none focus:border-[#176219] text-[#176219] text-lg",
            props.editable === false && "opacity-50 web:cursor-not-allowed",
            className
          )}
          placeholderClassName={cn(
            "text-muted-foreground",
            placeholderClassName
          )}
          {...props}
        />
        {error && (
          <Text
            style={{ marginTop: -10, marginLeft: 14, marginBottom: -10 }}
            className="text-red-500 text-sm"
          >
            {error} {/* Display error message below the input */}
          </Text>
        )}
      </>
    );
  }
);

Input.displayName = "Input";

export { Input };
