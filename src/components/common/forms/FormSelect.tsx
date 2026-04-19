import React from 'react';

interface SelectOption {
    value: string | number;
    label: string;
}

interface FormSelectProps {
    name: string;
    label: string;
    options: SelectOption[];
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
    className?: string;
    placeholder?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
    name,
    label,
    options,
    value,
    onChange,
    required = true,
    className = '',
    placeholder,
}) => {
    return (
        <div className={`form-group ${className}`}>
            <label htmlFor={name}>{label}</label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="form-select"
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
