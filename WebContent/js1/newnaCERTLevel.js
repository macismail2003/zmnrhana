var aDocumentList = [];
var aUnitDocs = [];
var aUnitDocsSAP = [];
var saplinks = [];
sap.ui.model.json.JSONModel.extend("newnaCERTLevel", {
	// https://newseaweb.seacoglobal.com/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECPGW1_4_SRV/Unit_Document_Type?$filter=Equipment eq% 'CRXU8606667'

	createCERTTable : function(){

	var oContainer = this;

	/* SAP - Other product types Certificates */

	var oUnitDocTableSAP = new sap.ui.table.Table("idDocPanelSAP",{
		visibleRowCount: 25,
		columnHeaderVisible : true,
		//title: "Document Type",
        firstVisibleRow: 3,
        selectionMode: sap.ui.table.SelectionMode.None,
        width: "25%"
	 }).addStyleClass("font13 tblBorder");

	// Table Columns
	oUnitDocTableSAP.addColumn(new sap.ui.table.Column({
	 label: new sap.ui.commons.Label({text: "Type"}),
	 template: new sap.ui.commons.TextView().bindProperty("text", "DocTypeDesc"),
     sortProperty: "DocTypeDesc",
     filterProperty: "DocTypeDesc",
     resizable:false,
	 }));

	oUnitDocTableSAP.addColumn(new sap.ui.table.Column({
		template: new sap.ui.commons.Link("idLinkToDwnldPDF",{
		text:"Download PDF",
		press : function() {
			busyDialog.open();
			//alert("help " + this.getHelpId());
			oContainer.getDocumentContents(this.getHelpId());
		}
		}).bindProperty("helpId","DocTypeDesc").bindProperty("enabled","isEnabled"),
         resizable:false,
		 }));


	/* Silver Cims - Tanks Certificates */

	var oUnitDocTable = new sap.ui.table.Table("idDocPanel",{
		visibleRowCount: 25,
		columnHeaderVisible : true,
		//title: "Document Type",
        firstVisibleRow: 3,
        selectionMode: sap.ui.table.SelectionMode.None,
        width: "25%"
	 }).addStyleClass("font13 tblBorder");


	oUnitDocTable.addColumn(new sap.ui.table.Column({
		label: new sap.ui.commons.Label({text: "Type"}).addStyleClass("wraptextcol"),
		template: new sap.ui.commons.Link({
		press : function() {
			window.open(this.getHelpId());
		}
		}).bindProperty("text","Type").bindProperty("helpId","DocTypeLink"),
         resizable:false,
		 }));

	oUnitDocTable.addColumn(new sap.ui.table.Column({
		label: new sap.ui.commons.Label({text: "Date"}).addStyleClass("wraptextcol"),
		template: new sap.ui.commons.TextView().bindProperty("text","Date"),
         resizable:false,
		 }));


	// Flex Box
	var oFlexBoxVer = new sap.m.FlexBox({
		  items: [
		          oUnitDocTableSAP,
		          oUnitDocTable
   		  ],
   		  direction: "Column"
   	});

	return oFlexBoxVer;

	},

	getCertificatesFromSAP : function(equnr){

		var serviceSeaweblot4 = "/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECPGW1_4_SRV";
		oModel = new sap.ui.model.odata.ODataModel(serviceSeaweblot4, true);
		serviceSeaweblot4 = serviceSeaweblot4 + "/Unit_Document_Type?$filter=Equipment eq '" + equnr + "'";
		busyDialog.open();
		OData.request({
		      requestUri: serviceSeaweblot4,
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
			    	debugger;
			    	saplinks = [];
			    	saplinks = data.results;
			    	console.log(saplinks.length);
			    	busyDialog.close();
			    	aUnitDocsSAP = [];
			    	var len = saplinks.length;
//			    	for(var i=0; i<saplinks.length; i++){
//			    		aUnitDocsSAP.push({
//				            'DocTypeDesc':saplinks[i].DocTypeDesc,
//				            'DocumentType':saplinks[i].DocumentType,
//				            'DocumentType1':saplinks[i].DocumentType1,
//				            'Equipment':saplinks[i].Equipment,
//				            'Status':saplinks[i].Status,
//				            'UnitType':saplinks[i].UnitType,
//				        });
//			    	}

					for(var i=0; i< len ; i++){
						if(saplinks[i].Status == "N" ){
							aUnitDocsSAP.push({
						            'DocTypeDesc':saplinks[i].DocTypeDesc,
						            'isEnabled':false,
						        });
						}
						else{
							aUnitDocsSAP.push({
					            'DocTypeDesc':saplinks[i].DocTypeDesc,
					            'isEnabled':true,
					        });
						}
					}

			    	var oModelUnitDocSAP = new sap.ui.model.json.JSONModel();
			    	oModelUnitDocSAP.setData({modelData: aUnitDocsSAP});
			    	sap.ui.getCore().byId("idDocPanelSAP").setModel(oModelUnitDocSAP);
			    	sap.ui.getCore().byId("idDocPanelSAP").bindRows("/modelData");
			    	sap.ui.getCore().byId("idDocPanelSAP").setVisibleRowCount(aUnitDocsSAP.length);
			    	sap.ui.getCore().byId("idDocPanelSAP").setVisible(true);
			    	sap.ui.getCore().byId("idDocPanel").setVisible(false);
					app.to("naCERTLevel");
					sap.ui.getCore().byId("naCERTLevel").setTitle("Certificates for " + equnr);
			    	busyDialog.close();
			    },
			   function(err){
			    	busyDialog.close();
			    });

	},

	getCertificatesFromSilverCims : function(equnr){
		busyDialog.open();
		var silverlinks = [];
		//var equnr = "GESU8071031";
		var modequnr = equnr.substr(0,4) + ' ' + equnr.substr(4,6) + '-' + equnr.substr(-1);
		modequnr = encodeURIComponent(modequnr);
		var silverlink = "https://www.tankcontainer.com/seacoreports.asp?unum=" + modequnr;
		$.get(
		silverlink,
	    function(data) {
            var html = $.parseHTML( data );
	        $.each( html, function( i, el ) {
                if(el.nodeName == '#text'){
                	if(el.data.trim())
                		silverlinks.push(el.data.trim());
                }
	        });
	    }).always(function() {
	    	console.log(silverlinks.length);
	    	busyDialog.close();
	    	aUnitDocs = [];
	    	var splitLinks = [];
	    	for(var i=0; i<silverlinks.length; i++){
	    		splitLinks = [];
	    		splitLinks = silverlinks[i].split('|');
	    		aUnitDocs.push({
		            'DocTypeDesc':i,
		            'DocTypeLink':splitLinks[0],
		            'Date':splitLinks[1],
		            'Type':splitLinks[2],
		            'isEnabled':true,
		        });
	    	}

	    	var oModelUnitDoc = new sap.ui.model.json.JSONModel();
	    	oModelUnitDoc.setData({modelData: aUnitDocs});
	    	sap.ui.getCore().byId("idDocPanel").setModel(oModelUnitDoc);
	    	sap.ui.getCore().byId("idDocPanel").bindRows("/modelData");
	    	sap.ui.getCore().byId("idDocPanel").setVisibleRowCount(aUnitDocs.length);

	    	sap.ui.getCore().byId("idDocPanelSAP").setVisible(false);
	    	sap.ui.getCore().byId("idDocPanel").setVisible(true);
				app.to("naCERTLevel");

			sap.ui.getCore().byId("naCERTLevel").setTitle("Certificates for " + equnr);

			// OData.request({
			// 		      requestUri: fnetaLinkSILVERCert + "('" + 'S' + "')",
			// 		      method: "GET",
			// 		      dataType: 'json',
			// 		      headers:
			// 		       {
			// 		          "X-Requested-With": "XMLHttpRequest",
			// 		          "Content-Type": "application/json; charset=utf-8",
			// 		          "DataServiceVersion": "2.0",
			// 		          "X-CSRF-Token":"Fetch"
			// 		      }
			// 		    },
			// 		   function (data, response){
			//
			// 		    },
			// 		   function(err){
			//
			// 		    });

	    });
		/*debugger;
		var silverlinks = [];
		silverlinks.push("http://209.217.52.25/pdf/FQ/GESU905586-9.220917.ONHIRE.PDF|22/09/2017|ONHIRE");
		silverlinks.push("http://209.217.52.25/pdf/FQ/GESU805586-9.040816.PREINSP.PDF|04/08/2016|PREINSP");
		silverlinks.push("http://209.217.52.25/pdf/FQ/GESU805586-9.280416.ONHIRE.PDF|28/04/2016|ONHIRE");
		silverlinks.push("http://209.217.52.25/pdf/FQ/GESU805586-9.020316.CLEAN.PDF|02/03/2016|CLEAN");
		silverlinks.push("http://209.217.52.25/pdf/FQ/GESU805586-9.190216.2.5YR.PDF|19/02/2016|2.5YR");
		silverlinks.push("http://209.217.52.25/pdf/FQ/GESU805586-9.290814.ONHIRE.PDF|29/08/2014|ONHIRE");
		silverlinks.push("http://209.217.52.25/pdf/FQ/GESU8055869_25102013_5.0_TTC.pdf |25/10/2013|5YEAR");
		silverlinks.push("http://209.217.52.25/pdf/FQ/GESU8055869_04122006_IIC.pdf |04/12/2006|INITIAL");

    	console.log(silverlinks.length);
    	busyDialog.close();
    	aUnitDocs = [];
    	var splitLinks = [];
    	for(var i=0; i<silverlinks.length; i++){
    		splitLinks = [];
    		splitLinks = silverlinks[i].split('|');
    		aUnitDocs.push({
	            'DocTypeDesc':i,
	            'DocTypeLink':splitLinks[0],
	            'Date':splitLinks[1],
	            'Type':splitLinks[2],
	            'isEnabled':true,
	        });
    	}

    	var oModelUnitDoc = new sap.ui.model.json.JSONModel();
    	oModelUnitDoc.setData({modelData: aUnitDocs});
    	sap.ui.getCore().byId("idDocPanel").setModel(oModelUnitDoc);
    	sap.ui.getCore().byId("idDocPanel").bindRows("/modelData");
    	sap.ui.getCore().byId("idDocPanel").setVisibleRowCount(aUnitDocs.length);
		app.to("naCERTLevel");
		*/
	},

	getDocumentContents:function(DocDesc){
		var oContainer = this;
		var input = "";
		var urlToCall = "";
		var len = saplinks.length;
		var flag = "";
		var serviceSeaweblot4 = "/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECPGW1_4_SRV";

		if(DocDesc != "Tank Test report"){
			for(var i=0; i< len ; i++){
				if(saplinks[i].DocTypeDesc == DocDesc){
					input = saplinks[i].Equipment.trim() + "$" + saplinks[i].DocumentType + "," + saplinks[i].DocumentType1;
					//alert("input : " + input);
					urlToCall = fnetaLinkSAPCert  + "('" + input + "')";
					flag="PDF";
					break;
				}
			}
		}
		else if(DocDesc == "Tank Test report"){
			//alert("Its ZTTR for " + selUnitNumber);
			oModel = new sap.ui.model.odata.ODataModel(serviceSeaweblot4, true);
			urlToCall = serviceSeaweblot4  + "/Tank_Test_Report?$filter=Equnr eq '" + selUnitNumber + "'";
			flag="Table";
		}



		   OData.request({
		      requestUri: urlToCall,
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
		    	//alert("data " + window.JSON.stringify(data.File1))
		    	if(flag == "Table"){
		    		//alert("data " + data.results.length  +  "res " + data.length)
		    		for(var i=0;i<data.results.length;i++){
		    			//var objUtil = new utility();
		    			data.results[i].Leaseno =  objUtil.removeLeadZero(data.results[i].Leaseno);
	    				var vNxtDt = data.results[i].Nxtdt.split("(");
						  var vDate = vNxtDt[1].split(")");
						  var vActualNxtDt = new Date(Number(vDate[0]));
						  var vformattedNxtDt = dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy',"UTC");
						  if (vformattedNxtDt.substring(6) === "8888"){
							  data.results[i].Nxtdt=  "NA";
							  data.results[i]["NxtDtActual"] = vActualNxtDt;
						  }
						  else{
							  data.results[i].Nxtdt = vformattedNxtDt;
							  data.results[i]["NxtDtActual"] = vActualNxtDt;
						  }

		    			var vLrmDt = data.results[i].Lrmdt.split("(");
						  var vDate = vLrmDt[1].split(")");
						  var vLrmDtActual = new Date(Number(vDate[0]));
						  var vformattedLrmDt = dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy',"UTC");
						  if (vformattedLrmDt.substring(6) === "9999"){
							  data.results[i].Lrmdt=  "-";
							  data.results[i]["LrmDtActual"]=  vLrmDtActual;
						  }
						  else{
							  data.results[i].Lrmdt = vformattedLrmDt;
							  data.results[i]["LrmDtActual"]=  vLrmDtActual;
						  }
						  jsonZttRUE.push({
			    				"Unit Number":data.results[i].Equnr,
			    				"Unit Type":data.results[i].Sermat,
			    				"Lease#":data.results[i].Leaseno,
			    				"Last Tank Test Type":data.results[i].Ltxa1,
			    				"Last Tank Test Date":data.results[i].Lrmdt,
			    				"Next Tank Test Type":data.results[i].Nxtyp,
			    				"Next Tank Due Date":data.results[i].Nxtdt
			    			});
		    		}
		    		aZTTRTableData = data.results;

		    			oContainer.showZTTRTable();
		    	}
		    	else{
		    		//alert("pdf");
		    		//alert("base64 dataa " + data.File1 );
		    		if(data.File1 != ""){
		    			oContainer.openPDFClientSide(data.File1, data.EEquipment);  // added data.EEquipment MAC24032015 +
		    		}
		    		if(data.File2 != ""){
		    			oContainer.openPDFClientSide(data.File2, data.EEquipment);	// added data.EEquipment MAC24032015 +
		    		}
		    		if(data.File3 != ""){
		    			oContainer.openPDFClientSide(data.File3, data.EEquipment);	// added data.EEquipment MAC24032015 +
		    		}
		    		if(data.File4 != ""){
		    			oContainer.openPDFClientSide(data.File4, data.EEquipment);	// added data.EEquipment MAC24032015 +
		    		}
		    		if(data.File5 != ""){
		    			oContainer.openPDFClientSide(data.File5, data.EEquipment);	// added data.EEquipment MAC24032015 +
		    		}
		    		if(data.File6 != ""){
		    			oContainer.openPDFClientSide(data.File6, data.EEquipment);	// added data.EEquipment MAC24032015 +
		    		}
		    		if(data.File7 != ""){
		    			oContainer.openPDFClientSide(data.File7, data.EEquipment);	// added data.EEquipment MAC24032015 +
		    		}
		    		if(data.File8 != ""){
		    			oContainer.openPDFClientSide(data.File8, data.EEquipment);	// added data.EEquipment MAC24032015 +
		    		}
		    		if(data.File9 != ""){
		    			oContainer.openPDFClientSide(data.File9, data.EEquipment);	// added data.EEquipment MAC24032015 +
		    		}
		    		if(data.File10 != ""){
		    			oContainer.openPDFClientSide(data.File10, data.EEquipment);	// added data.EEquipment MAC24032015 +
		    		}
		    	}
		    	//var str = "rcMjIyMjIyMjIyOn6CMjI7VG4dEj5b4jIyMjIyMjIyMjIyMjIyMjIyMjIyOhqyPY7iPyROWtp+gjIyMjIyMjIyMjIyMjI7p6vvIjIyPmXtl1IyMjI+Kt2q4jIyMj4fKxyiMjIyMjy1O+4yPJ+CMj1We8sCMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMj5a3axyMjI9nrvOMjIyMj2kzi0yMj0Nu6ViMjIyPmTbfjIyMjttfDrSMjIyMjI9WppmUjIyMjt+Ksu+HRIyMjI8yqq+wjq+zlfKvsI9V8IyMjIyMjo1MjI+Wt4s+6VtJK8kTlrafoI+LPqGQjulYjoW0jIyMjIyMjIyOjeSMjp+gjIyPLU77jI8n4IyPVZ7ywIyMjI9pM4tMjI7bXIyO34qy74dEjIyMjIyMjIyMjIyO7syMjIyOheSMjIyMjIyNgwHIjI9pMI6y74dEj2ky87b7yIyO6er7yIyMj4c0j4c2jsSMj0Nsj6l8jIyMjIyMj4c3mSSMj2ky87b7yIyO6er7yIyPireLU2kwjo7EjIyMjIyO+xyMjIyMjIyMjIyMjIyMjtXgjIyMjIyMjIyMjtFHQ26hk2kwjoasjIyPioiO0siMjI9Vy1acj0NsjIyPZc9jps/Mj2XS6viMjI6OxIyMjIyPmTeHNvuMjIyMjIyPZcyPyROWtp+gjIyO6er7yIyMjI9W+IyO34qy74dEjsmsjIyMjIyMjIyMjIyMjIyMjIyMjIyMj2kwjrLvh0SPaTLztvvKjfCMjp+gjIyO8/NRlI+KtI7T22kwjI+Kt5knKc7yitLIjxHCxyiPhyiMj5l7ZdSMjIyPirdquIyMjIyMjIyMjIyMjI8p53W0j1We8sCOuxCMjo7EjIyMj1b4jIyO21yPa0iMjI9lzIyMjymW+8tVnI93Uur0jIyMj4s+6VtJKIyMjIyMjruQjIyMjIyMj3rEjIyMjIyMjIyMj+2kjIyMjIyMjIyMjIyPyaiMj9/qzULNQs1CzUMLkIyMjIyPF3yMj2FkjI9DdIyMjIyMjIyMjz74jIyMjIyMjIyMjIyMjIyPC4/FqIyMj81EjIyMjIyO0cCMjI8Z5IyPGeSMjxnkjIyPGeSPPviMjIyMjIyMjIyMjI96mxd8jI9DdIyPQ3SMjIyMjI6hcybvLoSMjIyMjz74jIyMjxnkjIyPT2bNQs1CzULNQwuQjIyMjIyMjIyMjIyPesSMjIyMjIyPP3yMjIyMjIyMjI7nxIyMjIyMjIyMj3rEjIyMjIyMjsuUjIyMjIyMjIyMjI/K5IyMjIyMjIyMj3rEjI96xIyPesSMjIyMjI9xGIyMjI96xI7NQs1CzULNQs1CzULNQs1Dy8iMjIyMjIyPcRiPXxCMjIyMjI8Rds1CzULNQs1CzUMrEIyMjI/K+IyMjIyMjIyMjIyMjIyMjpvgjsM3esSMjI8RFr0QjI9DpIyMjIyMjI+hbIyOzUCMjIyMjIyMjIyMjIyMjIyMjIyMjIyO4ZNfE3EYjIyMjIyMjIyMjIyMj73cjIyMjIyMjIyP9dyMjIyMjIyMjIyMjIyMjIyMjIyMjI+f0+E0jua8jIyMjs1AjrVcj902kppDtIyPA1iPK4yP7fiMjIyP1+iMj/EsjIyMjIyPesSPTUSMjIyMjIyMj698jIyMjIyMjIyMj+PkjIyMjIyMj48gjodYjIyMjsO0jlXsj9amm5SMjzkgj+fMjIyMjkK4jIyMjI+PS29wjIyOsyyMjI+3fytaorSOkUiMjIyMj1+EjIyMjIyP0aSMjIyMjIyMjIyMjIyMjIyMjIyPzUSMjI9xzIyOU0NJrIyMj0K32VSMjIyMjIyPk0CMjIyMjIyMj1fwjIyMj72sjIyMjIyPfRyMjIyMjIyMjIyMj5P4jIyMjI6HjIyOy8CMjt7EjIyMjI+5eIyO+WSMjIyP7aCPmRcRjIyMjI69vI+vbrc0jI+pJIyP+TCMjI9f2I7eh4aUjIyMjIyMjIyMjwK4jIyOT6SMjIyPfuiMjIyMjkOgj53YjI6fZk2Yjv8QjIyMjI9xK91QjI/3pIyMjIyOQtCMjI+HeI5DTIyMjIyOi5sXC37sjIyMjIyMjIyMjIyMjI5OlIyMjIyMjIyMjIyP6piMj92sjI5SoofK6/SPvfCMjIyOmXyMjIyORfKnyI8EjIyMjIyMjIyPZc7NVIyMj5KkjI7buIyMjIyMjIyPlZbD7IyMjIyMjI6fsI6q/IyMjI6q7qqkjIyP3b7xJIyPP+NVoIyMjIyMjIyMj4Hrn9CMjpLfp9CPD3iPgeiMjIyMjIyPktdNfIyMjIyMjIyMjlm6l9yMjIyO9RyMjIyMjIyPqcyMjvLcj+VEjIyMjIyMjIyMjIyMjIyP2byMjIyMjI6rfIyMjIyPYs9WkI9b7IyMjIyMj+LwjkcPgeiPgwiPutiOraMPGI+pAIyPguPhCIyP5xCMjI5auIyMjIyMjq6MjIyMjIyMjzFkjIyMj2qcjuu0j1ucjsHQjIyMjIyO1+91OIyMjIyPosSMjIyMjIyMjIyO4e+5wIyMjIyMjI/rsIyMjIyMj0WGzUCMjzl8jI/iwIyMjIyMjxnkjIyMjIyMjIyMj+EMjIyMjIyMjIyMj8uUjIyMjIyMjI9/sIyMjIyMjIyMjIyPX4iMj0nIjIyMjIyOr2SMj1FWVSSMjk9ruwCMj4/UjIyMj4VQjIyMjIyMjIyMj+nTR4L1Z01wjI/h2uWHGeSMjIyMjIyMj0WwjI+uoIyMjIyMjI5LyIyMjIyMjIyMj3HPmtiMjIyMjIyMjIyMjIyMjIyMjI7lhIyO/8iMjI5b+IyMjIyMjwLQjIyMjIyMjIyO2w5a3IyMjIyMjI8xYIyMjI9xzIyPKTSMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyPvqeWvw9oj18Qjv3EjIyMjI7tnIyMju2cjIyMjI/NQIyMjstXccyPccyPkdyMjztIjIyMjIyMjIyMjIyOWVSOr6iMjIyMjIyMj3HMj6FaW7SPXRiMjqiMj6KQjIyMj3HMjIyMjIyMjIyMjI6HPIyPcc6dlIyMjIyMjIyMjI9Z6IyPccyMjIyMjIyPkeO93IyMjqMe02SMjI+ikIyPccyMjzfYjIyPWzCOy9CPQ3SMjzL8jI9dWIyMj3HMjIyMjwdUj8aojIyP24CMjIyMj5HcjI+B6IyMjIyMjIyMj8dAjIyMjIyMjIyPcdyMjIyMjIyMj8VMjIyMj0eIjIyMjIyOhz9ClotH5zSMjIyMjIyPkdyPopKLzIyMjI7ajIyMjIyMjwlK4srBQIyMjIyPccyMjIyMjIyMjIyMjIyMj6KQjIyMjIyMjIyMjIyMjz3DccyMj3HMjIyO/rCMjIyMj8XcjIyMjIyMjIyMjqeYjIyMjIyMjIyMjruMjIyMjIyMjIyMjIyMjIyMjI6nAI6NBIyMjIyMjk1IjI7H7IyO0SiPQ3SMjIyMjIyMjIyMjI7dcIyMjIyPNsSOwYCMjIyMj3HMjI9xzIyMjIyMjpPIjIyMj6KQjI9xzIyPccyOR3iMjI7fYIyP3RyMjI9xzI7rvIyMjIyMjIyMjI9xzIyP1QiMjIyMjI+O7IyPfwyMj6VcjIyMjIyPMWSMjIyMjIyMjIyPkbyMjka4jIyMjIyMjIyMj4LkjI9xzIyP2QyOvvCMjIyMjI7X6oacjI9xzIyPccyMjIyOi7iMjIyMjIyMj3HMjIyPw7SMjIyOiSOFpIyMj8d8j3HMjIyMj56ojI7BEI/d0k14jIyPcbyMj3HMjIyMjIyMjIyPuTLDjI7lb1FXkdyMjI82xIyMjIyMjIyMjIyMjIyMj2qUjI9xzIyMjI6nBIyMjIyMjIyMjokgjIyMjIyOvziP9oiMjIyMjIyMj+/wjIyPccyMjIyMjIyPZcyMjIyPr9yMjI7fSIyMjIyPB7iMjI+ClIyMjIyMjIyMjI7ditEa49yO+SyMjuGzccyMj0kTXxCPUVCMjIyPgeuDAIyPwtiO6SiMjIyMjIyPccyMjI6vZIyMjpF/AayO4yiMjIyMjIyOr5iMjIyMjIyMjI+hnIyMjur3eayMjIyOy/CMj/mMjIyOiwiPD3SMjI9duIyMjIyPj6SMjI/rXIyMjIyPl2SMjIyPJSa3FI7lRIyMjIyMjIyMjIyMjIyMjIyMjz/jT1/bE3fEj8qEjI7vhI+B6IyOS8iMjI8v9IyMjIyPkbSPQ3SMjI7xjIyMjIyOy9M+iIyOWXCMjIyMj0nsjIyMjIyMjIyOSePnhv7QjIyMjI8Vy22MjIyMj824jIyMjIyMjvucjIyOhqN6xIyMjI/LKI6zeI8Jo9MQjIyPC6CMjIyMjz6kjIyMjqLMjIyMjIyMj50kjIyMjtEMj9NcjIyMjqXIjIyMj4WnCdyMjIyMj0HUjI/RDIyMjI+6jIyMjIyMjIyMjIyMjI7WyIyMjIyPEryMjIyMjus4jIyMjIyMjIyMjIyMj01S+R9JxI9ncIyMjIyMjI8S7I7XaI6pZI+HpI6JWIyMjIyMjIyMjIyMjI+nSI9ilt7LCfSMjIyMjIyMjIyMjwEGuxSMjIyMjIyOoRCMjI7XTIyMjIyMjIyMjyVUjIyMj4HojIyPxaSMjIyMjI9HwIyMj0UIjIyMjIyMjIyMjzl8j3vwjIyMjIyMjIyMjymMjIyMjI5BSIyMjIyOmqSMjI+FwIyMjIyMjI5ZcI8umsa0jIyPV9yMjI8W+I8Z5IyMjIyMjIyMjI7h7IyMjlUEjIyMjz+IjIyMjIyMj1V0jIyMjIyMjI8rEIyMjIyMjIyMjIyMjIyOQfSMjI9rSIyMj4G0jIyMjI/TF13IjIyOWUSMjIyMjIyMjIyMjI/jWI6HyIyMjIyO5YSPuvpTHIyMj4WIjIyMjIyMjIyMjIyOszSPN7CMjIyMjIyMjIyMjI+zRIyMjIyO9rSMjI7GyIyOmTfHeIyMjIyPt1yPOy/78IyPUxSP93SMj4bsjIyMjI87XIyOuZCMjIyMjI/pNIyPkdyMjrkW7RyMjIyMj3HMjIyMjI7NQIyMjIyMjI9W6IyMjIyPk/CMjIyMjz+QjIyMjI7tzIyMj3rEj4tEjIyPcqiMj9vUjIyMjIyMjIyMjyvbq/SMjI+ze5mojI6+3IyMj4L0jtb4joaMjIyPepCPL6SMju7qP+iMjIyMjIyMjuMIjIyMj0v682SPQzCO21SMjIyMjIyMjI9/DIyPP/CPd1iPmcyP8qCOqpCMjtWLarCMjIyMjIyMjIyMjrN4j3lcjz74jzG6TxCMjy/gjI/hXIyMjIyMjkdf1eiPD2iMjI85aIyMjI/zMIyMjpEojI6L1I96xIyMj3EYjIyMjIyMjI8NooWYjIyMjIyMjwG279yMjIyMjresj+MAjIyMjI836I9p9IyPoR6b4I7nzolIjIyMjIyMjIyMj+t8jIyMjIyMjIyMjsN8jIyMj9Ekj69wj2F8jIyOvziMjllgjIyMjylTBpfmzIyMjIyMjI8H8I475xnUjIyMjIyMjIyMjIyMjIyMjs1AjIyMjIyMjIyPFuyMjI7prIyPKtSMjI62n/dMjI7vrIyMjIyOxsCMjIyPk6iMjIyOxSuWjIyPTqiMjtXkjIyOtebFwIyMjIyMjIyMjIyPYXCMjI5CiIyMjIyMjIyOkpiMjIyMjIyMjIyMjIyPvySMjI/i798ylfPLW0KL9WiMj8Ksj37P7sSMjI6FNI9bnIyMj0PsjIyP0wsVBIyMjlWUjIyMjIyMjrUIj5NGo1CMjI9lQIyOhxCMj+EaseLCiIyPYWSMjIyMj52sjI8++IyPGeSMjIyMjIyPgTiMjI93JIyMjIyPjfSMj7dMjI6rYIyP9qMriIyMjI6djIyOT8iOp5dFkkHojIyMjIyMjr/IjI6LTI8JlpP3YWSP6eyMj5sTbaSMjI99cIyMjIyPDtyMj527bRJNfIyMjIyMjI/rSIyO88yMjIyMj5brqVCMj1Kgjpb4jIyPrs+T+I9e/IyMjIyMjIyOzUCOr+iPO2SPfsiMjwX0jIyMjI+HNIyMjIyMjIyMjIyMjIyOwbtdNI+KvIyMjI69qk8QjI6L+IyMjI+5uIyMjIyMjI5WlIyMjIyPw+drGIyMjIyMjIyMjIyMjIyMjIyMjI8Z5IyMj2FnwxCMjIyMjIyMjIyMj7HCrXSMjIyMjIyMjIyOwuSMj0O4j70rzUSMjI476I7ZoIyMjIyPKdCMj0vcjIyMjIyMjI/RNIyOkpiPWWyMj0brmcyMjIyMjIyMjIyMjI/Lls1CzULNQ+EMjIyMj+EMjIyPZ0iMjI+3PIyMjIyMjluojIyMjs2sjIyMjIyMjI47WIyPX+SMjIyMjjlIjIyMjIyMjIyMjIyOm+SMjok0jIyOhUSMj4mIjIyORxyPiUKV5I+/XI8HQI9fE3EYjIyPlYSMjIyMj320jIyMjIyPdSCMjwUwjtncjIyMjIyMjIyMjI9Z9IyMjIyMjIyOxUiMj17SzUCMjIyMj1l8jIyMjIyPnwyPq7iOqt/RBI/CxIyMjpt4j7eGOtCMjlrwjIyPGeSMjIyPyvs1+8Hq4yyMjI9lgomQj6KYjI6TSIyMjI9R3IyMjIyMjIyPTzCMjI/rxIyPpZvrD/GMjIyMjIyMjI9u8ZyPvYCPRTCMjjsYjIyMjIyMjIyMjrky1YyMjIyMjIyMjI+5BIyMjI8rZI71o/Hcj9e0jIyMjIyMj1MAjIyOWqiOTSdPzIyMjIyMjIyMjIyMjIyPN9SMjIyMj37IjIyPD3s5TIyMjus0jIyMjIyMj5n4jIyMjIyMjI+vQIyPlyyMjIyMjuucjIyP0pSMjIyMjIyMjIyORTbVQw6UjI/r3IyMj2FIjI/qpIyMjsLAjIyP1aCMjIyOWRyMjIyMj/HUjI5bmIyMjIyMjIyMjtG8jpnwj+nYj4cAjI+faIyMjI/B1I7Kn2FL9pspjI82nIyMjI7+hI7pAIyMjIyMjIyP6ySMjIyMjIyMjlsYjIyMjovIjIyMjI5NDI+dmIyMjI/ngI6huIyMjI7DrIyMjI/VUklEj5nMjIyMjrPCr5iPST868IyMj0N0jIyPFeyMjIyMj5lYjI7pFotwjIyMjs1AjIyMjIyMjIyP8YSPYdSMjIyMjwOMjI/CjIyMjIyMjI6bQIyO+WyP0uSMjI9T++ucj7Xkj+v0jIyMjI7JB1qcjIyO6yZTAIyMjIyMjIyPeQiMjIyMjIyPOrSOi1SMjlqYjIyMjI/5QIyMjjkYjIyMjI96lIyOhwyPjUKGjIyMjIyMjIyMjIyMjI7GyIyMj6VYj/W4jIyOp4iMjoteW7iO4zCMjIyPCvZN7IyMjIyMjIyMjIyMjIyMjIyMjIyMjI+uuI7+oI4/4I+ZcIyMjkl8jI5LaIyOwZyMjkP4jI+f75vYjuF7iwiMj2Lgj0N0jIyMjIyMjIyMjIyMjIyMjIyMj484j+n0jIyMj3WT64iMjIyMjIyMjI+du76LpI+tyIyMjI5FZI/rLIyMjosEj9tIjI63EI6FxIyMjIyMjIyOPTyMjI7F2/dAj13QjIyMjIyMj364j+uT02CMjpfQj+tMjIyMjI822IyMjIyMjI7bfIyMjIyMjt/Uj/ciO1iPe56/yya4jI5LpI6+16OQju9YjrP0jIyMjIyMjI/VN2kcj7rYjIyPk6SMjpmXi8aLp3tIjIyMjI63NIyOwabqoI8rhIyP5fiMjIyMjIyMjI5bq7dQjIyMjIyOr3SMjIyMjIyMjIyMjIyMjIyOySyMjIyPCe8zQIyMjskyU3iMjIyMjI6m7I+nNk7EjI73VwdUjI/qvIyOpXM5QI9/WIyMjI7S1IyOppyMj+dwjI/Pr8FQjIyMjIyMjI5akIyMjIyMjj+EjI/V4IyMjkvIj5+UjrtsjI80jIyMjIyMjIyMjIyMj5VQjI+F9IyMj0dLK6iOu48Z5+nIjIyMjIyMjIyO+QyMjqVkjIyMjI6nAIyPjyeG+IyMjpNzl0/B7IyMj3LgjIyMjI/Pv3/kjI69WI5XKw2qTxCMjI+v1ymQjunjYaSMjI5B6IyMjI+nhwqQjxGEjI775IyPS5iMjIyOhoSMjw70jIyMjIyMjk8PpSSOtySMjIyMjIyMjIyPnbiMjIyPNe9hS2U4jIyOhU67wIyMjwaIjIyPawyMjqlGS4iOw2cP0I6hdwUYjI/XLIyMjIyMjIyMjqduyWyMjIyMjIyMjIyMjIyPXxNxGI9fEraQjvmcjIyMjIyPXeiMj7afbwtxGI7tys1AjIyMjIyPmUiMjk18jI9xdI6SmIyO67yMjIyMjIyMjI7qsIyMjI8V0IyPkvCPvzSPY6SMjIyMjIyPyxCMjIyMjIyMjIyPqzyPfvCMjIyMjIyMjIyMjIyMjy2IjIyO8eyP9/SOlTSMjIyMj22bMbCMjIyPfRyPpaSMjIyMjI69uIyMj0N0jIyOtUCMjIyMjz2vY2bNQ13IjIyO+WSMjIyMjIyMjI/PX3rEjIyMjytojlnYjIyOpUiP6dCMjlskjztfjryOSQCMjIyMjIyMjkHIjI/SlIyMjI+F9IyMjI8XG9vUjwrMjIyMjleMjI77FIyMj6rojIyMjIyOxrSMjIyMjI45yIyMjI9/xIyMjIyMjIyPasyMj9KSs+iMjIyMjIyMjIyMjIyMjIyMjzECn+yMjIyOs8yMjIyP6dPC5lkf6ROusvHwjI71Z4Me8eCOz5yP7+Pd0I/pBI9pSIyOqXCMjIyPlXiMjIyMjI5JhI/qsIyOhxCPwe4/dI6x7I7/OIyMjxUcjtNsjIyPquiMjI/uqIyMjIyMjIyMjIyMjIyPTYyMjIyOTU6JMI/t1IyMjIyOVqSMjIyMj9/zq4CMjIyMjIyMjIyMjIyMj7XMjIyMjIyMjvbYjIyPy1qdzI6fNIyMjlt4jIyMjIyMjIyMjI+neIyMjIyMjIyMjouWTtf3QIyPr3iMjIyOnoSMjI5D0I+PGIyMjoVTyvSMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyPET7/15rQjxW0jI5WvIyMjI5b9sVwjIyORuSO5fSP17SOmyyOlwiMj+XIjIyMjqbgjIyMjIyMjIyMjIyMjIyMjI5BOIyMjIyPD4yMjIyMjocwj+nXEfSMjIyMjIyMjI9XxIyMjwqy4zCMjkLsjIyPhciOWeCPoqCMjI5HeIyMjIyP3+dxGIyMjIyOkdCMjIyMjIyMjIyMjxPojI6R5IyMjIyMjIyMjIyPt2COVed1ks6MjIyMjIyMjIyPFeyMjIyO+tSP64yMjI7JAIyMjI+bzI+POI7jpI/hjI/rEIyO7QCMj++sjI5HFIyMj7m4jIyMjIyMjIyPp1CMjI/hWIyP1vyMjIyP8R5PF3P0jIyMjIyMjIyMjIyOkuSOi5SMjIyMj+8gjIyMjlLGVZ6KxIyMj2KYjIyOitiPTX+O1oraR/st7q84jIyOO1SMjIyOSViMjIyMjIyMjydQjI6LdIyMjI63NI/f618TcRiPXxCMjIyPpfCOVzSMjIyO24vmsIyMjIyMjIyPXxK2kIyMjIyPXoyPi6SMjIyMjIyO+7yMjIyO6wSMjIyMjIyMjlqwjIyMj930jIyMjI+VUz2kjI71kIyMjIyMjIyO/qCMj72UjIyMjtNwjI5ZzIyMj3X3p5SMjovkjIyOi4iMjI9t6kkChxCMjI9r9I+n5I9hqum4jIyPVyaLXIyMjI6rjulAj8XojIyPesSMjI5buIyMjIyOSqSMjI8ttI+rlI8ZlwPr33COT/aKyIyMjz+/XvCMjIyPzUSMjIyMjIyMjIyMjIyMjIyOWWyMjIyPn4CMjI5VoI5Z1IyMjI6tdIyO0U83DI7pVIyMjk9SieiMjtt0jI/K7I6FzIyMjIyOTxcR55dkjIyMjIyO5rCMjoWwjvUsjIyMjIyMjIyO5+CPj+SMj/HsjIyMjoV8jIyPUtiPnTSPr+CO/QyMjIyOi9yMjw8qTwSPSbCPl9yMjk3ojI+VJI6HDI5bmpNzexiMj18Qj8N7yviMjIyPv9yMjI9xGI9fEraQjIyPfqSPA3yMj8uUjIyMjIyMjIyMjIyMjIyMjIyMjuu8jIyOisiMjIyPurCMjIyOV+/rn110jIyMjIyMjIyMj9VsjIyMjIyPK1COhyiOTxSMjIyMjIyOjoiMj7K4jIyMjIyPRcCMj+uUj+lYjIyMjrPIjIyMjIyMjrWojIyMjI9r94l+90SMj2cAjIyOR+pZ7IyMj9WcjIyMjI7pHIyMjI9+qI/pVI6NDIyOR9yMjIyMjj+HbyNxGIyMjIyP6RY7FIyMjIyMjI8q7I6fWk8TwyiMjIyMjIyO39SMjIyPW+SMjIyMjIyMjIyMjIyMjI5N2IyPfRSOW7iMjIyMjIyMjI5PFIyMjI7W9IyMjIyMjI8ZdueEjIyMjIyOn1iMjIyMjIyMjIyMj/WQjlrAjoVMjuLIjIyOr3SMjIyMjwqsjI8BV3rEjIyP+6yPfbSMjIyMjIyMjIyPtYyMjIyMjI7tLIyMjI7xtvdcjIyPp2tm5IyOhXuld1/wjIyOvryMjIyMjIyMjIyMjIyMj+ucjIyMjI6JCsG4jIyOzUJR20sgjIyMjIyPD2iMjI+3k+rsjIyMjIyPm9SMjoWMjIyMjIyMjI+qv+uYjI5Za2q/hwCMjIyMjIyMjIyP45iMjluUjIyPW/SMjIyPg1iMjIyMjIyMjIyOhZyMjksIjI6hEI5FJI/rn668jIyMjI+Hwp84jI/K+IyMjIyMjIyMjIyMjIyMjy/ojvVkjIyMjIyMjzLwjIyMjIyMjIyOTWvrU4HcjI9FB5rxTIyMjI5PFIyPk+tTAI8Z5I/rnk8QjIyMjuU8jIyPa7L72I/DvIyOtfpbuI9zTIyPVuyMjI+Lgw7gjI7e3I6LiI+hJIyPopyMjIyMjIyP0sZbkIyMjI5a5IyOpwZO9wmcjIyMjI5PAk8UjIyMjIyMjI5PFIyMjquUjIyMjI6Fils0jI6OrI/2/lUkjI93WIyMjIyPl9yMjIyMjIyMjo2wjIyOTo/BWIyMjuvsjIyMjIyOUZiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMj3rGw1CMjIyMjuFnS0yMjI7dFIyMjI8ZuIyMjIyMjIyPecyOOqiMjIyMjI+uwIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjqcEj7XPj0CMjIyMjI7KwIyMjIyMjIyMjwrMjIyMj51gjkOi6pyOvxyMjIyPx1CP8ciMjIyPXqCMjIyMjIyMjIyMjI6FeIyPpZSMjIyMjI67FIyMjIyMjlX0jIyMjIyMjwrMj/rIjIyMjy03CtSMjI6nBIyMjIyO948m5IyMjIyPFRiPyQCMjIyMjIyMjIyPmXCMjI+VXIyMjIyPP3iOkpiMjIyPyySPpY9ncwUC7ciMjIyMjIyMjIyMjI/JUIyMjIyOo1iMj8N4jI/5RIyPOu6nBzte4ccrfIyMjIyMjIyMjIyMjI9SkIyMjI72s4b7hVCOmRCMjIyMjvcXKeiPcx9f5IyMjI7p2+MAjIyMjIyO3uCMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyOhxiMjIyMjIyMjIyPuVSMjIyMj3EYjIyMjIyMjolkjI+VUIyPkWSMjIyPFsSOTwKTcI6buIyMjrP2usyMjI+3iIyMjIyOpwSPDdSPCSI62IyMjIyMjI+X6IyMj3LTL5CMjI/K+I5ZLIyMj7eIjIyMjIyO4qpJg+ue4syMj/bzE+CMjIyO67yMj96sjI7vgIyMj11Hi1yMjIyMjI71+kkAjIyMjIyMj9cXpxyMjIyMjI7LsIyMjIyPWVyMjIyMjI9CuIyMjIyMjI+hgI6e/IyMjI8FMIyMjI6FUzMAjI6XvwUTe2SMj3s8jIyOW7iMj084joksj2dIjIyMjIyOtdSPNZyMjIyOW5rnlIyMjIyPUXCPr3CPK4eP8IyMjI5auIyMjI+e8+nEjI5XrIyMjIyMjIyMjvX0jIyMjIyMj8r4jou8jIyMjIyMjv6YjI9RdIyMjIyOpz/K+t/UjIyMjIyMjIyMjsWcj9eAjIyMjIyPJ2yMjIyMjIyMjIyMjIyPvqCMjk7Qj7LIjk8AjIyMjIyMjIyMjIyMj9UcjIyPiTSMjIyMjIyMjIyO4wyOisCMjIyMjI8rh6KIj4dEjs1AjIyMjrP0jIyMjIyMjIyMjIyOsx6m/IyMjIyP1fiPbaSPyvuvBuakjI6HD96EjIyMjls4j+l8jIyMjIyMjI6bQIyMjvXwjI71+I5BpIyMjoc8jk08jIyMjyuIj018jI6tyIyMjIyMj2HgjIyPTwyMjIyMjIyMjIyMjIyMjIyOu7bv3IyMjIyMjI8v0I5Z4IyMjksIjzaEjI8yqkFAjIyPXxCPyyiMjIyMjI6WxIyMjIyMjIyOVryMjI8tK4+UjIyMjtXv4YdPPIyOhT5O0quQjIyMjIyMjI5NLk7uhw928IyMjIyMjIyMj1+ojIyMjIyMj6kIjIyMjIyMjI/zDIyMjI95HpbAjIyMjI719IyMj26UjI9S1I/FqIyPtbyMjlua258XZI/f+2FkjI7O6I5G/IyMjI+3fIyMj+/kjIyMjIyMju3aTxSMjIyMj+ucjIyMjIyMjIyMjlXnp8dfvIyP3v5ZpIyMjI6nBocwjI7+8o0PweiMjIyPiayMjI7RpIyP9dCMj/lEjIyMjIyMjykEjIyMjIyMjI/xTI+D8IyMjIyMjIyOV9iMj9Vgj+2Si6yMj32Aju0P3wyMjI5WwIyPhsazvIyMjIyOjQPqnIyP8/M2xIyMjIyMjIyOS7rtCIyMjIyMjIyP9XCMj+qMjI7n8I7fwI/rTlu4jIyMjjnIj7eQjIyMjIyPTZK/LI63zIyPQ3SMjIyPGeSMjIyMjIyMjIyMjI5JA8mMjIyMj+qYjIyMjIyMjIyMjIyMjIyMjI7azIyPfwiOTvSPmfCMjIyMj/EsjIyMjI6zz7M4jI9LPIyMj17gjI5PcrP0jI7lJIyMjtGEjIyMjIyMjIyOTe+utIyMjIyOhzyMjI/1OIyMjkuLm4yMjI9pmI5KmkmAjI9+lI/zl528jIyMjIyPt9yMjIyMjIyMj3EMjI9drIyMjIyMjIyMjI6HQ+sQj/ugjIyMjI8lqIyPBoyOV2yPsQSMjIyMjIyPvrSMjIyO2x/J7IyOySyP65SMjI9LFIyPxdiPW8iMjI/fwIyOkRNdjIyO1v9d9IyMj8vIjIyMjIyOr0SMj06UjI5B3IyPg0CMjzUHa5iO7TSMjIyPTXyMjI8TkI7Jwt24j3rEjIyMj/K3LsrNQI5LCIyMjIyMjI8TxIyMjlu4jIyMjIyMjI8Ki3bcj0fwjIyMjIyPW+SMj3mSTsCPRoyMjIyMj+uW11CMjv+enytdtIyMjIyMjI6m/42LDrCMjrvkjI+hAkcjB18mmlcQjIyMjI7zxIyMjI5bCI8CiIyMjI6LvIyMjIyMjIyMjIyMjwm8juu8jxk0jxnkjI7mxIyMj5Wsjk6SzUCMj3MojzSMjI7f0IyMjIyMjIyMjI7WoI61XIyMjIyMjIyMjIyMjIyO2/SMjI/K16kkjk6QjIyP+8yMjIyOOXiMjIyMjIyMjI+p6IyMj1lMjIyMjI69mIyMjI+daI8rhIyMjIyMjI7/cIyOTeiMj6qEjIyPj4KFRIyMjIyMjIyPGeSMjw3UjIyMjIyO4uSOzULNQIyMjIyMjIyMj93cjIyMj5mkjIyMjpN/lbyMj3nIjIyOTtSMjIyPYUiMjzfwjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI69qxXAjIyMj2c8jIyMjt0TTe8N1IyMjIyMj8bEjI7yoI9xKIyMjIyPf+edpIyMjls0jIyMj4c0j7XAj7UwjIyMj/H4jIyMjI5LQIyOS7iMjI+CxIyP5ZSMjI9bvz7EjI7B9I97CIyOW3PDWIyMjIyMjI6L+I/pcI8SiIyP64yMjIyMj7ckjosMjIyMjovcjpqgjI+b0IyMj6cur8yMjp0Aj3FQjIyMjIyMjIyMjI6lEI461IyPGeiMjI+FyIyMjI7FrIyMjIyOS0yMjIyOixiMjI5KiIyMjI9fEIyPKr/LEwKKSwpbuIyOjqSP48yMjI9fJkN8jIyMjI7lIIyMjIyMj5VQjIyMjI/OlIyOhuCMjIyO7QyMjIyMjIyMjv+vlVCMjIyMjIyMjrcEjIyMjI6FzI734IyOy9SMjI9pDIyMjIyMjIyPnZqLrIyPh2iMjI/d8IyMjIyPeoSMj0/QjIyMjIyMjI5aplvwjIyOVo9pCIyMjIyOizyPFxyMjIyMjIyMj8r4jIyMjIyMjIyOVoiMjIyO7tJbuIyMjIyMjrV0jocTAsiMjIyO7UCMjI7Su3LgjIyMjIyMjI6WmIyPfyiMjIyMjIyOVdd9wIyMjpHUjI6fXI5PFIyMjI6fRI6LjIyMjI6+lIyMjI6nBI6fQIyMjIyMjIyMjI9NSykgjIyMjIyMjytwjI9z4IyMjuLn9vORnIyMjIyMjkPTuVqLUIyOn1tFBIyMj18TcRiPZZJWvIyPUyCMjIyMjIyPm9CMjI+xuI7HMIyMjsmQjIyO6vSMjI7q9IyMjIyMjIyMjIyMjIyMjIyPftSMj564jwWwjIyMjI7v38VMjIyMjI/zvlsQjIyPl+SOUSyMjIyPQo7/KkKkjIyPwxyMjvaUjI/mk4/Mjk8UjIyMjI99FIyMj5vkjIyMj9LHnaajPI5PEtUYjIyP65yMjxXAj/XsjIyMjI7FCI5NhIyMj0yMjI6KwIyO0SCOr6MP3I6nBI7pw+kEjIyMjIyPwqCMjIyPhaSMjI/H2k04jIyOW+CMjI9F1I6nBIyPf+SMjI+q5IyMjIyMjIyMjIyMj9azgRva0t18jI/pFIyMjIyOVaSMjIyMjqvW7ZyP6QyPQbCMjIyMjyXYjI/pmIyMjIyMjy7EjIyO9YCMj/W0jIyMjI/K+IyMjIyMjIyMjIyMjIyMjIyMjwfwjIyMj7G6/efK+I7NaIyMjI/SxIyMjIyMjI9xTlUIjIyO7uiMjIyMjIyMj+tHyviPg8SMjqcEjIyMj20MjIyO5viMjIyOVZyMjoa0jkqojIyMjkf3yuyOS3SMjk7MjvfwjI5aqIyOvoXQj/mQjzEEj614jI8rg/L8jIyMjw70jpNwjI9nHIyMjIyMjI7/UIyOR1+/52yMjIyMjI6R8k04jxXS4piMjIyPyviMj0XojIyMjwLQjIyMjIyMjIyMjIyOm0CPSwpZMIyMjIyMjIyPp/SMj8rMjIyMjIyMjIyO4ViMjIyOh/iMjIyMjIyMjIyMjIyMjIyPgeiMjI5HXIyMjvqP5TCPTYCMjI6bQIyMjyuIjoWEjIyPBptVNp8WTeyMjIyMjIyO94yP65MS8IyMjIyOr3JVfIyMjIyMjIyMjIyMj3bUjIyMjIyPw6SPBbCPc8iMjIyMjIyMjIyMj1usjIyPXpiMjI+VjIyMjIyMjI9bvjq4jo0AjIyMjIyMjI9vEr7UjIyMjIyMjI8ZOIyMjIyP65yMjI7rqIyMjIyMjIyMj7sojI8PaIyPlcyMjIyMj7b4jI5VVIyMjIyMjI/5QIyMjIyMjIyP19SMjrXkjocQjIyMjIyMjIyOhxMJo4rkj6uQjtrojIyMj1/0jIyMjIyPBbCMjIyMjIyMjIyMj6UbQ+qLdIyMjIyMjI5O8IyMjIyMjIyMjIyMjotj65yMjIyMjI5Li7abqoiMjot0jI8K+6GAjocSr+8JGIyMjI/SxIyMjq1+S3iMjIyOSSiPd87x6IyMjI6jXIyMjovcjIyMjIyO83SMjIyMjI+r9IyMjI/Sx/k3r/SMjIyOhzCMjpFahxCMjIyMjI5VBk8UjIyMjI/LK9LEjIyOm0JbuIyMjIyOlqqF+IyMjI6FSla8jIyMjI+FRIyMjI8W1lu4jIyOlbiMjIyMjoVsjIyMj7vUjI+q7tb+pVCMjIyMjIyPb4NpIIyMjIyMjIyMj8r4j2U0jI5auIyMj8kAjIyOjQCP6o/NQIyMjIyMjIyOtViMjqr0jIyMj6q/z7yMjIyMjlNC2eCPTXyMjIyOke/RjIyPdYyMjrNqh/iMjIyMjIyMjIyMjIyMjIyMjI6XNIyMjIyMjIyMjI5JyIyMjIyMjIyMjIyMjI6/o01mWTCMjI6mmIyMjI/NR4HojIyO5wpSoIyPa7CMjI/rW5FkjIyMjqcEj+ucjI9FU+ufAeSPyfJbkIyPgRyMjlVSWyiMjIyMj6uAjIyMjIyMjIyMjxeTwcyMjI7r9IyPe0/rfIyMjpSP65yMjI9LeIyMjIyPETiMjIyMjI7tyI5XNIyOmuiMjI6i9IyMjw1QjI5PFI/SxIyMjIyP63d7AIyMj4VUjI7jOIyOWfCPkWSMjIyMj8HT6pyMjIyMjIyMjI/PEI7tDIyP+uSMjIyMjIyMjIyMj7MgjI7NRIyMjI5DkI7nhIyMjI6m9IyPZcyMjI9ajrfQjI8ngIyPR9CMj6nH43SMjIyMjI7DtI7JAIyMjymn8yyMjIyMjIyPg2iMjIyOW6pN2I9FtI+ywIyMjIyMjIyMjIyMj2uAjkuIjIyMjIyMjlVmtUCMjzcEjsaakdJK5IyPCtSMjIyMjIyMj5aOWUCMjuvm3WCMjI6z9lUkjIyMjI5K9I6aoI8uo80HqxNSwIyMjIyOzdiMju3Ajlu0jIyMjIyMjIyMj1q0jqUT64yMj+30jIyMjI79lIyMjIyMjIyPqUPZfkqIjIyMj+qUj7qwjv9gjIyMjI7O4IyPQ3SMjIyPY8yMjIyMjIyMjI9FNIyMjIyMjI9y6IyO07CPL9cLPI8NNIyMjI5a2IyMjIyMj7/Ijs1Ejut0jIyMjIyMjIyMjIyMjI/3+IyMjy7LSsCO9VyMjIyMjI8VwIyMjIyMjIyMjIyMjIyMjlu0j/LcjIyMjt7cj0Nei9/jtIyMjI+uuI47pouz6dSOW7iPZ5/rlI6zxIyMjIyOVaaRmIyMj8nojI7qhIyMjI6nBIyMjIyOW6iOmqiMj5Vek3CMjIyOwbiMjvMAjIyMjI+bBIyMj/l8j2MiVxyPv0yPQ3ZVVIyMjIyOnTiPsvJBVIyMjIyMjIyMjIyMjIyMjI5bpIyMjI5PFIyMjI5buI/Sp06UjIyPqySMjI/pFIyMjIyMjorYjIyMjI7bllkwjIyMjI+G6I5PAIyPyviMjvm8jI/rSI+HAIyMjI6Lq9EIjIyP6pCMjIyMjlcsjokPteSMjIyMjI7xJlFcjIyMjIyMjqe0jI6/OI6HPIyPK2iPi6iMjrWYjI7Di5l7f9cuyIyMjI8vF6scjIyMju8EjIyOiXCMjw7kjIyOVcSMjIyMjIyPeT7TpIyMj58fzyZPFI6HjI5VfIyMjI5VpIyMjIyMjIyMjI/rnrV0j6HsjIyMjI5PLIyO/ViMj4bEjIyMjIyMjt14jIyMjIyOW7iMjIyMjIyPRTCPQ7iMjqrcjIyMjIyMjIyPUQqL7vW7i6SMjI+RbIyMjoczku+xLIyMjpiMjIyMjI+VUIyMj4VUj18TcRiMjIyMjI7BnIyMjI8riIyPY9qzyI6nTI9/JovgjIyOlpSMjIyMj+qf4tOpYIyMjIyMjI7jzIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjof4jIyMjIyMjIyMjIyMjIyP6UCMjIyMjI5LiIyMjok4jpfojI6x1IyMjI+pBIyMjIyMjIyMjI/rnIyMjIyMjIyMjI/qnIyMjIyOheJapIyMjIyMjIyMjIyOR9aZUI6FhI+HAIyPa/SMjkK4jIyMjI8JSIyMjorAjIyMjI+rlI/qnIyMjIyMjlUIj9LHEYiMjIyMjlKcjIyMjIyOizSMjwNUjkffYaiMj9LEjIyMjIyMjI9niIyMjlq4jI6WxIyPsWCMjI5DxI+O+xn36pyMjIyMjIyPN9CMj8r4jI+rklu0jIyMjt7cjIyMjIyMjvaHyviMjI5OlIyMjIyMjIyMjI5K6IyMj+ucjIyMjIyMjI6LdI6pyIyMjI9/bIyMjlu4jkrIjIyMjIyMjIyMjotMjIyPu0SMjI5Dqo0CjQLxxI6zx7GIjIyMjIyMj9LGs/anBkesjIyPuWSMjIyMjIyMjIyMjIyMjIyMjIyMjI5ZVlq4jrcQjIyOTxSMjI/rnIyMjI5XrIyOhayOTxSMj3syTxSMjI+xiI5ZLIyMjIyOpwCPA8CMj+uYjI/p+IyP1TSMjIyMjIyMjI6LoIyMjIyMjIyOi1SMjs1CWxpLBjtYjIyMjI6NAIyOW3SMjqbvm9CMjlsaSQCOjQJVpodft5JVp01Ej+r0jI+n9IyMjI6FHIyMjIyMjIyMjIyMj8r4jIyMjk8UjIyOTwyPtWSMjI7x3IyOvoyOr7iMjvfAjIyMjIyMjIyMjI+vcIyMj3rEjw9ojIyMjIyMj8OkjI8T3IyMjI/1pIyMjIyMjIyMjIyMjIyMj81Ej0N0jIyMjI8Z5IyMjIyMjIyOzULNQs1CzULNQs1Dz3CMjIyMjI5PrI87eI7IjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI5VkIyMj7unnV7XP1lsj70rzUSMjIyMjIyMjI8LCIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyPWW8++IyMjIyMjI/ZfIyMjxOPRRSO+tCMjIyMjIyMjIyMj+2kjIyMjIyMjIyMjIyMjIyMjIyPgxb5nIyMjsnHhYiMj6GMjIyMjIyMj81HizdZbIyMjIyMj81Ej4WIjI/NRIyMjI+7pIyMjIyMj0/YjxGwj/fQjIyMjIyMjIyMjIyMjIyMjzkEjIyMjIyMjIyPesSMjIyPesSMj3rEjraQjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI96xI96xIyMjIyMjIyMjIyMj3rEjIyMj6KKjeiMjIyMjIyOisCMjIyMjIyMjIyMjIyMjIyMjIyPaTCOsu+HRI9pMvO2+8qN8I7p6vvIjIyMj1b4jIyMj4s4jIyMj0uYjIyPZYiMjt+Ksu+HRIyMjvKKlvyPdciO1RiMjoekjI8luIyMjIyMjIyPRwiMjIyMjI6770lkjI677IyMjI7zttLG0+SMj4c0jr6MjIyMj3a6n6CMjI+KtulYjI9HEI6GrIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyOx4KjrI6+jy1XtZLfdseAjI8teI9apIyMjrLojIyMjIyOqp7Hg2nXaUuHNI+1kof0jIyMjI7HgI+pfy2D50N3otPYjseAj5kPi0SMjIyMjIyMjrvsjI677IyMjIyPtZN1svO20sSPST9Ld+K4jIyMjIyMjIyOvo8tV7WT0ZLHgIyPLXiO05CPZYqfoI+ZeI+WuIyMjIyMjIyMjI677IyOu+yMjIyMjI+1k3Wy87bSxI9JP0t34riMj0l4jIyMjIyMjI677IyMjIyPLXiP0XSMjrLojI6Tkt3Ej4tQjIyMjIyMjIyMjIyO6ViOsurzky1Ij1XIj2kysuyMjIyOhqyOu+yMj4dEjzk288SMjIyMjIyMjI7ywIyMjIyMjIyMjIyMjIyMjIyPS3SMjvLAjIyMjIyMjIyMjIyO6ViMjIyMjIyMjIyMjIyMjIyMj0t0jI7pWIyMjIyMjIyMjIyMjI9liIyMjIyMjIyMjIyMjIyMjIyPS3SMjI9liIyMjIyMjIyMj9Fux4CPmTNZ6tLIjI9Z7zuji1LpWIyMjIyP0XbHgI+ZM1nq0siMjIyMjIyMjIyPVctJo2kwjIyO8ryMjIyMjIyMjseIjIyPRxCMjI9WpIyPS3SMjI9Vy0mjaTCMjIyMjIyMjIyMj7WThzdV1IyMjvK8jIyMjI7HiIyMjIyMjI7HiI92sIyMj0t0jIyPtZOHN1XUjIyMjIyMjIyO84yMjt1qmx93aukTd6LT29F2x4CMjzvSsuiMjIyMjIyOx4CPqX8tg+dDd6LT2IyMjI7HgqOsjIyMjrvvSWSMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjvKKlvyP24eWtIyMjI9pMI6y74dEj2ky87b7yIyO6er7yIyMjIyMj4cu+4yPmXtl1I6qr4s8jI9pM4tMjIyOjsSMjIyMjr0Qj4s+6VtJKIyPUotDNIyMjIyOWwyO98iMjI8vbIyMjIyMjGCO1wCPaTCOsu+HRI9pMvO2+8iMjunq+8iMjIyMjI+HLvuMj5l7ZdSOqq+LPIyPaTOLTIyMjo7EjIyMjI69EI+LPulbSSiMjI9DNIyMjIyMjIyMjIyMjIyMjIyPcvSMjIyPScs3hz9kjIyOR9SMj1HwjIyMjIyMjIyMjIyMjIyPlreLPulbSSvJE5a2n6CMjI6foIyMj1We8sLC3qGQjIyPLUtJo7WQj0Nu6ViO6vqy6o7EjIyMjIyPhy77jI+Ze2XUjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMj2eu84yMjIyPaTOLTIyMjvPEjIyMjt6zlviMjIyMj1ammZSMjIyO34qy74dEjIyOr7CO45rzJIyMjI71kI+lrpqkjIzAjIyPaTCOsu+HRI9pMvO2+8iPhzeLS0n7VqSMjIyMjIyM=";
		    	//var str = "JVBERi0xLjIKNiAwIG9iago8PCAvUyAvR29UbyAvRCAoY2hhcHRlci4xKSA+PgplbmRvYmoKOCAwIG9iagooVGVtcGxhdGUpCmVuZG9iagoxMCAwIG9iago8PCAvUyAvR29UbyAvRCAoc2VjdGlvbi4xLjEpID4+CmVuZG9iagoxMiAwIG9iagooSG93IHRvIGNvbXBpbGUgYSB0ZXh0dHQgey50ZXh9IGZpbGUgdG8gYSB0ZXh0dHQgey5wZGZ9IGZpbGUpCmVuZG9iagoxNCAwIG9iago8PCAvUyAvR29UbyAvRCAoc3Vic2VjdGlvbi4xLjEuMSkgPj4KZW5kb2JqCjE2IDAgb2JqCihUb29scykKZW5kb2JqCjE4IDAgb2JqCjw8IC9TIC9Hb1RvIC9EIChzdWJzZWN0aW9uLjEuMS4yKSA+PgplbmRvYmoKMjAgMCBvYmoKKEhvdyB0byB1c2UgdGhlIHRvb2xzKQplbmRvYmoKMjIgMCBvYmoKPDwgL1MgL0dvVG8gL0QgKHNlY3Rpb24uMS4yKSA+PgplbmRvYmoKMjQgMCBvYmoKKEhvdyB0byB3cml0ZSBhIGRvY3VtZW50KQplbmRvYmoKMjYgMCBvYmoKPDwgL1MgL0dvVG8gL0QgKHN1YnNlY3Rpb24uMS4yLjEpID4+CmVuZG9iagoyOCAwIG9iagooVGhlIG1haW4gZG9jdW1lbnQpCmVuZG9iagozMCAwIG9iago8PCAvUyAvR29UbyAvRCAoc3Vic2VjdGlvbi4xLjIuMikgPj4KZW5kb2JqCjMyIDAgb2JqCihDaGFwdGVycykKZW5kb2JqCjM0IDAgb2JqCjw8IC9TIC9Hb1RvIC9EIChzdWJzZWN0aW9uLjEuMi4zKSA+PgplbmRvYmoKMzYgMCBvYmoKKFNwZWxsLWNoZWNraW5nKQplbmRvYmoKMzggMCBvYmoKPDwgL1MgL0dvVG8gL0QgKHNlY3Rpb24uMS4zKSA+PgplbmRvYmoKNDAgMCBvYmoKKExhVGVYIHt9IGFuZCBwZGZMYVRlWCB7fSBjYXBhYmlsaXRpZXMpCmVuZG9iago0MiAwIG9iago8PCAvUyAvR29UbyAvRCAoc3Vic2VjdGlvbi4xLjMuMSkgPj4KZW5kb2JqCjQ0IDAgb2JqCihPdmVydmlldykKZW5kb2JqCjQ2IDAgb2JqCjw8IC9TIC9Hb1RvIC9EIChzdWJzZWN0aW9uLjEuMy4yKSA+PgplbmRvYmoKNDggMCBvYmoKKExhVGVYICkKZW5kb2JqCjUwIDAgb2JqCjw8IC9TIC9Hb1RvIC9EIChzdWJzZWN0aW9uLjEuMy4zKSA+PgplbmRvYmoKNTIgMCBvYmoKKHBkZkxhVGVYICkKZW5kb2JqCjU0IDAgb2JqCjw8IC9TIC9Hb1RvIC9EIChzdWJzZWN0aW9uLjEuMy40KSA+PgplbmRvYmoKNTYgMCBvYmoKKEV4YW1wbGVzKQplbmRvYmoKNTggMCBvYmoKPDwgL1MgL0dvVG8gL0QgWzU3IDAgUiAgL0ZpdCBdID4+CmVuZG9iago2MiAwIG9iaiA8PAovTGVuZ3RoIDYzIDAgUgovRmlsdGVyIC9GbGF0ZURlY29kZQo+PgpzdHJlYW0KeNqlkT1Pw0AMhvf8Co+JxJnzfeW8opJKICQE2RBD2gaEShJ0NAP5XfxALjk+poqh8nCW/byvLR+BjEHgCdlBqS1KBdsuI0ixh5/sOtYSq71Ha2L6DycUe1RlfLVDo4/jxy0sepcGXdTZeaUsKInOQf20APXuIb9vurfXthDKyvx2VaVkNWzHru0PxWN9FWUOyKC2s8yWGDeyGv2ivhs2bThEkeH8pglDPytAEMe+oBJZL9g6TG1BLn8ewpQmrMO4m14WmqOlB4lkFvbz2wJVPMFvtX/fJ1p4RlIgtEGZWlW7CWMTPtIWSp6lCcTMsyK7rP9Oyg5JgzBSo7SnftQXfKBuwWVuZHN0cmVhbQplbmRvYmoKNjMgMCBvYmoKMjU5CmVuZG9iago2MSAwIG9iaiA8PAovUHJvY1NldCBbL1BERiAvVGV4dF0KL0ZvbnQgPDwgL0YyNSA2NCAwIFIgL0YyNiA2NSAwIFIgPj4KPj4gZW5kb2JqCjU3IDAgb2JqIDw8Ci9UeXBlIC9QYWdlCi9Db250ZW50cyA2MiAwIFIKL1Jlc291cmNlcyA2MSAwIFIKL01lZGlhQm94IFswIDAgNTk1LjI3IDg0MS44OV0KL1BhcmVudCA2NiAwIFIKPj4gZW5kb2JqCjEgMCBvYmoKIDw8IC9UeXBlIC9FbmNvZGluZyAvRGlmZmVyZW5jZXMgWyAyNCAvYnJldmUgL2Nhcm9uIC9jaXJjdW1mbGV4IC9kb3RhY2NlbnQgL2h1bmdhcnVtbGF1dCAvb2dvbmVrIC9yaW5nIC90aWxkZSAzOSAvcXVvdGVzaW5nbGUgOTYgL2dyYXZlIDEyOCAvYnVsbGV0IC9kYWdnZXIgL2RhZ2dlcmRibCAvZWxsaXBzaXMgL2VtZGFzaCAvZW5kYXNoIC9mbG9yaW4gL2ZyYWN0aW9uIC9ndWlsc2luZ2xsZWZ0IC9ndWlsc2luZ2xyaWdodCAvbWludXMgL3BlcnRob3VzYW5kIC9xdW90ZWRibGJhc2UgL3F1b3RlZGJsbGVmdCAvcXVvdGVkYmxyaWdodCAvcXVvdGVsZWZ0IC9xdW90ZXJpZ2h0IC9xdW90ZXNpbmdsYmFzZSAvdHJhZGVtYXJrIC9maSAvZmwgL0xzbGFzaCAvT0UgL1NjYXJvbiAvWWRpZXJlc2lzIC9aY2Fyb24gL2RvdGxlc3NpIC9sc2xhc2ggL29lIC9zY2Fyb24gL3pjYXJvbiAxNjQgL2N1cnJlbmN5IDE2NiAvYnJva2VuYmFyIDE2OCAvZGllcmVzaXMgL2NvcHlyaWdodCAvb3JkZmVtaW5pbmUgMTcyIC9sb2dpY2Fsbm90IC8ubm90ZGVmIC9yZWdpc3RlcmVkIC9tYWNyb24gL2RlZ3JlZSAvcGx1c21pbnVzIC90d29zdXBlcmlvciAvdGhyZWVzdXBlcmlvciAvYWN1dGUgL211IDE4MyAvcGVyaW9kY2VudGVyZWQgL2NlZGlsbGEgL29uZXN1cGVyaW9yIC9vcmRtYXNjdWxpbmUgMTg4IC9vbmVxdWFydGVyIC9vbmVoYWxmIC90aHJlZXF1YXJ0ZXJzIDE5MiAvQWdyYXZlIC9BYWN1dGUgL0FjaXJjdW1mbGV4IC9BdGlsZGUgL0FkaWVyZXNpcyAvQXJpbmcgL0FFIC9DY2VkaWxsYSAvRWdyYXZlIC9FYWN1dGUgL0VjaXJjdW1mbGV4IC9FZGllcmVzaXMgL0lncmF2ZSAvSWFjdXRlIC9JY2lyY3VtZmxleCAvSWRpZXJlc2lzIC9FdGggL050aWxkZSAvT2dyYXZlIC9PYWN1dGUgL09jaXJjdW1mbGV4IC9PdGlsZGUgL09kaWVyZXNpcyAvbXVsdGlwbHkgL09zbGFzaCAvVWdyYXZlIC9VYWN1dGUgL1VjaXJjdW1mbGV4IC9VZGllcmVzaXMgL1lhY3V0ZSAvVGhvcm4gL2dlcm1hbmRibHMgL2FncmF2ZSAvYWFjdXRlIC9hY2lyY3VtZmxleCAvYXRpbGRlIC9hZGllcmVzaXMgL2FyaW5nIC9hZSAvY2NlZGlsbGEgL2VncmF2ZSAvZWFjdXRlIC9lY2lyY3VtZmxleCAvZWRpZXJlc2lzIC9pZ3JhdmUgL2lhY3V0ZSAvaWNpcmN1bWZsZXggL2lkaWVyZXNpcyAvZXRoIC9udGlsZGUgL29ncmF2ZSAvb2FjdXRlIC9vY2lyY3VtZmxleCAvb3RpbGRlIC9vZGllcmVzaXMgL2RpdmlkZSAvb3NsYXNoIC91Z3JhdmUgL3VhY3V0ZSAvdWNpcmN1bWZsZXggL3VkaWVyZXNpcyAveWFjdXRlIC90aG9ybiAveWRpZXJlc2lzIF0gPj4gCmVuZG9iagoyIDAgb2JqCiA8PCAvVHlwZSAvRm9udCAvU3VidHlwZSAvVHlwZTEgL05hbWUgL1phRGIgL0Jhc2VGb250IC9aYXBmRGluZ2JhdHMgPj4gCmVuZG9iagozIDAgb2JqCiA8PCAvVHlwZSAvRm9udCAvU3VidHlwZSAvVHlwZTEgL05hbWUgL0hlbHYgL0Jhc2VGb250IC9IZWx2ZXRpY2EgL0VuY29kaW5nIDEgMCBSID4+IAplbmRvYmoKNCAwIG9iagogPDwgL0ZpZWxkcyBbXSAvRFIgPDwgL0ZvbnQgPDwgL1phRGIgMiAwIFIgL0hlbHYgMyAwIFIgPj4gPj4gL0RBICgvSGVsdiAxMCBUZiAwIGcgKSAvTmVlZEFwcGVhcmFuY2VzIHRydWUgPj4gCmVuZG9iago2MCAwIG9iaiA8PAovRCBbNTcgMCBSIC9GaXRCSCA3MzUuMDJdCj4+IGVuZG9iago1OSAwIG9iaiA8PAovRCBbNTcgMCBSIC9GaXRCSCA3MTUuMjJdCj4+IGVuZG9iago3MCAwIG9iaiA8PAovTGVuZ3RoIDcxIDAgUgovRmlsdGVyIC9GbGF0ZURlY29kZQo+PgpzdHJlYW0KeNozVDAAQkMFQyNjPQtDBXNjUz0DI4XkXC5DBQjMVoCxvLmcQrj03YwsFAwN9SzNFELSwHpDUqI1jDRjQ7y4XEOAuiDGGVtY6JmaAJk4TIKp04Uq1DUzttQzsSCknJCxAMz7JodlbmRzdHJlYW0KZW5kb2JqCjcxIDAgb2JqCjEwMQplbmRvYmoKNjggMCBvYmogPDwKL1Byb2NTZXQgWy9QREYgL1RleHRdCi9Gb250IDw8IC9GMjggNzIgMCBSID4+Cj4+IGVuZG9iago2OSAwIG9iaiA8PAovVHlwZSAvUGFnZQovQ29udGVudHMgNzAgMCBSCi9SZXNvdXJjZXMgNjggMCBSCi9NZWRpYUJveCBbMCAwIDU5NS4yNyA4NDEuODldCi9QYXJlbnQgNjYgMCBSCj4+IGVuZG9iago2NyAwIG9iaiA8PAovRCBbNjkgMCBSIC9GaXRCSCA3MzUuMDJdCj4+IGVuZG9iago3NiAwIG9iaiA8PAovTGVuZ3RoIDc3IDAgUgovRmlsdGVyIC9GbGF0ZURlY29kZQo+PgpzdHJlYW0KeNrtWUtvm0AQlnrMr+AIB6Y7+95jG6Wt2kqVWg6Vqh5cmyQofskhj5/fXcDYBWyMix1HspC8eBjNMDvffjO7oEfshZ5GMNJTTACh3nBygV5+3XnLuy9WlusyrUFwe9uiFxaKISICl079fXTx9gOnHuWgjBddZ5rR6Jd/OZum8TS9D35Hny+uotIG8UIpgYrcl5Mtbrz85vvHwhzzMHv7NXMYhEgI8aPAMD+ezMeDNK6algIYtkfBUAGVud5Gf6Jq3MZOQSgvtL+bPWz2ap0a5mYODN8SO9UNsUMWPTf+p1lAhf8UhFQQP53Z0QqHs8k8Gcf5n4F7bxsSX5lBFCBYYQvS+DlXWffEEKQuNN4sTWX2rZ8Gk0yDFkuL89F1u8XKbFLGHC5Jt5ncklPAtYQ2TSIEITfGDcLCaDXsLmx6VgkLqV0fW8La+HY1uAkwapcFyW3kdkQOXHSHVQYstAFFgSb+bDauLVfJW5ihW54MCN2eqH0zdIAEdxZWgS63A/3kEEELRDiqkf9QjR0f7pfccFuSRANokGUM3yNq5OsATXUejJ1Pc8zkKwKySH73KkO3VZmnRZKWNSZ7MpoNHya2xNei5hoU6y/7EqTZOf2nQAHNYKDEAN2HCeSLMAFd1YblWp8Mkml+tzH1tqxr02NZf5Gi3lvCyVYWPGjC91j9JfVf3g7mabyo0bomoGR/ycUVOf4nr59Qo1DFALf7L/OKFj0rMPBjHo/H4fA2Ht4l05vaOrdcZnR/UNBlcEer8Idc+KgBj5r0tbLfPemsKPtfi32e8JRz6zZxxO51LSZ0pvmuYZfnxrDUiJyGfWlGndBWbSe8KoTaTsxS9rNoJKajvJWwW8i6d0FAt3lXTd5xN+/DwXzwJxknaRLXO1ilQPTYwXJQ6lg9TE+9q6Yuj91BrF6kerGyXfn2GKD048VjEudtbLWKcTA9njwoQHYuYoeDwh58VjYydU7h6I7+9qG0dlKpn5xsD7brHhjF+eTklAlo2To1FzPlWoLDVLN6m26w1zYd+ZnhTovheIG1q+fBZD6u9y9aAMdej2DOEOgbAsW3NGpH3vqJLjtKbDs6Z/UDyNWnribrfwGMfIwvZW5kc3RyZWFtCmVuZG9iago3NyAwIG9iago4MjgKZW5kb2JqCjc0IDAgb2JqIDw8Ci9Qcm9jU2V0IFsvUERGIC9UZXh0XQovRm9udCA8PCAvRjQyIDc4IDAgUiAvRjQzIDgwIDAgUiAvRjI4IDcyIDAgUiAvRjQ0IDgyIDAgUiAvRjQ1IDkwIDAgUiA+Pgo+PiBlbmRvYmoKNzUgMCBvYmogPDwKL1R5cGUgL1BhZ2UKL0NvbnRlbnRzIDc2IDAgUgovUmVzb3VyY2VzIDc0IDAgUgovTWVkaWFCb3ggWzAgMCA1OTUuMjcgODQxLjg5XQovUGFyZW50IDY2IDAgUgovQW5ub3RzIFsgNzkgMCBSIDgxIDAgUiA4MyAwIFIgODQgMCBSIDg1IDAgUiA4NiAwIFIgODcgMCBSIDg4IDAgUiA4OSAwIFIgOTEgMCBSIDkyIDAgUiA5MyAwIFIgOTQgMCBSIF0KPj4gZW5kb2JqCjc5IDAgb2JqIDw8Ci9UeXBlIC9Bbm5vdAovQm9yZGVyIFswIDAgMF0vSCAvSS9DIFsxIDAgMF0KL1JlY3QgWzgxLjk2IDU1NC44MSAxNDcuMjcgNTY1LjU1XQovU3VidHlwZSAvTGluawovQSA8PCAvUyAvR29UbyAvRCAoY2hhcHRlci4xKSA+Pgo+PiBlbmRvYmoKODEgMCBvYmogPDwKL1R5cGUgL0Fubm90Ci9Cb3JkZXIgWzAgMCAwXS9IIC9JL0MgWzEgMCAwXQovUmVjdCBbOTkuOSA1NDAuMjcgMzMyLjkxIDU1MC45N10KL1N1YnR5cGUgL0xpbmsKL0EgPDwgL1MgL0dvVG8gL0QgKHNlY3Rpb24uMS4xKSA+Pgo+PiBlbmRvYmoKODMgMCBvYmogPDwKL1R5cGUgL0Fubm90Ci9Cb3JkZXIgWzAgMCAwXS9IIC9JL0MgWzEgMCAwXQovUmVjdCBbMTI3LjM5IDUyOC4yNSAxOTEuOTMgNTM2LjUzXQovU3VidHlwZSAvTGluawovQSA8PCAvUyAvR29UbyAvRCAoc3Vic2VjdGlvbi4xLjEuMSkgPj4KPj4gZW5kb2JqCjg0IDAgb2JqIDw8Ci9UeXBlIC9Bbm5vdAovQm9yZGVyIFswIDAgMF0vSCAvSS9DIFsxIDAgMF0KL1JlY3QgWzEyNy4zOSA1MTMuODEgMjYzL"

		    	//oContainer.openPDFClientSide(data.results[0].File1);

		    },
		   function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error while reading full specification : "+ window.JSON.stringify(err.response));
		    });
	},

	openPDFClientSide: function(b64Data, fileName){				// added filename MAC24032015 +
	//	alert("base64 dataa fn" + b64Data);
        var contentType = 'application/pdf';
        var byteCharacters = atob(b64Data);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], {type: contentType});

        if ((navigator.appName == 'Microsoft Internet Explorer') ||
               (!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)))
	        	 {
					 // window.navigator.msSaveOrOpenBlob(blob, 'downloadfile.pdf');		// MAC24032015 -
					 window.navigator.msSaveOrOpenBlob(blob, fileName);						// MAC24032015 +
	        	 }else{
	      		//var blobUrl = URL.createObjectURL(blob);			// MAC24032015 -
	      		//window.open(blobUrl);								// MAC24032015 -
	      		window.saveAs(blob, fileName);					// MAC24032015 +
	      	 }


       /* var blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl);*/
	}
});
