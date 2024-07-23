import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { apiUrl } from "../../../constants/Api";
import { HorarioEscolarAlumnoPropio } from '../../../Sections/Alumn';
import './InfoAlumnoFamiliar.css';
import { logo_cbta, logoeducacion } from '../../../assets/logos';
const InfoAlumnoFamiliar = () => {
    const [nocontrol, setNocontrol] = useState('');
    const [alumno, setAlumno] = useState(null);
    const [error, setError] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showCredential, setShowCredential] = useState(false);
    const [showHorario, setShowHorario] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    useEffect(() => {
        const storedAlumno = localStorage.getItem('alumno');
        if (storedAlumno) {
            setAlumno(JSON.parse(storedAlumno));
        }
    }, []);
    const handleInputChange = (e) => {
        setNocontrol(e.target.value);
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!nocontrol) {
            setError('Por favor, ingrese un número de control.');
            return;
        }
        try {
            const response = await fetch(`${apiUrl}alumnos/nocontrol/${nocontrol}`);
            const data = await response.json();
            if (response.ok) {
                setAlumno(data);
                setError('');
                setModalIsOpen(true);
            }
            else {
                setAlumno(null);
                setError(data.error || 'Alumno no encontrado.');
            }
        }
        catch (error) {
            setAlumno(null);
            setError('Error al buscar el alumno.');
        }
    };
    const handleAddAlumno = () => {
        if (alumno) {
            localStorage.setItem('alumno', JSON.stringify(alumno));
            setModalIsOpen(false);
        }
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };
    const handleShowCredential = () => {
        setShowCredential(true);
    };
    const handleCloseCredential = () => {
        setShowCredential(false);
    };
    const handleShowHorario = () => {
        setShowHorario(true);
    };
    const handleCloseHorario = () => {
        setShowHorario(false);
    };
    const handleShowInfo = () => {
        setShowInfo(true);
    };
    const handleCloseInfo = () => {
        setShowInfo(false);
    };
    return (_jsxs("div", { className: "info-alumno-familiar-container", children: [_jsx("div", { className: "info-alumno-familiar-form-container", children: _jsxs("form", { onSubmit: handleFormSubmit, className: "info-alumno-familiar-form", children: [_jsx("label", { htmlFor: "nocontrol", className: "info-alumno-familiar-label", children: "Ingrese el n\u00FAmero de control:" }), _jsxs("div", { className: "info-alumno-familiar-input-group", children: [_jsx("input", { type: "number", id: "nocontrol", value: nocontrol, onChange: handleInputChange, required: true, className: "info-alumno-familiar-input" }), _jsx("button", { type: "submit", className: "info-alumno-familiar-button", children: "Buscar" })] })] }) }), error && _jsx("p", { className: "info-alumno-familiar-error", children: error }), _jsx(Modal, { isOpen: modalIsOpen, onRequestClose: closeModal, className: "info-alumno-familiar-modal", overlayClassName: "info-alumno-familiar-overlay", children: alumno && (_jsxs("div", { className: "info-alumno-familiar-card", children: [_jsxs("div", { className: "info-alumno-familiar-header", children: [_jsx("img", { src: `data:image/jpeg;base64,${alumno.foto_usuario}`, alt: "Foto del alumno", className: "info-alumno-familiar-foto" }), _jsxs("h2", { className: "info-alumno-familiar-info-title", children: [alumno.nombre_alumnos, " ", alumno.app_alumnos, " ", alumno.apm_alumnos] })] }), _jsxs("div", { className: "info-alumno-familiar-details", children: [_jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "CURP:" }), " ", alumno.curp_alumnos] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Matr\u00EDcula:" }), " ", alumno.nocontrol_alumnos] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Seguro Social:" }), " ", alumno.seguro_social_alumnos] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Fecha de Nacimiento:" }), " ", new Date(alumno.fecha_nacimiento_alumnos).toLocaleDateString()] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Sexo:" }), " ", alumno.sexo] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Grado:" }), " ", alumno.grado] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Grupo:" }), " ", alumno.grupo] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Correo:" }), " ", alumno.correo_usuario] })] }), _jsxs("div", { className: "info-alumno-familiar-buttons", children: [_jsx("button", { onClick: handleAddAlumno, className: "info-alumno-familiar-add-button", children: "Agregar" }), _jsx("button", { onClick: closeModal, className: "info-alumno-familiar-cancel-button", children: "Cancelar" })] })] })) }), alumno && (_jsxs("div", { className: "info-alumno-familiar-card", children: [_jsxs("div", { className: "info-alumno-familiar-header", children: [_jsx("img", { src: `data:image/jpeg;base64,${alumno.foto_usuario}`, alt: "Foto del alumno", className: "info-alumno-familiar-foto" }), _jsxs("h2", { className: "info-alumno-familiar-info-title", children: [alumno.nombre_alumnos, " ", alumno.app_alumnos, " ", alumno.apm_alumnos] })] }), _jsxs("div", { className: "info-alumno-familiar-details", children: [_jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "CURP:" }), " ", alumno.curp_alumnos] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Matr\u00EDcula:" }), " ", alumno.nocontrol_alumnos] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Seguro Social:" }), " ", alumno.seguro_social_alumnos] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Fecha de Nacimiento:" }), " ", new Date(alumno.fecha_nacimiento_alumnos).toLocaleDateString()] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Sexo:" }), " ", alumno.sexo] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Grado:" }), " ", alumno.grado] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Grupo:" }), " ", alumno.grupo] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Correo:" }), " ", alumno.correo_usuario] })] }), _jsxs("div", { className: 'align2', children: [_jsx("button", { type: 'button', className: 'save-button', onClick: handleShowCredential, children: "Ver Credencial" }), _jsx("button", { type: 'button', className: 'info-button', onClick: handleShowHorario, children: "Ver Horario de clase" }), _jsx("button", { type: 'button', className: 'save-button', onClick: handleShowInfo, children: "Ver Informaci\u00F3n del Alumno" })] })] })), showCredential && (_jsxs("div", { className: "modal-view", children: [_jsx("button", { className: "delete-button", onClick: handleCloseCredential, children: "Salir" }), _jsxs("div", { className: "credential-card", children: [_jsxs("div", { className: "header", children: [_jsx("img", { src: logoeducacion, alt: "Logo SEP", className: "sep-logo" }), _jsx("img", { src: logo_cbta, alt: "Logo CBTA 5", className: "cbta-logo" })] }), _jsxs("div", { className: "body-credencial", children: [_jsxs("div", { className: "photo-section", children: [_jsx("img", { src: `data:image/jpeg;base64,${alumno?.foto_usuario}`, alt: "Foto del Alumno", className: "student-photo" }), _jsxs("div", { className: 'name-logo-credential', children: [_jsxs("h2", { className: "student-name", children: [alumno?.nombre_alumnos, " ", alumno?.app_alumnos, " ", alumno?.apm_alumnos] }), _jsx("img", { src: `data:image/jpeg;base64,${alumno?.foto_carrera_tecnica}`, alt: "Logo de la Carrera", className: "career-logo" })] })] }), _jsxs("div", { className: "info-section", children: [_jsxs("h3", { children: ["T\u00C9CNICO EN ", alumno?.carrera_tecnica.toUpperCase()] }), _jsxs("p", { children: [_jsx("strong", { children: "GRUPO:" }), " ", alumno?.grupo] }), _jsxs("p", { children: [_jsx("strong", { children: "CURP:" }), " ", alumno?.curp_alumnos] }), _jsxs("p", { children: [_jsx("strong", { children: "MATR\u00CDCULA:" }), " ", alumno?.nocontrol_alumnos] }), _jsxs("p", { children: [_jsx("strong", { children: "SEGURO SOCIAL:" }), " ", alumno?.seguro_social_alumnos] })] })] })] })] })), showHorario && (_jsx(Modal, { isOpen: showHorario, onRequestClose: handleCloseHorario, className: "info-alumno-familiar-modal", overlayClassName: "info-alumno-familiar-overlay", children: _jsx(HorarioEscolarAlumnoPropio, { id_usuario: alumno?.id_alumnos || 0, onClose: handleCloseHorario }) })), showInfo && (_jsx(Modal, { isOpen: showInfo, onRequestClose: handleCloseInfo, className: "info-alumno-familiar-modal", overlayClassName: "info-alumno-familiar-overlay", children: _jsxs("div", { className: "info-alumno-familiar-card", children: [_jsx("button", { className: "delete-button", onClick: handleCloseInfo, children: "Salir" }), _jsxs("div", { className: "info-alumno-familiar-header", children: [_jsx("img", { src: `data:image/jpeg;base64,${alumno?.foto_usuario}`, alt: "Foto del alumno", className: "info-alumno-familiar-foto" }), _jsxs("h2", { className: "info-alumno-familiar-info-title", children: [alumno?.nombre_alumnos, " ", alumno?.app_alumnos, " ", alumno?.apm_alumnos] })] }), _jsxs("div", { className: "info-alumno-familiar-details", children: [_jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "CURP:" }), " ", alumno?.curp_alumnos] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Matr\u00EDcula:" }), " ", alumno?.nocontrol_alumnos] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Seguro Social:" }), " ", alumno?.seguro_social_alumnos] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Sexo:" }), " ", alumno?.sexo] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Grado:" }), " ", alumno?.grado] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Grupo:" }), " ", alumno?.grupo] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Correo:" }), " ", alumno?.correo_usuario] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Tel\u00E9fono:" }), " ", alumno?.telefono_alumnos] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Cl\u00EDnica:" }), " ", alumno?.clinica] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Traslado:" }), " ", alumno?.traslado] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Transporte:" }), " ", alumno?.traslado_transporte] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Pa\u00EDs:" }), " ", alumno?.pais] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Estado:" }), " ", alumno?.estado] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Municipio:" }), " ", alumno?.municipio_alumnos] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Comunidad:" }), " ", alumno?.comunidad_alumnos] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Calle:" }), " ", alumno?.calle_alumnos] }), _jsxs("p", { className: "info-alumno-familiar-info-detail", children: [_jsx("strong", { children: "Procedencia Secundaria:" }), " ", alumno?.proc_sec_alumno] })] })] }) }))] }));
};
export default InfoAlumnoFamiliar;
