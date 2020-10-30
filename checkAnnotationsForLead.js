function checkAnnotationsForLead() {
    var entityId = Xrm.Page.data.entity.getId().replace(/\{|\}/g, '');
    var oDataEndpointUrl = "http://XX.XX.XX.XXX/LearnAPetukhov/api/data/v9.0/leads(" + entityId + ")/Lead_Annotation?$count=true";
    var service = GetRequestObject();
    if (service != null) {
        service.open("GET", oDataEndpointUrl, false);
        service.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        service.setRequestHeader("Accept", "application/json, text/javascript, */*");
        service.send(null);
        var retrieved = JSON.parse(service.responseText);
        if (retrieved["@odata.count"] > 0) {
            Xrm.Page.ui.tabs.get("tab_3").setDisplayState("expanded");
        } else {
            Xrm.Page.ui.tabs.get("tab_3").setDisplayState("collapsed");
        }
    }
}
function GetRequestObject() {
    if (window.XMLHttpRequest) {
        return new window.XMLHttpRequest;
    } else {
        try {
            return new ActiveXObject("MSXML2.XMLHTTP.3.0");
        } catch (ex) {
            return null;
        }
    }
}
