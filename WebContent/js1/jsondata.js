///sap/opu/odata/sap/ZMNR_DEP_SRV/depotview1Set?$filter=Bname eq 'SARAVANANC'

jQuery.sap.require("sap.ui.core.IconPool");

var oSDASHM3JsonHeaderLinesOthers = {};

var oSDASHM1GeneralJsonStatus = [];
oSDASHM1GeneralJsonStatus.push({
	key : "",
	text : ""
});
oSDASHM1GeneralJsonStatus.push({
	key : "WEST",
	text : "WEST"
});
oSDASHM1GeneralJsonStatus.push({
	key : "AWAP",
	text : "AWAP"
});
oSDASHM1GeneralJsonStatus.push({
	key : "AUTH",
	text : "AUTH"
});
oSDASHM1GeneralJsonStatus.push({
	key : "HOLD",
	text : "HOLD"
});
oSDASHM1GeneralJsonStatus.push({
	key : "AVLB",
	text : "AVLB"
});
oSDASHM1GeneralJsonStatus.push({
	key : "SALE",
	text : "SALE"
});

var oSDASHM1GeneralJsonFrequency = [];
oSDASHM1GeneralJsonFrequency.push({
	key : "",
	text : ""
});

oSDASHM1GeneralJsonFrequency.push({
	key : "D",
	text : "Daily"
});

oSDASHM1GeneralJsonFrequency.push({
	key : "W",
	text : "Weekly"
});

oSDASHM1GeneralJsonFrequency.push({
	key : "B",
	text : "Biweekly"
});

oSDASHM1GeneralJsonFrequency.push({
	key : "M",
	text : "Monthly"
});

var oSDASHM1OpsCoordJsonStatus = [];
oSDASHM1OpsCoordJsonStatus.push({
	key : "WEST",
	text : "WEST"
});
oSDASHM1OpsCoordJsonStatus.push({
	key : "AWAP",
	text : "AWAP"
});
oSDASHM1OpsCoordJsonStatus.push({
	key : "AUTH",
	text : "AUTH"
});
oSDASHM1OpsCoordJsonStatus.push({
	key : "HOLD",
	text : "HOLD"
});
oSDASHM1OpsCoordJsonStatus.push({
	key : "AVLB",
	text : "AVLB"
});
oSDASHM1OpsCoordJsonStatus.push({
	key : "SALE",
	text : "SALE"
});

var oSDASHM1OpsCoordJsonFrequency = [];
oSDASHM1OpsCoordJsonFrequency.push({
	key : "NONE",
	text : "None"
});

oSDASHM1OpsCoordJsonFrequency.push({
	key : "DAILY",
	text : "Daily"
});

oSDASHM1OpsCoordJsonFrequency.push({
	key : "WEEKLY",
	text : "Weekly"
});

oSDASHM1OpsCoordJsonFrequency.push({
	key : "BIWEEKLY",
	text : "Biweekly"
});

oSDASHM1OpsCoordJsonFrequency.push({
	key : "MONTHLY",
	text : "Monthly"
});

var oCDASHMJsonPendingApproval = [];

oCDASHMJsonPendingApproval.push({
	isChecked : false,
	sno : "1",
	estimateno : "Estimate 1",
	estimatetype : "Original",
	depotcode : "1547",
	depotname : "Eng Kong Containers",
	materialcode : "20' Box Standard",
	unitnumber : "GESU4346336",
	usercost : parseFloat("300.00"),
	costcurrency : "USD",
	offhirelocation : "China, Qingdao",
	datesubmitted : "11/01/2017",
	status : "Overdue - Awaiting Approval",
	lastaction : "Reminder sent on 12 Feb 2017",
	approve : "Approve",
	downloadestimate : "Download Estimate",
	image: "images/photo.png"
});

