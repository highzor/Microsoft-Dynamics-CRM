function setLinkWebRes() {
    if (Xrm.Page.ui.getFormType() != 1) {
		Xrm.Page.ui.tabs.get("tab_3").setVisible(true)
		Xrm.Page.getControl("WebResource_myHtml").setVisible(true);
        var link = Xrm.Page.getControl("WebResource_myHtml").getSrc();
        var entityId = Xrm.Page.data.entity.getId().replace(/\{|\}/g, '');
        link += "?Data=" + entityId;
        Xrm.Page.getControl("WebResource_myHtml").setSrc(link);
    } else {
		Xrm.Page.ui.tabs.get("tab_3").setVisible(false)
		Xrm.Page.getControl("WebResource_myHtml").setVisible(false);
	}
}
