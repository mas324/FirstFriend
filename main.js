function initMap() 
{
    /**
    * Location Markers
    */
    const markers = [
        {
            locationName: 'Buffalo Wild Wings',
            lat: 33.84704377381986,
            lng: -118.26232920580917,
            address: '736 E Del Amo Blvd,<br> Carson,<br> CA 90746'
        },

        {
            locationName: "King's Hawaiian Bakery and Restaurant",
            lat: 33.82273667628008,
            lng: -118.33484004489458,
            address: '2808 Sepulveda Blvd,<br> Torrance,<br> CA 90505'
        },

        {
            locationName: 'In-N-Out Burger',
            lat: 33.84906843854013,
            lng: -118.3531026145534,
            address: '20150 Hawthorne Blvd,<br> Torrance,<br> CA 90503'
        },

        {
            locationName: "Raising Cane's Chicken Fingers",
            lat: 33.88743971085504,
            lng: -118.31484761187828,
            address: '2063 W Redondo Beach Blvd,<br> Gardena,<br> CA 90247'
        },

        {
            locationName: 'Starbucks',
            lat: 33.90231366490993,
            lng: -118.30012962900614,
            address: '1346 Rosecrans Ave,<br> Gardena,<br> CA 90247'
        }
    ];
    // the tutorial labels the marker differently
    const flagMarker = 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/128/Map-Marker-Flag-1-Right-Pink-icon.png';

    const centerMap = { lat: 33.86241175245972, lng: -118.25441117081957 }

    const mapOptions = {
        center: centerMap,
        zoom: 10,
        disableDefaultUI: true,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 65
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": "50"
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "30"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "40"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#ffff00"
                    },
                    {
                        "lightness": -25
                    },
                    {
                        "saturation": -97
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "lightness": -25
                    },
                    {
                        "saturation": -100
                    }
                ]
            }
        ]
    }

    const map = new google.maps.Map(document.getElementById('google-map'), mapOptions)

    const infoWindow = new google.maps.InfoWindow({
        minWidth: 200,
        maxWidth: 200
    });

    const bounds = new google.maps.LatLngBounds();

    /**
     * Loop through all markers.
     * 
     * side note:
     * changed function createInfoWindows() {
                    const infoWindowContent = '
                        <div class="feh-content">
                            <h3>${Name[i]['locationName']}</h3>
                            <address>
                            <p>${Name[i]['address']}</p>
                            </address>
                        </div>
                ';
     */
    for(let i = 0; i < markers.length; i++)
    {
        const marker = new google.maps.Marker({
            position: { lat: markers[0]['lat'], lng: markers[0]['lng'] },
            map: map,
            icon: flagMarker
        });

        function createInfoWindows() {
            const infoWindowContent = 
                <div class="feh-content">
                    <h3>${Name[i]['locationName']}</h3>
                    <address>
                        <p>${Name[i]['address']}</p>
                    </address>
                </div>
            ;
            

            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent(infoWindowContent);
                infoWindow.open(map, marker);
            });

        }
        createInfoWindows();

        infoWindow.addListener('closeclick', function() {
            map.fitBounds(bounds);
        })

        bounds.extends(new google.maps.LatLng(markers[i]['lat'], markers[i]['lng']));
        map.fitBounds(bounds);
    }

}

// https://snazzymaps.com to stylize map