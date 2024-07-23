import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Auto/Auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FamiliarDashboard, InfoAlumnoFamiliar, NavbarDashboardFamily, PerfilFamiliar } from '../../Sections/Family';
const Family = () => {
    const [currentPanel, setCurrentPanel] = useState('dashboardfamiliar');
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
        if (!isAuthenticated || user?.idRol !== 4) {
            navigate('/');
            toast.error('No tienes permisos de Familiar.');
        }
    }, [isAuthenticated, user, navigate]);
    return (_jsxs("div", { className: "admin-container-pages", children: [_jsx(NavbarDashboardFamily, { onButtonClick: handleButtonClick }), currentPanel === 'dashboardfamiliar' && _jsx(FamiliarDashboard, {}), currentPanel === 'perfilfamiliar' && _jsx(PerfilFamiliar, {}), currentPanel === 'infoalumnofamiliar' && _jsx(InfoAlumnoFamiliar, {})] }));
};
export default Family;
