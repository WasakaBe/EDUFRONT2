import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { logo_cbta } from '../../../assets/logos';
import { useContext } from 'react';
import { AuthContext } from '../../../Auto/Auth';
import { useNavigate } from 'react-router-dom';
import { close_icon, config_icon, credential_icon, help_icon, horario_icon, mensaje_icon, panel_icon, user_profile_icon, } from '../../../assets/icons';
const NavbarDashboardAlumn = ({ onButtonClick, }) => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    if (!authContext) {
        return _jsx("div", { children: "No has iniciado sesi\u00F3n" });
    }
    const { isAuthenticated, logout } = authContext;
    if (!isAuthenticated) {
        return _jsx("div", { children: "No has iniciado sesi\u00F3n" });
    }
    const cerrarSesion = () => {
        logout();
        navigate('/');
    };
    return (_jsx("div", { className: "navbar-dashboard", children: _jsxs("div", { className: "sidebar", children: [_jsxs("div", { className: "sidebar-header", children: [_jsx("img", { src: logo_cbta, alt: "CRM Logo", className: "logo" }), _jsx("h3", { children: "EDU CONTROL" })] }), _jsxs("ul", { className: "menu", children: [_jsx("li", { className: "menu-item", onClick: () => onButtonClick('dashboardalumn'), children: _jsxs("div", { className: "align", children: [_jsx("img", { src: panel_icon, alt: "icono de dashboard" }), _jsx("span", { children: "Dashboard" })] }) }), _jsxs("li", { className: "menu-item dropdown", children: [_jsxs("div", { className: "align", children: [_jsx("img", { src: user_profile_icon, alt: "icono de perfil" }), _jsx("span", { className: "dropdown-toggle", children: "Informacion" })] }), _jsxs("ul", { className: "dropdown-menu2", children: [_jsx("li", { className: "menu", children: _jsx("span", { className: "menu-item", onClick: () => onButtonClick('profiledashboardalumn'), children: "Perfil" }) }), _jsx("li", { className: "dropdown-item2", onClick: () => onButtonClick('escolar'), children: _jsx("a", { href: "#", children: "Escolar" }) })] })] }), _jsxs("li", { className: "menu-item dropdown", children: [_jsxs("div", { className: "align", children: [_jsx("img", { src: credential_icon, alt: "icono de credenciales escolares" }), _jsx("span", { className: "dropdown-toggle", children: "Credencial" })] }), _jsxs("ul", { className: "dropdown-menu2", children: [_jsx("li", { className: "dropdown-item2", onClick: () => onButtonClick('credencialalumno'), children: _jsx("a", { href: "#", children: "Virtual" }) }), _jsx("li", { className: "dropdown-item2", onClick: () => onButtonClick('solicitarcredencialalumno'), children: _jsx("a", { href: "#", children: "Solicitar" }) })] })] }), _jsx("li", { className: "menu-item", onClick: () => onButtonClick('HorarioEscolarAlumnoPropio'), children: _jsxs("div", { className: "align", children: [_jsx("img", { src: horario_icon, alt: "icono de horarios escolares" }), _jsx("span", { children: "Horario Escolares" })] }) }), _jsx("li", { className: "menu-item", children: _jsxs("div", { className: "align", children: [_jsx("img", { src: mensaje_icon, alt: "icono de mensajes" }), _jsx("span", { children: "Notificacion" })] }) }), _jsx("li", { className: "menu-item", children: _jsxs("div", { className: "align", children: [_jsx("img", { src: config_icon, alt: "icono de configuraci\u00F3n" }), _jsx("span", { children: "Configuracion" })] }) }), _jsx("li", { className: "menu-item", children: _jsxs("div", { className: "align", children: [_jsx("img", { src: help_icon, alt: "icono de ayuda" }), _jsx("span", { children: "Ayuda" })] }) }), _jsx("li", { className: "menu-item", onClick: cerrarSesion, children: _jsxs("div", { className: "align", children: [_jsx("img", { src: close_icon, alt: "icono de cerrar sesi\u00F3n" }), _jsx("span", { children: "Cerrar Sesion" })] }) })] })] }) }));
};
export default NavbarDashboardAlumn;
