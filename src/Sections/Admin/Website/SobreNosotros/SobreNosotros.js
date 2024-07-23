import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { apiUrl } from '../../../../constants/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function SobreNosotros() {
    const [sobreNosotros, setSobreNosotros] = useState([]);
    const [newItem, setNewItem] = useState({
        txt_sobre_nosotros: '',
        imagen_sobre_nosotros: null,
        fecha_sobre_nosotros: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    useEffect(() => {
        fetchSobreNosotros();
    }, []);
    const fetchSobreNosotros = async () => {
        try {
            const response = await fetch(`${apiUrl}sobre_nosotros`);
            const data = await response.json();
            setSobreNosotros(data);
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(`Error fetching sobre nosotros: ${error.message}`);
            }
            else {
                toast.error('Error fetching sobre nosotros');
            }
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleImageChange = (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        setNewItem((prev) => ({
            ...prev,
            imagen_sobre_nosotros: file,
        }));
    };
    const addSobreNosotros = async () => {
        try {
            const formData = new FormData();
            formData.append('txt_sobre_nosotros', newItem.txt_sobre_nosotros);
            if (newItem.imagen_sobre_nosotros) {
                formData.append('imagen_sobre_nosotros', newItem.imagen_sobre_nosotros);
            }
            formData.append('fecha_sobre_nosotros', newItem.fecha_sobre_nosotros);
            const response = await fetch(`${apiUrl}sobre_nosotros/insert`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchSobreNosotros();
            setIsModalOpen(false);
            setNewItem({
                txt_sobre_nosotros: '',
                imagen_sobre_nosotros: null,
                fecha_sobre_nosotros: '',
            });
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(`Error adding sobre nosotros: ${error.message}`);
            }
            else {
                toast.error('Error adding sobre nosotros');
            }
        }
    };
    const updateSobreNosotros = async (id) => {
        try {
            const formData = new FormData();
            formData.append('txt_sobre_nosotros', newItem.txt_sobre_nosotros);
            if (newItem.imagen_sobre_nosotros) {
                formData.append('imagen_sobre_nosotros', newItem.imagen_sobre_nosotros);
            }
            formData.append('fecha_sobre_nosotros', newItem.fecha_sobre_nosotros);
            const response = await fetch(`${apiUrl}sobre_nosotros/update/${id}`, {
                method: 'PUT',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchSobreNosotros();
            setIsModalOpen(false);
            setIsEditing(false);
            setCurrentId(null);
            setNewItem({
                txt_sobre_nosotros: '',
                imagen_sobre_nosotros: null,
                fecha_sobre_nosotros: '',
            });
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(`Error updating sobre nosotros: ${error.message}`);
            }
            else {
                toast.error('Error updating sobre nosotros');
            }
        }
    };
    const deleteSobreNosotros = async (id) => {
        try {
            const response = await fetch(`${apiUrl}sobre_nosotros/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchSobreNosotros();
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(`Error deleting sobre nosotros: ${error.message}`);
            }
            else {
                toast.error('Error deleting sobre nosotros');
            }
        }
    };
    const openEditModal = (item) => {
        setNewItem({
            txt_sobre_nosotros: item.txt_sobre_nosotros,
            imagen_sobre_nosotros: null,
            fecha_sobre_nosotros: item.fecha_sobre_nosotros,
        });
        setCurrentId(item.id_sobre_nosotros);
        setIsEditing(true);
        setIsModalOpen(true);
    };
    return (_jsxs("div", { className: "actividad-noticias-container", children: [_jsx(ToastContainer, {}), _jsx("button", { className: "add-button", onClick: () => {
                    setIsEditing(false);
                    setIsModalOpen(true);
                }, children: "Agregar Sobre Nosotros" }), _jsxs("table", { className: "actividad-noticias-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Texto" }), _jsx("th", { children: "Imagen" }), _jsx("th", { children: "Fecha" }), _jsx("th", { children: "Acciones" })] }) }), _jsx("tbody", { children: sobreNosotros.map((item) => (_jsxs("tr", { children: [_jsx("td", { children: item.txt_sobre_nosotros }), _jsx("td", { children: item.imagen_sobre_nosotros && (_jsx("img", { src: `data:image/png;base64,${item.imagen_sobre_nosotros}`, alt: "Sobre Nosotros", className: "actividad-noticias-imagen" })) }), _jsx("td", { children: new Date(item.fecha_sobre_nosotros).toLocaleDateString() }), _jsxs("td", { children: [_jsx("button", { className: "edit-button", onClick: () => openEditModal(item), children: "Editar" }), _jsx("button", { className: "delete-button", onClick: () => deleteSobreNosotros(item.id_sobre_nosotros), children: "Eliminar" })] })] }, item.id_sobre_nosotros))) })] }), isModalOpen && (_jsx("div", { className: "register-modal-overlay", children: _jsx("div", { className: "register-modal-content", children: _jsxs("form", { className: 'form-group', onSubmit: (e) => {
                            e.preventDefault();
                            if (isEditing && currentId !== null) {
                                updateSobreNosotros(currentId);
                            }
                            else {
                                addSobreNosotros();
                            }
                        }, children: [_jsxs("h3", { children: [isEditing ? 'Editar' : 'Agregar', " Sobre Nosotros"] }), _jsxs("label", { children: ["Texto:", _jsx("textarea", { name: "txt_sobre_nosotros", value: newItem.txt_sobre_nosotros, onChange: handleInputChange, required: true })] }), _jsxs("label", { children: ["Imagen:", _jsx("input", { type: "file", name: "imagen_sobre_nosotros", onChange: handleImageChange, required: !isEditing })] }), _jsxs("label", { children: ["Fecha:", _jsx("input", { type: "datetime-local", name: "fecha_sobre_nosotros", value: newItem.fecha_sobre_nosotros, onChange: handleInputChange, required: true })] }), _jsx("button", { type: "submit", className: "save-button", children: isEditing ? 'Actualizar' : 'Agregar' }), _jsx("span", { className: "cancel-button", onClick: () => setIsModalOpen(false), children: "\u00D7" })] }) }) }))] }));
}
