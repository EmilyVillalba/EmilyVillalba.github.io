const amiiboContainer = document.querySelector(`.js-amiibo-container`);
const form = document.querySelector(`.js-form`);
const amiiboInput = document.querySelector(`[name=amiiboName]`);

function loadAmiibos(amiiboName) {
    fetch(`https://amiiboapi.com/api/amiibo/`)
        .then(response => response.json())
        .then(data => {
            let amiibos = data.amiibo;

            // Filter the results based on the user's input
            let filteredAmiibos = amiibos.filter(amiibo => 
                amiibo.name.toLowerCase().includes(amiiboName.toLowerCase())
            );
            amiiboContainer.innerHTML = filteredAmiibos.length > 0 
            ? filteredAmiibos.map(amiibo => `
                <div class="amiibo-item">
                    <h2>${amiibo.name}</h2>
                    <img src="${amiibo.image}" alt="${amiibo.name}">
                    <p><h3>Character Name: ${amiibo.character}</h3></p>
                    <p><h3>Game Series: ${amiibo.gameSeries}</h3></p>
                    <p><h3>Image Type: ${amiibo.type}</h3></p>
                    <p><h3>Release Dates:</h3></p>
                    <ul>
                        <li><h3>Australia: ${amiibo.release.au || "N/A"}</h3></li>
                        <li><h3>Europe: ${amiibo.release.eu || "N/A"}</h3></li>
                        <li><h3>Japan: ${amiibo.release.jp || "N/A"}</h3></li>
                        <li><h3>USA: ${amiibo.release.na || "N/A"}</h3></li>
                    </ul>
                </div>
            `).join("")
            : '<p class="error-message">Sorry, we did not find an Amiibo with that name...</p>';
    })
    .catch(err => {
        console.error(err);
        amiiboContainer.innerHTML = '<p class="error-message">Failed to fetch data. Please try again later.</p>';
    });
}
function formSubmitted(event) {
event.preventDefault();
const amiiboName = amiiboInput.value.trim();

if (amiiboName === "") {
    amiiboContainer.innerHTML = '<p class="error-message">Please enter a valid Amiibo name.</p>';
    return;
}

loadAmiibos(amiiboName);
}

form.addEventListener('submit', formSubmitted);   
