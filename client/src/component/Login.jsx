import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ConnectMongoDBForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        dbName: '',
        clusterURL: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/connect-mongodb', formData);
            alert('Connection successfully');
            navigate("/FileUpload")
        } catch (error) {
            console.error('Error connection:', error);
        }
    };
    

    return (
        <div>
            <h2>Connect to MongoDB</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div>
                    <label>Database Name:</label>
                    <input type="text" name="dbName" value={formData.dbName} onChange={handleChange} />
                </div>
                <div>
                    <label>Cluster URL:</label>
                    <input type="text" name="clusterURL" value={formData.clusterURL} onChange={handleChange} />
                </div>
                <button type="submit">Connect</button>
            </form>
        </div>
    );
};

export default ConnectMongoDBForm;
