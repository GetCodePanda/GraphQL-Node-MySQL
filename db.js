const Sequelize = require('sequelize');
const _ = require('lodash');
const faker = require('faker');

const config = [
    'test' , 
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
]

const db = new Sequelize(...config);

const Person = db.define('person', {
    firstName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

const Post = db.define('post' , {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Relationship:
Person.hasMany(Post);
Post.belongsTo(Person);

db.sync({force: false}).then(
    () => { 
        _.times(10 , ()=> {
            return Person.create({
                firstName: faker.name.findName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email()
            }).then((person) => {
                return person.createPost({
                    title: `Sample title by ${person.firstName}`,
                    content: `This is sample content by ${person.firstName}`,
                })
        })
        })
    }
);


module.exports = db;