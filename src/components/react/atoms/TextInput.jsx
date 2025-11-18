export default function TextInput({
  id,
  name,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  required = false,
  pattern = '',
  error = '',
}) {
  return (
    <div className="mb-4">
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        required={required}
        pattern={pattern}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
