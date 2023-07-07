import axios from 'axios';

const refreshToken = async () => {
    try {
        const response = await axios.post('/api/refresh-token');
        const { accessToken } = response.data;
        // Handle the refreshed access token (e.g., store it in local storage)
        // You can use a state management library like Redux or React Context to manage the token
    } catch (error) {
        // Handle error (e.g., redirect to login page)
        console.error('Failed to refresh token', error);
    }
};

export { refreshToken }; 
