const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const API_AUTH_URL = `${API_BASE_URL}/auth`;


export const loginUser = async (email, password) => {
    const response = await fetch(`${API_AUTH_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            email: email, 
            password: password })
    });

    const data = await response.json();
    
    if(!response.ok){
        const error = new Error(data.error || 'Login failed');
        error.status = response.status;

        if(data.errors) {
            error.errors = data.errors;
        }
        throw error;
    }
    return data;
}

export const registerUser = async (name, email, password) => {
    const response = await fetch(`${API_AUTH_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullName: name, 
            email: email, 
            password: password })
    });

    const data = await response.json();
    
    if(!response.ok){
        const error = new Error(data.error || 'Registration failed');
        error.status = response.status;

        if(data.errors) {
            error.errors = data.errors;
        }
        throw error;
    }
    return data;
}