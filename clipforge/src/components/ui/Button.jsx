import React from "react";
import AppIcon from "../AppIcon";

const Button = ({
    children,
    className = "",
    variant = "primary",
    size = "default",
    fullWidth = false,
    iconName,
    iconPosition = "left",
    type = "button",
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500", // Handle 'default' as primary
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 focus:ring-gray-500",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        default: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
        icon: "p-2",
    };

    const widthClass = fullWidth ? "w-full" : "";

    // Resolve variant (fallback to primary if not found)
    const variantClass = variants[variant] || variants.primary;

    return (
        <button
            type={type}
            className={`${baseStyles} ${variantClass} ${sizes[size] || sizes.default} ${widthClass} ${className}`}
            {...props}
        >
            {iconName && iconPosition === "left" && (
                <AppIcon name={iconName} className="mr-2 h-4 w-4" />
            )}
            {children}
            {iconName && iconPosition === "right" && (
                <AppIcon name={iconName} className="ml-2 h-4 w-4" />
            )}
        </button>
    );
};
export default Button;