oCDASHMJsonPendingApproval.push({
	isChecked : false,
	sno : "2",
	estimateno : "Estimate 2",
	estimatetype : "Joint Survey",
	depotcode : "1537",
	depotname : "Express Repair Services PVT. LTD.",
	materialcode : "20' Box Standard",
	unitnumber : "GESU8876578",
	usercost : parseFloat("100.05"),
	costcurrency : "USD",
	offhirelocation : "US, Florida",
	datesubmitted : "21/01/2017",
	status : "Awaiting Approval",
	lastaction : "Estimate sent on 27 Jan 2017",
	approve : "Approve",
	downloadestimate : "Download Estimate",
	image: ""
});

oCDASHMJsonPendingApproval.push({
	isChecked : false,
	sno : "3",
	estimateno : "Estimate 3",
	estimatetype : "Original",
	depotcode : "1537",
	depotname : "Express Repair Services PVT. LTD.",
	materialcode : "20' Box Standard",
	unitnumber : "GESU3335521",
	usercost : parseFloat("788.71"),
	costcurrency : "USD",
	offhirelocation : "Hamburg, Germany",
	datesubmitted : "03/09/2003",
	status : "Awaiting Approval",
	lastaction : "Estimate sent on 01 Aug 2013",
	approve : "Approve",
	downloadestimate : "Download Estimate",
	image: ""
});



var oCDASHMJsonEstimatesApproved = [];

oCDASHMJsonEstimatesApproved.push({
	isChecked : false,
	sno : "1",
	estimateno : "Estimate 1",
	estimatetype : "Original",
	depotcode : "1547",
	depotname : "Eng Kong Containers",
	materialcode : "20' Box Standard",
	unitnumber : "GESU4346336",
	usercost : parseFloat("300.00"),
	costcurrency : "USD",
	offhirelocation : "China, Qingdao",
	datesubmitted : "11/01/2017",
	status : "Overdue - Awaiting Approval",
	lastaction : "Reminder sent on 12 Feb 2017",
	//approve : "Approve",
	downloadestimate : "Download Estimate",
	image: "images/photo.png"
});

oCDASHMJsonEstimatesApproved.push({
	isChecked : false,
	sno : "2",
	estimateno : "Estimate 2",
	estimatetype : "Joint Survey",
	depotcode : "1537",
	depotname : "Express Repair Services PVT. LTD.",
	materialcode : "20' Box Standard",
	unitnumber : "GESU8876578",
	usercost : parseFloat("100.05"),
	costcurrency : "USD",
	offhirelocation : "US, Florida",
	datesubmitted : "21/01/2017",
	status : "Awaiting Approval",
	lastaction : "Estimate sent on 27 Jan 2017",
	//approve : "Approve",
	downloadestimate : "Download Estimate",
	image: ""
});


