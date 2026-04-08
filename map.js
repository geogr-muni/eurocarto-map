var map = L.map('map').setView([49.1951, 16.6068], 14); // Brno

map.attributionControl._attributions = {};
map.attributionControl.setPrefix();
map.zoomControl.setPosition('topleft');
L.control.scale({ imperial: false, maxwidth: 200 }).addTo(map);

// Background layer
/*
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
*/

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap & CARTO'
}).addTo(map);

// Create layer groups for different categories
var venueLayer = L.layerGroup();
var hotelsLayer = L.layerGroup();
var restaurantsLayer = L.layerGroup();
var cafesLayer = L.layerGroup();
var pubsLayer = L.layerGroup();
var transportLayer = L.layerGroup();
var sightseeingLayer = L.layerGroup();

// Data venues
var venues = [
    { name: "Conference Venue", lat: 49.2035750, lon: 16.5976983 },
    { name: "Workshops", lat: 49.2041900, lon: 16.5980900 },
    { name: "Workshops", lat: 49.2049144, lon: 16.5972925 },
    { name: "Welcome Reception", lat: 49.2082144, lon: 16.5922825 },
    { name: "Gala Dinner", lat: 49.1910856, lon: 16.5934833 }
];

// Data hotels
var hotels = [
    { name: "Hotel Continental", lat: 49.2008372, lon: 16.6047236, url: "https://www.continentalbrno.cz/" },
    { name: "Hotel International", lat: 49.1949844, lon: 16.6054842, url: "https://www.hotelinternational.cz/" },
    { name: "Hotel Passage", lat: 49.2020472, lon: 16.6069742, url: "https://www.hotelpassage.eu/" },
    { name: "Grandhotel Brno", lat: 49.1925583, lon: 16.6131561, url: "https://grandhotelbrno.cz/" },
    { name: "OREA Congress Hotel Brno", lat: 49.1857186, lon: 16.5853642, url: "https://www.orea.cz/hotel-congress-brno" },
    { name: "Courtyard by Marriott Brno", lat: 49.1822556, lon: 16.6059447, url: "https://www.courtyardbrno.cz" },
    { name: "A-Austerlitz Hotel", lat: 49.1860228, lon: 16.5943789, url: "https://www.austerlitzhotel.cz" },
    { name: "Hotel Sharingham", lat: 49.1860853, lon: 16.5954553, url: "https://www.sharingham.cz" },
    { name: "Fairhotel", lat: 49.1858247, lon: 16.5871322, url: "https://www.fairhotel.cz" },
    { name: "Hotel Pyramida", lat: 49.1866667, lon: 16.5981619, url: "https://www.pyramidahotel.cz" }
];

// Data transport
var transport = [
    { name: "Hlavní nádraží (train)", lat: 49.1905822, lon: 16.6128025 },
    { name: "Hlavní nádraží (tram)", lat: 49.1910819, lon: 16.6119806, details: "-> Konečného náměstí, Nerudova: 12" },
    { name: "Konečného náměstí (trolleybus)", lat: 49.2050475, lon: 16.5958253, details: "-> Mendlovo náměstí: 25, 26" },
    { name: "Konečného náměstí (tram)", lat: 49.2039908, lon: 16.5960158, details: "-> Hlavní nádraží: 12" },
    { name: "Nerudova (tram)", lat: 49.2060050, lon: 16.5950717, details: "-> Hlavní nádraží: 12" },
    { name: "Mendlovo náměstí (trolleybus)", lat: 49.1898614, lon: 16.5931872, details: "-> Konečného náměstí: 25, 26" },
    { name: "Grand Hotel (bus long-distance)", lat: 49.1935158, lon: 16.6144772 },
    { name: "Zvonařka (bus long-distance)", lat: 49.1858217, lon: 16.6167317 },
]

