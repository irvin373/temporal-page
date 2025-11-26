export default function TextInput({ 
  id, 
  name, 
  type = "text", 
  value, 
  onChange,
  onBlur, 
  placeholder, 
  initialClassName = "w-full px-4 py-3 border border-gray-300 rounded-lg",
  className = "" 
  })
  
  {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`${initialClassName} ${className}`}
    />
  );
}