/*var oSDASHMJsonStatusMonitor = [];

oSDASHMJsonStatusMonitor.push({
	sno : "1",
	depotcode : "1547",
	depotname : "Eng Kong Container Agencies Pte Ltd",
	location : "SG-SIN",
	west : "20",
	awap : "18",
	authg1 : "7",
	authg2 : "15",
	sale : "28",
	saleg1 : "11",
	saleg2 : "29",
	saleg2 : "32",
	saleg3 : "10",
	saleg4 : "77",
	saleg5 : "33",
	tstock : "344",
	edi : "88",
	rod : "",
	mgr : "Liang Boon Koh",
	coord : "Alison Lim",
	contact : "Contact",
});

oSDASHMJsonStatusMonitor.push({
	sno : "2",
	depotcode : "1063",
	depotname : "Allwin Marine Mumbai",
	location : "IN-BOM",
	west : "25",
	awap : "21",
	authg1 : "17",
	authg2 : "22",
	sale : "47",
	saleg1 : "19",
	saleg2 : "30",
	saleg2 : "11",
	saleg3 : "30",
	saleg4 : "28",
	saleg5 : "42",
	tstock : "465",
	edi : "76",
	rod : "",
	mgr : "Martin Goldbeck-Loewe",
	coord : "Nicole Ng",
	contact : "Contact"
});


var oSDASHMJsonEquipmentLevel = [];

oSDASHMJsonEquipmentLevel.push({
	isChecked : false,
	sno : "1",

	serialno : "GESU4346336",
	unittype : "BW4",
	status : "HOLD",
	age : "5",

	offhirelocation : "IN-BOM",
	offhiredate : "06/12/2015",

	estimateno : "Estimate 2",
	estimatetype : "Joint Survey",
	estimatedate : "07/12/2015",

	estimateamt : "1100.05",
	addestimateamt : "128.87",
	totestimateamt : "1228.92",
	estimatecurrency : "CNY",
	cwamt : "611",

	salesgrade : "2",
	criteria : "",

	curstatus : "HOLD",
	lastaction : "User Approved on 14 Apr 2016",
	reference : "refer1",

});

oSDASHMJsonEquipmentLevel.push({
	isChecked : false,
	sno : "2",

	serialno : "GESU1234568",
	unittype : "BX2",
	status : "AWAP",
	age : "7",

	offhirelocation : "IN-BOM",
	offhiredate : "15/01/2016",

	estimateno : "Estimate 4",
	estimatetype : "Original",
	estimatedate : "29/01/2016",

	estimateamt : "800.23",
	addestimateamt : "79.17",
	totestimateamt : "879.40",
	estimatecurrency : "CNY",
	cwamt : "290",

	salesgrade : "1",
	criteria : "",

	curstatus : "Awaiting User Approval",
	lastaction : "Estimate Sent on 29 Jan 16",
	reference : "",

}); */

/* SDASHM3 Header Details */
var oSDASHM3JsonHeaderDetails = {};

oSDASHM3JsonHeaderDetails.depot = "Qingdao Ocean & Great Asia Logistic (1405)";
oSDASHM3JsonHeaderDetails.city = "Qingdao";
oSDASHM3JsonHeaderDetails.lease = "128713";
oSDASHM3JsonHeaderDetails.unittype = "40' High Cube Standard (BW4)";
oSDASHM3JsonHeaderDetails.uom = "CMT";
oSDASHM3JsonHeaderDetails.ohdate = "28 Dec 2007";
oSDASHM3JsonHeaderDetails.gidate = "05 Jun 2016";
oSDASHM3JsonHeaderDetails.estdate = "08 Jun 2016";
oSDASHM3JsonHeaderDetails.estimate = "1009877";
oSDASHM3JsonHeaderDetails.currency = "CNY";
oSDASHM3JsonHeaderDetails.age = "2";
oSDASHM3JsonHeaderDetails.redelref = "585418";

oSDASHM3JsonHeaderDetails.serial = "GESU4346336";
oSDASHM3JsonHeaderDetails.recordtype = "GateIn";
oSDASHM3JsonHeaderDetails.mnrstatus = "Pending User Approval";
oSDASHM3JsonHeaderDetails.lastactionfirst = "Latest: Reminder Sent on 07 Jan 15";
oSDASHM3JsonHeaderDetails.lastaction = "Latest: Reminder Sent on 07 Jan 15\nSecond: Billed $200 to customer on 15 Jan 15\nThird:�so on";

/* SDASHM3 Estimate Lines */
var oSDASHM3JsonEstimateLines = [];

oSDASHM3JsonEstimateLines.push({
	sno : "1",

	component : "Markings, Other",
	damage : "Customers Markings",
	repair : "Remove Markings",
	location : "Whole Container",

	locationiso : "XXXX",
	material : "SK",

	length : "0",
	width : "0",
	qty : "10",

	hrs : "0.5",
	labcost : "12",
	matcost : "39.43",
	total : "51.43",
	resp : "U",

});

