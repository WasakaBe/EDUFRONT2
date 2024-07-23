import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Auto/Auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CredentialsDocent, DashboardDocent, HorarioDocente, NavbarDashboardDocent, ProfileDocentDashboard, } from '../../Sections/Docent';
const Admin = () => {
    const [currentPanel, setCurrentPanel] = useState('dashboarddocente');
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('useContext(AuthContext) must be used within an AuthContextProvider');
    }
    const { isAuthenticated, user } = authContext;
    const navigate = useNavigate();
    const handleButtonClick = (panel) => {
        setCurrentPanel(panel);
    };
    useEffect(() => {
        // Verificar si el usuario está autenticado y tiene el rol de administrador
        if (!isAuthenticated || user?.idRol !== 3) {
            navigate('/');
            toast.error('No tienes permisos de Docente.');
        }
    }, [isAuthenticated, user, navigate]);
    return (_jsxs("div", { className: "admin-container-pages", children: [_jsx(NavbarDashboardDocent, { onButtonClick: handleButtonClick }), currentPanel === 'dashboarddocente' && _jsx(DashboardDocent, {}), currentPanel === 'profiledashboarddocent' && _jsx(ProfileDocentDashboard, {}), currentPanel === 'credencialdocente' && _jsx(CredentialsDocent, {}), currentPanel === 'horariodocente' && _jsx(HorarioDocente, {})] }));
};
export default Admin;
