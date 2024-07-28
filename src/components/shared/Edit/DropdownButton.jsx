
import ReactDOM from 'react-dom';

export const DropdownButton = ({ isOpen, onClose, children, showCloseButton = true }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-3/4">
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
            >
              &#10005;
            </button>
          )}
          {children}
        </div>
      </div>,
      document.getElementById('portal')
    );
};
