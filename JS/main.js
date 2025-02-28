const amiiboContainer = document.querySelector(`.js-amiibo-container`);
let form = document.querySelector(`.js-form`);
let amiiboInput = document.querySelector(`[name=amiiboName]`);
let amiibo = document.getElementById("search-amiibos").value;


function loadAmiibos(amiiboName) {
  fetch(`https://amiiboapi.com/api/amiibo/`)
   .then(data => data.json())
   .then(response => {
    let amiibo = response.amiibo;

    amiiboContainer.innerHTML = amiibo
        .map(amiibo => `
            <div class="amiibo-item" data-id="${amiibo.character}">
             <h2>${amiibo.name}</h2>
             <img 
                src="${amiibo.image}" 
                alt="${amiibo.name}">
                <h3>
                    <p>Character Name: ${amiibo.character}</p>
                    <p>Game Series: ${amiibo.gameSeries}</p>
                    <p>Image Type: ${amiibo.type}</p>
                    <p>Release Dates:
                    <ul>
                        <li>Australia: ${amiibo.release.au}</li>
                        <li>Europe: ${amiibo.release.eu}</li>
                        <li>Japan: ${amiibo.release.jp}</li>
                        <li>USA: ${amiibo.release.na}</li>
                    </ul>
                </h3></p>
            </div>
        `)
        .join(``);
    })
        .catch(err => {
            console.warn(err);
            amiiboContainer.innerHTML = '<p class="error-message">Sorry we did not find an Amiibo with that name...</p>';  
    });
}


function searchAmiibos(amiiboName) {
    let inputValue = document.getElementById("search-amiibos").value;
    console.log(inputValue.value);
    let amiibo = document.getElementById("amiibo-item").value;
    
    for (i = 0; i < amiibo.length; i++) {
        let value = amiibo[i].getElementById("amiibo-item");

        if (value) {
            if (amiibo.length === 1) {
                searchbar = amiiboContainer.innerHTML
            }
             else { 
                return '<p class="error-message">Sorry we did not find an Amiibo with that name...</p>'; 
            }
        }
    }
}


function formSubmitted(event) {
    event.preventDefault();
    let amiiboName = amiiboInput;
    loadAmiibos(amiiboName);
}

form.addEventListener('submit', formSubmitted);


/*
https://amiiboapi.com/api/amiibo/

GET /api/amiibo/
      Return a list of amiibo available in the API.

GET /api/amiibo/?name=value
      Return the amiibo information base on it's name.

GET /api/amiibo/?id=value
      Return the amiibo information base on it's id.

GET /api/amiibo/?name=value&type=value
      Multiple filter is also possible. 

"amiibo": [
{
"amiiboSeries": "Animal Crossing",
"character": "Sandy",
"gameSeries": "Animal Crossing",
"head": "04380001",
"image": "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_04380001-03000502.png",
"name": "Sandy",
"release": {
"au": "2016-11-10",
"eu": "2016-11-11",
"jp": "2016-11-03",
"na": "2016-12-02"
},
"tail": "03000502",
"type": "Card"
},
*/