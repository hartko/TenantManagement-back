/*Tenant database config*/
const mongoose = require('mongoose');

const { Schema } = mongoose;

const tenantSchema = new Schema(
    // any - don't have to define the attributes
    { any: {}  },
    // strict false - it allows to save data that is not define in the schema
    { strict: false },
    // name of the table?collection
    { collection: 'tenants' }
);

// "Tenant" name of the database
module.exports = mongoose.model('Tenant', tenantSchema);
