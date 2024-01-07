import './App.css';
import { EstadoProveedor } from './context/EstadoGeneral';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';

function App() {
    return (
        <EstadoProveedor>
            <Router>
                <AppRoutes />
            </Router>
        </EstadoProveedor>
    );
}

export default App;

