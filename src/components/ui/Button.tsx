import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export default function Button({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    className = '',
    disabled = false,
    type = 'button'
}: ButtonProps) {
    const baseStyles = "button";

    const variantStyles = {
        primary: "button-primary",
        secondary: "button-secondary"
    };

    const sizeStyles = {
        small: "button-small",
        medium: "button-medium",
        large: "button-large"
    };

    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50' : ''} ${className}`;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
        >
            {children}
        </button>
    );
}