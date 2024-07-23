import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import './SchedulesView.css';
import { apiUrl } from '../../../../constants/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
Modal.setAppElement('#root');
const SchedulesView = () => {
    const [horarios, setHorarios] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]);
    const [docentes, setDocentes] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [carrerasTecnicas, setCarrerasTecnicas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedHorario, setSelectedHorario] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const itemsPerPage = 4;
    useEffect(() => {
        fetch(`${apiUrl}horarios_escolares`)
            .then((response) => response.json())
            .then((data) => {
            if (Array.isArray(data)) {
                setHorarios(data);
            }
            else {
                toast.error('Error fetching data: Data is not an array');
            }
        })
            .catch((error) => toast.error(`Error fetching data: ${error.message}`));
        fetch(`${apiUrl}asignatura`)
            .then((response) => response.json())
            .then((data) => {
            if (data && data.asignaturas) {
                setAsignaturas(data.asignaturas);
            }
            else {
                toast.error('Error fetching subjects: Data is not an array');
            }
        })
            .catch((error) => toast.error(`Error fetching subjects: ${error.message}`));
        fetch(`${apiUrl}docente`)
            .then((response) => response.json())
            .then((data) => {
            if (Array.isArray(data)) {
                setDocentes(data);
            }
            else {
                toast.error('Error fetching teachers: Data is not an array');
            }
        })
            .catch((error) => toast.error(`Error fetching teachers: ${error.message}`));
        fetch(`${apiUrl}grado`)
            .then((response) => response.json())
            .then((data) => {
            if (data && Array.isArray(data)) {
                setGrados(data);
            }
            else {
                toast.error('Error fetching grades: Data is not an array');
            }
        })
            .catch((error) => toast.error(`Error fetching grades: ${error.message}`));
        fetch(`${apiUrl}grupo`)
            .then((response) => response.json())
            .then((data) => {
            if (data && Array.isArray(data)) {
                setGrupos(data);
            }
            else {
                toast.error('Error fetching groups: Data is not an array');
            }
        })
            .catch((error) => toast.error(`Error fetching groups: ${error.message}`));
        fetch(`${apiUrl}carreras/tecnicas`)
            .then((response) => response.json())
            .then((data) => {
            if (data && data.carreras) {
                setCarrerasTecnicas(data.carreras);
            }
            else {
                toast.error('Error fetching technical careers: Data is not an array');
            }
        })
            .catch((error) => toast.error(`Error fetching technical careers: ${error.message}`));
    }, []);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const openModal = (horario) => {
        setSelectedHorario(horario);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setSelectedHorario(null);
        setIsModalOpen(false);
    };
    const openDeleteModal = (horario) => {
        setSelectedHorario(horario);
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => {
        setSelectedHorario(null);
        setIsDeleteModalOpen(false);
    };
    const handleInputChange = (e) => {
        if (selectedHorario) {
            const { name, value } = e.target;
            setSelectedHorario({ ...selectedHorario, [name]: value });
        }
    };
    const handleDiaHorarioChange = (index, field, value) => {
        if (selectedHorario) {
            const updatedDiasHorarios = selectedHorario.dias_horarios
                ? [...selectedHorario.dias_horarios]
                : [];
            if (updatedDiasHorarios[index]) {
                updatedDiasHorarios[index][field] = value;
            }
            else {
                updatedDiasHorarios[index] = { day: '', startTime: '', endTime: '' };
                updatedDiasHorarios[index][field] = value;
            }
            setSelectedHorario({
                ...selectedHorario,
                dias_horarios: updatedDiasHorarios,
            });
        }
    };
    const handleSubmit = () => {
        if (selectedHorario) {
            fetch(`${apiUrl}horarios_escolares/update/${selectedHorario.id_horario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedHorario),
            })
                .then((response) => {
                if (!response.ok) {
                    throw new Error('Error updating schedule');
                }
                return response.json();
            })
                .then((data) => {
                setHorarios(horarios.map((horario) => horario.id_horario === data.id_horario ? data : horario));
                toast.success('Horario actualizado exitosamente');
                closeModal();
            })
                .catch((error) => {
                toast.error(`Error updating schedule: ${error.message}`);
            });
        }
    };
    const handleDelete = () => {
        if (selectedHorario) {
            fetch(`${apiUrl}horarios_escolares/delete/${selectedHorario.id_horario}`, {
                method: 'DELETE',
            })
                .then((response) => {
                if (!response.ok) {
                    throw new Error('Error deleting schedule');
                }
                setHorarios(horarios.filter((horario) => horario.id_horario !== selectedHorario.id_horario));
                toast.success('Horario eliminado exitosamente');
                closeDeleteModal();
            })
                .catch((error) => {
                toast.error(`Error deleting schedule: ${error.message}`);
            });
        }
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = horarios.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(horarios.length / itemsPerPage);
    return (_jsxs("div", { className: "schedules-view-container", children: [_jsx("h2", { children: "Horarios Escolares" }), _jsxs("table", { className: "schedules-table-schedules-view", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "Asignatura" }), _jsx("th", { children: "Docente" }), _jsx("th", { children: "Grado" }), _jsx("th", { children: "Grupo" }), _jsx("th", { children: "Carrera T\u00E9cnica" }), _jsx("th", { children: "Ciclo Escolar" }), _jsx("th", { children: "D\u00EDas y Horarios" }), _jsx("th", { children: "Acci\u00F3n" })] }) }), _jsx("tbody", { children: currentItems.map((horario) => (_jsxs("tr", { children: [_jsx("td", { children: horario.id_horario }), _jsx("td", { children: horario.nombre_asignatura }), _jsx("td", { children: horario.nombre_docente }), _jsx("td", { children: horario.nombre_grado }), _jsx("td", { children: horario.nombre_grupo }), _jsx("td", { children: horario.nombre_carrera_tecnica }), _jsx("td", { children: horario.ciclo_escolar }), _jsx("td", { children: Array.isArray(horario.dias_horarios) &&
                                        horario.dias_horarios.length > 0 ? (horario.dias_horarios.map((dia, index) => (_jsxs("div", { children: [_jsxs("span", { children: [dia.day, ": "] }), _jsxs("span", { children: [dia.startTime, " - ", dia.endTime] })] }, index)))) : (_jsx("span", { children: "No se encontraron d\u00EDas y horarios" })) }), _jsxs("td", { className: "align", children: [_jsx("button", { className: "btn-view", onClick: () => openModal(horario), children: "Actualizar" }), _jsx("button", { className: "delete-button", onClick: () => openDeleteModal(horario), children: "Eliminar" })] })] }, horario.id_horario))) })] }), _jsx("div", { className: "pagination-schedules-view", children: Array.from({ length: totalPages }, (_, index) => (_jsx("button", { className: `page-button-schedules-view ${currentPage === index + 1 ? 'active' : ''}`, onClick: () => handlePageChange(index + 1), children: index + 1 }, index + 1))) }), _jsxs(Modal, { isOpen: isModalOpen, onRequestClose: closeModal, className: "modal-schedules-view", children: [_jsx("h2", { children: "Actualizar Horario" }), selectedHorario && (_jsxs("form", { children: [_jsxs("label", { children: ["Asignatura:", _jsxs("select", { name: "nombre_asignatura", value: selectedHorario.nombre_asignatura, onChange: handleInputChange, children: [_jsx("option", { value: "", children: "Selecciona una asignatura" }), asignaturas.map((asignatura) => (_jsx("option", { value: asignatura.nombre_asignatura, children: asignatura.nombre_asignatura }, asignatura.id_asignatura)))] })] }), _jsxs("label", { children: ["Docente:", _jsxs("select", { name: "nombre_docente", value: selectedHorario.nombre_docente, onChange: handleInputChange, children: [_jsx("option", { value: "", children: "Selecciona un docente" }), docentes.map((docente) => (_jsxs("option", { value: `${docente.nombre_docentes} ${docente.app_docentes} ${docente.apm_docentes}`, children: [docente.nombre_docentes, " ", docente.app_docentes, ' ', docente.apm_docentes] }, docente.id_docentes)))] })] }), _jsxs("label", { children: ["Grado:", _jsxs("select", { name: "nombre_grado", value: selectedHorario.nombre_grado, onChange: handleInputChange, children: [_jsx("option", { value: "", children: "Selecciona un grado" }), grados.map((grado) => (_jsx("option", { value: grado.nombre_grado, children: grado.nombre_grado }, grado.id_grado)))] })] }), _jsxs("label", { children: ["Grupo:", _jsxs("select", { name: "nombre_grupo", value: selectedHorario.nombre_grupo, onChange: handleInputChange, children: [_jsx("option", { value: "", children: "Selecciona un grupo" }), grupos.map((grupo) => (_jsx("option", { value: grupo.nombre_grupos, children: grupo.nombre_grupos }, grupo.id_grupos)))] })] }), _jsxs("label", { children: ["Carrera T\u00E9cnica:", _jsxs("select", { name: "nombre_carrera_tecnica", value: selectedHorario.nombre_carrera_tecnica, onChange: handleInputChange, children: [_jsx("option", { value: "", children: "Selecciona una carrera t\u00E9cnica" }), carrerasTecnicas.map((carrera) => (_jsx("option", { value: carrera.nombre_carrera_tecnica, children: carrera.nombre_carrera_tecnica }, carrera.id_carrera_tecnica)))] })] }), _jsxs("label", { children: ["Ciclo Escolar:", _jsx("input", { type: "text", name: "ciclo_escolar", value: selectedHorario.ciclo_escolar, onChange: handleInputChange })] }), selectedHorario.dias_horarios &&
                                selectedHorario.dias_horarios.map((dia, index) => (_jsxs("div", { children: [_jsxs("label", { children: ["D\u00EDa:", _jsx("input", { type: "text", value: dia.day, onChange: (e) => handleDiaHorarioChange(index, 'day', e.target.value) })] }), _jsxs("label", { children: ["Hora de Inicio:", _jsx("input", { type: "time", value: dia.startTime, onChange: (e) => handleDiaHorarioChange(index, 'startTime', e.target.value) })] }), _jsxs("label", { children: ["Hora de Fin:", _jsx("input", { type: "time", value: dia.endTime, onChange: (e) => handleDiaHorarioChange(index, 'endTime', e.target.value) })] })] }, index))), _jsx("button", { className: "save-button-schedules-view", type: "button", onClick: handleSubmit, children: "Guardar Cambios" })] })), _jsx("button", { className: "close-button-schedules-view", onClick: closeModal, children: "Cerrar" })] }), _jsx(Modal, { isOpen: isDeleteModalOpen, onRequestClose: closeDeleteModal, className: "modal-mision", children: _jsxs("div", { className: "modal-custom", children: [_jsx("h2", { children: "Eliminar Horario" }), _jsx("div", { className: "align2", children: _jsx("h3", { children: "\u00BFEst\u00E1s seguro de eliminar este horario escolar?" }) }), _jsxs("div", { className: "align2", children: [_jsx("button", { className: "delete-button", onClick: handleDelete, children: "Eliminar" }), _jsx("button", { className: "info-button", onClick: closeDeleteModal, children: "Cerrar" })] })] }) }), _jsx(ToastContainer, {})] }));
};
export default SchedulesView;
