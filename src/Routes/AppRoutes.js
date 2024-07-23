import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Admin, Alumn, Docent, Family, Public } from '../Pages';
import { Footer } from '../Sections/Public';
import { AuthContextProvider } from '../Auto/Auth';
import { AvisoDeClientes, Privacy, TerminosYCondiciones } from '../Sections/Doc';
const AppRoutes = () => {
    return (_jsx(AuthContextProvider, { children: _jsxs(Router, { children: [_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Public, {}) }), _jsx(Route, { path: "/Administration/:userName?", element: _jsx(Admin, {}) }), _jsx(Route, { path: "/Alumn/:userName?", element: _jsx(Alumn, {}) }), _jsx(Route, { path: "/Docent/:userName?", element: _jsx(Docent, {}) }), _jsx(Route, { path: "/Familiar/:userName?", element: _jsx(Family, {}) }), _jsx(Route, { path: "/terms", element: _jsx(TerminosYCondiciones, {}) }), _jsx(Route, { path: "/privacy", element: _jsx(Privacy, {}) }), _jsx(Route, { path: "/aviso/clientes", element: _jsx(AvisoDeClientes, {}) })] }), _jsx(Footer, {})] }) }));
};
export default AppRoutes;
