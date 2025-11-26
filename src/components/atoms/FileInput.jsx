export default function FileInput({
  id,
  name,
  accept = '',
  onChange,
  required = false,
}) {
  return (
    <input
      id={id}
      name={name}
      type="file"
      accept={accept}
      onChange={e => onChange?.(e.target.files?.[0])}
      required={required}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
    />
  );
}