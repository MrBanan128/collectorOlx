import { useState, useEffect } from 'react';
import axios from 'axios';

const ExpertPanel = () => {
  const [assignedNotes, setAssignedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [evaluationData, setEvaluationData] = useState({
    expertName: '',
    expertBadge: '',
    expertMessage: '',
    expertPrice: ''
  });
  const [activeNoteId, setActiveNoteId] = useState(null); // Dodajemy stan do śledzenia aktywnej notatki

  useEffect(() => {
    const fetchAssignedNotes = async () => {
      try {
        const response = await axios.get(
          'http://localhost:10000/expert/assigned-notes',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        setAssignedNotes(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania notatek:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedNotes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvaluationData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (noteId) => {
    try {
      const response = await axios.put(
        `http://localhost:10000/users/entries/${noteId}`,
        {
          expertEvaluation: evaluationData,
          expertRequest: false
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      alert('Ocena została przypisana do notatki!');
      setEvaluationData({
        expertName: '',
        expertBadge: '',
        expertMessage: '',
        expertPrice: ''
      }); // Resetowanie formularza
    } catch (error) {
      console.error('Błąd podczas wysyłania oceny:', error);
    }
  };

  const handleNoteClick = (noteId) => {
    // Zmiana aktywnej notatki
    setActiveNoteId(noteId === activeNoteId ? null : noteId); // Toggle aktywnej notatki
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1 }}>
        <h2>Przypisane Notatki</h2>
        {loading ? (
          <p>Ładowanie...</p>
        ) : assignedNotes.length === 0 ? (
          <p>Brak przypisanych notatek.</p>
        ) : (
          <div>
            {assignedNotes.map((note) => (
              <div
                key={note._id}
                style={{
                  border: 'solid 1px red',
                  padding: '1rem',
                  margin: '0.5rem',
                  cursor: 'pointer',
                  backgroundColor:
                    activeNoteId === note._id ? '#f0f0f0' : 'transparent' // Podświetlenie klikniętego komponentu
                }}
                onClick={() => handleNoteClick(note._id)} // Kliknięcie komponentu
              >
                {note.image && (
                  <img
                    src={note.image}
                    alt={note.title}
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
                <h3>{note.title}</h3>
                <p>{note.body}</p>
                {note.price && <p>Cena: {note.price} PLN</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Formularz dla aktywnej notatki */}
      <div style={{ marginLeft: '2rem', width: '300px' }}>
        {activeNoteId && (
          <div>
            <h4>Dodaj ocenę eksperta</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(activeNoteId); // Przesyłanie danych do notatki
              }}
            >
              <div>
                <label>Nazwa eksperta:</label>
                <input
                  style={{
                    background: '#333333',
                    border: 'solid 1px red',
                    margin: '.2rem'
                  }}
                  type="text"
                  name="expertName"
                  value={evaluationData.expertName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Odznaka eksperta (URL):</label>
                <input
                  style={{
                    background: '#333333',
                    border: 'solid 1px red',
                    margin: '.2rem'
                  }}
                  type="text"
                  name="expertBadge"
                  value={evaluationData.expertBadge}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Wiadomość od eksperta:</label>
                <textarea
                  style={{
                    background: '#333333',
                    border: 'solid 1px red',
                    margin: '.2rem'
                  }}
                  name="expertMessage"
                  value={evaluationData.expertMessage}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Proponowana cena:</label>
                <input
                  style={{
                    background: '#333333',
                    border: 'solid 1px red',
                    margin: '.2rem'
                  }}
                  type="number"
                  name="expertPrice"
                  value={evaluationData.expertPrice}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  style={{
                    background: 'blue',
                    border: 'solid 1px red',
                    margin: '.2rem'
                  }}
                >
                  Zatwierdź ocenę
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertPanel;
