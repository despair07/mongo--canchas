const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');

// 1. Mostrar todas las reservas hechas para el día “2025-05-10”.
router.get('/por-fecha', async (req, res) => {
  try {
    const reservas = await Reserva.find({ fecha: "2025-05-10" });
    res.json(reservas);
  } catch (error) {
    console.error('Error al obtener reservas por fecha:', error);
    res.status(500).json({ message: 'Error al obtener reservas por fecha' });
  }
});

// 2. Buscar reservas donde juegue "Los Titanes"
router.get('/los-titanes', async (req, res) => {
  try {
    const reservas = await Reserva.find({
      $or: [
        { "equipo_local.nombre": "Los Titanes" },
        { "equipo_visitante.nombre": "Los Titanes" }
      ]
    });
    res.json(reservas);
  } catch (error) {
    console.error('Error al obtener reservas para Los Titanes:', error);
    res.status(500).json({ message: 'Error al obtener reservas para Los Titanes' });
  }
});

// 3. Listar nombres de todos los usuarios que han hecho reservas
router.get('/usuarios', async (req, res) => {
  try {
    // Consultamos los usuarios que han hecho reservas
    const usuarios = await Reserva.distinct("usuario");

    // Verificamos en el log los usuarios que se obtienen
    console.log('Usuarios obtenidos:', usuarios);

    // Enviamos la respuesta
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});

// 4. Contar cuántas veces se ha reservado la “Cancha Norte”
router.get('/cancha-norte', async (req, res) => {
  try {
    const cantidad = await Reserva.countDocuments({ cancha: "Cancha Norte" });
    res.json({ total: cantidad });
  } catch (error) {
    console.error('Error al contar las reservas de la Cancha Norte:', error);
    res.status(500).json({ message: 'Error al contar las reservas de la Cancha Norte' });
  }
});

// 5. Mostrar nombres de equipos y la fecha para reservas a las 18:00
router.get('/por-hora', async (req, res) => {
  try {
    const reservas = await Reserva.find(
      { hora: "18:00" },
      {
        "equipo_local.nombre": 1,
        "equipo_visitante.nombre": 1,
        fecha: 1,
        _id: 0
      }
    );
    res.json(reservas);
  } catch (error) {
    console.error('Error al obtener reservas por hora:', error);
    res.status(500).json({ message: 'Error al obtener reservas por hora' });
  }
});

// Exportamos las rutas
module.exports = router;
