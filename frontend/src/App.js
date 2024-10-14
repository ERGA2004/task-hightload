import React, { useState } from 'react';
import Auth from './components/Auth';
import Tasks from './components/Tasks';
import GraphQLTasks from './components/GraphQLTasks';
import { getToken, logout } from './services/authService';

function App() {
    const [authToken, setAuthToken] = useState(getToken());

    const handleLogout = () => {
        logout();
        setAuthToken(null);
    };

    return (
        <div>
            <h1>My Project Frontend</h1>
            {!authToken ? (
                <Auth setAuth={setAuthToken} />
            ) : (
                <>
                    <button onClick={handleLogout}>Logout</button>
                    <Tasks />
                    <GraphQLTasks />
                </>
            )}
        </div>
    );
}

export default App;
