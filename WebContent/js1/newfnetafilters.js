// APS9999_MAC21082019 - Sub Type inclusion for Reefers

jQuery.sap.require("sap.ui.model.json.JSONModel");
var oPopoverFavorites = null;
sap.ui.model.json.JSONModel.extend("newfnetafilters", {

	createPanelFilter : function(){

		var oToolbarLocation = new sap.m.Toolbar("idNETAToolbarLocation",{
    		width:"99%",
    		//height: "90px",
    	}).addStyleClass("panelFilter");
    	oToolbarLocation.setDesign(sap.m.ToolbarDesign.Solid);

    	//oToolbarLocation.addItem(new sap.ui.commons.ToolbarSeparator());

    	var oItemTemplate = new sap.ui.core.Item({
    		  key : "{key}",
    		  text : "{text}"
    		});

    	var oMRegionCombo = new sap.m.MultiComboBox({
			id : "idMRegionCombo", // sap.ui.core.ID
			//width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "Main Region...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {

			}, this ],
			selectionFinish : [ function(oEvent) {
				busyDialog.open();
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				//if(control.mProperties.selectedKeys.length != 0)
					fnetaFilter.changeRegionCountryCityDepotFilter(control.mProperties.selectedKeys, 1);
				//fnetaFilter.alterPageOne();	// DNANEW-
				busyDialog.close();
				/*DNANEW+
				var oMregionComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memMregionComboSelectedKeys", oMregionComboSelectedKeys);
				DNANEW+*/
			}, this ]
    	}).addStyleClass("locationCombo");

    	oToolbarLocation.insertContent(oMRegionCombo, 0);

    	var oRegionCombo = new sap.m.MultiComboBox({
			id : "idRegionCombo", // sap.ui.core.ID
			//width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "Region...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {

			}, this ],
			selectionFinish : [ function(oEvent) {
				busyDialog.open();
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				//if(control.mProperties.selectedKeys.length != 0)
					fnetaFilter.changeCountryCityDepotFilter(control.mProperties.selectedKeys, 1);
				//fnetaFilter.alterPageOne();	// DNANEW-
				busyDialog.close();
				/*DNANEW+
				var oRegionComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memRegionComboSelectedKeys", oRegionComboSelectedKeys);
				DNANEW+*/
			}, this ]
    	}).addStyleClass("locationCombo");
			oRegionCombo.getPicker().setContentHeight("400px");
    	oToolbarLocation.insertContent(oRegionCombo, 1);

    	var oCountryCombo = new sap.m.MultiComboBox({
			id : "idCountryCombo", // sap.ui.core.ID
			//width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "Country...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {

			}, this ],
			selectionFinish : [ function(oEvent) {
				busyDialog.open();
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				//if(control.mProperties.selectedKeys.length != 0)
					fnetaFilter.changeCityDepotFilter(control.mProperties.selectedKeys, 1);
				//fnetaFilter.alterPageOne(control.mProperties.selectedKeys, "Country");
				//fnetaFilter.alterPageOne();	// DNANEW-
				busyDialog.close();
				/*DNANEW+
				var oCountryComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memCountryComboSelectedKeys", oCountryComboSelectedKeys);
				DNANEW+*/
			}, this ]
    	}).addStyleClass("locationCombo");
			oCountryCombo.getPicker().setContentHeight("400px");
    	oToolbarLocation.insertContent(oCountryCombo, 2);

    	var oCityCombo = new sap.m.MultiComboBox({
			id : "idCityCombo", // sap.ui.core.ID
			//width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "City...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionFinish : [ function(oEvent) {
				busyDialog.open();
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				//if(control.mProperties.selectedKeys.length != 0)
					fnetaFilter.changeDepotFilter(control.mProperties.selectedKeys, 1);
				//fnetaFilter.alterPageOne(control.mProperties.selectedKeys, "City");
				//fnetaFilter.alterPageOne();	// DNANEW-
				busyDialog.close();
				/*DNANEW+
				var oCityComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memCityComboSelectedKeys", oCityComboSelectedKeys);
				DNANEW+*/
			}, this ]
    	}).addStyleClass("locationCombo");
			oCityCombo.getPicker().setContentHeight("400px");
    	oToolbarLocation.insertContent(oCityCombo, 3);


			var oGradeCombo = new sap.m.MultiComboBox({
			id : "idGradeCombo", // sap.ui.core.ID
			//width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "Grade...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	}
    	}).addStyleClass("locationCombo");

    	oToolbarLocation.insertContent(oGradeCombo, 4);

    	//oToolbarLocation.insertContent(new sap.m.ToolbarSeparator().addStyleClass("toolbarSep"), 5);

    	var oToolbarUnitType = new sap.m.Toolbar("idNETAToolbarUnitType",{
    		width:"99%",
    		//height: "90px",
    	}).addStyleClass("panelFilter");
    	oToolbarUnitType.setDesign(sap.m.ToolbarDesign.Solid);

    	var oProCatCombo = new sap.m.MultiComboBox({
			id : "idProCatCombo", // sap.ui.core.ID
			width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "Product Category...", // string
			//editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			  items : {
				    path : "/items",
				    template : oItemTemplate
				  },
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				var selectedKeyLength = oEvent.getSource().getProperty("selectedKeys").length;
				if(selectedKeyLength == 1 && 
						( oEvent.getSource().getProperty("selectedKeys")[0] == "TANKS" 
								|| oEvent.getSource().getProperty("selectedKeys")[0] == "REEFERS"	// APS9999_MAC21082019+
							 )){
					sap.ui.getCore().byId("idFlexSubType").setVisible(true);

					if(oEvent.getSource().getProperty("selectedKeys")[0] == "TANKS")
						sap.ui.getCore().byId("idInputSubType").setMaxLength(7);
					if(oEvent.getSource().getProperty("selectedKeys")[0] == "REEFERS")	// APS9999_MAC21082019+
						sap.ui.getCore().byId("idInputSubType").setMaxLength(10);	// APS9999_MAC21082019+
				}else{
					sap.ui.getCore().byId("idInputSubType").setValue("");
					sap.ui.getCore().byId("idFlexSubType").setVisible(false);
				}	
			}, this ],
			selectionFinish : [ function(oEvent) {
				busyDialog.open();
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				//if(control.mProperties.selectedKeys.length != 0)
				fnetaFilter.changeProClassUnitTypeFilter(control.mProperties.selectedKeys, 1);
				//fnetaFilter.alterPageOne(); /*DNANEW+*/
				busyDialog.close();
			}, this ]
    	}).addStyleClass("unitCombo");

    	oToolbarUnitType.insertContent(oProCatCombo, 0);

    	var oProClassCombo = new sap.m.MultiComboBox({
			id : "idProClassCombo", // sap.ui.core.ID
			width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "Sub Category...", // string
			//editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			  items : {
				    path : "/items",
				    template : oItemTemplate
				  },
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {

			}, this ],
			selectionFinish : [ function(oEvent) {
				busyDialog.open();
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				//if(control.mProperties.selectedKeys.length != 0)
					fnetaFilter.changeUnitTypeFilter(control.mProperties.selectedKeys, 1);
				//fnetaFilter.alterPageOne(); /*DNANEW+*/
				busyDialog.close();
				/*DNANEW+
				var oProClassComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memProClassComboSelectedKeys", oProClassComboSelectedKeys);
				DNANEW+*/
			}, this ]
    	}).addStyleClass("unitCombo");
			oProClassCombo.getPicker().setContentHeight("400px");
    	oToolbarUnitType.insertContent(oProClassCombo, 1);

    	var oUnitTypeCombo = new sap.m.MultiComboBox({
			id : "idUnitTypeCombo", // sap.ui.core.ID
			width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "Unit Type...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				/*DNANEW-*/
				/*busyDialog.open();
				var control = oEvent.getSource();
				busyDialog.close();*/
				/*DNANEW-*/
				/*DNANEW+
				var oUnitTypeComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memUnitTypeComboSelectedKeys", oUnitTypeComboSelectedKeys);
				DNANEW+*/
			}, this ],
			selectionFinish : [ function(oEvent) {
				/*DNANEW-*/
				/*
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				fnetaFilter.alterPageOne();
				*/
				/*DNANEW-*/
			}, this ]
    	}).addStyleClass("unitCombo");
			oUnitTypeCombo.getPicker().setContentHeight("400px");
    	oToolbarUnitType.insertContent(oUnitTypeCombo, 2);


			/* Simple Status */

			var oSiStatusCombo = new sap.m.MultiComboBox({
			id : "idSiStatusCombo", // sap.ui.core.ID
			width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "Simple Status...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
						path : "/items",
						template : oItemTemplate
						}
			}).addStyleClass("unitCombo");

    	oToolbarUnitType.insertContent(oSiStatusCombo, 3);

			/* Equip. Status */

			var oEqStatusCombo = new sap.m.MultiComboBox({
			id : "idEqStatusCombo", // sap.ui.core.ID
			width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "Equip. Status...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
						path : "/items",
						template : oItemTemplate
						}
			}).addStyleClass("unitCombo");
			oEqStatusCombo.getPicker().setContentHeight("400px");
    	oToolbarUnitType.insertContent(oEqStatusCombo, 4);


    	var oLeasetypeCombo = new sap.m.MultiComboBox({
			id : "idLeasetypeCombo", // sap.ui.core.ID
			width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "Lease Type...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				/*DNANEW-*/
				/*busyDialog.open();
				var control = oEvent.getSource();
				busyDialog.close();*/
				/*DNANEW-*/
				/*DNANEW+
				var oUnitTypeComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memUnitTypeComboSelectedKeys", oUnitTypeComboSelectedKeys);
				DNANEW+*/
			}, this ],
			selectionFinish : [ function(oEvent) {
				/*DNANEW-*/
				/*
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				fnetaFilter.alterPageOne();
				*/
				/*DNANEW-*/
			}, this ]
    	}).addStyleClass("customerCombo");

    	//oToolbarUnitType.insertContent(oLeasetypeCombo, 3);

    	var oReleasetypeCombo = new sap.m.MultiComboBox({
			id : "idReleasetypeCombo", // sap.ui.core.ID
			width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			visible : false,
			enabled : true, // boolean
			placeholder : "Release Type...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				/*DNANEW-*/
				/*busyDialog.open();
				var control = oEvent.getSource();
				busyDialog.close();*/
				/*DNANEW-*/
				/*DNANEW+
				var oUnitTypeComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memUnitTypeComboSelectedKeys", oUnitTypeComboSelectedKeys);
				DNANEW+*/
			}, this ],
			selectionFinish : [ function(oEvent) {
				/*DNANEW-*/
				/*
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				fnetaFilter.alterPageOne();
				*/
				/*DNANEW-*/
			}, this ]
    	}).addStyleClass("customerCombo");

    	oToolbarUnitType.insertContent(oReleasetypeCombo, 4);

    	/* Other Filters */

    	var oOperatorModel = new sap.ui.model.json.JSONModel({
	    	   "symbol":[
	    	     {
	    	       "text":"=",
	    	       "key":"EQ",
	    	     },
	    	     {
	    	    	 "text":">",
		    	       "key":"GT",
	    	     },
	    	     {
	    	    	 "text":"<",
		    	       "key":"LT",
	    	     },
	    	     {
	    	    	 "text":"BT",
		    	       "key":"BT",
	    	     }
	    	   ]
	    	 });

    	var oToolbarOthers = new sap.m.Toolbar("idNETAToolbarOthers",{
    		width:"99%",
    		//height: "90px",
    	}).addStyleClass("panelFilter");
    	oToolbarUnitType.setDesign(sap.m.ToolbarDesign.Solid);

    	var oSymbolAge =   new sap.m.ComboBox("idSymbolAge",
		        {
		        		  width : "90px",
		                  items : {
		                         path : "/symbol",
		                         template : new sap.ui.core.ListItem(
		                         {
		                               text : "{text}",
		                               key : "{key}"
		                         })
		                  },
		                  selectionChange : function(oEvent){
		                	  var sel = oEvent.getParameter("selectedItem").getProperty("key");
	                        	 if(sel == "BT"){
	                        		 sap.ui.getCore().byId("idInputAge2").setValue("");
	                        		 sap.ui.getCore().byId("idInputAge2").setVisible(true);
	                        	 }else{
	                        		 sap.ui.getCore().byId("idInputAge2").setValue("");
	                        		 sap.ui.getCore().byId("idInputAge2").setVisible(false);
	                        	 }
		                  }
		        }).setModel(oOperatorModel).setSelectedKey("EQ");
    	oToolbarOthers.insertContent(oSymbolAge, 1);

    	var oInputAge = new sap.m.Input("idInputAge", {
    		placeholder : "Age",
			maxLength : 3,
			type : sap.m.InputType.Number,
			width : "100px"
		});//.addStyleClass("marginTop10 marginBottom10");
    	oToolbarOthers.insertContent(oInputAge, 2);

    	var oInputAge2 = new sap.m.Input("idInputAge2", {
    		placeholder : "Age",
    		visible : false,
			maxLength : 3,
			type : sap.m.InputType.Number,
			width : "100px"
		});//.addStyleClass("marginTop10 marginBottom10");
    	oToolbarOthers.insertContent(oInputAge2, 3);

    	oToolbarOthers.insertContent(new sap.m.ToolbarSeparator().addStyleClass("toolbarSep"), 4);

    	var oSymbolPor = new sap.m.ComboBox("idSymbolPor",
		        {
		        		  width : "90px",
		                  items : {
		                         path : "/symbol",
		                         template : new sap.ui.core.ListItem(
		                         {
		                               text : "{text}",
		                               key : "{key}"
		                         }),
		                  },
		                         selectionChange : function(oEvent){
		                        	 var sel = oEvent.getParameter("selectedItem").getProperty("key");
		                        	 if(sel == "BT"){
		                        		 sap.ui.getCore().byId("idInputPor2").setValue("");
		                        		 sap.ui.getCore().byId("idInputPor2").setVisible(true);
		                        	 }else{
		                        		 sap.ui.getCore().byId("idInputPor2").setValue("");
		                        		 sap.ui.getCore().byId("idInputPor2").setVisible(false);
		                        	 }
				                  }
		        }).setModel(oOperatorModel).setSelectedKey("EQ");
    	oToolbarOthers.insertContent(oSymbolPor, 5);

	    	var oInputPor = new sap.m.Input("idInputPor", {
				maxLength : 5,
				placeholder : "Days in Status",
				type : sap.m.InputType.Number,
				width : "150px"
			});
	    	oToolbarOthers.insertContent(oInputPor, 6);

	    	var oInputPor2 = new sap.m.Input("idInputPor2", {
	    		visible : false,
				maxLength : 5,
				placeholder : "Days in Status",
				type : sap.m.InputType.Number,
				width : "150px"
			});
    	oToolbarOthers.insertContent(oInputPor2, 7);

			var oInputSubType = new sap.m.Input("idInputSubType", {
    		placeholder : "Sub Type",
				maxLength : 3,
				width : "200px"
			});

			var oIconSubType = new sap.ui.core.Icon({
				src : sap.ui.core.IconPool.getIconURI( "sys-help" ), //initiative
				size : "22px",
				color : "blue",
				activeColor : "blue",
				activeBackgroundColor : "white",
				hoverColor : "blue",
				hoverBackgroundColor : "white",
				width : "22px",
				press : function(oEvent){
					oCurrent.openUserGuide(oEvent);
				}
			}).addStyleClass("mnrsubtypelegend");

			var oFlexSubType = new sap.m.FlexBox("idFlexSubType", {
				visible : false,
				items : [oInputSubType, oIconSubType],
				direction : "Row"
			});

			oToolbarOthers.insertContent(oFlexSubType, 8);
			
			/* Reset Button */

 		 var oCurrent = this;
 		 var oSDASHMFilterReset = new sap.m.Button({
			 text : "",
			 //styled:false,
			 visible:true,
			 type:sap.m.ButtonType.Reject,
			 icon: "sap-icon://refresh",
 			press:function(oEvent){
				var fnetaFilter = new newfnetaFilterOuts();
				fnetaFilter.resetEverything();
 			}
 		});

    	/* Search Button */

			var oCurrent = this;
			var oSDASHMFilterSearch = new sap.m.Button({
			 //text : "Search",
			 //styled:false,
			 visible:true,
			 type:sap.m.ButtonType.Accept,
			 icon: "sap-icon://search",
			 press:function(oEvent){
				 oCurrent.getSDASHM2FromFilters();
			 }
		 });

		 var oSDASHMFilterFlexButtons = new sap.m.FlexBox({
			 items : [
				 oSDASHMFilterSearch,
				 new sap.m.Label({width : "15px"}),
				 oSDASHMFilterReset
			 ]
		 });

		 oToolbarOthers.insertContent(oSDASHMFilterFlexButtons, 8);

    	var oRadioButtonCol = new sap.ui.commons.RadioButtonGroup("idRadioButtonCol",{
	        columns : 3,
	        selectedIndex : 2,
	        select : function(oEvent) {
				/*var fnetaFilter = new newfnetaFilterOuts();
				fnetaFilter.alterPageOne();*/

	        	var oHierLevel = oEvent.getSource().getSelectedIndex();
	        	var fneta = new newfneta();
				fneta.setPersonalValuesFilter();
	        	var filterString = fneta.formFilterString(oHierLevel, undefined, undefined);

	        	var leasingOrRemarketing = window.localStorage.getItem("memLeasingOrRemarketing");
				if(leasingOrRemarketing == null || leasingOrRemarketing == "L"){
					fneta.getFNASummary(filterString);
				}else if(leasingOrRemarketing == "R"){
					fneta.getFRNASummary(filterString);
				}else if(leasingOrRemarketing == "O"){
					fneta.getFONASummary(filterString);
				}
	        }
	    }).addItem(new sap.ui.core.Item({
	        text : "Region Level", key : "REGION"})).addItem(new sap.ui.core.Item({
		        text : "Country Level", key : "COUNTRY"})).addItem(new sap.ui.core.Item({
			        text : "City Level", key : "CITY"}));

    	//oToolbarOthers.insertContent(oRadioButtonCol, 10);

    	var oToolbarDepotCustomer = new sap.m.Toolbar("idNETAToolbarDepotCustomer",{
    		width:"99%",
    		//height: "130px",
    	}).addStyleClass("panelFilter");
    	oToolbarDepotCustomer.setDesign(sap.m.ToolbarDesign.Solid);

    	var oDepotCombo = new sap.m.MultiComboBox({
			id : "idDepotCombo", // sap.ui.core.ID
			//width : "40%", // sap.ui.core.CSSSize
			height: "120px",
			enabled : true, // boolean
			placeholder : "Depot...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionFinish : [ function(oEvent) {
				//var control = oEvent.getSource();
				//var fnetaFilter = new newfnetaFilterOuts();
				//fnetaFilter.alterPageOne(control.mProperties.selectedKeys, "City");
				//fnetaFilter.alterPageOne();	// DNANEW-
				/*DNANEW+
				var oCityComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memCityComboSelectedKeys", oCityComboSelectedKeys);
				DNANEW+*/
			}, this ]
    	}).addStyleClass("locationCombo depotCustomerCombo");
			oDepotCombo.getPicker().setContentHeight("400px");
    	var oDepotComboF4 = new sap.m.Image("idDepotComboF4",{
    		enabled : true,
            src: "images/f4_help.png",
            press : function(oEvent){
            	var of4helper = new f4helper();
            	of4helper.getF4Helper("depot", oEvent.getSource());
            }
		}).addStyleClass("f4image");

    	var oDepotComboSelectAll = new sap.m.CheckBox("idDepotComboSelectAll",{
    		enabled : true,
    		select : function(evt){
            		if(evt.getParameter("selected") == true){
            		var oDepotCombo = sap.ui.getCore().byId("idDepotCombo");
            		oDepotCombo.setSelectedItems(oDepotCombo.getItems());

            		var message = String(oDepotCombo.getItems().length) + " depots selected";
            		sap.m.MessageToast.show(message);
            		}else{
            		var oDepotCombo = sap.ui.getCore().byId("idDepotCombo");
            		oDepotCombo.setSelectedItems([]);
            		sap.m.MessageToast.show("cleared depot filter");
            	}
            }
		}).addStyleClass("selectAllCheckBox");	//selectAllCheckBox

    	var oDepotComboOptions = new sap.m.HBox("idDepotComboOptions",{
            //width:"300px",
            items:  [oDepotComboF4, oDepotComboSelectAll],
            justifyContent : sap.m.FlexJustifyContent.Center
            });

    	var oDepotComboFull = new sap.m.HBox("idDepotComboFull",{
            width:"50%",
            items:  [oDepotCombo, new sap.m.Label({width : "15px"}), oDepotComboOptions]
            });

    	oToolbarDepotCustomer.insertContent(oDepotCombo, 0);
    	oToolbarDepotCustomer.insertContent(oDepotComboOptions, 1);

    	var oCustomerCombo = new sap.m.MultiComboBox({
			id : "idCustomerCombo", // sap.ui.core.ID
			//width : "40%", // sap.ui.core.CSSSize
			height: "120px",
			enabled : true, // boolean
			placeholder : "Customer...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				/*DNANEW-*/
				/*busyDialog.open();
				var control = oEvent.getSource();
				busyDialog.close();*/
				/*DNANEW-*/
				/*DNANEW+
				var oUnitTypeComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memUnitTypeComboSelectedKeys", oUnitTypeComboSelectedKeys);
				DNANEW+*/
			}, this ],
			selectionFinish : [ function(oEvent) {
				/*DNANEW-*/
				/*
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				fnetaFilter.alterPageOne();
				*/
				/*DNANEW-*/
			}, this ]
    	}).addStyleClass("customerCombo depotCustomerCombo");
      oCustomerCombo.getPicker().setContentHeight("400px");

    	var oCustomerComboF4 = new sap.m.Image("idCustomerComboF4",{
            src: "images/f4_help.png",
            press : function(oEvent){
            	var of4helper = new f4helper();
            	of4helper.getF4Helper("customer", oEvent.getSource());
            }
		}).addStyleClass("f4image");

    	var oCustomerComboSelectAll = new sap.m.CheckBox("idCustomerComboSelectAll",{
    		enabled : true,
    		select : function(evt){
            		if(evt.getParameter("selected") == true){
            		var oCustomerCombo = sap.ui.getCore().byId("idCustomerCombo");
            		oCustomerCombo.setSelectedItems(oCustomerCombo.getItems());

            		var message = String(oCustomerCombo.getItems().length) + " customers selected";
            		sap.m.MessageToast.show(message);
            		}else{
            		var oCustomerCombo = sap.ui.getCore().byId("idCustomerCombo");
            		oCustomerCombo.setSelectedItems([]);
            		sap.m.MessageToast.show("cleared customer filter");
            	}
            }
		}).addStyleClass("selectAllCheckBox");	//selectAllCheckBox

    	var oCustomerComboOptions = new sap.m.HBox("idCustomerComboOptions",{
            //width:"300px",
            items:  [oCustomerComboF4, oCustomerComboSelectAll]
            });

    	var oCustomerComboFull = new sap.m.HBox("idCustomerComboFull",{
    		width:"50%",
            items:  [oCustomerCombo, new sap.m.Label({width : "15px"}), oCustomerComboOptions]
            });

    	oToolbarDepotCustomer.insertContent(oCustomerCombo, 2);
    	oToolbarDepotCustomer.insertContent(oCustomerComboOptions, 3);

    	var oFlexToolbars = new sap.m.FlexBox({
			items: [
											 oToolbarLocation,
											 oToolbarUnitType,
                       oToolbarDepotCustomer,
                       oToolbarOthers
                     ],
                     direction: "Column",
                     //alignItems: sap.m.FlexAlignItems.Center
                   });//.addStyleClass("marginTop10");

    /* Panel for the filter */

		var oCurrent = this;
		var oPanelFilter = new sap.m.Panel("idPanelFilter",{
			busy : false, // boolean
			busyIndicatorDelay : 1000, // int
			visible : true, // boolean
			headerText : "Detailed Search", // string
			width : "100%",
			height : "auto", // sap.ui.core.CSSSize
			expandable : true, // boolean, since 1.22
			expanded : false, // boolean, since 1.22
			expandAnimation : true, // boolean, since 1.26
			tooltip : "Detailed Search", // sap.ui.core.TooltipBase
			content : [oFlexToolbars], // sap.ui.core.Control
			// headerToolbar : [
			//
			//
			// 					new sap.m.Toolbar({
			//       				content: [new sap.m.Label({text : "Filters"})]
			//             		})
			//                  ]
		});

		return oPanelFilter;
	},

	getSDASHM2FromFilters : function(){

		var oCurrent = this;

		jQuery.sap.require("sap.ui.commons.MessageBox");

		var mregionValues = sap.ui.getCore().byId("idMRegionCombo").getSelectedKeys().toString();
		var regionValues = sap.ui.getCore().byId("idRegionCombo").getSelectedKeys().toString();
		var countryValues = sap.ui.getCore().byId("idCountryCombo").getSelectedKeys().toString();
		var cityValues = sap.ui.getCore().byId("idCityCombo").getSelectedKeys().toString();
		var depotValues = sap.ui.getCore().byId("idDepotCombo").getSelectedKeys().toString();
		var customerValues = sap.ui.getCore().byId("idCustomerCombo").getSelectedKeys().toString();

		var proCatValues = sap.ui.getCore().byId("idProCatCombo").getSelectedKeys().toString();
		var proClassValues = sap.ui.getCore().byId("idProClassCombo").getSelectedKeys().toString();
		var unitTypeValues = sap.ui.getCore().byId("idUnitTypeCombo").getSelectedKeys().toString();

		var symbolage = sap.ui.getCore().byId("idSymbolAge").getSelectedKey();
		var inputAge = sap.ui.getCore().byId("idInputAge").getValue();
		var inputAge2 = sap.ui.getCore().byId("idInputAge2").getValue();

		var symbolpor = sap.ui.getCore().byId("idSymbolPor").getSelectedKey();
		var inputPor = sap.ui.getCore().byId("idInputPor").getValue();
		var inputPor2 = sap.ui.getCore().byId("idInputPor2").getValue();

		var inputSubtype = sap.ui.getCore().byId("idInputSubType").getValue();
		// APS9999_MAC21082019+
		if(inputSubtype != ""){
			var maxLengthEntered = false;
			var proCatSelectedKeys = new sap.ui.getCore().byId("idProCatCombo").getSelectedKeys();
			if(proCatSelectedKeys[0] == "TANKS"){
				if(inputSubtype.length == 7){
					maxLengthEntered = true;
				}
			}else if(proCatSelectedKeys[0] == "REEFERS"){
				if(inputSubtype.length == 10){
					maxLengthEntered = true;
				}
			}

			if(!maxLengthEntered){
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert("Enter the following number of characters for Sub Type code \n Reefers : 10 \n Tanks : 7");
				return;
			}
		}
		// APS9999_MAC21082019+
		var eqStatusCombo = sap.ui.getCore().byId("idEqStatusCombo").getSelectedKeys().toString();
		var siStatusCombo = sap.ui.getCore().byId("idSiStatusCombo").getSelectedKeys().toString();
		var gradeCombo = sap.ui.getCore().byId("idGradeCombo").getSelectedKeys().toString();

		busyDialog.open();

		var filterString = "filterSearchSet?$filter=IvMregion eq '" + mregionValues +
						 "' and IvRegion eq '" + regionValues +
						 "' and IvCountry eq '" + countryValues +
						 "' and IvCity eq '" + cityValues +
						 "' and IvDepot eq '" + depotValues +
						 "' and IvCustomer eq '" + customerValues +

						 "' and IvProdCat eq '" + proCatValues +
						 "' and IvProdClass eq '" + proClassValues +
						 "' and IvProduct eq '" + unitTypeValues +

						 "' and IvAgeOption eq '" + symbolage +
						 "' and IvAgeFrom eq '" + inputAge +
						 "' and IvAgeTo eq '" + inputAge2 +

						 "' and IvDaysStatOption eq '" + symbolpor +
						 "' and IvDaysStatFrom eq '" + inputPor +
						 "' and IvDaysStatTo eq '" + inputPor2 +
						
						 "' and IvSubtype eq '" + inputSubtype +

						 "' and IvEquiStatus eq '" + eqStatusCombo +
						 "' and IvSimpleStatus eq '" + siStatusCombo +
						 "' and IvGrade eq '" + gradeCombo +

						 "'";
		var urlToSap = serviceDEP + filterString;

	  console.log(urlToSap);
		oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
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

							depotcode : depotView2Result[j].Zdepot,
							depotname : depotView2Result[j].Zdepotname,
								isChecked : false,
							//sno : "2",

							subtype : depotView2Result[j].SubType,
							qmnum : depotView2Result[j].Qmnum,
							isPicExist : (depotView2Result[j].Picexist == "X")?true:false,

							serialno : depotView2Result[j].Zserno,
							unittype : depotView2Result[j].Zunitype,
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
							Isawap : depotView2Result[j].Isawap

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
				sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setText("");
				sap.ui.getCore().byId("idSDASHM2LabelEquipmentLevel").setVisible(false);
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

	saveFilters : function(fname, deletes){

		var oCurrent = this;

		jQuery.sap.require("sap.ui.commons.MessageBox");

		var mregionValues = sap.ui.getCore().byId("idMRegionCombo").getSelectedKeys().toString();
		var regionValues = sap.ui.getCore().byId("idRegionCombo").getSelectedKeys().toString();
		var countryValues = sap.ui.getCore().byId("idCountryCombo").getSelectedKeys().toString();
		var cityValues = sap.ui.getCore().byId("idCityCombo").getSelectedKeys().toString();
		var depotValues = sap.ui.getCore().byId("idDepotCombo").getSelectedKeys().toString();

		var leasetypeValues = sap.ui.getCore().byId("idLeasetypeCombo").getSelectedKeys().toString();
		var releasetypeValues = sap.ui.getCore().byId("idReleasetypeCombo").getSelectedKeys().toString();

		var proCatValues = sap.ui.getCore().byId("idProCatCombo").getSelectedKeys().toString();
		var proClassValues = sap.ui.getCore().byId("idProClassCombo").getSelectedKeys().toString();
		var unitTypeValues = sap.ui.getCore().byId("idUnitTypeCombo").getSelectedKeys().toString();

		var symbolage = sap.ui.getCore().byId("idSymbolAge").getSelectedKey();
		var inputAge = sap.ui.getCore().byId("idInputAge").getValue();
		var inputAge2 = sap.ui.getCore().byId("idInputAge2").getValue();

		var symbolpor = sap.ui.getCore().byId("idSymbolPor").getSelectedKey();
		var inputPor = sap.ui.getCore().byId("idInputPor").getValue();
		var inputPor2 = sap.ui.getCore().byId("idInputPor2").getValue();

		busyDialog.open();

		var filterString = "?$filter=Fname eq '" + fname +
						 "' and Delete eq '" + deletes +
						 "' and Mregion eq '" + mregionValues +
						 "' and Region eq '" + regionValues +
						 "' and Country eq '" + countryValues +
						 "' and City eq '" + cityValues +
						 "' and Depot eq '" + depotValues +

						 "' and Lease eq '" + leasetypeValues +
						 "' and Releases eq '" + releasetypeValues +

						 "' and ProCat eq '" + proCatValues +
						 "' and ProClass eq '" + proClassValues +
						 "' and UnitType eq '" + unitTypeValues +

						 "' and Ages eq '" + symbolage +
						 "' and Age1 eq '" + inputAge +
						 "' and Age2 eq '" + inputAge2 +

						 "' and Pors eq '" + symbolpor +
						 "' and Por1 eq '" + inputPor +
						 "' and Por2 eq '" + inputPor2 +

						 "'";
	  console.log(fnetaLinkSaveFilter + filterString);
		oModel = new sap.ui.model.odata.ODataModel(fnetaService, true);
		OData.request({
		      requestUri: fnetaLinkSaveFilter + filterString,
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
							if(data.results.length == 0){
				    		sap.ui.commons.MessageBox.show("Sorry, there is an error!",
		                            sap.ui.commons.MessageBox.Icon.WARNING,
		                            "Warning",
		                            [sap.ui.commons.MessageBox.Action.OK],
		                            sap.ui.commons.MessageBox.Action.OK);
						  }
							else{
								if(data.results[0].Results == 'E'){
									sap.ui.commons.MessageBox.show("Sorry, there is an error!",
			                            sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Warning",
			                            [sap.ui.commons.MessageBox.Action.OK],
			                            sap.ui.commons.MessageBox.Action.OK);
								}else if(data.results[0].Results == 'N'){
									sap.ui.commons.MessageBox.show("Filter does not exist",
			                            sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Warning",
			                            [sap.ui.commons.MessageBox.Action.OK],
			                            sap.ui.commons.MessageBox.Action.OK);
								}else if(data.results[0].Results == 'S'){
									//sap.ui.getCore().byId("idPopoverFilterAddFavorite").close();
									var successmessage = "";
									if(deletes == "X"){
										successmessage = "Filter deleted!";
										oCurrent.setValuesFavorites(undefined);
									}else{
										successmessage = "Filter saved!";
									}

									sap.ui.commons.MessageBox.show(successmessage,
													sap.ui.commons.MessageBox.Icon.SUCCESS,
													"Saved",
													[sap.ui.commons.MessageBox.Action.OK],
													sap.ui.commons.MessageBox.Action.OK);
								}
							}
				busyDialog.close();
		},
		function(err){
				 busyDialog.close();
			});


	},

	setContentFavorites : function(favButton){

		var oCurrent = this;
		if(sap.ui.getCore().byId("idFavoritesTable") != undefined)
		  sap.ui.getCore().byId("idFavoritesTable").destroy();

		var oFavoritesTable = new sap.ui.table.Table("idFavoritesTable",{
		  width : "320px",
		  //title : "Favorties",
		  visibleRowCount: 5,
		  columnHeaderVisible : true,
		  selectionMode : sap.ui.table.SelectionMode.None
		}).addStyleClass("sapUiSizeCompact tblBorder");

		// Favorites Column

		 oFavoritesTable.addColumn(new sap.ui.table.Column({
		     label: new sap.ui.commons.Label({text: "Favorites", textAlign: "Left"}).addStyleClass("wraptextcol"),
		     template: new sap.ui.commons.Link({
		       textAlign: "Left",
					 press : function(oEvent){
						 var favorites = oEvent.getSource().getBindingContext().getProperty("Fname").trim();
						 oCurrent.getValueFilter(favorites);
					 }
		     }).bindProperty("text", "Fname").addStyleClass("borderStyle"),
		       resizable:false,
		       width:"220px"
		     }));

				 // Delete Column

				 oFavoritesTable.addColumn(new sap.ui.table.Column({
				     label: new sap.ui.commons.Label({text: "Delete", textAlign: "Left"}).addStyleClass("wraptextcol"),
						 width : "80px",
				     template: new sap.m.Button({
								 icon: "sap-icon://delete",
								 height : "45px",
								 width : "45px",
								 type:sap.m.ButtonType.Reject,
								 press:function(oEvent){
									 jQuery.sap.require("sap.ui.commons.MessageBox");
									 var favorites = oEvent.getSource().getBindingContext().getProperty("Fname").trim();
									 if (!favorites.replace(/\s/g, '').length) {
										 sap.ui.commons.MessageBox.alert("No name for the filter");
									 }else{
										 oCurrent.saveFilters(favorites, "X");
									 }
								 }
								 }).addStyleClass("borderStyle"),
				       resizable:false,
				       width:"80px"
				     }));

				oCurrent.setValuesFavorites(favButton);

		    return oFavoritesTable;

	},

	setValuesFavorites : function(favButton){

		//var filterString = "?$filter=Fname eq '" + fname + "'";
		var filterString = "";
		oModel = new sap.ui.model.odata.ODataModel(fnetaService, true);

		busyDialog.open();
		console.log(fnetaLinkGetFilter + filterString);
		OData.request({
		    requestUri: fnetaLinkGetFilter + filterString,
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

					var oJsonFilters = data.results;

			    if(oJsonFilters.length == 0){
			      console.log("No filters found; but returned nothing");
						var oFavoritesTable = sap.ui.getCore().byId("idFavoritesTable");
						oFavoritesTable.setVisibleRowCount(0);
		      	//oFavoritesTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			    }else{
			      console.log("Get Filters success");
			      var oFavoritesModel = new sap.ui.model.json.JSONModel();
			      oFavoritesModel.setData({modelData: oJsonFilters});

			      var oFavoritesTable = sap.ui.getCore().byId("idFavoritesTable");
			      oFavoritesTable.setModel(oFavoritesModel);
			      oFavoritesTable.bindRows("/modelData");

						var oJsonFiltersLength = oJsonFilters.length;
		      	if(oJsonFilters < 11){
		      		oFavoritesTable.setVisibleRowCount(10);
		      		//oFavoritesTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		      	}
		      	else{
		      		oFavoritesTable.setVisibleRowCount(oJsonFiltersLength);
		      		//oFavoritesTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		      	}
			    }
					busyDialog.close();

					if(favButton){
					/* Set Content - Favorites Popover */

					oPopoverFavorites = new sap.m.Popover({
									title: "Favorites",
									//width:"1500px",
									modal: false,
									placement: sap.m.PlacementType.Left,
									content: new sap.m.VBox({
																					//width:"300px",
																					items:  [oFavoritesTable]
																					}),

									}).addStyleClass("sapUiPopupWithPadding");


					oPopoverFavorites.openBy(favButton);
				}
		    },
		    function(error){
		      console.log("Get filters failed");
		      busyDialog.close();
		    });
	},

	getValueFilter : function(fname){
		var filterString = "?$filter=Fname eq '" + fname + "'";
		oModel = new sap.ui.model.odata.ODataModel(fnetaService, true);

		busyDialog.open();
		console.log(fnetaLinkGetFilter + filterString);
		OData.request({
		    requestUri: fnetaLinkGetFilter + filterString,
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

					var oJsonFilterValues = data.results;

			    if(oJsonFilterValues.length == 0){
			      console.log("No values found for filters");
			    }else{
			      console.log("Get values for Filter success");

						var fnetaFilter = new newfnetaFilterOuts();
						var selectedKeysC = [];

						selectedKeysC = data.results[0].Mregion.split(',');
						selectedKeysC = $.grep(selectedKeysC,function(n){ return n != "";});
						sap.ui.getCore().byId("idMRegionCombo").setSelectedKeys(selectedKeysC);
						if(selectedKeysC.length > 0)
							fnetaFilter.changeRegionCountryCityDepotFilter(selectedKeysC, 1);

						selectedKeysC = data.results[0].Region.split(',');
						selectedKeysC = $.grep(selectedKeysC,function(n){ return n != "";});
						sap.ui.getCore().byId("idRegionCombo").setSelectedKeys(selectedKeysC);
						if(selectedKeysC.length > 0)
							fnetaFilter.changeCountryCityDepotFilter(selectedKeysC, 1);

						selectedKeysC = data.results[0].Country.split(',');
						selectedKeysC = $.grep(selectedKeysC,function(n){ return n != "";});
						sap.ui.getCore().byId("idCountryCombo").setSelectedKeys(selectedKeysC);
						if(selectedKeysC.length > 0)
							fnetaFilter.changeCityDepotFilter(selectedKeysC, 1);

						selectedKeysC = data.results[0].City.split(',');
						selectedKeysC = $.grep(selectedKeysC,function(n){ return n != "";});
						sap.ui.getCore().byId("idCityCombo").setSelectedKeys(selectedKeysC);
						if(selectedKeysC.length > 0)
							fnetaFilter.changeDepotFilter(selectedKeysC, 1);

						selectedKeysC = data.results[0].Depot.split(',');
						sap.ui.getCore().byId("idDepotCombo").setSelectedKeys(selectedKeysC);

						sap.ui.getCore().byId("idLeasetypeCombo").setSelectedKeys(data.results[0].Lease.split(','));
						sap.ui.getCore().byId("idReleasetypeCombo").setSelectedKeys(data.results[0].Releases.split(','));

						selectedKeysC = data.results[0].ProCat.split(',');
						selectedKeysC = $.grep(selectedKeysC,function(n){ return n != "";});
						sap.ui.getCore().byId("idProCatCombo").setSelectedKeys(selectedKeysC);
						if(selectedKeysC.length > 0)
							fnetaFilter.changeProClassUnitTypeFilter(selectedKeysC, 1);

						selectedKeysC = data.results[0].ProClass.split(',');
						selectedKeysC = $.grep(selectedKeysC,function(n){ return n != "";});
						sap.ui.getCore().byId("idProClassCombo").setSelectedKeys(selectedKeysC);
						if(selectedKeysC.length > 0)
							fnetaFilter.changeUnitTypeFilter(selectedKeysC, 1);

						sap.ui.getCore().byId("idUnitTypeCombo").setSelectedKeys(data.results[0].UnitType.split(','));

						sap.ui.getCore().byId("idSymbolAge").setSelectedKey(data.results[0].Ages);
						sap.ui.getCore().byId("idInputAge").setValue(parseInt(data.results[0].Age1));
						sap.ui.getCore().byId("idInputAge2").setValue(parseInt(data.results[0].Age2));

						sap.ui.getCore().byId("idSymbolPor").setSelectedKey(data.results[0].Pors);
						sap.ui.getCore().byId("idInputPor").setValue(parseInt(data.results[0].Por1));
						sap.ui.getCore().byId("idInputPor2").setValue(parseInt(data.results[0].Por2));

						/* Fire press for apply filter button */

						sap.ui.getCore().byId("idApplyFilter").firePress();
						oPopoverFavorites.close();
			    }
					//busyDialog.close();
		    },
		    function(error){
		      console.log("Get values for filter failed");
		      busyDialog.close();
		    });
	},

	openUserGuide : function(oEvent){

		var fnetaService = getServiceUrl("/sap/opu/odata/sap/ZUTIL_ERP_SRV");
		var tkimageReadURL =  fnetaService + "/primageSet(Type='" + "MN" + "')/$value";

	// 	var oDialog1MNRLegendClose = new sap.ui.commons.Button({
	// 		text : "Close",
	// 		//styled:false,
	// 		visible:true,
	// 		//type:sap.m.ButtonType.Unstyled,
	// 		//icon: sap.ui.core.IconPool.getIconURI("email"),
	// 		press:function(oEvent){
	// 			oDialog1MNRLegend.close();
	// 		}
	// });


	// var oDialog1MNRLegend = new sap.ui.commons.Dialog({
	// 	width : "1000px",
	// 	height : "500px",
	// 	showCloseButton : true,
	// 	modal : true
	// });
	//  //oDialog1MNRLegend.setTitle("My first Dialog");
	//  //var oText = new sap.ui.commons.TextView({text: "Hello World!"});
	//  oDialog1MNRLegend.addContent(new sap.m.FlexBox({direction : "Column",
	// 			 items : [new sap.ui.layout.form.Form({
	// 				layout: new sap.ui.layout.form.ResponsiveGridLayout({columnsL: 2}),
	// 				formContainers: [
									
	// 								new sap.ui.layout.form.FormContainer({
	// 									//title : "Sub Type legend for Tanks",
	// 											formElements: [
	// 																			 new sap.ui.layout.form.FormElement({
	// 										 fields: [new sap.m.Image({
	// 																						 //width: "100%",
	// 																						 src: tkimageReadURL,
	// 																						 width : "1000px",
	// 	height : "500px",
	// 																					})
	// 										 ]
	// 								 })
	// 																]
	// 								})
	// 				]
	// }), new sap.m.Label({width : "15px"}), oDialog1MNRLegendClose]
	//  }));
	 //oDialog1MNRLegend.addButton(new sap.ui.commons.Button({text: "Close", press:function(){oDialog1.close();}}));

	 var oDialog1MNRLegend = new sap.m.Dialog({
		//title: "Download",
		modal: false,
		showHeader:false,
		placement: sap.m.PlacementType.Bottom,
		content: [
				new sap.m.Image({
						width : "1350px",
						height : "180px",
						src: tkimageReadURL
				})]
		});
		oDialog1MNRLegend.addButton(new sap.m.Button({text: "Close", press:function(){oDialog1MNRLegend.close();}}));
		

	 oDialog1MNRLegend.open();

	 return;

    if(sap.ui.getCore().byId("idFNETAUserGuidePopover") != undefined)
          	 sap.ui.getCore().byId("idFNETAUserGuidePopover").destroy();
        
		var oFNETAUserGuidePopover = new sap.m.Popover("idFNETAUserGuidePopover",{
            title: "M&R Sub Type Legend",
            modal: false,
            placement: sap.m.PlacementType.Bottom,
            content: /*new sap.m.VBox({
                                    //width:"300px",
                                    items:  [ new sap.m.Image({
		                                        width: "80%",
		                                        src: primageReadURL
		                                     })]
                                    }),*/
            		new sap.ui.layout.form.Form({
		             layout: new sap.ui.layout.form.ResponsiveGridLayout({columnsL: 2}),
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer({
		                    	 //title : "Sub Type legend for Tanks",
	                             formElements: [
	                                            	new sap.ui.layout.form.FormElement({
													    fields: [new sap.m.Image({
							                                        width: "100%",
							                                        src: tkimageReadURL
							                                     })
													    ]
													})
		                                     ]
		                     })
		             ]
		     })

            }).addStyleClass("sapUiPopupWithPadding");
		 	
		 oFNETAUserGuidePopover.openBy(oEvent.getSource());
		 
	}


});
