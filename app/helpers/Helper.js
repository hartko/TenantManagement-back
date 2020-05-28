/*import Tenant Model*/
const mongoose = require('mongoose');

const { Schema } = mongoose;



/*Config for changing database*/
var tenantConfig = function(database,model) {
     mongoose.createConnection(
        database,
        { useNewUrlParser: true,

        }
    );
    mongoose.connection;

    const tenantSchema = new Schema(
        // any - don't have to define the attributes
        { any: {}  },
        // strict false - it allows to save data that is not define in the schema
        { strict: false },
        // name of the table?collection
        { collection: model }
    );

    const tenant = mongoose.model(model,tenantSchema);
    // mongoose.model('profile',tenantSchema);
    // mongoose.model('schedule',tenantSchema);

    return tenant;
};

/*Tenant generate ID*/

var generateTenantId = function(){

    let today = new Date();

    let year = ("0" + today.getDate()).slice(-2);
    // current month
    let month = ("0" + (today.getMonth() + 1)).slice(-2);

    // current date
    // adjust 0 before single digit date
    let date = ("0" + today.getDate()).slice(-2);


    // current hours
    let hours = today.getHours();

    // current minutes
    let minutes = today.getMinutes();

    // current seconds
    let seconds = today.getSeconds();

    // current date to milliseconds
    let milliseconds = today.getMilliseconds()
    // concatinate
    let tenantId = year+month+date+hours+minutes+seconds+milliseconds;


    return tenantId;

}

/* Create collection for new tenant*/

var createCollection = function(tenant_id,url,db){

    var MongoClient = require('mongodb').MongoClient;

    //make client connect
    MongoClient.connect(url, function (err, client) {
        var db = client.db(db);
        if (err) throw err;

        const arr = ['profiles', 'schedules'];
        arr.forEach(element => {
            db.createCollection(tenant_id+"_"+element, function (err, res) {
                if (err) throw err;
                // client.close();

            });
        });
        // db.collection(tenant_id+"_users").insertOne(
        //     { "database": "mongodb://localhost:27017/Tenant",
        //     "model": "user",
        //     "tenant_id": "200520235017337"},
        //     {
        //
        //     }
        // )

    });

    return 'Success';

}





module.exports = {
    tenantConfig,
    generateTenantId,
    createCollection

}
