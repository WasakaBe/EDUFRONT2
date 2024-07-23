import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { apiUrl } from "../../../../constants/Api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MisionVision.css';
export default function MisionVision() {
    const [misiones, setMisiones] = useState([]);
    const [visiones, setVisiones] = useState([]);
    const [currentPageMision, setCurrentPageMision] = useState(1);
    const [currentPageVision, setCurrentPageVision] = useState(1);
    const itemsPerPage = 6;
    useEffect(() => {
        fetchMisiones();
        fetchVisiones();
    }, []);
    const fetchMisiones = () => {
        fetch(`${apiUrl}mision`)
            .then(response => response.json())
            .then(data => setMisiones(data))
            .catch(error => console.error('Error fetching misiones:', error));
    };
    const fetchVisiones = () => {
        fetch(`${apiUrl}vision`)
            .then(response => response.json())
            .then(data => setVisiones(data))
            .catch(error => console.error('Error fetching visiones:', error));
    };
    const handleMisionPageChange = (pageNumber) => {
        setCurrentPageMision(pageNumber);
    };
    const handleVisionPageChange = (pageNumber) => {
        setCurrentPageVision(pageNumber);
    };
    const handleEditMision = (id_mision) => {
        const newText = prompt('Ingrese el nuevo texto de la misión:');
        if (newText) {
            fetch(`${apiUrl}mision/update/${id_mision}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mision_text: newText }),
            })
                .then(response => response.json())
                .then(() => {
                toast.success('Misión actualizada exitosamente!');
                fetchMisiones(); // Refresh the list
            })
                .catch(error => {
                console.error('Error updating mision:', error);
                toast.error('Error al actualizar la misión');
            });
        }
    };
    const handleDeleteMision = (id_mision) => {
        if (window.confirm('¿Está seguro de que desea eliminar esta misión?')) {
            fetch(`${apiUrl}mision/delete/${id_mision}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(() => {
                toast.success('Misión eliminada exitosamente!');
                fetchMisiones(); // Refresh the list
            })
                .catch(error => {
                console.error('Error deleting mision:', error);
                toast.error('Error al eliminar la misión');
            });
        }
    };
    const handleEditVision = (id_vision) => {
        const newText = prompt('Ingrese el nuevo texto de la visión:');
        if (newText) {
            fetch(`${apiUrl}vision/update/${id_vision}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ vision_text: newText }),
            })
                .then(response => response.json())
                .then(() => {
                toast.success('Visión actualizada exitosamente!');
                fetchVisiones(); // Refresh the list
            })
                .catch(error => {
                console.error('Error updating vision:', error);
                toast.error('Error al actualizar la visión');
            });
        }
    };
    const handleDeleteVision = (id_vision) => {
        if (window.confirm('¿Está seguro de que desea eliminar esta visión?')) {
            fetch(`${apiUrl}vision/delete/${id_vision}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(() => {
                toast.success('Visión eliminada exitosamente!');
                fetchVisiones(); // Refresh the list
            })
                .catch(error => {
                console.error('Error deleting vision:', error);
                toast.error('Error al eliminar la visión');
            });
        }
    };
    // Calcular los elementos actuales a mostrar por página
    const indexOfLastMision = currentPageMision * itemsPerPage;
    const indexOfFirstMision = indexOfLastMision - itemsPerPage;
    const currentMisiones = misiones.slice(indexOfFirstMision, indexOfLastMision);
    const indexOfLastVision = currentPageVision * itemsPerPage;
    const indexOfFirstVision = indexOfLastVision - itemsPerPage;
    const currentVisiones = visiones.slice(indexOfFirstVision, indexOfLastVision);
    // Calcular el número de páginas
    const totalPagesMision = Math.ceil(misiones.length / itemsPerPage);
    const totalPagesVision = Math.ceil(visiones.length / itemsPerPage);
    return (_jsxs("div", { className: "mision-vision-container", children: [_jsx("h2", { children: "Misi\u00F3n y Visi\u00F3n" }), _jsxs("div", { className: "table-container", children: [_jsx("h3", { children: "Misiones" }), _jsxs("table", { className: "mision-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "Texto de la Misi\u00F3n" }), _jsx("th", { children: "Acciones" })] }) }), _jsx("tbody", { children: currentMisiones.map(mision => (_jsxs("tr", { children: [_jsx("td", { children: mision.id_mision }), _jsx("td", { children: mision.mision_text }), _jsxs("td", { children: [_jsx("button", { className: 'edit-button', onClick: () => handleEditMision(mision.id_mision), children: "Editar" }), _jsx("button", { className: 'save-button', onClick: () => handleDeleteMision(mision.id_mision), children: "Eliminar" })] })] }, mision.id_mision))) })] }), _jsx("div", { className: "pagination", children: Array.from({ length: totalPagesMision }, (_, index) => (_jsx("button", { className: `page-button ${currentPageMision === index + 1 ? 'active' : ''}`, onClick: () => handleMisionPageChange(index + 1), children: index + 1 }, index + 1))) })] }), _jsxs("div", { className: "table-container", children: [_jsx("h3", { children: "Visiones" }), _jsxs("table", { className: "vision-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "Texto de la Visi\u00F3n" }), _jsx("th", { children: "Acciones" })] }) }), _jsx("tbody", { children: currentVisiones.map(vision => (_jsxs("tr", { children: [_jsx("td", { children: vision.id_vision }), _jsx("td", { children: vision.vision_text }), _jsxs("td", { children: [_jsx("button", { className: 'edit-button', onClick: () => handleEditVision(vision.id_vision), children: "Editar" }), _jsx("button", { className: 'save-button', onClick: () => handleDeleteVision(vision.id_vision), children: "Eliminar" })] })] }, vision.id_vision))) })] }), _jsx("div", { className: "pagination", children: Array.from({ length: totalPagesVision }, (_, index) => (_jsx("button", { className: `page-button ${currentPageVision === index + 1 ? 'active' : ''}`, onClick: () => handleVisionPageChange(index + 1), children: index + 1 }, index + 1))) })] }), _jsx(ToastContainer, {})] }));
}
