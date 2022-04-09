const mongoose = require('mongoose');
const {nanoid} = require("nanoid");
const config = require("./config");
const User = require("./models/User");
const Image = require("./models/Image");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user, admin] = await User.create({
        email: 'user@gmail.com',
        displayName: 'user',
        password: '123',
        token: nanoid(),
        role: 'user',
        avatar: 'user.png',
    }, {
        email: 'admin@gmail.com',
        displayName: 'admin',
        password: '123',
        token: nanoid(),
        role: 'admin',
        avatar: 'user.png',
    });

    await Image.create({
            user: user,
            name: 'Travel photo',
            image: 'travel.jpeg',
        }, {
            user: admin,
            name: 'Highway',
            image: 'highway.jpeg',
        }, {
            user: user,
            name: 'Nature',
            image: 'nature.jpeg',
        },{
            user: admin,
            name: 'Lake',
            image: 'lake.jpeg',
        },{
            user: admin,
            name: 'The Most',
            image: 'most.jpeg',
        },{
            user: user,
            name: 'Sunbeam',
            image: 'sunbeam.jpeg',
        }
    );

    await mongoose.connection.close();
};

run().catch(e => console.error(e));