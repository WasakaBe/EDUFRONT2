import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { apiUrl } from '../../constants/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BecasModal.css';
const BecasModal = ({ onClose }) => {
    const [becas, setBecas] = useState([]);
    useEffect(() => {
        fetch(`${apiUrl}info_becas`)
            .then((response) => response.json())
            .then((data) => {
            if (Array.isArray(data)) {
                setBecas(data);
            }
            else {
                toast.error('Error fetching data: Data is not an array');
            }
        })
            .catch((error) => toast.error('Error fetching data:', error));
    }, []);
    return (_jsx("div", { className: "modal-overlay-custom", children: _jsxs("div", { className: "modal-custom", children: [_jsx("h2", { children: "Informaci\u00F3n de Becas" }), _jsx("div", { className: "becas-container-custom", children: becas.length > 0 ? (becas.map((beca) => (_jsxs("div", { className: "beca-card-custom", children: [_jsxs("div", { className: "beca-content-custom", children: [beca.foto_info_becas && (_jsx("div", { className: "beca-image-container-custom", children: _jsx("img", { src: `data:image/jpeg;base64,${beca.foto_info_becas}`, alt: "Foto de Beca", className: "beca-image-custom" }) })), _jsxs("div", { children: [_jsx("h3", { children: beca.titulo_info_becas }), _jsx("p", { children: beca.descripcion_info_becas }), _jsx("h4", { children: "Requisitos:" }), _jsx("ul", { children: beca.requisitos_info_becas
                                                    .split('\n')
                                                    .map((requisito, index) => (_jsx("li", { children: requisito }, index))) })] })] }), _jsx("h3", { children: "Ir a control escolar para mas informacion" })] }, beca.id_info_becas)))) : (_jsx("p", { className: "no-records-custom", children: "No hay registros" })) }), _jsx("button", { className: "close-button-custom", onClick: onClose, children: "X" }), _jsx(ToastContainer, {})] }) }));
};
export default BecasModal;
