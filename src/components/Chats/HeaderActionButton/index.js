const HeaderActionButton = ({ icon: Icon, label, onClick, missed }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center px-4 py-4 rounded-full 
      ${missed ? "bg-red-100" : "bg-purple-600 hover:bg-purple-700"} 
      ${missed ? "text-red-600" : "text-white"} 
      transition-colors duration-200`}
  >
    <Icon size={20} />
    {label && <span className="ml-2">{label}</span>}
  </button>
);

export default HeaderActionButton;
