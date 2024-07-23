import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { DateTime } from 'luxon';
import './Register.css'; // Importa el archivo CSS
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl } from '../../constants/Api';
import ReCAPTCHA from "react-google-recaptcha";
const Register = ({ onClose }) => {
    const [step, setStep] = useState(2); // Inicializar en el paso 2
    const [formData, setFormData] = useState({
        nombre: '',
        nombreError: false,
        nombreSuccess: false,
        app: '',
        appError: false,
        appSuccess: false,
        apm: '',
        apmError: false,
        apmSuccess: false,
        fechaNacimiento: '',
        correo: '',
        correoError: false,
        correoSuccess: false,
        pwd: '',
        pwdError: false,
        pwdSuccess: false,
        telefono: '',
        telefonoError: false,
        telefonoSuccess: false,
        sexo: '',
        preguntaSecreta: '',
        respuestaSecreta: '',
    });
    const [secretQuestions, setSecretQuestions] = useState([]);
    const [sexOptions, setSexOptions] = useState([]);
    const [error, setError] = useState('');
    const [captchaValido, cambiarEstado] = useState(null);
    const captcha = useRef(null);
    useEffect(() => {
        fetchSecretQuestions();
        fetchSexOptions();
    }, []);
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Validación específica para campos de texto
        const nameRegex = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]*$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const phoneRegex = /^\d{10}$/;
        if (name === 'nombre' || name === 'app' || name === 'apm') {
            if (nameRegex.test(value)) {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                    [`${name}Error`]: false, // Sin error
                    [`${name}Success`]: true, // Validación exitosa
                }));
            }
            else {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                    [`${name}Error`]: true, // Error específico del campo
                    [`${name}Success`]: false, // No es una validación exitosa
                }));
            }
        }
        else if (name === 'correo') {
            if (emailRegex.test(value)) {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                    correoError: false,
                    correoSuccess: true,
                }));
                checkEmailAvailability(value);
            }
            else {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                    correoError: true,
                    correoSuccess: false,
                }));
            }
        }
        else if (name === 'pwd') {
            if (passwordRegex.test(value)) {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                    pwdError: false,
                    pwdSuccess: true,
                }));
                toast.success('Password fuerte validado');
            }
            else {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                    pwdError: true,
                    pwdSuccess: false,
                }));
                toast.error('El password es mínimo de 8 dígitos, debe incluir caracteres de texto mayúscula, minúscula, número y especiales');
            }
        }
        else if (name === 'telefono') {
            if (phoneRegex.test(value)) {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                    telefonoError: false,
                    telefonoSuccess: true,
                }));
                toast.success('Teléfono válido');
            }
            else {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                    telefonoError: true,
                    telefonoSuccess: false,
                }));
                toast.error('El teléfono debe tener exactamente 10 caracteres numéricos');
            }
        }
        else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
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
                setFormData((prevData) => ({
                    ...prevData,
                    correoError: true,
                    correoSuccess: false,
                }));
                toast.error('El correo ya existe, use otro correo');
            }
            else {
                setFormData((prevData) => ({
                    ...prevData,
                    correoError: false,
                    correoSuccess: true,
                }));
                toast.success('Correo validado');
            }
        }
        catch (err) {
            setFormData((prevData) => ({
                ...prevData,
                correoError: true,
                correoSuccess: false,
            }));
            toast.error('Error al verificar el correo');
        }
    };
    const validateSection1 = () => {
        const { nombre, app, apm, fechaNacimiento } = formData;
        const nameRegex = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/;
        if (!nombre || !nameRegex.test(nombre)) {
            toast.error('El nombre solo puede contener letras y espacios');
            return false;
        }
        if (!app || !nameRegex.test(app)) {
            toast.error('El apellido paterno solo puede contener letras y espacios');
            return false;
        }
        if (!apm || !nameRegex.test(apm)) {
            toast.error('El apellido materno solo puede contener letras y espacios');
            return false;
        }
        if (!fechaNacimiento) {
            toast.error('La fecha de nacimiento es obligatoria');
            return false;
        }
        // Validar fecha de nacimiento para familiares
        const birthDate = DateTime.fromISO(fechaNacimiento);
        const currentDate = DateTime.now();
        const age = currentDate.diff(birthDate, 'years').years;
        if (age < 18 || age > 70) {
            toast.error('La edad debe estar entre 18 y 70 años para familiares');
            return false;
        }
        setError('');
        return true;
    };
    const validateSection2 = () => {
        const { correo, pwd, preguntaSecreta, respuestaSecreta } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!correo || !emailRegex.test(correo) || formData.correoError) {
            toast.error('Ingrese un correo electrónico válido o no disponible');
            return false;
        }
        if (!pwd || !passwordRegex.test(pwd)) {
            toast.error('El password es mínimo de 8 dígitos, debe incluir caracteres de texto mayúscula, minúscula, número y especiales');
            return false;
        }
        if (!preguntaSecreta || !respuestaSecreta) {
            toast.error('Todos los campos son obligatorios');
            return false;
        }
        setError('');
        return true;
    };
    const validateSection3 = () => {
        const { telefono, sexo } = formData;
        const phoneRegex = /^\d{10}$/;
        if (!telefono || !phoneRegex.test(telefono)) {
            toast.error('El teléfono debe tener exactamente 10 caracteres numéricos');
            return false;
        }
        if (!sexo) {
            toast.error('Todos los campos son obligatorios');
            return false;
        }
        setError('');
        return true;
    };
    const onChangeCaptcha = () => {
        if (captcha.current && captcha.current.getValue()) {
            console.log("No eres un robot");
            cambiarEstado(true);
        }
        else {
            console.log("Realiza el captcha correctamente");
            cambiarEstado(false);
        }
    };
    const handleNextStep = () => {
        if (step === 2 && validateSection1()) {
            setStep(3);
        }
        else if (step === 3 && validateSection2()) {
            setStep(4);
        }
    };
    const handlePreviousStep = () => {
        if (step > 2) {
            setStep(step - 1);
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
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateSection3() || !captchaValido) {
            toast.error('Por favor, completa todos los campos y realiza correctamente el CAPTCHA.');
            return;
        }
        try {
            const response = await fetch(`${apiUrl}users/insert`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario: formData.nombre,
                    app_usuario: formData.app,
                    apm_usuario: formData.apm,
                    fecha_nacimiento_usuario: formData.fechaNacimiento,
                    token_usuario: generateToken(),
                    correo_usuario: formData.correo,
                    pwd_usuario: formData.pwd,
                    phone_usuario: formData.telefono,
                    idRol: 4, // Rol de Familiar
                    idSexo: formData.sexo,
                    ip_usuario: await fetch('https://api64.ipify.org?format=json')
                        .then(response => response.json())
                        .then(data => data.ip),
                    idCuentaActivo: 1, // Asumiendo que 1 significa cuenta activa
                    idPregunta: formData.preguntaSecreta,
                    respuestaPregunta: formData.respuestaSecreta,
                }),
            });
            const data = await response.json();
            if (response.status === 201) {
                toast.success('Creación del usuario exitosa'); // Cambia el mensaje a "Creación del usuario exitosa"
                onClose(); // Ocultar el modal
            }
            else {
                toast.error(data.message || 'Error al crear el usuario');
            }
        }
        catch (err) {
            toast.error('Error al conectar con el servidor');
        }
    };
    return (_jsxs("div", { className: "register-modal-overlay", children: [_jsxs("div", { className: "register-modal-content", children: [step === 2 ? (_jsxs(_Fragment, { children: [_jsx("h2", { children: "Crear Cuenta - Secci\u00F3n 1" }), _jsxs("div", { className: "register-section", children: [_jsxs("div", { className: "register-input-container", children: [_jsx("label", { htmlFor: "nombre", children: "Nombre" }), _jsx("input", { type: "text", id: "nombre", name: "nombre", placeholder: "Nombre", value: formData.nombre, onChange: handleChange, className: formData.nombreError ? 'error' : formData.nombreSuccess ? 'success' : '', required: true })] }), _jsxs("div", { className: "register-input-container", children: [_jsx("label", { htmlFor: "app", children: "Apellido Paterno" }), _jsx("input", { type: "text", id: "app", name: "app", placeholder: "Apellido Paterno", value: formData.app, onChange: handleChange, className: formData.appError ? 'error' : formData.appSuccess ? 'success' : '', required: true })] }), _jsxs("div", { className: "register-input-container", children: [_jsx("label", { htmlFor: "apm", children: "Apellido Materno" }), _jsx("input", { type: "text", id: "apm", name: "apm", placeholder: "Apellido Materno", value: formData.apm, onChange: handleChange, className: formData.apmError ? 'error' : formData.apmSuccess ? 'success' : '', required: true })] }), _jsxs("div", { className: "register-input-container", children: [_jsx("label", { htmlFor: "fechaNacimiento", children: "Fecha de Nacimiento" }), _jsx("input", { type: "date", id: "fechaNacimiento", name: "fechaNacimiento", placeholder: "Fecha de Nacimiento", value: formData.fechaNacimiento, onChange: handleChange, required: true })] }), error && _jsx("p", { className: "register-error-text", children: error }), _jsxs("div", { className: "button-group", children: [_jsx("button", { className: "previous-button", onClick: handlePreviousStep, children: "Anterior" }), _jsx("button", { className: "next-button", onClick: handleNextStep, children: "Siguiente" })] })] })] })) : (_jsxs(_Fragment, { children: [step === 3 && (_jsxs(_Fragment, { children: [_jsx("h2", { children: "Crear Cuenta - Secci\u00F3n 2" }), _jsxs("div", { className: "register-section", children: [_jsxs("div", { className: "register-input-container", children: [_jsx("label", { htmlFor: "correo", children: "Correo" }), _jsx("input", { type: "email", id: "correo", name: "correo", placeholder: "Correo", value: formData.correo, onChange: handleChange, className: formData.correoError ? 'error' : formData.correoSuccess ? 'success' : '', required: true })] }), _jsxs("div", { className: "register-input-container", children: [_jsx("label", { htmlFor: "pwd", children: "Contrase\u00F1a" }), _jsx("input", { type: "password", id: "pwd", name: "pwd", placeholder: "Contrase\u00F1a", value: formData.pwd, onChange: handleChange, className: formData.pwdError ? 'error' : formData.pwdSuccess ? 'success' : '', required: true })] }), _jsxs("div", { className: "register-input-container", children: [_jsx("label", { htmlFor: "preguntaSecreta", children: "Pregunta Secreta" }), _jsxs("select", { id: "preguntaSecreta", name: "preguntaSecreta", value: formData.preguntaSecreta, onChange: handleChange, required: true, children: [_jsx("option", { value: "", children: "Seleccione una pregunta..." }), secretQuestions.map((pregunta) => (_jsx("option", { value: pregunta.id_preguntas, children: pregunta.nombre_preguntas }, pregunta.id_preguntas)))] })] }), _jsxs("div", { className: "register-input-container", children: [_jsx("label", { htmlFor: "respuestaSecreta", children: "Respuesta Secreta" }), _jsx("input", { type: "text", id: "respuestaSecreta", name: "respuestaSecreta", placeholder: "Respuesta Secreta", value: formData.respuestaSecreta, onChange: handleChange, required: true })] }), error && _jsx("p", { className: "register-error-text", children: error }), _jsxs("div", { className: "button-group", children: [_jsx("button", { className: "previous-button", onClick: handlePreviousStep, children: "Anterior" }), _jsx("button", { className: "next-button", onClick: handleNextStep, children: "Siguiente" })] })] })] })), step === 4 && (_jsxs(_Fragment, { children: [_jsx("h2", { children: "Crear Cuenta - Secci\u00F3n 3" }), _jsxs("div", { className: "register-section", children: [_jsxs("div", { className: "register-input-container", children: [_jsx("label", { htmlFor: "telefono", children: "Tel\u00E9fono" }), _jsx("input", { type: "tel", id: "telefono", name: "telefono", placeholder: "Tel\u00E9fono", value: formData.telefono, onChange: handleChange, className: formData.telefonoError ? 'error' : formData.telefonoSuccess ? 'success' : '', required: true })] }), _jsxs("div", { className: "register-input-container", children: [_jsx("label", { htmlFor: "sexo", children: "Sexo" }), _jsxs("select", { id: "sexo", name: "sexo", value: formData.sexo, onChange: handleChange, required: true, children: [_jsx("option", { value: "", children: "Seleccione..." }), sexOptions.map((sexo) => (_jsx("option", { value: sexo.id_sexos, children: sexo.nombre_sexo }, sexo.id_sexos)))] })] }), _jsx("div", { className: "recaptcha", children: _jsx(ReCAPTCHA, { ref: captcha, sitekey: "6LdYfJspAAAAAAxTWQY68WAEX6JTgnysv3NxAMzd", onChange: onChangeCaptcha }) }), error && _jsx("p", { className: "register-error-text", children: error }), _jsxs("div", { className: "button-group", children: [_jsx("button", { className: "previous-button", onClick: handlePreviousStep, children: "Anterior" }), _jsx("button", { type: "submit", onClick: handleRegister, className: "register-button", children: "Registrar" })] })] })] }))] })), _jsx("button", { onClick: onClose, className: "register-close-button", children: "\u00D7" })] }), _jsx(ToastContainer, {})] }));
};
export default Register;
