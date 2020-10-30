function setLinkWebRes() {
    if (Xrm.Page.ui.getFormType() != 1) {
		Xrm.Page.getControl("WebResource_myHtml").setVisible(true);
        var link = Xrm.Page.getControl("WebResource_myHtml").getSrc();
        var entityId = Xrm.Page.data.entity.getId().replace(/\{|\}/g, '');
        link += "?Data=" + entityId;
        Xrm.Page.getControl("WebResource_myHtml").setSrc(link);
    }
}
