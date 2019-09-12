/* MAC25112016_CAPRES - Capex Reservation introduction */

jQuery.sap.require("sap.ui.model.json.JSONModel");

var FNASummaryArrayFiltered = [];
var FNASummaryArrayFinal = [];

var proClassBuffer = [];
var proCatBuffer = [];
var unitTypeFilterData = {
		  items:[]
		};

var proCatFilterData = {
		  items:[]
		};

var proClassFilterData = {
		  items:[]
		};

var mregionFilterData = {
		  items:[]
		};

var regionFilterData = {
		  items:[]
		};

var countryFilterData = {
		  items:[]
		};

var cityFilterData = {
		  items:[]
		};

var depotFilterData = {
		  items:[]
		};

var customerFilterData = {
		  items:[]
		};

var leasetypeFilterData = {
		  items:[]
		};

var releasetypeFilterData = {
		  items:[]
		};

// MACFILTER+

var gradeFilterData = {
		  items:[]
		};

var eqStatusFilterData = {
		  items:[]
		};

var siStatusFilterData = {
			items:[]
		};

// MACFILTER+

var unitTypeFilterGData = {
		  items:[]
		};

var proCatFilterGData = {
		  items:[]
		};

var proClassFilterGData = {
		  items:[]
		};

var mregionFilterGData = {
		  items:[]
		};

var regionFilterGData = {
		  items:[]
		};

var countryFilterGData = {
		  items:[]
		};

var cityFilterGData = {
		  items:[]
		};

var depotFilterGData = {
		  items:[]
		};

var customerFilterGData = {
		  items:[]
		};

var leasetypeFilterGData = {
		  items:[]
		};

var releasetypeFilterGData = {
		  items:[]
		};

// MACFILTER+

var gradeFilterGData = {
		  items:[]
		};

var eqStatusFilterGData = {
		  items:[]
		};

var siStatusFilterGData = {
		  items:[]
		};

// MACFILTER+

var sumAVLB;
var sumAVLBN;
var sumAUTH;
var sumBOOK;
var sumBOOKN;
var sumRESER;
var sumRESERN;	// MAC25112016_CAPRES
var sumTDI;
var sumTCI;
var sumODI;
var sumOCI;
var sumREDEL;
var sumHOLD;
var sumAWAP;
var sumNWAP;
var sumTTLS;
var sumNAVD;
var sumNAVN;
var sumNAVT;

var numAVLB;
var numAVLBN;
var numAUTH;
var numBOOK;
var numBOOKN;
var numRESER;
var numRESERN; 	// MAC25112016_CAPRES
var numTDI;
var numTCI;
var numODI;
var numOCI;
var numREDEL;
var numHOLD;
var numAWAP;
var numNWAP;
var numTTLS;
var numNAVD;
var numNAVN;
var numNAVT;


sap.ui.model.json.JSONModel.extend("newfnetaFilterOuts", {

	setInitialFilter : function(){

		/*Set Values for the filter MAC31082015*/

		// For Product Category...

		proCatFilterData.items = [];
    	for(var j=0;j<FNASummaryArrayF4.length;j++){
    		if(FNASummaryArrayF4[j].Pcate != ''){
    			proCatFilterData.items.push({
    			"text":FNASummaryArrayF4[j].Pcate,
    			"key":FNASummaryArrayF4[j].Pcate
    		});
    		}
    	}

    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=proCatFilterData.items.length; i < len; i++ )
    	    arr[proCatFilterData.items[i]['text']] = proCatFilterData.items[i];

    	proCatFilterData.items = [];
    	for ( var key in arr )
    		proCatFilterData.items.push(arr[key]);
    	proCatFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	proCatFilterGData.items = proCatFilterData.items;


    	var proCatModel = new sap.ui.model.json.JSONModel(proCatFilterData);
    	proCatModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idProCatCombo").setModel(proCatModel);

    	for ( var k=0; k<proCatFilterData.items.length; k++ )
    		proCatBuffer.push(proCatFilterData.items[k].key);


    	// For Product Class...

		proClassFilterData.items = [];
    	for(var j=0;j<FNASummaryArrayF4.length;j++){
    		if(FNASummaryArrayF4[j].Pclass != ''){
    			proClassFilterData.items.push({
    			"text":FNASummaryArrayF4[j].Pclass,
    			"key":FNASummaryArrayF4[j].Pclass
    		});
    		}
    	}

    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=proClassFilterData.items.length; i < len; i++ )
    	    arr[proClassFilterData.items[i]['text']] = proClassFilterData.items[i];

    	proClassFilterData.items = [];
    	for ( var key in arr )
    		proClassFilterData.items.push(arr[key]);
    	proClassFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	proClassFilterGData.items = proClassFilterData.items;


    	var proClassModel = new sap.ui.model.json.JSONModel(proClassFilterData);
    	proClassModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idProClassCombo").setModel(proClassModel);

    	for ( var k=0; k<proClassFilterData.items.length; k++ )
    		proClassBuffer.push(proClassFilterData.items[k].key);

		// For Unit Type

		unitTypeFilterData.items = [];
    	for(var j=0;j<FNASummaryArrayF4.length;j++){
    		if((FNASummaryArrayF4[j].Matnr != '') && !(isInArray(FNASummaryArrayF4[j].Matnr, proCatBuffer))){
    		unitTypeFilterData.items.push({
    			"text":FNASummaryArrayF4[j].Matnr,
    			"key":FNASummaryArrayF4[j].Matnr
    		});
    		}
    	}

    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=unitTypeFilterData.items.length; i < len; i++ )
    	    arr[unitTypeFilterData.items[i]['text']] = unitTypeFilterData.items[i];

    	unitTypeFilterData.items = [];
    	for ( var key in arr )
    		unitTypeFilterData.items.push(arr[key]);
    	unitTypeFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	unitTypeFilterGData.items = unitTypeFilterData.items;


    	var unitTypeModel = new sap.ui.model.json.JSONModel(unitTypeFilterData);
    	unitTypeModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idUnitTypeCombo").setModel(unitTypeModel);

//    	for ( var k=0; k<proCatFilterData.items.length; k++ )
//    		proCatBuffer.push(proCatFilterData.items[k].key);
//    	var unitTypeModel = new sap.ui.model.json.JSONModel(unitTypeFilterData);
//    	unitTypeModel.setSizeLimit(10000);
//    	sap.ui.getCore().byId("idUnitTypeCombo").setModel(unitTypeModel);


    	// 	For Main Region...

		mregionFilterData.items = [];
    	for(var j=0;j<FNASummaryArrayF4.length;j++){
    		if(FNASummaryArrayF4[j].Mregion != ''){
    			mregionFilterData.items.push({
    			"text":FNASummaryArrayF4[j].ZMregDesc,
    			"key":FNASummaryArrayF4[j].Mregion
    		});
    		}
    	}

    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=mregionFilterData.items.length; i < len; i++ )
    	    arr[mregionFilterData.items[i]['text']] = mregionFilterData.items[i];

    	mregionFilterData.items = [];
    	for ( var key in arr )
    		mregionFilterData.items.push(arr[key]);

    	mregionFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	mregionFilterGData.items = mregionFilterData.items;


    	var mregionModel = new sap.ui.model.json.JSONModel(mregionFilterData);
    	mregionModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idMRegionCombo").setModel(mregionModel);

    	//for ( var k=0; k<regionFilterData.items.length; k++ )
    		//regionBuffer.push(regionFilterData.items[k].key);



    	// For Region...

		regionFilterData.items = [];
    	for(var j=0;j<FNASummaryArrayF4.length;j++){
    		if(FNASummaryArrayF4[j].Region != ''){
    			regionFilterData.items.push({
    			"text":FNASummaryArrayF4[j].ZRegDesc,
    			"key":FNASummaryArrayF4[j].Region
    		});
    		}
    	}

    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=regionFilterData.items.length; i < len; i++ )
    	    arr[regionFilterData.items[i]['text']] = regionFilterData.items[i];

    	regionFilterData.items = [];
    	for ( var key in arr )
    		regionFilterData.items.push(arr[key]);

    	regionFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	regionFilterGData.items = regionFilterData.items;


    	var regionModel = new sap.ui.model.json.JSONModel(regionFilterData);
    	regionModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idRegionCombo").setModel(regionModel);

    	//for ( var k=0; k<regionFilterData.items.length; k++ )
    		//regionBuffer.push(regionFilterData.items[k].key);

    	// For Country...

		countryFilterData.items = [];
    	for(var j=0;j<FNASummaryArrayF4.length;j++){
    		if(FNASummaryArrayF4[j].Country != ''){
    			countryFilterData.items.push({
    			"text":FNASummaryArrayF4[j].ZCouDesc,
    			"key":FNASummaryArrayF4[j].Country
    		});
    		}
    	}

    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=countryFilterData.items.length; i < len; i++ )
    	    arr[countryFilterData.items[i]['text']] = countryFilterData.items[i];

    	countryFilterData.items = [];
    	for ( var key in arr )
    		countryFilterData.items.push(arr[key]);

    	countryFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	countryFilterGData.items = countryFilterData.items;


    	var countryModel = new sap.ui.model.json.JSONModel(countryFilterData);
    	countryModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idCountryCombo").setModel(countryModel);

    	//for ( var k=0; k<countryFilterData.items.length; k++ )
    		//countryBuffer.push(countryFilterData.items[k].key);

    	// For City...

		cityFilterData.items = [];
    	for(var j=0;j<FNASummaryArrayF4.length;j++){
    		if(FNASummaryArrayF4[j].City != ''){
    			cityFilterData.items.push({
    			"text":FNASummaryArrayF4[j].ZCityDesc,
    			"key":FNASummaryArrayF4[j].City
    		});
    		}
    	}

    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=cityFilterData.items.length; i < len; i++ )
    	    arr[cityFilterData.items[i]['text']] = cityFilterData.items[i];

    	cityFilterData.items = [];
    	for ( var key in arr )
    		cityFilterData.items.push(arr[key]);
    	cityFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	cityFilterGData.items = cityFilterData.items;


    	var cityModel = new sap.ui.model.json.JSONModel(cityFilterData);
    	cityModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idCityCombo").setModel(cityModel);


    	// For Depot...

		depotFilterData.items = [];
    	for(var j=0;j<FNASummaryArrayF4.length;j++){
    		if(FNASummaryArrayF4[j].Depot != ''){
    			depotFilterData.items.push({
    			"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
    			"key":FNASummaryArrayF4[j].Depot
    		});
    		}
    	}

    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=depotFilterData.items.length; i < len; i++ )
    	    arr[depotFilterData.items[i]['key']] = depotFilterData.items[i];

    	depotFilterData.items = [];
    	for ( var key in arr )
    		depotFilterData.items.push(arr[key]);
    	depotFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	depotFilterGData.items = depotFilterData.items;


    	var depotModel = new sap.ui.model.json.JSONModel(depotFilterData);
    	depotModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idDepotCombo").setModel(depotModel);

    	// For Customer...

		customerFilterData.items = [];
    	for(var j=0;j<FNASummaryArrayCUST.length;j++){
    		if(FNASummaryArrayCUST[j].Customer != ''){
    			customerFilterData.items.push({
    			"text": FNASummaryArrayCUST[j].CustomerName + " - " + parseInt(FNASummaryArrayCUST[j].Customer),
    			"key":FNASummaryArrayCUST[j].Customer
    		});
    		}
    	}

    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=customerFilterData.items.length; i < len; i++ )
    	    arr[customerFilterData.items[i]['text']] = customerFilterData.items[i];

    	customerFilterData.items = [];
    	for ( var key in arr )
    		customerFilterData.items.push(arr[key]);
    	customerFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	customerFilterGData.items = customerFilterData.items;


    	var customerModel = new sap.ui.model.json.JSONModel(customerFilterData);
    	customerModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idCustomerCombo").setModel(customerModel);

    	// For Lease Type...

		leasetypeFilterData.items = [];
    	for(var j=0;j<FNASummaryArrayF4.length;j++){
    		if(FNASummaryArrayF4[j].Leasetype != ''){
    			leasetypeFilterData.items.push({
    			"text":FNASummaryArrayF4[j].Leasetype + " - " + FNASummaryArrayF4[j].Leasename,
    			"key":FNASummaryArrayF4[j].Leasetype
    		});
    		}
    	}

    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=leasetypeFilterData.items.length; i < len; i++ )
    	    arr[leasetypeFilterData.items[i]['text']] = leasetypeFilterData.items[i];

    	leasetypeFilterData.items = [];
    	for ( var key in arr )
    		leasetypeFilterData.items.push(arr[key]);
    	leasetypeFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	leasetypeFilterGData.items = leasetypeFilterData.items;


    	var leasetypeModel = new sap.ui.model.json.JSONModel(leasetypeFilterData);
    	leasetypeModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idLeasetypeCombo").setModel(leasetypeModel);

    	// For Release Type...

		releasetypeFilterData.items = [];
    	/*for(var j=0;j<FNASummaryArrayF4.length;j++){
    		if(FNASummaryArrayF4[j].Releasetype != ''){
    			releasetypeFilterData.items.push({
    			"text":FNASummaryArrayF4[j].Releasename,
    			"key":FNASummaryArrayF4[j].Releasetype
    		});
    		}
    	}*/

		releasetypeFilterData.items.push({
			"text":"Booking",
			"key":"BOOK"
		});

		releasetypeFilterData.items.push({
			"text":"Reservation",
			"key":"RESER"
		});

    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=releasetypeFilterData.items.length; i < len; i++ )
    	    arr[releasetypeFilterData.items[i]['text']] = releasetypeFilterData.items[i];

    	releasetypeFilterData.items = [];
    	for ( var key in arr )
    		releasetypeFilterData.items.push(arr[key]);
    	releasetypeFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	releasetypeFilterGData.items = releasetypeFilterData.items;


    	var releasetypeModel = new sap.ui.model.json.JSONModel(releasetypeFilterData);
    	releasetypeModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idReleasetypeCombo").setModel(releasetypeModel);

    	//for ( var k=0; k<cityFilterData.items.length; k++ )
    		//cityBuffer.push(cityFilterData.items[k].key);

		/*Set Values for the filter MAC31082015*/

    	//new newfneta().setPersonalValues();

