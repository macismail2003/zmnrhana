var oSDASHM3EditPopover = "";
sap.ui.model.json.JSONModel.extend("sdashm3edit", {

  /* SDASHM3Edit - Function - Save values */

  saveSDASHM3Edit : function(){

    //var oSDASHM3EditInputGinDate = sap.ui.getCore().byId("idSDASHM3EditInputGinDate").getValue();
    var oSDASHM3EditInputEstDate = sap.ui.getCore().byId("idSDASHM3EditInputEstDate").getValue();
    var oSDASHM3EditInputCAPR = sap.ui.getCore().byId("idSDASHM3EditInputCAPR").getValue();
    var oSDASHM3EditInputCAPRDate = sap.ui.getCore().byId("idSDASHM3EditInputCAPRDate").getValue();
    var oSDASHM3EditInputUNNO = sap.ui.getCore().byId("idSDASHM3EditInputUNNO").getValue();
    var oSDASHM3EditInputLCargo = sap.ui.getCore().byId("idSDASHM3EditInputLCargo").getValue();
    var oSDASHM3EditInputMNRComment = sap.ui.getCore().byId("idSDASHM3EditInputMNRComment").getValue();
    var oSDASHM3EditComboClear = sap.ui.getCore().byId("idSDASHM3EditComboClear").getSelectedKey();
    var oSDASHM3EditComboDisplay = sap.ui.getCore().byId("idSDASHM3EditComboDisplay").getSelectedKey();
    var oSDASHM3EditTextAreaNotes1 = sap.ui.getCore().byId("idSDASHM3EditTextAreaNotes1").getValue();
    var oSDASHM3EditTextAreaNotes2 = sap.ui.getCore().byId("idSDASHM3EditTextAreaNotes2").getValue();
    var oSDASHM3EditTextAreaNotes3 = sap.ui.getCore().byId("idSDASHM3EditTextAreaNotes3").getValue();
    var oSDASHM3EditTextAreaNotes4 = sap.ui.getCore().byId("idSDASHM3EditTextAreaNotes4").getValue();
    var oSDASHM3EditTextAreaNotes5 = sap.ui.getCore().byId("idSDASHM3EditTextAreaNotes5").getValue();

    var urlToSap = "save3Set?$filter=IvSerial eq '" + global3SerialNo +
                     "' and IvEqunr eq '" + global3Equnr +
                     "' and IvDepot eq '" + global3Depot +
                     "' and IvMnrComments eq '" + encodeURIComponent(oSDASHM3EditInputMNRComment) +
                     "' and IvRetainCmt eq '" + oSDASHM3EditComboClear +
                     "' and IvRaDisp eq '" + oSDASHM3EditComboDisplay +
                     "' and IvAppRef eq '" + oSDASHM3EditInputCAPR +
                     "' and IvAppDate eq '" + oSDASHM3EditInputCAPRDate +
                     "' and IvEstimateDate eq '" + oSDASHM3EditInputEstDate +
                     //"' and IvGateinDate eq '" + oSDASHM3EditInputGinDate +
                     "' and IvUnNo eq '" + encodeURIComponent(oSDASHM3EditInputUNNO) +
                     "' and IvLastCargo eq '" + encodeURIComponent(oSDASHM3EditInputLCargo) +
                     "' and IvNotes1 eq '" + encodeURIComponent(oSDASHM3EditTextAreaNotes1) +
                     "' and IvNotes2 eq '" + encodeURIComponent(oSDASHM3EditTextAreaNotes2) +
                     "' and IvNotes3 eq '" + encodeURIComponent(oSDASHM3EditTextAreaNotes3) +
                     "' and IvNotes4 eq '" + encodeURIComponent(oSDASHM3EditTextAreaNotes4) +
                     "' and IvNotes5 eq '" + encodeURIComponent(oSDASHM3EditTextAreaNotes5) +
                     "'";

   urlToSap = serviceDEP + urlToSap;
   console.log("Save begins...");
   console.log(urlToSap);
   oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
   busyDialog.open();
   //console.log(urlToSap);
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

                 var saveResult = data.results;

                 if(saveResult.length == 0){
                  sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                  console.log("Save Successful; but returned nothing");
                 }else if(saveResult[0].Result == ''){
                  sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                  console.log("Save Successful; but returned nothing");
                 }else{
                  sap.ui.commons.MessageBox.alert("Changes saved!");
                  console.log("Save Successful; Trying to bind header data...!");

                  busyDialog.open();
                  oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
        	        console.log(global3HeaderUrl);
        	        OData.request({
                    requestUri: global3HeaderUrl,
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
                      busyDialog.close();
                      console.log("Bind header data successful...!");

                      /* M&R Comments Section */
                      sap.ui.getCore().byId("idSDASHM3InputMNRComment").setValue(data.MnrComment);
                      sap.ui.getCore().byId("idSDASHM3ComboClear").setSelectedKey(data.ClearMnrComment);
                      sap.ui.getCore().byId("idSDASHM3ComboDisplay").setSelectedKey(data.DisplayInRa);

                      /* Notes Section First */
                      sap.ui.getCore().byId("idSDASHM3TextAreaNotes1").setValue(data.EvNotes1);
                      sap.ui.getCore().byId("idSDASHM3TextAreaNotes2").setValue(data.EvNotes2);
                      sap.ui.getCore().byId("idSDASHM3TextAreaNotes3").setValue(data.EvNotes3);
                      sap.ui.getCore().byId("idSDASHM3TextAreaNotes4").setValue(data.EvNotes4);
                      sap.ui.getCore().byId("idSDASHM3TextAreaNotes5").setValue(data.EvNotes5);

                      /* UN No. */
                      oSDASHM3JsonHeaderLines[3].value4 = data.UnNo;
                      globalUNNo = data.UnNo;

                      /* Last Cargo Name */
                      oSDASHM3JsonHeaderLines[4].value4 = data.LastCargo;
                      globalLastCargo = data.LastCargo;

                      /* Cust App Reference */
                      oSDASHM3JsonHeaderLines[2].value4 = data.CustAppRef;


                      /* Off Hire Date */

                      if(data.GateInDate != ""){

                      oSDASHM3JsonHeaderLines[1].value1 = data.GateInDate.substr(0,2)
                      + " " + m_names[parseInt(data.GateInDate.substr(3,2)) - 1]
                      + " " + data.GateInDate.substr(6,4);;
                      }else{
                        oSDASHM3JsonHeaderLines[1].value1 = "";
                      }
                      globalGateInDate = data.GateInDate;

                      /* Customer Approval Date */
                      if(data.CustAppDate != ""){

                         oSDASHM3JsonHeaderLines[1].value4 = data.CustAppDate.substr(0,2)
                                      + " " + m_names[parseInt(data.CustAppDate.substr(3,2)) - 1]
                                      + " " + data.CustAppDate.substr(6,4);
                      }else{
                        oSDASHM3JsonHeaderLines[1].value4 = "";
                      }
                      globalCustAppDate =  data.CustAppDate;

                      var oSDASHM3ModelHeaderDetails = new sap.ui.model.json.JSONModel();
                      oSDASHM3ModelHeaderDetails.setData({modelData: oSDASHM3JsonHeaderLines});

                      var oSDASHM3TableHeaderDetails = sap.ui.getCore().byId("idSDASHM3TableHeaderDetails");
                      oSDASHM3TableHeaderDetails.setModel(oSDASHM3ModelHeaderDetails);
                      oSDASHM3TableHeaderDetails.setVisibleRowCount(oSDASHM3JsonHeaderLines.length);
                      oSDASHM3TableHeaderDetails.bindRows("/modelData");

                    },
	                  function(error){
                      busyDialog.close();
	                     console.log("Bind header data failed...!");
	                  });
                 }
               },
             function(error){
                sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                console.log("Save Failure");
                busyDialog.close();
             });

  },

  /* SDASHM3Edit - Function - Content Header */

  setSDASHM3EditContentHeader : function(){
    var oCurrent = this;

    /* SDASHM3Edit - Content - Header */

    /* Gate IN Date
    if(sap.ui.getCore().byId("idSDASHM3EditInputGinDate") != undefined){
      sap.ui.getCore().byId("idSDASHM3EditInputGinDate").destroy();
    }

    var oSDASHM3EditInputGinDate = new sap.m.DatePicker("idSDASHM3EditInputGinDate",{
          	displayFormat : "dd/MM/yyyy",
          	valueFormat : "dd/MM/yyyy",
          	value : globalGateInDate,
						change : function(){
						},
          	width : "130px"
          });

    var oSDASHM3EditLabelGinDate = new sap.m.Label({
			  text : "Off Hire Date",
			  width : "120px"
        }).addStyleClass("selectionLabels");


		var oSDASHM3EditFlexGinDate = new sap.m.FlexBox({
		             items: [oSDASHM3EditLabelGinDate,
		                     oSDASHM3EditInputGinDate
		                     ],
		             width: "300px",
		             direction: "Row"
		});*/

    /* Estimate Date */
    if(sap.ui.getCore().byId("idSDASHM3EditInputEstDate") != undefined){
      sap.ui.getCore().byId("idSDASHM3EditInputEstDate").destroy();
    }

    var oSDASHM3EditInputEstDate = new sap.m.DatePicker("idSDASHM3EditInputEstDate",{
          	displayFormat : "dd/MM/yyyy",
          	valueFormat : "dd/MM/yyyy",
          	value : globalGateInDate,
						change : function(){
						},
          	width : "130px"
          });

    var oSDASHM3EditLabelEstDate = new sap.m.Label({
			  text : "Estimate Date",
			  width : "120px"
        }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");


		var oSDASHM3EditFlexEstDate = new sap.m.FlexBox({
		             items: [oSDASHM3EditLabelEstDate,
		                     oSDASHM3EditInputEstDate
		                     ],
		             width: "300px",
		             direction: "Row",
                 visible : false
		});


    /* Customer App Date */
    if(sap.ui.getCore().byId("idSDASHM3EditInputCAPRDate") != undefined){
      sap.ui.getCore().byId("idSDASHM3EditInputCAPRDate").destroy();
    }

    var localCustAppDate = "";
    if(globalCustAppDate != "" && globalCustAppDate != null && globalCustAppDate != undefined)
       localCustAppDate = globalCustAppDate.substr(6,4) + globalCustAppDate.substr(3,2) + globalCustAppDate.substr(0,2);

    var oSDASHM3EditInputCAPRDate = new sap.m.DatePicker("idSDASHM3EditInputCAPRDate",{
            displayFormat : "dd/MM/yyyy",
            valueFormat : "yyyyMMdd",
            value : localCustAppDate,
            change : function(){
            },
            width : "130px"
          });

    var oSDASHM3EditLabelCAPRDate = new sap.m.Label({
          text : "Cust. Appr. Date",
          width : "180px"
        }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");


    var oSDASHM3EditFlexCAPRDate = new sap.m.FlexBox({
                 items: [oSDASHM3EditLabelCAPRDate,
                         oSDASHM3EditInputCAPRDate
                         ],
                 width: "300px",
                 direction: "Row"
    });

    /* CAPR Number */
    if(sap.ui.getCore().byId("idSDASHM3EditInputCAPR") != undefined){
      sap.ui.getCore().byId("idSDASHM3EditInputCAPR").destroy();
    }

    var oSDASHM3EditInputCAPR = new sap.m.Input("idSDASHM3EditInputCAPR",{
            value : oSDASHM3JsonHeaderLines[2].value4,
            width : "230px",
            liveChange : function(){
            }
        });

        var oSDASHM3EditLabelCAPR = new sap.m.Label({
        text : "Cust. App Reference",
        width : "180px"
        }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");


      var oSDASHM3EditFlexCAPR = new sap.m.FlexBox({
                   items: [oSDASHM3EditLabelCAPR,
                           oSDASHM3EditInputCAPR
                           ],
                   width: "480px",
                   direction: "Row"
      });



      /* UN No. */
      if(sap.ui.getCore().byId("idSDASHM3EditInputUNNO") != undefined){
        sap.ui.getCore().byId("idSDASHM3EditInputUNNO").destroy();
      }
      var oSDASHM3EditInputUNNO = new sap.m.Input("idSDASHM3EditInputUNNO",{
              value : globalUNNo,
              width : "120px",
              liveChange : function(){
              }
      });

      var oSDASHM3EditLabelUNNO = new sap.m.Label({
            text : "UN No.",
            width : "180px"
          }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");


      var oSDASHM3EditFlexUNNO = new sap.m.FlexBox({
                   items: [oSDASHM3EditLabelUNNO,
                           oSDASHM3EditInputUNNO
                           ],
                   width: "200px",
                   direction: "Row"
      });

      /* Last Cargo */
      if(sap.ui.getCore().byId("idSDASHM3EditInputLCargo") != undefined){
        sap.ui.getCore().byId("idSDASHM3EditInputLCargo").destroy();
      }
      var oSDASHM3EditInputLCargo = new sap.m.Input("idSDASHM3EditInputLCargo",{
              value : globalLastCargo,
              width : "230px",
              liveChange : function(){
              }
      });

      var oSDASHM3EditLabelLCargo = new sap.m.Label({
            text : "Last Cargo",
            width : "180px"
          }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");


      var oSDASHM3EditFlexLCargo = new sap.m.FlexBox({
                   items: [oSDASHM3EditLabelLCargo,
                           oSDASHM3EditInputLCargo
                           ],
                   width: "480px",
                   direction: "Row"
      });

      /* M&R Comment */
      if(sap.ui.getCore().byId("idSDASHM3EditInputMNRComment") != undefined){
        sap.ui.getCore().byId("idSDASHM3EditInputMNRComment").destroy();
      }
      var oSDASHM3EditInputMNRComment = new sap.m.Input("idSDASHM3EditInputMNRComment",{
              value : oSDASHM3JsonMiscInfo[0].value1,
              width : "230px",
              liveChange : function(){
              }
      });

      var oSDASHM3EditLabelMNRComment = new sap.m.Label({
            text : "M&R Comment",
            width : "180px"
          }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");

      var oSDASHM3EditFlexMNRComment = new sap.m.FlexBox({
                   items: [oSDASHM3EditLabelMNRComment,
                           oSDASHM3EditInputMNRComment
                           ],
                   width: "480px",
                   direction: "Row"
      });

      /* Clear M&R Comment */
      if(sap.ui.getCore().byId("idSDASHM3EditComboClear") != undefined){
        sap.ui.getCore().byId("idSDASHM3EditComboClear").destroy();
      }
      var oSDASHM3EditComboClear = new sap.m.ComboBox("idSDASHM3EditComboClear", {
        width : "120px"
  		});

  		oSDASHM3EditComboClear.addItem(new sap.ui.core.ListItem({
  										text:"Yes",
  										key: "Y"
  										}));

  		oSDASHM3EditComboClear.addItem(new sap.ui.core.ListItem({
                			text:"No",
                			key: "N"
  			}));

      if(oSDASHM3JsonMiscInfo[0].value2 != ""){
          oSDASHM3EditComboClear.setSelectedKey(oSDASHM3JsonMiscInfo[0].value2.substr(0,1));
      }else{
          oSDASHM3EditComboClear.setSelectedKey("");
      }

      if(sap.ui.getCore().byId("idSDASHM3EditLabelClear") != undefined){
        sap.ui.getCore().byId("idSDASHM3EditLabelClear").destroy();
      }
      var oSDASHM3EditLabelClear = new sap.m.Label("idSDASHM3EditLabelClear",{
			  text : "Remove Cmts at Pick",
			  width : "180px"
      }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");

      if(sap.ui.getCore().byId("idSDASHM3EditFlexClear") != undefined){
        sap.ui.getCore().byId("idSDASHM3EditFlexClear").destroy();
      }
  		var oSDASHM3EditFlexClear = new sap.m.FlexBox("idSDASHM3EditFlexClear",{
  		             items: [oSDASHM3EditLabelClear,
  		                     oSDASHM3EditComboClear
  		                     ],
  		             width: "200px",
  		             direction: "Row"
  		});

      /* Clear M&R Comment */
      if(sap.ui.getCore().byId("idSDASHM3EditComboDisplay") != undefined){
        sap.ui.getCore().byId("idSDASHM3EditComboDisplay").destroy();
      }
      var oSDASHM3EditComboDisplay = new sap.m.ComboBox("idSDASHM3EditComboDisplay", {
        width : "120px"
      });

      oSDASHM3EditComboDisplay.addItem(new sap.ui.core.ListItem({
                      text:"Yes",
                      key: "Y"
                      }));

      oSDASHM3EditComboDisplay.addItem(new sap.ui.core.ListItem({
                      text:"No",
                      key: "N"
        }));

        if(oSDASHM3JsonMiscInfo[0].value3 != ""){
            oSDASHM3EditComboDisplay.setSelectedKey(oSDASHM3JsonMiscInfo[0].value3.substr(0,1));
        }else{
            oSDASHM3EditComboDisplay.setSelectedKey("");
        }


        if(sap.ui.getCore().byId("idSDASHM3EditLabelDisplay") != undefined){
          sap.ui.getCore().byId("idSDASHM3EditLabelDisplay").destroy();
        }

      var oSDASHM3EditLabelDisplay = new sap.m.Label("idSDASHM3EditLabelDisplay",{
        text : "Display in RA?",
        width : "180px"
      }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");


      if(sap.ui.getCore().byId("idSDASHM3EditFlexDisplay") != undefined){
        sap.ui.getCore().byId("idSDASHM3EditFlexDisplay").destroy();
      }

      var oSDASHM3EditFlexDisplay = new sap.m.FlexBox("idSDASHM3EditFlexDisplay",{
                   items: [oSDASHM3EditLabelDisplay,
                           oSDASHM3EditComboDisplay
                           ],
                   width: "200px",
                   direction: "Row"
      });

      /* SDASHM3Edit - Content 1 - Header */
      var oSDASHM3EditFlexContent1 = new sap.m.FlexBox({
                   items: [//oSDASHM3EditFlexGinDate,
                           oSDASHM3EditFlexLCargo,
                           oSDASHM3EditFlexCAPR,
                           oSDASHM3EditFlexMNRComment
                           ],
                   direction: "Column"
      });

      /* SDASHM3Edit - Content 2 - Header */
      var oSDASHM3EditFlexContent2 = new sap.m.FlexBox({
                  items: [      oSDASHM3EditFlexUNNO,
                                oSDASHM3EditFlexCAPRDate,
                                oSDASHM3EditFlexClear,
                                oSDASHM3EditFlexDisplay
                           ],
                   direction: "Column"
      });

      /* SDASHM3Edit - Content 3 - Header
      var oSDASHM3EditFlexContent3 = new sap.m.FlexBox({
                  items: [    oSDASHM3EditFlexUNNO,

                           ],
                   direction: "Column"
      }); */

      /* SDASHM3Edit - Content - Header */
      var oSDASHM3EditFlexContent = new sap.m.FlexBox({
                  items: [    oSDASHM3EditFlexContent1,
                              new sap.m.Label(),
                              oSDASHM3EditFlexContent2
                           ],
                   direction: "Row"
      });

    /* SDASHM3Edit - Form Container - Header */

    var oSDASHM3EditFormContHeader = new sap.ui.layout.form.FormContainer({
      title: "M&R Summary",
      formElements: [
        new sap.ui.layout.form.FormElement({
          fields: [oSDASHM3EditFlexContent],
        })
      ]
    });

    /* SDASHM3Edit - Text Area - Notes 1 */
    if(sap.ui.getCore().byId("idSDASHM3EditTextAreaNotes1") != undefined){
      sap.ui.getCore().byId("idSDASHM3EditTextAreaNotes1").destroy();
    }
		var oSDASHM3EditTextAreaNotes1 = new sap.m.TextArea("idSDASHM3EditTextAreaNotes1",{
				placeholder : "Notes 1",
				height : "60px",
				width : "200px",
				enabled : true,
        value : oSDASHM3JsonMiscInfo[1].value1
			}).addStyleClass("commentsPanel");

		/* SDASHM3Edit - Text Area - Notes 2 */
    if(sap.ui.getCore().byId("idSDASHM3EditTextAreaNotes2") != undefined){
      sap.ui.getCore().byId("idSDASHM3EditTextAreaNotes2").destroy();
    }
		var oSDASHM3EditTextAreaNotes2 = new sap.m.TextArea("idSDASHM3EditTextAreaNotes2",{
				placeholder : "Notes 2",
				height : "60px",
				width : "200px",
				enabled : true,
        value : oSDASHM3JsonMiscInfo[1].value2
			}).addStyleClass("commentsPanel");

		/* SDASHM3Edit - Text Area - Notes 3 */
    if(sap.ui.getCore().byId("idSDASHM3EditTextAreaNotes3") != undefined){
      sap.ui.getCore().byId("idSDASHM3EditTextAreaNotes3").destroy();
    }
		var oSDASHM3EditTextAreaNotes3 = new sap.m.TextArea("idSDASHM3EditTextAreaNotes3",{
				placeholder : "Notes 3",
				height : "60px",
				width : "200px",
				enabled : true,
        value : oSDASHM3JsonMiscInfo[1].value3
			}).addStyleClass("commentsPanel");

		/* SDASHM3Edit - Text Area - Notes 4 */
    if(sap.ui.getCore().byId("idSDASHM3EditTextAreaNotes4") != undefined){
      sap.ui.getCore().byId("idSDASHM3EditTextAreaNotes4").destroy();
    }
		var oSDASHM3EditTextAreaNotes4 = new sap.m.TextArea("idSDASHM3EditTextAreaNotes4",{
				placeholder : "Notes 4",
				height : "60px",
				width : "200px",
				enabled : true,
        value : oSDASHM3JsonMiscInfo[2].value1
			}).addStyleClass("commentsPanel");

		/* SDASHM3Edit - Text Area - Notes 5 */
    if(sap.ui.getCore().byId("idSDASHM3EditTextAreaNotes5") != undefined){
      sap.ui.getCore().byId("idSDASHM3EditTextAreaNotes5").destroy();
    }
		var oSDASHM3EditTextAreaNotes5 = new sap.m.TextArea("idSDASHM3EditTextAreaNotes5",{
				placeholder : "Notes 5",
				height : "60px",
				width : "200px",
				enabled : true,
        value : oSDASHM3JsonMiscInfo[2].value2
			}).addStyleClass("commentsPanel");

		/* SDASHM3Edit - FlexBox - Notes Line 1 */
    if(sap.ui.getCore().byId("idSDASHM3EditFlexNotesLine1") != undefined){
      sap.ui.getCore().byId("idSDASHM3EditFlexNotesLine1").destroy();
    }
		var oSDASHM3EditFlexNotesLine1 = new sap.m.FlexBox("idSDASHM3EditFlexNotesLine1",{
		    items: [
		            oSDASHM3EditTextAreaNotes1,
		            new sap.m.Label({width:"15px"}),
		            oSDASHM3EditTextAreaNotes2
		            ],
		    direction: "Row"
		    });

		/* SDASHM3Edit - FlexBox - Notes Line 2 */
    if(sap.ui.getCore().byId("idSDASHM3EditFlexNotesLine2") != undefined){
      sap.ui.getCore().byId("idSDASHM3EditFlexNotesLine2").destroy();
    }
		var oSDASHM3EditFlexNotesLine2 = new sap.m.FlexBox("idSDASHM3EditFlexNotesLine2",{
		    items: [
		            oSDASHM3EditTextAreaNotes3,
		            new sap.m.Label({width:"15px"}),
		            oSDASHM3EditTextAreaNotes4
		            ],
		    direction: "Row"
		    });

		/* SDASHM3Edit - FlexBox - Notes Line 3 */
    if(sap.ui.getCore().byId("idSDASHM3EditFlexNotesLine3") != undefined){
      sap.ui.getCore().byId("idSDASHM3EditFlexNotesLine3").destroy();
    }
		var oSDASHM3EditFlexNotesLine3 = new sap.m.FlexBox("idSDASHM3EditFlexNotesLine3",{
		    items: [
		            oSDASHM3EditTextAreaNotes5
		            ],
		    direction: "Row"
		    });

		/* SDASHM3Edit - FlexBox - Notes */
    if(sap.ui.getCore().byId("idSDASHM3EditFlexNotes") != undefined){
      sap.ui.getCore().byId("idSDASHM3EditFlexNotes").destroy();
    }
		var oSDASHM3EditFlexNotes = new sap.m.FlexBox("idSDASHM3EditFlexNotes",{
		    items: [
		            oSDASHM3EditFlexNotesLine1,
		            oSDASHM3EditFlexNotesLine2,
		            oSDASHM3EditFlexNotesLine3
		            ],
		    direction: "Column"
		    });

        if(sap.ui.getCore().byId("idSDASHM3EditLayoutHeader") != undefined){
          sap.ui.getCore().byId("idSDASHM3EditLayoutHeader").destroy();
        }

      var oSDASHM3EditLayoutHeader = new sap.ui.layout.form.ResponsiveGridLayout("idSDASHM3EditLayoutHeader", {
  			columnsL: 1,
  			columnsM: 1,
  			columnsS: 1,
  		});

      if(sap.ui.getCore().byId("idSDASHM3EditFormHeader") != undefined){
        sap.ui.getCore().byId("idSDASHM3EditFormHeader").destroy();
      }

		var oSDASHM3EditFormHeader = new sap.ui.layout.form.Form("idSDASHM3EditFormHeader",{
					layout: oSDASHM3EditLayoutHeader,
					width: "70%",
					formContainers: [
            oSDASHM3EditFormContHeader,
						new sap.ui.layout.form.FormContainer({
							title: "Misc. Information",
							formElements: [
								new sap.ui.layout.form.FormElement({
									fields: [oSDASHM3EditFlexNotes]
								})
								]
						})
					]
		});

    var oSDASHM3EditFlexHeader = new sap.m.FlexBox({
		    items: [
		            oSDASHM3EditFlexContent,
                oSDASHM3EditFlexNotes
		            ],
		    direction: "Column"
		    });

    return oSDASHM3EditFlexHeader;
  },

  /* SDASHM3Edit : Open Edit Popup */
  openSDASHM3EditPopup : function(editicon){

    var oCurrent = this;
		var oSDASHM3EditContentHeader = oCurrent.setSDASHM3EditContentHeader();


    var oSDASHM3EditButtonSubmit = new sap.ui.commons.Button({
        text : "Save",
        //styled:false,
        //type:sap.m.ButtonType.Unstyled,
        //icon: sap.ui.core.IconPool.getIconURI("email"),
        press:function(oEvent){
          oCurrent.saveSDASHM3Edit();
        }
      });//.addStyleClass("excelBtn marginTop10 floatRight");

    var oSDASHM3EditButtonClose = new sap.ui.commons.Button({
        text : "Close",
        //styled:false,
        visible:true,
        //type:sap.m.ButtonType.Unstyled,
        //icon: sap.ui.core.IconPool.getIconURI("email"),
        press:function(oEvent){
          oSDASHM3EditPopover.close();

          var oSDASHM3 = new sdashm3();
          oSDASHM3.setValueHeaderDetails(global3isFromSerialHistory, global3isProcessChange);
        }
    });//.addStyleClass("excelBtn marginTop10 floatRight");

    var oSDASHM3EditFlexButtons = new sap.m.FlexBox({
             items: [
                    oSDASHM3EditButtonClose,
                    new sap.m.Label({width : "15px"}),
                    oSDASHM3EditButtonSubmit
           ],
           direction : "Row",
           visible: true
    });

		/* SDASHM3Edit - Flexbox - Header and Notes */

		var oSDASHM3EditContentPopup = new sap.m.FlexBox({
		         items: [
		                oSDASHM3EditContentHeader,
		                new sap.m.Label({width : "15px"}),
		                oSDASHM3EditFlexButtons
		       ],
		       direction : "Column",
		       visible: true
		});

		/* SDASHM3Edit - Popover - Edit Content */

		oSDASHM3EditPopover = new sap.m.Popover({
	          title: "Edit",
	          modal: true,
	          placement: sap.m.PlacementType.Right,
	          content: new sap.m.VBox({
	                                  //width : "1400px",
	                                  items:  [oSDASHM3EditContentPopup]
	                                  }),
	          }).addStyleClass("sapUiPopupWithPadding");


		oSDASHM3EditPopover.openBy(editicon);

  }

});
