export default function RadioGroup({
  name,
  options = [],
  value = '',
  onChange,
  required = false,
}) {
  return (
    <div className="flex gap-4">
      {options.map(opt => (
        <div key={opt.value}>
          <input
            type="radio"
            id={`${name}-${opt.value}`}
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={e => onChange?.(e.target.value)}
            required={required}
          />
          <label htmlFor={`${name}-${opt.value}`} className="ml-2">
            {opt.label}
          </label>
        </div>
      ))}
    </div>
  );
}