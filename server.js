const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reservasRoutes = require('./routes/reservas');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas (reemplaza con tu URI real)
mongoose.connect('mongodb+srv://duvan:1234567f@cluster0.otqxm.mongodb.net/cancha')
  .then(() => {
    console.log('Conectado a MongoDB Atlas');
    
    // Verificación de la conexión a la base de datos
    mongoose.connection.db.listCollections().toArray(function (err, collections) {
      if (err) {
        console.error('Error al obtener colecciones:', err);
      } else {
        console.log('Colecciones disponibles:', collections); // Debes ver las colecciones de la base de datos
      }
    });
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB', err);
  });

// Rutas
app.use('/reservas', reservasRoutes);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
