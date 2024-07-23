import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './ReinscriptionModal.css';
const ReinscriptionModal = ({ onClose }) => {
    return (_jsx("div", { className: "modal-overlay-custom", children: _jsxs("div", { className: "modal-custom", children: [_jsx("button", { className: "modal-close close-button-custom", onClick: onClose, children: "\u00D7" }), _jsx("h2", { children: "Informaci\u00F3n de Reinscripcion" }), _jsxs("div", { className: "becas-container-custom", children: [_jsx("p", { children: "Sin Informacion Por el Momento" }), _jsx("br", {})] }), _jsx("h3", { children: "Ir a control escolar para mas informacion" })] }) }));
};
export default ReinscriptionModal;
