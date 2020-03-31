
const json_data = ("covid.json");
const json_data_occurrence = ("occurrence.json");
const json_data_region = ("casos_regiao.json");
const xlabels =[];
const ylabels=[];  
const yobitos=[];
const xlabelsOccurrence = [];
const ylabelsOccurrence = [];
const labelsRegion = [];
const labelsRegionCases = [];
const labelsRegionDeads = [];
let numEstados = 0;
let maiorNumObitos = 0;
let estadoObitos = [];
let estadoMaiorObtito ="";



$(document).ready(function(){ // populando a tabela de dados a partir do arquivo json
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



async function createChart() { // funcao para construir o chart covid
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
		        borderWidth: 2		          
		    },{
		        label: 'Obitos',
		        data: yobitos,                
		        type:'line',
		        fill:false,
		        backgroundColor: 'lightcoral',
		        borderColor: 'lightcoral',
		        borderWidth: 2	
	        }],
	        labels:xlabels,
	      
	    },
	    options: {
	        responsive: true,
	        maintainAspectRatio: false,
	        title: {
            display: true,
            text: 'Especifição dos casos por UF',
            fontSize: 25,
            fontColor:'rgb(52,60,73)'
        },
	        layout: {
	            padding: {
	                left: 50,
	                right: 50,
	                top: 50,
	                bottom: 0
                }
            }
	    }
	});
}



async function createChartOccurrence(){ // funcao para construir o chart de ocorrencias diarias
	await getDateOccurrence();
const ctx = document.getElementById('occurrenceChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: xlabelsOccurrence,
        datasets: [{
            label: 'Casos Novos',
            data: ylabelsOccurrence,
            backgroundColor:'rgba(54, 162, 235, 1)',
            borderColor:'rgba(54, 162, 235, 1)'
          
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            display: true,
            text: 'Evolução dos casos informados por dia',
            fontSize: 25,
            fontColor:'rgb(52,60,73)'
        },
        layout: {
	        padding: {
	            left: 50,
	            right: 50,
	            top: 40,
	            bottom: 0
            }
        }

    }
 });
}

async function createChartRegion(){ // funcao para construir o chart de classificação de casos por região
	await getDateRegion();
	const ctx = document.getElementById('regionChart').getContext('2d');
	const myHorizontalChart = new Chart(ctx, {
	    type: 'horizontalBar',
	    data: {	        
	        datasets: [{   
		        label: 'Confirmados',
		        data: labelsRegionCases,
		        fill:false,
		        backgroundColor: 'mediumseagreen',
		        borderColor:'mediumseagreen'		                 
		    },{
		        label: 'Óbitos',
		        data: labelsRegionDeads,                
		        type:'horizontalBar',
		        fill:false,
		        backgroundColor: 'gray',
		        borderColor: 'gray',
		        borderWidth: 2	
	        }],
	        labels:labelsRegion,	      
	    },
	    options: {
		responsive: true,
	        maintainAspectRatio: false,
	    	title: {
	            display: true,
	            text: 'Classificação dos casos por região',	            
	            fontSize: 25,
	            fontColor:'rgb(52,60,73)'
            }, 
		    layout: {
		        padding: {
		            left: 40,
		            right: 50,
		            top: 50,
		            bottom: 50
	            }
	        }
	    }   	      

	});
}


async function getDateRegion(){ // funcao para capurar do arquivo json os dados do grafico de ocorrencias por regiao
	const response = await fetch(json_data_region);
	const data = await response.json();
	for (var i = 0; i< data.length; i++){
		labelsRegion.push((data[i]["regiao"]));
		labelsRegionCases.push((data[i]["casos"]));	
		labelsRegionDeads.push((data[i]["mortes"]));			
	}	
}



async function getDateOccurrence(){ // funcao para capurar do arquivo json os dados do grafico de ocorrencias por dias epidemologicos
	const response = await fetch(json_data_occurrence);
	const data = await response.json();
	for (var i = 0; i< data.length; i++){
		xlabelsOccurrence.push((data[i]["dia"]));
		ylabelsOccurrence.push((data[i]["ocorrencia"]));			
	}	
}



async function getDateChart() { // funcao para capurar do arquivo json os dados do grafico de casos e obtos por estado 
	const response = await fetch(json_data);
	const data = await response.json();
	for (var i = 0; i< data.length; i++){
			xlabels.push((data[i]["estado"]));
			ylabels.push((data[i]["casosConfirmados"]));
			yobitos.push((data[i]["obitos"]));	
	}	
	numEstados = xlabels.length;
	
    function sum(arr, n) { // funcao para somar um array a partir de um intervalo n 
	    var sum = 0;
	    for (var i = 0; i < n; i++) {
	        sum += arr[i];
	    }
	    return sum; 
	}
	"use strict";
	numConfirmados = sum(ylabels,numEstados); // somando numero de casos confirmados
	numMortos = sum(yobitos,numEstados); // somando numero de obitos 
	maiorNumObitos = Math.max(...yobitos); //maior numero de mortos -- numero maximo de um array    
	data.forEach(function(x) { //separando numero de obitos por estado
		estadoObitos[x.obitos] = x.uf;
	});
	estadoMaiorObtito = estadoObitos[maiorNumObitos]; //capturando o estado com maior obito	
    document.getElementById("num-confirmado").innerHTML = numConfirmados; //imprimindo numero de confirmados no top menu
    document.getElementById("num-obito").innerHTML = numMortos;	//imprimindo numero de mortos no top menu
    document.getElementById("maior-letalidade").innerHTML = `${estadoMaiorObtito}: ${maiorNumObitos}`; //imprimindo esatdo com maior letalidade
}


createChart();
createChartOccurrence();
createChartRegion();
