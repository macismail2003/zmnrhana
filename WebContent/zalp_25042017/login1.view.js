sap.ui.jsview("zalp_25042017.login1", {

	/** Specifies the Controller belonging to this View. ..
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf inventoryoverview.Login
	*/ 
	getControllerName : function() {
		return "zalp_25042017.login1";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zalp_25042017.Login
	*/ 
	createContent : function(oController) {
		
		var oLoginView = new LoginView();
		var vLoginForm = oLoginView.createLoginForm(oController);
		
		this.page = new sap.m.Page("LoginPage", {
			title: "{i18n>page2Title}",
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vLoginForm]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		//this.page.setHeight("25%");
		
		// done
		return this.page;
	
		/*new sap.m.Button("idBtnLogon",{
		          type:sap.m.ButtonType.Default,
		          press:function(){
		        	  oController.LogonBtnPress();
		          }}).placeAt("btnLogon");*/
	}

});