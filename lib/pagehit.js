/*
page hit object
call count() method to increment counter and return total hits

Count data is stored in a MongoDB database named `pagehit` in the `hit` collection.
*/

'use strict';

const
  // modules
  mongo = require('mongodb'),
  httpReferrer = require('./httpreferrer'),

  // MongoDB
  dbHost = 'mongodb',
  dbPort = 27017,
  dbName = 'pagehit',
  dbUser = 'root',
  dbPass = 'mysecret',

  client = new mongo.MongoClient(
    `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

// database connection objects
let db, hit;

// connect to MongoDB database
(async () => {

  try {

    // connect to MongoDB database
    await client.connect();
    db = client.db(dbName);

    // reference to hit collection
    hit = db.collection('hit');

    // add collection index
    await hit.createIndex({ hash: 1, time: 1 });

  }
  catch (err) {
    console.log('DB error', err);
  }

})();


module.exports = class {

  // increase URL counter
  async count(req) {

    let
      hash = httpReferrer(req),
      count = null;

    if (!hash) return count;

    // fetch IP address, user agent, and time
    const
      ipRe  = req.ip.match(/(?:\d{1,3}\.){3}\d{1,3}/),
      ip    = ipRe.length ? ipRe[0] : null,
      ua    = req.get('User-Agent') || null,
      time  = new Date();

    try {

      // store page hit
      await hit.insertOne({ hash, ip, ua, time });

      // fetch page hit count
      count = await hit.countDocuments({ hash });

    }
    catch (err) {
      console.log('DB error', err);
    }

    // return counter
    return count;
  }

};
