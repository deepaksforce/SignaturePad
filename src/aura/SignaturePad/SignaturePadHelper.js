/**
 * Created by Deepak Singh on 8/2/2019.
 */
({
    doInitHelper: function (c) {
        try {
            c.set("v.isSpinnerShow", true);
            let canvas = c.find('signature-pad').getElement();
            let ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);
            let signaturePad = new SignaturePad(canvas, {
                minWidth: .25,
                maxWidth: 2,
                backgroundColor: 'rgb(255, 255, 255)'
            });
            c.set("v.signaturePad", signaturePad);

        } catch (e) {
            console.log('Exception in JS method doInitHelper ::');
            console.log(e.message);
        }
        c.set("v.isSpinnerShow", false);
    },
    saveHelper: function (c, e, h) {
        try {
            let sig = c.get("v.signaturePad");
            if (!sig._isEmpty) {
                c.set("v.isSpinnerShow", true);
                let action = c.get("c.saveSignature");
                action.setParams({
                    "recordId": c.get('v.recordId'),
                    "b64SignData": sig.toDataURL().replace(/^data:image\/(png|jpg);base64,/, "")
                });
                action.setCallback(this, function (response) {
                    c.set("v.isSpinnerShow", false);
                    let state = response.getState();
                    if (state === "SUCCESS") {
                        $A.get('e.force:refreshView').fire();
                        h.clearCanvasHelper(c);
                        let errorReturned = response.getReturnValue();
                        if (errorReturned === '') {
                            console.log("Signature Attached");
                            let toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                title: 'Information',
                                message: 'Signature Attached Successfully.',
                                duration: ' 3000',
                                key: 'info_alt',
                                type: 'success',
                                mode: 'pester'
                            });
                            toastEvent.fire();

                        } else {
                            console.log(errorReturned); // Technical error for maintenance
                            let toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                title: 'Information',
                                message: errorReturned,
                                duration: ' 3000',
                                key: 'info_alt',
                                type: 'error',
                                mode: 'pester'
                            });
                            toastEvent.fire();
                        }
                    }
                });
                $A.enqueueAction(action);
            }
        } catch (e) {
            console.log('Exception in JS method saveHelper ::');
            console.log(e.message);
        }
    },
    clearCanvasHelper: function (c) {
        c.set("v.isSpinnerShow", true);
        let sig = c.get("v.signaturePad");
        sig.clear();
        c.set("v.isSpinnerShow", false);
    }
});