using { cuid, managed } from '@sap/cds/common'; 
namespace sap.ania.DoraDocumentAppr;

entity PurchaseRequests : managed {
  key UniqueName : String;
  ApprovedState  : String;
  DoraFormID     : LargeString;          
}
entity DoraForms : managed {
 key UniqueName : String;
  ApprovedState  : String;
  };

entity PendingApprovables: managed {
 key approvableId         : String;
     approvableUniqueName : String;
     status        : String;
     message       : String;
     /*createdAt     : Timestamp;         
              
     sendedAt      : Timestamp;
     */
  };

