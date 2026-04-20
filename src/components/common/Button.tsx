import type { ReactNode } from 'react';
import React from 'react';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({
    type = 'button',
    onClick,
    disabled = false,
    className = '',
    children,
    variant = 'primary',
}) => {
    const baseStyles = 'font-semibold py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles: Record<string, string> = {
        primary: 'bg-purple-600 hover:bg-purple-700 text-white',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
    };

    const finalClassName = className || `${baseStyles} ${variantStyles[variant]}`;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={finalClassName}
        >
            {children}
        </button>
    );
};