oSDASHM3JsonEstimateLines.push({
	sno : "2",

	component : "Flooring, Plywood Plank",
	damage : "Oil Stains",
	repair : "Chemical Clean",
	location : "Floor Whole",

	locationiso : "BXXX",
	material : "SK",

	length : "0",
	width : "0",
	qty : "1",

	hrs : "0",
	labcost : "0",
	matcost : "257.69",
	total : "257.69",
	resp : "O",

});

oSDASHM3JsonEstimateLines.push({
	sno : "3",

	component : "Cross Member Assembly",
	damage : "Broken/Split",
	repair : "Insert",
	location : "Understructure Left",

	locationiso : "UL1N",
	material : "SK",

	length : "15",
	width : "0",
	qty : "1",

	hrs : "1",
	labcost : "24",
	matcost : "31.54",
	total : "55.54",
	resp : "I",

});

oSDASHM3JsonEstimateLines.push({
	sno : "4",

	component : "Panel Assembly",
	damage : "Bowed",
	repair : "Straighten",
	location : "Roof/Top Whole",

	locationiso : "TX0N",
	material : "SK",

	length : "150",
	width : "90",
	qty : "1",

	hrs : "3",
	labcost : "72",
	matcost : "0",
	total : "72",
	resp : "S",

});

oSDASHM3JsonEstimateLines.push({
	sno : "",

	component : "",
	damage : "",
	repair : "",
	location : "",

	locationiso : "",
	material : "",

	length : "",
	width : "",
	qty : "",

	hrs : "Total Cost",
	labcost : "108",
	matcost : "328.66",
	total : "436.66",
	resp : "",

});

oSDASHM3JsonEstimateLines.push({
	sno : "",

	component : "",
	damage : "",
	repair : "",
	location : "",

	locationiso : "",
	material : "",

	length : "",
	width : "",
	qty : "",

	hrs : "Tax",
	labcost : "",
	matcost : "",
	total : "",
	resp : "",

});

oSDASHM3JsonEstimateLines.push({
	sno : "",

	component : "",
	damage : "",
	repair : "",
	location : "",

	locationiso : "",
	material : "",

	length : "",
	width : "",
	qty : "",

	hrs : "Final Total",
	labcost : "108",
	matcost : "328.66",
	total : "436.66",
	resp : "",

});

/* SDASHM3 Summary Lines */

var oSDASHM3JsonSummaryLines = [];
oSDASHM3JsonSummaryLines.push({
	type : "Total Seacover",
	labcost : "24",
	matcost : "31.54",
	total : "55.54"
});

oSDASHM3JsonSummaryLines.push({
	type : "Total User Cost",
	labcost : "12",
	matcost : "39.43",
	total : "51.43"
});

oSDASHM3JsonSummaryLines.push({
	type : "Total Owner Cost",
	labcost : "0",
	matcost : "257.69",
	total : "257.69"
});

oSDASHM3JsonSummaryLines.push({
	type : "CW Repair Cost",
	labcost : "",
	matcost : "",
	total : "50"
});

/* SDASHM3 Header Lines */

var oSDASHM3JsonHeaderLines = [];
oSDASHM3JsonHeaderLines.push({
	label1 : "Estimate Date",
	value1 : "11 Apr 2018",
	label2 : "Estimate No.",
	value2 : "10009877",
	label3 : "Local Currency",
	value3 : "CNY",
	label4 : "Customer",
	value4 : "CMA CGM (100173)"
});

oSDASHM3JsonHeaderLines.push({
	label1 : "Off Hire Date",
	value1 : "11 Apr 2018",
	label2 : "Off Hire Loc.",
	value2 : "US-HOU-5555",
	label3 : "CW Cost",
	value3 : "SGD 1,000.00",
	label4 : "Cust. Approv. Date",
	value4 : "11 Apr 2018"
});

