import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { apiUrl } from '../../../../constants/Api';
import './CredentialsCreate.css';
import { logo_cbta, logoeducacion } from '../../../../assets/logos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CredentialsCreateCustom() {
    const [controlNumber, setControlNumber] = useState('');
    const [alumno, setAlumno] = useState(null);
    const [, setError] = useState(null);
    const [, setSuccess] = useState(null);
    const handleInputChange = (event) => {
        const { value } = event.target;
        if (/^\d*$/.test(value)) {
            setControlNumber(value);
        }
    };
    const handleFetchAlumno = async () => {
        try {
            const response = await fetch(`${apiUrl}alumnos/nocontrol/${controlNumber}`);
            if (!response.ok) {
                throw new Error('Alumno no encontrado');
            }
            const data = await response.json();
            setAlumno(data);
            setError(null);
            toast.success('Alumno encontrado exitosamente');
        }
        catch (error) {
            setError(error.message);
            setAlumno(null);
            toast.error('Error al buscar el alumno');
        }
    };
    const handleAddCredencial = async () => {
        if (alumno) {
            const credencialData = {
                nombre_credencial_escolar: alumno.nombre_alumnos,
                app_credencial_escolar: alumno.app_alumnos,
                apm_credencial_escolar: alumno.apm_alumnos,
                carrera_credencial_escolar: alumno.carrera_tecnica,
                grupo_credencial_escolar: alumno.grupo,
                curp_credencial_escolar: alumno.curp_alumnos,
                nocontrol_credencial_escolar: alumno.nocontrol_alumnos,
                segsocial_credencial_escolar: alumno.seguro_social_alumnos,
                foto_credencial_escolar: alumno.foto_usuario,
                idalumnocrede: alumno.id_alumnos,
            };
            try {
                const response = await fetch(`${apiUrl}credencial_escolar/insert`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credencialData),
                });
                if (!response.ok) {
                    throw new Error('Error al agregar la credencial escolar');
                }
                // Limpiar el estado y reiniciar el campo de entrada
                setSuccess('Credencial escolar agregada exitosamente');
                setAlumno(null);
                setControlNumber('');
                setError(null);
                toast.success('Credencial escolar agregada exitosamente');
            }
            catch (error) {
                setError(error.message);
                setSuccess(null);
                toast.error('Error al agregar la credencial escolar');
            }
        }
    };
    const handleCancel = () => {
        setControlNumber('');
        setAlumno(null);
        setError(null);
        setSuccess(null);
        toast.info('Operación cancelada');
    };
    return (_jsxs("div", { className: "credentials-create-custom-container", children: [_jsx(ToastContainer, {}), _jsxs("form", { className: "credentials-create-custom-form", onSubmit: (e) => {
                    e.preventDefault();
                    handleFetchAlumno();
                }, children: [_jsx("label", { htmlFor: "controlNumber", children: "Ingrese el n\u00FAmero de control:" }), _jsx("input", { type: "text", id: "controlNumber", name: "controlNumber", value: controlNumber, onChange: handleInputChange }), _jsx("button", { type: "submit", children: "Buscar" }), _jsx("br", {}), _jsx("br", {})] }), alumno && (_jsxs("div", { children: [_jsxs("div", { className: "credential-custom-card", children: [_jsxs("div", { className: "custom-header", children: [_jsx("img", { src: logoeducacion, alt: "Logo SEP", className: "custom-sep-logo" }), _jsx("img", { src: logo_cbta, alt: "Logo CBTA 5", className: "custom-cbta-logo" })] }), _jsxs("div", { className: "custom-body-credencial", children: [_jsxs("div", { className: "custom-photo-section", children: [_jsx("img", { src: alumno.foto_usuario
                                                    ? `data:image/jpeg;base64,${alumno.foto_usuario}`
                                                    : 'default-photo.png', alt: "Foto del Alumno", className: "custom-student-photo" }), _jsxs("div", { className: "custom-name-logo-credential", children: [_jsxs("h2", { className: "custom-student-name", children: [alumno.nombre_alumnos, " ", alumno.app_alumnos, ' ', alumno.apm_alumnos] }), _jsx("img", { src: alumno.foto_carrera_tecnica
                                                            ? `data:image/jpeg;base64,${alumno.foto_carrera_tecnica}`
                                                            : 'default-logo.png', alt: "Logo de la Carrera", className: "custom-career-logo" })] })] }), _jsxs("div", { className: "custom-info-section", children: [_jsxs("h3", { children: ["T\u00C9CNICO EN ", alumno.carrera_tecnica.toUpperCase()] }), _jsxs("p", { children: [_jsx("strong", { children: "GRUPO:" }), " ", alumno.grupo] }), _jsxs("p", { children: [_jsx("strong", { children: "CURP:" }), " ", alumno.curp_alumnos] }), _jsxs("p", { children: [_jsx("strong", { children: "MATR\u00CDCULA:" }), " ", alumno.nocontrol_alumnos] }), _jsxs("p", { children: [_jsx("strong", { children: "SEGURO SOCIAL:" }), " ", alumno.seguro_social_alumnos] })] })] })] }), _jsx("br", {}), _jsxs("div", { className: "align", children: [_jsx("button", { className: "exit-button", type: "button", onClick: handleCancel, children: "Cancelar" }), _jsx("button", { className: "save-button", type: "button", onClick: handleAddCredencial, children: "Agregar" })] })] }))] }));
}
