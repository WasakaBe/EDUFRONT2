import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './Contact.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl } from '../../../constants/Api';
const Contact = () => {
    const MAPURL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.098299591696!2d-98.4068462247401!3d21.148485980530932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d726fcf9f14585%3A0x897e90570d60ad67!2sCBTa%20No.%205!5e0!3m2!1ses!2smx!4v1704246777334!5m2!1ses!2smx';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [nameValid, setNameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [messageValid, setMessageValid] = useState(true);
    const handleNameChange = (e) => {
        const inputValue = e.target.value;
        const isValid = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(inputValue);
        setName(inputValue);
        setNameValid(isValid);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value));
    };
    const handleMessageChange = (e) => {
        const inputValue = e.target.value;
        const isValid = inputValue.trim().split(/\s+/).length <= 450;
        setMessage(inputValue);
        setMessageValid(isValid);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nameValid && emailValid && messageValid) {
            try {
                const fechaMensajeContacto = new Date().toISOString();
                const response = await fetch(`${apiUrl}mensaje_contacto/insert`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre_mensaje_contacto: name,
                        correo_mensaje_contacto: email,
                        motivo_mensaje_contacto: message,
                        fecha_mensaje: fechaMensajeContacto,
                    }),
                });
                const data = await response.json();
                if (response.ok) {
                    toast.success('Mensaje enviado exitosamente');
                    setName('');
                    setEmail('');
                    setMessage('');
                }
                else {
                    toast.error(`Error al enviar el mensaje: ${data.error}`);
                }
            }
            catch (error) {
                toast.error('Error al enviar el mensaje');
            }
        }
        else {
            toast.error('Por favor, revise los campos ingresados');
        }
    };
    return (_jsxs("div", { className: "container-contact", id: "Contact", children: [_jsx("h1", { className: "contact-title", children: "Cont\u00E1ctanos" }), _jsxs("div", { className: "dates-contacts", children: [_jsx("iframe", { title: "Google Map", src: MAPURL, className: "contact-map" }), _jsxs("form", { className: "contact-form", onSubmit: handleSubmit, children: [_jsxs("div", { className: `input-container ${nameValid ? 'valid' : 'invalid'}`, children: [_jsx("label", { className: "contact-label", htmlFor: "name", children: "Nombre" }), _jsx("input", { className: "contact-input", id: "name", type: "text", placeholder: "Nombre", value: name, onChange: handleNameChange, required: true })] }), _jsxs("div", { className: `input-container ${emailValid ? 'valid' : 'invalid'}`, children: [_jsx("label", { className: "contact-label", htmlFor: "email", children: "Correo" }), _jsx("input", { className: "contact-input", id: "email", type: "email", placeholder: "Correo", value: email, onChange: handleEmailChange, required: true })] }), _jsxs("div", { className: `input-container ${messageValid ? 'valid' : 'invalid'}`, children: [_jsx("label", { className: "contact-label", htmlFor: "message", children: "Mensaje" }), _jsx("textarea", { className: "contact-input", id: "message", rows: 5, placeholder: "Mensaje", value: message, onChange: handleMessageChange, required: true })] }), _jsx("button", { className: "contact-btn", type: "submit", children: "Enviar" })] })] }), _jsx(ToastContainer, {})] }));
};
export default Contact;
