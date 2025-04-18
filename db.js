const mongooes = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/'

const connectToMongo = async () => {
    try {
        await mongooes.connect(mongoURI);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
};

module.exports = connectToMongo;