export default function TextInput({
  id,
  name,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  required = false,
  pattern = '',
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      required={required}
      pattern={pattern}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      // Tailwind CSS classes for styling example
    />
  );
}