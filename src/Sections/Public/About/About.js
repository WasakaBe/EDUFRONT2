import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { apiUrl } from '../../../constants/Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './About.css';
const About = () => {
    const [sobreNosotros, setSobreNosotros] = useState([]);
    useEffect(() => {
        fetchSobreNosotros();
    }, []);
    const fetchSobreNosotros = async () => {
        try {
            const response = await fetch(`${apiUrl}sobre_nosotros`);
            const data = await response.json();
            if (data) {
                setSobreNosotros(data);
                toast.success('Información sobre nosotros cargada exitosamente');
            }
            else {
                toast.error('No se encontró información sobre nosotros');
            }
        }
        catch (error) {
            toast.error('Error al cargar información sobre nosotros');
        }
    };
    return (_jsxs("div", { className: "about-container", id: "Acerca", children: [_jsx("h1", { children: "Sobre Nosotros" }), sobreNosotros.length > 0 ? (_jsxs("div", { className: "about-content", children: [_jsx("div", { className: "about-logo", children: sobreNosotros[0].imagen_sobre_nosotros ? (_jsx("img", { src: `data:image/png;base64,${sobreNosotros[0].imagen_sobre_nosotros}`, alt: "Sobre Nosotros", className: "sobre-nosotros-imagen" })) : (_jsx("span", { children: "null" })) }), _jsx("div", { className: "about-text", children: sobreNosotros[0].txt_sobre_nosotros.split('\n').map((paragraph, index) => (_jsx("p", { className: "sobre-nosotros-paragraph", children: paragraph }, index))) })] })) : (_jsx("p", { children: "No hay informaci\u00F3n disponible sobre nosotros en este momento." }))] }));
};
export default About;
