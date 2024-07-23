import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { apiUrl } from '../../../../constants/Api';
import './Carrusel.css';
export default function Carrusel() {
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        fetchImages();
    }, []);
    const fetchImages = () => {
        fetch(`${apiUrl}carrusel_imgs`)
            .then(response => response.json())
            .then(data => {
            if (data.carrusel_imgs) {
                setImages(data.carrusel_imgs);
            }
        })
            .catch(error => {
            console.error('Error fetching carrusel images:', error);
        });
    };
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };
    const handleAddImage = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('carrusel', selectedFile);
            fetch(`${apiUrl}carrusel_imgs/insert`, {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message); });
                }
                return response.json();
            })
                .then(data => {
                if (data.message === 'Imagen del carrusel insertada exitosamente') {
                    setShowModal(false);
                    setSelectedFile(null);
                    fetchImages();
                }
                else {
                    console.error('Error adding image:', data.message);
                }
            })
                .catch(error => {
                console.error('Error adding image:', error.message);
            });
        }
    };
    const handleDeleteImage = (id) => {
        fetch(`${apiUrl}carrusel_imgs/delete/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
            if (data.message === 'Imagen del carrusel eliminada exitosamente') {
                fetchImages();
            }
            else {
                console.error('Error deleting image:', data.message);
            }
        })
            .catch(error => {
            console.error('Error deleting image:', error);
        });
    };
    return (_jsxs("div", { className: "carrusel-container", children: [_jsx("button", { className: "add-image-button", onClick: () => setShowModal(true), children: "Agregar Im\u00E1genes" }), images.length > 0 ? (_jsxs("table", { className: "carrusel-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "Imagen" }), _jsx("th", { children: "Acciones" })] }) }), _jsx("tbody", { children: images.map(image => (_jsxs("tr", { children: [_jsx("td", { children: image.id_carrusel }), _jsx("td", { children: _jsx("img", { src: `data:image/jpeg;base64,${image.carrusel}`, alt: `Carrusel ${image.id_carrusel}`, className: "carrusel-image" }) }), _jsx("td", { children: _jsx("button", { className: 'edit-button', onClick: () => handleDeleteImage(image.id_carrusel), children: "Eliminar" }) })] }, image.id_carrusel))) })] })) : (_jsx("p", { children: "No hay im\u00E1genes disponibles en el carrusel." })), showModal && (_jsx("div", { className: "register-modal-overlay", children: _jsxs("div", { className: "register-modal-content", children: [_jsx("span", { className: "register-close-button", onClick: () => setShowModal(false), children: "\u00D7" }), _jsxs("div", { className: 'form-group', children: [_jsx("h2", { children: "Agregar Imagen" }), _jsx("input", { className: 'register-input-container', type: "file", onChange: handleFileChange }), _jsx("button", { className: 'save-button', onClick: handleAddImage, children: "Agregar" })] })] }) }))] }));
}
