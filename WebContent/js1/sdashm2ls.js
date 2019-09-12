sap.ui.model.json.JSONModel.extend("sdashm2ls", {

  sendSDASHM2LSLessorSurvey : function(btnIcon, lsdepot){
    var oCurrent = this;
    var isSelectedOne = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices().length;
    /*for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
      if(oSDASHMJsonEquipmentLevel[i].isChecked == true){
        isSelectedOne = true;
      }
    }*/

    if(isSelectedOne == 0){
      sap.ui.commons.MessageBox.alert("Select at least one order");
    }else{

      var urlToSap = "depotcontactSet(IvDepot='" + lsdepot + "')";
      urlToSap = serviceDEP + urlToSap;
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
                        console.log("Get Contact Success");

     /* To Address */

        if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyValueTo") != undefined)
            sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyValueTo").destroy();

          if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyLabelTo") != undefined)
            sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyLabelTo").destroy();

          var oSDASHM2EquipmentLevelLessorSurveyValueTo = new sap.m.Input("idSDASHM2EquipmentLevelLessorSurveyValueTo",{
                                                        value : data.EvEmailIds,
                                                        //type : sap.m.InputType.Email,
                                                        width : "405px",
                                                        }).addStyleClass("selectionLabels1");

          var oSDASHM2EquipmentLevelLessorSurveyLabelTo = new sap.m.Label("idSDASHM2EquipmentLevelLessorSurveyLabelTo",{
              text : "To Address *: ",
              labelFor: oSDASHM2EquipmentLevelLessorSurveyValueTo,
              width : "180px"
              }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");

          var oSDASHM2EquipmentLevelLessorSurveyFlexTo = new sap.m.FlexBox({
                                                         items: [oSDASHM2EquipmentLevelLessorSurveyLabelTo,
                                                                 oSDASHM2EquipmentLevelLessorSurveyValueTo
                                                                 ],
                                                         direction: "Row"
                                                         });

          /* Subject */

          if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyValueSubject") != undefined)
            sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyValueSubject").destroy();

          if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyLabelSubject") != undefined)
            sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyLabelSubject").destroy();

          var oSDASHM2EquipmentLevelLessorSurveyValueSubject = new sap.m.Input("idSDASHM2EquipmentLevelLessorSurveyValueSubject",{
                                              value : "Lessor Survey Request",
                                              maxLength : 50,
                                              width : "275px",
                                              }).addStyleClass("selectionLabels1");

          var oSDASHM2EquipmentLevelLessorSurveyLabelSubject = new sap.m.Label("idSDASHM2EquipmentLevelLessorSurveyLabelSubject",{
              text : "Subject : ",
              labelFor: oSDASHM2EquipmentLevelLessorSurveyValueSubject,
              width : "180px"
              }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");

          var oSDASHM2EquipmentLevelLessorSurveyFlexSubject = new sap.m.FlexBox({
                                                         items: [oSDASHM2EquipmentLevelLessorSurveyLabelSubject,
                                                                 oSDASHM2EquipmentLevelLessorSurveyValueSubject
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

          if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyValueBody") != undefined)
            sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyValueBody").destroy();

          if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyLabelBody") != undefined)
            sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyLabelBody").destroy();

          var oSDASHM2EquipmentLevelLessorSurveyValueBody = new sap.m.TextArea("idSDASHM2EquipmentLevelLessorSurveyValueBody",{
                     value : "Dear Sir/Madam,\n\nWe would like to conduct a Lessor Survey for the below listed unit(s)"
                     + "\n\n"
                     + equipsbody
                     + "\n\n"
                     + "Our preferred survey date is " + new Date().format("dd-mmm-yyyy") +". Please confirm this can be arranged."
                     + "\n\n"
                     + "\nThank you."
                     + "\n\nBest regards,\n"
                     + sessionStorage.name
                     + ".",
                     height : "350px",
                     width : "500px",
                     enabled : true
                     }).addStyleClass("commentsPanel");

          var oSDASHM2EquipmentLevelLessorSurveyLabelBody = new sap.m.Label("idSDASHM2EquipmentLevelLessorSurveyLabelBody",{
              text : "Email body : ",
              labelFor: oSDASHM2EquipmentLevelLessorSurveyValueBody,
              width : "180px"
              }).addStyleClass("selectionLabelsLabelPage2LessorSurvey");

          var oSDASHM2EquipmentLevelLessorSurveyFlexBody = new sap.m.FlexBox({
                                                         items: [oSDASHM2EquipmentLevelLessorSurveyLabelBody,
                                                                 oSDASHM2EquipmentLevelLessorSurveyValueBody
                                                                 ],
                                                         direction: "Row"
                                                         });

          var oSDASHM2EquipmentLevelLessorSurveyButtonSend = new sap.ui.commons.Button({
           text : "Send",
           //styled:false,
           visible:true,
           press:function(oEvent){
             oCurrent.sendSDASHM2EquipmentLevelLessorSurvey();
           }
         });//.addStyleClass("excelBtn marginTop10 floatRight");

          var oSDASHM2EquipmentLevelLessorSurveyFlexButtonCB = new sap.m.FlexBox({
              items: [
                       oSDASHM2EquipmentLevelLessorSurveyButtonSend
                      ],
              direction: "Row",
              justifyContent : "End"
              });

          var oSDASHM2EquipmentLevelLessorSurveyFlexFinal = new sap.m.FlexBox({
              items: [
                       oSDASHM2EquipmentLevelLessorSurveyFlexTo,
                       oSDASHM2EquipmentLevelLessorSurveyFlexSubject,
                       oSDASHM2EquipmentLevelLessorSurveyFlexBody,
                       new sap.m.FlexBox({
                         items : [new sap.m.Label({text : "*Denotes Required Field"}).addStyleClass("starText"),
                                 oSDASHM2EquipmentLevelLessorSurveyFlexButtonCB
                               ],
                               direction: "Row",
                               justifyContent : sap.m.FlexJustifyContent.SpaceBetween
                       }),
                      ],
              direction: "Column"
              });

          if(sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyPopover") != undefined)
            sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyPopover").destroy();

  var oSDASHM2EquipmentLevelLessorSurveyPopover = new sap.m.Popover("idSDASHM2EquipmentLevelLessorSurveyPopover",{
              title: "Lessor Survey Request",
              //modal: true,
              placement: sap.m.PlacementType.Left,
              content: new sap.m.VBox({
                                      //width:"300px",
                                      items:  [oSDASHM2EquipmentLevelLessorSurveyFlexFinal]
                                      }),

              }).addStyleClass("sapUiPopupWithPadding");

              oSDASHM2EquipmentLevelLessorSurveyPopover.openBy(btnIcon);

                         busyDialog.close();
                       },
                          function(error){
                              sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                            console.log("Get Contact Failure");
                            busyDialog.close();
                          });
    }

  },

  /* SDASHM2 - Function - Send LessorSurvey */

  sendSDASHM2EquipmentLevelLessorSurvey : function(){

    var oSDASHM2 = new sdashm2();
    var body = encodeURIComponent(sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyValueBody").getValue());
    var subject = encodeURIComponent(sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyValueSubject").getValue());
    var toaddr = encodeURIComponent(sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyValueTo").getValue());
    if(toaddr == ""){
      sap.ui.commons.MessageBox.alert("To address is mandatory");
    }else if(subject == ""){
      sap.ui.commons.MessageBox.alert("Subject is mandatory");
    }else{
    var equips = "";
    var estimatenos = "";
    var statuses = "";
    var arraySelLines = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getSelectedIndices();
    for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
      if(arraySelLines.indexOf(i) != -1){
        var oDetData = sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").getContextByIndex(i);
        if(oDetData != undefined){
        var realPath = oDetData.getPath().split('/')[2];
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


    var urlToSap = "lessorsurveySet?$filter=IvToaddr eq '" + toaddr +
                   "' and IvSubject eq '" + subject +
                   "' and IvBody eq '" + body +
                   //"' and Equips eq '" + equips +
                   "' and IvEstimate eq '" + estimatenos +
                   //"' and Status eq '" + statuses +
                   "'";

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
                        console.log("Seaco DB Send LessorSurvey Successful; but returned nothing");
                      }else if(alertResult[0].Result == ''){
                        sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                        console.log("Seaco DB Send LessorSurvey Successful; but returned nothing");
                      }else{
                        sap.ui.commons.MessageBox.alert("Email sent");
                        sap.ui.getCore().byId("idSDASHM2EquipmentLevelLessorSurveyPopover").close();
                        console.log("Seaco DB Send LessorSurvey Successful");
                        oSDASHM2.refreshSelectedUnits(); // REFRESHSELUNITS
                    }
                    },
                  function(error){
                      sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                      console.log("Seaco DB Send LessorSurvey Failure");
                    busyDialog.close();
                  });
    }


  }
});
