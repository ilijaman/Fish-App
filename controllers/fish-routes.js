const express = require('express')

const Fish = require('../models/fish')
const router = express.Router()



router.get('/fish/new', (req, res) => {
    res.render('new.ejs')
})




router.get('/seed', async (req, res) => {
    const newFish = [
        {
            name: 'Snapper',
            img: 'https://ilovefishing.com.au/wp-content/uploads/2016/03/Snapper-under-water-shot.jpg',
            bait: 'Soft-plastics',
            locality: 'State-wide',
            minimumSize: '28cm',
            bagLimit: '10'
        },
        {
            name: 'Flathead',
            img: 'https://bassanglermag.com/wp-content/uploads/how-to-fish-for-flathead-fish.png',
            bait: 'Soft-plastics',
            locality: 'State-wide',
            minimumSize: '30cm',
            bagLimit: '5'
        },
        {
            name: 'King George Whiting',
            img: 'https://www.southernoceanexpress.com.au/wp-content/uploads/2019/03/king-george.jpg',
            bait: 'Soft-plastics',
            locality: 'State-wide',
            minimumSize: '27cm',
            bagLimit: '20'
        },
        {
            name: 'Bream',
            img: 'https://media.australian.museum/media/dd/images/Acanthopagrus_australis.width-800.bef3724.jpg',
            bait: 'Soft-plastics',
            locality: 'State-wide',
            minimumSize: '28cm',
            bagLimit: '10'
        },
        {
            name: 'Garfish',
            img: 'https://fishesofaustralia.net.au/images/image/HyporhamphAustralJohnSear.jpg',
            bait: 'Soft-plastics',
            locality: 'SE-Peninsula',
            minimumSize: 'No minimum size',
            bagLimit: '40'
        },
        {
            name: 'Squid',
            img: 'https://content.api.news/v3/images/bin/80c4a67d948fbfcb26cdab3608fdc37f',
            bait: 'Squid-jig',
            locality: 'SE-Peninsula',
            minimumSize: 'No minimum size',
            bagLimit: '10'
        },
        {
            name: 'Snook',
            img: 'https://fishesofaustralia.net.au/Images/Image/SphyraenaNovaehollandRLS.jpg',
            bait: 'Soft-plastics',
            locality: 'State-wide',
            minimumSize: '30cm',
            bagLimit: '10'
        },
        {
            name: 'Gummy-shark',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuPlFhFNvtQDEUouHOIVld11oP_cB1JIrAVw&usqp=CAU',
            bait: 'Bait',
            locality: 'State-wide',
            minimumSize: '45cm body',
            bagLimit: '12'
        },
        {
            name: 'Mackerel',
            img: 'https://fishesofaustralia.net.au/images/image/GrammatorcynBicarinatRobinLawsWall.jpg',
            bait: 'Bait',
            locality: 'SE-Peninsula',
            minimumSize: 'No minimum size',
            bagLimit: '40'
        },
        {
            name: 'Gurnard',
            img: 'https://portphillipmarinelife.net.au/images/species/speciesHero_519769.jpeg',
            bait: 'Bait',
            locality: 'State-wide',
            minimumSize: 'No minimum size',
            bagLimit: '10'
        }
    ]


    Fish
        .create(newFish)
        .then(() => {
            res.send('fish added')
        })
})


module.exports = router

