const express = require('express');
const app = express();
const Heroes = require('../models/heroes');
const {
    borrarImagen
} = require('../utils/utilidades');
const cloudinary = require('cloudinary');
const fs = require('fs-extra')
const path = require('path');

cloudinary.config({
    cloud_name: 'ddnzwfrmo',
    api_key: '751465344374982',
    api_secret: 'MNMtnqvFuL4XBiRu5LLXPtxygEA'
});

// GET ALL HEROES
app.get('/', async (req, res) => {
    try {
        const heroesDB = await Heroes.find({
            disponible: true
        });
        // res.json({
        //     ok: true,
        //     heroesDB
        // });
        res.render('home', {
            heroesDB
        });
    } catch (e) {
        res.json({
            ok: false,
            e
        });
    }
});

// ADD Heroes
app.get('/addHereos', (req, res) => {
    res.render('image_form');
});

// GET ONE HEROES
app.get('/heroesGetOne/:id', async (req, res) => {

    let id = req.params.id;
    try {
        const heroesDB = await Heroes.findById(id);
        console.log(heroesDB);
        res.render('heroeUpdate', {
            heroesDB
        });
    } catch (e) {
        res.json({
            ok: false,
            e
        });
    }

});


// INSERT HEROES
app.post('/heroes', async (req, res) => {

    let body = req.body;
    try {
        var imageUpload = await cloudinary.v2.uploader.upload(req.file.path);
        await fs.unlink(req.file.path);
    } catch (e) {
        res.json({
            ok: false,
            e,
            msj: 'problemas para borrar la imagen'
        })
    }
    try {
        const heroe = new Heroes();
        heroe.nombre = body.txtName;
        heroe.bio = body.txtBio;
        heroe.img = imageUpload.url;
        heroe.aparicion = body.txtDate;
        heroe.casa = body.ComboBox;
        await heroe.save();
        res.redirect('/');
    } catch (e) {
        res.json({
            ok: false,
            e,
            msj: 'Error al Insertar'
        })
    }
});


// UPDATE HEROES
app.post('/heroesUpdate/:id', async (req, res) => {

    let id = req.params.id;

    let body = req.body;

    try {
        var imageUpload = await cloudinary.v2.uploader.upload(req.file.path);
        await fs.unlink(req.file.path);
    } catch (e) {
        res.json({
            ok: false,
            e,
            msj: 'problemas para borrar la imagen'
        })
    }
    try {
        const heroesDB = await Heroes.findByIdAndUpdate(id, {
            nombre: body.txtName,
            bio: body.txtBio,
            img: imageUpload.url,
            aparicion: body.txtDate,
            casa: body.ComboBox
        }, {
            new: true
        });
        res.redirect('/');
    } catch (e) {
        res.json({
            ok: false,
            msj: 'Problemas para actualizar el heroes',
            e
        });
    }
});

// DELETE HEROES
app.get('/heroesD/:id', async (req, res) => {
    let id = req.params.id;
    //console.log(id);
    try {
        await Heroes.findByIdAndUpdate(id, {
            disponible: false
        });
        let resultado = {
            ok: true,
            msj: 'Se borro el Heroe con exito!!!'
        }
        res.redirect('/');

        // res.json({
        //     ok: false,
        //     heroesDBD
        // });
    } catch (e) {
        res.json({
            ok: false,
            e
        });
    }
});

//ABOUT THIS APP
app.get('/about', (req, res) => {
    res.render('about');
});

module.exports = app;