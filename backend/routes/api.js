// const express = require('express');
// const multer = require('multer'); // Import multer
// const path = require('path');
// const router = express.Router();
// const Note = require('../db/models/note');
// const multerStorageCloudinary = require('multer-storage-cloudinary');
// const cloudinary = require('cloudinary').v2;




// cloudinary.config({
//     cloud_name: 'ddiqfnzow', // Zastąp swoją nazwą chmury
//     api_key: '491356446112172', // Zastąp swoim kluczem API
//     api_secret: 'RwwRWyeWFgWiDEAzW1_wqYNNC5g' // Zastąp swoim sekretami API
//   });
  
//   // Konfiguracja storage dla Multera z użyciem Cloudinary
//   const storage = multerStorageCloudinary({
//     cloudinary: cloudinary,
//     folder: 'twoj_folder', // Określ folder na Cloudinary
//     allowedFormats: ['jpg', 'jpeg', 'png', 'gif'], // Dozwolone formaty
//   });
  
//   const upload = multer({ storage: storage });




// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, './uploads'); // Miejsce, gdzie będą przechowywane pliki
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, Date.now() + path.extname(file.originalname)); // Unikalna nazwa pliku
// //     },
// // });

// // const upload = multer({ storage: storage });

// // Logger middleware
// router.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });

// // GET all notes
// router.get('/notes', async (req, res) => {
//     try {
//         const notes = await Note.find({});
//         console.log('Fetched all notes:', notes);
//         res.send(notes);
//     } catch (error) {
//         console.error('Error fetching notes:', error);
//         res.status(500).send({ error: 'Error fetching notes', details: error });
//     }
// });

// // GET a single note by ID
// router.get('/notes/:id', async (req, res) => {
//     try {
//         const note = await Note.findById(req.params.id);
//         if (!note) {
//             console.log('Note not found:', req.params.id);
//             return res.status(404).send({ error: 'Note not found' });
//         }
//         console.log('Fetched note:', note);
//         res.send(note);
//     } catch (error) {
//         console.error('Error fetching note:', error);
//         res.status(500).send({ error: 'Error fetching note', details: error });
//     }
// });

// // Obsługuje POST z załączonym plikiem

// // router.post('/notes', upload.single('image'), async (req, res) => {
// //     const { title, body } = req.body;
// //     const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''; // Ścieżka do obrazu

// //     try {
// //         const note = new Note({
// //             title,
// //             image: imageUrl,  // Zapisujemy URL obrazu
// //             body,
// //         });

// //         await note.save();
// //         res.status(201).send(note);
// //     } catch (error) {
// //         console.error('Błąd podczas dodawania notatki:', error);
// //         res.status(400).send({ error: 'Błąd podczas dodawania notatki', details: error });
// //     }
// // });



// router.post('/notes', upload.single('image'), async (req, res) => {
//     const { title, body } = req.body;
//     const imageUrl = req.file ? req.file.secure_url : ''; // URL obrazu z Cloudinary

//     try {
//         const note = new Note({
//             title,
//             image: imageUrl,  // Zapisujemy URL obrazu z Cloudinary
//             body,
//         });

//         await note.save();
//         res.status(201).send(note);
//     } catch (error) {
//         console.error('Błąd podczas dodawania notatki:', error);
//         res.status(400).send({ error: 'Błąd podczas dodawania notatki', details: error });
//     }
// });



// // POST to add a new section to the body of a note
// router.post('/notes/:id/body', async (req, res) => {
//     const { title, body } = req.body;

//     try {
//         const note = await Note.findById(req.params.id);
//         if (!note) {
//             console.log('Note not found:', req.params.id);
//             return res.status(404).send({ error: 'Note not found' });
//         }

//         note.body.push({ title, body: body || [] });
//         await note.save();
//         console.log('Added new section to note:', note);
//         res.status(201).send(note);
//     } catch (error) {
//         console.error('Error adding section to note body:', error);
//         res.status(400).send({ error: 'Error adding section to note body', details: error });
//     }
// });

// // POST to add a new subsection to the body of a specific section in a note
// router.post('/notes/:noteId/body/:sectionId', async (req, res) => {
//     const { title, image, body } = req.body;

//     try {
//         const note = await Note.findById(req.params.noteId);
//         if (!note) {
//             console.log('Note not found:', req.params.noteId);
//             return res.status(404).send({ error: 'Note not found' });
//         }

//         const section = note.body.id(req.params.sectionId);
//         if (!section) {
//             console.log('Section not found:', req.params.sectionId);
//             return res.status(404).send({ error: 'Section not found' });
//         }

//         section.body.push({ title, image, body });
//         await note.save();
//         console.log('Added new subsection to section:', note);
//         res.status(201).send(note);
//     } catch (error) {
//         console.error('Error adding subsection to section:', error);
//         res.status(400).send({ error: 'Error adding subsection to section', details: error });
//     }
// });

// // PUT to update a note by ID
// router.put('/notes/:id', async (req, res) => {
//     try {
//         const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!note) {
//             console.log('Note not found:', req.params.id);
//             return res.status(404).send({ error: 'Note not found' });
//         }
//         console.log('Updated note:', note);
//         res.send(note);
//     } catch (error) {
//         console.error('Error updating note:', error);
//         res.status(400).send({ error: 'Error updating note', details: error });
//     }
// });

