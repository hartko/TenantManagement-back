/*this file contains routes for tenant controller only*/

/*import tenant Controller*/
const tenantBuilder = require('../controllers/TenantController');

module.exports = app => {
    app
    .route('/tenant')
    /*return list of tenants*/
    .get(tenantBuilder.index)
    /*add new tenant*/
    .post(tenantBuilder.validation('saveTenant'),tenantBuilder.insert_tenant);
    app
    .route('/tenant-db')

    /*add new tenant db*/
    .post(tenantBuilder.add_collection);

    app
    /*Params: tenant ID, pass tenant ID*/
    .route('/tenant/:tenantId')
    /*return specific tenant*/
    .get(tenantBuilder.show)
    /*update specific tenant*/
    .put(tenantBuilder.update)
    /*delete specific tenant*/
    .delete(tenantBuilder.delete);
};
