const { MongoClient } = require('mongodb');
const fs = require('fs');

async function main() {
    const uri = "mongodb://localhost:27017";  // URL do lokalnego MongoDB
    const client = new MongoClient(uri);

    try {
        // Połącz się z serwerem MongoDB
        await client.connect();
        console.log("Połączono z MongoDB!");
        // Wybierz bazę danych (jeśli nie istnieje, zostanie utworzona)
        const db = client.db('mojaBazaDanych');
        // Wybierz kolekcję (jeśli nie istnieje, zostanie utworzona)
        const collection = db.collection('mojaKolekcja');
          // Usuń wszystkie dokumenty z kolekcji
          await collection.deleteMany({});
          console.log("Usunięto wszystkie dokumenty z kolekcji.");
          const character1 = {
            name: 'John',
            age: 30,
            friends: [
                { name: 'Alice', age: 25 },
                { name: 'Bob', age: 28 }
            ],
        };
        // Dodaj pierwszą postać do kolekcji MongoDB
        const result1 = await collection.insertOne(character1);
        console.log('Dodano pierwszą postać:', result1.insertedId);
        // Druga postać
        const character2 = {
            name: 'Jane',
            age: 28,
            // photo: encodedImage
        };
        // Dodaj drugą postać do kolekcji MongoDB
        const result2 = await collection.insertOne(character2);
        console.log('Dodano drugą postać:', result2.insertedId);
        // Pobierz wszystkie dokumenty z kolekcji
        const documents = await collection.find({}).toArray();
         console.log('Dokumenty w kolekcji:', documents);
    } catch (err) {
        console.error(err);
    } 
    finally {
        // Zamknij połączenie z MongoDB
        await client.close();
    }
}

main().catch(console.error);