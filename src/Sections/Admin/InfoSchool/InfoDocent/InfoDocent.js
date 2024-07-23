import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import './InfoDocent.css';
import { apiUrl } from '../../../../constants/Api';
import Modal from 'react-modal';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DateTime } from 'luxon';
Modal.setAppElement('#root');
export default function InfoDocent() {
    const [docentes, setDocentes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        nombre_usuario: '',
        app_usuario: '',
        apm_usuario: '',
        fecha_nacimiento_usuario: '',
        token_usuario: '',
        correo_usuario: '',
        pwd_usuario: '',
        phone_usuario: '',
        idRol: 3,
        idSexo: '',
        ip_usuario: '',
        idCuentaActivo: 1,
        idPregunta: '',
        respuestaPregunta: '',
    });
    const [updateFormData, setUpdateFormData] = useState({
        nombre_docentes: '',
        app_docentes: '',
        apm_docentes: '',
        fecha_nacimiento_docentes: '',
        noconttrol_docentes: '',
        telefono_docentes: '',
        seguro_social_docentes: '',
        idSexo: '',
        idUsuario: '',
        idClinica: ''
    });
    const [secretQuestions, setSecretQuestions] = useState([]);
    const [sexOptions, setSexOptions] = useState([]);
    const [updateStep, setUpdateStep] = useState(1);
    const [step, setStep] = useState(1);
    const [captchaValido, cambiarEstado] = useState(null);
    const captcha = useRef(null);
    const itemsPerPage = 6;
    useEffect(() => {
        fetchDocentes();
        fetchSecretQuestions();
        fetchSexOptions();
    }, []);
    const fetchDocentes = () => {
        fetch(`${apiUrl}docente`)
            .then(response => response.json())
            .then(data => {
            if (Array.isArray(data)) {
                setDocentes(data);
            }
            else {
                console.error('Invalid data format:', data);
            }
        })
            .catch(error => {
            console.error('Error fetching docentes:', error);
        });
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
    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            toast.warning('Por favor ingrese un número de control o CURP para buscar');
            return;
        }
        fetch(`${apiUrl}docentes/nocontrol/${searchTerm}`)
            .then(response => response.json())
            .then(data => {
            if (data) {
                setDocentes([data]);
            }
            else {
                console.error('Error adding docente:', data.message);
            }
        })
            .catch(error => {
            console.error('Error fetching docente:', error);
            toast.error('Docente no encontrado');
        });
    };
    const openModal = (docente) => {
        setFormData({
            ...formData,
            nombre_usuario: docente.nombre_docentes,
            app_usuario: docente.app_docentes,
            apm_usuario: docente.apm_docentes,
            fecha_nacimiento_usuario: docente.fecha_nacimiento_docentes,
            phone_usuario: docente.telefono_docentes,
        });
        setIsModalOpen(true);
    };
    const openUpdateModal = (docente) => {
        setUpdateFormData({
            nombre_docentes: docente.nombre_docentes,
            app_docentes: docente.app_docentes,
            apm_docentes: docente.apm_docentes,
            fecha_nacimiento_docentes: docente.fecha_nacimiento_docentes,
            noconttrol_docentes: docente.noconttrol_docentes,
            telefono_docentes: docente.telefono_docentes,
            seguro_social_docentes: '',
            idSexo: docente.idSexo,
            idUsuario: docente.idUsuario,
            idClinica: docente.idClinica
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
            idRol: 3,
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
            const response = await fetch(`${apiUrl}docente/${updateFormData.idUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateFormData),
            });
            if (!response.ok) {
                throw new Error('Error al actualizar docente');
            }
            const data = await response.json();
            toast.success('Docente actualizado exitosamente');
            closeUpdateModal();
            fetchDocentes(); // Refrescar la lista de docentes después de la actualización
        }
        catch (err) {
            toast.error('Error al actualizar docente');
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
            if (age < 18 || age > 69) {
                toast.info('La edad debe estar entre 18 y 69 años.');
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
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = docentes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(docentes.length / itemsPerPage);
    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };
    return (_jsxs("div", { className: 'info-docent-container', children: [_jsx("h2", { children: "Informaci\u00F3n de Docentes" }), _jsxs("div", { className: "search-bar", children: [_jsx("input", { type: "text", value: searchTerm, onChange: handleSearchTermChange, placeholder: "Ingrese n\u00FAmero de control o CURP" }), _jsx("button", { onClick: handleSearch, children: "Buscar" })] }), _jsx("div", { className: "docents-table-container", children: _jsxs("table", { className: "docents-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "Nombre" }), _jsx("th", { children: "Apellido Paterno" }), _jsx("th", { children: "Apellido Materno" }), _jsx("th", { children: "Fecha de Nacimiento" }), _jsx("th", { className: "hide-on-mobile", children: "N\u00FAmero de Control" }), _jsx("th", { className: "hide-on-mobile", children: "Tel\u00E9fono" }), _jsx("th", { className: "hide-on-mobile", children: "Correo" }), _jsx("th", { className: "hide-on-mobile", children: "Cl\u00EDnica" }), _jsx("th", { className: "hide-on-mobile", children: "Sexo" }), _jsx("th", { children: "Acciones" })] }) }), _jsx("tbody", { children: currentItems.map(docente => (_jsxs("tr", { children: [_jsx("td", { children: docente.id_docentes }), _jsx("td", { children: docente.nombre_docentes }), _jsx("td", { children: docente.app_docentes }), _jsx("td", { children: docente.apm_docentes }), _jsx("td", { children: docente.fecha_nacimiento_docentes }), _jsx("td", { className: "hide-on-mobile", children: docente.noconttrol_docentes }), _jsx("td", { className: "hide-on-mobile", children: docente.telefono_docentes }), _jsx("td", { className: "hide-on-mobile", children: docente.idUsuario }), _jsx("td", { className: "hide-on-mobile", children: docente.idClinica }), _jsx("td", { className: "hide-on-mobile", children: docente.idSexo }), _jsxs("td", { className: "align2", children: [_jsx("button", { className: "update-button-info-docent", type: "button", onClick: () => openUpdateModal(docente), children: "Actualizar" }), _jsx("button", { className: 'save-button-info-docent', type: "button", onClick: () => openModal(docente), children: "Crear Usuario" })] })] }, docente.id_docentes))) })] }) }), _jsx("div", { className: "pagination", children: Array.from({ length: totalPages }, (_, index) => (_jsx("button", { className: `page-button ${currentPage === index + 1 ? 'active' : ''}`, onClick: () => setCurrentPage(index + 1), children: index + 1 }, index + 1))) }), _jsx(ToastContainer, {}), _jsxs(Modal, { isOpen: isUpdateModalOpen, onRequestClose: closeUpdateModal, className: "modal-info-docent", overlayClassName: "modal-overlay-info-docent", children: [_jsx("h2", { children: "Actualizaci\u00F3n de Docente" }), _jsxs("form", { className: "modal-form-info-docent", onSubmit: handleUpdate, children: [updateStep === 1 && (_jsxs("div", { className: "register-section-info-docent", children: [_jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "nombre_docentes", children: "Nombre" }), _jsx("input", { type: "text", id: "nombre_docentes", name: "nombre_docentes", placeholder: "Nombre", value: updateFormData.nombre_docentes, onChange: handleUpdateInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "app_docentes", children: "Apellido Paterno" }), _jsx("input", { type: "text", id: "app_docentes", name: "app_docentes", placeholder: "Apellido Paterno", value: updateFormData.app_docentes, onChange: handleUpdateInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "apm_docentes", children: "Apellido Materno" }), _jsx("input", { type: "text", id: "apm_docentes", name: "apm_docentes", placeholder: "Apellido Materno", value: updateFormData.apm_docentes, onChange: handleUpdateInputChange, required: true })] }), _jsxs("div", { className: "button-group-info-docent", children: [_jsx("button", { type: "button", onClick: closeUpdateModal, className: "cancel-button-info-docent", children: "Cancelar" }), _jsx("button", { type: "button", onClick: handleNextUpdateStep, className: "next-button-info-docent", children: "Siguiente" })] })] })), updateStep === 2 && (_jsxs("div", { className: "register-section-info-docent", children: [_jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "fecha_nacimiento_docentes", children: "Fecha de Nacimiento" }), _jsx("input", { type: "date", id: "fecha_nacimiento_docentes", name: "fecha_nacimiento_docentes", placeholder: "Fecha de Nacimiento", value: updateFormData.fecha_nacimiento_docentes, onChange: handleUpdateInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "noconttrol_docentes", children: "N\u00FAmero de Control" }), _jsx("input", { type: "text", id: "noconttrol_docentes", name: "noconttrol_docentes", placeholder: "N\u00FAmero de Control", value: updateFormData.noconttrol_docentes, onChange: handleUpdateInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "telefono_docentes", children: "Tel\u00E9fono" }), _jsx("input", { type: "tel", id: "telefono_docentes", name: "telefono_docentes", placeholder: "Tel\u00E9fono", value: updateFormData.telefono_docentes, onChange: handleUpdateInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "seguro_social_docentes", children: "Seguro Social" }), _jsx("input", { type: "text", id: "seguro_social_docentes", name: "seguro_social_docentes", placeholder: "Seguro Social", value: updateFormData.seguro_social_docentes, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "button-group-info-docent", children: [_jsx("button", { type: "button", onClick: handlePreviousUpdateStep, className: "previous-button-info-docent", children: "Anterior" }), _jsx("button", { type: "button", onClick: handleNextUpdateStep, className: "next-button-info-docent", children: "Siguiente" })] })] })), updateStep === 3 && (_jsxs("div", { className: "register-section-info-docent", children: [_jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "idSexo", children: "Sexo" }), _jsxs("select", { id: "idSexo", name: "idSexo", value: updateFormData.idSexo, onChange: handleUpdateInputChange, required: true, children: [_jsx("option", { value: "", children: "Seleccione..." }), _jsx("option", { value: "1", children: "MASCULINO" }), _jsx("option", { value: "2", children: "FEMENINO" })] })] }), _jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "idUsuario", children: "Usuario" }), _jsx("input", { type: "text", id: "idUsuario", name: "idUsuario", placeholder: "Usuario", value: updateFormData.idUsuario, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "idClinica", children: "Cl\u00EDnica" }), _jsx("input", { type: "text", id: "idClinica", name: "idClinica", placeholder: "Cl\u00EDnica", value: updateFormData.idClinica, onChange: handleUpdateInputChange })] }), _jsxs("div", { className: "button-group-info-docent", children: [_jsx("button", { type: "button", onClick: handlePreviousUpdateStep, className: "previous-button-info-docent", children: "Anterior" }), _jsx("button", { type: "submit", className: "save-button-info-docent", children: "Actualizar" })] })] }))] })] }), _jsxs(Modal, { isOpen: isModalOpen, onRequestClose: closeModal, className: "modal-info-alumn", overlayClassName: "modal-overlay-info-alumn", children: [_jsx("h2", { children: "Registro de Usuario" }), _jsxs("form", { className: "modal-form-info-alumn", onSubmit: handleInsert, children: [step === 1 && (_jsxs("div", { className: "register-section-info-alumn", children: [_jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "nombre_usuario", children: "Nombre" }), _jsx("input", { type: "text", id: "nombre_usuario", name: "nombre_usuario", placeholder: "Nombre", value: formData.nombre_usuario, onChange: handleInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "app_usuario", children: "Apellido Paterno" }), _jsx("input", { type: "text", id: "app_usuario", name: "app_usuario", placeholder: "Apellido Paterno", value: formData.app_usuario, onChange: handleInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "apm_usuario", children: "Apellido Materno" }), _jsx("input", { type: "text", id: "apm_usuario", name: "apm_usuario", placeholder: "Apellido Materno", value: formData.apm_usuario, onChange: handleInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "fecha_nacimiento_usuario", children: "Fecha de Nacimiento" }), _jsx("input", { type: "date", id: "fecha_nacimiento_usuario", name: "fecha_nacimiento_usuario", placeholder: "Fecha de Nacimiento", value: formData.fecha_nacimiento_usuario, onChange: handleInputChange, required: true })] }), _jsxs("div", { className: "button-group-info-docent", children: [_jsx("button", { type: "button", onClick: closeModal, className: "cancel-button-info-docent", children: "Cancelar" }), _jsx("button", { type: "button", onClick: handleNextStep, className: "next-button-info-docent", children: "Siguiente" })] })] })), step === 2 && (_jsxs("div", { className: "register-section-info-docent", children: [_jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "correo_usuario", children: "Correo" }), _jsx("input", { type: "email", id: "correo_usuario", name: "correo_usuario", placeholder: "Correo", value: formData.correo_usuario, onChange: handleInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "pwd_usuario", children: "Contrase\u00F1a" }), _jsx("input", { type: "password", id: "pwd_usuario", name: "pwd_usuario", placeholder: "Contrase\u00F1a", value: formData.pwd_usuario, onChange: handleInputChange, required: true })] }), _jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "phone_usuario", children: "Tel\u00E9fono" }), _jsx("input", { type: "tel", id: "phone_usuario", name: "phone_usuario", placeholder: "Tel\u00E9fono", value: formData.phone_usuario, onChange: handleInputChange, required: true })] }), _jsxs("div", { className: "button-group-info-docent", children: [_jsx("button", { type: "button", onClick: handlePreviousStep, className: "previous-button-info-docent", children: "Anterior" }), _jsx("button", { type: "button", onClick: handleNextStep, className: "next-button-info-docent", children: "Siguiente" })] })] })), step === 3 && (_jsxs("div", { className: "register-section-info-docent", children: [_jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "idSexo", children: "Sexo" }), _jsxs("select", { id: "idSexo", name: "idSexo", value: formData.idSexo, onChange: handleInputChange, required: true, children: [_jsx("option", { value: "", children: "Seleccione..." }), sexOptions.map((sexo) => (_jsx("option", { value: sexo.id_sexos, children: sexo.nombre_sexo }, sexo.id_sexos)))] })] }), _jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "idPregunta", children: "Pregunta Secreta" }), _jsxs("select", { id: "idPregunta", name: "idPregunta", value: formData.idPregunta, onChange: handleInputChange, required: true, children: [_jsx("option", { value: "", children: "Seleccione una pregunta..." }), secretQuestions.map((pregunta) => (_jsx("option", { value: pregunta.id_preguntas, children: pregunta.nombre_preguntas }, pregunta.id_preguntas)))] })] }), _jsxs("div", { className: "register-input-container-info-docent", children: [_jsx("label", { htmlFor: "respuestaPregunta", children: "Respuesta Secreta" }), _jsx("input", { type: "text", id: "respuestaPregunta", name: "respuestaPregunta", placeholder: "Respuesta Secreta", value: formData.respuestaPregunta, onChange: handleInputChange, required: true })] }), _jsx("div", { className: "recaptcha-info-docent", children: _jsx(ReCAPTCHA, { ref: captcha, sitekey: "6LdYfJspAAAAAAxTWQY68WAEX6JTgnysv3NxAMzd", onChange: onChangeCaptcha }) }), _jsxs("div", { className: "button-group-info-docent", children: [_jsx("button", { type: "button", onClick: handlePreviousStep, className: "previous-button-info-docent", children: "Anterior" }), _jsx("button", { type: "submit", className: "save-button-info-docent", children: "Guardar" })] })] }))] })] })] }));
}
