function customCityFilter() {
    var LookupControl = Xrm.Page.getControl("new_cityfield").addPreSearch(function () {
            if (Xrm.Page.getAttribute("new_regionfield") != null) {
                var region = Xrm.Page.data.entity.attributes.get("new_regionfield").getValue()[0].id;
                if (region != null) {
                    fetchXml = "<filter type='and'><condition attribute='new_cityofregion' operator='eq' value='" + region + "' /></filter>";
                    Xrm.Page.getControl("new_cityfield").addCustomFilter(fetchXml);
                }
            }
    });
}
