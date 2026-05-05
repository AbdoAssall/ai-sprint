import type {
  UseFormRegister,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
};

const FormInput = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
}: FormInputProps<T>) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 
            ${error ? "border-red-500" : "border-gray-300"} 
            placeholder:text-sm`}
        {...register(name)}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FormInput;
