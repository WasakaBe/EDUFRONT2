import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Auto/Auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { HorarioEscolarAlumnoPropio } from '../../Sections/Alumn';
import { AlumnDashboard, CredentialsAlumn, Escolar, NavbarDashboardAlumn, ProfileAlumnDashboard, SolicitarCredencialAlumno } from '../../Sections/Alumn';
const Alumn = () => {
    const [currentPanel, setCurrentPanel] = useState('dashboardalumn');
    const { isAuthenticated, user } = useContext(AuthContext) || { isAuthenticated: false, user: null };
    const navigate = useNavigate();
    const handleButtonClick = (panel) => {
        setCurrentPanel(panel);
    };
    const handleClose = () => {
        setCurrentPanel('dashboardalumn'); // o cualquier lógica que necesites para manejar el cierre del componente
    };
    useEffect(() => {
        // Verificar si el usuario está autenticado y tiene el rol de alumno
        if (!isAuthenticated || user?.idRol !== 2) {
            navigate('/');
            toast.error('No tienes permisos de alumno.');
        }
    }, [isAuthenticated, user, navigate]);
    return (_jsxs("div", { className: "admin-container-pages", children: [_jsx(NavbarDashboardAlumn, { onButtonClick: handleButtonClick }), currentPanel === 'dashboardalumn' && _jsx(AlumnDashboard, {}), currentPanel === 'profiledashboardalumn' && _jsx(ProfileAlumnDashboard, {}), currentPanel === 'escolar' && _jsx(Escolar, {}), currentPanel === 'credencialalumno' && _jsx(CredentialsAlumn, {}), currentPanel === 'solicitarcredencialalumno' && _jsx(SolicitarCredencialAlumno, {}), currentPanel === 'HorarioEscolarAlumnoPropio' && user && (_jsx(HorarioEscolarAlumnoPropio, { id_usuario: user.id_usuario, onClose: handleClose }))] }));
};
export default Alumn;
