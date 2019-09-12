jQuery.sap.require("sap.ui.model.json.JSONModel");

sap.ui.model.json.JSONModel.extend("sdashm1", {
	
	/* SDASHM1 - Page - Seaco Dashboard page 1 */
	createSDASHM1Page : function(){		
		jQuery.sap.require("sap.ui.core.IconPool");
		var oCurrent = this;
		
		/* SDASHM1 - Section - Status Monitor */
		
		var oSDASHM1ContentStatusMonitor = oCurrent.setContentStatusMonitor();    	
    	
		/* SDASHM1 - Flexbox - Final */
	   	 
		var oSDASHM1ContentFinal = new sap.m.FlexBox({
		         items: [
		              oSDASHM1ContentStatusMonitor
		       ],
		       direction : "Column",
		       visible: true,
		}).addStyleClass("marginLeft5");
		
		return oSDASHM1ContentFinal;
		
	},
	
	/* SDASHM1 - Section - Status Monitor */
	
	setContentStatusMonitor : function(){
		
		var oCurrent = this;
		
		/* SDASHM1 - Label - Pending Estimates */
		
		var oSDASHM1LabelStatusMonitor = new sap.ui.commons.Label({
            text: "Status Monitor",
        }).addStyleClass("fontTitle");
        
		/* SDASHM1 - Button - Pending Estimates Export to Excel */
		
		var oSDASHM1ButtonStatusMonitorExport = new sap.ui.commons.Button("idSDASHM1ButtonStatusMonitorExport",{
	          text : "",
	          styled:false,
	          type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	  var oUtility = new utility();
	        	  //oUtility.makeHTMLTable(oCDASHMJsonStatusMonitor, "Returns","export");
	          }
		}).addStyleClass("excelBtn marginTop10 floatRight");
		
		/* SDASHM1 - Flexbox - Pending Estimates Title */
	   	 
		var oSDASHM1FlexStatusMonitorTitle = new sap.m.FlexBox({
				 justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
		         items: [
		                oSDASHM1LabelStatusMonitor,
						oSDASHM1ButtonStatusMonitorExport
		       ],
		       direction : "Row",
		       visible: true,
		});
		
		/* SDASHM1 - Table - Pending Approval */
		
    	var oSDASHM1TableStatusMonitor = new sap.ui.table.Table("idSDASHM1TableStatusMonitor",{
    		visibleRowCount: 10,
            firstVisibleRow: 3,
            fixedColumnCount: 4,
            columnHeaderHeight: 55,
            width: '100%',
            enableColumnReordering : false,
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
    	
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		visible : true,
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "S. No.", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: ""}).addStyleClass("wraptext")
                 ],
	   		 //label: new sap.ui.commons.Label({text: "S. No."}),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "sno").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"42px",
	           //sortProperty: "sno",
	           //filterProperty : "sno",
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "Depot Code", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: ""}).addStyleClass("wraptext")
                 ],
	   		 //label: new sap.ui.commons.Label({text: "Depot Code"}),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getProperty("text");
					 oCurrent.setEquipmentLevelDetails(depotcode, "DEPO", undefined);
					 
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 
					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname;
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
					 
				 }
			 }).bindProperty("text", "depotcode").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"70px",
	           sortProperty: "depotcode",
	           filterProperty : "depotcode",
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "Depot Name", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: ""}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "Depot Name"}),
			 //template: new sap.ui.commons.TextView({
			 //}).bindProperty("text", "depotname").addStyleClass("borderStyle1"),
	             template: new sap.ui.commons.Link({
					 press : function(oEvent){
						 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
						 oCurrent.setEquipmentLevelDetails(depotcode, "DEPO", undefined);
						 
						 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
						 var location = oEvent.getSource().getBindingContext().getProperty("location");
						 
						 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname;
						 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
						 
					 }
				 }).bindProperty("text", "depotname").addStyleClass("borderStyle1 wraptext"),
	           resizable:false,
	           width:"150px",
	           sortProperty: "depotname",
	           filterProperty : "depotname",
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "Location", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: ""}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "Location"}),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "location").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"80px",
	           sortProperty: "location",
	           filterProperty : "location",
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "WEST", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: ""}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "WEST"}),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
				 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
				 var west = oEvent.getSource().getProperty("text");
				 oCurrent.setEquipmentLevelDetails(depotcode, "WEST", west);
				 
				 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
				 var location = oEvent.getSource().getBindingContext().getProperty("location");
				 
				 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
				 			" || Status : WEST";
				 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
				 
			 }
			 }).bindProperty("text", "west").addStyleClass("borderStyle1 rightAlign"),
	           resizable:false,
	           width:"50px"
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "AWAP", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: ""}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "AWAP"}),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 var awap = oEvent.getSource().getProperty("text");
					 oCurrent.setEquipmentLevelDetails(depotcode, "AWAP", awap);
					 
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 
					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
					 			" || Status : AWAP";
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
					 
				 }
			 }).bindProperty("text", "awap").addStyleClass("borderStyle1 rightAlign"),
	           resizable:false,
	           width:"50px"
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		headerSpan: [2,1],
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "AUTH", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : false,text: "Grade 1"}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "AWAP"}),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 var authg1 = oEvent.getSource().getProperty("text");
					 oCurrent.setEquipmentLevelDetails(depotcode, "AUTHG1", authg1);
					 
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 
					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
					 			" || Status : AUTH Grade 1";
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
					 
					 
				 }
			 }).bindProperty("text", "authg1").addStyleClass("borderStyle1 rightAlign"),
	           resizable:false,
	           width:"50px"
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: "Grade 2"}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "AWAP"}),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 var authg2 = oEvent.getSource().getProperty("text");
					 oCurrent.setEquipmentLevelDetails(depotcode, "AUTHG2", authg2);
					 
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 
					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
					 			" || Status : AUTH Grade 2";
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
					 
				 }
			 }).bindProperty("text", "authg2").addStyleClass("borderStyle1 rightAlign"),
	           resizable:false,
	           width:"50px"
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "HOLD", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: ""}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "AWAP"}),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 var hold = oEvent.getSource().getProperty("text");
					 oCurrent.setEquipmentLevelDetails(depotcode, "HOLD", hold);
					 
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 
					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
					 			" || Status : HOLD";
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
				 }
			 }).bindProperty("text", "hold").addStyleClass("borderStyle1 rightAlign"),
	           resizable:false,
	           width:"50px"
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		headerSpan: [2,1],
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "AVLB", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: "Grade 1"}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "AWAP"}),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 var avlbg1 = oEvent.getSource().getProperty("text");
					 oCurrent.setEquipmentLevelDetails(depotcode, "AVLBG1", avlbg1);
					 
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 
					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
					 			" || Status : AVLB Grade 1";
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
					 
				 }
			 }).bindProperty("text", "avlbg1").addStyleClass("borderStyle1 rightAlign"),
	           resizable:false,
	           width:"50px"
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: "Grade 2"}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "AWAP"}),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 var avlbg2 = oEvent.getSource().getProperty("text");
					 oCurrent.setEquipmentLevelDetails(depotcode, "AVLBG2", avlbg2);
					 
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 
					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
					 			" || Status : AVLB Grade 2";
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
					 
				 }
			 }).bindProperty("text", "avlbg2").addStyleClass("borderStyle1 rightAlign"),
	           resizable:false,
	           width:"50px"
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		headerSpan: [2,1],
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "SALE", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: "Grade 1"}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "AWAP"}),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 var saleg1 = oEvent.getSource().getProperty("text");
					 oCurrent.setEquipmentLevelDetails(depotcode, "SALEG1", saleg1);
					 
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 
					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
					 			" || Status : SALE Grade 1";
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
					 
					 
				 }
			 }).bindProperty("text", "saleg2").addStyleClass("borderStyle1 rightAlign"),
	           resizable:false,
	           width:"50px"
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: "Grade 2"}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "AWAP"}),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 var saleg2 = oEvent.getSource().getProperty("text");
					 oCurrent.setEquipmentLevelDetails(depotcode, "SALEG2", saleg2);
					 
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 
					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
					 			" || Status : SALE Grade 2";
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
					 
				 }
			 }).bindProperty("text", "saleg3").addStyleClass("borderStyle1 rightAlign"),
	           resizable:false,
	           width:"50px"
			 }));
    	
    	/*oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: "Grade 3"}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "AWAP"}),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 var saleg3 = oEvent.getSource().getProperty("text");
					 oCurrent.setEquipmentLevelDetails(depotcode, "SALEG3", saleg3);
					 
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 
					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
					 			" || Status : SALE Grade 3";
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
					 
				 }
			 }).bindProperty("text", "saleg3").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"50px"
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: "Grade 4"}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "AWAP"}),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 var saleg4 = oEvent.getSource().getProperty("text");
					 oCurrent.setEquipmentLevelDetails(depotcode, "SALEG4", saleg4);
					 
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 
					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
					 			" || Status : SALE Grade 4";
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
					 
				 }
			 }).bindProperty("text", "saleg4").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"50px"
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: "Grade 5"}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "AWAP"}),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 var saleg5 = oEvent.getSource().getProperty("text");
					 oCurrent.setEquipmentLevelDetails(depotcode, "SALEG5", saleg5);
					 
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 
					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
					 			" || Status : SALE Grade 5";
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
					 
				 }
			 }).bindProperty("text", "saleg5").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"50px"
			 }));*/
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "Total Stock", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: ""}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "AWAP"}),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 var tstock = oEvent.getSource().getProperty("text");
					 oCurrent.setEquipmentLevelDetails(depotcode, "TSTOCK", tstock);
					 
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 
					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
					 			" || Status : Total Stock";
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
					 
				 }
			 }).bindProperty("text", "tstock").addStyleClass("borderStyle1 rightAlign"),
	           resizable:false,
	           width:"50px"
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "EDI Errors \n Pend. Action", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: ""}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "AWAP"}),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
					 var edi = oEvent.getSource().getProperty("text");
					 oCurrent.setEquipmentLevelDetails(depotcode, "EDI", edi);
					 
					 var depotname = oEvent.getSource().getBindingContext().getProperty("depotname");
					 var location = oEvent.getSource().getBindingContext().getProperty("location");
					 
					 var equipmentlevelheader = "Location : " + location + " || Depot : " + depotcode + " - " + depotname +
					 			" || Status : EDI Errors Pend. Action";
					 sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText(equipmentlevelheader);
					 
				 }
			 }).bindProperty("text", "edi").addStyleClass("borderStyle1 rightAlign"),
	           resizable:false,
	           width:"90px"
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "Regional Operations Director", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: ""}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "AWAP"}),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "rod").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"100px"
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "Depot Operations Manager", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: ""}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "AWAP"}),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "mgr").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"100px"
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "Operations Coordinator", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: ""}).addStyleClass("wraptext")
                 ],
             //label: new sap.ui.commons.Label({text: "AWAP"}),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "coord").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"100px"
			 }));
    	
    	oSDASHM1TableStatusMonitor.addColumn(new sap.ui.table.Column({
    		width:"100px",
    		visible : true,
    		multiLabels :
                [
                 new sap.ui.commons.Label({text: "Action", textAlign: "Center"}).addStyleClass("wraptext"),
                 new sap.ui.commons.Label({wrapping : true,text: ""}).addStyleClass("wraptext")
            ], 
    		//label: new sap.ui.commons.Label({text: ""}),
			 template: new sap.ui.commons.Button({
			 enabled:true,
			 }).bindProperty("text", "contact").addStyleClass("submitBtn borderStyle1"),
	           resizable:false,
			 }));
    	
    	/* SDASHM1 - Flexbox - Pending Approval */
	   	 
		var oSDASHM1FlexStatusMonitor = new sap.m.FlexBox({
		         items: [
		                oSDASHM1FlexStatusMonitorTitle,
						new sap.ui.commons.Label({
							text : "",
							width : "100px"
						}),
						oSDASHM1TableStatusMonitor
		       ],
		       direction : "Column",
		       visible: true,
		}).addStyleClass("marginLeft5");
		
   	 
		return oSDASHM1FlexStatusMonitor;
	
    	
	},
	
	/* SDASHM1 - Function - Set Status Monitor Values */
	
	setSDASHM1Values : function(){
		
		var oSDASHM1ModelStatusMonitor = new sap.ui.model.json.JSONModel();
		oSDASHM1ModelStatusMonitor.setData({modelData: oSDASHMJsonStatusMonitor});
    	
    	var oSDASHM1TableStatusMonitor = sap.ui.getCore().byId("idSDASHM1TableStatusMonitor");
    	oSDASHM1TableStatusMonitor.setModel(oSDASHM1ModelStatusMonitor);
    	oSDASHM1TableStatusMonitor.bindRows("/modelData");
    	
    	var oSDASHMJsonStatusMonitorLength = oSDASHMJsonStatusMonitor.length;
    	if(oSDASHMJsonStatusMonitorLength < 11){
    		oSDASHM1TableStatusMonitor.setVisibleRowCount(oSDASHMJsonStatusMonitorLength);
    		oSDASHM1TableStatusMonitor.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    	}
    	else{
    		oSDASHM1TableStatusMonitor.setVisibleRowCount(10);
    		oSDASHM1TableStatusMonitor.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    	}
    	
    	  	
	},
	
	/* SDASHM1 - Function - Set Equipment Level Details(View 2) */
	setEquipmentLevelDetails : function(depotcode, column, value){
		var oSdashm2 = new sdashm2();
		oSdashm2.setSDASHM2Values();
		app.to("idSDASHM2Page");
	}
	
});