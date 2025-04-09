import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    className = '',
    disabled = false,
    type = 'button'
}: ButtonProps) {
    const baseStyles = "font-medium rounded-md transition-all duration-300 inline-flex items-center justify-center";

    const variantStyles = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg",
        secondary: "bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg",
        outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
    };

    const sizeStyles = {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-6 py-3"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {children}
        </button>
    );
}