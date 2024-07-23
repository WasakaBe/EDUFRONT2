import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import './WelcomeAdmin.css';
import { apiUrl } from '../../../../constants/Api';
export default function WelcomeAdmin() {
    const [welcomes, setWelcomes] = useState([]);
    const [newWelcomeText, setNewWelcomeText] = useState('');
    const [newWelcomeFile, setNewWelcomeFile] = useState(null);
    const [updateWelcomeText, setUpdateWelcomeText] = useState('');
    const [updateWelcomeFile, setUpdateWelcomeFile] = useState(null);
    const [updateId, setUpdateId] = useState(null);
    useEffect(() => {
        fetchWelcomes();
    }, []);
    const fetchWelcomes = () => {
        fetch(`${apiUrl}welcome`)
            .then(response => response.json())
            .then(data => {
            if (Array.isArray(data)) {
                setWelcomes(data);
            }
            else {
                console.error('Error fetching welcomes:', data);
            }
        })
            .catch(error => {
            console.error('Error fetching welcomes:', error);
        });
    };
    const handleAddWelcome = () => {
        if (newWelcomeText && newWelcomeFile) {
            const formData = new FormData();
            formData.append('welcome_text', newWelcomeText);
            formData.append('foto_welcome', newWelcomeFile);
            fetch(`${apiUrl}welcomes/insert`, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                if (data.message === 'Bienvenida creada exitosamente') {
                    setNewWelcomeText('');
                    setNewWelcomeFile(null);
                    fetchWelcomes();
                }
                else {
                    console.error('Error adding welcome:', data.message);
                }
            })
                .catch(error => {
                console.error('Error adding welcome:', error);
            });
        }
        else {
            console.error('Welcome text and file are required.');
        }
    };
    const handleUpdateWelcome = () => {
        if (updateId && (updateWelcomeText || updateWelcomeFile)) {
            const formData = new FormData();
            if (updateWelcomeText)
                formData.append('welcome_text', updateWelcomeText);
            if (updateWelcomeFile)
                formData.append('foto_welcome', updateWelcomeFile);
            fetch(`${apiUrl}welcome/update/${updateId}`, {
                method: 'PUT',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                if (data.message === 'Bienvenida actualizada exitosamente') {
                    setUpdateWelcomeText('');
                    setUpdateWelcomeFile(null);
                    setUpdateId(null);
                    fetchWelcomes();
                }
                else {
                    console.error('Error updating welcome:', data.message);
                }
            })
                .catch(error => {
                console.error('Error updating welcome:', error);
            });
        }
        else {
            console.error('Update ID and either text or file are required.');
        }
    };
    const handleCloseModal = () => {
        setUpdateId(null);
        setUpdateWelcomeText('');
        setUpdateWelcomeFile(null);
    };
    return (_jsxs("div", { className: "welcome-admin-container", children: [_jsx("h2", { children: "Welcome Admin" }), _jsxs("table", { className: "welcome-admin-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "Welcome Text" }), _jsx("th", { children: "Foto Welcome" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: welcomes.map(welcome => (_jsxs("tr", { children: [_jsx("td", { children: welcome.id_welcome }), _jsx("td", { children: welcome.welcome_text }), _jsx("td", { children: welcome.foto_welcome && (_jsx("img", { src: `data:image/jpeg;base64,${welcome.foto_welcome}`, alt: `Welcome ${welcome.id_welcome}`, className: "welcome-image" })) }), _jsx("td", { children: _jsx("button", { className: 'edit-button', onClick: () => setUpdateId(welcome.id_welcome), children: "Update" }) })] }, welcome.id_welcome))) })] }), _jsxs("div", { className: "add-welcome-admin-form", children: [_jsx("h3", { children: "Add New Welcome" }), _jsx("input", { type: "text", value: newWelcomeText, onChange: (e) => setNewWelcomeText(e.target.value), placeholder: "Welcome Text" }), _jsx("input", { type: "file", onChange: (e) => setNewWelcomeFile(e.target.files ? e.target.files[0] : null) }), _jsx("button", { onClick: handleAddWelcome, children: "Add Welcome" })] }), updateId && (_jsx("div", { className: "register-modal-overlay", children: _jsx("div", { className: "register-modal-content", children: _jsxs("div", { className: 'form-group', children: [_jsx("h3", { children: "Update Welcome" }), _jsx("input", { type: "text", value: updateWelcomeText, onChange: (e) => setUpdateWelcomeText(e.target.value), placeholder: "Update Text" }), _jsx("input", { type: "file", onChange: (e) => setUpdateWelcomeFile(e.target.files ? e.target.files[0] : null) }), _jsx("button", { className: 'edit-button', onClick: handleUpdateWelcome, children: "Update Welcome" }), _jsx("button", { className: 'cancel-button', onClick: handleCloseModal, children: "Salir" })] }) }) }))] }));
}
