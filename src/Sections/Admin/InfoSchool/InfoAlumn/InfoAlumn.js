import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './InfoAlumn.css';
import { useState, useEffect, useRef } from 'react';
import { apiUrl } from '../../../../constants/Api';
import Modal from 'react-modal';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DateTime } from 'luxon';
// Inicializar Modal
Modal.setAppElement('#root');
export default function InfoAlumn() {
    const [alumnos, setAlumnos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        nombre_usuario: '',
        app_usuario: '',
        apm_usuario: '',
        fecha_nacimiento_usuario: '',
        token_usuario: '',
        correo_usuario: '',
        pwd_usuario: '',
        phone_usuario: '',
        idRol: 2,
        idSexo: '',
        ip_usuario: '',
        idCuentaActivo: 1,
        idPregunta: '',
        respuestaPregunta: '',
    });
    const [updateFormData, setUpdateFormData] = useState({
        nombre_alumnos: '',
        app_alumnos: '',
        apm_alumnos: '',
        fecha_nacimiento_alumnos: '',
        curp_alumnos: '',
        telefono_alumnos: '',
        seguro_social_alumnos: '',
        cuentacredencial_alumnos: '',
        id_sexo: '',
        id_usuario: '',
        id_clinica: '',
        id_grado: '',
        id_grupo: '',
        id_traslado: '',
        id_trasladotransporte: '',
        id_carrera_tecnica: '',
        id_pais: '',
        id_estado: '',
        municipio_alumnos: '',
        comunidad_alumnos: '',
        calle_alumnos: '',
        proc_sec_alumno: '',
    });
    const [secretQuestions, setSecretQuestions] = useState([]);
    const [sexOptions, setSexOptions] = useState([]);
    const [step, setStep] = useState(1);
    const [updateStep, setUpdateStep] = useState(1);
    const [captchaValido, cambiarEstado] = useState(null);
    const captcha = useRef(null);
    useEffect(() => {
        fetchAlumnos();
        fetchSecretQuestions();
        fetchSexOptions();
    }, []);
    const fetchAlumnos = async () => {
        try {
            const response = await fetch(`${apiUrl}alumno`);
            const data = await response.json();
            setAlumnos(data);
        }
        catch (err) {
            toast.error('Error al obtener los alumnos');
        }
    };
    const fetchSecretQuestions = async () => {
        try {
            const response = await fetch(`${apiUrl}pregunta`);
            const data = await response.json();
            setSecretQuestions(data);
        }
        catch (err) {
            toast.error('Error al obtener las preguntas secretas');
        }
    };
    const fetchSexOptions = async () => {
        try {
            const response = await fetch(`${apiUrl}sexo`);
            const data = await response.json();
            setSexOptions(data);
        }
        catch (err) {
            toast.error('Error al obtener las opciones de sexo');
        }
    };
    const openModal = (alumno) => {
        setFormData({
            ...formData,
            nombre_usuario: alumno.nombre_alumnos,
            app_usuario: alumno.app_alumnos,
            apm_usuario: alumno.apm_alumnos,
            fecha_nacimiento_usuario: alumno.fecha_nacimiento_alumnos,
            phone_usuario: alumno.telefono_alumnos,
        });
        setIsModalOpen(true);
    };
    const openUpdateModal = (alumno) => {
        setUpdateFormData({
            nombre_alumnos: alumno.nombre_alumnos,
            app_alumnos: alumno.app_alumnos,
            apm_alumnos: alumno.apm_alumnos,
            fecha_nacimiento_alumnos: alumno.fecha_nacimiento_alumnos,
            curp_alumnos: alumno.curp_alumnos,
            telefono_alumnos: alumno.telefono_alumnos,
            seguro_social_alumnos: '',
            cuentacredencial_alumnos: '',
            id_sexo: '',
            id_usuario: '',
            id_clinica: '',
            id_grado: '',
            id_grupo: '',
            id_traslado: '',
            id_trasladotransporte: '',
            id_carrera_tecnica: '',
            id_pais: '',
            id_estado: '',
            municipio_alumnos: '',
            comunidad_alumnos: '',
            calle_alumnos: '',
            proc_sec_alumno: '',
        });
        setIsUpdateModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            nombre_usuario: '',
            app_usuario: '',
            apm_usuario: '',
            fecha_nacimiento_usuario: '',
            token_usuario: '',
            correo_usuario: '',
            pwd_usuario: '',
            phone_usuario: '',
            idRol: 2,
            idSexo: '',
            ip_usuario: '',
            idCuentaActivo: 1,
            idPregunta: '',
            respuestaPregunta: '',
        });
        setStep(1);
    };
    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setUpdateStep(1);
    };
    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        if (name === 'correo_usuario') {
            await checkEmailAvailability(value);
        }
        else if (name === 'pwd_usuario') {
            validatePassword(value);
        }
        setFormData({ ...formData, [name]: value });
    };
    const handleUpdateInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateFormData({ ...updateFormData, [name]: value });
    };
    const handleInsert = async (e) => {
        e.preventDefault();
        if (!captchaValido) {
            toast.error('Por favor, completa correctamente el CAPTCHA.');
            return;
        }
        try {
            const response = await fetch(`${apiUrl}users/insert`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    token_usuario: generateToken(),
                    ip_usuario: await fetch('https://api64.ipify.org?format=json')
                        .then(response => response.json())
                        .then(data => data.ip),
                }),
            });
            if (!response.ok) {
                throw new Error('Error al insertar usuario');
            }
            const data = await response.json();
            toast.success('Usuario registrado exitosamente');
            closeModal();
        }
        catch (err) {
            toast.error('Error al registrar usuario');
        }
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}alumno/${updateFormData.id_usuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateFormData),
            });
            if (!response.ok) {
                throw new Error('Error al actualizar alumno');
            }
            const data = await response.json();
            toast.success('Alumno actualizado exitosamente');
            closeUpdateModal();
            fetchAlumnos(); // Refrescar la lista de alumnos después de la actualización
        }
        catch (err) {
            toast.error('Error al actualizar alumno');
        }
    };
    const checkEmailAvailability = async (email) => {
        try {
            const response = await fetch(`${apiUrl}check-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo_usuario: email }),
            });
            const data = await response.json();
            if (data.exists) {
                toast.error('El correo ya existe, use otro correo');
                setFormData(prevState => ({ ...prevState, correo_usuario: '' }));
            }
            else {
                toast.success('Correo disponible');
            }
        }
        catch (err) {
            toast.error('Error al verificar el correo');
        }
    };
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error('El password debe tener al menos 8 caracteres, incluir letras mayúsculas, minúsculas, números y caracteres especiales, y no debe contener espacios');
            setFormData(prevState => ({ ...prevState, pwd_usuario: '' }));
        }
        else {
            toast.success('Contraseña válida');
        }
    };
    const onChangeCaptcha = () => {
        if (captcha.current && captcha.current.getValue()) {
            cambiarEstado(true);
        }
        else {
            cambiarEstado(false);
        }
    };
    const generateToken = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const getRandomChar = (source) => source.charAt(Math.floor(Math.random() * source.length));
        return getRandomChar(letters) +
            getRandomChar(letters) +
            getRandomChar(letters) +
            getRandomChar(numbers) +
            getRandomChar(numbers) +
            getRandomChar(numbers) +
            getRandomChar(letters) +
            getRandomChar(numbers);
    };
    const handleNextStep = () => {
        if (step === 1) {
            const birthDate = DateTime.fromISO(formData.fecha_nacimiento_usuario);
            const currentDate = DateTime.now();
            const age = currentDate.diff(birthDate, 'years').years;
            if (age < 15 || age > 19) {
                toast.info('La edad debe estar entre 15 y 19 años.');
                return;
            }
        }
        setStep(step + 1);
    };
    const handlePreviousStep = () => {
        setStep(step - 1);
    };
    const handleNextUpdateStep = () => {
        setUpdateStep(updateStep + 1);
    };
    const handlePreviousUpdateStep = () => {
        setUpdateStep(updateStep - 1);
    };
    return (_jsxs("div", { className: "info-alumn-container", children: [_jsx("h1", { children: "Lista de Alumnos" }), _jsx(ToastContainer, {}), alumnos.length === 0 ? (_jsx("p", { children: "No hay alumnos disponibles." })) : (_jsxs("table", { className: "alumnos-table-info-alumn", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Foto" }), _jsx("th", { children: "Nombre" }), _jsx("th", { children: "Apellido Paterno" }), _jsx("th", { children: "Apellido Materno" }), _jsx("th", { children: "Fecha de Nacimiento" }), _jsx("th", { children: "CURP" }), _jsx("th", { children: "Tel\u00E9fono" }), _jsx("th", { children: "Acciones" })] }) }), _jsx("tbody", { children: alumnos.map(alumno => (_jsxs("tr", { children: [_jsx("td", { children: alumno.foto_alumnos && (_jsx("img", { src: `data:image/jpeg;base64,${alumno.foto_alumnos}`, alt: `${alumno.nombre_alumnos}`, className: "foto-alumno-info-alumn" })) }), _jsx("td", { children: alumno.nombre_alumnos }), _jsx("td", { children: alumno.app_alumnos }), _jsx("td", { children: alumno.apm_alumnos }), _jsx("td", { children: alumno.fecha_nacimiento_alumnos }), _jsx("td", { children: alumno.curp_alumnos }), _jsx("td", { children: alumno.telefono_alumnos }), _jsxs("td", { className: "align-info-alumn", children: [_jsx("button", { className: "save-button-info-alumn", type: "button", onClick: () => openModal(alumno), children: "Crear Usuario" }), _jsx("button", { className: "update-button-info-alumn", type: "button", onClick: () => openUpdateModal(alumno), children: "Actualizar" })] })] }, alumno.id_alumnos))) })] })), _jsxs(Modal, { isOpen: isModalOpen, onRequestClose: closeModal, className: "modal-info-alumn", overlayClassName: "modal-overlay-info-alumn", children: [_jsx("h2", { children: "Registro de Usuario" }), _jsxs("form", { className: "modal-form-info-alumn", onSubmit: handleInsert, children: [step === 1 && (_jsxs("div", { className: "register-section-info-alumn", children: [_jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "nombre_usuario", children: "Nombre" }), _jsx("input", { type: "text", id: "nombre_usuario", name: "nombre_usuario", placeholder: "Nombre", value: formData.nombre_usuario, onChange: handleInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "app_usuario", children: "Apellido Paterno" }), _jsx("input", { type: "text", id: "app_usuario", name: "app_usuario", placeholder: "Apellido Paterno", value: formData.app_usuario, onChange: handleInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "apm_usuario", children: "Apellido Materno" }), _jsx("input", { type: "text", id: "apm_usuario", name: "apm_usuario", placeholder: "Apellido Materno", value: formData.apm_usuario, onChange: handleInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "fecha_nacimiento_usuario", children: "Fecha de Nacimiento" }), _jsx("input", { type: "date", id: "fecha_nacimiento_usuario", name: "fecha_nacimiento_usuario", placeholder: "Fecha de Nacimiento", value: formData.fecha_nacimiento_usuario, onChange: handleInputChange, required: true })] }), _jsxs("div", { className: "button-group-info-alumn", children: [_jsx("button", { type: "button", onClick: closeModal, className: "cancel-button-info-alumn", children: "Cancelar" }), _jsx("button", { type: "button", onClick: handleNextStep, className: "next-button-info-alumn", children: "Siguiente" })] })] })), step === 2 && (_jsxs("div", { className: "register-section-info-alumn", children: [_jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "correo_usuario", children: "Correo" }), _jsx("input", { type: "email", id: "correo_usuario", name: "correo_usuario", placeholder: "Correo", value: formData.correo_usuario, onChange: handleInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "pwd_usuario", children: "Contrase\u00F1a" }), _jsx("input", { type: "password", id: "pwd_usuario", name: "pwd_usuario", placeholder: "Contrase\u00F1a", value: formData.pwd_usuario, onChange: handleInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "phone_usuario", children: "Tel\u00E9fono" }), _jsx("input", { type: "tel", id: "phone_usuario", name: "phone_usuario", placeholder: "Tel\u00E9fono", value: formData.phone_usuario, onChange: handleInputChange, required: true })] }), _jsxs("div", { className: "button-group-info-alumn", children: [_jsx("button", { type: "button", onClick: handlePreviousStep, className: "previous-button-info-alumn", children: "Anterior" }), _jsx("button", { type: "button", onClick: handleNextStep, className: "next-button-info-alumn", children: "Siguiente" })] })] })), step === 3 && (_jsxs("div", { className: "register-section-info-alumn", children: [_jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "idSexo", children: "Sexo" }), _jsxs("select", { id: "idSexo", name: "idSexo", value: formData.idSexo, onChange: handleInputChange, required: true, children: [_jsx("option", { value: "", children: "Seleccione..." }), sexOptions.map((sexo) => (_jsx("option", { value: sexo.id_sexos, children: sexo.nombre_sexo }, sexo.id_sexos)))] })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "idPregunta", children: "Pregunta Secreta" }), _jsxs("select", { id: "idPregunta", name: "idPregunta", value: formData.idPregunta, onChange: handleInputChange, required: true, children: [_jsx("option", { value: "", children: "Seleccione una pregunta..." }), secretQuestions.map((pregunta) => (_jsx("option", { value: pregunta.id_preguntas, children: pregunta.nombre_preguntas }, pregunta.id_preguntas)))] })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "respuestaPregunta", children: "Respuesta Secreta" }), _jsx("input", { type: "text", id: "respuestaPregunta", name: "respuestaPregunta", placeholder: "Respuesta Secreta", value: formData.respuestaPregunta, onChange: handleInputChange, required: true })] }), _jsx("div", { className: "recaptcha-info-alumn", children: _jsx(ReCAPTCHA, { ref: captcha, sitekey: "6LdYfJspAAAAAAxTWQY68WAEX6JTgnysv3NxAMzd", onChange: onChangeCaptcha }) }), _jsxs("div", { className: "button-group-info-alumn", children: [_jsx("button", { type: "button", onClick: handlePreviousStep, className: "previous-button-info-alumn", children: "Anterior" }), _jsx("button", { type: "submit", className: "save-button-info-alumn", children: "Guardar" })] })] }))] })] }), _jsxs(Modal, { isOpen: isUpdateModalOpen, onRequestClose: closeUpdateModal, className: "modal-info-alumn", overlayClassName: "modal-overlay-info-alumn", children: [_jsx("h2", { children: "Actualizar Alumno" }), _jsxs("form", { className: "modal-form-info-alumn", onSubmit: handleUpdate, children: [updateStep === 1 && (_jsxs("div", { className: "register-section-info-alumn", children: [_jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "nombre_alumnos", children: "Nombre" }), _jsx("input", { type: "text", id: "nombre_alumnos", name: "nombre_alumnos", placeholder: "Nombre", value: updateFormData.nombre_alumnos, onChange: handleUpdateInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "app_alumnos", children: "Apellido Paterno" }), _jsx("input", { type: "text", id: "app_alumnos", name: "app_alumnos", placeholder: "Apellido Paterno", value: updateFormData.app_alumnos, onChange: handleUpdateInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "apm_alumnos", children: "Apellido Materno" }), _jsx("input", { type: "text", id: "apm_alumnos", name: "apm_alumnos", placeholder: "Apellido Materno", value: updateFormData.apm_alumnos, onChange: handleUpdateInputChange, required: true })] }), _jsxs("div", { className: "button-group-info-alumn", children: [_jsx("button", { type: "button", onClick: closeUpdateModal, className: "cancel-button-info-alumn", children: "Cancelar" }), _jsx("button", { type: "button", onClick: handleNextUpdateStep, className: "next-button-info-alumn", children: "Siguiente" })] })] })), updateStep === 2 && (_jsxs("div", { className: "register-section-info-alumn", children: [_jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "fecha_nacimiento_alumnos", children: "Fecha de Nacimiento" }), _jsx("input", { type: "date", id: "fecha_nacimiento_alumnos", name: "fecha_nacimiento_alumnos", placeholder: "Fecha de Nacimiento", value: updateFormData.fecha_nacimiento_alumnos, onChange: handleUpdateInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "curp_alumnos", children: "CURP" }), _jsx("input", { type: "text", id: "curp_alumnos", name: "curp_alumnos", placeholder: "CURP", value: updateFormData.curp_alumnos, onChange: handleUpdateInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "telefono_alumnos", children: "Tel\u00E9fono" }), _jsx("input", { type: "tel", id: "telefono_alumnos", name: "telefono_alumnos", placeholder: "Tel\u00E9fono", value: updateFormData.telefono_alumnos, onChange: handleUpdateInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "seguro_social_alumnos", children: "Seguro Social" }), _jsx("input", { type: "text", id: "seguro_social_alumnos", name: "seguro_social_alumnos", placeholder: "Seguro Social", value: updateFormData.seguro_social_alumnos, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "button-group-info-alumn", children: [_jsx("button", { type: "button", onClick: handlePreviousUpdateStep, className: "previous-button-info-alumn", children: "Anterior" }), _jsx("button", { type: "button", onClick: handleNextUpdateStep, className: "next-button-info-alumn", children: "Siguiente" })] })] })), updateStep === 3 && (_jsxs("div", { className: "register-section-info-alumn", children: [_jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "cuentacredencial_alumnos", children: "Cuenta Credencial" }), _jsx("input", { type: "text", id: "cuentacredencial_alumnos", name: "cuentacredencial_alumnos", placeholder: "Cuenta Credencial", value: updateFormData.cuentacredencial_alumnos, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "id_sexo", children: "Sexo" }), _jsxs("select", { id: "id_sexo", name: "id_sexo", value: updateFormData.id_sexo, onChange: handleUpdateInputChange, required: true, children: [_jsx("option", { value: "", children: "Seleccione..." }), sexOptions.map((sexo) => (_jsx("option", { value: sexo.id_sexos, children: sexo.nombre_sexo }, sexo.id_sexos)))] })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "id_usuario", children: "Usuario" }), _jsx("input", { type: "text", id: "id_usuario", name: "id_usuario", placeholder: "Usuario", value: updateFormData.id_usuario, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "button-group-info-alumn", children: [_jsx("button", { type: "button", onClick: handlePreviousUpdateStep, className: "previous-button-info-alumn", children: "Anterior" }), _jsx("button", { type: "button", onClick: handleNextUpdateStep, className: "next-button-info-alumn", children: "Siguiente" })] })] })), updateStep === 4 && (_jsxs("div", { className: "register-section-info-alumn", children: [_jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "id_clinica", children: "Cl\u00EDnica" }), _jsx("input", { type: "text", id: "id_clinica", name: "id_clinica", placeholder: "Cl\u00EDnica", value: updateFormData.id_clinica, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "id_grado", children: "Grado" }), _jsx("input", { type: "text", id: "id_grado", name: "id_grado", placeholder: "Grado", value: updateFormData.id_grado, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "id_grupo", children: "Grupo" }), _jsx("input", { type: "text", id: "id_grupo", name: "id_grupo", placeholder: "Grupo", value: updateFormData.id_grupo, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "id_traslado", children: "Traslado" }), _jsx("input", { type: "text", id: "id_traslado", name: "id_traslado", placeholder: "Traslado", value: updateFormData.id_traslado, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "id_trasladotransporte", children: "Traslado Transporte" }), _jsx("input", { type: "text", id: "id_trasladotransporte", name: "id_trasladotransporte", placeholder: "Traslado Transporte", value: updateFormData.id_trasladotransporte, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "button-group-info-alumn", children: [_jsx("button", { type: "button", onClick: handlePreviousUpdateStep, className: "previous-button-info-alumn", children: "Anterior" }), _jsx("button", { type: "button", onClick: handleNextUpdateStep, className: "next-button-info-alumn", children: "Siguiente" })] })] })), updateStep === 5 && (_jsxs("div", { className: "register-section-info-alumn", children: [_jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "id_carrera_tecnica", children: "Carrera T\u00E9cnica" }), _jsx("input", { type: "text", id: "id_carrera_tecnica", name: "id_carrera_tecnica", placeholder: "Carrera T\u00E9cnica", value: updateFormData.id_carrera_tecnica, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "id_pais", children: "Pa\u00EDs" }), _jsx("input", { type: "text", id: "id_pais", name: "id_pais", placeholder: "Pa\u00EDs", value: updateFormData.id_pais, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "id_estado", children: "Estado" }), _jsx("input", { type: "text", id: "id_estado", name: "id_estado", placeholder: "Estado", value: updateFormData.id_estado, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "municipio_alumnos", children: "Municipio" }), _jsx("input", { type: "text", id: "municipio_alumnos", name: "municipio_alumnos", placeholder: "Municipio", value: updateFormData.municipio_alumnos, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "button-group-info-alumn", children: [_jsx("button", { type: "button", onClick: handlePreviousUpdateStep, className: "previous-button-info-alumn", children: "Anterior" }), _jsx("button", { type: "button", onClick: handleNextUpdateStep, className: "next-button-info-alumn", children: "Siguiente" })] })] })), updateStep === 6 && (_jsxs("div", { className: "register-section-info-alumn", children: [_jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "comunidad_alumnos", children: "Comunidad" }), _jsx("input", { type: "text", id: "comunidad_alumnos", name: "comunidad_alumnos", placeholder: "Comunidad", value: updateFormData.comunidad_alumnos, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "calle_alumnos", children: "Calle" }), _jsx("input", { type: "text", id: "calle_alumnos", name: "calle_alumnos", placeholder: "Calle", value: updateFormData.calle_alumnos, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "register-input-container-info-alumn", children: [_jsx("label", { htmlFor: "proc_sec_alumno", children: "Procedencia Secundaria" }), _jsx("input", { type: "text", id: "proc_sec_alumno", name: "proc_sec_alumno", placeholder: "Procedencia Secundaria", value: updateFormData.proc_sec_alumno, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "button-group-info-alumn", children: [_jsx("button", { type: "button", onClick: handlePreviousUpdateStep, className: "previous-button-info-alumn", children: "Anterior" }), _jsx("button", { type: "submit", className: "save-button-info-alumn", children: "Actualizar" })] })] }))] })] })] }));
}