// Data sightseeing
var sightseeing = [
    { name: "Špilberk castle", lat: 49.1944442, lon: 16.5993594, url: "https://podzemibrno.cz/en/mista/hrad-spilberk/" },
    { name: "Ossuary at St. James' church", lat: 49.1963336, lon: 16.6080114, url: "https://podzemibrno.cz/en/mista/kostnice-u-sv-jakuba/" },
    { name: "Water tanks", lat: 49.1957067, lon: 16.5913517, url: "https://podzemibrno.cz/en/mista/vodojemy-zluty-kopec/" },
]

// Data restaurants
var restaurants = [
    { name: "Everest Indie", lat: 49.2033717, lon: 16.5965519, url: "www.everestbrno.cz", desc: "Big portions for little money" },
    { name: "Pho Eden", lat: 49.2035833, lon: 16.5962469, url: "https://www.facebook.com/people/Pho-Eden", desc: "Best Pho in Brno, tends to be busy" },
    { name: "Chef Viet", lat: 49.2061636, lon: 16.5964289, url: "https://chefviet.cz/", desc: "Best for plan B, when Pho-Eden is full" },
    { name: "Siwa", lat: 49.2009106, lon: 16.6003492, url: "http://www.siwaorient.cz/", desc: "Oriental cuisine" },
    { name: "Pivní stáj", lat: 49.2011931, lon: 16.5999325, url: "https://www.pivnistaj.cz/", desc: "Good lunch burgers" },
    { name: "Mulgogi", lat: 49.2027014, lon: 16.5974736, url: "https://mulgogi.cz/", desc: "Korean cuisine" },
    { name: "Immigrant", lat: 49.2031617, lon: 16.5968136, url: "https://www.theimmigrant.cz/", desc: "When you feel like having a Guinness" },
    { name: "Oaza", lat: 49.1999564, lon: 16.6020278, url: "https://www.oaza-brno.cz/", desc: "Vegetarian" },
    { name: "Vegalite", lat: 49.2004122, lon: 16.6025428, url: "http://vegalite.cz/", desc: "Vegetarian" },
    { name: "Mitrovski", lat: 49.1881367, lon: 16.5888422, url: "www.mitrovski.cz" },
    { name: "AN wok & grill", lat: 49.1885022, lon: 16.5944053, url: "www.facebook.com/anwokgrill" },
    { name: "Pivovarská Mendlák s.r.o.", lat: 49.1909661, lon: 16.5927697, url: "https://www.pivovarska-starobrno.cz", desc: "Czech classics" },
    { name: "Bonjour Vietnam", lat: 49.1884711, lon: 16.5976431, url: "www.facebook.com/Bonjour-Vietnam" },
    { name: "Ramen Brno", lat: 49.1890425, lon: 16.5955769, url: "https://ramen-brno.cz/", desc: "Best Ramen in Brno, Open 11-14 and 17-20" },
]

// Data pubs
var pubs = [
    { name: "Mitrovski", lat: 49.1881367, lon: 16.5888422, url: "www.mitrovski.cz" },
    { name: "Pivovarská Mendlák s.r.o.", lat: 49.1909661, lon: 16.5927697, url: "https://www.pivovarska-starobrno.cz" },
    { name: "U všech svatých", lat: 49.1887736, lon: 16.5975906, url: "www.facebook.com/uvsechsvatych", desc: "Try the cherry liqueur with chili" },
    { name: "Immigrant", lat: 49.2031617, lon: 16.5968136, url: "https://www.theimmigrant.cz/", desc: "When you feel like having a Guinness" },
    { name: "Na dobré cestě", lat: 49.2028956, lon: 16.5984131, url: "http://jsmenadobreceste.cz/", desc: "Pub with atmosphere" },
]

//Data cafe
var cafes = [
    { name: "Sorry - pečeme jinak", lat: 49.1888186, lon: 16.5950008, url: "www.sorry-jinak.cz" },
    { name: "MARINĀDA", lat: 49.2010383, lon: 16.5961556, url: "http://www.marinada-store.cz/" },
    { name: "Punkt.", lat: 49.2061967, lon: 16.6019803, url: "https://www.facebook.com/" },
    { name: "Kafec", lat: 49.2035439, lon: 16.5935281, url: "https://www.kafec.cz/" },
]

