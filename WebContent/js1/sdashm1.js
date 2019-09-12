var globalSDASHM1TableStatusMonitorTPC = null;
jQuery.sap.require("sap.ui.model.json.JSONModel");

var oDataCusTS = [];
var oDataChart = {
		'west' : [],
		'awap' : [],
		'auth' : []
};

var oSDASHMJsonReports = [];
var oSDASHMJsonStatusMonitor = [];
var globalSDASHM1AllDepot = false;
var oSDASHM1JsonDocuments = [];

var oSDASHM1JsonFreeDays = [];
var oSDASHM1ModelFreeDays = new sap.ui.model.json.JSONModel();

var oSDASHM1JsonTieredDiscount = [];
var oSDASHM1ModelTieredDiscount = new sap.ui.model.json.JSONModel();

var oSDASHM1JsonPurchaseInfo = [];
var oSDASHM1ModelPurchaseInfo = new sap.ui.model.json.JSONModel();

var oSDASHM1PopoverAlert = "";
var oSDASHM1JsonAlertOC = [];
var oSDASHM1JsonAlertGeneral = [];

var FNASummaryArrayF4 = [];
var FNASummaryArraySTAT = [];
var FNASummaryArrayCUST = [];
// var oJSONSDASHMAuthorizationRoles = {};
sap.ui.model.json.JSONModel.extend("sdashm1", {

	setUserRoles : function(){

		oJSONSDASHMAuthorizationRoles = {
			"ZMNR.DOCRATESBUTTON" : false,
			"ZMNR.DEPOTCONTACTBUTTON" : false,
			"ZMNR.SETUPALERTBUTTON" : false,
			"ZMNR.DOWNLOADESTIMBUTTON" : false,
			"ZMNR.EMAILESTIMBUTTON" : false,
			"ZMNR.LSRBUTTON" : false,
			"ZMNR.ADD_PREDEL_ESTIMBUTTON" : false,
			"ZMNR.ADD_PREDEL_EDIT_GRADE" : false,
			"ZMNR.CWAPPBUTTON" : false,
			"ZMNR.AUTHORIZEREPBUTTON" : false,
			"ZMNR.CUSTAPPBUTTON" : false,
			"ZMNR.EDIT3BUTTON" : false,
			"ZMNR.REVERSE3BUTTON" : false,
			"ZMNR.REQUESTPIC3BUTTON" : false,
			"ZMNR.CUSTDEPCONTBUTTON" : false,
			"ZMNR.CUSTDEPBILLBUTTON" : false,
			"ZMNR.UPLOAD3BUTTON" : false,
		};
		for (var roleName in sessionStorage) {
				// if (sessionStorage.hasOwnProperty(roleName)) {
				//     console.log(roleName + " -> " + sessionStorage[roleName]);
				// }

				if(sessionStorage[roleName] == "true"){
						oJSONSDASHMAuthorizationRoles[roleName] = true;
				}else if(sessionStorage[roleName] == "false"){
						oJSONSDASHMAuthorizationRoles[roleName] = false;
				}
		}
	},

	/* SDASHM1 - Page - Seaco Dashboard page 1 */
	createSDASHM1Page : function(){
		jQuery.sap.require("sap.ui.core.IconPool");
		var oCurrent = this;

		/* SDASHM1 - Section - Status Monitors */

		var oSDASHM1ContentStatusMonitor = oCurrent.setContentStatusMonitor();

		/* SDASHM1 - Flexbox - Final */

		var oSDASHM1ContentFinal = new sap.m.FlexBox({
		         items: [
		              oSDASHM1ContentStatusMonitor
		       ],
		       direction : "Column",
		       visible: true,
		}).addStyleClass("marginLeft10");

		return oSDASHM1ContentFinal;

	},

	/* SDASHM1 - Section - Status Monitor */

	setContentStatusMonitor : function(){

		var oCurrent = this;

		/* SDASHM1 - Label - Pending Estimates */

		var oSDASHM1LabelStatusMonitor = new sap.ui.commons.Label("idSDASHM1LabelStatusMonitor",{
            text: "Inventory Monitor",
        }).addStyleClass("fontTitle");

		/* SDASHM1 - Button - BW Reports

		var oSDASHM1ButtonStatusMonitorReports = new sap.ui.commons.Button("idSDASHM1ButtonStatusMonitorReports",{
	          text : "Reports",
	          styled:false,
	          type:sap.m.ButtonType.Unstyled,
	          //icon: sap.ui.core.IconPool.getIconURI("synchronize"),
	          press:function(oEvent){
	        	  oCurrent.setSDASHM1ReportContent();
	          }
		}).addStyleClass("excelBtn marginTop10 floatRight"); */

		/* SDASHM1 - Button - Send Alert

		var oSDASHM1ButtonStatusMonitorAlert = new sap.ui.commons.Button("idSDASHM1ButtonStatusMonitorAlert",{
	          text : "Send Alert",
	          styled:false,
	          type:sap.m.ButtonType.Unstyled,
	          //icon: sap.ui.core.IconPool.getIconURI("synchronize"),
	          press:function(oEvent){
	        	  oCurrent.setSDASHM1AlertContent(oEvent.getSource());
	          }
		}).addStyleClass("excelBtn marginTop10 floatRight"); */


		/* SDASHM1 - Button - Seaweb

		var oSDASHM1ButtonStatusMonitorSeaweb = new sap.ui.commons.Button("idSDASHM1ButtonStatusMonitorSeaweb",{
	          text : "Seaweb",
	          styled:false,
	          type:sap.m.ButtonType.Unstyled,
	          //icon: sap.ui.core.IconPool.getIconURI("synchronize"),
	          press:function(oEvent){
	        	  window.open("https://newseaweb.seacoglobal.com");
	          }
		}).addStyleClass("excelBtn marginTop10 floatRight"); */

		/* SDASHM1 - Button - Refresh

		var oSDASHM1ButtonStatusMonitorRefresh = new sap.ui.commons.Button("idSDASHM1ButtonStatusMonitorRefresh",{
	          text : "",
	          styled:false,
	          type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("synchronize"),
	          press:function(){

			 				var all = globalSDASHM1AllDepot;
			 				var oSdashm1 = new sdashm1();
			 				oSdashm1.setSDASHM1Values(all, false);
	          }
		}).addStyleClass("excelBtn marginTop10 floatRight"); */


		/* SDASHM1 - Button - Pending Estimates Export to Excel

		var oSDASHM1ButtonStatusMonitorExport = new sap.ui.commons.Button("idSDASHM1ButtonStatusMonitorExport",{
	          text : "",
	          styled:false,
	          type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	  var oUtility = new utility();
	        	  var excelSDASHMJsonStatusMonitor = [];
	        	  for(var i=0; i<oSDASHMJsonStatusMonitor.length; i++){
	        		  excelSDASHMJsonStatusMonitor.push({
	        			  "Depot Code" : oSDASHMJsonStatusMonitor[i].depotcode,
	        			  "Depot Name" : oSDASHMJsonStatusMonitor[i].depotname,
	        			  "Location" : oSDASHMJsonStatusMonitor[i].location,
									"Region" : oSDASHMJsonStatusMonitor[i].regioncode,
	        			  "WEST" : oSDASHMJsonStatusMonitor[i].west,
	        			  "AWAP" : oSDASHMJsonStatusMonitor[i].awap,
	        			  "AUTH Grade 1" : oSDASHMJsonStatusMonitor[i].authg1,
	        			  "AUTH Grade 2" : oSDASHMJsonStatusMonitor[i].authg2,
	        			  "AUTH Grade 3" : oSDASHMJsonStatusMonitor[i].authg3,
	        			  "AUTH Grade 4" : oSDASHMJsonStatusMonitor[i].authg4,
	        			  "AUTH Grade 5" : oSDASHMJsonStatusMonitor[i].authg5,
									"AUTH Grade 6" : oSDASHMJsonStatusMonitor[i].authg6,
	        			  "AUTH" : oSDASHMJsonStatusMonitor[i].auth,
	        			  "HOLD Grade 1" : oSDASHMJsonStatusMonitor[i].holdg1,
	        			  "HOLD Grade 2" : oSDASHMJsonStatusMonitor[i].holdg2,
	        			  "HOLD Grade 3" : oSDASHMJsonStatusMonitor[i].holdg3,
	        			  "HOLD Grade 4" : oSDASHMJsonStatusMonitor[i].holdg4,
	        			  "HOLD Grade 5" : oSDASHMJsonStatusMonitor[i].holdg5,
									"HOLD Grade 6" : oSDASHMJsonStatusMonitor[i].holdg6,
	        			  "HOLD" : oSDASHMJsonStatusMonitor[i].hold,
	        			  "AVLB Grade 1" : oSDASHMJsonStatusMonitor[i].avlbg1,
	        			  "AVLB Grade 2" : oSDASHMJsonStatusMonitor[i].avlbg2,
	        			  "AVLB" : oSDASHMJsonStatusMonitor[i].avlb,
	        			  "SALE Grade 1" : oSDASHMJsonStatusMonitor[i].saleg1,
	        			  "SALE Grade 2" : oSDASHMJsonStatusMonitor[i].saleg2,
	        			  "SALE Grade 3" : oSDASHMJsonStatusMonitor[i].saleg3,
	        			  "SALE Grade 4" : oSDASHMJsonStatusMonitor[i].saleg4,
	        			  "SALE Grade 5" : oSDASHMJsonStatusMonitor[i].saleg5,
									"SALE Grade 6" : oSDASHMJsonStatusMonitor[i].saleg6,
	        			  "SALE" : oSDASHMJsonStatusMonitor[i].sale,


	        			  "Total Stock" : oSDASHMJsonStatusMonitor[i].tstock,
	        			  "EDI Error" : oSDASHMJsonStatusMonitor[i].edi,
	        			  "Tariff Checker" : oSDASHMJsonStatusMonitor[i].tariff,
	        			  "ROD" : oSDASHMJsonStatusMonitor[i].rod,
	        			  "DOM" : oSDASHMJsonStatusMonitor[i].mgr,
	        			  "Ops. Co-Ordinator" : oSDASHMJsonStatusMonitor[i].coord,
	        		  });
	        	  }
	        	  var title = sap.ui.getCore().byId("idSDASHM1LabelStatusMonitor").getText();
	        	  oUtility.makeHTMLTable(excelSDASHMJsonStatusMonitor, title, "export", "inventory_list");
	          }
		}).addStyleClass("excelBtn marginTop10 floatRight"); */

		/* SDASHM1 - Button - All Depot

		var oSDASHM1ButtonStatusMonitorAllDepot = new sap.ui.commons.Button("idSDASHM1ButtonStatusMonitorAllDepot",{
			text : "Show all depots",
			styled:false,
			press : function(oEvent) {
				if(globalSDASHM1AllDepot){
					globalSDASHM1AllDepot = false;
				}else{
					globalSDASHM1AllDepot = true;
				}
				oCurrent.setSDASHM1Values(globalSDASHM1AllDepot, false);
			}
		}).addStyleClass("excelBtn marginTop10 floatRight"); */

		/* SDASHM1 - Flexbox - All Depot and Excel button

		var oSDASHM1FlexStatusMonitorAllDepotandExcel = new sap.m.FlexBox({
		         items: [
							 			oSDASHM1ButtonStatusMonitorAlert,
		                oSDASHM1ButtonStatusMonitorReports,
		                oSDASHM1ButtonStatusMonitorSeaweb,
		                oSDASHM1ButtonStatusMonitorRefresh,
		                oSDASHM1ButtonStatusMonitorAllDepot,
		                oSDASHM1ButtonStatusMonitorExport
		       ],
		       direction : "Row",
		       visible: true,
		}); */


		/* SDASHM1 - Flexbox - Pending Estimates Title */

		var oSDASHM1FlexStatusMonitorTitle = new sap.m.FlexBox({
				 justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
		         items: [
		                oSDASHM1LabelStatusMonitor,
		                //oSDASHM1FlexStatusMonitorAllDepotandExcel
		       ],
		       direction : "Row",
		       visible: true,
		});

		/* SDASHM1 - Table - Pending Approval */

    	var oSDASHM1TableStatusMonitor = new sap.ui.table.Table("idSDASHM1TableStatusMonitor",{
    		visibleRowCount: 15,
            //firstVisibleRow: 3,
            fixedColumnCount: 2,
            columnHeaderHeight: 50,
            //width: '99%',
            //fixedRowCount : 1,
            enableColumnReordering : true,
            enableGrouping : true,
            //showColumnVisibilityMenu : true,
            selectionMode: sap.ui.table.SelectionMode.None,
            visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
            //navigationMode: sap.ui.table.NavigationMode.Paginator
            toolbar: new sap.ui.commons.Toolbar({
				items: [
					new sap.ui.commons.Button({
						text: "Reset",
						icon: "sap-icon://reset",
						press: function(oEvent) {
							oPersoService.delPersData();
							globalSDASHM1TableStatusMonitorTPC.refresh().done(function() {
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitor").setEnableGrouping(false);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitor").setEnableGrouping(true);
								//sap.ui.commons.MessageBox.alert("Reset done!", "INFORMATION", "Refresh");
							});

							var oSDASHM1TableStatusMonitor = sap.ui.getCore().byId("idSDASHM1TableStatusMonitor");
							var iColCounter = 0;
							oSDASHM1TableStatusMonitor.clearSelection();
							var iTotalCols = oSDASHM1TableStatusMonitor.getColumns().length;
							var oListBinding = oSDASHM1TableStatusMonitor.getBinding();
							if (oListBinding) {
							oListBinding.aSorters = null;
							oListBinding.aFilters = null;
							}
							oSDASHM1TableStatusMonitor.getModel().refresh(true);
							for ( iColCounter = 0; iColCounter < iTotalCols; iColCounter++) {
								oSDASHM1TableStatusMonitor.getColumns()[iColCounter].setSorted(false);
								oSDASHM1TableStatusMonitor.getColumns()[iColCounter].setFilterValue("");
								oSDASHM1TableStatusMonitor.getColumns()[iColCounter].setFiltered(false);
							}
						}
					}),
					new sap.ui.commons.Button({
						text: "Layout",
						//icon: "sap-icon://reset",
						press: function(oEvent) {
							globalSDASHM1TableStatusMonitorTPC.openDialog();
						}
					}),
					new sap.ui.commons.Button({
						text: "Save",
						icon: "sap-icon://save",
						press: function(oEvent) {
							globalSDASHM1TableStatusMonitorTPC.savePersonalizations().done(function() {
								sap.ui.commons.MessageBox.alert("Layout saved!", "INFORMATION", "Save");
							});
						}
					}),
					new sap.ui.commons.Button({
						text: "Clear Grouping",
						icon: "sap-icon://decline",
						press: function(oEvent) {
							globalSDASHM1TableStatusMonitorTPC.refresh().done(function() {
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitor").setEnableGrouping(false);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitor").setEnableGrouping(true);
								//sap.ui.commons.MessageBox.alert("Reset done!", "INFORMATION", "Refresh");
							});
						}
					}),
					new sap.ui.commons.Button({
						text: "Show/Hide Grade",
						icon: "sap-icon://resize-horizontal",
						press: function(oEvent) {
							if(sap.ui.getCore().byId("idSDASHM1TableStatusMonitorAUTHG1").getVisible()){
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorAUTHG1").setVisible(false);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorAUTHG2").setVisible(false);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorAUTHG6").setVisible(false);
								/*sap.ui.getCore().byId("idSDASHM1TableStatusMonitorAUTHG3").setVisible(false);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorAUTHG4").setVisible(false);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorAUTHG5").setVisible(false);*/

								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorHOLDG1").setVisible(false);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorHOLDG2").setVisible(false);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorHOLDG3").setVisible(false);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorHOLDG4").setVisible(false);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorHOLDG5").setVisible(false);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorHOLDG6").setVisible(false);

								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorSALEG1").setVisible(false);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorSALEG2").setVisible(false);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorSALEG3").setVisible(false);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorSALEG4").setVisible(false);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorSALEG5").setVisible(false);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorSALEG6").setVisible(false);

								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorAVLBG1").setVisible(false);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorAVLBG2").setVisible(false);
							}else{
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorAUTHG1").setVisible(true);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorAUTHG2").setVisible(true);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorAUTHG6").setVisible(true);
								/*sap.ui.getCore().byId("idSDASHM1TableStatusMonitorAUTHG3").setVisible(true);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorAUTHG4").setVisible(true);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorAUTHG5").setVisible(true);*/

								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorHOLDG1").setVisible(true);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorHOLDG2").setVisible(true);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorHOLDG3").setVisible(true);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorHOLDG4").setVisible(true);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorHOLDG5").setVisible(true);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorHOLDG6").setVisible(true);

								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorSALEG1").setVisible(true);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorSALEG2").setVisible(true);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorSALEG3").setVisible(true);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorSALEG4").setVisible(true);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorSALEG5").setVisible(true);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorSALEG6").setVisible(true);

								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorAVLBG1").setVisible(true);
								sap.ui.getCore().byId("idSDASHM1TableStatusMonitorAVLBG2").setVisible(true);
							}
						}
				})
				],
				rightItems: [
					new sap.ui.commons.Button("idSDASHM1ButtonStatusMonitorAlert",{
									text : "Setup Alert",
									visible : oJSONSDASHMAuthorizationRoles["ZMNR.SETUPALERTBUTTON"],
									press:function(oEvent){
										oCurrent.setSDASHM1AlertContent(oEvent.getSource());
									}
					}),
					new sap.ui.commons.Button("idSDASHM1ButtonStatusMonitorReports",{
									text : "Quick Links",
									press:function(oEvent){
										oCurrent.setSDASHM1ReportContent();
									}
					}),
					new sap.ui.commons.Button("idSDASHM1ButtonStatusMonitorSeaweb",{
									text : "Seaweb",
									press:function(oEvent){
										window.open("https://newseaweb.seacoglobal.com");
									}
					}),
					new sap.ui.commons.Button("idSDASHM1ButtonStatusMonitorAllDepot",{
						text : "Show all depots",
						press : function(oEvent) {
							if(globalSDASHM1AllDepot){
								globalSDASHM1AllDepot = false;
							}else{
								globalSDASHM1AllDepot = true;
							}
							oCurrent.setSDASHM1Values(globalSDASHM1AllDepot, false);
						}
					}),
					new sap.ui.commons.Button("idSDASHM1ButtonStatusMonitorRefresh",{
									text : "",
									icon: sap.ui.core.IconPool.getIconURI("refresh"),
									press:function(){
										var all = globalSDASHM1AllDepot;
										var oSdashm1 = new sdashm1();
										oSdashm1.setSDASHM1Values(all, false);
									}
					}),
					new sap.ui.commons.Button("idSDASHM1ButtonStatusMonitorExport",{
									text : "",
									icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
				          press:function(){
				        	  var oUtility = new utility();
				        	  var excelSDASHMJsonStatusMonitor = [];
										var filteredIndices = sap.ui.getCore().byId("idSDASHM1TableStatusMonitor").getBinding("rows").aIndices;
				        	  for(var i=0; i<oSDASHMJsonStatusMonitor.length; i++){
											if(filteredIndices.indexOf(i) != -1){
												excelSDASHMJsonStatusMonitor.push({
					        			  "Depot Code" : oSDASHMJsonStatusMonitor[i].depotcode,
					        			  "Depot Name" : oSDASHMJsonStatusMonitor[i].depotname,
					        			  "Location" : oSDASHMJsonStatusMonitor[i].location,
													"Region" : oSDASHMJsonStatusMonitor[i].regioncode,
					        			  "WEST" : oSDASHMJsonStatusMonitor[i].west,
					        			  "AWAP" : oSDASHMJsonStatusMonitor[i].awap,
					        			  "AUTH Grade 1" : oSDASHMJsonStatusMonitor[i].authg1,
					        			  "AUTH Grade 2" : oSDASHMJsonStatusMonitor[i].authg2,
					        			  "AUTH Grade 3" : oSDASHMJsonStatusMonitor[i].authg3,
					        			  "AUTH Grade 4" : oSDASHMJsonStatusMonitor[i].authg4,
					        			  "AUTH Grade 5" : oSDASHMJsonStatusMonitor[i].authg5,
													"AUTH Grade 6" : oSDASHMJsonStatusMonitor[i].authg6,
					        			  "AUTH" : oSDASHMJsonStatusMonitor[i].auth,
					        			  "HOLD Grade 1" : oSDASHMJsonStatusMonitor[i].holdg1,
					        			  "HOLD Grade 2" : oSDASHMJsonStatusMonitor[i].holdg2,
					        			  "HOLD Grade 3" : oSDASHMJsonStatusMonitor[i].holdg3,
					        			  "HOLD Grade 4" : oSDASHMJsonStatusMonitor[i].holdg4,
					        			  "HOLD Grade 5" : oSDASHMJsonStatusMonitor[i].holdg5,
													"HOLD Grade 6" : oSDASHMJsonStatusMonitor[i].holdg6,
					        			  "HOLD" : oSDASHMJsonStatusMonitor[i].hold,
													"HOLD COMM" : oSDASHMJsonStatusMonitor[i].holdc,
					        			  "AVLB Grade 1" : oSDASHMJsonStatusMonitor[i].avlbg1,
					        			  "AVLB Grade 2" : oSDASHMJsonStatusMonitor[i].avlbg2,
					        			  "AVLB" : oSDASHMJsonStatusMonitor[i].avlb,
					        			  "SALE Grade 1" : oSDASHMJsonStatusMonitor[i].saleg1,
					        			  "SALE Grade 2" : oSDASHMJsonStatusMonitor[i].saleg2,
					        			  "SALE Grade 3" : oSDASHMJsonStatusMonitor[i].saleg3,
					        			  "SALE Grade 4" : oSDASHMJsonStatusMonitor[i].saleg4,
					        			  "SALE Grade 5" : oSDASHMJsonStatusMonitor[i].saleg5,
													"SALE Grade 6" : oSDASHMJsonStatusMonitor[i].saleg6,
					        			  "SALE" : oSDASHMJsonStatusMonitor[i].sale,


					        			  "Total Stock" : oSDASHMJsonStatusMonitor[i].tstock,
					        			  "EDI Error" : oSDASHMJsonStatusMonitor[i].edi,
					        			  "Tariff Checker" : oSDASHMJsonStatusMonitor[i].tariff,
					        			  "ROD" : oSDASHMJsonStatusMonitor[i].rod,
					        			  "DOM" : oSDASHMJsonStatusMonitor[i].mgr,
					        			  "Ops. Co-Ordinator" : oSDASHMJsonStatusMonitor[i].coord,
					        		  });
											}
				        	  }
				        	  var title = sap.ui.getCore().byId("idSDASHM1LabelStatusMonitor").getText();
				        	  oUtility.makeHTMLTable(excelSDASHMJsonStatusMonitor, title, "export", "inventory_list");
				          }
					})

				]
			})
    	 }).addStyleClass("sapUiSizeCompact tblBorder");

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorDEPOT",{
    		 label : new sap.ui.commons.Label({text: "Depot", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 ////sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(true);
					 var depotcode = oEvent.getSource().getProperty("text");
					 globalDepot = depotcode;

					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 oCurrent.setEquipmentLevelDetails(depotcode, "DEPO", undefined, depotname, location);


					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname;
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);

				 }
			 }).bindProperty("text", "depotcode").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"60px",
	           sortProperty: "depotcode",
	           filterProperty : "depotcode",
			 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorDEPOTNAME",{
    		label: new sap.ui.commons.Label({text: "Depot Name", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 //template: new sap.ui.commons.TextView({
			 //}).bindProperty("text", "depotname").addStyleClass("borderStyle1"),
	             template: new sap.ui.commons.Link({
					 press : function(oEvent){
						 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(true);
						 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
						 globalDepot = depotcode;
						 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
						 var location = oEvent.getSource().getBindingContext().getProperty("location");

						 oCurrent.setEquipmentLevelDetails(depotcode, "DEPO", undefined, depotname, location);


						 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname;
						 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);

					 }
				 }).bindProperty("text", "depotname").addStyleClass("borderStyle1 wraptext"),
	           resizable:true,
	           width:"230px",
	           sortProperty: "depotname",
	           filterProperty : "depotname",
			 }));

			 oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorREGION",{
              label: new sap.ui.commons.Label({text: "Region", textAlign: "Left"}).addStyleClass("wraptextcol"),
 			 template: new sap.ui.commons.TextView({
 			 }).bindProperty("text", "regioncode").addStyleClass("borderStyle1"),
 	           resizable:true,
 	           width:"150px",
 	           sortProperty: "regioncode",
 	           filterProperty : "regioncode",
 			 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorLOCATION",{
             label: new sap.ui.commons.Label({text: "Location", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "location").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"130px",
	           sortProperty: "location",
	           filterProperty : "location",
			 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorWEST",{
    		label: new sap.ui.commons.Label({text: "WEST", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.Link({
				 textAlign: "Center",
				 press : function(oEvent){

			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
			     if(lineno == "0" && globalSDASHM1AllDepot == true){

			     }else{
			     //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
				 var west = oEvent.getSource().getProperty("text");
				 globalDepot = depotcode;
				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
				 var location = oEvent.getSource().getBindingContext().getProperty("location");
				 oCurrent.setEquipmentLevelDetails(depotcode, "WEST", west, depotname, location);


				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
				 			" || Status : WEST";
				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
			     }
			 }
			 }).bindProperty("text", "west").bindProperty("enabled", "enabledwest").bindProperty("visible", "visiblewest").addStyleClass("borderStyle1 centerAlign"),
	           resizable:true,
	           width:"75px",
	           sortProperty: "numwest",
	           filterProperty : "west"
			 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorAWAP",{
    		label: new sap.ui.commons.Label({text: "AWAP", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
				     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
				     if(lineno == "0" && globalSDASHM1AllDepot == true){

				     }else{
				    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 var awap = oEvent.getSource().getProperty("text");
					 globalDepot = depotcode;
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 oCurrent.setEquipmentLevelDetails(depotcode, "AWAP", awap, depotname, location);


					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
					 			" || Status : AWAP";
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
				     }
				 }
			 }).bindProperty("text", "awap").bindProperty("enabled", "enabledawap").bindProperty("visible", "visibleawap").addStyleClass("borderStyle1 centerAlign"),
	           resizable:true,
	           width:"75px",
	           sortProperty: "numawap",
	           filterProperty : "awap"
			 }));

    	/* AUTH Columns */
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorAUTHG1",{
    		label: new sap.ui.commons.Label({text: "AUTH Grade 1", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		/*headerSpan: [5,1],
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "AUTH", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 1"}).addStyleClass("wraptextcol")
                 ],*/
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
				     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
				     if(lineno == "0" && globalSDASHM1AllDepot == true){

				     }else{
				    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 var authg1 = oEvent.getSource().getProperty("text");
					 globalDepot = depotcode;
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 oCurrent.setEquipmentLevelDetails(depotcode, "AUTH1", authg1, depotname, location);


					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
					 			" || Status : AUTH Grade 1";
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
				     }

				 }
			 }).bindProperty("text", "authg1").bindProperty("enabled", "enabledauthg1").bindProperty("visible", "visibleauthg1").addStyleClass("borderStyle1 centerAlign"),
	           resizable:true,
	           width:"75px",
	           sortProperty: "numauthg1",
	           filterProperty : "authg1"
			 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorAUTHG2",{
    		label: new sap.ui.commons.Label({text: "AUTH Grade 2", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		/*multiLabels :
                [
                 new sap.ui.commons.Label({text: "AUTH", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 2"}).addStyleClass("wraptextcol")
                 ],*/
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var authg2 = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "AUTH2", authg2, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : AUTH Grade 2";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "authg2").bindProperty("enabled", "enabledauthg2").bindProperty("visible", "visibleauthg2").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numauthg2",
    	       filterProperty : "authg2"
    		 }));

				 oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorAUTHG6",{
				 	label: new sap.ui.commons.Label({text: "AUTH Grade 6", textAlign: "Center"}).addStyleClass("wraptextcol"),
				 	/*multiLabels :
				 					[
				 					 new sap.ui.commons.Label({text: "AUTH", textAlign: "Center"}).addStyleClass("wraptextcol"),
				 					 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 2"}).addStyleClass("wraptextcol")
				 					 ],*/
				 	 template: new sap.ui.commons.Link({
				 		 press : function(oEvent){
				 				 var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
				 				 if(lineno == "0" && globalSDASHM1AllDepot == true){

				 				 }else{
				 					 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
				 			 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
				 			 var authg6 = oEvent.getSource().getProperty("text");
				 			 globalDepot = depotcode;
				 			 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
				 			 var location = oEvent.getSource().getBindingContext().getProperty("location");
				 			 oCurrent.setEquipmentLevelDetails(depotcode, "AUTH6", authg6, depotname, location);


				 			 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
				 						" || Status : AUTH Grade 6";
				 			 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
				 				 }

				 		 }
				 	 }).bindProperty("text", "authg6").bindProperty("enabled", "enabledauthg6").bindProperty("visible", "visibleauthg6").addStyleClass("borderStyle1 centerAlign"),
				 			 resizable:true,
				 			 width:"75px",
				 			 sortProperty: "numauthg6",
				 			 filterProperty : "authg6"
				 	 }));

    	/*oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorAUTHG3",{
    		label: new sap.ui.commons.Label({text: "AUTH Grade 3", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var authg3 = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "AUTH3", authg3, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : AUTH Grade 3";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "authg3").bindProperty("enabled", "enabledauthg3").bindProperty("visible", "visibleauthg3").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numauthg3",
    	       filterProperty : "authg3"
    		 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorAUTHG4",{
    		label: new sap.ui.commons.Label({text: "AUTH Grade 4", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var authg4 = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "AUTH4", authg4, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : AUTH Grade 4";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "authg4").bindProperty("enabled", "enabledauthg4").bindProperty("visible", "visibleauthg4").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numauthg4",
    	       filterProperty : "authg4"
    		 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorAUTHG5",{
    		label: new sap.ui.commons.Label({text: "AUTH Grade 5", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var authg5 = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "AUTH5", authg5, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : AUTH Grade 5";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "authg5").bindProperty("enabled", "enabledauthg5").bindProperty("visible", "visibleauthg5").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numauthg5",
    	       filterProperty : "authg5"
    		 }));*/

    	/* AUTH Total */

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorAUTH",{
    		label: new sap.ui.commons.Label({text: "AUTH", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		/*multiLabels :
                [
                 new sap.ui.commons.Label({text: "AUTH", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 5"}).addStyleClass("wraptextcol")
                 ],*/
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var auth = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "AUTH", auth, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : AUTH";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "auth").bindProperty("enabled", "enabledauth").bindProperty("visible", "visibleauth").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numauth",
    	       filterProperty : "auth"
    		 }));


    	/* HOLD Columns */
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorHOLDG1",{
    		label: new sap.ui.commons.Label({text: "HOLD Grade 1", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		/*headerSpan: [5,1],
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "HOLD", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 1"}).addStyleClass("wraptextcol")
                 ],*/
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(true);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var holdg1 = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "HOLD1", holdg1, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : HOLD Grade 1";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "holdg1").bindProperty("enabled", "enabledholdg1").bindProperty("visible", "visibleholdg1").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numholdg1",
    	       filterProperty : "holdg1"
    		 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorHOLDG2",{
    		label: new sap.ui.commons.Label({text: "HOLD Grade 2", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		/*multiLabels :
                [
                 new sap.ui.commons.Label({text: "HOLD", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 2"}).addStyleClass("wraptextcol")
                 ],*/
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(true);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var holdg2 = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "HOLD2", holdg2, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : HOLD Grade 2";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "holdg2").bindProperty("enabled", "enabledholdg2").bindProperty("visible", "visibleholdg2").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numholdg2",
    	       filterProperty : "holdg2"
    		 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorHOLDG3",{
    		label: new sap.ui.commons.Label({text: "HOLD Grade 3", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		/*multiLabels :
                [
                 new sap.ui.commons.Label({text: "HOLD", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 3"}).addStyleClass("wraptextcol")
                 ],*/
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(true);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var holdg3 = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "HOLD3", holdg3, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : HOLD Grade 3";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "holdg3").bindProperty("enabled", "enabledholdg3").bindProperty("visible", "visibleholdg3").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numholdg3",
    	       filterProperty : "holdg3"
    		 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorHOLDG4",{
    		label: new sap.ui.commons.Label({text: "HOLD Grade 4", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		/*multiLabels :
                [
                 new sap.ui.commons.Label({text: "HOLD", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 4"}).addStyleClass("wraptextcol")
                 ],*/
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(true);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var holdg4 = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "HOLD4", holdg4, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : HOLD Grade 4";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "holdg4").bindProperty("enabled", "enabledholdg4").bindProperty("visible", "visibleholdg4").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numholdg4",
    	       filterProperty : "holdg4"
    		 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorHOLDG5",{
    		label: new sap.ui.commons.Label({text: "HOLD Grade 5", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		/*multiLabels :
                [
                 new sap.ui.commons.Label({text: "HOLD", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 5"}).addStyleClass("wraptextcol")
                 ],*/
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(true);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var holdg5 = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "HOLD5", holdg5, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : HOLD Grade 5";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "holdg5").bindProperty("enabled", "enabledholdg5").bindProperty("visible", "visibleholdg5").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numholdg5",
    	       filterProperty : "holdg5"
    		 }));

				 oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorHOLDG6",{
				 	label: new sap.ui.commons.Label({text: "HOLD Grade 6", textAlign: "Center"}).addStyleClass("wraptextcol"),
				 	/*multiLabels :
				 					[
				 					 new sap.ui.commons.Label({text: "HOLD", textAlign: "Center"}).addStyleClass("wraptextcol"),
				 					 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 5"}).addStyleClass("wraptextcol")
				 					 ],*/
				 	 template: new sap.ui.commons.Link({
				 		 press : function(oEvent){
				 				 var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
				 				 if(lineno == "0" && globalSDASHM1AllDepot == true){

				 				 }else{
				 					 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(true);
				 			 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
				 			 var holdg6 = oEvent.getSource().getProperty("text");
				 			 globalDepot = depotcode;
				 			 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
				 			 var location = oEvent.getSource().getBindingContext().getProperty("location");
				 			 oCurrent.setEquipmentLevelDetails(depotcode, "HOLD6", holdg6, depotname, location);


				 			 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
				 						" || Status : HOLD Grade 6";
				 			 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
				 				 }

				 		 }
				 	 }).bindProperty("text", "holdg6").bindProperty("enabled", "enabledholdg6").bindProperty("visible", "visibleholdg6").addStyleClass("borderStyle1 centerAlign"),
				 			 resizable:true,
				 			 width:"75px",
				 			 sortProperty: "numholdg6",
				 			 filterProperty : "holdg6"
				 	 }));

    	/* HOLD Total */

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorHOLD",{
    		label: new sap.ui.commons.Label({text: "HOLD", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		/*multiLabels :
                [
                 new sap.ui.commons.Label({text: "HOLD", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 5"}).addStyleClass("wraptextcol")
                 ],*/
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(true);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var hold = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "HOLD", hold, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : HOLD";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "hold").bindProperty("enabled", "enabledhold").bindProperty("visible", "visiblehold").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numhold",
    	       filterProperty : "hold"
    		 }));

				 /* HOLD COMM */

	     	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorHOLDC",{
	     		label: new sap.ui.commons.Label({text: "HOLD COMM", textAlign: "Center"}).addStyleClass("wraptextcol"),
	     		/*multiLabels :
	                 [
	                  new sap.ui.commons.Label({text: "HOLD", textAlign: "Center"}).addStyleClass("wraptextcol"),
	                  new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 5"}).addStyleClass("wraptextcol")
	                  ],*/
	     		 template: new sap.ui.commons.Link({
	     			 press : function(oEvent){
	     			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
	     			     if(lineno == "0" && globalSDASHM1AllDepot == true){

	     			     }else{
	     			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(true);
	     				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
	     				 var hold = oEvent.getSource().getProperty("text");
	     				 globalDepot = depotcode;
	     				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
	     				 var location = oEvent.getSource().getBindingContext().getProperty("location");
	     				 oCurrent.setEquipmentLevelDetails(depotcode, "HOLDC", hold, depotname, location);


	     				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
	     				 			" || Status : HOLD COMM";
	     				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
	     			     }

	     			 }
	     		 }).bindProperty("text", "holdc").bindProperty("enabled", "enabledholdc").bindProperty("visible", "visibleholdc").addStyleClass("borderStyle1 centerAlign"),
	     	       resizable:true,
	     	       width:"75px",
	     	       sortProperty: "numholdc",
	     	       filterProperty : "holdc"
	     		 }));

    	/* AVLB Columns */
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorAVLBG1",{
    		label: new sap.ui.commons.Label({text: "AVLB Grade 1", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		/*headerSpan: [2,1],
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "AVLB", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 1"}).addStyleClass("wraptextcol")
                 ],*/
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var avlbg1 = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "AVLB1", avlbg1, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : AVLB Grade 1";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "avlbg1").bindProperty("enabled", "enabledavlbg1").bindProperty("visible", "visibleavlbg1").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numavlbg1",
    	       filterProperty : "avlbg1"
    		 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorAVLBG2",{
    		label: new sap.ui.commons.Label({text: "AVLB Grade 2", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		/*multiLabels :
                [
                 new sap.ui.commons.Label({text: "AVLB", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 2"}).addStyleClass("wraptextcol")
                 ],*/
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var avlbg2 = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "AVLB2", avlbg2, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : AVLB Grade 2";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "avlbg2").bindProperty("enabled", "enabledavlbg2").bindProperty("visible", "visibleavlbg2").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numavlbg2",
    	       filterProperty : "avlbg2"
    		 }));


    	/* AVLB Total */

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorAVLB",{
    		label: new sap.ui.commons.Label({text: "AVLB", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		/*multiLabels :
                [
                 new sap.ui.commons.Label({text: "AVLB", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 5"}).addStyleClass("wraptextcol")
                 ],*/
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var avlb = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "AVLB", avlb, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : AVLB";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "avlb").bindProperty("enabled", "enabledavlb").bindProperty("visible", "visibleavlb").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numavlb",
    	       filterProperty : "avlb"
    		 }));


    	/* SALE Columns */
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorSALEG1",{
    		label: new sap.ui.commons.Label({text: "SALE Grade 1", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		//headerSpan: [5,1],
    		/*multiLabels :
                [
                 new sap.ui.commons.Label({text: "SALE", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 1"}).addStyleClass("wraptextcol")
                 ],*/
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var saleg1 = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "SALE1", saleg1, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : SALE Grade 1";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "saleg1").bindProperty("enabled", "enabledsaleg1").bindProperty("visible", "visiblesaleg1").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numsaleg1",
    	       filterProperty : "saleg1"
    		 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorSALEG2",{
    		label: new sap.ui.commons.Label({text: "SALE Grade 2", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		/*multiLabels :
                [
                 new sap.ui.commons.Label({text: "SALE", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 2"}).addStyleClass("wraptextcol")
                 ],*/
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var saleg2 = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "SALE2", saleg2, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : SALE Grade 2";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "saleg2").bindProperty("enabled", "enabledsaleg2").bindProperty("visible", "visiblesaleg2").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numsaleg2",
    	       filterProperty : "saleg2"
    		 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorSALEG3",{
    		label: new sap.ui.commons.Label({text: "SALE Grade 3", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		/*multiLabels :
                [
                 new sap.ui.commons.Label({text: "SALE", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 3"}).addStyleClass("wraptextcol")
                 ],*/
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var saleg3 = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "SALE3", saleg3, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : SALE Grade 3";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "saleg3").bindProperty("enabled", "enabledsaleg3").bindProperty("visible", "visiblesaleg3").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numsaleg3",
    	       filterProperty : "saleg3"
    		 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorSALEG4",{
    		label: new sap.ui.commons.Label({text: "SALE Grade 4", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		/*multiLabels :
                [
                 new sap.ui.commons.Label({text: "SALE", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 4"}).addStyleClass("wraptextcol")
                 ],*/
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var saleg4 = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "SALE4", saleg4, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : SALE Grade 4";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "saleg4").bindProperty("enabled", "enabledsaleg4").bindProperty("visible", "visiblesaleg4").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numsaleg4",
    	       filterProperty : "saleg4"
    		 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorSALEG5",{
    		label: new sap.ui.commons.Label({text: "SALE Grade 5", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		/*multiLabels :
                [
                 new sap.ui.commons.Label({text: "SALE", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 5"}).addStyleClass("wraptextcol")
                 ],*/
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var saleg5 = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "SALE5", saleg5, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : SALE Grade 5";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "saleg5").bindProperty("enabled", "enabledsaleg5").bindProperty("visible", "visiblesaleg5").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numsaleg5",
    	       filterProperty : "saleg5"
    		 }));

				 oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorSALEG6",{
				 	label: new sap.ui.commons.Label({text: "SALE Grade 6", textAlign: "Center"}).addStyleClass("wraptextcol"),
				 	/*multiLabels :
				 					[
				 					 new sap.ui.commons.Label({text: "SALE", textAlign: "Center"}).addStyleClass("wraptextcol"),
				 					 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 5"}).addStyleClass("wraptextcol")
				 					 ],*/
				 	 template: new sap.ui.commons.Link({
				 		 press : function(oEvent){
				 				 var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
				 				 if(lineno == "0" && globalSDASHM1AllDepot == true){

				 				 }else{
				 					 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
				 			 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
				 			 var saleg6 = oEvent.getSource().getProperty("text");
				 			 globalDepot = depotcode;
				 			 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
				 			 var location = oEvent.getSource().getBindingContext().getProperty("location");
				 			 oCurrent.setEquipmentLevelDetails(depotcode, "SALE6", saleg6, depotname, location);


				 			 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
				 						" || Status : SALE Grade 6";
				 			 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
				 				 }

				 		 }
				 	 }).bindProperty("text", "saleg6").bindProperty("enabled", "enabledsaleg6").bindProperty("visible", "visiblesaleg6").addStyleClass("borderStyle1 centerAlign"),
				 			 resizable:true,
				 			 width:"75px",
				 			 sortProperty: "numsaleg6",
				 			 filterProperty : "saleg6"
				 	 }));

    	/* SALE Total */

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorSALE",{
    		label: new sap.ui.commons.Label({text: "SALE", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		/*multiLabels :
                [
                 new sap.ui.commons.Label({text: "SALE", textAlign: "Center"}).addStyleClass("wraptextcol"),
                 new sap.ui.commons.Label({wrapping : false, textAlign: "Center", text: "Grade 5"}).addStyleClass("wraptextcol")
                 ],*/
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     if(lineno == "0" && globalSDASHM1AllDepot == true){

    			     }else{
    			    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
    				 var sale = oEvent.getSource().getProperty("text");
    				 globalDepot = depotcode;
    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
    				 var location = oEvent.getSource().getBindingContext().getProperty("location");
    				 oCurrent.setEquipmentLevelDetails(depotcode, "SALE", sale, depotname, location);


    				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
    				 			" || Status : SALE";
    				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
    			     }

    			 }
    		 }).bindProperty("text", "sale").bindProperty("enabled", "enabledsale").bindProperty("visible", "visiblesale").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numsale",
    	       filterProperty : "sale"
    		 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorTOTAL",{
    		 label: new sap.ui.commons.Label({text: "Total", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		 /*template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "tstock").addStyleClass("borderStyle1 centerAlign"),*/
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
				     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
				     if(lineno == "0" && globalSDASHM1AllDepot == true){

				     }else{
				    	 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(true);
						 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
						 var tstock = oEvent.getSource().getProperty("text");
						 globalDepot = depotcode;
						 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
						 var location = oEvent.getSource().getBindingContext().getProperty("location");
						 oCurrent.setEquipmentLevelDetails(depotcode, "TSTOCK", tstock, depotname, location);


						 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
						 			" || Status : Total Stock";
						 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
				     }
				 }
			 }).bindProperty("text", "tstock").bindProperty("enabled", "enabledtstock").bindProperty("visible", "visibletstock").addStyleClass("borderStyle1 centerAlign"),
	           resizable:true,
	           width:"90px",
	           sortProperty: "numtstock",
	           filterProperty : "tstock"
			 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorEDI",{
    		label: new sap.ui.commons.Label({text: "EDI Error", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
				     //var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
				     //if(lineno == "0"){

				     //}else{
					 //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 var edi = oEvent.getSource().getProperty("text");

					 if(depotcode == ""){
						 if(globalSDASHM1AllDepot == true){
							 depotcode = "";
						 }else{
							 depotcode = "MY";
						 }
					 }else{

					 }
					 globalDepot = depotcode;
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 oCurrent.setEquipmentLevelDetails(depotcode, "EDI", edi, depotname, location);


					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
					 			" || Status : EDI Errors Pend. Action";
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
				     //}
				 }
			 }).bindProperty("text", "edi").bindProperty("enabled", "enablededi").bindProperty("visible", "visibleedi").addStyleClass("borderStyle1 centerAlign"),
	           resizable:true,
	           width:"100px",
	           sortProperty: "numedi",
	           filterProperty : "edi"
			 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorROD",{
    		label: new sap.ui.commons.Label({text: "ROD", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "rod").addStyleClass("borderStyle1 centerAlign"),
	           resizable:true,
	           width:"145px",
	           sortProperty: "rod",
	           filterProperty : "rod"
			 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorDOM",{
    		label: new sap.ui.commons.Label({text: "DOM", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "mgr").addStyleClass("borderStyle1 centerAlign"),
	           resizable:true,
	           width:"145px",
	           sortProperty: "mgr",
	           filterProperty : "mgr"
			 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorCOORD",{
    		label: new sap.ui.commons.Label({text: "Co-ordinator", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "coord").addStyleClass("borderStyle1 centerAlign"),
	           resizable:true,
	           width:"145px",
	           sortProperty: "coord",
	           filterProperty : "coord"
			 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorTariff",{
    		label: new sap.ui.commons.Label({text: "Tariff\nChecker", textAlign: "Center"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.Link({
    			 press : function(oEvent){
    			     var lineno = oEvent.getSource().getBindingContext().sPath.split('/')[2];
    			     // if(lineno == "0" && globalSDASHM1AllDepot == true){
							 //
    			     // }else{
							 		 var fulllocation = "";
		    			     var oSdashm2 = new sdashm2();
		    			     //sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
			    				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
			    				 var tariff = oEvent.getSource().getProperty("text");

									 if(depotcode == ""){
										 if(globalSDASHM1AllDepot == true){
											 depotcode = "";
										 }else{
											 depotcode = "MY";
										 }
									 }else{

									 }
									 globalDepot = depotcode;
									 fulllocation = depotcode;
			    				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");

									 if(fulllocation != "MY"){
										 fulllocation = oEvent.getSource().getBindingContext().getProperty("fulllocation");
										 if(fulllocation != "")
												fulllocation = fulllocation.substr(3);
									 }

			    				 oSdashm2.setSDASHM2TariffDetails(fulllocation, "Tariff Checker", tariff);
			    				 var tarriffheader = "Location : " + fulllocation + " || Depot : " + depotcode + " - " + depotname +
			    				 			" || Tariff Checker Details";
			    				 sap.ui.getCore().byId("idSDASHM2LabelTariff").setText(tarriffheader);
    			     //}

    			 }
    		 }).bindProperty("text", "tariff").bindProperty("enabled", "enabledtariff").bindProperty("visible", "visibletariff").addStyleClass("borderStyle1 centerAlign"),
    	       resizable:true,
    	       width:"75px",
    	       sortProperty: "numtariff",
    	       filterProperty : "tariff"
    		 }));

    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column("idSDASHM1TableStatusMonitorCONTACT",{
    		width:"125px",
    		visible : true,
    		label: new sap.ui.commons.Label({text: " ", textAlign: "Center"}).addStyleClass("wraptextcol"),
				template: new sap.ui.layout.HorizontalLayout({
			   		    content : [
			   		               	oCurrent.getContactIcon().addStyleClass("smallIcons"),
			   		               	//new sap.ui.commons.Label({text: "", width: "10px"}),
					   		            oCurrent.getRatesIcon().addStyleClass("smallIcons"),
					   		            //new sap.ui.commons.Label({text: "", width: "10px"}),
					   		            oCurrent.getDocumentIcon().addStyleClass("smallIcons"),
				   		            new sap.ui.commons.Label({text: "", width: "10px"})
			   		               ],
			 }),
			 resizable:true,
			 }));




    	var printPersoData = function(sJSON) {
			//jQuery("#perso-data").html(sJSON
    	//	console.log(sJSON);
			/*	.replace(/\n/g, "<br>")
				.replace(/\s/g, "&nbsp;")
				.replace(/(true)/g, "<span style=\"color:green\">$1</span>")
				.replace(/(false)/g, "<span style=\"color:red\">$1</span>"));*/
		};

		var oPersoService = {

			getPersData: function() {
				var oDeferred = jQuery.Deferred();
				var sJSON = window.localStorage.getItem("oSDASHM1TableStatusMonitorPersonal") || "{}";
				printPersoData(sJSON);
				var oBundle = JSON.parse(sJSON);
				oDeferred.resolve(oBundle);
				return oDeferred.promise();
			},

			setPersData: function(oBundle) {

				var oDeferred = jQuery.Deferred();

				/* grouping additiong */
				var isGrouped = false;
				var grpColumnid = "";
				var grpColumnname = "";

				for(var i=0; i<oBundle.aColumns.length; i++){
					if(oBundle.aColumns[i].grouped == true){
						oBundle.aColumns[i].grouped = false;
						isGrouped = true;
						grpColumnid = oBundle.aColumns[i].id;
					}
				}

				if(isGrouped){

					switch(grpColumnid){
						case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorDEPOT":
							grpColumnname = "depotcode";
							break;
						case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorDEPOTNAME":
							grpColumnname = "depotname";
							break;
						case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorLOCATION":
							grpColumnname = "location";
							break;
							case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorREGION":
								grpColumnname = "region";
								break;
						case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorWEST":
							grpColumnname = "west";
							break;
						case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorAWAP":
							grpColumnname = "awap";
							break;
						case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorAUTH":
							grpColumnname = "authg1";
							break;
						case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorHOLD":
							grpColumnname = "hold";
							break;
						case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorAVLB":
							grpColumnname = "avlbg1";
							break;
						case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorSALE":
							grpColumnname = "saleg2";
							break;
						case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorTOTAL":
							grpColumnname = "tstock";
							break;
						case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorEDI":
							grpColumnname = "edi";
							break;
						case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorROD":
							grpColumnname = "rod";
							break;
						case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorDOM":
							grpColumnname = "mgr";
							break;
						case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorCOORD":
							grpColumnname = "coord";
							break;
					}

					var flags = [], output = [], l = oSDASHMJsonStatusMonitor.length, i;
					for( i=0; i<l; i++) {
					    if( flags[oSDASHMJsonStatusMonitor[i][grpColumnname]]) continue;
					    flags[oSDASHMJsonStatusMonitor[i][grpColumnname]] = true;
					    output.push(oSDASHMJsonStatusMonitor[i][grpColumnname]);
					}
					console.log(output.length + " Unique " + grpColumnname + " found");

					var groupHeaderLength = output.length;
					var valuesLength = oSDASHMJsonStatusMonitor.length;
					var tableLength = groupHeaderLength + valuesLength;
					var oSDASHM1TableStatusMonitor = sap.ui.getCore().byId("idSDASHM1TableStatusMonitor");
					//oSDASHM1TableStatusMonitor.setVisibleRowCount(tableLength);


					}else{
						var oSDASHM1TableStatusMonitor = sap.ui.getCore().byId("idSDASHM1TableStatusMonitor");
						//oSDASHM1TableStatusMonitor.setVisibleRowCount(oSDASHMJsonStatusMonitor.length);
					}
					 /* grouping additiong */
				var sJSON = JSON.stringify(oBundle, null, 4);
				window.localStorage.setItem("oSDASHM1TableStatusMonitorPersonal", sJSON);
				printPersoData(sJSON);
				oDeferred.resolve();
				return oDeferred.promise();
			},

			delPersData: function() {
				var oDeferred = jQuery.Deferred();
				window.localStorage.removeItem("oSDASHM1TableStatusMonitorPersonal");
				printPersoData("");
				oDeferred.resolve();
				return oDeferred.promise();
			}

		};

		jQuery.sap.require("sap.ui.table.TablePersoController");
		var oSDASHM1TableStatusMonitorTPC = new sap.ui.table.TablePersoController("idSDASHM1TableStatusMonitorTPC", {
			table: oSDASHM1TableStatusMonitor,
			persoService: oPersoService,
			hasGrouping: true
		});
		globalSDASHM1TableStatusMonitorTPC = oSDASHM1TableStatusMonitorTPC;

		// MACGRAPH+
		/*
		oDataCusTS = [];
		oDataChart = {
				'west' : [],
				'awap' : [],
				'auth' : []
		};
		var dataresults = [];
		dataresults.push({
			Status : "WEST",
			Country : "Philippines",
			QuanPerc : "14"
		});
		dataresults.push({
			Status : "WEST",
			Country : "India",
			QuanPerc : "14"
		});
		dataresults.push({
			Status : "WEST",
			Country : "Sinagpore",
			QuanPerc : "14"
		});
		dataresults.push({
			Status : "WEST",
			Country : "Utd. Arab Emir.",
			QuanPerc : "3"
		});
		dataresults.push({
			Status : "WEST",
			Country : "Malaysia",
			QuanPerc : "4"
		});
		dataresults.push({
			Status : "WEST",
			Country : "Indonesia",
			QuanPerc : "16"
		});
		dataresults.push({
			Status : "WEST",
			Country : "Vietnam",
			QuanPerc : "4"
		});
		dataresults.push({
			Status : "WEST",
			Country : "Thailand",
			QuanPerc : "27"
		});


		dataresults.push({
			Status : "AWAP",
			Country : "India",
			QuanPerc : "12"
		});
		dataresults.push({
			Status : "AWAP",
			Country : "Sinagpore",
			QuanPerc : "11"
		});
		dataresults.push({
			Status : "AWAP",
			Country : "Utd. Arab Emir.",
			QuanPerc : "2"
		});
		dataresults.push({
			Status : "AWAP",
			Country : "Malaysia",
			QuanPerc : "5"
		});
		dataresults.push({
			Status : "AWAP",
			Country : "Indonesia",
			QuanPerc : "43"
		});
		dataresults.push({
			Status : "AWAP",
			Country : "Vietnam",
			QuanPerc : "3"
		});
		dataresults.push({
			Status : "AWAP",
			Country : "Thailand",
			QuanPerc : "23"
		});


		dataresults.push({
			Status : "AUTH",
			Country : "Vietnam",
			QuanPerc : "1"
		});
		dataresults.push({
			Status : "AUTH",
			Country : "India",
			QuanPerc : "28"
		});
		dataresults.push({
			Status : "AUTH",
			Country : "Sinagpore",
			QuanPerc : "16"
		});
		dataresults.push({
			Status : "AUTH",
			Country : "Utd. Arab Emir.",
			QuanPerc : "11"
		});
		dataresults.push({
			Status : "AUTH",
			Country : "Malaysia",
			QuanPerc : "6"
		});
		dataresults.push({
			Status : "AUTH",
			Country : "Indonesia",
			QuanPerc : "27"
		});
		dataresults.push({
			Status : "AUTH",
			Country : "Thailand",
			QuanPerc : "10"
		});

		for(var i=0; i<dataresults.length; i++){
			if(dataresults[i].Status == "WEST"){
				oDataChart.west.push({
							"Status": dataresults[i].Status,
							"Country": dataresults[i].Country,
							"QuanPerc": dataresults[i].QuanPerc
						});
			}else if(dataresults[i].Status == "AWAP"){
				oDataChart.awap.push({
							"Status": dataresults[i].Status,
							"Country": dataresults[i].Country,
							"QuanPerc": dataresults[i].QuanPerc
						});
			}else if(dataresults[i].Status == "AUTH"){
				oDataChart.auth.push({
							"Status": dataresults[i].Status,
							"Country": dataresults[i].Country,
							"QuanPerc": dataresults[i].QuanPerc
						});
			}
	 }

	 var oModelChartWEST = new sap.ui.model.json.JSONModel();
	 oModelChartWEST.setData(oDataChart);

	 var oModelChartAWAP = new sap.ui.model.json.JSONModel();
	 oModelChartAWAP.setData(oDataChart);

	 var oModelChartAUTH = new sap.ui.model.json.JSONModel();
	 oModelChartAUTH.setData(oDataChart);



			 var oSDASHM1ChartAUTH = new sap.viz.ui5.controls.VizFrame("idSDASHM1ChartAUTH",{
					 height : "300px",
					 uiConfig : "{applicationSet:'fiori'}",
					 vizType : "pie",
					 legendVisible : true,
					 width : "100%",
					 selectData : function(oEvent){
							 var clickStatus = "AUTH";
							 var clickCountry = oEvent.getParameter("data")[0].data.Country;
					 }
			 });


			 var oDatasetChartAUTH = new sap.viz.ui5.data.FlattenedDataset({
								 dimensions : [{
									 axis : 1,
									 name : 'Country',
									 value : "{Country}"}],

								 measures : [

										 {name : 'Stock %',
										 value : '{QuanPerc}'},

										 ],

								 data : {
									 path : "/auth"
								 }
							 });
							 oSDASHM1ChartAUTH.setDataset(oDatasetChartAUTH);


	 //	5.Set Viz properties

							 oSDASHM1ChartAUTH.setVizProperties({
								 title:{
									 text : "AUTH"
								 },
								 plotArea: {
									 colorPalette : d3.scale.category20().range(),
									 drawingEffect: "glossy",
									 dataLabel:{
											visible:false,
											hideWhenOverlap:false,
											type:"percentage"
										}
								 }
								 });

							 var feedSize = new sap.viz.ui5.controls.common.feeds.FeedItem({
										 'uid': "size",
										 'type': "Measure",
										 'values': ["Stock %"]
									 });
							 oSDASHM1ChartAUTH.addFeed(feedSize);

							 var feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
										 'uid': "color",
										 'type': "Dimension",
										 'values': ["Country"]
									 });

							 oSDASHM1ChartAUTH.addFeed(feedColor);

			 // Set Model
			 oSDASHM1ChartAUTH.setModel(oModelChartAUTH);



		var oSDASHM1ChartWEST = new sap.viz.ui5.controls.VizFrame("idSDASHM1ChartWEST",{
				height : "300px",
				uiConfig : "{applicationSet:'fiori'}",
				vizType : "pie",
				legendVisible : true,
				width : "100%",
				selectData : function(oEvent){
						var clickStatus = "WEST";
						var clickCountry = oEvent.getParameter("data")[0].data.Country;
				}
		});


		var oDatasetChartWEST = new sap.viz.ui5.data.FlattenedDataset({
		    			dimensions : [{
		    				axis : 1,
		    			  name : 'Country',
		    				value : "{Country}"}],

		    			measures : [

		    					{name : 'Stock %',
		    					value : '{QuanPerc}'},

		    					],

		    			data : {
		    				path : "/west"
		    			}
		    		});
		    		oSDASHM1ChartWEST.setDataset(oDatasetChartWEST);


//	5.Set Viz properties

		    		oSDASHM1ChartWEST.setVizProperties({
		    			title:{
		    				text : "WEST"
		    			},
              plotArea: {
              	colorPalette : d3.scale.category20().range(),
              	drawingEffect: "glossy",
                dataLabel:{
                   visible:false,
									 hideWhenOverlap:false,
								   type:"percentage"
                 }
          		}
							});

		    		var feedSize = new sap.viz.ui5.controls.common.feeds.FeedItem({
		    		      'uid': "size",
		    		      'type': "Measure",
		    		      'values': ["Stock %"]
		    		    });
		    		oSDASHM1ChartWEST.addFeed(feedSize);

		    		var feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
		    		      'uid': "color",
		    		      'type': "Dimension",
		    		      'values': ["Country"]
		    		    });

		    		oSDASHM1ChartWEST.addFeed(feedColor);

	  // Set Model
		oSDASHM1ChartWEST.setModel(oModelChartWEST);



				var oSDASHM1ChartAWAP = new sap.viz.ui5.controls.VizFrame("idSDASHM1ChartAWAP",{
						height : "300px",
						uiConfig : "{applicationSet:'fiori'}",
						vizType : "pie",
						legendVisible : true,
						width : "100%",
						selectData : function(oEvent){
								var clickStatus = "AWAP";
								var clickCountry = oEvent.getParameter("data")[0].data.Country;
						}
				});


				var oDatasetChartAWAP = new sap.viz.ui5.data.FlattenedDataset({
				    			dimensions : [{
				    				axis : 1,
				    			  name : 'Country',
				    				value : "{Country}"}],

				    			measures : [

				    					{name : 'Stock %',
				    					value : '{QuanPerc}'},

				    					],

				    			data : {
				    				path : "/awap"
				    			}
				    		});
				    		oSDASHM1ChartAWAP.setDataset(oDatasetChartAWAP);


		//	5.Set Viz properties

				    		oSDASHM1ChartAWAP.setVizProperties({
				    			title:{
				    				text : "AWAP"
				    			},
		              plotArea: {
		              	colorPalette : d3.scale.category20().range(),
		              	drawingEffect: "glossy",
		                dataLabel:{
		                   visible:false,
											 hideWhenOverlap:false,
										   type:"percentage"
		                 }
		          		}
									});

				    		var feedSize = new sap.viz.ui5.controls.common.feeds.FeedItem({
				    		      'uid': "size",
				    		      'type': "Measure",
				    		      'values': ["Stock %"]
				    		    });
				    		oSDASHM1ChartAWAP.addFeed(feedSize);

				    		var feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
				    		      'uid': "color",
				    		      'type': "Dimension",
				    		      'values': ["Country"]
				    		    });

				    		oSDASHM1ChartAWAP.addFeed(feedColor);

			  // Set Model
				oSDASHM1ChartAWAP.setModel(oModelChartAWAP);

		// SDASHM3 - Layout - Charts

		var oSDASHM1LayoutCharts = new sap.ui.layout.form.ResponsiveGridLayout("idSDASHM1LayoutCharts",{
										    });

		// SDASHM3 - Flex - Header Details

		var oSDASHM1FormCharts = new sap.ui.layout.form.Form("idSDASHM1FormCharts",{
	        layout: oSDASHM1LayoutCharts,
	        formContainers: [
	                new sap.ui.layout.form.FormContainer({
	                    formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [ oSDASHM1ChartWEST, oSDASHM1ChartAWAP, oSDASHM1ChartAUTH]
											})
	                  ]
	                })

	        ]
		    }).addStyleClass("marginTopBottom10");

		// SDASHM1 - Panel - Charts

		var oSDASHM1PanelCharts = new sap.m.Panel("idSDASHM1PanelCharts",{
			busy : false, // boolean
			busyIndicatorDelay : 1000, // int
			visible : true, // boolean
			headerText : "Overview", // string
			width : "100%",
			height : "auto", // sap.ui.core.CSSSize
			expandable : true, // boolean, since 1.22
			expanded : false, // boolean, since 1.22
			expandAnimation : true, // boolean, since 1.26
			content : [oSDASHM1FormCharts], // sap.ui.core.Control
		});
		*/
		// MACGRAPH+

			// MACFILTER+
			/* Filters */
			var onewfnetafilters = new newfnetafilters();
			var oPanelFilter = onewfnetafilters.createPanelFilter();
			// MACFILTER+

    	/* SDASHM1 - Flexbox - Pending Approval */

		var oSDASHM1FlexStatusMonitor = new sap.m.FlexBox({
		         items: [
									  oSDASHM1FlexStatusMonitorTitle,
									  new sap.ui.commons.Label({
										 text : "",
										 width : "10px"
									  }),
							 			// MACGRAPH+
							 			// oSDASHM1PanelCharts,
										// new sap.ui.commons.Label({
										// 	text : "",
										// 	width : "10px"
										// }),
										// MACGRAPH+
										// MACFILTER+
										oPanelFilter,
										// MACFILTER+
										oSDASHM1TableStatusMonitor
		       ],
		       direction : "Column",
		       visible: true,
		}).addStyleClass("marginLeft20");


		return oSDASHM1FlexStatusMonitor;


	},

	/* SDASHM1 - Function - Set Status Monitor Values */

	setSDASHM1Values : function(all, login){
		var oCurrent = this;
		var bname = sessionStorage.uName.toUpperCase();
		var currentdate = new Date();
		var currenthour = parseInt(currentdate.getHours());

		if(currenthour < 12){
			sap.ui.getCore().byId("idSDASHM1LabelStatusMonitor").setText("Good Morning, " + sessionStorage.name);
		}else if(currenthour >= 12 && currenthour < 17){
			sap.ui.getCore().byId("idSDASHM1LabelStatusMonitor").setText("Good Afternoon, " + sessionStorage.name);
		}else{
			sap.ui.getCore().byId("idSDASHM1LabelStatusMonitor").setText("Good Evening, " + sessionStorage.name);
		}

		if(all){
			bname = "";
		}else{

		}

				var urlToSap = "depotview1Set?$filter=Bname eq '" + bname + "'";
        urlToSap = serviceDEP + urlToSap;

        oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
        busyDialog.open();
        console.log(urlToSap);
        OData.request({
                      requestUri: urlToSap,
                      method: "GET",
                      dataType: 'json',
                      headers:
                      {
                      "X-Requested-With": "XMLHttpRequest",
                      "Content-Type": "application/json; charset=utf-8",
                      "DataServiceVersion": "2.0",
                      "X-CSRF-Token":"Fetch"
                      }
                      },
                      function (data, response){

                      var depotView1Result = data.results;
                      oSDASHMJsonStatusMonitor = [];
                      if(depotView1Result.length == 0){
												//oCurrent.filterF4Values();

												if(login == true){	// If no depots assigned, then get all depot data
					          				globalSDASHM1AllDepot = true;
					          				oCurrent.setSDASHM1Values(globalSDASHM1AllDepot, false);
														return;
		          			  	}

		                	  // if(all){
		                  	// 		sap.ui.getCore().byId("idSDASHM1ButtonStatusMonitorAllDepot").setText("Show my depots");
		                		// }else{
		                		// 	sap.ui.getCore().byId("idSDASHM1ButtonStatusMonitorAllDepot").setText("Show all depots");
		                		// }

                    	// console.log("Get Seaco Depot View 1 Success; but returned nothing");
                    	// var oSDASHM1ModelStatusMonitor = new sap.ui.model.json.JSONModel();
              				// oSDASHM1ModelStatusMonitor.setData({modelData: oSDASHMJsonStatusMonitor});
											//
	                  	// var oSDASHM1TableStatusMonitor = sap.ui.getCore().byId("idSDASHM1TableStatusMonitor");
	                  	// oSDASHM1TableStatusMonitor.setModel(oSDASHM1ModelStatusMonitor);
	                  	// oSDASHM1TableStatusMonitor.bindRows("/modelData");


	                  	globalSDASHM1TableStatusMonitorTPC.refresh();
                      }else{

	                  		if(all){
	                  			sap.ui.getCore().byId("idSDASHM1ButtonStatusMonitorAllDepot").setText("Show my depots");
	                		}else{
	                			sap.ui.getCore().byId("idSDASHM1ButtonStatusMonitorAllDepot").setText("Show all depots");
	                		}

                    	  console.log("Get Seaco Depot View 1 Success");

                    	  /*Set updated date and time */

                    	  // idSDASHM1LabelStatusMonitor
                    	  var vformattedupddate = "";
                    	  if(depotView1Result[0].UpDate != null){
                              var vupdatedate = depotView1Result[0].UpDate.split("(");
                              var vupddate = vupdatedate[1].split(")");
                              vformattedupddate = new Date(Number(vupddate[0]));
                              //var upddatenew = dateFormat(new Date(Number(vupddate[0])), 'dd/mm/yyyy',"UTC"); // MACC_17022017 changed from '-' to '/'
                          }

                    	  var upddatenew = vformattedupddate.toString().substr(0,3) + ', ' + vformattedupddate.toString().substr(4,11);

                    	  var updatedtime = depotView1Result[0].UpTime;
                    	  updatedtime = updatedtime.replace(/[HMS]/g, ":").substring(2,10);

                    	  upddatenew = upddatenew + ' ' + updatedtime + ' GMT+1';	//GMT+1
                    	  var newDate = new Date(upddatenew);
                    	  console.log(newDate.toLocaleString());

                    	  newDate = newDate.toString().substr(0,25);
												newDate = [newDate.slice(0, 3), ',', newDate.slice(3)].join('');
                    	  var updatedstring = "Inventory Monitor - As on " + newDate;
                    	  //sap.ui.getCore().byId("idSDASHM1LabelStatusMonitor").setText(updatedstring);



                	  var splitlocation = [];
                      var location = "";
											var regioncode = "";
											var regiontext = "";
                      for(var j=0; j<depotView1Result.length; j++){

                      /*if(invoiceResult[j].Invoiced != null){
                      var vMessageDate = invoiceResult[j].Invoiced.split("(");
                      var vMsgDate = vMessageDate[1].split(")");
                      //var vformattedMessageDate = new Date(Number(vMsgDate[0]));
                      var invoiced = dateFormat(new Date(Number(vMsgDate[0])), 'dd/mm/yyyy',"UTC"); // MACC_17022017 changed from '-' to '/'
                      }*/

                    	  if(j == 0){
                        	  location = "";
                          }else{
                        	  splitlocation = depotView1Result[j].Zlocation.split('-');
                        	  location = splitlocation[1] + "-" + splitlocation[2] + "-" + splitlocation[3];
														regioncode = splitlocation[0];
														switch (regioncode) {
															case 'EA':
															  regiontext = 'Europe-Africa';
																break;
															case 'AP':
															  regiontext = 'Asia Pacific';
																break;
															case 'AM':
															  regiontext = 'Americas';
																break;
															case 'OC':
															  regiontext = 'Oceania';
																break;
															default:

														}
                          }

                    	  oSDASHMJsonStatusMonitor.push({
                    			depotcode : (j == 0)? "": String(parseInt(depotView1Result[j].Zdepcode)),
                    			depotname : (j == 0)? "": depotView1Result[j].Zdepname,
                    			fulllocation : depotView1Result[j].Zlocation,
                    			location : location,
													regioncode : regiontext,

                    			west : String(depotView1Result[j].Zwest),
                    			visiblewest : (depotView1Result[j].Zwest == 0)? false: true,
                    			enabledwest : (j == 0)?true: true,
                    			numwest : depotView1Result[j].Zwest,

                    			awap : String(depotView1Result[j].Zawap),
                    			visibleawap : (depotView1Result[j].Zawap == 0)? false: true,
                    			enabledawap : (j == 0)?true: true,
                    			numawap : depotView1Result[j].Zawap,

                    			/* Auth Grade */
                    			authg1 : String(depotView1Result[j].AuthGrade1),
                    			visibleauthg1 : (depotView1Result[j].AuthGrade1 == 0)? false: true,
                    			enabledauthg1 : (j == 0)?true: true,
                    			numauthg1 : depotView1Result[j].AuthGrade1,

                    			authg2 : String(depotView1Result[j].AuthGrade2),
                    			visibleauthg2 : (depotView1Result[j].AuthGrade2 == 0)? false: true,
                    			enabledauthg2 : (j == 0)?true: true,
                    			numauthg2 : depotView1Result[j].AuthGrade2,

                    			authg3 : String(depotView1Result[j].AuthGrade3),
                    			visibleauthg3 : (depotView1Result[j].AuthGrade3 == 0)? false: true,
                    			enabledauthg3 : (j == 0)?true: true,
                    			numauthg3 : depotView1Result[j].AuthGrade3,

                    			authg4 : String(depotView1Result[j].AuthGrade4),
                    			visibleauthg4 : (depotView1Result[j].AuthGrade4 == 0)? false: true,
                    			enabledauthg4 : (j == 0)?true: true,
                    			numauthg4 : depotView1Result[j].AuthGrade4,

                    			authg5 : String(depotView1Result[j].AuthGrade5),
                    			visibleauthg5 : (depotView1Result[j].AuthGrade5 == 0)? false: true,
                    			enabledauthg5 : (j == 0)?true: true,
                    			numauthg5 : depotView1Result[j].AuthGrade5,

													authg6 : String(depotView1Result[j].AuthGrade6),
                    			visibleauthg6 : (depotView1Result[j].AuthGrade6 == 0)? false: true,
                    			enabledauthg6 : (j == 0)?true: true,
                    			numauthg6 : depotView1Result[j].AuthGrade6,

                    			auth : String(depotView1Result[j].Zauth),
                    			visibleauth : (depotView1Result[j].Zauth == 0)? false: true,
                    			enabledauth : (j == 0)?true: true,
                    			numauth : depotView1Result[j].Zauth,

                    			/* Hold Grade */

                    			holdg1 : String(depotView1Result[j].HoldGrade1),
                    			visibleholdg1 : (depotView1Result[j].HoldGrade1 == 0)? false: true,
                    			enabledholdg1 : (j == 0)?true: true,
                    			numholdg1 : depotView1Result[j].HoldGrade1,

                    			holdg2 : String(depotView1Result[j].HoldGrade2),
                    			visibleholdg2 : (depotView1Result[j].HoldGrade2 == 0)? false: true,
                    			enabledholdg2 : (j == 0)?true: true,
                    			numholdg2 : depotView1Result[j].HoldGrade2,

                    			holdg3 : String(depotView1Result[j].HoldGrade3),
                    			visibleholdg3 : (depotView1Result[j].HoldGrade3 == 0)? false: true,
                    			enabledholdg3 : (j == 0)?true: true,
                    			numholdg3 : depotView1Result[j].HoldGrade3,

                    			holdg4 : String(depotView1Result[j].HoldGrade4),
                    			visibleholdg4 : (depotView1Result[j].HoldGrade4 == 0)? false: true,
                    			enabledholdg4 : (j == 0)?true: true,
                    			numholdg4 : depotView1Result[j].HoldGrade4,

                    			holdg5 : String(depotView1Result[j].HoldGrade5),
                    			visibleholdg5 : (depotView1Result[j].HoldGrade5 == 0)? false: true,
                    			enabledholdg5 : (j == 0)?true: true,
                    			numholdg5 : depotView1Result[j].HoldGrade5,

													holdg6 : String(depotView1Result[j].HoldGrade5),
                    			visibleholdg6 : (depotView1Result[j].HoldGrade5 == 0)? false: true,
                    			enabledholdg6 : (j == 0)?true: true,
                    			numholdg6 : depotView1Result[j].HoldGrade5,

                    			hold : String(depotView1Result[j].Zhold),
                    			visiblehold : (depotView1Result[j].Zhold == 0)? false: true,
                    			enabledhold : (j == 0)?true: true,
                    			numhold : depotView1Result[j].Zhold,

													holdc : String(depotView1Result[j].HoldComm),
                    			visibleholdc : (depotView1Result[j].HoldComm == 0)? false: true,
                    			enabledholdc : (j == 0)?true: true,
                    			numholdc : depotView1Result[j].HoldComm,

                    			/* Avlb Grade */

                    			avlbg1 : String(depotView1Result[j].AvlbGrade1),
                    			visibleavlbg1 : (depotView1Result[j].AvlbGrade1 == 0)? false: true,
                    			enabledavlbg1 : (j == 0)?true: true,
                    			numavlbg1 : depotView1Result[j].AvlbGrade1,

                    			avlbg2 : String(depotView1Result[j].AvlbGrade2),
                    			visibleavlbg2 : (depotView1Result[j].AvlbGrade2 == 0)? false: true,
                    			enabledavlbg2 : (j == 0)?true: true,
                    			numavlbg2 : depotView1Result[j].AvlbGrade2,

                    			avlb : String(depotView1Result[j].Zavlb),
                    			visibleavlb : (depotView1Result[j].Zavlb == 0)? false: true,
                    			enabledavlb : (j == 0)?true: true,
                    			numavlb : depotView1Result[j].Zavlb,

                    			/* Sale Grade */

                    			saleg1 : String(depotView1Result[j].SaleGrade1),
                    			visiblesaleg1 : (depotView1Result[j].SaleGrade1 == 0)? false: true,
                    			enabledsaleg1 : (j == 0)?true: true,
                    			numsaleg1 : depotView1Result[j].SaleGrade1,

                    			saleg2 : String(depotView1Result[j].SaleGrade2),
                    			visiblesaleg2 : (depotView1Result[j].SaleGrade2 == 0)? false: true,
                    			enabledsaleg2 : (j == 0)?true: true,
                    			numsaleg2 : depotView1Result[j].SaleGrade2,

                    			saleg3 : String(depotView1Result[j].SaleGrade3),
                    			visiblesaleg3 : (depotView1Result[j].SaleGrade3 == 0)? false: true,
                    			enabledsaleg3 : (j == 0)?true: true,
                    			numsaleg3 : depotView1Result[j].SaleGrade3,

                    			saleg4 : String(depotView1Result[j].SaleGrade4),
                    			visiblesaleg4 : (depotView1Result[j].SaleGrade4 == 0)? false: true,
                    			enabledsaleg4 : (j == 0)?true: true,
                    			numsaleg4 : depotView1Result[j].SaleGrade4,

                    			saleg5 : String(depotView1Result[j].SaleGrade5),
                    			visiblesaleg5 : (depotView1Result[j].SaleGrade5 == 0)? false: true,
                    			enabledsaleg5 : (j == 0)?true: true,
                    			numsaleg5 : depotView1Result[j].SaleGrade5,

													saleg6 : String(depotView1Result[j].SaleGrade6),
													visiblesaleg6 : (depotView1Result[j].SaleGrade6 == 0)? false: true,
													enabledsaleg6 : (j == 0)?true: true,
													numsaleg6 : depotView1Result[j].SaleGrade6,

                    			sale : String(depotView1Result[j].Zsale),
                    			visiblesale : (depotView1Result[j].Zsale == 0)? false: true,
                    			enabledsale : (j == 0)?true: true,
                    			numsale : depotView1Result[j].Zsale,

                    			/* Tariff Chcker */
                    			tariff : String(depotView1Result[j].TariffCheck),
                    			visibletariff : (depotView1Result[j].TariffCheck == 0)? false: true,
                    			enabledtariff : (j == 0)?true: true,
                    			numtariff : depotView1Result[j].TariffCheck,

                    			tstock : String(depotView1Result[j].Ztotstock),
                    			visibletstock : (depotView1Result[j].Ztotstock == 0)? false: true,
                    			enabledtstock : (j == 0)?true: true,
                    			numtstock : depotView1Result[j].Ztotstock,

                    			edi : String(depotView1Result[j].Zedierr),
                    			visibleedi : (depotView1Result[j].Zedierr == 0)? false: true,
                    			enablededi : (j == 0)?true: true,
                    			numedi : depotView1Result[j].Zedierr,

                    			rod : (j == 0)? "": depotView1Result[j].Zrodname,
                    			mgr : (j == 0)? "": depotView1Result[j].Zdopsname,
                    			coord :(j == 0)? "": depotView1Result[j].Zopsco,

                    			contact : "Contact",
                    			contactVisible : (j == 0)? false: oJSONSDASHMAuthorizationRoles["ZMNR.DEPOTCONTACTBUTTON"],

            							rates : "Rates",
                    			ratesVisible : (j == 0)? false: oJSONSDASHMAuthorizationRoles["ZMNR.DOCRATESBUTTON"],

													docsVisible : (j == 0)? false: oJSONSDASHMAuthorizationRoles["ZMNR.DOCRATESBUTTON"],

                    			address : depotView1Result[j].Zaddr1,
                    			postal : depotView1Result[j].Zpostal,
                    			region : depotView1Result[j].Zregion,
                    			country : depotView1Result[j].Zcountry,
                    			phone : depotView1Result[j].Zphone,
                    			remark : depotView1Result[j].Zremark,
                    			fax : depotView1Result[j].Zfax,
                    			mailid : depotView1Result[j].Zmailid,
                         });

                      }

                      var oSDASHM1ModelStatusMonitor = new sap.ui.model.json.JSONModel();
              			  oSDASHM1ModelStatusMonitor.setData({modelData: oSDASHMJsonStatusMonitor});

	                  	var oSDASHM1TableStatusMonitor = sap.ui.getCore().byId("idSDASHM1TableStatusMonitor");
	                  	oSDASHM1TableStatusMonitor.setModel(oSDASHM1ModelStatusMonitor);
	                  	oSDASHM1TableStatusMonitor.bindRows("/modelData");

	                  	var oSDASHMJsonStatusMonitorLength = oSDASHMJsonStatusMonitor.length;
	                  	if(oSDASHMJsonStatusMonitorLength < 16){
	                  		//oSDASHM1TableStatusMonitor.setVisibleRowCount(oSDASHMJsonStatusMonitorLength);
	                  		oSDASHM1TableStatusMonitor.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	                  	}
	                  	else{
	                  		/*oSDASHM1TableStatusMonitor.setVisibleRowCount(15);
	                  		oSDASHM1TableStatusMonitor.setNavigationMode(sap.ui.table.NavigationMode.Paginator);*/
	                  		//oSDASHM1TableStatusMonitor.setVisibleRowCount(15);
	                  		oSDASHM1TableStatusMonitor.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	                  	}

	                  	globalSDASHM1TableStatusMonitorTPC.refresh();

											var oSDASHM1TableStatusMonitor = sap.ui.getCore().byId("idSDASHM1TableStatusMonitor");
											var iColCounter = 0;
											oSDASHM1TableStatusMonitor.clearSelection();
											var iTotalCols = oSDASHM1TableStatusMonitor.getColumns().length;
											var oListBinding = oSDASHM1TableStatusMonitor.getBinding();
											if (oListBinding) {
											oListBinding.aSorters = null;
											oListBinding.aFilters = null;
											}
											oSDASHM1TableStatusMonitor.getModel().refresh(true);
											for ( iColCounter = 0; iColCounter < iTotalCols; iColCounter++) {
												oSDASHM1TableStatusMonitor.getColumns()[iColCounter].setSorted(false);
												oSDASHM1TableStatusMonitor.getColumns()[iColCounter].setFilterValue("");
												oSDASHM1TableStatusMonitor.getColumns()[iColCounter].setFiltered(false);
											}

	                	/* grouping additiong
	        			var isGrouped = false;
	        			var grpColumnid = "";
	        			var grpColumnname = "";

	        			var oBundleLocal = window.localStorage.getItem("oSDASHM1TableStatusMonitorPersonal") || "{}";

	        			if(oBundleLocal != null && oBundleLocal != "{}"){
	        			oBundleLocal = JSON.parse(oBundleLocal);
	        			for(var i=0; i<oBundleLocal.aColumns.length; i++){
	        				if(oBundleLocal.aColumns[i].grouped == true){
	        					oBundleLocal.aColumns[i].grouped = false;
	        					isGrouped = true;
	        					grpColumnid = oBundleLocal.aColumns[i].id;
	        				}
	        			}

	        			if(isGrouped){

	        				switch(grpColumnid){
							case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorDEPOT":
								grpColumnname = "depotcode";
								break;
							case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorDEPOTNAME":
								grpColumnname = "depotname";
								break;
							case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorLOCATION":
								grpColumnname = "location";
								break;
							case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorWEST":
								grpColumnname = "west";
								break;
							case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorAWAP":
								grpColumnname = "awap";
								break;
							case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorAUTH":
								grpColumnname = "authg1";
								break;
							case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorHOLD":
								grpColumnname = "hold";
								break;
							case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorAVLB":
								grpColumnname = "avlbg1";
								break;
							case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorSALE":
								grpColumnname = "saleg2";
								break;
							case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorTOTAL":
								grpColumnname = "tstock";
								break;
							case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorEDI":
								grpColumnname = "edi";
								break;
							case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorROD":
								grpColumnname = "rod";
								break;
							case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorDOM":
								grpColumnname = "mgr";
								break;
							case "idSDASHM1TableStatusMonitor-idSDASHM1TableStatusMonitorCOORD":
								grpColumnname = "coord";
								break;
						}

	        				var flags = [], output = [], l = oSDASHMJsonStatusMonitor.length, i;
	        				for( i=0; i<l; i++) {
	        				    if( flags[oSDASHMJsonStatusMonitor[i][grpColumnname]]) continue;
	        				    flags[oSDASHMJsonStatusMonitor[i][grpColumnname]] = true;
	        				    output.push(oSDASHMJsonStatusMonitor[i][grpColumnname]);
	        				}
	        				console.log(output.length + " Unique " + grpColumnname + " found");

	        				var groupHeaderLength = output.length;
	        				var valuesLength = oSDASHMJsonStatusMonitor.length;
	        				var tableLength = groupHeaderLength + valuesLength;
	        				var oSDASHM1TableStatusMonitor = sap.ui.getCore().byId("idSDASHM1TableStatusMonitor");
	        				oSDASHM1TableStatusMonitor.setVisibleRowCount(tableLength);


	        				}else{
	        					var oSDASHM1TableStatusMonitor = sap.ui.getCore().byId("idSDASHM1TableStatusMonitor");
	        					oSDASHM1TableStatusMonitor.setVisibleRowCount(oSDASHMJsonStatusMonitor.length);
	        				}
	                    }
	        				 grouping additiong */
									 		// MACFILTER+
									 		oCurrent.filterF4Values();
											// MACFILTER+
                      }
                      //busyDialog.close();
                      },
                      function(error){
                    	  console.log("Get Seaco Depot View 1 Failure");
                    	  busyDialog.close();
                      });


	},

	/* SDASHM1 - Set Filter Values */
	// MACFILTER+
	filterF4Values : function(){

		var urlToSap = "filterf4Set";
		urlToSap = serviceDEP + urlToSap;

		oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
		console.log(urlToSap);
		OData.request({
				requestUri: urlToSap,
				method: "GET",
				dataType: 'json',
				//async : false,
				headers:
				{
				"X-Requested-With": "XMLHttpRequest",
				"Content-Type": "application/json; charset=utf-8",
				"DataServiceVersion": "2.0",
				"X-CSRF-Token":"Fetch"
				}
				},
				function (data, response){


					var filterf4Result = data.results;
					var splitDepot = [];
					for(var i=0;i<filterf4Result.length;i++){
						if(filterf4Result[i].FieldLevel == "GEO"){


						if(filterf4Result[i].Depot != ""){
							splitDepot = filterf4Result[i].Depot.split('$');
						}else{
							splitDepot = [];
						}
						FNASummaryArrayF4.push({
							"Mregion": filterf4Result[i].Mregion.split('$')[0],	// DNANEW +
							"ZMregDesc": filterf4Result[i].Mregion.split('$')[1],	// DNANEW +
							"Region": filterf4Result[i].Region,
							"Country": filterf4Result[i].Country,
							"City": filterf4Result[i].City,
							"Depot": splitDepot[0],	// DNANEW +
							"Depotname": splitDepot[1],	// DNANEW +
							"Pcate": filterf4Result[i].ProdCat,
							"Pclass": filterf4Result[i].ProdClass,	// DNANEW +
							"Matnr": filterf4Result[i].Unit,
							"ZRegDesc":filterf4Result[i].RegionDesc,
							"ZCouDesc":filterf4Result[i].CountryDesc,
							"ZCityDesc":filterf4Result[i].CityDesc,
							"Customer":filterf4Result[i].Customer,
							"Customername":filterf4Result[i].Customername
					});
					}

					if(filterf4Result[i].FieldLevel == "STAT"){
						FNASummaryArraySTAT.push({
							"Status": filterf4Result[i].EquipmentStatus
						});
					}

					if(filterf4Result[i].FieldLevel == "CUST"){
						FNASummaryArrayCUST.push({
							"Customer": filterf4Result[i].Customer,
							"CustomerName": filterf4Result[i].CustomerName
						});
					}

				}
					var fnetaFilter = new newfnetaFilterOuts();
					fnetaFilter.setInitialFilter();
					busyDialog.close();
				},
				function(error){
					console.log("Get F4 Failure");
					busyDialog.close();
				});
	},
	//MACFILTER+
	/* SDASHM1 - Function - Set Equipment Level Details(View 2) */
	setEquipmentLevelDetails : function(depotcode, column, value, depotname, location){
		var oSdashm2 = new sdashm2();
		var oSdashm2EDI = new sdashm2EDI();
		if(column == "EDI"){
			oSdashm2EDI.setSDASHM2ValuesEDILIST(depotcode, column, value, "", depotname, location);
		}else{
			oSdashm2.setSDASHM2Values(depotcode, column, value, "", depotname, location);
		}
	},

	submitSDASHM1Alert : function(stringToPass){

		var urlToSap = "setAlertSet?$filter=" + stringToPass;

		urlToSap = serviceDEP + urlToSap;

		oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
		busyDialog.open();
		console.log(urlToSap);
		OData.request({
				requestUri: urlToSap,
				method: "GET",
				dataType: 'json',
				async : false,
				headers:
				{
				"X-Requested-With": "XMLHttpRequest",
				"Content-Type": "application/json; charset=utf-8",
				"DataServiceVersion": "2.0",
				"X-CSRF-Token":"Fetch"
				}
				},
				function (data, response){
					busyDialog.close();

					var alertResult = data.results;

					if(alertResult.length == 0){
						sap.ui.commons.MessageBox.alert("Sorry, there is an error");
						console.log("Seaco DB Send Alert Successful; but returned nothing");
					}else if(alertResult[0].Result == ''){
						sap.ui.commons.MessageBox.alert("Sorry, there is an error");
						console.log("Seaco DB Send Alert Successful; but returned nothing");
					}else{
						sap.ui.commons.MessageBox.alert("Alert Configuration Done");
						//sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertPopover").close();
						console.log("Seaco DB Send Alert Successful");
					}
				},
				function(error){
					console.log("Set Alerts Failure");
					busyDialog.close();
				});

	},

	setSDASHM1AlertContent : function(alertbutton){

		var oCurrent = this;
		//var oSDASHM1ContentAlertOpsCoord = oCurrent.setContentAlertOpsCoord();
		var oSDASHM1ContentAlertGeneral = oCurrent.setContentAlertGeneral();

		var oSDASHM1ButtonAlertSubmit = new sap.ui.commons.Button({
				text : "Save",
				//styled:false,
				visible:true,
				//type:sap.m.ButtonType.Unstyled,
				//icon: sap.ui.core.IconPool.getIconURI("email"),
				press:function(oEvent){
					var isValid = true;
					//Save General section
					for(var i=0;i<oSDASHM1JsonAlertGeneral.length;i++){
						if(oSDASHM1JsonAlertGeneral[i].Frequency == "" && oSDASHM1JsonAlertGeneral[i].NoOfDaysPend == "" &&
									oSDASHM1JsonAlertGeneral[i].Status == ""){

						}else if(oSDASHM1JsonAlertGeneral[i].Frequency != "" && oSDASHM1JsonAlertGeneral[i].NoOfDaysPend != "" &&
									oSDASHM1JsonAlertGeneral[i].Status != ""){

						}else{
							isValid = false;
						}
					}

					var stringToPass = "";
					var stringCount = 1;

					if(isValid){
						for(var i =0; i < oSDASHM1JsonAlertGeneral.length; i++){
							if(stringToPass == ""){
								stringToPass = stringToPass + "UserId eq '" + sessionStorage.uName.toUpperCase() + "' and "
								+ "UserType eq '" + "U" + "' and Line" + stringCount + " eq '" + oSDASHM1JsonAlertGeneral[i].Frequency.substr(0,1) + "$" +
								oSDASHM1JsonAlertGeneral[i].NoOfDaysPend + "$" +
								oSDASHM1JsonAlertGeneral[i].Status +
								"'";
							}
							else{
								stringToPass = stringToPass + " and Line" + stringCount + " eq '" + oSDASHM1JsonAlertGeneral[i].Frequency.substr(0,1) + "$" +
								oSDASHM1JsonAlertGeneral[i].NoOfDaysPend + "$" +
								oSDASHM1JsonAlertGeneral[i].Status +
								"'";
							}
							stringCount++;
						}

						// Save General sections
						oCurrent.submitSDASHM1Alert(stringToPass);

						// Update General sections
						oCurrent.setValuesAlert("U");
					}else{
						sap.ui.commons.MessageBox.alert("Please either enter Alert Frequency, Status and Days Pending or leave all of them empty", "INFORMATION", "Error");
					}

				}
		});//.addStyleClass("excelBtn marginTop10 floatRight");

		var oSDASHM1ButtonAlertDelete = new sap.ui.commons.Button({
				text : "Delete",
				//styled:false,
				visible:true,
				//type:sap.m.ButtonType.Unstyled,
				//icon: sap.ui.core.IconPool.getIconURI("email"),
				press:function(oEvent){
					var isValid = true;
					//Delete General section

					var stringToPass = "";
					var stringCount = 1;

					if(isValid){
						var arraySelLines = sap.ui.getCore().byId("idSDASHM1AlertGeneralTable").getSelectedIndices();
						for(var i =0; i < oSDASHM1JsonAlertGeneral.length; i++){
							if(arraySelLines.indexOf(i) != -1){
								if(stringToPass == ""){
									stringToPass = stringToPass + "UserId eq '" + sessionStorage.uName.toUpperCase() + "' and "
									+ "UserType eq '" + "U" + "' and Line" + stringCount + " eq '" + "" + "$" +
									"" + "$" +
									"" +
									"'";
								}
								else{
									stringToPass = stringToPass + " and Line" + stringCount + " eq '" + "" + "$" +
									"" + "$" +
									"" +
									"'";
								}
								}else{
									if(stringToPass == ""){
										stringToPass = stringToPass + "UserId eq '" + sessionStorage.uName.toUpperCase() + "' and "
										+ "UserType eq '" + "U" + "' and Line" + stringCount + " eq '" + oSDASHM1JsonAlertGeneral[i].Frequency.substr(0,1) + "$" +
										oSDASHM1JsonAlertGeneral[i].NoOfDaysPend + "$" +
										oSDASHM1JsonAlertGeneral[i].Status +
										"'";
									}
									else{
										stringToPass = stringToPass + " and Line" + stringCount + " eq '" + oSDASHM1JsonAlertGeneral[i].Frequency.substr(0,1) + "$" +
										oSDASHM1JsonAlertGeneral[i].NoOfDaysPend + "$" +
										oSDASHM1JsonAlertGeneral[i].Status +
										"'";
									}
								}
								stringCount++;
								}
						// Save General sections
						oCurrent.submitSDASHM1Alert(stringToPass);

						// Update General sections
						oCurrent.setValuesAlert("U");
					}else{
						//sap.ui.commons.MessageBox.alert("Please either enter Alert Frequency, Status and Days Pending or leave all of them empty", "INFORMATION", "Error");
					}

				}
		});//.addStyleClass("excelBtn marginTop10 floatRight");

		var oSDASHM1ButtonAlertClose = new sap.ui.commons.Button({
				text : "Close",
				//styled:false,
				visible:true,
				//type:sap.m.ButtonType.Unstyled,
				//icon: sap.ui.core.IconPool.getIconURI("email"),
				press:function(oEvent){
					oSDASHM1PopoverAlert.close();
				}
		});//.addStyleClass("excelBtn marginTop10 floatRight");

		/* SDASHM1 - Flexbox - Buttons */

		var oSDASHM1FlexAlertButtons = new sap.m.FlexBox({
						 items: [
										oSDASHM1ButtonAlertClose,
										new sap.m.Label({width : "15px"}),
										oSDASHM1ButtonAlertSubmit,
										new sap.m.Label({width : "15px"}),
										oSDASHM1ButtonAlertDelete
					 ],
					 direction : "Row",
					 visible: true,
					 //justifyContent : "End"
		});

		/* SDASHM1 - Flexbox - Alert Ops Coord and General */

		var oSDASHM1FlexAlertSections = new sap.m.FlexBox({
						 items: [
										// oSDASHM1ContentAlertOpsCoord,
										// new sap.m.Label({width : "45px"}),
										oSDASHM1ContentAlertGeneral
					 ],
					 direction : "Row",
					 visible: true
		});

		/* SDASHM1 - Flexbox - Alert */

		var oSDASHM1FlexAlert = new sap.m.FlexBox({
						 items: [
										oSDASHM1FlexAlertSections,
										new sap.m.Label({width : "15px"}),
										oSDASHM1FlexAlertButtons
					 ],
					 direction : "Column",
					 visible: true
		});


		if(sap.ui.getCore().byId("idSDASHM1PopoverAlert") != undefined)
			sap.ui.getCore().byId("idSDASHM1PopoverAlert").destroy();

		oSDASHM1PopoverAlert = new sap.m.Popover("idSDASHM1PopoverAlert",{
		 title: "Alert Configuration",
	 	 width:"1300px",
		 modal: true,
		 placement: sap.m.PlacementType.Left,
		 content: new sap.m.VBox({
														 //width:"300px",
														 items:  [oSDASHM1FlexAlert]
														 }),

		 }).addStyleClass("sapUiPopupWithPadding");

	oSDASHM1PopoverAlert.openBy(alertbutton);

	},

	setContentAlertOpsCoord : function(){

		if(sap.ui.getCore().byId("idSDASHM1AlertOpsCoordTable") != undefined)
			sap.ui.getCore().byId("idSDASHM1AlertOpsCoordTable").destroy();

		var oSDASHM1AlertOpsCoordTable = new sap.ui.table.Table("idSDASHM1AlertOpsCoordTable",{
			width : "550px",
			title : "Ops Co-ordinator Section",
	 		visibleRowCount: 1,
	 		columnHeaderVisible : true,
	 		selectionMode : sap.ui.table.SelectionMode.None
		}).addStyleClass("sapUiSizeCompact tblBorder");

		// Frequency Column

		if(sap.ui.getCore().byId("idSDASHM1AlertOpsCoordComboBoxFrequency") != undefined)
			sap.ui.getCore().byId("idSDASHM1AlertOpsCoordComboBoxFrequency").destroy();

		var oSDASHM1AlertOpsCoordComboBoxFrequency = new sap.m.ComboBox("idSDASHM1AlertOpsCoordComboBoxFrequency", {
			 selectionChange: function(evnt){
				if(this.getSelectedKey() != '')
				{

				}
			}
		}).bindProperty("selectedKey", "Frequency").addStyleClass("borderStyle1 boldText");

		for(var i=0; i<oSDASHM1OpsCoordJsonFrequency.length;i++){
			oSDASHM1AlertOpsCoordComboBoxFrequency.addItem(new sap.ui.core.ListItem({
					text : oSDASHM1OpsCoordJsonFrequency[i].text,
					key: oSDASHM1OpsCoordJsonFrequency[i].key
				}));
		}
		oSDASHM1AlertOpsCoordComboBoxFrequency.setSelectedKey(oSDASHM1OpsCoordJsonFrequency[0].key);

		oSDASHM1AlertOpsCoordTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Alert Frequency", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: oSDASHM1AlertOpsCoordComboBoxFrequency,
	           resizable:false,
	           width:"130px"
		 	}));

		// Status Column

		if(sap.ui.getCore().byId("idSDASHM1AlertOpsCoordComboBoxStatus") != undefined)
			sap.ui.getCore().byId("idSDASHM1AlertOpsCoordComboBoxStatus").destroy();

		var oSDASHM1AlertOpsCoordComboBoxStatus = new sap.m.ComboBox("idSDASHM1AlertOpsCoordComboBoxStatus", {
			 selectionChange: function(evnt){
				if(this.getSelectedKey() != '')
				{

				}
			}
		}).bindProperty("selectedKey", "Status").addStyleClass("borderStyle1 boldText");

		for(var i=0; i<oSDASHM1OpsCoordJsonStatus.length;i++){
			oSDASHM1AlertOpsCoordComboBoxStatus.addItem(new sap.ui.core.ListItem({
					text : oSDASHM1OpsCoordJsonStatus[i].text,
					key: oSDASHM1OpsCoordJsonStatus[i].key
				}));
		}
		oSDASHM1AlertOpsCoordComboBoxStatus.setSelectedKey(oSDASHM1OpsCoordJsonStatus[0].key);

		oSDASHM1AlertOpsCoordTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Status", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: oSDASHM1AlertOpsCoordComboBoxStatus,
	           resizable:false,
	           width:"130px"
		 	}));


		 oSDASHM1AlertOpsCoordTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Days pending AWAP"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextField({
					 textAlign: "Right"
				 }).bindProperty("value", "NoOfDaysPend").addStyleClass("borderStyle alertdaysinput"),
					 resizable:false,
					 width:"60px"
				 }));

				 oCurrent.setValuesAlert("D");

				return oSDASHM1AlertOpsCoordTable;

	},

	setContentAlertGeneral : function(){
		var oCurrent = this;
		if(sap.ui.getCore().byId("idSDASHM1AlertGeneralTable") != undefined)
		  sap.ui.getCore().byId("idSDASHM1AlertGeneralTable").destroy();

		var oSDASHM1AlertGeneralTable = new sap.ui.table.Table("idSDASHM1AlertGeneralTable",{
		  width : "550px",
		  //title : "General Section",
		  visibleRowCount: 5,
		  columnHeaderVisible : true,
		  selectionMode : sap.ui.table.SelectionMode.MultiToggle
		}).addStyleClass("sapUiSizeCompact tblBorder");

		// Frequency Column

		if(sap.ui.getCore().byId("idSDASHM1AlertGeneralComboBoxFrequency") != undefined)
		  sap.ui.getCore().byId("idSDASHM1AlertGeneralComboBoxFrequency").destroy();

		var oSDASHM1AlertGeneralComboBoxFrequency = new sap.m.ComboBox("idSDASHM1AlertGeneralComboBoxFrequency", {
		   selectionChange: function(evnt){
		    if(this.getSelectedKey() != '')
		    {

		    }
		  }
		}).bindProperty("selectedKey", "Frequency").addStyleClass("borderStyle1 boldText");

		for(var i=0; i<oSDASHM1GeneralJsonFrequency.length;i++){
		  oSDASHM1AlertGeneralComboBoxFrequency.addItem(new sap.ui.core.ListItem({
		      text : oSDASHM1GeneralJsonFrequency[i].text,
		      key: oSDASHM1GeneralJsonFrequency[i].key
		    }));
		}
		oSDASHM1AlertGeneralComboBoxFrequency.setSelectedKey(oSDASHM1GeneralJsonFrequency[0].key);

		oSDASHM1AlertGeneralTable.addColumn(new sap.ui.table.Column({
		  label: new sap.ui.commons.Label({text: "Alert Frequency", textAlign: "Left"}).addStyleClass("wraptextcol"),
		   template: oSDASHM1AlertGeneralComboBoxFrequency,
		         resizable:false,
		         width:"130px"
		  }));

		 oSDASHM1AlertGeneralTable.addColumn(new sap.ui.table.Column({
		     label: new sap.ui.commons.Label({text: "Days Pending"}).addStyleClass("wraptextcol"),
		     template: new sap.ui.commons.TextField({
		       textAlign: "Right"
		     }).bindProperty("value", "NoOfDaysPend").addStyleClass("borderStyle alertdaysinput"),
		       resizable:false,
		       width:"80px"
		     }));

				 // Status Column

				 if(sap.ui.getCore().byId("idSDASHM1AlertGeneralComboBoxStatus") != undefined)
				 	sap.ui.getCore().byId("idSDASHM1AlertGeneralComboBoxStatus").destroy();

				 var oSDASHM1AlertGeneralComboBoxStatus = new sap.m.ComboBox("idSDASHM1AlertGeneralComboBoxStatus", {
				 	 selectionChange: function(evnt){
				 		if(this.getSelectedKey() != '')
				 		{

				 		}
				 	}
				 }).bindProperty("selectedKey", "Status").addStyleClass("borderStyle1 boldText");

				 for(var i=0; i<oSDASHM1GeneralJsonStatus.length;i++){
				 	oSDASHM1AlertGeneralComboBoxStatus.addItem(new sap.ui.core.ListItem({
				 			text : oSDASHM1GeneralJsonStatus[i].text,
				 			key: oSDASHM1GeneralJsonStatus[i].key
				 		}));
				 }
				 oSDASHM1AlertGeneralComboBoxStatus.setSelectedKey(oSDASHM1GeneralJsonStatus[0].key);

				 oSDASHM1AlertGeneralTable.addColumn(new sap.ui.table.Column({
				 	label: new sap.ui.commons.Label({text: "Status", textAlign: "Left"}).addStyleClass("wraptextcol"),
				 	 template: oSDASHM1AlertGeneralComboBoxStatus,
				 				 resizable:false,
				 				 width:"130px"
				 	}));

				oCurrent.setValuesAlert("U");

		    return oSDASHM1AlertGeneralTable;


	},

	setValuesAlert : function(usertype){

		var urlToSap = "getAlertSet?$filter=" + "UserId eq '" + sessionStorage.uName.toUpperCase() + "' and "
		                    + "UserType eq '" + usertype
		                    + "'";

		urlToSap = serviceDEP + urlToSap;

		oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
		busyDialog.open();
		console.log(urlToSap);
		OData.request({
		    requestUri: urlToSap,
		    method: "GET",
		    dataType: 'json',
		    headers:
		    {
		    "X-Requested-With": "XMLHttpRequest",
		    "Content-Type": "application/json; charset=utf-8",
		    "DataServiceVersion": "2.0",
		    "X-CSRF-Token":"Fetch"
		    }
		    },
		    function (data, response){

					oSDASHM1JsonAlertGeneral = data.results;

			    if(oSDASHM1JsonAlertGeneral.length == 0){
			      console.log("Get Alert for General success; but returned nothing");
			    }else{
			      console.log("Get Alert for General success");
			      var oSDASHM1ModelAlertGeneral = new sap.ui.model.json.JSONModel();
			      oSDASHM1ModelAlertGeneral.setData({modelData: oSDASHM1JsonAlertGeneral});

			      var oSDASHM1AlertGeneralTable = sap.ui.getCore().byId("idSDASHM1AlertGeneralTable");
			      oSDASHM1AlertGeneralTable.setModel(oSDASHM1ModelAlertGeneral);
			      oSDASHM1AlertGeneralTable.bindRows("/modelData");
						oSDASHM1AlertGeneralTable.clearSelection();
			    }
					busyDialog.close();

		    },
		    function(error){
		      console.log("Get Alert for General Failure");
		      busyDialog.close();
		    });

	},
	setSDASHM1ReportContent : function(){

		if(sap.ui.getCore().byId("idSDASHM1TableReports") != undefined)
			sap.ui.getCore().byId("idSDASHM1TableReports").destroy();

		var oSDASHM1TableReports = new sap.ui.table.Table("idSDASHM1TableReports",{
    		visibleRowCount: 10,
        width: '400px',
        selectionMode: sap.ui.table.SelectionMode.None,
				columnHeaderVisible : false
		}).addStyleClass("tblBorder");

		oSDASHM1TableReports.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: " ", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 //template: new sap.ui.commons.TextView({
			 //}).bindProperty("text", "depotname").addStyleClass("borderStyle1"),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var link = oEvent.getSource().getBindingContext().getProperty("Link").trim();
					 window.open(link);
				 }
			 }).bindProperty("text", "Name").bindProperty("target", "Link").addStyleClass("borderStyle1"),
	           resizable:false,
	           //width:"150px",
	           //sortProperty: "msgid",
	           //filterProperty : "msgid",
			 }));

		var oSDASHM1FlexReports = new sap.m.FlexBox({
            items: [oSDASHM1TableReports
                    ],
            direction: "Row"
            });

		if(oSDASHMJsonReports.length == 0){
					var urlToSap = "reportsSet";
	        urlToSap = serviceDEP + urlToSap;

	        oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	        busyDialog.open();
	        console.log(urlToSap);
	        OData.request({
	                      requestUri: urlToSap,
	                      method: "GET",
	                      dataType: 'json',

	                      headers:
	                      {
	                      "X-Requested-With": "XMLHttpRequest",
	                      "Content-Type": "application/json; charset=utf-8",
	                      "DataServiceVersion": "2.0",
	                      "X-CSRF-Token":"Fetch"
	                      }
	                      },
	                      function (data, response){


	                      var oSDASHMJsonReports = data.results;

	                      if(oSDASHMJsonReports.length == 0){
	                    	  console.log("Get Reports Success; but returned nothing");
	                      }else{
	                    	var oSDASHM1ModelReports = new sap.ui.model.json.JSONModel();
	                    	oSDASHM1ModelReports.setData({modelData: oSDASHMJsonReports});

	  	                  	var oSDASHM1TableReports = sap.ui.getCore().byId("idSDASHM1TableReports");
	  	                  	oSDASHM1TableReports.setModel(oSDASHM1ModelReports);
	  	                  	oSDASHM1TableReports.bindRows("/modelData");

	  	                  	var oSDASHMJsonReportsLength = oSDASHMJsonReports.length;
	  	                  	if(oSDASHMJsonReportsLength < 11){
														oSDASHM1TableReports.setVisibleRowCount(oSDASHMJsonReportsLength);
														oSDASHM1TableReports.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	  	                  	}
	  	                  	else{
														oSDASHM1TableReports.setVisibleRowCount(10);
	  	                  		oSDASHM1TableReports.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	  	                  	}


	  	                  	var oSDASHM1ButtonStatusMonitorReports = sap.ui.getCore().byId("idSDASHM1ButtonStatusMonitorReports");
	  	                  	var oSDASHM1PopoverStatusMonitorReports = new sap.m.Popover({
	  	                     title: "Quick Links",
	  	                   width:"300px",
	  	                     modal: false,
	  	                     placement: sap.m.PlacementType.Left,
	  	                     footer:  new sap.m.Bar({
	  	                    	 					visible : false,
	  	                                            contentRight: [
	  	                                                          new sap.m.Button({
	  	                                                                           text: "Close",
	  	                                                                           icon: "sap-icon://close",
	  	                                                                           press: function () {
	  	                                                                        	   sap.ui.getCore().byId("idSDASHM1TableStatusMonitorDepotContact").close();
	  	                                                                           }
	  	                                                                           })
	  	                                                          ],
	  	                                            }),
	  	                     content: new sap.m.VBox({
	  	                                             //width:"300px",
	  	                                             items:  [oSDASHM1FlexReports]
	  	                                             }),

	  	                     }).addStyleClass("sapUiPopupWithPadding");

	  	                  oSDASHM1PopoverStatusMonitorReports.openBy(oSDASHM1ButtonStatusMonitorReports);
	                      }
	                      busyDialog.close();
			        },
			        function(error){
			      	  console.log("Get Reports Failure");
			      	  busyDialog.close();
			        });

		}else{
			var oSDASHM1ButtonStatusMonitorReports = sap.ui.getCore().byId("idSDASHM1ButtonStatusMonitorReports");
            	var oSDASHM1PopoverStatusMonitorReports = new sap.m.Popover({
            		width:"300px",
               title: "Quick Links",
               modal: false,
               placement: sap.m.PlacementType.Left,
               footer:  new sap.m.Bar({
              	 					visible : false,
                                      contentRight: [
                                                    new sap.m.Button({
                                                                     text: "Close",
                                                                     icon: "sap-icon://close",
                                                                     press: function () {
                                                                  	   sap.ui.getCore().byId("idSDASHM1TableStatusMonitorDepotContact").close();
                                                                     }
                                                                     })
                                                    ],
                                      }),
               content: new sap.m.VBox({
                                       //width:"300px",
                                       items:  [oSDASHM1FlexReports]
                                       }),

               }).addStyleClass("sapUiPopupWithPadding");

            oSDASHM1PopoverStatusMonitorReports.openBy(oSDASHM1ButtonStatusMonitorReports);
		}
	},

	/* SDASHM1 - Function - Get Rates Icon */
	getRatesIcon : function(){
		var oCurrent = this;
		var oSDASHM1IconRates = new sap.ui.core.Icon( {
	           src : sap.ui.core.IconPool.getIconURI("sales-quote"), //simple-payment
	           size : "20px",
	           color : "black",
						 tooltip : "Depot Rates",
//	           activeColor : "red",
//	           activeBackgroundColor : "white",
//	           hoverColor : "green",
//	           hoverBackgroundColor : "white",
	           width : "20px",
	           visible: "{ratesVisible}",
	           press : function(oEvent){
	        	   var index = oEvent.getSource().getParent().getParent().getIndex();
	   			   var depotcode = oEvent.getSource().getParent().getParent().getParent().getContextByIndex(index).getProperty('depotcode');
	        	   oCurrent.getRatesList(depotcode, oEvent.getSource());
	           }
		 });

		 return oSDASHM1IconRates;
	},

	/* SDASHM1 - Function - Get Rates List */
	getRatesList : function(depotcode, rateicon){

		var oCurrent = this;
		oCurrent.getFreeDays(depotcode);
		oCurrent.getTieredDiscount(depotcode);
		oCurrent.getPurchaseInfo(depotcode);
		oCurrent.ratesListPopup(rateicon);

	},

	/* SDASHM1 - Function - Popup Rates List */
	ratesListPopup : function(rateicon){

		var oCurrent = this;
		var oSDASHM1ContentFreeDays = oCurrent.setContentFreeDays();
		var oSDASHM1ContentTieredDiscount = oCurrent.setContentTieredDiscount();
		var oSDASHM1ContentPurchaseInfo = oCurrent.setContentPurchaseInfo();

		/* SDASHM1 - Flexbox - Free Days and Tiered Discount */

		var oSDASHM1FlexFreeDaysTieredDiscount = new sap.m.FlexBox({
		         items: [
		                oSDASHM1ContentFreeDays,
		                new sap.m.Label({width : "15px"}),
		                oSDASHM1ContentTieredDiscount
		       ],
		       direction : "Row",
		       visible: true
		});

		/* SDASHM1 - Flexbox - Free Days, Tiered Discount flex and Purchase Info */

		var oSDASHM1FlexPopup = new sap.m.FlexBox({
		         items: [
		                oSDASHM1FlexFreeDaysTieredDiscount,
		                new sap.m.Label({width : "15px"}),
		                oSDASHM1ContentPurchaseInfo
		       ],
		       direction : "Column",
		       visible: true
		});

		/* SDASHM1 - Popover - Rates */

		var oSDASHM1PopoverRates = new sap.m.Popover({
	        title: "Rates",
	          width:"1500px",
	          modal: false,
	          placement: sap.m.PlacementType.Left,
	          footer:  new sap.m.Bar({
	         	 					visible : false,
	                                 contentRight: [
	                                               new sap.m.Button({
	                                                                text: "Close",
	                                                                icon: "sap-icon://close",
	                                                                press: function () {
	                                                                }
	                                                                })
	                                               ],
	                                 }),
	          content: new sap.m.VBox({
	                                  //width:"300px",
	                                  items:  [oSDASHM1FlexPopup]
	                                  }),

	          }).addStyleClass("sapUiPopupWithPadding");


		oSDASHM1PopoverRates.openBy(rateicon);

	},

	/* SDASHM1 - Function - Set Content Free Days */
	setContentFreeDays : function(){

		/* SDASHM1 - Table - Free Days */

		var oSDASHM1TableFreeDays = new sap.ui.table.Table({
     		 visibleRowCount: 4,
     		 width: '400px',
     		 showNoData: false,
     		 visible:(oSDASHM1JsonFreeDays.length == 0)?false:true,
             selectionMode: sap.ui.table.SelectionMode.None,
		}).addStyleClass("sapUiSizeCompact tblBorder");

		oSDASHM1TableFreeDays.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Type", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "UnitType").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"30px"
			 }));

		oSDASHM1TableFreeDays.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Begin Date", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "Begda").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"25px"
			 }));

		oSDASHM1TableFreeDays.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "End Date", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "Endda").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"25px"
			 }));

		oSDASHM1TableFreeDays.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Free Days", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : "Right"
			 }).bindProperty("text", "Fdays").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"25px"
			 }));

      	oSDASHM1TableFreeDays.setModel(oSDASHM1ModelFreeDays);
      	oSDASHM1TableFreeDays.bindRows("/modelData");

      	var oSDASHM1JsonFreeDaysLength = oSDASHM1JsonFreeDays.length;
      	if(oSDASHM1JsonFreeDaysLength < 11){
					oSDASHM1TableFreeDays.setVisibleRowCount(oSDASHM1JsonFreeDaysLength);
      		oSDASHM1TableFreeDays.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
      	}
      	else{
					oSDASHM1TableFreeDays.setVisibleRowCount(10);
      		oSDASHM1TableFreeDays.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
      	}

      	return oSDASHM1TableFreeDays;
	},

	/* SDASHM1 - Function - Set Content Tiered Discount */
	setContentTieredDiscount : function(){

		/* SDASHM1 - Table - Tiered Discount */

		var oSDASHM1TableTieredDiscount = new sap.ui.table.Table({
     		 visibleRowCount: 4,
     		width: '600px',
     		showNoData: false,
     		visible:(oSDASHM1JsonTieredDiscount.length == 0)?false:true,
             selectionMode: sap.ui.table.SelectionMode.None,
		}).addStyleClass("sapUiSizeCompact tblBorder");

		oSDASHM1TableTieredDiscount.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Slabs", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "Slabs").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"20px"
			 }));

		oSDASHM1TableTieredDiscount.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Begin Date", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "Begda").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"30px"
			 }));

		oSDASHM1TableTieredDiscount.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "End Date", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "Endda").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"30px"
			 }));

		oSDASHM1TableTieredDiscount.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Range Start", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : "Right"
			 }).bindProperty("text", "TeuDaysF").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"30px"
			 }));

		oSDASHM1TableTieredDiscount.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Range End", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : "Right"
			 }).bindProperty("text", "TeuDaysT").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"30px"
			 }));

		oSDASHM1TableTieredDiscount.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Discount", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : "Right"
			 }).bindProperty("text", "Discount").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"30px"
			 }));

      	oSDASHM1TableTieredDiscount.setModel(oSDASHM1ModelTieredDiscount);
      	oSDASHM1TableTieredDiscount.bindRows("/modelData");

      	var oSDASHM1JsonTieredDiscountLength = oSDASHM1JsonTieredDiscount.length;
      	if(oSDASHM1JsonTieredDiscountLength < 11){
					oSDASHM1TableTieredDiscount.setVisibleRowCount(oSDASHM1JsonTieredDiscountLength);
      		oSDASHM1TableTieredDiscount.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
      	}
      	else{
					oSDASHM1TableTieredDiscount.setVisibleRowCount(10);
      		oSDASHM1TableTieredDiscount.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
      	}

      	return oSDASHM1TableTieredDiscount;

	},

	/* SDASHM1 - Function - Set Content Purchase Info */
	setContentPurchaseInfo : function(){

		/* SDASHM1 - Table - Purchase Info */

		var oSDASHM1TablePurchaseInfo = new sap.ui.table.Table({
     		visibleRowCount: 15,
     		width: '1200px',
     		showNoData: false,
     		visible:(oSDASHM1JsonPurchaseInfo.length == 0)?false:true,
        selectionMode: sap.ui.table.SelectionMode.None,
		}).addStyleClass("sapUiSizeCompact tblBorder");

		oSDASHM1TablePurchaseInfo.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Material", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "Matnr").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"35px"
			 }));

		oSDASHM1TablePurchaseInfo.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Description", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "Maktx").addStyleClass("borderStyle1").addStyleClass("wraptext"),
	           resizable:false,
	           width:"100px"
			 }));

		oSDASHM1TablePurchaseInfo.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Material Group", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "Wgbez").addStyleClass("borderStyle1").addStyleClass("wraptext"),
	           resizable:false,
	           width:"100px"
			 }));

		oSDASHM1TablePurchaseInfo.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Rate", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : "Right"
			 }).bindProperty("text", "Netpr").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"35px"
			 }));

		oSDASHM1TablePurchaseInfo.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Curr.", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "Waers").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"35px"
			 }));

		oSDASHM1TablePurchaseInfo.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Tax \nCode", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "Mwskz").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"35px"
			 }));

		oSDASHM1TablePurchaseInfo.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Begin \nDate", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "Erdat").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"45px"
			 }));

		oSDASHM1TablePurchaseInfo.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "End \nDate", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "Prdat").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"45px"
			 }));

		/*oSDASHM1TablePurchaseInfo.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Category \nID", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "EsokzTxt").addStyleClass("borderStyle1").addStyleClass("wraptext"),
	           resizable:false,
	           width:"35px"
			 }));

		oSDASHM1TablePurchaseInfo.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Info \nRecord", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "Infnr").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"50px"
			 }));*/

      	oSDASHM1TablePurchaseInfo.setModel(oSDASHM1ModelPurchaseInfo);
      	oSDASHM1TablePurchaseInfo.bindRows("/modelData");

      	var oSDASHM1JsonPurchaseInfoLength = oSDASHM1JsonPurchaseInfo.length;
      	if(oSDASHM1JsonPurchaseInfoLength < 15){
					oSDASHM1TablePurchaseInfo.setVisibleRowCount(oSDASHM1JsonPurchaseInfoLength);
      		oSDASHM1TablePurchaseInfo.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
      	}
      	else{
					oSDASHM1TablePurchaseInfo.setVisibleRowCount(15);
      		oSDASHM1TablePurchaseInfo.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
      	}

      	return oSDASHM1TablePurchaseInfo;

	},

	/* SDASHM1 - Function - Get Free Days */
	getFreeDays : function(depotcode){
		oSDASHM1JsonFreeDays = [];
		var urlToSap = "freedaysSet?$filter=IvDepot eq '" + depotcode + "'"; //depotcode
	    urlToSap = serviceDEP + urlToSap;

	    oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	    busyDialog.open();
	    console.log(urlToSap);
	    OData.request({
	                  requestUri: urlToSap,
	                  method: "GET",
	                  dataType: 'json',
										async : false,
	                  headers:
	                  {
	                  "X-Requested-With": "XMLHttpRequest",
	                  "Content-Type": "application/json; charset=utf-8",
	                  "DataServiceVersion": "2.0",
	                  "X-CSRF-Token":"Fetch"
	                  }
	                  },
	                  function (data, response){

	                  oSDASHM1JsonFreeDays = data.results;

	                  if(oSDASHM1JsonFreeDays.length == 0){
	                	  console.log("Get FreeDays Success; but returned nothing");
	                  }else{
	                	oSDASHM1ModelFreeDays.setData({modelData: oSDASHM1JsonFreeDays});
	                  }
	                  busyDialog.close();
		        },
		        function(error){
		      	  console.log("Get FreeDays Failure");
		      	  busyDialog.close();
		        });

	},

	/* SDASHM1 - Function - Get Tiered Discount */
	getTieredDiscount : function(depotcode){
		oSDASHM1JsonTieredDiscount = [];
		var urlToSap = "tierdiscountSet?$filter=IvDepot eq '" + depotcode + "'"; // 1547
	    urlToSap = serviceDEP + urlToSap;

	    oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	    busyDialog.open();
	    console.log(urlToSap);
	    OData.request({
	                  requestUri: urlToSap,
	                  method: "GET",
	                  dataType: 'json',
										async : false,
	                  headers:
	                  {
	                  "X-Requested-With": "XMLHttpRequest",
	                  "Content-Type": "application/json; charset=utf-8",
	                  "DataServiceVersion": "2.0",
	                  "X-CSRF-Token":"Fetch"
	                  }
	                  },
	                  function (data, response){

	                  oSDASHM1JsonTieredDiscount = data.results;

	                  if(oSDASHM1JsonTieredDiscount.length == 0){
	                	  console.log("Get TieredDiscount Success; but returned nothing");
	                  }else{
	                	oSDASHM1ModelTieredDiscount.setData({modelData: oSDASHM1JsonTieredDiscount});
	                  }
	                  busyDialog.close();
		        },
		        function(error){
		      	  console.log("Get TieredDiscount Failure");
		      	  busyDialog.close();
		        });

	},

	/* SDASHM1 - Function - Get Purchase Info */

	getPurchaseInfo : function(depotcode){
		oSDASHM1JsonPurchaseInfo = [];
		var urlToSap = "purchaseinfoSet?$filter=IvDepot eq '" + depotcode + "'"; //1547
	    urlToSap = serviceDEP + urlToSap;

	    oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	    busyDialog.open();
	    console.log(urlToSap);
	    OData.request({
	                  requestUri: urlToSap,
	                  method: "GET",
	                  dataType: 'json',
										async : false,
	                  headers:
	                  {
	                  "X-Requested-With": "XMLHttpRequest",
	                  "Content-Type": "application/json; charset=utf-8",
	                  "DataServiceVersion": "2.0",
	                  "X-CSRF-Token":"Fetch"
	                  }
	                  },
	                  function (data, response){

	                  oSDASHM1JsonPurchaseInfo = data.results;

	                  if(oSDASHM1JsonPurchaseInfo.length == 0){
	                	  console.log("Get PurchaseInfo Success; but returned nothing");
	                  }else{
	                	oSDASHM1ModelPurchaseInfo.setData({modelData: oSDASHM1JsonPurchaseInfo});
	                  }
	                  busyDialog.close();
		        },
		        function(error){
		      	  console.log("Get PurchaseInfo Failure");
		      	  busyDialog.close();
		        });

	},

	/* SDASHM1 - Function - Get Documents Icon */
	getDocumentIcon : function(){
		 var oCurrent = this;
		 var oSDASHM1IconDocument = new sap.ui.core.Icon( {
	           src : sap.ui.core.IconPool.getIconURI("sap-box"),
	           placeholder : "Documents",
	           size : "20px",
	           color : "black",
						 tooltip : "Depot Documents",
//	           activeColor : "red",
//	           activeBackgroundColor : "white",
//	           hoverColor : "green",
//	           hoverBackgroundColor : "white",
	           width : "20px",
	           visible: "{docsVisible}",
	           press : function(oEvent){
	        	   var index = oEvent.getSource().getParent().getParent().getIndex();
	   			   	 var depotcode = oEvent.getSource().getParent().getParent().getParent().getContextByIndex(index).getProperty('depotcode');
	        	   oCurrent.getDocumentsList(depotcode, oEvent.getSource());
	           }
		 });

		 return oSDASHM1IconDocument;
	},

	/* SDASHM1 - Function - Get Contact Icon */

	getContactIcon : function(){

	 var oSDASHM1IconContact = new sap.ui.core.Icon( {
	           src : sap.ui.core.IconPool.getIconURI("address-book"),
	           size : "20px",
	           color : "black",
						 tooltip : "Depot Contact",
//	           activeColor : "red",
//	           activeBackgroundColor : "white",
//	           hoverColor : "green",
//	           hoverBackgroundColor : "white",
	           width : "20px",
	           visible: "{contactVisible}",
	           press : function(oEvent){
							 var oSDASHM3 = new sdashm3();
							 busyDialog.open();
							 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
	      		   oSDASHM3.openDepotContact(oEvent, depotcode);
							 busyDialog.close();

							 return;

					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 var address = oEvent.getSource().getBindingContext().getProperty("address");
					 var postal = oEvent.getSource().getBindingContext().getProperty("postal");
					 var region = oEvent.getSource().getBindingContext().getProperty("region");
					 var fax = oEvent.getSource().getBindingContext().getProperty("fax");
					 var phone = oEvent.getSource().getBindingContext().getProperty("phone");
					 var remark = oEvent.getSource().getBindingContext().getProperty("remark");
					 var mailid = oEvent.getSource().getBindingContext().getProperty("mailid");


		 /* Address */

      var oSDASHM1TableStatusMonitorDepotContactValueAddress = new sap.m.Label({
                                                    text : address,
                                                    }).addStyleClass("selectionLabels");

      var oSDASHM1TableStatusMonitorDepotContactLabelAddress = new sap.m.Label({
          text : "Address : ",
          labelFor: oSDASHM1TableStatusMonitorDepotContactValueAddress,
          width : "100px"
          }).addStyleClass("selectionLabelsLabel");

      var oSDASHM1TableStatusMonitorDepotContactFlexAddress = new sap.m.FlexBox({
                                                     items: [oSDASHM1TableStatusMonitorDepotContactLabelAddress,
                                                             oSDASHM1TableStatusMonitorDepotContactValueAddress
                                                             ],
                                                     direction: "Row"
                                                     });



      /* Region */

      var oSDASHM1TableStatusMonitorDepotContactValueRegion = new sap.m.Label({
                                                    text : region,
                                                    }).addStyleClass("selectionLabels");

      var oSDASHM1TableStatusMonitorDepotContactLabelRegion = new sap.m.Label({
          //text : "Region : ",
          labelFor: oSDASHM1TableStatusMonitorDepotContactValueRegion,
          width : "100px"
          }).addStyleClass("selectionLabels");

      var oSDASHM1TableStatusMonitorDepotContactFlexRegion = new sap.m.FlexBox({
                                                     items: [oSDASHM1TableStatusMonitorDepotContactLabelRegion,
                                                             oSDASHM1TableStatusMonitorDepotContactValueRegion
                                                             ],
                                                     direction: "Row"
                                                     });

      /* Postal Code */

      var oSDASHM1TableStatusMonitorDepotContactValuePostal = new sap.m.Label({
                                                    text : postal,
                                                    }).addStyleClass("selectionLabels");

      var oSDASHM1TableStatusMonitorDepotContactLabelPostal = new sap.m.Label({
          text : "Postal Code : ",
          labelFor: oSDASHM1TableStatusMonitorDepotContactValuePostal,
          width : "100px"
          }).addStyleClass("selectionLabelsLabel");

      var oSDASHM1TableStatusMonitorDepotContactFlexPostal = new sap.m.FlexBox({
                                                     items: [oSDASHM1TableStatusMonitorDepotContactLabelPostal,
                                                             oSDASHM1TableStatusMonitorDepotContactValuePostal
                                                             ],
                                                     direction: "Row"
                                                     });

      /* Fax */

      var oSDASHM1TableStatusMonitorDepotContactValueFax = new sap.m.Label({
                                                    text : fax,
                                                    }).addStyleClass("selectionLabels");

      var oSDASHM1TableStatusMonitorDepotContactLabelFax = new sap.m.Label({
          text : "Fax : ",
          labelFor: oSDASHM1TableStatusMonitorDepotContactValueFax,
          width : "100px"
          }).addStyleClass("selectionLabelsLabel");

      var oSDASHM1TableStatusMonitorDepotContactFlexFax = new sap.m.FlexBox({
                                                     items: [oSDASHM1TableStatusMonitorDepotContactLabelFax,
                                                             oSDASHM1TableStatusMonitorDepotContactValueFax
                                                             ],
                                                     direction: "Row"
                                                     });

      /* Phone */

      var oSDASHM1TableStatusMonitorDepotContactValuePhone = new sap.m.Label({
                                                    text : phone,
                                                    }).addStyleClass("selectionLabels");

      var oSDASHM1TableStatusMonitorDepotContactLabelPhone = new sap.m.Label({
          text : "Phone : ",
          labelFor: oSDASHM1TableStatusMonitorDepotContactValuePhone,
          width : "100px"
          }).addStyleClass("selectionLabelsLabel");

      var oSDASHM1TableStatusMonitorDepotContactFlexPhone = new sap.m.FlexBox({
                                                     items: [oSDASHM1TableStatusMonitorDepotContactLabelPhone,
                                                             oSDASHM1TableStatusMonitorDepotContactValuePhone
                                                             ],
                                                     direction: "Row"
                                                     });

      /* Mail ID */

      var oSDASHM1TableStatusMonitorDepotContactValueMailid = new sap.m.Link({
                                                    text : mailid,
																										press : function(oEvent){

																										}}).addStyleClass("selectionLabels");

      var oSDASHM1TableStatusMonitorDepotContactLabelMailid = new sap.m.Label({
          text : "Mail : ",
          labelFor: oSDASHM1TableStatusMonitorDepotContactValueMailid,
          width : "100px"
          }).addStyleClass("selectionLabelsLabel");

      var oSDASHM1TableStatusMonitorDepotContactFlexMailid = new sap.m.FlexBox({
                                                     items: [oSDASHM1TableStatusMonitorDepotContactLabelMailid,
                                                             oSDASHM1TableStatusMonitorDepotContactValueMailid
                                                             ],
                                                     direction: "Row"
                                                     });

      /* Contact */

      var oSDASHM1TableStatusMonitorDepotContactValueRemark = new sap.m.Label({
                                                    text : remark,
                                                    }).addStyleClass("selectionLabels");

      var oSDASHM1TableStatusMonitorDepotContactLabelRemark = new sap.m.Label({
          text : "Contact : ",
          labelFor: oSDASHM1TableStatusMonitorDepotContactValueRemark,
          width : "100px"
          }).addStyleClass("selectionLabelsLabel");

      var oSDASHM1TableStatusMonitorDepotContactFlexRemark = new sap.m.FlexBox({
                                                     items: [oSDASHM1TableStatusMonitorDepotContactLabelRemark,
                                                             oSDASHM1TableStatusMonitorDepotContactValueRemark
                                                             ],
                                                     direction: "Row"
                                                     });



      var oSDASHM1TableStatusMonitorDepotContactFlex = new sap.m.FlexBox({
          items: [//oSDASHM1TableStatusMonitorDepotContactFlexDepotName,
                  //oSDASHM1TableStatusMonitorDepotContactFlexLocation,
                  oSDASHM1TableStatusMonitorDepotContactFlexAddress,
                  oSDASHM1TableStatusMonitorDepotContactFlexRegion,
                  oSDASHM1TableStatusMonitorDepotContactFlexPostal,
									oSDASHM1TableStatusMonitorDepotContactFlexMailid,
									oSDASHM1TableStatusMonitorDepotContactFlexPhone,
                  oSDASHM1TableStatusMonitorDepotContactFlexFax,
                  oSDASHM1TableStatusMonitorDepotContactFlexRemark
                  ],
          direction: "Column"
          });

      if(sap.ui.getCore().byId("idSDASHM1TableStatusMonitorDepotContact") != undefined)
     	 sap.ui.getCore().byId("idSDASHM1TableStatusMonitorDepotContact").destroy();

		 var oSDASHM1TableStatusMonitorDepotContact = new sap.m.Popover("idSDASHM1TableStatusMonitorDepotContact",{
          title: "Depot Contact",
          modal: false,
          placement: sap.m.PlacementType.Left,
          content: new sap.m.VBox({
                                  //width:"300px",
                                  items:  [oSDASHM1TableStatusMonitorDepotContactFlex]
                                  }),

          }).addStyleClass("sapUiPopupWithPadding");

		 oSDASHM1TableStatusMonitorDepotContact.openBy(oEvent.getSource());

	           }
	 	});

		return oSDASHM1IconContact;
	},

	/* SDASHM1 - Function - Get Documents List */
	getDocumentsList : function(depotcode, docicon){

			if(sap.ui.getCore().byId("idSDASHM1TableDocuments") != undefined)
				sap.ui.getCore().byId("idSDASHM1TableDocuments").destroy();

			var oSDASHM1TableDocuments = new sap.ui.table.Table("idSDASHM1TableDocuments",{
	    		visibleRowCount: 10,
	            width: '750px',
	            selectionMode: sap.ui.table.SelectionMode.None,
	            columnHeaderVisible : true,
			}).addStyleClass("tblBorder");

			oSDASHM1TableDocuments.addColumn(new sap.ui.table.Column({
	    		label: new sap.ui.commons.Label({text: "Doc. Type", textAlign: "Left"}).addStyleClass("wraptextcol"),
	    		 width: "130px",
				 template: new sap.ui.commons.TextView({

				 }).bindProperty("text", "DocType").addStyleClass("borderStyle1"),
		           resizable:false,
		           //width:"150px",
		           //sortProperty: "msgid",
		           //filterProperty : "msgid",
				 }));

			oSDASHM1TableDocuments.addColumn(new sap.ui.table.Column({
	    		label: new sap.ui.commons.Label({text: "Document", textAlign: "Left"}).addStyleClass("wraptextcol"),
				 width: "400px",
				 template: new sap.ui.commons.Link({
					 press : function(oEvent){
							var filepath = oEvent.getSource().getBindingContext().getProperty("FilePath").trim();
							var filename = oEvent.getSource().getBindingContext().getProperty("FileName").trim();
							//filepath = filepath + filename;
							filepath = encodeURIComponent(filepath);
							var urlToSap = "docdownloadSet(Filename='" + filename + "',Filepath='" + filepath + "')"; //depotcode
						    urlToSap = serviceDEP + urlToSap;

						    oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
						    busyDialog.open();
						    console.log(urlToSap);
							OData.request({
							      requestUri: urlToSap,
							      method: "GET",
							      dataType: 'json',
							      headers:
							       {
							          "X-Requested-With": "XMLHttpRequest",
							          "Content-Type": "application/json; charset=utf-8",
							          "DataServiceVersion": "2.0",
							          "X-CSRF-Token":"Fetch"
							      }
							    },
							    function (data, response){
							    	busyDialog.close();
							    	//get ext
							    	if(data.String){
							    	var ext = filename.split('.')[1].toLowerCase();
//							    	var ext = data.FileExt.toLowerCase();
							    	//get file content
							    	var byteCharacters = atob(data.String);
									var byteNumbers = new Array(byteCharacters.length);
									for (var i = 0; i < byteCharacters.length; i++) {
									   byteNumbers[i] = byteCharacters.charCodeAt(i);
									}
									var byteArray = new Uint8Array(byteNumbers);
							    	var crnFileMimeType = jQuery.grep(fileTypeJson, function(element, index){
										return element.fileextension == ext;
									});
										contentType = crnFileMimeType[0].mimetype;
										var blob = new Blob([byteArray], {type: contentType});
										//var blobUrl = URL.createObjectURL(blob);
										//window.open(blobUrl);
										if ((navigator.appName == 'Microsoft Internet Explorer') ||
								                 (!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)))
									         	 {
													 window.navigator.msSaveOrOpenBlob(blob, title+'.'+ext);
									         	 }else{
									         		var blobUrl = URL.createObjectURL(blob);
													window.open(blobUrl);
									         	 }
							    	}else{
										sap.ui.commons.MessageBox.show("No document found",
					                            sap.ui.commons.MessageBox.Icon.ERROR,
					                            "Error",
					                            [sap.ui.commons.MessageBox.Action.OK],
					                            sap.ui.commons.MessageBox.Action.OK);
							    	}

							    },
							    function(err){
							    	busyDialog.close();
							    	errorfromServer(err);
							    	//alert("Error while Mail Contents : "+ window.JSON.stringify(err.response));
							    });
					 }
				 }).bindProperty("text", "FileName").addStyleClass("borderStyle1"),
		           resizable:false,
		           //width:"150px",
		           //sortProperty: "msgid",
		           //filterProperty : "msgid",
				 }));

			oSDASHM1TableDocuments.addColumn(new sap.ui.table.Column({
	    		label: new sap.ui.commons.Label({text: "Date", textAlign: "Left"}).addStyleClass("wraptextcol"),
	    		 width: "100px",
				 template: new sap.ui.commons.TextView({

				 }).bindProperty("text", "FileDate").addStyleClass("borderStyle1"),
		           resizable:false,
		           //width:"150px",
		           //sortProperty: "msgid",
		           //filterProperty : "msgid",
				 }));

			var oSDASHM1FlexDocuments = new sap.m.FlexBox({
	            items: [oSDASHM1TableDocuments
	                    ],
	            direction: "Row"
	            });

	var urlToSap = "documentsSet?$filter=IvDepot eq '" + depotcode + "'"; // 1547
    urlToSap = serviceDEP + urlToSap;

    oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
    busyDialog.open();
    console.log(urlToSap);
    OData.request({
                  requestUri: urlToSap,
                  method: "GET",
                  dataType: 'json',
                  headers:
                  {
                  "X-Requested-With": "XMLHttpRequest",
                  "Content-Type": "application/json; charset=utf-8",
                  "DataServiceVersion": "2.0",
                  "X-CSRF-Token":"Fetch"
                  }
                  },
                  function (data, response){

                  oSDASHM1JsonDocuments = data.results;

                  if(oSDASHM1JsonDocuments.length == 0){
										sap.ui.commons.MessageBox.alert("No documents found!");
                	  console.log("Get Documents Success; but returned nothing");
                  }else{
                	var oSDASHM1ModelDocuments = new sap.ui.model.json.JSONModel();
                	oSDASHM1ModelDocuments.setData({modelData: oSDASHM1JsonDocuments});

                  	var oSDASHM1TableDocuments = sap.ui.getCore().byId("idSDASHM1TableDocuments");
                  	oSDASHM1TableDocuments.setModel(oSDASHM1ModelDocuments);
                  	oSDASHM1TableDocuments.bindRows("/modelData");

                  	var oSDASHM1JsonDocumentsLength = oSDASHM1JsonDocuments.length;
                  	if(oSDASHM1JsonDocumentsLength < 11){
											oSDASHM1TableDocuments.setVisibleRowCount(oSDASHM1JsonDocumentsLength);
                  		oSDASHM1TableDocuments.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
                  	}
                  	else{
											oSDASHM1TableDocuments.setVisibleRowCount(10);
                  		oSDASHM1TableDocuments.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
                  	}


                  	var oSDASHM1ButtonStatusMonitorDocuments = sap.ui.getCore().byId("idSDASHM1ButtonStatusMonitorDocuments");
                  	var oSDASHM1PopoverStatusMonitorDocuments = new sap.m.Popover({
                     title: "Documents",
                   width:"300px",
                     modal: false,
                     placement: sap.m.PlacementType.Left,
                     content: new sap.m.VBox({
                                             //width:"300px",
                                             items:  [oSDASHM1FlexDocuments]
                                             }),

                     }).addStyleClass("sapUiPopupWithPadding");

                  oSDASHM1PopoverStatusMonitorDocuments.openBy(docicon);
                  }
                  busyDialog.close();
	        },
	        function(error){
	      	  console.log("Get Documents Failure");
	      	  busyDialog.close();
	        });

	}

});
