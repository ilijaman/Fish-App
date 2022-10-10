const express = require('express')
const ensureLogin = require('connect-ensure-login')

const upload = require('../middlewares/upload')
const Fish = require('../models/fish')
const router = express.Router()

router.use(ensureLogin.ensureLoggedIn())


//Index route

router.get('/fish', async (req, res) => {
    const fish = await Fish.find()
    console.log(req.session)
    res.render('index.ejs', {
        fish: fish,
        tabTitle: 'Home'
    })
})



//New route

router.get('/fish/new', (req, res) => {
    res.render('new.ejs')
})


//Create route

router.post('/fish', upload.single('image'), async (req, res) => {
    try {
        console.log(req.file)
        req.body.imageURL = req.file.path
        await Fish.create(req.body)
        req.flash('success', 'Fish added')
        res.redirect('/fish')
    }
    catch (error) {
        req.flash('error', 'this cannot be added')
        res.redirect('/fish/new')
    }
})


//Edit route

router.get('/fish/:id/edit', async (req, res) => {
    const fish = await Fish.findById(req.params.id)
    res.render('edit.ejs', {
        fish: fish,
        tabTitle: `Update: ${fish.name}`
    })
})


//Update route

router.put('/fish/:id', async (req, res) => {
    const fish = await Fish.findByIdAndUpdate(req.params.id, req.body,
        { new: true }
    )
    console.log('updated fish', fish)
    res.redirect('/fish')
})



//Confirm-delete route

router.get('/fish/:id/delete', (req, res) => {
    const id = req.params.id
    res.render('delete.ejs', {
        id: id, 
        tabTitle: 'delete',
    })
})


//Delete route

router.delete('/fish/:id', async (req, res) => {
    const fish = await Fish.findByIdAndRemove(req.params.id)
    console.log('Deleted fish', fish)
    res.redirect('/fish')
})


//Show route

router.get('/fish/:id', async (req, res) => {
    const fish = await Fish.findById(req.params.id)
    res.render('show.ejs', {
        fish: fish,
        tabTitle: fish.name
    })
  })


module.exports = router






router.get('/seed', async (req, res) => {
    const newFish = [
        {
            name: 'Snapper',
            img: 'https://ilovefishing.com.au/wp-content/uploads/2016/03/Snapper-under-water-shot.jpg',
            bait: ['Soft-plastics', 'Pilchards','Squid', 'Prawn', 'Worms', 'Chicken', 'Pipis'],
            locality: ['State-wide'],
            minimumSize: '28cm',
            bagLimit: '10'
        },
        {
            name: 'Flathead',
            img: 'https://bassanglermag.com/wp-content/uploads/how-to-fish-for-flathead-fish.png',
            bait: ['Soft-plastics', 'Prawn', 'Squid', 'Pilchards'],
            locality: ['State-wide'],
            minimumSize: '30cm',
            bagLimit: '5'
        },
        {
            name: 'King George Whiting',
            img: 'https://www.southernoceanexpress.com.au/wp-content/uploads/2019/03/king-george.jpg',
            bait: ['Squid', 'Prawn', 'Pipis'],
            locality: ['South-east Peninsula', 'Greater Geelong Area', 'Westernport'],
            minimumSize: '27cm',
            bagLimit: '20'
        },
        {
            name: 'Bream',
            img: 'https://media.australian.museum/media/dd/images/Acanthopagrus_australis.width-800.bef3724.jpg',
            bait: ['Soft-plastics', 'Bread', 'Chicken'],
            locality: ['State-wide'],
            minimumSize: '28cm',
            bagLimit: '10'
        },
        {
            name: 'Garfish',
            img: 'https://fishesofaustralia.net.au/images/image/HyporhamphAustralJohnSear.jpg',
            bait: ['Maggots', 'Silverfish', 'Prawn'],
            locality: ['South-East Peninsula', 'Port Melbourne', 'Greater Geelong Area'],
            minimumSize: 'No minimum size',
            bagLimit: '40'
        },
        {
            name: 'Squid',
            img: 'https://content.api.news/v3/images/bin/80c4a67d948fbfcb26cdab3608fdc37f',
            bait: ['Squid-jig', 'Silver-whiting'],
            locality: ['South-East Peninsula', 'Mount Martha rocks', 'Greater Geelong Area', 'Westernport'],
            minimumSize: 'No minimum size',
            bagLimit: '10'
        },
        {
            name: 'Gummy-shark',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuPlFhFNvtQDEUouHOIVld11oP_cB1JIrAVw&usqp=CAU',
            bait: ['Salmon', 'Squid', 'Pilchard'],
            locality: ['State-wide'],
            minimumSize: '45cm body',
            bagLimit: '12'
        },
        {
            name: 'Mackerel',
            img: 'https://fishesofaustralia.net.au/images/image/GrammatorcynBicarinatRobinLawsWall.jpg',
            bait: ['Silverfish', 'Baitfish', 'Sabiki'],
            locality: ['SE-Peninsula'],
            minimumSize: 'No minimum size',
            bagLimit: '40'
        },
        {
            name: 'Cuttlefish',
            img: 'https://portphillipmarinelife.net.au/images/species/species_389903.jpeg',
            bait: ['Squid-jig', 'Silver-whiting'],
            locality: ['SE-Peninsula', 'Westernport'],
            minimumSize: 'No minimum size',
            bagLimit: '10'
        },
        {
            name: 'Leatherjacket',
            img: 'https://portphillipmarinelife.net.au/images/species/speciesHero_417890.jpeg',
            bait: 'Bait',
            locality: ['SE-Peninsula', 'Greater Geelong Area'],
            minimumSize: 'No minimum size',
            bagLimit: '20'
        },
        {
            name: 'Australian Salmon',
            img: 'https://portphillipmarinelife.net.au/images/species/speciesHero_519731.jpeg',
            bait: ['Metal lures', 'Soft-plastics', 'Pilchards', 'Squid', 'Prawn'],
            locality: ['Statewide'],
            minimumSize: '21cm',
            bagLimit: '20'
        },


    ]


    Fish
        .create(newFish)
        .then(() => {
            res.send('fish added')
        })
})


module.exports = router

