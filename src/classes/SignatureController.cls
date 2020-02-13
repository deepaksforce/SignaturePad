/**
 * Created by Deepak Singh on 8/2/2019.
 */

public with sharing class SignatureController {
  
    @AuraEnabled
    public static String saveSignature(String recordId, String b64SignData) {
        try {  
            Attachment attachment = new Attachment();
            //You will want to tie your attachment to some type of custom or standard object
            attachment.ParentId = recordId;
            attachment.Name = 'Signature_' + String.valueOf(Date.today()).substring(0, 10);
            attachment.Body = EncodingUtil.base64Decode(b64SignData);
            system.debug('Body' + attachment.Body);
            //If we were saving a PDF as an attachment the ContentType would be 'pdf'
            attachment.contentType = 'image/jpeg';

            insert attachment;

           /* b64SignData = EncodingUtil.urlDecode(b64SignData, 'UTF-8');
            ContentVersion conVer = new ContentVersion();
            conVer.ContentLocation = 'S'; // S specify this document is in SF, use E for external files
            conVer.PathOnClient = 'Signature_.png'; // The files name, extension is very important here which will help the file in preview.
            conVer.Title = 'Signature_' + String.valueOf(Date.today()) + Datetime.now().getTime();
            conVer.VersionData = EncodingUtil.base64Decode(b64SignData); // converting your binary string to Blog
            insert conVer;
            // First get the content document Id from ContentVersion
            Id conDoc = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:conVer.Id].ContentDocumentId;

            //Create ContentDocumentLink
            ContentDocumentLink cDe = new ContentDocumentLink();
            cDe.ContentDocumentId = conDoc;
            cDe.LinkedEntityId = recordId; // you can use objectId,GroupId etc
            cDe.ShareType = 'I'; // Inferred permission, checkout description of ContentDocumentLink object for more details
            //cDe.Visibility = 'InternalUsers';
            insert cDe;
*/
            return '';
        } catch(Exception ex) {
            String errorMessage = ex.getMessage();
            Integer occurrence;
            if(ex.getMessage().contains('FIELD_CUSTOM_VALIDATION_EXCEPTION')) {
                occurrence = errorMessage.indexOf('FIELD_CUSTOM_VALIDATION_EXCEPTION,') + 34;
                errorMessage = errorMessage.mid(occurrence, errorMessage.length());
                occurrence = errorMessage.lastIndexOf(':');
                errorMessage = errorMessage.mid(0, occurrence);
            }
            system.debug('Error: ' + ex);
            system.debug('Error: ' + errorMessage);
            return errorMessage;
        }
    }
}