const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  usuario: String,
  fecha: String,
  hora: String,
  cancha: String,
  equipo_local: {
    nombre: String,
    jugadores: [String]
  },
  equipo_visitante: {
    nombre: String,
    jugadores: [String]
  }
});

module.exports = mongoose.model('reservas', reservaSchema, 'reservas');

