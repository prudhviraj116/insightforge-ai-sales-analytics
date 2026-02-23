import { FaRobot } from "react-icons/fa";

function FloatingAIButton({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-white text-black p-4 rounded-full shadow-xl cursor-pointer hover:scale-110 transition"
    >
      <FaRobot size={24} />
    </div>
  );
}

export default FloatingAIButton;
