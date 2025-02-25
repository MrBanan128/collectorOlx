
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('../passport');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { Note, User, Message } = require('../db/models/note');


const router = express.Router();
const JWT_SECRET =  'domyslny_sekret';


async function createAdminUser() {
    const existingAdmin = await User.findOne({ status: "admin" });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash("admin123", 10); // Hasło można zmienić
        const admin = new User({
            username: "Admin",
            email: "admin@example.com",
            password: hashedPassword,
            status: "admin"
        });

        await admin.save();
        console.log("Użytkownik admin utworzony!");
    } else {
        console.log("Admin już istnieje.");
    }
}
// Wywołanie funkcji przy uruchomieniu serwera
createAdminUser();


// Konfiguracja Cloudinary
cloudinary.config({
    cloud_name: 'ddiqfnzow', // Zastąp swoją nazwą chmury
    api_key: '491356446112172', // Zastąp swoim kluczem API
    api_secret: 'RwwRWyeWFgWiDEAzW1_wqYNNC5g' // Zastąp swoim sekretami API
});

// Konfiguracja Multer + Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'notatki',
        format: async () => 'png',
        public_id: (req, file) => file.originalname.split('.')[0],
    },
});


const upload = multer({ storage });


// Middleware do autoryzacji
const authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Brak tokena, autoryzacja odmówiona' });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // const token = jwt.sign({ userId: user._id },JWT_SECRET, { expiresIn: '3h' });

        console.log('Decoded token:', decoded);
        // console.log('Decoded user data in middleware: ', decoded); // Logowanie w middleware
        req.user = decoded; // Przypisanie danych użytkownika
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token jest nieprawidłowy' });
    }
};


// Middleware do sprawdzania, czy użytkownik jest administratorem
const adminMiddleware = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user || user.status !== 'admin') {
            return res.status(403).json({ message: 'Brak uprawnień' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Błąd serwera', details: error });
    }
};



// ==================== AUTORYZACJA ====================

// Rejestracja użytkownika
router.post('/register', async (req, res) => {
    try {
        // console.log("Dane z frontendu:", req.body);  // Debug: sprawdź, czy `status` dociera do backendu
        const { username, email, password, status } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Użytkownik już istnieje' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ 
            username, 
            email, 
            password: hashedPassword, 
            status: status ? status : 'user'  // Jeśli `status` nie został przesłany, ustaw 'user'
        });
        await user.save();
        // console.log("Nowy użytkownik zapisany:", user);  // Debug: sprawdź, jaki status ma użytkownik
        res.status(201).json({ message: 'Rejestracja zakończona sukcesem', user });
    } catch (error) {
        console.error("Błąd rejestracji:", error);
        res.status(500).json({ error: 'Błąd serwera', details: error });
    }
});

// Logowanie użytkownika
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Nieprawidłowe dane logowania' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Nieprawidłowe dane logowania' });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '3h' });

        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera', details: error });
    }
});


// google facebook logo registr

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3000/dashboard'); // Przekierowanie do frontendu
  }
);

// Facebook OAuth
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3000/dashboard');
  }
);

router.get('/user-info', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: 'Użytkownik nie znaleziony' });

        res.json({
            username: user.username,
            email: user.email,
            status: user.status // Przekazujemy status użytkownika
        });
    } catch (error) {
        res.status(500).json({ message: 'Błąd pobierania danych użytkownika', details: error });
    }
});



// =========================================== Users ===========================================//

// Pobieranie danych użytkownika
router.get('/users', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: 'Użytkownik nie znaleziony' });

        res.json({
            username: user.username,
            email: user.email,
            avatar: user.avatar || '',
        });
    } catch (error) {
        res.status(500).json({ message: 'Błąd serwera', details: error });
    }
});


// Aktualizacja użytkownika (email, username)
router.put('/users', authMiddleware, upload.single('avatar'), async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: 'Użytkownik nie znaleziony' });

        if (username) user.username = username;
        if (email) user.email = email;
        if (req.file) {
            if (user.avatar) {
                const imagePublicId = user.avatar.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(imagePublicId);
            }
            user.avatar = req.file.path;
        }

        await user.save();
        res.json({ message: 'Dane użytkownika zaktualizowane', user });
    } catch (error) {
        res.status(500).json({ message: 'Błąd podczas aktualizacji', details: error });
    }
});

// Usuwanie konta użytkownika wraz z jego zdjęciami z Cloudinary
router.delete('/users', authMiddleware, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.userId });

        // Usuwanie zdjęć z Cloudinary dla każdej notatki
        for (const note of notes) {
            if (note.image) {
                const imagePublicId = note.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`notatki/${imagePublicId}`);
            }
        }

        // Usuwanie wszystkich notatek użytkownika
        await Note.deleteMany({ userId: req.user.userId });

        // Usunięcie awatara użytkownika, jeśli istnieje
        const user = await User.findById(req.user.userId);
        if (user?.avatar) {
            const avatarPublicId = user.avatar.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`avatary/${avatarPublicId}`);
        }

        // Usunięcie konta użytkownika
        await User.findByIdAndDelete(req.user.userId);

        res.json({ message: 'Konto użytkownika i wszystkie jego notatki oraz zdjęcia zostały usunięte' });
    } catch (error) {
        res.status(500).json({ message: 'Błąd podczas usuwania konta', details: error });
    }
});