// MACFILTER+

			// For Grade...

			gradeFilterData.items = [];
			gradeFilterData.items.push({
				"text":"1",
				"key":"1"
			});

			gradeFilterData.items.push({
				"text":"2",
				"key":"2"
			});

			gradeFilterData.items.push({
				"text":"3",
				"key":"3"
			});

			gradeFilterData.items.push({
				"text":"4",
				"key":"4"
			});

			gradeFilterData.items.push({
				"text":"5",
				"key":"5"
			});

			gradeFilterData.items.push({
				"text":"6",
				"key":"6"
			});

			// Remove Duplicates

			var arr = {};

			for ( var i=0, len=gradeFilterData.items.length; i < len; i++ )
					arr[gradeFilterData.items[i]['text']] = gradeFilterData.items[i];

			gradeFilterData.items = [];
			for ( var key in arr )
				gradeFilterData.items.push(arr[key]);
			gradeFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
			gradeFilterGData.items = gradeFilterData.items;


			var gradeModel = new sap.ui.model.json.JSONModel(gradeFilterData);
			gradeModel.setSizeLimit(10000);
			sap.ui.getCore().byId("idGradeCombo").setModel(gradeModel);

			// For Eq Status...

			eqStatusFilterData.items = [];
			for(var j=0;j<FNASummaryArraySTAT.length;j++){
    		if(FNASummaryArraySTAT[j].Status != ''){
    			eqStatusFilterData.items.push({
    			"text":FNASummaryArraySTAT[j].Status,
    			"key":FNASummaryArraySTAT[j].Status
    		});
    		}
    	}

			// Remove Duplicates

			var arr = {};

			for ( var i=0, len=eqStatusFilterData.items.length; i < len; i++ )
					arr[eqStatusFilterData.items[i]['text']] = eqStatusFilterData.items[i];

			eqStatusFilterData.items = [];
			for ( var key in arr )
				eqStatusFilterData.items.push(arr[key]);
			eqStatusFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
			eqStatusFilterGData.items = eqStatusFilterData.items;


			var eqStatusModel = new sap.ui.model.json.JSONModel(eqStatusFilterData);
			eqStatusModel.setSizeLimit(10000);
			sap.ui.getCore().byId("idEqStatusCombo").setModel(eqStatusModel);


			// For Simple Status...

			siStatusFilterData.items = [];
			siStatusFilterData.items.push({
				"text":"WEST",
				"key":"WEST"
			});

			siStatusFilterData.items.push({
				"text":"AWAP",
				"key":"AWAP"
			});

			siStatusFilterData.items.push({
				"text":"AUTH",
				"key":"AUTH"
			});

			siStatusFilterData.items.push({
				"text":"AVLB",
				"key":"AVLB"
			});

			siStatusFilterData.items.push({
				"text":"SALE",
				"key":"SALE"
			});

			siStatusFilterData.items.push({
				"text":"COMM",
				"key":"COMM"
			});

			siStatusFilterData.items.push({
				"text":"HOLD",
				"key":"HOLD"
			});

			// Remove Duplicates

			var arr = {};

			for ( var i=0, len=siStatusFilterData.items.length; i < len; i++ )
					arr[siStatusFilterData.items[i]['text']] = siStatusFilterData.items[i];

			siStatusFilterData.items = [];
			for ( var key in arr )
				siStatusFilterData.items.push(arr[key]);
			siStatusFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
			siStatusFilterGData.items = siStatusFilterData.items;


			var siStatusModel = new sap.ui.model.json.JSONModel(siStatusFilterData);
			siStatusModel.setSizeLimit(10000);
			sap.ui.getCore().byId("idSiStatusCombo").setModel(siStatusModel);

			// MACFILTER+

	},

	/* PROCATCHANGE *****************************************************************************/
	/*********************************************************************************************/
	// When there is a change in product category, set product class and unit type accordingly.
	/*********************************************************************************************/
	/*********************************************************************************************/

	changeProClassUnitTypeFilter : function(proCatFilterData, num){

//		if(proCatFilterData.length == 0){		// if nothing is there in product category drop down...
//			for(var i=0; i<proCatFilterGData.items.length; i++){
//				proCatFilterData.push(proCatFilterGData.items[i].text);
//			}
//		}

// Clearing items in product class filter...
proClassFilterData.items = [];

/* PROCATCHANGE - PROCLASSSET *****************************************************************/
// Set Product Class Values
/*********************************************************************************************/

		if(proCatFilterData.length != 0){
	    	for(var j=0;j<FNASummaryArrayF4.length;j++){
	    		if((isInArray(FNASummaryArrayF4[j].Pcate, proCatFilterData)) && !(isInArray(FNASummaryArrayF4[j].Matnr, proCatBuffer))){
	    		proClassFilterData.items.push({
	    			"text":FNASummaryArrayF4[j].Pclass,
	    			"key":FNASummaryArrayF4[j].Pclass
	    		});
	    		}
	    	}
		}
		else{
	    	for(var j=0;j<FNASummaryArrayF4.length;j++){
	    		proClassFilterData.items.push({
	    			"text":FNASummaryArrayF4[j].Pclass,
	    			"key":FNASummaryArrayF4[j].Pclass
	    		});
	    		}
		}


    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=proClassFilterData.items.length; i < len; i++ )
    	    arr[proClassFilterData.items[i]['text']] = proClassFilterData.items[i];

    	proClassFilterData.items = [];
    	for ( var key in arr )
    		proClassFilterData.items.push(arr[key]);
    	proClassFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));

    	var proClassModel = new sap.ui.model.json.JSONModel(proClassFilterData);
    	proClassModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idProClassCombo").setModel(proClassModel);
    	if(num == 1)
    		sap.ui.getCore().byId("idProClassCombo").setSelectedKeys(""); // DNANEW +
    	sap.ui.getCore().byId("idProClassCombo").getModel().updateBindings();
			var ProClassComboKeys = sap.ui.getCore().byId("idProClassCombo").getSelectedKeys();
			ProClassComboKeys = $.grep(ProClassComboKeys,function(n){ return n != ""});

			/* PROCATCHANGE - UNITTYPESET *****************************************************************/
			// Set Unit Type Values
			/*********************************************************************************************/

			// Clearing items in unit type filter...
			unitTypeFilterData.items = [];

			// If there are any values in prod class.
			if(ProClassComboKeys.length != 0){
		    	for(var j=0;j<FNASummaryArrayF4.length;j++){
		    		if((isInArray(FNASummaryArrayF4[j].Pclass, ProClassComboKeys))){
		    	unitTypeFilterData.items.push({
		    			"text":FNASummaryArrayF4[j].Matnr,
		    			"key":FNASummaryArrayF4[j].Matnr
		    		});
		    		}
		    	}
			}else if(proCatFilterData.length != 0){
	    	for(var j=0;j<FNASummaryArrayF4.length;j++){
	    		if((isInArray(FNASummaryArrayF4[j].Pcate, proCatFilterData)) && !(isInArray(FNASummaryArrayF4[j].Matnr, proCatBuffer))){
	    		unitTypeFilterData.items.push({
	    			"text":FNASummaryArrayF4[j].Matnr,
	    			"key":FNASummaryArrayF4[j].Matnr
	    		});
	    		}
	    	}
		}
		else{
	    	for(var j=0;j<FNASummaryArrayF4.length;j++){
	    		unitTypeFilterData.items.push({
	    			"text":FNASummaryArrayF4[j].Matnr,
	    			"key":FNASummaryArrayF4[j].Matnr
	    		});
	    		}
		}


    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=unitTypeFilterData.items.length; i < len; i++ )
    	    arr[unitTypeFilterData.items[i]['text']] = unitTypeFilterData.items[i];

    	unitTypeFilterData.items = [];
    	for ( var key in arr )
    		unitTypeFilterData.items.push(arr[key]);
    	unitTypeFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));

    	var unitTypeModel = new sap.ui.model.json.JSONModel(unitTypeFilterData);
    	unitTypeModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idUnitTypeCombo").setModel(unitTypeModel);
    	if(num == 1)
    		sap.ui.getCore().byId("idUnitTypeCombo").setSelectedKeys(""); // DNANEW +
    	sap.ui.getCore().byId("idUnitTypeCombo").getModel().updateBindings();
	},

	/* PROCLASSCHANGE *****************************************************************************/
	/*********************************************************************************************/
	// When there is a change in product class, set unit type.
	/*********************************************************************************************/
	/*********************************************************************************************/

	changeUnitTypeFilter : function(proClassFilterData, num){

//		if(proClassFilterData.length == 0){	// if nothing is there in sub category drop down...
//			for(var i=0; i<proClassFilterGData.items.length; i++){
//				proClassFilterData.push(proClassFilterGData.items[i].text);
//			}
//		}

	var ProCatComboKeys = sap.ui.getCore().byId("idProCatCombo").getSelectedKeys();
	ProCatComboKeys = $.grep(ProCatComboKeys,function(n){ return n != ""});

	// Clearing items in unit type filter...
	unitTypeFilterData.items = [];

	if(proClassFilterData.length != 0){
    	for(var j=0;j<FNASummaryArrayF4.length;j++){
    		if((isInArray(FNASummaryArrayF4[j].Pclass, proClassFilterData)) && !(isInArray(FNASummaryArrayF4[j].Matnr, proClassBuffer))){
    		unitTypeFilterData.items.push({
    			"text":FNASummaryArrayF4[j].Matnr,
    			"key":FNASummaryArrayF4[j].Matnr
    		});
    		}
    	}
	}

	else if(ProCatComboKeys.length != 0){
    	for(var j=0;j<FNASummaryArrayF4.length;j++){
    		if((isInArray(FNASummaryArrayF4[j].Pcate, ProCatComboKeys)) && !(isInArray(FNASummaryArrayF4[j].Matnr, proClassBuffer))){
    		unitTypeFilterData.items.push({
    			"text":FNASummaryArrayF4[j].Matnr,
    			"key":FNASummaryArrayF4[j].Matnr
    		});
    		}
    	}
	}
	else{
    	for(var j=0;j<FNASummaryArrayF4.length;j++){
    		unitTypeFilterData.items.push({
    			"text":FNASummaryArrayF4[j].Matnr,
    			"key":FNASummaryArrayF4[j].Matnr
    		});
    		}
	}


    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=unitTypeFilterData.items.length; i < len; i++ )
    	    arr[unitTypeFilterData.items[i]['text']] = unitTypeFilterData.items[i];

    	unitTypeFilterData.items = [];
    	for ( var key in arr )
    		unitTypeFilterData.items.push(arr[key]);
    	unitTypeFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));

    	var unitTypeModel = new sap.ui.model.json.JSONModel(unitTypeFilterData);
    	unitTypeModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idUnitTypeCombo").setModel(unitTypeModel);
    	if(num == 1)
    		sap.ui.getCore().byId("idUnitTypeCombo").setSelectedKeys(""); // DNANEW +
    	sap.ui.getCore().byId("idUnitTypeCombo").getModel().updateBindings();
	},

	/* MREGIONCHANGE *****************************************************************************/
	/*********************************************************************************************/
	// When there is a change in main region, set region, country, city and depot accordingly.
	/*********************************************************************************************/
	/*********************************************************************************************/

	changeRegionCountryCityDepotFilter : function(mregionFilterData, num){

		var MRegionComboKeys = mregionFilterData;


		// Clearing items in region filter...
		regionFilterData.items = [];

		/* MREGIONCHANGE - REGIONSET *****************************************************************/
		// Set Region Values
		/*********************************************************************************************/

		// If there are any values in main region.
		if(MRegionComboKeys.length != 0){
	    	for(var j=0;j<FNASummaryArrayF4.length;j++){
	    		if((isInArray(FNASummaryArrayF4[j].Mregion, MRegionComboKeys))){
	    		regionFilterData.items.push({
	    			"text":FNASummaryArrayF4[j].ZRegDesc,
	    			"key":FNASummaryArrayF4[j].Region
	    		});
	    		}
	    	}
		}
		else{
	    	for(var j=0;j<FNASummaryArrayF4.length;j++){
	    		if(FNASummaryArrayF4[j].Region != ''){
	    		regionFilterData.items.push({
	    			"text":FNASummaryArrayF4[j].ZRegDesc,
	    			"key":FNASummaryArrayF4[j].Region
	    		});
	    		}
	    	}
		}


    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=regionFilterData.items.length; i < len; i++ )
    	    arr[regionFilterData.items[i]['text']] = regionFilterData.items[i];

    	regionFilterData.items = [];
    	for ( var key in arr )
    		regionFilterData.items.push(arr[key]);
    	regionFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));

    	var regionModel = new sap.ui.model.json.JSONModel(regionFilterData);
    	regionModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idRegionCombo").setModel(regionModel);
    	if(num == 1)
    		sap.ui.getCore().byId("idRegionCombo").setSelectedKeys(""); // DNANEW +
    	sap.ui.getCore().byId("idRegionCombo").getModel().updateBindings();
			var RegionComboKeys = sap.ui.getCore().byId("idRegionCombo").getSelectedKeys();
			RegionComboKeys = $.grep(RegionComboKeys,function(n){ return n != ""});

		/* MREGIONCHANGE - COUNTRYSET *****************************************************************/
		// Set Region Values
		/*********************************************************************************************/

		// Clearing items in country filter...
		countryFilterData.items = [];

		// If there are any values in region.
		if(RegionComboKeys.length != 0){
	    	for(var j=0;j<FNASummaryArrayF4.length;j++){
	    		if((isInArray(FNASummaryArrayF4[j].Region, RegionComboKeys))){
	    		countryFilterData.items.push({
	    			"text":FNASummaryArrayF4[j].ZCouDesc,
	    			"key":FNASummaryArrayF4[j].Country
	    		});
	    		}
	    	}
		}

		// If there are any values in main region.
		else if(MRegionComboKeys.length != 0){
	    	for(var j=0;j<FNASummaryArrayF4.length;j++){
	    		if((isInArray(FNASummaryArrayF4[j].Mregion, MRegionComboKeys))){
	    		countryFilterData.items.push({
	    			"text":FNASummaryArrayF4[j].ZCouDesc,
	    			"key":FNASummaryArrayF4[j].Country
	    		});
	    		}
	    	}
		}
		else{
	    	for(var j=0;j<FNASummaryArrayF4.length;j++){
	    		if(FNASummaryArrayF4[j].Country != ''){
	    		countryFilterData.items.push({
	    			"text":FNASummaryArrayF4[j].ZCouDesc,
	    			"key":FNASummaryArrayF4[j].Country
	    		});
	    		}
	    	}
		}


    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=countryFilterData.items.length; i < len; i++ )
    	    arr[countryFilterData.items[i]['text']] = countryFilterData.items[i];

    	countryFilterData.items = [];
    	for ( var key in arr )
    		countryFilterData.items.push(arr[key]);
    	countryFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));

    	var countryModel = new sap.ui.model.json.JSONModel(countryFilterData);
    	countryModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idCountryCombo").setModel(countryModel);
    	if(num == 1)
    		sap.ui.getCore().byId("idCountryCombo").setSelectedKeys(""); // DNANEW +
    	sap.ui.getCore().byId("idCountryCombo").getModel().updateBindings();
			var CountryComboKeys = sap.ui.getCore().byId("idCountryCombo").getSelectedKeys();
			CountryComboKeys = $.grep(CountryComboKeys,function(n){ return n != ""});

			/* MREGIONCHANGE - CITYSET *****************************************************************/
			// Set City Values
			/*******************************************************************************************/

			// Clearing items in city filter...
			cityFilterData.items = [];

			// If there are any values in country.
			if(CountryComboKeys.length != 0){
		    	for(var j=0;j<FNASummaryArrayF4.length;j++){
		    		if((isInArray(FNASummaryArrayF4[j].Country, CountryComboKeys))){
		    		cityFilterData.items.push({
		    			"text":FNASummaryArrayF4[j].ZCityDesc,
		    			"key":FNASummaryArrayF4[j].City
		    		});
		    		}
		    	}
			}

			// If there are any values in region.
			else if(RegionComboKeys.length != 0){
		    	for(var j=0;j<FNASummaryArrayF4.length;j++){
		    		if((isInArray(FNASummaryArrayF4[j].Region, RegionComboKeys))){
		    		cityFilterData.items.push({
		    			"text":FNASummaryArrayF4[j].ZCityDesc,
		    			"key":FNASummaryArrayF4[j].City
		    		});
		    		}
		    	}
			}

			// If there are any values in main region.
			else if(MRegionComboKeys.length != 0){
	    	for(var j=0;j<FNASummaryArrayF4.length;j++){
	    		if((isInArray(FNASummaryArrayF4[j].Mregion, MRegionComboKeys))){
	    		cityFilterData.items.push({
	    			"text":FNASummaryArrayF4[j].ZCityDesc,
	    			"key":FNASummaryArrayF4[j].City
	    		});
	    		}
	    	}
			}
			else{
		    	for(var j=0;j<FNASummaryArrayF4.length;j++){
		    		if(FNASummaryArrayF4[j].Country != ''){
		    		cityFilterData.items.push({
		    			"text":FNASummaryArrayF4[j].ZCityDesc,
		    			"key":FNASummaryArrayF4[j].City
		    		});
		    	}
		    	}
			}

    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=cityFilterData.items.length; i < len; i++ )
    	    arr[cityFilterData.items[i]['text']] = cityFilterData.items[i];

    	cityFilterData.items = [];
    	for ( var key in arr )
    		cityFilterData.items.push(arr[key]);
    	cityFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));

    	var cityModel = new sap.ui.model.json.JSONModel(cityFilterData);
    	cityModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idCityCombo").setModel(cityModel);
    	if(num == 1)
    		sap.ui.getCore().byId("idCityCombo").setSelectedKeys(""); // DNANEW +
    	sap.ui.getCore().byId("idCityCombo").getModel().updateBindings();
			var CityComboKeys = sap.ui.getCore().byId("idCityCombo").getSelectedKeys();
			CityComboKeys = $.grep(CityComboKeys,function(n){ return n != ""});


			/* MREGIONCHANGE - DEPOTSET *****************************************************************/
			// Set Depot Values
			/*******************************************************************************************/

	    // Clearing items in depot filter...
			depotFilterData.items = [];

			// If there are any values in city
			if(CityComboKeys.length != 0){
		    	for(var j=0;j<FNASummaryArrayF4.length;j++){
		    		if((isInArray(FNASummaryArrayF4[j].City, CityComboKeys))){
		    		depotFilterData.items.push({
		    			"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
		    			"key":FNASummaryArrayF4[j].Depot
		    		});
		    		}
		    	}
			}

			// If there are any values in country.
			else if(CountryComboKeys.length != 0){
		    	for(var j=0;j<FNASummaryArrayF4.length;j++){
		    		if((isInArray(FNASummaryArrayF4[j].Country, CountryComboKeys))){
		    		depotFilterData.items.push({
		    			"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
		    			"key":FNASummaryArrayF4[j].Depot
		    		});
		    		}
		    	}
			}

			// If there are any values in region.
			else if(RegionComboKeys.length != 0){
		    	for(var j=0;j<FNASummaryArrayF4.length;j++){
		    		if((isInArray(FNASummaryArrayF4[j].Region, RegionComboKeys))){
		    		depotFilterData.items.push({
		    			"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
		    			"key":FNASummaryArrayF4[j].Depot
		    		});
		    		}
		    	}
			}

			// If there are any values in main region.
			else if(MRegionComboKeys.length != 0){
	    	for(var j=0;j<FNASummaryArrayF4.length;j++){
	    		if((isInArray(FNASummaryArrayF4[j].Mregion, MRegionComboKeys))){
	    		depotFilterData.items.push({
	    			"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
	    			"key":FNASummaryArrayF4[j].Depot
	    		});
	    		}
	    	}
			}
			else{
		    	for(var j=0;j<FNASummaryArrayF4.length;j++){
		    		if(FNASummaryArrayF4[j].Depot != ''){
		    		depotFilterData.items.push({
		    			"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
		    			"key":FNASummaryArrayF4[j].Depot
		    		});
		    	}
		    	}
			}

    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=depotFilterData.items.length; i < len; i++ )
    	    arr[depotFilterData.items[i]['text']] = depotFilterData.items[i];

    	depotFilterData.items = [];
    	for ( var key in arr )
    		depotFilterData.items.push(arr[key]);
    	depotFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));

    	var depotModel = new sap.ui.model.json.JSONModel(depotFilterData);
    	depotModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idDepotCombo").setModel(depotModel);
    	if(num == 1)
    		sap.ui.getCore().byId("idDepotCombo").setSelectedKeys(""); // DNANEW +
    	sap.ui.getCore().byId("idDepotCombo").getModel().updateBindings();

	},


	/* REGIONCHANGE *****************************************************************************/
	/*********************************************************************************************/
	// When there is a change in region, set country, city and depot accordingly.
	/*********************************************************************************************/
	/*********************************************************************************************/

	changeCountryCityDepotFilter : function(regionFilterData, num){

		var MRegionComboKeys = sap.ui.getCore().byId("idMRegionCombo").getSelectedKeys();
		MRegionComboKeys = $.grep(MRegionComboKeys,function(n){ return n != ""});

		var RegionComboKeys = sap.ui.getCore().byId("idRegionCombo").getSelectedKeys();
		RegionComboKeys = $.grep(RegionComboKeys,function(n){ return n != ""});
		RegionComboKeys = regionFilterData;


		/* REGIONCHANGE - COUNTRYSET *****************************************************************/
		// Set Country Values
		/*********************************************************************************************/

		// Clearing items in country filter...
		countryFilterData.items = [];

		// If there are any values in region.
		if(RegionComboKeys.length != 0){
	    	for(var j=0;j<FNASummaryArrayF4.length;j++){
	    		if((isInArray(FNASummaryArrayF4[j].Region, RegionComboKeys))){
	    		countryFilterData.items.push({
	    			"text":FNASummaryArrayF4[j].ZCouDesc,
	    			"key":FNASummaryArrayF4[j].Country
	    		});
	    		}
	    	}
		}

		// If there are any values in main region.
		else if(MRegionComboKeys.length != 0){
	    	for(var j=0;j<FNASummaryArrayF4.length;j++){
	    		if((isInArray(FNASummaryArrayF4[j].Mregion, MRegionComboKeys))){
	    		countryFilterData.items.push({
	    			"text":FNASummaryArrayF4[j].ZCouDesc,
	    			"key":FNASummaryArrayF4[j].Country
	    		});
	    		}
	    	}
		}
		else{
	    	for(var j=0;j<FNASummaryArrayF4.length;j++){
	    		if(FNASummaryArrayF4[j].Country != ''){
	    		countryFilterData.items.push({
	    			"text":FNASummaryArrayF4[j].ZCouDesc,
	    			"key":FNASummaryArrayF4[j].Country
	    		});
	    		}
	    	}
		}


    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=countryFilterData.items.length; i < len; i++ )
    	    arr[countryFilterData.items[i]['text']] = countryFilterData.items[i];

    	countryFilterData.items = [];
    	for ( var key in arr )
    		countryFilterData.items.push(arr[key]);
    	countryFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));

    	var countryModel = new sap.ui.model.json.JSONModel(countryFilterData);
    	countryModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idCountryCombo").setModel(countryModel);
    	if(num == 1)
    		sap.ui.getCore().byId("idCountryCombo").setSelectedKeys(""); // DNANEW +
    	sap.ui.getCore().byId("idCountryCombo").getModel().updateBindings();
			var CountryComboKeys = sap.ui.getCore().byId("idCountryCombo").getSelectedKeys();
			CountryComboKeys = $.grep(CountryComboKeys,function(n){ return n != ""});

			/* REGIONCHANGE - CITYSET *****************************************************************/
			// Set City Values
			/*******************************************************************************************/

			// Clearing items in city filter...
			cityFilterData.items = [];

			// If there are any values in country.
			if(CountryComboKeys.length != 0){
		    	for(var j=0;j<FNASummaryArrayF4.length;j++){
		    		if((isInArray(FNASummaryArrayF4[j].Country, CountryComboKeys))){
		    		cityFilterData.items.push({
		    			"text":FNASummaryArrayF4[j].ZCityDesc,
		    			"key":FNASummaryArrayF4[j].City
		    		});
		    		}
		    	}
			}

			// If there are any values in region.
			else if(RegionComboKeys.length != 0){
		    	for(var j=0;j<FNASummaryArrayF4.length;j++){
		    		if((isInArray(FNASummaryArrayF4[j].Region, RegionComboKeys))){
		    		cityFilterData.items.push({
		    			"text":FNASummaryArrayF4[j].ZCityDesc,
		    			"key":FNASummaryArrayF4[j].City
		    		});
		    		}
		    	}
			}

			// If there are any values in main region.
			else if(MRegionComboKeys.length != 0){
	    	for(var j=0;j<FNASummaryArrayF4.length;j++){
	    		if((isInArray(FNASummaryArrayF4[j].Mregion, MRegionComboKeys))){
	    		cityFilterData.items.push({
	    			"text":FNASummaryArrayF4[j].ZCityDesc,
	    			"key":FNASummaryArrayF4[j].City
	    		});
	    		}
	    	}
			}
			else{
		    	for(var j=0;j<FNASummaryArrayF4.length;j++){
		    		if(FNASummaryArrayF4[j].Country != ''){
		    		cityFilterData.items.push({
		    			"text":FNASummaryArrayF4[j].ZCityDesc,
		    			"key":FNASummaryArrayF4[j].City
		    		});
		    	}
		    	}
			}

    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=cityFilterData.items.length; i < len; i++ )
    	    arr[cityFilterData.items[i]['text']] = cityFilterData.items[i];

    	cityFilterData.items = [];
    	for ( var key in arr )
    		cityFilterData.items.push(arr[key]);
    	cityFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));

    	var cityModel = new sap.ui.model.json.JSONModel(cityFilterData);
    	cityModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idCityCombo").setModel(cityModel);
    	if(num == 1)
    		sap.ui.getCore().byId("idCityCombo").setSelectedKeys(""); // DNANEW +
    	sap.ui.getCore().byId("idCityCombo").getModel().updateBindings();
			var CityComboKeys = sap.ui.getCore().byId("idCityCombo").getSelectedKeys();
			CityComboKeys = $.grep(CityComboKeys,function(n){ return n != ""});


			/* REGIONCHANGE - DEPOTSET *****************************************************************/
			// Set Depot Values
			/*******************************************************************************************/

	    // Clearing items in depot filter...
			depotFilterData.items = [];

			// If there are any values in city
			if(CityComboKeys.length != 0){
		    	for(var j=0;j<FNASummaryArrayF4.length;j++){
		    		if((isInArray(FNASummaryArrayF4[j].City, CityComboKeys))){
		    		depotFilterData.items.push({
		    			"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
		    			"key":FNASummaryArrayF4[j].Depot
		    		});
		    		}
		    	}
			}

			// If there are any values in country.
			else if(CountryComboKeys.length != 0){
		    	for(var j=0;j<FNASummaryArrayF4.length;j++){
		    		if((isInArray(FNASummaryArrayF4[j].Country, CountryComboKeys))){
		    		depotFilterData.items.push({
		    			"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
		    			"key":FNASummaryArrayF4[j].Depot
		    		});
		    		}
		    	}
			}

			// If there are any values in region.
			else if(RegionComboKeys.length != 0){
		    	for(var j=0;j<FNASummaryArrayF4.length;j++){
		    		if((isInArray(FNASummaryArrayF4[j].Region, RegionComboKeys))){
		    		depotFilterData.items.push({
		    			"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
		    			"key":FNASummaryArrayF4[j].Depot
		    		});
		    		}
		    	}
			}

			// If there are any values in main region.
			else if(MRegionComboKeys.length != 0){
	    	for(var j=0;j<FNASummaryArrayF4.length;j++){
	    		if((isInArray(FNASummaryArrayF4[j].Mregion, MRegionComboKeys))){
	    		depotFilterData.items.push({
	    			"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
	    			"key":FNASummaryArrayF4[j].Depot
	    		});
	    		}
	    	}
			}
			else{
		    	for(var j=0;j<FNASummaryArrayF4.length;j++){
		    		if(FNASummaryArrayF4[j].Depot != ''){
		    		depotFilterData.items.push({
		    			"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
		    			"key":FNASummaryArrayF4[j].Depot
		    		});
		    	}
		    	}
			}

    		// Remove Duplicates

    	var arr = {};

    	for ( var i=0, len=depotFilterData.items.length; i < len; i++ )
    	    arr[depotFilterData.items[i]['text']] = depotFilterData.items[i];

    	depotFilterData.items = [];
    	for ( var key in arr )
    		depotFilterData.items.push(arr[key]);
    	depotFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));

    	var depotModel = new sap.ui.model.json.JSONModel(depotFilterData);
    	depotModel.setSizeLimit(10000);
    	sap.ui.getCore().byId("idDepotCombo").setModel(depotModel);
    	if(num == 1)
    		sap.ui.getCore().byId("idDepotCombo").setSelectedKeys(""); // DNANEW +
    	sap.ui.getCore().byId("idDepotCombo").getModel().updateBindings();


	},

	/* COUNTRYCHANGE *****************************************************************************/
	/*********************************************************************************************/
	// When there is a change in country, set city and depot accordingly.
	/*********************************************************************************************/
	/*********************************************************************************************/

	changeCityDepotFilter : function(countryFilterData, num){

		var MRegionComboKeys = sap.ui.getCore().byId("idMRegionCombo").getSelectedKeys();
		MRegionComboKeys = $.grep(MRegionComboKeys,function(n){ return n != ""});

		var RegionComboKeys = sap.ui.getCore().byId("idRegionCombo").getSelectedKeys();
		RegionComboKeys = $.grep(RegionComboKeys,function(n){ return n != ""});

		var CountryComboKeys = sap.ui.getCore().byId("idCountryCombo").getSelectedKeys();
		CountryComboKeys = $.grep(CountryComboKeys,function(n){ return n != ""});

		CountryComboKeys = countryFilterData;

		/* COUNTRYCHANGE - CITYSET *****************************************************************/
		// Set City Values
		/*******************************************************************************************/

		// Clearing items in city filter...
		cityFilterData.items = [];

		// If there are any values in country.
		if(CountryComboKeys.length != 0){
				for(var j=0;j<FNASummaryArrayF4.length;j++){
					if((isInArray(FNASummaryArrayF4[j].Country, CountryComboKeys))){
					cityFilterData.items.push({
						"text":FNASummaryArrayF4[j].ZCityDesc,
						"key":FNASummaryArrayF4[j].City
					});
					}
				}
		}

		// If there are any values in region.
		else if(RegionComboKeys.length != 0){
				for(var j=0;j<FNASummaryArrayF4.length;j++){
					if((isInArray(FNASummaryArrayF4[j].Region, RegionComboKeys))){
					cityFilterData.items.push({
						"text":FNASummaryArrayF4[j].ZCityDesc,
						"key":FNASummaryArrayF4[j].City
					});
					}
				}
		}

		// If there are any values in main region.
		else if(MRegionComboKeys.length != 0){
			for(var j=0;j<FNASummaryArrayF4.length;j++){
				if((isInArray(FNASummaryArrayF4[j].Mregion, MRegionComboKeys))){
				cityFilterData.items.push({
					"text":FNASummaryArrayF4[j].ZCityDesc,
					"key":FNASummaryArrayF4[j].City
				});
				}
			}
		}
		else{
				for(var j=0;j<FNASummaryArrayF4.length;j++){
					if(FNASummaryArrayF4[j].Country != ''){
					cityFilterData.items.push({
						"text":FNASummaryArrayF4[j].ZCityDesc,
						"key":FNASummaryArrayF4[j].City
					});
				}
				}
		}

			// Remove Duplicates

		var arr = {};

		for ( var i=0, len=cityFilterData.items.length; i < len; i++ )
				arr[cityFilterData.items[i]['text']] = cityFilterData.items[i];

		cityFilterData.items = [];
		for ( var key in arr )
			cityFilterData.items.push(arr[key]);
		cityFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));

		var cityModel = new sap.ui.model.json.JSONModel(cityFilterData);
		cityModel.setSizeLimit(10000);
		sap.ui.getCore().byId("idCityCombo").setModel(cityModel);
		if(num == 1)
			sap.ui.getCore().byId("idCityCombo").setSelectedKeys(""); // DNANEW +
		sap.ui.getCore().byId("idCityCombo").getModel().updateBindings();
		var CityComboKeys = sap.ui.getCore().byId("idCityCombo").getSelectedKeys();
		CityComboKeys = $.grep(CityComboKeys,function(n){ return n != ""});


		/* COUNTRYCHANGE - DEPOTSET *****************************************************************/
		// Set Depot Values
		/*******************************************************************************************/

		// Clearing items in depot filter...
		depotFilterData.items = [];

		// If there are any values in city
		if(CityComboKeys.length != 0){
				for(var j=0;j<FNASummaryArrayF4.length;j++){
					if((isInArray(FNASummaryArrayF4[j].City, CityComboKeys))){
					depotFilterData.items.push({
						"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
						"key":FNASummaryArrayF4[j].Depot
					});
					}
				}
		}

		// If there are any values in country.
		else if(CountryComboKeys.length != 0){
				for(var j=0;j<FNASummaryArrayF4.length;j++){
					if((isInArray(FNASummaryArrayF4[j].Country, CountryComboKeys))){
					depotFilterData.items.push({
						"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
						"key":FNASummaryArrayF4[j].Depot
					});
					}
				}
		}

		// If there are any values in region.
		else if(RegionComboKeys.length != 0){
				for(var j=0;j<FNASummaryArrayF4.length;j++){
					if((isInArray(FNASummaryArrayF4[j].Region, RegionComboKeys))){
					depotFilterData.items.push({
						"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
						"key":FNASummaryArrayF4[j].Depot
					});
					}
				}
		}

		// If there are any values in main region.
		else if(MRegionComboKeys.length != 0){
			for(var j=0;j<FNASummaryArrayF4.length;j++){
				if((isInArray(FNASummaryArrayF4[j].Mregion, MRegionComboKeys))){
				depotFilterData.items.push({
					"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
					"key":FNASummaryArrayF4[j].Depot
				});
				}
			}
		}
		else{
				for(var j=0;j<FNASummaryArrayF4.length;j++){
					if(FNASummaryArrayF4[j].Depot != ''){
					depotFilterData.items.push({
						"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
						"key":FNASummaryArrayF4[j].Depot
					});
				}
				}
		}

			// Remove Duplicates

		var arr = {};

		for ( var i=0, len=depotFilterData.items.length; i < len; i++ )
				arr[depotFilterData.items[i]['text']] = depotFilterData.items[i];

		depotFilterData.items = [];
		for ( var key in arr )
			depotFilterData.items.push(arr[key]);
		depotFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));

		var depotModel = new sap.ui.model.json.JSONModel(depotFilterData);
		depotModel.setSizeLimit(10000);
		sap.ui.getCore().byId("idDepotCombo").setModel(depotModel);
		if(num == 1)
			sap.ui.getCore().byId("idDepotCombo").setSelectedKeys(""); // DNANEW +
		sap.ui.getCore().byId("idDepotCombo").getModel().updateBindings();

		},

		/* CITYCHANGE *****************************************************************************/
		/*********************************************************************************************/
		// When there is a change in city, set depot accordingly.
		/*********************************************************************************************/
		/*********************************************************************************************/

		changeDepotFilter : function(cityFilterData, num){

			var MRegionComboKeys = sap.ui.getCore().byId("idMRegionCombo").getSelectedKeys();
			MRegionComboKeys = $.grep(MRegionComboKeys,function(n){ return n != ""});

			var RegionComboKeys = sap.ui.getCore().byId("idRegionCombo").getSelectedKeys();
			RegionComboKeys = $.grep(RegionComboKeys,function(n){ return n != ""});

			var CountryComboKeys = sap.ui.getCore().byId("idCountryCombo").getSelectedKeys();
			CountryComboKeys = $.grep(CountryComboKeys,function(n){ return n != ""});

			var CityComboKeys = sap.ui.getCore().byId("idCityCombo").getSelectedKeys();
			CityComboKeys = $.grep(CityComboKeys,function(n){ return n != ""});

			CityComboKeys = cityFilterData;

			/* CITYCHANGE - DEPOTSET *****************************************************************/
			// Set Depot Values
			/*******************************************************************************************/

			// Clearing items in depot filter...
			depotFilterData.items = [];

			// If there are any values in city
			if(CityComboKeys.length != 0){
					for(var j=0;j<FNASummaryArrayF4.length;j++){
						if((isInArray(FNASummaryArrayF4[j].City, CityComboKeys))){
						depotFilterData.items.push({
							"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
							"key":FNASummaryArrayF4[j].Depot
						});
						}
					}
			}

			// If there are any values in country.
			else if(CountryComboKeys.length != 0){
					for(var j=0;j<FNASummaryArrayF4.length;j++){
						if((isInArray(FNASummaryArrayF4[j].Country, CountryComboKeys))){
						depotFilterData.items.push({
							"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
							"key":FNASummaryArrayF4[j].Depot
						});
						}
					}
			}

			// If there are any values in region.
			else if(RegionComboKeys.length != 0){
					for(var j=0;j<FNASummaryArrayF4.length;j++){
						if((isInArray(FNASummaryArrayF4[j].Region, RegionComboKeys))){
						depotFilterData.items.push({
							"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
							"key":FNASummaryArrayF4[j].Depot
						});
						}
					}
			}

			// If there are any values in main region.
			else if(MRegionComboKeys.length != 0){
				for(var j=0;j<FNASummaryArrayF4.length;j++){
					if((isInArray(FNASummaryArrayF4[j].Mregion, MRegionComboKeys))){
					depotFilterData.items.push({
						"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
						"key":FNASummaryArrayF4[j].Depot
					});
					}
				}
			}
			else{
					for(var j=0;j<FNASummaryArrayF4.length;j++){
						if(FNASummaryArrayF4[j].Depot != ''){
						depotFilterData.items.push({
							"text":FNASummaryArrayF4[j].Depot + " - " + FNASummaryArrayF4[j].Depotname,
							"key":FNASummaryArrayF4[j].Depot
						});
					}
					}
			}

				// Remove Duplicates

			var arr = {};

			for ( var i=0, len=depotFilterData.items.length; i < len; i++ )
					arr[depotFilterData.items[i]['text']] = depotFilterData.items[i];

			depotFilterData.items = [];
			for ( var key in arr )
				depotFilterData.items.push(arr[key]);
			depotFilterData.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));

			var depotModel = new sap.ui.model.json.JSONModel(depotFilterData);
			depotModel.setSizeLimit(10000);
			sap.ui.getCore().byId("idDepotCombo").setModel(depotModel);
			if(num == 1)
				sap.ui.getCore().byId("idDepotCombo").setSelectedKeys(""); // DNANEW +
			sap.ui.getCore().byId("idDepotCombo").getModel().updateBindings();

			},

		/* Whenever there is a change in any filters, filter the table in the PAGE 1 accordingly */
