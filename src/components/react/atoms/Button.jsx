export default function Button({
  type = 'button',
  onClick,
  children,
  variant = 'primary',
  disabled = false,
}) {
  const baseStyles = 'px-4 py-3 rounded-lg font-semibold transition-colors';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400',
    secondary: 'bg-gray-300 hover:bg-gray-400 text-gray-900 disabled:bg-gray-200',
    success: 'bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400',
    // Add more variants as needed, examples with tailwind classes
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}