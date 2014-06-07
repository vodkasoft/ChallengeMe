function drawReceivedChart(){
	var doughnutData = [
	{
	    value: 14,
	    color:"#92d050"
	},
	{
	    value : 4,
	    color : "#ed2024"
	},
	{
	    value : 2,
	    color : "#2e75b6"
	}];
	var myDoughnut = new Chart(document.getElementById("ReceivedCanvas").getContext("2d")).Doughnut(doughnutData);
}

function drawSentChart(){
	var doughnutData = [
	{
	    value: 5,
	    color:"#92d050"
	},
	{
	    value : 1,
	    color : "#ed2024"
	},
	{
	    value : 2,
	    color : "#2e75b6"
	}];
	var myDoughnut = new Chart(document.getElementById("SentCanvas").getContext("2d")).Doughnut(doughnutData);	
}