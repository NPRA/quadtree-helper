
var map = L.map('map', {
    tapTolerance: 15
});


// create the tile layer with correct attribution
// var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
// var osm = new L.TileLayer( osmUrl );

L.tileLayer('https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',{//'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
  maxZoom: 18
}).addTo(map);

L.control.geocoder('search-fljxAAA').addTo(map);

// start the map in South-East England
map.setView( new L.LatLng( 51.5072, 0.1275 ), 4 );

$(document).ready(function() {
  $('#buttons button').on('click', function(event) {
    //$('#buttons button').removeClass('active');
    //$(event.target).addClass('active');
    if(event.target.id == 'copytiles')
	{	
		navigator.clipboard.writeText(document.getElementById('tiles').innerHTML);
		alert("Tile list copied to the clipboard");
	}
	else
		changeHashFunction( event.target.id );
	
	if(event.target.id == 'entertilesshow')
	{
		document.getElementById("txt-enter").style.visibility = "visible";
	}
  });
  
  $('#txt-enter button').on('click', function(event) {
	
	if(event.target.id == 'setTiles')
	{
		
		var list = document.getElementById("entertilearea").value;
		enterTiles(list);
		
	}
  });
  
  function enterTiles(text){
	var list = text+",";
	var regex = /(([0-3])+,)+$/;
	if(list.match(regex) != null) //valid qtree list
	{
		list = list.substring(0,list.length-1);
		enterHash(list);
		document.getElementById("txt-enter").style.visibility = "hidden";
	}
	else //not valid
	{
		alert("Wrong input format. The format is tiles separated by a comma, with no spaces and no comma at the end. </br>Example: 0102013,00123122,12212")
	}
  }
  
  //enable sending tiles in the url
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.has('quadtree')) {
	const qt = urlParams.get('quadtree');
	document.getElementById('buttons').style.visibility='hidden';
	document.getElementById('txt-enter').style.visibility='hidden';
	enterTiles(qt);
  }
  
  $("#map").keydown(function (e)  
  {  
	if (e.ctrlKey && (e.key === 'v')) {
		navigator.clipboard.readText().then(
			clipText => enterTiles(clipText));
		
	}
	if (e.ctrlKey && (e.key === 'c')) {
		navigator.clipboard.writeText(document.getElementById('tiles').innerHTML);
	}
  });
});
