const { DateTime, action } = require('@sap/cds/lib/core/classes');

const {
    getPurchaseRequest
} = require('./lib/handlers');
const {
    getDoraForms
} = require('./lib/handlers');
const {
    createApproval
} = require('./lib/handlers');

module.exports = cds.service.impl(async function (srv) {
    /*** SERVICE ENTITIES ***/
    const {
        PurchaseReqests,
        DoraForms,
        PendingApprovables
    } = this.entities;

    /*** HANDLERS REGISTRATION ***/
    this.on('getPurchaseRequest', getPurchaseRequest);
    this.on('getDoraForms', getDoraForms);
    this.on('createApproval', createApproval);

});
 


