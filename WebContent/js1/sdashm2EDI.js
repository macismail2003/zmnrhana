jQuery.sap.require("sap.ui.model.json.JSONModel");
var oSDASHM2EDILISTJson = [];
var oSDASHM2EDIDETJson = [];
var globalTPC = null;
var globalSDASHM2EDILISTTableEdiListTPC = null;
var depotGlobal;

sap.ui.model.json.JSONModel.extend("sdashm2EDI", {


	/* SDASHM2EDILIST - Create EDI List Page */

	createSDASHM2EDILISTPage : function(){

		var oCurrent = this;

		/* SDASHM2EDILIST - Section - EDI List */

		var oSDASHM2EDILISTContent = oCurrent.setContentEDILIST();

		/* SDASHM2EDILIST - Flexbox - Final */

		var oSDASHM2EDILISTFlexContentFinal = new sap.m.FlexBox({
		         items: [
		                 oSDASHM2EDILISTContent
		       ],
		       direction : "Column",
		       visible: true,
		}).addStyleClass("marginLeft10");

		return oSDASHM2EDILISTFlexContentFinal;

	},

	/* SDASHM2EDILIST - Section - EDI List */

	setContentEDILIST : function(){

		var oCurrent = this;

		var oSDASHM2EDILISTLabelEdilist = new sap.ui.commons.Label("idSDASHM2EDILISTLabelEdilist",{
            text: "EDI Error List",
        }).addStyleClass("fontTitle");


		/* SDASHM2EDILIST - Flexbox - Pending Estimates Title */

		var oSDASHM2EDILISTFlexEdiListTitle = new sap.m.FlexBox({
				 justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
		         items: [
		                oSDASHM2EDILISTLabelEdilist
		       ],
		       direction : "Row",
		       visible: true,
		});


		/* SDASHM2EDILIST - Table - EDI List */

    	var oSDASHM2EDILISTTableEdiList = new sap.ui.table.Table("idSDASHM2EDILISTTableEdiList",{
    		//visibleRowCount: 15,
            //firstVisibleRow: 3,
            //fixedColumnCount: 3,
            columnHeaderHeight: 50,
            width: '98%',
            enableGrouping : true,
            //showColumnVisibilityMenu : true,
            //enableColumnReordering : true,
            selectionMode: sap.ui.table.SelectionMode.None,
            toolbar: new sap.ui.commons.Toolbar({
				items: [

					new sap.ui.commons.Button({
						text: "Reset",
						icon: "sap-icon://reset",
						press: function(oEvent) {
							oPersoService.delPersData();
							globalSDASHM2EDILISTTableEdiListTPC.refresh().done(function() {
								sap.ui.getCore().byId("idSDASHM2EDILISTTableEdiList").setEnableGrouping(false);
								sap.ui.getCore().byId("idSDASHM2EDILISTTableEdiList").setEnableGrouping(true);
								//sap.ui.commons.MessageBox.alert("Reset done!", "INFORMATION", "Refresh");
							});

							/* Clear filters and sorting */

							var oSDASHM3TableEstimateLinesUI = sap.ui.getCore().byId("idSDASHM2EDILISTTableEdiList");
							var iColCounter = 0;
							oSDASHM3TableEstimateLinesUI.clearSelection();
							var iTotalCols = oSDASHM3TableEstimateLinesUI.getColumns().length;
							var oListBinding = oSDASHM3TableEstimateLinesUI.getBinding();
							if (oListBinding) {
							oListBinding.aSorters = null;
							oListBinding.aFilters = null;
							}
							oSDASHM3TableEstimateLinesUI.getModel().refresh(true);
							for ( iColCounter = 0; iColCounter < iTotalCols; iColCounter++) {
								oSDASHM3TableEstimateLinesUI.getColumns()[iColCounter].setSorted(false);
								oSDASHM3TableEstimateLinesUI.getColumns()[iColCounter].setFilterValue("");
								oSDASHM3TableEstimateLinesUI.getColumns()[iColCounter].setFiltered(false);
							}
						}
					}),
					new sap.ui.commons.Button({
						text: "Save",
						icon: "sap-icon://save",
						press: function(oEvent) {
							globalSDASHM2EDILISTTableEdiListTPC.savePersonalizations().done(function() {
								sap.ui.commons.MessageBox.alert("Layout saved!", "INFORMATION", "Save");
							});
						}
					}),
					new sap.ui.commons.Button({
						text: "Clear Grouping",
						icon: "sap-icon://decline",
						press: function(oEvent) {
							globalSDASHM2EDILISTTableEdiListTPC.refresh().done(function() {
								sap.ui.getCore().byId("idSDASHM2EDILISTTableEdiList").setEnableGrouping(false);
								sap.ui.getCore().byId("idSDASHM2EDILISTTableEdiList").setEnableGrouping(true);
								//sap.ui.commons.MessageBox.alert("Reset done!", "INFORMATION", "Refresh");
							});
						}
					})
				],
				rightItems: [
					new sap.ui.commons.Button({
				          text : "",
				          //styled:false,
				          //type:sap.m.ButtonType.Unstyled,
				          icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
				          press:function(){
				        	  var oUtility = new utility();
				        	  var excelSDASHMJsonEdiList = [];
				        	  for(var j=0; j<oSDASHM2EDILISTJson.length; j++){
				        		  excelSDASHMJsonEdiList.push({
			              			"Depot" : oSDASHM2EDILISTJson[j].depot,
			            			"Depot Name" : oSDASHM2EDILISTJson[j].name,
			            			"Total Errors" : oSDASHM2EDILISTJson[j].totalerrors,
			            			"Gate IN" : oSDASHM2EDILISTJson[j].movein,
			            			"Gate OUT" : oSDASHM2EDILISTJson[j].moveout,
			            			"Estimate" : oSDASHM2EDILISTJson[j].estimate,
			            			"Lessee Approval" : oSDASHM2EDILISTJson[j].lessresp,
			            			"Joint Survey" : oSDASHM2EDILISTJson[j].jointsur,
												"Lessor Survey" : oSDASHM2EDILISTJson[j].lesssur,
			            			"Repair Progress" : oSDASHM2EDILISTJson[j].repairpro,
												"Reefer EDI Msg Pending" : oSDASHM2EDILISTJson[j].reeferedi,
			            			//"Purchase" : oSDASHM2EDILISTJson[j].purchcont
				        		  });
				        	  }
				        	  var title = sap.ui.getCore().byId("idSDASHM2EDILISTLabelEdilist").getText();
				        	  oUtility.makeHTMLTable(excelSDASHMJsonEdiList, title,"export");
				          }
					})
				]
			}),
            /*toolbar: new sap.m.Toolbar({
    			content: [
    				new sap.m.Button("idBUYERDMSTablePoPersonal", {
    					icon: "sap-icon://action-settings"
    				})
    			]
    		}),*/
    	 }).addStyleClass("tblBorder");

    	oSDASHM2EDILISTTableEdiList.addColumn(new sap.ui.table.Column("idSDASHM2EDILISTTableEdiListDEPOT",{
    		 label : new sap.ui.commons.Label({text: "Depot No.", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "depot").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"90px",
	           sortProperty: "depot",
	           filterProperty : "depot",
			 }));

    	oSDASHM2EDILISTTableEdiList.addColumn(new sap.ui.table.Column("idSDASHM2EDILISTTableEdiListDEPOTNAME",{
    		label: new sap.ui.commons.Label({text: "Depot Name", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 //template: new sap.ui.commons.TextView({
			 //}).bindProperty("text", "depotname").addStyleClass("borderStyle1"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "name").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"230px",
	           sortProperty: "name",
	           filterProperty : "name",
			 }));

    	oSDASHM2EDILISTTableEdiList.addColumn(new sap.ui.table.Column("idSDASHM2EDILISTTableEdiListTOTAL",{
    		label: new sap.ui.commons.Label({text: "Total", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depot");
					 oCurrent.getSDASHM2EDIDETDetails("", depotcode);
					 var depotname = oEvent.getSource().getBindingContext().getProperty("name");
					 var EDIDETHeader = "Depot : " + depotcode + " - " + depotname +
					 			" || Message Type : Total Errors";
					 sap.ui.getCore().byId("idSDASHM2EDIDETLabelEDIDET").setText(EDIDETHeader);
				 }
			 }).bindProperty("text", "totalerrors").bindProperty("visible", "visibletotalerrors").addStyleClass("borderStyle1 centerAlign"),
	           resizable:false,
	           width:"85px",
	           sortProperty: "totalerrors",
	           filterProperty: "totalerrors",
			 }));

    	oSDASHM2EDILISTTableEdiList.addColumn(new sap.ui.table.Column("idSDASHM2EDILISTTableEdiListGATEIN",{
    		label: new sap.ui.commons.Label({text: "Gate In", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depot");
					 oCurrent.getSDASHM2EDIDETDetails("MOVE_IN", depotcode);
					 var depotname = oEvent.getSource().getBindingContext().getProperty("name");
					 var EDIDETHeader = "Depot : " + depotcode + " - " + depotname +
					 			" || Message Type : Gate IN";
					 sap.ui.getCore().byId("idSDASHM2EDIDETLabelEDIDET").setText(EDIDETHeader);
				 }
			 }).bindProperty("text", "movein").bindProperty("visible", "visiblemovein").addStyleClass("borderStyle1 centerAlign"),
	           resizable:false,
	           width:"85px",
	           sortProperty: "movein",
	           filterProperty: "movein",
			 }));


    	oSDASHM2EDILISTTableEdiList.addColumn(new sap.ui.table.Column("idSDASHM2EDILISTTableEdiListGATEOUT",{
    		label: new sap.ui.commons.Label({text: "Gate Out", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depot");
					 oCurrent.getSDASHM2EDIDETDetails("MOVE_OUT", depotcode);
					 var depotname = oEvent.getSource().getBindingContext().getProperty("name");
					 var EDIDETHeader = "Depot : " + depotcode + " - " + depotname +
					 			" || Message Type : Gate Out";
					 sap.ui.getCore().byId("idSDASHM2EDIDETLabelEDIDET").setText(EDIDETHeader);
				 }
			 }).bindProperty("text", "moveout").bindProperty("visible", "visiblemoveout").addStyleClass("borderStyle1 centerAlign"),
	           resizable:false,
	           width:"85px",
	           sortProperty: "moveout",
	           filterProperty: "moveout",
			 }));


    	oSDASHM2EDILISTTableEdiList.addColumn(new sap.ui.table.Column("idSDASHM2EDILISTTableEdiListESTIMATE",{
    		label: new sap.ui.commons.Label({text: "Estimate", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depot");
					 oCurrent.getSDASHM2EDIDETDetails("ESTIMATE", depotcode);
					 var depotname = oEvent.getSource().getBindingContext().getProperty("name");
					 var EDIDETHeader = "Depot : " + depotcode + " - " + depotname +
					 			" || Message Type : Estimate";
					 sap.ui.getCore().byId("idSDASHM2EDIDETLabelEDIDET").setText(EDIDETHeader);
				 }
			 }).bindProperty("text", "estimate").bindProperty("visible", "visibleestimate").addStyleClass("borderStyle1 centerAlign"),
	           resizable:false,
	           width:"85px",
	           sortProperty: "estimate",
	           filterProperty: "estimate",
			 }));

    	oSDASHM2EDILISTTableEdiList.addColumn(new sap.ui.table.Column("idSDASHM2EDILISTTableEdiListLA",{
    		label: new sap.ui.commons.Label({text: "Lessee Approval", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depot");
					 oCurrent.getSDASHM2EDIDETDetails("LESS_RESP", depotcode);
					 var depotname = oEvent.getSource().getBindingContext().getProperty("name");
					 var EDIDETHeader = "Depot : " + depotcode + " - " + depotname +
					 			" || Message Type : Lessee Approval";
					 sap.ui.getCore().byId("idSDASHM2EDIDETLabelEDIDET").setText(EDIDETHeader);
				 }
			 }).bindProperty("text", "lessresp").bindProperty("visible", "visiblelessresp").addStyleClass("borderStyle1 centerAlign"),
	           resizable:false,
	           width:"85px",
	           sortProperty: "lessresp",
	           filterProperty: "lessresp",
			 }));

    	oSDASHM2EDILISTTableEdiList.addColumn(new sap.ui.table.Column("idSDASHM2EDILISTTableEdiListJS",{
    		label: new sap.ui.commons.Label({text: "Joint Survey", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depot");
					 oCurrent.getSDASHM2EDIDETDetails("JOINT_SUR", depotcode);
					 var depotname = oEvent.getSource().getBindingContext().getProperty("name");
					 var EDIDETHeader = "Depot : " + depotcode + " - " + depotname +
					 			" || Message Type : Joint Survey";
					 sap.ui.getCore().byId("idSDASHM2EDIDETLabelEDIDET").setText(EDIDETHeader);
				 }
			 }).bindProperty("text", "jointsur").bindProperty("visible", "visiblejointsur").addStyleClass("borderStyle1 centerAlign"),
	           resizable:false,
	           width:"85px",
	           sortProperty: "jointsur",
	           filterProperty: "jointsur",
			 }));

			 oSDASHM2EDILISTTableEdiList.addColumn(new sap.ui.table.Column("idSDASHM2EDILISTTableEdiListLS",{
     		label: new sap.ui.commons.Label({text: "Lessor Survey", textAlign: "Center"}).addStyleClass("wraptextcol"),
 			 template: new sap.ui.commons.Link({
 				 press : function(oEvent){
 					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depot");
 					 oCurrent.getSDASHM2EDIDETDetails("LESS_SUR", depotcode);
 					 var depotname = oEvent.getSource().getBindingContext().getProperty("name");
 					 var EDIDETHeader = "Depot : " + depotcode + " - " + depotname +
 					 			" || Message Type : Lessor Survey";
 					 sap.ui.getCore().byId("idSDASHM2EDIDETLabelEDIDET").setText(EDIDETHeader);
 				 }
 			 }).bindProperty("text", "lesssur").bindProperty("visible", "visiblelesssur").addStyleClass("borderStyle1 centerAlign"),
 	           resizable:false,
 	           width:"85px",
 	           sortProperty: "lesssur",
 	           filterProperty: "lesssur",
 			 }));

    	oSDASHM2EDILISTTableEdiList.addColumn(new sap.ui.table.Column("idSDASHM2EDILISTTableEdiListRP",{
    		label: new sap.ui.commons.Label({text: "Repair Progress", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depot");
					 oCurrent.getSDASHM2EDIDETDetails("REPAIR_PRO", depotcode);
					 var depotname = oEvent.getSource().getBindingContext().getProperty("name");
					 var EDIDETHeader = "Depot : " + depotcode + " - " + depotname +
					 			" || Message Type : Repair Progress";
					 sap.ui.getCore().byId("idSDASHM2EDIDETLabelEDIDET").setText(EDIDETHeader);
				 }
			 }).bindProperty("text", "repairpro").bindProperty("visible", "visiblerepairpro").addStyleClass("borderStyle1 centerAlign"),
	           resizable:false,
	           width:"85px",
	           sortProperty: "repairpro",
	           filterProperty: "repairpro",
			 }));

			 oSDASHM2EDILISTTableEdiList.addColumn(new sap.ui.table.Column("idSDASHM2EDILISTTableEdiListRF",{
     		label: new sap.ui.commons.Label({text: "Reefer EDI Msg Pending", textAlign: "Center"}).addStyleClass("wraptextcol"),
 			 template: new sap.ui.commons.Link({
 				 press : function(oEvent){
 					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depot");
 					 oCurrent.getSDASHM2EDIDETDetails("REEFER_EDI", depotcode);
 					 var depotname = oEvent.getSource().getBindingContext().getProperty("name");
 					 var EDIDETHeader = "Depot : " + depotcode + " - " + depotname +
 					 			" || Message Type : Reefer EDI Msg Pending";
 					 sap.ui.getCore().byId("idSDASHM2EDIDETLabelEDIDET").setText(EDIDETHeader);
 				 }
 			 }).bindProperty("text", "reeferedi").bindProperty("visible", "visiblereeferedi").addStyleClass("borderStyle1 centerAlign"),
 	           resizable:false,
 	           width:"85px",
 	           sortProperty: "reeferedi",
 	           filterProperty: "reeferedi",
 			 }));

    	var printPersoData = function(sJSON) {
			//jQuery("#perso-data").html(sJSON
    		console.log(sJSON);
			/*	.replace(/\n/g, "<br>")
				.replace(/\s/g, "&nbsp;")
				.replace(/(true)/g, "<span style=\"color:green\">$1</span>")
				.replace(/(false)/g, "<span style=\"color:red\">$1</span>"));*/
		};

		var oPersoService = {

			getPersData: function() {
				var oDeferred = jQuery.Deferred();
				var sJSON = window.localStorage.getItem("oSDASHM2EDILISTTableEdiListPersonal") || "{}";
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
						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListDEPOT":
							grpColumnname = "depot";
							break;
						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListDEPOTNAME":
							grpColumnname = "name";
							break;
						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListTOTAL":
							grpColumnname = "totalerrors";
							break;
						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListGATEIN":
							grpColumnname = "movein";
							break;
						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListGATEOUT":
							grpColumnname = "moveout";
							break;
						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListESTIMATE":
							grpColumnname = "estimate";
							break;
						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListLA":
							grpColumnname = "lessresp";
							break;
						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListJS":
							grpColumnname = "jointsur";
							break;
						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListLS":
								grpColumnname = "lesssur";
								break;
						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListRP":
							grpColumnname = "repairpro";
							break;
							case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListRF":
								grpColumnname = "reeferedi";
								break;
					}

					var flags = [], output = [], l = oSDASHM2EDILISTJson.length, i;
					for( i=0; i<l; i++) {
					    if( flags[oSDASHM2EDILISTJson[i][grpColumnname]]) continue;
					    flags[oSDASHM2EDILISTJson[i][grpColumnname]] = true;
					    output.push(oSDASHM2EDILISTJson[i][grpColumnname]);
					}
					console.log(output.length + " Unique " + grpColumnname + " found");

					var groupHeaderLength = output.length;
					var valuesLength = oSDASHM2EDILISTJson.length;
					var tableLength = groupHeaderLength + valuesLength;
					var oSDASHM2EDILISTTableEdiList = sap.ui.getCore().byId("idSDASHM2EDILISTTableEdiList");
					//oSDASHM2EDILISTTableEdiList.setVisibleRowCount(tableLength);


					}else{
						var oSDASHM2EDILISTTableEdiList = sap.ui.getCore().byId("idSDASHM2EDILISTTableEdiList");
						//oSDASHM2EDILISTTableEdiList.setVisibleRowCount(oSDASHM2EDILISTJson.length);
					}
					 /* grouping additiong */
				var sJSON = JSON.stringify(oBundle, null, 4);
				window.localStorage.setItem("oSDASHM2EDILISTTableEdiListPersonal", sJSON);
				printPersoData(sJSON);
				oDeferred.resolve();
				return oDeferred.promise();
			},

			delPersData: function() {
				var oDeferred = jQuery.Deferred();
				window.localStorage.removeItem("oSDASHM2EDILISTTableEdiListPersonal");
				printPersoData("");
				oDeferred.resolve();
				return oDeferred.promise();
			}

		};

		jQuery.sap.require("sap.ui.table.TablePersoController");
		var oSDASHM2EDILISTTableEdiListTPC = new sap.ui.table.TablePersoController("idSDASHM2EDILISTTableEdiListTPC", {
			table: oSDASHM2EDILISTTableEdiList,
			persoService: oPersoService,
			hasGrouping: true
		});
		globalSDASHM2EDILISTTableEdiListTPC = oSDASHM2EDILISTTableEdiListTPC;

    	/* SDASHM2EDIList - Flexbox - Pending Approval */

		var oSDASHM2EDILISTFlexEdiList = new sap.m.FlexBox({
		         items: [
		                oSDASHM2EDILISTFlexEdiListTitle,
						new sap.ui.commons.Label({
							text : "",
							width : "100px"
						}),
						oSDASHM2EDILISTTableEdiList
		       ],
		       direction : "Column",
		       visible: true,
		       //width: "60%"
		}).addStyleClass("marginLeft20");


		return oSDASHM2EDILISTFlexEdiList;

	},

	/* SDASHM2EDILIST - Function - Set Equipment Level Values for EDI List */

	setSDASHM2ValuesEDILIST : function(depotcode, column, value, depotview2set){
		var urlToSap = "";
		urlToSap = "edilistSet?$filter=Depot eq '" + depotcode + "' and Uname eq '" + sessionStorage.uName.toUpperCase() + "'";
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

                      var depotView2Result = data.results;
                      oSDASHM2EDILISTJson = [];

                      if(depotView2Result.length == 0){
                    	  sap.ui.commons.MessageBox.alert("No data found");
                    	  console.log("Get EDI List Success; but returned nothing");
                      }else{

												var oTable = sap.ui.getCore().byId("idSDASHM1TableStatusMonitor");          //Get Hold of table
												var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
												//oScrollBar.setScrollPosition(0);

                    	  app.to("idSDASHM2PageEDILIST");
                    	  console.log("Get EDI List Success");

                      for(var j=0; j<depotView2Result.length; j++){
                    	  oSDASHM2EDILISTJson.push({
                    			depot : depotView2Result[j].Depot,
                    			name : depotView2Result[j].Name,
                    			totalerrors : depotView2Result[j].TotalErrors,
                    			movein : depotView2Result[j].MoveIn,
                    			moveout : depotView2Result[j].MoveOut,
                    			estimate : depotView2Result[j].Estimate,
                    			lessresp : depotView2Result[j].LessResp,
                    			jointsur : depotView2Result[j].JointSur,
													lesssur : depotView2Result[j].LessSur,
                    			repairpro : depotView2Result[j].RepairPro,
													reeferedi : depotView2Result[j].ReeferEdi,
                    			purchcont : depotView2Result[j].PurchCont
                         });

                      }

                    var oSDASHM2EDILISTModel = new sap.ui.model.json.JSONModel();
                    oSDASHM2EDILISTModel.setData({modelData: oSDASHM2EDILISTJson});

                  	var oSDASHM2EDILISTTableEdiList = sap.ui.getCore().byId("idSDASHM2EDILISTTableEdiList");
                  	oSDASHM2EDILISTTableEdiList.setModel(oSDASHM2EDILISTModel);
                  	oSDASHM2EDILISTTableEdiList.bindRows("/modelData");

                  	var oSDASHM2EDILISTJsonLength = oSDASHM2EDILISTJson.length;
                  	if(oSDASHM2EDILISTJsonLength < 21){
                  		oSDASHM2EDILISTTableEdiList.setVisibleRowCount(oSDASHM2EDILISTJsonLength);
                  		oSDASHM2EDILISTTableEdiList.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
                  	}
                  	else{
                  		//oSDASHM2TableEquipmentLevel.setVisibleRowCount(20);
                  		oSDASHM2EDILISTTableEdiList.setVisibleRowCount(oSDASHM2EDILISTJsonLength);
                  		oSDASHM2EDILISTTableEdiList.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
                  	}

                  	globalSDASHM2EDILISTTableEdiListTPC.refresh();

                  	/* grouping additiong */
    				var isGrouped = false;
    				var grpColumnid = "";
    				var grpColumnname = "";

    				var oBundleLocal = window.localStorage.getItem("oSDASHM2EDILISTTableEdiListPersonal") || "{}";
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
    						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListDEPOT":
    							grpColumnname = "depot";
    							break;
    						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListDEPOTNAME":
    							grpColumnname = "name";
    							break;
    						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListTOTAL":
    							grpColumnname = "totalerrors";
    							break;
    						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListGATEIN":
    							grpColumnname = "movein";
    							break;
    						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListGATEOUT":
    							grpColumnname = "moveout";
    							break;
    						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListESTIMATE":
    							grpColumnname = "estimate";
    							break;
    						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListLA":
    							grpColumnname = "lessresp";
    							break;
    						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListJS":
    							grpColumnname = "jointsur";
    							break;
								case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListLS":
	    							grpColumnname = "lesssur";
	    							break;
    						case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListRP":
    							grpColumnname = "repairpro";
    							break;
								case "idSDASHM2EDILISTTableEdiList-idSDASHM2EDILISTTableEdiListRF":
	    							grpColumnname = "reeferedi";
	    							break;
    					}

    					var flags = [], output = [], l = oSDASHM2EDILISTJson.length, i;
    					for( i=0; i<l; i++) {
    					    if( flags[oSDASHM2EDILISTJson[i][grpColumnname]]) continue;
    					    flags[oSDASHM2EDILISTJson[i][grpColumnname]] = true;
    					    output.push(oSDASHM2EDILISTJson[i][grpColumnname]);
    					}
    					console.log(output.length + " Unique " + grpColumnname + " found");

    					var groupHeaderLength = output.length;
    					var valuesLength = oSDASHM2EDILISTJson.length;
    					var tableLength = groupHeaderLength + valuesLength;
    					var oSDASHM2EDILISTTableEdiList = sap.ui.getCore().byId("idSDASHM2EDILISTTableEdiList");
    					//oSDASHM2EDILISTTableEdiList.setVisibleRowCount(tableLength);


    					}else{
    						var oSDASHM2EDILISTTableEdiList = sap.ui.getCore().byId("idSDASHM2EDILISTTableEdiList");
    						//oSDASHM2EDILISTTableEdiList.setVisibleRowCount(oSDASHM2EDILISTJson.length);
    					}
    				}
    					/* grouping additiong */


                    }
                    },
                  function(error){
                    	sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                	  console.log("Get EDI List Failure");
                	  busyDialog.close();
                  });

	},

	/* SDASHM2EDIDET - Function - Get EDI Error Details */

	getSDASHM2EDIDETDetails : function(errType, depot){

		if(depot != 'again')
			depotGlobal = depot;
		if(errType != 'again')
			errTypeGlobal = errType;

		if(depot == 'ALL'){
			depot = '';
		}
		else if(depot == 'again'){
			depot = depotGlobal;
			if(depot == 'ALL'){
				depot = '';
			}
		}

		if(errType == 'again'){
			errType = errTypeGlobal;
		}

		var urlToSap = "";
		urlToSap = "edidetailSet?$filter=IDepot eq '" + depot
					 + "' and IMsgType eq '" + errType + "' and ISerialNo eq '" + "" + "' and IPeriod eq '0000000099991231'";
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

            var depotView2Result = data.results;
            oSDASHM2EDIDETJson = [];

            if(depotView2Result.length == 0){
          	  sap.ui.commons.MessageBox.alert("No data found");
          	  console.log("Get EDI Detail Success; but returned nothing");
            }else{
          	  app.to("idSDASHM2PageEDIDET");
          	  console.log("Get EDI Detail Success");

            for(var j=0; j<depotView2Result.length; j++){


          	  	if(depotView2Result[j].Submitteddate != null){
	                var vMessageDate = depotView2Result[j].Submitteddate.split("(");
	                var vMsgDate = vMessageDate[1].split(")");
	                //var vformattedMessageDate = new Date(Number(vMsgDate[0]));
	                var subdate = dateFormat(new Date(Number(vMsgDate[0])), 'dd/mm/yyyy',"UTC"); // MACC_17022017 changed from '-' to '/'
	                var subdatex = subdate.substr(6,4) + subdate.substr(3,2) + subdate.substr(0,2);
                }

                if(depotView2Result[j].MsgDate != null){
                    var vMessageDate = depotView2Result[j].MsgDate.split("(");
                    var vMsgDate = vMessageDate[1].split(")");
                    //var vformattedMessageDate = new Date(Number(vMsgDate[0]));
                    var msgdate = dateFormat(new Date(Number(vMsgDate[0])), 'dd/mm/yyyy',"UTC"); // MACC_17022017 changed from '-' to '/'
                    var msgdatex = msgdate.substr(6,4) + msgdate.substr(3,2) + msgdate.substr(0,2);
                }

            	oSDASHM2EDIDETJson.push({
            		isChecked : false,
            		msgid : depotView2Result[j].MsgUidXi,
          			type : depotView2Result[j].MsgType,
          			name : depotView2Result[j].MsgName,
          			serial : depotView2Result[j].MsgSernr,
          			subdate : subdate,
          			subdatex : subdatex,
          			msgdate : msgdate,
          			msgdatex : msgdatex,
          			message : depotView2Result[j].ErrMessage,
               });

            }

          var oSDASHM2EDIDETModel = new sap.ui.model.json.JSONModel();
          oSDASHM2EDIDETModel.setData({modelData: oSDASHM2EDIDETJson});

        	var oSDASHM2EDIDETTableEDIDET = sap.ui.getCore().byId("idSDASHM2EDIDETTableEDIDET");
        	oSDASHM2EDIDETTableEDIDET.setModel(oSDASHM2EDIDETModel);
        	oSDASHM2EDIDETTableEDIDET.bindRows("/modelData");

        	var oSDASHM2EDIDETJsonLength = oSDASHM2EDIDETJson.length;
        	if(oSDASHM2EDIDETJsonLength < 21){
        		oSDASHM2EDIDETTableEDIDET.setVisibleRowCount(oSDASHM2EDIDETJsonLength);
        		//oSDASHM2EDIDETTableEDIDET.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
        	}
        	else{
        		//oSDASHM2TableEquipmentLevel.setVisibleRowCount(20);
        		oSDASHM2EDIDETTableEDIDET.setVisibleRowCount(oSDASHM2EDIDETJsonLength);
        		//oSDASHM2EDIDETTableEDIDET.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
        	}
        	globalTPC.refresh();


        	/* grouping additiong
			var isGrouped = false;
			var grpColumnid = "";
			var grpColumnname = "";

			var oBundleLocal = window.localStorage.getItem("oSDASHM2EDIDETTableEDIDETPersonal") || "{}";

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
					case "idSDASHM2EDIDETTableEDIDET-idSDASHM2EDIDETTableEDIDETID":
						grpColumnname = "msgid";
						break;
					case "idSDASHM2EDIDETTableEDIDET-idSDASHM2EDIDETTableEDIDETType":
						grpColumnname = "type";
						break;
					case "idSDASHM2EDIDETTableEDIDET-idSDASHM2EDIDETTableEDIDETName":
						grpColumnname = "name";
						break;
					case "idSDASHM2EDIDETTableEDIDET-idSDASHM2EDIDETTableEDIDETSerial":
						grpColumnname = "serial";
						break;
					case "idSDASHM2EDIDETTableEDIDET-idSDASHM2EDIDETTableEDIDETSubDate":
						grpColumnname = "subdate";
						break;
					case "idSDASHM2EDIDETTableEDIDET-idSDASHM2EDIDETTableEDIDETMsgDate":
						grpColumnname = "msgdate";
						break;
					case "idSDASHM2EDIDETTableEDIDET-idSDASHM2EDIDETTableEDIDETMessage":
						grpColumnname = "message";
						break;


				}

				var flags = [], output = [], l = oSDASHM2EDIDETJson.length, i;
				for( i=0; i<l; i++) {
				    if( flags[oSDASHM2EDIDETJson[i][grpColumnname]]) continue;
				    flags[oSDASHM2EDIDETJson[i][grpColumnname]] = true;
				    output.push(oSDASHM2EDIDETJson[i][grpColumnname]);
				}
				console.log(output.length + " Unique " + grpColumnname + " found");

				var groupHeaderLength = output.length;
				var valuesLength = oSDASHM2EDIDETJson.length;
				var tableLength = groupHeaderLength + valuesLength;
				var oSDASHM2EDIDETTableEDIDET = sap.ui.getCore().byId("idSDASHM2EDIDETTableEDIDET");
				oSDASHM2EDIDETTableEDIDET.setVisibleRowCount(tableLength);


				}else{
					var oSDASHM2EDIDETTableEDIDET = sap.ui.getCore().byId("idSDASHM2EDIDETTableEDIDET");
					oSDASHM2EDIDETTableEDIDET.setVisibleRowCount(oSDASHM2EDIDETJson.length);
				}
            }
				 grouping additiong */

          }
          },
        function(error){
          	sap.ui.commons.MessageBox.alert("Sorry, there is an error");
      	  console.log("Get EDI Detail Failure");
      	  busyDialog.close();
        });

	},

	/* SDASHM2EDIDET - Create EDI List Page */

	createSDASHM2EDIDETPage : function(){

		var oCurrent = this;

		/* SDASHM2EDIDET - Section - EDI Detail */

		var oSDASHM2EDIDETContent = oCurrent.setContentEDIDET();

		/* SDASHM2EDIDET - Flexbox - Final */

		var oSDASHM2EDIDETFlexContentFinal = new sap.m.FlexBox({
		         items: [
		                 oSDASHM2EDIDETContent
		       ],
		       direction : "Column",
		       visible: true,
		}).addStyleClass("marginLeft10");

		return oSDASHM2EDIDETFlexContentFinal;

	},

	/* SDASHM2EDIDET - Section - EDI Detail */

	setContentEDIDET : function(){

		var oCurrent = this;

		var oSDASHM2EDIDETLabelEDIDET = new sap.ui.commons.Label("idSDASHM2EDIDETLabelEDIDET",{
            text: "EDI Error List",
        }).addStyleClass("fontTitle");


		/* SDASHM2EDIDET - Flexbox - Pending Estimates Title */

		var oSDASHM2EDIDETFlexEDIDETTitle = new sap.m.FlexBox({
				 justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
		         items: [
		                oSDASHM2EDIDETLabelEDIDET
		       ],
		       direction : "Row",
		       visible: true,
		});


		/* SDASHM2EDIDET - Table - EDI List */
		/*
		jQuery.sap.require("sap.ui.comp.smarttable");
		var oSDASHM2EDIDETTableEDIDET = new sap.ui.comp.smarttable("idSDASHM2EDIDETTableEDIDET",{
				smartFilterId : "smartFilterBar",
				tableType : "ResponsiveTable" ,
				editable : false,
				//entitySet : "Products",
				useVariantManagement : true,
				useTablePersonalisation : true,
				header : "Products",
				showRowCount : true,
				useExportToExcel : false,
				enableAutoBinding : false,
				persistencyKey : "SmartTablePKey"
		});*/

    	var oSDASHM2EDIDETTableEDIDET = new sap.ui.table.Table("idSDASHM2EDIDETTableEDIDET",{
    		//visibleRowCount: 15,
            //firstVisibleRow: 3,
            //fixedColumnCount: 3,
            //columnHeaderHeight: 30,
            width: '98%',
            enableGrouping : true,
            //showColumnVisibilityMenu : true,
            //enableColumnReordering : true,
            selectionMode: sap.ui.table.SelectionMode.None,
            toolbar: new sap.ui.commons.Toolbar({
				items: [

					new sap.ui.commons.Button("idBUYERDMSTablePoPersonal", {
						icon: "sap-icon://action-settings",
						visible : false,
					}),


					new sap.ui.commons.Button({
						text: "Reset",
						icon: "sap-icon://reset",
						press: function(oEvent) {
							oPersoService.delPersData();
							oTPC.refresh().done(function() {
								sap.ui.getCore().byId("idSDASHM2EDIDETTableEDIDET").setEnableGrouping(false);
								sap.ui.getCore().byId("idSDASHM2EDIDETTableEDIDET").setEnableGrouping(true);
								sap.ui.commons.MessageBox.alert("Reset done!", "INFORMATION", "Refresh");
							});

							/* Clear filters and sorting */

							var oSDASHM3TableEstimateLinesUI = sap.ui.getCore().byId("idSDASHM2EDIDETTableEDIDET");
							var iColCounter = 0;
							oSDASHM3TableEstimateLinesUI.clearSelection();
							var iTotalCols = oSDASHM3TableEstimateLinesUI.getColumns().length;
							var oListBinding = oSDASHM3TableEstimateLinesUI.getBinding();
							if (oListBinding) {
							oListBinding.aSorters = null;
							oListBinding.aFilters = null;
							}
							oSDASHM3TableEstimateLinesUI.getModel().refresh(true);
							for ( iColCounter = 0; iColCounter < iTotalCols; iColCounter++) {
								oSDASHM3TableEstimateLinesUI.getColumns()[iColCounter].setSorted(false);
								oSDASHM3TableEstimateLinesUI.getColumns()[iColCounter].setFilterValue("");
								oSDASHM3TableEstimateLinesUI.getColumns()[iColCounter].setFiltered(false);
							}

						}
					}),
					new sap.ui.commons.Button({
						text: "Save",
						icon: "sap-icon://save",
						press: function(oEvent) {
							oTPC.savePersonalizations().done(function() {
								sap.ui.commons.MessageBox.alert("Layout saved!", "INFORMATION", "Save");
							});
						}
					}),
					new sap.ui.commons.Button({
						text: "Clear Grouping",
						icon: "sap-icon://decline",
						press: function(oEvent) {
							oTPC.refresh().done(function() {
								sap.ui.getCore().byId("idSDASHM2EDIDETTableEDIDET").setEnableGrouping(false);
								sap.ui.getCore().byId("idSDASHM2EDIDETTableEDIDET").setEnableGrouping(true);
								//sap.ui.commons.MessageBox.alert("Reset done!", "INFORMATION", "Refresh");
							});
						}
					})
				],
				rightItems: [
					new sap.ui.commons.Button({
				          text : "",
				          //styled:false,
				          //type:sap.m.ButtonType.Unstyled,
				          icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
				          press:function(){
				        	  var oUtility = new utility();
				        	  var excelSDASHMJsonEDIDET = [];
				        	  for(var j=0; j<oSDASHM2EDIDETJson.length; j++){
				        		  excelSDASHMJsonEDIDET.push({
				              		"Message ID" : oSDASHM2EDIDETJson[j].msgid,
				          			"Type" : oSDASHM2EDIDETJson[j].type,
				          			"Message Name" : oSDASHM2EDIDETJson[j].name,
				          			"Serial No." : oSDASHM2EDIDETJson[j].serial,
				          			"Submitted Date" : oSDASHM2EDIDETJson[j].subdate,
				          			"Message Date" : oSDASHM2EDIDETJson[j].msgdate,
				          			"Message" : oSDASHM2EDIDETJson[j].message,
				        		  });
				        	  }
				        	  var title = sap.ui.getCore().byId("idSDASHM2EDIDETLabelEDIDET").getText();
				        	  oUtility.makeHTMLTable(excelSDASHMJsonEDIDET, title,"export");
				          }
					})
				]
			}),
            /*toolbar: new sap.m.Toolbar({
    			content: [
    				new sap.m.Button("idBUYERDMSTablePoPersonal", {
    					icon: "sap-icon://action-settings"
    				})
    			]
    		}),*/
            //navigationMode: sap.ui.table.NavigationMode.Paginator
    	 }).addStyleClass("tblBorder");

    	/*oSDASHM2EDIDETTableEDIDET.addColumn(new sap.ui.table.Column("idSDASHM2EDIDETTableEDIDETCheckBox",{
    		visible : false,
    		label: new sap.ui.commons.CheckBox("idSDASHM2EDIDETTableEDIDETColumnCheckBox",{
                change : function(){
                	oCurrent.SDASHM2EDIDETTableEDIDETSelectAll();
                }
               }),
    		template: new sap.ui.commons.CheckBox({

    		}).bindProperty("checked", "isChecked"),
           	width:"30px",
           	resizable:false
           	}));*/

    	oSDASHM2EDIDETTableEDIDET.addColumn(new sap.ui.table.Column("idSDASHM2EDIDETTableEDIDETID",{
    		label: new sap.ui.commons.Label({text: "Message ID", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 //template: new sap.ui.commons.TextView({
			 //}).bindProperty("text", "depotname").addStyleClass("borderStyle1"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "msgid").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"150px",
	           sortProperty: "msgid",
	           filterProperty : "msgid",
			 }));

    	oSDASHM2EDIDETTableEDIDET.addColumn(new sap.ui.table.Column("idSDASHM2EDIDETTableEDIDETType",{
    		label: new sap.ui.commons.Label({text: "Type", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 //template: new sap.ui.commons.TextView({
			 //}).bindProperty("text", "depotname").addStyleClass("borderStyle1"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "type").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"100px",
	           sortProperty: "type",
	           filterProperty : "type",
			 }));

    	oSDASHM2EDIDETTableEDIDET.addColumn(new sap.ui.table.Column("idSDASHM2EDIDETTableEDIDETName",{
    		label: new sap.ui.commons.Label({text: "Message Name", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 //template: new sap.ui.commons.TextView({
			 //}).bindProperty("text", "depotname").addStyleClass("borderStyle1"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "name").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"150px",
	           sortProperty: "name",
	           filterProperty : "name",
			 }));

    	oSDASHM2EDIDETTableEDIDET.addColumn(new sap.ui.table.Column("idSDASHM2EDIDETTableEDIDETSerial",{
    		label: new sap.ui.commons.Label({text: "Serial No.", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 //template: new sap.ui.commons.TextView({
			 //}).bindProperty("text", "depotname").addStyleClass("borderStyle1"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "serial").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"150px",
	           sortProperty: "serial",
	           filterProperty : "serial",
	           grouped : false
			 }));

    	oSDASHM2EDIDETTableEDIDET.addColumn(new sap.ui.table.Column("idSDASHM2EDIDETTableEDIDETSubDate",{
    		label: new sap.ui.commons.Label({text: "Submitted Date", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 //template: new sap.ui.commons.TextView({
			 //}).bindProperty("text", "depotname").addStyleClass("borderStyle1"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "subdate").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"120px",
	           sortProperty: "subdatex",
	           filterProperty : "subdate",
			 }));

    	oSDASHM2EDIDETTableEDIDET.addColumn(new sap.ui.table.Column("idSDASHM2EDIDETTableEDIDETMsgDate",{
    		label: new sap.ui.commons.Label({text: "Message Date", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "msgdate").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"120px",
	           sortProperty: "msgdatex",
	           filterProperty : "msgdate",
			 }));

    	oSDASHM2EDIDETTableEDIDET.addColumn(new sap.ui.table.Column("idSDASHM2EDIDETTableEDIDETMessage",{
    		label: new sap.ui.commons.Label({text: "Message", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "message").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"auto",
	           sortProperty: "message",
	           filterProperty : "message",
			 }));


    	var printPersoData = function(sJSON) {
			//jQuery("#perso-data").html(sJSON
    		console.log(sJSON);
			/*	.replace(/\n/g, "<br>")
				.replace(/\s/g, "&nbsp;")
				.replace(/(true)/g, "<span style=\"color:green\">$1</span>")
				.replace(/(false)/g, "<span style=\"color:red\">$1</span>"));*/
		};

		var oPersoService = {

			getPersData: function() {
				var oDeferred = jQuery.Deferred();
				var sJSON = window.localStorage.getItem("oSDASHM2EDIDETTableEDIDETPersonal") || "{}";
				printPersoData(sJSON);
				var oBundle = JSON.parse(sJSON);
				oDeferred.resolve(oBundle);
				return oDeferred.promise();
			},

			setPersData: function(oBundle) {

				var oDeferred = jQuery.Deferred();

				/* grouping additiong
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
						case "idSDASHM2EDIDETTableEDIDET-idSDASHM2EDIDETTableEDIDETID":
							grpColumnname = "msgid";
							break;
						case "idSDASHM2EDIDETTableEDIDET-idSDASHM2EDIDETTableEDIDETType":
							grpColumnname = "type";
							break;
						case "idSDASHM2EDIDETTableEDIDET-idSDASHM2EDIDETTableEDIDETName":
							grpColumnname = "name";
							break;
						case "idSDASHM2EDIDETTableEDIDET-idSDASHM2EDIDETTableEDIDETSerial":
							grpColumnname = "serial";
							break;
						case "idSDASHM2EDIDETTableEDIDET-idSDASHM2EDIDETTableEDIDETSubDate":
							grpColumnname = "subdate";
							break;
						case "idSDASHM2EDIDETTableEDIDET-idSDASHM2EDIDETTableEDIDETMsgDate":
							grpColumnname = "msgdate";
							break;
						case "idSDASHM2EDIDETTableEDIDET-idSDASHM2EDIDETTableEDIDETMessage":
							grpColumnname = "message";
							break;


					}

					var flags = [], output = [], l = oSDASHM2EDIDETJson.length, i;
					for( i=0; i<l; i++) {
					    if( flags[oSDASHM2EDIDETJson[i][grpColumnname]]) continue;
					    flags[oSDASHM2EDIDETJson[i][grpColumnname]] = true;
					    output.push(oSDASHM2EDIDETJson[i][grpColumnname]);
					}
					console.log(output.length + " Unique " + grpColumnname + " found");

					var groupHeaderLength = output.length;
					var valuesLength = oSDASHM2EDIDETJson.length;
					var tableLength = groupHeaderLength + valuesLength;
					var oSDASHM2EDIDETTableEDIDET = sap.ui.getCore().byId("idSDASHM2EDIDETTableEDIDET");
					oSDASHM2EDIDETTableEDIDET.setVisibleRowCount(tableLength);


					}else{
						var oSDASHM2EDIDETTableEDIDET = sap.ui.getCore().byId("idSDASHM2EDIDETTableEDIDET");
						oSDASHM2EDIDETTableEDIDET.setVisibleRowCount(oSDASHM2EDIDETJson.length);
					}
					 grouping additiong */
				var sJSON = JSON.stringify(oBundle, null, 4);
				window.localStorage.setItem("oSDASHM2EDIDETTableEDIDETPersonal", sJSON);
				printPersoData(sJSON);
				oDeferred.resolve();
				return oDeferred.promise();
			},

			delPersData: function() {
				var oDeferred = jQuery.Deferred();
				window.localStorage.removeItem("oSDASHM2EDIDETTableEDIDETPersonal");
				printPersoData("");
				oDeferred.resolve();
				return oDeferred.promise();
			}

		};

		jQuery.sap.require("sap.ui.table.TablePersoController");
		var oTPC = new sap.ui.table.TablePersoController("idTPC", {
			table: oSDASHM2EDIDETTableEDIDET,
			persoService: oPersoService,
			hasGrouping: true
		});
		globalTPC = oTPC;
		//oTPC.activate();

		/*sap.ui.getCore().byId("idSDASHM2EDIDETTableEDIDET").onAfterRendering = function() {
			globalTPC.refresh();
		};*/

    	/*var oPersoService = {
				getPersData: function() {
					var oDeferred = new jQuery.Deferred();
					var oBundle = this._oBundle;
					oDeferred.resolve(oBundle);
					return oDeferred.promise();
				},

				setPersData: function(oBundle) {
					var oDeferred = new jQuery.Deferred();
					this._oBundle = oBundle;
					oDeferred.resolve();
					return oDeferred.promise();
				},

				delPersData: function() {
					var oDeferred = new jQuery.Deferred();

					var oInitialData = {
						_persoSchemaVersion: "1.0",
						aColumns: [
							{
								id: "idBUYERDMSCol1",
								order: 2,
								text: "Name",
								visible: true
							}, {
								id: "idBUYERDMSCol2",
								order: 1,
								text: "Number",
								visible: true
							}, {
								id: "idBUYERDMSCol3",
								order: 0,
								text: "Color",
								visible: true
							}
						]
					};

					this._oBundle = oInitialData;

					//				this._oBundle = null;
					oDeferred.resolve();
					return oDeferred.promise();
				},

				getCaption: function(oColumn) {
					if (oColumn.getLabel() && oColumn.getLabel().getText) {
						if (oColumn.getLabel().getText() == "Color") {
							return "Color: this is a very very very very long Column Name to check how the TablePersoDialog deals with it";
						}
					}
					return null;
				},

				getGroup: function(oColumn) {
					if (oColumn.getLabel() && oColumn.getLabel().getText) {
						if (oColumn.getLabel().getText() == "Serial No.") {
							return "Primary Group";
						}
					}
					return "Secondary Group";
				}
			};
		jQuery.sap.require("sap.ui.table.TablePersoController");
		var oTPC = new sap.ui.table.TablePersoController({
			table: oSDASHM2EDIDETTableEDIDET,
			persoService: oPersoService,
			hasGrouping: true
		});
		//oTPC.activate();

		sap.ui.getCore().byId("idBUYERDMSTablePoPersonal").attachPress(function() {
			oTPC.openDialog();
		});*/

    	/* SDASHM2EDIDET - Flexbox - Pending Approval */

		var oSDASHM2EDIDETFlexEDIDET = new sap.m.FlexBox({
		         items: [
		                oSDASHM2EDIDETFlexEDIDETTitle,
						new sap.ui.commons.Label({
							text : "",
							width : "100px"
						}),
						oSDASHM2EDIDETTableEDIDET
		       ],
		       direction : "Column",
		       visible: true,
		       //width: "80%"
		}).addStyleClass("marginLeft20");


		return oSDASHM2EDIDETFlexEDIDET;

	},

	/* SDASHM2EDIDET - Checkbox - Select All */

	SDASHM2EDIDETTableEDIDETSelectAll : function(){

		var len = oSDASHM2EDIDETJson.length;
	    var oSDASHM2EDIDETTableEDIDET = sap.ui.getCore().byId("idSDASHM2EDIDETTableEDIDET");
	    if(sap.ui.getCore().byId("idSDASHM2EDIDETTableEDIDETColumnCheckBox").getChecked()){
	      for(var i=0;i<len;i++){
	    	  oSDASHM2EDIDETJson[i].isChecked = true;
	      }
	    }
	    else{
	      for(var i=0;i<len;i++){
	    	  oSDASHM2EDIDETJson[i].isChecked = false;
	      }
	    }

	    oSDASHM2EDIDETTableEDIDET.getModel().updateBindings();

	}

});