// ======================================== Entries ======================================== //


router.get('/users/entries', authMiddleware, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.userId }); // Filtrujemy po userId
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Błąd pobierania notatek', details: error });
    }
});


router.get('/entries', async (req, res) => {
  try {
    const notes = await Note.find()
      .sort({ views: -1 }) // Sortowanie po views w kolejności malejącej
      .limit(9); // Ograniczenie do 9 elementów

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Błąd pobierania notatek', details: error });
  }
});


router.get('/users/entries/:noteId', async (req, res) => {
    try {
        const { noteId } = req.params;
        
        // Znalezienie i zwiększenie liczby wyświetleń
        const note = await Note.findByIdAndUpdate(
            noteId,
            { $inc: { views: 1 } }, // Inkrementacja views o 1
            { new: true } // Zwrócenie zaktualizowanego dokumentu
        );

        if (!note) return res.status(404).json({ message: 'Notatka nie znaleziona' });

        res.json(note);
    } catch (error) {
        res.status(500).json({ message: 'Błąd pobierania notatki', details: error });
    }
});

router.post('/users/entries', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const newNote = new Note({
            userId: req.user.userId,
            title: req.body.title,
            body: req.body.body,
            description: req.body.description,
            price: req.body.price,
            image: req.file.path, // Zapisujemy URL
            imageId: req.file.filename, // Zapisujemy public_id
            category: req.body.category, // Zapisujemy kategorię
            subcategory: req.body.subcategory, // Zapisujemy podkategorię
            createdAt: new Date(),  // Ustawienie bieżącej daty i godziny
            views: 0,  // Domyślnie 0 wyświetleń
        });
        await newNote.save(); 
        res.status(201).json({ note: newNote });
    } catch (error) {
        res.status(500).json({ message: 'Błąd serwera', details: error });
    }
});

router.put('/users/entries/:noteId', authMiddleware, async (req, res) => {
    try {
        const { noteId } = req.params;
        const { title, body, price, expertRequest, expertId, expertEvaluation } = req.body;  // Dodajemy expertId

        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            { 
                title, 
                body, 
                price, 
                expertRequest, 
                expertId, // Dodajemy expertId
                ...(expertEvaluation && { expertEvaluation })  // Dodajemy expertEvaluation tylko jeśli zostało przekazane
            },
            { new: true }
        );
        if (!updatedNote) return res.status(404).json({ message: 'Notatka nie znaleziona' });

        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: 'Błąd podczas aktualizacji notatki', details: error });
    }
});

// Usuwanie całej notatki
router.delete('/users/entries/:noteId', authMiddleware, async (req, res) => {
    try {
        const { noteId } = req.params;
        const note = await Note.findById(noteId);
        if (!note) return res.status(404).json({ message: 'Notatka nie znaleziona' });
        // Jeśli notatka zawiera obraz, usuń go z Cloudinary
        if (note.image) {
            const publicId = note.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`notatki/${publicId}`);
        }
        // Usuń notatkę z bazy danych
        await Note.findByIdAndDelete(noteId);
        res.json({ message: 'Notatka usunięta' });
    } catch (error) {
        console.error('Błąd usuwania notatki:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

// Usuwanie zdjęcia z notatki
router.delete('/users/entries/image/:noteId', authMiddleware, async (req, res) => {
    try {
        const { noteId } = req.params;
        const note = await Note.findById(noteId);
        if (!note) return res.status(404).json({ message: 'Notatka nie znaleziona' });
        if (note.image) {
            const imageUrl = note.image;
            const publicId = imageUrl.split('/').pop().split('.')[0]; // Pobiera nazwę pliku bez rozszerzenia
            await cloudinary.uploader.destroy(`notatki/${publicId}`);
        }
        // Usunięcie obrazu z bazy danych
        await Note.findByIdAndUpdate(noteId, { image: null });
        res.json({ message: 'Zdjęcie usunięte' });
    } catch (error) {
        console.error('Błąd usuwania zdjęcia:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});


// ==================================== Expert ======================================= //


// Endpoint do pobierania notatek przypisanych do eksperta
router.get("/expert/assigned-notes", authMiddleware, async (req, res) => {
    try {
        console.log('req.user._id:', req.user._id);
        const expertNotes = await Note.find({
            expertId: req.user.userId,
            expertRequest: true,  // Dodano filtr dla expertRequest
        });

        if (!expertNotes || expertNotes.length === 0) {
            return res.status(404).json({ message: 'Brak przypisanych notatek.' });
        }

        res.json(expertNotes);
    } catch (error) {
        res.status(500).json({ message: 'Błąd podczas pobierania notatek', error });
    }
});





// ======================================= ADMIN ====================================== //

// Endpoint dla administratora do pobierania wszystkich użytkowników
router.get('/admin/users', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Błąd pobierania użytkowników', details: error });
    }
});

router.put('/admin/users/:userId', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email, password, status } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Użytkownik nie znaleziony' });

        // Debug: Sprawdzamy dane przed zapisaniem
        // console.log("Dane użytkownika przed edycją:", user);

        // Aktualizowanie danych użytkownika
        if (username) user.username = username;
        if (email) user.email = email;
        if (status) user.status = status;

        // Jeśli podano nowe hasło, musimy je zahaszować
        if (password) {
            // console.log("Hasło do zaktualizowania:", password);  // Debug
            const hashedPassword = await bcrypt.hash(password, 10); // Haszowanie hasła
            user.password = hashedPassword;
        }
        await user.save();
        // Debug: Sprawdzamy dane po zapisaniu
        // console.log("Zaktualizowany użytkownik:", user);
        res.json({ message: 'Dane użytkownika zostały zaktualizowane', user });
    } catch (error) {
        res.status(500).json({ message: 'Błąd podczas aktualizacji danych użytkownika', details: error });
    }
});


router.delete('/admin/users/:userId', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Użytkownik nie znaleziony' });

        // Usunięcie notatek użytkownika i zdjęć z Cloudinary
        const notes = await Note.find({ userId });
        for (const note of notes) {
            if (note.image) {
                const publicId = note.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`notatki/${publicId}`);
            }
        }
        await Note.deleteMany({ userId });

        // Usunięcie awatara użytkownika
        if (user.avatar) {
            const avatarPublicId = user.avatar.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`avatary/${avatarPublicId}`);
        }

        // Usunięcie użytkownika
        await User.findByIdAndDelete(userId);

        res.json({ message: 'Użytkownik i wszystkie jego dane zostały usunięte' });
    } catch (error) {
        res.status(500).json({ message: 'Błąd podczas usuwania użytkownika', details: error });
    }
});


