import { OperationalProcurementSynchronousApi } from '../../src/generated/procurement_reporting_details_v2/';
import { apiRequest } from "./apiClient.js"
const { DateTime } = require('@sap/cds/lib/core/classes');


async function getPurchaseRequest(req) {

    try {
        // Call For Ariba Requisition Custom View
        const { PurchaseRequests } = this.entities;
        const { DoraForms} = this.entities;
        const procuremtentparams = []//'realm=ania-1-t';
        const formparams = []//'$filter= ApprovedState eq 1';
        const destination = 'AribaRequisitionCustomViewDora';
        //const uniqueAttachmentId = '123456789'
        const procuremtentEndpoint = 'procurement-reporting-details/v2/prod/views/RequisitionCustomViewDORA?realm=ania-1-t'
        const formsEndpoint = 'procurement-reporting-details/v2/prod/views/FormExtensionCustomView?realm=ania-1-t&$filter=ApprovedState eq 1'
        const body = [];
        const method = 'GET';
        const apikey = 'u1V2UNOXqCQJQYWdlXlMut0uavLOE2A8';
        //const responseData = await AttachmentDownOperationalProcurementSynchronousApi.fileDownloadWithUniqueId(uniqueAttachmentId, { realm: myRealm }).execute({ destinationName: myDestinationName });
        const Requisitions = await apiRequest(destination,method, procuremtentEndpoint , body, procuremtentparams, apikey );
       // const responseData = await OperationalProcurementSynchronousApi.getDetails(viewTemplateName, { realm: myRealm }).execute({ destinationName: myDestinationName });
        const Forms = await apiRequest(destination, method, formsEndpoint , body, formparams, apikey );
        
        const LtRequisitions = [];
        const LtForms = [];
        
            if (Requisitions.Records) {                               
            Requisitions.Records.forEach(Requisition => {
                LtRequisitions.push({
                    UniqueName     : Requisition.UniqueName,
                    ApprovedState  : Requisition.ApprovedState,
                    DoraFormID     : Requisition.DoraFormID,
                });
            });
          };

            if (Forms.Records) {                                  
            Forms.Records.forEach(Form => {
                LtForms.push({
                    UniqueName     : Form.UniqueName,
                    ApprovedState  : Form.ApprovedState,  
                });
            });
          };
      
           await UPSERT.into(PurchaseRequests).entries(LtRequisitions);
           await UPSERT.into(DoraForms).entries(LtForms);

           return LtForms, LtRequisitions;

    } catch (err) {
        req.error(err.code, err.message);
    }
}

async function getDoraForms(req) {
  try{
 
    
  
  return LtIds; 
    } catch (err) {
        req.error(err.code, err.message);
    }
}

async function createApproval(req) {
  try{
   
  return LtIds; 
    } catch (err) {
        req.error(err.code, err.message);
    }
}


module.exports = {
    getPurchaseRequest,
    getDoraForms,
    createApproval
}