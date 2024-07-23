import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { apiUrl } from '../../../../constants/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './InfoBecas.css';
const InfoBecas = () => {
    const [becas, setBecas] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [requisitos, setRequisitos] = useState('');
    const [foto, setFoto] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [currentBecaId, setCurrentBecaId] = useState(null);
    useEffect(() => {
        fetch(`${apiUrl}info_becas`)
            .then(response => response.json())
            .then(data => {
            if (Array.isArray(data)) {
                setBecas(data);
            }
            else {
                toast.error('Error fetching data: Data is not an array');
            }
        })
            .catch(error => toast.error('Error fetching data:', error));
    }, []);
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFoto(file);
        }
    };
    const handleCreateBeca = () => {
        if (!titulo || !descripcion || !requisitos || !foto) {
            toast.error('Todos los campos son obligatorios');
            return;
        }
        const formData = new FormData();
        formData.append('titulo_info_becas', titulo);
        formData.append('descripcion_info_becas', descripcion);
        formData.append('requisitos_info_becas', requisitos);
        formData.append('foto_info_becas', foto);
        fetch(`${apiUrl}info_becas/insert`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
            if (data.error) {
                toast.error(data.error);
            }
            else {
                toast.success('Información de beca creada exitosamente');
                setBecas([...becas, data]);
                setIsCreateModalOpen(false);
                // Clear form fields
                setTitulo('');
                setDescripcion('');
                setRequisitos('');
                setFoto(null);
            }
        })
            .catch(error => toast.error('Error creating data:', error));
    };
    const handleUpdateBeca = () => {
        if (currentBecaId === null)
            return;
        const formData = new FormData();
        formData.append('titulo_info_becas', titulo);
        formData.append('descripcion_info_becas', descripcion);
        formData.append('requisitos_info_becas', requisitos);
        if (foto) {
            formData.append('foto_info_becas', foto);
        }
        fetch(`${apiUrl}info_becas/update/${currentBecaId}`, {
            method: 'PUT',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
            if (data.error) {
                toast.error(data.error);
            }
            else {
                toast.success('Información de beca actualizada exitosamente');
                setBecas(becas.map(beca => (beca.id_info_becas === currentBecaId ? data : beca)));
                setIsUpdateModalOpen(false);
                // Clear form fields
                setTitulo('');
                setDescripcion('');
                setRequisitos('');
                setFoto(null);
                setCurrentBecaId(null);
            }
        })
            .catch(error => toast.error('Error updating data:', error));
    };
    const openUpdateModal = (beca) => {
        setTitulo(beca.titulo_info_becas);
        setDescripcion(beca.descripcion_info_becas);
        setRequisitos(beca.requisitos_info_becas);
        setFoto(null);
        setCurrentBecaId(beca.id_info_becas);
        setIsUpdateModalOpen(true);
    };
    const handleDeleteBeca = (id) => {
        fetch(`${apiUrl}info_becas/delete/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
            if (data.error) {
                toast.error(data.error);
            }
            else {
                toast.success('Información de beca eliminada exitosamente');
                setBecas(becas.filter(beca => beca.id_info_becas !== id));
            }
        })
            .catch(error => toast.error('Error deleting data:', error));
    };
    return (_jsxs("div", { className: "info-becas-container", children: [_jsx("h2", { children: "Informaci\u00F3n de Becas" }), _jsx("button", { className: "add-button", onClick: () => setIsCreateModalOpen(true), children: "Agregar Informaci\u00F3n" }), _jsxs("table", { className: "becas-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "T\u00EDtulo" }), _jsx("th", { children: "Descripci\u00F3n" }), _jsx("th", { children: "Requisitos" }), _jsx("th", { children: "Foto" }), _jsx("th", { children: "Acciones" })] }) }), _jsx("tbody", { children: becas.length > 0 ? (becas.map(beca => (_jsxs("tr", { children: [_jsx("td", { children: beca.titulo_info_becas }), _jsx("td", { children: beca.descripcion_info_becas }), _jsx("td", { children: beca.requisitos_info_becas }), _jsx("td", { children: beca.foto_info_becas && _jsx("img", { src: `data:image/jpeg;base64,${beca.foto_info_becas}`, alt: "Foto de Beca" }) }), _jsxs("td", { children: [_jsx("button", { className: "update-button", onClick: () => openUpdateModal(beca), children: "Actualizar" }), _jsx("button", { className: "delete-button", onClick: () => handleDeleteBeca(beca.id_info_becas), children: "Eliminar" })] })] }, beca.id_info_becas)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "no-records", children: "No hay registros" }) })) })] }), isCreateModalOpen && (_jsx("div", { className: "modal-overlay-becas", children: _jsxs("div", { className: "modal-becas", children: [_jsx("h2", { children: "Agregar Informaci\u00F3n de Beca" }), _jsxs("div", { className: "form-becas", children: [_jsx("input", { type: "text", placeholder: "T\u00EDtulo", value: titulo, onChange: (e) => setTitulo(e.target.value) }), _jsx("textarea", { placeholder: "Descripci\u00F3n", value: descripcion, onChange: (e) => setDescripcion(e.target.value) }), _jsx("textarea", { placeholder: "Requisitos", value: requisitos, onChange: (e) => setRequisitos(e.target.value) }), _jsx("input", { type: "file", onChange: handleImageChange }), _jsx("button", { onClick: handleCreateBeca, children: "Crear Beca" }), _jsx("button", { className: "close-button-becas", onClick: () => setIsCreateModalOpen(false), children: "Cerrar" })] })] }) })), isUpdateModalOpen && (_jsx("div", { className: "modal-overlay-becas", children: _jsxs("div", { className: "modal-becas", children: [_jsx("h2", { children: "Actualizar Informaci\u00F3n de Beca" }), _jsxs("div", { className: "form-becas", children: [_jsx("input", { type: "text", placeholder: "T\u00EDtulo", value: titulo, onChange: (e) => setTitulo(e.target.value) }), _jsx("textarea", { placeholder: "Descripci\u00F3n", value: descripcion, onChange: (e) => setDescripcion(e.target.value) }), _jsx("textarea", { placeholder: "Requisitos", value: requisitos, onChange: (e) => setRequisitos(e.target.value) }), _jsx("input", { type: "file", onChange: handleImageChange }), _jsx("button", { onClick: handleUpdateBeca, children: "Actualizar Beca" }), _jsx("button", { className: "close-button-becas", onClick: () => setIsUpdateModalOpen(false), children: "Cerrar" })] })] }) })), _jsx(ToastContainer, {})] }));
};
export default InfoBecas;
