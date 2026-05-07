import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type AccordionType = "single" | "multiple";

interface AccordionContextValue {
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
}

interface AccordionItemContextValue {
  value: string;
  open: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);
const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);

  if (!context) {
    throw new Error("Accordion components must be used within Accordion");
  }

  return context;
}

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);

  if (!context) {
    throw new Error("Accordion components must be used within AccordionItem");
  }

  return context;
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AccordionType;
  collapsible?: boolean;
  defaultValue?: string | string[];
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = "single", collapsible = false, defaultValue, className, children, ...props }, ref) => {
    const initialValues = React.useMemo(() => {
      if (defaultValue == null) return [];
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }, [defaultValue]);

    const [openValues, setOpenValues] = React.useState<string[]>(initialValues);

    const toggle = React.useCallback(
      (value: string) => {
        setOpenValues((prev) => {
          const isCurrentlyOpen = prev.includes(value);

          if (type === "single") {
            if (isCurrentlyOpen && collapsible) return [];
            return [value];
          }

          if (isCurrentlyOpen) {
            return prev.filter((entry) => entry !== value);
          }

          return [...prev, value];
        });
      },
      [collapsible, type],
    );

    const contextValue = React.useMemo<AccordionContextValue>(
      () => ({
        isOpen: (value: string) => openValues.includes(value),
        toggle,
      }),
      [openValues, toggle],
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = "Accordion";

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { isOpen } = useAccordionContext();
    const open = isOpen(value);
    const id = React.useId();
    const triggerId = `accordion-trigger-${id}`;
    const contentId = `accordion-content-${id}`;

    return (
      <AccordionItemContext.Provider value={{ value, open, triggerId, contentId }}>
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          className={cn("border-b", className)}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, onClick, ...props }, ref) => {
    const { toggle } = useAccordionContext();
    const { value, open, triggerId, contentId } = useAccordionItemContext();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented) {
        toggle(value);
      }
    };

    return (
      <h3 className="flex">
        <button
          ref={ref}
          id={triggerId}
          type="button"
          aria-controls={contentId}
          aria-expanded={open}
          data-state={open ? "open" : "closed"}
          className={cn(
            "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
            className,
          )}
          onClick={handleClick}
          {...props}
        >
          {children}
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </button>
      </h3>
    );
  },
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open, triggerId, contentId } = useAccordionItemContext();

  return (
    <div
      ref={ref}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      data-state={open ? "open" : "closed"}
      className={cn(
        "overflow-hidden text-sm transition-all",
        open ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0",
      )}
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </div>
  );
});

AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
