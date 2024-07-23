import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Modal.css';
const Modal = ({ show, onClose, title, children }) => {
    if (!show) {
        return null;
    }
    const handleOverlayClick = () => {
        onClose();
    };
    const handleModalClick = (e) => {
        e.stopPropagation();
    };
    return (_jsx("div", { className: "modal-overlay4", onClick: handleOverlayClick, children: _jsxs("div", { className: "modal-4", onClick: handleModalClick, children: [_jsxs("div", { className: "modal-header4", children: [_jsx("h2", { children: title }), _jsx("button", { onClick: onClose, className: "close-button-2", children: "X" })] }), _jsx("div", { className: "modal-body4", children: children })] }) }));
};
export default Modal;
