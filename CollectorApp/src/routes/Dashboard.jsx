import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Jeśli nie ma tokenu, przekierowujemy do strony logowania
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:10000/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Błąd pobierania danych użytkownika:', error);
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <div>
            <h1>Witaj w panelu użytkownika!</h1>
            {userData ? (
                <div>
                    <h2>Witaj, {userData.username}!</h2>
                    <p>Email: {userData.email}</p>
                    {/* Dodaj inne dane użytkownika */}
                </div>
            ) : (
                <p>Ładowanie danych...</p>
            )}
        </div>
    );
};

export default Dashboard;
