const { DateTime, action } = require('@sap/cds/lib/core/classes');

const {
    getPurchaseRequest
} = require('./lib/handlers');
const {
    getApprovables
} = require('./lib/handlers');
const {
    createApproval
} = require('./lib/handlers');

module.exports = cds.service.impl(async function (srv) {
    /*** SERVICE ENTITIES ***/
    const {
        PurchaseRequests,
        DoraForms,
        PendingApprovables
    } = this.entities;

    /*** HANDLERS REGISTRATION ***/
    this.on('getPurchaseRequest', getPurchaseRequest);
    this.on('getApprovables', getApprovables);
    this.on('createApproval', createApproval);

});
 


