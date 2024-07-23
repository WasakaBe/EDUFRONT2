import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import './ActividadNoticias.css';
import { apiUrl } from '../../../../constants/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ActividadNoticias() {
    const [actividadesNoticias, setActividadesNoticias] = useState([]);
    const [, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [newActividad, setNewActividad] = useState({
        titulo_actividad_noticia: '',
        imagen_actividad_noticia: null,
        descripcion_actividad_noticia: '',
        fecha_actividad_noticias: '',
    });
    useEffect(() => {
        fetchActividadesNoticias();
    }, []);
    const fetchActividadesNoticias = async () => {
        try {
            const response = await fetch(`${apiUrl}actividades_noticias`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setActividadesNoticias(data || []);
        }
        catch (error) {
            setError('Error fetching actividades noticias');
            toast.error('Error fetching actividades noticias');
        }
    };
    const deleteActividadNoticia = async (id) => {
        try {
            const response = await fetch(`${apiUrl}actividades_noticias/delete/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchActividadesNoticias();
            toast.success('Actividad noticia eliminada exitosamente');
        }
        catch (error) {
            setError('Error deleting actividad noticia');
            toast.error('Error deleting actividad noticia');
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewActividad((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleImageChange = (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        setNewActividad((prev) => ({
            ...prev,
            imagen_actividad_noticia: file,
        }));
    };
    const addActividadNoticia = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titulo_actividad_noticia', newActividad.titulo_actividad_noticia);
        formData.append('descripcion_actividad_noticia', newActividad.descripcion_actividad_noticia);
        if (newActividad.imagen_actividad_noticia) {
            formData.append('imagen_actividad_noticia', newActividad.imagen_actividad_noticia);
        }
        const fechaActividad = new Date(newActividad.fecha_actividad_noticias).toISOString().slice(0, 19).replace('T', ' ');
        formData.append('fecha_actividad_noticias', fechaActividad);
        try {
            const response = await fetch(`${apiUrl}actividades_noticias/insert`, {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchActividadesNoticias();
            setIsModalOpen(false);
            setNewActividad({
                titulo_actividad_noticia: '',
                imagen_actividad_noticia: null,
                descripcion_actividad_noticia: '',
                fecha_actividad_noticias: '',
            });
            toast.success('Actividad noticia agregada exitosamente');
        }
        catch (error) {
            setError('Error agregando actividad noticia');
            toast.error('Error agregando actividad noticia');
        }
    };
    const editActividadNoticia = async (e) => {
        e.preventDefault();
        if (currentId === null)
            return;
        const formData = new FormData();
        formData.append('titulo_actividad_noticia', newActividad.titulo_actividad_noticia);
        formData.append('descripcion_actividad_noticia', newActividad.descripcion_actividad_noticia);
        if (newActividad.imagen_actividad_noticia) {
            formData.append('imagen_actividad_noticia', newActividad.imagen_actividad_noticia);
        }
        formData.append('fecha_actividad_noticias', newActividad.fecha_actividad_noticias || new Date().toISOString().slice(0, 19).replace('T', ' '));
        try {
            const response = await fetch(`${apiUrl}actividades_noticias/update/${currentId}`, {
                method: 'PUT',
                body: formData
            });
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'Network response was not ok');
            }
            fetchActividadesNoticias();
            setIsModalOpen(false);
            setIsEditing(false);
            setCurrentId(null);
            setNewActividad({
                titulo_actividad_noticia: '',
                imagen_actividad_noticia: null,
                descripcion_actividad_noticia: '',
                fecha_actividad_noticias: '',
            });
            toast.success('Actividad noticia actualizada exitosamente');
        }
        catch (error) {
            setError('Error actualizando actividad noticia');
            if (error instanceof Error) {
                toast.error(`Error actualizando actividad noticia: ${error.message}`);
            }
            else {
                toast.error('Error actualizando actividad noticia');
            }
        }
    };
    const openEditModal = (actividad) => {
        setNewActividad({
            titulo_actividad_noticia: actividad.titulo_actividad_noticia,
            imagen_actividad_noticia: null,
            descripcion_actividad_noticia: actividad.descripcion_actividad_noticia,
            fecha_actividad_noticias: new Date(actividad.fecha_actividad_noticias).toISOString().slice(0, 16)
        });
        setCurrentId(actividad.id_actividades_noticias);
        setIsEditing(true);
        setIsModalOpen(true);
    };
    return (_jsxs("div", { className: "info-docent-container", children: [_jsx(ToastContainer, {}), _jsx("button", { className: "add-button", onClick: () => {
                    setIsEditing(false);
                    setIsModalOpen(true);
                }, children: "Agregar Actividad/Noticia" }), _jsx("div", { className: 'docents-table-container', children: _jsxs("table", { className: "docents-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "T\u00EDtulo" }), _jsx("th", { children: "Imagen" }), _jsx("th", { children: "Descripci\u00F3n" }), _jsx("th", { children: "Fecha" }), _jsx("th", { children: "Acciones" })] }) }), _jsx("tbody", { children: actividadesNoticias.length > 0 ? (actividadesNoticias.map((actividad) => (_jsxs("tr", { children: [_jsx("td", { children: actividad.titulo_actividad_noticia }), _jsx("td", { children: actividad.imagen_actividad_noticia && (_jsx("img", { src: `data:image/png;base64,${actividad.imagen_actividad_noticia}`, alt: actividad.titulo_actividad_noticia, className: "actividad-noticias-imagen" })) }), _jsx("td", { children: actividad.descripcion_actividad_noticia }), _jsx("td", { children: actividad.fecha_actividad_noticias }), _jsxs("td", { children: [_jsx("button", { className: "edit-button", onClick: () => openEditModal(actividad), children: "Editar" }), _jsx("button", { className: "delete-button", onClick: () => deleteActividadNoticia(actividad.id_actividades_noticias), children: "Eliminar" })] })] }, actividad.id_actividades_noticias)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 5, children: "No hay actividades noticias disponibles." }) })) })] }) }), isModalOpen && (_jsx("div", { className: "modal-info", children: _jsx("div", { className: "modal-content-info", children: _jsxs("form", { className: 'form-group', onSubmit: isEditing ? editActividadNoticia : addActividadNoticia, children: [_jsxs("h3", { children: [isEditing ? 'Editar' : 'Agregar', " Actividad/Noticia"] }), _jsxs("label", { children: ["T\u00EDtulo:", _jsx("input", { type: "text", name: "titulo_actividad_noticia", value: newActividad.titulo_actividad_noticia, onChange: handleInputChange, required: true })] }), _jsxs("label", { children: ["Imagen:", _jsx("input", { type: "file", name: "imagen_actividad_noticia", onChange: handleImageChange, required: !isEditing })] }), _jsxs("label", { children: ["Descripci\u00F3n:", _jsx("textarea", { name: "descripcion_actividad_noticia", value: newActividad.descripcion_actividad_noticia, onChange: handleInputChange, required: true })] }), _jsxs("label", { children: ["Fecha:", _jsx("input", { type: "datetime-local", name: "fecha_actividad_noticias", value: newActividad.fecha_actividad_noticias, onChange: handleInputChange, required: true })] }), _jsxs("div", { className: 'buttons', children: [_jsx("button", { type: "submit", className: "save-button", children: isEditing ? 'Actualizar' : 'Agregar' }), _jsx("span", { className: "delete-button", onClick: () => setIsModalOpen(false), children: "\u00D7" })] })] }) }) }))] }));
}
