import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import './SchedulesCreate.css';
import { apiUrl } from '../../../../constants/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SchedulesCreate = () => {
    const [asignaturas, setAsignaturas] = useState([]);
    const [docentes, setDocentes] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [asignatura, setAsignatura] = useState('');
    const [docente, setDocente] = useState('');
    const [grado, setGrado] = useState('');
    const [grupo, setGrupo] = useState('');
    const [carrera, setCarrera] = useState('');
    const [ciclo, setCiclo] = useState('');
    const [scheduleDays, setScheduleDays] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [asignaturaRes, docenteRes, gradoRes, grupoRes, carreraRes] = await Promise.all([
                    fetch(`${apiUrl}asignatura`),
                    fetch(`${apiUrl}docente`),
                    fetch(`${apiUrl}grado`),
                    fetch(`${apiUrl}grupo`),
                    fetch(`${apiUrl}carreras/tecnicas`)
                ]);
                if (!asignaturaRes.ok || !docenteRes.ok || !gradoRes.ok || !grupoRes.ok || !carreraRes.ok) {
                    throw new Error('Error fetching data');
                }
                const [asignaturaData, docenteData, gradoData, grupoData, carreraData] = await Promise.all([
                    asignaturaRes.json(),
                    docenteRes.json(),
                    gradoRes.json(),
                    grupoRes.json(),
                    carreraRes.json()
                ]);
                setAsignaturas(asignaturaData.asignaturas || []);
                setDocentes(docenteData || []);
                setGrados(gradoData || []);
                setGrupos(grupoData || []);
                setCarreras(carreraData.carreras || []);
            }
            catch (error) {
                if (error instanceof Error) {
                    toast.error(`Error fetching data: ${error.message}`);
                }
                else {
                    toast.error('Unknown error occurred while fetching data.');
                }
            }
        };
        fetchData();
    }, []);
    const handleScheduleDayChange = (index, field, value) => {
        const convertTimeToDecimal = (time) => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours + minutes / 60;
        };
        const startLimit = convertTimeToDecimal('07:00');
        const endLimit = convertTimeToDecimal('16:00');
        if (field === 'startTime' || field === 'endTime') {
            const timeDecimal = convertTimeToDecimal(value);
            if (timeDecimal < startLimit || timeDecimal > endLimit) {
                toast.error('La hora debe estar entre las 7:00 AM y las 4:00 PM.');
                return;
            }
        }
        const newScheduleDays = [...scheduleDays];
        newScheduleDays[index][field] = value;
        setScheduleDays(newScheduleDays);
    };
    const handleAddScheduleDay = () => {
        const newScheduleDay = { day: '', startTime: '', endTime: '' };
        setScheduleDays([...scheduleDays, newScheduleDay]);
    };
    const handleRemoveScheduleDay = (index) => {
        const newScheduleDays = [...scheduleDays];
        newScheduleDays.splice(index, 1);
        setScheduleDays(newScheduleDays);
    };
    const handleInsertHorario = async (event) => {
        event.preventDefault();
        if (scheduleDays.length === 0) {
            toast.warning('Te falto agregar los días y horas de clases.');
            return;
        }
        try {
            const existingSchedulesResponse = await fetch(`${apiUrl}horarios_escolares`);
            if (!existingSchedulesResponse.ok) {
                throw new Error('Failed to fetch existing schedules');
            }
            const existingSchedules = await existingSchedulesResponse.json();
            const conflict = scheduleDays.some(newDay => {
                return existingSchedules.some(existingSchedule => {
                    if (existingSchedule.id_grado === parseInt(grado) &&
                        existingSchedule.id_grupo === parseInt(grupo) &&
                        existingSchedule.id_carrera_tecnica === parseInt(carrera) &&
                        existingSchedule.ciclo_escolar === ciclo &&
                        existingSchedule.dias_horarios.some(existingDay => existingDay.day === newDay.day &&
                            existingDay.startTime === newDay.startTime &&
                            existingDay.endTime === newDay.endTime)) {
                        return true;
                    }
                    return false;
                });
            });
            if (conflict) {
                toast.error('Error al crear el horario: Conflicto de horario: otro horario ocupa este slot.');
                return;
            }
            const datosRegistro = {
                id_asignatura: parseInt(asignatura),
                id_docente: parseInt(docente),
                id_grado: parseInt(grado),
                id_grupo: parseInt(grupo),
                id_carrera_tecnica: parseInt(carrera),
                ciclo_escolar: ciclo,
                dias_horarios: scheduleDays.map(day => ({
                    day: day.day,
                    startTime: day.startTime,
                    endTime: day.endTime
                }))
            };
            const response = await fetch(`${apiUrl}horarios_escolares/insert`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosRegistro)
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(`Error al crear el horario: ${data.error || 'Conflicto o error del servidor'}`);
                return;
            }
            toast.success('Nuevo horario creado exitosamente!');
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(`Error de conexión: ${error.message}`);
            }
            else {
                toast.error('Error de conexión desconocido.');
            }
        }
    };
    return (_jsxs("div", { className: "schedule-create-container", children: [_jsx("h2", { children: "Crear Horario Escolar" }), _jsxs("form", { onSubmit: handleInsertHorario, className: "schedule-form", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Asignatura" }), _jsxs("select", { value: asignatura, onChange: (e) => setAsignatura(e.target.value), children: [_jsx("option", { value: "", children: "Seleccione Asignatura" }), asignaturas.map(asignatura => (_jsx("option", { value: asignatura.id_asignatura, children: asignatura.nombre_asignatura }, asignatura.id_asignatura)))] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Docente" }), _jsxs("select", { value: docente, onChange: (e) => setDocente(e.target.value), children: [_jsx("option", { value: "", children: "Seleccione Docente" }), docentes.map(docente => (_jsxs("option", { value: docente.id_docentes, children: [docente.nombre_docentes, " ", docente.app_docentes, " ", docente.apm_docentes] }, docente.id_docentes)))] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Grado" }), _jsxs("select", { value: grado, onChange: (e) => setGrado(e.target.value), children: [_jsx("option", { value: "", children: "Seleccione Grado" }), grados.map(grado => (_jsx("option", { value: grado.id_grado, children: grado.nombre_grado }, grado.id_grado)))] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Grupo" }), _jsxs("select", { value: grupo, onChange: (e) => setGrupo(e.target.value), children: [_jsx("option", { value: "", children: "Seleccione Grupo" }), grupos.map(grupo => (_jsx("option", { value: grupo.id_grupos, children: grupo.nombre_grupos }, grupo.id_grupos)))] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Carrera T\u00E9cnica" }), _jsxs("select", { value: carrera, onChange: (e) => setCarrera(e.target.value), children: [_jsx("option", { value: "", children: "Seleccione Carrera T\u00E9cnica" }), carreras.map(carrera => (_jsx("option", { value: carrera.id_carrera_tecnica, children: carrera.nombre_carrera_tecnica }, carrera.id_carrera_tecnica)))] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Ciclo Escolar" }), _jsx("input", { placeholder: "Ciclo Escolar", value: ciclo, onChange: (e) => setCiclo(e.target.value), name: "cicloEscolar", required: true })] }), scheduleDays.map((schedule, index) => (_jsxs("div", { className: "schedule-day", children: [_jsxs("select", { value: schedule.day, onChange: (e) => handleScheduleDayChange(index, 'day', e.target.value), children: [_jsx("option", { value: "", children: "Seleccione el d\u00EDa" }), _jsx("option", { value: "Lunes", children: "Lunes" }), _jsx("option", { value: "Martes", children: "Martes" }), _jsx("option", { value: "Mi\u00E9rcoles", children: "Mi\u00E9rcoles" }), _jsx("option", { value: "Jueves", children: "Jueves" }), _jsx("option", { value: "Viernes", children: "Viernes" })] }), _jsx("input", { type: "time", value: schedule.startTime, onChange: (e) => handleScheduleDayChange(index, 'startTime', e.target.value) }), _jsx("input", { type: "time", value: schedule.endTime, onChange: (e) => handleScheduleDayChange(index, 'endTime', e.target.value) }), _jsx("button", { type: "button", onClick: () => handleRemoveScheduleDay(index), children: "Eliminar" })] }, index))), _jsx("button", { type: "button", className: "add-button", onClick: handleAddScheduleDay, children: "Agregar D\u00EDa y Horario" }), _jsx("button", { type: "submit", className: "submit-button", children: "Crear Horario" })] }), _jsx(ToastContainer, {})] }));
};
export default SchedulesCreate;
