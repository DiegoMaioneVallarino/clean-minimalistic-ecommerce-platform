import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />

            {/* Mantén aquí todas tus rutas y componentes */}
        </BrowserRouter>
    );
}

export default App;