"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

// --- Mocking Shadcn UI Components for self-contained functionality ---

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading,
      children,
      ...props
    },
    ref,
  ) => {
    const variants = {
      default: "bg-white text-zinc-950 hover:bg-zinc-200 shadow-sm",
      outline:
        "border border-zinc-800 bg-transparent hover:bg-zinc-900 text-zinc-100",
      ghost: "hover:bg-zinc-800 text-zinc-300 hover:text-white",
      link: "text-white underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-zinc-800 bg-zinc-950/50 text-zinc-100 shadow",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-zinc-400", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// --- Main Application Component ---

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      console.log("Google Login Triggered");
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.log("Google login error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-4 selection:bg-zinc-800">
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#18181b_100%)]"></div>

      <div className="w-full max-w-sm animate-in fade-in zoom-in duration-500 slide-in-from-bottom-4">
        <Card className="border-zinc-800 bg-black/40 backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Welcome
            </CardTitle>
            <CardDescription>
              Sign in to continue to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button
              variant="default"
              className="w-full py-6 text-base cursor-pointer"
              onClick={handleGoogleLogin}
              isLoading={isLoading}
            >
              {!isLoading && (
                <svg
                  className="mr-2 h-5 w-5"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
              )}
              Continue with Google
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 text-center text-sm text-zinc-500">
            <p className="text-xs">
              By clicking continue, you agree to our{" "}
              <a
                href="#"
                className="underline underline-offset-4 hover:text-white"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline underline-offset-4 hover:text-white"
              >
                Privacy Policy
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
