import React, { useState } from 'react';
import { register, login } from '../services/authService';

const Auth = ({ setAuth }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', fullName: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            const token = await login({ email: formData.email, password: formData.password });
            setAuth(token);
        } else {
            await register(formData);
            setIsLogin(true);
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        value={formData.fullName}
                        placeholder="Full Name"
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                )}
                <input
                    type="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    value={formData.password}
                    placeholder="Password"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
        </div>
    );
};

export default Auth;
