function customSetRegion() {
	if (Xrm.Page.getAttribute("new_cityfield").getValue() != null && Xrm.Page.getAttribute("new_regionfield").getValue() == null) {
        var cityId = Xrm.Page.getAttribute("new_cityfield").getValue()[0].id;
        debugger;
        var FetchXML = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>"
             + "<entity name='new_city'><all-attributes/>"
             + "<order attribute='new_namecity' descending='false' />"
             + "<filter type='and'>"
             + "<condition attribute='new_cityid' operator='eq' value='" + cityId + "' />"
             + "</filter>"
             + "</entity>"
             + "</fetch>"

            FetchXML = "?fetchXml=" + encodeURIComponent(FetchXML);
        debugger;
        Xrm.WebApi.retrieveMultipleRecords("new_city", FetchXML).then(
            function success(result) {
            debugger;
            var lookup = new Array();
            lookup[0] = new Object();
			lookup[0].id = result.entities[0]["_new_cityofregion_value"];
            lookup[0].name = result.entities[0]["_new_cityofregion_value@OData.Community.Display.V1.FormattedValue"];
            lookup[0].entityType = result.entities[0]["_new_cityofregion_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
            debugger;
            Xrm.Page.getAttribute("new_regionfield").setValue(lookup);
            debugger;
        },
            function (error) {
            debugger;
            console.log(error.message);
        });
	}
}