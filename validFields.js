function validFields(buttonParam) {
    debugger;
    Xrm.Page.ui.clearFormNotification("1");
    var errors = "";
    var count = 0;
    debugger;
    if (Xrm.Page.getAttribute("fullname").getValue() == null) {
        count++;
        errors += Xrm.Page.getControl("fullname").getLabel() + "; ";
        debugger;
    }
    if (Xrm.Page.getAttribute("new_regionfield").getValue() == null) {
        count++;
        errors += Xrm.Page.getControl("new_regionfield").getLabel() + "; ";
    }
    if (Xrm.Page.getAttribute("new_cityfield").getValue() == null) {
        count++;
        errors += Xrm.Page.getControl("new_cityfield").getLabel() + "; ";
    }
    if (Xrm.Page.getAttribute("emailaddress1").getValue() == null) {
        count++;
        errors += Xrm.Page.getControl("emailaddress1").getLabel() + "; ";
    }
    debugger;
    if (count > 0) {
        debugger;
        Xrm.Page.ui.setFormNotification("Заполните следующие поля: " + errors, "EROR", "1");
    } else {
        if (buttonParam == 1) {
			debugger;
            Xrm.Page.data.save();
        } else if (buttonParam == 2) {
			debugger;
            Xrm.Page.data.save().then
            (function () {
                Xrm.Page.ui.close();
            });
        }
    }
}
