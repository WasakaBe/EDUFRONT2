import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../../constants/Api';
import './Inscription.css';
const Inscription = () => {
    const [inscriptionData, setInscriptionData] = useState(null);
    const navigate = useNavigate();
    const BtnInscripcion = () => {
        navigate('/Formulario/Inscription');
    };
    useEffect(() => {
        const fetchInscriptionData = async () => {
            try {
                const response = await fetch(`${apiUrl}info_inscription`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                if (data.length > 0) {
                    setInscriptionData(data[0]);
                }
            }
            catch (error) {
                console.error('Error fetching inscription data:', error);
            }
        };
        fetchInscriptionData();
    }, []);
    if (!inscriptionData) {
        return _jsx("div", { children: "Loading..." });
    }
    const renderRequeriments = () => {
        return inscriptionData.requeriments_info_inscription
            .split('\n')
            .map((req, index) => _jsx("li", { children: req }, index));
    };
    return (_jsxs("div", { className: "inscription-container", id: 'Inscripcion', children: [_jsxs("div", { className: "inscription-text", children: [_jsx("h1", { children: "REQUISITOS PARA LA INSCRIPCI\u00D3N" }), _jsx("p", { children: inscriptionData.txt_info_inscription }), _jsx("ul", { children: renderRequeriments() }), _jsx("h1", { children: "Periodo:" }), _jsx("p", { children: inscriptionData.periodo_info_inscripcion }), _jsx("button", { onClick: BtnInscripcion, className: "btn-view", children: "Ver m\u00E1s \u2192" })] }), _jsx("div", { className: "inscription-image", children: _jsx("img", { src: `data:image/png;base64,${inscriptionData.imagen_info_inscription}`, alt: "Welcome" }) })] }));
};
export default Inscription;
