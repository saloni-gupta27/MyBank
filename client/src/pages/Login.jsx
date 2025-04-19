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
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button type="submit">Login</button>
        </form>
      );
}
export default Login;