function customCityFilter() {
    debugger;
    var LookupControl = Xrm.Page.getControl("new_cityfield").addPreSearch(function () {
            debugger;
            if (Xrm.Page.getAttribute("new_regionfield") != null) {
                debugger;
                var region = Xrm.Page.data.entity.attributes.get("new_regionfield").getValue()[0].id;
                debugger;
                if (region != null) {
                    debugger;
                    fetchXml = "<filter type='and'><condition attribute='new_cityofregion' operator='eq' value='" + region + "' /></filter>";
                    debugger;
                    Xrm.Page.getControl("new_cityfield").addCustomFilter(fetchXml);
                }
            }
    });
}