// Selektujemo HTML elemente 
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const countryInput = document.querySelector(".country-input");
const searchBtn = document.querySelector(".search-btn");
const searchContainer = document.querySelector(".search-country");


const renderCountry = function (data, className = "") {
    const html = `
    <article class="country ${className}">
            <img class="country__img" src="${data[0].flags.png}">
            <div class="country__data">
                <h3 class="country__name">${data[0].name.official}</h3>
                <h4 class="country__region">${data[0].region}</h4>
                <p class="country__row"><span>👫</span>${data[0].population.toLocaleString()}</p>
                <p class="country__row"><span>🗣</span>${Object.values(data[0].languages)[0]}</p>
                <p class="country__row"><span>💰</span>${Object.values(data[0].currencies)[0].name + " " 
                    + Object.values(data[0].currencies)[0].symbol}</p>
            </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
}

const getCountryData = function (country) {
     countriesContainer.innerHTML = '';

    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
        renderCountry(data)
        const neighbour = data[0].borders?.[0];
        return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
    })
    .then(response => response.json())
    .then(data => renderCountry(data, "neighbour"))
}
btn.addEventListener("click", function(){
    getCountryData("bosnia");
    searchContainer.style.display = "flex";
});

searchBtn.addEventListener('click', function() {
    const countryName = countryInput.value; 
    getCountryData(countryName);
});

countryInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const countryName = countryInput.value; 
        getCountryData(countryName);
    }
});