oSDASHM3JsonHeaderLines.push({
	label1 : "On Hire Date",
	value1 : "11 Apr 2018",
	label2 : "On Hire Loc.",
	value2 : "US-HOU-5555",
	label3 : "DRV Amount (Local Curr.)",
	value3 : "SGD 1,000.00",
	label4 : "Cust. Approv. Ref",
	value4 : "OMARAPPROVES"
});

oSDASHM3JsonHeaderLines.push({
	label1 : "Unit Grade",
	value1 : "2",
	label2 : "Return Auth. No.",
	value2 : "7777777",
	label3 : "DRV Amount (Lease Curr.)",
	value3 : "USD 1,310.00",
	label4 : "Last Cargo",
	value4 : "5000"
});

oSDASHM3JsonHeaderLines.push({
	label1 : "TAB Days Remain.",
	value1 : "25",
	label2 : "Lease No.",
	value2 : "121212",
	label3 : "SCR Limit(Local Curr.)",
	value3 : "SGD 1,310.00",
	label4 : "Unit Type",
	value4 : "(BX2) 20' Box"
});

oSDASHM3JsonHeaderLines.push({
	label1 : "Manuf. Yr (Age)",
	value1 : "Oct 2011 (7)",
	label2 : "Billing Type",
	value2 : "Central",
	label3 : "SCR Limit(Lease Curr.)",
	value3 : "SGD 1,310.00",
	label4 : "Technical Bulletin",
	value4 : "1234 - WASH CLEAN CLEAN"
});


/*var oSDASHM3JsonHeaderLines = [];
oSDASHM3JsonHeaderLines.push({
	label1 : "Depot",
	value1 : "Qingdao Ocean & Great Asia Logistic (1405)",
	label2 : "Unit of Measure",
	value2 : "CMT",
	label3 : "Estimate No.",
	value3 : "1009877",
	label3 : "Estimate No.",
	value3 : "1009877",
	label3 : "Estimate No.",
	value3 : "1009877"
});

oSDASHM3JsonHeaderLines.push({
	label1 : "City",
	value1 : "Qingdao",
	label2 : "On Hire Date",
	value2 : "28 Dec 2007",
	label3 : "Currency",
	value3 : "CNY",
});

oSDASHM3JsonHeaderLines.push({
	label1 : "Lease No.",
	value1 : "128713",
	label2 : "Gate IN Date",
	value2 : "05 Jun 2016",
	label3 : "Age",
	value3 : "2",
});

oSDASHM3JsonHeaderLines.push({
	label1 : "Unit Type",
	value1 : "40' High Cube Standard (BW4)",
	label2 : "Est. Date",
	value2 : "08 Jun 2016",
	label3 : "Redel Ref.",
	value3 : "585418",
});

oSDASHM3JsonHeaderLines.push({
	label1 : "Customer",
	value1 : "Shanghai Minsheng Shipping Co Ltd.(104262)",
	label2 : "",
	value2 : "",
	label3 : "",
	value3 : "",
});*/

/* SDASHM3 Record Type

var oSDASHM3JsonRecordType = [];
oSDASHM3JsonRecordType.push({
	label1 : "Record Type",
	value1 : ""
}); */

/* SDASHM3 Record Lines */

var oSDASHM3JsonRecordLines = [];
oSDASHM3JsonRecordLines.push({
	label1 : "Record Type",
	value1 : "",
	label2 : "Serial No.",
	value2 : "GESU4346336",
	label3 : "M&R Status",
	value3 : "Pending User Approval",
	label4 : "Last Action",
	value4 : "Latest: Reminder Sent on 07 Jan 15",
	f4visible : false,
	key : "",
	Supplier : "'"
});

/* SDASHM3 Misc Info */

var oSDASHM3JsonMiscInfo = [];
oSDASHM3JsonMiscInfo.push({
	label1 : "M&R Comment",
	value1 : "",
	label2 : "Remove Cmts At Pick",
	value2 : "Y",
	label3 : "Display in RA?",
	value3 : "Y"
});
oSDASHM3JsonMiscInfo.push({
	label1 : "Notes 1",
	value1 : "",
	label2 : "Notes 2",
	value2 : "",
	label3 : "Notes 3",
	value3 : ""
});
oSDASHM3JsonMiscInfo.push({
	label1 : "Notes 4",
	value1 : "",
	label2 : "Notes 5",
	value2 : "",
	label3 : "",
	value3 : ""
});

