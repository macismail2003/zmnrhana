jQuery.sap.require("sap.ui.model.json.JSONModel");

sap.ui.model.json.JSONModel.extend("mains", {
	
	/* HOME - Page - Home Page */
	
	createHomePage : function(){
		
		jQuery.sap.require("sap.ui.core.IconPool");
		
		/* Pages */
		var oCdashm1 = new cdashm1();
		var oSdashm1 = new sdashm1();
		
		/* HOME - Tile Container - All */
		var oHOMEContainerAll = new sap.m.TileContainer("idHOMEContainerAll"); 
		
		/***********************************************************************************************/
		/**************************			   TILES		*****************************************/
		/***********************************************************************************************/
		
		/* HOME - Tile - Customer Dashboard Main */
		var oHOMETileCDASHM = new sap.m.StandardTile("idHOMETileCDASHM",{icon :sap.ui.core.IconPool.getIconURI("list" ),
            title:"Customer Dashboard",
            press: function(){
            	oCdashm1.setCDASHM1Values();
            	app.to("idCDASHM1Page");
			}
        }); 
		//oHOMEContainerAll.addTile(oHOMETileCDASHM); 
        
		/* HOME - Tile - Seaco Dashboard Main  */
		var oHOMETileSDASHM = new sap.m.StandardTile("idHOMETileSDASHM",{icon :sap.ui.core.IconPool.getIconURI("accounting-document-verification" ),
            title:"Seaco Dashboard",
            press: function(){
            	oSdashm1.setSDASHM1Values(false);
            	app.to("idSDASHM1Page");
			}
        }); 
		oHOMEContainerAll.addTile(oHOMETileSDASHM); 
		
		return oHOMEContainerAll;
		
	}
});