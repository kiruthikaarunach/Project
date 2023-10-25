const MongoClient = require('mongodb').MongoClient;

// Connection URL and database name
const url = 'mongodb://localhost:27017'; //  MongoDB connection URL
const dbName = 'bezkoder_db'; //  database name

// Data to insert into the 'blogposts' collection
const blogposts = [
  {
    title: 'Windsor',
    description: 'Windsor Leisure and Living',
    content: 'Windsor Essex Living and Leisure offers a vibrant mix of culture, recreation, and relaxation in the heart of Southwestern Ontario.',
    author: 'kiruthikaui2',
    time: new Date().toString(),
    published: false,
  },
  // Add more blogpost documents as needed
];

// Data to insert into the 'comments' collection
const comments = [
  {
    name: 'KiruthikaArunachalam',
    text: 'I am from India',
    blogpost: '653805d594d87270db48e7c7', // Use the ID of the corresponding blogpost document
    time: new Date().toString(),
  },
  // Add more comment documents as needed
];

// Use connect method to connect to the server
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB');

  const db = client.db(dbName);

  // Insert data into the 'blogposts' collection
  db.collection('blogposts').insertMany(blogposts, function(err, result) {
    if (err) {
      console.error('Error inserting blogposts:', err);
    } else {
      console.log(`${result.insertedCount} blogpost documents inserted`);
    }
  });

  // Insert data into the 'comments' collection
  db.collection('comments').insertMany(comments, function(err, result) {
    if (err) {
      console.error('Error inserting comments:', err);
    } else {
      console.log(`${result.insertedCount} comment documents inserted`);
    }

    // Close the connection
    client.close();
  });
});
