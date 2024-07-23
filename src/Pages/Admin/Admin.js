import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Auto/Auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './admin.css';
import { ActividadNoticias, AdminDashboard, CarrerasTecnicasAdmin, Carrusel, ChatAdmin, CredentialsCreate, CredentialsView, InfoAlumn, InfoBecas, InfoDocent, InscriptionAdmin, MisionVision, NavbarDashboard, ProfileAdminDashboard, SchedulesCreate, SchedulesView, SobreNosotros, WelcomeAdmin, } from '../../Sections/Admin';
const Admin = () => {
    const [currentPanel, setCurrentPanel] = useState('dashboard');
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
        if (!isAuthenticated || user?.idRol !== 1) {
            navigate('/');
            toast.error('No tienes permisos de administrador.');
        }
    }, [isAuthenticated, user, navigate]);
    return (_jsxs("div", { className: "admin-container-pages", children: [_jsx(NavbarDashboard, { onButtonClick: handleButtonClick }), currentPanel === 'dashboard' && _jsx(AdminDashboard, {}), currentPanel === 'profiledashboardadmin' && _jsx(ProfileAdminDashboard, {}), currentPanel === 'viewcredential' && _jsx(CredentialsView, {}), currentPanel === 'createcredential' && _jsx(CredentialsCreate, {}), currentPanel === 'viewschedule' && _jsx(SchedulesView, {}), currentPanel === 'createschedule' && _jsx(SchedulesCreate, {}), currentPanel === 'infoalumn' && _jsx(InfoAlumn, {}), currentPanel === 'infodocent' && _jsx(InfoDocent, {}), currentPanel === 'carrusel' && _jsx(Carrusel, {}), currentPanel === 'welcomeadmin' && _jsx(WelcomeAdmin, {}), currentPanel === 'misionyvision' && _jsx(MisionVision, {}), currentPanel === 'actividadnoticias' && _jsx(ActividadNoticias, {}), currentPanel === 'inscriptionadmin' && _jsx(InscriptionAdmin, {}), currentPanel === 'sobrenosotrosadmin' && _jsx(SobreNosotros, {}), currentPanel === 'carrerastecnicasadmin' && _jsx(CarrerasTecnicasAdmin, {}), currentPanel === 'chatadmin' && _jsx(ChatAdmin, {}), currentPanel === 'infobecas' && _jsx(InfoBecas, {})] }));
};
export default Admin;
