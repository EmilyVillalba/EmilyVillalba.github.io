const amiiboContainer = document.querySelector(`.js-amiibo-container`);
let form = document.querySelector(`.js-form`);
let amiiboInput = document.querySelector(`[name=amiibo-name]`);

function loadAmiibos() {
  fetch('https://amiiboapi.com/api/amiibo/')
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
                </h3>
                </p>
            </div>
        `)
        .join(``);
});
}