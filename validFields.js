function validFields(buttonParam) {
    Xrm.Page.ui.clearFormNotification("1");
    var errors = "";
    if (Xrm.Page.getAttribute("fullname").getValue() == null) {
        errors += Xrm.Page.getControl("fullname").getLabel() + "; ";
    }
    if (Xrm.Page.getAttribute("new_regionfield").getValue() == null) {
        errors += Xrm.Page.getControl("new_regionfield").getLabel() + "; ";
    }
    if (Xrm.Page.getAttribute("new_cityfield").getValue() == null) {
        errors += Xrm.Page.getControl("new_cityfield").getLabel() + "; ";
    }
    if (Xrm.Page.getAttribute("emailaddress1").getValue() == null) {
        errors += Xrm.Page.getControl("emailaddress1").getLabel() + "; ";
    }
    if (errors != "") {
        Xrm.Page.ui.setFormNotification("Заполните следующие поля: " + errors, "ERROR", "1");
    } else {
        if (buttonParam == 1) {
            Xrm.Page.data.save();
        } else if (buttonParam == 2) {
            Xrm.Page.data.save().then
            (function () {
                Xrm.Page.ui.close();
            });
        }
    }
}
