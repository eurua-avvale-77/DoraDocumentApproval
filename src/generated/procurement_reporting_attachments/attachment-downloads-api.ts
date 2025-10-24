/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
/**
 * Representation of the 'AttachmentDownloadsApi'.
 * This API is part of the 'procurement_reporting_attachments' service.
 */
export const AttachmentDownloadsApi = {
  _defaultBasePath: undefined,
  /**
   * To download an attachment, use this endpoint and pass the value of the uniqueAttachmentId field for the desired attachment, which you will find in the attachment's entry in the response Attachments block.
   * @param uniqueAttachmentId - uniqueAttachmentId value which is provided as part of attachment data in sync/async API
   * @param queryParameters - Object containing the following keys: realm.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  fileDownloadWithUniqueId: (
    uniqueAttachmentId: string,
    queryParameters: { realm: string }
  ) =>
    new OpenApiRequestBuilder<string | any>(
      'get',
      '/attachment/{uniqueAttachmentId}',
      {
        pathParameters: { uniqueAttachmentId },
        queryParameters
      },
      AttachmentDownloadsApi._defaultBasePath
    ),
  /**
   * For documents retrieved before the uniqueAttachmentId was added, you can use this endpoint to specify what attachment you wish to download using the document ID and an associated attachment ID.
   * @param queryType - specifies the document type of the historical document whose attachment you wish to retrieve. Possible values are<br/> invoices<br/> requisitions<br/> receipts<br/> directOrders<br/> copyOrders<br/> ERPOrders<br/> invoiceReconciliations<br/>
   * @param approvableId - the unique identifier specifying the historical document whose attachment you wish to retrieve, which you can get from the document's UniqueName field.
   * @param attachmentId - specifies which attachment you wish to retrieve from the specified document. You can get this ID from the id field of the document to which the attachment is attached.
   * @param queryParameters - Object containing the following keys: realm.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  fileDownloadWithApprovableAndAttachmentId: (
    queryType: string,
    approvableId: string,
    attachmentId: string,
    queryParameters: { realm: string }
  ) =>
    new OpenApiRequestBuilder<string | any>(
      'get',
      '/{queryType}/{approvableId}/attachments/{attachmentId}',
      {
        pathParameters: { queryType, approvableId, attachmentId },
        queryParameters
      },
      AttachmentDownloadsApi._defaultBasePath
    )
};
