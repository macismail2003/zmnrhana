jQuery.sap.require("sap.ui.model.json.JSONModel");

// Button Visible : Functionality - Apply below rule
/* Lessor Survey Request -
	Except AWAP and AVLB;
	contains APPD; Does not contain CFDS

	Additional -
	AUTH

	Pre Delivery -
	AVLB

	Customer Approval -
	contains AWAP

	CW Approval -
	does not contain AWAP */

	// MAC04072019_APS981 - Picture icon displayed but no photo available - WEST Units

	// MAC04072019_APS984 - Add last action column to excel download

	// MAC09072019_SERNR_EQUNR_DIFF_ISSUE - For serial number and equipment number different issue

var globalSDASHM2Currency = "LOC";
var globalSDASHM2ExchangeRate = "";
var globalSDASHM2LocalCurrency = "";
var oSDASHMJsonEquipmentLevel = [];
var oSDASHMJsonTariffLevel = [];
var oSDASHMJsonEquipmentLevelEDILIST = [];
var globalDepot = "";
var globalUrlDepotView2Set = "";
var globalSDASHM2TableEquipmentLevelTPC = null;
var globalSDASHM2TableTariffTPC = null;
var globalColumnStatus = "";
var globalSaleRed = false;
var global3CustApprEnable = "";
var globalIsEstimateReefer = false;
var oSDASHM2DepotView2RefreshResult = [];

var oSDASHM2JsonLabCost = [];
var oSDASHM2ModelLabCost = new sap.ui.model.json.JSONModel();

var oSDASHM2JsonCWApprove = [];
var oSDASHM2ModelCWApprove =  new sap.ui.model.json.JSONModel();

var oSDASHM2JsonCSApprove = [];
var oSDASHM2ModelCSApprove =  new sap.ui.model.json.JSONModel();

var oSDASHM1PopoverAddEst = "";
var oSDASHMJsonEquipmentLevelSearched = [];

var globalCwLocmax = 0;
var globalDiscountmax = 0;

var oSDASHM2ValueAddEstSimResult = {
		labcost : "",
		redec : "",
		grade : ""
};

