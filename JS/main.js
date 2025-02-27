const amiiboContainer = document.querySelector(`.js-amiibo-container`);
let form = document.querySelector(`.js-form`);
let amiiboInput = document.querySelector(`[name=amiiboName]`);

function loadAmiibos(amiibo) {
  fetch(`https://amiiboapi.com/api/amiibo/`)
   .then(data => data.json())
   .then(response => {
    const amiibo = response.amiibo;

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
            amiiboContainer.innerHTML = '<p><h2>Sorry we did not find an Amiibo with that name.</h2></p>' 
                                        '<p><h2>Please try again or check spelling!</h2></p>';    
    });
}

function formSubmitted(event) {
    event.preventDefault();
    let amiibo = amiiboInput.value;
    loadAmiibos(amiibo);
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
*/