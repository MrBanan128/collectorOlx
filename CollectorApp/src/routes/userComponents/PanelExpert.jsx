import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';

const ExpertPanel = () => {
  const [assignedNotes, setAssignedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [evaluationData, setEvaluationData] = useState({
    expertName: '',
    expertBadge: '/verified.png',
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
    <div style={{ display: 'flex', minHeight: '100vh', color: 'white' }}>
      <div style={{ flex: 1 }}>
        <Heading fontSize={'30px'} color={'white'} padding={'10px'}>
          Ogłoszenia do Wyceny
        </Heading>
        {loading ? (
          <p>Ładowanie...</p>
        ) : assignedNotes.length === 0 ? (
          <p>Brak przedmiotów</p>
        ) : (
          <div>
            {assignedNotes.map((note) => (
              <div
                key={note._id}
                style={{
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                  borderRadius: '5px',
                  padding: '1rem',
                  margin: '0.5rem',
                  maxWidth: '900px',
                  cursor: 'pointer',
                  backgroundColor:
                    activeNoteId === note._id ? '#f0f0f0' : 'transparent',
                  transform:
                    activeNoteId === note._id ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease-in-out'
                }}
                onClick={() => handleNoteClick(note._id)} // Kliknięcie komponentu
              >
                <Flex
                  direction="row"
                  gap={4}
                  style={{
                    color: activeNoteId === note._id ? 'black' : 'white'
                  }}
                >
                  {note.image && (
                    <img
                      src={note.image}
                      alt={note.title}
                      style={{ width: '100px', height: '100px' }}
                    />
                  )}
                  <Flex direction="column">
                    <Heading size={'5xl'} paddingBottom={2}>
                      {note.title}
                    </Heading>
                    <Text>{note.body}</Text>
                    {note.price && <Text>Cena: {note.price} PLN</Text>}
                  </Flex>
                </Flex>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Formularz dla aktywnej notatki */}
      <Flex>
        {activeNoteId && (
          <Flex
            ml={'5rem'}
            w={'400px'}
            color={'black'}
            boxShadow={'lg'}
            height={'300px'}
            padding={'1rem'}
            rounded={'xl'}
            bg={'gray.200'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Flex direction="column">
              <Heading
                size={'3xl'}
                borderBottom={'1px solid black'}
                marginBottom={4}
              >
                Dodaj ocenę eksperta
              </Heading>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(activeNoteId); // Przesyłanie danych do notatki
                }}
              >
                <Flex direction="column" gap={5}>
                  <Flex direction="row" justifyContent={'space-between'}>
                    <label style={{ width: '150px', marginRight: '5px' }}>
                      Dane eksperta:
                    </label>
                    <input
                      style={{
                        color: 'white',
                        background: '#333333',
                        margin: '.2rem',
                        width: '100%',
                        flexGrow: 1,
                        padding: '10px'
                      }}
                      type="text"
                      name="expertName"
                      value={evaluationData.expertName}
                      onChange={handleInputChange}
                    />
                  </Flex>
                  {/* <div>
                <label>Odznaka eksperta (URL):</label>
                <input
                  style={{
                    background: '#333333',
                    border: 'solid 1px red',
                    margin: '.2rem'
                  }}
                  type="text"
                  name="expertBadge"
                  value={evaluationData.expertBadge} // src="/check.png"
                  onChange={handleInputChange}
                />
              </div> */}
                  <Flex direction="row" justifyContent={'space-between'}>
                    <label
                      style={{
                        width: '150px',
                        marginRight: '5px'
                      }}
                    >
                      Wiadomość do klienta:
                    </label>
                    <textarea
                      style={{
                        color: 'white',
                        background: '#333333',
                        margin: '.2rem',
                        width: '100%',
                        flexGrow: 1,
                        padding: '10px'
                      }}
                      name="expertMessage"
                      value={evaluationData.expertMessage}
                      onChange={handleInputChange}
                    />
                  </Flex>
                  <Flex direction="row" justifyContent={'space-between'}>
                    <label style={{ width: '150px', marginRight: '5px' }}>
                      Proponowana cena:
                    </label>
                    <input
                      style={{
                        color: 'white',
                        background: '#333333',
                        margin: '.2rem',
                        width: '100%',
                        flexGrow: 1,
                        padding: '10px'
                      }}
                      type="number"
                      name="expertPrice"
                      value={evaluationData.expertPrice}
                      onChange={handleInputChange}
                    />
                  </Flex>
                  <Flex direction="row" justifyContent={'center'}>
                    <Button
                      width="60%"
                      fontSize="16px"
                      color="white"
                      padding="10px"
                      type="submit"
                      style={{
                        background: 'blue',
                        margin: '.2rem',
                        borderRadius: '8px',
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background 0.3s ease, transform 0.2s ease',
                        boxShadow: '0 4px 10px rgba(0, 0, 255, 0.3)'
                      }}
                      _hover={{
                        background: 'darkblue',
                        transform: 'scale(1.05)',
                        boxShadow: '0 6px 15px rgba(0, 0, 255, 0.5)'
                      }}
                      _active={{
                        background: 'navy',
                        transform: 'scale(0.98)'
                      }}
                    >
                      Zatwierdź ocenę
                    </Button>
                  </Flex>
                </Flex>
              </form>
            </Flex>
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default ExpertPanel;
