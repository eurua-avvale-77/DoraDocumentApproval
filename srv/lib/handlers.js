import { OperationalProcurementSynchronousApi } from '../../src/generated/procurement_reporting_details_v2/';
import { apiRequest } from "./apiClient.js"
const { DateTime } = require('@sap/cds/lib/core/classes');


async function getPurchaseRequest(req) {

    try {
        // Call For Ariba Requisition Custom View
        const { PurchaseRequests } = this.entities;
        const { DoraForms} = this.entities;
        const DateInterval = {"updatedDateFrom" : req.data.DateFrom,
                              "updatedDateTo" : req.data.DateTo} /*{"createdDateFrom" : req.data.DateFrom,
                              "createdDateTo" : req.data.DateTo}*/

        const procfilter = DateInterval//'createdDateFrom ge ' +  req.data.DateFrom  +  ' and createdDateTo le '  + req.data.DateTo 
        const procuremtentparams = {realm : 'ania-1-t',
                                    filters : JSON.stringify(procfilter)}//'realm=ania-1-t';
        const formfilter = DateInterval//'createdDateFrom ge ' + '"' + req.data.DateFrom + '"' +  ' and createdDateTo le ' + '"' + req.data.DateTo + '"'                            
        const formparams = {realm : 'ania-1-t',
                               filters : JSON.stringify(formfilter)}//'$filter= ApprovedState eq 1';
        const destination = 'AribaRequisitionCustomViewDora';
        //const uniqueAttachmentId = '123456789'
        const procuremtentEndpoint = 'procurement-reporting-details/v2/prod/views/RequisitionCustomViewDORA'
        const formsEndpoint = 'procurement-reporting-details/v2/prod/views/DynamicFormExtensionCustomView'
        const body = [];
        const method = 'GET';
        const apikey = 'u1V2UNOXqCQJQYWdlXlMut0uavLOE2A8';
        //const responseData = await AttachmentDownOperationalProcurementSynchronousApi.fileDownloadWithUniqueId(uniqueAttachmentId, { realm: myRealm }).execute({ destinationName: myDestinationName });
        const Requisitions = await apiRequest(destination,method, procuremtentEndpoint , body, procuremtentparams, apikey );
       // const responseData = await OperationalProcurementSynchronousApi.getDetails(viewTemplateName, { realm: myRealm }).execute({ destinationName: myDestinationName });
        const Forms = await apiRequest(destination, method, formsEndpoint , body, formparams, apikey );
        
        const LtRequisitions = [];
        const LtForms = [];
        
            if (Requisitions) {                               
            Requisitions.forEach(Requisition => {
                LtRequisitions.push({
                    UniqueName     : Requisition.UniqueName,
                    ApprovedState  : Requisition.ApprovedState,
                    DoraFormID     : Requisition.cus_DoraFormCode,
                });
            });
          };

            if (Forms) {                                  
            Forms.forEach(Form => {
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

async function getApprovables(req) {
  try{
  // Call For Ariba Requisition Custom View
        const { PendingApprovables } = this.entities;
        const pendingparams = {realm : 'ania-1-t',
                               $filter : "user eq 'verificabtp.dora' and approvableType eq 'requisitions'"}//'realm=ania-1-t'?realm=ania-1-t&$filter=user eq 'dfossati' and approvableType eq 'requisitions'";
        const destination = 'AribaPendingApprovables';
        //const uniqueAttachmentId = '123456789'
        const pendingEndpoint = "approval/v2/prod/pendingApprovables"
        const body = [];
        const method = 'GET';
        const apikey = 'j3yhapiWaEpssnAa4WdxtroVqKWhOIyP';
        //const responseData = await AttachmentDownOperationalProcurementSynchronousApi.fileDownloadWithUniqueId(uniqueAttachmentId, { realm: myRealm }).execute({ destinationName: myDestinationName });
        const Pending = await apiRequest(destination, method, pendingEndpoint , body, pendingparams, apikey );
    
        const LtApprovables = [];
        
        if (Pending) {                               
            Pending.forEach(Pending => {
                LtApprovables.push({
                    approvableId     : Pending.approvableId,
                    approvableUniqueName  : Pending.approvableUniqueName,
                });
            });
          };

        await UPSERT.into(PendingApprovables).entries(LtApprovables);

  return LtApprovables; 
    } catch (err) {
        req.error(err.code, err.message);
    }
}

async function createApproval(req) {
  try{
    const { PendingApprovables } = this.entities;
    const { PurchaseRequests } = this.entities;
    const { DoraForms } = this.entities;
    const Approvals = await SELECT.from(PendingApprovables)//.where('status =', 'Readed')
    let body = [];
    let state = [];
    let message = [];
    let visibleFlag = [];
    let LtApprovables = [];

    for (const Approval of Approvals) {

        const PurchaseRequest = await SELECT.from(PurchaseRequests).where('UniqueName =', Approval.approvableUniqueName)

        if (PurchaseRequest[0].DoraFormID) {
            const DoraForm = await SELECT.from(DoraForms).where('UniqueName =', PurchaseRequest[0].DoraFormID)

            if (DoraForm.ApprovedState = '4'){
              state = "approve";
              message =  "Step Dora Approvato";
              visibleFlag = true
            } else {
              state = "deny";
              message =  "Assicurarsi che il questionario Dora sia stato Approvato";
              visibleFlag = true
            }
        } else {
              state = "deny";
              message =  "Assicurarsi che il questionario Dora sia stato Approvato";
              visibleFlag = true
        }
         const Updateparams = {realm : 'ania-1-t',
                               user  : 'verificabtp.dora',
                               passwordAdapter : "ThirdPartyUser"}//'realm=ania-1-t'?realm=ania-1-t&$filter=user eq 'dfossati' and approvableType eq 'requisitions'";
         const destination = 'AribaPendingApprovables';
                //const uniqueAttachmentId = '123456789'
         const UpdateEndpoint = "approval/v2/prod/requisitions/"+ Approval.approvableId
         const method = 'PATCH';
         const apikey = 'j3yhapiWaEpssnAa4WdxtroVqKWhOIyP';
        body = {
                    "state": state,
                    "comment": {
                                "text": message,
                                "visibleToSupplier": visibleFlag
                                        }
                    };
         const ApprovableUpdate = await apiRequest(destination, method, UpdateEndpoint , body, Updateparams, apikey )

          
         LtApprovables.push({
                    approvableId     : Approval.approvableId,
                    approvableUniqueName  : Approval.approvableUniqueName,
                    status: state,
                    message : message
                });

        /* await UPDATE(PendingApprovables)
                     .set({ status: state,
                            message : message
                      })
                     .where({ UniqueName: Approval.approvableId });*/


    }
  
  await UPSERT.into(PendingApprovables).entries(LtApprovables);
  
  return LtApprovables; 
  
    } catch (err) {
        req.error(err.code, err.message);
    }
}


module.exports = {
    getPurchaseRequest,
    getApprovables,
    createApproval
}