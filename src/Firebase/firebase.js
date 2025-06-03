const express = require('express');
const router = express.Router();
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, deleteDoc, setDoc } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyDc00TcReFTGUnYZvBNUN9njTsekCJxwxg",
    authDomain: "decanato-f66d0.firebaseapp.com",
    projectId: "decanato-f66d0",
    storageBucket: "decanato-f66d0.appspot.com",
    messagingSenderId: "311238481768",
    appId: "1:311238481768:web:2a1f92c841bbf3c00768dd"
  };

const { app } = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

router.post('/add-profesor', (req, res) => {
    try {
      console.log('Index working');
    res.send('recibido');
    const { nombre, correo, edad, materia, cedula } = req.body;
    const profesor = {
      nombre,
      correo,
      edad,
      materia,
      cedula
    };
    console.log(profesor);
    const coleccionProfesores = collection(db, 'profesores'); // Utiliza la variable db que ya contiene la instancia de Firestore
    addDoc(coleccionProfesores, profesor)
      .then((docRef) => {
        console.log('Profesor registrado con ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error al agregar el profesor: ', error);
      });
    } catch (error) {
      throw error;
    }
  });









  module.exports = router;