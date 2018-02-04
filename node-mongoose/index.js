const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url ='localhost:27071/conFusion';
 const connect = mongoose.connect(url ,{

 });

connect.then((db) =>{
    console.log('Connected correctly to server');

    Dishes.create({
        name: 'Uthappizza',
        description: 'Test'
    })
        .then((dish) => {
            console.log(dish);
            return Dishes.findByIdAndUpdate(dish._id,{
                $set: {description: 'Updated Test'}
            }, {
                new: true
            }).exec();
     })
     .then((dish) => {
         console.log(dish);

         dish.comment.push({
            rating: 2,
            comment: 'I\'m getting bad feeling',
            author: 'Leo' 
         });
         return dish.save();
     })
     .then((dish) => {
         console.log(dish);
         return db.collection('dishes').drop();
     })
     .then(() => {
         return db.close();
     })
     .catch((err) => {
         console.log(err);
     })
});