import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Auto/Auth';
import { apiUrl } from '../../../constants/Api';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './HorarioDocente.css';
const HorarioDocente = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedHorario, setSelectedHorario] = useState(null);
    const [alumnos, setAlumnos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [nocontrolAlumno, setNocontrolAlumno] = useState('');
    useEffect(() => {
        const fetchHorarios = async () => {
            if (user) {
                try {
                    const response = await fetch(`${apiUrl}horarios_escolares/docente/${user.id_usuario}`);
                    const data = await response.json();
                    if (response.ok) {
                        setHorarios(data);
                    }
                    else {
                        setError(data.error);
                    }
                }
                catch (error) {
                    setError('Error al obtener los horarios del docente');
                }
                finally {
                    setLoading(false);
                }
            }
        };
        fetchHorarios();
    }, [user]);
    const openModal = async (horario) => {
        setSelectedHorario(horario);
        try {
            const response = await fetch(`${apiUrl}alumnos/horario/${horario.id_horario}`);
            const data = await response.json();
            if (response.ok) {
                setAlumnos(data);
            }
            else {
                setAlumnos([]);
            }
        }
        catch (error) {
            setAlumnos([]);
        }
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setAlumnos([]);
    };
    const openAddModal = () => {
        setIsAddModalOpen(true);
    };
    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setNocontrolAlumno('');
    };
    const handleAddAlumno = async () => {
        if (!nocontrolAlumno) {
            toast.error('Por favor, ingrese el número de control del alumno.');
            return;
        }
        try {
            const response = await fetch(`${apiUrl}horarios_escolares/${selectedHorario?.id_horario}/agregar_alumno`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nocontrol_alumno: nocontrolAlumno }),
            });
            if (response.ok) {
                const newAlumno = await response.json();
                setAlumnos((prevAlumnos) => [...prevAlumnos, newAlumno]);
                toast.success('Alumno agregado exitosamente.');
                closeAddModal();
            }
            else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Error al agregar el alumno.');
            }
        }
        catch (error) {
            toast.error('Error al agregar el alumno.');
        }
    };
    if (loading) {
        return _jsx("p", { className: "loading-message", children: "Cargando horarios del docente..." });
    }
    if (error) {
        return _jsx("p", { className: "error-message", children: error });
    }
    return (_jsxs("div", { className: "horario-docente-container", children: [_jsx(ToastContainer, {}), _jsx("h2", { children: "Horarios Escolares" }), _jsxs("table", { className: "horarios-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "Asignatura" }), _jsx("th", { children: "Docente" }), _jsx("th", { children: "Grado" }), _jsx("th", { children: "Grupo" }), _jsx("th", { children: "Carrera T\u00E9cnica" }), _jsx("th", { children: "Ciclo Escolar" }), _jsx("th", { children: "D\u00EDas y Horarios" }), _jsx("th", { children: "Acciones" })] }) }), _jsx("tbody", { children: horarios.map(horario => (_jsxs("tr", { children: [_jsx("td", { children: horario.id_horario }), _jsx("td", { children: horario.nombre_asignatura }), _jsx("td", { children: horario.nombre_docente }), _jsx("td", { children: horario.nombre_grado }), _jsx("td", { children: horario.nombre_grupo }), _jsx("td", { children: horario.nombre_carrera_tecnica }), _jsx("td", { children: horario.ciclo_escolar }), _jsx("td", { children: horario.dias_horarios.map(dia => (_jsxs("div", { children: [dia.day, ": ", dia.startTime, " - ", dia.endTime] }, dia.day))) }), _jsx("td", { className: 'align2', children: _jsx("button", { className: 'save-button', type: 'button', onClick: () => openModal(horario), children: "Ver Alumnos" }) })] }, horario.id_horario))) })] }), _jsxs(Modal, { isOpen: isModalOpen, onRequestClose: closeModal, className: "modal-horarios", overlayClassName: "modal-overlay-horarios", children: [_jsx("h2", { children: "Alumnos del Horario" }), alumnos.length > 0 ? (_jsxs("table", { className: "alumnos-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Nombre Completo" }), _jsx("th", { children: "N\u00FAmero de Control" })] }) }), _jsx("tbody", { children: alumnos.map(alumno => (_jsxs("tr", { children: [_jsxs("td", { children: [alumno.nombre_alumno, " ", alumno.app_alumno, " ", alumno.apm_alumno] }), _jsx("td", { children: alumno.nocontrol_alumno })] }, alumno.id_alumno))) })] })) : (_jsx("p", { children: "No hay alumnos por el momento" })), _jsx("button", { className: 'save-button', type: 'button', onClick: openAddModal, children: "Agregar Alumno" })] }), _jsxs(Modal, { isOpen: isAddModalOpen, onRequestClose: closeAddModal, className: "modal-add-alumno", overlayClassName: "modal-overlay-horarios", children: [_jsx("h2", { children: "Agregar Alumno" }), _jsxs("div", { className: "add-alumno-form", children: [_jsx("label", { htmlFor: "nocontrol", children: "Ingrese el n\u00FAmero de control del alumno" }), _jsx("input", { type: "number", id: "nocontrol", value: nocontrolAlumno, onChange: (e) => setNocontrolAlumno(e.target.value) }), _jsx("button", { className: 'save-button', type: 'button', onClick: handleAddAlumno, children: "Agregar" })] })] })] }));
};
export default HorarioDocente;
