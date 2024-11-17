const ActionButton = ({
  onClick,
  icon: Icon,
  color = "bg-gray-600",
  label,
  className = "",
}) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-full ${color} text-white hover:opacity-80 transition-all duration-200
        flex items-center gap-2 ${className}`}
  >
    <Icon size={20} />
    {label && <span className="text-sm">{label}</span>}
  </button>
);

export default ActionButton;
