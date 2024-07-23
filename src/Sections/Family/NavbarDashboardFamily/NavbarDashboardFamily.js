import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logo_cbta } from '../../../assets/logos';
import { AuthContext } from '../../../Auto/Auth';
import './NavbarDashboardFamily.css';
import { close_icon, config_icon, help_icon, info_icon, panel_icon, user_profile_icon, } from '../../../assets/icons';
const NavbarDashboardFamily = ({ onButtonClick, }) => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('useContext(AuthContext) must be used within an AuthContextProvider');
    }
    const { isAuthenticated, logout } = authContext;
    if (!isAuthenticated) {
        return _jsx("div", { children: "No has iniciado sesi\u00F3n" });
    }
    const cerrarSesion = () => {
        logout();
        navigate('/');
    };
    return (_jsx("div", { className: "navbar-dashboard", children: _jsxs("div", { className: "sidebar", children: [_jsxs("div", { className: "sidebar-header", children: [_jsx("img", { src: logo_cbta, alt: "CRM Logo", className: "logo" }), _jsx("h3", { children: "EDU CONTROL" })] }), _jsxs("ul", { className: "menu", children: [_jsx("li", { className: "menu-item", onClick: () => onButtonClick('dashboardfamiliar'), children: _jsxs("div", { className: "align", children: [_jsx("img", { src: panel_icon, alt: "icono de dashboard" }), _jsx("span", { children: "Dashboard" })] }) }), _jsx("li", { className: "menu-item", onClick: () => onButtonClick('perfilfamiliar'), children: _jsxs("div", { className: "align", children: [_jsx("img", { src: user_profile_icon, alt: "icono de perfil" }), _jsx("span", { children: "Perfil" })] }) }), _jsxs("li", { className: "menu-item dropdown", children: [_jsxs("div", { className: "align", children: [_jsx("img", { src: info_icon, alt: "icono de informaci\u00F3n " }), _jsx("span", { className: "dropdown-toggle", children: "Informacion " })] }), _jsx("ul", { className: "dropdown-menu2", children: _jsx("li", { className: "dropdown-item2", onClick: () => onButtonClick('infoalumnofamiliar'), children: _jsx("a", { href: "#", children: "Alumnos" }) }) })] }), _jsx("li", { className: "menu-item", children: _jsxs("div", { className: "align", children: [_jsx("img", { src: config_icon, alt: "icono de configuraci\u00F3n" }), _jsx("span", { children: "Configuracion" })] }) }), _jsx("li", { className: "menu-item", children: _jsxs("div", { className: "align", children: [_jsx("img", { src: help_icon, alt: "icono de ayuda" }), _jsx("span", { children: "Ayuda" })] }) }), _jsx("li", { className: "menu-item", onClick: cerrarSesion, children: _jsxs("div", { className: "align", children: [_jsx("img", { src: close_icon, alt: "icono de cerrar sesi\u00F3n" }), _jsx("span", { children: "Cerrar Sesion" })] }) })] })] }) }));
};
export default NavbarDashboardFamily;
