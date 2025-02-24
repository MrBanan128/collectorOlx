import { useEffect, useState } from "react";
import axios from "axios";

const AdminContact = () => {
    const [admins, setAdmins] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState(""); // ID wybranego admina
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get("http://localhost:10000/admin-contact", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setAdmins(response.data);
            } catch (error) {
                console.error("Błąd podczas pobierania adminów:", error);
            }
        };

        fetchAdmins();
    }, []);

    const handleAdminClick = (adminId) => {
        setSelectedAdmin(adminId); // Ustawienie wybranego admina po kliknięciu
    };

    const sendMessage = async () => {
        if (!selectedAdmin) {
            setMessage("Wybierz administratora, do którego chcesz wysłać wiadomość.");
            return;
        }
        if (!title || !content) {
            setMessage("Tytuł i treść wiadomości są wymagane.");
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                "http://localhost:10000/send-message",
                { receiverId: selectedAdmin, title, content },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setMessage("Wiadomość została wysłana.");
            setTitle("");
            setContent("");
            setSelectedAdmin("");
        } catch (error) {
            console.error("Błąd podczas wysyłania wiadomości:", error);
            setMessage("Wystąpił błąd. Spróbuj ponownie.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4">Wyślij wiadomość do administratora</h2>

            {message && <p className="text-sm text-red-600">{message}</p>}

            {selectedAdmin && (
                <div className="mb-4">
                    <h3 className="text-lg text-gray-700">Wybrany administrator: {admins.find(admin => admin._id === selectedAdmin)?.username}</h3>
                </div>
            )}

            {!selectedAdmin && (
                <div className="mb-4">
                    <h3 className="text-lg text-gray-700 mb-2">Wybierz administratora</h3>
                    <ul className="list-disc list-inside">
                        {admins.map((admin) => (
                            <li
                                key={admin._id}
                                className="text-gray-800 cursor-pointer hover:text-blue-600"
                                onClick={() => handleAdminClick(admin._id)} // Dodanie obsługi kliknięcia
                            >
                                {admin.username}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedAdmin && (
                <>
                    <div className="mb-4">
                        <label className="block text-gray-700">Tytuł</label>
                        <input
                            style={{ background: "#222222", color: "#fff" }}
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border rounded-md p-2"
                            placeholder="Wpisz tytuł wiadomości..."
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Treść wiadomości</label>
                        <textarea
                            style={{ background: "#222222", color: "#fff" }}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full border rounded-md p-2"
                            rows="4"
                            placeholder="Wpisz treść wiadomości..."
                        ></textarea>
                    </div>

                    <button
                        style={{ background: "blue", color: "#fff" }}
                        onClick={sendMessage}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Wysyłanie..." : "Wyślij wiadomość"}
                    </button>
                </>
            )}
        </div>
    );
};

export default AdminContact;