sap.ui.model.json.JSONModel.extend("sdashm2", {

	/* SDASHM2 CHSTATUSBUTTON - Check Statuses for Button */

	checkStatusForButton : function(button){
		// CSA - Customer Approval Check - CustApprEnable
		// LSR - Lessor Survey Request - LsrEnable
		// ADD - Additional Estimate - AddtEnable, PredelEnable
		// CWA - CW Approval - CwApprEnable
		// APP - HOLD to AUTH Approval - Isawap

		var checkField = "";
		switch (button) {
			case "CSA":
					checkField = "CustApprEnable";
					break;
			case "LSR":
					checkField = "LsrEnable";
					break;
			case "ADD":
					checkField = "AddtEnable";
					break;
			case "CWA":
					checkField = "CwApprEnable";
					break;
			case "APP":
					checkField = "Isawap";
					break;
		}
		var errorEstimateMessage = "";
		var isValid = true;
		var checkFieldPreDel = "PredelEnable";
		var isAUTHAPPDSelected = false;
		var isAVLBSelected = false;
		var arraySelLines = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
		if(checkField == "AddtEnable"){
			for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
					var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
					if(oDetData != undefined){
						var realPath = oDetData.getPath().split('/')[2];
						if(arraySelLines.indexOf(i) != -1 && getCHSTATUSValue(oSDASHMJsonEquipmentLevel[realPath], checkField) == "X"){
								isAUTHAPPDSelected = true;
						}
						if(arraySelLines.indexOf(i) != -1 && getCHSTATUSValue(oSDASHMJsonEquipmentLevel[realPath], checkFieldPreDel) == "X"){
								isAVLBSelected = true;
						}
					}
			}

			if(isAUTHAPPDSelected == false && isAVLBSelected == false){
				isValid = false;
				errorEstimateMessage = "Please select either AUTH APPD or AVLB units";
			}else if(isAUTHAPPDSelected == true && isAVLBSelected == true){
				isValid = false;
				errorEstimateMessage = "Please select either AUTH APPD or AVLB units; Not both";
			}else if(isAUTHAPPDSelected == true){
				isValid = true;
				errorEstimateMessage = "Additional";
			}else if(isAVLBSelected == true){
				isValid = true;
				errorEstimateMessage = "Pre-delivery";
			}

		}else{

			for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
				if(isValid){
						var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
						if(oDetData != undefined){
						var realPath = oDetData.getPath().split('/')[2];
								if(arraySelLines.indexOf(i) != -1 && getCHSTATUSValue(oSDASHMJsonEquipmentLevel[realPath], checkField) == ""){
									isValid = false;
								}else if(arraySelLines.indexOf(i) != -1 && getCHSTATUSValue(oSDASHMJsonEquipmentLevel[realPath], checkField) == "X"){

								}
						}
					}else{

					}
				}

		}
		var validMessage = {
			isValid : isValid,
			errorMessage : errorEstimateMessage
		};

		return validMessage;

	},

	/* SDASHM2 - Approve Estimates */

	approveEstimates : function(depots, orders, references, equnrs, amounts, discounta, discountp){
		var oCurrent = this;
		var urlToSap = "referenceSet?$filter=Order eq '" + orders
		 											+ "' and Depot eq '" + depots
													+ "' and Reference eq '" + references
													+ "' and Amount eq '" + amounts
													+ "' and Equnr eq '" + equnrs
													+ "' and Discounta eq '" + discounta
													+ "' and Discountp eq '" + discountp
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
                      busyDialog.close();

                      var approveResult = data.results;

                      if(approveResult.length == 0){
                    	  sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                    	  console.log("Seaco DB Approve Successful; but returned nothing");
                      }else if(approveResult[0].Result == ''){
                    	  sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                    	  console.log("Seaco DB Approve Successful; but returned nothing");
                      }else{
                    	  sap.ui.commons.MessageBox.alert("Approved!");
                    	  console.log("Seaco DB Approve Successful");
                    	  //oCurrent.setSDASHM2Values("", "", "", globalUrlDepotView2Set);
												oCurrent.refreshSelectedUnits(); // REFRESHSELUNITS
                    }
                    },
                  function(error){
                    	sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                    	console.log("Seaco DB Approve Failure");
                	  busyDialog.close();
                  });


	},

	/* SDASHM2 - Get PDF from SAP */

	getPdfFromSap : function(sorder, serialnos, filetype){

		// if(filetype == "Z"){
    //   if(jsonSDASHM3Documents.length == 0 && jsonSDASHM3Pictures.length == 0){
    //       return;
    //   }
    // }

		oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
		busyDialog.open();

		var sRead = "/pdfSet(Sorder='" + sorder + "',IvDownload='" + filetype + "',Serialnos='" + serialnos + "')" + "/$value" ;

	       oModel.read( sRead, null, null, true, function(oData, oResponse){
	    	  busyDialog.close();
              var pdfURL = oResponse.requestUri;
              window.open(pdfURL);
	        },function(error){
	        	busyDialog.close();
	            alert("Read failed");
	        });

	},

	/* SDASHM2 - Page - Seaco Dashboard page 2 */

	createSDASHM2Page : function(){

		var oCurrent = this;

		/* SDASHM2 - Section - Equipment Level */

		var oSDASHM2ContentEquipmentLevel = oCurrent.setContentEquipmentLevel();

		/* SDASHM2 - Flexbox - Final */

		// var oSDASHM2ContentFinal = new sap.m.FlexBox({
		//          items: [
		//                 oSDASHM2ContentEquipmentLevel
		//        ],
		//        direction : "Column",
		//        visible: true,
		// }).addStyleClass("marginLeft20");

		return oSDASHM2ContentEquipmentLevel;

	},

	/* SDASHM2 - Function - Search Seaco Dashboard Equipment Level */

	searchSDASHM2EquipmentLevel : function(text){

		//oSDASHM2TableEquipmentLevel.clearSelection();
		//var oSDASHMJsonEquipmentLevelSearched = [];

		sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").clearSelection();
    oSDASHMJsonEquipmentLevelSearched = [];

		if(text == ""){

			var oSDASHM2ModelEquipmentLevel = new sap.ui.model.json.JSONModel();
      		oSDASHM2ModelEquipmentLevel.setData({modelData: oSDASHMJsonEquipmentLevel});

      		// Set Local Currency to a global variable
      		globalSDASHM2LocalCurrency = oSDASHMJsonEquipmentLevel[0].estimatecurrency;

          	var oSDASHM2TableEquipmentLevel = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel");
          	oSDASHM2TableEquipmentLevel.setModel(oSDASHM2ModelEquipmentLevel);
          	oSDASHM2TableEquipmentLevel.bindRows("/modelData");

          	var oSDASHMJsonEquipmentLevelLength = oSDASHMJsonEquipmentLevel.length;
          	if(oSDASHMJsonEquipmentLevelLength < 18){
          		//oSDASHM2TableEquipmentLevel.setVisibleRowCount(oSDASHMJsonEquipmentLevelLength);
          		oSDASHM2TableEquipmentLevel.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
          	}
          	else{
          		//oSDASHM2TableEquipmentLevel.setVisibleRowCount(17);
          		oSDASHM2TableEquipmentLevel.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
          	}

		}else{

		for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
			if(oSDASHMJsonEquipmentLevel[i].serialno.search(text) != -1){
				oSDASHMJsonEquipmentLevelSearched.push(oSDASHMJsonEquipmentLevel[i]);
			}else if(oSDASHMJsonEquipmentLevel[i].estimateno.search(text) != -1){
				oSDASHMJsonEquipmentLevelSearched.push(oSDASHMJsonEquipmentLevel[i]);
			}
		}

		if(oSDASHMJsonEquipmentLevelSearched.length == 0){
			sap.ui.commons.MessageBox.alert("No data found!");
		}else{
			var oSDASHM2ModelEquipmentLevel = new sap.ui.model.json.JSONModel();
	  		oSDASHM2ModelEquipmentLevel.setData({modelData: oSDASHMJsonEquipmentLevelSearched});

	  		// Set Local Currency to a global variable
	  		globalSDASHM2LocalCurrency = oSDASHMJsonEquipmentLevelSearched[0].estimatecurrency;

	      	var oSDASHM2TableEquipmentLevel = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel");
	      	oSDASHM2TableEquipmentLevel.setModel(oSDASHM2ModelEquipmentLevel);
	      	oSDASHM2TableEquipmentLevel.bindRows("/modelData");

	      	var oSDASHMJsonEquipmentLevelSearchedLength = oSDASHMJsonEquipmentLevelSearched.length;
	      	if(oSDASHMJsonEquipmentLevelSearchedLength < 18){
	      		//oSDASHM2TableEquipmentLevel.setVisibleRowCount(oSDASHMJsonEquipmentLevelSearchedLength);
	      		oSDASHM2TableEquipmentLevel.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	      	}
	      	else{
	      		//oSDASHM2TableEquipmentLevel.setVisibleRowCount(17);
	      		oSDASHM2TableEquipmentLevel.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	      	}
		}
		}

	},

	/* SDASHM2 REFRESHSELUNITS - Refresh only selected units */

	refreshSelectedUnits : function(){
			var oCurrent = this;
			var selUnit = "";

			var oSDASHMJsonEquipmentLevelRefresh = [];
			oSDASHM2DepotView2RefreshResult = [];
			var arraySelLines = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
			busyDialog.open();
			for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
				if(arraySelLines.indexOf(i) != -1){
					var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
					if(oDetData != undefined){
						oSDASHMJsonEquipmentLevelRefresh.push(oSDASHMJsonEquipmentLevel[realPath]);
						var realPath = oDetData.getPath().split('/')[2];
						selUnit = oSDASHMJsonEquipmentLevel[realPath].serialno;

						var urlToSap = "";
						urlToSap = "depotview2eqSet?$filter=Equnr eq '" + selUnit + "'";
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

								oSDASHM2DepotView2RefreshResult.push(data.results[0]);

							},
							function(err){

							});
					}
				}
			}

			depotView2Result = oSDASHM2DepotView2RefreshResult;

			// Removed Units	- loop over only selected units
			var isUnitFound = false;
			var unitNotFound = [];
			for(var x=0; x<oSDASHMJsonEquipmentLevelRefresh.length;x++){
				isUnitFound = false;
				for(var j=0; j<depotView2Result.length; j++){
					isUnitFound = true;
				}
				if(isUnitFound == false)
					unitNotFound.push({
						serialno : oSDASHMJsonEquipmentLevelRefresh[x].serialno
					});
			}

			// Modified Units
			for(var x=0; x<oSDASHMJsonEquipmentLevel.length;x++){
				for(var j=0; j<depotView2Result.length; j++){
							if(oSDASHMJsonEquipmentLevel[x].serialno == depotView2Result[j].Zserno){

											oSDASHMJsonEquipmentLevel[x].isUnitFound = true;
											var offdate = "";
											var offdatex = "";
											var estdate = "";
											var estdatex = "";
											if(depotView2Result[j].Zoffdate != null){
											var vMessageDate = depotView2Result[j].Zoffdate.split("(");
											var vMsgDate = vMessageDate[1].split(")");
											//var vformattedMessageDate = new Date(Number(vMsgDate[0]));
											offdate = dateFormat(new Date(Number(vMsgDate[0])), 'dd/mm/yyyy',"UTC"); // MACC_17022017 changed from '-' to '/'
											offdatex = offdate.substr(6,4) + offdate.substr(3,2) + offdate.substr(0,2);
											}

											if(depotView2Result[j].Zestdate != null){
													var vMessageDate = depotView2Result[j].Zestdate.split("(");
													var vMsgDate = vMessageDate[1].split(")");
													//var vformattedMessageDate = new Date(Number(vMsgDate[0]));
													estdate = dateFormat(new Date(Number(vMsgDate[0])), 'dd/mm/yyyy',"UTC"); // MACC_17022017 changed from '-' to '/'
													estdatex = estdate.substr(6,4) + estdate.substr(3,2) + estdate.substr(0,2);
											}

											var isawap = true;
											if(depotView2Result[j].Isawap == 'X'){
												isawap = true;
											}else{
												isawap = false;
											}

											if(depotView2Result[j].TabDays == ""){
												tabdayslocal = "";
											}else{
												tabdayslocal =	(depotView2Result[j].TabDays == "00000")?0:parseInt(depotView2Result[j].TabDays);
											}

											if(depotView2Result[j].ZtotestUsd == "")
												depotView2Result[j].ZtotestUsd = "0.00";

												if(depotView2Result[j].Ztotest == "")
													depotView2Result[j].Ztotest = "0.00";


												oSDASHMJsonEquipmentLevel[x].depotcode = depotView2Result[j].Zdepot;
												oSDASHMJsonEquipmentLevel[x].depotname = depotView2Result[j].Zdepotname;

												oSDASHMJsonEquipmentLevel[x].isChecked = false;
												//sno = "2";

												oSDASHMJsonEquipmentLevel[x].serialno = depotView2Result[j].Zserno;
												oSDASHMJsonEquipmentLevel[x].equnr = depotView2Result[j].Zequnr;
												oSDASHMJsonEquipmentLevel[x].unittype = depotView2Result[j].Zunitype;
												oSDASHMJsonEquipmentLevel[x].subtype = depotView2Result[j].SubType;
												oSDASHMJsonEquipmentLevel[x].pcate = depotView2Result[j].Zpcat;
												oSDASHMJsonEquipmentLevel[x].status = depotView2Result[j].Zstatus;
												oSDASHMJsonEquipmentLevel[x].statusdays = depotView2Result[j].Statusdays;
												oSDASHMJsonEquipmentLevel[x].statusdayshighlight = depotView2Result[j].DaysExceeded;
												oSDASHMJsonEquipmentLevel[x].age = depotView2Result[j].Zage;
												oSDASHMJsonEquipmentLevel[x].manuf = depotView2Result[j].MfgMonth;

												oSDASHMJsonEquipmentLevel[x].offhirelocation = depotView2Result[j].Ext1;
												oSDASHMJsonEquipmentLevel[x].offhiredate = offdate;
												oSDASHMJsonEquipmentLevel[x].offhiredatex = offdatex;

												oSDASHMJsonEquipmentLevel[x].estimateno = depotView2Result[j].Zestno;
												oSDASHMJsonEquipmentLevel[x].estimatetype = depotView2Result[j].Zestimate;
												oSDASHMJsonEquipmentLevel[x].estimatedate = estdate;
												oSDASHMJsonEquipmentLevel[x].estimatedatex = estdatex;
												oSDASHMJsonEquipmentLevel[x].numestimateamt = parseFloat(depotView2Result[j].Zestamt);
												oSDASHMJsonEquipmentLevel[x].numaddestimateamt = parseFloat(depotView2Result[j].Zaddest);
												oSDASHMJsonEquipmentLevel[x].numtotestimateamt = (depotView2Result[j].Ztotest == "")?0:parseFloat(depotView2Result[j].Ztotest.split(',').join(''));
												oSDASHMJsonEquipmentLevel[x].numtotestimateamtusd = (depotView2Result[j].ZtotestUsd == "")?0:parseFloat(depotView2Result[j].ZtotestUsd.split(',').join(''));

												oSDASHMJsonEquipmentLevel[x].estimatecurrency = depotView2Result[j].Zestcur;
												oSDASHMJsonEquipmentLevel[x].documentcurrency = depotView2Result[j].Zdoccur;
												oSDASHMJsonEquipmentLevel[x].estimatecurrencyusd = "USD";
												oSDASHMJsonEquipmentLevel[x].exchange = depotView2Result[j].Zexcur;
												oSDASHMJsonEquipmentLevel[x].cwamt = "";
												oSDASHMJsonEquipmentLevel[x].customer = depotView2Result[j].Customer;
												oSDASHMJsonEquipmentLevel[x].customername = depotView2Result[j].Customername;
												oSDASHMJsonEquipmentLevel[x].cwrepaircost = depotView2Result[j].CwReprc;

												oSDASHMJsonEquipmentLevel[x].estimateamt = depotView2Result[j].Zestamt;
												oSDASHMJsonEquipmentLevel[x].addestimateamt = depotView2Result[j].Zaddest;
												oSDASHMJsonEquipmentLevel[x].totestimateamt = thousandsep(depotView2Result[j].Ztotest);
												oSDASHMJsonEquipmentLevel[x].totestimateamtusd = thousandsep(depotView2Result[j].ZtotestUsd);
												oSDASHMJsonEquipmentLevel[x].cwamtloc = thousandsep(depotView2Result[j].CwamtLoc);
												oSDASHMJsonEquipmentLevel[x].numcwamtloc = (depotView2Result[j].CwamtLoc == "")?0:parseFloat(depotView2Result[j].CwamtLoc.split(',').join(''));
												oSDASHMJsonEquipmentLevel[x].cwamtusd = thousandsep(depotView2Result[j].CwamtUsd);
												oSDASHMJsonEquipmentLevel[x].numcwamtusd = (depotView2Result[j].CwamtUsd == "")?0:parseFloat(depotView2Result[j].CwamtUsd.split(',').join(''));

												oSDASHMJsonEquipmentLevel[x].totalrepaircost = thousandsep(depotView2Result[j].TotRepCost);
												oSDASHMJsonEquipmentLevel[x].numtotalrepaircost = (depotView2Result[j].TotRepCost == "")?0:parseFloat(depotView2Result[j].TotRepCost.split(',').join(''));

												oSDASHMJsonEquipmentLevel[x].totalrepaircostusd = thousandsep(depotView2Result[j].TotRepCostUsd);
												oSDASHMJsonEquipmentLevel[x].numtotalrepaircostusd = (depotView2Result[j].TotRepCostUsd == "")?0:parseFloat(depotView2Result[j].TotRepCostUsd.split(',').join(''));

												oSDASHMJsonEquipmentLevel[x].lesseecost = thousandsep(depotView2Result[j].LesseeCost);
												oSDASHMJsonEquipmentLevel[x].numlesseecost = (depotView2Result[j].LesseeCost == "")?0:parseFloat(depotView2Result[j].LesseeCost.split(',').join(''));

												oSDASHMJsonEquipmentLevel[x].lesseecostusd = thousandsep(depotView2Result[j].LesseeCostUsd);
												oSDASHMJsonEquipmentLevel[x].numlesseecostusd = (depotView2Result[j].LesseeCostUsd == "")?0:parseFloat(depotView2Result[j].LesseeCostUsd.split(',').join(''));

												oSDASHMJsonEquipmentLevel[x].mnrcomment = depotView2Result[j].Mrcmt;
												oSDASHMJsonEquipmentLevel[x].mfgdate = depotView2Result[j].MfgMonth;

												oSDASHMJsonEquipmentLevel[x].tabdays = tabdayslocal;
												oSDASHMJsonEquipmentLevel[x].numtabdays = tabdayslocal;

												oSDASHMJsonEquipmentLevel[x].salesgrade = depotView2Result[j].Zsales;
												oSDASHMJsonEquipmentLevel[x].numsalesgrade = (depotView2Result[j].Zsales == "")?0:parseFloat(depotView2Result[j].Zsales.split(',').join(''));

												oSDASHMJsonEquipmentLevel[x].criteria = depotView2Result[j].Zins;
												oSDASHMJsonEquipmentLevel[x].isawap = isawap;

												oSDASHMJsonEquipmentLevel[x].curstatus = depotView2Result[j].Zcurrstat;
												oSDASHMJsonEquipmentLevel[x].lastaction = depotView2Result[j].Zlastact;
												oSDASHMJsonEquipmentLevel[x].reference = depotView2Result[j].Reference;

												oSDASHMJsonEquipmentLevel[x].LsrEnable = depotView2Result[j].LsrEnable;
												oSDASHMJsonEquipmentLevel[x].AddtEnable = depotView2Result[j].AddtEnable;
												oSDASHMJsonEquipmentLevel[x].PredelEnable = depotView2Result[j].PredelEnable;
												oSDASHMJsonEquipmentLevel[x].CustApprEnable = depotView2Result[j].CustApprEnable;
												oSDASHMJsonEquipmentLevel[x].CwApprEnable = depotView2Result[j].CwApprEnable;
												oSDASHMJsonEquipmentLevel[x].Isawap = depotView2Result[j].Isawap;

		 	}						// if found
			}
		}

		// Remove Units using unitNotFound
		for(var j=0; j<unitNotFound.length; j++){
		for(var x=0; x<oSDASHMJsonEquipmentLevel.length;x++){
				if(oSDASHMJsonEquipmentLevel[x].serialno == unitNotFound[j].serialno){
						oSDASHMJsonEquipmentLevel.splice(x,1);
				}
			}
		}

		var oSDASHM2ModelEquipmentLevel = new sap.ui.model.json.JSONModel();
		oSDASHM2ModelEquipmentLevel.setData({modelData: oSDASHMJsonEquipmentLevel});

		var oSDASHM2TableEquipmentLevel = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel");
		oSDASHM2TableEquipmentLevel.setModel(oSDASHM2ModelEquipmentLevel);
		oSDASHM2TableEquipmentLevel.bindRows("/modelData");
		busyDialog.close();
	},

	/* SDASHM2 - Function - Search Seaco Dashboard Equipment Level from SDADHM1 */

	//searchSDASHM2EquipmentLevelFromSDASHM1 : function(equi, isFirst, isLast, number){
	searchSDASHM2EquipmentLevelFromSDASHM1 : function(number, text){
		var oCurrent = this;
		sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").clearSelection();
		oSDASHMJsonEquipmentLevelSearched = [];
		var equi = "";
		if(number != undefined)
			equi = enteredUnitNumbersUE[number];
		else{
			number = 0;
			enteredUnitNumbersUE.push(text);
			equi = text;
		}

		if(equi == "" || equi == undefined){
			if(number == enteredUnitNumbersUE.length){
					if(enteredUnitNumbersUENotFound.length != 0){
						var noUnitsFound = "The following unit(s) are invalid";
						for(var y=0; y<enteredUnitNumbersUENotFound.length; y++){
							noUnitsFound = noUnitsFound + "\n" + enteredUnitNumbersUENotFound[y];
						}
						sap.ui.commons.MessageBox.alert(noUnitsFound);
					}

					busyDialog.close();
					if(atleastoneunitfound)
						app.to("idSDASHM2Page");
			}
		}else{

			var tabdayslocal = "";
			// Button Visible : Functionality - For equipment search all buttons should be visible
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCSApprove").setVisible(true);
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(true);
			// sap.ui.getCore().byId("idSDASHM2ButtonAddEst").setVisible(true);
			// sap.ui.getCore().byId("idSDASHM2ButtonLessorSurvey").setVisible(true);
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCWApprove").setVisible(true);
			globalColumnStatus = "EQUI";
			var urlToSap = "";
			urlToSap = "depotview2eqSet?$filter=Equnr eq '" + equi + "'";
	        urlToSap = serviceDEP + urlToSap;
	        globalUrlDepotView2Set = urlToSap;

	        if(number == 0)
	        	oSDASHMJsonEquipmentLevel = [];

	        oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	        busyDialog.open();
	        console.log(urlToSap);
	        OData.request({
	                      requestUri: urlToSap,
	                      method: "GET",
	                      dataType: 'json',
	                      //async: false,
	                      headers:
	                      {
		                      "X-Requested-With": "XMLHttpRequest",
		                      "Content-Type": "application/json; charset=utf-8",
		                      "DataServiceVersion": "2.0",
		                      "X-CSRF-Token":"Fetch"
	                      }
	                      },
	                      function (data, response){

	                      var location = "";
	                      var depotcode = "";
	                      var depotname = "";
	                      var depotView2Result = data.results;
	                      //oSDASHMJsonEquipmentLevel = [];

	                      if(depotView2Result.length == 0){
													enteredUnitNumbersUENotFound.push(enteredUnitNumbersUE[number]);
													oCurrent.searchSDASHM2EquipmentLevelFromSDASHM1(number+1);
	                      }else{


												atleastoneunitfound = true;
                    	  console.log("Get Seaco Depot View 2 Success");
	                      globalSDASHM2ExchangeRate = depotView2Result[0].Zexcur;
	                      for(var j=0; j<depotView2Result.length; j++){
												enteredUnitNumbersUEFound.push(depotView2Result[j].Zserno);
												var unitsfound = "Number of unit(s) found : " + enteredUnitNumbersUEFound.length;
												sap.ui.getCore().byId("idSDASHM2PageUnitSearchResult").setText(unitsfound);
                    	  location = data.results[j].Ext1.split('-')[1] + "-" + data.results[j].Ext1.split('-')[2];
                    	  depotcode = data.results[j].Zdepot;
                    	  depotname = data.results[j].Zdepotname;
                    	  var offdate = "";
                    	  var offdatex = "";
                    	  var estdate = "";
                    	  var estdatex = "";
	                      if(depotView2Result[j].Zoffdate != null){
	                      var vMessageDate = depotView2Result[j].Zoffdate.split("(");
	                      var vMsgDate = vMessageDate[1].split(")");
	                      //var vformattedMessageDate = new Date(Number(vMsgDate[0]));
	                      offdate = dateFormat(new Date(Number(vMsgDate[0])), 'dd/mm/yyyy',"UTC"); // MACC_17022017 changed from '-' to '/'
	                      offdatex = offdate.substr(6,4) + offdate.substr(3,2) + offdate.substr(0,2);
	                      }

	                      if(depotView2Result[j].Zestdate != null){
	                          var vMessageDate = depotView2Result[j].Zestdate.split("(");
	                          var vMsgDate = vMessageDate[1].split(")");
	                          //var vformattedMessageDate = new Date(Number(vMsgDate[0]));
	                          estdate = dateFormat(new Date(Number(vMsgDate[0])), 'dd/mm/yyyy',"UTC"); // MACC_17022017 changed from '-' to '/'
	                          estdatex = estdate.substr(6,4) + estdate.substr(3,2) + estdate.substr(0,2);
	                      }

	                      var isawap = true;
	                      if(depotView2Result[j].Isawap == 'X'){
	                    	  isawap = true;
	                      }else{
	                    	  isawap = false;
	                      }

												if(depotView2Result[j].TabDays == ""){
													tabdayslocal = "";
												}else{
													tabdayslocal =	(depotView2Result[j].TabDays == "00000")?0:parseInt(depotView2Result[j].TabDays);
												}

												if(depotView2Result[j].ZtotestUsd == "")
													depotView2Result[j].ZtotestUsd = "0.00";

													if(depotView2Result[j].Ztotest == "")
														depotView2Result[j].Ztotest = "0.00";

                    	  oSDASHMJsonEquipmentLevel.push({

                    		  	depotcode : depotView2Result[j].Zdepot,
                    		  	depotname : depotView2Result[j].Zdepotname,

                    		  	isChecked : false,
                    			//sno : "2",

                    			serialno : depotView2Result[j].Zserno,
                    			equnr : depotView2Result[j].Zequnr,
                    			unittype : depotView2Result[j].Zunitype,
													subtype : depotView2Result[j].SubType,
													pcate : depotView2Result[j].Zpcat,
                    			status : depotView2Result[j].Zstatus,
                    			statusdays : depotView2Result[j].Statusdays,
													statusdayshighlight : depotView2Result[j].DaysExceeded,
                    			age : depotView2Result[j].Zage,
													manuf : depotView2Result[j].MfgMonth,

                    			offhirelocation : depotView2Result[j].Ext1,
                    			offhiredate : offdate,
                    			offhiredatex : offdatex,

                    			estimateno : depotView2Result[j].Zestno,
                    			estimatetype : depotView2Result[j].Zestimate,
                    			estimatedate : estdate,
                    			estimatedatex : estdatex,
                    			numestimateamt : parseFloat(depotView2Result[j].Zestamt),
                    			numaddestimateamt : parseFloat(depotView2Result[j].Zaddest),
                    			numtotestimateamt : (depotView2Result[j].Ztotest == "")?0:parseFloat(depotView2Result[j].Ztotest.split(',').join('')),
                    			numtotestimateamtusd : (depotView2Result[j].ZtotestUsd == "")?0:parseFloat(depotView2Result[j].ZtotestUsd.split(',').join('')),

                    			estimatecurrency : depotView2Result[j].Zestcur,
													documentcurrency : depotView2Result[j].Zdoccur,
                    			estimatecurrencyusd : "USD",
                    			exchange : depotView2Result[j].Zexcur,
                    			cwamt : "",
                    			customer : depotView2Result[j].Customer,
                    			customername : depotView2Result[j].Customername,
                    			cwrepaircost : depotView2Result[j].CwReprc,

													estimateamt : depotView2Result[j].Zestamt,
													addestimateamt : depotView2Result[j].Zaddest,
													totestimateamt : thousandsep(depotView2Result[j].Ztotest),
													totestimateamtusd : thousandsep(depotView2Result[j].ZtotestUsd),
                    			cwamtloc : thousandsep(depotView2Result[j].CwamtLoc),
													numcwamtloc : (depotView2Result[j].CwamtLoc == "")?0:parseFloat(depotView2Result[j].CwamtLoc.split(',').join('')),
                    			cwamtusd : thousandsep(depotView2Result[j].CwamtUsd),
													numcwamtusd : (depotView2Result[j].CwamtUsd == "")?0:parseFloat(depotView2Result[j].CwamtUsd.split(',').join('')),

													totalrepaircost : thousandsep(depotView2Result[j].TotRepCost),
													numtotalrepaircost : (depotView2Result[j].TotRepCost == "")?0:parseFloat(depotView2Result[j].TotRepCost.split(',').join('')),

													totalrepaircostusd : thousandsep(depotView2Result[j].TotRepCostUsd),
													numtotalrepaircostusd : (depotView2Result[j].TotRepCostUsd == "")?0:parseFloat(depotView2Result[j].TotRepCostUsd.split(',').join('')),

													lesseecost : thousandsep(depotView2Result[j].LesseeCost),
													numlesseecost : (depotView2Result[j].LesseeCost == "")?0:parseFloat(depotView2Result[j].LesseeCost.split(',').join('')),

													lesseecostusd : thousandsep(depotView2Result[j].LesseeCostUsd),
													numlesseecostusd : (depotView2Result[j].LesseeCostUsd == "")?0:parseFloat(depotView2Result[j].LesseeCostUsd.split(',').join('')),

                    			mnrcomment : depotView2Result[j].Mrcmt,
                    			mfgdate : depotView2Result[j].MfgMonth,

                    			tabdays : tabdayslocal,
													numtabdays : tabdayslocal,

                    			salesgrade : depotView2Result[j].Zsales,
													numsalesgrade : (depotView2Result[j].Zsales == "")?0:parseFloat(depotView2Result[j].Zsales.split(',').join('')),

                    			criteria : depotView2Result[j].Zins,
                    			isawap : isawap,

                    			curstatus : depotView2Result[j].Zcurrstat,
                    			lastaction : depotView2Result[j].Zlastact,
                    			reference : depotView2Result[j].Reference,

													LsrEnable : depotView2Result[j].LsrEnable,
													AddtEnable : depotView2Result[j].AddtEnable,
													PredelEnable : depotView2Result[j].PredelEnable,
													CustApprEnable : depotView2Result[j].CustApprEnable,
													CwApprEnable : depotView2Result[j].CwApprEnable,
													Isawap : depotView2Result[j].Isawap,

													qmnum : depotView2Result[j].Qmnum,
													isPicExist : (depotView2Result[j].Picexist == "X")?true:false

                         });

	                      }

	                     var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname;
	 					 			 		 //sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);

	                    var oSDASHM2ModelEquipmentLevel = new sap.ui.model.json.JSONModel();
	              		oSDASHM2ModelEquipmentLevel.setData({modelData: oSDASHMJsonEquipmentLevel});

	              		// Set Local Currency to a global variable
	              		globalSDASHM2LocalCurrency = oSDASHMJsonEquipmentLevel[0].estimatecurrency;

	                  	var oSDASHM2TableEquipmentLevel = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel");
	                  	oSDASHM2TableEquipmentLevel.setModel(oSDASHM2ModelEquipmentLevel);
	                  	oSDASHM2TableEquipmentLevel.bindRows("/modelData");
	                  	oSDASHM2TableEquipmentLevel.clearSelection();

	                  	var oSDASHMJsonEquipmentLevelLength = oSDASHMJsonEquipmentLevel.length;
	                  	if(oSDASHMJsonEquipmentLevelLength < 18){
	                  		//oSDASHM2TableEquipmentLevel.setVisibleRowCount(oSDASHMJsonEquipmentLevelLength);
	                  		oSDASHM2TableEquipmentLevel.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	                  	}
	                  	else{
	                  		//oSDASHM2TableEquipmentLevel.setVisibleRowCount(17);
	                  		oSDASHM2TableEquipmentLevel.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	                  	}
	                  	globalSDASHM2Currency = "LOC";
	                  	sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelSwitch").setText("Switch to USD");
	                  	var oTable = sap.ui.getCore().byId("idSDASHM1TableStatusMonitor");          //Get Hold of table
			    		        var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
			    		        //oScrollBar.setScrollPosition(0);


											/* Clear filters and sorting */

											var oSDASHM2TableEquipmentLevel = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel");
										  var iColCounter = 0;
										  oSDASHM2TableEquipmentLevel.clearSelection();
										  var iTotalCols = oSDASHM2TableEquipmentLevel.getColumns().length;
										  var oListBinding = oSDASHM2TableEquipmentLevel.getBinding();
										  if (oListBinding) {
										  oListBinding.aSorters = null;
										  oListBinding.aFilters = null;
										  }
										  oSDASHM2TableEquipmentLevel.getModel().refresh(true);
										  for ( iColCounter = 0; iColCounter < iTotalCols; iColCounter++) {
											  oSDASHM2TableEquipmentLevel.getColumns()[iColCounter].setSorted(false);
											  oSDASHM2TableEquipmentLevel.getColumns()[iColCounter].setFilterValue("");
											  oSDASHM2TableEquipmentLevel.getColumns()[iColCounter].setFiltered(false);
										  }

											//sap.ui.getCore().byId("idSDASHM2TableEquipmentLevelDepot").setVisible(true);
											//sap.ui.getCore().byId("idSDASHM2TableEquipmentLevelDepotName").setVisible(true);
											sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText("");
											sap.ui.getCore().byId("idSDASHM1PageBarInputSearch").setValue("");
											sap.ui.getCore().byId("idSDASHM2PageBarInputSearch").setValue("");
											if(number == (enteredUnitNumbersUE.length - 1)){
												if(enteredUnitNumbersUENotFound.length != 0){
													var noUnitsFound = "The following unit(s) are invalid";
													for(var y=0; y<enteredUnitNumbersUENotFound.length; y++){
														noUnitsFound = noUnitsFound + "\n" + enteredUnitNumbersUENotFound[y];
													}
													sap.ui.commons.MessageBox.alert(noUnitsFound);
												}
												busyDialog.close();
												app.to("idSDASHM2Page");
											}
											else
												oCurrent.searchSDASHM2EquipmentLevelFromSDASHM1(number+1);
	                    }

	                    if(number == (enteredUnitNumbersUE.length - 1) && oSDASHMJsonEquipmentLevel.length == 0){
	                    	 console.log("Get Seaco Depot View 2 Success; but returned nothing");
												 busyDialog.close();
	                    }

	                    if(sap.ui.getCore().byId("idSDASHM1PopupF4"))
	                    	sap.ui.getCore().byId("idSDASHM1PopupF4").close();

	                    if(sap.ui.getCore().byId("idSDASHM2PopupF4"))
	                    	sap.ui.getCore().byId("idSDASHM2PopupF4").close();



	                    },
	                  function(error){
	                    	sap.ui.commons.MessageBox.alert("Sorry, there is an error");
	                	  console.log("Get Seaco Depot View 2 Failure");
	                	  busyDialog.close();
	                  });


		}

	},

	/* SDASHM2 - Function - Send Seaco Dashboard Alert */

	sendSDASHM2EquipmentLevelAlert : function(){

		var body = encodeURIComponent(sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertValueBody").getValue());
		var subject = encodeURIComponent(sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertValueSubject").getValue());
		var toaddr = encodeURIComponent(sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertValueTo").getValue());
		if(toaddr == ""){
			sap.ui.commons.MessageBox.alert("To address is mandatory");
		}else if(subject == ""){
			sap.ui.commons.MessageBox.alert("Subject is mandatory");
		}else{
			  var isEmptyEstimate = false;
				var equips = "";
				var estimatenos = "";
				var statuses = "";
				var arraySelLines = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
				for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
					if(arraySelLines.indexOf(i) != -1){
						var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
						if(oDetData != undefined){
						var realPath = oDetData.getPath().split('/')[2];
						if(oSDASHMJsonEquipmentLevel[realPath].estimateno == ""){
							isEmptyEstimate = true;
							sap.ui.commons.MessageBox.alert("Some of the selected lines do not have estimates");
							console.log("Some of the selected lines do not have estimates");
						}
						if(equips == ''){
							equips = oSDASHMJsonEquipmentLevel[realPath].serialno;
							statuses = oSDASHMJsonEquipmentLevel[realPath].status;
							estimatenos = oSDASHMJsonEquipmentLevel[realPath].estimateno;
		  				}else{
		  					equips = equips + '$' + oSDASHMJsonEquipmentLevel[realPath].serialno;
		  					statuses = statuses + '$' + oSDASHMJsonEquipmentLevel[realPath].status;
		  					estimatenos = estimatenos + '$' + oSDASHMJsonEquipmentLevel[realPath].estimateno;
		  				}
						}
					}
				}
    if(isEmptyEstimate == true){

		}else{


		var pdfo = sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFO").getChecked();
		if(pdfo){
			pdfo = "X";
		}else{
			pdfo = "";
		}

		var pdfj = sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFJ").getChecked();
		if(pdfj){
			pdfj = "X";
		}else{
			pdfj = "";
		}

		var pdfl = sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFL").getChecked();
		if(pdfl){
			pdfl = "X";
		}else{
			pdfl = "";
		}

		var pdfa = sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFA").getChecked();
		if(pdfa){
			pdfa = "X";
		}else{
			pdfa = "";
		}

		var pdfp = sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFP").getChecked();
		if(pdfp){
			pdfp = "X";
		}else{
			pdfp = "";
		}

		var excel = sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxXL").getChecked();
		if(excel){
			excel = "X";
		}else{
			excel = "";
		}

		var urlToSap = "alertSet?$filter=Toaddr eq '" + toaddr +
					   "' and Subject eq '" + subject +
					   "' and Body eq '" + body +
					   "' and Hstatus eq '" + globalColumnStatus +
					   "' and Equips eq '" + equips +
					   "' and Estnos eq '" + estimatenos +
					   "' and Pdfo eq '" + pdfo +
						 "' and Pdfj eq '" + pdfj +
						 "' and Pdfl eq '" + pdfl +
						 "' and Pdfa eq '" + pdfa +
						 "' and Pdfp eq '" + pdfp +
					   "' and Excel eq '" + excel +
					   "' and Status eq '" + statuses + "'";

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
                    	  sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertPopover").close();
                    	  console.log("Seaco DB Send Alert Successful");

                    }
                    },
                  function(error){
                    	sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                    	console.log("Seaco DB Send Alert Failure");
                	  busyDialog.close();
                  });
								}
		}


	},

	/* SDASHM2 - Function - Set Content Equipment Level */

	setContentEquipmentLevel : function(){

		var oCurrent = this;

		/* SDASHM2 - Label - Equipment Level */

		var oSDASHM2LabelEquipmentLevel = new sap.ui.commons.Label("idSDASHM2LabelEquipmentLevel",{
            //text: "Equipment Level",
        }).addStyleClass("fontTitle");

				/* SDASHM2 - Button - Lessor Survey  */
					 var oSDASHM2LS = new sdashm2ls();
	         var oSDASHM2ButtonLessorSurvey = new sap.ui.commons.Button("idSDASHM2ButtonLessorSurvey",{
	 	          text : "Lessor Survey Request",
							visible : oJSONSDASHMAuthorizationRoles["ZMNR.LSRBUTTON"],
	 	          //styled:false,
	 	          //type:sap.m.ButtonType.Unstyled,
	 	          //icon: sap.ui.core.IconPool.getIconURI("email"),
	 	          press:function(oEvent){
	 	        	var isSelectedOne = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices().length;
	 		      	if(isSelectedOne == 0){
	 		      		sap.ui.commons.MessageBox.alert("Please select a unit");
	 		      	}else{

								/* CHSTATUSBUTTON - Check Statuses for Button */
								var isCHSTATUSBUTTON = oCurrent.checkStatusForButton("LSR");

								if(isCHSTATUSBUTTON.isValid){
									var lsdepot = "";
									var arraySelLines = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
									for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
							  			if(arraySelLines.indexOf(i) != -1){
												var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
												if(oDetData != undefined){

													var realPath = oDetData.getPath().split('/')[2];
													lsdepot = oSDASHMJsonEquipmentLevel[realPath].depotcode;
												}}}

			      			oSDASHM2LS.sendSDASHM2LSLessorSurvey(oEvent.getSource(), lsdepot);
								}else{
									sap.ui.commons.MessageBox.alert("Please select only APPD units");
								}


	 		      	}
						}
					});//.addStyleClass("excelBtn marginTop10");

			 				  /* SDASHM2 - Button - Approve Lessor Survey

			 	        var oSDASHM2ButtonLessorSurveyApprove = new sap.ui.commons.Button("idSDASHM2ButtonLessorSurveyApprove",{
			 		          text : "Lessor Survey Approve",
			 		          //styled:false,
										visible:false,
			 		          //type:sap.m.ButtonType.Unstyled,
			 		          //icon: sap.ui.core.IconPool.getIconURI("email"),
			 		          press:function(oEvent){
			 		        	var isSelectedOne = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices().length;
			 			      	if(isSelectedOne == 0){
			 			      		sap.ui.commons.MessageBox.alert("Please select a unit");
			 			      	}else{
			 			      		oCurrent.approveSDASHM2LessorSurvey();
			 			      	}
			 		          }
			 						});//.addStyleClass("excelBtn marginTop10"); */

			         /* SDASHM2 - Button - Additional Estimate  */

			         var oSDASHM2ButtonAddEst = new sap.ui.commons.Button("idSDASHM2ButtonAddEst",{
			 	          text : "Additional Repairs",
			 	          //styled:false,
			 	         // type:sap.m.ButtonType.Unstyled,
			 	          //icon: sap.ui.core.IconPool.getIconURI("email"),
									visible : oJSONSDASHMAuthorizationRoles["ZMNR.ADD_PREDEL_ESTIMBUTTON"],
			 	          press:function(oEvent){
			 	        	var isSelectedOne = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices().length;
			 		      	if(isSelectedOne == 0){
			 		      		sap.ui.commons.MessageBox.alert("Please select a unit");
			 		      	}else{

										/* CHSTATUSBUTTON - Check Statuses for Button */
										var isCHSTATUSBUTTON = oCurrent.checkStatusForButton("ADD");
										var isEstimateReefer = false;

										var arraySelLines = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
										for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
													if(arraySelLines.indexOf(i) != -1){
													var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
													if(oDetData != undefined){
														var realPath = oDetData.getPath().split('/')[2];
														isEstimateReefer = (oSDASHMJsonEquipmentLevel[realPath].pcate == "REEFERS")?true:false;
													}
												}
											}
										globalIsEstimateReefer = isEstimateReefer;
										if(isCHSTATUSBUTTON.isValid){
											oCurrent.getSDASHM2LabCost(oEvent.getSource(), isCHSTATUSBUTTON.errorMessage, isEstimateReefer);
										}else{
											sap.ui.commons.MessageBox.alert(isCHSTATUSBUTTON.errorMessage);
										}



			 		      	}
			 	          }
			 		});//.addStyleClass("excelBtn marginTop10");



			         /* SDASHM2 - Button - Email Estimate  */

			         var oSDASHM2ButtonAlert = new sap.ui.commons.Button("idSDASHM2ButtonAlert",{
			 	          text : "Email Estimate",
			 	          //styled:false,
			 	          //type:sap.m.ButtonType.Unstyled,
			 	          //icon: sap.ui.core.IconPool.getIconURI("email"),
									visible : oJSONSDASHMAuthorizationRoles["ZMNR.EMAILESTIMBUTTON"],
			 	          press:function(oEvent){

			 	        	  var isSelectedOne = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices().length;
			 	        	  /*for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
			 			      		if(oSDASHMJsonEquipmentLevel[i].isChecked == true){
			 			      			isSelectedOne = true;
			 			      		}
			 			      	}*/

			 			      	if(isSelectedOne == 0){
			 			      		sap.ui.commons.MessageBox.alert("Please select a unit");
			 			      	}else{

			 			      		/* To Address */

			 		        	  	 if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertValueTo") != undefined)
			 		                	 sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertValueTo").destroy();

			 		                 if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertLabelTo") != undefined)
			 		                	 sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertLabelTo").destroy();

			 		                 var oSDASHM2EquipmentLevelSendAlertValueTo = new sap.m.Input("idSDASHM2EquipmentLevelSendAlertValueTo",{
			 		                                                               value : "",
			 		                                                               type : sap.m.InputType.Email,
			 		                                                               width : "275px",
			 		                                                               }).addStyleClass("selectionLabels1");

			 		                 var oSDASHM2EquipmentLevelSendAlertLabelTo = new sap.m.Label("idSDASHM2EquipmentLevelSendAlertLabelTo",{
			 		                     text : "To Address *: ",
			 		                     labelFor: oSDASHM2EquipmentLevelSendAlertValueTo,
			 		                     width : "180px"
			 		                     }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");

			 		                 var oSDASHM2EquipmentLevelSendAlertFlexTo = new sap.m.FlexBox({
			 		                                                                items: [oSDASHM2EquipmentLevelSendAlertLabelTo,
			 		                                                                        oSDASHM2EquipmentLevelSendAlertValueTo
			 		                                                                        ],
			 		                                                                direction: "Row"
			 		                                                                });

			 		                 /* Subject */

			 		                 if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertValueSubject") != undefined)
			 		                	 sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertValueSubject").destroy();

			 		                 if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertLabelSubject") != undefined)
			 		                	 sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertLabelSubject").destroy();

			 		                 var oSDASHM2EquipmentLevelSendAlertValueSubject = new sap.m.Input("idSDASHM2EquipmentLevelSendAlertValueSubject",{
			 																                         value : "Seaco Estimate Details",
			 																                         maxLength : 50,
			 																                         //type : sap.m.InputType.Email,
			 																                         width : "275px",
			 																                         }).addStyleClass("selectionLabels1");

			 		                 var oSDASHM2EquipmentLevelSendAlertLabelSubject = new sap.m.Label("idSDASHM2EquipmentLevelSendAlertLabelSubject",{
			 		                     text : "Subject : ",
			 		                     labelFor: oSDASHM2EquipmentLevelSendAlertValueSubject,
			 		                     width : "180px"
			 		                     }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");

			 		                 var oSDASHM2EquipmentLevelSendAlertFlexSubject = new sap.m.FlexBox({
			 		                                                                items: [oSDASHM2EquipmentLevelSendAlertLabelSubject,
			 		                                                                        oSDASHM2EquipmentLevelSendAlertValueSubject
			 		                                                                        ],
			 		                                                                direction: "Row"
			 		                                                                });


			 		                 /* Body */
			 						 var equipsbody = "";
			 		                 var arraySelLines = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
			 			         		for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
			 			         			if(arraySelLines.indexOf(i) != -1){
			 			         				var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
			 			         				if(oDetData != undefined){
			 			         				var realPath = oDetData.getPath().split('/')[2];
			 			         				if(equipsbody == ''){
			 			         					equipsbody = oSDASHMJsonEquipmentLevel[realPath].serialno;
			 			           				}else{
			 			           					equipsbody = equipsbody + '\n' + oSDASHMJsonEquipmentLevel[realPath].serialno;
			 			           				}
			 			         				}
			 			         			}
			 			         		}

			 		                 if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertValueBody") != undefined)
			 		                	 sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertValueBody").destroy();

			 		                 if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertLabelBody") != undefined)
			 		                	 sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertLabelBody").destroy();

			 		                 var oSDASHM2EquipmentLevelSendAlertValueBody = new sap.m.TextArea("idSDASHM2EquipmentLevelSendAlertValueBody",{
			 								                	 value : "Dear Sir/Madam,\n\nPlease refer to the attached files for the repair estimates of the following units."
			 								                		 	+ "\n\n"
			 									    					+ equipsbody
			 									    					+ "\n\n"
			 								    						+ "\nThank you."
			 								    						+ "\n\nBest regards,\n"
			 									    					+ sessionStorage.name
			 									    					+ ".",
			 									    					height : "250px",
			 									    					width : "600px",
			 									    					enabled : true
			 									    					}).addStyleClass("commentsPanel");

			 		                 var oSDASHM2EquipmentLevelSendAlertLabelBody = new sap.m.Label("idSDASHM2EquipmentLevelSendAlertLabelBody",{
			 		                     text : "Email body : ",
			 		                     labelFor: oSDASHM2EquipmentLevelSendAlertValueBody,
			 		                     width : "180px"
			 		                     }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");

			 		                 var oSDASHM2EquipmentLevelSendAlertFlexBody = new sap.m.FlexBox({
			 		                                                                items: [oSDASHM2EquipmentLevelSendAlertLabelBody,
			 		                                                                        oSDASHM2EquipmentLevelSendAlertValueBody
			 		                                                                        ],
			 		                                                                direction: "Row"
			 		                                                                });


			 		                 if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFO") != undefined)
			 		                	 sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFO").destroy();

													 if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFJ") != undefined)
			 		                	 sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFJ").destroy();

													 if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFL") != undefined)
			 		                	 sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFL").destroy();

													 if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFA") != undefined)
			 		                	 sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFA").destroy();

													 if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFP") != undefined)
			 		                	 sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFP").destroy();


			 		                 if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxXL") != undefined)
			 		                	 sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertCheckBoxXL").destroy();

			 		                 var oSDASHM2EquipmentLevelSendAlertCheckBoxPDFO = new sap.ui.commons.CheckBox("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFO",{
			 		                	 text : "PDF",
			 		          			 checked : true
												 }).addStyleClass("pdfexcelcheckboxes1");

													 var oSDASHM2EquipmentLevelSendAlertCheckBoxPDFJ = new sap.ui.commons.CheckBox("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFJ",{
			 		                	 text : "PDF - Joint Survey",
			 		          			 checked : true
												 }).addStyleClass("pdfexcelcheckboxes1");

													 var oSDASHM2EquipmentLevelSendAlertCheckBoxPDFL = new sap.ui.commons.CheckBox("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFL",{
			 		                	 text : "PDF - Lessor Survey",
			 		          			 checked : true
												 }).addStyleClass("pdfexcelcheckboxes1");

													 var oSDASHM2EquipmentLevelSendAlertCheckBoxPDFA = new sap.ui.commons.CheckBox("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFA",{
			 		                	 text : "PDF - Additional",
			 		          			 checked : true
												 }).addStyleClass("pdfexcelcheckboxes1");

													 var oSDASHM2EquipmentLevelSendAlertCheckBoxPDFP = new sap.ui.commons.CheckBox("idSDASHM2EquipmentLevelSendAlertCheckBoxPDFP",{
			 		                	 text : "PDF - Pre Delivery",
			 		          			 	 checked : true
			 		                 }).addStyleClass("pdfexcelcheckboxes1");


			 		                 var oSDASHM2EquipmentLevelSendAlertCheckBoxXL = new sap.ui.commons.CheckBox("idSDASHM2EquipmentLevelSendAlertCheckBoxXL",{
			 		                	 text : "Excel",
			 		          			 checked : false
												 }).addStyleClass("pdfexcelcheckboxes1");


			 		                 var oSDASHM2EquipmentLevelSendAlertButtonSend = new sap.ui.commons.Button({
			 		       	          text : "Send",
			 		       	          //styled:false,
			 		       	          visible:true,
			 		       	          //type:sap.m.ButtonType.Unstyled,
			 		       	          //icon: sap.ui.core.IconPool.getIconURI("email"),
			 		       	          press:function(oEvent){
			 		       	        		oCurrent.sendSDASHM2EquipmentLevelAlert();
			 		       	          }
													});//.addStyleClass("excelBtn marginTop10 floatRight");

			 		                 var oSDASHM2EquipmentLevelSendAlertFlexButtonCB = new sap.m.FlexBox({
			 		                     items: [
			 		                             	oSDASHM2EquipmentLevelSendAlertCheckBoxPDFO,
			 		                             	/*new sap.m.Label({width : "20px"}),
																				oSDASHM2EquipmentLevelSendAlertCheckBoxPDFJ,
			 		                             	new sap.m.Label({width : "20px"}),
																				oSDASHM2EquipmentLevelSendAlertCheckBoxPDFL,
			 		                             	new sap.m.Label({width : "20px"}),
																				oSDASHM2EquipmentLevelSendAlertCheckBoxPDFA,
			 		                             	new sap.m.Label({width : "20px"}),
																				oSDASHM2EquipmentLevelSendAlertCheckBoxPDFP,*/
			 		                             	new sap.m.Label({width : "20px"}),
			 		                             	oSDASHM2EquipmentLevelSendAlertCheckBoxXL,
			 		                             	new sap.m.Label({width : "100px"}),
			 		                             	oSDASHM2EquipmentLevelSendAlertButtonSend
			 		                             ],
			 		                     direction: "Row",
			 		                     justifyContent : "End"
			 		                     });

			 		                 var oSDASHM2EquipmentLevelSendAlertFlexFinal = new sap.m.FlexBox({
			 		                     items: [
			 		                             	oSDASHM2EquipmentLevelSendAlertFlexTo,
			 		                             	oSDASHM2EquipmentLevelSendAlertFlexSubject,
			 		                             	oSDASHM2EquipmentLevelSendAlertFlexBody,
			 		                             	new sap.m.FlexBox({
																					items : [new sap.m.Label({text : "*Denotes Required Field"}).addStyleClass("starText"),
																									oSDASHM2EquipmentLevelSendAlertFlexButtonCB
																								],
																								direction: "Row",
																								justifyContent : sap.m.FlexJustifyContent.SpaceBetween
																				}),

			 		                             ],
			 		                     direction: "Column"
			 		                     });

			 		                 if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertPopover") != undefined)
			 		                	 sap.ui.getCore().byId("idSDASHM2EquipmentLevelSendAlertPopover").destroy();

			 						 var oSDASHM2EquipmentLevelSendAlertPopover = new sap.m.Popover("idSDASHM2EquipmentLevelSendAlertPopover",{
			 		                     title: "Email Estimate",
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
			 		                                             items:  [oSDASHM2EquipmentLevelSendAlertFlexFinal]
			 		                                             }),

			 		                     }).addStyleClass("sapUiPopupWithPadding");

			 						 oSDASHM2EquipmentLevelSendAlertPopover.openBy(oEvent.getSource());
			 			      	}




			 	          }
			 		});//.addStyleClass("excelBtn marginTop10");

		/* SDASHM2 - Button - Equipment Level Export to Excel */

		var oSDASHM2ButtonEquipmentLevelExport = new sap.ui.commons.Button("idSDASHM2ButtonEquipmentLevelExport",{
	          text : "",
	          //styled:false,
	          //type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	  var oUtility = new utility();
	        	  var excelSDASHMJsonEquipmentLevel = [];
							var filteredIndices = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getBinding("rows").aIndices;
	        	  for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
								if(filteredIndices.indexOf(i) != -1){
	        		  excelSDASHMJsonEquipmentLevel.push({
	        			  "Serial No." : oSDASHMJsonEquipmentLevel[i].serialno,
	        			  "Unit Type" : oSDASHMJsonEquipmentLevel[i].unittype,
									"Sub Type" : oSDASHMJsonEquipmentLevel[i].subtype,
									"Prod. Category" : oSDASHMJsonEquipmentLevel[i].pcate,
									"Depot" : oSDASHMJsonEquipmentLevel[i].depotcode,
                  "Depot Name" : oSDASHMJsonEquipmentLevel[i].depotname,
	        			  "Status" : oSDASHMJsonEquipmentLevel[i].status,
	        			  "No. of days in status" : oSDASHMJsonEquipmentLevel[i].statusdays,
									"Status Description" : oSDASHMJsonEquipmentLevel[i].curstatus,
									"Age" : oSDASHMJsonEquipmentLevel[i].age,
									"Manuf. Date" : oSDASHMJsonEquipmentLevel[i].mfgdate,
									"Customer No." : oSDASHMJsonEquipmentLevel[i].customer,
									"Customer Name" : oSDASHMJsonEquipmentLevel[i].customername,

									"Off Hire Location" : oSDASHMJsonEquipmentLevel[i].offhirelocation,
	        			  "Off Hire Date" : oSDASHMJsonEquipmentLevel[i].offhiredate,
									"M&R Comment" : oSDASHMJsonEquipmentLevel[i].mnrcomment,
									"Equipment No." : oSDASHMJsonEquipmentLevel[i].equnr,
	        			  "Estimate No." : oSDASHMJsonEquipmentLevel[i].estimateno,
	        			  "Est. Type" : oSDASHMJsonEquipmentLevel[i].estimatetype,
	        			  "Est. Date" : oSDASHMJsonEquipmentLevel[i].estimatedate,
	        			  "Estimate Amount" : oSDASHMJsonEquipmentLevel[i].totestimateamt,
									"Estimate Amount(USD)" : oSDASHMJsonEquipmentLevel[i].totestimateamtusd,
									"Estimate Curr." : oSDASHMJsonEquipmentLevel[i].estimatecurrency,
									"Grade" : oSDASHMJsonEquipmentLevel[i].salesgrade,

									//cwrepaircost : depotView2Result[j].CwReprc,
            			"CW Amount(Local)" : oSDASHMJsonEquipmentLevel[i].cwamtloc,
            			"CW Amount(USD)" : oSDASHMJsonEquipmentLevel[i].cwamtusd,
            			"TAB Days(Remaining)" : oSDASHMJsonEquipmentLevel[i].tabdays,
            			"Repair Auth. Amount" : oSDASHMJsonEquipmentLevel[i].totalrepaircost,
									"Repair Auth. Amount(USD)" : oSDASHMJsonEquipmentLevel[i].totalrepaircostusd,
									"Lessee Cost" : oSDASHMJsonEquipmentLevel[i].lesseecost,
									"Lessee Cost(USD)" : oSDASHMJsonEquipmentLevel[i].lesseecostusd,

	        			  "Repair Criteria" : oSDASHMJsonEquipmentLevel[i].criteria,
	        			  //"Last Action" : oSDASHMJsonEquipmentLevel[i].lastaction,
	        			  "Ref." : oSDASHMJsonEquipmentLevel[i].reference,
	        		  });
							}
	        	  }
	        	  var sdashm2exceltitle = sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").getText();
	        	  oUtility.makeHTMLTable(excelSDASHMJsonEquipmentLevel, sdashm2exceltitle,"export");
	          }
		});//.addStyleClass("excelBtn marginTop10");

		/* SDASHM2 - Button - Switch Currencies */

		var oSDASHM2ButtonEquipmentLevelSwitch = new sap.ui.commons.Button("idSDASHM2ButtonEquipmentLevelSwitch",{
	          text : "Switch to USD",
	          //width : "150px",
	          visible : false,
	          //styled:false,
	          //type:sap.m.ButtonType.Unstyled,
	          press:function(){
	        	  oCurrent.switchCurrency();
	          }
		});//.addStyleClass("excelBtn marginTop10");

		/* SDASHM2 - Button - Repair Authorize */

	   	 var oSDASHM2ButtonEquipmentLevelApprove = new sap.ui.commons.Button("idSDASHM2ButtonEquipmentLevelApprove",{
	   		  text : "Authorize Repair",
	   		  //icon: sap.ui.core.IconPool.getIconURI("complete"),
	          //width:"140px",
	          //styled:false,
	          visible : oJSONSDASHMAuthorizationRoles["ZMNR.AUTHORIZEREPBUTTON"],
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(oEvent){

	        	  if(sessionStorage.approve == ""){
			      		sap.ui.commons.MessageBox.alert("You are not authorized");
	        	  }else{



	        		  var isSelectedOne = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices().length;
		        	  /*for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
				      		if(oSDASHMJsonEquipmentLevel[i].isChecked == true){
				      			isSelectedOne = true;
				      		}
				      	}*/

				      	if(isSelectedOne == 0){
				      		sap.ui.commons.MessageBox.alert("Please select a unit");
				      	}else{

									/* CHSTATUSBUTTON - Check Statuses for Button */
									var isCHSTATUSBUTTON = oCurrent.checkStatusForButton("APP");

									if(!isCHSTATUSBUTTON.isValid){
										sap.ui.commons.MessageBox.alert("Please select only HOLD APPD Grade 1 units");
										return;
									}

				      		/* Discount Amount */

			        	  	 if(sap.ui.getCore().byId("idSDASHM2InputDiscountA") != undefined)
			                	 sap.ui.getCore().byId("idSDASHM2InputDiscountA").destroy();

			                 if(sap.ui.getCore().byId("idSDASHM2LabelDiscountA") != undefined)
			                	 sap.ui.getCore().byId("idSDASHM2LabelDiscountA").destroy();

			                 var oSDASHM2InputDiscountA = new sap.m.Input("idSDASHM2InputDiscountA",{
			                                                               value : "0",
			                                                               type : sap.m.InputType.Number,
			                                                               width : "70px",
																																		 textAlign : "Right",
			                                                               liveChange : function(){
			                                                            	   sap.ui.getCore().byId("idSDASHM2InputDiscountP").setValue("0");
			                                                               }
			                                                               }).addStyleClass("selectionLabelsPage2Discount");

			                 var oSDASHM2LabelDiscountA = new sap.m.Label("idSDASHM2LabelDiscountA",{
			                     text : "Discount Amount : ",
			                     labelFor: oSDASHM2InputDiscountA,
			                     width : "120px"
			                     }).addStyleClass("selectionLabelsLabelPage2Discount");

			                 var oSDASHM2FlexDiscountA = new sap.m.FlexBox({
			                                                                items: [oSDASHM2LabelDiscountA,
			                                                                        oSDASHM2InputDiscountA
			                                                                        ],
			                                                                direction: "Row"
			                                                                });

			                 /* Discount % */

			        	  	 if(sap.ui.getCore().byId("idSDASHM2InputDiscountP") != undefined)
			                	 sap.ui.getCore().byId("idSDASHM2InputDiscountP").destroy();

			                 if(sap.ui.getCore().byId("idSDASHM2LabelDiscountP") != undefined)
			                	 sap.ui.getCore().byId("idSDASHM2LabelDiscountP").destroy();

			                 var oSDASHM2InputDiscountP = new sap.m.Input("idSDASHM2InputDiscountP",{
			                	 										   											 value : "0",
			                                                               type : sap.m.InputType.Number,
			                                                               width : "70px",
																																		 textAlign : "Right",
			                                                               liveChange : function(){
			                                                            	   sap.ui.getCore().byId("idSDASHM2InputDiscountA").setValue("0");
			                                                               }
			                                                               }).addStyleClass("selectionLabelsPage2Discount");

			                 var oSDASHM2LabelDiscountP = new sap.m.Label("idSDASHM2LabelDiscountP",{
			                     text : "Discount % : ",
			                     labelFor: oSDASHM2InputDiscountP,
			                     width : "120px"
			                     }).addStyleClass("selectionLabelsLabelPage2Discount");

			                 var oSDASHM2FlexDiscountP = new sap.m.FlexBox({
			                                                                items: [oSDASHM2LabelDiscountP,
			                                                                        oSDASHM2InputDiscountP
			                                                                        ],
			                                                                direction: "Row"
			                                                                });

			                 var oSDASHM2FlexDiscount = new sap.m.FlexBox({
			                                                                items: [oSDASHM2FlexDiscountA,
			                                                                        oSDASHM2FlexDiscountP,
																																							new sap.ui.commons.Button({
										                                                	          text : "Approve",
										                                                	          //styled:false,
										                                                	          visible:true,
										                                                	          //type:sap.m.ButtonType.Unstyled,
										                                                	          //icon: sap.ui.core.IconPool.getIconURI("email"),
										                                                	          press:function(oEvent){
										                                                	        	  oCurrent.approveSDASHM2();
										                                                	          }
										                                                					})
			                                                                        ],
			                                                                direction: "Column"
			                                                                });

			                 if(sap.ui.getCore().byId("idSDASHM2PopoverDiscount") != undefined)
			                	 sap.ui.getCore().byId("idSDASHM2PopoverDiscount").destroy();

							 var oSDASHM2PopoverDiscount = new sap.m.Popover("idSDASHM2PopoverDiscount",{
			                     title: "Authorize Repair",
			                     //modal: true,
			                     placement: sap.m.PlacementType.Left,
			                     footer:  new sap.m.Bar({
														 					visible : false,
			                                            contentRight: [
			                                                          new sap.ui.commons.Button({
			                                                	          text : "Authorize Repair",
			                                                	          //styled:false,
			                                                	          visible:true,
			                                                	          //type:sap.m.ButtonType.Unstyled,
			                                                	          //icon: sap.ui.core.IconPool.getIconURI("email"),
			                                                	          press:function(oEvent){
			                                                	        	  oCurrent.approveSDASHM2();
			                                                	          }
			                                                		})//.addStyleClass("excelBtn marginTop10 floatRight")
			                                                          ],
			                                            }),
			                     content: new sap.m.VBox({
			                                             //width:"300px",
			                                             items:  [oSDASHM2FlexDiscount]
			                                             }),

			                     }).addStyleClass("sapUiPopupWithPadding");

							 					 oSDASHM2PopoverDiscount.openBy(oEvent.getSource());
				      	}
	        	  }
	          }});//.addStyleClass("excelBtn marginTop10");

	   	/* SDASHM2 - Button - Equipment Level CW Approval */

	   	 var oSDASHM2ButtonEquipmentLevelCWApprove = new sap.ui.commons.Button("idSDASHM2ButtonEquipmentLevelCWApprove",{
	   		  text : "CW Approval",
	   		  //icon: sap.ui.core.IconPool.getIconURI("complete"),
	          //width:"140px",
	          //styled:false,
	          visible : oJSONSDASHMAuthorizationRoles["ZMNR.CWAPPBUTTON"],
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(oEvent){

	        	  if(sessionStorage.cwedit == ""){
			      		sap.ui.commons.MessageBox.alert("You are not authorized");
	        	  }else{

	        		  var isSelectedOne = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices().length;
		        	  /*for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
				      		if(oSDASHMJsonEquipmentLevel[i].isChecked == true){
				      			isSelectedOne = true;
				      		}
				      	}*/

				      	if(isSelectedOne == 0){
				      		sap.ui.commons.MessageBox.alert("Please select a unit");
				      	}else if(isSelectedOne > 24){
				      		sap.ui.commons.MessageBox.alert("Select not more than 25 units");
				      	}else{

									/* CHSTATUSBUTTON - Check Statuses for Button */
									var isCHSTATUSBUTTON = oCurrent.checkStatusForButton("CWA");

				      		/* CW Approve Table */
									if(isCHSTATUSBUTTON.isValid){
										/* CW Approve Table */
										oCurrent.createCWApprove();
									}else{
										sap.ui.commons.MessageBox.alert("Cargo Worthy repair is not allowed on equipment with WEST, AWAP, AUTH or AVLB status");
									}


				      	}

	        	  }
	          }});//.addStyleClass("excelBtn marginTop10");

	   	/* SDASHM2 - Button - Equipment Level Customer Approval */

	   	 var oSDASHM2ButtonEquipmentLevelCSApprove = new sap.ui.commons.Button("idSDASHM2ButtonEquipmentLevelCSApprove",{
	   		  text : "Customer Approval",
	   		  //icon: sap.ui.core.IconPool.getIconURI("complete"),
	          //width:"140px",
	          //styled:false,
	          visible : oJSONSDASHMAuthorizationRoles["ZMNR.CUSTAPPBUTTON"],
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(oEvent){

	        	  /*if(sessionStorage.cwedit == ""){
			      		sap.ui.commons.MessageBox.alert("You are not authorized");
	        	  }else{*/



	        		  var isSelectedOne = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices().length;
		        	  /*for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
				      		if(oSDASHMJsonEquipmentLevel[i].isChecked == true){
				      			isSelectedOne = true;
				      		}
				      	}*/

				      	if(isSelectedOne == 0){
				      		sap.ui.commons.MessageBox.alert("Please select a unit");
				      	}else if(isSelectedOne > 24){
				      		sap.ui.commons.MessageBox.alert("Select not more than 25 units");
				      	}else{

									/* CHSTATUSBUTTON - Check Statuses for Button */
									var isCHSTATUSBUTTON = oCurrent.checkStatusForButton("CSA");

				      		/* CS Approve Table */
									if(isCHSTATUSBUTTON.isValid){
				      			oCurrent.createCSApprove();
									}else{
										sap.ui.commons.MessageBox.alert("Please select only AWAP units");
									}
				      	}

	        	  //}
	          }});//.addStyleClass("excelBtn marginTop10");

	   	/* SDASHM2 - Button - Equipment Level Download Estimates */

	   	 var oSDASHM2ButtonEquipmentLevelDownload = new sap.ui.commons.Button("idSDASHM2ButtonEquipmentLevelDownload",{
	          text: "Download Estimate",
	          //width:"140px",
	          //styled:false,
	          visible : oJSONSDASHMAuthorizationRoles["ZMNR.DOWNLOADESTIMBUTTON"],
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	var orders = "";
						var serialnos = "";
	        	var isSelectedOne = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices().length;
	        	/*for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
		      		if(oSDASHMJsonEquipmentLevel[i].isChecked == true){
		      			isSelectedOne = true;
		      		}
		      	}*/
		      	if(isSelectedOne == 0){
		      		sap.ui.commons.MessageBox.alert("Please select a unit");
		      	}else{
		      		var arraySelLines = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
		      		for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
		      			if(arraySelLines.indexOf(i) != -1){
	      					var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
	      					if(oDetData != undefined){
	      					var realPath = oDetData.getPath().split('/')[2];
		      				if(orders == ''){

										if(oSDASHMJsonEquipmentLevel[realPath].estimateno != "")	// MAC04072019_APS981+
												orders = oSDASHMJsonEquipmentLevel[realPath].estimateno;
										else	// MAC04072019_APS981+
												orders = oSDASHMJsonEquipmentLevel[realPath].serialno;	// MAC04072019_APS981+

										serialnos = oSDASHMJsonEquipmentLevel[realPath].serialno;
		      				}else{

										if(oSDASHMJsonEquipmentLevel[realPath].estimateno != "")	// MAC04072019_APS981+
												orders = orders + '$' + oSDASHMJsonEquipmentLevel[realPath].estimateno;
										else	// MAC04072019_APS981+
												orders = orders + '$' + oSDASHMJsonEquipmentLevel[realPath].serialno;	// MAC04072019_APS981+

		      					
										serialnos = serialnos + '_' + oSDASHMJsonEquipmentLevel[realPath].serialno;
		      				}
	      					}
		      			}
		      		}
		      	  //  if(orders == ""){	// MAC04072019_APS981-
		      		//  	sap.ui.commons.MessageBox.alert("No outstanding estimate.");	// MAC04072019_APS981-
		      	  //  }else{	// MAC04072019_APS981-

							if(orders == ""){	// MAC04072019_APS981+ If no orders, hide Estimate checkbox
								var isNoOrder = true;
							}

							 if(sap.ui.getCore().byId("idSDASHM2Download") != undefined)
										 sap.ui.getCore().byId("idSDASHM2Download").destroy();

							 if(sap.ui.getCore().byId("idSDASHM2CheckBoxDownloadPDF") != undefined)
										sap.ui.getCore().byId("idSDASHM2CheckBoxDownloadPDF").destroy();

								if(sap.ui.getCore().byId("idSDASHM2CheckBoxDownloadPictures") != undefined)
										 sap.ui.getCore().byId("idSDASHM2CheckBoxDownloadPictures").destroy();

								 var oSDASHM2Download = new sap.m.Popover("idSDASHM2Download",{
												 //title: "Download",
												 //modal: true,
												 showHeader:false,
												 placement: sap.m.PlacementType.Bottom,
												 content: new sap.m.VBox({
																								 //width:"300px",
																								 items:  [

																									 new sap.ui.commons.CheckBox("idSDASHM2CheckBoxDownloadPDF",{
															 		                	 text : "Estimate",
															 		          			   checked : !isNoOrder, // MAC04072019_APS981+
																											visible : !isNoOrder // MAC04072019_APS981+
																								 }).addStyleClass("pdfexcelcheckboxes1"),

																								 new sap.ui.commons.CheckBox("idSDASHM2CheckBoxDownloadPictures",{
														 		                	 text : "Pictures",
														 		          			   checked : false
																							 	}).addStyleClass("pdfexcelcheckboxes1"),

																								new sap.ui.commons.Button({
 																					          text: "Download",
 																					          visible:true,
 																					          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
 																					          press:function(oEvent){

																										var oSDASHM2 = new sdashm2();
																										if(sap.ui.getCore().byId("idSDASHM2CheckBoxDownloadPDF").getChecked())
																											oCurrent.getPdfFromSap(orders,serialnos, "P");	// PDF
																										if(sap.ui.getCore().byId("idSDASHM2CheckBoxDownloadPictures").getChecked())
																												oCurrent.getPdfFromSap(orders,serialnos, "Z"); // ZIP of PICS

 																					          }}).addStyleClass("marginTop10")

																								 ]
																								 }),

												 }).addStyleClass("sapUiPopupWithPadding");

								 			 oSDASHM2Download.openBy(sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelDownload"));
		      	   //}	// MAC04072019_APS981-

		      	}


					}});//.addStyleClass("excelBtn marginTop10");

					/* SDASHM2 - Button - Tariff Checker  */

			    var oSDASHM2ButtonTariffChecker = new sap.ui.commons.Button("idSDASHM2ButtonTariffChecker",{
				          text : "Tariff Checker",
				          //styled:false,
				          //type:sap.m.ButtonType.Unstyled,
				          //icon: sap.ui.core.IconPool.getIconURI("email"),
				          press:function(oEvent){

				          }
					});//.addStyleClass("excelBtn marginTop10");

	   	/* SDASHM2 - Flexbox - Equipment Level Buttons

			var oSDASHM2FlexEquipmentLevelButtons = new sap.m.FlexBox({
			         items: [
							new sap.ui.commons.Label({
								text : "",
								width : "25px"
							}),
							oSDASHM2ButtonEquipmentLevelApprove,
							new sap.ui.commons.Label({
								text : "",
								width : "15px"
							}),
							oSDASHM2ButtonEquipmentLevelDownload
			       ],
			       direction : "Row",
			       visible: true,
					}); */

		var oSDASHM2FlexEquipmentLevelButtons1 = new sap.m.FlexBox({
					 items: [
						//oSDASHM2ButtonTariffChecker,
						oSDASHM2ButtonAlert,
						oSDASHM2ButtonEquipmentLevelDownload,
						oSDASHM2ButtonEquipmentLevelExport
				 ],
				 direction : "RowReverse",
				 visible: true,
		});

		var oSDASHM2FlexEquipmentLevelButtons2 = new sap.m.FlexBox({
	         items: [
										oSDASHM2ButtonLessorSurvey,
				            oSDASHM2ButtonAddEst,
										oSDASHM2ButtonEquipmentLevelApprove,
										oSDASHM2ButtonEquipmentLevelCWApprove,
										oSDASHM2ButtonEquipmentLevelCSApprove
	       ],
	       //direction : "RowReverse",
	       visible: true,
		});

		var oSDASHM2FlexEquipmentLevelButtons = new sap.m.FlexBox({
	         items: [
						oSDASHM2FlexEquipmentLevelButtons1,
						oSDASHM2FlexEquipmentLevelButtons2
	       ],
	       direction : "Column",
	       visible: true,
		});

		/* SDASHM2 - Flexbox - Equipment Level Title */

		var oSDASHM2FlexEquipmentLevelTitle = new sap.m.FlexBox({
				 justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
		         items: [
		                oSDASHM2LabelEquipmentLevel,
		                //oSDASHM2FlexEquipmentLevelButtons
		       ],
		       //direction : "RowReverse",
		       visible: true,
		});



		/* SDASHM2 - Page - Equipment Level */

    	var oSDASHM2TableEquipmentLevel = new sap.ui.table.Table("idSDASHM2TableEquipmentLevel",{
    				visibleRowCount: 18,
            //firstVisibleRow: 3,
            fixedColumnCount: 3,
            columnHeaderHeight: 45,
            threshold : 50,
            //width: '98%',
            enableGrouping : true,
            //navigationMode : sap.ui.table.NavigationMode.Scrollbar,
            //showColumnVisibilityMenu : true,
            enableColumnReordering : true,
            selectionMode: sap.ui.table.SelectionMode.MultiToggle,
            visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
            toolbar: new sap.ui.commons.Toolbar({
				items: [

					new sap.ui.commons.Button({
						text: "Reset",
						//icon: "sap-icon://reset",
						press: function(oEvent) {
							oPersoService.delPersData();
							globalSDASHM2TableEquipmentLevelTPC.refresh().done(function() {
								sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").setEnableGrouping(false);
								sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").setEnableGrouping(true);
								//sap.ui.commons.MessageBox.alert("Reset done!", "INFORMATION", "Refresh");
							});

							/* Clear filters and sorting */

							var oSDASHM2TableEquipmentLevel = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel");
							var iColCounter = 0;
							oSDASHM2TableEquipmentLevel.clearSelection();
							var iTotalCols = oSDASHM2TableEquipmentLevel.getColumns().length;
							var oListBinding = oSDASHM2TableEquipmentLevel.getBinding();
							if (oListBinding) {
							oListBinding.aSorters = null;
							oListBinding.aFilters = null;
							}
							oSDASHM2TableEquipmentLevel.getModel().refresh(true);
							for ( iColCounter = 0; iColCounter < iTotalCols; iColCounter++) {
								oSDASHM2TableEquipmentLevel.getColumns()[iColCounter].setSorted(false);
								oSDASHM2TableEquipmentLevel.getColumns()[iColCounter].setFilterValue("");
								oSDASHM2TableEquipmentLevel.getColumns()[iColCounter].setFiltered(false);
							}

						}
					}),
					new sap.ui.commons.Button({
						text: "Layout",
						//icon: "sap-icon://reset",
						press: function(oEvent) {
							globalSDASHM2TableEquipmentLevelTPC.openDialog();
						}
					}),
					new sap.ui.commons.Button({
						text: "Save",
						icon: "sap-icon://save",
						press: function(oEvent) {
							globalSDASHM2TableEquipmentLevelTPC.savePersonalizations().done(function() {
								sap.ui.commons.MessageBox.alert("Layout saved!", "INFORMATION", "Save");
							});
						}
					}),
					new sap.ui.commons.Button({
						text: "Clear Grouping",
						icon: "sap-icon://decline",
						press: function(oEvent) {
							//delta5
							var oBundleLocal = window.localStorage.getItem("oSDASHM2TableEquipmentLevelPersonal") || "{}";
		    				if(oBundleLocal != null && oBundleLocal != "{}"){
		    				oBundleLocal = JSON.parse(oBundleLocal);
		    				for(var i=0; i<oBundleLocal.aColumns.length; i++){
		    					if(oBundleLocal.aColumns[i].grouped == true){
		    						oBundleLocal.aColumns[i].grouped = false;
		    					}
		    				}
		    				var sJSON = JSON.stringify(oBundleLocal, null, 4);
		    				window.localStorage.setItem("oSDASHM2TableEquipmentLevelPersonal", sJSON);
		    				}
							//delta5
							globalSDASHM2TableEquipmentLevelTPC.refresh().done(function() {
								sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").setEnableGrouping(false);
								sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").setEnableGrouping(true);
								//sap.ui.commons.MessageBox.alert("Reset done!", "INFORMATION", "Refresh");

							});
						}
					}),
					new sap.ui.commons.Label("idSDASHM2PageUnitSearchResult",{
						text : ""
					}).addStyleClass("unitSearchResult")
				],
				rightItems: [
					oSDASHM2ButtonAddEst,
					oSDASHM2ButtonEquipmentLevelApprove,
					oSDASHM2ButtonEquipmentLevelCWApprove,
					oSDASHM2ButtonEquipmentLevelCSApprove,
					oSDASHM2ButtonLessorSurvey,
					oSDASHM2ButtonAlert,
					oSDASHM2ButtonEquipmentLevelDownload,
					oSDASHM2ButtonEquipmentLevelExport
				]
			})
    	 }).addStyleClass("sapUiSizeCompact tblBorder sapUiSizeCozy");


    	/*oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.CheckBox("idSDASHM2TableEquipmentLevelColumnCheckBox",{
                change : function(){
                	oCurrent.EquipmentLevelSelectAll();
                }
               }),
    		template: new sap.ui.commons.CheckBox({
      			 //text : "h"
    		}).bindProperty("checked", "isChecked"),
           	width:"35px",
           	resizable:true
           	}));*/

    	//var aNames = sap.ui.core.IconPool.getIconNames();
    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelHISTORY",{
	   		 label: new sap.ui.commons.Label({text: " "}).addStyleClass("wraptextcol"),
			 	 template: new sap.ui.core.Icon({
			           src : sap.ui.core.IconPool.getIconURI( "expand" ), //initiative
			           size : "22px",
			           //color : "blue",
			           //activeColor : "blue",
			           //activeBackgroundColor : "white",
			           //hoverColor : "blue",
			           //hoverBackgroundColor : "white",
			           width : "22px",
			           visible: "{isNormal}",
			           press : function(oEvent){
			        	   global3SerialNo = oEvent.getSource().getBindingContext().getProperty("serialno");
			        	   var icon = oEvent.getSource();
			        	   oCurrent.getSerialHistory(global3SerialNo, icon);
			           }
			 }).addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"50px"
			 }));

			 oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelCAMERA",{
			 	 label: new sap.ui.commons.Label({text: " "}).addStyleClass("wraptextcol"),
			 	 template: new sap.ui.core.Icon({
			 					 src : sap.ui.core.IconPool.getIconURI( "camera" ), //initiative
			 					 size : "22px",
			 					 color : "red",
			 					 activeColor : "red",
			 					 activeBackgroundColor : "white",
			 					 //hoverColor : "blue",
			 					 //hoverBackgroundColor : "white",
			 					 width : "22px",
			 					 visible: "{isNormal}",
			 					 press : function(oEvent){
			 						 // global3SerialNo = oEvent.getSource().getBindingContext().getProperty("serialno");
			 						 // var icon = oEvent.getSource();
			 						 // oCurrent.getSerialHistory(global3SerialNo, icon);
			 					 }
			  }).bindProperty("visible", "isPicExist").addStyleClass("borderStyle1"),
			 			 resizable:true,
			 			 width:"50px"
			  }));

    	var oSDASHM3 = new sdashm3();
    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelSERIAL",{
	   		 label: new sap.ui.commons.Label({text: "Serial No."}).addStyleClass("wraptextcol"),
			 	 template: new sap.ui.commons.Link({
				 press : function(oEvent){

					 global3SerialNo = oEvent.getSource().getBindingContext().getProperty("serialno");
					 global3Equnr = oEvent.getSource().getBindingContext().getProperty("equnr");
					 global3Depot = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 global3EstimateNo = oEvent.getSource().getBindingContext().getProperty("estimateno");
					 global3CustApprEnable = oEvent.getSource().getBindingContext().getProperty("CustApprEnable");
					 busyDialog.open();
					/* SDASHM3 - Value - Header Details */

					 oSDASHM3.setValueHeaderDetails(false, false);	// first false means this is not from serial history popup
					 																								// second false means this is not a process change

					/* SDASHM3 - Value - Record Details */

					 /* oSDASHM3.setValueRecordDetails(); */

					/* SDASHM3 - Value - Estimate Lines */

					 oSDASHM3.setValueEstimateLines(false, false);	// first false means this is not from serial history popup
					 																								// second false means this is not a process change

						/* SDASHM3 - Value - Thumbnail */
						globalPicPanelExpanded = false;
						var oSDASHM3ContentThumbNail = oSDASHM3.setContentThumbnail("");
						sap.ui.getCore().byId("idSDASHM3ContentFinal").insertItem(oSDASHM3ContentThumbNail, 5);
						busyDialog.close();
					/* SDASHM3 - Value - Summary Lines */

					/* oSDASHM3.setValueMiscInfo(); */

					/* SDASHM3 - Move to Unit Overview Page */
					var oTable = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel");          //Get Hold of table
					var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
					//oScrollBar.setScrollPosition(0);

					app.to("idSDASHM3Page");

				 }
			 }).bindProperty("text", "serialno").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"120px",
	           sortProperty: "serialno",
	           filterProperty : "serialno"
			 }));

			 // oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idLeaseColCertificates",{
			 // 	width: "100px",
			 // 	visible:true,
			 // 	label: new sap.ui.commons.Label({text: "Certificates"}).addStyleClass("wraptextcol"),
			 // 	template: new sap.ui.core.Icon({
				// 				src : sap.ui.core.IconPool.getIconURI( "activity-items" ), //initiative
				// 				size : "22px",
				// 				//color : "blue",
				// 				//activeColor : "blue",
				// 				//activeBackgroundColor : "white",
				// 				//hoverColor : "blue",
				// 				//hoverBackgroundColor : "white",
				// 				 width : "22px",
				//  				 press : function(oEvent){
				// 					 var serialno = oEvent.getSource().getParent().getBindingContext().getProperty("serialno");
				// 					 var pcate = oEvent.getSource().getParent().getBindingContext().getProperty("pcate");
				//  					 var onaCERTLevel = new newnaCERTLevel();
				//  					 if(pcate == "TANKS")
				//  						 onaCERTLevel.getCertificatesFromSilverCims(serialno);
				//  					 else
				//  						 onaCERTLevel.getCertificatesFromSAP(serialno);
			 // 				 }
			 // 		 }),
			 // 	resizable:false
			 // }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelEQUIPMENT",{
	   		 label: new sap.ui.commons.Label({text: "Equipment"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "equnr").addStyleClass("borderStyle1"),
	           resizable:true,
	           visible:false,
	           width:"90px",
	           sortProperty: "equnr",
	           filterProperty : "equnr"
			 }));

			 oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelDepot",{
				 visible : false,
 	   		 label: new sap.ui.commons.Label({text: "Depot"}).addStyleClass("wraptextcol"),
	 			 template: new sap.ui.commons.TextView({

	 			 }).bindProperty("text", "depotcode").addStyleClass("borderStyle1"),
 	           resizable:true,
 	           width:"70px",
 	           sortProperty: "depotcode",
 	           filterProperty : "depotcode"
 			 }));

			 oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelDepotName",{
				 visible : false,
 	   		 label: new sap.ui.commons.Label({text: "Depot Name"}).addStyleClass("wraptextcol"),
	 			 template: new sap.ui.commons.TextView({

	 			 }).bindProperty("text", "depotname").addStyleClass("borderStyle1"),
 	           resizable:true,
 	           width:"230px",
 	           sortProperty: "depotname",
 	           filterProperty : "depotname"
 			 }));


			 oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelUT",{
 	   		 label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("wraptextcol"),
 			 template: new sap.ui.commons.TextView({

 			 }).bindProperty("text", "unittype").addStyleClass("borderStyle1"),
 	           resizable:true,
 	           width:"100px",
 	           sortProperty: "unittype",
 	           filterProperty : "unittype"
 			 }));

			 oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelST",{
			 	label: new sap.ui.commons.Label({text: "Sub Type"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "subtype").addStyleClass("borderStyle1"),
			 			resizable:true,
			 			width:"100px",
			 			sortProperty: "subtype",
			 			filterProperty : "subtype"
			 }));

			 oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelPCATE",{
 	   		 label: new sap.ui.commons.Label({text: "Prod. Category"}).addStyleClass("wraptextcol"),
 			 template: new sap.ui.commons.TextView({

 			 }).bindProperty("text", "pcate").addStyleClass("borderStyle1"),
 	           resizable:true,
 	           width:"90px",
 	           sortProperty: "pcate",
 	           filterProperty : "pcate"
 			 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelSTATUS",{
	   		 label: new sap.ui.commons.Label({text: "Status"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "status").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"140px",	//80px
	           sortProperty: "status",
	           filterProperty : "status"
			 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelAGE",{
	   		 label: new sap.ui.commons.Label({text: "Age"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("text", "age").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"60px", //60px
	           sortProperty: "age",
	           filterProperty : "age"
			 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelMANUF",{
	   		 label: new sap.ui.commons.Label({text: "Manuf. Date"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "manuf").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"100px", //60px
	           sortProperty: "manuf",
	           filterProperty : "manuf"
			 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelSTATUSD",{
	   		 label: new sap.ui.commons.Label({text: "Days in status"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("text", "statusdays", function(cellValue){
				 /*if(cellValue > 7 && globalSaleRed){
					 this.addStyleClass("salered");
				 }else{
					 this.removeStyleClass("salered");
				 }*/
				 if(this.getParent().getBindingContext() != undefined){
				 if(this.getParent().getBindingContext().count == undefined){
				 var statusdayshighlight = this.getParent().getBindingContext().getProperty("statusdayshighlight");
				 if(statusdayshighlight == "X"){
					 this.addStyleClass("salered");
				 }else{
					 this.removeStyleClass("salered");
				 }
			 	 }
			 	 }
				 return cellValue;
			 }).addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"80px",	//80px
	           sortProperty: "statusdays",
	           filterProperty : "statusdays"
			 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelCUSTNO",{
	   		 label: new sap.ui.commons.Label({text: "Customer No."}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "customer").addStyleClass("borderStyle"),
			 resizable:true,
	           width:"100px",
						 sortProperty: "customer",
						 filterProperty : "customer"
			 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelCUSTNAME",{
	   		 label: new sap.ui.commons.Label({text: "Customer Name"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "customername").addStyleClass("borderStyle"),
			 resizable:true,
	           width:"220px",
						 sortProperty: "customername",
						 filterProperty : "customername"
			 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelOFFLOC",{
    		 visible : true,
	   		 label: new sap.ui.commons.Label({text: "Off Hire Location"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "offhirelocation").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"160px",
	           sortProperty: "offhirelocation",
	           filterProperty : "offhirelocation",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelOFFDATE",{
	   		 label: new sap.ui.commons.Label({text: "Off Hire Date"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "offhiredate").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"90px", //90px
	           sortProperty: "offhiredatex",
	           filterProperty : "offhiredate",
			 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelCOMMENT",{
	   		 label: new sap.ui.commons.Label({text: "M&R Comment"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "mnrcomment").addStyleClass("borderStyle wraptext"),
			 resizable:true,
	           width:"200px",
						 sortProperty: "mnrcomment",
						 filterProperty : "mnrcomment"
			 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelESTIMATE",{
	   		 label: new sap.ui.commons.Label({text: "Estimate No."}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "estimateno").addStyleClass("borderStyle1"),
	           resizable:true,
	           visible:false,
	           width:"90px",
	           sortProperty: "estimateno",
	           filterProperty : "estimateno"
			 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelESTTYPE",{
	   		 label: new sap.ui.commons.Label({text: "Estimate Type"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "estimatetype").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"90px",	//110px
	           sortProperty: "estimatetype",
	           filterProperty : "estimatetype",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));

       	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelESTDATE",{
	   		 label: new sap.ui.commons.Label({text: "Estimate Date"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "estimatedate").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"90px",	//90px
	           flexible: true,
	           sortProperty: "estimatedatex",
	           filterProperty : "estimatedate",
			 }));

       	/*oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelAMT",{
       		visible : false,
	   		 label: new sap.ui.commons.Label({text: "Orig. Amt"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("idSDASHM2TableEquipmentLevelColumnEstimateamt",{
				 textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("text", "estimateamt").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"100px",
	           sortProperty: "numestimateamt",
	           filterProperty : "estimateamt"
			 }));

       	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelAMTA",{
       		visible : false,
	   		 label: new sap.ui.commons.Label({text: "Add. Amt", textAlign : sap.ui.core.TextAlign.Right}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("text", "addestimateamt").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"110px",
	           sortProperty: "numaddestimateamt",
	           filterProperty : "addestimateamt"
			 }));*/

       	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelAMTT",{
	   		 label: new sap.ui.commons.Label({text: "Estimate Amt"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("text", "totestimateamt").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"80px",
	           sortProperty: "numtotestimateamt",
	           filterProperty : "totestimateamt"
			 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelCURR",{
	   		 label: new sap.ui.commons.Label({text: "Estimate Curr."}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "estimatecurrency").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"60px",	//70px
	           sortProperty: "estimatecurrency",
	           filterProperty : "estimatecurrency"
			 }));


       	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelAMTTU",{
	   		 label: new sap.ui.commons.Label({text: "Estimate Amt (USD)"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("text", "totestimateamtusd").addStyleClass("borderStyle1"),
	           resizable:true,
	           visible:false,
	           width:"110px",
	           sortProperty: "numtotestimateamtusd",
	           filterProperty : "totestimateamtusd"
			 }));

       	/*oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column({
       		 visible : false,
	   		 label: new sap.ui.commons.Label({text: "CW Amt."}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextField({
				 enabled:true,
				 //textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("value", "cwamt").addStyleClass("borderStyle"),
	           resizable:true,
	           width:"100px",
	           sortProperty: "numcwamt",
	           filterProperty : "cwamt"
			 }));

       	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelGRADE",{
	   		 label: new sap.ui.commons.Label({text: "Grade", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("text", "salesgrade").addStyleClass("borderStyle1 centerAlign"),
	           resizable:true,
	           width:"55px",	//60px
	           sortProperty: "salesgrade",
	           filterProperty : "salesgrade"
			 }));*/


    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelFSTATUS",{
	   		 label: new sap.ui.commons.Label({text: "Status"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "curstatus").addStyleClass("borderStyle1"),
			   resizable:true,
	           width:"220px",
	           sortProperty: "curstatus",
	           filterProperty : "curstatus"
			 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelREF",{
	   		 label: new sap.ui.commons.Label({text: "Reference"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "reference").addStyleClass("borderStyle"),
			 resizable:true,
	           width:"120px",
						 sortProperty: "reference",
	           filterProperty : "reference"
			 }));


       	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelRCRIT",{
	   		 label: new sap.ui.commons.Label({text: "Repair Criteria"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "criteria").addStyleClass("borderStyle1"),
			 resizable:true,
	           width:"90px",	//70px
	           sortProperty: "criteria",
	           filterProperty : "criteria"
			 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelTRCOST",{
	   		 label: new sap.ui.commons.Label({text: "Repair Auth. Amt"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("text", "totalrepaircost").addStyleClass("borderStyle"),
			 resizable:true,
	         width:"100px",
					 sortProperty: "numtotalrepaircost",
					 filterProperty : "totalrepaircost"
    	}));

			oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelTRCOSTUSD",{
	   		 label: new sap.ui.commons.Label({text: "Repair Auth. Amt (USD)"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("text", "totalrepaircostusd").addStyleClass("borderStyle"),
			 resizable:true,
	         width:"100px",
					 sortProperty: "numtotalrepaircostusd",
					 filterProperty : "totalrepaircostusd"
    	}));


    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelURCOST",{
	   		 label: new sap.ui.commons.Label({text: "Lessee Cost"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("text", "lesseecost").addStyleClass("borderStyle"),
			 resizable:true,
	           width:"100px",
						 sortProperty: "numlesseecost",
						 filterProperty : "lesseecost"
			 }));

			 oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelURCOSTUSD",{
 	   		 label: new sap.ui.commons.Label({text: "Lessee Cost (USD)"}).addStyleClass("wraptextcol"),
 			 template: new sap.ui.commons.TextView({
 				 textAlign : sap.ui.core.TextAlign.Right
 			 }).bindProperty("text", "lesseecostusd").addStyleClass("borderStyle"),
 			 resizable:true,
 	           width:"100px",
 						 sortProperty: "numlesseecostusd",
 						 filterProperty : "lesseecostusd"
 			 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelTABDAYS",{
	   		 label: new sap.ui.commons.Label({text: "TAB Days (Remaining)"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("text", "tabdays", function(cellValue){
				 if(cellValue == 99999){
					 cellValue = "";
					 this.removeStyleClass("salered");
				 }else if(cellValue <= 30){
					 this.addStyleClass("salered");
				 }else{
					 this.removeStyleClass("salered");
				 }
				 return cellValue;
			 }).addStyleClass("borderStyle"),
			 resizable:true,
	           width:"100px",
						 sortProperty: "numtabdays",
						 filterProperty : "tabdays"
			 }));

    		oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelCWLOC",{
   	   		 label: new sap.ui.commons.Label({text: "CW Amount (Local)"}).addStyleClass("wraptextcol"),
   			 template: new sap.ui.commons.TextView({
   				textAlign : sap.ui.core.TextAlign.Right
   			 }).bindProperty("text", "cwamtloc").addStyleClass("borderStyle"),
   			 resizable:true,
   	           width:"100px",
							 sortProperty: "numcwamtloc",
							 filterProperty : "cwamtloc"
   			 }));
    	//}

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelCWUSD",{
	   		 label: new sap.ui.commons.Label({text: "CW Amount (USD)"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("text", "cwamtusd").addStyleClass("borderStyle"),
			 resizable:true,
	           width:"100px",
						 sortProperty: "numcwamtusd",
						 filterProperty : "cwamtusd"
			 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentLevelGRADE",{
	   		 label: new sap.ui.commons.Label({text: "Container Grade"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("text", "salesgrade").addStyleClass("borderStyle"),
			 resizable:true,
	           width:"100px",
						 sortProperty: "numsalesgrade",
						 filterProperty : "salesgrade"
			 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column({
  		 label: new sap.ui.commons.Label({text: "Last Action"}).addStyleClass("wraptextcol"),
		 template: new sap.ui.commons.TextView({
		 }).bindProperty("text", "lastaction").addStyleClass("borderStyle1 wraptext"),
		 			resizable:true,
          width:"380px",
					sortProperty: "lastaction",
					filterProperty : "lastaction"
		 }));

    	oSDASHM2TableEquipmentLevel.addColumn(new sap.ui.table.Column("idSDASHM2TableEquipmentCONTACT",{
    		width:"100px",
    		visible : true,
    		label: new sap.ui.commons.Label({text: " ", textAlign: "Center"}).addStyleClass("wraptextcol"),
			template: new sap.ui.layout.HorizontalLayout({
	   		    content : [
	   		               	oCurrent.getContactIcon().addStyleClass("smallIcons"),
												oCurrent.getTanksIcon().addStyleClass("smallIcons"),
											  new sap.ui.commons.Label({text: "", width: "10px"})
	   		               ],
			 }),
			 resizable:true,
			 }));

    	var printPersoData = function(sJSON) {
			//jQuery("#perso-data").html(sJSON
    		//console.log(sJSON);
			/*	.replace(/\n/g, "<br>")
				.replace(/\s/g, "&nbsp;")
				.replace(/(true)/g, "<span style=\"color:green\">$1</span>")
				.replace(/(false)/g, "<span style=\"color:red\">$1</span>"));*/
		};

		var oPersoService = {

			getPersData: function() {
				var oDeferred = jQuery.Deferred();
				var sJSON = window.localStorage.getItem("oSDASHM2TableEquipmentLevelPersonal") || "{}";
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
						case "idSDASHM2TableEquipmentLevel-idSDASHM2TableEquipmentLevelSERIAL":
							grpColumnname = "serialno";
							break;
						case "idSDASHM2TableEquipmentLevel-idSDASHM2TableEquipmentLevelEQUIPMENT":
							grpColumnname = "equnr";
							break;
						case "idSDASHM2TableEquipmentLevel-idSDASHM2TableEquipmentLevelUT":
							grpColumnname = "unittype";
							break;
							case "idSDASHM2TableEquipmentLevel-idSDASHM2TableEquipmentLevelST":
								grpColumnname = "subtype";
								break;
							case "idSDASHM2TableEquipmentLevel-idSDASHM2TableEquipmentLevelDepot":
								grpColumnname = "depotcode";
								break;
								case "idSDASHM2TableEquipmentLevel-idSDASHM2TableEquipmentLevelDepotName":
									grpColumnname = "depotname";
									break;
						case "idSDASHM2TableEquipmentLevel-idSDASHM2TableEquipmentLevelSTATUS":
							grpColumnname = "status";
							break;
						case "idSDASHM2TableEquipmentLevel-idSDASHM2TableEquipmentLevelSTATUSD":
							grpColumnname = "statusdays";
							break;
						case "idSDASHM2TableEquipmentLevel-idSDASHM2TableEquipmentLevelOFFDATE":
							grpColumnname = "offhiredate";
							break;
						case "idSDASHM2TableEquipmentLevel-idSDASHM2TableEquipmentLevelESTIMATE":
							grpColumnname = "estimateno";
							break;
						case "idSDASHM2TableEquipmentLevel-idSDASHM2TableEquipmentLevelESTTYPE":
							grpColumnname = "estimatetype";
							break;
						case "idSDASHM2TableEquipmentLevel-idSDASHM2TableEquipmentLevelESTDATE":
							grpColumnname = "estimatedate";
							break;
						case "idSDASHM2TableEquipmentLevel-idSDASHM2TableEquipmentLevelAMTT":
							grpColumnname = "totestimateamt";
							break;
						case "idSDASHM2TableEquipmentLevel-idSDASHM2TableEquipmentLevelCURR":
							grpColumnname = "estimatecurrency";
							break;
						case "idSDASHM2TableEquipmentLevel-idSDASHM2TableEquipmentLevelRCRIT":
							grpColumnname = "criteria";
							break;
						case "idSDASHM2TableEquipmentLevel-idSDASHM2TableEquipmentLevelFSTATUS":
							grpColumnname = "curstatus";
							break;
						case "idSDASHM2TableEquipmentLevel-idSDASHM2TableEquipmentLevelREF":
							grpColumnname = "reference";
							break;
					}

					var flags = [], output = [], l = oSDASHMJsonEquipmentLevel.length, i;
					for( i=0; i<l; i++) {
					    if( flags[oSDASHMJsonEquipmentLevel[i][grpColumnname]]) continue;
					    flags[oSDASHMJsonEquipmentLevel[i][grpColumnname]] = true;
					    output.push(oSDASHMJsonEquipmentLevel[i][grpColumnname]);
					}
					console.log(output.length + " Unique " + grpColumnname + " found");

					var groupHeaderLength = output.length;
					var valuesLength = oSDASHMJsonEquipmentLevel.length;
					var tableLength = groupHeaderLength + valuesLength;
					var oSDASHM2TableEquipmentLevel = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel");


					}else{
						var oSDASHM2TableEquipmentLevel = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel");
					}
					 /* grouping additiong */
				var sJSON = JSON.stringify(oBundle, null, 4);
				window.localStorage.setItem("oSDASHM2TableEquipmentLevelPersonal", sJSON);
				printPersoData(sJSON);
				oDeferred.resolve();
				return oDeferred.promise();
			},

			delPersData: function() {
				var oDeferred = jQuery.Deferred();
				window.localStorage.removeItem("oSDASHM2TableEquipmentLevelPersonal");
				printPersoData("");
				oDeferred.resolve();
				return oDeferred.promise();
			}

		};

		jQuery.sap.require("sap.ui.table.TablePersoController");
		var oSDASHM2TableEquipmentLevelTPC = new sap.ui.table.TablePersoController("idSDASHM2TableEquipmentLevelTPC", {
			table: oSDASHM2TableEquipmentLevel,
			persoService: oPersoService,
			hasGrouping: true
		});
		globalSDASHM2TableEquipmentLevelTPC = oSDASHM2TableEquipmentLevelTPC;

			/* SDASHM2 - Flexbox - Equipment Level */

			var oSDASHM2FlexEquipmentLevel = new sap.m.FlexBox({
			         items: [
			                oSDASHM2FlexEquipmentLevelTitle,
							new sap.ui.commons.Label({
								text : "",
								width : "100px"
							}),
							oSDASHM2TableEquipmentLevel,
							new sap.ui.commons.Label({
								text : "",
								width : "100px"
							}),
							//oSDASHM2FlexEquipmentLevelButtons
			       ],
			       direction : "Column",
			       visible: true,
			}).addStyleClass("marginLeft20");


    	return oSDASHM2FlexEquipmentLevel;

	},

	/* SDASHM2 - Function - Set Equipment Level Values */

	setSDASHM2Values : function(depotcode, column, value, depotview2set, depotname, location){

		var urlToSap = "";
		if(depotview2set != ""){
			urlToSap = depotview2set;
		}else{

			// Button Visible : Functionality - Default all are hidden
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCSApprove").setVisible(false);
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
			// sap.ui.getCore().byId("idSDASHM2ButtonAddEst").setVisible(false);
			// sap.ui.getCore().byId("idSDASHM2ButtonLessorSurvey").setVisible(false);
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCWApprove").setVisible(false);

		if(column == ""){

		}else	if(column == "DEPO" || column == "TSTOCK"){
			column = "";
			// Button Visible : Functionality
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCSApprove").setVisible(true);
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(true);
			// sap.ui.getCore().byId("idSDASHM2ButtonAddEst").setVisible(true);
			// sap.ui.getCore().byId("idSDASHM2ButtonLessorSurvey").setVisible(true);
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCWApprove").setVisible(true);
		}else if(column.substr(0,4) == "AWAP"){
			// Button Visible : Functionality
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCSApprove").setVisible(true);
			//
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
			// sap.ui.getCore().byId("idSDASHM2ButtonAddEst").setVisible(false);
			// sap.ui.getCore().byId("idSDASHM2ButtonLessorSurvey").setVisible(false);
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCWApprove").setVisible(false);
		}else if(column.substr(0,4) == "AUTH"){
			// Button Visible : Functionality
			// sap.ui.getCore().byId("idSDASHM2ButtonAddEst").setVisible(true);
			// sap.ui.getCore().byId("idSDASHM2ButtonLessorSurvey").setVisible(true);
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCWApprove").setVisible(true);
			//
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCSApprove").setVisible(false);
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
		}else if(column.substr(0,4) == "HOLD"){
			// Button Visible : Functionality
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(true);
			// sap.ui.getCore().byId("idSDASHM2ButtonLessorSurvey").setVisible(true);
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCWApprove").setVisible(true);
			//
			// sap.ui.getCore().byId("idSDASHM2ButtonAddEst").setVisible(false);
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCSApprove").setVisible(false);
		}else if(column.substr(0,4) == "AVLB"){
			// Button Visible : Functionality
			// sap.ui.getCore().byId("idSDASHM2ButtonAddEst").setVisible(true);
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCWApprove").setVisible(true);
			//
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCSApprove").setVisible(false);
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
			// sap.ui.getCore().byId("idSDASHM2ButtonLessorSurvey").setVisible(false);
		}else if(column.substr(0,4) == "SALE"){
			// Button Visible : Functionality
			// sap.ui.getCore().byId("idSDASHM2ButtonAddEst").setVisible(false);
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCWApprove").setVisible(true);
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCSApprove").setVisible(false);
			// sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelApprove").setVisible(false);
			// sap.ui.getCore().byId("idSDASHM2ButtonLessorSurvey").setVisible(false);
		}

		/*if(column == "WEST" || column == "AWAP"){
			globalSaleRed = true;
		}else{
			globalSaleRed = false;
		}*/
		var tabdayslocal = "";
		globalColumnStatus = column;
		urlToSap = "depotview2Set?$filter=Depot eq '" + depotcode + "' and Status eq '" + column + "'";
        urlToSap = serviceDEP + urlToSap;
        globalUrlDepotView2Set = urlToSap;
		}

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


                      var depotView2Result = data.results;
                      oSDASHMJsonEquipmentLevel = [];

                      if(depotView2Result.length == 0){
                    	  sap.ui.commons.MessageBox.alert("No data found");
                    	  console.log("Get Seaco Depot View 2 Success; but returned nothing");
                      }else{
                    	  console.log("Get Seaco Depot View 2 Success");
                      globalSDASHM2ExchangeRate = depotView2Result[0].Zexcur;
                      for(var j=0; j<depotView2Result.length; j++){
                    	  var offdate = "";
                    	  var offdatex = "";
                    	  var estdate = "";
                    	  var estdatex = "";
                      if(depotView2Result[j].Zoffdate != null){
                      var vMessageDate = depotView2Result[j].Zoffdate.split("(");
                      var vMsgDate = vMessageDate[1].split(")");
                      //var vformattedMessageDate = new Date(Number(vMsgDate[0]));
                      offdate = dateFormat(new Date(Number(vMsgDate[0])), 'dd/mm/yyyy',"UTC"); // MACC_17022017 changed from '-' to '/'
                      offdatex = offdate.substr(6,4) + offdate.substr(3,2) + offdate.substr(0,2);
                      }

                      if(depotView2Result[j].Zestdate != null){
                          var vMessageDate = depotView2Result[j].Zestdate.split("(");
                          var vMsgDate = vMessageDate[1].split(")");
                          //var vformattedMessageDate = new Date(Number(vMsgDate[0]));
                          estdate = dateFormat(new Date(Number(vMsgDate[0])), 'dd/mm/yyyy',"UTC"); // MACC_17022017 changed from '-' to '/'
                          estdatex = estdate.substr(6,4) + estdate.substr(3,2) + estdate.substr(0,2);
                      }

                      var isawap = true;
                      if(depotView2Result[j].Isawap == 'X'){
                    	  isawap = true;
                      }else{
                    	  isawap = false;
                      }

											if(depotView2Result[j].Zestamt == "")
										 		depotView2Result[j].Zestamt = "0.00";

												if(depotView2Result[j].Zaddest == "")
													depotView2Result[j].Zaddest = "0.00";

													if(depotView2Result[j].Ztotest == "")
												 		depotView2Result[j].Ztotest = "0.00";

														if(depotView2Result[j].ZtotestUsd == "")
													 		depotView2Result[j].ZtotestUsd = "0.00";

															if(depotView2Result[j].CwamtLoc == "")
														 		depotView2Result[j].CwamtLoc = "0.00";

																if(depotView2Result[j].CwamtUsd == "")
															 		depotView2Result[j].CwamtUsd = "0.00";

																	if(depotView2Result[j].TotRepCost == "")
																		depotView2Result[j].TotRepCost = "0.00";

																		if(depotView2Result[j].TotRepCostUsd == "")
																			depotView2Result[j].TotRepCostUsd = "0.00";

																		if(depotView2Result[j].CwReprc == "")
																	 		depotView2Result[j].CwReprc = "0.00";

												// if(depotView2Result[j].TabDays == ""){
												// 	tabdayslocal = "";
												// }else{
												// 	tabdayslocal =	(depotView2Result[j].TabDays == "00000")?0:parseInt(depotView2Result[j].TabDays);
												// }

												tabdayslocal = depotView2Result[j].TabDays;

                    	  oSDASHMJsonEquipmentLevel.push({

                    		  	depotcode :  depotView2Result[j].Zdepot,
                    		  	depotname :  depotView2Result[j].Zdepotname,
                    		  	isChecked : false,
                    			//sno : "2",

                    			serialno : depotView2Result[j].Zserno,
                    			unittype : depotView2Result[j].Zunitype,
													subtype : depotView2Result[j].SubType,
													pcate : depotView2Result[j].Zpcat,
                    			status : depotView2Result[j].Zstatus,
                    			statusdays : depotView2Result[j].Statusdays,
													statusdayshighlight : depotView2Result[j].DaysExceeded,
                    			age : depotView2Result[j].Zage,
                    			manuf : depotView2Result[j].MfgMonth,

                    			//offhirelocation : location + "-" + depotcode,
													offhirelocation : depotView2Result[j].Ext1,
                    			offhiredate : offdate,
                    			offhiredatex : offdatex,

                    			estimateno : depotView2Result[j].Zestno,
                    			estimatetype : depotView2Result[j].Zestimate,
                    			estimatedate : estdate,
                    			estimatedatex : estdatex,

                    			estimateamt : depotView2Result[j].Zestamt,
                    			addestimateamt : depotView2Result[j].Zaddest,

                    			totestimateamt : thousandsep(depotView2Result[j].Ztotest),
                    			totestimateamtusd : thousandsep(depotView2Result[j].ZtotestUsd),

													cwamtloc : thousandsep(depotView2Result[j].CwamtLoc),
													numcwamtloc : (depotView2Result[j].CwamtLoc == "")?0:parseFloat(depotView2Result[j].CwamtLoc.split(',').join('')),
													cwamtusd : thousandsep(depotView2Result[j].CwamtUsd),
													numcwamtusd : (depotView2Result[j].CwamtUsd == "")?0:parseFloat(depotView2Result[j].CwamtUsd.split(',').join('')),

													totalrepaircost : thousandsep(depotView2Result[j].TotRepCost),
													numtotalrepaircost : (depotView2Result[j].TotRepCost == "")?0:parseFloat(depotView2Result[j].TotRepCost.split(',').join('')),

													totalrepaircostusd : thousandsep(depotView2Result[j].TotRepCostUsd),
													numtotalrepaircostusd : (depotView2Result[j].TotRepCostUsd == "")?0:parseFloat(depotView2Result[j].TotRepCostUsd.split(',').join('')),

													lesseecost : thousandsep(depotView2Result[j].LesseeCost),
													numlesseecost : (depotView2Result[j].LesseeCost == "")?0:parseFloat(depotView2Result[j].LesseeCost.split(',').join('')),

													lesseecostusd : thousandsep(depotView2Result[j].LesseeCostUsd),
													numlesseecostusd : (depotView2Result[j].LesseeCostUsd == "")?0:parseFloat(depotView2Result[j].LesseeCostUsd.split(',').join('')),

                    			estimatecurrency : depotView2Result[j].Zestcur,
													documentcurrency : depotView2Result[j].Zdoccur,
                    			estimatecurrencyusd : "USD",
                    			exchange : depotView2Result[j].Zexcur,
                    			cwamt : "",

                    			customer : depotView2Result[j].Customer,
                    			customername : depotView2Result[j].Customername,
                    			cwrepaircost : depotView2Result[j].CwReprc,

                    			mnrcomment : depotView2Result[j].Mrcmt,
                    			mfgdate : depotView2Result[j].MfgMonth,
                    			tabdays : tabdayslocal,
													numtabdays : tabdayslocal,

                    			salesgrade : depotView2Result[j].Zsales,
													numsalesgrade : (depotView2Result[j].Zsales == "")?0:parseFloat(depotView2Result[j].Zsales.split(',').join('')),

                    			numestimateamt : (depotView2Result[j].Zestamt == "")?0:parseFloat(depotView2Result[j].Zestamt.split(',').join('')),
                    			numaddestimateamt : (depotView2Result[j].Zaddest == "")?0:parseFloat(depotView2Result[j].Zaddest.split(',').join('')),
                    			numtotestimateamt : (depotView2Result[j].Ztotest == "")?0:parseFloat(depotView2Result[j].Ztotest.split(',').join('')),
                    			numtotestimateamtusd : (depotView2Result[j].ZtotestUsd == "")?0:parseFloat(depotView2Result[j].ZtotestUsd.split(',').join('')),


                    			criteria : depotView2Result[j].Zins,
                    			isawap : isawap,

                    			curstatus : depotView2Result[j].Zcurrstat,
                    			lastaction : depotView2Result[j].Zlastact,
                    			reference : depotView2Result[j].Reference,
                    			equnr : depotView2Result[j].Zequnr,

													LsrEnable : depotView2Result[j].LsrEnable,
													AddtEnable : depotView2Result[j].AddtEnable,
													PredelEnable : depotView2Result[j].PredelEnable,
													CustApprEnable : depotView2Result[j].CustApprEnable,
													CwApprEnable : depotView2Result[j].CwApprEnable,
													Isawap : depotView2Result[j].Isawap,

													qmnum : depotView2Result[j].Qmnum,
													isPicExist : (depotView2Result[j].Picexist == "X")?true:false
                         });

                      }

                    var oSDASHM2ModelEquipmentLevel = new sap.ui.model.json.JSONModel();
              			oSDASHM2ModelEquipmentLevel.setData({modelData: oSDASHMJsonEquipmentLevel});
										var unitsfound = "Number of unit(s) found : " + oSDASHMJsonEquipmentLevel.length;
										sap.ui.getCore().byId("idSDASHM2PageUnitSearchResult").setText(unitsfound);
	              		// Set Local Currency to a global variable
	              		globalSDASHM2LocalCurrency = oSDASHMJsonEquipmentLevel[0].estimatecurrency;

                  	var oSDASHM2TableEquipmentLevel = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel");
                  	oSDASHM2TableEquipmentLevel.setModel(oSDASHM2ModelEquipmentLevel);
                  	oSDASHM2TableEquipmentLevel.bindRows("/modelData");
                  	oSDASHM2TableEquipmentLevel.clearSelection();

                  	var oSDASHMJsonEquipmentLevelLength = oSDASHMJsonEquipmentLevel.length;
                  	if(oSDASHMJsonEquipmentLevelLength < 18){
                  		//oSDASHM2TableEquipmentLevel.setVisibleRowCount(oSDASHMJsonEquipmentLevelLength);
                  		oSDASHM2TableEquipmentLevel.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
                  	}
                  	else{
                  		//oSDASHM2TableEquipmentLevel.setVisibleRowCount(17);
                  		oSDASHM2TableEquipmentLevel.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
                  	}

                  	globalSDASHM2TableEquipmentLevelTPC.refresh();

                  	globalSDASHM2Currency = "LOC";
                  	sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelSwitch").setText("Switch to USD");
                  	var oTable = sap.ui.getCore().byId("idSDASHM1TableStatusMonitor");          //Get Hold of table
		    		        var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
		    		        //oScrollBar.setScrollPosition(0);

										/* Clear filters and sorting */

										var oSDASHM2TableEquipmentLevel = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel");
										var iColCounter = 0;
										oSDASHM2TableEquipmentLevel.clearSelection();
										var iTotalCols = oSDASHM2TableEquipmentLevel.getColumns().length;
										var oListBinding = oSDASHM2TableEquipmentLevel.getBinding();
										if (oListBinding) {
										oListBinding.aSorters = null;
										oListBinding.aFilters = null;
										}
										oSDASHM2TableEquipmentLevel.getModel().refresh(true);
										for ( iColCounter = 0; iColCounter < iTotalCols; iColCounter++) {
										oSDASHM2TableEquipmentLevel.getColumns()[iColCounter].setSorted(false);
										oSDASHM2TableEquipmentLevel.getColumns()[iColCounter].setFilterValue("");
										oSDASHM2TableEquipmentLevel.getColumns()[iColCounter].setFiltered(false);
										}

										//sap.ui.getCore().byId("idSDASHM2TableEquipmentLevelDepot").setVisible(true);
										//sap.ui.getCore().byId("idSDASHM2TableEquipmentLevelDepotName").setVisible(true);
										sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setVisible(true);
										sap.ui.getCore().byId("idSDASHM1PageBarInputSearch").setValue("");
										sap.ui.getCore().byId("idSDASHM2PageBarInputSearch").setValue("");
                  	app.to("idSDASHM2Page");
                    }
                      busyDialog.close();

                    },
                  function(error){
                    sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                	  console.log("Get Seaco Depot View 2 Failure");
                	  busyDialog.close();
                  });

	},

	EquipmentLevelSelectAll : function(){

		/*var len = oSDASHMJsonEquipmentLevel.length;
	    var oSDASHM2TableEquipmentLevel = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel");
	    if(sap.ui.getCore().byId("idSDASHM2TableEquipmentLevelColumnCheckBox").getChecked()){
	      for(var i=0;i<len;i++){
	    	  oSDASHMJsonEquipmentLevel[i].isChecked = true;
	      }
	    }
	    else{
	      for(var i=0;i<len;i++){
	    	  oSDASHMJsonEquipmentLevel[i].isChecked = false;
	      }
	    }

	    oSDASHM2TableEquipmentLevel.getModel().updateBindings();*/

	},

	switchCurrency : function(){
		//globalSDASHM2ExchangeRate
		  /*var multiplicationFactor = "0.00";
		  var currency = "";

	  	  if(globalSDASHM2Currency == "LOC"){
	  		  multiplicationFactor = parseFloat(globalSDASHM2ExchangeRate);
	  		  currency = "USD";
	  		  globalSDASHM2Currency = "USD";
	  		  sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelSwitch").setText("Switch to depot currency");
		  }else{
			  multiplicationFactor = 1 / parseFloat(globalSDASHM2ExchangeRate);
			  currency = globalSDASHM2LocalCurrency;
			  globalSDASHM2Currency = "LOC";
			  sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelSwitch").setText("Switch to USD");
		  }

	  	multiplicationFactor = "";
	  	if(globalSDASHM2Currency == "USD"){
		for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
			multiplicationFactor = parseFloat(oSDASHMJsonEquipmentLevel[i].exchange.split(',').join(''));
			if(oSDASHMJsonEquipmentLevel[i].estimateamt != "0.00"){
				oSDASHMJsonEquipmentLevel[i].estimateamt = parseFloat(oSDASHMJsonEquipmentLevel[i].estimateamt.split(',').join('')) * multiplicationFactor;
				oSDASHMJsonEquipmentLevel[i].estimateamt = thousandsep(oSDASHMJsonEquipmentLevel[i].estimateamt);
			}

			if(oSDASHMJsonEquipmentLevel[i].totestimateamt != "0.00"){
				oSDASHMJsonEquipmentLevel[i].totestimateamt = parseFloat(oSDASHMJsonEquipmentLevel[i].totestimateamt.split(',').join('')) * multiplicationFactor;
				oSDASHMJsonEquipmentLevel[i].totestimateamt = thousandsep(oSDASHMJsonEquipmentLevel[i].totestimateamt);
			}

			if(oSDASHMJsonEquipmentLevel[i].addestimateamt != "0.00"){
				oSDASHMJsonEquipmentLevel[i].addestimateamt = parseFloat(oSDASHMJsonEquipmentLevel[i].addestimateamt.split(',').join('')) * multiplicationFactor;
				oSDASHMJsonEquipmentLevel[i].addestimateamt = thousandsep(oSDASHMJsonEquipmentLevel[i].addestimateamt);
			}

			if(oSDASHMJsonEquipmentLevel[i].cwamt != "0.00"){
				oSDASHMJsonEquipmentLevel[i].cwamt = parseFloat(oSDASHMJsonEquipmentLevel[i].cwamt.split(',').join('')) * multiplicationFactor;
				oSDASHMJsonEquipmentLevel[i].cwamt = thousandsep(oSDASHMJsonEquipmentLevel[i].cwamt);
			}
			oSDASHMJsonEquipmentLevel[i].estimatecurrency = currency;
		}
	  	}else{
  		for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
  			multiplicationFactor = 1 / parseFloat(oSDASHMJsonEquipmentLevel[i].exchange.split(',').join(''));
  			if(oSDASHMJsonEquipmentLevel[i].estimateamt != "0.00"){
				oSDASHMJsonEquipmentLevel[i].estimateamt = parseFloat(oSDASHMJsonEquipmentLevel[i].estimateamt.split(',').join('')) * multiplicationFactor;
				oSDASHMJsonEquipmentLevel[i].estimateamt = thousandsep(oSDASHMJsonEquipmentLevel[i].estimateamt);
			}

			if(oSDASHMJsonEquipmentLevel[i].totestimateamt != "0.00"){
				oSDASHMJsonEquipmentLevel[i].totestimateamt = parseFloat(oSDASHMJsonEquipmentLevel[i].totestimateamt.split(',').join('')) * multiplicationFactor;
				oSDASHMJsonEquipmentLevel[i].totestimateamt = thousandsep(oSDASHMJsonEquipmentLevel[i].totestimateamt);
			}

			if(oSDASHMJsonEquipmentLevel[i].addestimateamt != "0.00"){
				oSDASHMJsonEquipmentLevel[i].addestimateamt = parseFloat(oSDASHMJsonEquipmentLevel[i].addestimateamt.split(',').join('')) * multiplicationFactor;
				oSDASHMJsonEquipmentLevel[i].addestimateamt = thousandsep(oSDASHMJsonEquipmentLevel[i].addestimateamt);
			}

			if(oSDASHMJsonEquipmentLevel[i].cwamt != "0.00"){
				oSDASHMJsonEquipmentLevel[i].cwamt = parseFloat(oSDASHMJsonEquipmentLevel[i].cwamt.split(',').join('')) * multiplicationFactor;
				oSDASHMJsonEquipmentLevel[i].cwamt = thousandsep(oSDASHMJsonEquipmentLevel[i].cwamt);
			}
			oSDASHMJsonEquipmentLevel[i].estimatecurrency = currency;
		}
	  	}
		var oSDASHM2ModelEquipmentLevel = new sap.ui.model.json.JSONModel();
		oSDASHM2ModelEquipmentLevel.setData({modelData: oSDASHMJsonEquipmentLevel});

    	var oSDASHM2TableEquipmentLevel = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel");
    	oSDASHM2TableEquipmentLevel.setModel(oSDASHM2ModelEquipmentLevel);
    	oSDASHM2TableEquipmentLevel.bindRows("/modelData");*/

		/*
		if(sap.ui.getCore().byId("idSDASHM2TableEquipmentLevelAMTT").getVisible()){
			sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelSwitch").setText("Switch to depot currency");
			sap.ui.getCore().byId("idSDASHM2TableEquipmentLevelAMTT").setVisible(false);
			sap.ui.getCore().byId("idSDASHM2TableEquipmentLevelCURR").setVisible(false);
			sap.ui.getCore().byId("idSDASHM2TableEquipmentLevelAMTTUSD").setVisible(true);
			sap.ui.getCore().byId("idSDASHM2TableEquipmentLevelCURRUSD").setVisible(true);
		}else{
			sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelSwitch").setText("Switch to USD");
			sap.ui.getCore().byId("idSDASHM2TableEquipmentLevelAMTTUSD").setVisible(false);
			sap.ui.getCore().byId("idSDASHM2TableEquipmentLevelCURRUSD").setVisible(false);
			sap.ui.getCore().byId("idSDASHM2TableEquipmentLevelAMTT").setVisible(true);
			sap.ui.getCore().byId("idSDASHM2TableEquipmentLevelCURR").setVisible(true);
		}*/
		  var selectedIndices = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
		  var currency = "";
		  var temp = "";

	  	  if(globalSDASHM2Currency == "LOC"){
	  		  currency = "USD";
	  		  globalSDASHM2Currency = "USD";
	  		  sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelSwitch").setText("Switch to depot currency");
		  }else{
			  currency = globalSDASHM2LocalCurrency;
			  globalSDASHM2Currency = "LOC";
			  sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelSwitch").setText("Switch to USD");
		  }


		for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
			temp = oSDASHMJsonEquipmentLevel[i].totestimateamt;
			oSDASHMJsonEquipmentLevel[i].totestimateamt = oSDASHMJsonEquipmentLevel[i].totestimateamtusd;
			oSDASHMJsonEquipmentLevel[i].totestimateamtusd = temp;

			temp = oSDASHMJsonEquipmentLevel[i].estimatecurrency;
			oSDASHMJsonEquipmentLevel[i].estimatecurrency = oSDASHMJsonEquipmentLevel[i].estimatecurrencyusd;
			oSDASHMJsonEquipmentLevel[i].estimatecurrencyusd = temp;
		}

		var oSDASHM2ModelEquipmentLevel = new sap.ui.model.json.JSONModel();
		oSDASHM2ModelEquipmentLevel.setData({modelData: oSDASHMJsonEquipmentLevel});

    	var oSDASHM2TableEquipmentLevel = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel");
    	oSDASHM2TableEquipmentLevel.setModel(oSDASHM2ModelEquipmentLevel);
    	oSDASHM2TableEquipmentLevel.bindRows("/modelData");
    	globalSDASHM2TableEquipmentLevelTPC.refresh();
    	for(var i=0; i<selectedIndices.length;i++){
    		sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").addSelectionInterval(selectedIndices[i], selectedIndices[i]);
    	}


	},


	setSDASHM2TariffDetails : function(depotcode, column, value){

		//depotcode = "SEA-MY-PGU-1988";
		var urlToSap = "tariffSet?$filter=IvTplnr eq '" + depotcode + "'";
        urlToSap = serviceDEP + urlToSap;
        globalUrlDepotView2Set = urlToSap;

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


                      var tariffResult = data.results;
                      oSDASHMJsonTariffLevel = [];

                      if(tariffResult.length == 0){
                    	  sap.ui.commons.MessageBox.alert("No data found");
                    	  console.log("Get Tariff View 2 Success; but returned nothing");
                      }else{
                    	  console.log("Get Tariff View 2 Success");
                      globalSDASHM2ExchangeRate = tariffResult[0].Zexcur;
                      for(var j=0; j<tariffResult.length; j++){

                    	  oSDASHMJsonTariffLevel.push({
                    		  	isChecked : false,
                    		  	depot : parseInt(tariffResult[j].Depot),
														equipment : tariffResult[j].Equipment,
														serial : tariffResult[j].Serial,

														lineitem : tariffResult[j].LineItem,
                    		  	component : tariffResult[j].ComponentCode,
                    		  	damage : tariffResult[j].DamageCode,
                    		  	repair : tariffResult[j].RepairCode,
                    		  	location : tariffResult[j].LocationCode,

                    		  	manhours : tariffResult[j].ManHours,
                    		  	manhourstariff : tariffResult[j].ManHoursTariff,

														materialcost : tariffResult[j].MaterialCost,
                    		  	materialcosttariff : tariffResult[j].MaterialCostTariff,
														orderno : tariffResult[j].OrderNo,

														lwq : tariffResult[j].LWQ,
                    		  	lwqtariff : tariffResult[j].LWQTariff,
														failuretype : tariffResult[j].FailureType

                    		  	/*materialtotal : (tariffResult[j].MatTol == "")?0:parseFloat(tariffResult[j].MatTol.split(',').join('')),
                    		  	nummaterialtotal : (tariffResult[j].MatTol == "")?0:parseFloat(tariffResult[j].MatTol.split(',').join('')),

                    		  	onoff : tariffResult[j].OnOff,
                    		  	delind: tariffResult[j].DelInd

														length : (tariffResult[j].Length == "")?0:parseInt(tariffResult[j].Length),
                    		  	numlength : (tariffResult[j].Length == "")?0:parseInt(tariffResult[j].Length),

                    		  	width : (tariffResult[j].Width == "")?0:parseInt(tariffResult[j].Width),
                    		  	numwidth : (tariffResult[j].Width == "")?0:parseInt(tariffResult[j].Width),

                    		  	quan : (tariffResult[j].Quan == "")?0:parseInt(tariffResult[j].Quan),
                    		  	numquan : (tariffResult[j].Quan == "")?0:parseInt(tariffResult[j].Quan),

                    		  	uom : tariffResult[j].Uom,*/
                         });

                      }

                    var oSDASHM2ModelTariff = new sap.ui.model.json.JSONModel();
              			oSDASHM2ModelTariff.setData({modelData: oSDASHMJsonTariffLevel});

	              		// Set Local Currency to a global variable
	              		//globalSDASHM2LocalCurrency = oSDASHMJsonTariffLevel[0].estimatecurrency;

                  	var oSDASHM2TableTariff = sap.ui.getCore().byId("idSDASHM2TableTariff");
                  	oSDASHM2TableTariff.setModel(oSDASHM2ModelTariff);
                  	oSDASHM2TableTariff.bindRows("/modelData");
                  	oSDASHM2TableTariff.clearSelection();

                  	var oSDASHMJsonTariffLength = oSDASHMJsonTariffLevel.length;
                  	if(oSDASHMJsonTariffLength < 18){
                  		oSDASHM2TableTariff.setVisibleRowCount(oSDASHMJsonTariffLength);
                  		oSDASHM2TableTariff.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
                  	}
                  	else{
                  		//oSDASHM2TableTariff.setVisibleRowCount(20);
                  		oSDASHM2TableTariff.setVisibleRowCount(17);
                  		oSDASHM2TableTariff.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
                  	}
                  	var oTable = sap.ui.getCore().byId("idSDASHM1TableStatusMonitor");          //Get Hold of table
		    		        var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
		    		        //oScrollBar.setScrollPosition(0);
										sap.ui.getCore().byId("idSDASHM1PageBarInputSearch").setValue("");
										sap.ui.getCore().byId("idSDASHM2PageBarInputSearch").setValue("");

										/* Clear filters and sorting */

										var oSDASHM3TableEstimateLinesUI = sap.ui.getCore().byId("idSDASHM2TableTariff");
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

                  	app.to("idSDASHM2TariffPage");
                    }
                    busyDialog.close();

                    },
                  function(error){
                    	sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                	  console.log("Get Seaco Depot View 2 Failure");
                	  busyDialog.close();
                  });

	},

	/* SDASHM2 Tariff - Page - Tariff Page */

	createSDASHM2TariffPage : function(){

		var oCurrent = this;

		/* SDASHM2 - Section - Alert and Search Buttons */

		//var oSDASHM2TariffContentAlertSearchButtons = oCurrent.setTariffContentAlertSearchButtons();

		/* SDASHM2 - Section - Equipment Level */

		var oSDASHM2ContentTariff = oCurrent.setContentTariff();

		/* SDASHM2 - Flexbox - Final */

		var oSDASHM2TariffContentFinal = new sap.m.FlexBox({
		         items: [
						oSDASHM2ContentTariff
		       ],
		       direction : "Column",
		       visible: true,
		}).addStyleClass("marginLeft20");

		return oSDASHM2TariffContentFinal;

	},

	/* SDASHM2 Tariff - Content - Tariff Page */
	setContentTariff : function(){

/* SDASHM2 - Label - Equipment Level */

		var oSDASHM2LabelTariff = new sap.ui.commons.Label("idSDASHM2LabelTariff",{
            //text: "Equipment Level",
        }).addStyleClass("fontTitle");

		var oSDASHM2FlexTariffTitle = new sap.m.FlexBox({
				 justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
		         items: [
		                oSDASHM2LabelTariff
		       ],
		       //direction : "RowReverse",
		       visible: true,
		});

    	var oSDASHM2TableTariff = new sap.ui.table.Table("idSDASHM2TableTariff",{
    				visibleRowCount: 18,
            //firstVisibleRow: 3,
            //fixedColumnCount: 4,
            columnHeaderHeight: 45,
            threshold : 50,
            //width: '98%',
            enableGrouping : false,
            //navigationMode : sap.ui.table.NavigationMode.Scrollbar,
            showColumnVisibilityMenu : true,
            enableColumnReordering : true,
            selectionMode: sap.ui.table.SelectionMode.MultiToggle,
            visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
            toolbar: new sap.ui.commons.Toolbar({
				items: [

					new sap.ui.commons.Button({
						text: "Reset",
						//icon: "sap-icon://reset",
						press: function(oEvent) {
							oPersoService.delPersData();
							globalSDASHM2TableTariffTPC.refresh().done(function() {
								sap.ui.getCore().byId("idSDASHM2TableTariff").setEnableGrouping(false);
								sap.ui.getCore().byId("idSDASHM2TableTariff").setEnableGrouping(true);
								//sap.ui.commons.MessageBox.alert("Reset done!", "INFORMATION", "Refresh");
							});

							/* Clear filters and sorting */

							var oSDASHM3TableEstimateLinesUI = sap.ui.getCore().byId("idSDASHM2TableTariff");
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
							globalSDASHM2TableTariffTPC.savePersonalizations().done(function() {
								sap.ui.commons.MessageBox.alert("Layout saved!", "INFORMATION", "Save");
							});
						}
					}),
					new sap.ui.commons.Button({
						text: "Clear Grouping",
						icon: "sap-icon://decline",
						press: function(oEvent) {
							//delta5
							var oBundleLocal = window.localStorage.getItem("oSDASHM2TableTariffPersonal") || "{}";
		    				if(oBundleLocal != null && oBundleLocal != "{}"){
		    				oBundleLocal = JSON.parse(oBundleLocal);
		    				for(var i=0; i<oBundleLocal.aColumns.length; i++){
		    					if(oBundleLocal.aColumns[i].grouped == true){
		    						oBundleLocal.aColumns[i].grouped = false;
		    					}
		    				}
		    				var sJSON = JSON.stringify(oBundleLocal, null, 4);
		    				window.localStorage.setItem("oSDASHM2TableTariffPersonal", sJSON);
		    				}
							//delta5
							globalSDASHM2TableTariffTPC.refresh().done(function() {
								sap.ui.getCore().byId("idSDASHM2TableTariff").setEnableGrouping(false);
								sap.ui.getCore().byId("idSDASHM2TableTariff").setEnableGrouping(true);
								//sap.ui.commons.MessageBox.alert("Reset done!", "INFORMATION", "Refresh");

							});
						}
					})
				],
				rightItems: [
					new sap.ui.commons.Button("idSDASHM2ButtonTariffExport",{
				          text : "",
				          //styled:false,
				          //type:sap.m.ButtonType.Unstyled,
				          icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
				          press:function(){
				        	  var oUtility = new utility();
				        	  var excelSDASHMJsonTariff = [];
										//oSDASHMJsonTariffLevel;
				        	  for(var j=0; j<oSDASHMJsonTariffLevel.length; j++){
				        		  excelSDASHMJsonTariff.push({
				        						"Equipment No." : oSDASHMJsonTariffLevel[j].equipment,
			              		  	"Serial No." : oSDASHMJsonTariffLevel[j].serial,
														"Line" : oSDASHMJsonTariffLevel[j].lineitem,
			              		  	"component" : oSDASHMJsonTariffLevel[j].component,
			              		  	"damage" : oSDASHMJsonTariffLevel[j].damage,
			              		  	"Repair" : oSDASHMJsonTariffLevel[j].repair,
			              		  	"Location" : oSDASHMJsonTariffLevel[j].location,
			              		  	"LWQ" : oSDASHMJsonTariffLevel[j].lwq,
			              		    "LWQ Tariff" : oSDASHMJsonTariffLevel[j].lwqtariff,
			              		  	"Failure Type" : oSDASHMJsonTariffLevel[j].failuretype,
			              		  	"Man Hours" : oSDASHMJsonTariffLevel[j].manhours,
			              		  	"Man Hours Tariff" : oSDASHMJsonTariffLevel[j].manhourstariff,
			              		  	"Material Cost" : oSDASHMJsonTariffLevel[j].materialcost,
			              		  	"Material Cost Tariff" : oSDASHMJsonTariffLevel[j].materialcosttariff,
			              		  	"Order No." : oSDASHMJsonTariffLevel[j].orderno
				        		  });
				        	  }
				        	  var sdashm2exceltitle = sap.ui.getCore().byId("idSDASHM2LabelTariff").getText();
				        	  oUtility.makeHTMLTable(excelSDASHMJsonTariff, sdashm2exceltitle,"export");
				          }
					})
				]
			})
    	 }).addStyleClass("sapUiSizeCompact tblBorder sapUiSizeCozy");

    	oSDASHM2TableTariff.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Equipment"}).addStyleClass("wraptextcol"),
			 	 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "equipment").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"120px",
	           sortProperty: "equipment",
	           filterProperty : "equipment"
			 }));

			 oSDASHM2TableTariff.addColumn(new sap.ui.table.Column({
 	   		 label: new sap.ui.commons.Label({text: "Serial No."}).addStyleClass("wraptextcol"),
 			 	 template: new sap.ui.commons.TextView({

 			 }).bindProperty("text", "serial").addStyleClass("borderStyle1"),
 	           resizable:true,
 	           width:"120px",
 	           sortProperty: "serial",
 	           filterProperty : "serial"
 			 }));

			 oSDASHM2TableTariff.addColumn(new sap.ui.table.Column({
 	   		 label: new sap.ui.commons.Label({text: "Line"}).addStyleClass("wraptextcol"),
 			 	 template: new sap.ui.commons.TextView({

 			 }).bindProperty("text", "lineitem").addStyleClass("borderStyle1"),
 	           resizable:true,
 	           width:"90px",
 	           sortProperty: "lineitem",
 	           filterProperty : "lineitem"
 			 }));

    	oSDASHM2TableTariff.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Component"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "component").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"110px",
	           sortProperty: "component",
	           filterProperty : "component"
			 }));

    	oSDASHM2TableTariff.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Damage"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "damage").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"90px",
	           sortProperty: "damage",
	           filterProperty : "damage"
			 }));

    	oSDASHM2TableTariff.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Repair"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "repair").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"90px",
	           sortProperty: "repair",
	           filterProperty : "repair"
			 }));

    	oSDASHM2TableTariff.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Location"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "location").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"100px",
	           sortProperty: "location",
	           filterProperty : "location"
			 }));

    	oSDASHM2TableTariff.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "LWQ"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "lwq").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"200px",
	           sortProperty: "lwq",
	           filterProperty : "lwq"
			 }));

			 oSDASHM2TableTariff.addColumn(new sap.ui.table.Column({
 	   		 label: new sap.ui.commons.Label({text: "LWQ Tariff"}).addStyleClass("wraptextcol"),
 			 template: new sap.ui.commons.TextView({

 			 }).bindProperty("text", "lwqtariff").addStyleClass("borderStyle1"),
 	           resizable:true,
 	           width:"200px",
 	           sortProperty: "lwqtariff",
 	           filterProperty : "lwqtariff"
 			 }));

    	oSDASHM2TableTariff.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Failure Type"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "failuretype").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"90px",
	           sortProperty: "failuretype",
	           filterProperty : "failuretype"
			 }));

    	oSDASHM2TableTariff.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Man Hours"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "manhours").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"90px",
	           sortProperty: "manhours",
	           filterProperty : "manhours"
			 }));

			 oSDASHM2TableTariff.addColumn(new sap.ui.table.Column({
 	   		 label: new sap.ui.commons.Label({text: "Man Hours Tariff"}).addStyleClass("wraptextcol"),
 			 template: new sap.ui.commons.TextView({

 			 }).bindProperty("text", "manhourstariff").addStyleClass("borderStyle1"),
 	           resizable:true,
 	           width:"130px",
 	           sortProperty: "manhourstariff",
 	           filterProperty : "manhourstariff"
 			 }));

    	oSDASHM2TableTariff.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Material Cost"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "materialcost").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"90px",
	           sortProperty: "materialcost",
	           filterProperty : "materialcost"
			 }));

			 oSDASHM2TableTariff.addColumn(new sap.ui.table.Column({
 	   		 label: new sap.ui.commons.Label({text: "Material Cost Tariff"}).addStyleClass("wraptextcol"),
 			 template: new sap.ui.commons.TextView({

 			 }).bindProperty("text", "materialcosttariff").addStyleClass("borderStyle1"),
 	           resizable:true,
 	           width:"130px",
 	           sortProperty: "materialcosttariff",
 	           filterProperty : "materialcosttariff"
 			 }));

    	oSDASHM2TableTariff.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Order No"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "orderno").addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"120px",
	           sortProperty: "orderno",
	           filterProperty : "orderno"
			 }));



    	var printPersoData = function(sJSON) {
			//jQuery("#perso-data").html(sJSON
    		//console.log(sJSON);
			/*	.replace(/\n/g, "<br>")
				.replace(/\s/g, "&nbsp;")
				.replace(/(true)/g, "<span style=\"color:green\">$1</span>")
				.replace(/(false)/g, "<span style=\"color:red\">$1</span>"));*/
		};

		var oPersoService = {

			getPersData: function() {
				var oDeferred = jQuery.Deferred();
				var sJSON = window.localStorage.getItem("oSDASHM2TableTariffPersonal") || "{}";
				printPersoData(sJSON);
				var oBundle = JSON.parse(sJSON);
				oDeferred.resolve(oBundle);
				return oDeferred.promise();
			},

			setPersData: function(oBundle) {

				var oDeferred = jQuery.Deferred();
				var sJSON = JSON.stringify(oBundle, null, 4);
				window.localStorage.setItem("oSDASHM2TableTariffPersonal", sJSON);
				printPersoData(sJSON);
				oDeferred.resolve();
				return oDeferred.promise();
			},

			delPersData: function() {
				var oDeferred = jQuery.Deferred();
				window.localStorage.removeItem("oSDASHM2TableTariffPersonal");
				printPersoData("");
				oDeferred.resolve();
				return oDeferred.promise();
			}

		};

		jQuery.sap.require("sap.ui.table.TablePersoController");
		var oSDASHM2TableTariffTPC = new sap.ui.table.TablePersoController("idSDASHM2TableTariffTPC", {
			table: oSDASHM2TableTariff,
			persoService: oPersoService,
			hasGrouping: true
		});
		globalSDASHM2TableTariffTPC = oSDASHM2TableTariffTPC;

			/* SDASHM2 - Flexbox - Equipment Level */

			var oSDASHM2FlexTariff = new sap.m.FlexBox({
			         items: [
			                oSDASHM2FlexTariffTitle,
							new sap.ui.commons.Label({
								text : "",
								width : "100px"
							}),
							oSDASHM2TableTariff,
							new sap.ui.commons.Label({
								text : "",
								width : "100px"
							}),
							//oSDASHM2FlexTariffButtons
			       ],
			       direction : "Column",
			       visible: true,
			}).addStyleClass("marginLeft20");


    	return oSDASHM2FlexTariff;

	},

	approveSDASHM2 : function(){
		  var oCurrent = this;
		  var orders = "";
    	  var references = "";
    	  var amounts = "";
    	  var equnrs  = "";
				var depots = "";
    	  var isValid = true;
				globalDiscountmax = 0;
		  var arraySelLines = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
		  for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
    		if(isValid){
    			var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
    			if(oDetData != undefined){
					var realPath = oDetData.getPath().split('/')[2];
    			if(arraySelLines.indexOf(i) != -1 && oSDASHMJsonEquipmentLevel[realPath].isawap == false){
    				isValid = false;
    			}/*else if(arraySelLines.indexOf(i) != -1 && oSDASHMJsonEquipmentLevel[i].isawap == true && oSDASHMJsonEquipmentLevel[i].reference == ""){
    				isValid = false;
    			}*/
    			else if(arraySelLines.indexOf(i) != -1 && oSDASHMJsonEquipmentLevel[realPath].isawap == true){
						globalDiscountmax = globalDiscountmax + parseFloat(oSDASHMJsonEquipmentLevel[realPath].totestimateamt.split(',').join(''));
    				if(orders == ''){
    					orders = oSDASHMJsonEquipmentLevel[realPath].estimateno;
    					references = oSDASHMJsonEquipmentLevel[realPath].reference;
    					amounts = oSDASHMJsonEquipmentLevel[realPath].totestimateamt;
    					equnrs = oSDASHMJsonEquipmentLevel[realPath].serialno;
							depots = oSDASHMJsonEquipmentLevel[realPath].depotcode;
    				}else{
    					orders = orders + '$' + oSDASHMJsonEquipmentLevel[realPath].estimateno;
    					references = references + '$*' + oSDASHMJsonEquipmentLevel[realPath].reference;
    					amounts = amounts + '$' + oSDASHMJsonEquipmentLevel[realPath].totestimateamt;
    					equnrs = equnrs + '$' + oSDASHMJsonEquipmentLevel[realPath].serialno;
							depots = depots + '$' + oSDASHMJsonEquipmentLevel[realPath].depotcode;
    				}
    			}
    			}
    			}else{

    			}
    		}

				var discounta = sap.ui.getCore().byId("idSDASHM2InputDiscountA").getValue();
				var discountp = sap.ui.getCore().byId("idSDASHM2InputDiscountP").getValue();

				if(parseInt(discounta) < 0 || parseInt(discountp) < 0){
						sap.ui.commons.MessageBox.alert("Negative Value not allowed");
						return;
				}

				if(parseFloat(parseFloat(discounta).toFixed(2)) > parseFloat(parseFloat(globalDiscountmax).toFixed(2))){
						sap.ui.commons.MessageBox.alert("Discount Amount cannot be greater than Total Estimate Amount");
						return;
				}

    		if(isValid){
    			oCurrent.approveEstimates(depots, orders, references, equnrs, amounts, discounta, discountp);
    		}else{
    			sap.ui.commons.MessageBox.alert("Please select only HOLD APPD units");
    		}
	},

	/* SDASHM2 - Function - Get Serial History */

	getSerialHistory : function(serialno, icon){
		var oSDASHM3 = new sdashm3();
		var urlToSap = "serialhistorySet?$filter=IvSerial eq '" + serialno + "'";
        urlToSap = serviceDEP + urlToSap;
        //globalUrlDepotView2Set = urlToSap;

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


                      var serialHistoryResult = data.results;
                      var oSDASHMJsonSerialHistoryLevel = [];

                      if(serialHistoryResult.length == 0){
                    	  sap.ui.commons.MessageBox.alert("No data found");
                    	  console.log("Get Serial History Success; but returned nothing");
                      }else{
                    	  console.log("Get Serial History Success");
                      for(var j=0; j<serialHistoryResult.length; j++){

                    	  /*if(serialHistoryResult[j].CreateDate != null){
    	                      var vMessageDate = serialHistoryResult[j].CreateDate.split("(");
    	                      var vMsgDate = vMessageDate[1].split(")");

    	                      crtdate = dateFormat(new Date(Number(vMsgDate[0])), 'dd/mm/yyyy',"UTC"); // MACC_17022017 changed from '-' to '/'
    	                      crtdatex = crtdate.substr(6,4) + crtdate.substr(3,2) + crtdate.substr(0,2);
    	                  }*/

                    	  oSDASHMJsonSerialHistoryLevel.push({
                    		 "Date" : serialHistoryResult[j].CreateDate, //crtdate,
                    		 "Activity" : (serialHistoryResult[j].Delorcan == "")?serialHistoryResult[j].Activity:(serialHistoryResult[j].Activity + " - " + "Deleted"),
                    		 "Depot" : serialHistoryResult[j].Depot,
                    		 "FuncLoc" : serialHistoryResult[j].FuncLoc,
                    		 "OrderNo" :serialHistoryResult[j].OrderNo,
												 "OrderType" :serialHistoryResult[j].OrderType,
												 "OrderCat" :serialHistoryResult[j].OrderCat,
												 "LinkEnabled" : (serialHistoryResult[j].LinkEnabled=="X")?true:false,
												 //"Delorcan" :serialHistoryResult[j].Delorcan,
                      });

                      }

                    /* SDASHM2 - Table - Serial History */

                  	var oSDASHM2TableSerialHistory = new sap.ui.table.Table({
    		            //columnHeaderHeight: 60,
    		            selectionMode: sap.ui.table.SelectionMode.None,
    		            width:"100%",
    		            showNoData: true,
    		            visibleRowCount: 10
    		    	}).addStyleClass("fontStyle tblBorder");



                  	oSDASHM2TableSerialHistory.addColumn(new sap.ui.table.Column({
				        		    	width: "110px",
				        		   		visible:true,
				        		   		label: new sap.ui.commons.Label({text: "Date"}).addStyleClass("wraptextcol"),
				        		   		template: new sap.ui.commons.TextView().bindProperty("text", "Date").addStyleClass("wraptext"),
				        		   		resizable:false
        		 		 		}));

                  	oSDASHM2TableSerialHistory.addColumn(new sap.ui.table.Column({
				    		    	width: "200px",
				    		   		visible:true,
				    		   		label: new sap.ui.commons.Label({text: "Activity"}).addStyleClass("wraptextcol"),
				    		   		template: new sap.ui.commons.Link({
						 				 	press : function(oEvent){
						 					 /*global3SerialNo = oEvent.getSource().getBindingContext().getProperty("serialno");
						 					 global3Equnr = oEvent.getSource().getBindingContext().getProperty("equnr");
						 					 global3Depot = oEvent.getSource().getBindingContext().getProperty("depotcode");*/
						 					 global3EstimateNo = oEvent.getSource().getBindingContext().getProperty("OrderNo");
											 global3DocType =  oEvent.getSource().getBindingContext().getProperty("OrderType");
											 global3DocText =  oEvent.getSource().getBindingContext().getProperty("Activity");
											 global3DocCat =  oEvent.getSource().getBindingContext().getProperty("OrderCat");
											 global3DocDate =  oEvent.getSource().getBindingContext().getProperty("Date");
											 global3Depot = oEvent.getSource().getBindingContext().getProperty("Depot");

						 					/* SDASHM3 - Value - Header Details */

						 					 oSDASHM3.setValueHeaderDetails(true, false);	// first true means this is from serial history popup
						 					 																								// second false means this is not a process change

						 					   /* SDASHM3 - Value - Record Details */

								 					 /* oSDASHM3.setValueRecordDetails(); */

						 						 /* SDASHM3 - Value - Estimate Lines */

						 					 oSDASHM3.setValueEstimateLines(true, false);	// first true means this is from serial history popup
						 					 																							// second false means this is not a process change

						 						/* SDASHM3 - Value - Thumbnail */
												globalPicPanelExpanded = false;
						 						var oSDASHM3ContentThumbNail = oSDASHM3.setContentThumbnail("");
						 						sap.ui.getCore().byId("idSDASHM3ContentFinal").insertItem(oSDASHM3ContentThumbNail, 5);

						 					/* SDASHM3 - Value - Summary Lines */

						 					/* oSDASHM3.setValueMiscInfo(); */

						 					/* SDASHM3 - Move to Unit Overview Page */
							 					var oTable = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel");          //Get Hold of table
							 					var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
							 					//oScrollBar.setScrollPosition(0);

												app.to("idSDASHM3Page");

						 				 }
						 			 }).bindProperty("text", "Activity").bindProperty("enabled", "LinkEnabled").addStyleClass("wraptext"),
				    		   		resizable:false
    		 		 				}));

                  	oSDASHM2TableSerialHistory.addColumn(new sap.ui.table.Column({
				        		    	width: "200px",
				        		   		visible:true,
				        		   		label: new sap.ui.commons.Label({text: "Func. Location"}).addStyleClass("wraptextcol"),
				        		   		template: new sap.ui.commons.TextView().bindProperty("text", "FuncLoc").addStyleClass("wraptext"),
				        		   		resizable:false
        		 		 		}));



                  	var oSDASHM2ModelSerialHistory = new sap.ui.model.json.JSONModel();
              		oSDASHM2ModelSerialHistory.setData({modelData: oSDASHMJsonSerialHistoryLevel});


                  	//var oSDASHM2TableSerialHistory = sap.ui.getCore().byId("idSDASHM2TableSerialHistory");
                  	oSDASHM2TableSerialHistory.setModel(oSDASHM2ModelSerialHistory);
                  	oSDASHM2TableSerialHistory.bindRows("/modelData");
                  	oSDASHM2TableSerialHistory.clearSelection();

                  	var oSDASHMJsonSerialHistoryLength = oSDASHMJsonSerialHistoryLevel.length;
                  	if(oSDASHMJsonSerialHistoryLength < 18){
                  		oSDASHM2TableSerialHistory.setVisibleRowCount(oSDASHMJsonSerialHistoryLength);
                  		oSDASHM2TableSerialHistory.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
                  	}
                  	else{
                  		//oSDASHM2TableSerialHistory.setVisibleRowCount(20);
                  		oSDASHM2TableSerialHistory.setVisibleRowCount(17);
                  		oSDASHM2TableSerialHistory.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
                  	}

                  	if(sap.ui.getCore().byId("idSDASHM2PopoverSerialHistory") != undefined)
	                   	 sap.ui.getCore().byId("idSDASHM2PopoverSerialHistory").destroy();

	   				 var oSDASHM2PopoverSerialHistory = new sap.m.Popover("idSDASHM2PopoverSerialHistory",{
	                        title: "Unit History",
	                        contentMinWidth: "800px",
	                        modal: false,
	                        placement: sap.m.PlacementType.Right,
	                        // content: new sap.m.VBox({
	                        //                         //width:"300px",
	                        //                         items:  [oSDASHM2TableSerialHistory]
													//                         }),
													content : oSDASHM2TableSerialHistory

	                        }).addStyleClass("sapUiPopupWithPadding");
	   				oSDASHM2PopoverSerialHistory.openBy(icon);



                    }
                    busyDialog.close();

                    },
                  function(error){
                    	sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                	  console.log("Get Seaco Depot View 2 Failure");
                	  busyDialog.close();
                  });

	},

	/* SDASHM2 - Function - Get Tanks Icon */
	getTanksIcon : function(){

		var oSDASHM2IconContact = new sap.ui.core.Icon({
							src : sap.ui.core.IconPool.getIconURI("activity-items"),
							size : "20px",
							color : "black",
							tooltip : "Certificates",
 //	           activeColor : "red",
 //	           activeBackgroundColor : "white",
 //	           hoverColor : "green",
 //	           hoverBackgroundColor : "white",
							width : "20px",
							visible: "{contactVisible}",
							press : function(oEvent){
								var serialno = oEvent.getSource().getBindingContext().getProperty("serialno");
								var pcate = oEvent.getSource().getBindingContext().getProperty("pcate");
								var onaCERTLevel = new newnaCERTLevel();
								if(pcate == "TANKS")
									onaCERTLevel.getCertificatesFromSilverCims(serialno);
								else
									onaCERTLevel.getCertificatesFromSAP(serialno);
							}
						});
		return oSDASHM2IconContact;
	},

	/* SDASHM2 - Function - Get Contact Icon */

	getContactIcon : function(){

	 var oSDASHM2IconContact = new sap.ui.core.Icon( {
	           src : sap.ui.core.IconPool.getIconURI("address-book"),
	           size : "20px",
	           color : "black",
						 tooltip : "Customer Contact",
//	           activeColor : "red",
//	           activeBackgroundColor : "white",
//	           hoverColor : "green",
//	           hoverBackgroundColor : "white",
	           width : "20px",
	           visible: "{contactVisible}",
	           press : function(oEvent){
	        	 var serialno = oEvent.getSource().getBindingContext().getProperty("serialno");
	        	 var Address = "";
	        	 var PostalCode = "";
	        	 var Country = "";
	        	 var Fax = "";
	        	 var Phone = "";
	        	 var Email = "";
	        	 var Contact = "";
						 var CustomerName = "";
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
														 CustomerName = data.Customer;
	   	                       busyDialog.close();
	   	                    },
	   	                  function(error){
	   	                      sap.ui.commons.MessageBox.alert("Sorry, there is an error");
	   	                	  console.log("Get Contact Failure");
	   	                	  busyDialog.close();
	   	                  });

												/* Customer Name */

									      var oSDASHM2TableStatusMonitorDepotContactValueCustomerName = new sap.m.Label({
									                                                    text : CustomerName,
									                                                    }).addStyleClass("selectionLabels");

									      var oSDASHM2TableStatusMonitorDepotContactLabelCustomerName = new sap.m.Label({
									          text : "Customer : ",
									          labelFor: oSDASHM2TableStatusMonitorDepotContactValueCustomerName,
									          width : "100px"
									          }).addStyleClass("selectionLabelsLabel");

									      var oSDASHM2TableStatusMonitorDepotContactFlexCustomerName = new sap.m.FlexBox({
									                                                     items: [oSDASHM2TableStatusMonitorDepotContactLabelCustomerName,
									                                                             oSDASHM2TableStatusMonitorDepotContactValueCustomerName
									                                                             ],
									                                                     direction: "Row"
									                                                     });


		 /* Address */

      var oSDASHM2TableStatusMonitorDepotContactValueAddress = new sap.m.Label({
                                                    text : Address,
                                                    }).addStyleClass("selectionLabels");

      var oSDASHM2TableStatusMonitorDepotContactLabelAddress = new sap.m.Label({
          text : "Address : ",
          labelFor: oSDASHM2TableStatusMonitorDepotContactValueAddress,
          width : "100px"
          }).addStyleClass("selectionLabelsLabel");

      var oSDASHM2TableStatusMonitorDepotContactFlexAddress = new sap.m.FlexBox({
                                                     items: [oSDASHM2TableStatusMonitorDepotContactLabelAddress,
                                                             oSDASHM2TableStatusMonitorDepotContactValueAddress
                                                             ],
                                                     direction: "Row"
                                                     });



      /* Country */

      var oSDASHM2TableStatusMonitorDepotContactValueCountry = new sap.m.Label({
                                                    text : Country,
                                                    }).addStyleClass("selectionLabels");

      var oSDASHM2TableStatusMonitorDepotContactLabelCountry = new sap.m.Label({
          //text : "Country : ",
          labelFor: oSDASHM2TableStatusMonitorDepotContactValueCountry,
          width : "100px"
          }).addStyleClass("selectionLabelsLabel");

      var oSDASHM2TableStatusMonitorDepotContactFlexCountry = new sap.m.FlexBox({
                                                     items: [oSDASHM2TableStatusMonitorDepotContactLabelCountry,
                                                             oSDASHM2TableStatusMonitorDepotContactValueCountry
                                                             ],
                                                     direction: "Row"
                                                     });

      /* Postal Code */

      var oSDASHM2TableStatusMonitorDepotContactValuePostal = new sap.m.Label({
                                                    text : PostalCode,
                                                    }).addStyleClass("selectionLabels");

      var oSDASHM2TableStatusMonitorDepotContactLabelPostal = new sap.m.Label({
          text : "Postal Code : ",
          labelFor: oSDASHM2TableStatusMonitorDepotContactValuePostal,
          width : "100px"
          }).addStyleClass("selectionLabelsLabel");

      var oSDASHM2TableStatusMonitorDepotContactFlexPostal = new sap.m.FlexBox({
                                                     items: [oSDASHM2TableStatusMonitorDepotContactLabelPostal,
                                                             oSDASHM2TableStatusMonitorDepotContactValuePostal
                                                             ],
                                                     direction: "Row"
                                                     });

      /* Fax */

      var oSDASHM2TableStatusMonitorDepotContactValueFax = new sap.m.Label({
                                                    text : Fax,
                                                    }).addStyleClass("selectionLabels");

      var oSDASHM2TableStatusMonitorDepotContactLabelFax = new sap.m.Label({
          text : "Fax : ",
          labelFor: oSDASHM2TableStatusMonitorDepotContactValueFax,
          width : "100px"
          }).addStyleClass("selectionLabelsLabel");

      var oSDASHM2TableStatusMonitorDepotContactFlexFax = new sap.m.FlexBox({
                                                     items: [oSDASHM2TableStatusMonitorDepotContactLabelFax,
                                                             oSDASHM2TableStatusMonitorDepotContactValueFax
                                                             ],
                                                     direction: "Row"
                                                     });

      /* Phone */

      var oSDASHM2TableStatusMonitorDepotContactValuePhone = new sap.m.Label({
                                                    text : Phone,
                                                    }).addStyleClass("selectionLabels");

      var oSDASHM2TableStatusMonitorDepotContactLabelPhone = new sap.m.Label({
          text : "Phone : ",
          labelFor: oSDASHM2TableStatusMonitorDepotContactValuePhone,
          width : "100px"
          }).addStyleClass("selectionLabelsLabel");

      var oSDASHM2TableStatusMonitorDepotContactFlexPhone = new sap.m.FlexBox({
                                                     items: [oSDASHM2TableStatusMonitorDepotContactLabelPhone,
                                                             oSDASHM2TableStatusMonitorDepotContactValuePhone
                                                             ],
                                                     direction: "Row"
                                                     });

      /* Mail ID */

      var oSDASHM2TableStatusMonitorDepotContactValueMailid = new sap.m.Link({
                                                    text : Email,
																										press : function(oEvent){
 																										 var email = oEvent.getSource().getProperty("text");
 																										 //window.location.href = "mailto:user@example.com?subject=Subject&body=message%20goes%20here";
 																										 window.location.href = "mailto:" + email;
 																									 }
                                                    }).addStyleClass("selectionLabelsEmailLink");

      var oSDASHM2TableStatusMonitorDepotContactLabelMailid = new sap.m.Label({
          text : "Mail : ",
          labelFor: oSDASHM2TableStatusMonitorDepotContactValueMailid,
          width : "100px"
          }).addStyleClass("selectionLabelsLabel");

      var oSDASHM2TableStatusMonitorDepotContactFlexMailid = new sap.m.FlexBox({
                                                     items: [oSDASHM2TableStatusMonitorDepotContactLabelMailid,
                                                             oSDASHM2TableStatusMonitorDepotContactValueMailid
                                                             ],
                                                     direction: "Row"
                                                     });

      /* Contact */

      var oSDASHM2TableStatusMonitorDepotContactValueContact = new sap.m.Label({
                                                    text : Contact,
                                                    }).addStyleClass("selectionLabels");

      var oSDASHM2TableStatusMonitorDepotContactLabelContact = new sap.m.Label({
          text : "Comments : ",
          labelFor: oSDASHM2TableStatusMonitorDepotContactValueContact,
          width : "100px"
				}).addStyleClass("selectionLabelsLabel");

      var oSDASHM2TableStatusMonitorDepotContactFlexContact = new sap.m.FlexBox({
                                                     items: [oSDASHM2TableStatusMonitorDepotContactLabelContact,
                                                             oSDASHM2TableStatusMonitorDepotContactValueContact
                                                             ],
                                                     direction: "Row"
                                                     });



      var oSDASHM2TableStatusMonitorDepotContactFlex = new sap.m.FlexBox({
          items: [//oSDASHM2TableStatusMonitorDepotContactFlexDepotName,
                  //oSDASHM2TableStatusMonitorDepotContactFlexLocation,
									oSDASHM2TableStatusMonitorDepotContactFlexCustomerName,
                  oSDASHM2TableStatusMonitorDepotContactFlexAddress,
                  oSDASHM2TableStatusMonitorDepotContactFlexCountry,
                  oSDASHM2TableStatusMonitorDepotContactFlexPostal,
                  oSDASHM2TableStatusMonitorDepotContactFlexFax,
                  oSDASHM2TableStatusMonitorDepotContactFlexPhone,
                  oSDASHM2TableStatusMonitorDepotContactFlexMailid,
                  oSDASHM2TableStatusMonitorDepotContactFlexContact
                  ],
          direction: "Column"
          });

      if(sap.ui.getCore().byId("idSDASHM2TableStatusMonitorDepotContact") != undefined)
     	 sap.ui.getCore().byId("idSDASHM2TableStatusMonitorDepotContact").destroy();

		 var oSDASHM2TableStatusMonitorDepotContact = new sap.m.Popover("idSDASHM2TableStatusMonitorDepotContact",{
          title: "Customer Contact",
          modal: false,
          placement: sap.m.PlacementType.Left,
          content: new sap.m.VBox({
                                  //width:"300px",
                                  items:  [oSDASHM2TableStatusMonitorDepotContactFlex]
                                  }),

          }).addStyleClass("sapUiPopupWithPadding");

		 oSDASHM2TableStatusMonitorDepotContact.openBy(oEvent.getSource());

	           }
	 	});

		return oSDASHM2IconContact;
	},

	/* SDASHM2 - Function - Lessor Survey */

	sendSDASHM2LessorSurvey : function(button){

		var oCurrent = this;

		/* Survey Date */

	  	 if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyValueSurveyDate") != undefined)
       	 sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyValueSurveyDate").destroy();

        if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyLabelSurveyDate") != undefined)
       	 sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyLabelSurveyDate").destroy();

        var oSDASHM2EquipmentLevelLessorSurveyValueSurveyDate = new sap.m.DatePicker("idSDASHM2EquipmentLevelLessorSurveyValueSurveyDate",{
                                                      	displayFormat : "dd/MM/yyyy",
                                                      	valueFormat : "yyyyMMdd"
                                                      }).addStyleClass("selectionLabels1");

        var oSDASHM2EquipmentLevelLessorSurveyLabelSurveyDate = new sap.m.Label("idSDASHM2EquipmentLevelLessorSurveyLabelSurveyDate",{
            text : "Survey Date : ",
            labelFor: oSDASHM2EquipmentLevelLessorSurveyValueSurveyDate,
            width : "180px"
            }).addStyleClass("selectionLabels");

        var oSDASHM2EquipmentLevelLessorSurveyFlexSurveyDate = new sap.m.FlexBox({
                                                       items: [oSDASHM2EquipmentLevelLessorSurveyLabelSurveyDate,
                                                               oSDASHM2EquipmentLevelLessorSurveyValueSurveyDate
                                                               ],
                                                       direction: "Row"
                                                       });

		var oSDASHM2EquipmentLevelLessorSurveyFlexFinal = new sap.m.FlexBox({
            items: [
                    	oSDASHM2EquipmentLevelLessorSurveyFlexSurveyDate
                    ],
            direction: "Column"
            });

        if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyPopover") != undefined)
       	 sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyPopover").destroy();

		 var oSDASHM2EquipmentLevelLessorSurveyPopover = new sap.m.Popover("idSDASHM2EquipmentLevelLessorSurveyPopover",{
            title: "Request Lessor Survey",
            //modal: true,
            placement: sap.m.PlacementType.Left,
            footer:  new sap.m.Bar({

                                   contentRight: [
                                                 new sap.m.Button({
                                                                  text: "Send",
                                                                  icon: "sap-icon://email",
                                                                  press: function () {
                                                               	   oCurrent.sendSDASHM2AlertLessorSurvey();
                                                                  }
                                                                  }).addStyleClass("footerBtn"),
                                                 ],
                                   }),
            content: new sap.m.VBox({
                                    //width:"300px",
                                    items:  [oSDASHM2EquipmentLevelLessorSurveyFlexFinal]
                                    }),

            }).addStyleClass("sapUiPopupWithPadding");

		 oSDASHM2EquipmentLevelLessorSurveyPopover.openBy(button);

	},

	/* SDASHM2 - Function - Set Content Add Est Popup */

	setSDASHM2ContentAddEst : function(estimatetype){

		/* SDASHM2 - Table - Additional Estimate */

		var oSDASHM2TableAddEst = new sap.ui.table.Table({
     		  visibleRowCount: 4,
     		  //width: '1100px',
//            //firstVisibleRow: 3,
//            //fixedColumnCount: 3,
//            columnHeaderHeight: 30,
//            //width: '99%',
//            //fixedRowCount : 1,
//            enableColumnReordering : true,
//            enableGrouping : true,
//            showColumnVisibilityMenu : true,
             selectionMode: sap.ui.table.SelectionMode.None,
		}).addStyleClass("sapUiSizeCompact tblBorder");

		oSDASHM2TableAddEst.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Serial No.", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "serialno").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"120px"
			 }));

		var idToBeDestroyed = [];
		[].slice.call(document.querySelectorAll('div'))
	   .filter(el => el.id.match(/idSDASHM2TableAddEst/))
	   .forEach(el => idToBeDestroyed.push(el.id));
		if(idToBeDestroyed != undefined){
		for(var x=0;x<idToBeDestroyed.length;x++){
			if(sap.ui.getCore().byId(idToBeDestroyed[x]) != undefined)
								 sap.ui.getCore().byId(idToBeDestroyed[x]).destroy();
		}
	}

	  if(sap.ui.getCore().byId("idSDASHM2TableAddEstLabHrs") != undefined)
							 sap.ui.getCore().byId("idSDASHM2TableAddEstLabHrs").destroy();

		oSDASHM2TableAddEst.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Lab. Hrs *", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 			template: new sap.m.Input("idSDASHM2TableAddEstLabHrs",{
						//width : "60px",
						type : sap.m.InputType.Number,
						textAlign : sap.ui.core.TextAlign.Right,
				 change : function(oEvent){

					 var line = oEvent.getSource().getBindingContext().getPath().split("/")[2];

					 // if(parseInt(oEvent.getParameter("newValue")) < 0){
						// 		console.log("Negative");
						// 		oSDASHM2JsonLabCost[line].labhrs = "";
					 // }else{
						//  		oSDASHM2JsonLabCost[line].labhrs = oEvent.getParameter("newValue");
					 // }

					var thisValue = oSDASHM2JsonLabCost[line].labhrs;
					if(thisValue == 0 || thisValue == "0.00" || thisValue == ""){
						thisValue = 0;
					}else{
						//thisValue = thisValue;
					}

					var labcost = oEvent.getSource().getBindingContext().getProperty("labcost");
					if(labcost == 0 || labcost == "0.00" || labcost == ""){
						labcost = "0.00";
					}else{
						//labcost = labcost;
					}


					var matcost = oEvent.getSource().getBindingContext().getProperty("matcost");
					if(matcost == 0 || matcost == "0.00" || matcost == ""){
						matcost = 0;
					}else{
						//matcost = matcost;
					}

					var total = (parseFloat(thisValue) * parseFloat(labcost)) + parseFloat(matcost);
					total = thousandsep(total);



					oSDASHM2JsonLabCost[line].total = total;
					oSDASHM2ModelLabCost.updateBindings();

				 }
			 }).bindProperty("value", "labhrs").addStyleClass("borderStyleInput1"),
	           resizable:false,
	           width:"80px"
			 }));

		oSDASHM2TableAddEst.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Lab. Rate", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("text", "labcost").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"80px"
			 }));

			 if(sap.ui.getCore().byId("idSDASHM2TableAddEstMatCost") != undefined)
							 sap.ui.getCore().byId("idSDASHM2TableAddEstMatCost").destroy();

		oSDASHM2TableAddEst.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Mat. Cost *", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.m.Input("idSDASHM2TableAddEstMatCost",{
				 width : "80px",
				 type : sap.m.InputType.Number,
				 textAlign : sap.ui.core.TextAlign.Right,
				 change : function(oEvent){

					 var line = oEvent.getSource().getBindingContext().getPath().split("/")[2];

					 // if(parseInt(oEvent.getParameter("newValue")) < 0){
						// 		console.log("Negative");
						// 		oSDASHM2JsonLabCost[line].matcost = "";
					 // }else{
						//  		oSDASHM2JsonLabCost[line].matcost = oEvent.getParameter("newValue");
					 // }

						var thisValue = oSDASHM2JsonLabCost[line].matcost;
						if(thisValue == 0 || thisValue == "0.00" || thisValue == ""){
							thisValue = 0;
						}else{
							//thisValue = thisValue;
						}

						var labcost = oEvent.getSource().getBindingContext().getProperty("labcost");
						if(labcost == 0 || labcost == "0.00" || labcost == ""){
							labcost = "0.00";
						}else{
							//labcost = labcost;
						}


						var labhrs = oEvent.getSource().getBindingContext().getProperty("labhrs");
						if(labhrs == 0 || labhrs == "0.00" || labhrs == ""){
							labhrs = 0;
						}else{
							//labhrs = labhrs;
						}

						var total = (parseFloat(labhrs) * parseFloat(labcost)) + parseFloat(thisValue);
						total = thousandsep(total);

						//var line = oEvent.getSource().getBindingContext().getPath().split("/")[2];

						oSDASHM2JsonLabCost[line].total = total;
						oSDASHM2ModelLabCost.updateBindings();

					 }
			 }).bindProperty("value", "matcost").addStyleClass("borderStyleInput1"),
	           resizable:false,
	           width:"100px"
			 }));

		oSDASHM2TableAddEst.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Total", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("text", "total").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"80px"
			 }));

	 /*oSDASHM2TableAddEst.addColumn(new sap.ui.table.Column({
		 label: new sap.ui.commons.Label({text: "CW Amount", textAlign: "Left"}).addStyleClass("wraptextcol"),
		 template: new sap.m.Input({
			 //width : "60px",
			 type : sap.m.InputType.Number,
			 textAlign : sap.ui.core.TextAlign.Right
		 }).bindProperty("value", "cwamount").addStyleClass("borderStyleInput1"),
					 resizable:false,
					 width:"80px"
		 }));*/

		oSDASHM2TableAddEst.addColumn(new sap.ui.table.Column({
       label: new sap.ui.commons.Label({text: "Comment *", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.m.Input({
				 //width : "200px",
				 maxLength : 70
				 //textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("value", "comment").addStyleClass("borderStyleInput1"),
	           resizable:false,
	           width:"300px"
			 }));

			 if(sap.ui.getCore().byId("idSDASHM2TableAddEstGrade") != undefined)
							sap.ui.getCore().byId("idSDASHM2TableAddEstGrade").destroy();

				if(sap.ui.getCore().byId("idSDASHM2TableAddEstStatus") != undefined)
								sap.ui.getCore().byId("idSDASHM2TableAddEstStatus").destroy();

			 oSDASHM2TableAddEst.addColumn(new sap.ui.table.Column("idSDASHM2TableAddEstGrade",{
	       visible:false,
				 label: new sap.ui.commons.Label({text: "Grade", textAlign: "Left"}).addStyleClass("wraptextcol"),
	 			 template: new sap.m.Input({
	 				 textAlign : sap.ui.core.TextAlign.Right,
					 enabled : oJSONSDASHMAuthorizationRoles["ZMNR.ADD_PREDEL_EDIT_GRADE"]
	 			 }).bindProperty("value", "grade"),//.addStyleClass("borderStyle cwgradeinput"),
	 	           resizable:false,
	 	           width:"80px"
	 			 }));

				 oSDASHM2TableAddEst.addColumn(new sap.ui.table.Column("idSDASHM2TableAddEstStatus",{
		       visible:false,
					 label: new sap.ui.commons.Label({text: "Status", textAlign: "Left"}).addStyleClass("wraptextcol"),
		 			 template: new sap.ui.commons.TextView({
		 				 textAlign : sap.ui.core.TextAlign.Left
		 			 }).bindProperty("text", "status").addStyleClass("borderStyle1"),
		 	           resizable:false,
		 	           width:"80px"
		 			 }));


      	oSDASHM2TableAddEst.setModel(oSDASHM2ModelLabCost);
      	oSDASHM2TableAddEst.bindRows("/modelData");

      	var oSDASHM2JsonLabCostLength = oSDASHM2JsonLabCost.length;
      	if(oSDASHM2JsonLabCostLength < 11){
      		oSDASHM2TableAddEst.setVisibleRowCount(oSDASHM2JsonLabCostLength);
      		oSDASHM2TableAddEst.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
      	}
      	else{
      		oSDASHM2TableAddEst.setVisibleRowCount(10);
      		oSDASHM2TableAddEst.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
      	}

      	return oSDASHM2TableAddEst;

	},

	/* SDASHM2 - Function - Approve Lessor Survey */

	approveSDASHM2LessorSurvey : function(){

		var oCurrent = this;

		var equips = "";
		var estimatenos = "";
		var depotcodes = "";
		var arraySelLines = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
		for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
			if(arraySelLines.indexOf(i) != -1){
				var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
				if(oDetData != undefined){
				var realPath = oDetData.getPath().split('/')[2];
				if(equips == ''){
					equips = oSDASHMJsonEquipmentLevel[realPath].equnr;
					estimatenos = oSDASHMJsonEquipmentLevel[realPath].estimateno;
  				}else{
  					equips = equips + '$' + oSDASHMJsonEquipmentLevel[realPath].equnr;
  					estimatenos = estimatenos + '$' + oSDASHMJsonEquipmentLevel[realPath].estimateno;
  				}
				}
			}
		}

		var urlToSap = "lessorsurveyapproveSet?$filter=IvEstimate eq '" + estimatenos +
												"' and IvEqunr eq '" + equips +
												"'";

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
												 if(data.results.length == 0){
													 console.log("Approve Lessor Survey Failure");
													 sap.ui.commons.MessageBox.alert("Sorry, there is an error");
												 }else{
													 if(data.results[0].Result == ""){
														 console.log("Approve Lessor Survey Failure");
														 sap.ui.commons.MessageBox.alert("Sorry, there is an error");
													 }else{
														 console.log("Approve Lessor Survey Success");
														 sap.ui.commons.MessageBox.alert("Lessor Survey Approved!");
													 }
												 }
													busyDialog.close();
											},
										function(error){
											sap.ui.commons.MessageBox.alert("Sorry, there is an error");
											console.log("Lessor Survey Failed!");
											busyDialog.close();
										});


	},

	/* SDASHM2 - Function - Get Labour Cost */

	getSDASHM2LabCost : function(button, estimatetype, isEstimateReefer){

		/*var oSDASHM2ValueAddEstLabCost = "";
  	  	oSDASHM2ValueAddEstLabCost = "12.00";
  	  	return oSDASHM2ValueAddEstLabCost;*/

		var oCurrent = this;
		var arraySelLines = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
      	var depotsim = "";
      	var estimatesim = "";
      	var serialsim = "";
      	var equnrsim = "";
		for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
			if(arraySelLines.indexOf(i) != -1){
				var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
				if(oDetData != undefined){
					var realPath = oDetData.getPath().split('/')[2];
					serialsim = oSDASHMJsonEquipmentLevel[realPath].serialno;
					equnrsim = oSDASHMJsonEquipmentLevel[realPath].equnr;
					depotsim = oSDASHMJsonEquipmentLevel[realPath].depotcode;
					estimatesim = oSDASHMJsonEquipmentLevel[realPath].estimateno;
				}
			}
		}

		var urlToSap = "addEstSimSet(IvDepot='" + depotsim +
		"',IvEstimate='" + estimatesim +
		"',IvSerial='" + serialsim +
		"',IvEqunr='" + equnrsim +
		"',IvLabourHrs=" + 0.00 +
		"m,IvMatCost=" + 0.00 +
		"m,IvCwAmount=" + 0.00 +
		"m)";
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

	                  var oSDASHM2JsonLabCostLoc = data;
	                  	  oSDASHM2ValueAddEstSimResult = {
	                  			  labcost : "",
														labcostm : "",
	                  			  redec : "",
														grade : ""
	                  	  };
	                  	  oSDASHM2ValueAddEstSimResult.labcost = oSDASHM2JsonLabCostLoc.EvLabRate;
												oSDASHM2ValueAddEstSimResult.labcostm = oSDASHM2JsonLabCostLoc.EvLabRateM;
	                  	  oSDASHM2ValueAddEstSimResult.redec = oSDASHM2JsonLabCostLoc.Redec;
												oSDASHM2ValueAddEstSimResult.grade = oSDASHM2JsonLabCostLoc.Grading;
	                  	  oCurrent.openSDASHM2AddEst(button, oSDASHM2ValueAddEstSimResult, estimatetype, isEstimateReefer);

	                  busyDialog.close();
		        },
		        function(error){
		      	  console.log("Get Lab Cost Failure");
		      	  busyDialog.close();
		        });

	},

	/* SDASHM2 - Function - Open Additional Estimate Popover */

	openSDASHM2AddEst : function(button, oSDASHM2ValueAddEstSimResult, estimatetype, isEstimateReefer){

		var oCurrent = this;
		var equips = "";
		var estimatenos = "";
		var depotcodes = "";
		var arraySelLines = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
		var isSelectedOne = arraySelLines.length;

		if(isSelectedOne == 0){
      		sap.ui.commons.MessageBox.alert("Select one order");
      	}else if(isSelectedOne > 1){
      		sap.ui.commons.MessageBox.alert("Select only one order at a time");
      	}else{

	      	oSDASHM2JsonLabCost = [];
			for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
				if(arraySelLines.indexOf(i) != -1){
					var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
					if(oDetData != undefined){
						var realPath = oDetData.getPath().split('/')[2];
						equips = oSDASHMJsonEquipmentLevel[realPath].equnr;
						depotcodes = oSDASHMJsonEquipmentLevel[realPath].depotcode;
						estimatenos = oSDASHMJsonEquipmentLevel[realPath].estimateno;


						oSDASHM2JsonLabCost.push({
							serialno : oSDASHMJsonEquipmentLevel[realPath].serialno,
							labcost : oSDASHM2ValueAddEstSimResult.labcost,
							status : oSDASHM2ValueAddEstSimResult.redec,
							grade : oSDASHM2ValueAddEstSimResult.grade,
							cwamount : oSDASHMJsonEquipmentLevel[realPath].cwamtloc,
							matcost : "",
							labhrs : "",
							total : "",
							comment : ""
						});

						if(isEstimateReefer){
							oSDASHM2JsonLabCost.push({
								serialno : oSDASHMJsonEquipmentLevel[realPath].serialno + "-01",
								labcost : oSDASHM2ValueAddEstSimResult.labcostm,
								status : oSDASHM2ValueAddEstSimResult.redec,
								grade : oSDASHM2ValueAddEstSimResult.grade,
								cwamount : oSDASHMJsonEquipmentLevel[realPath].cwamtloc,
								matcost : "",
								labhrs : "",
								total : "",
								comment : ""
							});
						}

					}
				}
			}


			oSDASHM2ModelLabCost.setData({modelData: oSDASHM2JsonLabCost});

			var oSDASHM2ContentAddEst = oCurrent.setSDASHM2ContentAddEst(estimatetype);

			if(sap.ui.getCore().byId("idSDASHM2ButtonAddEstSimulate") != undefined)
						 sap.ui.getCore().byId("idSDASHM2ButtonAddEstSimulate").destroy();

			 if(sap.ui.getCore().byId("idSDASHM2ButtonAddEstSubmit") != undefined)
							 sap.ui.getCore().byId("idSDASHM2ButtonAddEstSubmit").destroy();

	        var oSDASHM2ButtonAddEstSimulate = new sap.ui.commons.Button("idSDASHM2ButtonAddEstSimulate",{
		          text : "Simulate",
		          //styled:false,
		          visible:true,
		          //type:sap.m.ButtonType.Unstyled,
		          //icon: sap.ui.core.IconPool.getIconURI("email"),
		          press:function(oEvent){
		        	  oCurrent.simulateSDASHM2();
		          }
			});//.addStyleClass("excelBtn marginTop10 floatRight");

	        var oSDASHM2ButtonAddEstSubmit = new sap.ui.commons.Button("idSDASHM2ButtonAddEstSubmit",{
		          text : "Submit",
		          //styled:false,
							visible:false,
		          //type:sap.m.ButtonType.Unstyled,
		          //icon: sap.ui.core.IconPool.getIconURI("email"),
		          press:function(oEvent){
								if(oSDASHM2JsonLabCost[0].labhrs == "" ||
										oSDASHM2JsonLabCost[0].matcost == "" ||
											oSDASHM2JsonLabCost[0].comment == ""){
												sap.ui.commons.MessageBox.alert("Please fill mandatory fields");
												return;
								}

								var oSDASHM3Doc = new sdashm3doc();
								oSDASHM3Doc.openUploadDocumentsPopup(sap.ui.getCore().byId("idSDASHM2ButtonAddEstSubmit"), "ADDEST");
		          }
			});//.addStyleClass("excelBtn marginTop10 floatRight");

	        var oSDASHM2ButtonAddEstClose = new sap.ui.commons.Button({
	            text : "Close",
	            //styled:false,
	            visible:true,
	            //type:sap.m.ButtonType.Unstyled,
	            //icon: sap.ui.core.IconPool.getIconURI("email"),
	            press:function(oEvent){
	            	oSDASHM1PopoverAddEst.close();
	            }
	        });//.addStyleClass("excelBtn marginTop10 floatRight");

					/*if(sap.ui.getCore().byId("idSDASHM2RadioButtonAddEstAddEst") != undefined)
			         	 sap.ui.getCore().byId("idSDASHM2RadioButtonAddEstAddEst").destroy();

					 if(sap.ui.getCore().byId("idSDASHM2RadioButtonAddEstPreEst") != undefined)
				         	 sap.ui.getCore().byId("idSDASHM2RadioButtonAddEstPreEst").destroy();

					var oSDASHM2RadioButtonAddEstAddEst = new sap.ui.commons.RadioButton("idSDASHM2RadioButtonAddEstAddEst",{
						text : 'Additional',
						//tooltip : 'Select for Yes',
						groupName : 'Estimate',
						selected : true,
						select : function() {console.log('Additional');}
					}).addStyleClass("pdfexcelcheckboxes");

					var oSDASHM2RadioButtonAddEstPreEst = new sap.ui.commons.RadioButton("idSDASHM2RadioButtonAddEstPreEst",{
						text : 'Pre-Delivery',
						//tooltip : 'Select for No',
						groupName : 'Estimate',
						select : function() {console.log('Pre-Delivery');}
					}).addStyleClass("pdfexcelcheckboxes");*/

					if(sap.ui.getCore().byId("idSDASHM2LabelEstimateType") != undefined)
								 sap.ui.getCore().byId("idSDASHM2LabelEstimateType").destroy();

					var oSDASHM2LabelEstimateType = new sap.m.Label("idSDASHM2LabelEstimateType",{
									visible : false,
			            text : estimatetype,
			            width : "180px"
			            }).addStyleClass("selectionLabels");

	        /* SDASHM2 - Flexbox - Additional Estimate Buttons*/

					var oSDASHM2FlexAddEstButtons = new sap.m.FlexBox({
					         items: [
					                oSDASHM2ButtonAddEstClose,
					                new sap.m.Label({width : "15px"}),
													oSDASHM2ButtonAddEstSimulate,
													new sap.m.Label({width : "15px"}),
					                oSDASHM2ButtonAddEstSubmit,
													new sap.m.Label({width : "15px"}),
													oSDASHM2LabelEstimateType
													//new sap.m.Label({width : "15px"}),
													//oSDASHM2RadioButtonAddEstAddEst,
													//new sap.m.Label({width : "15px"}),
													//oSDASHM2RadioButtonAddEstPreEst
					       ],
					       direction : "Row",
					       visible: true
					});


			/* SDASHM2 - Flexbox - Additional Estimate Tables and Buttons*/

			var oSDASHM2FlexAddEstPopup = new sap.m.FlexBox({
			         items: [
			                oSDASHM2ContentAddEst,
											new sap.m.Label({text : "*Denotes Required Field"}).addStyleClass("starText"),
			                new sap.m.Label({width : "15px"}),
			                oSDASHM2FlexAddEstButtons
			       ],
			       direction : "Column",
			       visible: true
			});

			/* SDASHM2 - Popover - Additional Estimate */

			oSDASHM1PopoverAddEst = new sap.m.Popover({
		          title: estimatetype, //"Additional Repairs",
		          //width:"1300px",
							//contentWidth : '1200px',
		          modal: true,
		          placement: sap.m.PlacementType.Bottom,
		          content: new sap.m.VBox({
		                                  //width:"300px",
																			width: '1200px',
		                                  items:  [oSDASHM2FlexAddEstPopup]
		                                  }),

		          }).addStyleClass("sapUiPopupWithPadding");


			oSDASHM1PopoverAddEst.openBy(button);
      	}

	},

	/* SDASHM2 - Function - Simulate Additional Estimate */

	simulateSDASHM2 : function(){

		if(oSDASHM2JsonLabCost[0].labhrs == "" ||
				oSDASHM2JsonLabCost[0].matcost == "" ||
					oSDASHM2JsonLabCost[0].comment == ""){
						sap.ui.commons.MessageBox.alert("Please fill mandatory fields");
						return;
		}else if(parseInt(oSDASHM2JsonLabCost[0].labhrs) < 0 ||
					parseInt(oSDASHM2JsonLabCost[0].matcost) < 0){
						sap.ui.commons.MessageBox.alert("Negative Value not allowed");
						return;
		}

		if(globalIsEstimateReefer){
			if(oSDASHM2JsonLabCost[1].labhrs == "" ||
					oSDASHM2JsonLabCost[1].matcost == "" ||
						oSDASHM2JsonLabCost[1].comment == ""){
							sap.ui.commons.MessageBox.alert("Please fill mandatory fields");
							return;
			}else if(parseInt(oSDASHM2JsonLabCost[1].labhrs) < 0 ||
								parseInt(oSDASHM2JsonLabCost[1].matcost) < 0){
							sap.ui.commons.MessageBox.alert("Negative Value not allowed");
							return;
			}
		}

	 var oCurrent = this;
	 		 var arraySelLines = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
			 var depotsim = "";
			 var estimatesim = "";
			 var serialsim = "";
			 var equnrsim = "";

	 for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
		 if(arraySelLines.indexOf(i) != -1){
			 var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
			 if(oDetData != undefined){
				 var realPath = oDetData.getPath().split('/')[2];
				 serialsim = oSDASHMJsonEquipmentLevel[realPath].serialno;
				 equnrsim = oSDASHMJsonEquipmentLevel[realPath].equnr;
				 depotsim = oSDASHMJsonEquipmentLevel[realPath].depotcode;
				 estimatesim = oSDASHMJsonEquipmentLevel[realPath].estimateno;
			 }
		 }
	 }

	 var urlToSap =  "addEstSimSet(IvDepot='" + depotsim +
									 "',IvEstimate='" + estimatesim +
									 "',IvSerial='" + serialsim +
									 "',IvEqunr='" + equnrsim +
									 "',IvLabourHrs=" + oSDASHM2JsonLabCost[0].labhrs +
									 "m,IvMatCost=" + oSDASHM2JsonLabCost[0].matcost +
									 "m,IvCwAmount=" + oSDASHM2JsonLabCost[0].cwamount.split(',').join('') +
									 "m)";
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

									 var oSDASHM2JsonAddEstSimLoc = data;
									 oSDASHM2ValueAddEstSimResult = {
											 labcost : "",
											 redec : "",
											 grade : ""
									 };
									 oSDASHM2ValueAddEstSimResult.labcost = oSDASHM2JsonAddEstSimLoc.EvLabRate;
									 oSDASHM2JsonLabCost[0].status = oSDASHM2ValueAddEstSimResult.redec = oSDASHM2JsonAddEstSimLoc.Redec;
									 oSDASHM2JsonLabCost[0].grade = oSDASHM2ValueAddEstSimResult.grade = oSDASHM2JsonAddEstSimLoc.Grading;
									 if(oSDASHM2JsonLabCost[1] != undefined){
										 oSDASHM2JsonLabCost[1].status = oSDASHM2ValueAddEstSimResult.redec = oSDASHM2JsonAddEstSimLoc.Redec;
										 oSDASHM2JsonLabCost[1].grade = oSDASHM2ValueAddEstSimResult.grade = oSDASHM2JsonAddEstSimLoc.Grading;
									 }


									 sap.ui.getCore().byId("idSDASHM2TableAddEstGrade").setVisible(true);
									 sap.ui.getCore().byId("idSDASHM2TableAddEstStatus").setVisible(true);

									 sap.ui.getCore().byId("idSDASHM2TableAddEstLabHrs").setEditable(false);
									 sap.ui.getCore().byId("idSDASHM2TableAddEstMatCost").setEditable(false);

									 sap.ui.getCore().byId("idSDASHM2ButtonAddEstSimulate").setVisible(false);
									 sap.ui.getCore().byId("idSDASHM2ButtonAddEstSubmit").setVisible(true);
							 	 	 console.log("Add. Estimate Simulation Success");
							 	 	 busyDialog.close();
					 },
					 function(error){
						 console.log("Add. Estimate Simulation Failure");
						 busyDialog.close();
					 });

	},

	/* SDASHM2 - Function - submit Additional Estimate */

	submitSDASHM2 : function(){
		var oCurrent = this;
		var stringToPass1 = "";
		var stringToPass2 = "";
		var arraySelLines = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
		var isSelectedOne = arraySelLines.length;
		for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
			if(arraySelLines.indexOf(i) != -1){
				var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
				if(oDetData != undefined){
				var realPath = oDetData.getPath().split('/')[2];
					stringToPass1 = oSDASHMJsonEquipmentLevel[realPath].serialno;
					stringToPass1 = stringToPass1 + "$" + oSDASHMJsonEquipmentLevel[realPath].depotcode;
					stringToPass1 = stringToPass1 + "$" + oSDASHM2JsonLabCost[0].grade; //oSDASHMJsonEquipmentLevel[realPath].salesgrade;
					stringToPass1 = stringToPass1 + "$" + oSDASHMJsonEquipmentLevel[realPath].estimatecurrency;
					if(globalIsEstimateReefer){
						stringToPass2 = oSDASHMJsonEquipmentLevel[realPath].serialno;
						stringToPass2 = stringToPass2 + "$" + oSDASHMJsonEquipmentLevel[realPath].depotcode;
						stringToPass2 = stringToPass2 + "$" + oSDASHM2JsonLabCost[1].grade; //oSDASHMJsonEquipmentLevel[realPath].salesgrade;
						stringToPass2 = stringToPass2 + "$" + oSDASHMJsonEquipmentLevel[realPath].estimatecurrency;
					}
				}
			}
		}

		oSDASHM2JsonLabCost[0].comment = encodeURIComponent(oSDASHM2JsonLabCost[0].comment);
		if(globalIsEstimateReefer)
			oSDASHM2JsonLabCost[1].comment = encodeURIComponent(oSDASHM2JsonLabCost[1].comment);

		stringToPass1 = stringToPass1 + "$" + oSDASHM2JsonLabCost[0].labhrs;
		stringToPass1 = stringToPass1 + "$" + oSDASHM2JsonLabCost[0].labcost;
		stringToPass1 = stringToPass1 + "$" + oSDASHM2JsonLabCost[0].matcost;
		stringToPass1 = stringToPass1 + "$" + oSDASHM2JsonLabCost[0].comment;
		stringToPass1 = stringToPass1 + "$" + oSDASHM2JsonLabCost[0].status;

		if(globalIsEstimateReefer){
			stringToPass2 = stringToPass2 + "$" + oSDASHM2JsonLabCost[1].labhrs;
			stringToPass2 = stringToPass2 + "$" + oSDASHM2JsonLabCost[1].labcost;
			stringToPass2 = stringToPass2 + "$" + oSDASHM2JsonLabCost[1].matcost;
			stringToPass2 = stringToPass2 + "$" + oSDASHM2JsonLabCost[1].comment;
			stringToPass2 = stringToPass2 + "$" + oSDASHM2JsonLabCost[1].status;
		}
		var processAddEstPreEst = "";

		if(sap.ui.getCore().byId("idSDASHM2LabelEstimateType").getText() == "Additional")
			processAddEstPreEst = "addEstSet";
		else
			processAddEstPreEst = "preEstSet";

		var urlToSap = processAddEstPreEst + "?$filter=IvEstimate1 eq '" + stringToPass1 + "' and IvEstimate2 eq '" + stringToPass2 + "'";
	  urlToSap = serviceDEP + urlToSap;

			sap.ui.getCore().byId("idSDASHM2TableAddEstGrade").setVisible(true);
			sap.ui.getCore().byId("idSDASHM2TableAddEstStatus").setVisible(true);

			sap.ui.getCore().byId("idSDASHM2TableAddEstLabHrs").setEditable(false);
			sap.ui.getCore().byId("idSDASHM2TableAddEstMatCost").setEditable(false);

			sap.ui.getCore().byId("idSDASHM2ButtonAddEstSimulate").setVisible(false);
			sap.ui.getCore().byId("idSDASHM2ButtonAddEstSubmit").setVisible(true);

	    oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	    busyDialog.open();
	    console.log(urlToSap);
	    OData.request({
	                  requestUri: urlToSap,
	                  method: "GET",
	                  dataType: 'json',
	                  //async: false,
	                  headers:
	                  {
	                  "X-Requested-With": "XMLHttpRequest",
	                  "Content-Type": "application/json; charset=utf-8",
	                  "DataServiceVersion": "2.0",
	                  "X-CSRF-Token":"Fetch"
	                  }
	                  },
	                  function (data, response){

	                  var oSDASHM2JsonAddEst = [];
	                  oSDASHM2JsonAddEst = data.results;

	                  if(oSDASHM2JsonAddEst.length == 0){
	                	  console.log("Estimate Creation Success; but returned nothing");
	                	  sap.ui.commons.MessageBox.alert("Estimate creation failed!");
	                  }else{
	                	  var isError = false;
	                  	  for(var i=0; i<oSDASHM2JsonAddEst.length; i++){
	                  		  if(oSDASHM2JsonAddEst[i].Type == "E"){
	                  			isError = true;
	                  		  }
	                  	  }
												//isError = false;
	                  	  if(isError == true){
	                  			sap.ui.commons.MessageBox.alert("Estimate creation failed!");
													sap.ui.getCore().byId("idSDASHM3PopoverUploadDocument").close();
													oSDASHM1PopoverAddEst.close();
	                  	  }else{
													sap.ui.commons.MessageBox.alert("Estimate created and file uploaded!");
													sap.ui.getCore().byId("idSDASHM3PopoverUploadDocument").close();
													oSDASHM1PopoverAddEst.close();
													oCurrent.refreshSelectedUnits(); // REFRESHSELUNITS
													// var oSDASHM3Doc = new sdashm3doc();
													// oSDASHM3Doc.openUploadDocumentsPopup(sap.ui.getCore().byId("idSDASHM2ButtonAddEstSubmit"), "ADDEST");
	                  	  }
	                  }
	                  busyDialog.close();
		        },
		        function(error){
		          //sap.ui.commons.MessageBox.alert("Estimate creation failed!");
		      	  console.log("Estimate Creation Failure");
		      	  busyDialog.close();
		        });

	},

	/* SDASHM2 - Function - Send Alert Lessor Survey */

	sendSDASHM2AlertLessorSurvey : function(){

		var equips = "";
		var estimatenos = "";
		var depotcodes = "";
		var arraySelLines = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
		for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
			if(arraySelLines.indexOf(i) != -1){
				var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
				if(oDetData != undefined){
				var realPath = oDetData.getPath().split('/')[2];
				if(equips == ''){
					equips = oSDASHMJsonEquipmentLevel[realPath].serialno;
					depotcodes = oSDASHMJsonEquipmentLevel[realPath].depotcode;
					estimatenos = oSDASHMJsonEquipmentLevel[realPath].estimateno;
  				}else{
  					equips = equips + '$' + oSDASHMJsonEquipmentLevel[realPath].serialno;
  					depotcodes = statuses + '$' + oSDASHMJsonEquipmentLevel[realPath].depotcode;
  					estimatenos = estimatenos + '$' + oSDASHMJsonEquipmentLevel[realPath].estimateno;
  				}
				}
			}
		}

		var surveydate = sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyValueSurveyDate").getValue();
		if(surveydate){
			surveydate = surveydate.substr(6,2) + "." + surveydate.substr(4,2) + "." + surveydate.substr(0,4);
		}

		var urlToSap = "lessorsurveySet?$filter=IvDepot eq '" + depotcodes +
												"' and IvEstimate eq '" + estimatenos +
												"' and IvSerial eq '" + equips +
												"' and IvSurveyDate eq '" + surveydate +
												"'";
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
	                    	 if(data.results.length == 0){
	                    		 console.log("Send Lessor Failure");
	                    		 sap.ui.commons.MessageBox.alert("Sorry, there is an error");
	                    	 }else{
	                    		 if(data.results[0].Result == ""){
	                    			 console.log("Send Lessor Failure");
	                    			 sap.ui.commons.MessageBox.alert("Sorry, there is an error");
	                    		 }else{
	                    			 console.log("Send Lessor Success");
	                    			 sap.ui.commons.MessageBox.alert("Request for Lessor Survey submitted!");
	                    		 }
	                    	 }
	                        busyDialog.close();
	                    },
	                  function(error){
	                      sap.ui.commons.MessageBox.alert("Sorry, there is an error");
	                	  console.log("Send Lessor Failure");
	                	  busyDialog.close();
	                  });
	},

	/* SDASHM2 - Function - Create PopUp CW Approve */
	createCWApprove : function(){
		var oCurrent = this;
		var oSDASHM2ContentCWApprove = oCurrent.setCWApproveInitial();
		oCurrent.openCWApprove(oSDASHM2ContentCWApprove);

	},

	/* SDASHM2 - Function - Open PopUp CW Approve */

	openCWApprove : function(oSDASHM2ContentCWApprove){

		if(sap.ui.getCore().byId("idSDASHM2ButtonCWApproveSimulate") != undefined)
         	 sap.ui.getCore().byId("idSDASHM2ButtonCWApproveSimulate").destroy();

       if(sap.ui.getCore().byId("idSDASHM2ButtonCWApproveSubmit") != undefined)
        	 sap.ui.getCore().byId("idSDASHM2ButtonCWApproveSubmit").destroy();

       if(sap.ui.getCore().byId("idSDASHM2ButtonCWApproveClose") != undefined)
      	 sap.ui.getCore().byId("idSDASHM2ButtonCWApproveClose").destroy();



		var oCurrent = this;
		var oSDASHM2InputCWApproveAmount = new sap.m.Input({
            value : "0",

            width : "70px",
						type : sap.m.InputType.Number,
            liveChange : function(oEvent){

               var newvalue = oEvent.getParameter("newValue");
               if(newvalue == "")
            	   newvalue = 0;

	         	   var total = parseFloat(newvalue);
	         	   var avg = total/oSDASHM2JsonCWApprove.length;

	         	   for(var i=0; i<oSDASHM2JsonCWApprove.length;i++){
	         		  oSDASHM2JsonCWApprove[i].cwamt = avg;
	         	   }
	         	   oSDASHM2ModelCWApprove.updateBindings();

            }
            }).addStyleClass("selectionLabels1");

		var oSDASHM2LabelCWApproveAmount = new sap.m.Label({
            text : "Amount : ",
            labelFor: oSDASHM2InputCWApproveAmount,
            width : "120px"
            }).addStyleClass("selectionLabels");

		var oSDASHM2FlexCWApproveAmount = new sap.m.FlexBox({
	         items: [
	                oSDASHM2LabelCWApproveAmount,
	                new sap.m.Label({width : "15px"}),
	                oSDASHM2InputCWApproveAmount
	       ],
	       direction : "Row",
	       visible: false
	});

		var oSDASHM2ButtonCWApproveSimulate = new sap.ui.commons.Button("idSDASHM2ButtonCWApproveSimulate",{
	          text : "Simulate",
	          //styled:false,
	          visible:true,
	          //type:sap.m.ButtonType.Unstyled,
	          //icon: sap.ui.core.IconPool.getIconURI("email"),
	          press:function(oEvent){
	        	  oCurrent.simulateCWApprove();
	        	  //sap.ui.getCore().byId("idSDASHM1PopoverCWApprove").openBy(sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCWApprove"));
	          }
		});//.addStyleClass("excelBtn marginTop10 floatRight");

      var oSDASHM2ButtonCWApproveSubmit = new sap.ui.commons.Button("idSDASHM2ButtonCWApproveSubmit",{
	          text : "Approve",
	          //styled:false,
	          visible:false,
	          //type:sap.m.ButtonType.Unstyled,
	          //icon: sap.ui.core.IconPool.getIconURI("email"),
	          press:function(oEvent){
							jQuery.sap.require("sap.ui.commons.MessageBox");
							var confirmMessage = "Do you want to Approve?";
							sap.ui.commons.MessageBox.show(confirmMessage,
						sap.ui.commons.MessageBox.Icon.WARNING,
						"Confirm",
						[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
							oCurrent.fnCallbackMessageBox,
						sap.ui.commons.MessageBox.Action.YES);

	          }
		});//.addStyleClass("excelBtn marginTop10 floatRight");

      var oSDASHM2ButtonCWApproveClose = new sap.ui.commons.Button("idSDASHM2ButtonCWApproveClose",{
          text : "Close",
          //styled:false,
          visible:true,
          //type:sap.m.ButtonType.Unstyled,
          //icon: sap.ui.core.IconPool.getIconURI("email"),
          press:function(oEvent){
        	  sap.ui.getCore().byId("idSDASHM1PopoverCWApprove").close();
          }
	});//.addStyleClass("excelBtn marginTop10 floatRight");

      /* SDASHM2 - Flexbox - Additional Estimate Buttons*/

		var oSDASHM2FlexCWApproveButtons = new sap.m.FlexBox({
		         items: [
		                oSDASHM2ButtonCWApproveClose,
		                new sap.m.Label({width : "15px"}),
		                oSDASHM2ButtonCWApproveSimulate,
		                new sap.m.Label({width : "15px"}),
		                oSDASHM2ButtonCWApproveSubmit
		       ],
		       direction : "Row",
		       visible: true
		});


		/* SDASHM2 - Flexbox - Additional Estimate Tables and Buttons*/

		var oSDASHM2FlexCWApprovePopup = new sap.m.FlexBox({
		         items: [
										oSDASHM2FlexCWApproveAmount,
										new sap.m.Label({width : "15px"}),
		                oSDASHM2ContentCWApprove,
		                new sap.m.Label({width : "15px"}),
		                oSDASHM2FlexCWApproveButtons
		       ],
		       direction : "Column",
		       visible: true
		});

		/* SDASHM2 - Popover - CW Approval */

		if(sap.ui.getCore().byId("idSDASHM1PopoverCWApprove") != undefined)
        	 sap.ui.getCore().byId("idSDASHM1PopoverCWApprove").destroy();

		var oSDASHM1PopoverCWApprove = new sap.m.Popover("idSDASHM1PopoverCWApprove",{
	        	title: "CW Approval",
				contentWidth:"500px",		// MACHANAWIDTHCHANGE changed from 1300px to 500px
				modal: true,
	          	placement: sap.m.PlacementType.Left,
	          	content: new sap.m.VBox({
	                                  //width:"300px",
	                                  items:  [oSDASHM2FlexCWApprovePopup]
	                                  }),

	          }).addStyleClass("sapUiPopupWithPadding");


		oSDASHM1PopoverCWApprove.openBy(sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCWApprove"));


	},

	/* SDASHM2 - Function - Submit CW Approve */

	submitCWApprove : function(){
		var oCurrent = this;
		var serialnos = "", equnrs = "", estimatenos = "", repcosts = "", grades = "", fullstatuses = "";

		for(var i=0; i<oSDASHM2JsonCWApprove.length; i++){

			if(serialnos == ''){
				serialnos = oSDASHM2JsonCWApprove[i].serialno;
				equnrs = oSDASHM2JsonCWApprove[i].equnr;
				estimatenos = oSDASHM2JsonCWApprove[i].estimateno;
				repcosts = oSDASHM2JsonCWApprove[i].cwamt;
				grades = oSDASHM2JsonCWApprove[i].grade;
				fullstatuses = oSDASHM2JsonCWApprove[i].fullstatus;
			}else{
				serialnos = serialnos + '$' + oSDASHM2JsonCWApprove[i].serialno;
				equnrs = equnrs + '$' + oSDASHM2JsonCWApprove[i].equnr;
				estimatenos = estimatenos + '$' + oSDASHM2JsonCWApprove[i].estimateno;
				repcosts = repcosts + '$' + oSDASHM2JsonCWApprove[i].cwamt;
				grades = grades + '$' + oSDASHM2JsonCWApprove[i].grade;
				fullstatuses = fullstatuses + '$' + oSDASHM2JsonCWApprove[i].fullstatus;
			}

		}


		var urlToSap = "cwsubmitSet?$filter=IvEqunr eq '"
		+ equnrs + "' and IvEstimate eq '"
		+ estimatenos + "' and IvSerial eq '"
		+ serialnos + "' and IvCwAmount eq '"
		+ repcosts + "' and IvGrade eq '"
		+ grades + "' and IvStatus eq '"
		+ fullstatuses + "'";

		sap.ui.getCore().byId("idSDASHM2TableCWApproveGrade").setVisible(true);
		sap.ui.getCore().byId("idSDASHM2TableCWApproveStatus").setVisible(true);
		sap.ui.getCore().byId("idSDASHM2ButtonCWApproveSimulate").setVisible(true);
		sap.ui.getCore().byId("idSDASHM2ButtonCWApproveSubmit").setVisible(true);
		urlToSap = serviceDEP + urlToSap;
		oModel = new sap.ui.model.odata.ODataModel(serviceDEP,true);
		busyDialog.open();
		console.log(urlToSap);
		OData.request(
				{
					requestUri : urlToSap,
					method : "GET",
					dataType : 'json',
					//async : false,
					headers : {
						"X-Requested-With" : "XMLHttpRequest",
						"Content-Type" : "application/json; charset=utf-8",
						"DataServiceVersion" : "2.0",
						"X-CSRF-Token" : "Fetch"
					}
				},
				function(data, response) {
					busyDialog.close();
					var cwsubmitResult = data.results;
                    if(cwsubmitResult.length == 0){
                  	  sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                  	  console.log("CW Submit Failure");
                    }else if(cwsubmitResult[0].Result == ''){
                  	  sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                  	  console.log("CW Submit Failure");
                    }else{
                  	  sap.ui.commons.MessageBox.alert("Approved");
                  	  sap.ui.getCore().byId("idSDASHM1PopoverCWApprove").close();
                  	  console.log("CW Submit Successful");
											oCurrent.refreshSelectedUnits(); // REFRESHSELUNITS
                  }
				},
				function(error) {

					sap.ui.commons.MessageBox.alert("Sorry, there is an error");
					console.log("CW Submission Failure");
					busyDialog.close();
				});

	},

	/* SDASHM2 - Function - Simulate CW Approve */

	simulateCWApprove : function(){



		var serialnos = "", equnrs = "", estimatenos = "", repcosts = "";
		var cwLocTotal = 0;
		for(var i=0; i<oSDASHM2JsonCWApprove.length; i++){
			//cwLocTotal = cwLocTotal + parseFloat(oSDASHM2JsonCWApprove[i].cwamt.split(',').join(''));

			if(parseInt(oSDASHM2JsonCWApprove[i].cwamt) < 0){
					sap.ui.commons.MessageBox.alert("Negative Value not allowed");
					return;
			}

			if(serialnos == ''){
				serialnos = oSDASHM2JsonCWApprove[i].serialno;
				equnrs = oSDASHM2JsonCWApprove[i].equnr;
				estimatenos = oSDASHM2JsonCWApprove[i].estimateno;
				repcosts = oSDASHM2JsonCWApprove[i].cwamt;
			}else{
				serialnos = serialnos + '$' + oSDASHM2JsonCWApprove[i].serialno;
				equnrs = equnrs + '$' + oSDASHM2JsonCWApprove[i].equnr;
				estimatenos = estimatenos + '$' + oSDASHM2JsonCWApprove[i].estimateno;
				repcosts = repcosts + '$' + oSDASHM2JsonCWApprove[i].cwamt;
			}

		}

		/*if(cwLocTotal > globalCwLocmax){
			sap.ui.commons.MessageBox.alert("Total CW Amount cannot exceed maximum amount " + globalCwLocmax);
			return;
		}*/

		var urlToSap = "cwsimulateSet?$filter=IvEqunr eq '"
		+ equnrs + "' and IvEstimate eq '"
		+ estimatenos + "' and IvSerial eq '"
		+ serialnos + "' and IvRepCost eq '"
		+ repcosts + "'";

		sap.ui.getCore().byId("idSDASHM2TableCWApproveGrade").setVisible(false);
		sap.ui.getCore().byId("idSDASHM2TableCWApproveStatus").setVisible(false);
		sap.ui.getCore().byId("idSDASHM2ButtonCWApproveSimulate").setVisible(true);
		sap.ui.getCore().byId("idSDASHM2ButtonCWApproveSubmit").setVisible(false);
		urlToSap = serviceDEP + urlToSap;
		oModel = new sap.ui.model.odata.ODataModel(serviceDEP,true);
		busyDialog.open();
		console.log(urlToSap);
		OData.request(
				{
					requestUri : urlToSap,
					method : "GET",
					dataType : 'json',
					//async : false,
					headers : {
						"X-Requested-With" : "XMLHttpRequest",
						"Content-Type" : "application/json; charset=utf-8",
						"DataServiceVersion" : "2.0",
						"X-CSRF-Token" : "Fetch"
					}
				},
				function(data, response) {
					/*if (data.results.length == 0) {
						console.log("CW Failure");

						for(var i=0; i<oSDASHM2JsonCWApprove.length; i++){

							oSDASHM2JsonCWApprove[i].grade = "";
							oSDASHM2JsonCWApprove[i].status = "";
							oSDASHM2JsonCWApprove[i].gradevisible = false;
							oSDASHM2JsonCWApprove[i].statusvisible = false;

						}

						oSDASHM2ModelCWApprove.updateBindings();

						sap.ui.commons.MessageBox.alert("Sorry, there is an error");
					} else {*/
						for(var i=0; i<oSDASHM2JsonCWApprove.length; i++){

							oSDASHM2JsonCWApprove[i].grade = data.results[i].Grading;
							oSDASHM2JsonCWApprove[i].status = data.results[i].Redec;
							oSDASHM2JsonCWApprove[i].gradevisible = true;
							oSDASHM2JsonCWApprove[i].statusvisible = true;

						}
						sap.ui.getCore().byId("idSDASHM2TableCWApproveGrade").setVisible(true);
						sap.ui.getCore().byId("idSDASHM2TableCWApproveStatus").setVisible(true);
						sap.ui.getCore().byId("idSDASHM2ButtonCWApproveSimulate").setVisible(true);
						sap.ui.getCore().byId("idSDASHM2ButtonCWApproveSubmit").setVisible(true);
						oSDASHM2ModelCWApprove.updateBindings();

						sap.ui.getCore().byId("idSDASHM1PopoverCWApprove").setContentWidth("800px"); // MACHANAWIDTHCHANGE+

					//}
					busyDialog.close();
				},
				function(error) {
					for(var i=0; i<oSDASHM2JsonCWApprove.length; i++){

						oSDASHM2JsonCWApprove[i].grade = "";
						oSDASHM2JsonCWApprove[i].status = "";
						oSDASHM2JsonCWApprove[i].gradevisible = false;
						oSDASHM2JsonCWApprove[i].statusvisible = false;

					}

					sap.ui.commons.MessageBox.alert("Sorry, there is an error");
					console.log("CW Simulation Failure");
					busyDialog.close();
				});


	},

	/* SDASHM2 - Function - Set CW Approve Popup content */

	setCWApproveInitial : function(){
		globalCwLocmax = 0;
		oSDASHM2JsonCWApprove = [];
		var oCurrent = this;
		var arraySelLines = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
		for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
  			if(arraySelLines.indexOf(i) != -1){
					var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
					if(oDetData != undefined){

						var realPath = oDetData.getPath().split('/')[2];
						globalCwLocmax = globalCwLocmax + parseFloat(oSDASHMJsonEquipmentLevel[realPath].cwamtloc.split(',').join(''));

						oSDASHM2JsonCWApprove.push({
							serialno : oSDASHMJsonEquipmentLevel[realPath].serialno,
							estimateno : oSDASHMJsonEquipmentLevel[realPath].estimateno,
							equnr : oSDASHMJsonEquipmentLevel[realPath].equnr,
							cwamt : oSDASHMJsonEquipmentLevel[realPath].cwamtloc.split(',').join(''),
							cwcurr : oSDASHMJsonEquipmentLevel[realPath].estimatecurrency,
							fullstatus : oSDASHMJsonEquipmentLevel[realPath].status,
							grade : "",
							status : "",
							gradevisible : false,
							statusvisible : false
						});
					}
  			}
  		}


        if(sap.ui.getCore().byId("idSDASHM2TableCWApproveGrade") != undefined)
          	 sap.ui.getCore().byId("idSDASHM2TableCWApproveGrade").destroy();

        if(sap.ui.getCore().byId("idSDASHM2TableCWApproveStatus") != undefined)
         	 sap.ui.getCore().byId("idSDASHM2TableCWApproveStatus").destroy();

					 if(sap.ui.getCore().byId("idSDASHM2TableCWAmount") != undefined)
			 				sap.ui.getCore().byId("idSDASHM2TableCWAmount").destroy();

			 		if(sap.ui.getCore().byId("idSDASHM2TableCWApprove") != undefined)
			 			sap.ui.getCore().byId("idSDASHM2TableCWApprove").destroy();

		 /* SDASHM2 - Table - CW Approve */

		 var oSDASHM2TableCWAmount = new sap.ui.table.Table("idSDASHM2TableCWAmount",{
		 		 visibleRowCount: 1,
		 		 //width: '550px', // MACHANAWIDTHCHANGE-
		 		 showNoData: false,
		 		 selectionMode: sap.ui.table.SelectionMode.None,
				 columnHeaderVisible : false,
		 }).addStyleClass("sapUiSizeCompact tblBorder");

		 oSDASHM2TableCWAmount.addColumn(new sap.ui.table.Column({
		 	 //label: new sap.ui.commons.Label({text: "Lumpsum Amount", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "lump").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"120px" // MACHANAWIDTHCHANGE changed from 120px to auto
		 	 }));

		 oSDASHM2TableCWAmount.addColumn(new sap.ui.table.Column({
		 	//label: new sap.ui.commons.Label({text: "Lumpsum Amount", textAlign: "Left"}).addStyleClass("wraptextcol"),
		 	template: new sap.m.Input({
				 value: "",
				 textAlign: "Right",
				 type : sap.m.InputType.Number,
				 liveChange : function(oEvent){

						var newvalue = oEvent.getParameter("newValue");
						// if(parseInt(newvalue) < 0){
						// 		console.log("Negative");
						// 		this.setValue("");
						// 		return;
						// }
						if(newvalue == "")
							newvalue = 0;

					var total = parseFloat(newvalue);
					var avg = total/oSDASHM2JsonCWApprove.length;

					for(var i=0; i<oSDASHM2JsonCWApprove.length;i++){
					 oSDASHM2JsonCWApprove[i].cwamt = avg;
					}
				 oSDASHM2ModelCWApprove.updateBindings();

				 }
			 }).bindProperty("value", "lumpvalue").addStyleClass("borderStyle cwamountinput").removeStyleClass("sapMInput sapMInputBase sapMInputBaseWidthPadding"),
		 				resizable:false,
		 				width:"200px" // MACHANAWIDTHCHANGE changed from 100px to auto
		 	}));

			var oSDASHM2JsonCWAmount = [];
			oSDASHM2JsonCWAmount.push({
				lump : "Lumpsum Amount",
				lumpvalue : ""
			});

			var oSDASHM2ModelCWAmount = new sap.ui.model.json.JSONModel();
			oSDASHM2ModelCWAmount.setData({modelData: oSDASHM2JsonCWAmount});

    	oSDASHM2TableCWAmount.setModel(oSDASHM2ModelCWAmount);
    	oSDASHM2TableCWAmount.bindRows("/modelData");

		 /*oSDASHM2TableCWAmount.addColumn(new sap.ui.table.Column({
		 	 label: new sap.m.Input({
				 	value: "",
					textAlign: "Right",
					type : sap.m.InputType.Number,
					liveChange : function(oEvent){

						 var newvalue = oEvent.getParameter("newValue");
						 if(newvalue == "")
							 newvalue = 0;

					 var total = parseFloat(newvalue);
					 var avg = total/oSDASHM2JsonCWApprove.length;

					 for(var i=0; i<oSDASHM2JsonCWApprove.length;i++){
						oSDASHM2JsonCWApprove[i].cwamt = avg;
					 }
					oSDASHM2ModelCWApprove.updateBindings();

					}
		 		}).addStyleClass("borderStyle cwamountinput").removeStyleClass("sapMInput sapMInputBase sapMInputBaseWidthPadding"),
				 resizable:false,
				 width:"25px"
		 	 }));*/

		/* SDASHM2 - Table - CW Approve */

		var oSDASHM2TableCWApprove = new sap.ui.table.Table("idSDASHM2TableCWApprove",{
     		 visibleRowCount: 4,
     		 //width: '550px', // MACHANAWIDTHCHANGE-
     		 showNoData: false,
             selectionMode: sap.ui.table.SelectionMode.None,
		}).addStyleClass("sapUiSizeCompact tblBorder");

		oSDASHM2TableCWApprove.addColumn(new sap.ui.table.Column({
      label: new sap.ui.commons.Label({text: "Serial No.", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "serialno").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"120px"
			 }));

		oSDASHM2TableCWApprove.addColumn(new sap.ui.table.Column({
       label: new sap.ui.commons.Label({text: "CW Amount", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.m.Input({
				 value: "",
				 textAlign: "Right",
				 type : sap.m.InputType.Number,
				 liveChange : function(oEvent){

					 var newvalue = oEvent.getParameter("newValue");
					 // if(parseInt(newvalue) < 0){
						// 	 console.log("Negative");
						// 	 this.setValue("");
						// 	 return;
					 // }
					 }
			 }).bindProperty("value", "cwamt").addStyleClass("borderStyle cwamountinput").removeStyleClass("sapMInput sapMInputBase sapMInputBaseWidthPadding"),
	           resizable:false,
	           width:"200px"	// MACHANAWIDTHCHANGE changed from 100px to auto
			 }));

			 oSDASHM2TableCWApprove.addColumn(new sap.ui.table.Column("idSDASHM2TableCWApproveCurrency",{
	 			visible : true,
	             label: new sap.ui.commons.Label({text: "Currency", textAlign: "Left"}).addStyleClass("wraptextcol"),
	 			 template: new sap.ui.commons.TextView({
	 			 }).bindProperty("text", "cwcurr").addStyleClass("borderStyle1"),
	 	           resizable:false,
	 	           width:"120px"
	 			 }));

		oSDASHM2TableCWApprove.addColumn(new sap.ui.table.Column("idSDASHM2TableCWApproveGrade",{
			visible : false,
         label: new sap.ui.commons.Label({text: "Grade", textAlign: "Left"}).addStyleClass("wraptextcol"),
	 			 template: new sap.m.Input({
				 textAlign: "Right",
				 type : sap.m.InputType.Number
			 }).bindProperty("value", "grade").bindProperty("visible", "gradevisible").addStyleClass("borderStyle cwgradeinput").removeStyleClass("sapMInput sapMInputBase sapMInputBaseWidthPadding"),
	           resizable:false,
	           width:"120px"
			 }));

		oSDASHM2TableCWApprove.addColumn(new sap.ui.table.Column("idSDASHM2TableCWApproveStatus",{
			visible : false,
            label: new sap.ui.commons.Label({text: "Status", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "status").bindProperty("visible", "statusvisible").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"200px"
			 }));


		oSDASHM2ModelCWApprove.setData({modelData: oSDASHM2JsonCWApprove});

      	oSDASHM2TableCWApprove.setModel(oSDASHM2ModelCWApprove);
      	oSDASHM2TableCWApprove.bindRows("/modelData");

      	var oSDASHM2JsonCWApproveLength = oSDASHM2JsonCWApprove.length;
      	if(oSDASHM2JsonCWApproveLength < 11){
      		oSDASHM2TableCWApprove.setVisibleRowCount(oSDASHM2JsonCWApproveLength);
      		oSDASHM2TableCWApprove.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
      	}
      	else{
      		oSDASHM2TableCWApprove.setVisibleRowCount(10);
      		oSDASHM2TableCWApprove.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
      	}

      	return new sap.m.FlexBox({
					items : [oSDASHM2TableCWAmount, oSDASHM2TableCWApprove],
					direction : "Column"
				});
	},

	/* SDASHM2 - Function - Create PopUp CS Approve */
	createCSApprove : function(){
		var oCurrent = this;
		var oSDASHM2ContentCSApprove = oCurrent.setCSApproveInitial(2);
		oCurrent.openCSApprove(oSDASHM2ContentCSApprove, 2);

	},

	/* SDASHM2 - Function - Open PopUp CS Approve */

	openCSApprove : function(oSDASHM2ContentCSApprove, page){

       if(sap.ui.getCore().byId("idSDASHM2ButtonCSApproveApprove") != undefined)
        	 sap.ui.getCore().byId("idSDASHM2ButtonCSApproveApprove").destroy();

       if(sap.ui.getCore().byId("idSDASHM2ButtonCSApproveClose") != undefined)
      	 sap.ui.getCore().byId("idSDASHM2ButtonCSApproveClose").destroy();



		var oCurrent = this;


      var oSDASHM2ButtonCSApproveApprove = new sap.ui.commons.Button("idSDASHM2ButtonCSApproveApprove",{
	          text : "Approve",
	          //styled:false,
						//type:sap.m.ButtonType.Unstyled,
	          visible:true,
	          //icon: sap.ui.core.IconPool.getIconURI("email"),
	          press:function(oEvent){
	        	  oCurrent.ApproveCSApprove();
	          }
		});//.addStyleClass("excelBtn marginTop10 floatRight");

      var oSDASHM2ButtonCSApproveClose = new sap.ui.commons.Button("idSDASHM2ButtonCSApproveClose",{
          text : "Close",
          //styled:false,
          visible:true,
          //type:sap.m.ButtonType.Unstyled,
          //icon: sap.ui.core.IconPool.getIconURI("email"),
          press:function(oEvent){
        	  sap.ui.getCore().byId("idSDASHM2PopoverCSApprove").close();
          }
	});//.addStyleClass("excelBtn marginTop10 floatRight");

      /* SDASHM2 - Flexbox - Additional Estimate Buttons*/

		var oSDASHM2FlexCSApproveButtons = new sap.m.FlexBox({
		         items: [
										oSDASHM2ButtonCSApproveClose,
		                new sap.m.Label({width : "15px"}),
		                oSDASHM2ButtonCSApproveApprove
		       ],
		       direction : "Row",
		       visible: true
		});


		/* SDASHM2 - Flexbox - Additional Estimate Tables and Buttons*/

		var oSDASHM2FlexCSApprovePopup = new sap.m.FlexBox({
		         items: [
		                oSDASHM2ContentCSApprove,
										new sap.m.Label({text : "*Denotes Required Field. Reference will appear in Seaco Invoice."}).addStyleClass("starText"),
										new sap.m.Label({width : "15px"}),
		                oSDASHM2FlexCSApproveButtons
		       ],
		       direction : "Column",
		       visible: true
		});

		/* SDASHM2 - Popover - Customer Approval */

		if(sap.ui.getCore().byId("idSDASHM2PopoverCSApprove") != undefined)
        	 sap.ui.getCore().byId("idSDASHM2PopoverCSApprove").destroy();

		 if(page == 2){
	 		 var custappplacement = sap.m.PlacementType.Left;
 		}else if(page == 3){
 			var custappplacement = sap.m.PlacementType.Right;
 		}

		var oSDASHM2PopoverCSApprove = new sap.m.Popover("idSDASHM2PopoverCSApprove",{
	        title: "Customer Approval",
	        width:"1300px",
	          modal: true,
	          placement: custappplacement,
	          content: new sap.m.VBox({
	                                  //width:"300px",
	                                  items:  [oSDASHM2FlexCSApprovePopup]
	                                  }),

	          }).addStyleClass("sapUiPopupWithPadding");

	    if(page == 2){
	    	oSDASHM2PopoverCSApprove.openBy(sap.ui.getCore().byId("idSDASHM2ButtonEquipmentLevelCSApprove"));
	    }else if(page == 3){
	    	oSDASHM2PopoverCSApprove.openBy(sap.ui.getCore().byId("idSDASHM3ButtonEquipmentLevelCSApproval"));
	    }


	},

	/* SDASHM2 - Function - Approve CS Approve */

	ApproveCSApprove : function(){

		var oCurrent = this;
		var stringToPass = "";
		var stringCount = 1;
		var isRefGiven = true;
		for(var i =0; i < oSDASHM2JsonCSApprove.length; i++){
			if (!oSDASHM2JsonCSApprove[i].appref.replace(/\s/g, '').length) {
				isRefGiven = false;
				break;
			}
			if(stringToPass == ""){
				stringToPass = stringToPass + "IvSource eq 'M' and ";
				stringToPass = stringToPass + "ILessee" + stringCount + " eq '" + oSDASHM2JsonCSApprove[i].serialno + "$" +
				oSDASHM2JsonCSApprove[i].depot + "$" +
				new Date().format("yyyymmdd") + "$" +
				oSDASHM2JsonCSApprove[i].appref  + "$" +
				"" + "$" + // Approver Name
				oSDASHM2JsonCSApprove[i].cost + "'";	// Approval Amount - Calculated from CRM
			}
			else{
				stringToPass = stringToPass + " and ILessee" + stringCount + " eq '" + oSDASHM2JsonCSApprove[i].serialno + "$" +
				oSDASHM2JsonCSApprove[i].depot + "$" +
				new Date().format("yyyymmdd") + "$" +
				oSDASHM2JsonCSApprove[i].appref  + "$" +
				"" + "$" + // Approver Name
				oSDASHM2JsonCSApprove[i].cost + "'"; // Approval Amount - Calculated from CRM
			}
			stringCount++;
		}

		if(isRefGiven == false){
				sap.ui.commons.MessageBox.alert("Please fill reference for all the units!");
		}else{


		var urlToSap = "CSApproveSet?$filter=" + stringToPass;
		urlToSap = serviceDEP + urlToSap;
		oModel = new sap.ui.model.odata.ODataModel(serviceDEP,true);
		busyDialog.open();
		console.log(urlToSap);
		OData.request(
				{
					requestUri : urlToSap,
					method : "GET",
					dataType : 'json',
					//async : false,
					headers : {
						"X-Requested-With" : "XMLHttpRequest",
						"Content-Type" : "application/json; charset=utf-8",
						"DataServiceVersion" : "2.0",
						"X-CSRF-Token" : "Fetch"
					}
				},
				function(data, response) {
										busyDialog.close();
										var CSApproveResult = data.results;

                    if(CSApproveResult.length == 0){
                  	  sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                  	  console.log("CS Approve Failure");
                    }else{
                  	  //sap.ui.commons.MessageBox.alert("Approved");
                  	  //sap.ui.getCore().byId("idSDASHM2PopoverCSApprove").close();
                      for(var i=0; i<CSApproveResult.length; i++){
												for(j=0;j<oSDASHM2JsonCSApprove.length;j++){
														if(oSDASHM2JsonCSApprove[j].equnr == CSApproveResult[i].Equipment){	// MAC09072019_SERNR_EQUNR_DIFF_ISSUE changed oSDASHM2JsonCSApprove[j].serialno to oSDASHM2JsonCSApprove[j].equnr
															 oSDASHM2JsonCSApprove[j].message = CSApproveResult[i].Status;
														}
												}
                      }
                      oSDASHM2ModelCSApprove.updateBindings();
											sap.ui.getCore().byId("idSDASHM2ButtonCSApproveApprove").setVisible(false);
											oCurrent.refreshSelectedUnits(); // REFRESHSELUNITS
                  	  console.log("CS Approve Successful");
                  }
				},
				function(error) {

					sap.ui.commons.MessageBox.alert("Sorry, there is an error");
					console.log("CS Submission Failure");
					busyDialog.close();
				});
			}
	},

/* SDASHM2 - Function - Set CS Approve Popup content */

	setCSApproveInitial : function(page){

		oSDASHM2JsonCSApprove = [];
		var oCurrent = this;

		if(page == 2){
		var arraySelLines = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
		for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
  			if(arraySelLines.indexOf(i) != -1){
					var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
					if(oDetData != undefined){
						var realPath = oDetData.getPath().split('/')[2];
						oSDASHM2JsonCSApprove.push({
							serialno : oSDASHMJsonEquipmentLevel[realPath].serialno,
							estimateno : oSDASHMJsonEquipmentLevel[realPath].estimateno,
							depot : oSDASHMJsonEquipmentLevel[realPath].depotcode,
							equnr : oSDASHMJsonEquipmentLevel[realPath].equnr,
							cost : oSDASHMJsonEquipmentLevel[realPath].estimatecurrency + " " + oSDASHMJsonEquipmentLevel[realPath].lesseecost,
							curr : oSDASHMJsonEquipmentLevel[realPath].estimatecurrency,
							appref : "",
							message : ""
						});
					}
  			}
  		}
		}else if(page == 3){

			for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
				if(oSDASHMJsonEquipmentLevel[i].serialno == global3SerialNo){
					oSDASHM2JsonCSApprove.push({
						serialno : global3SerialNo,
						estimateno : "",
						depot : global3Depot,
						equnr : global3SerialNo,
						cost : oSDASHMJsonEquipmentLevel[i].estimatecurrency + " " + oSDASHMJsonEquipmentLevel[i].lesseecost,
						curr : oSDASHMJsonEquipmentLevel[i].estimatecurrency,
						appref : "",
						message : ""
					});
					break;
				}
	  	}
  		}

		/* SDASHM2 - Table - CS Approve */

		var oSDASHM2TableCSApprove = new sap.ui.table.Table({
     		 visibleRowCount: 4,
     		 width: '620px',
     		 showNoData: false,
             selectionMode: sap.ui.table.SelectionMode.None,
		}).addStyleClass("sapUiSizeCompact tblBorder");

		oSDASHM2TableCSApprove.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Serial No.", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "serialno").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"120px"
			 }));

		oSDASHM2TableCSApprove.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Reference *", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextField({
			 }).bindProperty("value", "appref").addStyleClass("borderStyle referenceinput"),
	           resizable:false,
	           width:"200px"
			 }));

			 oSDASHM2TableCSApprove.addColumn(new sap.ui.table.Column({
	             label: new sap.ui.commons.Label({text: "Cost"}).addStyleClass("wraptextcol"),
	 			 template: new sap.ui.commons.TextView({
					 textAlign: "Right"
	 			 }).bindProperty("text", "cost").addStyleClass("borderStyle"),
	 	           resizable:false,
	 	           width:"120px"
	 			 }));


		oSDASHM2TableCSApprove.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Result", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "message").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"100px"
			 }));


			  oSDASHM2ModelCSApprove.setData({modelData: oSDASHM2JsonCSApprove});

      	oSDASHM2TableCSApprove.setModel(oSDASHM2ModelCSApprove);
      	oSDASHM2TableCSApprove.bindRows("/modelData");

      	var oSDASHM2JsonCSApproveLength = oSDASHM2JsonCSApprove.length;
      	if(oSDASHM2JsonCSApproveLength < 11){
      		oSDASHM2TableCSApprove.setVisibleRowCount(oSDASHM2JsonCSApproveLength);
      		oSDASHM2TableCSApprove.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
      	}
      	else{
      		oSDASHM2TableCSApprove.setVisibleRowCount(10);
      		oSDASHM2TableCSApprove.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
      	}

      	return oSDASHM2TableCSApprove;
	},

	fnCallbackMessageBox:function(sResult) {
		var oCurrent = new sdashm2();
		if(sResult == "YES"){
			oCurrent.submitCWApprove();
		}
	}

});

function thousandsep(value){
    value = parseFloat(value);
    value = Globalize.format(value, 'n2', 'en');
    return value;
}


function getCHSTATUSValue(obj, prop) {
    return obj[prop];
}
