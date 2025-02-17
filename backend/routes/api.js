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
const multer = require('multer');
const router = express.Router();
const Note = require('../db/models/note');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Konfiguracja Cloudinary
cloudinary.config({
    cloud_name: 'ddiqfnzow', // Zastąp swoją nazwą chmury
    api_key: '491356446112172', // Zastąp swoim kluczem API
    api_secret: 'RwwRWyeWFgWiDEAzW1_wqYNNC5g' // Zastąp swoim sekretami API
   
    // api_key: '655897763651234',
    // api_secret: 'kDCQiv30C-YX1n7eiPG16CkLusE' 
});

// Konfiguracja Multer + Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'notatki',
        format: async (req, file) => 'png', // Format zdjęcia
        public_id: (req, file) => file.originalname.split('.')[0], // Public ID
    },
});

const upload = multer({ storage });

// Pobieranie notatek
router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find({});
        res.send(notes);
    } catch (error) {
        res.status(500).send({ error: 'Błąd ładowania notatek', details: error });
    }
});

// Dodawanie notatek z obrazami
router.post('/notes', upload.single('image'), async (req, res) => {
    try {
        const { title, body } = req.body;
        const imageUrl = req.file ? req.file.path : ''; // Ścieżka do zdjęcia

        const note = new Note({ title, body, image: imageUrl });
        await note.save();
        res.status(201).send(note);
    } catch (error) {
        res.status(400).send({ error: 'Błąd podczas dodawania notatki', details: error });
    }
});


router.post('/notes', upload.single('image'), async (req, res) => {
    try {
        const { title, body } = req.body;
        const imageUrl = req.file ? cloudinary.url(req.file.public_id, { // Korzystamy z ID obrazu
            transformation: [
                { quality: 'auto' },
                { fetch_format: 'auto' }
            ]
        }) : ''; // Przekształcony URL obrazu

        const note = new Note({ title, body, image: imageUrl });
        await note.save();
        res.status(201).send(note);
    } catch (error) {
        res.status(400).send({ error: 'Błąd podczas dodawania notatki', details: error });
    }
});


router.delete('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).send({ error: 'Notatka nie znaleziona' });
        }
        res.send({ message: 'Notatka usunięta', note });
    } catch (error) {
        res.status(500).send({ error: 'Błąd podczas usuwania notatki', details: error });
    }
});


router.delete('/notes/:id/clear-text', async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { title: '', body: '' },
            { new: true } // Zwraca zaktualizowaną notatkę
        );
        if (!note) {
            return res.status(404).send({ error: 'Notatka nie znaleziona' });
        }
        res.send(note);
    } catch (error) {
        res.status(500).send({ error: 'Błąd podczas czyszczenia tekstu', details: error });
    }
});




// Usuwanie zdjęcia z notatki
router.delete('/notes/:id/image', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send({ error: 'Notatka nie znaleziona' });
        }

        if (note.image) {
            const imageUrlParts = note.image.split('/');
            const imagePublicId = imageUrlParts[imageUrlParts.length - 2] + '/' + imageUrlParts[imageUrlParts.length - 1].split('.')[0];
            
            // Usunięcie zdjęcia z Cloudinary
            const cloudinaryResponse = await cloudinary.uploader.destroy(imagePublicId);
            if (cloudinaryResponse.result !== 'ok') {
                return res.status(500).send({ error: 'Błąd podczas usuwania zdjęcia z Cloudinary', details: cloudinaryResponse });
            }

            // Usunięcie ścieżki do zdjęcia z bazy danych
            note.image = '';
            await note.save();
        }

        res.send({ message: 'Zdjęcie usunięte', note });
    } catch (error) {
        res.status(500).send({ error: 'Błąd podczas usuwania zdjęcia', details: error });
    }
});





module.exports = router;
