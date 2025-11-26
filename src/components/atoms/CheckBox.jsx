export default function CheckBoxInput({
  id,
  name,
  checked,
  onChange,
  required = false,
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        required={required}
        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
    </div>
  );
}
