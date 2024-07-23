import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { apiUrl } from '../../../../constants/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CarrerasTecnicasAdmin() {
    const [carreras, setCarreras] = useState([]);
    const [newCarrera, setNewCarrera] = useState({
        nombre_carrera_tecnica: '',
        descripcion_carrera_tecnica: '',
        foto_carrera_tecnica: null,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    useEffect(() => {
        fetchCarreras();
    }, []);
    const fetchCarreras = async () => {
        try {
            const response = await fetch(`${apiUrl}carreras/tecnicas`);
            const data = await response.json();
            setCarreras(data.carreras);
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(`Error fetching carreras técnicas: ${error.message}`);
            }
            else {
                toast.error('Error fetching carreras técnicas');
            }
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCarrera((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleImageChange = (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewCarrera((prev) => ({
                    ...prev,
                    foto_carrera_tecnica: reader.result ? reader.result.toString().split(',')[1] : null,
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    const addCarreraTecnica = async () => {
        try {
            const response = await fetch(`${apiUrl}carreras/tecnicas/insert`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCarrera),
            });
            if (!response.ok) {
                toast.error('Network response was not ok');
                return;
            }
            fetchCarreras();
            setIsModalOpen(false);
            setNewCarrera({
                nombre_carrera_tecnica: '',
                descripcion_carrera_tecnica: '',
                foto_carrera_tecnica: null,
            });
            toast.success('Carrera técnica agregada exitosamente');
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(`Error al agregar carrera técnica: ${error.message}`);
            }
        }
    };
    const updateCarreraTecnica = async (id) => {
        if (id === null)
            return;
        try {
            const response = await fetch(`${apiUrl}carreras/tecnicas/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCarrera),
            });
            if (!response.ok) {
                toast.error('Network response was not ok');
                return;
            }
            fetchCarreras();
            setIsModalOpen(false);
            setIsEditing(false);
            setCurrentId(null);
            setNewCarrera({
                nombre_carrera_tecnica: '',
                descripcion_carrera_tecnica: '',
                foto_carrera_tecnica: null,
            });
            toast.success('Carrera técnica actualizada exitosamente');
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(`Error al actualizar carrera técnica: ${error.message}`);
            }
        }
    };
    const deleteCarreraTecnica = async (id) => {
        try {
            const response = await fetch(`${apiUrl}carreras/tecnicas/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                toast.error('Network response was not ok');
                return;
            }
            fetchCarreras();
            toast.success('Carrera técnica eliminada exitosamente');
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(`Error al eliminar carrera técnica: ${error.message}`);
            }
        }
    };
    const openEditModal = (carrera) => {
        setNewCarrera({
            nombre_carrera_tecnica: carrera.nombre_carrera_tecnica,
            descripcion_carrera_tecnica: carrera.descripcion_carrera_tecnica,
            foto_carrera_tecnica: carrera.foto_carrera_tecnica,
        });
        setCurrentId(carrera.id_carrera_tecnica);
        setIsEditing(true);
        setIsModalOpen(true);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = carreras.slice(indexOfFirstItem, indexOfLastItem);
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(carreras.length / itemsPerPage); i++) {
            pageNumbers.push(_jsx("button", { onClick: () => handlePageChange(i), className: currentPage === i ? 'active' : '', children: i }, i));
        }
        return pageNumbers;
    };
    return (_jsxs("div", { className: "actividad-noticias-container", children: [_jsx(ToastContainer, {}), _jsx("button", { className: "add-button", onClick: () => {
                    setIsEditing(false);
                    setIsModalOpen(true);
                }, children: "Agregar Carrera T\u00E9cnica" }), _jsxs("table", { className: "actividad-noticias-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Nombre" }), _jsx("th", { children: "Descripci\u00F3n" }), _jsx("th", { children: "Foto" }), _jsx("th", { children: "Acciones" })] }) }), _jsx("tbody", { children: currentItems.map((carrera) => (_jsxs("tr", { children: [_jsx("td", { children: carrera.nombre_carrera_tecnica }), _jsx("td", { children: carrera.descripcion_carrera_tecnica }), _jsx("td", { children: carrera.foto_carrera_tecnica && (_jsx("img", { src: `data:image/png;base64,${carrera.foto_carrera_tecnica}`, alt: carrera.nombre_carrera_tecnica, className: "actividad-noticias-imagen" })) }), _jsxs("td", { children: [_jsx("button", { className: "edit-button", onClick: () => openEditModal(carrera), children: "Editar" }), _jsx("button", { className: "delete-button", onClick: () => deleteCarreraTecnica(carrera.id_carrera_tecnica), children: "Eliminar" })] })] }, carrera.id_carrera_tecnica))) })] }), _jsx("div", { className: "pagination", children: renderPageNumbers() }), isModalOpen && (_jsx("div", { className: "register-modal-overlay", children: _jsx("div", { className: "register-modal-content", children: _jsxs("form", { className: 'form-group', onSubmit: (e) => {
                            e.preventDefault();
                            isEditing ? updateCarreraTecnica(currentId) : addCarreraTecnica();
                        }, children: [_jsxs("h3", { children: [isEditing ? 'Editar' : 'Agregar', " Carrera T\u00E9cnica"] }), _jsxs("label", { children: ["Nombre:", _jsx("input", { type: "text", name: "nombre_carrera_tecnica", value: newCarrera.nombre_carrera_tecnica, onChange: handleInputChange, required: true })] }), _jsxs("label", { children: ["Descripci\u00F3n:", _jsx("textarea", { name: "descripcion_carrera_tecnica", value: newCarrera.descripcion_carrera_tecnica, onChange: handleInputChange, required: true })] }), _jsxs("label", { children: ["Foto:", _jsx("input", { type: "file", name: "foto_carrera_tecnica", onChange: handleImageChange, required: !isEditing })] }), _jsx("button", { type: "submit", className: "save-button", children: isEditing ? 'Actualizar' : 'Agregar' }), _jsx("span", { className: "cancel-button", onClick: () => setIsModalOpen(false), children: "\u00D7" })] }) }) }))] }));
}