function createAwesomeMarker(icon, markerColor) {
    return L.AwesomeMarkers.icon({
        icon: icon,
        prefix: 'fa',
        markerColor: markerColor
    });
}

// Helper to build content string
function buildContent(item) {
    var content = `<b>${item.name}</b>`;
    if (item.url) {
        // Ensure URL has http if missing for the href
        var link = item.url.startsWith('http') ? item.url : `https://${item.url}`;
        content += `<br><a href='${link}' target='_blank'>${item.url}</a>`;
    }
    if (item.details) content += `<br>${item.details}`;
    if (item.desc) content += `<br><i>Tip: ${item.desc}</i>`;
    return content;
}

// 1. Conference Venues (Keeping as Permanent Labels/Tooltips)
venues.forEach(function (venue) {
    L.marker([venue.lat, venue.lon], { icon: createAwesomeMarker('circle', 'red') })
        .bindTooltip(`<b>${venue.name}</b>`, { permanent: true, direction: 'top', offset: [0, -20], opacity: 0.8 })
        .addTo(venueLayer);
});

// 2. Transport (Popups)
transport.forEach(function (node) {
    L.marker([node.lat, node.lon], { icon: createAwesomeMarker('bus', 'cadetblue') })
        .bindPopup(buildContent(node), { className: 'transparent-popup', closeButton: false })
        .addTo(transportLayer);
});

// 3. Sightseeing (Popups)
sightseeing.forEach(function (landmark) {
    L.marker([landmark.lat, landmark.lon], { icon: createAwesomeMarker('landmark', 'green') })
        .bindPopup(buildContent(landmark), { className: 'transparent-popup', closeButton: false })
        .addTo(sightseeingLayer);
});

// 4. Hotels (Popups)
hotels.forEach(function (hotel) {
    L.marker([hotel.lat, hotel.lon], { icon: createAwesomeMarker('bed', 'darkblue') })
        .bindPopup(buildContent(hotel), { className: 'transparent-popup', closeButton: false })
        .addTo(hotelsLayer);
});

// 5. Restaurants (Popups)
restaurants.forEach(function (restaurant) {
    L.marker([restaurant.lat, restaurant.lon], { icon: createAwesomeMarker('utensils', 'darkpurple') })
        .bindPopup(buildContent(restaurant), { className: 'transparent-popup', closeButton: false })
        .addTo(restaurantsLayer);
});

// 6. Cafes (Popups)
cafes.forEach(function (cafe) {
    L.marker([cafe.lat, cafe.lon], { icon: createAwesomeMarker('mug-saucer', 'purple') })
        .bindPopup(buildContent(cafe), { className: 'transparent-popup', closeButton: false })
        .addTo(cafesLayer);
});

// 7. Pubs (Popups)
pubs.forEach(function (pub) {
    L.marker([pub.lat, pub.lon], { icon: createAwesomeMarker('beer-mug-empty', 'orange') })
        .bindPopup(buildContent(pub), { className: 'transparent-popup', closeButton: false })
        .addTo(pubsLayer);
});

// --- URL Parameter Logic ---
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get('layers') ? params.get('layers').split(',') : [];
}

var activeLayers = getUrlParams();
if (activeLayers.includes("hotels")) hotelsLayer.addTo(map);
if (activeLayers.includes("restaurants")) restaurantsLayer.addTo(map);
if (activeLayers.includes("pubs")) pubsLayer.addTo(map);
if (activeLayers.includes("transport")) transportLayer.addTo(map);
if (activeLayers.includes("sightseeing")) sightseeingLayer.addTo(map);
if (activeLayers.includes("venue")) venueLayer.addTo(map);
if (activeLayers.includes("cafes")) cafesLayer.addTo(map);

// Layer control
var overlayMaps = {
    "Conference Venues": venueLayer,
    "Hotels": hotelsLayer,
    "Restaurants": restaurantsLayer,
    "Pubs": pubsLayer,
    "Cafes": cafesLayer,
    "Sightseeing": sightseeingLayer,
    "Transport": transportLayer
};

L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);