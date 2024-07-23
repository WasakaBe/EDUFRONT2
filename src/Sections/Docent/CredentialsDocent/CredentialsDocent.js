import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Auto/Auth';
import { apiUrl } from '../../../constants/Api';
import './CredentialsDocent.css';
import { logo_cbta, logoeducacion } from '../../../assets/logos';
const CredentialsDocent = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const [docente, setDocente] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchDocente = async () => {
            if (user) {
                try {
                    const response = await fetch(`${apiUrl}docente/usuario/${user.id_usuario}`);
                    const data = await response.json();
                    if (response.ok) {
                        setDocente(data);
                    }
                    else {
                        setError(data.error);
                    }
                }
                catch (error) {
                    setError('Error al obtener la información del docente');
                }
            }
        };
        fetchDocente();
    }, [user]);
    return (_jsx("div", { className: "credential-container", children: docente ? (_jsxs("div", { className: "credential-card", children: [_jsxs("div", { className: "header", children: [_jsx("img", { src: logoeducacion, alt: "Logo SEP", className: "sep-logo" }), _jsx("img", { src: logo_cbta, alt: "Logo CBTA 5", className: "cbta-logo" })] }), _jsxs("div", { className: "body-credencial", children: [_jsxs("div", { className: "photo-section", children: [_jsx("img", { src: docente.foto_docentes
                                        ? `data:image/jpeg;base64,${docente.foto_docentes}`
                                        : 'default-photo.png', alt: "Foto del Docente", className: "student-photo" }), _jsxs("h2", { className: "student-name", children: [docente.nombre_docentes, " ", docente.app_docentes, " ", docente.apm_docentes] })] }), _jsxs("div", { className: "info-section", children: [_jsxs("p", { children: [_jsx("strong", { children: "N\u00FAmero de Control:" }), " ", docente.noconttrol_docentes] }), _jsxs("p", { children: [_jsx("strong", { children: "Tel\u00E9fono:" }), " ", docente.telefono_docentes] }), _jsxs("p", { children: [_jsx("strong", { children: "Seguro Social:" }), " ", docente.seguro_social_docentes] }), _jsxs("p", { children: [_jsx("strong", { children: "Cl\u00EDnica:" }), " ", docente.clinica] })] })] })] })) : error ? (_jsx("p", { className: "error-message", children: error })) : (_jsx("p", { className: "loading-message", children: "Cargando informaci\u00F3n del docente..." })) }));
};
export default CredentialsDocent;
