import { getPurchaseRequest } from './lib/handlers.js';
import { getApprovables } from './lib/handlers.js';
import { createApproval } from './lib/handlers.js'
//module.exports = cds.service.impl(async function (srv) {
export default cds.service.impl(async function (srv) {
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
 


