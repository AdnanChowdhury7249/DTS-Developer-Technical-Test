import Modal from "react-modal";
import { useEffect, useState } from "react";

Modal.setAppElement("#root");

const TaskModal = ({ isOpen, onClose, children }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowAnimation(true), 10);
    } else {
      setShowAnimation(false);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={`bg-white p-6 rounded-lg shadow-lg w-120 transform transition-all duration-300 ease-out ${showAnimation ? "animate-modalOpen" : "opacity-0 scale-95"
        }`}
      overlayClassName={`fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center transition-opacity duration-500 ease-out ${isOpen ? "opacity-100" : "opacity-0"
        }`}
    >
      {children}
    </Modal>
  );
};

export default TaskModal;
