import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { apiUrl } from '../../../constants/Api';
import './Carreras.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Carreras = () => {
    const [carreras, setCarreras] = useState([]);
    const [selectedCarrera, setSelectedCarrera] = useState(null);
    useEffect(() => {
        fetchCarrerasTecnicas();
    }, []);
    const fetchCarrerasTecnicas = async () => {
        try {
            const response = await fetch(`${apiUrl}carreras/tecnicas`);
            const data = await response.json();
            if (data.carreras) {
                setCarreras(data.carreras);
                toast.success('Carreras técnicas cargadas exitosamente');
            }
            else {
                toast.error('No se encontraron carreras técnicas');
            }
        }
        catch (error) {
            toast.error('Error al cargar carreras técnicas');
        }
    };
    const handleImageClick = (carrera) => {
        setSelectedCarrera(carrera);
    };
    const closeModal = () => {
        setSelectedCarrera(null);
    };
    return (_jsxs("div", { className: "carreras-container", children: [_jsx("h1", { className: "titulo-centrado", children: "Carreras T\u00E9cnicas" }), _jsx("div", { className: "carreras-list", children: carreras.length > 0 ? (carreras.map((carrera) => (_jsx("div", { className: "carrera-card", onClick: () => handleImageClick(carrera), children: carrera.foto_carrera_tecnica && (_jsx("img", { src: `data:image/png;base64,${carrera.foto_carrera_tecnica}`, alt: carrera.nombre_carrera_tecnica, className: "carrera-imagen" })) }, carrera.id_carrera_tecnica)))) : (_jsx("p", { children: "No hay carreras t\u00E9cnicas disponibles en este momento." })) }), selectedCarrera && (_jsx("div", { className: "modal-carreras", onClick: closeModal, children: _jsxs("div", { className: "modal-content-carreras", onClick: (e) => e.stopPropagation(), children: [_jsx("span", { className: "close-button-carreras", onClick: closeModal, children: "\u00D7" }), _jsx("h2", { children: selectedCarrera.nombre_carrera_tecnica }), _jsx("p", { children: selectedCarrera.descripcion_carrera_tecnica })] }) }))] }));
};
export default Carreras;
