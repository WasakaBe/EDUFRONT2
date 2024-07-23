import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { apiUrl } from '../../constants/Api';
const PasswordReset = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [method, setMethod] = useState(''); // 'question' or 'token'
    const [step, setStep] = useState(1); // 1: Email, 2: Select Method, 3: Verify, 4: Reset Password
    useEffect(() => {
        async function fetchQuestions() {
            try {
                const response = await fetch(`${apiUrl}pregunta`);
                const data = await response.json();
                setQuestions(data);
            }
            catch (error) {
                toast.error('Error al cargar las preguntas de seguridad');
            }
        }
        fetchQuestions();
    }, []);
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
            try {
                const response = await fetch(`${apiUrl}check-email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ correo_usuario: email }),
                });
                const data = await response.json();
                if (response.status === 200 && data.exists) {
                    toast.success('Correo verificado. Seleccione el método de restablecimiento de contraseña.');
                    setStep(2); // Move to select method step
                    setEmailError('');
                }
                else {
                    toast.error('El correo ingresado no se encuentra disponible o no existe');
                    setEmailError('El correo ingresado no se encuentra disponible o no existe');
                }
            }
            catch (error) {
                toast.error('Error al verificar el correo');
            }
        }
        else {
            setEmailError('Por favor, ingrese un correo electrónico válido.');
        }
    };
    const handleMethodSelect = async (selectedMethod) => {
        setMethod(selectedMethod);
        if (selectedMethod === 'token') {
            try {
                const response = await fetch(`${apiUrl}get-token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ correo_usuario: email }),
                });
                if (response.status === 200) {
                    toast.success('Token enviado a su correo electrónico.');
                    setStep(3); // Move to token verification step
                }
                else {
                    toast.error('Error al enviar el token.');
                }
            }
            catch (error) {
                toast.error('Error al enviar el token.');
            }
        }
        else {
            setStep(3); // Move to question verification step
        }
    };
    const handleQuestionSubmit = async (e) => {
        e.preventDefault();
        if (selectedQuestion && answer) {
            try {
                const response = await fetch(`${apiUrl}recover-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        correo_usuario: email,
                        idPregunta: parseInt(selectedQuestion),
                        respuestaPregunta: answer,
                    }),
                });
                if (response.status === 200) {
                    toast.success('Pregunta y respuesta verificadas. Puede restablecer su contraseña.');
                    setStep(4); // Move to password reset step
                }
                else {
                    toast.error('Las credenciales proporcionadas no coinciden');
                }
            }
            catch (error) {
                toast.error('Error al verificar la respuesta');
            }
        }
        else {
            toast.error('Por favor, seleccione una pregunta e ingrese la respuesta.');
        }
    };
    const handleTokenSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}verify-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token_usuario: token }),
            });
            if (response.status === 200) {
                toast.success('Token verificado. Puede restablecer su contraseña.');
                setStep(4); // Move to password reset step
            }
            else {
                toast.error('Token incorrecto');
            }
        }
        catch (error) {
            toast.error('Error al verificar el token');
        }
    };
    const validatePassword = (password) => {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        return re.test(password);
    };
    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (!validatePassword(newPassword)) {
            toast.error('La contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas, números y caracteres especiales.');
            return;
        }
        if (newPassword !== repeatPassword) {
            toast.error('Las contraseñas no coinciden.');
            return;
        }
        try {
            const response = await fetch(`${apiUrl}updates-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    correo_usuario: email,
                    new_password: newPassword,
                }),
            });
            if (response.status === 200) {
                toast.success('Contraseña restablecida correctamente.');
                onClose();
            }
            else {
                toast.error('Error al restablecer la contraseña.');
            }
        }
        catch (error) {
            toast.error('Error al restablecer la contraseña.');
        }
    };
    return (_jsx("div", { className: "register-modal-overlay", children: _jsxs("div", { className: "register-modal-content", children: [_jsx("h2", { children: "Restablecer Contrase\u00F1a" }), step === 1 && (_jsx("form", { onSubmit: handleEmailSubmit, children: _jsxs("div", { className: "register-input-container", children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { type: "email", id: "email", placeholder: "example@email.com", value: email, onChange: (e) => setEmail(e.target.value), className: emailError ? 'error' : email ? 'success' : '', required: true }), emailError && _jsx("p", { className: "error-text", children: emailError }), _jsx("br", {}), _jsx("button", { type: "submit", className: "login-button", children: "Siguiente" })] }) })), step === 2 && (_jsxs("div", { className: "buttons", children: [_jsx("button", { onClick: () => handleMethodSelect('question'), className: "login-button", children: "Pregunta de Seguridad" }), _jsx("button", { onClick: () => handleMethodSelect('token'), className: "login-button", children: "Token de Correo" })] })), step === 3 && method === 'question' && (_jsx("form", { onSubmit: handleQuestionSubmit, children: _jsxs("div", { className: "register-input-container", children: [_jsx("label", { htmlFor: "question", children: "Pregunta de Seguridad" }), _jsxs("select", { id: "question", value: selectedQuestion, onChange: (e) => setSelectedQuestion(e.target.value), required: true, children: [_jsx("option", { value: "", children: "Seleccione una pregunta" }), questions.map((question) => (_jsx("option", { value: question.id_preguntas, children: question.nombre_preguntas }, question.id_preguntas)))] }), _jsx("label", { htmlFor: "answer", children: "Respuesta" }), _jsx("input", { type: "text", id: "answer", placeholder: "Ingrese su respuesta", value: answer, onChange: (e) => setAnswer(e.target.value), required: true }), _jsx("br", {}), _jsx("button", { type: "submit", className: "login-button", children: "Verificar" })] }) })), step === 3 && method === 'token' && (_jsx("form", { onSubmit: handleTokenSubmit, children: _jsxs("div", { className: "register-input-container", children: [_jsx("label", { htmlFor: "token", children: "Ingrese su token" }), _jsx("input", { type: "text", id: "token", placeholder: "Token", value: token, onChange: (e) => setToken(e.target.value), required: true }), _jsx("br", {}), _jsx("button", { type: "submit", className: "next-button", children: "Verificar Token" })] }) })), step === 4 && (_jsx("form", { onSubmit: handlePasswordReset, children: _jsxs("div", { className: "register-input-container", children: [_jsx("label", { htmlFor: "newPassword", children: "Ingrese su nueva contrase\u00F1a" }), _jsx("input", { type: "password", id: "newPassword", placeholder: "Nueva contrase\u00F1a", value: newPassword, onChange: (e) => setNewPassword(e.target.value), required: true }), _jsx("label", { htmlFor: "repeatPassword", children: "Repita su nueva contrase\u00F1a" }), _jsx("input", { type: "password", id: "repeatPassword", placeholder: "Repita la nueva contrase\u00F1a", value: repeatPassword, onChange: (e) => setRepeatPassword(e.target.value), required: true }), _jsx("br", {}), _jsx("button", { type: "submit", className: "login-button", children: "Restablecer Contrase\u00F1a" })] }) })), _jsx("button", { onClick: onClose, className: "close-button-login", children: "Cerrar" })] }) }));
};
export default PasswordReset;
