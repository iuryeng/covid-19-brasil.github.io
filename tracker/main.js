
const json_data = ("covid.json");
const  xlabels =[];
const ylabels=[];  
createChart();

// function for construct chart 
async function createChart() {	
	await getDateChart();
	const ctx = document.getElementById('covidChart').getContext('2d');
	const myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: xlabels,
	        datasets: [
		        {
		        	fill: false,
		            label: 'Casos Confirmados',
		            data: ylabels,
		            backgroundColor: 'rgba(255, 99, 132, 0.2)',
		            borderColor: 'rgba(255, 99, 132, 1)',
		            borderWidth: 2
		        }
	        ]
	    },
	    options: {
	        responsive: true,
	        maintainAspectRatio: true,

	    }
	});
}

// function for get date chart labels 
async function getDateChart() {
	const response = await fetch(json_data);
	const data = await response.json();
	for (var i = 0; i< data.length; i++){
			xlabels.push((data[i]["estado"]));
			ylabels.push((data[i]["casosConfirmados"]));	
	}	
}

// function for get date and table populate
$(document).ready(function(){
	$.getJSON("covid.json", function(data){
		var covid_data = "";
		$.each(data,function(key, value){
			covid_data += '<tr>';
			covid_data += '<td>'+ value.uf + '</td>';
			covid_data += '<td>'+ value.estado + '</td>';
			covid_data += '<td>'+ value.casosConfirmados + '</td>';
			covid_data += '<td>'+ value.obitos + '</td>';
			covid_data += '</tr>';
		});
		$('#covid-table').append(covid_data);
	});
});
