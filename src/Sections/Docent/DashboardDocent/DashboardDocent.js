import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './DashboardDocent.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
const DashboardDocent = () => {
    const location = useLocation();
    const state = location.state;
    const { user2 } = state || {};
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const formattedTime = currentTime.toLocaleString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
    return (_jsxs("div", { className: "admin-container-dashboard", children: [_jsxs("div", { className: "admin-header", children: [_jsx("h2", { children: "Dashboard Docente" }), _jsx("p", { children: formattedTime })] }), _jsxs("div", { className: "admin-welcome", children: [_jsxs("p", { children: ["Bienvenido, ", _jsx("span", { children: user2 })] }), _jsx("p", { children: "Es un gusto tenerte con nosotros. \u00A1\u00C1nimo!" })] })] }));
};
export default DashboardDocent;
