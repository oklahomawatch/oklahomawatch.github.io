var cities = [ 
{
"type": "Feature",
"properties": {
"name":"FOO",
"population":502,
"violent":1
},
"geometry": {
        "type": "Point",
        "coordinates": [33.8334343, -96.3872105]
        }
        },
  {
"type": "Feature",
"properties": {
"name":"BAR",
"population":4402,
"violent":3
},
"geometry": {
        "type": "Point",
        "coordinates": [34.774531, -96.6783449]
        }
        }
]

function getCity() {
    var thisCity = document.getElementById('citySelect').value;
    for (var i=0;i<cities.length;i++)
        if (thisCity == cities[i].properties.name) {
        console.log(thisCity); 
        $("#test").html(cities[i].properties.violent);
        var lat = cities[i].geometry.coordinates[0]
        var lng = cities[i].geometry.coordinates[1]
        console.log(lat, lng)
        map.setView(new L.LatLng(lat,lng), 10)   
        }
        else if (thisCity == "reset") {
        map.setView(new L.LatLng(35.62604706595698, -98.2012939453125), 7)
        $("#test").html('');
        }
    }
  
var map = L.map('map').setView([35.62604706595698, -98.2012939453125], 7);

L.tileLayer('http://a.tile.stamen.com/toner/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
}).addTo(map);

		function zoomToFeature(e) {
			map.fitBounds(e.target.getBounds());
		}

    function onEachFeature(feature, layer) {
            var legendContent = '<h1>' + feature.properties.name + '</h1>';
            
            function doIt() {
            $('#test').html(legendContent);
            $('#citySelect').val(feature.properties.name)
            var lat = feature.geometry.coordinates[0]
            var lng = feature.geometry.coordinates[1]
            map.setView(new L.LatLng(lat,lng), 10)              
            };
			
            if (feature.properties && feature.properties.legendContent) {
				legendContent += feature.properties.legendContent;
			}
            
            layer.on({
				click: doIt});
			};
        
var cityLayer = L.geoJson(cities, {
			pointToLayer: function (feature, latlng) {
				return L.marker(feature.geometry.coordinates);
			},
			onEachFeature: onEachFeature
		}).addTo(map);