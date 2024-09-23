interface InputComponentProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
  maxLength?: number;
}

export default function InputComponent({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
  error,
  maxLength,
}: InputComponentProps) {
  return (
    <div className={className}>
      <label className="text-sm font-semibold text-logoColorBlue">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`mt-1 w-full rounded-md border px-2 py-2 text-sm text-logoColorBlue placeholder:text-slate-400 focus:border-logoColorGreen focus:outline-none lg:py-3 ${error ? 'border-red-500' : 'border-logoColorBlue'}`}
      />
      {error && <p className="absolute text-sm text-red-500">{error}</p>}
    </div>
  );
}
