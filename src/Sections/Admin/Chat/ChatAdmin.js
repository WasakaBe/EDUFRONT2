import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { apiUrl } from '../../../constants/Api';
import './ChatAdmin.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ChatAdmin() {
    const [mensajes, setMensajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [messagesPerPage] = useState(5);
    useEffect(() => {
        const fetchData = async (url, mapFunction) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error fetching data from ${url}`);
                }
                const data = await response.json();
                const mappedData = mapFunction(data);
                setMensajes((prevMensajes) => [...prevMensajes, ...mappedData]);
            }
            catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                    toast.error(error.message);
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchData(`${apiUrl}mensaje_contacto`, (data) => data.map((mensaje) => ({
            id: mensaje.id_mensaje_contacto,
            nombre: mensaje.nombre_mensaje_contacto,
            correo: mensaje.correo_mensaje_contacto,
            motivo: mensaje.motivo_mensaje_contacto,
            fecha: mensaje.fecha_mensaje,
            tipo: 'contacto',
        })));
        fetchData(`${apiUrl}mensaje_motivo_credencial`, (data) => data.map((mensaje) => ({
            id: mensaje.id_mensajes_motivo_credencial,
            nombre: mensaje.nombre_alumnos,
            app: mensaje.app_alumnos,
            apm: mensaje.apm_alumnos,
            correo: mensaje.correo_usuario,
            motivo: mensaje.nombre_motivo_credencial,
            fecha: mensaje.fecha_motivo_credencial,
            tipo: 'motivo credencial',
        })));
    }, []);
    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = mensajes.slice(indexOfFirstMessage, indexOfLastMessage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (_jsxs("div", { className: "chat-admin-container", children: [_jsx("h2", { children: "Mensajes" }), loading ? (_jsx("p", { className: "loading", children: "Cargando..." })) : error ? (_jsxs("p", { className: "error", children: ["Error: ", error] })) : (_jsxs(_Fragment, { children: [_jsxs("table", { className: "mensajes-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Nombre" }), _jsx("th", { children: "Correo" }), _jsx("th", { children: "Motivo" }), _jsx("th", { children: "Fecha" }), _jsx("th", { children: "Tipo" })] }) }), _jsx("tbody", { children: currentMessages.map((mensaje) => (_jsxs("tr", { children: [_jsxs("td", { children: [mensaje.nombre, " ", mensaje.app, " ", mensaje.apm] }), _jsx("td", { children: mensaje.correo }), _jsx("td", { children: mensaje.motivo }), _jsx("td", { children: new Date(mensaje.fecha).toLocaleDateString() }), _jsx("td", { children: mensaje.tipo })] }, `${mensaje.tipo}-${mensaje.id}`))) })] }), _jsx("div", { className: "pagination", children: Array.from({ length: Math.ceil(mensajes.length / messagesPerPage) }, (_, index) => (_jsx("button", { onClick: () => paginate(index + 1), className: index + 1 === currentPage ? 'active' : '', children: index + 1 }, index + 1))) })] })), _jsx(ToastContainer, {})] }));
}
