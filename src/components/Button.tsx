import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
}

export default function Button({
    children,
    variant = 'primary',
    size = 'medium',
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles = 'button';

    const variantStyles = {
        primary: 'button-primary',
        secondary: 'button-secondary',
    };

    const sizeStyles = {
        small: 'button-small',
        medium: 'button-medium',
        large: 'button-large',
    };

    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
} 