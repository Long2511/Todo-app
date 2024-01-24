import './App.css';
import { TodoWrapper } from './Components/TodoWrapper';
import { Helmet } from 'react-helmet';

function App() {
    return (
        <div className="App">
            <Helmet>
                <title>Todo App</title>
                <link
                    rel="icon"
                    type="image/png"
                    href="./logo.png"
                    sizes="16x16"
                />
            </Helmet>
            <TodoWrapper />
        </div>
    );
}

export default App;
