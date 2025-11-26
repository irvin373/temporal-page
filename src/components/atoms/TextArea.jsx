export default function Textarea({
  id,
  name,
  placeholder = '',
  value = '',
  onChange,
  rows = 4,
  required = false,
}) {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      rows={rows}
      required={required}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );
}