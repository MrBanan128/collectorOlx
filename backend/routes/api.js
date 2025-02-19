
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('../passport');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { Note, User } = require('../db/models/note');


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
    if (!authHeader) return res.status(401).json({ message: 'Brak tokena, autoryzacja odmówiona' });

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token jest nieprawidłowy' });
    }
};



// ==================== AUTORYZACJA ====================

// Rejestracja użytkownika
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Użytkownik już istnieje' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword, status: 'user' });
        await user.save();

        res.status(201).json({ message: 'Rejestracja zakończona sukcesem' });
    } catch (error) {
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

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

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





// ==================== Users ====================//






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

router.get('/users/entries', authMiddleware, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.userId }); // Filtrujemy po userId
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Błąd pobierania notatek', details: error });
    }
});

router.put('/users/entries/:noteId', authMiddleware, async (req, res) => {
    try {
        const { noteId } = req.params;
        const { title, body, phoneNumber } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            { title, body, phoneNumber },
            { new: true }
        );

        if (!updatedNote) return res.status(404).json({ message: 'Notatka nie znaleziona' });

        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: 'Błąd podczas aktualizacji notatki', details: error });
    }
});







router.post('/users/entries', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const newNote = new Note({
            userId: req.user.userId,
            title: req.body.title,
            body: req.body.body,
            phoneNumber: req.body.phoneNumber,
            image: req.file.path, // Zapisujemy URL
            imageId: req.file.filename, // Zapisujemy public_id
        });

        await newNote.save();
        res.status(201).json({ note: newNote });
    } catch (error) {
        res.status(500).json({ message: 'Błąd serwera', details: error });
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
        
        // Sprawdzenie, czy notatka ma obraz
        if (note.image) {
            // Wydobycie public_id z URL-a obrazu
            const imageUrl = note.image;
            const publicId = imageUrl.split('/').pop().split('.')[0]; // Pobiera nazwę pliku bez rozszerzenia
            
            // Usunięcie obrazu z Cloudinary
            await cloudinary.uploader.destroy(`notatki/${publicId}`);
            // await cloudinary.uploader.destroy(publicId);

            console.log(`Obraz ${publicId} usunięty z Cloudinary`);
        }

        // Usunięcie obrazu z bazy danych
        await Note.findByIdAndUpdate(noteId, { image: null });

        res.json({ message: 'Zdjęcie usunięte' });
    } catch (error) {
        console.error('Błąd usuwania zdjęcia:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});


module.exports = router;















