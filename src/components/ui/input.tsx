import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full"
    >
      <input
        type={type}
        data-slot="input"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
          "flex h-11 w-full min-w-0 rounded-lg border bg-background/50 px-4 py-2 text-base shadow-sm",
          "transition-all duration-200 ease-in-out",
          "outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "md:text-sm",
          "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
          "hover:border-primary/50",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "backdrop-blur-sm",
          className
        )}
        {...props}
      />
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocused ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}

export { Input };
