sap.ui.controller("zalp_25042017.home", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zalp_25042017.home
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zalp_25042017.home
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zalp_25042017.home
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zalp_25042017.home
*/
//	onExit: function() {
//
//	}

	/* HOME - Function - Create Home Page*/

	createMainpage : function(){
		var oMain = new mains();

		/* HOME - Page Content - Home Page*/
		var oMainContent = oMain.createHomePage();
		return oMainContent;
	},

	/* CDASHM1 - Page - Customer Dashboard page 1 */

	createCDASHM1Page : function(){
		var oCdashm1 = new cdashm1();

		/* HOME - Page Content - Home Page*/
		var oCdashm1Content = oCdashm1.createCDASHM1Page();
		return oCdashm1Content;
	},

	/* SDASHM1 - Page - Seaco Dashboard page 1 */

	createSDASHM1Page : function(){

		var oLoginView = new LoginView();
		var oSdashm1Content = oLoginView.authenticateUser();
		return oSdashm1Content;
	},

	/* SDASHM2 - Page - Seaco Dashboard page 2 */

	createSDASHM2Page : function(){
		var oSdashm2 = new sdashm2();

		/* HOME - Page Content - Home Page*/
		var oSdashm2Content = oSdashm2.createSDASHM2Page();
		return oSdashm2Content;
	},

	/* SDASHM2 - Page - Seaco Dashboard tariff page 2 */

	createSDASHM2TariffPage : function(){
		var oSdashm2 = new sdashm2();

		/* HOME - Page Content - Tariff  Page*/
		var oSdashm2Content = oSdashm2.createSDASHM2TariffPage();
		return oSdashm2Content;
	},

	/* SDASHM2EDILIST - Page - Seaco Dashboard page 2 EDI List*/

	createSDASHM2EDILISTPage : function(){
		var oSdashm2EDI = new sdashm2EDI();

		/* HOME - Page Content - Home Page*/
		var oSdashm2EDILISTContent = oSdashm2EDI.createSDASHM2EDILISTPage();
		return oSdashm2EDILISTContent;
	},

	/* SDASHM2EDIDET - Page - Seaco Dashboard page 2 EDI List*/

	createSDASHM2EDIDETPage : function(){
		var oSdashm2EDI = new sdashm2EDI();

		/* HOME - Page Content - Home Page*/
		var oSdashm2EDIDETContent = oSdashm2EDI.createSDASHM2EDIDETPage();
		return oSdashm2EDIDETContent;
	},

	/* SDASHM3 - Page - Seaco Dashboard page 3 */

	createSDASHM3Page : function(){
		var oSdashm3 = new sdashm3();

		/* HOME - Page Content - Home Page*/
		var oSdashm3Content = oSdashm3.createSDASHM3Page();
		return oSdashm3Content;
	},

	/* SDASHMPIC - Page - Seaco Dashboard page Pictures */

	createSDASHMPICPage : function(){
		var oSdashmPic = new sdashmpic();

		/* HOME - Page Content - Home Page*/
		var oSdashmPicContent = oSdashmPic.createSDASHMPICPage();
		return oSdashmPicContent;
	},

	fnCallbackMessageBox:function(sResult) {
        //alert("Reset");
        //var oCurrent = this;
        if(sResult == "YES"){
        sessionStorage.clear();
        sessionStorage.clear();
        window.location.assign('index.html');
        }
        },
});
