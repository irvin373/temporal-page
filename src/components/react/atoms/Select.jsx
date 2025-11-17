export default function Select({
  id,
  name,
  value = '',
  onChange,
  options = [],
  required = false,
}) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      required={required}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="">-- Select --</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}