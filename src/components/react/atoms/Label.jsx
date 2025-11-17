export default function Label({ htmlFor, children, required = false }) {
  return (
    <label htmlFor={htmlFor}>
      {children}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );
}