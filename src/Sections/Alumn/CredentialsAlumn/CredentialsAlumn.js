import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Auto/Auth';
import { apiUrl } from '../../../constants/Api';
import './CredentialsAlumn.css';
import { logo_cbta, logoeducacion } from '../../../assets/logos';
const CredentialsAlumn = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const [alumno, setAlumno] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
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
        fetchAlumno();
    }, [user]);
    return (_jsx("div", { className: "credential-container", children: alumno ? (_jsxs("div", { className: "credential-card", children: [_jsxs("div", { className: "header", children: [_jsx("img", { src: logoeducacion, alt: "Logo SEP", className: "sep-logo" }), _jsx("img", { src: logo_cbta, alt: "Logo CBTA 5", className: "cbta-logo" })] }), _jsxs("div", { className: "body-credencial", children: [_jsxs("div", { className: "photo-section", children: [_jsx("img", { src: alumno.foto_alumnos
                                        ? `data:image/jpeg;base64,${alumno.foto_alumnos}`
                                        : 'default-photo.png', alt: "Foto del Alumno", className: "student-photo" }), _jsxs("div", { className: 'name-logo-credential', children: [_jsxs("h2", { className: "student-name", children: [alumno.nombre_alumnos, " ", alumno.app_alumnos, " ", alumno.apm_alumnos] }), _jsx("img", { src: alumno.foto_carrera_tecnica
                                                ? `data:image/jpeg;base64,${alumno.foto_carrera_tecnica}`
                                                : 'default-logo.png', alt: "Logo de la Carrera", className: "career-logo" })] })] }), _jsxs("div", { className: "info-section", children: [_jsxs("h3", { children: ["T\u00C9CNICO EN ", alumno.carrera_tecnica.toUpperCase()] }), _jsxs("p", { children: [_jsx("strong", { children: "GRUPO:" }), " ", alumno.grupo] }), _jsxs("p", { children: [_jsx("strong", { children: "CURP:" }), " ", alumno.curp_alumnos] }), _jsxs("p", { children: [_jsx("strong", { children: "MATR\u00CDCULA:" }), " ", alumno.nocontrol_alumnos] }), _jsxs("p", { children: [_jsx("strong", { children: "SEGURO SOCIAL:" }), " ", alumno.seguro_social_alumnos] })] })] })] })) : error ? (_jsx("p", { className: "error-message", children: error })) : (_jsx("p", { className: "loading-message", children: "Cargando informaci\u00F3n del alumno..." })) }));
};
export default CredentialsAlumn;
