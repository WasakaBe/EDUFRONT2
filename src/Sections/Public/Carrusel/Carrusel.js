import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import './Carrusel.css';
import { apiUrl } from '../../../constants/Api';
const Carrusel = () => {
    const [index, setIndex] = useState(0);
    const [images, setImages] = useState([]);
    useEffect(() => {
        fetchImages();
    }, []);
    const fetchImages = async () => {
        try {
            const response = await fetch(`${apiUrl}carrusel_imgs`);
            const data = await response.json();
            if (data.carrusel_imgs) {
                const formattedImages = data.carrusel_imgs.map((image) => `data:image/jpeg;base64,${image.carrusel}`);
                setImages(formattedImages);
            }
        }
        catch (error) {
            console.error('Error fetching carrusel images:', error);
        }
    };
    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    return (_jsxs("div", { className: "carousel", children: [_jsx("div", { className: "carousel-inner", style: { transform: `translateX(-${index * 100}%)` }, children: images.map((image, idx) => (_jsx("img", { src: image, alt: `panel ${idx + 1}`, className: "carousel-item" }, idx))) }), _jsx("button", { className: "carousel-button prev", onClick: handlePrev, children: "\u276E" }), _jsx("button", { className: "carousel-button next", onClick: handleNext, children: "\u276F" })] }));
};
export default Carrusel;
