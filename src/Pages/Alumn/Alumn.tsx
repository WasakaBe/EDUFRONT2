import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Auto/Auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { HorarioEscolarAlumnoPropio } from '../../Sections/Alumn';
import { AlumnDashboard, CredentialsAlumn, Escolar, NavbarDashboardAlumn, ProfileAlumnDashboard, SolicitarCredencialAlumno } from '../../Sections/Alumn';

const Alumn: React.FC = () => {
  const [currentPanel, setCurrentPanel] = useState<string>('dashboardalumn');
  const { isAuthenticated, user } = useContext(AuthContext) || { isAuthenticated: false, user: null };
  const navigate = useNavigate();

  const handleButtonClick = (panel: string) => {
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

  return (
    <div className="admin-container-pages">
      <NavbarDashboardAlumn onButtonClick={handleButtonClick} />
      {currentPanel === 'dashboardalumn' && <AlumnDashboard />}
      {currentPanel === 'profiledashboardalumn' && <ProfileAlumnDashboard />}
      {currentPanel === 'escolar' && <Escolar />}
      {currentPanel === 'credencialalumno' && <CredentialsAlumn />}
      {currentPanel === 'solicitarcredencialalumno' && <SolicitarCredencialAlumno />}
      {currentPanel === 'HorarioEscolarAlumnoPropio' && user && (
        <HorarioEscolarAlumnoPropio id_usuario={user.id_usuario} onClose={handleClose} />
      )}
    </div>
  );
};

export default Alumn;
