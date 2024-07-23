import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import './Activities.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl } from '../../../constants/Api';
const Activities = () => {
    const [activitiesData, setActivitiesData] = useState([]);
    const slideRef = useRef(null);
    useEffect(() => {
        fetchActivities();
    }, []);
    const fetchActivities = async () => {
        try {
            const response = await fetch(`${apiUrl}actividades_noticias`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.length) {
                setActivitiesData(data);
            }
            else {
                toast.info('No hay actividades noticias disponibles.');
            }
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error('Error fetching actividades noticias: ' + error.message);
            }
        }
    };
    const handleNext = () => {
        const slide = slideRef.current;
        if (slide && slide.firstElementChild) {
            slide.appendChild(slide.firstElementChild);
        }
    };
    const handlePrev = () => {
        const slide = slideRef.current;
        if (slide && slide.lastElementChild) {
            slide.prepend(slide.lastElementChild);
        }
    };
    return (_jsxs("div", { className: "container-act", children: [_jsx("div", { id: "slide", ref: slideRef, children: activitiesData.map((activity, index) => (_jsx("div", { className: "item", style: { backgroundImage: `url(data:image/png;base64,${activity.imagen_actividad_noticia})` }, children: _jsxs("div", { className: "content", children: [_jsx("div", { className: "name", children: activity.titulo_actividad_noticia }), _jsx("div", { className: "des", children: activity.descripcion_actividad_noticia }), _jsx("button", { className: "button-success btx", id: "vermas", children: "Ver m\u00E1s" })] }) }, index))) }), _jsxs("div", { className: "buttonsx", children: [_jsx("button", { className: "b1", id: "prev", onClick: handlePrev, children: _jsx("ion-icon", { name: "arrow-back-circle-outline" }) }), _jsx("button", { className: "b1", id: "next", onClick: handleNext, children: _jsx("ion-icon", { name: "arrow-forward-circle-outline" }) })] })] }));
};
export default Activities;