//		alterPageOne : function(selectedValues, dropDown){
//
//	    	// filtering the table in PAGE 1...
//
//
//			switch(dropDown){
//			case "Region":{
//				jsonInventoryFNA = [];
//				FNASummaryArrayFiltered = [];
//				for(var j=0;j<FNASummaryArray.length;j++){
//					if(selectedValues.length == 0){
//						FNASummaryArrayFiltered = FNASummaryArray;
//					}
//					else if((isInArray(FNASummaryArray[j].Region, selectedValues))){
//
//		    			FNASummaryArrayFiltered.push({
//				    		"Region": FNASummaryArray[j].Region,
//		    				"Country": FNASummaryArray[j].Country,
//		    				"City": FNASummaryArray[j].City,
//				    		"Pcate": FNASummaryArray[j].Pcate,
//		    				"Matnr": FNASummaryArray[j].Matnr,
//		    				"Avlb": FNASummaryArray[j].Avlb,
//		    				"Newavlb": FNASummaryArray[j].Newavlb,
//		    				"Aurepa": FNASummaryArray[j].Aurepa,
//		    				"Book": FNASummaryArray[j].Book,
//		    				"Bookn": FNASummaryArray[j].Bookn,
//		    				"Hold": FNASummaryArray[j].Hold,
//		    				"Ttlstock": FNASummaryArray[j].Ttlstock,
//		    				"Aeap": FNASummaryArray[j].Aeap,
//		    				"Netavlb": FNASummaryArray[j].Netavlb,
//		    				"Netad": FNASummaryArray[j].Netad,
//		    				"Netan": FNASummaryArray[j].Netan
//			    			});
//
//					    	jsonInventoryFNA.push({
//					    		"Region": FNASummaryArray[j].Region,
//			    				"Country": FNASummaryArray[j].Country,
//			    				"City": FNASummaryArray[j].City,
//			    				"Category": FNASummaryArray[j].Pcate,
//			    				"Unit Type": FNASummaryArray[j].Matnr,
//			    				"Depot AVLB": FNASummaryArray[j].Avlb,
//			    				"Capex AVLB": FNASummaryArray[j].Newavlb,
//			    				"APPD": FNASummaryArray[j].Aurepa,
//			    				"Depot Booked": FNASummaryArray[j].Book,
//			    				"Capex Booked": FNASummaryArray[j].Bookn,
//			    				"Hold": FNASummaryArray[j].Hold,
//			    				"Total Stock": FNASummaryArray[j].Ttlstock,
//			    				"Awaiting Units": FNASummaryArray[j].Aeap,
//			    				"Total Net AVLB": FNASummaryArray[j].Netavlb,
//			    				"Depot Net AVLB": FNASummaryArray[j].Netad,
//			    				"Capex Net AVLB": FNASummaryArray[j].Netan
//			    			});
//
//
//		    		}
//		    		}
//
//	    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
//	    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayFiltered});
//	        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
//	        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
//
//	            if (FNASummaryArrayFiltered.length < 100){
//	            	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(FNASummaryArrayFiltered.length);
//	            	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
//	            }
//	  	    	else{
//	  	    		sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
//	  	    		sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(100);
//	  	    	}
//
//				break;
//			}
//
//			case "Country":{
//				jsonInventoryFNA = [];
//				FNASummaryArrayFiltered = [];
//				for(var j=0;j<FNASummaryArray.length;j++){
//		    		if((isInArray(FNASummaryArray[j].Country, selectedValues))){
//
//		    			FNASummaryArrayFiltered.push({
//				    		"Region": FNASummaryArray[j].Region,
//		    				"Country": FNASummaryArray[j].Country,
//		    				"City": FNASummaryArray[j].City,
//				    		"Pcate": FNASummaryArray[j].Pcate,
//		    				"Matnr": FNASummaryArray[j].Matnr,
//		    				"Avlb": FNASummaryArray[j].Avlb,
//		    				"Newavlb": FNASummaryArray[j].Newavlb,
//		    				"Aurepa": FNASummaryArray[j].Aurepa,
//		    				"Book": FNASummaryArray[j].Book,
//		    				"Bookn": FNASummaryArray[j].Bookn,
//		    				"Hold": FNASummaryArray[j].Hold,
//		    				"Ttlstock": FNASummaryArray[j].Ttlstock,
//		    				"Aeap": FNASummaryArray[j].Aeap,
//		    				"Netavlb": FNASummaryArray[j].Netavlb,
//		    				"Netad": FNASummaryArray[j].Netad,
//		    				"Netan": FNASummaryArray[j].Netan
//			    			});
//
//					    	jsonInventoryFNA.push({
//					    		"Region": FNASummaryArray[j].Region,
//			    				"Country": FNASummaryArray[j].Country,
//			    				"City": FNASummaryArray[j].City,
//			    				"Category": FNASummaryArray[j].Pcate,
//			    				"Unit Type": FNASummaryArray[j].Matnr,
//			    				"Depot AVLB": FNASummaryArray[j].Avlb,
//			    				"Capex AVLB": FNASummaryArray[j].Newavlb,
//			    				"APPD": FNASummaryArray[j].Aurepa,
//			    				"Depot Booked": FNASummaryArray[j].Book,
//			    				"Capex Booked": FNASummaryArray[j].Bookn,
//			    				"Hold": FNASummaryArray[j].Hold,
//			    				"Total Stock": FNASummaryArray[j].Ttlstock,
//			    				"Awaiting Units": FNASummaryArray[j].Aeap,
//			    				"Total Net AVLB": FNASummaryArray[j].Netavlb,
//			    				"Depot Net AVLB": FNASummaryArray[j].Netad,
//			    				"Capex Net AVLB": FNASummaryArray[j].Netan
//			    			});
//
//
//		    		}
//		    		}
//
//	    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
//	    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayFiltered});
//	        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
//	        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
//
//	            if (FNASummaryArrayFiltered.length < 100){
//	            	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(FNASummaryArrayFiltered.length);
//	            	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
//	            }
//	  	    	else{
//	  	    		sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
//	  	    		sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(100);
//	  	    	}
//
//				break;
//			}
//
//			case "City":{
//				jsonInventoryFNA = [];
//				FNASummaryArrayFiltered = [];
//				for(var j=0;j<FNASummaryArray.length;j++){
//		    		if((isInArray(FNASummaryArray[j].City, selectedValues))){
//
//		    			FNASummaryArrayFiltered.push({
//				    		"Region": FNASummaryArray[j].Region,
//		    				"Country": FNASummaryArray[j].Country,
//		    				"City": FNASummaryArray[j].City,
//				    		"Pcate": FNASummaryArray[j].Pcate,
//		    				"Matnr": FNASummaryArray[j].Matnr,
//		    				"Avlb": FNASummaryArray[j].Avlb,
//		    				"Newavlb": FNASummaryArray[j].Newavlb,
//		    				"Aurepa": FNASummaryArray[j].Aurepa,
//		    				"Book": FNASummaryArray[j].Book,
//		    				"Bookn": FNASummaryArray[j].Bookn,
//		    				"Hold": FNASummaryArray[j].Hold,
//		    				"Ttlstock": FNASummaryArray[j].Ttlstock,
//		    				"Aeap": FNASummaryArray[j].Aeap,
//		    				"Netavlb": FNASummaryArray[j].Netavlb,
//		    				"Netad": FNASummaryArray[j].Netad,
//		    				"Netan": FNASummaryArray[j].Netan
//			    			});
//
//					    	jsonInventoryFNA.push({
//					    		"Region": FNASummaryArray[j].Region,
//			    				"Country": FNASummaryArray[j].Country,
//			    				"City": FNASummaryArray[j].City,
//			    				"Category": FNASummaryArray[j].Pcate,
//			    				"Unit Type": FNASummaryArray[j].Matnr,
//			    				"Depot AVLB": FNASummaryArray[j].Avlb,
//			    				"Capex AVLB": FNASummaryArray[j].Newavlb,
//			    				"APPD": FNASummaryArray[j].Aurepa,
//			    				"Depot Booked": FNASummaryArray[j].Book,
//			    				"Capex Booked": FNASummaryArray[j].Bookn,
//			    				"Hold": FNASummaryArray[j].Hold,
//			    				"Total Stock": FNASummaryArray[j].Ttlstock,
//			    				"Awaiting Units": FNASummaryArray[j].Aeap,
//			    				"Total Net AVLB": FNASummaryArray[j].Netavlb,
//			    				"Depot Net AVLB": FNASummaryArray[j].Netad,
//			    				"Capex Net AVLB": FNASummaryArray[j].Netan
//			    			});
//
//
//		    		}
//		    		}
//
//	    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
//	    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayFiltered});
//	        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
//	        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
//
//	            if (FNASummaryArrayFiltered.length < 100){
//	            	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(FNASummaryArrayFiltered.length);
//	            	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
//	            }
//	  	    	else{
//	  	    		sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
//	  	    		sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(100);
//	  	    	}
//
//				break;
//			}
//
//
//			}
//
//        	//sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(FNASummaryArrayBackup.length);
//
//		}

		alterPageOne : function(){

			/* On the select event of the combo boxes,  check which level (Region, Country or City) is selected and move accordingly*/

			var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
        	if(selectedRadio == "Country Level"){
        		this.alterPageOneCountryLevel();
        	}
        	else if(selectedRadio == "City Level"){
        		this.alterPageOneCityLevel();
        	}
        	else if(selectedRadio == "Region Level"){
        		this.alterPageOneRegionLevel();
        	}

        	var actualRows = sap.ui.getCore().byId("idTableFNASummary").getModel().getData().modelData.length;
        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
        		var requestedRows = Number(sap.ui.getCore().byId("idTotalRowsField").getValue());

        	if(actualRows < requestedRows){
        		sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(actualRows);
        	}
		},


		/* if the region level is selected ... */
		alterPageOneRegionLevel : function(){
			var regionValues = sap.ui.getCore().byId("idRegionCombo").getSelectedKeys();
			regionValues = $.grep(regionValues,function(n){ return n != ""});
			var countryValues = sap.ui.getCore().byId("idCountryCombo").getSelectedKeys();
			countryValues = $.grep(countryValues,function(n){ return n != ""});
			var cityValues = sap.ui.getCore().byId("idCityCombo").getSelectedKeys();
			cityValues = $.grep(cityValues,function(n){ return n != ""});
			var proCatValues = sap.ui.getCore().byId("idProCatCombo").getSelectedKeys();
			proCatValues = $.grep(proCatValues,function(n){ return n != ""});
			var proClassValues = sap.ui.getCore().byId("idProClassCombo").getSelectedKeys();
			proClassValues = $.grep(proClassValues,function(n){ return n != ""});
			var unitTypeValues = sap.ui.getCore().byId("idUnitTypeCombo").getSelectedKeys();
			unitTypeValues = $.grep(unitTypeValues,function(n){ return n != ""});

			var regionLength = regionValues.length;
			var unitTypeLength = unitTypeValues.length;
			var proCatValues = sap.ui.getCore().byId("idProCatCombo").getSelectedKeys();
			var proCatLength = proCatValues.length;
			var totalLength = FNASummaryArrayReg.length;
//			var localSummaryArray = [];
			jsonInventoryFNAReg = [];
			FNASummaryArrayRegFiltered = [];
			FNASummaryArrayRegFinal = [];

			sumAVLB = 0;
			sumAVLBN = 0;
			sumAUTH = 0;
			sumBOOK = 0;
			sumBOOKN = 0;
			sumRESER = 0;
			sumRESERN = 0;
			sumTDI = 0;
			sumTCI = 0;
			sumODI = 0;
			sumOCI = 0;
			sumREDEL = 0;
			sumHOLD = 0;
			sumAWAP = 0;
			sumNWAP = 0;
			sumTTLS = 0;
			sumNAVD = 0;
			sumNAVN = 0;
			sumNAVT = 0;


			numAVLB = 0;
			numAVLBN = 0;
			numAUTH = 0;
			numBOOK = 0;
			numBOOKN = 0;
			numRESER = 0;
			numRESERN = 0;
			numTDI = 0;
			numTCI = 0;
			numODI = 0;
			numOCI = 0;
			numREDEL = 0;
			numHOLD = 0;
			numAWAP = 0;
			numNWAP = 0;
			numTTLS = 0;
			numNAVD = 0;
			numNAVN = 0;
			numNAVT = 0;


			for(var j=0;j<FNASummaryArrayReg.length;j++){
				if(FNASummaryArrayReg[j].Region != ""){

				numAVLB = Number(FNASummaryArrayReg[j].Avlb);
				numAVLBN = Number(FNASummaryArrayReg[j].Newavlb);
				numAUTH = Number(FNASummaryArrayReg[j].Aurepa);
				numBOOK = Number(FNASummaryArrayReg[j].Book);
				numBOOKN = Number(FNASummaryArrayReg[j].Bookn);
				numRESER = Number(FNASummaryArrayReg[j].Reser);
				numRESERN = Number(FNASummaryArrayReg[j].Resern);
				numTDI = Number(FNASummaryArrayReg[j].Tdi);
				numTCI = Number(FNASummaryArrayReg[j].Tci);
				numODI = Number(FNASummaryArrayReg[j].Odi);
				numOCI = Number(FNASummaryArrayReg[j].Oci);
				numREDEL = Number(FNASummaryArrayReg[j].Redel);
				numHOLD = Number(FNASummaryArrayReg[j].Hold);
				numTTLS = Number(FNASummaryArrayReg[j].Ttlstock);
				numAWAP = Number(FNASummaryArrayReg[j].Aeap);
				numNWAP = Number(FNASummaryArrayReg[j].Nwap);
				numNAVT = Number(FNASummaryArrayReg[j].Netavlb);
				numNAVD = Number(FNASummaryArrayReg[j].Netad);
				numNAVN = Number(FNASummaryArrayReg[j].Netan);



				sumAVLB = numAVLB + sumAVLB;
				sumAVLBN = numAVLBN + sumAVLBN;
				sumAUTH = numAUTH + sumAUTH;
				sumBOOK = numBOOK + sumBOOK;
				sumBOOKN = numBOOKN + sumBOOKN;
				sumRESER = numRESER + sumRESER;
				sumRESERN = numRESERN + sumRESERN;
				sumTDI = numTDI + sumTDI;
				sumTCI = numTCI + sumTCI;
				sumODI = numODI + sumODI;
				sumOCI = numOCI + sumOCI;
				sumREDEL = numREDEL + sumREDEL;
				sumHOLD = numHOLD + sumHOLD;
				sumAWAP = numAWAP + sumAWAP;
				sumNWAP = numNWAP + sumNWAP;
				sumTTLS = numTTLS + sumTTLS;
				sumNAVD = numNAVD + sumNAVD;
				sumNAVN = numNAVN + sumNAVN;
				sumNAVT = numNAVT + sumNAVT;

				if(j != (totalLength - 1)){
				if(FNASummaryArrayReg[j+1].ZRegDesc != FNASummaryArrayReg[j].ZRegDesc || FNASummaryArrayReg[j+1].Matnr != FNASummaryArrayReg[j].Matnr){

    			FNASummaryArrayRegFiltered.push({
		    		"Region": FNASummaryArrayReg[j].Region,
    				"Country": FNASummaryArrayReg[j].Country,
    				"City": FNASummaryArrayReg[j].City,
		    		"Pcate": FNASummaryArrayReg[j].Pcate,
    				"Matnr": FNASummaryArrayReg[j].Matnr,
    				"ZRegDesc":FNASummaryArrayReg[j].ZRegDesc,
    				"ZCouDesc":FNASummaryArrayReg[j].ZCouDesc,
    				"ZCityDesc":FNASummaryArrayReg[j].ZCityDesc,
    				"Conc":FNASummaryArrayReg[j].Conc,
    				"Avlb": sumAVLB,
    				"Newavlb": sumAVLBN,
    				"Aurepa": sumAUTH,
    				"Book": sumBOOK,
    				"Bookn": sumBOOKN,
    				"Reser": sumRESER,
    				"Resern": sumRESERN,
    				"Tdi": sumTDI,
    				"Tci": sumTCI,
    				"Odi": sumODI,
    				"Oci": sumOCI,
    				"Redel": sumREDEL,
    				"Hold": sumHOLD,
    				"Ttlstock": sumTTLS,
    				"Aeap": sumAWAP,
    				"Nwap": sumNWAP,
    				"Netavlb": sumNAVT,
    				"Netad": sumNAVD,
    				"Netan": sumNAVN,
    				"enabledAvlb": (sumAVLB == 0)? false: true,
    				"enabledNewavlb": (sumAVLBN == 0)? false: true,
    				"enabledAurepa": (sumAUTH == 0)? false: true,
					"enabledBook": (sumBOOK == 0)? false: true,
    				"enabledBookn": (sumBOOKN == 0)? false: true,
    				"enabledReser": (sumRESER == 0)? false: true,
    				"enabledResern": (sumRESERN == 0)? false: true,
    				"enabledRedel": (sumREDEL == 0)? false: true,
    				"enabledHold": (sumHOLD == 0)? false: true,
		    		"enabledTtlstock": (sumTTLS == 0)? false: true,
    				"enabledAeap": (sumAWAP == 0)? false: true,
    				"enabledNwap": (sumNWAP == 0)? false: true,
    				"enabledNetad": (sumNAVD == 0)? false: true,
    				"enabledNetan": (sumNAVN == 0)? false: true,
    				"enabledNetavlb": (sumNAVT == 0)? false: true,
	    			});

			    	jsonInventoryFNAReg.push({
	    				"Region":FNASummaryArrayReg[j].ZRegDesc,
	    				//"Country":FNASummaryArrayReg[j].ZCouDesc,
	    				//"City":FNASummaryArrayReg[j].ZCityDesc,
	    				"Category": FNASummaryArrayReg[j].Pcate,
	    				"Unit Type": FNASummaryArrayReg[j].Matnr,
	    				"Depot AVLB": sumAVLB,
	    				"Capex AVLB": sumAVLBN,
	    				"APPD": sumAUTH,
	    				"Depot Booked": sumBOOK,
	    				"Capex Booked": sumBOOKN,
	    				"Depot Reserved": sumRESER,
	    				"Capex Reserved": sumRESERN,
	    				"Depot Target": sumTDI,
	    				"Capex Target": sumTCI,
	    				"Depot Shortage/Surplus": sumODI,
	    				"Capex Shortage/Surplus": sumOCI,
	    				"TIND": sumREDEL,
	    				"HOLD": sumHOLD,
	    				"Total Stock": sumTTLS,
	    				"WEST": sumAWAP,
	    				"Awaiting Approv.": sumNWAP,
	    				"Total Net AVLB": sumNAVT,
	    				"Depot Net AVLB": sumNAVD,
	    				"Capex Net AVLB": sumNAVN
	    			});

					sumAVLB = 0;
					sumAVLBN = 0;
					sumAUTH = 0;
					sumBOOK = 0;
					sumBOOKN = 0;
					sumRESER = 0;
					sumRESERN = 0;
					sumTDI = 0;
					sumTCI = 0;
					sumODI = 0;
					sumOCI = 0;
					sumREDEL = 0;
					sumHOLD = 0;
					sumAWAP = 0;
					sumNWAP = 0;
					sumTTLS = 0;
					sumNAVD = 0;
					sumNAVN = 0;
					sumNAVT = 0;

				}
				}
				else{
					FNASummaryArrayRegFiltered.push({
			    		"Region": FNASummaryArrayReg[j].Region,
	    				"Country": FNASummaryArrayReg[j].Country,
	    				"City": FNASummaryArrayReg[j].City,
			    		"Pcate": FNASummaryArrayReg[j].Pcate,
	    				"Matnr": FNASummaryArrayReg[j].Matnr,
	    				"Conc":FNASummaryArrayReg[j].Conc,
	    				"ZRegDesc":FNASummaryArrayReg[j].ZRegDesc,
	    				"ZCouDesc":FNASummaryArrayReg[j].ZCouDesc,
	    				"ZCityDesc":FNASummaryArrayReg[j].ZCityDesc,
	    				"Avlb": sumAVLB,
	    				"Newavlb": sumAVLBN,
	    				"Aurepa": sumAUTH,
	    				"Book": sumBOOK,
	    				"Bookn": sumBOOKN,
	    				"Reser": sumRESER,
	    				"Resern": sumRESERN,
	    				"Tdi": sumTDI,
	    				"Tci": sumTCI,
	    				"Odi": sumODI,
	    				"Oci": sumOCI,
	    				"Redel": sumREDEL,
	    				"Hold": sumHOLD,
	    				"Ttlstock": sumTTLS,
	    				"Aeap": sumAWAP,
	    				"Nwap": sumNWAP,
	    				"Netavlb": sumNAVT,
	    				"Netad": sumNAVD,
	    				"Netan": sumNAVN,
	    				"enabledAvlb": (sumAVLB == 0)? false: true,
	    				"enabledNewavlb": (sumAVLBN == 0)? false: true,
	    				"enabledAurepa": (sumAUTH == 0)? false: true,
						"enabledBook": (sumBOOK == 0)? false: true,
	    				"enabledBookn": (sumBOOKN == 0)? false: true,
	    				"enabledReser": (sumRESER == 0)? false: true,
	    				"enabledResern": (sumRESERN == 0)? false: true,
	    				"enabledRedel": (sumREDEL == 0)? false: true,
	    				"enabledHold": (sumHOLD == 0)? false: true,
			    		"enabledTtlstock": (sumTTLS == 0)? false: true,
	    				"enabledAeap": (sumAWAP == 0)? false: true,
	    				"enabledNwap": (sumNWAP == 0)? false: true,
	    				"enabledNetad": (sumNAVD == 0)? false: true,
	    				"enabledNetan": (sumNAVN == 0)? false: true,
	    				"enabledNetavlb": (sumNAVT == 0)? false: true,
		    			});

				    	jsonInventoryFNAReg.push({
		    				"Region":FNASummaryArrayReg[j].ZRegDesc,
		    				//"Country":FNASummaryArrayReg[j].ZCouDesc,
		    				//"City":FNASummaryArrayReg[j].ZCityDesc,
		    				"Category": FNASummaryArrayReg[j].Pcate,
		    				"Unit Type": FNASummaryArrayReg[j].Matnr,
		    				"Depot AVLB": sumAVLB,
		    				"Capex AVLB": sumAVLBN,
		    				"APPD": sumAUTH,
		    				"Depot Booked": sumBOOK,
		    				"Capex Booked": sumBOOKN,
		    				"Depot Reserved": sumRESER,
		    				"Capex Reserved": sumRESERN,
		    				"Depot Target": sumTDI,
		    				"Capex Target": sumTCI,
		    				"Depot Shortage/Surplus": sumODI,
		    				"Capex Shortage/Surplus": sumOCI,
		    				"TIND" : sumREDEL,
		    				"HOLD": sumHOLD,
		    				"Total Stock": sumTTLS,
		    				"WEST": sumAWAP,
		    				"Awaiting Approv.": sumNWAP,
		    				"Total Net AVLB": sumNAVT,
		    				"Depot Net AVLB": sumNAVD,
		    				"Capex Net AVLB": sumNAVN
		    			});

						sumAVLB = 0;
						sumAVLBN = 0;
						sumAUTH = 0;
						sumBOOK = 0;
						sumBOOKN = 0;
						sumRESER = 0;
						sumRESERN = 0;
						sumTDI = 0;
						sumTCI = 0;
						sumODI = 0;
						sumOCI = 0;
						sumREDEL = 0;
						sumHOLD = 0;
						sumAWAP = 0;
						sumNWAP = 0;
						sumTTLS = 0;
						sumNAVD = 0;
						sumNAVN = 0;
						sumNAVT = 0;
				}
				}
	    		}




			/* Check for any filters ... */
			if(unitTypeLength != 0){
			 if(regionLength != 0){

					jsonInventoryFNAReg = [];
					FNASummaryArrayRegFinal = [];
					for(var j=0;j<FNASummaryArrayRegFiltered.length;j++){
						if((isInArray(FNASummaryArrayRegFiltered[j].Region, regionValues)) && (isInArray(FNASummaryArrayRegFiltered[j].Matnr, unitTypeValues))){

			    			FNASummaryArrayRegFinal.push({
					    		"Region": FNASummaryArrayRegFiltered[j].Region,
			    				"Country": FNASummaryArrayRegFiltered[j].Country,
			    				"City": FNASummaryArrayRegFiltered[j].City,
					    		"Pcate": FNASummaryArrayRegFiltered[j].Pcate,
			    				"Matnr": FNASummaryArrayRegFiltered[j].Matnr,
			    				"ZRegDesc":FNASummaryArrayRegFiltered[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArrayRegFiltered[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArrayRegFiltered[j].ZCityDesc,
			    				"Conc":FNASummaryArrayRegFiltered[j].Conc,
			    				"Avlb": FNASummaryArrayRegFiltered[j].Avlb,
			    				"Newavlb": FNASummaryArrayRegFiltered[j].Newavlb,
			    				"Aurepa": FNASummaryArrayRegFiltered[j].Aurepa,
			    				"Book": FNASummaryArrayRegFiltered[j].Book,
			    				"Bookn": FNASummaryArrayRegFiltered[j].Bookn,
			    				"Reser": FNASummaryArrayRegFiltered[j].Reser,

			    				"Redel": FNASummaryArrayRegFiltered[j].Redel,
			    				"Tdi": FNASummaryArrayRegFiltered[j].Tdi,
			    				"Tci": FNASummaryArrayRegFiltered[j].Tci,
			    				"Odi": FNASummaryArrayRegFiltered[j].Odi,
			    				"Oci": FNASummaryArrayRegFiltered[j].Oci,
			    				"enabledRedel": (FNASummaryArrayRegFiltered[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArrayRegFiltered[j].Hold,
			    				"Ttlstock": FNASummaryArrayRegFiltered[j].Ttlstock,
			    				"Aeap": FNASummaryArrayRegFiltered[j].Aeap,
			    				"Nwap": FNASummaryArrayRegFiltered[j].Nwap,
			    				"Netavlb": FNASummaryArrayRegFiltered[j].Netavlb,
			    				"Netad": FNASummaryArrayRegFiltered[j].Netad,
			    				"Netan": FNASummaryArrayRegFiltered[j].Netan,
			    				"enabledAvlb": (FNASummaryArrayRegFiltered[j].Avlb == 0)? false: true,
			    				"enabledNewavlb": (FNASummaryArrayRegFiltered[j].Newavlb == 0)? false: true,
			    				"enabledAurepa": (FNASummaryArrayRegFiltered[j].Aurepa == 0)? false: true,
	    						"enabledBook": (FNASummaryArrayRegFiltered[j].Book == 0)? false: true,
			    				"enabledBookn": (FNASummaryArrayRegFiltered[j].Bookn == 0)? false: true,
			    				"enabledReser": (FNASummaryArrayRegFiltered[j].Reser == 0)? false: true,
			    				"enabledHold": (FNASummaryArrayRegFiltered[j].Hold == 0)? false: true,
	    			    		"enabledTtlstock": (FNASummaryArrayRegFiltered[j].Ttlstock == 0)? false: true,
			    				"enabledAeap": (FNASummaryArrayRegFiltered[j].Aeap == 0)? false: true,
			    				"enabledNwap": (FNASummaryArrayRegFiltered[j].Nwap == 0)? false: true,
			    				"enabledNetad": (FNASummaryArrayRegFiltered[j].Netad == 0)? false: true,
			    				"enabledNetan": (FNASummaryArrayRegFiltered[j].Netan == 0)? false: true,
			    				"enabledNetavlb": (FNASummaryArrayRegFiltered[j].Netavlb == 0)? false: true,

			    				"Resern": FNASummaryArrayRegFiltered[j].Resern,
			    				"enabledResern": (FNASummaryArrayRegFiltered[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNAReg.push({
				    				"Region":FNASummaryArrayRegFiltered[j].ZRegDesc,
				    				//"Country":FNASummaryArrayRegFiltered[j].ZCouDesc,
				    				//"City":FNASummaryArrayRegFiltered[j].ZCityDesc,
				    				"Category": FNASummaryArrayRegFiltered[j].Pcate,
				    				"Unit Type": FNASummaryArrayRegFiltered[j].Matnr,
				    				"Depot AVLB": FNASummaryArrayRegFiltered[j].Avlb,
				    				"Capex AVLB": FNASummaryArrayRegFiltered[j].Newavlb,
				    				"APPD": FNASummaryArrayRegFiltered[j].Aurepa,
				    				"Depot Booked": FNASummaryArrayRegFiltered[j].Book,
				    				"Capex Booked": FNASummaryArrayRegFiltered[j].Bookn,
				    				"Depot Reserved": FNASummaryArrayRegFiltered[j].Reser,
				    				"Capex Reserved": FNASummaryArrayRegFiltered[j].Resern,

				    				"TIND": FNASummaryArrayRegFiltered[j].Redel,
				    				"Depot Target": FNASummaryArrayRegFiltered[j].Tdi,
				    				"Depot Shortage/Surplus": FNASummaryArrayRegFiltered[j].Tci,
				    				"Capex Target": FNASummaryArrayRegFiltered[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArrayRegFiltered[j].Oci,

				    				"HOLD": FNASummaryArrayRegFiltered[j].Hold,
				    				"Total Stock": FNASummaryArrayRegFiltered[j].Ttlstock,
				    				"WEST": FNASummaryArrayRegFiltered[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArrayRegFiltered[j].Nwap,
				    				"Total Net AVLB": FNASummaryArrayRegFiltered[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArrayRegFiltered[j].Netad,
				    				"Capex Net AVLB": FNASummaryArrayRegFiltered[j].Netan
				    			});


						}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayRegFinal});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");

		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayRegFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);

	  	    		// Impchange
					}


		            /*if (FNASummaryArrayRegFinal.length < 50){
		            	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(FNASummaryArrayRegFinal.length);
		            	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		            	sap.ui.getCore().byId("idTotalPages").setText("");
		            }
		  	    	else{
		  	    		sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		  	    		var totalLines = sap.ui.getCore().byId("idTableFNASummary").getModel().getData().modelData.length;
		  	    		var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		  	    		if(requestedLines < totalLines){
		  					newValue = Number(newValue);
		  					sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(newValue);
		  					var totalPages = (Math.ceil(totalLines/newValue));
		  	  	    		totalPages = "Total No. of Pages : " + totalPages;
		  	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);
		  	    		}
		  	    	}*/
			 	}


			else if(proCatLength != 0){
				if(regionLength != 0){

									jsonInventoryFNAReg = [];
									FNASummaryArrayRegFinal = [];
									for(var j=0;j<FNASummaryArrayRegFiltered.length;j++){
										if((isInArray(FNASummaryArrayRegFiltered[j].Region, regionValues)) && (isInArray(FNASummaryArrayRegFiltered[j].Pcate, proCatValues))){

							    			FNASummaryArrayRegFinal.push({
									    		"Region": FNASummaryArrayRegFiltered[j].Region,
							    				"Country": FNASummaryArrayRegFiltered[j].Country,
							    				"City": FNASummaryArrayRegFiltered[j].City,
									    		"Pcate": FNASummaryArrayRegFiltered[j].Pcate,
							    				"Matnr": FNASummaryArrayRegFiltered[j].Matnr,
							    				"ZRegDesc":FNASummaryArrayRegFiltered[j].ZRegDesc,
							    				"ZCouDesc":FNASummaryArrayRegFiltered[j].ZCouDesc,
							    				"ZCityDesc":FNASummaryArrayRegFiltered[j].ZCityDesc,
							    				"Conc":FNASummaryArrayRegFiltered[j].Conc,
							    				"Avlb": FNASummaryArrayRegFiltered[j].Avlb,
							    				"Newavlb": FNASummaryArrayRegFiltered[j].Newavlb,
							    				"Aurepa": FNASummaryArrayRegFiltered[j].Aurepa,
							    				"Book": FNASummaryArrayRegFiltered[j].Book,
							    				"Bookn": FNASummaryArrayRegFiltered[j].Bookn,
							    				"Reser": FNASummaryArrayRegFiltered[j].Reser,

							    				"Redel": FNASummaryArrayRegFiltered[j].Redel,
							    				"Tdi": FNASummaryArrayRegFiltered[j].Tdi,
							    				"Tci": FNASummaryArrayRegFiltered[j].Tci,
							    				"Odi": FNASummaryArrayRegFiltered[j].Odi,
							    				"Oci": FNASummaryArrayRegFiltered[j].Oci,
							    				"enabledRedel": (FNASummaryArrayRegFiltered[j].Redel == 0)? false: true,

							    				"Hold": FNASummaryArrayRegFiltered[j].Hold,
							    				"Ttlstock": FNASummaryArrayRegFiltered[j].Ttlstock,
							    				"Aeap": FNASummaryArrayRegFiltered[j].Aeap,
							    				"Nwap": FNASummaryArrayRegFiltered[j].Nwap,
							    				"Netavlb": FNASummaryArrayRegFiltered[j].Netavlb,
							    				"Netad": FNASummaryArrayRegFiltered[j].Netad,
							    				"Netan": FNASummaryArrayRegFiltered[j].Netan,
							    				"enabledAvlb": (FNASummaryArrayRegFiltered[j].Avlb == 0)? false: true,
									    				"enabledNewavlb": (FNASummaryArrayRegFiltered[j].Newavlb == 0)? false: true,
									    				"enabledAurepa": (FNASummaryArrayRegFiltered[j].Aurepa == 0)? false: true,
							    						"enabledBook": (FNASummaryArrayRegFiltered[j].Book == 0)? false: true,
									    				"enabledBookn": (FNASummaryArrayRegFiltered[j].Bookn == 0)? false: true,
									    				"enabledReser": (FNASummaryArrayRegFiltered[j].Reser == 0)? false: true,
									    				"enabledHold": (FNASummaryArrayRegFiltered[j].Hold == 0)? false: true,
							    			    		"enabledTtlstock": (FNASummaryArrayRegFiltered[j].Ttlstock == 0)? false: true,
									    				"enabledAeap": (FNASummaryArrayRegFiltered[j].Aeap == 0)? false: true,
									    				"enabledNwap": (FNASummaryArrayRegFiltered[j].Nwap == 0)? false: true,
									    				"enabledNetad": (FNASummaryArrayRegFiltered[j].Netad == 0)? false: true,
									    				"enabledNetan": (FNASummaryArrayRegFiltered[j].Netan == 0)? false: true,
									    				"enabledNetavlb": (FNASummaryArrayRegFiltered[j].Netavlb == 0)? false: true,

									    						"Resern": FNASummaryArrayRegFiltered[j].Resern,
											    				"enabledResern": (FNASummaryArrayRegFiltered[j].Resern == 0)? false: true
								    			});

										    	jsonInventoryFNAReg.push({
								    				"Region":FNASummaryArrayRegFiltered[j].ZRegDesc,
								    				//"Country":FNASummaryArrayRegFiltered[j].ZCouDesc,
								    				//"City":FNASummaryArrayRegFiltered[j].ZCityDesc,
								    				"Category": FNASummaryArrayRegFiltered[j].Pcate,
								    				"Unit Type": FNASummaryArrayRegFiltered[j].Matnr,
								    				"Depot AVLB": FNASummaryArrayRegFiltered[j].Avlb,
								    				"Capex AVLB": FNASummaryArrayRegFiltered[j].Newavlb,
								    				"APPD": FNASummaryArrayRegFiltered[j].Aurepa,
								    				"Depot Booked": FNASummaryArrayRegFiltered[j].Book,
								    				"Capex Booked": FNASummaryArrayRegFiltered[j].Bookn,
								    				"Depot Reserved": FNASummaryArrayRegFiltered[j].Reser,
								    				"Capex Reserved": FNASummaryArrayRegFiltered[j].Resern,

								    				"TIND": FNASummaryArrayRegFiltered[j].Redel,
								    				"Depot Target": FNASummaryArrayRegFiltered[j].Tdi,
								    				"Depot Shortage/Surplus": FNASummaryArrayRegFiltered[j].Tci,
								    				"Capex Target": FNASummaryArrayRegFiltered[j].Odi,
								    				"Capex Shortage/Surplus": FNASummaryArrayRegFiltered[j].Oci,

								    				"HOLD": FNASummaryArrayRegFiltered[j].Hold,
								    				"Total Stock": FNASummaryArrayRegFiltered[j].Ttlstock,
								    				"WEST": FNASummaryArrayRegFiltered[j].Aeap,
								    				"Awaiting Approv.": FNASummaryArrayRegFiltered[j].Nwap,
								    				"Total Net AVLB": FNASummaryArrayRegFiltered[j].Netavlb,
								    				"Depot Net AVLB": FNASummaryArrayRegFiltered[j].Netad,
								    				"Capex Net AVLB": FNASummaryArrayRegFiltered[j].Netan
								    			});


							    		}
							    		}

						    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
						    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayRegFinal});
						        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
						        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
						        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
						        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
						        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
						        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
						        	requestedLines = Number(requestedLines);
						        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
						        	if(pagingMode == 1){
						        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
						        	}
						        	else{
						        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
						        	}

					  	    		var totalPages = (Math.ceil(FNASummaryArrayRegFinal.length/requestedLines));
					  	    		totalPages = "Total No. of Pages : " + totalPages;
					  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);
								}

				}


			else{




				if(regionLength != 0){

					jsonInventoryFNAReg = [];
					FNASummaryArrayRegFinal = [];
					for(var j=0;j<FNASummaryArrayRegFiltered.length;j++){
						if((isInArray(FNASummaryArrayRegFiltered[j].Region, regionValues))){

			    			FNASummaryArrayRegFinal.push({
					    		"Region": FNASummaryArrayRegFiltered[j].Region,
			    				"Country": FNASummaryArrayRegFiltered[j].Country,
			    				"City": FNASummaryArrayRegFiltered[j].City,
					    		"Pcate": FNASummaryArrayRegFiltered[j].Pcate,
			    				"Matnr": FNASummaryArrayRegFiltered[j].Matnr,
			    				"ZRegDesc":FNASummaryArrayRegFiltered[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArrayRegFiltered[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArrayRegFiltered[j].ZCityDesc,
			    				"Conc":FNASummaryArrayRegFiltered[j].Conc,
			    				"Avlb": FNASummaryArrayRegFiltered[j].Avlb,
			    				"Newavlb": FNASummaryArrayRegFiltered[j].Newavlb,
			    				"Aurepa": FNASummaryArrayRegFiltered[j].Aurepa,
			    				"Book": FNASummaryArrayRegFiltered[j].Book,
			    				"Bookn": FNASummaryArrayRegFiltered[j].Bookn,
			    				"Reser": FNASummaryArrayRegFiltered[j].Reser,

			    				"Redel": FNASummaryArrayRegFiltered[j].Redel,
			    				"Tdi": FNASummaryArrayRegFiltered[j].Tdi,
			    				"Tci": FNASummaryArrayRegFiltered[j].Tci,
			    				"Odi": FNASummaryArrayRegFiltered[j].Odi,
			    				"Oci": FNASummaryArrayRegFiltered[j].Oci,
			    				"enabledRedel": (FNASummaryArrayRegFiltered[j].Redel == 0)? false: true,


			    				"Hold": FNASummaryArrayRegFiltered[j].Hold,
			    				"Ttlstock": FNASummaryArrayRegFiltered[j].Ttlstock,
			    				"Aeap": FNASummaryArrayRegFiltered[j].Aeap,
			    				"Nwap": FNASummaryArrayRegFiltered[j].Nwap,
			    				"Netavlb": FNASummaryArrayRegFiltered[j].Netavlb,
			    				"Netad": FNASummaryArrayRegFiltered[j].Netad,
			    				"Netan": FNASummaryArrayRegFiltered[j].Netan,
			    				"enabledAvlb": (FNASummaryArrayRegFiltered[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArrayRegFiltered[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArrayRegFiltered[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArrayRegFiltered[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArrayRegFiltered[j].Bookn == 0)? false: true,
					    				"enabledReser": (FNASummaryArrayRegFiltered[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArrayRegFiltered[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArrayRegFiltered[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArrayRegFiltered[j].Aeap == 0)? false: true,
					    				"enabledNwap": (FNASummaryArrayRegFiltered[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArrayRegFiltered[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArrayRegFiltered[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArrayRegFiltered[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArrayRegFiltered[j].Resern,
							    				"enabledResern": (FNASummaryArrayRegFiltered[j].Resern == 0)? false: true
				    			});

						    	jsonInventoryFNAReg.push({
				    				"Region":FNASummaryArrayRegFiltered[j].ZRegDesc,
				    				//"Country":FNASummaryArrayRegFiltered[j].ZCouDesc,
				    				//"City":FNASummaryArrayRegFiltered[j].ZCityDesc,
				    				"Category": FNASummaryArrayRegFiltered[j].Pcate,
				    				"Unit Type": FNASummaryArrayRegFiltered[j].Matnr,
				    				"Depot AVLB": FNASummaryArrayRegFiltered[j].Avlb,
				    				"Capex AVLB": FNASummaryArrayRegFiltered[j].Newavlb,
				    				"APPD": FNASummaryArrayRegFiltered[j].Aurepa,
				    				"Depot Booked": FNASummaryArrayRegFiltered[j].Book,
				    				"Capex Booked": FNASummaryArrayRegFiltered[j].Bookn,
				    				"Depot Reserved": FNASummaryArrayRegFiltered[j].Reser,
				    				"Capex Reserved": FNASummaryArrayRegFiltered[j].Resern,

				    				"TIND": FNASummaryArrayRegFiltered[j].Redel,
				    				"Depot Target": FNASummaryArrayRegFiltered[j].Tdi,
				    				"Depot Shortage/Surplus": FNASummaryArrayRegFiltered[j].Tci,
				    				"Capex Target": FNASummaryArrayRegFiltered[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArrayRegFiltered[j].Oci,

				    				"HOLD": FNASummaryArrayRegFiltered[j].Hold,
				    				"Total Stock": FNASummaryArrayRegFiltered[j].Ttlstock,
				    				"WEST": FNASummaryArrayRegFiltered[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArrayRegFiltered[j].Nwap,
				    				"Total Net AVLB": FNASummaryArrayRegFiltered[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArrayRegFiltered[j].Netad,
				    				"Capex Net AVLB": FNASummaryArrayRegFiltered[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayRegFinal});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayRegFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);
				}

				else{
					var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayRegFiltered});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");

		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayRegFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);

				}

			}

		},









		/* if the country level is selected ... */
		alterPageOneCountryLevel : function(){
			var regionValues = sap.ui.getCore().byId("idRegionCombo").getSelectedKeys();
			regionValues = $.grep(regionValues,function(n){ return n != ""});
			var countryValues = sap.ui.getCore().byId("idCountryCombo").getSelectedKeys();
			countryValues = $.grep(countryValues,function(n){ return n != ""});
			var cityValues = sap.ui.getCore().byId("idCityCombo").getSelectedKeys();
			cityValues = $.grep(cityValues,function(n){ return n != ""});
			var proCatValues = sap.ui.getCore().byId("idProCatCombo").getSelectedKeys();
			proCatValues = $.grep(proCatValues,function(n){ return n != ""});
			var proClassValues = sap.ui.getCore().byId("idProClassCombo").getSelectedKeys();
			proClassValues = $.grep(proClassValues,function(n){ return n != ""});
			var unitTypeValues = sap.ui.getCore().byId("idUnitTypeCombo").getSelectedKeys();
			unitTypeValues = $.grep(unitTypeValues,function(n){ return n != ""});

			var proCatLength = proCatValues.length;
			var unitTypeLength = unitTypeValues.length;
			var regionLength = regionValues.length;
			var countryLength = countryValues.length;
			var totalLength = FNASummaryArray.length;








			jsonInventoryFNACou = [];
			FNASummaryArrayCouFiltered = [];
			FNASummaryArrayCouFinal = [];

			sumAVLB = 0;
			sumAVLBN = 0;
			sumAUTH = 0;
			sumBOOK = 0;
			sumBOOKN = 0;
			sumREDEL = 0;
			sumRESER = 0;
			sumRESERN = 0;
			sumTDI = 0;
			sumTCI = 0;
			sumODI = 0;
			sumOCI = 0;
			sumHOLD = 0;
			sumAWAP = 0;
			sumNWAP = 0;
			sumTTLS = 0;
			sumNAVD = 0;
			sumNAVN = 0;
			sumNAVT = 0;


			numAVLB = 0;
			numAVLBN = 0;
			numAUTH = 0;
			numBOOK = 0;
			numBOOKN = 0;
			numREDEL = 0;
			numRESER = 0;
			numRESERN = 0;
			numTDI = 0;
			numTCI = 0;
			numODI = 0;
			numOCI = 0;
			numHOLD = 0;
			numAWAP = 0;
			numNWAP = 0;
			numTTLS = 0;
			numNAVD = 0;
			numNAVN = 0;
			numNAVT = 0;

			for(var j=0;j<FNASummaryArrayCou.length;j++){
				if(FNASummaryArrayCou[j].Region != ""){

				numAVLB =  (FNASummaryArrayCou[j].Avlb);
				numAVLBN =  (FNASummaryArrayCou[j].Newavlb);
				numAUTH =  (FNASummaryArrayCou[j].Aurepa);
				numBOOK =  (FNASummaryArrayCou[j].Book);
				numBOOKN =  (FNASummaryArrayCou[j].Bookn);
				numRESER = (FNASummaryArrayCou[j].Reser);
				numRESERN = (FNASummaryArrayCou[j].Resern);
				numREDEL = (FNASummaryArrayCou[j].Redel);
				numTDI = (FNASummaryArrayCou[j].Tdi);
				numTCI = (FNASummaryArrayCou[j].Tci);
				numODI = (FNASummaryArrayCou[j].Odi);
				numOCI = (FNASummaryArrayCou[j].Oci);
				numHOLD =  (FNASummaryArrayCou[j].Hold);
				numTTLS =  (FNASummaryArrayCou[j].Ttlstock);
				numAWAP =  (FNASummaryArrayCou[j].Aeap);
				numNWAP =  (FNASummaryArrayCou[j].Nwap);
				numNAVT =  (FNASummaryArrayCou[j].Netavlb);
				numNAVD =  (FNASummaryArrayCou[j].Netad);
				numNAVN =  (FNASummaryArrayCou[j].Netan);



				sumAVLB = numAVLB + sumAVLB;
				sumAVLBN = numAVLBN + sumAVLBN;
				sumAUTH = numAUTH + sumAUTH;
				sumBOOK = numBOOK + sumBOOK;
				sumBOOKN = numBOOKN + sumBOOKN;
				sumREDEL = numREDEL + sumREDEL;
				sumRESER = numRESER + sumRESER;
				sumRESERN = numRESERN + sumRESERN;
				sumTDI = numTDI + sumTDI;
				sumTCI = numTCI + sumTCI;
				sumODI = numODI + sumODI;
				sumOCI = numOCI + sumOCI;
				sumHOLD = numHOLD + sumHOLD;
				sumAWAP = numAWAP + sumAWAP;
				sumNWAP = numNWAP + sumNWAP;
				sumTTLS = numTTLS + sumTTLS;
				sumNAVD = numNAVD + sumNAVD;
				sumNAVN = numNAVN + sumNAVN;
				sumNAVT = numNAVT + sumNAVT;

				if(j != (totalLength - 1)){
				if(FNASummaryArrayCou[j+1].ZCouDesc != FNASummaryArrayCou[j].ZCouDesc || FNASummaryArrayCou[j+1].Matnr != FNASummaryArrayCou[j].Matnr){

    			FNASummaryArrayCouFiltered.push({
		    		"Region": FNASummaryArrayCou[j].Region,
    				"Country": FNASummaryArrayCou[j].Country,
    				"City": FNASummaryArrayCou[j].City,
		    		"Pcate": FNASummaryArrayCou[j].Pcate,
    				"Matnr": FNASummaryArrayCou[j].Matnr,
    				"ZRegDesc":FNASummaryArrayCou[j].ZRegDesc,
    				"ZCouDesc":FNASummaryArrayCou[j].ZCouDesc,
    				"ZCityDesc":FNASummaryArrayCou[j].ZCityDesc,
    				"Conc":FNASummaryArrayCou[j].Conc,
    				"Avlb": sumAVLB,
    				"Newavlb": sumAVLBN,
    				"Aurepa": sumAUTH,
    				"Book": sumBOOK,
    				"Bookn": sumBOOKN,
    				"Reser": sumRESER,
    				"Resern": sumRESERN,
    				"Redel": sumREDEL,
    				"Tdi": sumTDI,
    				"Tci": sumTCI,
    				"Odi": sumODI,
    				"Oci": sumOCI,
    				"enabledRedel": (sumREDEL == 0)? false: true,

    				"Hold": sumHOLD,
    				"Ttlstock": sumTTLS,
    				"Aeap": sumAWAP,
    				"Nwap": sumNWAP,
    				"Netavlb": sumNAVT,
    				"Netad": sumNAVD,
    				"Netan": sumNAVN,
    				"enabledAvlb": (sumAVLB == 0)? false: true,
    				"enabledNewavlb": (sumAVLBN == 0)? false: true,
    				"enabledAurepa": (sumAUTH == 0)? false: true,
					"enabledBook": (sumBOOK == 0)? false: true,
    				"enabledBookn": (sumBOOKN == 0)? false: true,
    				"enabledReser": (sumRESER == 0)? false: true,
    				"enabledResern": (sumRESERN == 0)? false: true,
    				"enabledHold": (sumHOLD == 0)? false: true,
		    		"enabledTtlstock": (sumTTLS == 0)? false: true,
    				"enabledAeap": (sumAWAP == 0)? false: true,
    				"enabledNwap": (sumNWAP == 0)? false: true,
    				"enabledNetad": (sumNAVD == 0)? false: true,
    				"enabledNetan": (sumNAVN == 0)? false: true,
    				"enabledNetavlb": (sumNAVT == 0)? false: true,
	    			});

			    	jsonInventoryFNACou.push({
	    				"Region":FNASummaryArrayCou[j].ZRegDesc,
	    				"Country":FNASummaryArrayCou[j].ZCouDesc,
	    				//"City":FNASummaryArrayCou[j].ZCityDesc,
	    				"Category": FNASummaryArrayCou[j].Pcate,
	    				"Unit Type": FNASummaryArrayCou[j].Matnr,
	    				"Depot AVLB": sumAVLB,
	    				"Capex AVLB": sumAVLBN,
	    				"APPD": sumAUTH,
	    				"Depot Booked": sumBOOK,
	    				"Capex Booked": sumBOOKN,
	    				"Depot Reserved": sumRESER,
	    				"Capex Reserved": sumRESERN,
	    				"TIND": sumREDEL,
	    				"Depot Target": sumTDI,
	    				"Depot Shortage/Surplus": sumTCI,
	    				"Capex Target": sumODI,
	    				"Capex Shortage/Surplus": sumOCI,

	    				"HOLD": sumHOLD,
	    				"Total Stock": sumTTLS,
	    				"WEST": sumAWAP,
	    				"Awaiting Approv.": sumNWAP,
	    				"Total Net AVLB": sumNAVT,
	    				"Depot Net AVLB": sumNAVD,
	    				"Capex Net AVLB": sumNAVN
	    			});

					sumAVLB = 0;
					sumAVLBN = 0;
					sumAUTH = 0;
					sumBOOK = 0;
					sumBOOKN = 0;

					sumREDEL = 0;
					sumRESER = 0;
					sumRESERN = 0;
					sumTDI = 0;
					sumTCI = 0;
					sumODI = 0;
					sumOCI = 0;

					sumHOLD = 0;
					sumAWAP = 0;
					sumNWAP = 0;
					sumTTLS = 0;
					sumNAVD = 0;
					sumNAVN = 0;
					sumNAVT = 0;

				}
				}
				else{
					FNASummaryArrayCouFiltered.push({
			    		"Region": FNASummaryArrayCou[j].Region,
	    				"Country": FNASummaryArrayCou[j].Country,
	    				"City": FNASummaryArrayCou[j].City,
			    		"Pcate": FNASummaryArrayCou[j].Pcate,
	    				"Matnr": FNASummaryArrayCou[j].Matnr,
	    				"ZRegDesc":FNASummaryArrayCou[j].ZRegDesc,
	    				"ZCouDesc":FNASummaryArrayCou[j].ZCouDesc,
	    				"ZCityDesc":FNASummaryArrayCou[j].ZCityDesc,
	    				"Conc":FNASummaryArrayCou[j].Conc,
	    				"Avlb": sumAVLB,
	    				"Newavlb": sumAVLBN,
	    				"Aurepa": sumAUTH,
	    				"Book": sumBOOK,
	    				"Bookn": sumBOOKN,
	    				"Reser": sumRESER,
	    				"Resern": sumRESERN,
	    				"Redel": sumREDEL,
	    				"Tdi": sumTDI,
	    				"Tci": sumTCI,
	    				"Odi": sumODI,
	    				"Oci": sumOCI,
	    				"enabledRedel": (sumREDEL == 0)? false: true,

	    				"Hold": sumHOLD,
	    				"Ttlstock": sumTTLS,
	    				"Aeap": sumAWAP,
	    				"Nwap": sumNWAP,
	    				"Netavlb": sumNAVT,
	    				"Netad": sumNAVD,
	    				"Netan": sumNAVN,
	    				"enabledAvlb": (sumAVLB == 0)? false: true,
	    				"enabledNewavlb": (sumAVLBN == 0)? false: true,
	    				"enabledAurepa": (sumAUTH == 0)? false: true,
						"enabledBook": (sumBOOK == 0)? false: true,
	    				"enabledBookn": (sumBOOKN == 0)? false: true,
	    				"enabledReser": (sumRESER == 0)? false: true,
	    				"enabledResern": (sumRESERN == 0)? false: true,
	    				"enabledHold": (sumHOLD == 0)? false: true,
			    		"enabledTtlstock": (sumTTLS == 0)? false: true,
	    				"enabledAeap": (sumAWAP == 0)? false: true,
	    				"enabledNwap": (sumNWAP == 0)? false: true,
	    				"enabledNetad": (sumNAVD == 0)? false: true,
	    				"enabledNetan": (sumNAVN == 0)? false: true,
	    				"enabledNetavlb": (sumNAVT == 0)? false: true,
		    			});

				    	jsonInventoryFNACou.push({
		    				"Region":FNASummaryArrayCou[j].ZRegDesc,
		    				"Country":FNASummaryArrayCou[j].ZCouDesc,
		    				//"City":FNASummaryArrayCou[j].ZCityDesc,
		    				"Category": FNASummaryArrayCou[j].Pcate,
		    				"Unit Type": FNASummaryArrayCou[j].Matnr,
		    				"Depot AVLB": sumAVLB,
		    				"Capex AVLB": sumAVLBN,
		    				"APPD": sumAUTH,
		    				"Depot Booked": sumBOOK,
		    				"Capex Booked": sumBOOKN,
		    				"Depot Reserved": sumRESER,
		    				"Capex Reserved": sumRESERN,
		    				"TIND": sumREDEL,
		    				"Depot Target": sumTDI,
		    				"Depot Shortage/Surplus": sumTCI,
		    				"Capex Target": sumODI,
		    				"Capex Shortage/Surplus": sumOCI,

		    				"HOLD": sumHOLD,
		    				"Total Stock": sumTTLS,
		    				"WEST": sumAWAP,
		    				"Awaiting Approv.": sumNWAP,
		    				"Total Net AVLB": sumNAVT,
		    				"Depot Net AVLB": sumNAVD,
		    				"Capex Net AVLB": sumNAVN
		    			});

						sumAVLB = 0;
						sumAVLBN = 0;
						sumAUTH = 0;
						sumBOOK = 0;
						sumBOOKN = 0;

						sumREDEL = 0;
						sumRESER = 0;
						sumRESERN = 0;

						sumTDI = 0;
						sumTCI = 0;
						sumODI = 0;
						sumOCI = 0;

						sumHOLD = 0;
						sumAWAP = 0;
						sumNWAP = 0;
						sumTTLS = 0;
						sumNAVD = 0;
						sumNAVN = 0;
						sumNAVT = 0;
				}
				}
	    		}





			/* At first point, check if the city filter has got any values. If yes, happily set that data in the table*/

			if(unitTypeLength != 0){
				/* If no, At second point, check if the country filter has got any values. If yes, happily set that data in the table*/
				if(countryLength != 0){

					jsonInventoryFNACou = [];
					FNASummaryArrayCouFinal = [];
					for(var j=0;j<FNASummaryArrayCouFiltered.length;j++){
						if((isInArray(FNASummaryArrayCouFiltered[j].Country, countryValues)) && (isInArray(FNASummaryArrayCouFiltered[j].Matnr, unitTypeValues))){

			    			FNASummaryArrayCouFinal.push({
					    		"Region": FNASummaryArrayCouFiltered[j].Region,
			    				"Country": FNASummaryArrayCouFiltered[j].Country,
			    				"City": FNASummaryArrayCouFiltered[j].City,
					    		"Pcate": FNASummaryArrayCouFiltered[j].Pcate,
			    				"Matnr": FNASummaryArrayCouFiltered[j].Matnr,
			    				"ZRegDesc":FNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArrayCouFiltered[j].ZCityDesc,
			    				"Conc":FNASummaryArrayCouFiltered[j].Conc,
			    				"Avlb": FNASummaryArrayCouFiltered[j].Avlb,
			    				"Newavlb": FNASummaryArrayCouFiltered[j].Newavlb,
			    				"Aurepa": FNASummaryArrayCouFiltered[j].Aurepa,
			    				"Book": FNASummaryArrayCouFiltered[j].Book,
			    				"Bookn": FNASummaryArrayCouFiltered[j].Bookn,

			    				"Reser": FNASummaryArrayCouFiltered[j].Reser,
			    				"enabledReser": (FNASummaryArrayCouFiltered[j].Reser == 0)? false: true,

			    				"Redel": FNASummaryArrayCouFiltered[j].Redel,
			    				"Tdi": FNASummaryArrayCouFiltered[j].Tdi,
			    				"Tci": FNASummaryArrayCouFiltered[j].Tci,
			    				"Odi": FNASummaryArrayCouFiltered[j].Odi,
			    				"Oci": FNASummaryArrayCouFiltered[j].Oci,
			    				"enabledRedel": (FNASummaryArrayCouFiltered[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArrayCouFiltered[j].Hold,
			    				"Ttlstock": FNASummaryArrayCouFiltered[j].Ttlstock,
			    				"Aeap": FNASummaryArrayCouFiltered[j].Aeap,
			    				"Nwap": FNASummaryArrayCouFiltered[j].Nwap,
			    				"Netavlb": FNASummaryArrayCouFiltered[j].Netavlb,
			    				"Netad": FNASummaryArrayCouFiltered[j].Netad,
			    				"Netan": FNASummaryArrayCouFiltered[j].Netan,
			    				"enabledAvlb": (FNASummaryArrayCouFiltered[j].Avlb == 0)? false: true,
			    				"enabledNewavlb": (FNASummaryArrayCouFiltered[j].Newavlb == 0)? false: true,
			    				"enabledAurepa": (FNASummaryArrayCouFiltered[j].Aurepa == 0)? false: true,
	    						"enabledBook": (FNASummaryArrayCouFiltered[j].Book == 0)? false: true,
			    				"enabledBookn": (FNASummaryArrayCouFiltered[j].Bookn == 0)? false: true,

			    				"enabledHold": (FNASummaryArrayCouFiltered[j].Hold == 0)? false: true,
	    			    		"enabledTtlstock": (FNASummaryArrayCouFiltered[j].Ttlstock == 0)? false: true,
			    				"enabledAeap": (FNASummaryArrayCouFiltered[j].Aeap == 0)? false: true,
			    				"enabledNwap": (FNASummaryArrayCouFiltered[j].Nwap == 0)? false: true,
			    				"enabledNetad": (FNASummaryArrayCouFiltered[j].Netad == 0)? false: true,
			    				"enabledNetan": (FNASummaryArrayCouFiltered[j].Netan == 0)? false: true,
			    				"enabledNetavlb": (FNASummaryArrayCouFiltered[j].Netavlb == 0)? false: true,

			    						"Resern": FNASummaryArrayCouFiltered[j].Resern,
					    				"enabledResern": (FNASummaryArrayCouFiltered[j].Resern == 0)? false: true,

				    			});

						    	jsonInventoryFNACou.push({
				    				"Region":FNASummaryArrayCouFiltered[j].ZRegDesc,
				    				"Country":FNASummaryArrayCouFiltered[j].ZCouDesc,
				    				//"City":FNASummaryArrayCouFiltered[j].ZCityDesc,
				    				"Category": FNASummaryArrayCouFiltered[j].Pcate,
				    				"Unit Type": FNASummaryArrayCouFiltered[j].Matnr,
				    				"Depot AVLB": FNASummaryArrayCouFiltered[j].Avlb,
				    				"Capex AVLB": FNASummaryArrayCouFiltered[j].Newavlb,
				    				"APPD": FNASummaryArrayCouFiltered[j].Aurepa,
				    				"Depot Booked": FNASummaryArrayCouFiltered[j].Book,
				    				"Capex Booked": FNASummaryArrayCouFiltered[j].Bookn,
				    				"Depot Reserved": FNASummaryArrayCouFiltered[j].Reser,
				    				"Capex Reserved": FNASummaryArrayCouFiltered[j].Resern,

				    				"TIND": FNASummaryArrayCouFiltered[j].Redel,
				    				"Depot Target": FNASummaryArrayCouFiltered[j].Tdi,
				    				"Capex Target": FNASummaryArrayCouFiltered[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArrayCouFiltered[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArrayCouFiltered[j].Oci,

				    				"HOLD": FNASummaryArrayCouFiltered[j].Hold,
				    				"Total Stock": FNASummaryArrayCouFiltered[j].Ttlstock,
				    				"WEST": FNASummaryArrayCouFiltered[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArrayCouFiltered[j].Nwap,
				    				"Total Net AVLB": FNASummaryArrayCouFiltered[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArrayCouFiltered[j].Netad,
				    				"Capex Net AVLB": FNASummaryArrayCouFiltered[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayCouFinal});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayCouFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);
				}
				/* If no, At third point, check if the Region filter has got any values. If yes, happily set that data in the table*/
				else if(regionLength != 0){

					jsonInventoryFNACou = [];
					FNASummaryArrayCouFinal = [];
					for(var j=0;j<FNASummaryArrayCouFiltered.length;j++){
						if((isInArray(FNASummaryArrayCouFiltered[j].Region, regionValues)) && (isInArray(FNASummaryArrayCouFiltered[j].Matnr, unitTypeValues))){

			    			FNASummaryArrayCouFinal.push({
					    		"Region": FNASummaryArrayCouFiltered[j].Region,
			    				"Country": FNASummaryArrayCouFiltered[j].Country,
			    				"City": FNASummaryArrayCouFiltered[j].City,
					    		"Pcate": FNASummaryArrayCouFiltered[j].Pcate,
			    				"Matnr": FNASummaryArrayCouFiltered[j].Matnr,
			    				"ZRegDesc":FNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArrayCouFiltered[j].ZCityDesc,
			    				"Conc":FNASummaryArrayCouFiltered[j].Conc,
			    				"Avlb": FNASummaryArrayCouFiltered[j].Avlb,
			    				"Newavlb": FNASummaryArrayCouFiltered[j].Newavlb,
			    				"Aurepa": FNASummaryArrayCouFiltered[j].Aurepa,
			    				"Book": FNASummaryArrayCouFiltered[j].Book,
			    				"Bookn": FNASummaryArrayCouFiltered[j].Bookn,
			    				"Reser": FNASummaryArrayCouFiltered[j].Reser,

			    				"Redel": FNASummaryArrayCouFiltered[j].Redel,
			    				"Tdi": FNASummaryArrayCouFiltered[j].Tdi,
			    				"Tci": FNASummaryArrayCouFiltered[j].Tci,
			    				"Odi": FNASummaryArrayCouFiltered[j].Odi,
			    				"Oci": FNASummaryArrayCouFiltered[j].Oci,
			    				"enabledRedel": (FNASummaryArrayCouFiltered[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArrayCouFiltered[j].Hold,
			    				"Ttlstock": FNASummaryArrayCouFiltered[j].Ttlstock,
			    				"Aeap": FNASummaryArrayCouFiltered[j].Aeap,
			    				"Nwap": FNASummaryArrayCouFiltered[j].Nwap,
			    				"Netavlb": FNASummaryArrayCouFiltered[j].Netavlb,
			    				"Netad": FNASummaryArrayCouFiltered[j].Netad,
			    				"Netan": FNASummaryArrayCouFiltered[j].Netan,
			    				"enabledAvlb": (FNASummaryArrayCouFiltered[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArrayCouFiltered[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArrayCouFiltered[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArrayCouFiltered[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArrayCouFiltered[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArrayCouFiltered[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArrayCouFiltered[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArrayCouFiltered[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArrayCouFiltered[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArrayCouFiltered[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArrayCouFiltered[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArrayCouFiltered[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArrayCouFiltered[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArrayCouFiltered[j].Resern,
							    				"enabledResern": (FNASummaryArrayCouFiltered[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNACou.push({
				    				"Region":FNASummaryArrayCouFiltered[j].ZRegDesc,
				    				"Country":FNASummaryArrayCouFiltered[j].ZCouDesc,
				    				//"City":FNASummaryArrayCouFiltered[j].ZCityDesc,
				    				"Category": FNASummaryArrayCouFiltered[j].Pcate,
				    				"Unit Type": FNASummaryArrayCouFiltered[j].Matnr,
				    				"Depot AVLB": FNASummaryArrayCouFiltered[j].Avlb,
				    				"Capex AVLB": FNASummaryArrayCouFiltered[j].Newavlb,
				    				"APPD": FNASummaryArrayCouFiltered[j].Aurepa,
				    				"Depot Booked": FNASummaryArrayCouFiltered[j].Book,
				    				"Capex Booked": FNASummaryArrayCouFiltered[j].Bookn,
				    				"Depot Reserved": FNASummaryArrayCouFiltered[j].Reser,
				    				"Capex Reserved": FNASummaryArrayCouFiltered[j].Resern,

				    				"TIND": FNASummaryArrayCouFiltered[j].Redel,
				    				"Depot Target": FNASummaryArrayCouFiltered[j].Tdi,
				    				"Capex Target": FNASummaryArrayCouFiltered[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArrayCouFiltered[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArrayCouFiltered[j].Oci,

				    				"HOLD": FNASummaryArrayCouFiltered[j].Hold,
				    				"Total Stock": FNASummaryArrayCouFiltered[j].Ttlstock,
				    				"WEST": FNASummaryArrayCouFiltered[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArrayCouFiltered[j].Nwap,
				    				"Total Net AVLB": FNASummaryArrayCouFiltered[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArrayCouFiltered[j].Netad,
				    				"Capex Net AVLB": FNASummaryArrayCouFiltered[j].Netan
				    			});


						}

					}
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayCouFinal});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayCouFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);
				}
				/*If no filters in the location combination, set the original data*/
				else{

					jsonInventoryFNACou = [];
					FNASummaryArrayCouFinal = [];
					for(var j=0;j<FNASummaryArrayCouFiltered.length;j++){
						if(isInArray(FNASummaryArrayCouFiltered[j].Matnr, unitTypeValues)){

			    			FNASummaryArrayCouFinal.push({
					    		"Region": FNASummaryArrayCouFiltered[j].Region,
			    				"Country": FNASummaryArrayCouFiltered[j].Country,
			    				"City": FNASummaryArrayCouFiltered[j].City,
					    		"Pcate": FNASummaryArrayCouFiltered[j].Pcate,
			    				"Matnr": FNASummaryArrayCouFiltered[j].Matnr,
			    				"ZRegDesc":FNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArrayCouFiltered[j].ZCityDesc,
			    				"Conc":FNASummaryArrayCouFiltered[j].Conc,
			    				"Avlb": FNASummaryArrayCouFiltered[j].Avlb,
			    				"Newavlb": FNASummaryArrayCouFiltered[j].Newavlb,
			    				"Aurepa": FNASummaryArrayCouFiltered[j].Aurepa,
			    				"Book": FNASummaryArrayCouFiltered[j].Book,
			    				"Bookn": FNASummaryArrayCouFiltered[j].Bookn,
			    				"Reser": FNASummaryArrayCouFiltered[j].Reser,

			    				"Redel": FNASummaryArrayCouFiltered[j].Redel,
			    				"Tdi": FNASummaryArrayCouFiltered[j].Tdi,
			    				"Tci": FNASummaryArrayCouFiltered[j].Tci,
			    				"Odi": FNASummaryArrayCouFiltered[j].Odi,
			    				"Oci": FNASummaryArrayCouFiltered[j].Oci,
			    				"enabledRedel": (FNASummaryArrayCouFiltered[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArrayCouFiltered[j].Hold,
			    				"Ttlstock": FNASummaryArrayCouFiltered[j].Ttlstock,
			    				"Aeap": FNASummaryArrayCouFiltered[j].Aeap,
			    				"Nwap": FNASummaryArrayCouFiltered[j].Nwap,
			    				"Netavlb": FNASummaryArrayCouFiltered[j].Netavlb,
			    				"Netad": FNASummaryArrayCouFiltered[j].Netad,
			    				"Netan": FNASummaryArrayCouFiltered[j].Netan,
			    				"enabledAvlb": (FNASummaryArrayCouFiltered[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArrayCouFiltered[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArrayCouFiltered[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArrayCouFiltered[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArrayCouFiltered[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArrayCouFiltered[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArrayCouFiltered[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArrayCouFiltered[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArrayCouFiltered[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArrayCouFiltered[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArrayCouFiltered[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArrayCouFiltered[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArrayCouFiltered[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArrayCouFiltered[j].Resern,
							    				"enabledResern": (FNASummaryArrayCouFiltered[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNACou.push({
				    				"Region":FNASummaryArrayCouFiltered[j].ZRegDesc,
				    				"Country":FNASummaryArrayCouFiltered[j].ZCouDesc,
				    				//"City":FNASummaryArrayCouFiltered[j].ZCityDesc,
				    				"Category": FNASummaryArrayCouFiltered[j].Pcate,
				    				"Unit Type": FNASummaryArrayCouFiltered[j].Matnr,
				    				"Depot AVLB": FNASummaryArrayCouFiltered[j].Avlb,
				    				"Capex AVLB": FNASummaryArrayCouFiltered[j].Newavlb,
				    				"APPD": FNASummaryArrayCouFiltered[j].Aurepa,
				    				"Depot Booked": FNASummaryArrayCouFiltered[j].Book,
				    				"Capex Booked": FNASummaryArrayCouFiltered[j].Bookn,
				    				"Depot Reserved": FNASummaryArrayCouFiltered[j].Reser,
				    				"Capex Reserved": FNASummaryArrayCouFiltered[j].Resern,

				    				"TIND": FNASummaryArrayCouFiltered[j].Redel,
				    				"Depot Target": FNASummaryArrayCouFiltered[j].Tdi,
				    				"Capex Target": FNASummaryArrayCouFiltered[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArrayCouFiltered[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArrayCouFiltered[j].Oci,

				    				"HOLD": FNASummaryArrayCouFiltered[j].Hold,
				    				"Total Stock": FNASummaryArrayCouFiltered[j].Ttlstock,
				    				"WEST": FNASummaryArrayCouFiltered[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArrayCouFiltered[j].Nwap,
				    				"Total Net AVLB": FNASummaryArrayCouFiltered[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArrayCouFiltered[j].Netad,
				    				"Capex Net AVLB": FNASummaryArrayCouFiltered[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayCouFinal});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayCouFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);

				}
			}

















			else if(proCatLength != 0){
				/* If no, At second point, check if the country filter has got any values. If yes, happily set that data in the table*/
				if(countryLength != 0){

					jsonInventoryFNACou = [];
					FNASummaryArrayCouFinal = [];
					for(var j=0;j<FNASummaryArrayCouFiltered.length;j++){
						if((isInArray(FNASummaryArrayCouFiltered[j].Country, countryValues)) && (isInArray(FNASummaryArrayCouFiltered[j].Pcate, proCatValues))){

			    			FNASummaryArrayCouFinal.push({
					    		"Region": FNASummaryArrayCouFiltered[j].Region,
			    				"Country": FNASummaryArrayCouFiltered[j].Country,
			    				"City": FNASummaryArrayCouFiltered[j].City,
					    		"Pcate": FNASummaryArrayCouFiltered[j].Pcate,
			    				"Matnr": FNASummaryArrayCouFiltered[j].Matnr,
			    				"ZRegDesc":FNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArrayCouFiltered[j].ZCityDesc,
			    				"Conc":FNASummaryArrayCouFiltered[j].Conc,
			    				"Avlb": FNASummaryArrayCouFiltered[j].Avlb,
			    				"Newavlb": FNASummaryArrayCouFiltered[j].Newavlb,
			    				"Aurepa": FNASummaryArrayCouFiltered[j].Aurepa,
			    				"Book": FNASummaryArrayCouFiltered[j].Book,
			    				"Bookn": FNASummaryArrayCouFiltered[j].Bookn,
			    				"Reser": FNASummaryArrayCouFiltered[j].Reser,

			    				"Redel": FNASummaryArrayCouFiltered[j].Redel,
			    				"Tdi": FNASummaryArrayCouFiltered[j].Tdi,
			    				"Tci": FNASummaryArrayCouFiltered[j].Tci,
			    				"Odi": FNASummaryArrayCouFiltered[j].Odi,
			    				"Oci": FNASummaryArrayCouFiltered[j].Oci,
			    				"enabledRedel": (FNASummaryArrayCouFiltered[j].Redel == 0)? false: true,


			    				"Hold": FNASummaryArrayCouFiltered[j].Hold,
			    				"Ttlstock": FNASummaryArrayCouFiltered[j].Ttlstock,
			    				"Aeap": FNASummaryArrayCouFiltered[j].Aeap,
			    				"Nwap": FNASummaryArrayCouFiltered[j].Nwap,
			    				"Netavlb": FNASummaryArrayCouFiltered[j].Netavlb,
			    				"Netad": FNASummaryArrayCouFiltered[j].Netad,
			    				"Netan": FNASummaryArrayCouFiltered[j].Netan,
			    				"enabledAvlb": (FNASummaryArrayCouFiltered[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArrayCouFiltered[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArrayCouFiltered[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArrayCouFiltered[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArrayCouFiltered[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArrayCouFiltered[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArrayCouFiltered[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArrayCouFiltered[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArrayCouFiltered[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArrayCouFiltered[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArrayCouFiltered[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArrayCouFiltered[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArrayCouFiltered[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArrayCouFiltered[j].Resern,
							    				"enabledResern": (FNASummaryArrayCouFiltered[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNACou.push({
				    				"Region":FNASummaryArrayCouFiltered[j].ZRegDesc,
				    				"Country":FNASummaryArrayCouFiltered[j].ZCouDesc,
				    				//"City":FNASummaryArrayCouFiltered[j].ZCityDesc,
				    				"Category": FNASummaryArrayCouFiltered[j].Pcate,
				    				"Unit Type": FNASummaryArrayCouFiltered[j].Matnr,
				    				"Depot AVLB": FNASummaryArrayCouFiltered[j].Avlb,
				    				"Capex AVLB": FNASummaryArrayCouFiltered[j].Newavlb,
				    				"APPD": FNASummaryArrayCouFiltered[j].Aurepa,
				    				"Depot Booked": FNASummaryArrayCouFiltered[j].Book,
				    				"Capex Booked": FNASummaryArrayCouFiltered[j].Bookn,
				    				"Depot Reserved": FNASummaryArrayCouFiltered[j].Reser,
				    				"Capex Reserved": FNASummaryArrayCouFiltered[j].Resern,

				    				"TIND": FNASummaryArrayCouFiltered[j].Redel,
				    				"Depot Target": FNASummaryArrayCouFiltered[j].Tdi,
				    				"Capex Target": FNASummaryArrayCouFiltered[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArrayCouFiltered[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArrayCouFiltered[j].Oci,

				    				"HOLD": FNASummaryArrayCouFiltered[j].Hold,
				    				"Total Stock": FNASummaryArrayCouFiltered[j].Ttlstock,
				    				"WEST": FNASummaryArrayCouFiltered[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArrayCouFiltered[j].Nwap,
				    				"Total Net AVLB": FNASummaryArrayCouFiltered[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArrayCouFiltered[j].Netad,
				    				"Capex Net AVLB": FNASummaryArrayCouFiltered[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayCouFinal});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayCouFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);

				}
				/* If no, At third point, check if the Region filter has got any values. If yes, happily set that data in the table*/
				else if(regionLength != 0){

					jsonInventoryFNACou = [];
					FNASummaryArrayCouFinal = [];
					for(var j=0;j<FNASummaryArrayCouFiltered.length;j++){
						if((isInArray(FNASummaryArrayCouFiltered[j].Region, regionValues)) && (isInArray(FNASummaryArrayCouFiltered[j].Pcate, proCatValues))){

			    			FNASummaryArrayCouFinal.push({
					    		"Region": FNASummaryArrayCouFiltered[j].Region,
			    				"Country": FNASummaryArrayCouFiltered[j].Country,
			    				"City": FNASummaryArrayCouFiltered[j].City,
					    		"Pcate": FNASummaryArrayCouFiltered[j].Pcate,
			    				"Matnr": FNASummaryArrayCouFiltered[j].Matnr,
			    				"ZRegDesc":FNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArrayCouFiltered[j].ZCityDesc,
			    				"Conc":FNASummaryArrayCouFiltered[j].Conc,
			    				"Avlb": FNASummaryArrayCouFiltered[j].Avlb,
			    				"Newavlb": FNASummaryArrayCouFiltered[j].Newavlb,
			    				"Aurepa": FNASummaryArrayCouFiltered[j].Aurepa,
			    				"Book": FNASummaryArrayCouFiltered[j].Book,
			    				"Bookn": FNASummaryArrayCouFiltered[j].Bookn,
			    				"Reser": FNASummaryArrayCouFiltered[j].Reser,

			    				"Redel": FNASummaryArrayCouFiltered[j].Redel,
			    				"Tdi": FNASummaryArrayCouFiltered[j].Tdi,
			    				"Tci": FNASummaryArrayCouFiltered[j].Tci,
			    				"Odi": FNASummaryArrayCouFiltered[j].Odi,
			    				"Oci": FNASummaryArrayCouFiltered[j].Oci,
			    				"enabledRedel": (FNASummaryArrayCouFiltered[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArrayCouFiltered[j].Hold,
			    				"Ttlstock": FNASummaryArrayCouFiltered[j].Ttlstock,
			    				"Aeap": FNASummaryArrayCouFiltered[j].Aeap,
			    				"Nwap": FNASummaryArrayCouFiltered[j].Nwap,
			    				"Netavlb": FNASummaryArrayCouFiltered[j].Netavlb,
			    				"Netad": FNASummaryArrayCouFiltered[j].Netad,
			    				"Netan": FNASummaryArrayCouFiltered[j].Netan,
			    				"enabledAvlb": (FNASummaryArrayCouFiltered[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArrayCouFiltered[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArrayCouFiltered[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArrayCouFiltered[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArrayCouFiltered[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArrayCouFiltered[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArrayCouFiltered[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArrayCouFiltered[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArrayCouFiltered[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArrayCouFiltered[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArrayCouFiltered[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArrayCouFiltered[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArrayCouFiltered[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArrayCouFiltered[j].Resern,
							    				"enabledResern": (FNASummaryArrayCouFiltered[j].Resern == 0)? false: true,

				    			});

						    	jsonInventoryFNACou.push({
				    				"Region":FNASummaryArrayCouFiltered[j].ZRegDesc,
				    				"Country":FNASummaryArrayCouFiltered[j].ZCouDesc,
				    				//"City":FNASummaryArrayCouFiltered[j].ZCityDesc,
				    				"Category": FNASummaryArrayCouFiltered[j].Pcate,
				    				"Unit Type": FNASummaryArrayCouFiltered[j].Matnr,
				    				"Depot AVLB": FNASummaryArrayCouFiltered[j].Avlb,
				    				"Capex AVLB": FNASummaryArrayCouFiltered[j].Newavlb,
				    				"APPD": FNASummaryArrayCouFiltered[j].Aurepa,
				    				"Depot Booked": FNASummaryArrayCouFiltered[j].Book,
				    				"Capex Booked": FNASummaryArrayCouFiltered[j].Bookn,
				    				"Depot Reserved": FNASummaryArrayCouFiltered[j].Reser,
				    				"Capex Reserved": FNASummaryArrayCouFiltered[j].Resern,

				    				"TIND": FNASummaryArrayCouFiltered[j].Redel,
				    				"Depot Target": FNASummaryArrayCouFiltered[j].Tdi,
				    				"Capex Target": FNASummaryArrayCouFiltered[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArrayCouFiltered[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArrayCouFiltered[j].Oci,

				    				"HOLD": FNASummaryArrayCouFiltered[j].Hold,
				    				"Total Stock": FNASummaryArrayCouFiltered[j].Ttlstock,
				    				"WEST": FNASummaryArrayCouFiltered[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArrayCouFiltered[j].Nwap,
				    				"Total Net AVLB": FNASummaryArrayCouFiltered[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArrayCouFiltered[j].Netad,
				    				"Capex Net AVLB": FNASummaryArrayCouFiltered[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayCouFinal});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayCouFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);
				}
				/*If no filters in the location combination, set the original data*/
				else{

					jsonInventoryFNACou = [];
					FNASummaryArrayCouFinal = [];
					for(var j=0;j<FNASummaryArrayCouFiltered.length;j++){
						if(isInArray(FNASummaryArrayCouFiltered[j].Pcate, proCatValues)){

			    			FNASummaryArrayCouFinal.push({
					    		"Region": FNASummaryArrayCouFiltered[j].Region,
			    				"Country": FNASummaryArrayCouFiltered[j].Country,
			    				"City": FNASummaryArrayCouFiltered[j].City,
					    		"Pcate": FNASummaryArrayCouFiltered[j].Pcate,
			    				"Matnr": FNASummaryArrayCouFiltered[j].Matnr,
			    				"ZRegDesc":FNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArrayCouFiltered[j].ZCityDesc,
			    				"Conc":FNASummaryArrayCouFiltered[j].Conc,
			    				"Avlb": FNASummaryArrayCouFiltered[j].Avlb,
			    				"Newavlb": FNASummaryArrayCouFiltered[j].Newavlb,
			    				"Aurepa": FNASummaryArrayCouFiltered[j].Aurepa,
			    				"Book": FNASummaryArrayCouFiltered[j].Book,
			    				"Bookn": FNASummaryArrayCouFiltered[j].Bookn,
			    				"Reser": FNASummaryArrayCouFiltered[j].Reser,

			    				"Redel": FNASummaryArrayCouFiltered[j].Redel,
			    				"Tdi": FNASummaryArrayCouFiltered[j].Tdi,
			    				"Tci": FNASummaryArrayCouFiltered[j].Tci,
			    				"Odi": FNASummaryArrayCouFiltered[j].Odi,
			    				"Oci": FNASummaryArrayCouFiltered[j].Oci,
			    				"enabledRedel": (FNASummaryArrayCouFiltered[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArrayCouFiltered[j].Hold,
			    				"Ttlstock": FNASummaryArrayCouFiltered[j].Ttlstock,
			    				"Aeap": FNASummaryArrayCouFiltered[j].Aeap,
			    				"Nwap": FNASummaryArrayCouFiltered[j].Nwap,
			    				"Netavlb": FNASummaryArrayCouFiltered[j].Netavlb,
			    				"Netad": FNASummaryArrayCouFiltered[j].Netad,
			    				"Netan": FNASummaryArrayCouFiltered[j].Netan,
			    				"enabledAvlb": (FNASummaryArrayCouFiltered[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArrayCouFiltered[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArrayCouFiltered[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArrayCouFiltered[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArrayCouFiltered[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArrayCouFiltered[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArrayCouFiltered[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArrayCouFiltered[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArrayCouFiltered[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArrayCouFiltered[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArrayCouFiltered[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArrayCouFiltered[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArrayCouFiltered[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArrayCouFiltered[j].Resern,
							    				"enabledResern": (FNASummaryArrayCouFiltered[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNACou.push({
				    				"Region":FNASummaryArrayCouFiltered[j].ZRegDesc,
				    				"Country":FNASummaryArrayCouFiltered[j].ZCouDesc,
				    				//"City":FNASummaryArrayCouFiltered[j].ZCityDesc,
				    				"Category": FNASummaryArrayCouFiltered[j].Pcate,
				    				"Unit Type": FNASummaryArrayCouFiltered[j].Matnr,
				    				"Depot AVLB": FNASummaryArrayCouFiltered[j].Avlb,
				    				"Capex AVLB": FNASummaryArrayCouFiltered[j].Newavlb,
				    				"APPD": FNASummaryArrayCouFiltered[j].Aurepa,
				    				"Depot Booked": FNASummaryArrayCouFiltered[j].Book,
				    				"Capex Booked": FNASummaryArrayCouFiltered[j].Bookn,
				    				"Depot Reserved": FNASummaryArrayCouFiltered[j].Reser,
				    				"Capex Reserved": FNASummaryArrayCouFiltered[j].Resern,

				    				"TIND": FNASummaryArrayCouFiltered[j].Redel,
				    				"Depot Target": FNASummaryArrayCouFiltered[j].Tdi,
				    				"Capex Target": FNASummaryArrayCouFiltered[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArrayCouFiltered[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArrayCouFiltered[j].Oci,

				    				"HOLD": FNASummaryArrayCouFiltered[j].Hold,
				    				"Total Stock": FNASummaryArrayCouFiltered[j].Ttlstock,
				    				"WEST": FNASummaryArrayCouFiltered[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArrayCouFiltered[j].Nwap,
				    				"Total Net AVLB": FNASummaryArrayCouFiltered[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArrayCouFiltered[j].Netad,
				    				"Capex Net AVLB": FNASummaryArrayCouFiltered[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayCouFinal});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayCouFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);

				}
			}



















			else{
				if(countryLength != 0){

					jsonInventoryFNACou = [];
					FNASummaryArrayCouFinal = [];
					for(var j=0;j<FNASummaryArrayCouFiltered.length;j++){
						if((isInArray(FNASummaryArrayCouFiltered[j].Country, countryValues))){

							FNASummaryArrayCouFinal.push({
					    		"Region": FNASummaryArrayCouFiltered[j].Region,
			    				"Country": FNASummaryArrayCouFiltered[j].Country,
			    				"City": FNASummaryArrayCouFiltered[j].City,
					    		"Pcate": FNASummaryArrayCouFiltered[j].Pcate,
			    				"Matnr": FNASummaryArrayCouFiltered[j].Matnr,
			    				"ZRegDesc":FNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArrayCouFiltered[j].ZCityDesc,
			    				"Conc":FNASummaryArrayCouFiltered[j].Conc,
			    				"Avlb": FNASummaryArrayCouFiltered[j].Avlb,
			    				"Newavlb": FNASummaryArrayCouFiltered[j].Newavlb,
			    				"Aurepa": FNASummaryArrayCouFiltered[j].Aurepa,
			    				"Book": FNASummaryArrayCouFiltered[j].Book,
			    				"Bookn": FNASummaryArrayCouFiltered[j].Bookn,
			    				"Reser": FNASummaryArrayCouFiltered[j].Reser,

			    				"Redel": FNASummaryArrayCouFiltered[j].Redel,
			    				"Tdi": FNASummaryArrayCouFiltered[j].Tdi,
			    				"Tci": FNASummaryArrayCouFiltered[j].Tci,
			    				"Odi": FNASummaryArrayCouFiltered[j].Odi,
			    				"Oci": FNASummaryArrayCouFiltered[j].Oci,
			    				"enabledRedel": (FNASummaryArrayCouFiltered[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArrayCouFiltered[j].Hold,
			    				"Ttlstock": FNASummaryArrayCouFiltered[j].Ttlstock,
			    				"Aeap": FNASummaryArrayCouFiltered[j].Aeap,
			    				"Nwap": FNASummaryArrayCouFiltered[j].Nwap,
			    				"Netavlb": FNASummaryArrayCouFiltered[j].Netavlb,
			    				"Netad": FNASummaryArrayCouFiltered[j].Netad,
			    				"Netan": FNASummaryArrayCouFiltered[j].Netan,
			    				"enabledAvlb": (FNASummaryArrayCouFiltered[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArrayCouFiltered[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArrayCouFiltered[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArrayCouFiltered[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArrayCouFiltered[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArrayCouFiltered[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArrayCouFiltered[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArrayCouFiltered[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArrayCouFiltered[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArrayCouFiltered[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArrayCouFiltered[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArrayCouFiltered[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArrayCouFiltered[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArrayCouFiltered[j].Resern,
							    				"enabledResern": (FNASummaryArrayCouFiltered[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNACou.push({
				    				"Region":FNASummaryArrayCouFiltered[j].ZRegDesc,
				    				"Country":FNASummaryArrayCouFiltered[j].ZCouDesc,
				    				//"City":FNASummaryArrayCouFiltered[j].ZCityDesc,
				    				"Category": FNASummaryArrayCouFiltered[j].Pcate,
				    				"Unit Type": FNASummaryArrayCouFiltered[j].Matnr,
				    				"Depot AVLB": FNASummaryArrayCouFiltered[j].Avlb,
				    				"Capex AVLB": FNASummaryArrayCouFiltered[j].Newavlb,
				    				"APPD": FNASummaryArrayCouFiltered[j].Aurepa,
				    				"Depot Booked": FNASummaryArrayCouFiltered[j].Book,
				    				"Capex Booked": FNASummaryArrayCouFiltered[j].Bookn,
				    				"Depot Reserved": FNASummaryArrayCouFiltered[j].Reser,
				    				"Capex Reserved": FNASummaryArrayCouFiltered[j].Resern,

				    				"TIND": FNASummaryArrayCouFiltered[j].Redel,
				    				"Depot Target": FNASummaryArrayCouFiltered[j].Tdi,
				    				"Capex Target": FNASummaryArrayCouFiltered[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArrayCouFiltered[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArrayCouFiltered[j].Oci,

				    				"HOLD": FNASummaryArrayCouFiltered[j].Hold,
				    				"Total Stock": FNASummaryArrayCouFiltered[j].Ttlstock,
				    				"WEST": FNASummaryArrayCouFiltered[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArrayCouFiltered[j].Nwap,
				    				"Total Net AVLB": FNASummaryArrayCouFiltered[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArrayCouFiltered[j].Netad,
				    				"Capex Net AVLB": FNASummaryArrayCouFiltered[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayCouFinal});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayCouFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);

				}
				/* If no, At third point, check if the Region filter has got any values. If yes, happily set that data in the table*/
				else if(regionLength != 0){

					jsonInventoryFNACou = [];
					FNASummaryArrayCouFinal = [];
					for(var j=0;j<FNASummaryArrayCouFiltered.length;j++){
					if((isInArray(FNASummaryArrayCouFiltered[j].Region, regionValues))){

			    			FNASummaryArrayCouFinal.push({
					    		"Region": FNASummaryArrayCouFiltered[j].Region,
			    				"Country": FNASummaryArrayCouFiltered[j].Country,
			    				"City": FNASummaryArrayCouFiltered[j].City,
					    		"Pcate": FNASummaryArrayCouFiltered[j].Pcate,
			    				"Matnr": FNASummaryArrayCouFiltered[j].Matnr,
			    				"ZRegDesc":FNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArrayCouFiltered[j].ZCityDesc,
			    				"Conc":FNASummaryArrayCouFiltered[j].Conc,
			    				"Avlb": FNASummaryArrayCouFiltered[j].Avlb,
			    				"Newavlb": FNASummaryArrayCouFiltered[j].Newavlb,
			    				"Aurepa": FNASummaryArrayCouFiltered[j].Aurepa,
			    				"Book": FNASummaryArrayCouFiltered[j].Book,
			    				"Bookn": FNASummaryArrayCouFiltered[j].Bookn,
			    				"Reser": FNASummaryArrayCouFiltered[j].Reser,

			    				"Redel": FNASummaryArrayCouFiltered[j].Redel,
			    				"Tdi": FNASummaryArrayCouFiltered[j].Tdi,
			    				"Tci": FNASummaryArrayCouFiltered[j].Tci,
			    				"Odi": FNASummaryArrayCouFiltered[j].Odi,
			    				"Oci": FNASummaryArrayCouFiltered[j].Oci,
			    				"enabledRedel": (FNASummaryArrayCouFiltered[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArrayCouFiltered[j].Hold,
			    				"Ttlstock": FNASummaryArrayCouFiltered[j].Ttlstock,
			    				"Aeap": FNASummaryArrayCouFiltered[j].Aeap,
			    				"Nwap": FNASummaryArrayCouFiltered[j].Nwap,
			    				"Netavlb": FNASummaryArrayCouFiltered[j].Netavlb,
			    				"Netad": FNASummaryArrayCouFiltered[j].Netad,
			    				"Netan": FNASummaryArrayCouFiltered[j].Netan,
			    				"enabledAvlb": (FNASummaryArrayCouFiltered[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArrayCouFiltered[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArrayCouFiltered[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArrayCouFiltered[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArrayCouFiltered[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArrayCouFiltered[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArrayCouFiltered[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArrayCouFiltered[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArrayCouFiltered[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArrayCouFiltered[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArrayCouFiltered[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArrayCouFiltered[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArrayCouFiltered[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArrayCouFiltered[j].Resern,
							    				"enabledResern": (FNASummaryArrayCouFiltered[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNACou.push({
				    				"Region":FNASummaryArrayCouFiltered[j].ZRegDesc,
				    				"Country":FNASummaryArrayCouFiltered[j].ZCouDesc,
				    				//"City":FNASummaryArrayCouFiltered[j].ZCityDesc,
				    				"Category": FNASummaryArrayCouFiltered[j].Pcate,
				    				"Unit Type": FNASummaryArrayCouFiltered[j].Matnr,
				    				"Depot AVLB": FNASummaryArrayCouFiltered[j].Avlb,
				    				"Capex AVLB": FNASummaryArrayCouFiltered[j].Newavlb,
				    				"APPD": FNASummaryArrayCouFiltered[j].Aurepa,
				    				"Depot Booked": FNASummaryArrayCouFiltered[j].Book,
				    				"Capex Booked": FNASummaryArrayCouFiltered[j].Bookn,
				    				"Depot Reserved": FNASummaryArrayCouFiltered[j].Reser,
				    				"Capex Reserved": FNASummaryArrayCouFiltered[j].Resern,

				    				"TIND": FNASummaryArrayCouFiltered[j].Redel,
				    				"Depot Target": FNASummaryArrayCouFiltered[j].Tdi,
				    				"Capex Target": FNASummaryArrayCouFiltered[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArrayCouFiltered[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArrayCouFiltered[j].Oci,

				    				"HOLD": FNASummaryArrayCouFiltered[j].Hold,
				    				"Total Stock": FNASummaryArrayCouFiltered[j].Ttlstock,
				    				"WEST": FNASummaryArrayCouFiltered[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArrayCouFiltered[j].Nwap,
				    				"Total Net AVLB": FNASummaryArrayCouFiltered[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArrayCouFiltered[j].Netad,
				    				"Capex Net AVLB": FNASummaryArrayCouFiltered[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayCouFinal});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayCouFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);
				}
				/*If no filters in the location combination, set the original data*/
				else{
					var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayCouFiltered});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayCouFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);

				}
				}

		},

		/*If the city level is selected - this is set by default as well */
		alterPageOneCityLevel : function(){

			var regionValues = sap.ui.getCore().byId("idRegionCombo").getSelectedKeys();
			regionValues = $.grep(regionValues,function(n){ return n != ""});
			var countryValues = sap.ui.getCore().byId("idCountryCombo").getSelectedKeys();
			countryValues = $.grep(countryValues,function(n){ return n != ""});
			var cityValues = sap.ui.getCore().byId("idCityCombo").getSelectedKeys();
			cityValues = $.grep(cityValues,function(n){ return n != ""});
			var proCatValues = sap.ui.getCore().byId("idProCatCombo").getSelectedKeys();
			proCatValues = $.grep(proCatValues,function(n){ return n != ""});
			var proClassValues = sap.ui.getCore().byId("idProClassCombo").getSelectedKeys();
			proClassValues = $.grep(proClassValues,function(n){ return n != ""});
			var unitTypeValues = sap.ui.getCore().byId("idUnitTypeCombo").getSelectedKeys();
			unitTypeValues = $.grep(unitTypeValues,function(n){ return n != ""});

			var proCatLength = proCatValues.length;
			var unitTypeLength = unitTypeValues.length;
			var regionLength = regionValues.length;
			var countryLength = countryValues.length;
			var cityLength = cityValues.length;

			/* At first point, check if the city filter has got any values. If yes, happily set that data in the table*/

			if(unitTypeLength != 0){
				if(cityLength != 0){

					jsonInventoryFNA = [];
					FNASummaryArrayFiltered = [];
					for(var j=0;j<FNASummaryArray.length;j++){
							if((isInArray(FNASummaryArray[j].City, cityValues)) && (isInArray(FNASummaryArray[j].Matnr, unitTypeValues))){
			    			FNASummaryArrayFiltered.push({
					    		"Region": FNASummaryArray[j].Region,
			    				"Country": FNASummaryArray[j].Country,
			    				"City": FNASummaryArray[j].City,
					    		"Pcate": FNASummaryArray[j].Pcate,
			    				"Matnr": FNASummaryArray[j].Matnr,
			    				"ZRegDesc":FNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArray[j].ZCityDesc,
			    				"Conc":FNASummaryArray[j].Conc,
			    				"Avlb": FNASummaryArray[j].Avlb,
			    				"Newavlb": FNASummaryArray[j].Newavlb,
			    				"Aurepa": FNASummaryArray[j].Aurepa,
			    				"Book": FNASummaryArray[j].Book,
			    				"Bookn": FNASummaryArray[j].Bookn,
			    				"Reser": FNASummaryArray[j].Reser,

			    				"Redel": FNASummaryArray[j].Redel,
			    				"Tdi": FNASummaryArray[j].Tdi,
			    				"Tci": FNASummaryArray[j].Tci,
			    				"Por": FNASummaryArray[j].Por,
			    				"Odi": FNASummaryArray[j].Odi,
			    				"Oci": FNASummaryArray[j].Oci,
			    				"enabledRedel": (FNASummaryArray[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArray[j].Hold,
			    				"Ttlstock": FNASummaryArray[j].Ttlstock,
			    				"Aeap": FNASummaryArray[j].Aeap,
			    				"Nwap": FNASummaryArray[j].Nwap,
			    				"Netavlb": FNASummaryArray[j].Netavlb,
			    				"Netad": FNASummaryArray[j].Netad,
			    				"Netan": FNASummaryArray[j].Netan,
			    				"enabledAvlb": (FNASummaryArray[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArray[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArray[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArray[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArray[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArray[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArray[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArray[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArray[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArray[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArray[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArray[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArray[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArray[j].Resern,
					    						"enabledResern": (FNASummaryArray[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNA.push({
				    				"Region":FNASummaryArray[j].ZRegDesc,
				    				"Country":FNASummaryArray[j].ZCouDesc,
				    				"City":FNASummaryArray[j].ZCityDesc,
				    				"Category": FNASummaryArray[j].Pcate,
				    				"Unit Type": FNASummaryArray[j].Matnr,
				    				"Depot AVLB": FNASummaryArray[j].Avlb,
				    				"Capex AVLB": FNASummaryArray[j].Newavlb,
				    				"APPD": FNASummaryArray[j].Aurepa,
				    				"Depot Booked": FNASummaryArray[j].Book,
				    				"Capex Booked": FNASummaryArray[j].Bookn,
				    				"Depot Reserved": FNASummaryArray[j].Reser,
				    				"Capex Reserved": FNASummaryArray[j].Resern,

				    				"TIND": FNASummaryArray[j].Redel,
				    				"Depot Target": FNASummaryArray[j].Tdi,
				    				"Capex Target": FNASummaryArray[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArray[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArray[j].Oci,
				    				"Port Rating" : FNASummaryArray[j].Por,

				    				"HOLD": FNASummaryArray[j].Hold,
				    				"Total Stock": FNASummaryArray[j].Ttlstock,
				    				"WEST": FNASummaryArray[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArray[j].Nwap,
				    				"Total Net AVLB": FNASummaryArray[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArray[j].Netad,
				    				"Capex Net AVLB": FNASummaryArray[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);

				}
				/* If no, At second point, check if the country filter has got any values. If yes, happily set that data in the table*/
				else if(countryLength != 0){

					jsonInventoryFNA = [];
					FNASummaryArrayFiltered = [];
					for(var j=0;j<FNASummaryArray.length;j++){
						if((isInArray(FNASummaryArray[j].Country, countryValues)) && (isInArray(FNASummaryArray[j].Matnr, unitTypeValues))){

			    			FNASummaryArrayFiltered.push({
					    		"Region": FNASummaryArray[j].Region,
			    				"Country": FNASummaryArray[j].Country,
			    				"City": FNASummaryArray[j].City,
					    		"Pcate": FNASummaryArray[j].Pcate,
			    				"Matnr": FNASummaryArray[j].Matnr,
			    				"ZRegDesc":FNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArray[j].ZCityDesc,
			    				"Conc":FNASummaryArray[j].Conc,
			    				"Avlb": FNASummaryArray[j].Avlb,
			    				"Newavlb": FNASummaryArray[j].Newavlb,
			    				"Aurepa": FNASummaryArray[j].Aurepa,
			    				"Book": FNASummaryArray[j].Book,
			    				"Bookn": FNASummaryArray[j].Bookn,
			    				"Reser": FNASummaryArray[j].Reser,

			    				"Redel": FNASummaryArray[j].Redel,
			    				"Tdi": FNASummaryArray[j].Tdi,
			    				"Tci": FNASummaryArray[j].Tci,
			    				"Odi": FNASummaryArray[j].Odi,
			    				"Oci": FNASummaryArray[j].Oci,
			    				"Por": FNASummaryArray[j].Por,
			    				"enabledRedel": (FNASummaryArray[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArray[j].Hold,
			    				"Ttlstock": FNASummaryArray[j].Ttlstock,
			    				"Aeap": FNASummaryArray[j].Aeap,
			    				"Nwap": FNASummaryArray[j].Nwap,
			    				"Netavlb": FNASummaryArray[j].Netavlb,
			    				"Netad": FNASummaryArray[j].Netad,
			    				"Netan": FNASummaryArray[j].Netan,
			    				"enabledAvlb": (FNASummaryArray[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArray[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArray[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArray[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArray[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArray[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArray[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArray[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArray[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArray[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArray[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArray[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArray[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArray[j].Resern,
					    						"enabledResern": (FNASummaryArray[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNA.push({
				    				"Region":FNASummaryArray[j].ZRegDesc,
				    				"Country":FNASummaryArray[j].ZCouDesc,
				    				"City":FNASummaryArray[j].ZCityDesc,
				    				"Category": FNASummaryArray[j].Pcate,
				    				"Unit Type": FNASummaryArray[j].Matnr,
				    				"Depot AVLB": FNASummaryArray[j].Avlb,
				    				"Capex AVLB": FNASummaryArray[j].Newavlb,
				    				"APPD": FNASummaryArray[j].Aurepa,
				    				"Depot Booked": FNASummaryArray[j].Book,
				    				"Capex Booked": FNASummaryArray[j].Bookn,
				    				"Depot Reserved": FNASummaryArray[j].Reser,
				    				"Capex Reserved": FNASummaryArray[j].Resern,

				    				"TIND": FNASummaryArray[j].Redel,
				    				"Depot Target": FNASummaryArray[j].Tdi,
				    				"Capex Target": FNASummaryArray[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArray[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArray[j].Oci,
				    				"Port Rating" : FNASummaryArray[j].Por,

				    				"HOLD": FNASummaryArray[j].Hold,
				    				"Total Stock": FNASummaryArray[j].Ttlstock,
				    				"WEST": FNASummaryArray[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArray[j].Nwap,
				    				"Total Net AVLB": FNASummaryArray[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArray[j].Netad,
				    				"Capex Net AVLB": FNASummaryArray[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);

				}
				/* If no, At third point, check if the Region filter has got any values. If yes, happily set that data in the table*/
				else if(regionLength != 0){

					jsonInventoryFNA = [];
					FNASummaryArrayFiltered = [];
					if(regionValues.length == 0){
						FNASummaryArrayFiltered = FNASummaryArray;
					}
					else{
					for(var j=0;j<FNASummaryArray.length;j++){
						if((isInArray(FNASummaryArray[j].Region, regionValues)) && (isInArray(FNASummaryArray[j].Matnr, unitTypeValues))){

			    			FNASummaryArrayFiltered.push({
					    		"Region": FNASummaryArray[j].Region,
			    				"Country": FNASummaryArray[j].Country,
			    				"City": FNASummaryArray[j].City,
					    		"Pcate": FNASummaryArray[j].Pcate,
			    				"Matnr": FNASummaryArray[j].Matnr,
			    				"ZRegDesc":FNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArray[j].ZCityDesc,
			    				"Conc":FNASummaryArray[j].Conc,
			    				"Avlb": FNASummaryArray[j].Avlb,
			    				"Newavlb": FNASummaryArray[j].Newavlb,
			    				"Aurepa": FNASummaryArray[j].Aurepa,
			    				"Book": FNASummaryArray[j].Book,
			    				"Bookn": FNASummaryArray[j].Bookn,
			    				"Reser": FNASummaryArray[j].Reser,

			    				"Redel": FNASummaryArray[j].Redel,
			    				"Tdi": FNASummaryArray[j].Tdi,
			    				"Tci": FNASummaryArray[j].Tci,
			    				"Odi": FNASummaryArray[j].Odi,
			    				"Oci": FNASummaryArray[j].Oci,
			    				"Por": FNASummaryArray[j].Por,
			    				"enabledRedel": (FNASummaryArray[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArray[j].Hold,
			    				"Ttlstock": FNASummaryArray[j].Ttlstock,
			    				"Aeap": FNASummaryArray[j].Aeap,
			    				"Nwap": FNASummaryArray[j].Nwap,
			    				"Netavlb": FNASummaryArray[j].Netavlb,
			    				"Netad": FNASummaryArray[j].Netad,
			    				"Netan": FNASummaryArray[j].Netan,
			    				"enabledAvlb": (FNASummaryArray[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArray[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArray[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArray[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArray[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArray[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArray[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArray[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArray[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArray[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArray[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArray[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArray[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArray[j].Resern,
					    						"enabledResern": (FNASummaryArray[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNA.push({
				    				"Region":FNASummaryArray[j].ZRegDesc,
				    				"Country":FNASummaryArray[j].ZCouDesc,
				    				"City":FNASummaryArray[j].ZCityDesc,
				    				"Category": FNASummaryArray[j].Pcate,
				    				"Unit Type": FNASummaryArray[j].Matnr,
				    				"Depot AVLB": FNASummaryArray[j].Avlb,
				    				"Capex AVLB": FNASummaryArray[j].Newavlb,
				    				"APPD": FNASummaryArray[j].Aurepa,
				    				"Depot Booked": FNASummaryArray[j].Book,
				    				"Capex Booked": FNASummaryArray[j].Bookn,
				    				"Depot Reserved": FNASummaryArray[j].Reser,
				    				"Capex Reserved": FNASummaryArray[j].Resern,
				    				"Port Rating" : FNASummaryArray[j].Por,
				    				"TIND": FNASummaryArray[j].Redel,
				    				"Depot Target": FNASummaryArray[j].Tdi,
				    				"Capex Target": FNASummaryArray[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArray[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArray[j].Oci,

				    				"HOLD": FNASummaryArray[j].Hold,
				    				"Total Stock": FNASummaryArray[j].Ttlstock,
				    				"WEST": FNASummaryArray[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArray[j].Nwap,
				    				"Total Net AVLB": FNASummaryArray[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArray[j].Netad,
				    				"Capex Net AVLB": FNASummaryArray[j].Netan
				    			});


						}
			    		}
					}
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);

				}
				/*If no filters in the location combination, set the original data*/
				else{

					jsonInventoryFNA = [];
					FNASummaryArrayFiltered = [];
					for(var j=0;j<FNASummaryArray.length;j++){
						if(isInArray(FNASummaryArray[j].Matnr, unitTypeValues)){

			    			FNASummaryArrayFiltered.push({
					    		"Region": FNASummaryArray[j].Region,
			    				"Country": FNASummaryArray[j].Country,
			    				"City": FNASummaryArray[j].City,
					    		"Pcate": FNASummaryArray[j].Pcate,
			    				"Matnr": FNASummaryArray[j].Matnr,
			    				"ZRegDesc":FNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArray[j].ZCityDesc,
			    				"Conc":FNASummaryArray[j].Conc,
			    				"Avlb": FNASummaryArray[j].Avlb,
			    				"Newavlb": FNASummaryArray[j].Newavlb,
			    				"Aurepa": FNASummaryArray[j].Aurepa,
			    				"Book": FNASummaryArray[j].Book,
			    				"Bookn": FNASummaryArray[j].Bookn,
			    				"Reser": FNASummaryArray[j].Reser,

			    				"Redel": FNASummaryArray[j].Redel,
			    				"Tdi": FNASummaryArray[j].Tdi,
			    				"Tci": FNASummaryArray[j].Tci,
			    				"Odi": FNASummaryArray[j].Odi,
			    				"Oci": FNASummaryArray[j].Oci,
			    				"Por": FNASummaryArray[j].Por,
			    				"enabledRedel": (FNASummaryArray[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArray[j].Hold,
			    				"Ttlstock": FNASummaryArray[j].Ttlstock,
			    				"Aeap": FNASummaryArray[j].Aeap,
			    				"Nwap": FNASummaryArray[j].Nwap,
			    				"Netavlb": FNASummaryArray[j].Netavlb,
			    				"Netad": FNASummaryArray[j].Netad,
			    				"Netan": FNASummaryArray[j].Netan,
			    				"enabledAvlb": (FNASummaryArray[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArray[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArray[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArray[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArray[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArray[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArray[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArray[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArray[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArray[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArray[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArray[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArray[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArray[j].Resern,
					    						"enabledResern": (FNASummaryArray[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNA.push({
				    				"Region":FNASummaryArray[j].ZRegDesc,
				    				"Country":FNASummaryArray[j].ZCouDesc,
				    				"City":FNASummaryArray[j].ZCityDesc,
				    				"Category": FNASummaryArray[j].Pcate,
				    				"Unit Type": FNASummaryArray[j].Matnr,
				    				"Depot AVLB": FNASummaryArray[j].Avlb,
				    				"Capex AVLB": FNASummaryArray[j].Newavlb,
				    				"APPD": FNASummaryArray[j].Aurepa,
				    				"Depot Booked": FNASummaryArray[j].Book,
				    				"Capex Booked": FNASummaryArray[j].Bookn,
				    				"Depot Reserved": FNASummaryArray[j].Reser,
				    				"Capex Reserved": FNASummaryArray[j].Resern,

				    				"TIND": FNASummaryArray[j].Redel,
				    				"Depot Target": FNASummaryArray[j].Tdi,
				    				"Capex Target": FNASummaryArray[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArray[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArray[j].Oci,
				    				"Port Rating" : FNASummaryArray[j].Por,

				    				"HOLD": FNASummaryArray[j].Hold,
				    				"Total Stock": FNASummaryArray[j].Ttlstock,
				    				"WEST": FNASummaryArray[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArray[j].Nwap,
				    				"Total Net AVLB": FNASummaryArray[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArray[j].Netad,
				    				"Capex Net AVLB": FNASummaryArray[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);

				}
			}

















			else if(proCatLength != 0){
				if(cityLength != 0){

					jsonInventoryFNA = [];
					FNASummaryArrayFiltered = [];
					for(var j=0;j<FNASummaryArray.length;j++){
							//if(((isInArray(FNASummaryArray[j].City, cityValues)) && (isInArray(FNASummaryArray[j].Pcate, proCatValues))) || (FNASummaryArray[j].City == '' && (isInArray(FNASummaryArray[j].Matnr, proCatValues)))){
							if((isInArray(FNASummaryArray[j].City, cityValues)) && (isInArray(FNASummaryArray[j].Pcate, proCatValues))){
			    			FNASummaryArrayFiltered.push({
					    		"Region": FNASummaryArray[j].Region,
			    				"Country": FNASummaryArray[j].Country,
			    				"City": FNASummaryArray[j].City,
					    		"Pcate": FNASummaryArray[j].Pcate,
			    				"Matnr": FNASummaryArray[j].Matnr,
			    				"ZRegDesc":FNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArray[j].ZCityDesc,
			    				"Conc":FNASummaryArray[j].Conc,
			    				"Avlb": FNASummaryArray[j].Avlb,
			    				"Newavlb": FNASummaryArray[j].Newavlb,
			    				"Aurepa": FNASummaryArray[j].Aurepa,
			    				"Book": FNASummaryArray[j].Book,
			    				"Bookn": FNASummaryArray[j].Bookn,
			    				"Reser": FNASummaryArray[j].Reser,

			    				"Redel": FNASummaryArray[j].Redel,
			    				"Tdi": FNASummaryArray[j].Tdi,
			    				"Tci": FNASummaryArray[j].Tci,
			    				"Odi": FNASummaryArray[j].Odi,
			    				"Oci": FNASummaryArray[j].Oci,
			    				"Por": FNASummaryArray[j].Por,
			    				"enabledRedel": (FNASummaryArray[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArray[j].Hold,
			    				"Ttlstock": FNASummaryArray[j].Ttlstock,
			    				"Aeap": FNASummaryArray[j].Aeap,
			    				"Nwap": FNASummaryArray[j].Nwap,
			    				"Netavlb": FNASummaryArray[j].Netavlb,
			    				"Netad": FNASummaryArray[j].Netad,
			    				"Netan": FNASummaryArray[j].Netan,
			    				"enabledAvlb": (FNASummaryArray[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArray[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArray[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArray[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArray[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArray[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArray[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArray[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArray[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArray[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArray[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArray[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArray[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArray[j].Resern,
					    						"enabledResern": (FNASummaryArray[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNA.push({
				    				"Region":FNASummaryArray[j].ZRegDesc,
				    				"Country":FNASummaryArray[j].ZCouDesc,
				    				"City":FNASummaryArray[j].ZCityDesc,
				    				"Category": FNASummaryArray[j].Pcate,
				    				"Unit Type": FNASummaryArray[j].Matnr,
				    				"Depot AVLB": FNASummaryArray[j].Avlb,
				    				"Capex AVLB": FNASummaryArray[j].Newavlb,
				    				"APPD": FNASummaryArray[j].Aurepa,
				    				"Depot Booked": FNASummaryArray[j].Book,
				    				"Capex Booked": FNASummaryArray[j].Bookn,
				    				"Depot Reserved": FNASummaryArray[j].Reser,
				    				"Capex Reserved": FNASummaryArray[j].Resern,

				    				"TIND": FNASummaryArray[j].Redel,
				    				"Depot Target": FNASummaryArray[j].Tdi,
				    				"Capex Target": FNASummaryArray[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArray[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArray[j].Oci,
				    				"Port Rating" : FNASummaryArray[j].Por,

				    				"HOLD": FNASummaryArray[j].Hold,
				    				"Total Stock": FNASummaryArray[j].Ttlstock,
				    				"WEST": FNASummaryArray[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArray[j].Nwap,
				    				"Total Net AVLB": FNASummaryArray[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArray[j].Netad,
				    				"Capex Net AVLB": FNASummaryArray[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);
				}
				/* If no, At second point, check if the country filter has got any values. If yes, happily set that data in the table*/
				else if(countryLength != 0){

					jsonInventoryFNA = [];
					FNASummaryArrayFiltered = [];
					for(var j=0;j<FNASummaryArray.length;j++){
						if((isInArray(FNASummaryArray[j].Country, countryValues)) && (isInArray(FNASummaryArray[j].Pcate, proCatValues))){

			    			FNASummaryArrayFiltered.push({
					    		"Region": FNASummaryArray[j].Region,
			    				"Country": FNASummaryArray[j].Country,
			    				"City": FNASummaryArray[j].City,
					    		"Pcate": FNASummaryArray[j].Pcate,
			    				"Matnr": FNASummaryArray[j].Matnr,
			    				"ZRegDesc":FNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArray[j].ZCityDesc,
			    				"Conc":FNASummaryArray[j].Conc,
			    				"Avlb": FNASummaryArray[j].Avlb,
			    				"Newavlb": FNASummaryArray[j].Newavlb,
			    				"Aurepa": FNASummaryArray[j].Aurepa,
			    				"Book": FNASummaryArray[j].Book,
			    				"Bookn": FNASummaryArray[j].Bookn,
			    				"Reser": FNASummaryArray[j].Reser,

			    				"Redel": FNASummaryArray[j].Redel,
			    				"Tdi": FNASummaryArray[j].Tdi,
			    				"Tci": FNASummaryArray[j].Tci,
			    				"Odi": FNASummaryArray[j].Odi,
			    				"Oci": FNASummaryArray[j].Oci,
			    				"Por": FNASummaryArray[j].Por,
			    				"enabledRedel": (FNASummaryArray[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArray[j].Hold,
			    				"Ttlstock": FNASummaryArray[j].Ttlstock,
			    				"Aeap": FNASummaryArray[j].Aeap,
			    				"Nwap": FNASummaryArray[j].Nwap,
			    				"Netavlb": FNASummaryArray[j].Netavlb,
			    				"Netad": FNASummaryArray[j].Netad,
			    				"Netan": FNASummaryArray[j].Netan,
			    				"enabledAvlb": (FNASummaryArray[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArray[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArray[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArray[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArray[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArray[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArray[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArray[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArray[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArray[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArray[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArray[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArray[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArray[j].Resern,
					    						"enabledResern": (FNASummaryArray[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNA.push({
				    				"Region":FNASummaryArray[j].ZRegDesc,
				    				"Country":FNASummaryArray[j].ZCouDesc,
				    				"City":FNASummaryArray[j].ZCityDesc,
				    				"Category": FNASummaryArray[j].Pcate,
				    				"Unit Type": FNASummaryArray[j].Matnr,
				    				"Depot AVLB": FNASummaryArray[j].Avlb,
				    				"Capex AVLB": FNASummaryArray[j].Newavlb,
				    				"APPD": FNASummaryArray[j].Aurepa,
				    				"Depot Booked": FNASummaryArray[j].Book,
				    				"Capex Booked": FNASummaryArray[j].Bookn,

				    				"Depot Reserved": FNASummaryArray[j].Reser,
				    				"Capex Reserved": FNASummaryArray[j].Resern,
				    				"TIND": FNASummaryArray[j].Redel,
				    				"Depot Target": FNASummaryArray[j].Tdi,
				    				"Capex Target": FNASummaryArray[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArray[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArray[j].Oci,
				    				"Port Rating" : FNASummaryArray[j].Por,

				    				"HOLD": FNASummaryArray[j].Hold,
				    				"Total Stock": FNASummaryArray[j].Ttlstock,
				    				"WEST": FNASummaryArray[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArray[j].Nwap,
				    				"Total Net AVLB": FNASummaryArray[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArray[j].Netad,
				    				"Capex Net AVLB": FNASummaryArray[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);
				}
				/* If no, At third point, check if the Region filter has got any values. If yes, happily set that data in the table*/
				else if(regionLength != 0){

					jsonInventoryFNA = [];
					FNASummaryArrayFiltered = [];
					for(var j=0;j<FNASummaryArray.length;j++){
						if(regionValues.length == 0){
							FNASummaryArrayFiltered = FNASummaryArray;
						}
						if((isInArray(FNASummaryArray[j].Region, regionValues)) && (isInArray(FNASummaryArray[j].Pcate, proCatValues))){

			    			FNASummaryArrayFiltered.push({
					    		"Region": FNASummaryArray[j].Region,
			    				"Country": FNASummaryArray[j].Country,
			    				"City": FNASummaryArray[j].City,
					    		"Pcate": FNASummaryArray[j].Pcate,
			    				"Matnr": FNASummaryArray[j].Matnr,
			    				"ZRegDesc":FNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArray[j].ZCityDesc,
			    				"Conc":FNASummaryArray[j].Conc,
			    				"Avlb": FNASummaryArray[j].Avlb,
			    				"Newavlb": FNASummaryArray[j].Newavlb,
			    				"Aurepa": FNASummaryArray[j].Aurepa,
			    				"Book": FNASummaryArray[j].Book,
			    				"Bookn": FNASummaryArray[j].Bookn,
			    				"Reser": FNASummaryArray[j].Reser,
			    				//"Depot Reserved": FNASummaryArray[j].Reser,
			    				//"Capex Reserved": FNASummaryArray[j].Resern,

			    				"Redel": FNASummaryArray[j].Redel,
			    				"Tdi": FNASummaryArray[j].Tdi,
			    				"Tci": FNASummaryArray[j].Tci,
			    				"Odi": FNASummaryArray[j].Odi,
			    				"Oci": FNASummaryArray[j].Oci,
			    				"Por": FNASummaryArray[j].Por,
			    				"enabledRedel": (FNASummaryArray[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArray[j].Hold,
			    				"Ttlstock": FNASummaryArray[j].Ttlstock,
			    				"Aeap": FNASummaryArray[j].Aeap,
			    				"Nwap": FNASummaryArray[j].Nwap,
			    				"Netavlb": FNASummaryArray[j].Netavlb,
			    				"Netad": FNASummaryArray[j].Netad,
			    				"Netan": FNASummaryArray[j].Netan,
			    				"enabledAvlb": (FNASummaryArray[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArray[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArray[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArray[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArray[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArray[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArray[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArray[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArray[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArray[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArray[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArray[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArray[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArray[j].Resern,
					    						"enabledResern": (FNASummaryArray[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNA.push({
				    				"Region":FNASummaryArray[j].ZRegDesc,
				    				"Country":FNASummaryArray[j].ZCouDesc,
				    				"City":FNASummaryArray[j].ZCityDesc,
				    				"Category": FNASummaryArray[j].Pcate,
				    				"Unit Type": FNASummaryArray[j].Matnr,
				    				"Depot AVLB": FNASummaryArray[j].Avlb,
				    				"Capex AVLB": FNASummaryArray[j].Newavlb,
				    				"APPD": FNASummaryArray[j].Aurepa,
				    				"Depot Booked": FNASummaryArray[j].Book,
				    				"Capex Booked": FNASummaryArray[j].Bookn,
				    				"Depot Reserved": FNASummaryArray[j].Reser,
				    				"Capex Reserved": FNASummaryArray[j].Resern,

				    				"TIND": FNASummaryArray[j].Redel,
				    				"Depot Target": FNASummaryArray[j].Tdi,
				    				"Capex Target": FNASummaryArray[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArray[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArray[j].Oci,
				    				"Port Rating" : FNASummaryArray[j].Por,

				    				"HOLD": FNASummaryArray[j].Hold,
				    				"Total Stock": FNASummaryArray[j].Ttlstock,
				    				"WEST": FNASummaryArray[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArray[j].Nwap,
				    				"Total Net AVLB": FNASummaryArray[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArray[j].Netad,
				    				"Capex Net AVLB": FNASummaryArray[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);
				}
				/*If no filters in the location combination, set the original data*/
				else{

					jsonInventoryFNA = [];
					FNASummaryArrayFiltered = [];
					for(var j=0;j<FNASummaryArray.length;j++){
						if(isInArray(FNASummaryArray[j].Pcate, proCatValues)){

			    			FNASummaryArrayFiltered.push({
					    		"Region": FNASummaryArray[j].Region,
			    				"Country": FNASummaryArray[j].Country,
			    				"City": FNASummaryArray[j].City,
					    		"Pcate": FNASummaryArray[j].Pcate,
			    				"Matnr": FNASummaryArray[j].Matnr,
			    				"ZRegDesc":FNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArray[j].ZCityDesc,
			    				"Conc":FNASummaryArray[j].Conc,
			    				"Avlb": FNASummaryArray[j].Avlb,
			    				"Newavlb": FNASummaryArray[j].Newavlb,
			    				"Aurepa": FNASummaryArray[j].Aurepa,
			    				"Book": FNASummaryArray[j].Book,
			    				"Bookn": FNASummaryArray[j].Bookn,
			    				"Reser": FNASummaryArray[j].Reser,

			    				"Redel": FNASummaryArray[j].Redel,
			    				"Tdi": FNASummaryArray[j].Tdi,
			    				"Tci": FNASummaryArray[j].Tci,
			    				"Odi": FNASummaryArray[j].Odi,
			    				"Oci": FNASummaryArray[j].Oci,
			    				"Por": FNASummaryArray[j].Por,
			    				"enabledRedel": (FNASummaryArray[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArray[j].Hold,
			    				"Ttlstock": FNASummaryArray[j].Ttlstock,
			    				"Aeap": FNASummaryArray[j].Aeap,
			    				"Nwap": FNASummaryArray[j].Nwap,
			    				"Netavlb": FNASummaryArray[j].Netavlb,
			    				"Netad": FNASummaryArray[j].Netad,
			    				"Netan": FNASummaryArray[j].Netan,
			    				"enabledAvlb": (FNASummaryArray[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArray[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArray[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArray[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArray[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArray[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArray[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArray[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArray[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArray[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArray[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArray[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArray[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArray[j].Resern,
					    						"enabledResern": (FNASummaryArray[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNA.push({
				    				"Region":FNASummaryArray[j].ZRegDesc,
				    				"Country":FNASummaryArray[j].ZCouDesc,
				    				"City":FNASummaryArray[j].ZCityDesc,
				    				"Category": FNASummaryArray[j].Pcate,
				    				"Unit Type": FNASummaryArray[j].Matnr,
				    				"Depot AVLB": FNASummaryArray[j].Avlb,
				    				"Capex AVLB": FNASummaryArray[j].Newavlb,
				    				"APPD": FNASummaryArray[j].Aurepa,
				    				"Depot Booked": FNASummaryArray[j].Book,
				    				"Capex Booked": FNASummaryArray[j].Bookn,
				    				"Depot Reserved": FNASummaryArray[j].Reser,
				    				"Capex Reserved": FNASummaryArray[j].Resern,

				    				"TIND": FNASummaryArray[j].Redel,
				    				"Depot Target": FNASummaryArray[j].Tdi,
				    				"Capex Target": FNASummaryArray[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArray[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArray[j].Oci,
				    				"Port Rating" : FNASummaryArray[j].Por,

				    				"HOLD": FNASummaryArray[j].Hold,
				    				"Total Stock": FNASummaryArray[j].Ttlstock,
				    				"WEST": FNASummaryArray[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArray[j].Nwap,
				    				"Total Net AVLB": FNASummaryArray[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArray[j].Netad,
				    				"Capex Net AVLB": FNASummaryArray[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);

				}
			}



















			else{
				if(cityLength != 0){

					jsonInventoryFNA = [];
					FNASummaryArrayFiltered = [];
					for(var j=0;j<FNASummaryArray.length;j++){
							if((isInArray(FNASummaryArray[j].City, cityValues))){
			    			FNASummaryArrayFiltered.push({
					    		"Region": FNASummaryArray[j].Region,
			    				"Country": FNASummaryArray[j].Country,
			    				"City": FNASummaryArray[j].City,
					    		"Pcate": FNASummaryArray[j].Pcate,
			    				"Matnr": FNASummaryArray[j].Matnr,
			    				"ZRegDesc":FNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArray[j].ZCityDesc,
			    				"Conc":FNASummaryArray[j].Conc,
			    				"Avlb": FNASummaryArray[j].Avlb,
			    				"Newavlb": FNASummaryArray[j].Newavlb,
			    				"Aurepa": FNASummaryArray[j].Aurepa,
			    				"Book": FNASummaryArray[j].Book,
			    				"Bookn": FNASummaryArray[j].Bookn,
			    				"Reser": FNASummaryArray[j].Reser,

			    				"Redel": FNASummaryArray[j].Redel,
			    				"Tdi": FNASummaryArray[j].Tdi,
			    				"Tci": FNASummaryArray[j].Tci,
			    				"Odi": FNASummaryArray[j].Odi,
			    				"Oci": FNASummaryArray[j].Oci,
			    				"Por": FNASummaryArray[j].Por,
			    				"enabledRedel": (FNASummaryArray[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArray[j].Hold,
			    				"Ttlstock": FNASummaryArray[j].Ttlstock,
			    				"Aeap": FNASummaryArray[j].Aeap,
			    				"Nwap": FNASummaryArray[j].Nwap,
			    				"Netavlb": FNASummaryArray[j].Netavlb,
			    				"Netad": FNASummaryArray[j].Netad,
			    				"Netan": FNASummaryArray[j].Netan,
			    				"enabledAvlb": (FNASummaryArray[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArray[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArray[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArray[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArray[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArray[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArray[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArray[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArray[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArray[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArray[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArray[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArray[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArray[j].Resern,
					    						"enabledResern": (FNASummaryArray[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNA.push({
				    				"Region":FNASummaryArray[j].ZRegDesc,
				    				"Country":FNASummaryArray[j].ZCouDesc,
				    				"City":FNASummaryArray[j].ZCityDesc,
				    				"Category": FNASummaryArray[j].Pcate,
				    				"Unit Type": FNASummaryArray[j].Matnr,
				    				"Depot AVLB": FNASummaryArray[j].Avlb,
				    				"Capex AVLB": FNASummaryArray[j].Newavlb,
				    				"APPD": FNASummaryArray[j].Aurepa,
				    				"Depot Booked": FNASummaryArray[j].Book,
				    				"Capex Booked": FNASummaryArray[j].Bookn,
				    				"Depot Reserved": FNASummaryArray[j].Reser,
				    				"Capex Reserved": FNASummaryArray[j].Resern,

				    				"TIND": FNASummaryArray[j].Redel,
				    				"Depot Target": FNASummaryArray[j].Tdi,
				    				"Capex Target": FNASummaryArray[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArray[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArray[j].Oci,
				    				"Port Rating" : FNASummaryArray[j].Por,

				    				"HOLD": FNASummaryArray[j].Hold,
				    				"Total Stock": FNASummaryArray[j].Ttlstock,
				    				"WEST": FNASummaryArray[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArray[j].Nwap,
				    				"Total Net AVLB": FNASummaryArray[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArray[j].Netad,
				    				"Capex Net AVLB": FNASummaryArray[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);
				}
				/* If no, At second point, check if the country filter has got any values. If yes, happily set that data in the table*/
				else if(countryLength != 0){

					jsonInventoryFNA = [];
					FNASummaryArrayFiltered = [];
					for(var j=0;j<FNASummaryArray.length;j++){
						if((isInArray(FNASummaryArray[j].Country, countryValues))){

			    			FNASummaryArrayFiltered.push({
					    		"Region": FNASummaryArray[j].Region,
			    				"Country": FNASummaryArray[j].Country,
			    				"City": FNASummaryArray[j].City,
					    		"Pcate": FNASummaryArray[j].Pcate,
			    				"Matnr": FNASummaryArray[j].Matnr,
			    				"ZRegDesc":FNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArray[j].ZCityDesc,
			    				"Conc":FNASummaryArray[j].Conc,
			    				"Avlb": FNASummaryArray[j].Avlb,
			    				"Newavlb": FNASummaryArray[j].Newavlb,
			    				"Aurepa": FNASummaryArray[j].Aurepa,
			    				"Book": FNASummaryArray[j].Book,
			    				"Bookn": FNASummaryArray[j].Bookn,
			    				"Reser": FNASummaryArray[j].Reser,

			    				"Redel": FNASummaryArray[j].Redel,
			    				"Tdi": FNASummaryArray[j].Tdi,
			    				"Tci": FNASummaryArray[j].Tci,
			    				"Odi": FNASummaryArray[j].Odi,
			    				"Oci": FNASummaryArray[j].Oci,
			    				"Por": FNASummaryArray[j].Por,
			    				"enabledRedel": (FNASummaryArray[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArray[j].Hold,
			    				"Ttlstock": FNASummaryArray[j].Ttlstock,
			    				"Aeap": FNASummaryArray[j].Aeap,
			    				"Nwap": FNASummaryArray[j].Nwap,
			    				"Netavlb": FNASummaryArray[j].Netavlb,
			    				"Netad": FNASummaryArray[j].Netad,
			    				"Netan": FNASummaryArray[j].Netan,
			    				"enabledAvlb": (FNASummaryArray[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArray[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArray[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArray[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArray[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArray[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArray[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArray[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArray[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArray[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArray[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArray[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArray[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArray[j].Resern,
					    						"enabledResern": (FNASummaryArray[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNA.push({
				    				"Region":FNASummaryArray[j].ZRegDesc,
				    				"Country":FNASummaryArray[j].ZCouDesc,
				    				"City":FNASummaryArray[j].ZCityDesc,
				    				"Category": FNASummaryArray[j].Pcate,
				    				"Unit Type": FNASummaryArray[j].Matnr,
				    				"Depot AVLB": FNASummaryArray[j].Avlb,
				    				"Capex AVLB": FNASummaryArray[j].Newavlb,
				    				"APPD": FNASummaryArray[j].Aurepa,
				    				"Depot Booked": FNASummaryArray[j].Book,
				    				"Capex Booked": FNASummaryArray[j].Bookn,
				    				"Depot Reserved": FNASummaryArray[j].Reser,
				    				"Capex Reserved": FNASummaryArray[j].Resern,

				    				"TIND": FNASummaryArray[j].Redel,
				    				"Depot Target": FNASummaryArray[j].Tdi,
				    				"Capex Target": FNASummaryArray[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArray[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArray[j].Oci,
				    				"Port Rating" : FNASummaryArray[j].Por,

				    				"HOLD": FNASummaryArray[j].Hold,
				    				"Total Stock": FNASummaryArray[j].Ttlstock,
				    				"WEST": FNASummaryArray[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArray[j].Nwap,
				    				"Total Net AVLB": FNASummaryArray[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArray[j].Netad,
				    				"Capex Net AVLB": FNASummaryArray[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);
				}
				/* If no, At third point, check if the Region filter has got any values. If yes, happily set that data in the table*/
				else if(regionLength != 0){

					jsonInventoryFNA = [];
					FNASummaryArrayFiltered = [];
					for(var j=0;j<FNASummaryArray.length;j++){
						if(regionValues.length == 0){
							FNASummaryArrayFiltered = FNASummaryArray;
						}
						else if((isInArray(FNASummaryArray[j].Region, regionValues))){

			    			FNASummaryArrayFiltered.push({
					    		"Region": FNASummaryArray[j].Region,
			    				"Country": FNASummaryArray[j].Country,
			    				"City": FNASummaryArray[j].City,
					    		"Pcate": FNASummaryArray[j].Pcate,
			    				"Matnr": FNASummaryArray[j].Matnr,
			    				"ZRegDesc":FNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FNASummaryArray[j].ZCityDesc,
			    				"Conc":FNASummaryArray[j].Conc,
			    				"Avlb": FNASummaryArray[j].Avlb,
			    				"Newavlb": FNASummaryArray[j].Newavlb,
			    				"Aurepa": FNASummaryArray[j].Aurepa,
			    				"Book": FNASummaryArray[j].Book,
			    				"Bookn": FNASummaryArray[j].Bookn,
			    				"Reser": FNASummaryArray[j].Reser,

			    				"Redel": FNASummaryArray[j].Redel,
			    				"Tdi": FNASummaryArray[j].Tdi,
			    				"Tci": FNASummaryArray[j].Tci,
			    				"Odi": FNASummaryArray[j].Odi,
			    				"Oci": FNASummaryArray[j].Oci,
			    				"Por": FNASummaryArray[j].Por,
			    				"enabledRedel": (FNASummaryArray[j].Redel == 0)? false: true,

			    				"Hold": FNASummaryArray[j].Hold,
			    				"Ttlstock": FNASummaryArray[j].Ttlstock,
			    				"Aeap": FNASummaryArray[j].Aeap,
			    				"Nwap": FNASummaryArray[j].Nwap,
			    				"Netavlb": FNASummaryArray[j].Netavlb,
			    				"Netad": FNASummaryArray[j].Netad,
			    				"Netan": FNASummaryArray[j].Netan,
			    				"enabledAvlb": (FNASummaryArray[j].Avlb == 0)? false: true,
					    				"enabledNewavlb": (FNASummaryArray[j].Newavlb == 0)? false: true,
					    				"enabledAurepa": (FNASummaryArray[j].Aurepa == 0)? false: true,
			    						"enabledBook": (FNASummaryArray[j].Book == 0)? false: true,
					    				"enabledBookn": (FNASummaryArray[j].Bookn == 0)? false: true,
					    						"enabledReser": (FNASummaryArray[j].Reser == 0)? false: true,
					    				"enabledHold": (FNASummaryArray[j].Hold == 0)? false: true,
			    			    		"enabledTtlstock": (FNASummaryArray[j].Ttlstock == 0)? false: true,
					    				"enabledAeap": (FNASummaryArray[j].Aeap == 0)? false: true,
					    						"enabledNwap": (FNASummaryArray[j].Nwap == 0)? false: true,
					    				"enabledNetad": (FNASummaryArray[j].Netad == 0)? false: true,
					    				"enabledNetan": (FNASummaryArray[j].Netan == 0)? false: true,
					    				"enabledNetavlb": (FNASummaryArray[j].Netavlb == 0)? false: true,

					    						"Resern": FNASummaryArray[j].Resern,
					    						"enabledResern": (FNASummaryArray[j].Resern == 0)? false: true,
				    			});

						    	jsonInventoryFNA.push({
				    				"Region":FNASummaryArray[j].ZRegDesc,
				    				"Country":FNASummaryArray[j].ZCouDesc,
				    				"City":FNASummaryArray[j].ZCityDesc,
				    				"Category": FNASummaryArray[j].Pcate,
				    				"Unit Type": FNASummaryArray[j].Matnr,
				    				"Depot AVLB": FNASummaryArray[j].Avlb,
				    				"Capex AVLB": FNASummaryArray[j].Newavlb,
				    				"APPD": FNASummaryArray[j].Aurepa,
				    				"Depot Booked": FNASummaryArray[j].Book,
				    				"Capex Booked": FNASummaryArray[j].Bookn,
				    				"Depot Reserved": FNASummaryArray[j].Reser,
				    				"Capex Reserved": FNASummaryArray[j].Resern,


				    				"TIND": FNASummaryArray[j].Redel,
				    				"Depot Target": FNASummaryArray[j].Tdi,
				    				"Capex Target": FNASummaryArray[j].Tci,
				    				"Depot Shortage/Surplus": FNASummaryArray[j].Odi,
				    				"Capex Shortage/Surplus": FNASummaryArray[j].Oci,
				    				"Port Rating" : FNASummaryArray[j].Por,

				    				"HOLD": FNASummaryArray[j].Hold,
				    				"Total Stock": FNASummaryArray[j].Ttlstock,
				    				"WEST": FNASummaryArray[j].Aeap,
				    				"Awaiting Approv.": FNASummaryArray[j].Nwap,
				    				"Total Net AVLB": FNASummaryArray[j].Netavlb,
				    				"Depot Net AVLB": FNASummaryArray[j].Netad,
				    				"Capex Net AVLB": FNASummaryArray[j].Netan
				    			});


			    		}
			    		}

		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);
				}
				/*If no filters in the location combination, set the original data*/
				else{

					jsonInventoryFNA = [];

					for(var j=0;j<FNASummaryArray.length;j++){
				    	jsonInventoryFNA.push({
		    				"Region":FNASummaryArray[j].ZRegDesc,
		    				"Country":FNASummaryArray[j].ZCouDesc,
		    				"City":FNASummaryArray[j].ZCityDesc,
		    				"Category": FNASummaryArray[j].Pcate,
		    				"Unit Type": FNASummaryArray[j].Matnr,
		    				"Depot AVLB": FNASummaryArray[j].Avlb,
		    				"Capex AVLB": FNASummaryArray[j].Newavlb,
		    				"APPD": FNASummaryArray[j].Aurepa,
		    				"Depot Booked": FNASummaryArray[j].Book,
		    				"Capex Booked": FNASummaryArray[j].Bookn,
		    				"Depot Reserved": FNASummaryArray[j].Reser,
		    				"Capex Reserved": FNASummaryArray[j].Resern,

		    				"TIND": FNASummaryArray[j].Redel,
		    				"Depot Target": FNASummaryArray[j].Tdi,
		    				"Capex Target": FNASummaryArray[j].Tci,
		    				"Depot Shortage/Surplus": FNASummaryArray[j].Odi,
		    				"Capex Shortage/Surplus": FNASummaryArray[j].Oci,
		    				"Port Rating" : FNASummaryArray[j].Por,

		    				"HOLD": FNASummaryArray[j].Hold,
		    				"Total Stock": FNASummaryArray[j].Ttlstock,
		    				"WEST": FNASummaryArray[j].Aeap,
		    				"Awaiting Approv.": FNASummaryArray[j].Nwap,
		    				"Total Net AVLB": FNASummaryArray[j].Netavlb,
		    				"Depot Net AVLB": FNASummaryArray[j].Netad,
		    				"Capex Net AVLB": FNASummaryArray[j].Netan
		    			});
			    		}

					var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FNASummaryArray});
		        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");
		        	if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsField").getValue();
		        	if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idRadioButtonPage").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}

	  	    		var totalPages = (Math.ceil(FNASummaryArray.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);
				}
				}
		},

		resetEverything : function(){

			/* Select "City Level" radio button */
        	var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol");
        	selectedRadio.setSelectedIndex(2);

        	/* Reset MRegion Combo */
    		sap.ui.getCore().byId("idMRegionCombo").setEnabled(true);
    		sap.ui.getCore().byId("idMRegionCombo").removeAllSelectedItems();
        	var mregionGModel = new sap.ui.model.json.JSONModel(mregionFilterGData);
        	mregionGModel.setSizeLimit(10000);
        	sap.ui.getCore().byId("idMRegionCombo").setModel(mregionGModel);

        	/* Reset Region Combo */
    		sap.ui.getCore().byId("idRegionCombo").setEnabled(true);
    		sap.ui.getCore().byId("idRegionCombo").removeAllSelectedItems();
        	var regionGModel = new sap.ui.model.json.JSONModel(regionFilterGData);
        	regionGModel.setSizeLimit(10000);
        	sap.ui.getCore().byId("idRegionCombo").setModel(regionGModel);

        	/* Reset Country Combo */
    		sap.ui.getCore().byId("idCountryCombo").setEnabled(true);
    		sap.ui.getCore().byId("idCountryCombo").removeAllSelectedItems();
        	var countryGModel = new sap.ui.model.json.JSONModel(countryFilterGData);
        	countryGModel.setSizeLimit(10000);
        	sap.ui.getCore().byId("idCountryCombo").setModel(countryGModel);

        	/* Reset City Combo */
    		sap.ui.getCore().byId("idCityCombo").setEnabled(true);
    		sap.ui.getCore().byId("idCityCombo").removeAllSelectedItems();
        	var cityGModel = new sap.ui.model.json.JSONModel(cityFilterGData);
        	cityGModel.setSizeLimit(10000);
        	sap.ui.getCore().byId("idCityCombo").setModel(cityGModel);

        	/* Reset Depot Combo */
    		sap.ui.getCore().byId("idDepotCombo").setEnabled(true);
    		sap.ui.getCore().byId("idDepotCombo").removeAllSelectedItems();
        	var depotGModel = new sap.ui.model.json.JSONModel(depotFilterGData);
        	depotGModel.setSizeLimit(10000);
        	sap.ui.getCore().byId("idDepotCombo").setModel(depotGModel);

        	/* Reset Product Category Combo */
    		sap.ui.getCore().byId("idProCatCombo").setEnabled(true);
    		sap.ui.getCore().byId("idProCatCombo").removeAllSelectedItems();
        	var proCatFilterGModel = new sap.ui.model.json.JSONModel(proCatFilterGData);
        	proCatFilterGModel.setSizeLimit(10000);
        	sap.ui.getCore().byId("idProCatCombo").setModel(proCatFilterGModel);

      //   	var leasingOrRemarketing = window.localStorage.getItem("memLeasingOrRemarketing");
			// if(leasingOrRemarketing == "L"){
			// 	var oProCatComboSelectedKeys = "BOXES,REEFERS,TANKS,SPECIALS"; // Excluding SWAPBODIES
			// 	oProCatComboSelectedKeys = oProCatComboSelectedKeys.split(',');
			// 	oProCatComboSelectedKeys = oProCatComboSelectedKeys.filter(function(entry) { return entry.trim() != ''; });
			// 	sap.ui.getCore().byId("idProCatCombo").setSelectedKeys(oProCatComboSelectedKeys);
			// }else{
				var oProCatComboSelectedKeys = ""; // Excluding SWAPBODIES
				oProCatComboSelectedKeys = oProCatComboSelectedKeys.split(',');
				oProCatComboSelectedKeys = oProCatComboSelectedKeys.filter(function(entry) { return entry.trim() != ''; });
				sap.ui.getCore().byId("idProCatCombo").setSelectedKeys(oProCatComboSelectedKeys);
			//}


        	/* Reset Product Class Combo */
    		sap.ui.getCore().byId("idProClassCombo").setEnabled(true);
    		sap.ui.getCore().byId("idProClassCombo").removeAllSelectedItems();
        	var proClassFilterGModel = new sap.ui.model.json.JSONModel(proClassFilterGData);
        	proClassFilterGModel.setSizeLimit(10000);
        	sap.ui.getCore().byId("idProClassCombo").setModel(proClassFilterGModel);

        	/* Reset Unit Type Combo */
    		sap.ui.getCore().byId("idUnitTypeCombo").setEnabled(true);
    		sap.ui.getCore().byId("idUnitTypeCombo").removeAllSelectedItems();
        	var unitTypeFilterGModel = new sap.ui.model.json.JSONModel(unitTypeFilterGData);
        	unitTypeFilterGModel.setSizeLimit(10000);
        	sap.ui.getCore().byId("idUnitTypeCombo").setModel(unitTypeFilterGModel);

        	/* Reset Customer Combo */
    		sap.ui.getCore().byId("idCustomerCombo").setEnabled(true);
    		sap.ui.getCore().byId("idCustomerCombo").removeAllSelectedItems();
        	var customerFilterGModel = new sap.ui.model.json.JSONModel(customerFilterGData);
        	customerFilterGModel.setSizeLimit(10000);
        	sap.ui.getCore().byId("idCustomerCombo").setModel(customerFilterGModel);

        	/* Reset Lease Type Combo */
    		sap.ui.getCore().byId("idLeasetypeCombo").setEnabled(true);
    		sap.ui.getCore().byId("idLeasetypeCombo").removeAllSelectedItems();
        	var leasetypeFilterGModel = new sap.ui.model.json.JSONModel(leasetypeFilterGData);
        	leasetypeFilterGModel.setSizeLimit(10000);
        	sap.ui.getCore().byId("idLeasetypeCombo").setModel(leasetypeFilterGModel);

        	/* Reset Release Type Combo */
    		sap.ui.getCore().byId("idReleasetypeCombo").setEnabled(true);
    		sap.ui.getCore().byId("idReleasetypeCombo").removeAllSelectedItems();
        	var releasetypeFilterGModel = new sap.ui.model.json.JSONModel(releasetypeFilterGData);
        	releasetypeFilterGModel.setSizeLimit(10000);
        	sap.ui.getCore().byId("idReleasetypeCombo").setModel(releasetypeFilterGModel);

					/* Reset Grade Combo */
    		  sap.ui.getCore().byId("idGradeCombo").setEnabled(true);
    	 	  sap.ui.getCore().byId("idGradeCombo").removeAllSelectedItems();
        	var gradeFilterGModel = new sap.ui.model.json.JSONModel(gradeFilterGData);
        	gradeFilterGModel.setSizeLimit(10000);
        	sap.ui.getCore().byId("idGradeCombo").setModel(gradeFilterGModel);

					/* Reset Equip. Status Combo */
    		  sap.ui.getCore().byId("idEqStatusCombo").setEnabled(true);
    	 	  sap.ui.getCore().byId("idEqStatusCombo").removeAllSelectedItems();
        	var eqStatusFilterGModel = new sap.ui.model.json.JSONModel(eqStatusFilterGData);
        	eqStatusFilterGModel.setSizeLimit(10000);
        	sap.ui.getCore().byId("idEqStatusCombo").setModel(eqStatusFilterGModel);

					/* Reset Simple Status Combo */
    		  sap.ui.getCore().byId("idSiStatusCombo").setEnabled(true);
    	 	  sap.ui.getCore().byId("idSiStatusCombo").removeAllSelectedItems();
        	var siStatusFilterGModel = new sap.ui.model.json.JSONModel(siStatusFilterGData);
        	siStatusFilterGModel.setSizeLimit(10000);
        	sap.ui.getCore().byId("idSiStatusCombo").setModel(siStatusFilterGModel);

        	/* Reset Age */
        	sap.ui.getCore().byId("idSymbolAge").setSelectedKey("EQ");
        	sap.ui.getCore().byId("idInputAge").setValue("");
        	sap.ui.getCore().byId("idInputAge2").setValue("");

        	/* Reset Port Rating */
        	sap.ui.getCore().byId("idSymbolPor").setSelectedKey("EQ");
        	sap.ui.getCore().byId("idInputPor").setValue("");
					sap.ui.getCore().byId("idInputPor2").setValue("");
					
					/* Reset Sub Type */

        	sap.ui.getCore().byId("idInputSubType").setValue("");
        	sap.ui.getCore().byId("idFlexSubType").setVisible(false);

        	/* Make Country and City visible */
    		//sap.ui.getCore().byId("ZCouDesc").setVisible(true);
    		//sap.ui.getCore().byId("ZCityDesc").setVisible(true);
    		//sap.ui.getCore().byId("Por").setVisible(true);


    		/* Reset Data ... */

			/*var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
    		oModelFilteredPageOne.setData({modelData: FNASummaryArray});
        	sap.ui.getCore().byId("idTableFNASummary").setModel(oModelFilteredPageOne);
        	sap.ui.getCore().byId("idTableFNASummary").bindRows("/modelData");

            if (FNASummaryArray.length < 50){
            	sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(FNASummaryArray.length);
            	sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
            	sap.ui.getCore().byId("idTotalPages").setText("");
            }
  	    	else{
  	    		sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
  	    		sap.ui.getCore().byId("idTableFNASummary").setVisibleRowCount(50);
  	    		if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
  	    		sap.ui.getCore().byId("idRadioButtonPage").setSelectedIndex(0);
  	    		var totalPages = (Math.ceil(FNASummaryArray.length/50));
  	    		totalPages = "Total No. of Pages : " + totalPages;
  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);
  	    		if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
  	    		sap.ui.getCore().byId("idTotalRowsField").setValue(50);
  	    	}*/

		}


});

function isInArray(value, array) {
	  return array.indexOf(value) > -1;
}

function sort_by(field, reverse, primer){

	   var key = primer ?
	       function(x) {return primer(x[field])} :
	       function(x) {return x[field]};

	   reverse = !reverse ? 1 : -1;

	   return function (a, b) {
	       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
	     }
	}
