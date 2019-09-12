jQuery.sap.require("sap.ui.model.json.JSONModel");

sap.ui.model.json.JSONModel.extend("sdashmpic", {

	/* SDASHMPIC - Page - Seaco Dashboard page pic */

	createSDASHMPICPage : function(){

		var oCurrent = this;

		/* SDASHMPIC - Section - Images */

		var oSDASHMPICContentImageCarousel = oCurrent.setContentImageCarousel();

		/* SDASHMPIC - Flexbox - Final */

		var oSDASHMPICContentFinal = new sap.m.FlexBox({
		         items: [
						//oSDASHM2ContentAlertSearchButtons,
						//new sap.ui.commons.Label({
						//	text : "",
						//	width : "100px"
						//}),
						oSDASHMPICContentImageCarousel
		       ],
		       direction : "Column",
		       visible: true,
		}).addStyleClass("marginLeft20");

		return oSDASHMPICContentFinal;

	},

	/* SDASHMPIC - Content - Image Carousel */

	setContentImageCarousel : function(){

		var oSDASHMPICCarousel = new sap.m.Carousel("idSDASHMPICCarousel", {
			//pageIndicatorPlacement: sap.m.PlacementType.Top,
			//pageIndicatorPlacement: sap.m.PlacementType.Bottom,
			//activePage: jsonSDASHM3Pictures[activeImage],
			//width: "50%",
			//height: "50%",
			showPageIndicator: true,
			loop: true,
			showBusyIndicator: true,
			pages: [jsonSDASHM3Pictures]
		});

		//Listen to 'pageChanged' events
		oSDASHMPICCarousel.attachPageChanged(function(oControlEvent) {
			console.log("sap.m.Carousel: page changed: old: " + oControlEvent.getParameters().oldActivePageId );
			console.log("                              new: " + oControlEvent.getParameters().newActivePageId );
		});

		/* Text

		var oSDASHMPICLabelPicCaption = new sap.ui.commons.Label("idSDASHMPICLabelPicCaption",{
			text : "",
			//width : "100px"
		}).addStyleClass("slideimagescaption");

		var oSDASHMPICFlexPicCaption = new sap.m.FlexBox("idSDASHMPICFlexPicCaption",{
		    items: [
		            oSDASHMPICLabelPicCaption
		            ],
		    direction: "Row",
		    alignItems : sap.m.FlexAlignItems.Center,
		    justifyContent : sap.m.FlexJustifyContent.Center
		    });*/


		/* Carousel with text

		var oSDASHMPICCarouselWithText = new sap.m.FlexBox("idSDASHMPICCarouselWithText",{
		    items: [
		            oSDASHMPICCarousel,
		            oSDASHMPICFlexPicCaption
		            ],
		    direction: "Column"
		    });*/

		return oSDASHMPICCarousel;

	}
});
