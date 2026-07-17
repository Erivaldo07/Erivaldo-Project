import { type ComponentProps, type ReactNode, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";


const buttonVariants = tv({
  base: [
    "relative inline-flex items-center justify-center gap-2",
    "rounded-lg font-medium transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "active:scale-[0.98] select-none",
    "px-5 py-2.5 text-sm"
  ],

  variants: {
    variant: {
      primary: [
        "bg-lime-300 text-lime-950",
        "hover:bg-lime-400 hover:shadow-lg hover:shadow-lime-300/30",
        "focus:ring-lime-300",
        "active:bg-lime-500"
      ],
      secondary: [
        "bg-zinc-800 text-zinc-200",
        "hover:bg-zinc-700 hover:shadow-lg hover:shadow-zinc-800/30",
        "focus:ring-zinc-500",
        "active:bg-zinc-600"
      ],
      success: [
        "bg-emerald-500 text-white",
        "hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30",
        "focus:ring-emerald-500",
        "active:bg-emerald-700"
      ],
      danger: [
        "bg-red-500 text-white",
        "hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30",
        "focus:ring-red-500",
        "active:bg-red-700"
      ],
      warning: [
        "bg-amber-500 text-white",
        "hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/30",
        "focus:ring-amber-500",
        "active:bg-amber-700"
      ],
      ghost: [
        "bg-transparent text-zinc-300",
        "hover:bg-zinc-800/50 hover:text-white",
        "focus:ring-zinc-500",
        "active:bg-zinc-800/70"
      ],
      outline: [
        "bg-transparent border-2 border-zinc-700 text-zinc-300",
        "hover:bg-zinc-800/50 hover:border-zinc-600 hover:text-white",
        "focus:ring-zinc-500",
        "active:bg-zinc-800/70"
      ]
    },

    size: {
      sm: "px-3 py-1.5 text-xs",
      default: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
      xl: "px-8 py-4 text-lg",
      icon: "w-10 h-10 p-0",
      "icon-sm": "w-8 h-8 p-0 text-xs",
      "icon-lg": "w-12 h-12 p-0 text-lg",
      full: "w-full px-5 py-2.5 text-sm"
    },

    loading: {
      true: "cursor-wait opacity-70"
    }
  },

  compoundVariants: [
    {
      variant: "primary",
      loading: true,
      className: "bg-lime-400"
    },
    {
      variant: "secondary",
      loading: true,
      className: "bg-zinc-700"
    }
  ],

  defaultVariants: {
    variant: "primary",
    size: "default",
    loading: false
  }
});

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    variant,
    size,
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className = "",
    disabled,
    type = "button",
    ...props
  }, ref) => {

    // Se fullWidth for true, sobrescreve o size
    const finalSize = fullWidth ? "full" : size;


    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={buttonVariants({
          variant,
          size: finalSize,
          loading,
          className
        })}
        {...props}
      >


        {/* Content with opacity when loading */}
        <span className={loading ? "opacity-0" : "flex items-center gap-2"}>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
