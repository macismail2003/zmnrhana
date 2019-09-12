// MAC04072019_APS980 - APS 980 Show Download button even for history

jQuery.sap.require("sap.ui.model.json.JSONModel");
var m_names = new Array("Jan", "Feb", "Mar",
		"Apr", "May", "Jun", "Jul", "Aug", "Sep",
		"Oct", "Nov", "Dec");

var oSDASHM3JsonProcessesCode = [];
var oSDASHM3JsonProcessesEstimates = [];
var globalSelectedEstimate = "";

var jsonSDASHM3DocNames = [];
var jsonSDASHM3PicturesChunks = [];
var jsonSDASHM3Pictures = [];
var jsonSDASHM3Documents = [];
var jsonSDASHM3Images = [];
var jsonSDASHM3LastActions = [];
var jsonSDASHM3DeleteReverseError = [];

var globalGateInDate = "";
var globalCustAppDate = "";
var globalUNNo = "";
var globalLastCargo = "";
var globalIsLineCodeDesc = "CODE";

var global3Equnr = "";
var global3SerialNo = "";
var global3Depot = "";
var global3EstimateNo = "";

var global3LastAction = "Last Action";

var global3DocList = "";
var global3DocNumbers = "";
var global3DocType = "";
var global3DocText = "";
var global3DocCat = "";
var global3DocDate = "";
var global3UploadDeleteVisible = true;
var global3Processkey = "";
var global3HeaderUrl = "";
var globalPicPanelExpanded = false;
var globalPicLoadNeeded = true;
var globalSDASHM3TableEstimateLinesUITPC = null;

var global3isFromSerialHistory = "";
var global3isProcessChange = "";

