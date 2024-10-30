import { ReactNode } from "react";
import { AlertCircle, CheckCircle, XCircle, Info } from "lucide-react";

type AlertVariant = "default" | "destructive" | "success" | "warning" | "info";

const alertVariants: Record<AlertVariant, string> = {
  default: "bg-gray-100 text-gray-900 border-gray-200",
  destructive: "bg-red-50 text-red-900 border-red-200",
  success: "bg-green-50 text-green-900 border-green-200",
  warning: "bg-yellow-50 text-yellow-900 border-yellow-200",
  info: "bg-blue-50 text-blue-900 border-blue-200",
};

const alertIconMap: Record<
  AlertVariant,
  React.ComponentType<{ className?: string }>
> = {
  default: Info,
  destructive: XCircle,
  success: CheckCircle,
  warning: AlertCircle,
  info: Info,
};

interface AlertProps {
  variant?: AlertVariant;
  className?: string;
  children: ReactNode; // Ensure children is typed correctly
}

const Alert = ({
  variant = "default",
  className = "",
  children,
  ...props
}: AlertProps) => {
  const Icon = alertIconMap[variant];

  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current [&>div]:pl-7 ${alertVariants[variant]} ${className}`}
      {...props}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {children}
    </div>
  );
};

interface AlertDescriptionProps {
  className?: string;
  children: ReactNode; // Ensure children is typed correctly
}

const AlertDescription = ({
  className = "",
  children,
  ...props
}: AlertDescriptionProps) => {
  return (
    <div className={`text-sm [&_p]:leading-relaxed ${className}`} {...props}>
      {children}
    </div>
  );
};

// Export components
export { Alert, AlertDescription };

// Usage example
export const AlertDemo = () => {
  return (
    <div className="space-y-4">
      <Alert>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertDescription>
          This is a destructive alert message.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <AlertDescription>This is a success alert message.</AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertDescription>This is a warning alert message.</AlertDescription>
      </Alert>

      <Alert variant="info">
        <AlertDescription>This is an info alert message.</AlertDescription>
      </Alert>
    </div>
  );
};

export default Alert;
