import type { ReactNode } from 'react';
import React from 'react';

interface FormProps {
    onSubmit: (data: Record<string, string | File>) => void | Promise<void>;
    children: ReactNode;
    className?: string;
}

export const Form: React.FC<FormProps> = ({ onSubmit, children, className = '' }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string | File> = {};
        formData.forEach((value, key) => {
            data[key] = value as string | File;
        });
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className={`form ${className}`}>
            {children}
        </form>
    );
};
