import React from 'react';

interface FormTextareaProps {
    name: string;
    label: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    rows?: number;
    className?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
    name,
    label,
    placeholder,
    value,
    onChange,
    required = true,
    rows = 4,
    className = '',
}) => {
    return (
        <div className={`form-group ${className}`}>
            <label htmlFor={name}>{label}</label>
            <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                rows={rows}
                className="form-textarea text-gray-800"
            />
        </div>
    );
};
