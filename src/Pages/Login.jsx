import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === 'sheldy' && password === 'unpam') {
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center h-screen p-4 md:px-16">
                <div className="w-1/4 p-4 bg-white shadow-lg rounded">
                    <h3 className="text-xl mb-4 text-center">Login</h3>
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border p-2 mb-2 w-full"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border p-2 mb-2 w-full"
                        />
                        {error && <p className="text-red-500">{error}</p>}
                        <button onClick={handleLogin} className="bg-green-700 text-white p-2 mt-6 w-full">Login</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;