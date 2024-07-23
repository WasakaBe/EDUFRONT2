import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useContext } from 'react';
import './SolicitarCredencialAlumno.css';
import { apiUrl } from '../../../constants/Api';
import { AuthContext } from '../../../Auto/Auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function SolicitarCredencialAlumno() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }
    const { user } = authContext;
    const [formData, setFormData] = useState({
        idalumno: '',
        idmotivo: '',
        fecha_motivo_credencial: ''
    });
    const [motivos, setMotivos] = useState([]);
    const [, setAlumno] = useState(null);
    useEffect(() => {
        if (user) {
            const fetchAlumno = async () => {
                try {
                    const response = await fetch(`${apiUrl}alumno/usuario/${user.id_usuario}`);
                    const result = await response.json();
                    setAlumno(result);
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        idalumno: result.id_alumnos.toString()
                    }));
                }
                catch (error) {
                    toast.error('Error al obtener la información del alumno');
                }
            };
            fetchAlumno();
        }
    }, [user]);
    useEffect(() => {
        const fetchMotivos = async () => {
            try {
                const response = await fetch(`${apiUrl}motivos_credencial`);
                const result = await response.json();
                setMotivos(result.motivos_credencial);
            }
            catch (error) {
                toast.error('Error al obtener los motivos de credencial');
            }
        };
        fetchMotivos();
    }, []);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}mensaje_motivo_credencial/insert`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                toast.success('Mensaje enviado correctamente');
            }
            else {
                const error = await response.json();
                toast.error(error.error);
            }
        }
        catch (error) {
            toast.error('Error al conectar con el servidor');
        }
    };
    return (_jsxs("div", { className: "solicitar-form-container", children: [_jsx("h1", { className: "solicitar-title", children: "Solicitar Credencial de Alumno" }), _jsxs("form", { className: "solicitar-form", onSubmit: handleSubmit, children: [_jsx("input", { type: "hidden", name: "idalumno", value: formData.idalumno }), _jsxs("div", { className: "solicitar-form-group", children: [_jsx("label", { className: "solicitar-label", children: "Motivo de la solicitud" }), _jsxs("select", { className: "solicitar-select", name: "idmotivo", value: formData.idmotivo, onChange: handleChange, required: true, children: [_jsx("option", { value: "", children: "Seleccione un motivo" }), motivos.map((motivo) => (_jsx("option", { value: motivo.id_motivo_credencial, children: motivo.nombre_motivo_credencial }, motivo.id_motivo_credencial)))] })] }), _jsxs("div", { className: "solicitar-form-group", children: [_jsx("label", { className: "solicitar-label", children: "Fecha" }), _jsx("input", { className: "solicitar-input", type: "date", name: "fecha_motivo_credencial", value: formData.fecha_motivo_credencial, onChange: handleChange, required: true })] }), _jsx("button", { className: "solicitar-button", type: "submit", children: "Enviar" })] }), _jsx(ToastContainer, {})] }));
}
