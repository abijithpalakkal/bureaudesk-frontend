import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client'
import { store } from "./redux/store.ts";
import App from './App.tsx'
import './index.css'
import SocketContext from "./context/SocketContext.tsx";
import TaskStatusProvider from "./context/TaskStatusContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store} >
        <SocketContext>
            <TaskStatusProvider>
                <App />
            </TaskStatusProvider>
        </SocketContext>
    </Provider>
)