// ============================================ Message ==================================== //

// Pobieranie wiadomości dla użytkownika
router.get('/user-messages', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId; // Zmiana z req.user.id na req.user.userId
        // console.log('Pobieram wiadomości dla userId: ', userId); // Dodaj logowanie
        const messages = await Message.find({
            $or: [{ senderId: userId }, { receiverId: userId }]
        }).populate('senderId receiverId', 'username'); // Pobierz nazwy użytkowników
        // console.log('Wiadomości z bazy: ', messages); // Dodaj logowanie
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Błąd przy pobieraniu wiadomości' });
    }
});


router.post('/send-message', async (req, res) => {
    try {
        // Pobranie tokena z nagłówków
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Brak tokena, nieautoryzowany dostęp" });
        }
        // Dekodowanie tokena, aby pobrać `senderId`
        const decoded = jwt.verify(token, 'domyslny_sekret');
        const senderId = decoded.userId; // Upewnij się, że `userId` jest poprawnym kluczem w tokenie
        const { receiverId, content, title } = req.body;
        // Sprawdzenie, czy wszystkie dane są obecne
        if (!receiverId || !content, !title) {
            return res.status(400).json({ message: "Brak wymaganych danych" });
        }
        const message = new Message({
            senderId,
            receiverId,
            title,
            content,
            timestamp: new Date(),
            status: 'unread'
        });

        await message.save();
        res.status(201).json({ message: "Wiadomość wysłana", data: message });

    } catch (error) {
        console.error("Błąd podczas wysyłania wiadomości:", error);
        res.status(500).json({ message: "Wystąpił błąd", error });
    }
});


router.patch('/message/:id/read', authMiddleware, async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
        return res.status(404).json({ message: 'Wiadomość nie znaleziona' });
        }
        message.status = 'read';
        await message.save();
        res.status(200).json({ message: 'Status wiadomości zaktualizowany' });
    } catch (error) {
        console.error("Błąd przy aktualizacji statusu:", error);
        res.status(500).json({ message: 'Błąd przy aktualizacji statusu', error: error.message });
    }
});

// Usuwanie wiadomości
router.delete('/messages/:messageId', async (req, res) => {
    const { messageId } = req.params;
    try {
        const deletedMessage = await Message.findByIdAndDelete(messageId);
        if (!deletedMessage) {
            return res.status(404).json({ message: 'Wiadomość nie została znaleziona' });
        }
        res.status(200).json({ message: 'Wiadomość została usunięta' });
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd podczas usuwania wiadomości', error });
    }
});



router.get('/admin-contact', authMiddleware, async (req, res) => {
    try {
        const admins = await User.find({ status: 'admin' }, 'username _id'); // Pobiera tylko username i _id adminów
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Błąd przy pobieraniu administratorów', error });
    }
});

router.get('/expert-contact', authMiddleware, async (req, res) => {
    try {
        const experts = await User.find({ status: 'expert' }, 'username _id'); // Pobiera tylko username i _id
        res.status(200).json(experts);
    } catch (error) {
        res.status(500).json({ message: 'Błąd przy pobieraniu ekspertów', error });
    }
});


module.exports = router;



