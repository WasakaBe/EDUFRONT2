import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar, Carrusel, Welcome, Cultural, About, Carreras, Activities, } from '../../Sections/Public';
import Inscription from '../../Sections/Public/Inscription/Inscription';
import InforAreas from '../../Sections/Public/InfoAreas/InforAreas';
import Contact from '../../Sections/Public/Contact/Contact';
import Breadcrumb from '../../constants/Breadcrumbs/Breadcrumbs';
const Public = () => {
    return (_jsxs("div", { children: [_jsx(Navbar, {}), _jsx(Breadcrumb, { path: "Inicio" }), _jsx(Carrusel, {}), _jsx(Welcome, {}), _jsx(Cultural, {}), _jsx(About, {}), _jsx(Carreras, {}), _jsx(Activities, {}), _jsx(Inscription, {}), _jsx(InforAreas, {}), _jsx(Contact, {})] }));
};
export default Public;
