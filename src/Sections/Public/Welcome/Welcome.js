import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { apiUrl } from "../../../constants/Api";
import './Welcome.css';
const Welcome = () => {
    const [welcomes, setWelcomes] = useState([]);
    const [mision, setMision] = useState(null);
    const [vision, setVision] = useState(null);
    const [showMisionModal, setShowMisionModal] = useState(false);
    const [showVisionModal, setShowVisionModal] = useState(false);
    useEffect(() => {
        fetchWelcomeData();
    }, []);
    const fetchWelcomeData = async () => {
        try {
            const response = await fetch(`${apiUrl}welcome`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setWelcomes(data);
        }
        catch (error) {
            console.error('Error fetching welcome data:', error);
        }
    };
    const fetchMisionData = async () => {
        try {
            const response = await fetch(`${apiUrl}mision`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMision(data[0]);
        }
        catch (error) {
            console.error('Error fetching mision data:', error);
        }
    };
    const fetchVisionData = async () => {
        try {
            const response = await fetch(`${apiUrl}vision`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setVision(data[0]);
        }
        catch (error) {
            console.error('Error fetching vision data:', error);
        }
    };
    const handleMisionClick = () => {
        fetchMisionData();
        setShowMisionModal(true);
    };
    const handleVisionClick = () => {
        fetchVisionData();
        setShowVisionModal(true);
    };
    return (_jsxs("div", { className: "welcome-container", children: [welcomes.length > 0 ? (welcomes.map((welcome) => (_jsxs("div", { className: "welcome-item", children: [_jsx("div", { className: "welcome-image", children: welcome.foto_welcome ? (_jsx("img", { src: `data:image/jpeg;base64,${welcome.foto_welcome}`, alt: "Welcome" })) : (_jsx("span", { children: "No image available" })) }), _jsxs("div", { className: "welcome-text", children: [_jsx("h1", { children: "Bienvenidos!" }), _jsx("p", { children: welcome.welcome_text }), _jsxs("div", { className: 'buttons', children: [_jsx("button", { className: 'btn-view', onClick: handleMisionClick, children: "Misi\u00F3n" }), _jsx("button", { className: 'btn-view', onClick: handleVisionClick, children: "Visi\u00F3n" })] })] })] }, welcome.id_welcome)))) : (_jsx("p", { children: "Loading..." })), showMisionModal && mision && (_jsx("div", { className: "modal-mision", children: _jsxs("div", { className: "modal-content-mision", children: [_jsx("span", { className: "close-button", onClick: () => setShowMisionModal(false), children: "\u00D7" }), _jsx("h2", { children: "Misi\u00F3n" }), _jsx("p", { children: mision.mision_text })] }) })), showVisionModal && vision && (_jsx("div", { className: "modal-mision", children: _jsxs("div", { className: "modal-content-mision", children: [_jsx("span", { className: "close-button", onClick: () => setShowVisionModal(false), children: "\u00D7" }), _jsx("h2", { children: "Visi\u00F3n" }), _jsx("p", { children: vision.vision_text })] }) }))] }));
};
export default Welcome;
