import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { apiUrl } from '../../../constants/Api';
import './HorarioEscolarAlumnoPropio.css';
const HorarioEscolarAlumnoPropio = ({ id_usuario, onClose }) => {
    const [horario, setHorario] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchHorario = async () => {
            try {
                const response = await fetch(`${apiUrl}horarios_escolares/alumno/${id_usuario}`);
                const data = await response.json();
                if (response.ok) {
                    setHorario(data);
                }
                else {
                    setError(data.error);
                }
            }
            catch (error) {
                setError('Error al obtener el horario del alumno');
            }
            finally {
                setLoading(false);
            }
        };
        fetchHorario();
    }, [id_usuario]);
    if (loading) {
        return _jsx("p", { className: "loading-message", children: "Cargando horario del alumno..." });
    }
    if (error) {
        return _jsx("p", { className: "error-message", children: error });
    }
    return (_jsxs("div", { className: "horario-alumno-container", children: [_jsx("button", { className: "close-button", onClick: onClose, children: "Salir" }), _jsx("h2", { children: "Horario Escolar del Alumno" }), horario.length > 0 ? (_jsxs("table", { className: "horario-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Asignatura" }), _jsx("th", { children: "Docente" }), _jsx("th", { children: "Grado" }), _jsx("th", { children: "Grupo" }), _jsx("th", { children: "Carrera T\u00E9cnica" }), _jsx("th", { children: "Ciclo Escolar" }), _jsx("th", { children: "D\u00EDas y Horarios" })] }) }), _jsx("tbody", { children: horario.map(hor => (_jsxs("tr", { children: [_jsx("td", { children: hor.nombre_asignatura }), _jsx("td", { children: hor.nombre_docente }), _jsx("td", { children: hor.nombre_grado }), _jsx("td", { children: hor.nombre_grupo }), _jsx("td", { children: hor.nombre_carrera_tecnica }), _jsx("td", { children: hor.ciclo_escolar }), _jsx("td", { children: hor.dias_horarios.map((dia, index) => (_jsxs("div", { children: [dia.day, ": ", dia.startTime, " - ", dia.endTime] }, index))) })] }, hor.id_horario))) })] })) : (_jsx("p", { children: "No hay horario disponible para este alumno" }))] }));
};
export default HorarioEscolarAlumnoPropio;
