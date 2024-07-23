import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../Auto/Auth';
import { apiUrl } from '../../../../constants/Api';
import './Escolar.css';
const Escolar = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const [alumno, setAlumno] = useState(null);
    const [error, setError] = useState(null);
    const [currentSection, setCurrentSection] = useState(1);
    const fetchAlumno = async () => {
        if (user) {
            try {
                const response = await fetch(`${apiUrl}alumno/usuario/${user.id_usuario}`);
                const data = await response.json();
                if (response.ok) {
                    setAlumno(data);
                }
                else {
                    setError(data.error);
                }
            }
            catch (error) {
                setError('Error al obtener la información del alumno');
            }
        }
    };
    useEffect(() => {
        fetchAlumno();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    const nextSection = () => {
        setCurrentSection(currentSection + 1);
    };
    const prevSection = () => {
        setCurrentSection(currentSection - 1);
    };
    return (_jsx("div", { className: "escolar-container-view", children: _jsxs("div", { className: "escolar-container", children: [_jsx("h2", { children: "Informaci\u00F3n del Alumno" }), alumno ? (_jsxs(_Fragment, { children: [currentSection === 1 && (_jsxs("div", { className: "section", children: [_jsx("h3", { children: "Informaci\u00F3n del Alumno" }), _jsxs("p", { children: [_jsx("strong", { children: "Nombre:" }), " ", alumno.nombre_alumnos] }), _jsxs("p", { children: [_jsx("strong", { children: "Apellido Paterno:" }), " ", alumno.app_alumnos] }), _jsxs("p", { children: [_jsx("strong", { children: "Apellido Materno:" }), " ", alumno.apm_alumnos] }), _jsxs("p", { children: [_jsx("strong", { children: "Sexo:" }), " ", alumno.sexo] }), _jsxs("p", { children: [_jsx("strong", { children: "Fecha de Nacimiento:" }), " ", new Date(alumno.fecha_nacimiento_alumnos).toLocaleDateString()] }), _jsxs("p", { children: [_jsx("strong", { children: "CURP:" }), " ", alumno.curp_alumnos] }), _jsxs("p", { children: [_jsx("strong", { children: "N\u00FAmero de Control:" }), " ", alumno.nocontrol_alumnos] }), _jsxs("p", { children: [_jsx("strong", { children: "Tel\u00E9fono:" }), " ", alumno.telefono_alumnos] }), _jsxs("p", { children: [_jsx("strong", { children: "Seguro Social:" }), " ", alumno.seguro_social_alumnos] }), _jsxs("p", { children: [_jsx("strong", { children: "Clinica:" }), " ", alumno.clinica] }), _jsxs("p", { children: [_jsx("strong", { children: "Usuario:" }), " ", alumno.idUsuario] }), _jsx("button", { className: "btn btn-primary", onClick: nextSection, children: "Siguiente" })] })), currentSection === 2 && (_jsxs("div", { className: "section", children: [_jsx("h3", { children: "Informaci\u00F3n Escolar del Alumno" }), _jsxs("p", { children: [_jsx("strong", { children: "Carrera Tecnica:" }), " ", alumno.carrera_tecnica] }), _jsxs("p", { children: [_jsx("strong", { children: "Grado:" }), " ", alumno.grado] }), _jsxs("p", { children: [_jsx("strong", { children: "Grupo:" }), " ", alumno.grupo] }), _jsxs("p", { children: [_jsx("strong", { children: "Cuenta con Credencial Fisico:" }), " ", alumno.cuentacredencial_alumnos] }), _jsx("button", { className: "btn btn-secondary", onClick: prevSection, children: "Atr\u00E1s" }), _jsx("button", { className: "btn btn-primary", onClick: nextSection, children: "Siguiente" })] })), currentSection === 3 && (_jsxs("div", { className: "section", children: [_jsx("h3", { children: "Informaci\u00F3n de Proveniencia del Alumno" }), _jsxs("p", { children: [_jsx("strong", { children: "Pais:" }), " ", alumno.pais] }), _jsxs("p", { children: [_jsx("strong", { children: "Estado:" }), " ", alumno.estado] }), _jsxs("p", { children: [_jsx("strong", { children: "Municipio:" }), " ", alumno.municipio_alumnos] }), _jsxs("p", { children: [_jsx("strong", { children: "Comunidad:" }), " ", alumno.comunidad_alumnos] }), _jsxs("p", { children: [_jsx("strong", { children: "Calle:" }), " ", alumno.calle_alumnos] }), _jsxs("p", { children: [_jsx("strong", { children: "Procedencia Escolar:" }), " ", alumno.proc_sec_alumno] }), _jsxs("p", { children: [_jsx("strong", { children: "Traslado:" }), " ", alumno.idTraslado] }), _jsxs("p", { children: [_jsx("strong", { children: "Tipo de Traslado:" }), " ", alumno.idTrasladotransporte] }), _jsx("button", { className: "btn btn-secondary", onClick: prevSection, children: "Atr\u00E1s" })] }))] })) : (error ? _jsx("p", { className: "error-message", children: error }) : _jsx("p", { className: "loading-message", children: "Cargando informaci\u00F3n del alumno..." }))] }) }));
};
export default Escolar;
