import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { alumnos_honores } from '../../assets/images';
import './Login.css';
import { apiUrl } from '../../constants/Api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Auto/Auth';
import Register from '../Register/Register';
import PasswordReset from '../ForgoutPwd/ForgoutPwd';
const Login = ({ onClose }) => {
    const history = useNavigate();
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }
    const { login } = authContext;
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showRegister, setShowRegister] = useState(false); // Estado para mostrar la modal de registro
    const [showPasswordReset, setShowPasswordReset] = useState(false); // Estado para mostrar la modal de restablecimiento de contraseña
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
                    toast.success('Correo disponible');
                    setEmailSubmitted(true);
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
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (password.trim() === '') {
            toast.error('Por favor, ingrese su contraseña.');
            return;
        }
        if (password.length >= 6) {
            try {
                const response = await fetch(`${apiUrl}login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ correo_usuario: email, pwd_usuario: password }),
                });
                const data = await response.json();
                if (response.status === 200 && data.tbl_users) {
                    const user = data.tbl_users;
                    if (user.pwd_usuario === password) {
                        login(user);
                        const userName = user.nombre_usuario;
                        if (user.idRol === 1) {
                            toast.success(`Bienvenido administrador ${userName}`);
                            history(`/Administration/${userName}`, { state: { user2: userName } });
                        }
                        else if (user.idRol === 2) {
                            toast.success(`Bienvenido alumno ${userName}`);
                            history(`/Alumn/${userName}`, { state: { user2: userName } });
                        }
                        else if (user.idRol === 3) {
                            toast.success(`Bienvenido docente ${userName}`);
                            history(`/Docent/${userName}`, { state: { user2: userName } });
                        }
                        else if (user.idRol === 4) {
                            toast.success(`Bienvenido familiar ${userName}`);
                            history(`/Familiar/${userName}`, { state: { user2: userName } });
                        }
                        setPasswordError('');
                    }
                    else {
                        toast.error('Datos no coinciden');
                        setPasswordError('Datos no coinciden');
                    }
                }
                else {
                    toast.error('Password erróneo');
                    setPasswordError('Password erróneo');
                }
            }
            catch (error) {
                toast.error('Error al iniciar sesión');
            }
        }
        else {
            setPasswordError('La contraseña debe tener al menos 6 caracteres.');
        }
    };
    const handleBackClick = () => {
        setEmailSubmitted(false);
        setPassword('');
        setPasswordError('');
    };
    const handleRegisterClick = () => {
        setShowRegister(true);
    };
    const handlePasswordResetClick = () => {
        setShowPasswordReset(true);
    };
    return (_jsxs("div", { className: "modal-overlay-login", children: [_jsxs("div", { className: "modal-content-login", children: [_jsx("div", { className: "left-panel", children: _jsx("img", { src: alumnos_honores, alt: "Left Panel Image", className: "left-panel-img" }) }), _jsxs("div", { className: "right-panel", children: [_jsx("h2", { children: "Iniciar Sesi\u00F3n" }), emailSubmitted ?
                                _jsx("form", { onSubmit: handlePasswordSubmit, children: _jsxs("div", { className: "input-container", children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { type: "password", id: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), className: passwordError ? 'error' : password && 'success', required: true }), passwordError && _jsx("p", { className: "error-text", children: passwordError }), _jsxs("div", { className: 'buttons', children: [_jsx("button", { type: "button", className: "back-button", onClick: handleBackClick, children: "Atr\u00E1s" }), _jsx("button", { type: "submit", className: "login-button", children: "Acceder" })] }), _jsx("a", { href: '#', className: 'crearcuenta', onClick: handlePasswordResetClick, children: "Olvidaste tu password?" })] }) })
                                :
                                    _jsx("form", { onSubmit: handleEmailSubmit, children: _jsxs("div", { className: "input-container", children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { type: "email", id: "email", placeholder: "example@email.com", value: email, onChange: (e) => setEmail(e.target.value), className: emailError ? 'error' : email && 'success', required: true }), emailError && _jsx("p", { className: "error-text", children: emailError }), _jsx("button", { type: "submit", className: "login-button", children: "Siguiente" })] }) }), _jsx("a", { href: '#', className: 'crearcuenta', onClick: handleRegisterClick, children: "Crear Cuenta" }), _jsx("button", { onClick: onClose, className: "close-button-login", children: "Cerrar" })] })] }), showRegister && _jsx(Register, { onClose: () => setShowRegister(false) }), " ", showPasswordReset && _jsx(PasswordReset, { onClose: () => setShowPasswordReset(false) }), " "] }));
};
export default Login;
