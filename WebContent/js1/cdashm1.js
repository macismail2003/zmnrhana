jQuery.sap.require("sap.ui.model.json.JSONModel");

sap.ui.model.json.JSONModel.extend("cdashm1", {
	
	/* CDASHM1 - Page - Customer Dashboard page 1 */
	createCDASHM1Page : function(){		
		jQuery.sap.require("sap.ui.core.IconPool");
		var oCurrent = this;
		
		/* CDASHM1 - Section - Alert and Search Buttons */
		
		var oCDASHM1ContentAlertSearchButtons = oCurrent.setContentAlertSearchButtons(); 
		
		/* CDASHM1 - Section - Pending Approval */
		
		var oCDASHM1ContentPendingApproval = oCurrent.setContentPendingApproval();    	
    	
		/* CDASHM1 - Section - Estimates Approved */
		
		var oCDASHM1ContentEstimatesApproved = oCurrent.setContentEstimatesApproved(); 
    	
		/* CDASHM1 - Flexbox - Final */
	   	 
		var oCDASHM1ContentFinal = new sap.m.FlexBox({
		         items: [
						oCDASHM1ContentAlertSearchButtons,
						new sap.ui.commons.Label({
							text : "",
							width : "100px"
						}),
		                oCDASHM1ContentPendingApproval,
						new sap.ui.commons.Label({
							text : "",
							width : "100px"
						}),
						oCDASHM1ContentEstimatesApproved
		       ],
		       direction : "Column",
		       visible: true,
		}).addStyleClass("marginLeft20");
		
		return oCDASHM1ContentFinal;
		
	},
	
	/* CDASHM1 - Section - Alert and Search Buttons */
	
	setContentAlertSearchButtons : function(){
		
		/* CDASHM1 - Input - Search  */
		
        var oCDASHM1InputSearch = new sap.m.SearchField("idCDASHM1InputSearch", {
					                    width: "200px",
					                    placeholder: "Unit or Estimate #",	
					                    });
        
        /* CDASHM1 - Button - Setup  */
        
        var oCDASHM1ButtonAlert = new sap.ui.commons.Button("idCDASHM1ButtonAlert",{
	          text : "Setup Alert",
	          styled:false,
	          type:sap.m.ButtonType.Unstyled,
	          //icon: sap.ui.core.IconPool.getIconURI("email"),
	          press:function(){

	          }
		}).addStyleClass("excelBtn marginTop10 floatRight");
        
        /* CDASHM1 - Flexbox - Alert and Search Buttons */
	   	 
		var oCDASHM1FlexAlertSearchButtons = new sap.m.FlexBox({
				 justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
		         items: [
		                oCDASHM1InputSearch,
		                oCDASHM1ButtonAlert
		       ],
		       //direction : "RowReverse",
		       visible: true,
		}).addStyleClass("marginLeft20");
		
		return oCDASHM1FlexAlertSearchButtons;
		
	},
	
	/* CDASHM1 - Section - Estimates Approved */
	
	setContentEstimatesApproved : function(){
		
		var oCurrent = this;
		/* CDASHM1 - Label - Estimates Approved */
		
		var oCDASHM1LabelEstimatesApproved = new sap.ui.commons.Label({
            text: "Estimates Approved",
        }).addStyleClass("fontTitle");
        
		/* CDASHM1 - Button - Estimates Approved Export to Excel */
		
		var oCDASHM1ButtonEstimatesApprovedExport = new sap.ui.commons.Button("idCDASHM1ButtonEstimatesApprovedExport",{
	          text : "",
	          styled:false,
	          type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	  var oUtility = new utility();
	        	  //oUtility.makeHTMLTable(oCDASHMJsonEstimatesApproved, "Returns","export");
	          }
		}).addStyleClass("excelBtn marginTop10 floatRight");
		
		/* CDASHM1 - Flexbox - Estimates Approved Title */
	   	 
		var oCDASHM1FlexEstimatesApprovedTitle = new sap.m.FlexBox({
				 justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
		         items: [
		                oCDASHM1LabelEstimatesApproved,
						oCDASHM1ButtonEstimatesApprovedExport
		       ],
		       //direction : "RowReverse",
		       visible: true,
		});
		
		
		
		/* CDASHM1 - Page - Customer Dashboard page 1 */
		
    	var oCDASHM1TableEstimatesApproved = new sap.ui.table.Table("idCDASHM1TableEstimatesApproved",{
    		visibleRowCount: 10,
            firstVisibleRow: 3,
            fixedColumnCount: 5,
            columnHeaderHeight: 40,
            enableColumnReordering : false,
            width: '98%',
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
    	 }).addStyleClass("tblBorder");
    	
    	
    	oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.CheckBox("idCDASHM1TableEstimatesApprovedColumnCheckBox",{
                change : function(){
                	oCurrent.estimatesApprovedSelectAll();
                }
               }),
    		template: new sap.ui.commons.CheckBox({
      			 change : function() {
      				 if(this.getChecked() == false){
      					//sap.ui.getCore().byId("idCBSelectAllRows").setChecked(false);
      					checkedLengthLAM--;
      				 }
      				 else{
      					checkedLengthLAM++;
      				 }
      			 }
    		}).bindProperty("checked", "isChecked"),
           	width:"28px",
           	resizable:false,
           	flexible: true,
           	//autoResizable: true,
           	//width : 'auto'
           	//sortProperty: "isChecked",
           	//filterProperty : "isChecked",
           	}));
    	
    	oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: ""}),
			 template: new sap.ui.commons.Image({
				 width : "20px",
				 //height : "30px"
			 }).bindProperty("src", "image").addStyleClass("borderStyle1"),
	           //resizable:false,
	           width:"40px",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
	           //sortProperty: "isChecked",
	           //filterProperty : "isChecked",
			 }));
    	
    	oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Estimate #"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "estimateno").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"100px",
	           sortProperty: "estimateno",
	           filterProperty : "estimateno",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));
    	
    	oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Est. Type"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "estimatetype").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"100px",
	           sortProperty: "estimatetype",
	           filterProperty : "estimatetype",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));
    	
    	oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Depot #"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "depotcode").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"70px",
	           sortProperty: "depotcode",
	           filterProperty : "depotcode",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));
    	
    	oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Depot Name"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "depotname").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"140px",
	           sortProperty: "depotname",
	           filterProperty : "depotname",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));
    	
    	oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Material"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "materialcode").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"100px",
	           sortProperty: "materialcode",
	           filterProperty : "materialcode",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));
    	
    	oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Unit #"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "unitnumber").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"80px",
	           sortProperty: "unitnumber",
	           filterProperty : "unitnumber",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));
    	
    	oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "User Cost", textAlign : sap.ui.core.TextAlign.Right}),
			 template: new sap.ui.commons.TextView({
				 textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("text", "usercost").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"70px",
	           sortProperty: "usercost",
	           filterProperty : "usercost",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));
    	
    	oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Curr."}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "costcurrency").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"40px",
	           sortProperty: "costcurrency",
	           filterProperty : "costcurrency",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));
    	
    	oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Off-Hire Location"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "offhirelocation").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"120px",
	           sortProperty: "offhirelocation",
	           filterProperty : "offhirelocation",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));
    	
    	oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Submission Date"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "datesubmitted").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"70px",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));
    	
    	oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Status"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "status").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"120px",
	           sortProperty: "status",
	           filterProperty : "status",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));
    	
    	oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Last Action"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "lastaction").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"120px",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));
    	
    	/*oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: ""}),
			 template: new sap.ui.commons.Link({
			 enabled:true,
			 }).bindProperty("text", "approve").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"80px"
			 }));*/
    	
    	oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
    		 visible : false,
	   		 label: new sap.ui.commons.Label({text: ""}),
			 template: new sap.ui.commons.Button({
			 enabled:true,
			 }).bindProperty("text", "downloadestimate").addStyleClass("submitBtn borderStyle1"),
	           resizable:false,
	           width:"180px",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));
    	
    	
    	/* CDASHM1 - Button - Estimates Approved Approve */
    	
	   	 var oCDASHM1ButtonEstimatesApprovedApprove = new sap.ui.commons.Button("idCDASHM1ButtonEstimatesApprovedApprove",{
	          text : "Approve",
	          //icon: sap.ui.core.IconPool.getIconURI("complete"),
	          //width:"140px",
	          styled:false,
	          visible:false,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  //oCurrLAM.validateLesseeApprovalMultiple();
	          }}).addStyleClass("submitBtn marginTop20");
	   	 
	   	/* CDASHM1 - Button - Estimates Approved Download Estimates */
	    	
	   	 var oCDASHM1ButtonEstimatesApprovedDownload = new sap.ui.commons.Button("idCDASHM1ButtonEstimatesApprovedDownload",{
	          text : "Download",
	          //icon: sap.ui.core.IconPool.getIconURI("download"),
	          //width:"140px",
	          styled:false,
	          visible:true,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  //oCurrLAM.validateLesseeApprovalMultiple();
	          }}).addStyleClass("submitBtn marginTop20");
	   	 
	   	 
	   	/* CDASHM1 - Flexbox - Estimates Approved Buttons */
	   	 
			var oCDASHM1FlexEstimatesApprovedButtons = new sap.m.FlexBox({
			         items: [
							new sap.ui.commons.Label({
								text : "",
								width : "25px"
							}),
							/*oCDASHM1ButtonEstimatesApprovedApprove,
							new sap.ui.commons.Label({
								text : "",
								width : "15px"
							}),*/
							oCDASHM1ButtonEstimatesApprovedDownload
			       ],
			       direction : "Row",
			       visible: true,
					});
	   	 
			/* CDASHM1 - Flexbox - Estimates Approved */
		   	 
			var oCDASHM1FlexEstimatesApproved = new sap.m.FlexBox({
			         items: [
			                oCDASHM1FlexEstimatesApprovedTitle,
							new sap.ui.commons.Label({
								text : "",
								width : "100px"
							}),
							oCDASHM1TableEstimatesApproved,
							new sap.ui.commons.Label({
								text : "",
								width : "100px"
							}),
							oCDASHM1FlexEstimatesApprovedButtons
			       ],
			       direction : "Column",
			       visible: true,
			}).addStyleClass("marginLeft20");
			
	   	 
    	return oCDASHM1FlexEstimatesApproved;
    	
	},
	
	/* CDASHM1 - Section - Pending Approval */
	
	setContentPendingApproval : function(){
		
		var oCurrent = this;
		
		/* CDASHM1 - Label - Pending Estimates */
		
		var oCDASHM1LabelPendingApproval = new sap.ui.commons.Label({
            text: "Pending Estimates for Approval",
        }).addStyleClass("fontTitle");
        
		/* CDASHM1 - Button - Pending Estimates Export to Excel */
		
		var oCDASHM1ButtonPendingApprovalExport = new sap.ui.commons.Button("idCDASHM1ButtonPendingApprovalExport",{
	          text : "",
	          styled:false,
	          type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	  var oUtility = new utility();
	        	  //oUtility.makeHTMLTable(oCDASHMJsonPendingApproval, "Returns","export");
	          }
		}).addStyleClass("excelBtn marginTop10 floatRight");
		
		/* CDASHM1 - Flexbox - Pending Estimates Title */
	   	 
		var oCDASHM1FlexPendingApprovalTitle = new sap.m.FlexBox({
				 justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
		         items: [
		                oCDASHM1LabelPendingApproval,
						oCDASHM1ButtonPendingApprovalExport
		       ],
		       direction : "Row",
		       visible: true,
		});
		
		
		/* CDASHM1 - Table - Pending Approval */
		
    	var oCDASHM1TablePendingApproval = new sap.ui.table.Table("idCDASHM1TablePendingApproval",{
    		visibleRowCount: 10,
            firstVisibleRow: 3,
            fixedColumnCount: 5,
            columnHeaderHeight: 40,
            enableColumnReordering : false,
            width: '98%',
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            filter : function(oColumn, sValue){
            	debugger;
            },
            enableCustomFilter : false,
            enableCellFilter : true,
            customFilter : function(oEvent){
            	debugger;
            }
    	 }).addStyleClass("tblBorder");
    	
    	
    	oCDASHM1TablePendingApproval.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.CheckBox("idCDASHM1TablePendingApprovalColumnCheckBox",{
                change : function(){
                	oCurrent.pendingApprovalSelectAll();
                }
               }),
    		template: new sap.ui.commons.CheckBox({
      			 change : function() {
      				 if(this.getChecked() == false){
      					//sap.ui.getCore().byId("idCBSelectAllRows").setChecked(false);
      					checkedLengthLAM--;
      				 }
      				 else{
      					checkedLengthLAM++;
      				 }
      			 }
    		}).bindProperty("checked", "isChecked"),
           	width:"28px",
           	resizable:false,
           	//hAlign: "Center"
           	}));
    	
    	oCDASHM1TablePendingApproval.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: ""}),
			 template: new sap.ui.commons.Image({
				 width : "20px",
				 //height : "30px"
			 }).bindProperty("src", "image").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"40px"
			 }));
    	
    	oCDASHM1TablePendingApproval.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Estimate #"}), //textAlign : sap.ui.core.TextAlign.Center}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "estimateno").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"100px",
	           sortProperty: "estimateno",
	           filterProperty : "estimateno",
			 }));
    	
    	oCDASHM1TablePendingApproval.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Est. Type"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "estimatetype").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"100px",
	           sortProperty: "estimatetype",
	           filterProperty : "estimatetype",
			 }));
    	
    	oCDASHM1TablePendingApproval.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Depot #"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "depotcode").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"70px",
	           sortProperty: "depotcode",
	           filterProperty : "depotcode",
			 }));
    	
    	oCDASHM1TablePendingApproval.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Depot Name"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "depotname").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"140px",
	           sortProperty: "depotname",
	           filterProperty : "depotname",
			 }));
    	
    	oCDASHM1TablePendingApproval.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Material"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "materialcode").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"100px",
	           sortProperty: "materialcode",
	           filterProperty : "materialcode",
			 }));
    	
    	oCDASHM1TablePendingApproval.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Unit #"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "unitnumber").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"80px",
	           sortProperty: "unitnumber",
	           filterProperty : "unitnumber",
			 }));
    	
    	oCDASHM1TablePendingApproval.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "User Cost", textAlign : sap.ui.core.TextAlign.Right}),
			 template: new sap.ui.commons.TextView({
				 textAlign : sap.ui.core.TextAlign.Right
			 }).bindProperty("text", "usercost").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"70px",
	           sortProperty: "usercost",
	           filterProperty : "usercost",
			 }));
    	
    	oCDASHM1TablePendingApproval.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Curr."}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "costcurrency").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"40px",
	           sortProperty: "costcurrency",
	           filterProperty : "costcurrency",
			 }));
    	
    	oCDASHM1TablePendingApproval.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Off-Hire Location"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "offhirelocation").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"120px",
	           sortProperty: "offhirelocation",
	           filterProperty : "offhirelocation",
			 }));
    	
    	oCDASHM1TablePendingApproval.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Submission Date"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "datesubmitted").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"70px"
			 }));
    	
    	oCDASHM1TablePendingApproval.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Status"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "status").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"120px",
	           wrapping : true,
	           sortProperty: "status",
	           filterProperty : "status",
			 }));
    	
    	oCDASHM1TablePendingApproval.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Last Action"}),
			 template: new sap.ui.commons.TextView({
			 enabled:false,
			 }).bindProperty("text", "lastaction").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"120px"
			 }));
    	
    	oCDASHM1TablePendingApproval.addColumn(new sap.ui.table.Column({
    		 visible : false,
	   		 label: new sap.ui.commons.Label({text: ""}),
			 template: new sap.ui.commons.Button({
			 enabled:true,
			 }).bindProperty("text", "approve").addStyleClass("submitBtn borderStyle1"),
	           resizable:false,
	           width:"80px"
			 }));
    	
    	oCDASHM1TablePendingApproval.addColumn(new sap.ui.table.Column({
    		visible : false,
	   		 label: new sap.ui.commons.Label({text: ""}),
			 template: new sap.ui.commons.Button({
			 enabled:true,
			 }).bindProperty("text", "downloadestimate").addStyleClass("submitBtn borderStyle1"),
	           resizable:false,
	           width:"180px"
			 }));
    	
    	
    	/* CDASHM1 - Button - Approve */
    	
	   	 var oCDASHM1ButtonPendingApprovalApprove = new sap.ui.commons.Button("idCDASHM1ButtonPendingApprovalApprove",{
	   		  text : "Approve",
	   		 // icon: sap.ui.core.IconPool.getIconURI("complete"),
	          width:"140px",
	          styled:false,
	          visible:true,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  //oCurrLAM.validateLesseeApprovalMultiple();
	          }}).addStyleClass("submitBtn marginTop20");
	   	 
	   	/* CDASHM1 - Button - Download Estimates */
	    	
	   	 var oCDASHM1ButtonPendingApprovalDownload = new sap.ui.commons.Button("idCDASHM1ButtonPendingApprovalDownload",{
	          text : "Download",
	         // icon: sap.ui.core.IconPool.getIconURI("download"),
	          //width:"140px",
	          styled:false,
	          visible:true,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  //oCurrLAM.validateLesseeApprovalMultiple();
	          }}).addStyleClass("submitBtn marginTop20");
	   	 
	   	 
	   	/* CDASHM1 - Flexbox - Buttons */
	   	 
			var oCDASHM1FlexPendingApprovalButtons = new sap.m.FlexBox({
			         items: [
							new sap.ui.commons.Label({
								text : "",
								width : "25px"
							}),
							oCDASHM1ButtonPendingApprovalApprove,
							new sap.ui.commons.Label({
								text : "",
								width : "15px"
							}),
							oCDASHM1ButtonPendingApprovalDownload
			       ],
			       direction : "Row",
			       visible: true,
					});
	   	 
			/* CDASHM1 - Flexbox - Pending Approval */
		   	 
			var oCDASHM1FlexPendingApproval = new sap.m.FlexBox({
			         items: [
			                oCDASHM1FlexPendingApprovalTitle,
							new sap.ui.commons.Label({
								text : "",
								width : "100px"
							}),
							oCDASHM1TablePendingApproval,
							new sap.ui.commons.Label({
								text : "",
								width : "100px"
							}),
							oCDASHM1FlexPendingApprovalButtons
			       ],
			       direction : "Column",
			       visible: true,
			}).addStyleClass("marginLeft20");
			
	   	 
    	return oCDASHM1FlexPendingApproval;
    	
	},
	
	/* CDASHM1 - Function - Get 6 Series Customers and Estimates */
	
	getCDASHM16SeriesAndEstimates : function(){
		
		var custID = sessionStorage.uName;
	},
	
	setCDASHM1Values : function(){
		
		var oCDASHM1ModelPendingApproval = new sap.ui.model.json.JSONModel();
    	oCDASHM1ModelPendingApproval.setData({modelData: oCDASHMJsonPendingApproval});
    	
    	var oCDASHM1TablePendingApproval = sap.ui.getCore().byId("idCDASHM1TablePendingApproval");
    	oCDASHM1TablePendingApproval.setModel(oCDASHM1ModelPendingApproval);
    	oCDASHM1TablePendingApproval.bindRows("/modelData");
    	
    	var oCDASHMJsonPendingApprovalLength = oCDASHMJsonPendingApproval.length;
    	if(oCDASHMJsonPendingApprovalLength < 11){
    		oCDASHM1TablePendingApproval.setVisibleRowCount(oCDASHMJsonPendingApprovalLength);
    		oCDASHM1TablePendingApproval.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    	}
    	else{
    		oCDASHM1TablePendingApproval.setVisibleRowCount(10);
    		oCDASHM1TablePendingApproval.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    	}
    	
    	
    	var oCDASHM1ModelEstimatesApproved = new sap.ui.model.json.JSONModel();
    	oCDASHM1ModelEstimatesApproved.setData({modelData: oCDASHMJsonEstimatesApproved});
    	
    	var oCDASHM1TableEstimatesApproved = sap.ui.getCore().byId("idCDASHM1TableEstimatesApproved");
    	oCDASHM1TableEstimatesApproved.setModel(oCDASHM1ModelEstimatesApproved);
    	oCDASHM1TableEstimatesApproved.bindRows("/modelData");
    	
    	var oCDASHMJsonEstimatesApprovedLength = oCDASHMJsonEstimatesApproved.length;
    	if(oCDASHMJsonEstimatesApprovedLength < 11){
    		oCDASHM1TableEstimatesApproved.setVisibleRowCount(oCDASHMJsonEstimatesApprovedLength);
    		oCDASHM1TableEstimatesApproved.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    	}
    	else{
    		oCDASHM1TableEstimatesApproved.setVisibleRowCount(10);
    		oCDASHM1TableEstimatesApproved.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    	}
    	
    	
    	
	},
	
	
	estimatesApprovedSelectAll : function(){
		
	    var len = oCDASHMJsonEstimatesApproved.length;
	    var oCDASHM1TableEstimatesApproved = sap.ui.getCore().byId("idCDASHM1TableEstimatesApproved");
	    if(sap.ui.getCore().byId("idCDASHM1TableEstimatesApprovedColumnCheckBox").getChecked()){
	      for(var i=0;i<len;i++){
	    	  oCDASHMJsonEstimatesApproved[i].isChecked = true;
	      }
	    }
	    else{
	      for(var i=0;i<len;i++){
	    	  oCDASHMJsonEstimatesApproved[i].isChecked = false;
	      }
	    }

	    oCDASHM1TableEstimatesApproved.getModel().updateBindings();
	    
	},
	
	pendingApprovalSelectAll : function(){
		
	    var len = oCDASHMJsonPendingApproval.length;
	    var oCDASHM1TablePendingApproval = sap.ui.getCore().byId("idCDASHM1TablePendingApproval");
	    if(sap.ui.getCore().byId("idCDASHM1TablePendingApprovalColumnCheckBox").getChecked()){
	      for(var i=0;i<len;i++){
	    	  oCDASHMJsonPendingApproval[i].isChecked = true;
	      }
	    }
	    else{
	      for(var i=0;i<len;i++){
	    	  oCDASHMJsonPendingApproval[i].isChecked = false;
	      }
	    }

	    oCDASHM1TablePendingApproval.getModel().updateBindings();
		
	}
});