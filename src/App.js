import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AppRoutes from "./Routes/AppRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
    return (_jsxs("div", { children: [_jsx(AppRoutes, {}), _jsx(ToastContainer, {})] }));
};
export default App;
