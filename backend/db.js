const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://gofood:mern123@cluster0.awajxhf.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0"
mongoose.set('strictQuery', false);
const mongodb = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Connected to MongoDB');

    fetchData();
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error);
  }
};

async function fetchData() {
  try {
    const fetched_data = mongoose.connection.db.collection("food_items");      // to fetch data from the database 
    fetched_data.find({}).toArray(async function (err, data) {
      const foodCategory = await mongoose.connection.db.collection("foodCategory");
      foodCategory.find({}).toArray(function (err, catData) {
        if (err) console.log(err);
        else {
          // use of global variable in javascript
            global.food_items = data;
            global.foodCategory = catData;

        }
        // console.log(global.food_items);
      })
    })
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

module.exports = mongodb;