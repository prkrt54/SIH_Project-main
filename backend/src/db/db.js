import mongoose from 'mongoose';

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Mongodb connected successfully');
    })
    .catch((err) => {
        console.log('Mongodb connection error -> ', err);
    })
}

export default connectDB;