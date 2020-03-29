
const json_data = ("covid.json");
const  xlabels =[];
const ylabels=[];  
const yobitos=[];

createChart();

// function for construct chart 
async function createChart() {	
	await getDateChart();
	const ctx = document.getElementById('covidChart').getContext('2d');
	const myChart = new Chart(ctx, {
	    type: 'line',
	    data: {	        
	        datasets: [{   
		        label: 'Confirmados',
		        data: ylabels,
		        fill:false,
		        backgroundColor: 'mediumturquoise',
		        borderColor: 'mediumturquoise',
		        borderWidth: 3		          
		    },{
		        label: 'Óbitos',
		        data: yobitos,                
		        type:'line',
		        fill:false,
		        backgroundColor: 'lightcoral',
		        borderColor: 'lightcoral',
		        borderWidth: 3	
	        }],
	        labels:xlabels
	    },
	    options: {
	        responsive: true,
	        maintainAspectRatio: false,
	         layout: {
            padding: {
                left: 50,
                right: 50,
                top: 0,
                bottom: 0
            }
        }
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
			yobitos.push((data[i]["obitos"]));
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
