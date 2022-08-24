import { createPortal } from "react-dom";
import {React, useEffect} from 'react';
const modalRoot = document.getElementById("modal-root");

function Modal({img, onClose}) {

  useEffect(() => {

    const handleKeydown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeydown);
 
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    }
  }, [onClose])
  
  
  
  const handleOverlayClick = (e) => {
    const overlay = document.querySelector(".Overlay");

    if (e.target === overlay) {
      onClose();
    }

  };


  return createPortal(
      <div className="Overlay" onClick={handleOverlayClick}>
          <div className="modal">
          <img src={img.largeImageURL} alt={img.tags}/>
          </div>
    </div>,
    modalRoot
  );
  
}

export default Modal;