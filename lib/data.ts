
import bcrypt from 'bcryptjs';

const data = {

    users:[
        {
            name:'Hari',
            email:'hari.prasad.dev10.gmail.com',
            password:bcrypt.hashSync('hari1234'),
            isAdmin:true,
        },
        {
            name:'Anusha',
            email:'anu10.gmail.com',
            password:bcrypt.hashSync('anu1234'),
            isAdmin:false,
        },
        
    ],



    products : [
        {
            name:'Jersey',
            slug:'jersey',
            category:'Shirts',
            image:'/images/jersey.jpeg',
            price:99,
            brand:'Nike',
            rating:4.7,
            numReviews:8,
            countInStock:22,
            description:'A Popular Nike Jersey for Soccer',
            isFeatured:true,
            banner:'/images/jersey.jpeg',

        },
        {
            name:'Adidas 3700',
            slug:'adidas_shoe',
            category:'Shoes',
            image:'/images/shoe.jpg',
            price:499,
            brand:'Adidas',
            rating:4.3,
            numReviews:3,
            countInStock:15,
            description:'A Training and Gym shoes',
            isFeatured:true,
            banner:'/images/shoe.jpg',

        },
        {
            name:'RCB Mens IPL Jersey',
            slug:'rcb_men',
            category:'Shirts',
            image:'/images/rcb.jpeg',
            price:1599,
            brand:'Nike',
            rating:4.8,
            numReviews:19,
            countInStock:25,
            description:'IPL Match Jersey for RCB Mens in 2024',
            isFeatured:true,
            banner:'/images/rcb.jpeg',

        },
        {
            name:'Raymonds Trousers',
            slug:'raymond_pant',
            category:'Pants',
            image:'/images/pant.jpg',
            price:1999,
            brand:'Raymond',
            rating:4.6,
            numReviews:4,
            countInStock:28,
            description:'Formal/Party wear Trousers for Men from Raymonds',
            isFeatured:true,
            banner:'/images/pant.jpg',

        },
    ],
}

export default data;