
jQuery.sap.require("sap.ui.model.odata.datajs");
jQuery.sap.require("sap.ui.model.json.JSONModel");

sap.ui.model.json.JSONModel.extend("f4helper", {
	
	getF4Helper : function(value, source){
	      var oCurrent = this;
	      
	      var f4Model = new sap.ui.model.json.JSONModel();
	      f4Model.setData({
	                              modelData: {
	                            	  f4Data : []
	                              }
	                              });
	      var f4data = [];
	      if(value == "depot"){
	    	  f4data = sap.ui.getCore().byId("idDepotCombo").getModel().getData().items;
	      }else if(value == "customer"){
	    	  f4data = sap.ui.getCore().byId("idCustomerCombo").getModel().getData().items;
	      }
	      
	      
	      
	      var oF4Helper = new sap.m.TableSelectDialog({
                       title :"",
                       confirm : function(oEvent){
						   //var selectedKey = oEvent.getParameter("selectedItem").getCells()[0].getText();
                    	   var selectedItems = oEvent.getParameter("selectedItems");
                    	   var selectedKeys = [];
                    	   if(value == "depot"){
                    		   selectedKeys = sap.ui.getCore().byId("idDepotCombo").getSelectedKeys();
                    	   }else if(value == "customer"){
                    		   selectedKeys = sap.ui.getCore().byId("idCustomerCombo").getSelectedKeys();
                    	   }
                    	   
                    	   var key = "";
                    	   for(var i=0; i<selectedItems.length; i++){
                    		   key = oEvent.getParameter("selectedItems")[i].getCells()[0].getText();
                    		   selectedKeys.push(key);
                    	   }
                    	   debugger;
						   if(value == "depot"){
							   sap.ui.getCore().byId("idDepotCombo").setSelectedKeys(selectedKeys);
						   }else if(value == "customer"){
							   sap.ui.getCore().byId("idCustomerCombo").setSelectedKeys(selectedKeys);
						   }						   
						   //sap.ui.getCore().getModel("oDdlMaterialModel").updateBindings();
                       },
                       //growingThreshold : 10,
                       multiSelect : true,
                       rememberSelections : true,
                       contentWidth: "800px",
                       search : oCurrent.fnDoSearchM,
                       liveChange: oCurrent.fnDoSearchM,
                       columns: [
                                 new sap.m.Column({
                                                  header: new sap.m.Label({text: "Code"}),
                                                  width: "25%"
                                                  }),
                                 new sap.m.Column({
                                                  header: new sap.m.Label({text: "Name"}),
                                                  width: "75%"
                                                  })
                                 ],
                       items: {
                       path: "/modelData/f4Data",
                       template: new sap.m.ColumnListItem({
                                                          cells: [
                                                                  new sap.m.Text({
                                                                                 text: "{key}"
                                                                                 }),
                                                                  new sap.m.Text({
                                                                                 text: "{text}"
                                                                                 })
                                                                  ]
                                                          })
                       }
                       });
	      oF4Helper.setModel(f4Model);
	      oF4Helper.getModel().setProperty("/modelData/f4Data", f4data);
	      if(value == "depot"){
	    	  oF4Helper.setTitle("Select Depots");
	      }else if(value == "customer"){
	    	  oF4Helper.setTitle("Select Customers");
	      }
	      oF4Helper.open();	 
	      
	      },
	      
	      fnDoSearchM : function(oEvent, bProductSearch){
	      var aFilters = [],
	      sSearchValue = oEvent.getParameter("value"),
	      itemsBinding = oEvent.getParameter("itemsBinding");
	      // create the local filter to apply
	      if(sSearchValue !== undefined && sSearchValue.length > 0) {
	      if(bProductSearch) {
	      // create multi-field filter to allow search over all attributes
	      aFilters.push(new sap.ui.model.Filter("text", sap.ui.model.FilterOperator.Contains , sSearchValue));
	      // apply the filter to the bound items, and the Select Dialog will update
	      itemsBinding.filter(aFilters, "Application");
	      } else {
	      // create multi-field filter to allow search over all attributes
	      aFilters.push(new sap.ui.model.Filter("key", sap.ui.model.FilterOperator.Contains , sSearchValue));
	      aFilters.push(new sap.ui.model.Filter("text", sap.ui.model.FilterOperator.Contains , sSearchValue));
	      // apply the filter to the bound items, and the Select Dialog will update
	      itemsBinding.filter(new sap.ui.model.Filter(aFilters, false), "Application"); // filters connected with OR
	      }
	      } else {
	      // filter with empty array to reset filters
	      itemsBinding.filter(aFilters);
	      }
	      
	      
	      
	      },
	      
});
