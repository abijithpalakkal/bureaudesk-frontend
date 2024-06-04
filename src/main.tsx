import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client'
import { store } from "./redux/store.ts";
import App from './App.tsx'
import './index.css'
import Post from "./context/Conteststore.tsx";
import SocketContext from "./context/SocketContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store} >
        <SocketContext>
        <App />
        </SocketContext>
     
        
    </Provider>
)