sap.ui.model.json.JSONModel.extend("sdashm3", {

	/* SDASHM3 - Page - Seaco Dashboard page 3 */

	createSDASHM3Page : function(){

		var oCurrent = this;

		/* SDASHM3 - Content - Buttons */

		var oSDASHM3ContentButtons = oCurrent.setContentButtons();

		/* SDASHM3 - Content - Record Details */

		var oSDASHM3ContentRecordDetails = oCurrent.setContentRecordDetails();

		/* SDASHM3 - Content - Header Details */

		var oSDASHM3ContentHeaderDetails = oCurrent.setContentHeaderDetails();

		/* SDASHM3 - Content - Picture Thumbnail */

		var oSDASHM3ContentThumbnail = oCurrent.setContentThumbnail();

		/* SDASHM3 - Content - Estimate Lines */

		var oSDASHM3ContentEstimateLines = oCurrent.setContentEstimateLines();

		/* SDASHM3 - Content - Summary Lines */

		var oSDASHM3ContentMiscInfo = oCurrent.setContentMiscInfo();

		/* SDASHM3 - Flexbox - Record and Buttons in same row */

		/* SDASHM3 - Layout - Carousel and Upload Section */

		var oSDASHM3LayoutRecordDetails = new sap.ui.layout.form.ResponsiveGridLayout("idCDASHM2LayoutRecordDetails",{
										    });

		/* SDASHM3 - Flex - Header Details */

		var oSDASHM3FormRecordDetails = new sap.ui.layout.form.Form("idSDASHM3FormRecordDetails",{
	        layout: oSDASHM3LayoutRecordDetails,
	        formContainers: [
	                new sap.ui.layout.form.FormContainer("idSDASHM3ContentRecordButtonsC1",{
	                    //title: "Summary",
	                	layoutData: new sap.ui.layout.GridData({span: "L9 M9 S9"}),
	                    formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [ oSDASHM3ContentRecordDetails ]
											})
	                                ]
	                })

	        ]
		    }).addStyleClass("marginTopBottom10");

				/* SDASHM3 - Flexbox - Final */

				var oSDASHM3ContentFinal = new sap.m.FlexBox("idSDASHM3ContentFinal",{
				         items: [
									//  new sap.m.FlexBox({
					 				// 	direction : "Row",
					 				// 	items : [ oSDASHM3ContentButtons.setWidth("65%"), oSDASHM3ContentRecordDetails.setWidth("25%") ]
					 				// }),
								oSDASHM3ContentButtons.addStyleClass("marginLeft20Page3"),
								new sap.ui.commons.Label({
									text : "",
									width : "100px"
								}),
								oSDASHM3ContentRecordDetails.addStyleClass("marginLeft20Page3"),
								new sap.ui.commons.Label({
									text : "",
									width : "100px"
								}),
								oSDASHM3ContentHeaderDetails,
								oSDASHM3ContentThumbnail,
								oSDASHM3ContentEstimateLines,
								oSDASHM3ContentMiscInfo
				       ],
				       direction : "Column",
				       visible: true,
				});

				return oSDASHM3ContentFinal;

		/* SDASHM3 - Flexbox - Final */

		/*var oSDASHM3ContentFinal = new sap.m.FlexBox("idSDASHM3ContentFinal",{
		         items: [
							//  new sap.m.FlexBox({
			 				// 	direction : "Row",
			 				// 	items : [ oSDASHM3ContentButtons.setWidth("65%"), oSDASHM3ContentRecordDetails.setWidth("25%") ]
			 				// }),
						oSDASHM3ContentButtons.addStyleClass("marginLeft20Page3"),
						new sap.ui.commons.Label({
							text : "",
							width : "100px"
						}),
						//oSDASHM3ContentRecordDetails.addStyleClass("marginLeft20Page3"),
						oSDASHM3FormRecordDetails,
						new sap.ui.commons.Label({
							text : "",
							width : "100px"
						}),
						oSDASHM3ContentHeaderDetails,
						oSDASHM3ContentThumbnail,
						oSDASHM3ContentEstimateLines,
						oSDASHM3ContentMiscInfo
		       ],
		       direction : "Column",
		       visible: true,
		});

		return oSDASHM3ContentFinal;*/

	},

	/* SDASHM3 - Value - Header Details */

	setValueHeaderDetails : function(isFromSerialHistory, isProcessChange){

		global3isFromSerialHistory = isFromSerialHistory;
		global3isProcessChange = isProcessChange;

		var local3EstimateNo = global3EstimateNo;
		var local3DocType = global3DocType;
		var local3DocText = global3DocText;
		var local3DocCat = global3DocCat;
		var local3DocDate = global3DocDate;
		local3DocDate = encodeURIComponent(local3DocDate);

		if(!isFromSerialHistory){
			local3EstimateNo = "";
			//local3DocType = "";
			//local3DocText = "";
			//local3DocCat = "";
			local3DocDate = "";
			sap.ui.getCore().byId("idSDASHM3RecordDetailsValueRecordTypeTop").setEnabled(true);
			sap.ui.getCore().byId("idSDASHM3PicUpload").setVisible(oJSONSDASHMAuthorizationRoles["ZMNR.UPLOAD3BUTTON"]);
			sap.ui.getCore().byId("idSDASHM3PicDelete").setVisible(oJSONSDASHMAuthorizationRoles["ZMNR.UPLOAD3BUTTON"]);
			global3UploadDeleteVisible = oJSONSDASHMAuthorizationRoles["ZMNR.UPLOAD3BUTTON"];
			sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelEdit").setVisible(oJSONSDASHMAuthorizationRoles["ZMNR.EDIT3BUTTON"]);
			sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelDownload").setVisible(oJSONSDASHMAuthorizationRoles["ZMNR.DOWNLOADESTIMBUTTON"]);
			sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelExport").setVisible(true);
			sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelDelete").setVisible(oJSONSDASHMAuthorizationRoles["ZMNR.REVERSE3BUTTON"]);
			sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelRequest").setVisible(oJSONSDASHMAuthorizationRoles["ZMNR.REQUESTPIC3BUTTON"]);
			sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelForward").setVisible(false);
			if(global3CustApprEnable == "X")
				sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelCSApproval").setVisible(oJSONSDASHMAuthorizationRoles["ZMNR.CUSTAPPBUTTON"]);
		  else
				sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelCSApproval").setVisible(false);
		}else{
			sap.ui.getCore().byId("idSDASHM3RecordDetailsValueRecordTypeTop").setEnabled(false);
			sap.ui.getCore().byId("idSDASHM3PicUpload").setVisible(false);
			sap.ui.getCore().byId("idSDASHM3PicDelete").setVisible(false);
			global3UploadDeleteVisible = false;
			sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelEdit").setVisible(false);
			//sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelDownload").setVisible(false); // MAC04072019_APS980-
			sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelDownload").setVisible(oJSONSDASHMAuthorizationRoles["ZMNR.DOWNLOADESTIMBUTTON"]);	// MAC04072019_APS980+
			sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelExport").setVisible(false);
			sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelDelete").setVisible(false);
			sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelRequest").setVisible(false);
			sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelForward").setVisible(false);
			sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelCSApproval").setVisible(false);
			var processtemp = "";
			switch (global3DocType) {
				case "ZFES":
					processtemp = "OE";
					break;
				case "ZGES":
					processtemp = "JS";
					break;
				case "ZLEO":
					processtemp = "LS";
					break;
				case "ZHES":
					processtemp = "AE1";
					break;
				case "ZJES":
					processtemp = "PE1";
					break;
				case "ZIES":
					processtemp = "SU";
					break;
				case "ZKES":
					processtemp = "PS";
					break;
				case "ZWES":
					processtemp = "CW1";
					break;
				case "ZA":
					processtemp = "GO";
					break;
				case "ZB":
					processtemp = "GO";
					break;
				case "ZC":
					processtemp = "GO";
					break;
				case "ZD":
					processtemp = "GI";
					break;
				case "ZE":
					processtemp = "GI";
					break;
			}
			sap.ui.getCore().byId("idSDASHM3RecordDetailsValueRecordTypeTop").setSelectedKey(processtemp);
			oSDASHM3JsonRecordLines[0].value1 = processtemp;
		}

		console.log("Get Header : Page 3");

	  if(isProcessChange == true){
	 		local3EstimateNo = globalSelectedEstimate;
			local3DocType = "";
	  }
		//if(isProcessChange == false){
		var urlToSap = "header3Set(IvSerial='" + global3SerialNo +
								   "',IvEstimate='" + local3EstimateNo +
								   "',IvDepot='" + global3Depot +
								   "',IvDocType='" + local3DocType +
								   "',IvDocText='" + local3DocText +
								   "',IvDocCat='" + local3DocCat +
								   "',IvDocDate='" + local3DocDate +
								   "')";
	 // }else{
		//  var processkey = sap.ui.getCore().byId("idSDASHM3RecordDetailsValueRecordTypeTop").getSelectedKey();
		//  var encodedGateInDate = encodeURIComponent(globalGateInDate);
		//  var urlToSap = "header3pcSet(IvSerial='" + global3SerialNo +
		//  								"',IvLines='" + "" +
		// 								"',IvDocCat='" + global3Processkey +
		// 								"',IvDepot='" + global3Depot +
		// 								"',IvGateinDate='" + encodedGateInDate +
		// 								"')";
	 //
	 // }

    	urlToSap = serviceDEP + urlToSap;
			global3HeaderUrl = urlToSap;

    	oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	        console.log(urlToSap);
	        OData.request({
	                      requestUri: urlToSap,
	                      method: "GET",
	                      dataType: 'json',
	                      async: false,
	                      headers:
	                      {
	                      "X-Requested-With": "XMLHttpRequest",
	                      "Content-Type": "application/json; charset=utf-8",
	                      "DataServiceVersion": "2.0",
	                      "X-CSRF-Token":"Fetch"
	                      }
	                      },
	                      function (data, response){
							 if(data.DocList != "")
								 global3DocList = data.DocList;
							 
							 if(data.DocNumbers != "")
								 global3DocNumbers = data.DocNumbers;
								 
							 global3DocType = data.DocType;
	                    	 console.log("Get Header : Page 3 Success");
	                    	 sap.ui.getCore().byId("idSDASHM3PanelEstimateLines").setVisible(true);
	                    	 sap.ui.getCore().byId("idSDASHM3PanelMiscInfo").setVisible(true);
							sap.ui.getCore().byId("idSDASHM3PicUpload").setVisible(true);
							sap.ui.getCore().byId("idSDASHM3PicDelete").setVisible(true);
							global3UploadDeleteVisible = true;
							if(data.IvDepot.substr(0,1) == "9"){ // Factory Unit
								sap.ui.getCore().byId("idSDASHM3PanelEstimateLines").setVisible(false);
								sap.ui.getCore().byId("idSDASHM3PanelMiscInfo").setVisible(false);
								sap.ui.getCore().byId("idSDASHM3PicUpload").setVisible(false);
								sap.ui.getCore().byId("idSDASHM3PicDelete").setVisible(false);
								global3UploadDeleteVisible = false;
								oSDASHM3JsonRecordLines[0].value1 = "GI";
								var oSDASHM3RecordDetailsValueRecordTypeTop = sap.ui.getCore().byId("idSDASHM3RecordDetailsValueRecordTypeTop");
							oSDASHM3RecordDetailsValueRecordTypeTop.removeAllItems();

												   var estimsObject = [];
														for(var i=0; i<oSDASHM3JsonProcesses.length;i++){
														  if(oSDASHM3JsonProcesses[i].key == oSDASHM3JsonRecordLines[0].value1){
													 			// oSDASHM3RecordDetailsValueRecordTypeTop.addItem(new sap.ui.core.ListItem({
													 			// 		text : oSDASHM3JsonProcesses[i].text,
													 			// 		key: oSDASHM3JsonProcesses[i].key
																 // 	}));
																 
																 estimsObject.push({
																	text : oSDASHM3JsonProcesses[i].text,
 												 					key: oSDASHM3JsonProcesses[i].key
															  	});

																}
											 			}
 													data.JobType == oSDASHM3JsonRecordLines[0].value1;

												 }else{
												 if(isProcessChange == true){ // If this is a process change, don't change the dropdown value

												 // MACHANACHANGE+

												 oSDASHM3JsonProcessesCode = global3DocList.split('$');
												 oSDASHM3JsonProcessesEstimates = global3DocNumbers.split('$');

													var foundValue = "";
													var estimsObject = [];

													for(var i=0; i<oSDASHM3JsonProcessesCode.length;i++){
														foundValue = isInArraySJSONProcess(oSDASHM3JsonProcessesCode[i], oSDASHM3JsonProcesses);
 													  if(foundValue){
 												 			// oSDASHM3RecordDetailsValueRecordTypeTop.addItem(new sap.ui.core.ListItem({
 												 			// 		text : foundValue.text,
 												 			// 		key: foundValue.key,
															// 		estimate: oSDASHM3JsonProcessesEstimates[i]
															  // 	}));
															  
															  estimsObject.push({
																	text : foundValue.text,
 												 					key: foundValue.key,
																	estimate: oSDASHM3JsonProcessesEstimates[i]
															  });
 															}
													  }
													  
													  // MACHANACHANGE+
												 if(data.JobType == "GI"){
													 sap.ui.getCore().byId("idSDASHM3PanelEstimateLines").setVisible(false);
													 sap.ui.getCore().byId("idSDASHM3PanelMiscInfo").setVisible(false);
												 }
												 // sap.ui.getCore().byId("idSDASHM3PicUpload").setVisible(false);
												 // sap.ui.getCore().byId("idSDASHM3PicDelete").setVisible(false);
												 // global3UploadDeleteVisible = false;
												 // var processkey = sap.ui.getCore().byId("idSDASHM3RecordDetailsValueRecordTypeTop").getSelectedKey();
												 // if(global3Processkey == "GI"){
													//  sap.ui.getCore().byId("idSDASHM3PanelEstimateLines").setVisible(false);
													//  sap.ui.getCore().byId("idSDASHM3PanelMiscInfo").setVisible(false);
												 // }

												 }else{

	                    	 /* Record Type */
												 if(isFromSerialHistory == false){
												 /* Restrict Record Type drop down values based on the process
												 I.e., If the process if original estimate, then only Gate IN and Origianl Estimate should be available in the dropdown */
												 var oSDASHM3RecordDetailsValueRecordTypeTop = sap.ui.getCore().byId("idSDASHM3RecordDetailsValueRecordTypeTop");
												 oSDASHM3RecordDetailsValueRecordTypeTop.removeAllItems();
												 var oSDASHM3JsonProcessesLoc = "";//oSDASHM3JsonProcesses;

												 oSDASHM3JsonProcessesCode = global3DocList.split('$');
												 oSDASHM3JsonProcessesEstimates = global3DocNumbers.split('$');

												 /*for(var i=0; i<oSDASHM3JsonProcesses.length;i++){
													  if(isInArraySJSONProcess(oSDASHM3JsonProcesses[i].key, oSDASHM3JsonProcessesCode)){
												 			oSDASHM3RecordDetailsValueRecordTypeTop.addItem(new sap.ui.core.ListItem({
												 					text : oSDASHM3JsonProcesses[i].text,
												 					key: oSDASHM3JsonProcesses[i].key
												 				}));
															}
										 			}*/
													var foundValue = "";
													var estimsObject = [];

													for(var i=0; i<oSDASHM3JsonProcessesCode.length;i++){
														foundValue = isInArraySJSONProcess(oSDASHM3JsonProcessesCode[i], oSDASHM3JsonProcesses);
 													  if(foundValue){
 												 			// oSDASHM3RecordDetailsValueRecordTypeTop.addItem(new sap.ui.core.ListItem({
 												 			// 		text : foundValue.text,
 												 			// 		key: foundValue.key,
															// 		estimate: oSDASHM3JsonProcessesEstimates[i]
															  // 	}));
															  
															  estimsObject.push({
																	text : foundValue.text,
 												 					key: foundValue.key,
																	estimate: oSDASHM3JsonProcessesEstimates[i]
															  });
 															}
 										 			}

												}else{

													var oSDASHM3RecordDetailsValueRecordTypeTop = sap.ui.getCore().byId("idSDASHM3RecordDetailsValueRecordTypeTop");
 												  oSDASHM3RecordDetailsValueRecordTypeTop.removeAllItems();
												   var estimsObject = [];
													for(var i=0; i<oSDASHM3JsonProcesses.length;i++){
 													  if(oSDASHM3JsonProcesses[i].key == oSDASHM3JsonRecordLines[0].value1){
 												 			// oSDASHM3RecordDetailsValueRecordTypeTop.addItem(new sap.ui.core.ListItem({
 												 			// 		text : oSDASHM3JsonProcesses[i].text,
 												 			// 		key: oSDASHM3JsonProcesses[i].key
															  // 	}));
															  estimsObject.push({
																text : oSDASHM3JsonProcesses[i].text,
																  key: oSDASHM3JsonProcesses[i].key
															  });
 															}
 										 			}
													data.JobType == oSDASHM3JsonRecordLines[0].value1;
												}



	                    	 if(data.JobType != ""){

								if(data.JobType == "CW" || data.JobType == "AE" || data.JobType == "PE"){	// MACHANACHANGES+
									oSDASHM3JsonRecordLines[0].value1 = data.JobType + "1";
								}else{
									oSDASHM3JsonRecordLines[0].value1 = data.JobType;
								}
								global3Processkey = data.JobType;	// MACHANACHANGES+

	                    		 // oSDASHM3JsonRecordLines[0].value1 = data.JobType; // MACHANACHANGES-
								 // global3Processkey = oSDASHM3JsonRecordLines[0].value1;	// MACHANACHANGES-

	                    		 if(data.JobType == "GI"){
	                    			 sap.ui.getCore().byId("idSDASHM3PanelEstimateLines").setVisible(false);
	    	                     	 sap.ui.getCore().byId("idSDASHM3PanelMiscInfo").setVisible(false);
	                    		 }
	                    	 }
	                    	 else{
	                    		 oSDASHM3JsonRecordLines[0].value1 = "GI";
													 global3Processkey = oSDASHM3JsonRecordLines[0].value1;
	                    	 }

	                 		 /*var oSDASHM3ModelRecordType = new sap.ui.model.json.JSONModel();
	                 		 oSDASHM3ModelRecordType.setData({modelData: oSDASHM3JsonRecordType});

                     	 var oSDASHM3TableRecordType = sap.ui.getCore().byId("idSDASHM3TableRecordType");
                     	 oSDASHM3TableRecordType.setModel(oSDASHM3ModelRecordType);
                     	 oSDASHM3TableRecordType.setVisibleRowCount(1);
                     	 oSDASHM3TableRecordType.bindRows("/modelData");*/
										   }
										 }
                     	 /* Last Actions */
                     	jsonSDASHM3LastActions = [];
                     	 if(data.LastActions != ""){
                     		jsonSDASHM3LastActions = data.LastActions.split('$');
												oSDASHM3JsonRecordLines[0].value4 = jsonSDASHM3LastActions[0];//.splice(18, 0, "\n");
                     		oSDASHM3JsonRecordLines[0].f4visible = true;
                     	 }else{
                     		oSDASHM3JsonRecordLines[0].value4 = "";
                     		oSDASHM3JsonRecordLines[0].f4visible = false;
                     	 }


	                    	 /* Record Details */

	                    	oSDASHM3JsonRecordLines[0].value2 = global3SerialNo;
	                 			oSDASHM3JsonRecordLines[0].value3 = data.Status;
									  
								 if(sap.ui.getCore().byId("idSDASHM3TableRecordDetails").getModel())
										sap.ui.getCore().byId("idSDASHM3TableRecordDetails").getModel().setProperty("/modelData", null);
									var oSDASHM3ModelRecordDetails = new sap.ui.model.json.JSONModel();
									oSDASHM3ModelRecordDetails.setData({modelData: oSDASHM3JsonRecordLines});

									var oSDASHM3TableRecordDetails = sap.ui.getCore().byId("idSDASHM3TableRecordDetails");
									oSDASHM3TableRecordDetails.setModel(oSDASHM3ModelRecordDetails);
									oSDASHM3TableRecordDetails.setVisibleRowCount(oSDASHM3JsonRecordLines.length);
									oSDASHM3TableRecordDetails.bindRows("/modelData");
							   
						  	   if(estimsObject){
								if(sap.ui.getCore().byId("idSDASHM3TableRecordDetails").getModel())
						  	   			sap.ui.getCore().byId("idSDASHM3TableRecordDetails").getModel().setProperty("/Estims", null);
						  	   	oSDASHM3ModelRecordDetails.setProperty("/Estims", estimsObject);
						  	   }
							   		
							   
	                    	 /* Notes Section First */

												 oSDASHM3JsonMiscInfo[0].value1 = data.MnrComment;
												 oSDASHM3JsonMiscInfo[0].value2 = (data.ClearMnrComment == "Y")?"Yes":"No";
												 oSDASHM3JsonMiscInfo[0].value3 = (data.DisplayInRa == "Y")?"Yes":"No";

												 oSDASHM3JsonMiscInfo[1].value1 = data.EvNotes1;
												 oSDASHM3JsonMiscInfo[1].value2 = data.EvNotes2;
												 oSDASHM3JsonMiscInfo[1].value3 = data.EvNotes3;

												 oSDASHM3JsonMiscInfo[2].value1 = data.EvNotes4;
												 oSDASHM3JsonMiscInfo[2].value2 = data.EvNotes5;
												 oSDASHM3JsonMiscInfo[2].value3 = "";

												 var oSDASHM3ModelMiscInfo = new sap.ui.model.json.JSONModel();
												 oSDASHM3ModelMiscInfo.setData({modelData: oSDASHM3JsonMiscInfo});

												 var oSDASHM3TableMiscInfo = sap.ui.getCore().byId("idSDASHM3TableMiscInfo");
												 oSDASHM3TableMiscInfo.setModel(oSDASHM3ModelMiscInfo);
												 oSDASHM3TableMiscInfo.setVisibleRowCount(oSDASHM3JsonMiscInfo.length);
												 oSDASHM3TableMiscInfo.bindRows("/modelData");

												 /*sap.ui.getCore().byId("idSDASHM3InputMNRComment").setValue(data.MnrComment);
	                    	 sap.ui.getCore().byId("idSDASHM3ComboClear").setValue(data.ClearMnrComment);
	                    	 sap.ui.getCore().byId("idSDASHM3ComboDisplay").setValue(data.DisplayInRa);

	                    	 sap.ui.getCore().byId("idSDASHM3TextAreaNotes1").setValue(data.EvNotes1);
	                    	 sap.ui.getCore().byId("idSDASHM3TextAreaNotes2").setValue(data.EvNotes2);
	                    	 sap.ui.getCore().byId("idSDASHM3TextAreaNotes3").setValue(data.EvNotes3);
	                    	 sap.ui.getCore().byId("idSDASHM3TextAreaNotes4").setValue(data.EvNotes4);
	                    	 sap.ui.getCore().byId("idSDASHM3TextAreaNotes5").setValue(data.EvNotes5);*/


												 /* Header Section */

												 /****************************************************/
												 /* Estimate Date */
												 if(data.EstimateDate != ""){
												   oSDASHM3JsonHeaderLines[0].value1 = data.EstimateDate.substr(0,2)
												 + " " + m_names[parseInt(data.EstimateDate.substr(3,2)) - 1]
												 + " " + data.EstimateDate.substr(6,4);;
												 }else{
												   oSDASHM3JsonHeaderLines[0].value1 = "";
												 }

												 /* Estimate Number */
												 oSDASHM3JsonHeaderLines[0].value2 = data.Aufnr;
												 global3EstimateNo = data.Aufnr;

												 /* Local Currency */
												 oSDASHM3JsonHeaderLines[0].value3 = data.Currency;

												 /* Customer */
												 oSDASHM3JsonHeaderLines[0].value4 = data.Customer;

												 /****************************************************/
												 /* Off Hire Date */

												 if(data.GateInDate != ""){

												 oSDASHM3JsonHeaderLines[1].value1 = data.GateInDate.substr(0,2)
												 + " " + m_names[parseInt(data.GateInDate.substr(3,2)) - 1]
												 + " " + data.GateInDate.substr(6,4);;
												 }else{
												   oSDASHM3JsonHeaderLines[1].value1 = "";
												 }
												 globalGateInDate = data.GateInDate;

												 /* Off Hire Location */
												 oSDASHM3JsonHeaderLines[1].value2 = data.OffhireFuncLoc;

												 /* CW Cost */
												 oSDASHM3JsonHeaderLines[1].value3 = data.Currency + " " + thousandsep(data.CwCost);

												 /* Customer Approval Date */
												 if(data.CustAppDate != ""){

												    oSDASHM3JsonHeaderLines[1].value4 = data.CustAppDate.substr(0,2)
												                 + " " + m_names[parseInt(data.CustAppDate.substr(3,2)) - 1]
												                 + " " + data.CustAppDate.substr(6,4);
												 }else{
												   oSDASHM3JsonHeaderLines[1].value4 = "";
												 }
												 globalCustAppDate =  data.CustAppDate;

												 /****************************************************/
												 /* On Hire Date */
												 if(data.GateOutDate == ""){
												   oSDASHM3JsonHeaderLines[2].value1 = "";
												 }else{
												     oSDASHM3JsonHeaderLines[2].value1 = data.GateOutDate.substr(0,2)
												 + " " + m_names[parseInt(data.GateOutDate.substr(3,2)) - 1]
												 + " " + data.GateOutDate.substr(6,4);
												 }
												 /* On Hire Location */
												 oSDASHM3JsonHeaderLines[2].value2 = data.OnhireLoc;
												 /* DRV Amount */
												 oSDASHM3JsonHeaderLines[2].value3 = data.Currency + " " + thousandsep(data.DrvAmount);
												 /* Cust App Reference */
												 oSDASHM3JsonHeaderLines[2].value4 = data.CustAppRef;

												 /****************************************************/
												 /* Grade */
												 oSDASHM3JsonHeaderLines[3].value1 = data.Grade;

												 /*Redelivery Ref*/
												 oSDASHM3JsonHeaderLines[3].value2 = data.RaNo;

												 /* DRV Amount USD */
												 oSDASHM3JsonHeaderLines[3].value3 = data.DrvAmountUsd;

												 /* Last Cargo */
												 oSDASHM3JsonHeaderLines[3].value4 = data.LastCargo;
												 globalUNNo = data.UnNo;
												 if(data.LastCargo != ""){
													 globalLastCargo = data.LastCargo.split(')')[1].trim();
												 }


												 /****************************************************/
												 /* TAB Days */
												 oSDASHM3JsonHeaderLines[4].value1 = (data.TabDays==99999)?"":data.TabDays; //global3TabDays;
												 /* Lease Number */
												 oSDASHM3JsonHeaderLines[4].value2 = data.LeaseNo;
												 /*SeaCover*/
												 if(data.SeacoverLimit == "")
												 	data.SeacoverLimit = "0.00";

												 if(data.SeacoverLimit == 'Full' || data.SeacoverLimit == 'No SCR'){
													 	oSDASHM3JsonHeaderLines[4].value3 = data.SeacoverLimit;
												 }else{
													  oSDASHM3JsonHeaderLines[4].value3 = data.Currency + " " + thousandsep(data.SeacoverLimit);
												 }

												 /* Unit Type */
												 oSDASHM3JsonHeaderLines[4].value4 = data.UnitType;

												 /* Manuf. Yr (Age) */
												 oSDASHM3JsonHeaderLines[5].value1 = data.MfgYear;
												 /* Billing Type */
												 oSDASHM3JsonHeaderLines[5].value2 = data.BillingType;
												 /*SeaCover USD*/
												 /*if(data.SeacoverLimitUsd == "")
												 	data.SeacoverLimitUsd = "0.00";

													if(data.SeacoverLimitUsd == 'Full' || data.SeacoverLimitUsd == 'No SCR'){
 													 	oSDASHM3JsonHeaderLines[5].value3 = data.SeacoverLimitUsd;
 												 }else{
												 		oSDASHM3JsonHeaderLines[5].value3 = "USD " + thousandsep(data.SeacoverLimitUsd);
											 	 }*/
												 oSDASHM3JsonHeaderLines[5].value3 = data.SeacoverLimitUsd;

												 /*Tech Bulletin*/
												 oSDASHM3JsonHeaderLines[5].value4 = data.TbNo;

												 /****************************************************/
												 oSDASHM3JsonHeaderLinesOthers = {
													 Uom : data.Uom,
													 UnitType : data.UnitType,
													 LaborRate : data.LaborRate,
													 ClearMnrComment : data.ClearMnrComment,
													 MnrComment : data.MnrComment,
													 DisplayInRa : data.DisplayInRa,
													 Uom : data.Uom
												 };

	                    },
	                  function(error){
	                      //sap.ui.commons.MessageBox.alert("Sorry, there is an error");
	                	  console.log("Get Header : Page 3 Failure");
	                  });

		var oSDASHM3ModelHeaderDetails = new sap.ui.model.json.JSONModel();
		oSDASHM3ModelHeaderDetails.setData({modelData: oSDASHM3JsonHeaderLines});

      	var oSDASHM3TableHeaderDetails = sap.ui.getCore().byId("idSDASHM3TableHeaderDetails");
      	oSDASHM3TableHeaderDetails.setModel(oSDASHM3ModelHeaderDetails);
      	oSDASHM3TableHeaderDetails.setVisibleRowCount(oSDASHM3JsonHeaderLines.length);
      	oSDASHM3TableHeaderDetails.bindRows("/modelData");
	},

	/* SDASHM3 - Content Header Details */
	setContentHeaderDetails : function(){

		/* Return expected in this format */

		// Depot		// UOM				// Estimate Number
		// City			// On Hire Date		// Currency
		// Lease No		// Gate In Date		// Age
		// Unit Type	// Est Date			// Redel Ref
		// Customer

		/*  Return expected in this format */

	/* SDASHM3 - Table - Header Details */

	var oSDASHM3TableHeaderDetails = new sap.ui.table.Table("idSDASHM3TableHeaderDetails",{
 		visibleRowCount: 5,
 		columnHeaderVisible : false,
 		width: '98%',
 		selectionMode : sap.ui.table.SelectionMode.None
	}).addStyleClass("sapUiSizeCompact tblBorder1");

	oSDASHM3TableHeaderDetails.addColumn(new sap.ui.table.Column({
        //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
		 template: new sap.ui.commons.TextView({
			 textAlign: "Right"
		 }).bindProperty("text", "label1").addStyleClass("borderStyle1 boldText"),
           resizable:false,
					 //width:"100px"
					 width : "auto"
		 }));

	oSDASHM3TableHeaderDetails.addColumn(new sap.ui.table.Column({
		 template: new sap.ui.commons.TextView({
			 textAlign: "Left"
		 }).bindProperty("text", "value1").addStyleClass("borderStyle1"),
           resizable:false,
					 //width:"100px"
					 width : "auto"
		 }));

	oSDASHM3TableHeaderDetails.addColumn(new sap.ui.table.Column({
        //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
		 template: new sap.ui.commons.TextView({
			 textAlign: "Right"
		 }).bindProperty("text", "label2").addStyleClass("borderStyle1 boldText"),
           resizable:false,
					 //width:"100px"
					 width : "auto"
		 }));

	oSDASHM3TableHeaderDetails.addColumn(new sap.ui.table.Column({
		 template: new sap.ui.commons.TextView({
			 textAlign: "Left"
		 }).bindProperty("text", "value2").addStyleClass("borderStyle1"),
           resizable:false,
					 //width:"100px"
					 width : "auto"
		 }));

	oSDASHM3TableHeaderDetails.addColumn(new sap.ui.table.Column({
        //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
		 template: new sap.ui.commons.TextView({
			 textAlign: "Right"
		 }).bindProperty("text", "label3").addStyleClass("borderStyle1 boldText"),
           resizable:false,
					 //width:"140px"
					 width : "auto"
		 }));

	oSDASHM3TableHeaderDetails.addColumn(new sap.ui.table.Column({
		 template: new sap.ui.commons.TextView({
			 textAlign: "Left"
		 }).bindProperty("text", "value3").addStyleClass("borderStyle1"),
           resizable:false,
					 //width:"100px"
					 width : "auto"
		 }));

	oSDASHM3TableHeaderDetails.addColumn(new sap.ui.table.Column({
        //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
		 template: new sap.ui.commons.TextView({
			 textAlign: "Right"
		 }).bindProperty("text", "label4").addStyleClass("borderStyle1 boldText"),
           resizable:false,
					 //width:"100px"
					 width : "auto"
		 }));

	oSDASHM3TableHeaderDetails.addColumn(new sap.ui.table.Column({
		 template: new sap.ui.commons.TextView({
			 textAlign: "Left"
		 }).bindProperty("text", "value4").addStyleClass("borderStyle1"),
           resizable:false,
					 //width:"240px"
					 width : "auto"
		 }));


	/* SDASHM3 - Layout - Header Details */

	var oSDASHM3LayoutHeaderDetails = new sap.ui.layout.form.ResponsiveGridLayout("idSDASHM3LayoutHeaderDetails",{
									    	labelSpanL: 1,
									        labelSpanM: 1,
									        labelSpanS: 1,
									        emptySpanL: 0,
									        emptySpanM: 0,
									        emptySpanS: 0,
									        columnsL: 1,
									        columnsM: 1,
									        columnsS: 1,
									        breakpointL: 765,
									        breakpointM: 320
									    });

	/* SDASHM3 - Form - Header Details */

	var oSDASHM3FormHeaderDetails = new sap.ui.layout.form.Form("idSDASHM3FormHeaderDetails",{
        layout: oSDASHM3LayoutHeaderDetails,
        formContainers: [
                /*new sap.ui.layout.form.FormContainer("idSDASHM3FormHeaderDetailsC1",{
                    //title: "Summary",
                    formElements: [
										new sap.ui.layout.form.FormElement({
										    fields: [ new sap.ui.commons.Label({
															text : "",
															width : "100px"
														}),
										             ]
										})
                                ]
                }),*/

                new sap.ui.layout.form.FormContainer("idSDASHM3FormHeaderDetailsC2",{
                    //title: "Summary",
                    formElements: [
										new sap.ui.layout.form.FormElement({
										    fields: [oSDASHM3TableHeaderDetails]
										})
                                ]
                }),

        ]
	    }).addStyleClass("marginTopBottom10");

		/* SDASHM3 - Panel - Header Details */

		var oSDASHM3PanelHeaderDetails = new sap.m.Panel("idSDASHM3PanelHeaderDetails",{
			busy : false, // boolean
			busyIndicatorDelay : 1000, // int
			visible : true, // boolean
			headerText : "M&R Summary", // string
			width : "100%",
			height : "auto", // sap.ui.core.CSSSize
			expandable : true, // boolean, since 1.22
			expanded : false, // boolean, since 1.22
			expandAnimation : true, // boolean, since 1.26
			//tooltip : "Filters", // sap.ui.core.TooltipBase
			content : [new sap.m.FlexBox({ items : [oSDASHM3TableHeaderDetails]})], // sap.ui.core.Control
		});

		return oSDASHM3PanelHeaderDetails;
	},

	/* SDASHM3 - Value - Record Details */
	setValueRecordDetails : function(){

	},

	/* SDASHM3 - Change Process */

	changeSDASHM3Process : function(processKey){

		var oCurrent = this;

	 /* SDASHM3 - Value - Header Details */

		oCurrent.setValueHeaderDetails(false, true);	// first false means this is not from serial history popup
																									// second true means this is a process change

	 /* SDASHM3 - Value - Record Details */

		/* oSDASHM3.setValueRecordDetails(); */

		/* SDASHM3 - Value - M&R Pictures */
		//globalPicPanelExpanded = false;
		//var oSDASHM3ContentThumbNail = oCurrent.setContentThumbnail("");
		//sap.ui.getCore().byId("idSDASHM3ContentFinal").insertItem(oSDASHM3ContentThumbNail, 5);

	 /* SDASHM3 - Value - Estimate Lines */

		oCurrent.setValueEstimateLines(false, true);	// first false means this is not from serial istory popup
																									// second true means this is a process change

	 /* SDASHM3 - Value - Summary Lines */

	/* oSDASHM3.setValueMiscInfo(); */


	},

	/* SDASHM3 - Content - Record Detailss */
	setContentRecordDetails : function(){

	var oCurrent = this;

	/* SDASHM3 - Record Type DropDown */

	var oItemTemplate = new sap.ui.core.Item({
			key : "{key}",
			text : "{text}",
			templateShareable:true
		});

		var oSDASHM3RecordDetailsValueRecordTypeTop = new sap.m.ComboBox("idSDASHM3RecordDetailsValueRecordTypeTop", {
			items : {
				path : "/Estims",
				template : oItemTemplate
				  },

				  selectedKey : "{/modelData/0/value1}",
				  
				  selectionChange: function(evnt){
				if(this.getSelectedKey() != '')
				{
					//var selIndexValue = this.getSelectedItem().getId().split('clone')[1].split('-')[0] % oSDASHM3JsonProcessesEstimates.length;

					global3Processkey = this.getSelectedKey();
					var selIndexValue = oSDASHM3JsonProcessesCode.indexOf(global3Processkey);
					globalSelectedEstimate = oSDASHM3JsonProcessesEstimates[selIndexValue];

					oCurrent.changeSDASHM3Process();
				}
	    }
		});//.bindProperty("selectedKey", "modelData>/value1").addStyleClass("borderStyle1");

		// for(var i=0; i<oSDASHM3JsonProcesses.length;i++){
		// 	oSDASHM3RecordDetailsValueRecordTypeTop.addItem(new sap.ui.core.ListItem({
		// 			text : oSDASHM3JsonProcesses[i].text,
		// 			key: oSDASHM3JsonProcesses[i].key
		// 		}));
		// }
		// oSDASHM3RecordDetailsValueRecordTypeTop.setSelectedKey(oSDASHM3JsonProcesses[0].key);

		/*var oSDASHM3TableRecordType = new sap.ui.table.Table("idSDASHM3TableRecordType",{
	 		visibleRowCount: 5,
	 		columnHeaderVisible : false,
	 		//width: '60%',
	 		selectionMode : sap.ui.table.SelectionMode.None
		}).addStyleClass("sapUiSizeCompact tblBorder1");

		oSDASHM3TableRecordType.addColumn(new sap.ui.table.Column({
	        //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign: "Right"
			 }).bindProperty("text", "label1").addStyleClass("borderStyle1 boldText"),
	           resizable:false,
	           width:"40px"
			 }));

		oSDASHM3TableRecordType.addColumn(new sap.ui.table.Column({
			 template: oSDASHM3RecordDetailsValueRecordTypeTop,
	           resizable:false,
	           width:"100px"
		 	}));*/

		/* Return expected in this format */

		// Serial No.
		// Record Type
		// Current M&R Status
		// Last Action

		/*  Return expected in this format */

	/* SDASHM3 - Table - Record Details */

	var oSDASHM3TableRecordDetails = new sap.ui.table.Table("idSDASHM3TableRecordDetails",{
 		visibleRowCount: 5,
 		columnHeaderVisible : false,
 		width: '90%',
 		selectionMode : sap.ui.table.SelectionMode.None
	}).addStyleClass("sapUiSizeCompact tblBorder1");

	oSDASHM3TableRecordDetails.addColumn(new sap.ui.table.Column({
        //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
		 template: new sap.ui.commons.TextView({
			 textAlign: "Right"
		 }).bindProperty("text", "label1").addStyleClass("borderStyle1 boldText"),
		 width: '10%',
		 })).addStyleClass("wraptext");

	 oSDASHM3TableRecordDetails.addColumn(new sap.ui.table.Column({
 		 template: oSDASHM3RecordDetailsValueRecordTypeTop,
		 width: '18%'
 		}));

		oSDASHM3TableRecordDetails.addColumn(new sap.ui.table.Column({
	        //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign: "Right"
			 }).bindProperty("text", "label2").addStyleClass("borderStyle1 boldText"),
			 width: '10%'
			 })).addStyleClass("wraptext");

	 oSDASHM3TableRecordDetails.addColumn(new sap.ui.table.Column({
	        //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign: "Left"
			 }).bindProperty("text", "value2").addStyleClass("borderStyle1"),
			 width: '10%'
			 })).addStyleClass("wraptext");

			 oSDASHM3TableRecordDetails.addColumn(new sap.ui.table.Column({
						 //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
					template: new sap.ui.commons.TextView({
						textAlign: "Right"
					}).bindProperty("text", "label3").addStyleClass("borderStyle1 boldText"),
					width: '10%'
					})).addStyleClass("wraptext");

			oSDASHM3TableRecordDetails.addColumn(new sap.ui.table.Column({
						 //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
					template: new sap.ui.commons.TextView({
						textAlign: "Left"
					}).bindProperty("text", "value3").addStyleClass("borderStyle1"),
					width: '15%'
					})).addStyleClass("wraptext");

			oSDASHM3TableRecordDetails.addColumn(new sap.ui.table.Column({
						 //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
					template: new sap.ui.commons.TextView({
						textAlign: "Right"
					}).bindProperty("text", "label4").addStyleClass("borderStyle1 boldText"),
					width: '10%'
					})).addStyleClass("wraptext");

					oSDASHM3TableRecordDetails.addColumn(new sap.ui.table.Column({
						 width: '26%',
						 template: new sap.ui.layout.HorizontalLayout({
					   		    content : [
																new sap.m.Image("idSDASHM3RecordDetailsButtonLastAction",{
																	src: "images/f4_help.png",
																	visible: "{f4visible}",
																	press : function(oEvent){

																		var oSDASHM3LastActions = "";
																		oSDASHM3LastActions = jsonSDASHM3LastActions[0];
																		for(var i=1; i<jsonSDASHM3LastActions.length; i++){
																			oSDASHM3LastActions = oSDASHM3LastActions + "\n" + jsonSDASHM3LastActions[i];
																		}

																		var oSDASHM3RecordDetailsValueLastAction = new sap.m.TextArea({
																				value : oSDASHM3LastActions,//oSDASHM3JsonHeaderDetails.lastaction,
																				//height : "300px",
																				rows : 8,
																				width : "600px",
																				enabled : false
																			}).addStyleClass("lastActionPanel");

																		if(sap.ui.getCore().byId("idSDASHM3LastActionPopover") != undefined)
																			 sap.ui.getCore().byId("idSDASHM3LastActionPopover").destroy();

															 var oSDASHM3LastActionPopover = new sap.m.Popover("idSDASHM3LastActionPopover",{
																					title: "Last Actions",
																					//modal: true,
																					placement: sap.m.PlacementType.Left,
																					/*footer:  new sap.m.Bar({

																															 contentRight: [
																																						 new sap.m.Button({
																																															text: "Send",
																																															icon: "sap-icon://email",
																																															press: function () {
																																															 oCurrent.sendSDASHM2EquipmentLevelAlert();
																																															}
																																															}).addStyleClass("footerBtn"),
																																						 ],
																															 }),*/
																				content: new sap.m.VBox({
																										//width:"300px",
																										items:  [oSDASHM3RecordDetailsValueLastAction]
																										}),

																				}).addStyleClass("sapUiPopupWithPadding");

														 oSDASHM3LastActionPopover.openBy(oEvent.getSource());
																}
														}).addStyleClass("f4image marginTop5"),
														new sap.ui.commons.Label({text: "", width: "3px", visible: "{isNormal}"}),
					   		   		      new sap.ui.commons.TextView({
					   		   		        text: "{value4}",
					   		   		        textAlign: sap.ui.core.TextAlign.Left
					   		   		      }).addStyleClass("wraptext")


					   		   		    ]
						 	})
						 }));


		return oSDASHM3TableRecordDetails;

	},


	/* SDASHM3 - Content - Summary Lines */
	setContentMiscInfo : function(){

		/* SDASHM3 - Text Area - Notes 1 */

		var oSDASHM3TextAreaNotes1 = new sap.m.TextArea("idSDASHM3TextAreaNotes1",{
				placeholder : "Notes 1",
				height : "60px",
				width : "300px",
				enabled : false
			}).addStyleClass("commentsPanel");

		/* SDASHM3 - Text Area - Notes 2 */

		var oSDASHM3TextAreaNotes2 = new sap.m.TextArea("idSDASHM3TextAreaNotes2",{
				placeholder : "Notes 2",
				height : "60px",
				width : "300px",
				enabled : false
			}).addStyleClass("commentsPanel");

		/* SDASHM3 - Text Area - Notes 3 */

		var oSDASHM3TextAreaNotes3 = new sap.m.TextArea("idSDASHM3TextAreaNotes3",{
				placeholder : "Notes 3",
				height : "60px",
				width : "300px",
				enabled : false
			}).addStyleClass("commentsPanel");

		/* SDASHM3 - Text Area - Notes 4 */

		var oSDASHM3TextAreaNotes4 = new sap.m.TextArea("idSDASHM3TextAreaNotes4",{
				placeholder : "Notes 4",
				height : "60px",
				width : "300px",
				enabled : false
			}).addStyleClass("commentsPanel");

		/* SDASHM3 - Text Area - Notes 5 */

		var oSDASHM3TextAreaNotes5 = new sap.m.TextArea("idSDASHM3TextAreaNotes5",{
				placeholder : "Notes 5",
				height : "60px",
				width : "300px",
				enabled : false
			}).addStyleClass("commentsPanel");

		/* SDASHM3 - FlexBox - Notes Line 1 */

		var oSDASHM3FlexNotesLine1 = new sap.m.FlexBox("idSDASHM3FlexNotesLine1",{
		    items: [
		            oSDASHM3TextAreaNotes1,
		            new sap.m.Label({width:"15px"}),
		            oSDASHM3TextAreaNotes2
		            ],
		    direction: "Row"
		    });

		/* SDASHM3 - FlexBox - Notes Line 2 */

		var oSDASHM3FlexNotesLine2 = new sap.m.FlexBox("idSDASHM3FlexNotesLine2",{
		    items: [
		            oSDASHM3TextAreaNotes3,
		            new sap.m.Label({width:"15px"}),
		            oSDASHM3TextAreaNotes4
		            ],
		    direction: "Row"
		    });

		/* SDASHM3 - FlexBox - Notes Line 3 */

		var oSDASHM3FlexNotesLine3 = new sap.m.FlexBox("idSDASHM3FlexNotesLine3",{
		    items: [
		            oSDASHM3TextAreaNotes5
		            ],
		    direction: "Row"
		    });

		/* SDASHM3 - FlexBox - Notes */

		var oSDASHM3FlexNotes = new sap.m.FlexBox("idSDASHM3FlexNotes",{
		    items: [
		            oSDASHM3FlexNotesLine1,
		            oSDASHM3FlexNotesLine2,
		            oSDASHM3FlexNotesLine3
		            ],
		    direction: "Column"
		    });


		/* SDASHM3 - Table - Misc Info */

		var oSDASHM3TableMiscInfo = new sap.ui.table.Table("idSDASHM3TableMiscInfo",{
     		 visibleRowCount: 3,
         selectionMode: sap.ui.table.SelectionMode.None,
				 columnHeaderVisible: false,
		}).addStyleClass("sapUiSizeCompact tblBorder1");

		oSDASHM3TableMiscInfo.addColumn(new sap.ui.table.Column({
			 template: new sap.ui.commons.TextView({
				 textAlign: "Right"
			 }).bindProperty("text", "label1").addStyleClass("borderStyle1 boldText"),
	           resizable:false,
	           width:"200px"
			 }));

		oSDASHM3TableMiscInfo.addColumn(new sap.ui.table.Column({
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "value1").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"300px"
			 }));

			 oSDASHM3TableMiscInfo.addColumn(new sap.ui.table.Column({
					template: new sap.ui.commons.TextView({
						textAlign: "Right"
					}).bindProperty("text", "label2").addStyleClass("borderStyle1 boldText"),
								resizable:false,
								width:"200px"
					}));

			 oSDASHM3TableMiscInfo.addColumn(new sap.ui.table.Column({
					template: new sap.ui.commons.TextView({
					}).bindProperty("text", "value2").addStyleClass("borderStyle1"),
								resizable:false,
								width:"300px"
					}));

				oSDASHM3TableMiscInfo.addColumn(new sap.ui.table.Column({
					 template: new sap.ui.commons.TextView({
						 textAlign: "Right"
					 }).bindProperty("text", "label3").addStyleClass("borderStyle1 boldText"),
								 resizable:false,
								 width:"200px"
					 }));

				oSDASHM3TableMiscInfo.addColumn(new sap.ui.table.Column({
					 label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
					 template: new sap.ui.commons.TextView({
					 }).bindProperty("text", "value3").addStyleClass("borderStyle1"),
								 resizable:false,
								 width:"300px"
					 }));

		/* SDASHM3 - Layout - Summary Lines */

		var oSDASHM3LayoutMiscInfo = new sap.ui.layout.form.ResponsiveGridLayout("idSDASHM3LayoutMiscInfo",{
										    	labelSpanL: 1,
										        labelSpanM: 1,
										        labelSpanS: 1,
										        emptySpanL: 0,
										        emptySpanM: 0,
										        emptySpanS: 0,
										        columnsL: 4,
										        columnsM: 3,
										        columnsS: 2,
										        breakpointL: 765,
										        breakpointM: 320
										    });

		/* SDASHM3 - Form - Summary Lines */

		var oSDASHM3FormMiscInfo = new sap.ui.layout.form.Form("idSDASHM3FormMiscInfo",{
            layout: oSDASHM3LayoutMiscInfo,
            formContainers: [
                    new sap.ui.layout.form.FormContainer("idSDASHM3FormMiscInfoC1",{
                        //title: "Summary",
                        formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [ new sap.ui.commons.Label({
																text : "",
																width : "100px"
															}),
											             ]
											})
                                    ]
                    }),

                    new sap.ui.layout.form.FormContainer("idSDASHM3FormMiscInfoC2",{
                        //title: "Summary",
                        formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [ new sap.ui.commons.Label({
																text : "",
																width : "100px"
															}),
											             ]
											})
                                    ]
                    }),

                    new sap.ui.layout.form.FormContainer("idSDASHM3FormMiscInfoC3",{
                        //title: "Summary",
                        formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [ new sap.ui.commons.Label({
																text : "",
																width : "100px"
															}),
											             ]
											})
                                    ]
                    }),

                    new sap.ui.layout.form.FormContainer("idSDASHM3FormMiscInfoC4",{
                        title: "Summary",
	                    formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [oSDASHM3TableMiscInfo]
											})
	                                ]
                    }),

            ]
		});

		/* SDASHM3 - Section - M&R Comment */

		/* M&R Comment */
		var oSDASHM3InputMNRComment = new sap.m.TextArea("idSDASHM3InputMNRComment",{
						rows : 1,
		        value : oSDASHM3JsonHeaderLinesOthers.MnrComment,
						editable : false,
		        width : "300px",
		        liveChange : function(){
		        }
		});

		var oSDASHM3LabelMNRComment = new sap.m.Label({
		      text : "M&R Comment",
		      width : "130px"
		    }).addStyleClass("selectionLabels");

		var oSDASHM3FlexMNRComment = new sap.m.FlexBox({
		             items: [oSDASHM3LabelMNRComment,
		                     oSDASHM3InputMNRComment
		                     ],
		             width: "480px",
		             direction: "Row"
		});

		/* Clear M&R Comment */

		var oSDASHM3ComboClear = new sap.m.ComboBox("idSDASHM3ComboClear", {
		  width : "120px",
			enabled : false
		});

		oSDASHM3ComboClear.addItem(new sap.ui.core.ListItem({
		                text:"Yes",
		                key: "Y"
		                }));

		oSDASHM3ComboClear.addItem(new sap.ui.core.ListItem({
		                text:"No",
		                key: "N"
		  }));

		if(oSDASHM3JsonHeaderLinesOthers.ClearMnrComment != ""){
		    oSDASHM3ComboClear.setSelectedKey(oSDASHM3JsonHeaderLinesOthers.ClearMnrComment);
		}else{
		    oSDASHM3ComboClear.setSelectedKey("");
		}

		var oSDASHM3LabelClear = new sap.m.Label("idSDASHM3LabelClear",{
		  text : "Remove Cmts at Pick",
			enabled : false,
		  width : "180px"
		}).addStyleClass("selectionLabels");

		var oSDASHM3FlexClear = new sap.m.FlexBox("idSDASHM3FlexClear",{
		             items: [oSDASHM3LabelClear,
		                     oSDASHM3ComboClear
		                     ],
		             width: "335px",
		             direction: "Row"
		});

		/* Clear M&R Comment */
		var oSDASHM3ComboDisplay = new sap.m.ComboBox("idSDASHM3ComboDisplay", {
		  width : "120px",
			enabled : false
		});

		oSDASHM3ComboDisplay.addItem(new sap.ui.core.ListItem({
		                text:"Yes",
		                key: "Y"
		                }));

		oSDASHM3ComboDisplay.addItem(new sap.ui.core.ListItem({
		                text:"No",
		                key: "N"
		  }));

		  if(oSDASHM3JsonHeaderLinesOthers.DisplayInRa != ""){
		      oSDASHM3ComboDisplay.setSelectedKey(oSDASHM3JsonHeaderLinesOthers.DisplayInRa);
		  }else{
		      oSDASHM3ComboDisplay.setSelectedKey("");
		  }


		var oSDASHM3LabelDisplay = new sap.m.Label("idSDASHM3LabelDisplay",{
		  text : "Display in RA?",
		  width : "180px"
		}).addStyleClass("selectionLabels");


		var oSDASHM3FlexDisplay = new sap.m.FlexBox("idSDASHM3FlexDisplay",{
		             items: [oSDASHM3LabelDisplay,
		                     oSDASHM3ComboDisplay
		                     ],
		             width: "335px",
		             direction: "Row"
		});

		var oSDASHM3FlexMNRSection = new sap.m.FlexBox("idSDASHM3FlexMNRSection",{
				items: [
								oSDASHM3FlexMNRComment,
								oSDASHM3FlexClear,
								oSDASHM3FlexDisplay
								],
				direction: "Row"
				});

		/* SDASHM3 - Flex - M&R Comment */

		var oSDASHM3FlexMNRComment = new sap.m.FlexBox("idSDASHM3FlexMNRComment",{
				items: [
								oSDASHM3FlexMNRSection,
								oSDASHM3FlexNotes
								],
				direction: "Row"
				});

		/* SDASHM3 - Content - Misc. Info */

		var oSDASHM3FlexMiscInfo = new sap.m.FlexBox("idSDASHM3FlexMiscInfo",{
				items: [
								oSDASHM3FlexMNRComment,
								oSDASHM3FlexNotes
								],
				direction: "Column"
				});

		/* SDASHM3 - Panel - Misc. Info */

		var oSDASHM3PanelMiscInfo = new sap.m.Panel("idSDASHM3PanelMiscInfo",{
			busy : false, // boolean
			busyIndicatorDelay : 1000, // int
			visible : true, // boolean
			headerText : "Misc Information", // string
			width : "100%",
			height : "auto", // sap.ui.core.CSSSize
			expandable : true, // boolean, since 1.22
			expanded : false, // boolean, since 1.22
			expandAnimation : true, // boolean, since 1.26
			//tooltip : "Filters", // sap.ui.core.TooltipBase
			content : [oSDASHM3TableMiscInfo], // sap.ui.core.Control	oSDASHM3FormMiscInfo
		});

		return oSDASHM3PanelMiscInfo;
	},

	/* SDASHM3 - Value - Summary Lines */
	setValueMiscInfo : function(){

	},

	/* SDASHM3 - Content - Estimate Lines */
	setContentEstimateLines : function(){

		/* SDASHM3 - Table - Estimate Lines */

		var oSDASHM3TableEstimateLinesUI = new sap.ui.table.Table("idSDASHM3TableEstimateLinesUI",{
             selectionMode: sap.ui.table.SelectionMode.None,
             toolbar: new sap.ui.commons.Toolbar({
 				items: [

					new sap.ui.commons.Button({
						text: "Reset",
						//icon: "sap-icon://reset",
						press: function(oEvent) {
							oPersoService3.delPersData();
							globalSDASHM3TableEstimateLinesUITPC.refresh().done(function() {
								// sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").setEnableGrouping(false);
								// sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").setEnableGrouping(true);
								//sap.ui.commons.MessageBox.alert("Reset done!", "INFORMATION", "Refresh");
							});

							/* Clear filters and sorting */

							var oSDASHM3TableEstimateLinesUI = sap.ui.getCore().byId("idSDASHM3TableEstimateLinesUI");
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
						text: "Layout",
						//icon: "sap-icon://reset",
						press: function(oEvent) {
							globalSDASHM3TableEstimateLinesUITPC.openDialog();
						}
					}),
					new sap.ui.commons.Button({
						text: "Save",
						icon: "sap-icon://save",
						press: function(oEvent) {
							globalSDASHM3TableEstimateLinesUITPC.savePersonalizations().done(function() {
								sap.ui.commons.MessageBox.alert("Layout saved!", "INFORMATION", "Save");
							});
						}
					}),

 					new sap.ui.commons.Button({
			                  text: "Toggle ISO Description",
	     		   			  press : function(){

	     		   				if(globalIsLineCodeDesc == "CODE"){
	     		   				globalIsLineCodeDesc = "DESC";
	     		   				for(var i=0; i<oSDASHM3JsonEstimateLines.length; i++){
	     		   				   oSDASHM3JsonEstimateLines[i].locationdisp = oSDASHM3JsonEstimateLines[i].locationt;
	     		   				   oSDASHM3JsonEstimateLines[i].componentdisp = oSDASHM3JsonEstimateLines[i].componentt;
	     		   				 	 oSDASHM3JsonEstimateLines[i].damagedisp = oSDASHM3JsonEstimateLines[i].damaget;
	     		   					 oSDASHM3JsonEstimateLines[i].materialdisp = oSDASHM3JsonEstimateLines[i].materialt;
	     		   					 oSDASHM3JsonEstimateLines[i].repairdisp = oSDASHM3JsonEstimateLines[i].repairt;
	     		   				}
	     		   				}else if(globalIsLineCodeDesc == "DESC"){
	     		   				globalIsLineCodeDesc = "CODE";
		     		   				for(var i=0; i<oSDASHM3JsonEstimateLines.length; i++){
		     		   				     oSDASHM3JsonEstimateLines[i].locationdisp = oSDASHM3JsonEstimateLines[i].location;
		     		   				     oSDASHM3JsonEstimateLines[i].componentdisp = oSDASHM3JsonEstimateLines[i].component;
		     		   				 	 oSDASHM3JsonEstimateLines[i].damagedisp = oSDASHM3JsonEstimateLines[i].damage;
		     		   					 oSDASHM3JsonEstimateLines[i].materialdisp = oSDASHM3JsonEstimateLines[i].material;
		     		   					 oSDASHM3JsonEstimateLines[i].repairdisp = oSDASHM3JsonEstimateLines[i].repair;
		     		   				}
		     		   			}
	     		   				sap.ui.getCore().byId("idSDASHM3TableEstimateLinesUI").getModel().updateBindings();
	     		   			  }
							  })
 				]
 			}),
//			 footer: new sap.ui.commons.Label({
//		         text:"123"
//		       }),
//            visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
}).addStyleClass("sapUiSizeCompact tblBorder1");

		oSDASHM3TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Line", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "sno").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"50px",
	           //sortProperty: "sno",
	           filterProperty : "sno",
			 }));

		oSDASHM3TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
         label: new sap.ui.commons.Label({text: "Component", textAlign: "Left"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView("CMP",{
				 }).bindProperty("text", "componentdisp"
				 // 	, function(cellValue){
					//  if(this.getParent().getBindingContext() != undefined){
					//  var componentc = this.getParent().getBindingContext().getProperty("componentc");
					//  if(componentc == "X"){
					// 	 this.addStyleClass("jsChange");
					//  }else{
					// 	 this.removeStyleClass("jsChange");
					//  }
				 // 	 }
					//  return cellValue;
				 // }
			 	).addStyleClass("borderStyle1 wraptext"),
	           resizable:false,
	           width:"200px",
	           //sortProperty: "componentdisp",
	           filterProperty : "componentdisp",
			 }));

		oSDASHM3TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Damage", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("DMG",{
			 }).bindProperty("text", "damagedisp"
			 // 		, function(cellValue){
				//  if(this.getParent().getBindingContext() != undefined){
				//  var damagec = this.getParent().getBindingContext().getProperty("damagec");
				//  if(damagec == "X"){
				// 	 this.addStyleClass("jsChange");
				//  }else{
				// 	 this.removeStyleClass("jsChange");
				//  }
			 // 	 }
				//  return cellValue;
			 // }
		 	).addStyleClass("borderStyle1 wraptext"),
	           resizable:false,
	           width:"150px",
	           //sortProperty: "damagedisp",
	           filterProperty : "damagedisp",
			 }));

		oSDASHM3TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Repair", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("REP",{
			 }).bindProperty("text", "repairdisp"
			 // 	, function(cellValue){
				//  if(this.getParent().getBindingContext() != undefined){
				//  var repairc = this.getParent().getBindingContext().getProperty("repairc");
				//  if(repairc == "X"){
				// 	 this.addStyleClass("jsChange");
				//  }else{
				// 	 this.removeStyleClass("jsChange");
				//  }
			 // 	 }
				//  return cellValue;
			 // }
		 	).addStyleClass("borderStyle1 wraptext"),
	           resizable:false,
	           width:"150px",
	           //sortProperty: "repairdisp",
	           filterProperty : "repairdisp",
			 }));

		oSDASHM3TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Location", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("LOC",{
			 }).bindProperty("text", "locationdisp"
			 // , function(cellValue){
				//  if(this.getParent().getBindingContext() != undefined){
				//  var locationc = this.getParent().getBindingContext().getProperty("locationc");
				//  if(locationc == "X"){
				// 	 this.addStyleClass("jsChange");
				//  }else{
				// 	 this.removeStyleClass("jsChange");
				//  }
			 // 	 }
				//  return cellValue;
			 // }
		 ).addStyleClass("borderStyle1 wraptext"),
	           resizable:false,
	           width:"auto",
	           //sortProperty: "locationdisp",
	           filterProperty : "locationdisp",
			 }));


		oSDASHM3TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Material", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("MATR",{
			 }).bindProperty("text", "materialdisp"
			 // , function(cellValue){
				//  if(this.getParent().getBindingContext() != undefined){
				//  var materialc = this.getParent().getBindingContext().getProperty("materialc");
				//  if(materialc == "X"){
				// 	 this.addStyleClass("jsChange");
				//  }else{
				// 	 this.removeStyleClass("jsChange");
				//  }
			 // 	 }
				//  return cellValue;
			 // }
		 ).addStyleClass("borderStyle1 wraptext"),
	           resizable:false,
	           width:"120px",
	           //sortProperty: "materialdisp",
	           filterProperty : "materialdisp",
			 }));

		oSDASHM3TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Length"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("LEN",{
				 textAlign: "Right"
			 }).bindProperty("text", "length"
			 // , function(cellValue){
				//  if(this.getParent().getBindingContext() != undefined){
				//  var materialc = this.getParent().getBindingContext().getProperty("lengthc");
				//  if(materialc == "X"){
				// 	 this.addStyleClass("jsChange");
				//  }else{
				// 	 this.removeStyleClass("jsChange");
				//  }
			 // 	 }
				//  return cellValue;
			 // }
		 ).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"70px",
	           //sortProperty: "length",
	           filterProperty : "length",
			 }));

		oSDASHM3TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Width"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("WID",{
				 textAlign: "Right"
			 }).bindProperty("text", "width"
			 // , function(cellValue){
				//  if(this.getParent().getBindingContext() != undefined){
				//  var materialc = this.getParent().getBindingContext().getProperty("widthc");
				//  if(materialc == "X"){
				// 	 this.addStyleClass("jsChange");
				//  }else{
				// 	 this.removeStyleClass("jsChange");
				//  }
			 // 	 }
				//  return cellValue;
			 // }
		 ).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"70px",
	           //sortProperty: "width",
	           filterProperty : "width",
			 }));

		oSDASHM3TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Qty"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("QTY",{
				 textAlign: "Right"
			 }).bindProperty("text", "qty"
			 // , function(cellValue){
			 //
				//  if(this.getParent().getBindingContext() != undefined){
				//  var qtyc = this.getParent().getBindingContext().getProperty("qtyc");
				//  if(qtyc == "X"){
				// 	 this.addStyleClass("jsChange");
				//  }else{
				// 	 this.removeStyleClass("jsChange");
				//  }
			 // 	 }
				//  return cellValue;
			 // }
		 ).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"50px",
	           //width:"75px",
	           //sortProperty: "qty",
	           filterProperty : "qty",
			 }));

		oSDASHM3TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Hrs"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("HRS",{
				 textAlign: "Right"
			 }).bindProperty("text", "hrs"
			 	, function(cellValue) {

				 if(this.getParent().getBindingContext() != undefined){
				 // var hrsc = this.getParent().getBindingContext().getProperty("hrsc");
				 // if(hrsc == "X"){
					//  this.addStyleClass("jsChange");
				 // }else{
					//  this.removeStyleClass("jsChange");
				 // }

				 var component = this.getParent().getBindingContext().getProperty("component");
				 if (component == "") {
             this.addStyleClass('boldText');
         } else{
        	 this.removeStyleClass('boldText');
         }
				 }
         return cellValue;
  		     }
				 ).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"50px",
	           //width:"75px",
	           //sortProperty: "hrs",
	           filterProperty : "hrs",
			 }));

		oSDASHM3TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Lab Cost", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("LABC",{
				 textAlign: "Right"
			 }).bindProperty("text", "labcost"
			 		, function(cellValue) {

				 if(this.getParent().getBindingContext() != undefined){
				 // var labcostc = this.getParent().getBindingContext().getProperty("labcostc");
				 // if(labcostc == "X"){
					//  this.addStyleClass("jsChange");
				 // }else{
					//  this.removeStyleClass("jsChange");
				 // }

				 var component = this.getParent().getBindingContext().getProperty("component");
				 if (component == ""){
             this.addStyleClass('boldText');
         } else{
        	 this.removeStyleClass('boldText');
         }
				 }
  		         return cellValue;
  		     }
				 ).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"110px",
	           //sortProperty: "labcost",
	           filterProperty : "labcost",
			 }));

		oSDASHM3TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
         label: new sap.ui.commons.Label({text: "Mat Cost"}).addStyleClass("wraptextcol"),
			 	 template: new sap.ui.commons.TextView("MATC",{
				 textAlign: "Right"
			 }).bindProperty("text", "matcost"
			 	,function(cellValue) {

				 if(this.getParent().getBindingContext() != undefined){
				 // var matcostc = this.getParent().getBindingContext().getProperty("matcostc");
				 // if(matcostc == "X"){
					//  this.addStyleClass("jsChange");
				 // }else{
					//  this.removeStyleClass("jsChange");
				 // }

				 var component = this.getParent().getBindingContext().getProperty("component");
				 if (component == ""){
             this.addStyleClass('boldText');
         } else{
        	 this.removeStyleClass('boldText');
         }
				}
  		         return cellValue;
  		     }
				 ).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"110px",
	           //sortProperty: "matcost",
	           filterProperty : "matcost",
			 }));

		oSDASHM3TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Total"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("TOT",{
				 textAlign: "Right"
			 }).bindProperty("text", "total"
			 		, function(cellValue) {

				 if(this.getParent().getBindingContext() != undefined){
				 // var totalc = this.getParent().getBindingContext().getProperty("totalc");
				 // if(totalc == "X"){
					//  this.addStyleClass("jsChange");
				 // }else{
					//  this.removeStyleClass("jsChange");
				 // }

				 var component = this.getParent().getBindingContext().getProperty("component");
				 if (component == ""){
             this.addStyleClass('boldText');
         } else{
        	 this.removeStyleClass('boldText');
         }
						 }
  		         return cellValue;
  		     }
				 ).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"110px",
	           //sortProperty: "total",
	           filterProperty : "total",
			 }));

		oSDASHM3TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Resp", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("RES",{
			 }).bindProperty("text", "resp"
			 // 	, function(cellValue){
				//  if(this.getParent().getBindingContext() != undefined){
				//  var respc = this.getParent().getBindingContext().getProperty("respc");
				//  if(respc == "X"){
				// 	 this.addStyleClass("jsChange");
				//  }else{
				// 	 this.removeStyleClass("jsChange");
				//  }
			 // 	 }
				//  return cellValue;
			 // }
		 ).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"60px",
	           //sortProperty: "resp",
	           filterProperty : "resp",
			 }));


			 		var printPersoData = function(sJSON) {
			 			//jQuery("#perso-data").html(sJSON
			     	//console.log(sJSON);
			 			/*	.replace(/\n/g, "<br>")
			 				.replace(/\s/g, "&nbsp;")
			 				.replace(/(true)/g, "<span style=\"color:green\">$1</span>")
			 				.replace(/(false)/g, "<span style=\"color:red\">$1</span>"));*/
			 		};

			 		var oPersoService3 = {

			 			getPersData: function() {
			 				var oDeferred = jQuery.Deferred();
			 				var sJSON = window.localStorage.getItem("oSDASHM3TableEstimateLinesUITPC") || "{}";
			 				printPersoData(sJSON);
			 				var oBundle = JSON.parse(sJSON);
			 				oDeferred.resolve(oBundle);
			 				return oDeferred.promise();
			 			},

			 			setPersData: function(oBundle) {

			 				var oDeferred = jQuery.Deferred();
			 				var sJSON = JSON.stringify(oBundle, null, 4);
			 				window.localStorage.setItem("oSDASHM3TableEstimateLinesUITPC", sJSON);
			 				printPersoData(sJSON);
			 				oDeferred.resolve();
			 				return oDeferred.promise();
			 			},

			 			delPersData: function() {
			 				var oDeferred = jQuery.Deferred();
			 				window.localStorage.removeItem("oSDASHM3TableEstimateLinesUITPC");
			 				printPersoData("");
			 				oDeferred.resolve();
			 				return oDeferred.promise();
			 			}

			 		};

			 		jQuery.sap.require("sap.ui.table.TablePersoController");
			 		var oSDASHM3TableEstimateLinesUITPC = new sap.ui.table.TablePersoController("idSDASHM3TableEstimateLinesUITPC", {
			 			table: oSDASHM3TableEstimateLinesUI,
			 			persoService: oPersoService3,
			 			hasGrouping: false
			 		});
			 		globalSDASHM3TableEstimateLinesUITPC = oSDASHM3TableEstimateLinesUITPC;

		var oSDASHM3TableEstimateLines = new sap.m.Table("idSDASHM3TableEstimateLines", {
					 fixedLayout: false,
					 growing : false,
					 inset : false,
					 noDataText : "No Estimate Lines",
					 //headerText : "Draft Collections",
					 //headerToolbar : oOffCJOToolbarCollectionList,
					 columns: [

						   new sap.m.Column({
						                    //width: "50%",
						                    header: new sap.m.Text({
						                                           text: "Line",
						                                           })
						                    }),

						   new sap.m.Column({
						                    //width : "50%",
						                    header: new sap.m.Text({
						                                           text: "Component"
						                                           })
						                    }),

						   new sap.m.Column({
						                    //width: "50%",
						                    header: new sap.m.Text({
						                                           text: "Damage",
						                                           })
						                    }),

						   new sap.m.Column({
						                    //width : "50%",
						                    header: new sap.m.Text({
						                                           text: "Repair"
						                                           })
						                    }),

						   new sap.m.Column({
						                    //width: "50%",
						                    header: new sap.m.Text({
						                                           text: "Location",
						                                           })
						                    }),

						   /*new sap.m.Column({
						                    //width: "50%",
						                    header: new sap.m.Text({
						                                           text: "Locn ISO",
						                                           })
						                    }),*/

						   new sap.m.Column({
						                    //width : "50%",
						                    header: new sap.m.Text({
						                                           text: "Material"
						                                           })
						                    }),

						   new sap.m.Column({
						                    //width: "50%",
						                    header: new sap.m.Text({
						                                           text: "Length",
						                                                   })
						                            }),

                            new sap.m.Column({
			                    //width: "50%",
			                    header: new sap.m.Text({
			                                           text: "Width",
			                                                   })
			                            }),

                            new sap.m.Column({
			                    //width: "50%",
			                    header: new sap.m.Text({
			                                           text: "Qty",
			                                                   })
			                            }),

                            new sap.m.Column({
			                    //width: "50%",
			                    header: new sap.m.Text({
			                                           text: "Hrs",
			                                                   })
			                            }),

                            new sap.m.Column({
			                    //width: "50%",
			                    header: new sap.m.Text({
			                                           text: "Lab Cost",
			                                                   }),
                               footer : new sap.m.Text({
                            	   					text : "108"
                               					})
			                            }),

                            new sap.m.Column({
			                    //width: "50%",
			                    header: new sap.m.Text({
			                                           text: "Mat Cost",
			                                                   }),
                               footer : new sap.m.Text({
           	   						text : "328.66"
              					})
			                            }),

                            new sap.m.Column({
			                    //width: "50%",
			                    header: new sap.m.Text({
			                                           text: "Total",
			                                                   }),
                               footer : new sap.m.Text({
          	   						text : "436.66"
             					})
			                            }),

                            new sap.m.Column({
			                    //width: "50%",
			                    header: new sap.m.Text({
			                                           text: "Resp",
			                                                   })
			                            }),

						           ],

						 items : {
						 path: "oSDASHM3ModelEstimateLines>/",
						 template: new sap.m.ColumnListItem({
                                    selected: false,
                                    //type: "Active",
                            cells: [

                                    new sap.m.Text({
                                                   text : "{oSDASHM3ModelEstimateLines>sno}"
                                                   }),

                                    new sap.m.Text({
                                                   text : "{oSDASHM3ModelEstimateLines>componentdisp}"
                                                   }),

                                    new sap.m.Text({
                                                   text : "{oSDASHM3ModelEstimateLines>damagedisp}"
                                                   }),

                                    new sap.m.Text({
                                                   text : "{oSDASHM3ModelEstimateLines>repairdisp}"
                                                   }),

                                    new sap.m.Text({
                                                   text : "{oSDASHM3ModelEstimateLines>locationdisp}"
                                                   }),

                                    /*new sap.m.Text({
                                                   text : "{oSDASHM3ModelEstimateLines>locationiso}"
                                                   }),*/

                                    new sap.m.Text({
                                                   text : "{oSDASHM3ModelEstimateLines>materialdisp}"
                                                   }),

                                   new sap.m.Text({
                                                   text : "{oSDASHM3ModelEstimateLines>length}"
                                                   }),

                                    new sap.m.Text({
                                                   text : "{oSDASHM3ModelEstimateLines>width}"
                                                   }),

                                    new sap.m.Text({
                                                   text : "{oSDASHM3ModelEstimateLines>qty}"
                                                   }),

                                    new sap.m.Text({
			                                       text : "{oSDASHM3ModelEstimateLines>hrs}"
			                                       }),

                                    new sap.m.Text({
                                                       text : "{oSDASHM3ModelEstimateLines>labcost}"
                                                       }),

                                    new sap.m.Text({
                                                       text : "{oSDASHM3ModelEstimateLines>matcost}"
                                                       }),

                                    new sap.m.Text({
                                                       text : "{oSDASHM3ModelEstimateLines>total}"
                                                       }),

                                    new sap.m.Text({
                                                       text : "{oSDASHM3ModelEstimateLines>resp}"
                                                       }),


                                    ]})}}).addStyleClass('sapUiSizeCompact margintop70p');

		/* SDASHM3 - Panel - Estimate Lines */

		var oSDASHM3PanelEstimateLines = new sap.m.Panel("idSDASHM3PanelEstimateLines",{
			busy : false, // boolean
			busyIndicatorDelay : 1000, // int
			visible : true, // boolean
			headerText : "Estimate Details",
			width : "100%",
			height : "auto", // sap.ui.core.CSSSize
			expandable : true, // boolean, since 1.22
			expanded : false, // boolean, since 1.22
			expandAnimation : true, // boolean, since 1.26
			//tooltip : "Filters", // sap.ui.core.TooltipBase
			content : [oSDASHM3TableEstimateLinesUI], // sap.ui.core.Control
		});



		return oSDASHM3PanelEstimateLines;

	},

	/* SDASHM3 - Value - Estimate Lines */
	setValueEstimateLines : function(isFromSerialHistory, isProcessChange){
		var oCurrent = this;
		var local3EstimateNo = global3EstimateNo;
		var local3DocType = global3DocType;
		var local3DocText = global3DocText;
		var local3DocCat = global3DocCat;
		var local3DocDate = global3DocDate;

		if(!isFromSerialHistory){
			local3EstimateNo = "";
			//local3DocType = "";
			//local3DocText = "";
			//local3DocCat = "";
			local3DocDate = "";
		}

		console.log("Get Item : Page 3");
		if(isProcessChange == false){
			var urlToSap = "item3Set?$filter=IvSerial eq '" + global3SerialNo +
											 "' and IvEstimate eq '" + local3EstimateNo +
											 "' and IvDepot eq '" + global3Depot +
											 "' and IvDocType eq '" + local3DocType +
											 "' and IvDocText eq '" + local3DocText +
											 "' and IvDocCat eq '" + local3DocCat +
											 "' and IvDocDate eq '" + local3DocDate +
											 "' and IvLines eq '" + "" +	// replacing global3EstimateNo with ""
											 "'";
		}else{
			 var processkey = sap.ui.getCore().byId("idSDASHM3RecordDetailsValueRecordTypeTop").getSelectedKey();
			 var encodedGateInDate = encodeURIComponent(globalGateInDate);
			 var urlToSap = "item3pcSet?$filter=IvSerial eq '" + global3SerialNo +
												"' and IvDocCat eq '" + global3Processkey +
												"' and IvDepot eq '" + global3Depot +
												"' and IvGateinDate eq '" + encodedGateInDate +
												"' and IvLines eq '" + "" +	// replacing global3EstimateNo with ""
												"'";
		}


    	urlToSap = serviceDEP + urlToSap;
    	oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	        console.log(urlToSap);
	        OData.request({
	                      requestUri: urlToSap,
	                      method: "GET",
	                      dataType: 'json',
	                      async: false,
	                      headers:
	                      {
	                      "X-Requested-With": "XMLHttpRequest",
	                      "Content-Type": "application/json; charset=utf-8",
	                      "DataServiceVersion": "2.0",
	                      "X-CSRF-Token":"Fetch"
	                      }
	                      },
	                      function (data, response){
	                    	 console.log("Get Item : Page 3 Success");

	                    	 var oSDASHM3JsonEstimateLinesLoc = data.results;
	                    	 oSDASHM3JsonEstimateLines = [];
												 var hrslocal = "";
												 var labcostlocal = "";
												 var matcostlocal = "";
												 var totallocal = "";
	                    	 for(var i=0; i<oSDASHM3JsonEstimateLinesLoc.length; i++){

								if(oSDASHM3JsonEstimateLinesLoc[i].RepairLength == "")
							 	oSDASHM3JsonEstimateLinesLoc[i].RepairLength = "0.00";

								if(oSDASHM3JsonEstimateLinesLoc[i].RepairWidth == "")
							 	oSDASHM3JsonEstimateLinesLoc[i].RepairWidth = "0.00";

								// if(oSDASHM3JsonEstimateLinesLoc[i].MaterialCost == "")
							 	// oSDASHM3JsonEstimateLinesLoc[i].MaterialCost = "0.00";
								//
								// if(oSDASHM3JsonEstimateLinesLoc[i].LabourCost == "")
							 	// oSDASHM3JsonEstimateLinesLoc[i].LabourCost = "0.00";
								//
								// if(oSDASHM3JsonEstimateLinesLoc[i].TotalCost == "")
							 	// oSDASHM3JsonEstimateLinesLoc[i].TotalCost = "0.00";

								/* Hours */

								if(oSDASHM3JsonEstimateLinesLoc[i].ManHours == "Total"){
										hrslocal = oSDASHM3JsonEstimateLinesLoc[i].ManHours;
								}else{
										hrslocal = oSDASHM3JsonEstimateLinesLoc[i].ManHours;
								}

								/* Lab Cost */

								if(oSDASHM3JsonEstimateLinesLoc[i].ManHours == "Total"){
										labcostlocal = thousandsep(oSDASHM3JsonEstimateLinesLoc[i].LabourCost);
								}else if(oSDASHM3JsonEstimateLinesLoc[i].LineItem != ""){
										labcostlocal = thousandsep(oSDASHM3JsonEstimateLinesLoc[i].LabourCost);
								}else{
										labcostlocal = oSDASHM3JsonEstimateLinesLoc[i].LabourCost;
								}

								/* Mat Cost */

								if(oSDASHM3JsonEstimateLinesLoc[i].ManHours == "Total"){
										matcostlocal = thousandsep(oSDASHM3JsonEstimateLinesLoc[i].MaterialCost);
								}else if(oSDASHM3JsonEstimateLinesLoc[i].LabourCost == "Seacover"
													|| oSDASHM3JsonEstimateLinesLoc[i].LabourCost == "Lessee"
														|| oSDASHM3JsonEstimateLinesLoc[i].LabourCost == "Owner"){
										matcostlocal = thousandsep(oSDASHM3JsonEstimateLinesLoc[i].MaterialCost);
								}else if(oSDASHM3JsonEstimateLinesLoc[i].LineItem == ""){
										matcostlocal = oSDASHM3JsonEstimateLinesLoc[i].MaterialCost;
								}else{
										matcostlocal = thousandsep(oSDASHM3JsonEstimateLinesLoc[i].MaterialCost);
								}

								/* Total */

								if(oSDASHM3JsonEstimateLinesLoc[i].ManHours == "Total"){
										totallocal = thousandsep(oSDASHM3JsonEstimateLinesLoc[i].TotalCost);
								}else if(oSDASHM3JsonEstimateLinesLoc[i].LabourCost == "Seacover"
													|| oSDASHM3JsonEstimateLinesLoc[i].LabourCost == "Lessee"
														|| oSDASHM3JsonEstimateLinesLoc[i].LabourCost == "Owner"){
										totallocal = thousandsep(oSDASHM3JsonEstimateLinesLoc[i].TotalCost);
								}else if(oSDASHM3JsonEstimateLinesLoc[i].LineItem == ""){
										totallocal = oSDASHM3JsonEstimateLinesLoc[i].TotalCost;
								}else{
										totallocal = thousandsep(oSDASHM3JsonEstimateLinesLoc[i].TotalCost);
								}
	                    		 oSDASHM3JsonEstimateLines.push({

		                    			sno : oSDASHM3JsonEstimateLinesLoc[i].LineItem,

										locationc : oSDASHM3JsonEstimateLinesLoc[i].LocationCodeC,
		                    			componentc : oSDASHM3JsonEstimateLinesLoc[i].ComponentCodeC,
		                    			damagec : oSDASHM3JsonEstimateLinesLoc[i].DamageCodeC,
		                    			materialc : oSDASHM3JsonEstimateLinesLoc[i].MaterialCodeC,
		                    			repairc : oSDASHM3JsonEstimateLinesLoc[i].RepairCodeC,
										lengthc : oSDASHM3JsonEstimateLinesLoc[i].RepairLengthC,
		                    			widthc : oSDASHM3JsonEstimateLinesLoc[i].RepairWidthC,
		                    			measurec : oSDASHM3JsonEstimateLinesLoc[i].RepairMeasureUnitC,
		                    			qtyc : oSDASHM3JsonEstimateLinesLoc[i].QuantityC,
		                    			hrsc : oSDASHM3JsonEstimateLinesLoc[i].LineItemC,
		                    			matcostc : oSDASHM3JsonEstimateLinesLoc[i].MaterialCostC,
		                    			respc : oSDASHM3JsonEstimateLinesLoc[i].ResponsibilityC,
		                    			labcostc : oSDASHM3JsonEstimateLinesLoc[i].LabourCostC,
		                    			bulletinc : oSDASHM3JsonEstimateLinesLoc[i].BulletinNumberC,
		                    			totalc : oSDASHM3JsonEstimateLinesLoc[i].TotalCostC,

		                    			location : oSDASHM3JsonEstimateLinesLoc[i].LocationCode,
		                    			component : oSDASHM3JsonEstimateLinesLoc[i].ComponentCode,
		                    			damage : oSDASHM3JsonEstimateLinesLoc[i].DamageCode,
		                    			material : oSDASHM3JsonEstimateLinesLoc[i].MaterialCode,
		                    			repair : oSDASHM3JsonEstimateLinesLoc[i].RepairCode,
		                    			locationt : oSDASHM3JsonEstimateLinesLoc[i].LocationText,
		                    			componentt : oSDASHM3JsonEstimateLinesLoc[i].ComponentText,
		                    			damaget : oSDASHM3JsonEstimateLinesLoc[i].DamageText,
		                    			materialt : oSDASHM3JsonEstimateLinesLoc[i].MaterialText,
		                    			repairt : oSDASHM3JsonEstimateLinesLoc[i].RepairText,
		                    			locationdisp : oSDASHM3JsonEstimateLinesLoc[i].LocationCode,
		                    			componentdisp : oSDASHM3JsonEstimateLinesLoc[i].ComponentCode,
		                    			damagedisp : oSDASHM3JsonEstimateLinesLoc[i].DamageCode,
		                    			materialdisp : oSDASHM3JsonEstimateLinesLoc[i].MaterialCode,
		                    			repairdisp : oSDASHM3JsonEstimateLinesLoc[i].RepairCode,
		                    			length : (oSDASHM3JsonEstimateLinesLoc[i].LineItem == "")?"":thousandsep(oSDASHM3JsonEstimateLinesLoc[i].RepairLength),
		                    			width : (oSDASHM3JsonEstimateLinesLoc[i].LineItem == "")?"":thousandsep(oSDASHM3JsonEstimateLinesLoc[i].RepairWidth),
		                    			measure : oSDASHM3JsonEstimateLinesLoc[i].RepairMeasureUnit,
		                    			qty : oSDASHM3JsonEstimateLinesLoc[i].Quantity,
		                    			hrs : hrslocal,
		                    			matcost : matcostlocal,
		                    			resp : oSDASHM3JsonEstimateLinesLoc[i].Responsibility,
		                    			labcost : labcostlocal,
		                    			bulletin : oSDASHM3JsonEstimateLinesLoc[i].BulletinNumber,
		                    			total : totallocal

		                    			/*component : "Panel Assembly",
		                    			damage : "Bowed",
		                    			repair : "Straighten",
		                    			location : "Roof/Top Whole",

		                    			locationiso : "TX0N",
		                    			material : "SK",

		                    			length : "150",
		                    			width : "90",
		                    			qty : "1",

		                    			hrs : "3",
		                    			labcost : "72",
		                    			matcost : "0",
		                    			total : "72",
		                    			resp : "S",*/

		                    		});
	                    	 }
	                    },
	                  function(error){
	                      //sap.ui.commons.MessageBox.alert("Sorry, there is an error");
	                	  console.log("Get Item : Page 3 Failure");
	                  });


				var oSDASHM3ModelEstimateLines = new sap.ui.model.json.JSONModel();
				oSDASHM3ModelEstimateLines.setData(oSDASHM3JsonEstimateLines);
        sap.ui.getCore().byId("idSDASHM3TableEstimateLines").setModel(oSDASHM3ModelEstimateLines, "oSDASHM3ModelEstimateLines");
        sap.ui.getCore().byId("idSDASHM3TableEstimateLines").setVisible(true);


        var oSDASHM3ModelEstimateLinesUI = new sap.ui.model.json.JSONModel();
        oSDASHM3ModelEstimateLinesUI.setData({modelData: oSDASHM3JsonEstimateLines});

      	var oSDASHM3TableEstimateLinesUI = sap.ui.getCore().byId("idSDASHM3TableEstimateLinesUI");
      	oSDASHM3TableEstimateLinesUI.setModel(oSDASHM3ModelEstimateLinesUI);
      	oSDASHM3TableEstimateLinesUI.setVisibleRowCount(oSDASHM3JsonEstimateLines.length);
      	oSDASHM3TableEstimateLinesUI.bindRows("/modelData");
				globalSDASHM3TableEstimateLinesUITPC.refresh();

				oCurrent.setJSChangeColors();
				sap.ui.getCore().byId("idSDASHM3TableEstimateLinesUI").onAfterRendering = function() {

				if (sap.ui.table.Table.prototype.onAfterRendering) {
					sap.ui.table.Table.prototype.onAfterRendering.apply(this, arguments);
				}

				oCurrent.setJSChangeColors();

				};
	},

	setJSChangeColors : function(){
		var tabData = sap.ui.getCore().byId("idSDASHM3TableEstimateLinesUI").getModel().getData().modelData;
		var tabDataLength = tabData.length;
		var colId = "";
		for(var i =0; i<tabDataLength; i++){

			if(tabData[i].componentc == "X"){
				colId = "CMP-col1-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "CMP-col1-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].damagec == "X"){
				colId = "DMG-col2-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "DMG-col2-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].repairc == "X"){
				colId = "REP-col3-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "REP-col3-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].locationc == "X"){
				colId = "LOC-col4-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "LOC-col4-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].materialc == "X"){
				colId = "MATR-col5-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "MATR-col5-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].lengthc == "X"){
				colId = "LEN-col6-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "LEN-col6-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].widthc == "X"){
				colId = "WID-col7-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "WID-col7-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].qtyc == "X"){
				colId = "QTY-col8-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "QTY-col8-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].hrsc == "X"){
				colId = "HRS-col9-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "HRS-col9-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].labcostc == "X"){
				colId = "LABC-col10-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "LABC-col10-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].matcostc == "X"){
				colId = "MATC-col11-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "MATC-col11-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].totalc == "X"){
				colId = "TOT-col12-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "TOT-col12-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].respc == "X"){
				colId = "RES-col13-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "RES-col13-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

		}
	},

	/* SDASHM3 - Value - Record Details */
	setValueRecordDetailsBackUp : function(){
		sap.ui.getCore().byId("idSDASHM3RecordDetailsValueSerial").setText(oSDASHM3JsonHeaderDetails.serial);
		sap.ui.getCore().byId("idSDASHM3RecordDetailsValueRecordType").setText(oSDASHM3JsonHeaderDetails.recordtype);
		sap.ui.getCore().byId("idSDASHM3RecordDetailsValueMNRStatus").setText(oSDASHM3JsonHeaderDetails.mnrstatus);
		sap.ui.getCore().byId("idSDASHM3RecordDetailsValueLastAction").setText(oSDASHM3JsonHeaderDetails.lastactionfirst);
	},

	/* SDASHM3 - Content - Thumbnail */
	setContentThumbnail : function(SDASHM3SerialNo){

		// /sap/opu/odata/sap/ZMNR_DEP_SRV/picSet(Equnr='SEGU2425533',Sernr='SEGU2425533',Tplnr='1045',Aufnr='100934577',Auart='X')


		console.log("Get Pictures : Page 3");

		/*var urlToSap = "picSet(Sernr='" + global3SerialNo + "',Aufnr='" + global3EstimateNo + "'," +
		"Equnr='" + global3Equnr + "',Tplnr='" + global3Depot + "')";*/

		if(SDASHM3SerialNo != "" && SDASHM3SerialNo != undefined){	// Replaced global3SerialNo by SDASHM3SerialNo
		var urlToSap = "picSet(Sernr='" + global3SerialNo + "',Aufnr='" + global3EstimateNo + "'," +
		"Equnr='" + global3Equnr + "',Tplnr='" + global3Depot + "',Auart='" + 'X' + "')";

		/*var urlToSap = "picSet(Sernr='" + 'SEGU2425533' + "',Aufnr='" + '100934577' + "'," +
		"Equnr='" + 'SEGU2425533' + "',Tplnr='" + '1045' + "',Auart='" + 'X' + "')";*/

		var docName = "";
		var ext = "";
		var dispname = "";

    	urlToSap = serviceDEP + urlToSap;
    	oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	        console.log(urlToSap);
	        OData.request({
	                      requestUri: urlToSap,
	                      method: "GET",
	                      dataType: 'json',
	                      async: false,
	                      headers:
	                      {
	                      "X-Requested-With": "XMLHttpRequest",
	                      "Content-Type": "application/json; charset=utf-8",
	                      "DataServiceVersion": "2.0",
	                      "X-CSRF-Token":"Fetch"
	                      }
	                      },
	                      function (data, response){
	                    	 console.log("Get Pictures Success");

	                    	jsonSDASHM3Pictures = [];
	                    	jsonSDASHM3Documents = [];
												jsonSDASHM3DocNames = [];
												if(data.Filenames == ""){
													sap.ui.getCore().byId("idSDASHM3PanelCarousel").setVisible(false);
												}else{
													sap.ui.getCore().byId("idSDASHM3PanelCarousel").setVisible(true);
													jsonSDASHM3DocNames = data.Filenames.split('*');
												}

	                    	if(data.File1 != ''){

	                    		docName = data.Filenames.split('*')[0];
													dispname = docName.split('_').pop();
	                    		ext = dispname.split('.').pop();

	                    		if(isPIC(ext)){
			                 		jsonSDASHM3Pictures.push({
			                 			images : "data:image/png;base64," + data.File1,
			                 			name : docName,
														dispname : dispname,
														number : jsonSDASHM3Pictures.length
			                 		});
	                    		}else{
	                    			jsonSDASHM3Documents.push({
			                 			images : data.File1,
			                 			name : docName,
														dispname : dispname
			                 		});
	                    		}
	                    	}

	                    	if(data.File2 != ''){

													docName = data.Filenames.split('*')[1];
													dispname = docName.split('_').pop();
	                    		ext = dispname.split('.').pop();

	                    		if(isPIC(ext)){
			                 		jsonSDASHM3Pictures.push({
			                 			images : "data:image/png;base64," + data.File2,
			                 			name : docName,
														dispname : dispname,
														number : jsonSDASHM3Pictures.length
			                 		});
	                    		}else{
	                    			jsonSDASHM3Documents.push({
			                 			images : data.File2,
			                 			name : docName,
														dispname : dispname
			                 		});
	                    		}
	                    	}

	                    	if(data.File3 != ''){

													docName = data.Filenames.split('*')[2];
													dispname = docName.split('_').pop();
	                    		ext = dispname.split('.').pop();

	                    		if(isPIC(ext)){
			                 		jsonSDASHM3Pictures.push({
			                 			images : "data:image/png;base64," + data.File3,
			                 			name : docName,
														dispname : dispname,
														number : jsonSDASHM3Pictures.length
			                 		});
	                    		}else{
	                    			jsonSDASHM3Documents.push({
			                 			images : data.File3,
			                 			name : docName,
														dispname : dispname
			                 		});
	                    		}
	                    	}

	                    	if(data.File4 != ''){

													docName = data.Filenames.split('*')[3];
													dispname = docName.split('_').pop();
	                    		ext = dispname.split('.').pop();

	                    		if(isPIC(ext)){
			                 		jsonSDASHM3Pictures.push({
			                 			images : "data:image/png;base64," + data.File4,
			                 			name : docName,
														dispname : dispname,
														number : jsonSDASHM3Pictures.length
			                 		});
	                    		}else{
	                    			jsonSDASHM3Documents.push({
			                 			images : data.File4,
			                 			name : docName,
														dispname : dispname
			                 		});
	                    		}
	                    	}

							if(data.File5 != ''){

								docName = data.Filenames.split('*')[4];
								dispname = docName.split('_').pop();
								ext = dispname.split('.').pop();

								if(isPIC(ext)){
							 		jsonSDASHM3Pictures.push({
							 			images : "data:image/png;base64," + data.File5,
							 			name : docName,
										dispname : dispname,
										number : jsonSDASHM3Pictures.length
							 		});
								}else{
									jsonSDASHM3Documents.push({
							 			images : data.File5,
							 			name : docName,
										dispname : dispname
							 		});
								}
							}


							if(data.File6 != ''){

								docName = data.Filenames.split('*')[5];
								dispname = docName.split('_').pop();
								ext = dispname.split('.').pop();

								if(isPIC(ext)){
							 		jsonSDASHM3Pictures.push({
							 			images : "data:image/png;base64," + data.File6,
							 			name : docName,
										dispname : dispname,
										number : jsonSDASHM3Pictures.length
							 		});
								}else{
									jsonSDASHM3Documents.push({
							 			images : data.File6,
							 			name : docName,
										dispname : dispname
							 		});
								}
							}

							if(data.File7 != ''){

							  docName = data.Filenames.split('*')[6];
							  dispname = docName.split('_').pop();
							  ext = dispname.split('.').pop();

							  if(isPIC(ext)){
							    jsonSDASHM3Pictures.push({
							      images : "data:image/png;base64," + data.File7,
							      name : docName,
							      dispname : dispname,
										number : jsonSDASHM3Pictures.length
							    });
							  }else{
							    jsonSDASHM3Documents.push({
							      images : data.File7,
							      name : docName,
							      dispname : dispname
							    });
							  }
							}

							if(data.File8 != ''){

							  docName = data.Filenames.split('*')[7];
							  dispname = docName.split('_').pop();
							  ext = dispname.split('.').pop();

							  if(isPIC(ext)){
							    jsonSDASHM3Pictures.push({
							      images : "data:image/png;base64," + data.File8,
							      name : docName,
							      dispname : dispname,
										number : jsonSDASHM3Pictures.length
							    });
							  }else{
							    jsonSDASHM3Documents.push({
							      images : data.File8,
							      name : docName,
							      dispname : dispname
							    });
							  }
							}

							if(data.File9 != ''){

							  docName = data.Filenames.split('*')[8];
							  dispname = docName.split('_').pop();
							  ext = dispname.split('.').pop();

							  if(isPIC(ext)){
							    jsonSDASHM3Pictures.push({
							      images : "data:image/png;base64," + data.File9,
							      name : docName,
							      dispname : dispname,
										number : jsonSDASHM3Pictures.length
							    });
							  }else{
							    jsonSDASHM3Documents.push({
							      images : data.File9,
							      name : docName,
							      dispname : dispname
							    });
							  }
							}

							if(data.File10 != ''){

							  docName = data.Filenames.split('*')[9];
							  dispname = docName.split('_').pop();
							  ext = dispname.split('.').pop();

							  if(isPIC(ext)){
							    jsonSDASHM3Pictures.push({
							      images : "data:image/png;base64," + data.File10,
							      name : docName,
							      dispname : dispname,
										number : jsonSDASHM3Pictures.length
							    });
							  }else{
							    jsonSDASHM3Documents.push({
							      images : data.File10,
							      name : docName,
							      dispname : dispname
							    });
							  }
							}

							if(data.File11 != ''){

							  docName = data.Filenames.split('*')[10];
							  dispname = docName.split('_').pop();
							  ext = dispname.split('.').pop();

							  if(isPIC(ext)){
							  jsonSDASHM3Pictures.push({
							    images : "data:image/png;base64," + data.File11,
							    name : docName,
							    dispname : dispname,
									number : jsonSDASHM3Pictures.length
							  });
							  }else{
							    jsonSDASHM3Documents.push({
							    images : data.File11,
							    name : docName,
							    dispname : dispname
							  });
							  }
							}

							if(data.File12 != ''){

							  docName = data.Filenames.split('*')[11];
							  dispname = docName.split('_').pop();
							  ext = dispname.split('.').pop();

							  if(isPIC(ext)){
							  jsonSDASHM3Pictures.push({
							    images : "data:image/png;base64," + data.File12,
							    name : docName,
							    dispname : dispname,
									number : jsonSDASHM3Pictures.length
							  });
							  }else{
							    jsonSDASHM3Documents.push({
							    images : data.File12,
							    name : docName,
							    dispname : dispname
							  });
							  }
							}

							if(data.File13 != ''){

							  docName = data.Filenames.split('*')[12];
							  dispname = docName.split('_').pop();
							  ext = dispname.split('.').pop();

							  if(isPIC(ext)){
							  jsonSDASHM3Pictures.push({
							    images : "data:image/png;base64," + data.File13,
							    name : docName,
							    dispname : dispname,
									number : jsonSDASHM3Pictures.length
							  });
							  }else{
							    jsonSDASHM3Documents.push({
							    images : data.File13,
							    name : docName,
							    dispname : dispname
							  });
							  }
							}

							if(data.File14 != ''){

							  docName = data.Filenames.split('*')[13];
							  dispname = docName.split('_').pop();
							  ext = dispname.split('.').pop();

							  if(isPIC(ext)){
							  jsonSDASHM3Pictures.push({
							    images : "data:image/png;base64," + data.File14,
							    name : docName,
							    dispname : dispname,
									number : jsonSDASHM3Pictures.length
							  });
							  }else{
							    jsonSDASHM3Documents.push({
							    images : data.File14,
							    name : docName,
							    dispname : dispname
							  });
							  }
							}

							if(data.File15 != ''){

							docName = data.Filenames.split('*')[14];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File15,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File15,
							name : docName,
							dispname : dispname
							});
							}
							}


							if(data.File16 != ''){

							docName = data.Filenames.split('*')[15];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File16,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File16,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File17 != ''){

							docName = data.Filenames.split('*')[16];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File17,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File17,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File18 != ''){

							docName = data.Filenames.split('*')[17];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File18,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File18,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File19 != ''){

							docName = data.Filenames.split('*')[18];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File19,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File19,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File20 != ''){

							docName = data.Filenames.split('*')[19];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File20,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File20,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File21 != ''){

							  docName = data.Filenames.split('*')[20];
							  dispname = docName.split('_').pop();
							  ext = dispname.split('.').pop();

							  if(isPIC(ext)){
							  jsonSDASHM3Pictures.push({
							    images : "data:image/png;base64," + data.File21,
							    name : docName,
							    dispname : dispname,
									number : jsonSDASHM3Pictures.length
							  });
							  }else{
							    jsonSDASHM3Documents.push({
							    images : data.File21,
							    name : docName,
							    dispname : dispname
							  });
							  }
							}

							if(data.File22 != ''){

							  docName = data.Filenames.split('*')[21];
							  dispname = docName.split('_').pop();
							  ext = dispname.split('.').pop();

							  if(isPIC(ext)){
							  jsonSDASHM3Pictures.push({
							    images : "data:image/png;base64," + data.File22,
							    name : docName,
							    dispname : dispname,
									number : jsonSDASHM3Pictures.length
							  });
							  }else{
							    jsonSDASHM3Documents.push({
							    images : data.File22,
							    name : docName,
							    dispname : dispname
							  });
							  }
							}

							if(data.File23 != ''){

							  docName = data.Filenames.split('*')[22];
							  dispname = docName.split('_').pop();
							  ext = dispname.split('.').pop();

							  if(isPIC(ext)){
							  jsonSDASHM3Pictures.push({
							    images : "data:image/png;base64," + data.File23,
							    name : docName,
							    dispname : dispname,
									number : jsonSDASHM3Pictures.length
							  });
							  }else{
							    jsonSDASHM3Documents.push({
							    images : data.File23,
							    name : docName,
							    dispname : dispname
							  });
							  }
							}

							if(data.File24 != ''){

							  docName = data.Filenames.split('*')[23];
							  dispname = docName.split('_').pop();
							  ext = dispname.split('.').pop();

							  if(isPIC(ext)){
							  jsonSDASHM3Pictures.push({
							    images : "data:image/png;base64," + data.File24,
							    name : docName,
							    dispname : dispname,
									number : jsonSDASHM3Pictures.length
							  });
							  }else{
							    jsonSDASHM3Documents.push({
							    images : data.File24,
							    name : docName,
							    dispname : dispname
							  });
							  }
							}

							if(data.File25 != ''){

							docName = data.Filenames.split('*')[24];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File25,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File25,
							name : docName,
							dispname : dispname
							});
							}
							}


							if(data.File26 != ''){

							docName = data.Filenames.split('*')[25];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File26,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File26,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File27 != ''){

							docName = data.Filenames.split('*')[26];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File27,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File27,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File28 != ''){

							docName = data.Filenames.split('*')[27];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File28,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File28,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File29 != ''){

							docName = data.Filenames.split('*')[28];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File29,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File29,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File30 != ''){

							docName = data.Filenames.split('*')[29];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File30,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File30,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File31 != ''){

							docName = data.Filenames.split('*')[30];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File31,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File31,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File32 != ''){

							docName = data.Filenames.split('*')[31];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File32,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File32,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File33 != ''){

							docName = data.Filenames.split('*')[32];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File33,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File33,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File34 != ''){

							docName = data.Filenames.split('*')[33];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File34,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File34,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File35 != ''){

							docName = data.Filenames.split('*')[34];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File35,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File35,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File36 != ''){

							docName = data.Filenames.split('*')[35];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File36,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File36,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File37 != ''){

							docName = data.Filenames.split('*')[36];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File37,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File37,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File38 != ''){

							docName = data.Filenames.split('*')[37];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File38,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File38,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File39 != ''){

							docName = data.Filenames.split('*')[38];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File39,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File39,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File40 != ''){

							docName = data.Filenames.split('*')[39];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File40,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File40,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File41 != ''){

							docName = data.Filenames.split('*')[40];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File41,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File41,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File42 != ''){

							docName = data.Filenames.split('*')[41];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File42,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File42,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File43 != ''){

							docName = data.Filenames.split('*')[42];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File43,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File43,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File44 != ''){

							docName = data.Filenames.split('*')[43];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File44,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File44,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File45 != ''){

							docName = data.Filenames.split('*')[44];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File45,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File45,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File46 != ''){

							docName = data.Filenames.split('*')[45];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File46,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File46,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File47 != ''){

							docName = data.Filenames.split('*')[46];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File47,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File47,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File48 != ''){

							docName = data.Filenames.split('*')[47];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File48,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File48,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File49 != ''){

							docName = data.Filenames.split('*')[48];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File49,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File49,
							name : docName,
							dispname : dispname
							});
							}
							}

							if(data.File50 != ''){

							docName = data.Filenames.split('*')[49];
							dispname = docName.split('_').pop();
							ext = dispname.split('.').pop();

							if(isPIC(ext)){
							jsonSDASHM3Pictures.push({
							images : "data:image/png;base64," + data.File50,
							name : docName,
							dispname : dispname,
							number : jsonSDASHM3Pictures.length
							});
							}else{
							jsonSDASHM3Documents.push({
							images : data.File50,
							name : docName,
							dispname : dispname
							});
							}
							}




              },
            function(error){
                //sap.ui.commons.MessageBox.alert("Sorry, there is an error");
          	  console.log("Get Pictures Failure");
            });

					}

		jsonSDASHM3PicturesChunks = chunkv2(jsonSDASHM3Pictures, 5);
		console.log("Separated chunks ", jsonSDASHM3PicturesChunks);
		console.log("No. of chunks ", jsonSDASHM3PicturesChunks.length);
		var oSDASHM3FlexImagePageFlexId = "";	// MAC09052018
		var oSDASHM3FlexImagePageVerticalLayoutId = "";	// MAC09052018
		jsonSDASHM3Images = [];
		for(var i=0; i<jsonSDASHM3PicturesChunks.length; i++){
			// MAC09052018
			oSDASHM3FlexImagePageFlexId = "idSDASHM3FlexImagePageFlexId" + i;
			oSDASHM3FlexImagePageVerticalLayoutId = "idSDASHM3FlexImagePageVerticalLayoutId" + i;

			if(sap.ui.getCore().byId(oSDASHM3FlexImagePageFlexId))
				sap.ui.getCore().byId(oSDASHM3FlexImagePageFlexId).destroy();

			if(sap.ui.getCore().byId(oSDASHM3FlexImagePageVerticalLayoutId))
				sap.ui.getCore().byId(oSDASHM3FlexImagePageVerticalLayoutId).destroy();
		  // MAC09052018

		var oSDASHM3FlexImagePage = new sap.m.FlexBox(oSDASHM3FlexImagePageFlexId,{
		}).bindAggregation("items", {
			path : "/",
			template : new sap.ui.layout.VerticalLayout(oSDASHM3FlexImagePageVerticalLayoutId,{
				content : [
					new sap.m.Image({	//"idSDASHMCarouselImages" + i,
						src : "{images}",
						helpId : "{number}",
						densityAware: false,
						decorative: false,
						height : "150px",
						width : "200px",
						press : function(oEvent){
						var activeImage = parseInt(oEvent.getSource().getParent().getBindingContext().getPath().split("/")[1]);
						sap.ui.getCore().byId("idSDASHMPICCarousel").removeAllPages();

						/*var slidestemp = oEvent.getSource().getParent().getParent().getParent().mAggregations.pages;
						var slides = [];	// Number of slides on page 3

						for(var i=0; i<slidestemp.length; i++){
							slides.push({
								pages : slidestemp[i].sId
							});
						}

						var activeSlide = oEvent.getSource().getParent().getParent().getParent().getActivePage();

						for(var j=0; j<jsonSDASHM3Pictures.length;j++){
							sap.ui.getCore().byId("idSDASHMPICCarousel").addPage(
									new sap.m.VBox({
										  items : [
									new sap.m.HBox({
										  items : [new sap.m.Image({
												src: jsonSDASHM3Pictures[j].images
											}).addStyleClass("slideimages")
											],
											alignItems : sap.m.FlexAlignItems.Center,
										    justifyContent : sap.m.FlexJustifyContent.Center
									}),
									new sap.m.Label({ width : "50px", text : ""}),
									new sap.m.HBox({
										  	items : [new sap.m.Label({
										  		text : jsonSDASHM3Pictures[j].dispname
										  	}).addStyleClass("slideimagescaption")
											],
											alignItems : sap.m.FlexAlignItems.Center,
										    justifyContent : sap.m.FlexJustifyContent.Center
									}),

								]
								})
								);
						}*/

						// MAC09052018
						var currentPage = parseInt(oEvent.getSource().getParent().getParent().getId().substr(-1));
						// MAC09052018
						var activeImage = parseInt(oEvent.getSource().getParent().getBindingContext().getPath().split("/")[1]);
						// MAC09052018
						activeImage = (currentPage * 5) + activeImage;
						// MAC09052018

						var offset = activeImage;
						for( var x=0; x < jsonSDASHM3Pictures.length; x++) {
						    var pointer = (x + offset) % jsonSDASHM3Pictures.length;
						    console.log(jsonSDASHM3Pictures[pointer].number);

								sap.ui.getCore().byId("idSDASHMPICCarousel").addPage(
										new sap.m.VBox({
											  items : [
										new sap.m.HBox({
											  items : [new sap.m.Image({
													src: jsonSDASHM3Pictures[pointer].images
												}).addStyleClass("slideimages")
												],
												alignItems : sap.m.FlexAlignItems.Center,
											    justifyContent : sap.m.FlexJustifyContent.Center
										}),
										new sap.m.Label({ width : "50px", text : ""}),
										new sap.m.HBox({
											  	items : [new sap.m.Label({
											  		text : jsonSDASHM3Pictures[pointer].dispname
											  	}).addStyleClass("slideimagescaption")
												],
												alignItems : sap.m.FlexAlignItems.Center,
											    justifyContent : sap.m.FlexJustifyContent.Center
										}),

									]
									})
									);

						}

						//var activePage = sap.ui.getCore().byId("idSDASHMPICCarousel").getPages()[activeImage].sId;
						//sap.ui.getCore().byId("idSDASHMPICCarousel").setActivePage(activePage);
						app.to("idSDASHMPICPage");

						}
					}).addStyleClass("thumbnailimages"),
					new sap.m.Label({ width : "50px", text : ""}),
					new sap.m.Label({text : "{dispname}"}).addStyleClass("thumbnailimagescaption")
	             ]
			})

		});


		var oSDASHM3ModelImageFlex = new sap.ui.model.json.JSONModel();
		oSDASHM3ModelImageFlex.setData(jsonSDASHM3PicturesChunks[i]);
		oSDASHM3FlexImagePage.setModel(oSDASHM3ModelImageFlex);

		jsonSDASHM3Images.push(oSDASHM3FlexImagePage);

		}


		if(sap.ui.getCore().byId("idSDASHM3Carousel") != undefined){
			sap.ui.getCore().byId("idSDASHM3Carousel").destroy();
		}

		var oSDASHM3Carousel = new sap.m.Carousel("idSDASHM3Carousel",{
			height: "220px",
			arrowsPlacement : "Content",
			pageIndicatorPlacement: sap.m.PlacementType.Bottom,
			loop: false,
			pages: [jsonSDASHM3Images]
		});

		var oCurrent = this;
		var oSDASHM3Doc = new sdashm3doc();

		if(sap.ui.getCore().byId("idSDASHM3PicUpload") != undefined){
			sap.ui.getCore().byId("idSDASHM3PicUpload").destroy();
		}

		if(sap.ui.getCore().byId("idSDASHM3PicDelete") != undefined){
			sap.ui.getCore().byId("idSDASHM3PicDelete").destroy();
		}


		/* SDASHM3 - Table - Other Documents */
		if(sap.ui.getCore().byId("idSDASHM3TableOtherDocs") != undefined){
			sap.ui.getCore().byId("idSDASHM3TableOtherDocs").destroy();
		}
		var oSDASHM3TableOtherDocs = new sap.ui.table.Table("idSDASHM3TableOtherDocs",{
			visibleRowCount: 6,
			//columnHeaderVisible : false,
			width: '100%',
			selectionMode : sap.ui.table.SelectionMode.None
		}).addStyleClass("sapUiSizeCompact tblBorder1");

		oSDASHM3TableOtherDocs.addColumn(new sap.ui.table.Column({
			 label: new sap.ui.commons.Label({text: "Other Documents", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var binstring = oEvent.getSource().getBindingContext().getProperty("images");
 					 var filename = oEvent.getSource().getBindingContext().getProperty("name");
 			     var ext = filename.split('.').pop().toLowerCase();
					 if(ext == 'pdf'){
 					 var dispname = filename.split('_').pop();
 //				 var ext = data.FileExt.toLowerCase();
 //get file content
 			    	var byteCharacters = atob(binstring);
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
 									/*let a = $("<a />", {
 											href: blobUrl,
 											download: dispname,
 									})
 									.appendTo("body").get(0).click();*/
 			         	 }
 				 }else{
					 //https://seaweb.seacoglobal.com/sap/opu/odata/sap/ZUI5_/downloadSet(Filename='03_2018_2940_0003800530_1.xlsx')/$value

						 oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
						 busyDialog.open();

						 var sRead = "/downloadSet(Filename='" + filename + "')" + "/$value" ;

						oModel.read( sRead, null, null, true, function(oData, oResponse){
						 busyDialog.close();
								 var pdfURL = oResponse.requestUri;
								 window.open(pdfURL);
						 },function(error){
							 busyDialog.close();
							 jQuery.sap.require("sap.ui.commons.MessageBox");
					 	 	 sap.ui.commons.MessageBox.alert("Download failed!");
						 });
				 }
				 }
				 }).bindProperty("text", "dispname").addStyleClass("borderStyle1"),
							 resizable:false,
							 width:"100px"
				 }));

									 var oSDASHM3ModelOtherDocs = new sap.ui.model.json.JSONModel();
									 oSDASHM3ModelOtherDocs.setData({modelData: jsonSDASHM3Documents});

									 var oSDASHM3TableOtherDocs = sap.ui.getCore().byId("idSDASHM3TableOtherDocs");
									 oSDASHM3TableOtherDocs.setModel(oSDASHM3ModelOtherDocs);
									 oSDASHM3TableOtherDocs.bindRows("/modelData");

		var oSDASHM3FlexDocumentSection = new sap.m.FlexBox({
            items: [
                /*	new sap.ui.commons.Button({
			                  text: "Other Doc",
			                  width : "90px",
			                  //styled : false,
			     		   			  press : function(oEvent){
			     		   				  oSDASHM3Doc.getOtherDocumentsList(oEvent.getSource());
			     		   			  }
							  }),
							  new sap.m.Label({width : "15px"}),*/
							  new sap.ui.commons.Button("idSDASHM3PicUpload",{
				                  text: "Upload",
				                  //styled : false,
				                  width : "90px",
		     		   			  press : function(oEvent){
		     		   				oSDASHM3Doc.openUploadDocumentsPopup(oEvent.getSource(), "PAGE3");
		     		   			  }
								  }),
							  new sap.m.Label({width : "15px"}),
							  new sap.ui.commons.Button("idSDASHM3PicDelete",{
				                  text: "Delete",
				                  //styled : false,
				                  width : "90px",
		     		   			  press : function(oEvent){
		     		   				oSDASHM3Doc.openDeleteDocumentsPopup(oEvent.getSource());
		     		   			  }
								  })
                    ],
					      direction: "Row"
            });
						sap.ui.getCore().byId("idSDASHM3PicUpload").setVisible(global3UploadDeleteVisible);
						sap.ui.getCore().byId("idSDASHM3PicDelete").setVisible(global3UploadDeleteVisible);
						// if(global3Processkey == "GI" || global3Processkey == "GO"){
						// 	sap.ui.getCore().byId("idSDASHM3PicUpload").setVisible(global3UploadDeleteVisible);
						// 	sap.ui.getCore().byId("idSDASHM3PicDelete").setVisible(global3UploadDeleteVisible);
						// }else{
						// 	sap.ui.getCore().byId("idSDASHM3PicUpload").setVisible(true);
						// 	sap.ui.getCore().byId("idSDASHM3PicDelete").setVisible(true);
						// }

		/* SDASHM3 - Layout - Carousel and Upload Section */
		if(sap.ui.getCore().byId("idSDASHM3LayoutMNRPictures") != undefined){
			sap.ui.getCore().byId("idSDASHM3LayoutMNRPictures").destroy();
		}
		var oSDASHM3LayoutMNRPictures = new sap.ui.layout.form.ResponsiveGridLayout("idSDASHM3LayoutMNRPictures",{
										    });

		/* SDASHM3 - Form - Header Details */
		if(sap.ui.getCore().byId("idSDASHM3FormMNRPictures") != undefined){
			sap.ui.getCore().byId("idSDASHM3FormMNRPictures").destroy();
		}

		if(sap.ui.getCore().byId("idSDASHM3FormMNRPicturesC1") != undefined){
			sap.ui.getCore().byId("idSDASHM3FormMNRPicturesC1").destroy();
		}

		if(sap.ui.getCore().byId("idSDASHM3FormMNRPicturesC2") != undefined){
			sap.ui.getCore().byId("idSDASHM3FormMNRPicturesC2").destroy();
		}

		if(jsonSDASHM3Documents.length == 0){
			var oSDASHM3FormMNRPictures = new sap.ui.layout.form.Form("idSDASHM3FormMNRPictures",{
						layout: oSDASHM3LayoutMNRPictures,
						formContainers: [
										new sap.ui.layout.form.FormContainer("idSDASHM3FormMNRPicturesC2",{
												//title: "Summary",
												layoutData: new sap.ui.layout.GridData({span: "L10 M10 S10"}),
												formElements: [
												new sap.ui.layout.form.FormElement({
														fields: [new sap.m.FlexBox({
															direction : "Column",
															items : [ oSDASHM3Carousel ]
														})
														]
												})
																		]
										}),

						]
					}).addStyleClass("marginTopBottom10");
		}else{
			var oSDASHM3FormMNRPictures = new sap.ui.layout.form.Form("idSDASHM3FormMNRPictures",{
		        layout: oSDASHM3LayoutMNRPictures,
		        formContainers: [
		                new sap.ui.layout.form.FormContainer("idSDASHM3FormMNRPicturesC1",{
		                    //title: "Summary",
		                	  layoutData: new sap.ui.layout.GridData({span: "L10 M10 S10"}),
		                    formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [ oSDASHM3Carousel ]
												})
		                                ]
		                }),

		                new sap.ui.layout.form.FormContainer("idSDASHM3FormMNRPicturesC2",{
		                    //title: "Summary",
		                	  layoutData: new sap.ui.layout.GridData({span: "L2 M2 S2"}),
		                    formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [new sap.m.FlexBox({
												    	direction : "Column",
												    	items : [ oSDASHM3TableOtherDocs ]
												    })
												    ]
												})
		                                ]
		                }),

		        ]
			    }).addStyleClass("marginTopBottom10");
		}

		var oSDASHM3FlexMNRPictures = new sap.m.FlexBox({
		        items: [
		                    oSDASHM3FlexDocumentSection,
												new sap.m.Label(),
		                    oSDASHM3FormMNRPictures
		                ],
		        direction: "Column"
					});

		//Listen to 'pageChanged' events
		oSDASHM3Carousel.attachPageChanged(function(oControlEvent) {
			console.log("sap.m.Carousel: page changed: old: " + oControlEvent.getParameters().oldActivePageId );
			console.log("                              new: " + oControlEvent.getParameters().newActivePageId );
		});

		/* SDASHM3 - Panel - Image Carousel */

		if(sap.ui.getCore().byId("idSDASHM3PanelCarousel") != undefined){
			sap.ui.getCore().byId("idSDASHM3PanelCarousel").destroy();
		}
		var oSDASHM3 = new sdashm3();
		var oSDASHM3PanelCarousel = new sap.m.Panel("idSDASHM3PanelCarousel",{
			busy : false, // boolean
			busyIndicatorDelay : 1000, // int
			visible : true, // boolean
			headerText : "M&R Pictures", // string
			width : "100%",
			height : "auto", // sap.ui.core.CSSSize
			expandable : true, // boolean, since 1.22
			expanded : globalPicPanelExpanded, // boolean, since 1.22
			expandAnimation : true, // boolean, since 1.26
			//tooltip : "Filters", // sap.ui.core.TooltipBase
			content : [oSDASHM3FlexMNRPictures], // sap.ui.core.Control
			expand : function(oEvent){
					var isExpand = oEvent.getParameter("expand");
					if(isExpand && global3SerialNo != "" && globalPicLoadNeeded){
						globalPicPanelExpanded = true;
						globalPicLoadNeeded = false;
						var oSDASHM3ContentThumbNail = oSDASHM3.setContentThumbnail(global3SerialNo);
						sap.ui.getCore().byId("idSDASHM3ContentFinal").insertItem(oSDASHM3ContentThumbNail, 5);
					}
			}
		});

		/*if(jsonSDASHM3Documents.length == 0 && jsonSDASHM3Pictures.length == 0){
				sap.ui.getCore().byId("idSDASHM3PanelCarousel").setVisible(false);
		}else{
				sap.ui.getCore().byId("idSDASHM3PanelCarousel").setVisible(true);
		}*/

		return oSDASHM3PanelCarousel;

	},

	/* SDASHM3 - Content - Alert and Search Buttons */

	setContentButtons : function(){

		var oCurrent = this;

		/* SDASHM3 - Input - Search  */

        var oSDASHM3InputSearch = new sap.m.SearchField("idSDASHM3InputSearch", {
					                    width: "250px",
					                    placeholder: "Unit or Estimate #",
					                    search : function(oEvent){
					                    	var text = oEvent.getParameters("query").query;
					                    	oCurrent.searchSDASHM3EquipmentLevel(text);
					                    }
					                    });

        var oSDASHM3F4Search = new sap.m.Image("idSDASHM3F4Search",{
            src: "images/f4_help.png",
            press : function(oEvent){

            	var oSDASHM3PopupSearch = new sap.m.TextArea({
            		placeholder : "Serial No.",
                	value : "",
                	height : "150px",
					width : "200px",
					enabled : true
                }).addStyleClass("lastActionPanel");

            	if(sap.ui.getCore().byId("idSDASHM3PopoverSearch") != undefined)
               	 sap.ui.getCore().byId("idSDASHM3PopoverSearch").destroy();

				 var oSDASHM3PopoverSearch = new sap.m.Popover("idSDASHM3PopoverSearch",{
                    title: "Search",
                    //modal: true,
                    placement: sap.m.PlacementType.Left,
                    /*footer:  new sap.m.Bar({

                                           contentRight: [
                                                         new sap.m.Button({
                                                                          text: "Send",
                                                                          icon: "sap-icon://email",
                                                                          press: function () {
                                                                       	   oCurrent.sendSDASHM2EquipmentLevelAlert();
                                                                          }
                                                                          }).addStyleClass("footerBtn"),
                                                         ],
                                           }),*/
                    content: new sap.m.VBox({
                                            //width:"300px",
                                            items:  [oSDASHM3PopupSearch]
                                            }),

                    }).addStyleClass("sapUiPopupWithPadding");

				 oSDASHM3PopoverSearch.openBy(oSDASHM3F4Search);
            }
		}).addStyleClass("f4imagesearch");

		/* SDASHM3 - Flex - Search  */

        var oSDASHM3FlexSearch = new sap.m.FlexBox("idSDASHM3FlexSearch",{
            items: [oSDASHM3InputSearch,
                    oSDASHM3F4Search
                    ],
            direction: "Row",
            visible : false
            });

        /* SDASHM3 - Button - Setup  */

        var oSDASHM3ButtonAlert = new sap.ui.commons.Button("idSDASHM3ButtonAlert",{
	          text : "Send Email",
	          //styled:false,
	          //type:sap.m.ButtonType.Unstyled,
	          //icon: sap.ui.core.IconPool.getIconURI("email"),
	          press:function(oEvent){

	        	  var isSelectedOne = sap.ui.getCore().byId("idSDASHM3TableEquipmentLevel").getSelectedIndices().length;
	        	  /*for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
			      		if(oSDASHMJsonEquipmentLevel[i].isChecked == true){
			      			isSelectedOne = true;
			      		}
			      	}*/

			      	if(isSelectedOne == 0){
			      		sap.ui.commons.MessageBox.alert("Select at least one order");
			      	}else{

			      		/* To Address */

		        	  	 if(sap.ui.getCore().byId("idSDASHM3EquipmentLevelSendAlertValueTo") != undefined)
		                	 sap.ui.getCore().byId("idSDASHM3EquipmentLevelSendAlertValueTo").destroy();

		                 if(sap.ui.getCore().byId("idSDASHM3EquipmentLevelSendAlertLabelTo") != undefined)
		                	 sap.ui.getCore().byId("idSDASHM3EquipmentLevelSendAlertLabelTo").destroy();

		                 var oSDASHM3EquipmentLevelSendAlertValueTo = new sap.m.Input("idSDASHM3EquipmentLevelSendAlertValueTo",{
		                                                               value : "",
		                                                               type : sap.m.InputType.Email,
		                                                               width : "275px",
		                                                               }).addStyleClass("selectionLabels1");

		                 var oSDASHM3EquipmentLevelSendAlertLabelTo = new sap.m.Label("idSDASHM3EquipmentLevelSendAlertLabelTo",{
		                     text : "To Address : ",
		                     labelFor: oSDASHM3EquipmentLevelSendAlertValueTo,
		                     width : "180px"
		                     }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");

		                 var oSDASHM3EquipmentLevelSendAlertFlexTo = new sap.m.FlexBox({
		                                                                items: [oSDASHM3EquipmentLevelSendAlertLabelTo,
		                                                                        oSDASHM3EquipmentLevelSendAlertValueTo
		                                                                        ],
		                                                                direction: "Row"
		                                                                });

		                 /* Subject */

		                 if(sap.ui.getCore().byId("idSDASHM3EquipmentLevelSendAlertValueSubject") != undefined)
		                	 sap.ui.getCore().byId("idSDASHM3EquipmentLevelSendAlertValueSubject").destroy();

		                 if(sap.ui.getCore().byId("idSDASHM3EquipmentLevelSendAlertLabelSubject") != undefined)
		                	 sap.ui.getCore().byId("idSDASHM3EquipmentLevelSendAlertLabelSubject").destroy();

		                 var oSDASHM3EquipmentLevelSendAlertValueSubject = new sap.m.Input("idSDASHM3EquipmentLevelSendAlertValueSubject",{
																                         value : "",
																                         maxLength : 50,
																                         //type : sap.m.InputType.Email,
																                         width : "275px",
																                         }).addStyleClass("selectionLabels1");

		                 var oSDASHM3EquipmentLevelSendAlertLabelSubject = new sap.m.Label("idSDASHM3EquipmentLevelSendAlertLabelSubject",{
		                     text : "Subject : ",
		                     labelFor: oSDASHM3EquipmentLevelSendAlertValueSubject,
		                     width : "100px"
		                     }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");

		                 var oSDASHM3EquipmentLevelSendAlertFlexSubject = new sap.m.FlexBox({
		                                                                items: [oSDASHM3EquipmentLevelSendAlertLabelSubject,
		                                                                        oSDASHM3EquipmentLevelSendAlertValueSubject
		                                                                        ],
		                                                                direction: "Row"
		                                                                });


		                 /* Body */

		                 if(sap.ui.getCore().byId("idSDASHM3EquipmentLevelSendAlertValueBody") != undefined)
		                	 sap.ui.getCore().byId("idSDASHM3EquipmentLevelSendAlertValueBody").destroy();

		                 if(sap.ui.getCore().byId("idSDASHM3EquipmentLevelSendAlertLabelBody") != undefined)
		                	 sap.ui.getCore().byId("idSDASHM3EquipmentLevelSendAlertLabelBody").destroy();

		                 var oSDASHM3EquipmentLevelSendAlertValueBody = new sap.m.TextArea("idSDASHM3EquipmentLevelSendAlertValueBody",{
									    					placeholder : "",
									    					height : "150px",
									    					width : "600px",
									    					enabled : true
									    					}).addStyleClass("commentsPanel");

		                 var oSDASHM3EquipmentLevelSendAlertLabelBody = new sap.m.Label("idSDASHM3EquipmentLevelSendAlertLabelBody",{
		                     text : "Email body : ",
		                     labelFor: oSDASHM3EquipmentLevelSendAlertValueBody,
		                     width : "100px"
		                     }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");

		                 var oSDASHM3EquipmentLevelSendAlertFlexBody = new sap.m.FlexBox({
		                                                                items: [oSDASHM3EquipmentLevelSendAlertLabelBody,
		                                                                        oSDASHM3EquipmentLevelSendAlertValueBody
		                                                                        ],
		                                                                direction: "Row"
		                                                                });


		                 var oSDASHM3EquipmentLevelSendAlertFlexFinal = new sap.m.FlexBox({
		                     items: [
		                             	oSDASHM3EquipmentLevelSendAlertFlexTo,
		                             	oSDASHM3EquipmentLevelSendAlertFlexSubject,
		                             	oSDASHM3EquipmentLevelSendAlertFlexBody
		                             ],
		                     direction: "Column"
		                     });

		                 if(sap.ui.getCore().byId("idSDASHM3EquipmentLevelSendAlertPopover") != undefined)
		                	 sap.ui.getCore().byId("idSDASHM3EquipmentLevelSendAlertPopover").destroy();

						 var oSDASHM3EquipmentLevelSendAlertPopover = new sap.m.Popover("idSDASHM3EquipmentLevelSendAlertPopover",{
		                     title: "Send Email",
		                     //modal: true,
		                     placement: sap.m.PlacementType.Right,
		                     footer:  new sap.m.Bar({

		                                            contentRight: [
		                                                          new sap.m.Button({
		                                                                           text: "Send",
		                                                                           icon: "sap-icon://email",
		                                                                           press: function () {
		                                                                        	   oCurrent.sendSDASHM3EquipmentLevelAlert();
		                                                                           }
		                                                                           }).addStyleClass("footerBtn"),
		                                                                           /*
		                                                                           new sap.m.Button({
			                                                                           text: "Close",
			                                                                           icon: "sap-icon://decline",
			                                                                           press: function () {
			                                                                        	   sap.ui.getCore().byId("idSDASHM3EquipmentLevelSendAlertPopover").close();
			                                                                           }
			                                                                           }).addStyleClass("footerBtn")*/
		                                                          ],
		                                            }),
		                     content: new sap.m.VBox({
		                                             //width:"300px",
		                                             items:  [oSDASHM3EquipmentLevelSendAlertFlexFinal]
		                                             }),

		                     }).addStyleClass("sapUiPopupWithPadding");

						 oSDASHM3EquipmentLevelSendAlertPopover.openBy(oEvent.getSource());
			      	}




	          }
		}).addStyleClass("marginTop10");//.addStyleClass("excelBtn marginTop10 floatRight");

//        /* SDASHM3 - Label - Equipment Level */
//
//		var oSDASHM3LabelEquipmentLevel = new sap.ui.commons.Label("idSDASHM3LabelEquipmentLevel",{
//            //text: "Equipment Level",
//        }).addStyleClass("fontTitle");

		/* SDASHM3 - Button - Equipment Level Export to Excel */

		var oSDASHM3ButtonEquipmentLevelExport = new sap.ui.commons.Button("idSDASHM3ButtonEquipmentLevelExport",{
	          text : "",
	          //styled:false,
	          //type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
							oCurrent.downloadSDASHM3Excel();
	          }
		}).addStyleClass("marginTop10");//.addStyleClass("excelBtn marginTop10 floatRight");

		/* SDASHM3 - Button - Edit */
		var oSDASHM3edit = new sdashm3edit();
		var oSDASHM3ButtonEquipmentLevelEdit = new sap.ui.commons.Button("idSDASHM3ButtonEquipmentLevelEdit",{
	          text : "",
	          //styled:false,
	          //type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("edit"),
	          press:function(oEvent){
								oSDASHM3edit.openSDASHM3EditPopup(oEvent.getSource());
	          }
		}).addStyleClass("marginTop10");//.addStyleClass("excelBtn marginTop10 floatRight redIcon");

		/* SDASHM3 - Button - Save

		var oSDASHM3ButtonEquipmentLevelSave = new sap.ui.commons.Button("idSDASHM3ButtonEquipmentLevelSave",{
	          text : "",
	          styled:false,
	          type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("save"),
	          press:function(){

	          }
		}).addStyleClass("excelBtn marginTop10 floatRight redIcon"); */


		/* SDASHM3 - Button - Switch Currencies */

		var oSDASHM3ButtonEquipmentLevelSwitch = new sap.ui.commons.Button("idSDASHM3ButtonEquipmentLevelSwitch",{
	          text : "Switch to USD",
	          //width : "150px",
	          visible : false,
	          //styled:false,
	          //type:sap.m.ButtonType.Unstyled,
	          //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	  oCurrent.switchCurrency();
	          }
		}).addStyleClass("marginTop10");//.addStyleClass("excelBtn marginTop10 floatRight");

		/* SDASHM3 - Button - Equipment Level Approve */

	   	 var oSDASHM3ButtonEquipmentLevelApprove = new sap.ui.commons.Button("idSDASHM3ButtonEquipmentLevelApprove",{
	   		  text : "Approve",
	   		  //icon: sap.ui.core.IconPool.getIconURI("complete"),
	          //width:"140px",
	          //styled:false,
	          visible:true,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){

	        	  if(sessionStorage.approve == ""){
			      		sap.ui.commons.MessageBox.alert("You are not authorized");
	        	  }else{
	        	  var orders = "";
		      	  var references = "";
		      	  var amounts = "";
		      	  var equnrs  = "";

		      	  var isValid = true;
		      	  var isSelectedOne = sap.ui.getCore().byId("idSDASHM3TableEquipmentLevel").getSelectedIndices().length;

			      	/*for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
			      		if(oSDASHMJsonEquipmentLevel[i].isChecked == true){
			      			isSelectedOne = true;
			      		}
			      	}*/

			      	if(isSelectedOne == 0){
			      		sap.ui.commons.MessageBox.alert("Select at least one order");
			      	}else{
			      		var arraySelLines = sap.ui.getCore().byId("idSDASHM3TableEquipmentLevel").getSelectedIndices();
			      		for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
				      		if(isValid){
				      			var oDetData = sap.ui.getCore().byId("idSDASHM3TableEquipmentLevel").getContextByIndex(i);
			      				var realPath = oDetData.getPath().split('/')[2];
				      			if(arraySelLines.indexOf(i) != -1 && oSDASHMJsonEquipmentLevel[realPath].isawap == false){
				      				isValid = false;
				      			}/*else if(arraySelLines.indexOf(i) != -1 && oSDASHMJsonEquipmentLevel[i].isawap == true && oSDASHMJsonEquipmentLevel[i].reference == ""){
				      				isValid = false;
				      			}*/else if(arraySelLines.indexOf(i) != -1 && oSDASHMJsonEquipmentLevel[realPath].isawap == true){
				      				if(orders == ''){
				      					orders = oSDASHMJsonEquipmentLevel[realPath].estimateno;
				      					references = oSDASHMJsonEquipmentLevel[realPath].reference;
				      					amounts = oSDASHMJsonEquipmentLevel[realPath].totestimateamt;
				      					equnrs = oSDASHMJsonEquipmentLevel[realPath].serialno;
				      				}else{
				      					orders = orders + '$' + oSDASHMJsonEquipmentLevel[realPath].estimateno;
				      					references = references + '$*' + oSDASHMJsonEquipmentLevel[realPath].reference;
				      					amounts = amounts + '$' + oSDASHMJsonEquipmentLevel[realPath].totestimateamt;
				      					equnrs = equnrs + '$' + oSDASHMJsonEquipmentLevel[realPath].serialno;
				      				}
				      			}
				      			}else{

				      			}
				      		}

				      		if(isValid){
				      			oCurrent.approveEstimates(orders, references, equnrs, amounts);
				      		}else{
				      			sap.ui.commons.MessageBox.alert("Either select only HOLD APPD units or fill reference for all the selected units");
				      		}

			      	}
	        	  }
	          }}).addStyleClass("marginTop10");//.addStyleClass("excelBtn marginTop10");

	   	/* SDASHM3 - Button - Equipment Level Download Estimates */

	   	 var oSDASHM3ButtonEquipmentLevelDownload = new sap.ui.commons.Button("idSDASHM3ButtonEquipmentLevelDownload",{
	          text: "Download",
	          //icon: sap.ui.core.IconPool.getIconURI("download"),
	          //width:"140px",
	          //styled:false,
	          visible:true,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        		 if(global3EstimateNo == ""){

							 }else{

								 if(sap.ui.getCore().byId("idSDASHM3Download") != undefined)
										 sap.ui.getCore().byId("idSDASHM3Download").destroy();

							 if(sap.ui.getCore().byId("idSDASHM3CheckBoxDownloadPDF") != undefined)
										sap.ui.getCore().byId("idSDASHM3CheckBoxDownloadPDF").destroy();

								if(sap.ui.getCore().byId("idSDASHM3CheckBoxDownloadPictures") != undefined)
										 sap.ui.getCore().byId("idSDASHM3CheckBoxDownloadPictures").destroy();

								 var oSDASHM3Download = new sap.m.Popover("idSDASHM3Download",{
												 //title: "Download",
												 //modal: true,
												 showHeader:false,
												 placement: sap.m.PlacementType.Right,
												 content: new sap.m.VBox({
																								 //width:"300px",
																								 items:  [

																									 new sap.ui.commons.CheckBox("idSDASHM3CheckBoxDownloadPDF",{
															 		                	 text : "Estimate",
															 		          			   checked : true
																								 }).addStyleClass("pdfexcelcheckboxes1"),

																								 new sap.ui.commons.CheckBox("idSDASHM3CheckBoxDownloadPictures",{
														 		                	 text : "Pictures",
																										checked : false,
																										visible : !global3isFromSerialHistory	// MAC04072019_APS980+
																							 	}).addStyleClass("pdfexcelcheckboxes1"),

																								new sap.ui.commons.Button({
 																					          text: "Download",
 																					          visible:true,
 																					          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
 																					          press:function(oEvent){

																										var oSDASHM2 = new sdashm2();
																										if(sap.ui.getCore().byId("idSDASHM3CheckBoxDownloadPDF").getChecked())
																											oSDASHM2.getPdfFromSap(global3EstimateNo, global3SerialNo, "P");
																										if(sap.ui.getCore().byId("idSDASHM3CheckBoxDownloadPictures").getChecked())
																												oSDASHM2.getPdfFromSap(global3EstimateNo, global3SerialNo, "Z");


 																					          }}).addStyleClass("marginTop10")

																								 ]
																								 }),

												 }).addStyleClass("sapUiPopupWithPadding");

								 oSDASHM3Download.openBy(sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelDownload"));
		      	   }
	          }}).addStyleClass("marginTop10");//.addStyleClass("excelBtn marginTop10");

	   	/* SDASHM3 - Button - Equipment Level Delete */

	   	 var oSDASHM3ButtonEquipmentLevelDelete = new sap.ui.commons.Button("idSDASHM3ButtonEquipmentLevelDelete",{
	          text: "Delete and Reverse Status",
	          //icon: sap.ui.core.IconPool.getIconURI("download"),
	          //width:"140px",
	          //styled:false,
	          //visible:false,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(oEvent){
							jQuery.sap.require("sap.ui.commons.MessageBox");
							var confirmMessage = "Are you sure you want to delete the selected message? This action cannot be undone.";
							sap.ui.commons.MessageBox.show(confirmMessage,
						sap.ui.commons.MessageBox.Icon.WARNING,
						"Confirm",
						[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
							oCurrent.fnCallbackMessageBoxDelete,
						sap.ui.commons.MessageBox.Action.YES);
								//oCurrent.deleteSDASHM3Status(oEvent.getSource());
	          }}).addStyleClass("marginTop10");//.addStyleClass("excelBtn marginTop10");

	   	/* SDASHM3 - Button - Equipment Level Request */

	   	 var oSDASHM3ButtonEquipmentLevelRequest = new sap.ui.commons.Button("idSDASHM3ButtonEquipmentLevelRequest",{
	          text: "Request Pictures from Depot",
	          //icon: sap.ui.core.IconPool.getIconURI("download"),
	          //width:"140px",
	          //styled:false,
	          visible:true,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(oEvent){
	      			oCurrent.sendRequestPictures(oEvent.getSource());
	          }}).addStyleClass("marginTop10");//.addStyleClass("excelBtn marginTop10");

	   	/* SDASHM3 - Button - Equipment Level Customer Contact Details */

	   	 var oSDASHM3ButtonEquipmentLevelCustContact = new sap.ui.commons.Button("idSDASHM3ButtonEquipmentLevelCustContact",{
	          text: "Customer Contact Details",
	          //icon: sap.ui.core.IconPool.getIconURI("download"),
	          //width:"140px",
	          //styled:false,
	          visible:true,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(oEvent){
							busyDialog.open();
	      		   oCurrent.openCustContact(oEvent);
							 busyDialog.close();
	          }}).addStyleClass("marginTop10");//.addStyleClass("excelBtn marginTop10");

	   	/* SDASHM3 - Button - Equipment Level Customer Billing Details */

	   	 var oSDASHM3ButtonEquipmentLevelCustBilling = new sap.ui.commons.Button("idSDASHM3ButtonEquipmentLevelCustBilling",{
	          text: "Customer Billing Details",
	          //icon: sap.ui.core.IconPool.getIconURI("download"),
	          //width:"140px",
	          //styled:false,
	          visible:true,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(oEvent){
							busyDialog.open();
	      		   oCurrent.openCustBilling(oEvent);
							 busyDialog.close();
	          }}).addStyleClass("marginTop10");//.addStyleClass("excelBtn marginTop10");

	   	/* SDASHM3 - Button - Equipment Level Depot Payment Details */

	   	 var oSDASHM3ButtonEquipmentLevelDepotPayment = new sap.ui.commons.Button("idSDASHM3ButtonEquipmentLevelDepotPayment",{
	          text: "Depot Payment Details",
	          //icon: sap.ui.core.IconPool.getIconURI("download"),
	          //width:"140px",
	          //styled:false,
	          visible:true,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(oEvent){
							 busyDialog.open();
	      		   oCurrent.openDepotPayment(oEvent);
							 busyDialog.close();
	          }}).addStyleClass("marginTop10");//.addStyleClass("excelBtn marginTop10");

	   	/* SDASHM3 - Button - Equipment Level Depot Contact Details */

	   	 var oSDASHM3ButtonEquipmentLevelDepotContact = new sap.ui.commons.Button("idSDASHM3ButtonEquipmentLevelDepotContact",{
	          text: "Depot Contact Details",
	          //icon: sap.ui.core.IconPool.getIconURI("download"),
	          //width:"140px",
	          //styled:false,
	          visible:true,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(oEvent){
							 busyDialog.open();
	      		   oCurrent.openDepotContact(oEvent, null);
							 busyDialog.close();
	          }}).addStyleClass("marginTop10");//.addStyleClass("excelBtn marginTop10");

	   	/* SDASHM3 - Button - Equipment Level Forward */

	   	 var oSDASHM3ButtonEquipmentLevelForward = new sap.ui.commons.Button("idSDASHM3ButtonEquipmentLevelForward",{
	          text: "Forward Estimate",
	          //icon: sap.ui.core.IconPool.getIconURI("download"),
	          //width:"140px",
	          //styled:false,
	          visible:false,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){

	          }}).addStyleClass("marginTop10");//.addStyleClass("excelBtn marginTop10");

	   	/* SDASHM3 - Button - Customer Approval */
	     var oSDASHM2 = new sdashm2();var oSDASHM2 = new sdashm2();
	   	 var oSDASHM3ButtonEquipmentLevelCSApproval = new sap.ui.commons.Button("idSDASHM3ButtonEquipmentLevelCSApproval",{
	          text: "Customer Approval",
	          visible:true,
	          press:function(){
	        	  var oSDASHM2ContentCSApprove = oSDASHM2.setCSApproveInitial(3);
	        	  oSDASHM2.openCSApprove(oSDASHM2ContentCSApprove, 3);
	          }}).addStyleClass("marginTop10");//.addStyleClass("excelBtn marginTop10");

	   	/* SDASHM3 - Flexbox - Equipment Level Buttons

			var oSDASHM3FlexEquipmentLevelButtons = new sap.m.FlexBox({
			         items: [
							new sap.ui.commons.Label({
								text : "",
								width : "25px"
							}),
							oSDASHM3ButtonEquipmentLevelApprove,
							new sap.ui.commons.Label({
								text : "",
								width : "15px"
							}),
							oSDASHM3ButtonEquipmentLevelDownload
			       ],
			       direction : "Row",
			       visible: true,
					}); */

		var oSDASHM3FlexEquipmentLevelButtons = new sap.m.FlexBox({
	         items: [
						oSDASHM3ButtonEquipmentLevelEdit,
						new sap.m.Label({width : "10px"}),
            oSDASHM3ButtonEquipmentLevelDelete,
						new sap.m.Label({width : "10px"}),
						oSDASHM3ButtonEquipmentLevelRequest,
						new sap.m.Label({width : "10px"}),
						oSDASHM3ButtonEquipmentLevelCSApproval,
						new sap.m.Label({width : "10px"}),
						oSDASHM3ButtonEquipmentLevelCustContact,
						new sap.m.Label({width : "10px"}),
						oSDASHM3ButtonEquipmentLevelCustBilling,
						new sap.m.Label({width : "10px"}),
						oSDASHM3ButtonEquipmentLevelDepotPayment,
						new sap.m.Label({width : "10px"}),
						oSDASHM3ButtonEquipmentLevelDepotContact,
						new sap.m.Label({width : "10px"}),
						oSDASHM3ButtonEquipmentLevelDownload,
						new sap.m.Label({width : "10px"}),
						oSDASHM3ButtonEquipmentLevelExport,
						new sap.m.Label({width : "10px"})

	       ],
	       //direction : "RowReverse",
	       visible: true,
		}).addStyleClass("marginLeft20");

		return oSDASHM3FlexEquipmentLevelButtons;

	},

	/* SDASHM3 - Function - Send Request Pictures */

	sendRequestPictures : function(button){
		var oCurrent = this;
		/* To Address

	  	 if(sap.ui.getCore().byId("idSDASHM3RequestPicturesValueTo") != undefined)
       	 sap.ui.getCore().byId("idSDASHM3RequestPicturesValueTo").destroy();

        if(sap.ui.getCore().byId("idSDASHM3RequestPicturesLabelTo") != undefined)
       	 sap.ui.getCore().byId("idSDASHM3RequestPicturesLabelTo").destroy();

        var oSDASHM3RequestPicturesValueTo = new sap.m.Input("idSDASHM3RequestPicturesValueTo",{
                                                      value : "",
                                                      type : sap.m.InputType.Email,
                                                      width : "275px",
                                                      }).addStyleClass("selectionLabels1");

        var oSDASHM3RequestPicturesLabelTo = new sap.m.Label("idSDASHM3RequestPicturesLabelTo",{
            text : "To Address : ",
            labelFor: oSDASHM3RequestPicturesValueTo,
            width : "180px"
            }).addStyleClass("selectionLabels");

        var oSDASHM3RequestPicturesFlexTo = new sap.m.FlexBox({
                                                       items: [oSDASHM3RequestPicturesLabelTo,
                                                               oSDASHM3RequestPicturesValueTo
                                                               ],
                                                       direction: "Row"
                                                       });*/

        /* Subject */

        if(sap.ui.getCore().byId("idSDASHM3RequestPicturesValueSubject") != undefined)
       	 sap.ui.getCore().byId("idSDASHM3RequestPicturesValueSubject").destroy();

        if(sap.ui.getCore().byId("idSDASHM3RequestPicturesLabelSubject") != undefined)
       	 sap.ui.getCore().byId("idSDASHM3RequestPicturesLabelSubject").destroy();

        var oSDASHM3RequestPicturesValueSubject = new sap.m.Input("idSDASHM3RequestPicturesValueSubject",{
												                         value : global3SerialNo + "_" + global3Depot,
												                         maxLength : 50,
												                         //type : sap.m.InputType.Email,
												                         width : "275px",
												                         }).addStyleClass("selectionLabels1");

        var oSDASHM3RequestPicturesLabelSubject = new sap.m.Label("idSDASHM3RequestPicturesLabelSubject",{
            text : "Subject : ",
            labelFor: oSDASHM3RequestPicturesValueSubject,
            width : "100px"
					}).addStyleClass("selectionLabelsLabelPage2LessorSurvey");

        var oSDASHM3RequestPicturesFlexSubject = new sap.m.FlexBox({
                                                       items: [oSDASHM3RequestPicturesLabelSubject,
                                                               oSDASHM3RequestPicturesValueSubject
                                                               ],
                                                       direction: "Row"
                                                       });


        /* Body */

        if(sap.ui.getCore().byId("idSDASHM3RequestPicturesValueBody") != undefined)
       	 sap.ui.getCore().byId("idSDASHM3RequestPicturesValueBody").destroy();

        if(sap.ui.getCore().byId("idSDASHM3RequestPicturesLabelBody") != undefined)
       	 sap.ui.getCore().byId("idSDASHM3RequestPicturesLabelBody").destroy();

        var oSDASHM3RequestPicturesValueBody = new sap.m.TextArea("idSDASHM3RequestPicturesValueBody",{
					    						value : "Dear Sir/Madam,\n\nPlease send photos of the subject unit"
						    					//+ global3SerialNo +
						    					+ " to the following email address:"
													+ "\n"
													+ "photo@seacoglobal.com"
						    					+ "\n\n"
						    					+ "Please note:\n- Email subject must be in the form of "
						    					+ global3SerialNo + "_" + global3Depot
						    					+ "\n- Allowed file formats are .JPG, .JPEG, .PNG, .BMP, and .PDF."
						    					+ "\n- The size of each file should not exceed 1MB. The total size of all attachments should not exceed 10MB."
						    					+ "\n- Photos should be clear and of good quality."
					    						+ "\nThank you in advance for your attention to this matter."
					    						+ "\n\nBest regards,\n"
						    					+ sessionStorage.name
						    					+ ".",
					    					height : "400px",
					    					width : "500px",
					    					enabled : true
					    					}).addStyleClass("commentsPanel");

        var oSDASHM3RequestPicturesLabelBody = new sap.m.Label("idSDASHM3RequestPicturesLabelBody",{
            text : "Email body : ",
            labelFor: oSDASHM3RequestPicturesValueBody,
            width : "100px"
            }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");

        var oSDASHM3RequestPicturesFlexBody = new sap.m.FlexBox({
                                                       items: [oSDASHM3RequestPicturesLabelBody,
                                                               oSDASHM3RequestPicturesValueBody
                                                               ],
                                                       direction: "Row"
                                                       });


        /* Comments

        if(sap.ui.getCore().byId("idSDASHM3RequestPicturesValueComments") != undefined)
       	 sap.ui.getCore().byId("idSDASHM3RequestPicturesValueComments").destroy();

        if(sap.ui.getCore().byId("idSDASHM3RequestPicturesLabelComments") != undefined)
       	 sap.ui.getCore().byId("idSDASHM3RequestPicturesLabelComments").destroy();

        var oSDASHM3RequestPicturesValueComments = new sap.m.TextArea("idSDASHM3RequestPicturesValueComments",{
					    					placeholder : "Insert Comments here",
					    					height : "150px",
					    					width : "600px",
					    					enabled : true
					    					}).addStyleClass("commentsPanel");

        var oSDASHM3RequestPicturesLabelComments = new sap.m.Label("idSDASHM3RequestPicturesLabelComments",{
            text : "Email body : ",
            labelFor: oSDASHM3RequestPicturesValueComments,
            width : "180px"
            }).addStyleClass("selectionLabels");

        var oSDASHM3RequestPicturesFlexComments = new sap.m.FlexBox({
                                                       items: [oSDASHM3RequestPicturesLabelComments,
                                                               oSDASHM3RequestPicturesValueComments
                                                               ],
                                                       direction: "Row"
                                                       });*/

        var oSDASHM3RequestPicturesButtonSend = new sap.ui.commons.Button({
	          text : "Send",
	          //styled:false,
	          visible:true,
	          //type:sap.m.ButtonType.Unstyled,
	          //icon: sap.ui.core.IconPool.getIconURI("email"),
	          press:function(oEvent){
	        	  oCurrent.sendSDASHM3RequestPicturesFromDepot();
	          }
		})//.addStyleClass("excelBtn marginTop10");

        var oSDASHM3RequestPicturesFlexFinal = new sap.m.FlexBox({
            items: [
                    	//oSDASHM3RequestPicturesFlexTo,
                    	oSDASHM3RequestPicturesFlexSubject,
                    	oSDASHM3RequestPicturesFlexBody,
                    	oSDASHM3RequestPicturesButtonSend,
                    	//oSDASHM3RequestPicturesFlexComments
                    ],
            direction: "Column"
            });

        if(sap.ui.getCore().byId("idSDASHM3RequestPicturesPopover") != undefined)
       	 sap.ui.getCore().byId("idSDASHM3RequestPicturesPopover").destroy();

		 var oSDASHM3RequestPicturesPopover = new sap.m.Popover("idSDASHM3RequestPicturesPopover",{
            title: "Request Pictures from Depot",
            //modal: true,
            placement: sap.m.PlacementType.Right,
            /*footer:  new sap.m.Bar({

                                   contentRight: [
                                                 new sap.m.Button({
                                                                  text: "Send",
                                                                  icon: "sap-icon://email",
                                                                  press: function () {
                                                               	   oCurrent.sendSDASHM3RequestPicturesFromDepot();
                                                                  }
                                                                  }).addStyleClass("footerBtn")
                                                 ],
                                   }),*/
            content: new sap.m.VBox({
                                    //width:"300px",
                                    items:  [oSDASHM3RequestPicturesFlexFinal]
                                    }),

            }).addStyleClass("sapUiPopupWithPadding");

		 oSDASHM3RequestPicturesPopover.openBy(button);

	},

	/* SDASHM3 - Function - Send Request Pictures from Depot */

	sendSDASHM3RequestPicturesFromDepot : function(){

		//var toaddr = sap.ui.getCore().byId("idSDASHM3RequestPicturesValueTo").getValue();
		var body = sap.ui.getCore().byId("idSDASHM3RequestPicturesValueBody").getValue();
		body = encodeURIComponent(body);

		var subject = sap.ui.getCore().byId("idSDASHM3RequestPicturesValueSubject").getValue();
		//var comments = sap.ui.getCore().byId("idSDASHM3RequestPicturesValueComments").getValue();

		var urlToSap = "reqpicSet?$filter=IvRecipient eq '" + "" +
					   "' and IvSubject eq '" + subject +
					   "' and IvBody eq '" + body +
					   "' and IvDepot eq '" + global3Depot +
					   "'";

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

                      var alertResult = data.results;

                      if(alertResult.length == 0){
                    	  sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                    	  console.log("Seaco DB Send Alert Successful; but returned nothing");
                      }else if(alertResult[0].Result == ''){
                    	  sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                    	  console.log("Seaco DB Send Alert Successful; but returned nothing");
                      }else{
                    	  sap.ui.commons.MessageBox.alert("Email sent");
                    	  sap.ui.getCore().byId("idSDASHM3RequestPicturesPopover").close();
                    	  console.log("Seaco DB Send Alert Successful");
                      }
                    },
                  function(error){
                    	sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                    	console.log("Seaco DB Send Alert Failure");
                	  busyDialog.close();
                  });
		},

		openCustContact : function(oEvent){
				 var serialno = global3SerialNo;
		       	 var Address = "";
		       	 var PostalCode = "";
		       	 var Country = "";
		       	 var Fax = "";
		       	 var Phone = "";
		       	 var Email = "";
		       	 var Contact = "";

		       	var urlToSap = "custcontactSet(IvSerial='" + serialno + "')";
		       	urlToSap = serviceDEP + urlToSap;
		       	oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
		  	        busyDialog.open();
		  	        console.log(urlToSap);
		  	        OData.request({
		  	                      requestUri: urlToSap,
		  	                      method: "GET",
		  	                      dataType: 'json',
		  	                      async: false,
		  	                      headers:
		  	                      {
		  	                      "X-Requested-With": "XMLHttpRequest",
		  	                      "Content-Type": "application/json; charset=utf-8",
		  	                      "DataServiceVersion": "2.0",
		  	                      "X-CSRF-Token":"Fetch"
		  	                      }
		  	                      },
		  	                      function (data, response){
		  	                    	console.log("Get Contact Success");
			                    		 Address = data.Address;
				   	 	        	 PostalCode = data.PostalCode;
				   	 	        	 Country = data.Country;
				   	 	        	 Fax = data.Fax;
				   	 	        	 Phone = data.Phone;
				   	 	        	 Email = data.Email;
				   	 	        	 Contact = data.Contact;
		  	                        busyDialog.close();
		  	                    },
		  	                  function(error){
		  	                      sap.ui.commons.MessageBox.alert("Sorry, there is an error");
		  	                	  console.log("Get Contact Failure");
		  	                	  busyDialog.close();
		  	                  });


			 /* Address */

		 var oSDASHM3TableStatusMonitorDepotContactValueAddress = new sap.m.Label({
		                                               text : Address,
		                                               }).addStyleClass("selectionLabels");

		 var oSDASHM3TableStatusMonitorDepotContactLabelAddress = new sap.m.Label({
		     text : "Address : ",
		     labelFor: oSDASHM3TableStatusMonitorDepotContactValueAddress,
		     width : "100px"
			 }).addStyleClass("selectionLabelsLabel");

		 var oSDASHM3TableStatusMonitorDepotContactFlexAddress = new sap.m.FlexBox({
		                                                items: [oSDASHM3TableStatusMonitorDepotContactLabelAddress,
		                                                        oSDASHM3TableStatusMonitorDepotContactValueAddress
		                                                        ],
		                                                direction: "Row"
		                                                });



		 /* Country */

		 var oSDASHM3TableStatusMonitorDepotContactValueCountry = new sap.m.Label({
		                                               text : Country,
		                                               }).addStyleClass("selectionLabels");

		 var oSDASHM3TableStatusMonitorDepotContactLabelCountry = new sap.m.Label({
		     //text : "Country : ",
		     labelFor: oSDASHM3TableStatusMonitorDepotContactValueCountry,
		     width : "100px"
		     }).addStyleClass("selectionLabelsLabel");

		 var oSDASHM3TableStatusMonitorDepotContactFlexCountry = new sap.m.FlexBox({
		                                                items: [oSDASHM3TableStatusMonitorDepotContactLabelCountry,
		                                                        oSDASHM3TableStatusMonitorDepotContactValueCountry
		                                                        ],
		                                                direction: "Row"
		                                                });

		 /* Postal Code */

		 var oSDASHM3TableStatusMonitorDepotContactValuePostal = new sap.m.Label({
		                                               text : PostalCode,
		                                               }).addStyleClass("selectionLabels");

		 var oSDASHM3TableStatusMonitorDepotContactLabelPostal = new sap.m.Label({
		     text : "Postal Code : ",
		     labelFor: oSDASHM3TableStatusMonitorDepotContactValuePostal,
		     width : "100px"
		     }).addStyleClass("selectionLabelsLabel");

		 var oSDASHM3TableStatusMonitorDepotContactFlexPostal = new sap.m.FlexBox({
		                                                items: [oSDASHM3TableStatusMonitorDepotContactLabelPostal,
		                                                        oSDASHM3TableStatusMonitorDepotContactValuePostal
		                                                        ],
		                                                direction: "Row"
		                                                });

		 /* Fax */

		 var oSDASHM3TableStatusMonitorDepotContactValueFax = new sap.m.Label({
		                                               text : Fax,
		                                               }).addStyleClass("selectionLabels");

		 var oSDASHM3TableStatusMonitorDepotContactLabelFax = new sap.m.Label({
		     text : "Fax : ",
		     labelFor: oSDASHM3TableStatusMonitorDepotContactValueFax,
		     width : "100px"
		     }).addStyleClass("selectionLabelsLabel");

		 var oSDASHM3TableStatusMonitorDepotContactFlexFax = new sap.m.FlexBox({
		                                                items: [oSDASHM3TableStatusMonitorDepotContactLabelFax,
		                                                        oSDASHM3TableStatusMonitorDepotContactValueFax
		                                                        ],
		                                                direction: "Row"
		                                                });

		 /* Phone */

		 var oSDASHM3TableStatusMonitorDepotContactValuePhone = new sap.m.Label({
		                                               text : Phone,
		                                               }).addStyleClass("selectionLabels");

		 var oSDASHM3TableStatusMonitorDepotContactLabelPhone = new sap.m.Label({
		     text : "Phone : ",
		     labelFor: oSDASHM3TableStatusMonitorDepotContactValuePhone,
		     width : "100px"
		     }).addStyleClass("selectionLabelsLabel");

		 var oSDASHM3TableStatusMonitorDepotContactFlexPhone = new sap.m.FlexBox({
		                                                items: [oSDASHM3TableStatusMonitorDepotContactLabelPhone,
		                                                        oSDASHM3TableStatusMonitorDepotContactValuePhone
		                                                        ],
		                                                direction: "Row"
		                                                });

		 /* Mail ID */

		 var oSDASHM3TableStatusMonitorDepotContactValueMailid = new sap.m.Link({
																									 text : Email,
																									 press : function(oEvent){
																										 var email = oEvent.getSource().getProperty("text");
																										 //window.location.href = "mailto:user@example.com?subject=Subject&body=message%20goes%20here";
																										 window.location.href = "mailto:" + email;
																									 }}).addStyleClass("selectionLabelsEmailLink");

		 var oSDASHM3TableStatusMonitorDepotContactLabelMailid = new sap.m.Label({
		     text : "Mail : ",
		     labelFor: oSDASHM3TableStatusMonitorDepotContactValueMailid,
		     width : "100px"
		     }).addStyleClass("selectionLabelsLabel");

		 var oSDASHM3TableStatusMonitorDepotContactFlexMailid = new sap.m.FlexBox({
		                                                items: [oSDASHM3TableStatusMonitorDepotContactLabelMailid,
		                                                        oSDASHM3TableStatusMonitorDepotContactValueMailid
		                                                        ],
		                                                direction: "Row"
		                                                });

		 /* Contact */

		 var oSDASHM3TableStatusMonitorDepotContactValueContact = new sap.m.Label({
		                                               text : Contact,
		                                               }).addStyleClass("selectionLabels");

		 var oSDASHM3TableStatusMonitorDepotContactLabelContact = new sap.m.Label({
		     text : "Comments : ",
		     labelFor: oSDASHM3TableStatusMonitorDepotContactValueContact,
		     width : "100px"
		     }).addStyleClass("selectionLabelsLabel");

		 var oSDASHM3TableStatusMonitorDepotContactFlexContact = new sap.m.FlexBox({
		                                                items: [oSDASHM3TableStatusMonitorDepotContactLabelContact,
		                                                        oSDASHM3TableStatusMonitorDepotContactValueContact
		                                                        ],
		                                                direction: "Row"
		                                                });



		 var oSDASHM3TableStatusMonitorDepotContactFlex = new sap.m.FlexBox({
		     items: [//oSDASHM3TableStatusMonitorDepotContactFlexDepotName,
		             //oSDASHM3TableStatusMonitorDepotContactFlexLocation,
		             oSDASHM3TableStatusMonitorDepotContactFlexAddress,
		             oSDASHM3TableStatusMonitorDepotContactFlexCountry,
		             oSDASHM3TableStatusMonitorDepotContactFlexPostal,
								 oSDASHM3TableStatusMonitorDepotContactFlexMailid,
								 oSDASHM3TableStatusMonitorDepotContactFlexPhone,
		             oSDASHM3TableStatusMonitorDepotContactFlexFax,
		             oSDASHM3TableStatusMonitorDepotContactFlexContact
		             ],
		     direction: "Column"
		     });

		 if(sap.ui.getCore().byId("idSDASHM3TableStatusMonitorDepotContact") != undefined)
			 sap.ui.getCore().byId("idSDASHM3TableStatusMonitorDepotContact").destroy();

			 var oSDASHM3TableStatusMonitorDepotContact = new sap.m.Popover("idSDASHM3TableStatusMonitorDepotContact",{
		     title: "Customer Contact",
		     modal: false,
		     placement: sap.m.PlacementType.Right,
		     footer:  new sap.m.Bar({
		    	 					visible : false,
		                            contentRight: [
		                                          new sap.m.Button({
		                                                           text: "Close",
		                                                           icon: "sap-icon://close",
		                                                           press: function () {
		                                                        	   sap.ui.getCore().byId("idSDASHM3TableStatusMonitorDepotContact").close();
		                                                           }
		                                                           })
		                                          ],
		                            }),
		     content: new sap.m.VBox({
		                             //width:"300px",
		                             items:  [oSDASHM3TableStatusMonitorDepotContactFlex]
		                             }),

		     }).addStyleClass("sapUiPopupWithPadding");

			 oSDASHM3TableStatusMonitorDepotContact.openBy(oEvent.getSource());

		},

		openDepotContact : function(oEvent, depot){
					 if(depot == null){ // page 3
						 depot = global3Depot;
						 var contactPlacement = sap.m.PlacementType.Right;
					 }else{ // page 1
						 var contactPlacement = sap.m.PlacementType.Left;
					 }

	       	 var Address = "";
	       	 var PostalCode = "";
	       	 var Country = "";
	       	 var Fax = "";
	       	 var Phone = "";
	       	 var Email = "";
	       	 var Contact = "";

	       	var urlToSap = "depotcontactSet(IvDepot='" + depot + "')";
	       	urlToSap = serviceDEP + urlToSap;
	       	oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	  	        busyDialog.open();
	  	        console.log(urlToSap);
	  	        OData.request({
	  	                      requestUri: urlToSap,
	  	                      method: "GET",
	  	                      dataType: 'json',
	  	                      async: false,
	  	                      headers:
	  	                      {
	  	                      "X-Requested-With": "XMLHttpRequest",
	  	                      "Content-Type": "application/json; charset=utf-8",
	  	                      "DataServiceVersion": "2.0",
	  	                      "X-CSRF-Token":"Fetch"
	  	                      }
	  	                      },
	  	                      function (data, response){
	  	                    	console.log("Get Contact Success");
		                         Address = data.Address;
			   	 	        	 PostalCode = data.PostalCode;
			   	 	        	 Country = data.Country;
			   	 	        	 Fax = data.Fax;
			   	 	        	 Phone = data.Phone;
			   	 	        	 Email = data.Email;
			   	 	        	 Contact = data.Contact;
	  	                        busyDialog.close();
	  	                    },
	  	                  function(error){
	  	                      sap.ui.commons.MessageBox.alert("Sorry, there is an error");
	  	                	  console.log("Get Contact Failure");
	  	                	  busyDialog.close();
	  	                  });


		 /* Address */

	 var oSDASHM3TableStatusMonitorDepotContactValueAddress = new sap.m.Label({
	                                               text : Address,
	                                               }).addStyleClass("selectionLabels");

	 var oSDASHM3TableStatusMonitorDepotContactLabelAddress = new sap.m.Label({
	     text : "Address : ",
	     labelFor: oSDASHM3TableStatusMonitorDepotContactValueAddress,
	     width : "100px"
	     }).addStyleClass("selectionLabelsLabel");

	 var oSDASHM3TableStatusMonitorDepotContactFlexAddress = new sap.m.FlexBox({
	                                                items: [oSDASHM3TableStatusMonitorDepotContactLabelAddress,
	                                                        oSDASHM3TableStatusMonitorDepotContactValueAddress
	                                                        ],
	                                                direction: "Row"
	                                                });



	 /* Country */

	 var oSDASHM3TableStatusMonitorDepotContactValueCountry = new sap.m.Label({
	                                               text : Country,
	                                               }).addStyleClass("selectionLabels");

	 var oSDASHM3TableStatusMonitorDepotContactLabelCountry = new sap.m.Label({
	     //text : "Country : ",
	     labelFor: oSDASHM3TableStatusMonitorDepotContactValueCountry,
	     width : "100px"
	     }).addStyleClass("selectionLabelsLabel");

	 var oSDASHM3TableStatusMonitorDepotContactFlexCountry = new sap.m.FlexBox({
	                                                items: [oSDASHM3TableStatusMonitorDepotContactLabelCountry,
	                                                        oSDASHM3TableStatusMonitorDepotContactValueCountry
	                                                        ],
	                                                direction: "Row"
	                                                });

	 /* Postal Code */

	 var oSDASHM3TableStatusMonitorDepotContactValuePostal = new sap.m.Label({
	                                               text : PostalCode,
	                                               }).addStyleClass("selectionLabels");

	 var oSDASHM3TableStatusMonitorDepotContactLabelPostal = new sap.m.Label({
	     text : "Postal Code : ",
	     labelFor: oSDASHM3TableStatusMonitorDepotContactValuePostal,
	     width : "100px"
	     }).addStyleClass("selectionLabelsLabel");

	 var oSDASHM3TableStatusMonitorDepotContactFlexPostal = new sap.m.FlexBox({
	                                                items: [oSDASHM3TableStatusMonitorDepotContactLabelPostal,
	                                                        oSDASHM3TableStatusMonitorDepotContactValuePostal
	                                                        ],
	                                                direction: "Row"
	                                                });

	 /* Fax */

	 var oSDASHM3TableStatusMonitorDepotContactValueFax = new sap.m.Label({
	                                               text : Fax,
	                                               }).addStyleClass("selectionLabels");

	 var oSDASHM3TableStatusMonitorDepotContactLabelFax = new sap.m.Label({
	     text : "Fax : ",
	     labelFor: oSDASHM3TableStatusMonitorDepotContactValueFax,
	     width : "100px"
	     }).addStyleClass("selectionLabelsLabel");

	 var oSDASHM3TableStatusMonitorDepotContactFlexFax = new sap.m.FlexBox({
	                                                items: [oSDASHM3TableStatusMonitorDepotContactLabelFax,
	                                                        oSDASHM3TableStatusMonitorDepotContactValueFax
	                                                        ],
	                                                direction: "Row"
	                                                });

	 /* Phone */

	 var oSDASHM3TableStatusMonitorDepotContactValuePhone = new sap.m.Label({
	                                               text : Phone,
	                                               }).addStyleClass("selectionLabels");

	 var oSDASHM3TableStatusMonitorDepotContactLabelPhone = new sap.m.Label({
	     text : "Phone : ",
	     labelFor: oSDASHM3TableStatusMonitorDepotContactValuePhone,
	     width : "100px"
	     }).addStyleClass("selectionLabelsLabel");

	 var oSDASHM3TableStatusMonitorDepotContactFlexPhone = new sap.m.FlexBox({
	                                                items: [oSDASHM3TableStatusMonitorDepotContactLabelPhone,
	                                                        oSDASHM3TableStatusMonitorDepotContactValuePhone
	                                                        ],
	                                                direction: "Row"
	                                                });

	 /* Mail ID */

	 var oSDASHM3TableStatusMonitorDepotContactValueMailid = new sap.m.Link({
																								 text : Email,
																								 press : function(oEvent){
																									 var email = oEvent.getSource().getProperty("text");
																									 //window.location.href = "mailto:user@example.com?subject=Subject&body=message%20goes%20here";
																									 window.location.href = "mailto:" + email;
																								 }}).addStyleClass("selectionLabelsEmailLink");

	 var oSDASHM3TableStatusMonitorDepotContactLabelMailid = new sap.m.Label({
	     text : "Mail : ",
	     labelFor: oSDASHM3TableStatusMonitorDepotContactValueMailid,
	     width : "100px"
	     }).addStyleClass("selectionLabelsLabel");

	 var oSDASHM3TableStatusMonitorDepotContactFlexMailid = new sap.m.FlexBox({
	                                                items: [oSDASHM3TableStatusMonitorDepotContactLabelMailid,
	                                                        oSDASHM3TableStatusMonitorDepotContactValueMailid
	                                                        ],
	                                                direction: "Row"
	                                                });

	 /* Contact */

	 var oSDASHM3TableStatusMonitorDepotContactValueContact = new sap.m.Label({
	                                               text : Contact,
	                                               }).addStyleClass("selectionLabels");

	 var oSDASHM3TableStatusMonitorDepotContactLabelContact = new sap.m.Label({
	     text : "Contact : ",
	     labelFor: oSDASHM3TableStatusMonitorDepotContactValueContact,
	     width : "100px"
	     }).addStyleClass("selectionLabelsLabel");

	 var oSDASHM3TableStatusMonitorDepotContactFlexContact = new sap.m.FlexBox({
	                                                items: [oSDASHM3TableStatusMonitorDepotContactLabelContact,
	                                                        oSDASHM3TableStatusMonitorDepotContactValueContact
	                                                        ],
	                                                direction: "Row"
	                                                });



	 var oSDASHM3TableStatusMonitorDepotContactFlex = new sap.m.FlexBox({
	     items: [//oSDASHM3TableStatusMonitorDepotContactFlexDepotName,
	             //oSDASHM3TableStatusMonitorDepotContactFlexLocation,
	             oSDASHM3TableStatusMonitorDepotContactFlexAddress,
	             oSDASHM3TableStatusMonitorDepotContactFlexCountry,
	             oSDASHM3TableStatusMonitorDepotContactFlexPostal,
	             oSDASHM3TableStatusMonitorDepotContactFlexMailid,
	             oSDASHM3TableStatusMonitorDepotContactFlexPhone,
	             oSDASHM3TableStatusMonitorDepotContactFlexFax,
	             oSDASHM3TableStatusMonitorDepotContactFlexContact
	             ],
	     direction: "Column"
	     });

		 if(sap.ui.getCore().byId("idSDASHM3TableStatusMonitorDepotContact") != undefined)
			 sap.ui.getCore().byId("idSDASHM3TableStatusMonitorDepotContact").destroy();

			 var oSDASHM3TableStatusMonitorDepotContact = new sap.m.Popover("idSDASHM3TableStatusMonitorDepotContact",{
		     title: "Depot Contact",
		     modal: false,
		     placement: contactPlacement,
		     footer:  new sap.m.Bar({
		    	 					visible : false,
		                            contentRight: [
		                                          new sap.m.Button({
		                                                           text: "Close",
		                                                           icon: "sap-icon://close",
		                                                           press: function () {
		                                                        	   sap.ui.getCore().byId("idSDASHM3TableStatusMonitorDepotContact").close();
		                                                           }
		                                                           })
		                                          ],
		                            }),
		     content: new sap.m.VBox({
		                             //width:"300px",
		                             items:  [oSDASHM3TableStatusMonitorDepotContactFlex]
		                             }),

		     }).addStyleClass("sapUiPopupWithPadding");

			 oSDASHM3TableStatusMonitorDepotContact.openBy(oEvent.getSource());

		},

		openCustBilling : function(oEvent){
			 var serialno = global3SerialNo;
	       	 var BillingNo = "";
	       	 var BillDate = "";
	       	 var Amount = "";
	       	 var DocCurrency = "";


	       	var urlToSap = "custbillingSet(IvSernr='" + serialno + "',IvRa='" + oSDASHM3JsonHeaderLines[3].value2 + "')";
	       	urlToSap = serviceDEP + urlToSap;
	       	oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	  	        busyDialog.open();
	  	        console.log(urlToSap);
	  	        OData.request({
	  	                      requestUri: urlToSap,
	  	                      method: "GET",
	  	                      dataType: 'json',
	  	                      async: false,
	  	                      headers:
	  	                      {
		  	                      "X-Requested-With": "XMLHttpRequest",
		  	                      "Content-Type": "application/json; charset=utf-8",
		  	                      "DataServiceVersion": "2.0",
		  	                      "X-CSRF-Token":"Fetch"
	  	                      }
	  	                      },
	  	                      function (data, response){
	  	                    	console.log("Get Billing Success");
	  	                    	BillingNo = data.BillingNo;
	  	                    	BillDate = data.BillDate;
	  	                    	Amount = data.Amount;
														if(Amount != "")
															Amount = thousandsep(Amount);

	  	                    	DocCurrency = data.DocCurrency;
	  	                      busyDialog.close();
	  	                    },
	  	                  function(error){
	  	                      sap.ui.commons.MessageBox.alert("Sorry, there is an error");
	  	                	  console.log("Get Billing Failure");
	  	                	  busyDialog.close();
	  	                  });


	/* Billing No */

	 var oSDASHM3TableStatusMonitorDepotBillingValueBillingNo = new sap.m.Label({
	                                               text : BillingNo,
	                                               }).addStyleClass("selectionLabels");

	 var oSDASHM3TableStatusMonitorDepotBillingLabelBillingNo = new sap.m.Label({
	     text : "Invoice No. : ",
	     labelFor: oSDASHM3TableStatusMonitorDepotBillingValueBillingNo,
	     width : "180px"
	     }).addStyleClass("selectionLabelsLabel");

	 var oSDASHM3TableStatusMonitorDepotBillingFlexBillingNo = new sap.m.FlexBox({
	                                                items: [oSDASHM3TableStatusMonitorDepotBillingLabelBillingNo,
	                                                        oSDASHM3TableStatusMonitorDepotBillingValueBillingNo
	                                                        ],
	                                                direction: "Row"
	                                                });



	 /* BillDate */

	 var oSDASHM3TableStatusMonitorDepotBillingValueBillDate = new sap.m.Label({
	                                               text : BillDate,
	                                               }).addStyleClass("selectionLabels");

	 var oSDASHM3TableStatusMonitorDepotBillingLabelBillDate = new sap.m.Label({
	     text : "Invoice Date : ",
	     labelFor: oSDASHM3TableStatusMonitorDepotBillingValueBillDate,
	     width : "180px"
	     }).addStyleClass("selectionLabelsLabel");

	 var oSDASHM3TableStatusMonitorDepotBillingFlexBillDate = new sap.m.FlexBox({
	                                                items: [oSDASHM3TableStatusMonitorDepotBillingLabelBillDate,
	                                                        oSDASHM3TableStatusMonitorDepotBillingValueBillDate
	                                                        ],
	                                                direction: "Row"
	                                                });


	 /* Amount */

	 var oSDASHM3TableStatusMonitorDepotBillingValueAmount = new sap.m.Label({
	                                               text : Amount,
	                                               }).addStyleClass("selectionLabels");

	 var oSDASHM3TableStatusMonitorDepotBillingLabelAmount = new sap.m.Label({
	     text : "Invoice Amount : ",
	     labelFor: oSDASHM3TableStatusMonitorDepotBillingValueAmount,
	     width : "180px"
	     }).addStyleClass("selectionLabelsLabel");

	 var oSDASHM3TableStatusMonitorDepotBillingFlexAmount = new sap.m.FlexBox({
	                                                items: [oSDASHM3TableStatusMonitorDepotBillingLabelAmount,
	                                                        oSDASHM3TableStatusMonitorDepotBillingValueAmount
	                                                        ],
	                                                direction: "Row"
	                                                });

	 /* DocCurrency */

	 var oSDASHM3TableStatusMonitorDepotBillingValueDocCurrency = new sap.m.Label({
	                                               text : DocCurrency,
	                                               }).addStyleClass("selectionLabels");

	 var oSDASHM3TableStatusMonitorDepotBillingLabelDocCurrency = new sap.m.Label({
	     text : "Invoice Currency : ",
	     labelFor: oSDASHM3TableStatusMonitorDepotBillingValueDocCurrency,
	     width : "180px"
	     }).addStyleClass("selectionLabelsLabel");

	 var oSDASHM3TableStatusMonitorDepotBillingFlexDocCurrency = new sap.m.FlexBox({
	                                                items: [oSDASHM3TableStatusMonitorDepotBillingLabelDocCurrency,
	                                                        oSDASHM3TableStatusMonitorDepotBillingValueDocCurrency
	                                                        ],
	                                                direction: "Row"
	                                                });



	 var oSDASHM3TableStatusMonitorDepotBillingFlex = new sap.m.FlexBox({
	     items: [
	             oSDASHM3TableStatusMonitorDepotBillingFlexBillingNo,
	             oSDASHM3TableStatusMonitorDepotBillingFlexBillDate,
	             oSDASHM3TableStatusMonitorDepotBillingFlexAmount,
	             oSDASHM3TableStatusMonitorDepotBillingFlexDocCurrency
	             ],
	     direction: "Column"
	     });

		 if(sap.ui.getCore().byId("idSDASHM3TableStatusMonitorDepotBilling") != undefined)
			 sap.ui.getCore().byId("idSDASHM3TableStatusMonitorDepotBilling").destroy();

			 var oSDASHM3TableStatusMonitorDepotBilling = new sap.m.Popover("idSDASHM3TableStatusMonitorDepotBilling",{
		     title: "Customer Billing",
		     modal: false,
		     placement: sap.m.PlacementType.Right,
		     footer:  new sap.m.Bar({
		    	 					visible : false,
		                            contentRight: [
		                                          new sap.m.Button({
		                                                           text: "Close",
		                                                           icon: "sap-icon://close",
		                                                           press: function () {
		                                                        	   sap.ui.getCore().byId("idSDASHM3TableStatusMonitorDepotBilling").close();
		                                                           }
		                                                           })
		                                          ],
		                            }),
		     content: new sap.m.VBox({
		                             //width:"300px",
		                             items:  [oSDASHM3TableStatusMonitorDepotBillingFlex]
		                             }),

		     }).addStyleClass("sapUiPopupWithPadding");

			 oSDASHM3TableStatusMonitorDepotBilling.openBy(oEvent.getSource());

		},

		openDepotPayment : function(oEvent){
			 	   var estimateno = global3EstimateNo;
	       	 var BillingNo = "";
	       	 var BillDate = "";
	       	 var Amount = "";
	       	 var DocCurrency = "";


	       	var urlToSap = "depotpaymentSet(IvEstimate='" + estimateno + "')";
	       	urlToSap = serviceDEP + urlToSap;
	       	oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	  	        busyDialog.open();
	  	        console.log(urlToSap);
	  	        OData.request({
	  	                      requestUri: urlToSap,
	  	                      method: "GET",
	  	                      dataType: 'json',
	  	                      async: false,
	  	                      headers:
	  	                      {
	  	                      "X-Requested-With": "XMLHttpRequest",
	  	                      "Content-Type": "application/json; charset=utf-8",
	  	                      "DataServiceVersion": "2.0",
	  	                      "X-CSRF-Token":"Fetch"
	  	                      }
	  	                      },
	  	                      function (data, response){
	  	                    	console.log("Get Billing Success");
	  	                    	BillingNo = data.Po;
	  	                    	BillDate = data.InvoiceDate;
	  	                    	Amount = data.InvoiceAmount;
	  	                    	DocCurrency = data.InvoiceCurrency;
	  	                        busyDialog.close();
	  	                    },
	  	                  function(error){
	  	                      sap.ui.commons.MessageBox.alert("Sorry, there is an error");
	  	                	  console.log("Get Billing Failure");
	  	                	  busyDialog.close();
	  	                  });


	/* Billing No */

	 var oSDASHM3TableStatusMonitorDepotBillingValueBillingNo = new sap.m.Label({
	                                               text : BillingNo,
	                                               }).addStyleClass("selectionLabels");

	 var oSDASHM3TableStatusMonitorDepotBillingLabelBillingNo = new sap.m.Label({
	     text : "P.O No. : ",
	     labelFor: oSDASHM3TableStatusMonitorDepotBillingValueBillingNo,
	     width : "180px"
	     }).addStyleClass("selectionLabelsLabel");

	 var oSDASHM3TableStatusMonitorDepotBillingFlexBillingNo = new sap.m.FlexBox({
	                                                items: [oSDASHM3TableStatusMonitorDepotBillingLabelBillingNo,
	                                                        oSDASHM3TableStatusMonitorDepotBillingValueBillingNo
	                                                        ],
	                                                direction: "Row"
	                                                });



	 /* BillDate */

	 var oSDASHM3TableStatusMonitorDepotBillingValueBillDate = new sap.m.Label({
	                                               text : BillDate,
	                                               }).addStyleClass("selectionLabels");

	 var oSDASHM3TableStatusMonitorDepotBillingLabelBillDate = new sap.m.Label({
	     text : "Invoice Date : ",
	     labelFor: oSDASHM3TableStatusMonitorDepotBillingValueBillDate,
	     width : "180px"
	     }).addStyleClass("selectionLabelsLabel");

	 var oSDASHM3TableStatusMonitorDepotBillingFlexBillDate = new sap.m.FlexBox({
	                                                items: [oSDASHM3TableStatusMonitorDepotBillingLabelBillDate,
	                                                        oSDASHM3TableStatusMonitorDepotBillingValueBillDate
	                                                        ],
	                                                direction: "Row"
	                                                });


	 /* Amount */

	 var oSDASHM3TableStatusMonitorDepotBillingValueAmount = new sap.m.Label({
	                                               text : Amount,
	                                               }).addStyleClass("selectionLabels");

	 var oSDASHM3TableStatusMonitorDepotBillingLabelAmount = new sap.m.Label({
	     text : "Invoice Amount : ",
	     labelFor: oSDASHM3TableStatusMonitorDepotBillingValueAmount,
	     width : "180px"
	     }).addStyleClass("selectionLabelsLabel");

	 var oSDASHM3TableStatusMonitorDepotBillingFlexAmount = new sap.m.FlexBox({
	                                                items: [oSDASHM3TableStatusMonitorDepotBillingLabelAmount,
	                                                        oSDASHM3TableStatusMonitorDepotBillingValueAmount
	                                                        ],
	                                                direction: "Row"
	                                                });

	 /* DocCurrency */

	 var oSDASHM3TableStatusMonitorDepotBillingValueDocCurrency = new sap.m.Label({
	                                               text : DocCurrency,
	                                               }).addStyleClass("selectionLabels");

	 var oSDASHM3TableStatusMonitorDepotBillingLabelDocCurrency = new sap.m.Label({
	     text : "Invoice Currency : ",
	     labelFor: oSDASHM3TableStatusMonitorDepotBillingValueDocCurrency,
	     width : "180px"
	     }).addStyleClass("selectionLabelsLabel");

	 var oSDASHM3TableStatusMonitorDepotBillingFlexDocCurrency = new sap.m.FlexBox({
	                                                items: [oSDASHM3TableStatusMonitorDepotBillingLabelDocCurrency,
	                                                        oSDASHM3TableStatusMonitorDepotBillingValueDocCurrency
	                                                        ],
	                                                direction: "Row"
	                                                });



	 var oSDASHM3TableStatusMonitorDepotBillingFlex = new sap.m.FlexBox({
	     items: [
	             oSDASHM3TableStatusMonitorDepotBillingFlexBillingNo,
	             oSDASHM3TableStatusMonitorDepotBillingFlexBillDate,
	             oSDASHM3TableStatusMonitorDepotBillingFlexAmount,
	             oSDASHM3TableStatusMonitorDepotBillingFlexDocCurrency
	             ],
	     direction: "Column"
	     });

		 if(sap.ui.getCore().byId("idSDASHM3TableStatusMonitorDepotBilling") != undefined)
			 sap.ui.getCore().byId("idSDASHM3TableStatusMonitorDepotBilling").destroy();

			 var oSDASHM3TableStatusMonitorDepotBilling = new sap.m.Popover("idSDASHM3TableStatusMonitorDepotBilling",{
		     title: "Depot Billing",
		     modal: false,
		     placement: sap.m.PlacementType.Right,
		     footer:  new sap.m.Bar({
		    	 					visible : false,
		                            contentRight: [
		                                          new sap.m.Button({
		                                                           text: "Close",
		                                                           icon: "sap-icon://close",
		                                                           press: function () {
		                                                        	   sap.ui.getCore().byId("idSDASHM3TableStatusMonitorDepotBilling").close();
		                                                           }
		                                                           })
		                                          ],
		                            }),
		     content: new sap.m.VBox({
		                             //width:"300px",
		                             items:  [oSDASHM3TableStatusMonitorDepotBillingFlex]
		                             }),

		     }).addStyleClass("sapUiPopupWithPadding");

			 oSDASHM3TableStatusMonitorDepotBilling.openBy(oEvent.getSource());

		},

		downloadSDASHM3Excel : function(){

			var html = "";
			var count = 0;

			var urlNoHash = window.location.href.replace(window.location.hash,'');
			var urlSplit = urlNoHash.split('/');
			//var base = "http://";
			var base = "";
			if(urlSplit.length > 2){
			base = base + urlSplit[0]+"//";
			for(var i=2; i<urlSplit.length - 1;i++){
			base = base + urlSplit[i]+"/";
			}
			}

			var tableWidth = 16;
			var htmlTable="";

			htmlTable +='<table border=0 cellspacing=0 style="color:#656465">';   // HTML Header - Start
			htmlTable += '<tr style="height:75px;border=1;padding-bottom:10px">'+
			'<td align=center colspan='+ (tableWidth - 12) +' style="padding-left:10px;font:bold 14px Arial;"><u>' + "Unit Overview for Serial No. " + ' for <b><FONT COLOR="RED">' + global3SerialNo +' </FONT></b> in depot <b><FONT COLOR="RED">'+ global3Depot + '</FONT></b></u></td>'+
			'<td style="border:none; padding:5px 5px 5px 0px" colspan=2 align ="right"><img src="' + base + 'images/login/login_logo.png"></img></td></tr>';

			htmlTable += '<tr  style="border:none;height:20px;"></tr>';
	       	htmlTable += '<td valign="top" colspan='+ (4) +' style="padding-left:10px;">';


			htmlTable += '<br>';
			htmlTable += '<br>';

			/* Record Type and Record Details Table

			htmlTable += '<div><b><u>Overview</u></b></div>';
			htmlTable += '<br>';

			var processvalue = "";
			for(var i=0; i<oSDASHM3JsonProcesses.length;i++){
					if(oSDASHM3JsonProcesses[i].key == oSDASHM3JsonRecordType[0].value1){
						processvalue = oSDASHM3JsonProcesses[i].text;
						console.log(processvalue)
					}
				}

			htmlTable += '<table align=left border=1 cellspacing=0 style="color:#656465;padding-left:0px;">';
			// htmlTable += "<tr>";
			// htmlTable += '<td align=center style="font: 12px Arial;">'+"Record Type"+"</td>";
			// htmlTable += '<td align=center style="font: 12px Arial;">'+processvalue+"</td>";
			// htmlTable += "</tr>";

			var oSDASHM3JsonRecordLinesPrint = [];
			for(var i=0;i<oSDASHM3JsonRecordLines.length;i++){
				oSDASHM3JsonRecordLinesPrint.push({
					"label1" : oSDASHM3JsonRecordLines[i].label1,
					"value1" : oSDASHM3JsonRecordLines[i].value1,
					"label2" : oSDASHM3JsonRecordLines[i].label2,
					"value2" : oSDASHM3JsonRecordLines[i].value2,
					"label3" : oSDASHM3JsonRecordLines[i].label3,
					"value3" : oSDASHM3JsonRecordLines[i].value3,
					"label4" : oSDASHM3JsonRecordLines[i].label4,
					"value4" : oSDASHM3JsonRecordLines[i].value4
				});
			}
			$.each(oSDASHM3JsonRecordLinesPrint, function(i, item) {
			htmlTable += "<tr>";
			for (var key in item){
			htmlTable += '<td align=center style="font: 12px Arial;">'+item[key]+"</td>";
			}
			htmlTable += "</tr>";
			});
			htmlTable += '</table>';

			htmlTable += '<br></br>';
			htmlTable += '<br></br>';
			htmlTable += '<br></br>';
			htmlTable += '<br></br>'; */

			/* Record Type and Record Details Table */
			var oSDASHM3JsonRecordLinesLoc = [];
			for(var i=0; i<oSDASHM3JsonRecordLines.length; i++){

				var processvalue = "";
				for(var j=0; j<oSDASHM3JsonProcesses.length;j++){
						if(oSDASHM3JsonProcesses[j].key == oSDASHM3JsonRecordLines[i].value1){
							processvalue = oSDASHM3JsonProcesses[j].text;
							console.log(processvalue)
						}
					}

				oSDASHM3JsonRecordLinesLoc.push({
					label1 : oSDASHM3JsonRecordLines[i].label1,
					value1 : processvalue,
					label2 : oSDASHM3JsonRecordLines[i].label2,
					value2 : oSDASHM3JsonRecordLines[i].value2
					// label3 : oSDASHM3JsonRecordLines[i].label3,
					// value3 : oSDASHM3JsonRecordLines[i].value3,
					// label4 : oSDASHM3JsonRecordLines[i].label4,
					// value4 : oSDASHM3JsonRecordLines[i].value4
				});
			}
			htmlTable += '<div><b><u>Overview</u></b></div>';
			htmlTable += '<br></br>';
			htmlTable += '<table align=left border=1 cellspacing=0 style="color:#656465;padding-left:0px;">';

			$.each(oSDASHM3JsonRecordLinesLoc, function(i, item) {
			htmlTable += "<tr>";
			for (var key in item){
			htmlTable += '<td align=center style="font: 12px Arial;">'+item[key]+"</td>";
			}
			htmlTable += "</tr>";
			});
			htmlTable += '</table>';

			htmlTable += '<br></br>';
			htmlTable += '<br></br>';
			htmlTable += '<br></br>';
			htmlTable += '<br></br>';
			htmlTable += '<br></br>';
			htmlTable += '<br></br>';

			/* M&R Summary table */

			htmlTable += '<div><b><u>M&R Summary</u></b></div>';
			htmlTable += '<br></br>';
			htmlTable += '<table align=left border=1 cellspacing=0 style="color:#656465;padding-left:0px;">';

			$.each(oSDASHM3JsonHeaderLines, function(i, item) {
			htmlTable += "<tr>";
			for (var key in item){
			htmlTable += '<td align=center style="font: 12px Arial;">'+item[key]+"</td>";
			}
			htmlTable += "</tr>";
			});
			htmlTable += '</table>';

			htmlTable += '<br></br>';
			htmlTable += '<br></br>';
			htmlTable += '<br></br>';
			htmlTable += '<br></br>';
			htmlTable += '<br></br>';
			htmlTable += '<br></br>';

			/* Estimate Details table */

			htmlTable += '<div><b><u>Estimate Details</u></b></div>';
			htmlTable += '<br></br>';
			htmlTable += '<table align=left border=1 cellspacing=0 style="color:#656465;padding-left:0px;">';


			var oSDASHM3JsonEstimateLinesPrint = [];
			for(var i=0;i<oSDASHM3JsonEstimateLines.length;i++){
				oSDASHM3JsonEstimateLinesPrint.push({
					"S. No" : (oSDASHM3JsonEstimateLines[i].sno != "")?parseInt(oSDASHM3JsonEstimateLines[i].sno):"",
					"Location" : oSDASHM3JsonEstimateLines[i].location,
					"Location Text" : oSDASHM3JsonEstimateLines[i].locationt,
					"Component" : oSDASHM3JsonEstimateLines[i].component,
					"Component Text" : oSDASHM3JsonEstimateLines[i].componentt,
					"Damage" : oSDASHM3JsonEstimateLines[i].damage,
					"Damage Text" : oSDASHM3JsonEstimateLines[i].damaget,
					"Material" : oSDASHM3JsonEstimateLines[i].material,
					"Material Text" : oSDASHM3JsonEstimateLines[i].materialt,
					"Repair" : oSDASHM3JsonEstimateLines[i].repair,
					"Repair Text" : oSDASHM3JsonEstimateLines[i].repairt,
					"Length" : oSDASHM3JsonEstimateLines[i].length,
					"Width" : oSDASHM3JsonEstimateLines[i].width,
					//"Measure" : oSDASHM3JsonEstimateLines[i].measure,
					"Quantity" : oSDASHM3JsonEstimateLines[i].qty,
					"Hours" : oSDASHM3JsonEstimateLines[i].hrs,
					"Lab. Cost" : oSDASHM3JsonEstimateLines[i].labcost,
					"Mat. Cost" : oSDASHM3JsonEstimateLines[i].matcost,
					"Reponsibility" : oSDASHM3JsonEstimateLines[i].resp,
					"Total" : oSDASHM3JsonEstimateLines[i].total
					//"Bulletin" : oSDASHM3JsonEstimateLines[i].bulletin,

				});
			}

			htmlTable += "<tr>";
			for (var key in oSDASHM3JsonEstimateLinesPrint[0]){
			//alert("key : "+ key);
			htmlTable += '<td align=center style="font: bold 12px Arial;">'+key+"</td>";
			//console.log(key + ' = ' + item[key]);
			}
			htmlTable += "</tr>";

			$.each(oSDASHM3JsonEstimateLinesPrint, function(i, item) {
			htmlTable += "<tr>";
			for (var key in item){
			htmlTable += '<td align=center style="font: 12px Arial;">'+item[key]+"</td>";
			}
			htmlTable += "</tr>";
			});

			htmlTable += '</table>';
			htmlTable += '<br></br>';
			htmlTable += '<br></br>';
			var oSDASHM3FlexNotesLine1 = sap.ui.getCore().byId("idSDASHM3TextAreaNotes1").getValue();
			if(oSDASHM3FlexNotesLine1 != ''){
			htmlTable += '<tr  style="border:none;padding-bottom:10px">';
			htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Notes 1 : <b>' + oSDASHM3FlexNotesLine1 + '</b></td>';
			htmlTable += '</tr>';
			}

			var oSDASHM3FlexNotesLine2 = sap.ui.getCore().byId("idSDASHM3TextAreaNotes2").getValue();
			if(oSDASHM3FlexNotesLine2 != ''){
			htmlTable += '<tr  style="border:none;padding-bottom:10px">';
			htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Notes 2 : <b>' + oSDASHM3FlexNotesLine2 + '</b></td>';
			htmlTable += '</tr>';
			}

			var oSDASHM3FlexNotesLine3 = sap.ui.getCore().byId("idSDASHM3TextAreaNotes3").getValue();
			if(oSDASHM3FlexNotesLine3 != ''){
			htmlTable += '<tr  style="border:none;padding-bottom:10px">';
			htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Notes 3 : <b>' + oSDASHM3FlexNotesLine3 + '</b></td>';
			htmlTable += '</tr>';
			}

			var oSDASHM3FlexNotesLine4 = sap.ui.getCore().byId("idSDASHM3TextAreaNotes4").getValue();
			if(oSDASHM3FlexNotesLine4 != ''){
			htmlTable += '<tr  style="border:none;padding-bottom:10px">';
			htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Notes 4 : <b>' + oSDASHM3FlexNotesLine4 + '</b></td>';
			htmlTable += '</tr>';
			}

			var oSDASHM3FlexNotesLine5 = sap.ui.getCore().byId("idSDASHM3TextAreaNotes5").getValue();
			if(oSDASHM3FlexNotesLine5 != ''){
			htmlTable += '<tr  style="border:none;padding-bottom:10px">';
			htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Notes 5 : <b>' + oSDASHM3FlexNotesLine5 + '</b></td>';
			htmlTable += '</tr>';
			}

			htmlTable += '</td>';


			htmlTable += "</table>";   // HTML Header - End
			var func = "excel";
			if(func == "print"){
			html +='<style>@page{size:landscape;}</style><html><head><title></title></head><body >';
			//alert("Print");
			html += "<div>";
			html +=htmlTable+"</div>";
			html +='</body></html>';
			var newWin = window.open();
			newWin.document.write(html);
			newWin.print();
			}else if(func == "excel"){
			//alert("Export");
			var uri = 'data:application/vnd.ms-excel;base64,',
			template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
			+'<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->'
			+'<head></head>'
			+'<body>'+ htmlTable  +'</body></html>',
			base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
			format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }

			// Open Excel
			/*                   if (!table.nodeType)
			table = document.getElementById(table)*/
			var ctx = {worksheet: "M&R Unit Overview" || 'Worksheet', table: htmlTable};
			//window.location.href = uri + base64(format(template, ctx));
			if ((navigator.appName == 'Microsoft Internet Explorer') || (!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)))
			{
			// var byteCharacters = atob(uri + base64(format(template, ctx)));
			var blobObject = b64toBlob(base64(format(template, ctx)), 'application/vnd.ms-excel');
			//window.navigator.msSaveBlob(blobObject, 'msSaveBlob_testFile.xls'); //only with save option
			window.navigator.msSaveOrOpenBlob(blobObject, 'downloadfile.xls'); //save and open both option
			}else
			{
			//window.location.href = uri + base64(format(template, ctx));
			//window.open(uri + base64(format(template, ctx)));

			var file = new Blob([htmlTable], {type:"application/vnd.ms-excel"});

			var url = URL.createObjectURL(file);

			var a = $("<a />", {
					href: url,
					download: global3SerialNo + ".xls",
			})
			.appendTo("body").get(0).click();

			}
			}



		},

		/* Delete and Reverse Status */

		deleteSDASHM3Status : function(){

			var urlToSap = "deleteReverseSet?$filter=ISernr eq '" + global3SerialNo +
	                     //"' and IEqunr eq '" + global3Equnr +
	                     "' and IDepot eq '" + global3Depot +
											 "' and IAufnr eq '" + global3EstimateNo +
											 "' and IAuart eq '" + global3DocType +
											 "'";
		  urlToSap = serviceDEP + urlToSap;
			jsonSDASHM3DeleteReverseError = [];
			oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	    busyDialog.open();
	    console.log(urlToSap);
	    OData.request({
	                  requestUri: urlToSap,
	                  method: "GET",
	                  dataType: 'json',
	                  async: false,
	                  headers:
	                  {
	                  "X-Requested-With": "XMLHttpRequest",
	                  "Content-Type": "application/json; charset=utf-8",
	                  "DataServiceVersion": "2.0",
	                  "X-CSRF-Token":"Fetch"
	                  }
	                  },
	                  function (data, response){
											jsonSDASHM3DeleteReverseError = data.results;
											var oSDASHM3TableDeleteReverseError = new sap.ui.table.Table({
												//visibleRowCount: 6,
												//columnHeaderVisible : false,
												width: '100%',
												selectionMode : sap.ui.table.SelectionMode.None
											}).addStyleClass("sapUiSizeCompact tblBorder1");

											oSDASHM3TableDeleteReverseError.addColumn(new sap.ui.table.Column({
												 label: new sap.ui.commons.Label({text: "Type", textAlign: "Left"}).addStyleClass("wraptextcol"),
												 template: new sap.ui.commons.TextView().bindProperty("text", "Type").addStyleClass("borderStyle1"),
												 resizable:false,
												 width:"20%"
											}));

											oSDASHM3TableDeleteReverseError.addColumn(new sap.ui.table.Column({
												 label: new sap.ui.commons.Label({text: "Message", textAlign: "Left"}).addStyleClass("wraptextcol"),
												 template: new sap.ui.commons.TextView().bindProperty("text", "Message").addStyleClass("borderStyle1"),
												 resizable:false,
												 width:"80%"
											}));

										 var oSDASHM3ModelDeleteReverseError = new sap.ui.model.json.JSONModel();
										 oSDASHM3ModelDeleteReverseError.setData({modelData: jsonSDASHM3DeleteReverseError});


										 oSDASHM3TableDeleteReverseError.setModel(oSDASHM3ModelDeleteReverseError);
										 oSDASHM3TableDeleteReverseError.setVisibleRowCount(jsonSDASHM3DeleteReverseError.length);
										 oSDASHM3TableDeleteReverseError.bindRows("/modelData");

										 var oDialog1Close = new sap.ui.commons.Button({
												 text : "Close",
												 //styled:false,
												 visible:true,
												 //type:sap.m.ButtonType.Unstyled,
												 //icon: sap.ui.core.IconPool.getIconURI("email"),
												 press:function(oEvent){
													 oDialog1.close();

								           var oSDASHM3 = new sdashm3();
								           oSDASHM3.setValueHeaderDetails(global3isFromSerialHistory, global3isProcessChange);
												 }
										 });


										 var oDialog1 = new sap.ui.commons.Dialog({
											 width : "50%",
											 showCloseButton : false,
											 modal : true
										 });
											//oDialog1.setTitle("My first Dialog");
											//var oText = new sap.ui.commons.TextView({text: "Hello World!"});
											oDialog1.addContent(new sap.m.FlexBox({direction : "Column",
														items : [oSDASHM3TableDeleteReverseError, new sap.m.Label({width : "15px"}), oDialog1Close]
											}));
											//oDialog1.addButton(new sap.ui.commons.Button({text: "Close", press:function(){oDialog1.close();}}));

											oDialog1.open();
	                   	busyDialog.close();
		        },
		        function(error, results){
		      	  console.log("Delete and Reverse Failure");
		      	  busyDialog.close();
		        });

		},

		fnCallbackMessageBoxDelete : function(sResult) {
			var oSDASHM3 = new sdashm3();
			if(sResult == "YES"){
				oSDASHM3.deleteSDASHM3Status(sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelDelete"));
			}
		}

	});

function chunkArrayInGroups(arr, size) {
	  var result = [];
	  var pos = 0;
	  while (pos < size) {
	    result.push(arr.slice(pos, pos + size));
	    pos += size;
	  }
	  return result;
	}

function chunkv2(arr,size) {

    var result = [];
    for(var i = 0; i < arr.length; i++) {
        if(i%size === 0)
            // Push a new array containing the current value to the result array
            result.push([arr[i]]);
        else
            // Push the current value to the current array
            result[result.length-1].push(arr[i]);
    }
    return result;

}

function isPIC(value) {
	  var pic_types = new Array("PNG", "JPG", "JPEG", "BMP", "GIF",
																"png", "jpg", "jpeg", "bmp", "gif");
	  return pic_types.indexOf(value) > -1;
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

function isInArraySJSONProcess(value, array) {
	  //return array.indexOf(value) > -1;
		var retValue = undefined;
		for (var x=0; x < array.length; x++) {
        if (array[x].key === value) {
            retValue = array[x];
        }
    }
		return retValue;
}
