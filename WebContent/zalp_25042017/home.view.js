var enteredUnitNumbersUE = [];
var enteredUnitNumbersUENotFound = [];
var enteredUnitNumbersUEFound = [];
var atleastoneunitfound = false;
sap.ui.jsview("zalp_25042017.home", {

	/** Specifies the Controller belonging to this View.
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zalp_25042017.home
	*/
	getControllerName : function() {
		return "zalp_25042017.home";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
	* Since the Controller is given to this method, its event handlers can be attached right away.
	* @memberOf zalp_25042017.home
	*/
	createContent : function(oController) {

		/* Tank Cert Level */
		var onaCERTLevel = new newnaCERTLevel();
		var vCERTTable = onaCERTLevel.createCERTTable();

		var oCERTPage = new sap.m.Page("naCERTLevel", {
 			enableScrolling: true,
 			navButtonTap : function(){
                app.back();
             },
            showNavButton: true,
			title: "Certificates",
			content: [
			          vCERTTable
			]
		});

		jQuery.sap.require("sap.ui.core.IconPool");
		var oCERTPageBar = new sap.m.Bar("idCERTPageBar",{
				//height : "70px",
						contentLeft : [ new sap.ui.layout.HorizontalLayout({
							content : [
								new sap.m.Button({
										text : "",
//     		 	          styled:false,
//     		 	          type:sap.m.ButtonType.Unstyled,
										icon: sap.ui.core.IconPool.getIconURI("nav-back"),
										press:function(){
											var oTable = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel");          //Get Hold of table
											var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
											//oScrollBar.setScrollPosition(0);
											app.back();
										}
								}),

								new sap.ui.commons.Label( {
									width : "5px"
								}),
								new sap.ui.commons.Image( {
										src : "./images/seaco_logo.jpg",
										height : "35px",
										//width : "85px"
								}).addStyleClass("marginTop7")
											]
											}) ],

						 contentMiddle : [ new sap.m.Label("idCERTPageBarTitle",{
									text : "M&R Dashboard",
									textAlign : "Left",
									design : "Bold"
						 }).addStyleClass("fontTitle") ],

						 contentRight : [

							 new sap.m.Button("idCERTButtonHome",{
									icon: sap.ui.core.IconPool.getIconURI("home"),
									//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
									press:function(){
										sap.ui.getCore().byId("idSDASHM2PageUnitSearchResult").setText("");
										app.backToTop();
								}}),

									new sap.m.Button("idCERTButtonLogout",{
											text : "Logout",
											visible : false,
											//styled:false,
											width:"120px",
											icon: sap.ui.core.IconPool.getIconURI("log"),
											//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
											press:function(){
											jQuery.sap.require("sap.ui.commons.MessageBox");
											sap.ui.commons.MessageBox.show("Exit?",
																					 sap.ui.commons.MessageBox.Icon.WARNING,
																					 "Logout",
																					 [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
																					 oController.fnCallbackMessageBox,
																					 sap.ui.commons.MessageBox.Action.YES
											);

											}})

														 ]
		});

		oCERTPage.setCustomHeader(oCERTPageBar);
		oCERTPage.setShowHeader(true);

		/* CDASHM1 - Page - Customer Dashboard page 1 */
		var oCDASHM1Page = new sap.m.Page("idCDASHM1Page", {
 			enableScrolling: true,
 			navButtonTap : function(){
                app.back();
                },
            showNavButton: true,
			title: "Customer Dashboard",
			content: [
			        oController.createCDASHM1Page()
			]
		});


		var oCDASHM1ButtonLogout = new sap.m.Button("idCDASHM1ButtonLogout",{
            text : "Logout",
						visible : false,
            styled:false,
            width:"120px",
            //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
            press:function(){
            jQuery.sap.require("sap.ui.commons.MessageBox");
            sap.ui.commons.MessageBox.show("Exit?",
                                           sap.ui.commons.MessageBox.Icon.WARNING,
                                           "Logout",
                                           [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
                                           oController.fnCallbackMessageBox,
                                           sap.ui.commons.MessageBox.Action.YES
                                           );

            }}).addStyleClass("getListButton");
		oCDASHM1Page.addHeaderContent(oCDASHM1ButtonLogout);

/**********************************************************************************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/

		var oSdashm1 = new sdashm1();
		//oSdashm1.setUserRoles();

		/* SDASHM1 - Page - Seaco Dashboard page 1 */
		var oSDASHM1Page = new sap.m.Page("idSDASHM1Page", {
 			enableScrolling: true,
 			navButtonTap : function(){
                app.back();
                },
            showNavButton: false,
			title: "M&R Dashboard",
			content: [
			        oController.createSDASHM1Page()
			]
		});


		/*var oSDASHM1ButtonLogout = new sap.m.Button("idSDASHM1ButtonLogout",{
            text : "Logout",
            styled:false,
            width:"120px",
            //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
            press:function(){
            jQuery.sap.require("sap.ui.commons.MessageBox");
            sap.ui.commons.MessageBox.show("Exit?",
                                           sap.ui.commons.MessageBox.Icon.WARNING,
                                           "Logout",
                                           [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
                                           oController.fnCallbackMessageBox,
                                           sap.ui.commons.MessageBox.Action.YES
                                           );

            }}).addStyleClass("getListButton");
		oSDASHM1Page.addHeaderContent(oSDASHM1ButtonLogout);*/

		jQuery.sap.require("sap.ui.core.IconPool");
		var oSDASHM1PageBar = new sap.m.Bar("idSDASHM1PageBar",{
			  //height : "70px",
	          contentLeft : [ new sap.ui.layout.HorizontalLayout({
	     		    content : [

								new sap.ui.commons.Image( {
								    src : "./images/seaco_logo.jpg",
								    height : "35px",
								    //width : "85px"
								}).addStyleClass("marginTop7"),

								new sap.ui.commons.Label( {
							          width : "5px"
		     		   		    }),

		     		   		    new sap.m.SearchField("idSDASHM1PageBarInputSearch", {
			                    width: "295px",
			                    height : "45px",
			                    placeholder: "Quick Search: Unit or Estimate #",
			                    search : function(oEvent){
			                    	var oSdashm2 = new sdashm2();
														enteredUnitNumbersUE = [];
														enteredUnitNumbersUENotFound = [];
														enteredUnitNumbersUEFound = [];
			                    	var text = oEvent.getParameters("query").query;
														atleastoneunitfound = false;
			                    	oSdashm2.searchSDASHM2EquipmentLevelFromSDASHM1(undefined, text);
			                    }
			                    }),

			                    new sap.ui.commons.Label( {
							          width : "5px"
		     		   		    }),

			     		   		new sap.ui.commons.Image( {
								    src : "./images/f4_help.png",
								    press : function(oEvent){

								    	if(sap.ui.getCore().byId("idSDASHM1PopupF4"))
								    		sap.ui.getCore().byId("idSDASHM1PopupF4").destroy();

								    	if(sap.ui.getCore().byId("idSDASHM1TextAreaF4"))
								    		sap.ui.getCore().byId("idSDASHM1TextAreaF4").destroy();

								    	if(sap.ui.getCore().byId("idSDASHM1ButtonF4"))
								    		sap.ui.getCore().byId("idSDASHM1ButtonF4").destroy();

								    	var oSDASHM1TextAreaF4 = new sap.m.TextArea("idSDASHM1TextAreaF4",{
					    					//maxLength : 1000,
					    					placeholder : "Units or Estimate #",
					    					//height : "300px",
					    					//width : "200px",
					    					rows : 25,
					    					cols : 35
					    					});


								    	var oSDASHM1ButtonF4 = new sap.ui.commons.Button({
					 		       	          text : "Search",
					 		       	          //styled:false,
					 		       	          visible:true,
					 		       	          //type:sap.m.ButtonType.Unstyled,
					 		       	          //icon: sap.ui.core.IconPool.getIconURI("email"),
					 		       	          press:function(oEvent){
					 		       	        	var newUnUR = sap.ui.getCore().byId("idSDASHM1TextAreaF4").getValue().split(/\n/g);
						    			    	var unitNosPass1 = "";
						    			    	var unitNosPass2 = "";
						    			    	var unitNumbrsEnteredNew = newUnUR.length;
						    			    	enteredUnitNumbersUE = [];
														enteredUnitNumbersUENotFound = [];
														enteredUnitNumbersUEFound = [];
						    			    	//alert("LEN " + unitNumbrsEnteredNew)
						    			    	for(var k=0 ; k<unitNumbrsEnteredNew ; k++){

						    			    		if(newUnUR[k].trim().length == 0){
						    			    			//alert("blnk");
						    			    			//enteredUnitNumbersUE.pop();
						    			    			//unitNumbrsEntered = unitNumbrsEntered -1;
						    			    		}
						    			    		else{
						    			    			enteredUnitNumbersUE.push(newUnUR[k].trim().toUpperCase());
						    			    		}
						    			    	}
						    			    	var oUtil = new utility();


														if(enteredUnitNumbersUE.length > 50){ //s
						    			    		sap.ui.commons.MessageBox.alert("Maximum 50 entries");
						    			    	}else if(enteredUnitNumbersUE.length == 0){ //s
						    			    		sap.ui.commons.MessageBox.alert("Please input at least 1 unit or estimate");
						    			    	}else{
						    			    	enteredUnitNumbersUE = oUtil.unique(enteredUnitNumbersUE);
						    			    	var isFirst = false;
						    			    	var isLast = false;
						    			    	var oSdashm2 = new sdashm2();
														atleastoneunitfound = false;
														oSdashm2.searchSDASHM2EquipmentLevelFromSDASHM1(0, undefined);
						    			    	/*for(var k=0 ; k<enteredUnitNumbersUE.length; k++){
						    			    		if(k == 0)
						    			    			isFirst = true;
						    			    		else
						    			    			isFirst = false;

						    			    		if(k == (enteredUnitNumbersUE.length - 1))
						    			    			isLast = true;
						    			    		else
						    			    			isLast = false;

															if(isFirst)
						    			    			oSdashm2.searchSDASHM2EquipmentLevelFromSDASHM1(enteredUnitNumbersUE[k], isFirst, isLast, k);
						    			    	}*/
						    			    	}
	 		       	          }
	 		                 });//.addStyleClass("excelBtn marginBottom10");

								        var oSDASHM1ButtonClose = new sap.ui.commons.Button({
								            text : "Close",
								            //styled:false,
								            visible:true,
								            //type:sap.m.ButtonType.Unstyled,
								            //icon: sap.ui.core.IconPool.getIconURI("email"),
								            press:function(oEvent){
								            	oSDASHM1PopupF4.close();
								            }
								        });//.addStyleClass("excelBtn marginBottom10");

								        var oSDASHM1FlexButtons = new sap.m.FlexBox({
				 		                     items: [
				 		                             	new sap.m.Label({width : "10px"}),
																					oSDASHM1ButtonClose,
				 		                             	new sap.m.Label({width : "20px"}),
				 		                             	oSDASHM1ButtonF4
				 		                             ],
				 		                     direction: "Row",
				 		                     //justifyContent : "End"
				 		                     });

								    	var oSDASHM1ButtonTextAreaF4 = new sap.m.FlexBox({
				 		                     items: [
				 		                             	oSDASHM1TextAreaF4,
				 		                             	new sap.m.Label({width : "20px"}),
				 		                             	oSDASHM1FlexButtons,
																					new sap.m.Label({width : "20px"})
				 		                             ],
				 		                     direction: "Column",
				 		                     //justifyContent : "End"
				 		                     });


								    	var oSDASHM1PopupF4 = new sap.m.Popover("idSDASHM1PopupF4",{
							    			//title: 'Search',
							    			type: 'Standard',
							    			modal:true,
							    			showHeader : false,
							    			content: [ new sap.m.VBox({
							    				 items : [//new sap.m.Text({ text: "Sign Off the appraisal for this year" }),
							    				          oSDASHM1ButtonTextAreaF4
							    				 			]
							    							})
							    			],

							    			afterClose: function() {
							    				//this.destroy();
							    				//sap.ui.getCore().byId("idPMSEATeaxAreaSignOff").destroy();
							    			}
							    		});

								    	oSDASHM1PopupF4.openBy(oEvent.getSource());
								    	//sap.ui.getCore().byId("idSDASHM1PopupF4").open();
								    }
								}).addStyleClass("f4imageheader")



	     		   		      ]
	     		   		      }) ],

				     contentMiddle : [ new sap.m.Label("idSDASHM1PageBarTitle",{
				          text : "M&R Dashboard",
				          textAlign : "Left",
				          design : "Bold"
				     }).addStyleClass("fontTitle") ],

				     contentRight : [
									new sap.m.Button("idSDASHM1ButtonLogout",{
									    text : "Logout",
											visible : false,
									    //styled:false,
									    width:"120px",
									    icon: sap.ui.core.IconPool.getIconURI("log"),
									    //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
									    press:function(){
									    jQuery.sap.require("sap.ui.commons.MessageBox");
									    sap.ui.commons.MessageBox.show("Exit?",
				                                   sap.ui.commons.MessageBox.Icon.WARNING,
				                                   "Logout",
				                                   [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
				                                   oController.fnCallbackMessageBox,
				                                   sap.ui.commons.MessageBox.Action.YES
									    );

									    }})

				                     ]
		});

		oSDASHM1Page.setCustomHeader(oSDASHM1PageBar);
		oSDASHM1Page.setShowHeader(true);
		//return oSDASHM3Page;

		oSdashm1.setSDASHM1Values(false, true); // false means NOT SHOW ALL DEPOTS; true is during login

/**********************************************************************************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/

		/* SDASHM2 - Page - Seaco Dashboard page 2 */
		var oSDASHM2Page = new sap.m.Page("idSDASHM2Page", {
 			enableScrolling: true,
 			navButtonTap : function(){
 				//var all = globalSDASHM1AllDepot;

 				//var oSdashm1 = new sdashm1();
 				//oSdashm1.setSDASHM1Values(all);

                app.back();
                },
      showNavButton: true,
			title: "Depot Overview",
			content: [
			       oController.createSDASHM2Page()
			]
		});


		/*var oSDASHM2ButtonLogout = new sap.m.Button("idSDASHM2ButtonLogout",{
            text : "Logout",
            styled:false,
            width:"120px",
            //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
            press:function(){
            jQuery.sap.require("sap.ui.commons.MessageBox");
            sap.ui.commons.MessageBox.show("Exit?",
                                           sap.ui.commons.MessageBox.Icon.WARNING,
                                           "Logout",
                                           [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
                                           oController.fnCallbackMessageBox,
                                           sap.ui.commons.MessageBox.Action.YES
                                           );

            }}).addStyleClass("getListButton");
		oSDASHM2Page.addHeaderContent(oSDASHM2ButtonLogout); */

		jQuery.sap.require("sap.ui.core.IconPool");
		var oSDASHM2PageBar = new sap.m.Bar("idSDASHM2PageBar",{
			  height : "70px",
	          contentLeft : [ new sap.ui.layout.HorizontalLayout({
	     		    content : [

	     		      		new sap.m.Button({
		     		 	          text : "",
		//     		 	          styled:false,
		//     		 	          type:sap.m.ButtonType.Unstyled,
		     		 	          icon: sap.ui.core.IconPool.getIconURI("nav-back"),
		     		 	          press:function(){
													sap.ui.getCore().byId("idSDASHM2PageUnitSearchResult").setText("");
													var oTable = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel");          //Get Hold of table
					    		        var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
					    		        //oScrollBar.setScrollPosition(0);
		     		 	        	  app.back();
		     		 	          }
		     		      	}),

	     		      		new sap.ui.commons.Label( {
						          width : "5px"
	     		   		    }),

								new sap.ui.commons.Image( {
								    src : "./images/seaco_logo.jpg",
								    height : "35px",
								    //width : "85px"
								}).addStyleClass("marginTop7"),

								new sap.ui.commons.Label( {
							          width : "5px"
		     		   		    }),

		     		   		    new sap.m.SearchField("idSDASHM2PageBarInputSearch", {
			                    width: "295px",
			                    placeholder: "Quick Search: Unit or Estimate #",
			                    search : function(oEvent){
			                    	var oSdashm2 = new sdashm2();
														enteredUnitNumbersUE = [];
														enteredUnitNumbersUENotFound = [];
														enteredUnitNumbersUEFound = [];
			                    	var text = oEvent.getParameters("query").query;
														atleastoneunitfound = false;
			                    	oSdashm2.searchSDASHM2EquipmentLevelFromSDASHM1(undefined, text);
			                    }
			                    }),

			                    new sap.ui.commons.Label( {
							          width : "5px"
		     		   		    }),

			     		   		new sap.ui.commons.Image( {
								    src : "./images/f4_help.png",
								    press : function(oEvent){

								    	if(sap.ui.getCore().byId("idSDASHM2PopupF4"))
								    		sap.ui.getCore().byId("idSDASHM2PopupF4").destroy();

								    	if(sap.ui.getCore().byId("idSDASHM2TextAreaF4"))
								    		sap.ui.getCore().byId("idSDASHM2TextAreaF4").destroy();

								    	if(sap.ui.getCore().byId("idSDASHM2ButtonF4"))
								    		sap.ui.getCore().byId("idSDASHM2ButtonF4").destroy();

								    	var oSDASHM2TextAreaF4 = new sap.m.TextArea("idSDASHM2TextAreaF4",{
					    					//maxLength : 1000,
					    					placeholder : "Units or Estimate #",
					    					//height : "300px",
					    					//width : "200px",
					    					rows : 25,
					    					cols : 35
					    					});


								    	var oSDASHM2ButtonF4 = new sap.ui.commons.Button({
					 		       	          text : "Search",
					 		       	          //styled:false,
					 		       	          visible:true,
					 		       	          //type:sap.m.ButtonType.Unstyled,
					 		       	          //icon: sap.ui.core.IconPool.getIconURI("email"),
					 		       	          press:function(oEvent){
					 		       	        	var newUnUR = sap.ui.getCore().byId("idSDASHM2TextAreaF4").getValue().split(/\n/g);
						    			    	var unitNosPass1 = "";
						    			    	var unitNosPass2 = "";
						    			    	var unitNumbrsEnteredNew = newUnUR.length;
						    			    	enteredUnitNumbersUE = [];
														enteredUnitNumbersUENotFound = [];
														enteredUnitNumbersUEFound = [];
						    			    	//alert("LEN " + unitNumbrsEnteredNew)
						    			    	for(var k=0 ; k<unitNumbrsEnteredNew ; k++){

						    			    		if(newUnUR[k].trim().length == 0){
						    			    			//alert("blnk");
						    			    			//enteredUnitNumbersUE.pop();
						    			    			//unitNumbrsEntered = unitNumbrsEntered -1;
						    			    		}
						    			    		else{
						    			    			enteredUnitNumbersUE.push(newUnUR[k].trim().toUpperCase());
						    			    		}
						    			    	}
						    			    	var oUtil = new utility();


						    			    	if(enteredUnitNumbersUE.length > 50){ //s
						    			    		sap.ui.commons.MessageBox.alert("Maximum 50 entries");
						    			    	}else if(enteredUnitNumbersUE.length == 0){ //s
						    			    		sap.ui.commons.MessageBox.alert("Please input at least 1 unit or estimate");
						    			    	}else{
						    			    	enteredUnitNumbersUE = oUtil.unique(enteredUnitNumbersUE);
						    			    	var isFirst = false;
						    			    	var isLast = false;
						    			    	var oSdashm2 = new sdashm2();
														atleastoneunitfound = false;
														oSdashm2.searchSDASHM2EquipmentLevelFromSDASHM1(0, undefined);
						    			    	/*for(var k=0 ; k<enteredUnitNumbersUE.length; k++){
						    			    		if(k == 0)
						    			    			isFirst = true;
						    			    		else
						    			    			isFirst = false;

						    			    		if(k == (enteredUnitNumbersUE.length - 1))
						    			    			isLast = true;
						    			    		else
						    			    			isLast = false;

															if(isFirst)
						    			    			oSdashm2.searchSDASHM2EquipmentLevelFromSDASHM1(enteredUnitNumbersUE[k], isFirst, isLast, k);
						    			    	}*/
						    			    	}
					 		       	          }
					 		                 });//.addStyleClass("excelBtn marginBottom10");

								        var oSDASHM2ButtonClose = new sap.ui.commons.Button({
								            text : "Close",
								            //styled:false,
								            visible:true,
								            //type:sap.m.ButtonType.Unstyled,
								            //icon: sap.ui.core.IconPool.getIconURI("email"),
								            press:function(oEvent){
								            	oSDASHM2PopupF4.close();
								            }
								        });//.addStyleClass("excelBtn marginBottom10");

								        var oSDASHM2FlexButtons = new sap.m.FlexBox({
				 		                     items: [
																	 			  new sap.m.Label({width : "10px"}),
				 		                             	oSDASHM2ButtonClose,
				 		                             	new sap.m.Label({width : "15px"}),
				 		                             	oSDASHM2ButtonF4
				 		                             ],
				 		                     direction: "Row",
				 		                     //justifyContent : "End"
				 		                     });

								    	var oSDASHM2ButtonTextAreaF4 = new sap.m.FlexBox({
				 		                     items: [
				 		                             	oSDASHM2TextAreaF4,
				 		                             	new sap.m.Label({width : "20px"}),
				 		                             	oSDASHM2FlexButtons,
																					new sap.m.Label({width : "20px"})
				 		                             ],
				 		                     direction: "Column",
				 		                     //justifyContent : "End"
				 		                     });


								    	var oSDASHM2PopupF4 = new sap.m.Popover("idSDASHM2PopupF4",{
							    			//title: 'Search',
							    			type: 'Standard',
							    			modal:true,
							    			showHeader : false,
							    			content: [ new sap.m.VBox({
							    				 items : [//new sap.m.Text({ text: "Sign Off the appraisal for this year" }),
							    				          oSDASHM2ButtonTextAreaF4
							    				 			]
							    							})
							    			],

							    			afterClose: function() {
							    				//this.destroy();
							    				//sap.ui.getCore().byId("idPMSEATeaxAreaSignOff").destroy();
							    			}
							    		});

								    	oSDASHM2PopupF4.openBy(oEvent.getSource());
								    	//sap.ui.getCore().byId("idSDASHM2PopupF4").open();
								    }
								}).addStyleClass("f4imageheader")



	     		   		      ]
	     		   		      }) ],

				     contentMiddle : [ new sap.m.Label("idSDASHM2PageBarTitle",{
				          text : "Depot Overview",
				          textAlign : "Left",
				          design : "Bold"
				     }).addStyleClass("fontTitle") ],

				     contentRight : [
							 new sap.m.Button("idSDASHM2ButtonHome",{
									icon: sap.ui.core.IconPool.getIconURI("home"),
									//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
									press:function(){
										sap.ui.getCore().byId("idSDASHM2PageUnitSearchResult").setText("");
										app.backToTop();
								}}),

									new sap.m.Button("idSDASHM2ButtonLogout",{
									    text : "Logout",
											visible : false,
									    //styled:false,
									    width:"120px",
									    icon: sap.ui.core.IconPool.getIconURI("log"),
									    //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
									    press:function(){
									    jQuery.sap.require("sap.ui.commons.MessageBox");
									    sap.ui.commons.MessageBox.show("Exit?",
				                                   sap.ui.commons.MessageBox.Icon.WARNING,
				                                   "Logout",
				                                   [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
				                                   oController.fnCallbackMessageBox,
				                                   sap.ui.commons.MessageBox.Action.YES
									    );

									    }})

				                     ]
		});

		oSDASHM2Page.setCustomHeader(oSDASHM2PageBar);
		oSDASHM2Page.setShowHeader(true);

/**********************************************************************************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/

		/* SDASHM2 - Page - Seaco Dashboard Tariff page 2 */
		var oSDASHM2TariffPage = new sap.m.Page("idSDASHM2TariffPage", {
 			enableScrolling: true,
 			navButtonTap : function(){
 				//var all = globalSDASHM1AllDepot;

 				//var oSdashm1 = new sdashm1();
 				//oSdashm1.setSDASHM1Values(all);
                app.back();
                },
            showNavButton: true,
			title: "Tariff Checker",
			content: [
			        oController.createSDASHM2TariffPage()
			]
		});


		/*var oSDASHM2TariffButtonLogout = new sap.m.Button("idSDASHM2TariffButtonLogout",{
            text : "Logout",
            styled:false,
            width:"120px",
            //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
            press:function(){
            jQuery.sap.require("sap.ui.commons.MessageBox");
            sap.ui.commons.MessageBox.show("Exit?",
                                           sap.ui.commons.MessageBox.Icon.WARNING,
                                           "Logout",
                                           [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
                                           oController.fnCallbackMessageBox,
                                           sap.ui.commons.MessageBox.Action.YES
                                           );

            }}).addStyleClass("getListButton");
		oSDASHM2TariffPage.addHeaderContent(oSDASHM2TariffButtonLogout);*/

		jQuery.sap.require("sap.ui.core.IconPool");
		var oSDASHM2TariffPageBar = new sap.m.Bar("idSDASHM2TariffPageBar",{
			  //height : "70px",
	          contentLeft : [ new sap.ui.layout.HorizontalLayout({
	     		    content : [
								new sap.m.Button({
										text : "",
								//     		 	          styled:false,
								//     		 	          type:sap.m.ButtonType.Unstyled,
										icon: sap.ui.core.IconPool.getIconURI("nav-back"),
										press:function(){
											app.back();
										}
								}),

								new sap.ui.commons.Label( {
									width : "5px"
								}),
								new sap.ui.commons.Image( {
								    src : "./images/seaco_logo.jpg",
								    height : "35px",
								    //width : "85px"
								}).addStyleClass("marginTop7"),

								new sap.ui.commons.Label( {
							          width : "5px"
		     		   		    }),

		     		   		    new sap.m.SearchField("idSDASHM2TariffPageBarInputSearch", {
			                    width: "295px",
			                    height : "45px",
			                    placeholder: "Quick Search: Unit or Estimate #",
			                    search : function(oEvent){
			                    	var oSdashm2 = new sdashm2();
														enteredUnitNumbersUE = [];
														enteredUnitNumbersUENotFound = [];
														enteredUnitNumbersUEFound = [];
			                    	var text = oEvent.getParameters("query").query;
														atleastoneunitfound = false;
			                    	oSdashm2.searchSDASHM2EquipmentLevelFromSDASHM1(undefined, text);
			                    }
			                    }),

			                    new sap.ui.commons.Label( {
							          width : "5px"
		     		   		    }),

			     		   		new sap.ui.commons.Image( {
								    src : "./images/f4_help.png",
								    press : function(oEvent){

								    	if(sap.ui.getCore().byId("idSDASHM2TariffPopupF4"))
								    		sap.ui.getCore().byId("idSDASHM2TariffPopupF4").destroy();

								    	if(sap.ui.getCore().byId("idSDASHM2TariffTextAreaF4"))
								    		sap.ui.getCore().byId("idSDASHM2TariffTextAreaF4").destroy();

								    	if(sap.ui.getCore().byId("idSDASHM2TariffButtonF4"))
								    		sap.ui.getCore().byId("idSDASHM2TariffButtonF4").destroy();

								    	var oSDASHM2TariffTextAreaF4 = new sap.m.TextArea("idSDASHM2TariffTextAreaF4",{
					    					//maxLength : 1000,
					    					placeholder : "Units or Estimate #",
					    					//height : "300px",
					    					//width : "200px",
					    					rows : 25,
					    					cols : 35
					    					});


								    	var oSDASHM2TariffButtonF4 = new sap.ui.commons.Button({
					 		       	          text : "Search",
					 		       	          //styled:false,
					 		       	          visible:true,
					 		       	          //type:sap.m.ButtonType.Unstyled,
					 		       	          //icon: sap.ui.core.IconPool.getIconURI("email"),
					 		       	          press:function(oEvent){
					 		       	        	var newUnUR = sap.ui.getCore().byId("idSDASHM2TariffTextAreaF4").getValue().split(/\n/g);
						    			    	var unitNosPass1 = "";
						    			    	var unitNosPass2 = "";
						    			    	var unitNumbrsEnteredNew = newUnUR.length;
						    			    	enteredUnitNumbersUE = [];
														enteredUnitNumbersUENotFound = [];
														enteredUnitNumbersUEFound = [];
						    			    	//alert("LEN " + unitNumbrsEnteredNew)
						    			    	for(var k=0 ; k<unitNumbrsEnteredNew ; k++){

						    			    		if(newUnUR[k].trim().length == 0){
						    			    			//alert("blnk");
						    			    			//enteredUnitNumbersUE.pop();
						    			    			//unitNumbrsEntered = unitNumbrsEntered -1;
						    			    		}
						    			    		else{
						    			    			enteredUnitNumbersUE.push(newUnUR[k].trim().toUpperCase());
						    			    		}
						    			    	}
						    			    	var oUtil = new utility();


														if(enteredUnitNumbersUE.length > 50){ //s
						    			    		sap.ui.commons.MessageBox.alert("Maximum 50 entries");
						    			    	}else if(enteredUnitNumbersUE.length == 0){ //s
						    			    		sap.ui.commons.MessageBox.alert("Please input at least 1 unit or estimate");
						    			    	}else{
						    			    	enteredUnitNumbersUE = oUtil.unique(enteredUnitNumbersUE);
						    			    	var isFirst = false;
						    			    	var isLast = false;
						    			    	var oSdashm2 = new sdashm2();
														atleastoneunitfound = false;
														oSdashm2.searchSDASHM2EquipmentLevelFromSDASHM1(0, undefined);
						    			    	/*for(var k=0 ; k<enteredUnitNumbersUE.length; k++){
						    			    		if(k == 0)
						    			    			isFirst = true;
						    			    		else
						    			    			isFirst = false;

						    			    		if(k == (enteredUnitNumbersUE.length - 1))
						    			    			isLast = true;
						    			    		else
						    			    			isLast = false;

															if(isFirst)
						    			    			oSdashm2.searchSDASHM2EquipmentLevelFromSDASHM2Tariff(enteredUnitNumbersUE[k], isFirst, isLast, k);
						    			    	}*/
						    			    	}
	 		       	          }
	 		                 });//.addStyleClass("excelBtn marginBottom10");

								        var oSDASHM2TariffButtonClose = new sap.ui.commons.Button({
								            text : "Close",
								            //styled:false,
								            visible:true,
								            //type:sap.m.ButtonType.Unstyled,
								            //icon: sap.ui.core.IconPool.getIconURI("email"),
								            press:function(oEvent){
								            	oSDASHM2TariffPopupF4.close();
								            }
								        });//.addStyleClass("excelBtn marginBottom10");

								        var oSDASHM2TariffFlexButtons = new sap.m.FlexBox({
				 		                     items: [
				 		                             	new sap.m.Label({width : "10px"}),
																					oSDASHM2TariffButtonClose,
				 		                             	new sap.m.Label({width : "20px"}),
				 		                             	oSDASHM2TariffButtonF4


				 		                             ],
				 		                     direction: "Row",
				 		                     //justifyContent : "End"
				 		                     });

								    	var oSDASHM2TariffButtonTextAreaF4 = new sap.m.FlexBox({
				 		                     items: [
				 		                             	oSDASHM2TariffTextAreaF4,
				 		                             	new sap.m.Label({width : "20px"}),
				 		                             	oSDASHM2TariffFlexButtons,
																					new sap.m.Label({width : "20px"})
				 		                             ],
				 		                     direction: "Column",
				 		                     //justifyContent : "End"
				 		                     });


								    	var oSDASHM2TariffPopupF4 = new sap.m.Popover("idSDASHM2TariffPopupF4",{
							    			//title: 'Search',
							    			type: 'Standard',
							    			modal:true,
							    			showHeader : false,
							    			content: [ new sap.m.VBox({
							    				 items : [//new sap.m.Text({ text: "Sign Off the appraisal for this year" }),
							    				          oSDASHM2TariffButtonTextAreaF4
							    				 			]
							    							})
							    			],

							    			afterClose: function() {
							    				//this.destroy();
							    				//sap.ui.getCore().byId("idPMSEATeaxAreaSignOff").destroy();
							    			}
							    		});

								    	oSDASHM2TariffPopupF4.openBy(oEvent.getSource());
								    	//sap.ui.getCore().byId("idSDASHM2TariffPopupF4").open();
								    }
								}).addStyleClass("f4imageheader")



	     		   		      ]
	     		   		      }) ],

				     contentMiddle : [ new sap.m.Label("idSDASHM2TariffPageBarTitle",{
				          text : "Tariff Checker",
				          textAlign : "Left",
				          design : "Bold"
				     }).addStyleClass("fontTitle") ],

				     contentRight : [

							 new sap.m.Button("idSDASHM2TariffButtonHome",{
								 icon: sap.ui.core.IconPool.getIconURI("home"),
								 //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
								 press:function(){
									 app.backToTop();
							 }}),

									new sap.m.Button("idSDASHM2TariffButtonLogout",{
									    text : "Logout",
											visible : false,
									    //styled:false,
									    width:"120px",
									    icon: sap.ui.core.IconPool.getIconURI("log"),
									    //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
									    press:function(){
									    jQuery.sap.require("sap.ui.commons.MessageBox");
									    sap.ui.commons.MessageBox.show("Exit?",
				                                   sap.ui.commons.MessageBox.Icon.WARNING,
				                                   "Logout",
				                                   [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
				                                   oController.fnCallbackMessageBox,
				                                   sap.ui.commons.MessageBox.Action.YES
									    );

									    }})

				                     ]
		});

		oSDASHM2TariffPage.setCustomHeader(oSDASHM2TariffPageBar);
		oSDASHM2TariffPage.setShowHeader(true);

/**********************************************************************************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/


		/* SDASHM2 - Page - Seaco Dashboard page 2 EDI List */
		/* SDASHM2 - Page - Seaco Dashboard page 2 EDI Detail */
		var oSDASHM2PageEDILIST = new sap.m.Page("idSDASHM2PageEDILIST", {
 			enableScrolling: true,
 			navButtonTap : function(){
                app.back();
                },
            showNavButton: true,
			title: "Seaco Dashboard EDI Error Details",
			content: [
			        oController.createSDASHM2EDILISTPage()
			]
		});


		/*var oSDASHM2EDIDETButtonLogout = new sap.m.Button("idSDASHM2EDIDETButtonLogout",{
            text : "Logout",
            styled:false,
            width:"120px",
            //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
            press:function(){
            jQuery.sap.require("sap.ui.commons.MessageBox");
            sap.ui.commons.MessageBox.show("Exit?",
                                           sap.ui.commons.MessageBox.Icon.WARNING,
                                           "Logout",
                                           [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
                                           oController.fnCallbackMessageBox,
                                           sap.ui.commons.MessageBox.Action.YES
                                           );

            }}).addStyleClass("getListButton");
		oSDASHM2PageEDIDET.addHeaderContent(oSDASHM2EDIDETButtonLogout);*/

		jQuery.sap.require("sap.ui.core.IconPool");
		var oSDASHM2EDIListPageBar = new sap.m.Bar("idSDASHM2PageEDILISTPageBar",{
			  //height : "70px",
	          contentLeft : [ new sap.ui.layout.HorizontalLayout({
	     		    content : [
								new sap.m.Button({
										text : "",
								//     		 	          styled:false,
								//     		 	          type:sap.m.ButtonType.Unstyled,
										icon: sap.ui.core.IconPool.getIconURI("nav-back"),
										press:function(){
											app.back();
										}
								}),

								new sap.ui.commons.Label( {
									width : "5px"
								}),
								new sap.ui.commons.Image( {
								    src : "./images/seaco_logo.jpg",
								    height : "35px",
								    //width : "85px"
								}).addStyleClass("marginTop7"),

								new sap.ui.commons.Label( {
							          width : "5px"
		     		   		    }),

		     		   		    new sap.m.SearchField("idSDASHM2PageEDILISTPageBarInputSearch", {
			                    width: "295px",
			                    height : "45px",
			                    placeholder: "Quick Search: Unit or Estimate #",
			                    search : function(oEvent){
			                    	var oSdashm2 = new sdashm2();
														enteredUnitNumbersUE = [];
														enteredUnitNumbersUENotFound = [];
														enteredUnitNumbersUEFound = [];
			                    	var text = oEvent.getParameters("query").query;
														atleastoneunitfound = false;
			                    	oSdashm2.searchSDASHM2EquipmentLevelFromSDASHM1(undefined, text);
			                    }
			                    }),

			                    new sap.ui.commons.Label( {
							          width : "5px"
		     		   		    }),

			     		   		new sap.ui.commons.Image( {
								    src : "./images/f4_help.png",
								    press : function(oEvent){

								    	if(sap.ui.getCore().byId("idSDASHM2PageEDILISTPopupF4"))
								    		sap.ui.getCore().byId("idSDASHM2PageEDILISTPopupF4").destroy();

								    	if(sap.ui.getCore().byId("idSDASHM2PageEDILISTTextAreaF4"))
								    		sap.ui.getCore().byId("idSDASHM2PageEDILISTTextAreaF4").destroy();

								    	if(sap.ui.getCore().byId("idSDASHM2PageEDILISTButtonF4"))
								    		sap.ui.getCore().byId("idSDASHM2PageEDILISTButtonF4").destroy();

								    	var oSDASHM2PageEDILISTTextAreaF4 = new sap.m.TextArea("idSDASHM2PageEDILISTTextAreaF4",{
					    					//maxLength : 1000,
					    					placeholder : "Units or Estimate #",
					    					//height : "300px",
					    					//width : "200px",
					    					rows : 25,
					    					cols : 35
					    					});


								    	var oSDASHM2PageEDILISTButtonF4 = new sap.ui.commons.Button({
					 		       	          text : "Search",
					 		       	          //styled:false,
					 		       	          visible:true,
					 		       	          //type:sap.m.ButtonType.Unstyled,
					 		       	          //icon: sap.ui.core.IconPool.getIconURI("email"),
					 		       	          press:function(oEvent){
					 		       	        	var newUnUR = sap.ui.getCore().byId("idSDASHM2PageEDILISTTextAreaF4").getValue().split(/\n/g);
						    			    	var unitNosPass1 = "";
						    			    	var unitNosPass2 = "";
						    			    	var unitNumbrsEnteredNew = newUnUR.length;
						    			    	enteredUnitNumbersUE = [];
														enteredUnitNumbersUENotFound = [];
														enteredUnitNumbersUEFound = [];
						    			    	//alert("LEN " + unitNumbrsEnteredNew)
						    			    	for(var k=0 ; k<unitNumbrsEnteredNew ; k++){

						    			    		if(newUnUR[k].trim().length == 0){
						    			    			//alert("blnk");
						    			    			//enteredUnitNumbersUE.pop();
						    			    			//unitNumbrsEntered = unitNumbrsEntered -1;
						    			    		}
						    			    		else{
						    			    			enteredUnitNumbersUE.push(newUnUR[k].trim().toUpperCase());
						    			    		}
						    			    	}
						    			    	var oUtil = new utility();


														if(enteredUnitNumbersUE.length > 50){ //s
						    			    		sap.ui.commons.MessageBox.alert("Maximum 50 entries");
						    			    	}else if(enteredUnitNumbersUE.length == 0){ //s
						    			    		sap.ui.commons.MessageBox.alert("Please input at least 1 unit or estimate");
						    			    	}else{
						    			    	enteredUnitNumbersUE = oUtil.unique(enteredUnitNumbersUE);
						    			    	var isFirst = false;
						    			    	var isLast = false;
						    			    	var oSdashm2 = new sdashm2();
														atleastoneunitfound = false;
														oSdashm2.searchSDASHM2EquipmentLevelFromSDASHM1(0, undefined);
						    			    	/*for(var k=0 ; k<enteredUnitNumbersUE.length; k++){
						    			    		if(k == 0)
						    			    			isFirst = true;
						    			    		else
						    			    			isFirst = false;

						    			    		if(k == (enteredUnitNumbersUE.length - 1))
						    			    			isLast = true;
						    			    		else
						    			    			isLast = false;

															if(isFirst)
						    			    			oSdashm2.searchSDASHM2EquipmentLevelFromSDASHM2PageEDILIST(enteredUnitNumbersUE[k], isFirst, isLast, k);
						    			    	}*/
						    			    	}
	 		       	          }
	 		                 });//.addStyleClass("excelBtn marginBottom10");

								        var oSDASHM2PageEDILISTButtonClose = new sap.ui.commons.Button({
								            text : "Close",
								            //styled:false,
								            visible:true,
								            //type:sap.m.ButtonType.Unstyled,
								            //icon: sap.ui.core.IconPool.getIconURI("email"),
								            press:function(oEvent){
								            	oSDASHM2PageEDILISTPopupF4.close();
								            }
								        });//.addStyleClass("excelBtn marginBottom10");

								        var oSDASHM2PageEDILISTFlexButtons = new sap.m.FlexBox({
				 		                     items: [
				 		                             	new sap.m.Label({width : "10px"}),
																					oSDASHM2PageEDILISTButtonClose,
				 		                             	new sap.m.Label({width : "20px"}),
				 		                             	oSDASHM2PageEDILISTButtonF4


				 		                             ],
				 		                     direction: "Row",
				 		                     //justifyContent : "End"
				 		                     });

								    	var oSDASHM2PageEDILISTButtonTextAreaF4 = new sap.m.FlexBox({
				 		                     items: [
				 		                             	oSDASHM2PageEDILISTTextAreaF4,
				 		                             	new sap.m.Label({width : "20px"}),
				 		                             	oSDASHM2PageEDILISTFlexButtons,
																					new sap.m.Label({width : "20px"})
				 		                             ],
				 		                     direction: "Column",
				 		                     //justifyContent : "End"
				 		                     });


								    	var oSDASHM2PageEDILISTPopupF4 = new sap.m.Popover("idSDASHM2PageEDILISTPopupF4",{
							    			//title: 'Search',
							    			type: 'Standard',
							    			modal:true,
							    			showHeader : false,
							    			content: [ new sap.m.VBox({
							    				 items : [//new sap.m.Text({ text: "Sign Off the appraisal for this year" }),
							    				          oSDASHM2PageEDILISTButtonTextAreaF4
							    				 			]
							    							})
							    			],

							    			afterClose: function() {
							    				//this.destroy();
							    				//sap.ui.getCore().byId("idPMSEATeaxAreaSignOff").destroy();
							    			}
							    		});

								    	oSDASHM2PageEDILISTPopupF4.openBy(oEvent.getSource());
								    	//sap.ui.getCore().byId("idSDASHM2PageEDILISTPopupF4").open();
								    }
								}).addStyleClass("f4imageheader")



	     		   		      ]
	     		   		      }) ],

				     contentMiddle : [ new sap.m.Label("idSDASHM2PageEDILISTPageBarTitle",{
				          text : "EDI List",
				          textAlign : "Left",
				          design : "Bold"
				     }).addStyleClass("fontTitle") ],

				     contentRight : [
							 new sap.m.Button("idSDASHM2PageEDILISTButtonHome",{
							 	 icon: sap.ui.core.IconPool.getIconURI("home"),
							 	 //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
							 	 press:function(){
							 		 app.backToTop();
							  }}),
									new sap.m.Button("idSDASHM2PageEDILISTButtonLogout",{
									    text : "Logout",
											visible : false,
									    //styled:false,
									    width:"120px",
									    icon: sap.ui.core.IconPool.getIconURI("log"),
									    //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
									    press:function(){
									    jQuery.sap.require("sap.ui.commons.MessageBox");
									    sap.ui.commons.MessageBox.show("Exit?",
				                                   sap.ui.commons.MessageBox.Icon.WARNING,
				                                   "Logout",
				                                   [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
				                                   oController.fnCallbackMessageBox,
				                                   sap.ui.commons.MessageBox.Action.YES
									    );

									    }})

				                     ]
		});

		oSDASHM2PageEDILIST.setCustomHeader(oSDASHM2EDIListPageBar);
		oSDASHM2PageEDILIST.setShowHeader(true);

/**********************************************************************************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/

		/* SDASHM2 - Page - Seaco Dashboard page 2 EDI Detail */
		var oSDASHM2PageEDIDET = new sap.m.Page("idSDASHM2PageEDIDET", {
 			enableScrolling: true,
 			navButtonTap : function(){
                app.back();
                },
            showNavButton: true,
			title: "Seaco Dashboard EDI Error Details",
			content: [
			        oController.createSDASHM2EDIDETPage()
			]
		});


		/*var oSDASHM2EDIDETButtonLogout = new sap.m.Button("idSDASHM2EDIDETButtonLogout",{
            text : "Logout",
            styled:false,
            width:"120px",
            //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
            press:function(){
            jQuery.sap.require("sap.ui.commons.MessageBox");
            sap.ui.commons.MessageBox.show("Exit?",
                                           sap.ui.commons.MessageBox.Icon.WARNING,
                                           "Logout",
                                           [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
                                           oController.fnCallbackMessageBox,
                                           sap.ui.commons.MessageBox.Action.YES
                                           );

            }}).addStyleClass("getListButton");
		oSDASHM2PageEDIDET.addHeaderContent(oSDASHM2EDIDETButtonLogout);*/

		jQuery.sap.require("sap.ui.core.IconPool");
		var oSDASHM2EDIDETPageBar = new sap.m.Bar("idSDASHM2PageEDIDETPageBar",{
			  //height : "70px",
	          contentLeft : [ new sap.ui.layout.HorizontalLayout({
	     		    content : [
								new sap.m.Button({
										text : "",
								//     		 	          styled:false,
								//     		 	          type:sap.m.ButtonType.Unstyled,
										icon: sap.ui.core.IconPool.getIconURI("nav-back"),
										press:function(){
											app.back();
										}
								}),

								new sap.ui.commons.Label( {
									width : "5px"
								}),
								new sap.ui.commons.Image( {
								    src : "./images/seaco_logo.jpg",
								    height : "35px",
								    //width : "85px"
								}).addStyleClass("marginTop7"),

								new sap.ui.commons.Label( {
							          width : "5px"
		     		   		    }),

		     		   		    new sap.m.SearchField("idSDASHM2PageEDIDETPageBarInputSearch", {
			                    width: "295px",
			                    height : "45px",
			                    placeholder: "Quick Search: Unit or Estimate #",
			                    search : function(oEvent){
			                    	var oSdashm2 = new sdashm2();
														enteredUnitNumbersUE = [];
														enteredUnitNumbersUENotFound = [];
														enteredUnitNumbersUEFound = [];
			                    	var text = oEvent.getParameters("query").query;
														atleastoneunitfound = false;
			                    	oSdashm2.searchSDASHM2EquipmentLevelFromSDASHM1(undefined, text);
			                    }
			                    }),

			                    new sap.ui.commons.Label( {
							          width : "5px"
		     		   		    }),

			     		   		new sap.ui.commons.Image( {
								    src : "./images/f4_help.png",
								    press : function(oEvent){

								    	if(sap.ui.getCore().byId("idSDASHM2PageEDIDETPopupF4"))
								    		sap.ui.getCore().byId("idSDASHM2PageEDIDETPopupF4").destroy();

								    	if(sap.ui.getCore().byId("idSDASHM2PageEDIDETTextAreaF4"))
								    		sap.ui.getCore().byId("idSDASHM2PageEDIDETTextAreaF4").destroy();

								    	if(sap.ui.getCore().byId("idSDASHM2PageEDIDETButtonF4"))
								    		sap.ui.getCore().byId("idSDASHM2PageEDIDETButtonF4").destroy();

								    	var oSDASHM2PageEDIDETTextAreaF4 = new sap.m.TextArea("idSDASHM2PageEDIDETTextAreaF4",{
					    					//maxLength : 1000,
					    					placeholder : "Units or Estimate #",
					    					//height : "300px",
					    					//width : "200px",
					    					rows : 25,
					    					cols : 35
					    					});


								    	var oSDASHM2PageEDIDETButtonF4 = new sap.ui.commons.Button({
					 		       	          text : "Search",
					 		       	          //styled:false,
					 		       	          visible:true,
					 		       	          //type:sap.m.ButtonType.Unstyled,
					 		       	          //icon: sap.ui.core.IconPool.getIconURI("email"),
					 		       	          press:function(oEvent){
					 		       	        	var newUnUR = sap.ui.getCore().byId("idSDASHM2PageEDIDETTextAreaF4").getValue().split(/\n/g);
						    			    	var unitNosPass1 = "";
						    			    	var unitNosPass2 = "";
						    			    	var unitNumbrsEnteredNew = newUnUR.length;
						    			    	enteredUnitNumbersUE = [];
														enteredUnitNumbersUENotFound = [];
														enteredUnitNumbersUEFound = [];
						    			    	//alert("LEN " + unitNumbrsEnteredNew)
						    			    	for(var k=0 ; k<unitNumbrsEnteredNew ; k++){

						    			    		if(newUnUR[k].trim().length == 0){
						    			    			//alert("blnk");
						    			    			//enteredUnitNumbersUE.pop();
						    			    			//unitNumbrsEntered = unitNumbrsEntered -1;
						    			    		}
						    			    		else{
						    			    			enteredUnitNumbersUE.push(newUnUR[k].trim().toUpperCase());
						    			    		}
						    			    	}
						    			    	var oUtil = new utility();


														if(enteredUnitNumbersUE.length > 50){ //s
						    			    		sap.ui.commons.MessageBox.alert("Maximum 50 entries");
						    			    	}else if(enteredUnitNumbersUE.length == 0){ //s
						    			    		sap.ui.commons.MessageBox.alert("Please input at least 1 unit or estimate");
						    			    	}else{
						    			    	enteredUnitNumbersUE = oUtil.unique(enteredUnitNumbersUE);
						    			    	var isFirst = false;
						    			    	var isLast = false;
						    			    	var oSdashm2 = new sdashm2();
														atleastoneunitfound = false;
														oSdashm2.searchSDASHM2EquipmentLevelFromSDASHM1(0, undefined);
						    			    	/*for(var k=0 ; k<enteredUnitNumbersUE.length; k++){
						    			    		if(k == 0)
						    			    			isFirst = true;
						    			    		else
						    			    			isFirst = false;

						    			    		if(k == (enteredUnitNumbersUE.length - 1))
						    			    			isLast = true;
						    			    		else
						    			    			isLast = false;

															if(isFirst)
						    			    			oSdashm2.searchSDASHM2EquipmentLevelFromSDASHM2PageEDIDET(enteredUnitNumbersUE[k], isFirst, isLast, k);
						    			    	}*/
						    			    	}
	 		       	          }
	 		                 });//.addStyleClass("excelBtn marginBottom10");

								        var oSDASHM2PageEDIDETButtonClose = new sap.ui.commons.Button({
								            text : "Close",
								            //styled:false,
								            visible:true,
								            //type:sap.m.ButtonType.Unstyled,
								            //icon: sap.ui.core.IconPool.getIconURI("email"),
								            press:function(oEvent){
								            	oSDASHM2PageEDIDETPopupF4.close();
								            }
								        });//.addStyleClass("excelBtn marginBottom10");

								        var oSDASHM2PageEDIDETFlexButtons = new sap.m.FlexBox({
				 		                     items: [
				 		                             	new sap.m.Label({width : "10px"}),
																					oSDASHM2PageEDIDETButtonClose,
				 		                             	new sap.m.Label({width : "20px"}),
				 		                             	oSDASHM2PageEDIDETButtonF4


				 		                             ],
				 		                     direction: "Row",
				 		                     //justifyContent : "End"
				 		                     });

								    	var oSDASHM2PageEDIDETButtonTextAreaF4 = new sap.m.FlexBox({
				 		                     items: [
				 		                             	oSDASHM2PageEDIDETTextAreaF4,
				 		                             	new sap.m.Label({width : "20px"}),
				 		                             	oSDASHM2PageEDIDETFlexButtons,
																					new sap.m.Label({width : "20px"})
				 		                             ],
				 		                     direction: "Column",
				 		                     //justifyContent : "End"
				 		                     });


								    	var oSDASHM2PageEDIDETPopupF4 = new sap.m.Popover("idSDASHM2PageEDIDETPopupF4",{
							    			//title: 'Search',
							    			type: 'Standard',
							    			modal:true,
							    			showHeader : false,
							    			content: [ new sap.m.VBox({
							    				 items : [//new sap.m.Text({ text: "Sign Off the appraisal for this year" }),
							    				          oSDASHM2PageEDIDETButtonTextAreaF4
							    				 			]
							    							})
							    			],

							    			afterClose: function() {
							    				//this.destroy();
							    				//sap.ui.getCore().byId("idPMSEATeaxAreaSignOff").destroy();
							    			}
							    		});

								    	oSDASHM2PageEDIDETPopupF4.openBy(oEvent.getSource());
								    	//sap.ui.getCore().byId("idSDASHM2PageEDIDETPopupF4").open();
								    }
								}).addStyleClass("f4imageheader")



	     		   		      ]
	     		   		      }) ],

				     contentMiddle : [ new sap.m.Label("idSDASHM2PageEDIDETPageBarTitle",{
				          text : "EDI Detail",
				          textAlign : "Left",
				          design : "Bold"
				     }).addStyleClass("fontTitle") ],

				     contentRight : [
							 new sap.m.Button("idSDASHM2PageEDIDETButtonHome",{
							 	 icon: sap.ui.core.IconPool.getIconURI("home"),
							 	 //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
							 	 press:function(){
							 		 app.backToTop();
							  }}),
									new sap.m.Button("idSDASHM2PageEDIDETButtonLogout",{
									    text : "Logout",
											visible : false,
									    //styled:false,
									    width:"120px",
									    icon: sap.ui.core.IconPool.getIconURI("log"),
									    //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
									    press:function(){
									    jQuery.sap.require("sap.ui.commons.MessageBox");
									    sap.ui.commons.MessageBox.show("Exit?",
				                                   sap.ui.commons.MessageBox.Icon.WARNING,
				                                   "Logout",
				                                   [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
				                                   oController.fnCallbackMessageBox,
				                                   sap.ui.commons.MessageBox.Action.YES
									    );

									    }})

				                     ]
		});

		oSDASHM2PageEDIDET.setCustomHeader(oSDASHM2EDIDETPageBar);
		oSDASHM2PageEDIDET.setShowHeader(true);

/**********************************************************************************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/


		/* HOME - Page - Home Page */
		var oHOMEPageHome = new sap.m.Page("idHOMEPageHome", {
 			enableScrolling: true,
			title: "Home Page",
			content: [
			        oController.createMainpage()
			]
		});


		/*var oHOMEButtonLogout = new sap.m.Button("idHOMEButtonLogout",{
            text : "Logout",
            styled:false,
            width:"120px",
            //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
            press:function(){
            jQuery.sap.require("sap.ui.commons.MessageBox");
            sap.ui.commons.MessageBox.show("Exit?",
                                           sap.ui.commons.MessageBox.Icon.WARNING,
                                           "Logout",
                                           [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
                                           oController.fnCallbackMessageBox,
                                           sap.ui.commons.MessageBox.Action.YES
                                           );

            }}).addStyleClass("getListButton");
		oHOMEPageHome.addHeaderContent(oHOMEButtonLogout);*/

		jQuery.sap.require("sap.ui.core.IconPool");
		var oHOMEPageHomeBar = new sap.m.Bar("idHOMEPageHomeBar",{
			  height : "70px",
	          contentLeft : [ new sap.ui.layout.HorizontalLayout({
	     		    content : [
								new sap.m.Button({
										text : "",
								//     		 	          styled:false,
								//     		 	          type:sap.m.ButtonType.Unstyled,
										icon: sap.ui.core.IconPool.getIconURI("nav-back"),
										press:function(){
											app.back();
										}
								}),

								new sap.ui.commons.Label( {
									width : "5px"
								}),
								new sap.ui.commons.Image( {
								    src : "./images/seaco_logo.jpg",
								    height : "35px",
								    //width : "85px"
								}).addStyleClass("marginTop7"),

								new sap.ui.commons.Label( {
							          width : "5px"
		     		   		    }),

		     		   		    new sap.m.SearchField("idHOMEPageHomeBarInputSearch", {
			                    width: "295px",
			                    placeholder: "Quick Search: Unit or Estimate #",
			                    search : function(oEvent){
			                    	var oSdashM2HOME = new sdashM2HOME();
														enteredUnitNumbersUE = [];
														enteredUnitNumbersUENotFound = [];
														enteredUnitNumbersUEFound = [];
			                    	var text = oEvent.getParameters("query").query;
			                    	oSdashM2HOME.searchSDASHM2HOMEEquipmentLevelFromSDASHM2HOME(text);
			                    }
			                    })



	     		   		      ]
	     		   		      }) ],

				     contentMiddle : [ new sap.m.Label("idHOMEPageHomeBarTitle",{
				          text : "Home Page",
				          textAlign : "Left",
				          design : "Bold"
				     }).addStyleClass("fontTitle") ],

				     contentRight : [
							 new sap.m.Button("idHOMEPageHomeBarButtonHome",{
							 	 icon: sap.ui.core.IconPool.getIconURI("home"),
							 	 //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
							 	 press:function(){
							 		 app.backToTop();
							  }}),
									new sap.m.Button("idHOMEPageHomeBarButtonLogout",{
										text : "Logout",
										visible : false,
									    //styled:false,
									    width:"120px",
									    icon: sap.ui.core.IconPool.getIconURI("log"),
									    //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
									    press:function(){
									    jQuery.sap.require("sap.ui.commons.MessageBox");
									    sap.ui.commons.MessageBox.show("Exit?",
				                                   sap.ui.commons.MessageBox.Icon.WARNING,
				                                   "Logout",
				                                   [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
				                                   oController.fnCallbackMessageBox,
				                                   sap.ui.commons.MessageBox.Action.YES
									    );

									    }})

				                     ]
		});

		oHOMEPageHome.setCustomHeader(oHOMEPageHomeBar);
		oHOMEPageHome.setShowHeader(true);

/**********************************************************************************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/



		/* SDASHM3 - Page - Seaco Dashboard page 3 */
		var oSDASHM3Page = new sap.m.Page("idSDASHM3Page", {
 			enableScrolling: true,
 			navButtonTap : function(){
                app.back();
                },
            showNavButton: true,
			title: "Unit Overview",
			content: [
			        oController.createSDASHM3Page()
			]
		});


		/*var oSDASHM3ButtonLogout = new sap.m.Button("idSDASHM3ButtonLogout",{
            text : "Logout",
            styled:false,
            width:"120px",
            //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
            press:function(){
            jQuery.sap.require("sap.ui.commons.MessageBox");
            sap.ui.commons.MessageBox.show("Exit?",
                                           sap.ui.commons.MessageBox.Icon.WARNING,
                                           "Logout",
                                           [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
                                           oController.fnCallbackMessageBox,
                                           sap.ui.commons.MessageBox.Action.YES
                                           );

            }}).addStyleClass("getListButton");
		oSDASHM3Page.addHeaderContent(oSDASHM3ButtonLogout);*/

		jQuery.sap.require("sap.ui.core.IconPool");
		var oSDASHM3PageBar = new sap.m.Bar("idSDASHM3PageBar",{
			  height : "70px",
	          contentLeft : [ new sap.ui.layout.HorizontalLayout({
	     		    content : [
								new sap.m.Button({
								      text : "",
								      //styled:false,
								      //type:sap.m.ButtonType.Unstyled,
								      icon: sap.ui.core.IconPool.getIconURI("nav-back"),
								      press:function(){
								    	  app.back();
												globalPicLoadNeeded = true;
								      }
										}),

										new sap.ui.commons.Label( {
								        width : "5px"
									    }),
								new sap.ui.commons.Image( {
								    src : "./images/seaco_logo.jpg",
								    height : "35px",
								    //width : "85px"
								}).addStyleClass("marginTop7"),

								new sap.ui.commons.Label( {
							          width : "5px"
		     		   		    }),

		     		   		    new sap.m.SearchField("idSDASHM3PageBarInputSearch", {
			                    width: "295px",
			                    placeholder: "Quick Search: Unit or Estimate #",
			                    visible : false,
			                    search : function(oEvent){
			                    	var oSdashM3HOME = new sdashM3HOME();
														enteredUnitNumbersUE = [];
														enteredUnitNumbersUENotFound = [];
														enteredUnitNumbersUEFound = [];
			                    	var text = oEvent.getParameters("query").query;
			                    	oSdashM3HOME.searchSDASHM3HOMEEquipmentLevelFromSDASHM3HOME(text);
			                    }
			                    })



	     		   		      ]
	     		   		      }) ],

				     contentMiddle : [ new sap.m.Label("idSDASHM3PageBarTitle",{
				          text : "Unit Overview",
				          textAlign : "Left",
				          design : "Bold"
				     }).addStyleClass("fontTitle") ],

				     contentRight : [
							 new sap.m.Button("idSDASHM3PageBarButtonHome",{
							 	 icon: sap.ui.core.IconPool.getIconURI("home"),
							 	 //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
							 	 press:function(){
							 		 app.backToTop();
									 globalPicLoadNeeded = true;
							  }}),
									new sap.m.Button("idSDASHM3PageBarButtonLogout",{
										text : "Logout",
										visible : false,
									    //styled:false,
									    width:"120px",
									    icon: sap.ui.core.IconPool.getIconURI("log"),
									    //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
									    press:function(){
									    jQuery.sap.require("sap.ui.commons.MessageBox");
									    sap.ui.commons.MessageBox.show("Exit?",
				                                   sap.ui.commons.MessageBox.Icon.WARNING,
				                                   "Logout",
				                                   [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
				                                   oController.fnCallbackMessageBox,
				                                   sap.ui.commons.MessageBox.Action.YES
									    );

									    }})

				                     ]
		});

		oSDASHM3Page.setCustomHeader(oSDASHM3PageBar);
		oSDASHM3Page.setShowHeader(true);

/**********************************************************************************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/


		/* SDASHMPIC - Page - Seaco Dashboard page Pictures */
		var oSDASHMPICPage = new sap.m.Page("idSDASHMPICPage", {
 			enableScrolling: true,
 			navButtonTap : function(){
 				//var all = globalSDASHM1AllDepot;

 				//var oSdashm1 = new sdashm1();
 				//oSdashm1.setSDASHM1Values(all);
                app.back();
                },
            showNavButton: true,
			title: "Seaco Dashboard (Repair Images)",
			content: [
			        oController.createSDASHMPICPage()
			]
		});


		/*var oSDASHMPICButtonLogout = new sap.m.Button("idSDASHMPICButtonLogout",{
            text : "Logout",
            styled:false,
            width:"120px",
            //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
            press:function(){
            jQuery.sap.require("sap.ui.commons.MessageBox");
            sap.ui.commons.MessageBox.show("Exit?",
                                           sap.ui.commons.MessageBox.Icon.WARNING,
                                           "Logout",
                                           [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
                                           oController.fnCallbackMessageBox,
                                           sap.ui.commons.MessageBox.Action.YES
                                           );

            }}).addStyleClass("getListButton");
		oSDASHMPICPage.addHeaderContent(oSDASHMPICButtonLogout);*/

		jQuery.sap.require("sap.ui.core.IconPool");
		var oSDASHMPICPageBar = new sap.m.Bar("idSDASHMPICPageBar",{
			  //height : "70px",
	          contentLeft : [ new sap.ui.layout.HorizontalLayout({
	     		    content : [

							new sap.m.Button({
							      text : "",
							      //styled:false,
							      //type:sap.m.ButtonType.Unstyled,
							      icon: sap.ui.core.IconPool.getIconURI("nav-back"),
							      press:function(){
							    	  app.back();
							      }
									}),

									new sap.ui.commons.Label( {
							        width : "5px"
								    }),

								new sap.ui.commons.Image( {
								    src : "./images/seaco_logo.jpg",
								    height : "35px",
								    //width : "85px"
								}).addStyleClass("marginTop7"),

								new sap.ui.commons.Label( {
							          width : "5px"
		     		   		    }),

		     		   		    new sap.m.SearchField("idSDASHMPICPageBarInputSearch", {
			                    width: "295px",
			                    visible : false,
			                    placeholder: "Quick Search: Unit or Estimate #",
			                    search : function(oEvent){
			                    	var oSdashMPICHOME = new sdashMPICHOME();
														enteredUnitNumbersUE = [];
														enteredUnitNumbersUENotFound = [];
														enteredUnitNumbersUEFound = [];
			                    	var text = oEvent.getParameters("query").query;
			                    	oSdashMPICHOME.searchSDASHMPICHOMEEquipmentLevelFromSDASHMPICHOME(text);
			                    }
			                    })



	     		   		      ]
	     		   		      }) ],

				     contentMiddle : [ new sap.m.Label("idSDASHMPICPageBarTitle",{
				          text : "M&R Pictures",
				          textAlign : "Left",
				          design : "Bold"
				     }).addStyleClass("fontTitle") ],

				     contentRight : [
							 new sap.m.Button("idSDASHMPICPageBarButtonHome",{
							 	 icon: sap.ui.core.IconPool.getIconURI("home"),
							 	 //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
							 	 press:function(){
							 		 app.backToTop();
							  }}),
									new sap.m.Button("idSDASHMPICPageBarButtonLogout",{
										text : "Logout",
										visible : false,
									    //styled:false,
									    width:"120px",
									    icon: sap.ui.core.IconPool.getIconURI("log"),
									    //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
									    press:function(){
									    jQuery.sap.require("sap.ui.commons.MessageBox");
									    sap.ui.commons.MessageBox.show("Exit?",
				                                   sap.ui.commons.MessageBox.Icon.WARNING,
				                                   "Logout",
				                                   [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
				                                   oController.fnCallbackMessageBox,
				                                   sap.ui.commons.MessageBox.Action.YES
									    );

									    }})

				                     ]
		});

		oSDASHMPICPage.setCustomHeader(oSDASHMPICPageBar);
		oSDASHMPICPage.setShowHeader(true);

/**********************************************************************************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/


		if(sessionStorage.dept == "SEA"){
			app.addPage(oCDASHM1Page);
			app.addPage(oSDASHM1Page);

			app.addPage(oSDASHM2Page);
			app.addPage(oSDASHM2TariffPage);
			app.addPage(oSDASHMPICPage);
			app.addPage(oSDASHM2PageEDILIST);
			app.addPage(oSDASHM2PageEDIDET);

			app.addPage(oSDASHM3Page);

			app.addPage(oHOMEPageHome);

			app.addPage(oCERTPage);

			return oSDASHM1Page;

		}
		/*else if(sessionStorage.dept == "CUS"){
			var oCdashm1 = new cdashm1();

			oCdashm1.getCDASHM16SeriesAndEstimates();

			oCdashm1.setCDASHM1Values();
			app.addPage(oCDASHM1Page);
	 		return oCDASHM1Page;
		}else if(sessionStorage.dept == "SEO"){
			app.addPage(oCDASHM1Page);

			app.addPage(oSDASHM1Page);

			app.addPage(oSDASHM2Page);
			app.addPage(oSDASHM2PageEDILIST);
			app.addPage(oSDASHM2PageEDIDET);

			app.addPage(oSDASHMPICPage);
			app.addPage(oHOMEPageHome);

			var oSdashm1 = new sdashm1();
			oSdashm1.setSDASHM1Values(false, true);
	 		return oSDASHM1Page;
		}*/
	}

});
