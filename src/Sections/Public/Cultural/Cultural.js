import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import './Cultural.css';
import { apiUrl } from '../../../constants/Api';
const Cultural = () => {
    const [culturalActivities, setCulturalActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    useEffect(() => {
        fetchCulturalActivities();
    }, []);
    const fetchCulturalActivities = async () => {
        try {
            const response = await fetch(`${apiUrl}actividades_culturales`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCulturalActivities(data);
        }
        catch (error) {
            console.error('Error fetching cultural activities:', error);
        }
    };
    const handleImageClick = (activity) => {
        setSelectedActivity(activity);
    };
    const closeModal = () => {
        setSelectedActivity(null);
    };
    return (_jsxs("div", { className: "cultural-container", children: [_jsx("h1", { className: "cultural-title", children: "Actividades Culturales" }), culturalActivities.length > 0 ? (_jsx("div", { className: "cultural-grid", children: culturalActivities.map((activity) => (_jsx("div", { className: "cultural-item", onClick: () => handleImageClick(activity), children: activity.imagen_actividad_cultural ? (_jsx("img", { src: `data:image/jpeg;base64,${activity.imagen_actividad_cultural}`, alt: activity.nombre_actividad_cultural })) : (_jsx("span", { children: "No image available" })) }, activity.id_actividad_cultural))) })) : (_jsx("p", { children: "Loading..." })), selectedActivity && (_jsx("div", { className: "modal", children: _jsxs("div", { className: "modal-content", children: [_jsx("span", { className: "close", onClick: closeModal, children: "\u00D7" }), _jsx("h2", { children: selectedActivity.nombre_actividad_cultural }), _jsx("p", { children: selectedActivity.descripcion_actividad_cultural })] }) }))] }));
};
export default Cultural;
