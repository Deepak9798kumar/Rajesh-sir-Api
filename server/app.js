const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();
app.use(cors())
app.use(bodyParser.json());

const connectionSchema = new mongoose.Schema({
    username: String,
    password: String,
    dbName: String,
    clusterURL: String
});

const Connection = mongoose.model('Connection', connectionSchema);

app.post('/connect-mongodb', async (req, res) => {
    const { username, password, dbName, clusterURL } = req.body;

    try {
        const uri = `mongodb+srv://${username}:${password}@${clusterURL}/${dbName}?retryWrites=true&w=majority`;
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB');

        const connectionDetails = new Connection({
            username,
            password,
            dbName,
            clusterURL
        });

        await connectionDetails.save();

        console.log('Connection details saved to the database');

        res.json({ success: true, message: 'Connected to MongoDB and connection details saved' });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        res.status(500).json({ success: false, message: 'Failed to connect to MongoDB' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
