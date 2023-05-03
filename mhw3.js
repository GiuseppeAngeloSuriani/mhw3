function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function onJsonCampionatoC(json) {
  console.log('JSON Season ricevuto');
  console.log(json);

  const library = document.querySelector('#championship-view');
  library.innerHTML = '';

  if (json.status == 400) {
	const errore = document.createElement("h1"); 
	const messaggio = document.createTextNode(json.detail); 
	errore.appendChild(messaggio); 
	library.appendChild(errore);
	return
  }

  const result = json.stages;
  const content = document.querySelector('#content').value;
  const year = document.querySelector("#year").value;

  for(let i=0; i < result.length; i++) {
    if(result[i].description === content + " " + year)
    {
      stage_id = json.stages[i].id;
      endpoint_stage = "https://api.sportradar.com/motogp/trial/v2/en/sport_events/" + stage_id + "/schedule.json?api_key=" + api_key;
      fetch(endpoint_stage).then(onResponse).then(onJsonGaraC);
    }
  }
}

function onJsonCampionatoP(json) {
  console.log('JSON Season ricevuto');
  console.log(json);
  sleep(500);
  const library = document.querySelector('#championship-view');
  library.innerHTML = '';

  if (json.status == 400) {
	const errore = document.createElement("h1"); 
	const messaggio = document.createTextNode(json.detail); 
	errore.appendChild(messaggio); 
	library.appendChild(errore);
	return
  }

  const result = json.stages;
  const content = document.querySelector('#content').value;
  const year = document.querySelector("#year").value;

  for(let i=0; i < result.length; i++) {
    if(result[i].description === content + " " + year)
    {
      stage_id = json.stages[i].id;
      endpoint_stage = "https://api.sportradar.com/motogp/trial/v2/en/sport_events/" + stage_id + "/summary.json?api_key=" + api_key;
      fetch(endpoint_stage).then(onResponse).then(onJsonFaseP);
    }
  }
}
  
function onJsonGaraC(json){
  console.log('JSON Gara ricevuto');
  console.log(json);

  const library = document.querySelector('#championship-view');
  library.innerHTML = '';

  if (json.status == 400) {
    const errore = document.createElement("h1"); 
    const messaggio = document.createTextNode(json.detail); 
    errore.appendChild(messaggio); 
    library.appendChild(errore);
    return
    }

  const result = json.stages;
  if(result.length === 0)
  {
	const errore = document.createElement("h1"); 
	const messaggio = document.createTextNode("Nessun risultato!"); 
	errore.appendChild(messaggio); 
	library.appendChild(errore);
  }
  
  for(let i=0; i < result.length; i++){
    const championship =document.createElement('div')
    championship.classList.add('championships');
	  const box1 = document.createElement('h2');
    box1.textContent = "GranPremio: " + result[i].description;
    const box2 = document.createElement('h2');
    box2.textContent = "Città: " + result[i].venue.city;
    const box3 = document.createElement('h2');
    box3.textContent = "Circuito: " + result[i].venue.name;
 
	  championship.appendChild(box1);
    championship.appendChild(box2);
    championship.appendChild(box3);
	  library.appendChild(championship);
  }
}

function onJsonFaseP(json){
  sleep(500);
  console.log('JSON Fase ricevuto');
  console.log(json);

  const library = document.querySelector('#championship-view');
  library.innerHTML = '';

  if (json.status == 400) {
    const errore = document.createElement("h1"); 
    const messaggio = document.createTextNode(json.detail); 
    errore.appendChild(messaggio); 
    library.appendChild(errore);
    return
    }

  const result = json.stage.competitors;

  if(result.length === 0)
  {
	const errore = document.createElement("h1"); 
	const messaggio = document.createTextNode("Nessun risultato!"); 
	errore.appendChild(messaggio); 
	library.appendChild(errore);
  }
  
  for(let i=0; i < result.length; i++) {
    competitor_id = result[i].id;
    var punteggio = result[i].result.points;
    if( max <= punteggio){
      max = punteggio;
      vincitore_id = result[i].id
    }
  }
  endpoint_competitor = "https://api.sportradar.com/motogp/trial/v2/en/competitors/" + vincitore_id + "/profile.json?api_key=" + api_key;
  fetch(endpoint_competitor).then(onResponse).then(onJsonPilota);
}

function onJsonPilota(json){
  console.log('JSON Vincitore ricevuto');
  console.log(json);

  const library = document.querySelector('#championship-view');
  library.innerHTML = '';

  if (json.status == 400) {
    const errore = document.createElement("h1"); 
    const messaggio = document.createTextNode(json.detail); 
    errore.appendChild(messaggio); 
    library.appendChild(errore);
    return
    }

  const result = json;
  if(result.length === 0)
  {
	const errore = document.createElement("h1"); 
	const messaggio = document.createTextNode("Nessun risultato!"); 
	errore.appendChild(messaggio); 
	library.appendChild(errore);
  }
  
  const championship =document.createElement('div')
  championship.classList.add('championships');
	const box1 = document.createElement('h2');
  if( result.competitor.name === undefined){
    result.competitor.name = 'Valore non presente nel database';
  }
  box1.textContent = "Nome: " + result.competitor.name;
  const box2 = document.createElement('h2');
  if( result.competitor.nationality === undefined){
    result.competitor.nationality = 'Valore non presente nel database';
  }
  box2.textContent = "Nazionalità: " + result.competitor.nationality;
  const box3 = document.createElement('h2');
  if( result.info.place_of_birth === undefined){
    result.info.place_of_birth = 'Valore non presente nel database';
  }
  box3.textContent = "Luogo di nascita: " + result.info.place_of_birth;
  const box4 = document.createElement('h2');
  if( result.info.date_of_birth === undefined){
    result.info.date_of_birth = 'Valore non presente nel database';
  }
  box4.textContent = "Data di nascita: " + result.info.date_of_birth;
  const box5 = document.createElement('h2');
  if( result.teams[0].name === undefined){
    result.teams[0].name = 'Valore non presente nel database';
  }
  box5.textContent = "Team: " + result.teams[0].name;
  const box6 = document.createElement('h2');
  if( result.info.debut === undefined){
    result.info.debut = 'Valore non presente nel database';
  }
  box6.textContent = "Anno di debutto: " + result.info.debut;

  championship.appendChild(box1);
  championship.appendChild(box2);
  championship.appendChild(box3);
  championship.appendChild(box4);
  championship.appendChild(box5);
  championship.appendChild(box6);
	library.appendChild(championship);

}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function search(event)
{
  event.preventDefault();

  const content = document.querySelector('#content').value;
  const year = document.querySelector("#year").value;
  sc.innerHTML='';

  if(content && year) {
      
    const tipo = document.querySelector('#tipo').value;
    console.log('Ricerco elementi di tipo: ' + tipo);
    console.log('Eseguo ricerca elementi riguardanti: ' + content + " " + year);    
      
    if(tipo === "Piloti"){

      fetch(endpoint_season).then(onResponse).then(onJsonCampionatoP);
    } else if(tipo === "Gare"){

          fetch(endpoint_season).then(onResponse).then(onJsonCampionatoC);
    }
  }
}

const form = document.querySelector('#search_content');
form.addEventListener('submit', search);

// Key
const api_key = 'q52bhs6k82924au4fwt4aycf';

// Endpoints
const endpoint_season = 'https://api.sportradar.com/motogp/trial/v2/en/seasons.json?api_key=' + api_key;

// Variables
var endpoint_stage;
var endpoint_competitor;
var stage_id;
var competitor_id;
var max = 0;
var vincitore_id;