/*oSDASHM3JsonRecordLines.push({
	label1 : "Serial No.",
	value1 : "GESU4346336",
	f4visible : false
});

oSDASHM3JsonRecordLines.push({
	label1 : "Record Type",
	value1 : "Gate IN",
	f4visible : false
});

oSDASHM3JsonRecordLines.push({
	label1 : "M&R Status",
	value1 : "Pending User Approval",
	f4visible : false
});

oSDASHM3JsonRecordLines.push({
	label1 : "Last Action",
	value1 : "Latest: Reminder Sent on 07 Jan 15",
	f4visible : true
});*/

var oSDASHM3JsonProcesses = [];
oSDASHM3JsonProcesses.push({
	text:"Gate IN",
	key: "GI",
	sortkey: "0"
});

oSDASHM3JsonProcesses.push({
	text:"Original Estimate",
	key: "OE",
	sortkey: "1"
});

oSDASHM3JsonProcesses.push({
	text:"Joint Survey",
	key: "JS",
	sortkey: "2"
});

oSDASHM3JsonProcesses.push({
	text:"Lessor Survey",
	key: "LS",
	sortkey: "3"
});

oSDASHM3JsonProcesses.push({
	text:"Cargo Worthy",
	key: "CW1",
	sortkey: "4"
});

oSDASHM3JsonProcesses.push({
	text:"Cargo Worthy",
	key: "CW2",
	sortkey: "5"
});

oSDASHM3JsonProcesses.push({
	text:"Cargo Worthy",
	key: "CW3",
	sortkey: "6"
});

oSDASHM3JsonProcesses.push({
	text:"Cargo Worthy",
	key: "CW4",
	sortkey: "7"
});

oSDASHM3JsonProcesses.push({
	text:"Cargo Worthy",
	key: "CW5",
	sortkey: "8"
});

oSDASHM3JsonProcesses.push({
	text:"Additional Estimate",
	key: "AE1",
	sortkey: "9"
});

oSDASHM3JsonProcesses.push({
	text:"Additional Estimate",
	key: "AE2",
	sortkey: "10"
});

oSDASHM3JsonProcesses.push({
	text:"Additional Estimate",
	key: "AE3",
	sortkey: "11"
});

oSDASHM3JsonProcesses.push({
	text:"Additional Estimate",
	key: "AE4",
	sortkey: "12"
});

oSDASHM3JsonProcesses.push({
	text:"Additional Estimate",
	key: "AE5",
	sortkey: "13"
});

oSDASHM3JsonProcesses.push({
	text:"Pre-del Estimate",
	key: "PE1",
	sortkey: "14"
});

oSDASHM3JsonProcesses.push({
	text:"Pre-del Estimate",
	key: "PE2",
	sortkey: "15"
});

oSDASHM3JsonProcesses.push({
	text:"Pre-del Estimate",
	key: "PE3",
	sortkey: "16"
});

oSDASHM3JsonProcesses.push({
	text:"Pre-del Estimate",
	key: "PE4",
	sortkey: "17"
});

oSDASHM3JsonProcesses.push({
	text:"Pre-del Estimate",
	key: "PE5",
	sortkey: "18"
});
oSDASHM3JsonProcesses.push({
	text:"Gate OUT",
	key: "GO",
	sortkey: "19"
});

oSDASHM3JsonProcesses.push({
	text:"Superseding Estimate",
	key: "SU",
	sortkey: "20"
});

oSDASHM3JsonProcesses.push({
	text:"Pre-sale Estimate",
	key: "PS",
	sortkey: "21"
});
