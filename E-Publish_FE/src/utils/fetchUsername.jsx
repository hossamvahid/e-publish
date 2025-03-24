import axios from "axios";

export const fetchUsername = async (token) =>
{
    try{
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/v1/auth/username`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        
        return response.data.username;
    }
    catch(error)
    {
        console.error("Error fetching username: ",error);
        return null;
    }
};