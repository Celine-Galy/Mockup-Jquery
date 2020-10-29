loadActors();
loadEpisodes();
loadQuotes();
loadDayQuotes();
let allActors = [];
let allEpisodes = [];
let allQuotes = [];
let allQuotesByAuthor = [];
let searchPerso = document.getElementById('searchPerso');
let searchEpisode = document.getElementById('searchEpisode');
let searchCitation = document.getElementById('select');


function loadActors() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        console.log('toto')
        tmpActors = JSON.parse(this.responseText);
        // allActors = tmpActors;
        showActors(tmpActors);


    }
    xhttp.open("GET", "https://www.breakingbadapi.com/api/characters");
    xhttp.send();
    console.log('envoyé');
}

searchPerso.addEventListener('keyup', e => {
    
    const searchStringPerso = e.target.value.toLowerCase();
    
    search(searchStringPerso);
});

function search(searchPersoValue) {
    
    console.log(searchPersoValue);
    allActors = actorList.querySelectorAll('.vignette');
   
    for (let item of allActors) {
        console.log('totu');
    console.log(item.name);
        if (!item.innerText.toLowerCase().includes(searchPersoValue)) {
            item.classList.add('hidden');
        } else {
            item.classList.remove('hidden');
        }
       
    }

};




function showActors(actors) {
    const actorList = document.getElementById('actorList');
    actorList.classList.add('row');
    const sectionAffichagePerso = document.getElementById('sectionAffichagePerso');

    for (let actor of actors) {

        const imgContainer = document.createElement('div');
        const actorImg = document.createElement('img');
        actorImg.src = actor.img;

        const actorElement = document.createElement('div');
        const actorPseudo = document.createElement('div');
        actorPseudo.innerText = actor.nickname;
        actorElement.classList.add('vignette');
        actorElement.innerText = actor.name;
        actorElement.id = actor.char_id;

        imgContainer.append(actorImg);
        actorElement.appendChild(actorImg);
        actorElement.appendChild(actorPseudo);
        actorList.appendChild(actorElement);
        actorElement.addEventListener('click',()=>{
            console.log('tot');
            sectionActeur.classList.add('hidden');
        
            let vignettePerso = document.createElement('div');
            vignettePerso.classList.add('affichageVignette');
            vignettePerso.innerHTML = '<img>'+ actor.img + '</img>'+ actor.name + actor.nickname;
            sectionAffichagePerso.append(vignettePerso);
        })
    }
}


function loadEpisodes() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        console.log('episode chargés')
        tmpEpisodes = (JSON.parse(this.responseText));
        showEpisodes(tmpEpisodes);
    }
    xhttp.open("GET", "https://www.breakingbadapi.com/api/episodes");
    xhttp.send();
    console.log('envoyé');
}
searchEpisode.addEventListener('keyup', e => {
    const searchString = e.target.value.toLowerCase();
    search_Episode(searchString);
});

function search_Episode(searchEpisode) {
    allEpisodes = episodeList.querySelectorAll('.episodeContainer');
    
    for (let item of allEpisodes) {

        if (!item.innerText.toLowerCase().includes(searchEpisode)) {
            item.classList.add('hidden');
        } else {
            item.classList.remove('hidden');
        }
    }
};

function showEpisodes(episodes) {
    const episodeList = document.getElementById('episodeList');
    for (let episode of episodes) {
        const episodeContainer = document.createElement('div');
        episodeContainer.classList.add('episodeContainer');
        const episodeElement = document.createElement('div');
        episodeElement.classList.add('listeEpisode');
        const episodeCharacters = document.createElement('div');
        episodeCharacters.classList.add('listePerso');
        episodeCharacters.innerHTML = '<h3>'+ 'Personnages :'+'</h3>' + '</br>' + episode.characters;

        episodeElement.innerHTML = '<h3>' + episode.title + '</h3>' + ' ' + '<p>Episode : ' + episode.episode + ' </p>' + '<p>Saison :'  + episode.season+ '</p>';
        episodeElement.id = episode.char_id;

        episodeContainer.append(episodeElement);
        episodeContainer.append(episodeCharacters);

        episodeList.append(episodeContainer);



    }
}
function loadQuotes() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        console.log('citations chargées');
         tmpQuotes =(JSON.parse(this.responseText));
        showQuotes(tmpQuotes);
    }
    xhttp.open("GET", "https://www.breakingbadapi.com/api/quotes");
    xhttp.send();
    console.log('envoyé');
}

function showQuotes(quotes) {

    const quoteList = document.getElementById('quoteList');

    for (let quote of quotes) {
        const newOption = document.createElement('option');
        newOption.classList.add('optionAuthor');
        const quoteElement = document.createElement('div');
        quoteElement.classList.add('blocCitation');
        newOption.innerText = quote.author;
        quoteElement.innerHTML = '<blockquote>'+ quote.quote + '</blockquote>';
        const quoteSeries = document.createElement('div');
        quoteSeries.innerHTML = '<cite>' +quote.series + '</cite>';

        quoteList.append(quoteElement);
        quoteElement.append(quoteSeries);
        searchCitation.append(newOption);

allQuotesByAuthor = document.querySelector('optionAuthor');

        newOption.addEventListener('click',()=>{
            quoteElement.classList.remove('blocCitation');
            quoteElement.classList.add('hidden');
            let displayCitation = document.createElement('div');
            displayCitation.classList.add('red');
            displayCitation.innerHTML = '<blockquote>'+quote.quote +'</blockquote>'+ quote.author;
            console.log(quote.quote);
            quoteList.appendChild(displayCitation);
            
})


}
}

//------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------------------

function loadDayQuotes() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        console.log('citations chargées');
        showDayQuotes(JSON.parse(this.responseText));
    }
    xhttp.open("GET", "https://www.breakingbadapi.com/api/quote/random");
    xhttp.send();
    console.log('envoyé');
}

function showDayQuotes(dayquotes) {
    const dayQuoteList = document.getElementById('dayQuote');
    for (let dayquote of dayquotes) {
        const dayQuoteElement = document.createElement('div');
        dayQuoteElement.innerHTML = '<blockquote>'  + dayquote.quote +'</blockquote>';
        const dayQuoteSeries = document.createElement('div');
        dayQuoteSeries.innerHTML = '<cite>'+ dayquote.series + '</cite>';
        dayQuoteElement.classList.add('dayquote');

        dayQuoteList.append(dayQuoteElement);
        dayQuoteElement.appendChild(dayQuoteSeries);
    }
}




/**boutons navigation */
let btnPerso = document.getElementById('btnPerso');
let btnEpisode = document.getElementById('btnEpisode');
let btnCitation = document.getElementById('btnCitation');
let sectionActeur = document.getElementById('sectionActeur');
let sectionEpisode = document.getElementById('sectionEpisode');
let sectionCitation = document.getElementById('sectionCitation');

btnEpisode.addEventListener('click', () => {
    sectionActeur.classList.add('hidden');
    sectionEpisode.classList.remove('hidden');
    sectionCitation.classList.add('hidden');
})
btnPerso.addEventListener('click', () => {
    sectionActeur.classList.remove('hidden');
    sectionEpisode.classList.add('hidden');
    sectionCitation.classList.add('hidden');
})
btnCitation.addEventListener('click', () => {
    sectionCitation.classList.remove('hidden');
    sectionEpisode.classList.add('hidden');
    sectionActeur.classList.add('hidden');
    
})


