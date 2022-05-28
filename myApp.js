require('dotenv').config();
mongoose = require("mongoose");
let Person;

try {
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//console.log(mongoose);
}catch(error){
  console.log(error);
}
const Schema  = mongoose.Schema;

const personSchema = new Schema ({
   name: { type: String, required : true },
   age: Number,
   favoriteFoods: [ String ]  
})

Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let marco = new Person ({name: 'Marco', age: 52 , favoriteFoods: ['Pabellon','Àrepa','Cachapa']});
   marco.save((err,data) => {
     if (err) return console.log(err);
     done(null , data );
   });
};

let arrayOfPeople = [
  {name: 'Marco', age: 52 , favoriteFoods: ['Pabellon','Àrepa','Cachapa']},
  {name: 'Leonardo', age: 11 , favoriteFoods: ['Pizza','Àrepa','Pasta']},
  {name: 'Erika', age: 50 , favoriteFoods: ['Paella','Parrilla','Empanada']}
];

const createManyPeople = (arrayOfPeople, done) => {
    Person.create( arrayOfPeople, (err, person )  => {
      if (err) return console.log(err); 
      done (null, person);
    })    
}; 


const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err , people) => {
    if (err) return console.log(err);
    done(null, people);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne( { favoriteFoods : food }, (err, person) => {
    if (err) return console.log(err)
    done(null, person)
  })
};

const findPersonById = (personId, done) => {
  Person.findById( { _id : personId }, (err, person) => {
    if (err) return console.log(err);
    done(null, person);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById( personId , (err, person) => {
    if (err) console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save( (err, personUpdated ) => {
      if (err) console.log(err);
      done(null, personUpdated)
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
   Person.findOneAndUpdate( { name : personName }, { age: ageToSet }, { new : true } , (err, personUpdated) => {
     if (err) return console.log(err);
     done (null, personUpdated);
   })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId , (err, personRemoved ) => {
    if (err) return console.log(err);
    done( null, personRemoved);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove( { name: nameToRemove }, (err, peopleRemoved ) => {
    if (err) return console.log(err);
    done( null, peopleRemoved );
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  query  = Person.find( { favoriteFoods : foodToSearch });
  query.sort( { name: 1 } );
  query.limit(2);
  query.select( { age: 0 })
  query.exec((err, peopleFound) => {
    if (err) console.log( err );
    done( null , peopleFound);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
