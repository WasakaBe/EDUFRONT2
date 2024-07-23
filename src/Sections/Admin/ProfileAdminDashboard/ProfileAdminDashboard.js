import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProfileAdminDashboard.css';
import { AuthContext } from '../../../Auto/Auth';
import { apiUrl } from '../../../constants/Api'; // Importa apiUrl
const ProfileAdminDashboard = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }
    const { user, login } = authContext;
    const [isEditing, setIsEditing] = useState(false);
    const [nombre, setNombre] = useState(user?.nombre_usuario || '');
    const [app, setApp] = useState(user?.app_usuario || '');
    const [apm, setApm] = useState(user?.apm_usuario || '');
    const [email, setEmail] = useState(user?.correo_usuario || '');
    const [password, setPassword] = useState(user?.pwd_usuario || '');
    const [foto, setFoto] = useState(user?.foto_usuario ? `data:image/jpeg;base64,${user.foto_usuario}` : '');
    const handleEditClick = () => {
        setIsEditing(!isEditing);
        toast.info(isEditing ? 'Modo edición desactivado' : 'Modo edición activado');
    };
    const getInitials = (name) => {
        if (!name)
            return '';
        const namesArray = name.trim().split(' ');
        if (namesArray.length === 1) {
            return namesArray[0].charAt(0).toUpperCase();
        }
        return (namesArray[0].charAt(0).toUpperCase() +
            namesArray[1].charAt(0).toUpperCase());
    };
    const handleCancel = () => {
        setIsEditing(false);
        setNombre(user?.nombre_usuario || '');
        setApp(user?.app_usuario || '');
        setApm(user?.apm_usuario || '');
        setEmail(user?.correo_usuario || '');
        setPassword(user?.pwd_usuario || '');
        setFoto(user?.foto_usuario ? `data:image/jpeg;base64,${user.foto_usuario}` : '');
        toast.info('Modo edición desactivado');
    };
    const handleSave = async () => {
        if (user) {
            const updatedUser = {
                nombre_usuario: nombre,
                app_usuario: app,
                apm_usuario: apm,
                correo_usuario: email,
                pwd_usuario: password,
                foto_usuario: foto ? foto.split(',')[1] : '',
            };
            try {
                const response = await fetch(`${apiUrl}update-profile/${user.id_usuario}`, // Usa apiUrl aquí
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedUser),
                });
                if (response.ok) {
                    const data = await response.json();
                    login({ ...user, ...updatedUser });
                    setIsEditing(false);
                    toast.success('Perfil actualizado con éxito');
                }
                else {
                    toast.error('Error al actualizar el perfil');
                }
            }
            catch (error) {
                toast.error('Error al actualizar el perfil');
            }
        }
    };
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (_jsxs("div", { className: "container-profile-admin", children: [_jsx(ToastContainer, {}), _jsx("div", { className: "header-profile-admin", children: _jsx("h2", { children: isEditing ? 'Editar Perfil' : 'Perfil' }) }), _jsxs("div", { className: "avatar-container-profile-admin", children: [_jsx("img", { className: "avatar-profile-admin", src: foto ||
                            'https://i.pinimg.com/564x/48/84/3b/48843b6ea8fead404661af7b00397142.jpg', alt: "Perfil de administrador" }), isEditing && (_jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange }))] }), _jsx("div", { className: "profile-info-profile-admin", children: isEditing ? (_jsxs(_Fragment, { children: [_jsxs("label", { children: ["Nombre completo", _jsx("input", { type: "text", value: nombre, onChange: (e) => setNombre(e.target.value) })] }), _jsxs("label", { children: ["Apellido paterno", _jsx("input", { type: "text", value: app, onChange: (e) => setApp(e.target.value) })] }), _jsxs("label", { children: ["Apellido materno", _jsx("input", { type: "text", value: apm, onChange: (e) => setApm(e.target.value) })] }), _jsxs("label", { children: ["Correo electr\u00F3nico", _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value) })] }), _jsxs("label", { children: ["Contrase\u00F1a", _jsxs("div", { className: "password-container-profile-admin", children: [_jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("span", { className: "show-password-icon-profile-admin", children: "\uD83D\uDC41" })] })] }), _jsxs("div", { className: "align", children: [_jsx("button", { onClick: handleSave, className: "save-button", children: "GUARDAR" }), _jsx("button", { onClick: handleCancel, className: "exit-button", children: "CANCELAR" })] })] })) : (_jsx(_Fragment, { children: _jsxs("div", { className: "credentials-view-container", children: [_jsxs("h3", { children: [nombre, " ", app, " ", apm] }), _jsxs("p", { children: ["Correo electr\u00F3nico: ", email] }), _jsxs("p", { children: ["Contrase\u00F1a: ", password] })] }) })) }), !isEditing && (_jsx("button", { onClick: handleEditClick, className: "save-button-profile-admin", children: "Actualizar" }))] }));
};
export default ProfileAdminDashboard;
