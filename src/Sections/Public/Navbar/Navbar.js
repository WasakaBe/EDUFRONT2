import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import './Navbar.css';
import { logo_cbta } from '../../../assets/logos';
import { Login } from '../../../forms';
import { BecasModal, ReinscriptionModal } from '../../../components';
const Navbar = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showBecas, setShowBecas] = useState(false);
    const [showReinscription, setShowReinscription] = useState(false); // Nuevo estado para Reinscripción
    const handleLoginClick = () => {
        setShowLogin(true);
    };
    const handleCloseLogin = () => {
        setShowLogin(false);
    };
    const handleBecasClick = () => {
        setShowBecas(true);
    };
    const handleCloseBecas = () => {
        setShowBecas(false);
    };
    const handleReinscriptionClick = () => {
        setShowReinscription(true);
    };
    const handleCloseReinscription = () => {
        setShowReinscription(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx("nav", { className: "navbar", children: _jsxs("div", { className: "navbar-container", children: [_jsxs("a", { href: "#", className: "navbar-logo", children: [_jsx("img", { src: logo_cbta, alt: "Logo", className: "navbar-logo-img" }), _jsx("span", { children: "EduControl" })] }), _jsx("button", { className: "navbar-toggler", children: "\u2630" }), _jsxs("ul", { className: "navbar-menu", children: [_jsx("li", { className: "navbar-item", children: _jsx("a", { href: "/", children: "Inicio" }) }), _jsx("li", { className: "navbar-item", children: _jsx("a", { href: "/#Acerca", children: "Acerca" }) }), _jsxs("li", { className: "navbar-item dropdown", children: [_jsx("a", { href: "#", className: "dropdown-toggle", children: "Servicios" }), _jsxs("ul", { className: "dropdown-menu", children: [_jsx("li", { className: "dropdown-item", children: _jsx("a", { href: "/#Inscripcion", children: "Inscripci\u00F3n" }) }), _jsx("li", { className: "dropdown-item", children: _jsx("a", { href: "#", onClick: handleReinscriptionClick, children: "Reinscripci\u00F3n" }) }), _jsxs("li", { className: "dropdown-item dropdown-submenu", children: [_jsx("a", { href: "#", children: "Escolares" }), _jsxs("ul", { className: "dropdown-menu", children: [_jsx("li", { className: "dropdown-item", children: _jsx("a", { href: "#", onClick: handleBecasClick, children: "Becas" }) }), _jsx("li", { className: "dropdown-item", children: _jsx("a", { href: "/#", children: "Titulaci\u00F3n" }) })] })] })] })] }), _jsx("li", { className: "navbar-item", children: _jsx("a", { href: "/#Contact", children: "Contacto" }) }), _jsx("li", { className: "navbar-item", children: _jsx("a", { href: "#", onClick: handleLoginClick, children: "Iniciar Sesi\u00F3n" }) })] })] }) }), showLogin && _jsx(Login, { onClose: handleCloseLogin }), showBecas && _jsx(BecasModal, { onClose: handleCloseBecas }), showReinscription && _jsx(ReinscriptionModal, { onClose: handleCloseReinscription })] }));
};
export default Navbar;
