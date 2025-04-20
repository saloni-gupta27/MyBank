import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const {login} = useAuth();
    const navigate= useNavigate()
    const [form, setForm] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await API.post('/auth/login', form);
          login(res.data.user, res.data.token);
          navigate('/dashboard');
        } catch (err) {
          alert(err.response?.data?.message || 'Login failed');
        }
      };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">Welcome Back 👋</h2>
       
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700">Email</label>
                     <input placeholder="Email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.email}type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} required/>
                    
        </div>
        <div>
            <label className="block text-gray-700">Password</label>
                <input placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.password} type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} required/>
        </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >Login</button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Don’t have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
      );
}
export default Login;