// // DELETE a note by ID
// router.delete('/notes/:id', async (req, res) => {
//     try {
//         const note = await Note.findByIdAndDelete(req.params.id);
//         if (!note) {
//             console.log('Note not found:', req.params.id);
//             return res.status(404).send({ error: 'Note not found' });
//         }
//         console.log('Deleted note:', note);
//         res.send(note);
//     } catch (error) {
//         console.error('Error deleting note:', error);
//         res.status(500).send({ error: 'Error deleting note', details: error });
//     }
// });

// module.exports = router;

















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

// ==================== AUTORYZACJA ====================

// Rejestracja użytkownika
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Użytkownik już istnieje' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
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



// Middleware do autoryzacji
const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Brak tokena, autoryzacja odmówiona' });

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token jest nieprawidłowy' });
    }
};

// ==================== NOTATKI ====================

// Pobieranie notatek (tylko dla zalogowanych użytkowników)
// router.get('/notes', authMiddleware, async (req, res) => {
//     try {
//         const notes = await Note.find({});
//         res.json(notes);
//     } catch (error) {
//         res.status(500).json({ error: 'Błąd ładowania notatek', details: error });
//     }
// });
router.get('/notes', authMiddleware, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.userId }); // Szukamy tylko notatek dla tego użytkownika
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Błąd ładowania notatek', details: error });
    }
});


// Dodawanie notatek z obrazem
// router.post('/notes', authMiddleware, upload.single('image'), async (req, res) => {
//     try {
//         const { title, body } = req.body;
//         const imageUrl = req.file ? req.file.path : '';

//         const note = new Note({ title, body, image: imageUrl });
//         await note.save();
//         res.status(201).json(note);
//     } catch (error) {
//         res.status(400).json({ error: 'Błąd podczas dodawania notatki', details: error });
//     }
// });

router.post('/notes', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { title, body } = req.body;
        const imageUrl = req.file ? req.file.path : '';

        const note = new Note({
            title,
            body,
            image: imageUrl,
            user: req.user.userId, // Powiązanie notatki z użytkownikiem
        });
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ error: 'Błąd podczas dodawania notatki', details: error });
    }
});




// Usuwanie notatki
// router.delete('/notes/:id', authMiddleware, async (req, res) => {
//     try {
//         const note = await Note.findByIdAndDelete(req.params.id);
//         if (!note) return res.status(404).json({ error: 'Notatka nie znaleziona' });

//         res.json({ message: 'Notatka usunięta', note });
//     } catch (error) {
//         res.status(500).json({ error: 'Błąd podczas usuwania notatki', details: error });
//     }
// });
router.delete('/notes/:id', authMiddleware, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.userId }); // Usuwamy tylko notatki tego użytkownika
        if (!note) return res.status(404).json({ error: 'Notatka nie znaleziona lub brak dostępu' });

        res.json({ message: 'Notatka usunięta', note });
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas usuwania notatki', details: error });
    }
});





// Czyszczenie tekstu w notatce
// router.delete('/notes/:id/clear-text', authMiddleware, async (req, res) => {
//     try {
//         const note = await Note.findByIdAndUpdate(
//             req.params.id,
//             { title: '', body: '' },
//             { new: true }
//         );
//         if (!note) return res.status(404).json({ error: 'Notatka nie znaleziona' });

//         res.json(note);
//     } catch (error) {
//         res.status(500).json({ error: 'Błąd podczas czyszczenia tekstu', details: error });
//     }
// });
router.delete('/notes/:id/clear-text', authMiddleware, async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId }, // Tylko użytkownik może edytować swoje notatki
            { title: '', body: '' },
            { new: true }
        );
        if (!note) return res.status(404).json({ error: 'Notatka nie znaleziona lub brak dostępu' });

        res.json(note);
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas czyszczenia tekstu', details: error });
    }
});






// Usuwanie zdjęcia z notatki
// router.delete('/notes/:id/image', authMiddleware, async (req, res) => {
//     try {
//         const note = await Note.findById(req.params.id);
//         if (!note) return res.status(404).json({ error: 'Notatka nie znaleziona' });

//         if (note.image) {
//             const imagePublicId = note.image.split('/').pop().split('.')[0];
//             await cloudinary.uploader.destroy(imagePublicId);
//             note.image = '';
//             await note.save();
//         }

//         res.json({ message: 'Zdjęcie usunięte', note });
//     } catch (error) {
//         res.status(500).json({ error: 'Błąd podczas usuwania zdjęcia', details: error });
//     }
// });
router.delete('/notes/:id/image', authMiddleware, async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user.userId }); // Tylko użytkownik może usunąć swoje zdjęcie
        if (!note) return res.status(404).json({ error: 'Notatka nie znaleziona lub brak dostępu' });

        if (note.image) {
            const imagePublicId = note.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(imagePublicId);
            note.image = '';
            await note.save();
        }

        res.json({ message: 'Zdjęcie usunięte', note });
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas usuwania zdjęcia', details: error });
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



// Pobieranie danych zalogowanego użytkownika
router.get('/user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Bez hasła
        if (!user) {
            return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Błąd serwera', details: error });
    }
});




module.exports = router;
