import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { apiUrl } from '../../../../constants/Api';
import './CredentialsView.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CredentialsView() {
    const [credenciales, setCredenciales] = useState([]);
    const [selectedCredencial, setSelectedCredencial] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [grupos, setGrupos] = useState([]);
    useEffect(() => {
        const fetchCredenciales = async () => {
            try {
                const response = await fetch(`${apiUrl}credencial_escolar`);
                if (!response.ok) {
                    throw new Error('Error al obtener las credenciales escolares');
                }
                const data = await response.json();
                setCredenciales(data);
            }
            catch (error) {
                setError(error.message);
            }
        };
        const fetchGrupos = async () => {
            try {
                const response = await fetch(`${apiUrl}grupo`);
                if (!response.ok) {
                    throw new Error('Error al obtener los grupos');
                }
                const data = await response.json();
                setGrupos(data);
            }
            catch (error) {
                setError(error.message);
            }
        };
        fetchCredenciales();
        fetchGrupos();
    }, []);
    const handleViewMore = (credencial) => {
        setSelectedCredencial(credencial);
        setIsEditing(false);
    };
    const handleEdit = (credencial) => {
        setSelectedCredencial(credencial);
        setIsEditing(true);
    };
    const handleDelete = (credencial) => {
        setSelectedCredencial(credencial);
        setIsDeleting(true);
    };
    const handleCloseModal = () => {
        setSelectedCredencial(null);
        setIsEditing(false);
        setIsDeleting(false);
        setError(null);
        setSuccess(null);
    };
    const handleSaveChanges = async () => {
        if (selectedCredencial) {
            try {
                const response = await fetch(`${apiUrl}credencial_escolar/update/${selectedCredencial.id_credencial_escolar}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(selectedCredencial),
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText);
                }
                const updatedCredencial = await response.json();
                setCredenciales((prevCredenciales) => prevCredenciales.map((credencial) => credencial.id_credencial_escolar === updatedCredencial.id_credencial_escolar ? updatedCredencial : credencial));
                setSuccess('Credencial escolar actualizada exitosamente');
                toast.success('Credencial escolar actualizada exitosamente');
                setIsEditing(false);
            }
            catch (error) {
                setError(error.message);
                setSuccess(null);
                toast.error('Error al actualizar la credencial escolar');
            }
        }
    };
    const handleDeleteConfirm = async () => {
        if (selectedCredencial) {
            try {
                const response = await fetch(`${apiUrl}credencial_escolar/delete/${selectedCredencial.id_credencial_escolar}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText);
                }
                setCredenciales((prevCredenciales) => prevCredenciales.filter((credencial) => credencial.id_credencial_escolar !== selectedCredencial.id_credencial_escolar));
                setSuccess('Credencial escolar eliminada exitosamente');
                toast.success('Credencial escolar eliminada exitosamente');
                handleCloseModal();
            }
            catch (error) {
                setError(error.message);
                setSuccess(null);
                toast.error('Error al eliminar la credencial escolar');
            }
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (selectedCredencial) {
            setSelectedCredencial({ ...selectedCredencial, [name]: value });
        }
    };
    return (_jsxs("div", { className: "credentials-view-container", children: [_jsx("h1", { children: "Lista de Credenciales Escolares" }), _jsx(ToastContainer, {}), error && _jsx("p", { className: "error-message", children: error }), success && _jsx("p", { className: "success-message", children: success }), _jsxs("table", { className: "credentials-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "Nombre" }), _jsx("th", { children: "Apellido Paterno" }), _jsx("th", { children: "Apellido Materno" }), _jsx("th", { children: "Carrera" }), _jsx("th", { children: "Accion" })] }) }), _jsx("tbody", { children: credenciales.map((credencial) => (_jsxs("tr", { children: [_jsx("td", { children: credencial.id_credencial_escolar }), _jsx("td", { children: credencial.nombre_credencial_escolar }), _jsx("td", { children: credencial.app_credencial_escolar }), _jsx("td", { children: credencial.apm_credencial_escolar }), _jsx("td", { children: credencial.carrera_credencial_escolar }), _jsxs("td", { className: 'align', children: [_jsx("button", { className: 'save-button', type: 'button', onClick: () => handleViewMore(credencial), children: "Ver m\u00E1s" }), _jsx("button", { className: 'exit-button', type: 'button', onClick: () => handleEdit(credencial), children: "Editar" }), _jsx("button", { className: 'delete-button', type: 'button', onClick: () => handleDelete(credencial), children: "Eliminar" })] })] }, credencial.id_credencial_escolar))) })] }), selectedCredencial && (_jsx("div", { className: "modal-view", children: _jsxs("div", { className: "modal-content-view", children: [_jsx("span", { className: "close-button-view", onClick: handleCloseModal, children: "\u00D7" }), _jsxs("div", { className: "modal-header-view", children: [_jsx("img", { src: selectedCredencial.foto_credencial_escolar
                                        ? `data:image/jpeg;base64,${selectedCredencial.foto_credencial_escolar}`
                                        : 'default-photo.png', alt: "Foto del Alumno", className: "modal-photo-view" }), _jsxs("div", { className: "modal-title-view", children: [_jsxs("h2", { children: [selectedCredencial.nombre_credencial_escolar, " ", selectedCredencial.app_credencial_escolar, " ", selectedCredencial.apm_credencial_escolar] }), _jsx("p", { className: "modal-subtitle-view", children: selectedCredencial.carrera_credencial_escolar })] })] }), isEditing ? (_jsxs("div", { className: "modal-body-view", children: [_jsxs("p", { children: [_jsx("strong", { children: "ID:" }), " ", selectedCredencial.id_credencial_escolar] }), _jsxs("div", { className: "modal-body-grid", children: [_jsxs("div", { className: "modal-body-field", children: [_jsx("strong", { children: "Nombre:" }), _jsx("input", { type: "text", name: "nombre_credencial_escolar", value: selectedCredencial.nombre_credencial_escolar, onChange: handleChange })] }), _jsxs("div", { className: "modal-body-field", children: [_jsx("strong", { children: "Apellido Paterno:" }), _jsx("input", { type: "text", name: "app_credencial_escolar", value: selectedCredencial.app_credencial_escolar, onChange: handleChange })] }), _jsxs("div", { className: "modal-body-field", children: [_jsx("strong", { children: "Apellido Materno:" }), _jsx("input", { type: "text", name: "apm_credencial_escolar", value: selectedCredencial.apm_credencial_escolar, onChange: handleChange })] }), _jsxs("div", { className: "modal-body-field", children: [_jsx("strong", { children: "Grupo:" }), _jsxs("select", { name: "grupo_credencial_escolar", value: selectedCredencial.grupo_credencial_escolar, onChange: handleChange, children: [_jsx("option", { value: "", children: "Selecciona un grupo" }), grupos.map((grupo) => (_jsx("option", { value: grupo.id_grupos, children: grupo.nombre_grupos }, grupo.id_grupos)))] })] }), _jsxs("div", { className: "modal-body-field", children: [_jsx("strong", { children: "CURP:" }), _jsx("input", { type: "text", name: "curp_credencial_escolar", value: selectedCredencial.curp_credencial_escolar, onChange: handleChange })] }), _jsxs("div", { className: "modal-body-field", children: [_jsx("strong", { children: "No. Control:" }), _jsx("input", { type: "text", name: "nocontrol_credencial_escolar", value: selectedCredencial.nocontrol_credencial_escolar, onChange: handleChange })] }), _jsxs("div", { className: "modal-body-field", children: [_jsx("strong", { children: "Seguro Social:" }), _jsx("input", { type: "text", name: "segsocial_credencial_escolar", value: selectedCredencial.segsocial_credencial_escolar, onChange: handleChange })] })] }), _jsx("button", { className: "save-button", type: "button", onClick: handleSaveChanges, children: "Guardar Cambios" })] })) : (_jsxs("div", { className: "modal-body-view", children: [_jsxs("p", { children: [_jsx("strong", { children: "ID:" }), " ", selectedCredencial.id_credencial_escolar] }), _jsxs("p", { children: [_jsx("strong", { children: "Grupo:" }), " ", selectedCredencial.grupo_credencial_escolar] }), _jsxs("p", { children: [_jsx("strong", { children: "CURP:" }), " ", selectedCredencial.curp_credencial_escolar] }), _jsxs("p", { children: [_jsx("strong", { children: "No. Control:" }), " ", selectedCredencial.nocontrol_credencial_escolar] }), _jsxs("p", { children: [_jsx("strong", { children: "Seguro Social:" }), " ", selectedCredencial.segsocial_credencial_escolar] })] }))] }) })), isDeleting && selectedCredencial && (_jsx("div", { className: "modal-confirmation", children: _jsxs("div", { className: "modal-content-confirmation", children: [_jsx("span", { className: "close-button-confirmation", onClick: handleCloseModal, children: "\u00D7" }), _jsxs("p", { children: ["\u00BFDesea eliminar esta credencial del alumno ", selectedCredencial.nombre_credencial_escolar, "?"] }), _jsx("button", { className: "confirm-button", type: "button", onClick: handleDeleteConfirm, children: "Eliminar" }), _jsx("button", { className: "info-button", type: "button", onClick: handleCloseModal, children: "Cancelar" })] }) }))] }));
}
