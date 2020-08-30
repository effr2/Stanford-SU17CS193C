// I've included both the universities full names and their nicknames
// use the nicknames for this assignment.  I've included the full names
// so those who aren't familiar with Bay Area universities will know
// what the names of the universities actually are.

var univArray = new Array(
		{name: "Stanford University", nickname: "Stanford", ownership: "private", SATh: 1570, SATl: 1380, tuition: 44757},
		{name: "University of California, Berkeley", nickname: "UC Berkeley", ownership: "public", SATh: 1500, SATl: 1250, tuition: 13844},
		{name: "University of California, Santa Cruz", nickname: "UC Santa Cruz", ownership: "public", SATh: 1280, SATl: 1000, tuition: 13398},
		{name: "San Francisco State University", nickname: "SFSU", ownership: "public", SATh: 1110, SATl: 880, tuition: 6468},
		{name: "San Jose State University", nickname: "SJSU", ownership: "public", SATh: 1160, SATl: 880, tuition: 9496},
		{name: "Sonoma State University", nickname: "Sonoma State", ownership: "public", SATh: 1090, SATl: 880, tuition: 7276},
		{name: "California State University, East Bay", nickname: "CalState East Bay", ownership: "public", SATh: 1010, SATl: 800, tuition: 6550, room: 6435},
		{name: "University of San Francisco", nickname: "USF", ownership: "private", SATh: 1270, SATl: 1070, tuition: 41450},
		{name: "Santa Clara University", nickname: "SCU", ownership: "private", SATh: 1380, SATl: 1190, tuition: 43812},
		{name: "Mills College", nickname: "Mills College", ownership: "private", SATh: 1250, SATl: 1040, tuition: 42918}
		);
var searchQuery = {ownership: "public", maxTuition: 0, maxSAT: 0, minSAT: 0};
var tableEmpty = true;

function setOwnership(){
	for(radioButton of document.getElementsByName("ownershipSelect")){	
		if(radioButton.checked){
			searchQuery["ownership"] = radioButton.value;
		}
	}
}

function createQuery() {
	var tuitionCost = document.getElementById("maxTuition").value;
	var maxSATScore = document.getElementById("maxSAT").value;
	var minSATScore = document.getElementById("minSAT").value;

	if(tuitionCost){
		searchQuery["maxTuition"] = parseInt(tuitionCost);
	}
	if(maxSATScore){
		searchQuery["maxSAT"] = parseInt(maxSATScore);
	}
	if(minSATScore){
		searchQuery["minSAT"] = parseInt(minSATScore);
	}
}

function isMatch(university){
	setOwnership();
	if( (university["tuition"] <= searchQuery["maxTuition"] ||
		searchQuery["maxTuition"] == 0)  &&
		(university["SATh"] <= searchQuery["maxSAT"]  ||
		searchQuery["maxSAT"] == 0) &&
		(university["SATl"] >= searchQuery["minSAT"] ||
		searchQuery["minSAT"] == 0) &&
		(searchQuery["ownership"] == "don't care" ||
		searchQuery["ownership"] == university["ownership"])){
			return true;
	}

	return false;
}

function clearTable(){
	var node = document.getElementById("tableBody");
	while (node.hasChildNodes()) {
		node.removeChild(node.lastChild);
	}
}
function fillTable(){
	var rowNum = 0;
	var univTable = document.getElementById("univTable").getElementsByTagName('tbody')[0];
	
	clearTable();
	
	for(univ of univArray){
		if(isMatch(univ)) {
			var row = univTable.insertRow(rowNum);
			
			if(rowNum % 2 != 0){
				row.className = "oddRow";
			}
			else{
				row.className = "univRow";
			}

			cell1 = row.insertCell(0);
			cell2 = row.insertCell(1);
			cell3 = row.insertCell(2);
			cell4 = row.insertCell(3);
			cell1.innerHTML = univ["nickname"];
			cell2.innerHTML = univ["SATh"];
			cell3.innerHTML = univ["SATl"];
			cell4.innerHTML = univ["tuition"];
			rowNum +=1;
			}
		}
}

function clearQuery(){
	searchQuery["ownership"] = "public";
	searchQuery["maxTuition"] = 0;
	searchQuery["maxSAT"] = 0;
	searchQuery["minSAT"] = 0;
}

function update(){
	createQuery();
	fillTable();
	clearQuery();
}

document.getElementById("updateButton").addEventListener("click",update,false);