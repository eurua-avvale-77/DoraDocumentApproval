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
    entity PurchaseRequests as projection on my.PurchaseRequests;
    entity DoraForms as projection on my.DoraForms;
    entity PendingApprovables as projection on my.PendingApprovables;
    
    action getPurchaseRequest( 
        DateFrom : DateTime,
        DateTo   : DateTime,
        Realm    : String,
        ProcurementApiKey   : String ) returns PurchaseRequests;
    action getApprovables( Realm            : String,
                           ApprovalApiKey   : String) returns DoraForms;
    action createApproval( Realm            : String,
                           ApprovalApiKey   : String) returns PendingApprovables;
}

/**
 * Service used by administrators to manage InvoiceService.
 */
service AdminService {
    entity PurchaseRequests as projection on my.PurchaseRequests;
    entity DoraForms as projection on my.DoraForms;
    entity PendingApprovables as projection on my.PendingApprovables;
    
    action getPurchaseRequest(
        DateFrom : DateTime,
        DateTo   : DateTime,
        Realm    : String,
        ProcurementApiKey   : String
    ) returns PurchaseRequests;
    action getApprovables( Realm            : String,
                           ApprovalApiKey   : String) returns DoraForms;
    action createApproval( Realm            : String,
                           ApprovalApiKey   : String) returns PendingApprovables;
    }