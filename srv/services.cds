using { sap.ania.DoraDocumentAppr as my } from '../db/schema';

/**
 * Service used by support personell, i.e. the InvoiceService' 'processors'.
 */
service ProcessorService { 
    /*@Capabilities : { 
            Insertable : true,
            Updatable : false,
            Deletable : false
     }*/
    entity PurchaseReqests as projection on my.PurchaseReqests;
    entity DoraForms as projection on my.DoraForms;
    entity PendingApprovables as projection on my.PendingApprovables;
    
    action getPurchaseRequest() returns PurchaseReqests;
    action getDoraForms() returns DoraForms;
    action createApproval() returns PendingApprovables;
}

/**
 * Service used by administrators to manage InvoiceService.
 */
service AdminService {
    entity PurchaseReqests as projection on my.PurchaseReqests;
    entity DoraForms as projection on my.DoraForms;
    entity PendingApprovables as projection on my.PendingApprovables;
    
    action getPurchaseRequest() returns PurchaseReqests;
    action getDoraForms() returns DoraForms;
    action createApproval() returns PendingApprovables;
    }