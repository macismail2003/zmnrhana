var oSDASHM3PopoverUploadDocument = [];
var jsonSDASHM3DocumentsUploadStatus = [];
var jsonSDASHM3Docs = [];
var oSDASHM3PopoverUploadDocument = "";
var oSDASHM3PopoverDeleteDocument = "";
var jsonSDASHM3AllDocs = [];
var globalFileNames = [];
sap.ui.model.json.JSONModel.extend("sdashm3doc0", {
		/* SDASHM3 - Function - Get Other Documents List */

		getOtherDocumentsList : function(docicon){

		if(sap.ui.getCore().byId("idSDASHM3TableDocuments") != undefined)
			sap.ui.getCore().byId("idSDASHM3TableDocuments").destroy();

		var oSDASHM3TableDocuments = new sap.ui.table.Table("idSDASHM3TableDocuments",{
    		visibleRowCount: 10,
            width: '750px',
            selectionMode: sap.ui.table.SelectionMode.None,
            columnHeaderVisible : false,
		}).addStyleClass("tblBorder");

		/*oSDASHM3TableDocuments.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Doc. Type", textAlign: "Left"}).addStyleClass("wraptextcol"),
    		 width: "130px",
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "DocType").addStyleClass("borderStyle1"),
	           resizable:false,
	           //width:"150px",
	           //sortProperty: "msgid",
	           //filterProperty : "msgid",
			 }));*/

		oSDASHM3TableDocuments.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Document", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 width: "400px",
			 template: new sap.ui.commons.Link({
		     press : function(oEvent){
	 				var binstring = oEvent.getSource().getBindingContext().getProperty("images");
					var filename = oEvent.getSource().getBindingContext().getProperty("name");
			    var ext = filename.split('.').pop().toLowerCase();
					var dispname = filename.split('_').pop();
//								    	var ext = data.FileExt.toLowerCase();
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
				 }
			 }).bindProperty("text", "dispname").addStyleClass("borderStyle1"),
	           resizable:false,
	           //width:"150px",
	           //sortProperty: "msgid",
	           //filterProperty : "msgid",
			 }));

			var oSDASHM3FlexDocuments = new sap.m.FlexBox({
	            items: [oSDASHM3TableDocuments
	                    ],
	            direction: "Row"
	            });


        	var oSDASHM3ModelDocuments = new sap.ui.model.json.JSONModel();
        	oSDASHM3ModelDocuments.setData({modelData: jsonSDASHM3Documents});

          	var oSDASHM3TableDocuments = sap.ui.getCore().byId("idSDASHM3TableDocuments");
          	oSDASHM3TableDocuments.setModel(oSDASHM3ModelDocuments);
          	oSDASHM3TableDocuments.bindRows("/modelData");

          	var jsonSDASHM3DocumentsLength = jsonSDASHM3Documents.length;
          	if(jsonSDASHM3DocumentsLength < 11){
          		oSDASHM3TableDocuments.setVisibleRowCount(jsonSDASHM3DocumentsLength);
          		oSDASHM3TableDocuments.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
          	}
          	else{
          		/*oSDASHM3TableStatusMonitor.setVisibleRowCount(15);
          		oSDASHM3TableStatusMonitor.setNavigationMode(sap.ui.table.NavigationMode.Paginator);*/
          		oSDASHM3TableDocuments.setVisibleRowCount(10);
          		oSDASHM3TableDocuments.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
          	}


          	var oSDASHM3ButtonStatusMonitorDocuments = sap.ui.getCore().byId("idSDASHM3ButtonStatusMonitorDocuments");
          	var oSDASHM3PopoverStatusMonitorDocuments = new sap.m.Popover({
             title: "Other Documents",
             width:"300px",
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
                                     items:  [oSDASHM3FlexDocuments]
                                     }),

             }).addStyleClass("sapUiPopupWithPadding");

          oSDASHM3PopoverStatusMonitorDocuments.openBy(docicon);

		},

		/* SDASHM3 - Function -Delete Documents */
		deleteDocuments : function(jsonSDASHM3AllDocsForDeletion){

			console.log("Delete Document Starts");
			var urlToSap = "";
			busyDialog.open();
			for(var i=0; i<jsonSDASHM3AllDocsForDeletion.length; i++){
			console.log("Delete Document No. : ", (i + 1));
			  urlToSap = "picdeleteSet(IvFileName='" + jsonSDASHM3AllDocsForDeletion[i].name + "')";
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

										 if(data.Result == "X"){
											 console.log("Success");
											 jsonSDASHM3AllDocsForDeletion[i].result = "Success";
										 }else{
											 console.log("Error");
											 jsonSDASHM3AllDocsForDeletion[i].result = "Error";
										 }
                  },
                function(error){
                  //sap.ui.commons.MessageBox.alert("Sorry, there is an error");
									console.log("Error");
									jsonSDASHM3AllDocsForDeletion[i].result = "Error";
                });
				}
				busyDialog.close();

				sap.ui.getCore().byId("idSDASHM3ButtonDeleteDocumentDelete").setVisible(false);
				sap.ui.getCore().byId("idSDASHM3TableDeleteDocumentResult").setVisible(true);
				var oSDASHM3ModelDeleteDocument = new sap.ui.model.json.JSONModel();
				oSDASHM3ModelDeleteDocument.setData({modelData: jsonSDASHM3AllDocsForDeletion});

				var oSDASHM3TableDeleteDocument = sap.ui.getCore().byId("idSDASHM3TableDeleteDocument");
				oSDASHM3TableDeleteDocument.setModel(oSDASHM3ModelDeleteDocument);
				oSDASHM3TableDeleteDocument.setVisibleRowCount(jsonSDASHM3AllDocsForDeletion.length);
				oSDASHM3TableDeleteDocument.bindRows("/modelData");

				var osdashm3 = new sdashm3();
				var oSDASHM3ContentThumbNail = osdashm3.setContentThumbnail();
				sap.ui.getCore().byId("idSDASHM3ContentFinal").insertItem(oSDASHM3ContentThumbNail, 2);
				sap.ui.getCore().byId("idSDASHM3PanelCarousel").setExpanded(true);

		},

		/* SDASHM3 - Function - Open Delete Documents Popup */

		openDeleteDocumentsPopup : function(button){
			var oCurrent = this;

			if(sap.ui.getCore().byId("idSDASHM3ButtonDeleteDocumentDelete") != undefined){
				sap.ui.getCore().byId("idSDASHM3ButtonDeleteDocumentDelete").destroy();
			}

			var oSDASHM3ButtonDeleteDocumentDelete = new sap.ui.commons.Button("idSDASHM3ButtonDeleteDocumentDelete",{
								text : "Delete",
								width:"80px",
								//styled:false,
								layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: true}),
								press:function(oEvent){
									var jsonSDASHM3AllDocsForDeletion = [];
									var arraySelLines = sap.ui.getCore().byId("idSDASHM3TableDeleteDocument").getSelectedIndices();
									for(var i=0; i<jsonSDASHM3AllDocs.length; i++){
			         			if(arraySelLines.indexOf(i) != -1){
			         				var oDetData = sap.ui.getCore().byId("idSDASHM3TableDeleteDocument").getContextByIndex(i);
			         				if(oDetData != undefined){
			         				var realPath = oDetData.getPath().split('/')[2];
											jsonSDASHM3AllDocsForDeletion.push({
												"name" : jsonSDASHM3AllDocs[realPath].name,
												"dispname" : jsonSDASHM3AllDocs[realPath].dispname,
												"result" : ""
											});
			         				}
			         			}
			         		}
									oCurrent.deleteDocuments(jsonSDASHM3AllDocsForDeletion);
								}}).addStyleClass("marginTop10");//.addStyleClass("excelBtn");

			var oSDASHM3ButtonDeleteDocumentClose = new sap.ui.commons.Button({
							text : "Close",
							//styled:false,
							visible:true,
							width:"80px",
							type:sap.m.ButtonType.Unstyled,
							layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: true}),
							//icon: sap.ui.core.IconPool.getIconURI("email"),
							press:function(oEvent){
								var oSDASHM3ContentThumbNail = new sdashm3().setContentThumbnail();
								sap.ui.getCore().byId("idSDASHM3ContentFinal").insertItem(oSDASHM3ContentThumbNail, 2);
								oSDASHM3PopoverDeleteDocument.close();
							}
					}).addStyleClass("marginTop10");//.addStyleClass("excelBtn");

			var oSDASHM3FlexDeleteDocumentButtons = new sap.m.FlexBox({
						items: [oSDASHM3ButtonDeleteDocumentDelete,
										new sap.ui.commons.Label( {text: " ",width : '8px'}),
										oSDASHM3ButtonDeleteDocumentClose
										],
						direction: "Row"
					});

					if(sap.ui.getCore().byId("idSDASHM3TableDeleteDocument") != undefined){
						sap.ui.getCore().byId("idSDASHM3TableDeleteDocument").destroy();
					}

					if(sap.ui.getCore().byId("idSDASHM3TableDeleteDocumentResult") != undefined){
						sap.ui.getCore().byId("idSDASHM3TableDeleteDocumentResult").destroy();
					}


			/* SDASHM3 - Table - Documents Delete */

			var oSDASHM3TableDeleteDocument = new sap.ui.table.Table("idSDASHM3TableDeleteDocument",{
		 		columnHeaderVisible : true,
		 		width: '400px',
		 		selectionMode: sap.ui.table.SelectionMode.MultiToggle
			}).addStyleClass("sapUiSizeCompact tblBorder");

			oSDASHM3TableDeleteDocument.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Name", textAlign: "Left"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView({
					 textAlign: "Left"
				 }).bindProperty("text", "dispname").addStyleClass("borderStyle1"),
		           resizable:false,
		           width:"150px"
				 }));

				 oSDASHM3TableDeleteDocument.addColumn(new sap.ui.table.Column("idSDASHM3TableDeleteDocumentResult",{
					 visible : false,
				 	 label: new sap.ui.commons.Label({text: "Result", textAlign: "Left"}).addStyleClass("wraptextcol"),
				 	 template: new sap.ui.commons.TextView({
				 		 textAlign: "Left"
				 	 }).bindProperty("text", "result").addStyleClass("borderStyle1"),
				 				 resizable:false,
				 				 width:"80px"
				 	 }));

				 jsonSDASHM3AllDocs = [];

				 for(var i=0; i<jsonSDASHM3Pictures.length;i++){
					 jsonSDASHM3AllDocs.push({
						 "name" : jsonSDASHM3Pictures[i].name,
						 "dispname" : jsonSDASHM3Pictures[i].dispname
					 });
				 }

				 for(var i=0; i<jsonSDASHM3Documents.length;i++){
					 jsonSDASHM3AllDocs.push({
						 "name" : jsonSDASHM3Documents[i].name,
						 "dispname" : jsonSDASHM3Pictures[i].dispname
					 });
				 }

				 var oSDASHM3ModelDeleteDocument = new sap.ui.model.json.JSONModel();
				 oSDASHM3ModelDeleteDocument.setData({modelData: jsonSDASHM3AllDocs});

				 oSDASHM3TableDeleteDocument.setModel(oSDASHM3ModelDeleteDocument);
				 oSDASHM3TableDeleteDocument.setVisibleRowCount(jsonSDASHM3AllDocs.length);
				 oSDASHM3TableDeleteDocument.bindRows("/modelData");

				 /* SDASHM3 - Popover - Final Content */

				 var oSDASHM3FlexDeleteDocument = new sap.m.FlexBox({
	 						items: [oSDASHM3TableDeleteDocument,
	 										new sap.ui.commons.Label( {text: " ",width : '8px'}),
	 										oSDASHM3FlexDeleteDocumentButtons
	 										],
	 						direction: "Column"
	 					});

				 /* SDASHM3 - Popover - Delete Document */

	 			oSDASHM3PopoverDeleteDocument = new sap.m.Popover({
	 		        title: "Delete Documents",
	 		          width:"550px",
	 		          modal: true,
	 		          placement: sap.m.PlacementType.Right,
	 		          content: new sap.m.VBox({
	 		                                  //width:"300px",
	 		                                  items:  [oSDASHM3FlexDeleteDocument]
	 		                                  }),

	 		          }).addStyleClass("sapUiPopupWithPadding");


	 			oSDASHM3PopoverDeleteDocument.openBy(button);

		},

		/* SDASHM3 - Function - Open Upload Documents Popup */

		openUploadDocumentsPopup : function(button){

			// Destroy elements

			if(sap.ui.getCore().byId("idSDASHM3UploaderDocument") != undefined){
				sap.ui.getCore().byId("idSDASHM3UploaderDocument").destroy();
			}

			if(sap.ui.getCore().byId("idSDASHM3UploaderDocument") != undefined){
				sap.ui.getCore().byId("idSDASHM3UploaderDocument").destroy();
			}


			if(sap.ui.getCore().byId("idSDASHM3ButtonUpload") != undefined){
				sap.ui.getCore().byId("idSDASHM3ButtonUpload").destroy();
			}


			if(sap.ui.getCore().byId("idSDASHM3ButtonReset") != undefined){
				sap.ui.getCore().byId("idSDASHM3ButtonReset").destroy();
			}


			if(sap.ui.getCore().byId("idSDASHM3TableFiles") != undefined){
				sap.ui.getCore().byId("idSDASHM3TableFiles").destroy();
			}


			if(sap.ui.getCore().byId("idSDASHM3FormTable") != undefined){
				sap.ui.getCore().byId("idSDASHM3FormTable").destroy();
			}


			if(sap.ui.getCore().byId("idSDASHM3LabelSelectFiles") != undefined){
				sap.ui.getCore().byId("idSDASHM3LabelSelectFiles").destroy();
			}


			if(sap.ui.getCore().byId("idSDASHM3FormUploadDocument") != undefined){
				sap.ui.getCore().byId("idSDASHM3FormUploadDocument").destroy();
			}


			if(sap.ui.getCore().byId("idSDASHM3FormTable") != undefined){
				sap.ui.getCore().byId("idSDASHM3FormTable").destroy();
			}

			var osdashm3doc = new sdashm3doc0();
			var oSDASHM3ContentUploadDocument = osdashm3doc.loadSDASHM3UploadDocument();



			/* SDASHM3 - Popover - Upload Document */

			oSDASHM3PopoverUploadDocument = new sap.m.Popover({
		        title: "Upload Documents",
		        width:"1300px",
		          modal: true,
		          placement: sap.m.PlacementType.Right,
		          content: new sap.m.VBox({
		                                  //width:"300px",
		                                  items:  [oSDASHM3ContentUploadDocument]
		                                  }),

		          }).addStyleClass("sapUiPopupWithPadding");


			oSDASHM3PopoverUploadDocument.openBy(button);

		},

		getSDASHM3DataUploadNew : function(){
			var oCurrent = this;
			var isFirstTimeUpload = false;

			//var oFReader = new FileReader();
			var serviceDEPDOC = "/sap/opu/odata/sap/ZMNR_DEP_DOC_SRV";
			busyDialog.open();
			var oSDASHM3UploaderDocument = sap.ui.getCore().byId("idSDASHM3UploaderDocument");
			var oSDASHM3UploaderDocumentLength = sap.ui.getCore().byId("idSDASHM3UploaderDocument").oFileUpload.files.length;

			debugger;
			var numberoffiles = sap.ui.getCore().byId("idSDASHM3UploaderDocument").oFileUpload.files.length;
			//for(var i=0; i<numberoffiles; i++){
			oSDASHM3UploaderDocument.destroyParameters();
			oSDASHM3UploaderDocument.setAdditionalData('');
			oSDASHM3UploaderDocument.removeAllHeaderParameters();
			globalFileNames = oSDASHM3UploaderDocument.getValue().replace(/"/g, '').split(' ');

				//oFReader.readAsDataURL(oFileMultiple.oFileUpload.files[0]);

				oModel = new sap.ui.model.odata.ODataModel(serviceDEPDOC, true);
				oSDASHM3UploaderDocument.removeAllHeaderParameters();
				oSDASHM3UploaderDocument.addHeaderParameter(new sap.ui.unified.FileUploaderParameter(
						{
							name : "slug",
							value : globalFileNames[0] //oSDASHM3UploaderDocument.getValue()
						}));

				oSDASHM3UploaderDocument.addHeaderParameter(new sap.ui.unified.FileUploaderParameter(
						{
							name : "x-csrf-token",
							value : oModel.getSecurityToken()
						}));
				globalFileNames.shift();

				oSDASHM3UploaderDocument.setSendXHR(true);
				//oFileMultiple.setMultiple(false);
				oSDASHM3UploaderDocument.setUseMultipart(false);
				//oFileMultiple.setMimeType("application/xlsx");

				var fileName = "HelloIS"; //oSDASHM3UploaderDocument.getParameter("fileName");//sap.ui.getCore().byId("idSDASHM3UploaderDocument").oFileUpload.files[i].name; //.split('.').pop();
				var serial = global3SerialNo;
				var depot = global3Depot;
				var estimate = global3EstimateNo;

				var runningnumber = jsonSDASHM3Pictures.length + jsonSDASHM3Documents.length;
				runningnumber = runningnumber + 1;
				runningnumber = padZero3(runningnumber,3);
				var sRead = serviceDEPDOC + "/uploadSet(Filename='" + fileName + "',Estimate='" + estimate + "',Serial='" + serial + "',Depot='" + depot + "')" + "/Attachments" ;
				oSDASHM3UploaderDocument.setUploadUrl(sRead);
				oSDASHM3UploaderDocument.upload();
				isFirstTimeUpload = false;
				oSDASHM3UploaderDocument.attachUploadComplete(function(oControllerEvent) {
								oSDASHM3UploaderDocument.removeAllHeaderParameters();
								oSDASHM3UploaderDocument.addHeaderParameter(new sap.ui.unified.FileUploaderParameter(
										{
											name : "slug",
											value : globalFileNames[0] //oSDASHM3UploaderDocument.getValue()
										}));

								oSDASHM3UploaderDocument.addHeaderParameter(new sap.ui.unified.FileUploaderParameter(
										{
											name : "x-csrf-token",
											value : oModel.getSecurityToken()
										}));
								globalFileNames.shift();
		            var statuscode = oControllerEvent.getParameter("status");
								busyDialog.close();

								if(isFirstTimeUpload == false){
									isFirstTimeUpload = true;
		            if(statuscode == '201'){
		             //oCurrent.filesUpload(filenum);
		            	sap.ui.commons.MessageBox.show("Files uploaded");
		            }else{
		            	sap.ui.commons.MessageBox.show("Errors in file upload");
		            }
								}
		        });
				//	}

		},

		/* SDASHM3 - Function - Data Upload */

		getSDASHM3DataUpload: function(){

				try{
					function padZero(num, size) {
					    var s = num+"";
					    while (s.length < size) s = "0" + s;
					    return s;
					}

					var oSDASHM3UploaderDocument = sap.ui.getCore().byId("idSDASHM3UploaderDocument");
					if((oSDASHM3UploaderDocument.getValue() == '') || (oSDASHM3UploaderDocument.oFilePath.getValue() == ''))
					{
						sap.ui.commons.MessageBox.alert("File input missing." + "\n Please check your inputs and retry." );
						return false;
					}
					jsonSDASHM3DocumentsUploadStatus.length = 0;	//RESET FOR UPLOAD FILE
					busyDialog.open();
					oSDASHM3UploaderDocument.destroyParameters();
					oSDASHM3UploaderDocument.setAdditionalData('');
					var oSDASHM3Doc = new sdashm3doc();
					oSDASHM3Doc.makeSDASHM3Binary();

					var osdashm3 = new sdashm3();
					var oSDASHM3ContentThumbNail = osdashm3.setContentThumbnail();
					sap.ui.getCore().byId("idSDASHM3ContentFinal").insertItem(oSDASHM3ContentThumbNail, 2);
					sap.ui.getCore().byId("idSDASHM3PanelCarousel").setExpanded(true);

				}catch(e){
					busyDialog.close();
					sap.ui.commons.MessageBox.alert("Error on uploading file " + e);
				}
			},

			/* SDASHM3 - Function - Loading Tables */

			loadSDASHM3UploadDocument : function() {

				jQuery.sap.require("sap.ui.commons.MessageBox");

				function fnResetCallbackMsgBox(sResult){
					if(sResult == "YES"){
						var oSDASHM3TableFiles = sap.ui.getCore().byId("idSDASHM3TableFiles");
						if (oSDASHM3TableFiles != undefined) {
							oSDASHM3TableFiles.destroy();
						}

						var oUpldSnglCertificate  = sap.ui.getCore().byId("idSDASHM3UploaderDocument");
						oUpldSnglCertificate.setValue('');
						oUpldSnglCertificate.oFilePath.setValue('');
					}
				};


				// SDASHM3 - Flex - Buttons

				var oSDASHM3ButtonUpload = new sap.ui.commons.Button("idSDASHM3ButtonUpload", {
							text : "Upload",
							width:"80px",
							//styled:false,
							layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: true}),
							press : this.getSDASHM3DataUploadNew
						}).addStyleClass("marginTop10");//.addStyleClass("excelBtn");

				var ResetMessage = "This will clear the screen content.\n Do you want to continue?";

				var oSDASHM3ButtonReset = new sap.ui.commons.Button("idSDASHM3ButtonReset",{
				          text : "Reset",
				          width:"80px",
				          //styled:false,
				          layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: true}),
				          press:function(){
				        	  			sap.ui.commons.MessageBox.show(ResetMessage,sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
				        		  		[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
				        		  		fnResetCallbackMsgBox, sap.ui.commons.MessageBox.Action.YES);
				          }}).addStyleClass("marginTop10");//.addStyleClass("excelBtn");

				var oSDASHM3ButtonClose = new sap.ui.commons.Button({
		            text : "Close",
		            //styled:false,
		            visible:true,
		            width:"80px",
		            type:sap.m.ButtonType.Unstyled,
		            layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: true}),
		            //icon: sap.ui.core.IconPool.getIconURI("email"),
		            press:function(oEvent){
									var oSDASHM3ContentThumbNail = new sdashm3().setContentThumbnail();
									sap.ui.getCore().byId("idSDASHM3ContentFinal").insertItem(oSDASHM3ContentThumbNail, 2);
		            	oSDASHM3PopoverUploadDocument.close();
		            }
		        }).addStyleClass("marginTop10");//.addStyleClass("excelBtn");

				var oSDASHM3FlexButtons = new sap.m.FlexBox({
				      items: [oSDASHM3ButtonUpload,
				              new sap.ui.commons.Label( {text: " ",width : '8px'}),
				              oSDASHM3ButtonReset,
				              new sap.ui.commons.Label( {text: " ",width : '8px'}),
				              oSDASHM3ButtonClose],
				      direction: "Row"
				    });

			   // SDASHM3 - Flex - Required
		       var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
		       var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
				  var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
				  var oSDASHM3FlexRequired = new sap.m.FlexBox({
					 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
		              items: [labStar,lblSpaceLegend,labRequired],
		              direction: "Row"
				  }).addStyleClass("marginTop10");

				var oSDASHM3FormUploadDocumentLayout = new sap.ui.layout.form.ResponsiveGridLayout({breakpointL: 700,
							  breakpointM: 400});

				var numberoffilex = 0;
				var oSDASHM3UploaderDocument = new sap.m.UploadCollection("idSDASHM3UploaderDocument",{
							//name : "uploadfileData",
							uploadUrl : "/sap/opu/odata/sap/ZMNR_DEP_DOC_SRV/uploadSet",
							value : "",
							multiple : true,
							buttonText : " Browse ",
							instantUpload : true,
							layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: true}),
							sameFilenameAllowed : false,
							uploadStart : function(oEvent){
								debugger;
							},
							beforeUploadStarts : function(oEvent){
								debugger;
								var oCustomerHeaderSlug = new sap.m.UploadCollectionParameter({
										name : "slug",
										value : oEvent.getParameter("fileName")
									},{
										name : "Pernr",
										values : "00000009"
									});
									oEvent.getParameters().addHeaderParameter(oCustomerHeaderSlug);
							},
							change : function(oEvent) {

								var oUploadCollection = oEvent.getSource();
								var oCustomerHeaderToken = new sap.m.UploadCollectionParameter({
									name : "x-csrf-token",
									value :  oModel.getSecurityToken()
								});
								oUploadCollection.addHeaderParameter(oCustomerHeaderToken);

								// Get File name
							/*	numberoffilex = numberoffilex + 1;
								var filename = oEvent.getParameter("files")[numberoffilex].name;
								var oCustomerHeaderToken = new sap.m.UploadCollectionParameter({
									name : "slug",
									value :  filename
								});
								oUploadCollection.addHeaderParameter(oCustomerHeaderToken);*/

								// Set Values to form file name in backend
								var serial = global3SerialNo;
								var depot = global3Depot;
								var estimate = global3EstimateNo;
								oUploadCollection.setUploadUrl("/sap/opu/odata/sap/ZMNR_DEP_DOC_SRV/uploadSet(Filename='" + serial +
								"',Estimate='" + estimate +
								"',Serial='" + serial +
								"',Depot='" + depot + "')" + "/Attachments");


							},
							uploadComplete : function(oEventData){
								numberoffilex = 0;
								return;

								var id = oEventData.mParameters.id

								var oData = oEventData.getParameters();

								var dataItem = new Object();

								var fileupload = sap.ui.getCore().byId(id);

								if(oData != undefined)

								{

									dataItem.filename= oData.getParameter("fileName");

// 								  dataItem.documentId=oData.d.Docid;

// 								  dataItem.url=oData.d.__metadata.media_src;

// 								  dataItem.mimeType = oData.d.Contenttype;

								  fileupload.commitFileUpload(dataItem);

								}

								else

								{

								fileupload.abortUpload();

								  sap.m.MessageBox.show("File Upload error", sap.m.MessageBox.Icon.ERROR,"Error");

								return;

								}

								},
						});
						var oSDASHM3UploaderDocumentData = [];
						// oSDASHM3UploaderDocumentData.push({
						// 	enableDelete : false,
						// 	enableRename : false
						// });
						var oSDASHM3UploaderDocumentModel = new sap.ui.model.json.JSONModel();
						oSDASHM3UploaderDocumentModel.setData({modelData: oSDASHM3UploaderDocumentData});

						oSDASHM3UploaderDocument.setModel(oSDASHM3UploaderDocumentModel);
						oSDASHM3UploaderDocument.bindAggregation("items", "/modelData", new sap.m.UploadCollectionItem({
							visibleEdit : false,
							visibleDelete : false,
						  enableEdit : false,
							enableDelete : false
						}));

				// oUploadMultipleCertificate.setAttribute('Multiple','true');
				// oUpldSnglCertificate.setUseMultipart(true);
				// Create a ComboBox
				var oSDASHM3LabelSelectFiles =new sap.ui.commons.Label("idSDASHM3LabelSelectFiles", {text: "Select Files for Uploading: ",
					required:true}).addStyleClass("sapUiLbl floatLeft");

				var oSDASHM3FormUploadDocument = new sap.ui.layout.form.Form(
						"idSDASHM3FormUploadDocument",
						{
							layout : oSDASHM3FormUploadDocumentLayout,
							formContainers : [
									new sap.ui.layout.form.FormContainer(
											"SelFileUpldMultCert",
											{
												formElements : [
														new sap.ui.layout.form.FormElement(
																{
																	//label : oLblSelFile,
																fields : [ oSDASHM3LabelSelectFiles ],
																layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																}),
																new sap.ui.layout.form.FormElement(
																		{
																			label : "",
																		}),
														new sap.ui.layout.form.FormElement(
																{
																	fields : [oSDASHM3UploaderDocument],	//oSDASHM3UploaderDocument
																	layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																}),
																new sap.ui.layout.form.FormElement(
																		{
																			label : "",
																		}),
														new sap.ui.layout.form.FormElement("idSDASHM3FormTable",
																{
																	fields : [],
																	layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																}),
														new sap.ui.layout.form.FormElement(
																{
																	label : "",
																}),
														new sap.ui.layout.form.FormElement(
																{
																	fields : [ oSDASHM3FlexButtons ],
																	layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																}),
														new sap.ui.layout.form.FormElement(
																{
																	fields : [ oSDASHM3FlexRequired ],
																	layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																}),
														new sap.ui.layout.form.FormElement(
																{
																	fields : [new sap.ui.commons.Label({text: "Support Format: pdf, doc, docx, png, jpg, jpeg, txt, xls, xlsx"}).addStyleClass("font11 WarningMessage")],
																	layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																})
																]
											}) ]
						});

				return oSDASHM3FormUploadDocument;
			},

			/* SDASHM3 - Function - To Check all the files are converted */
			loadSDASHM3CheckCoversion : function (){
				var oSDASHM3CheckConverted = true;
				if(jsonSDASHM3DocumentsUploadStatus.length>0){
					for(var k=0; k < jsonSDASHM3DocumentsUploadStatus.length; k++){
						if((jsonSDASHM3DocumentsUploadStatus[k].status == "PENDING") || (jsonSDASHM3DocumentsUploadStatus[k].status == "FAILED")
								|| (jsonSDASHM3DocumentsUploadStatus[k].status == "START"))
							oSDASHM3CheckConverted = false;
					}
				}
				return oSDASHM3CheckConverted;
			},

			/* SDASHM3 - Function - To Check exists already */
			loadSDASHM3ExistsAlready : function (uploaderFileName){
				for(var j=0; j <jsonSDASHM3DocumentsUploadStatus.length;j++){
					if(jsonSDASHM3DocumentsUploadStatus[j].fileSelName == uploaderFileName){
						return false;
						break;
					}
				}
				return true;
			},

			/* SDASHM3 - Function - Make JSON Binary Data */
			makeSDASHM3Binary: function(){
				function padZero(num, size) {
				    var s = num+"";
				    while (s.length < size) s = "0" + s;
				    return s;
				};

				var oSDASHM3UploaderDocument = sap.ui.getCore().byId("idSDASHM3UploaderDocument");

				for(var i = 0; i< oSDASHM3UploaderDocument.oFileUpload.files.length; i++){
					var fileext = oSDASHM3UploaderDocument.oFileUpload.files[i].name.split('.');
					var fileextlength = fileext.length - 1;
					var fileextreal = fileext[fileextlength];

					var retnVal = true;

					if(jsonSDASHM3DocumentsUploadStatus.length > 0)
						retnVal = this.loadSDASHM3ExistsAlready(oSDASHM3UploaderDocument.oFileUpload.files[i].name);

					if(!retnVal){
						continue;
					}
					jsonSDASHM3DocumentsUploadStatus.push({
						'lineno': padZero(i+1,2) ,
						'fileSelName': oSDASHM3UploaderDocument.oFileUpload.files[i].name ,
						"binarydata" : "",
						"status" : 'PENDING'
					});

					var oFReader = new FileReader();
					//oFReader.readAsDataURL(oSDASHM3UploaderDocument.oFileUpload.files[i]);
					oFReader.readAsBinaryString(oSDASHM3UploaderDocument.oFileUpload.files[i]);

					oFReader.onload = function (oFREvent) {
						 var binaryString = oFREvent.target.result;
						jsonSDASHM3DocumentsUploadStatus[i].status = "SUCCESS";
					  jsonSDASHM3DocumentsUploadStatus[i].binarydata = btoa(binaryString);//oFReader.result;//.substring(28); //oSDASHM3UploaderDocument.oFileUpload.files[i].name +'-data-' +oFReader.result.substring(28);

						var oCurnFile = new sdashm3doc0();
						oCurnFile.makeSDASHM3Binary();
					},
					oFReader.onerror = function (err){
						jsonSDASHM3DocumentsUploadStatus[i].status = "FAILED";
					};
					break;
				}

				//CALL ONLINE PUT ODATA REQUEST
				if(this.loadSDASHM3CheckCoversion()){

					var IFilename1='', IFilename2 ='', IFilename3 ='', IFilename4 ='', IFilename5 ='',	binaryDataArry = [];
					for(var i =0; i < jsonSDASHM3DocumentsUploadStatus.length; i++){
						if(i<5){
							IFilename1 +=	jsonSDASHM3DocumentsUploadStatus[i].fileSelName + '|';
						}else if(i < 10){
							IFilename2 +=  jsonSDASHM3DocumentsUploadStatus[i].fileSelName + '|';
						}else if(i < 15){
							IFilename3 +=  jsonSDASHM3DocumentsUploadStatus[i].fileSelName + '|';
						}else if(i < 20){
							IFilename4 +=  jsonSDASHM3DocumentsUploadStatus[i].fileSelName + '|';
						}else if(i < 25){
							IFilename5 +=  jsonSDASHM3DocumentsUploadStatus[i].fileSelName + '|';
						}

						binaryDataArry.push({
							"File": jsonSDASHM3DocumentsUploadStatus[i].binarydata
						});
					};

					for(var j=binaryDataArry.length;j< 25;j++){
						binaryDataArry.push({
							"File": ""
						});
					};

					var oDataPostParam = {
			    			Id : "1",

			    			ISerial : global3SerialNo,
			    			IAufnr : global3EstimateNo,
			    			IDepot : global3Depot,


			    			IFilename1 : IFilename1,
			    			IFilename2 : IFilename2,
			    			IFilename3 : IFilename3,
			    			IFilename4 : IFilename4,
			    			IFilename5 : IFilename5,

			    			IFile1 : binaryDataArry[0].File,
			    			IFile2 : binaryDataArry[1].File,
			    			IFile3 : binaryDataArry[2].File,
			    			IFile4 : binaryDataArry[3].File,
			    			IFile5 : binaryDataArry[4].File,

			    			IFile6 : binaryDataArry[5].File,
			    			IFile7 : binaryDataArry[6].File,
			    			IFile8 : binaryDataArry[7].File,
			    			IFile9 : binaryDataArry[8].File,
			    			IFile10 : binaryDataArry[9].File,


			    			IFile11 : binaryDataArry[10].File,
			    			IFile12 : binaryDataArry[11].File,
			    			IFile13 : binaryDataArry[12].File,
			    			IFile14 : binaryDataArry[13].File,
			    			IFile15 : binaryDataArry[14].File,


			    			IFile16 : binaryDataArry[15].File,
			    			IFile17 : binaryDataArry[16].File,
			    			IFile18 : binaryDataArry[17].File,
			    			IFile19 : binaryDataArry[18].File,
			    			IFile20 : binaryDataArry[19].File,


			    			IFile21 : binaryDataArry[20].File,
			    			IFile22 : binaryDataArry[21].File,
			    			IFile23 : binaryDataArry[22].File,
			    			IFile24 : binaryDataArry[23].File,
			    			IFile25 : binaryDataArry[24].File,
		                 };

					var urlToCall = serviceDEP + "picuploadSet('1')";
					var objCurnt = new sdashm3doc0();
					var objUtil = new utility();
				    objUtil.doOnlinePostData(urlToCall, oDataPostParam, objCurnt.successSDASHM3Upload, objCurnt.errorSDASHM3Upload);
				}
			},

		/* SDASHM3 - Function - Success After Upload */
		successSDASHM3Upload : function(resultdata, response){
				//busyDialog.close();
				busyDialog.close();
				try{
					if(response != undefined){
						if(response.statusCode == '204'){
							var oSDASHM3UploaderDocument = sap.ui.getCore().byId("idSDASHM3UploaderDocument");
							oSDASHM3UploaderDocument.setValue('');
							oSDASHM3UploaderDocument.oFilePath.setValue('');
							oSDASHM3UploaderDocument.destroyParameters();
							oSDASHM3UploaderDocument.setAdditionalData('');

							var oSDASHM3TableFiles = sap.ui.getCore().byId("idSDASHM3TableFiles");
							if (oSDASHM3TableFiles != undefined) {
								oSDASHM3TableFiles.destroy();
							}

							sap.ui.commons.MessageBox.alert("Files uploaded successfully.");
						}else{
							sap.ui.commons.MessageBox.alert("Upload failed.\n Please make the required changes before retrying" );
						}
					}else{
						sap.ui.commons.MessageBox.alert("Upload failed.\n Please make the required changes before retrying");
					}
				}catch(e){
					busyDialog.close();
					sap.ui.commons.MessageBox.alert("Upload failed due to - " + e + ".\n Please make the required changes before retrying");
				}
		},

		/* SDASHM3 - Function - Error After Upload */
		errorSDASHM3Upload: function(err){
			sap.ui.commons.MessageBox.alert("Error Uploading Files!");
		},

		/* SDASHM3 - Function - Create Table Selected File Upload */

		createSDASHM3DocTable : function(oEvent) {

			var vFilePath = "";
			var objutil = new utility();
			jsonSDASHM3Docs = [];
			jsonSDASHM3Docs =	objutil.uploadFileChange(oEvent,"sdashm3doc", vFilePath);

			var oSDASHM3TableFiles = sap.ui.getCore().byId("idSDASHM3TableFiles");

			if (oSDASHM3TableFiles != undefined) {
				oSDASHM3TableFiles.destroy();
			}

			var oSDASHM3TableFiles = new sap.ui.table.Table(
					'idSDASHM3TableFiles',
					{
						visibleRowCount: 0,
						firstVisibleRow : 3,
						columnHeaderHeight : 30,
						selectionMode : sap.ui.table.SelectionMode.None,
						navigationMode : sap.ui.table.NavigationMode.None,
						//layoutData: new sap.ui.layout.GridData({span: "L7 M10 S12",linebreak: true, margin: false}),
						width : "300px",
					}).addStyleClass('tblBorder');



			// Define the columns and the control templates to be
			// used
			oSDASHM3TableFiles.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({
					text : "Files Selected"
				}),
				template : new sap.ui.commons.TextView()
						.bindProperty("text", "newfilename"),
				hAlign : "Center"
			}));

			// Create a model and bind the table rows to this model
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				modelData : jsonSDASHM3Docs
			});
			oSDASHM3TableFiles.setModel(oModel);
			oSDASHM3TableFiles.bindRows("/modelData");
			oSDASHM3TableFiles.setVisibleRowCount(jsonSDASHM3Docs.length);

			return oSDASHM3TableFiles;
		}
});

function padZero3(num, size) {
		    var s = num+"";
		    while (s.length < size) s = "0" + s;
		    return s;
};
