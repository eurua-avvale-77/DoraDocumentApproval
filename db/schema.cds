using { cuid } from '@sap/cds/common'; 
namespace sap.ania.DoraDocumentAppr;

entity PurchaseReqests {
  key UniqueName : String;
  ApprovedState  : String;
  DoraFormID     : LargeString;          
}
entity DoraForms : cuid {
 key UniqueName : String;
  ApprovedState  : String;
  };

entity PendingApprovables : cuid {
 key approvableId         : String;
     approvableUniqueName : String;
     createdAt     : Timestamp;         
     status        : String;          
     sendedAt      : Timestamp;
     message       : String;
  };

