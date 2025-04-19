import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const {login} = useAuth();
    const navigate= useNavigate()
    const [form, setForm] = useState({ name:"",email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await API.post('/auth/register', form);
          login(res.data.user, res.data.token);
          navigate('/dashboard');
        } catch (err) {
          alert(err.response?.data?.message || 'Registration failed');
        }
      };

    return (
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input placeholder="Name" type="text" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button type="submit">Register</button>
        </form>
      );
}
export default Register;