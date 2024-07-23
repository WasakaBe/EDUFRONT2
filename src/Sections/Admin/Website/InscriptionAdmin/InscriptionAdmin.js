import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import './InscriptionAdmin.css';
import { apiUrl } from '../../../../constants/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function InscriptionAdmin() {
    const [inscriptions, setInscriptions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newInscription, setNewInscription] = useState({
        txt_info_inscription: '',
        requeriments_info_inscription: '',
        periodo_info_inscripcion: '',
        imagen_info_inscription: null,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    useEffect(() => {
        fetchInscriptions();
    }, []);
    const fetchInscriptions = async () => {
        try {
            const response = await fetch(`${apiUrl}info_inscription`);
            if (!response.ok) {
                toast.error(`Network response was not ok: ${response.statusText}`);
                return;
            }
            const data = await response.json();
            setInscriptions(data || []);
        }
        catch (error) {
            toast.error('Error fetching inscriptions');
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewInscription((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleImageChange = (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        setNewInscription((prev) => ({
            ...prev,
            imagen_info_inscription: file,
        }));
    };
    const addOrUpdateInscription = async (e) => {
        e.preventDefault();
        const url = isEditing
            ? `${apiUrl}info_inscription/update/${currentId}`
            : `${apiUrl}info_inscription/insert`;
        const method = isEditing ? 'PUT' : 'POST';
        const formData = new FormData();
        formData.append('txt_info_inscription', newInscription.txt_info_inscription);
        formData.append('requeriments_info_inscription', newInscription.requeriments_info_inscription);
        formData.append('periodo_info_inscripcion', newInscription.periodo_info_inscripcion);
        if (newInscription.imagen_info_inscription) {
            formData.append('imagen_info_inscription', newInscription.imagen_info_inscription);
        }
        try {
            const response = await fetch(url, {
                method,
                body: formData,
            });
            if (!response.ok) {
                toast.error(`Network response was not ok: ${response.statusText}`);
                return;
            }
            fetchInscriptions();
            setIsModalOpen(false);
            setIsEditing(false);
            setCurrentId(null);
            setNewInscription({
                txt_info_inscription: '',
                requeriments_info_inscription: '',
                periodo_info_inscripcion: '',
                imagen_info_inscription: null,
            });
            toast.success(`Inscription ${isEditing ? 'updated' : 'added'} successfully`);
        }
        catch (error) {
            toast.error(`Error ${isEditing ? 'updating' : 'adding'} inscription`);
        }
    };
    const deleteInscription = async (id) => {
        try {
            const response = await fetch(`${apiUrl}info_inscription/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                toast.error(`Network response was not ok: ${response.statusText}`);
                return;
            }
            fetchInscriptions();
            toast.success('Inscription deleted successfully');
        }
        catch (error) {
            toast.error('Error deleting inscription');
        }
    };
    const openEditModal = (inscription) => {
        setNewInscription({
            txt_info_inscription: inscription.txt_info_inscription,
            requeriments_info_inscription: inscription.requeriments_info_inscription,
            periodo_info_inscripcion: inscription.periodo_info_inscripcion,
            imagen_info_inscription: null,
        });
        setCurrentId(inscription.id_info_inscription);
        setIsEditing(true);
        setIsModalOpen(true);
    };
    return (_jsxs("div", { className: "inscription-admin-container", children: [_jsx(ToastContainer, {}), _jsx("button", { className: "add-button", onClick: () => {
                    setIsEditing(false);
                    setIsModalOpen(true);
                }, children: "Agregar Inscripci\u00F3n" }), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "inscription-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Texto" }), _jsx("th", { children: "Requisitos" }), _jsx("th", { children: "Periodo" }), _jsx("th", { children: "Imagen" }), _jsx("th", { children: "Acciones" })] }) }), _jsx("tbody", { children: inscriptions.length > 0 ? (inscriptions.map((inscription) => (_jsxs("tr", { children: [_jsx("td", { children: inscription.txt_info_inscription }), _jsx("td", { children: inscription.requeriments_info_inscription }), _jsx("td", { children: inscription.periodo_info_inscripcion }), _jsx("td", { children: inscription.imagen_info_inscription && (_jsx("img", { src: `data:image/png;base64,${inscription.imagen_info_inscription}`, alt: "Inscription", className: "inscription-image" })) }), _jsxs("td", { className: "action-buttons", children: [_jsx("button", { className: "edit-button", onClick: () => openEditModal(inscription), children: "Editar" }), _jsx("button", { className: "delete-button", onClick: () => deleteInscription(inscription.id_info_inscription), children: "Eliminar" })] })] }, inscription.id_info_inscription)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 5, children: "No hay inscripciones disponibles." }) })) })] }) }), isModalOpen && (_jsx("div", { className: "register-modal-overlay", children: _jsx("div", { className: "register-modal-content", children: _jsxs("form", { className: "form-group", onSubmit: addOrUpdateInscription, children: [_jsxs("h3", { children: [isEditing ? 'Editar' : 'Agregar', " Inscripci\u00F3n"] }), _jsxs("label", { children: ["Texto:", _jsx("textarea", { name: "txt_info_inscription", value: newInscription.txt_info_inscription, onChange: handleInputChange, required: true })] }), _jsxs("label", { children: ["Requisitos:", _jsx("textarea", { name: "requeriments_info_inscription", value: newInscription.requeriments_info_inscription, onChange: handleInputChange, required: true })] }), _jsxs("label", { children: ["Periodo:", _jsx("textarea", { name: "periodo_info_inscripcion", value: newInscription.periodo_info_inscripcion, onChange: handleInputChange, required: true })] }), _jsxs("label", { children: ["Imagen:", _jsx("input", { type: "file", name: "imagen_info_inscription", onChange: handleImageChange, required: !isEditing })] }), _jsx("button", { type: "submit", className: "save-button", children: isEditing ? 'Actualizar' : 'Agregar' }), _jsx("span", { className: "cancel-button", onClick: () => setIsModalOpen(false), children: "\u00D7" })] }) }) }))] }));
}
