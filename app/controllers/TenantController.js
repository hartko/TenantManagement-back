/*This file contains Function related to Tenant Management
** Added By Hart <3
*/

/*imports
** Mongoose - use to connect to mongodb
*/
var helper  = require('../helpers/Helper');
var tenan  = require('../models/Tenant');
var tenant  = require('../models/User');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

// const tenantx = require('../models/Tenant');


/* Return all tenants*/
exports.index = (req, res) => {
    // From Helper.js
    // change database || database config

    // const tenant = helper.tenantConfig(req.body.database,req.body.model);
    tenan.find({}, (err, tenan) => {
        if (err) res.send(err);
        res.json({
            status: 'success',
            message: tenan,
        });
    });
};


/* Return all tenants*/
exports.insert_tenant =  function(req,res,next) {

    // for validation, see validation function
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        res.send({
            message: errors.array() ,
            status: 'failed',
        });
        return;
    }

    // save all data except confirm password
    delete req.body.confirm_password;
    // From Helper.js
    // generateTenantId function generate tenantID
    req.body.tenant_id = helper.generateTenantId();

    // From Helper.js
    // change database || database config

    var mongoDB = 'mongodb://127.0.0.1/Tenant';
    mongoose.connect(mongoDB, { useNewUrlParser: true });

    //Get the default connection
    var db = mongoose.connection;

    // console.log(tenantx.tenant);

    // console.log(helper.tenantConfig(req.body.database,req.body.model))
    const newTenant = new tenan(req.body);
    var asd = newTenant.save((err, tenan) => {
        if (err) res.send(err);
        res.send({
            status: 'success',
            message: req.body.database,
            tenant_id: req.body.tenant_id,
        });


    });


}
exports.add_collection = function(req,res,next) {



    // From Helper.js
    // change database || database config
    // From Helper.js
    // createCollection function, create collection for the new tenant
    var check_collection =  helper.createCollection(req.body.tenant_id,req.body.database,'free_db');


    if(check_collection == 'Success'){
        const tenant = helper.tenantConfig(req.body.database,req.body.tenant_id+'_users');

        // save data
        const newTenant = new tenant(req.body);
        newTenant.save((err, tenant) => {

            if (err) res.send(err);
            res.send({
                status: 'success',
                message: 'Tenant saved successfully!'
            });
        });
    }



}



/*return specific tenant, pass tenant ID*/
exports.show = (req, res) => {
    // From Helper.js
    // change database || database config
    // const tenant = helper.tenantConfig(req.body.database,req.body.tenant_id+'_user');

    tenan.findOne({ tenant_id: req.params.tenantId }, (err, tenan) => {
        if (err) res.send(err);
        res.json({
            status: 'success',
            message: tenan
        });
    });
};

/*update tenant info, pass tenant ID*/
exports.update = (req, res) => {

    // const tenant = helper.tenantConfig(req.body.database,req.body.tenant_id+'_user');
    tenan.findOneAndUpdate(
        { tenant_id: req.body.tenant_id },
        req.body,
        { new: true },
        (err, tenan) => {
            if (err) res.send(err);
            res.json({
                message: 'Tenant successfully updated',
                status: 'success'});
            }
        );
    };

    /*delete tenant, pass tenant ID*/
    exports.delete = (req, res) => {
        tenant.deleteOne({ _id: req.params.tenantId }, err => {
            if (err) res.send(err);
            res.json({
                message: 'tenant successfully deleted',
                _id: req.params.tenantId
            });
        });
    };

    /**
    * Tenant Validation
    */
    exports.validation = (method) =>{

        switch (method) {

            case 'saveTenant':{

                return [

                    body('company_name', 'Company name is required!').not().isEmpty(),
                    body('first_name', 'Firstname is required!').not().isEmpty(),
                    body('last_name', 'Lastname is required!').not().isEmpty(),
                    body('email', 'Valid email is required!').not().isEmpty().isEmail(),
                    body('link','Link is required!').not().isEmpty(),
                    body('account_type','Account type is Required!').not().isEmpty(),
                    body('password','Password is Required!').not().isEmpty(),
                    body('confirm_password','Confirm password is Required!').not().isEmpty(),
                    body('confirm_password', 'Passwords do not match!').custom((value, {req}) => (value === req.body.password)),
                    body('password','Password must contain at least one letter, one number and at between 6-20 characters.').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/),
                ]


            }


        }


    };
