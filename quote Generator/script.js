const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

function newQuote() {
    loading()
    //pick a random code from apiQuotes array
    // const quote=localQuotes[Math.floor(Math.random() * localQuotes.length)];
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if Author field is blank and replace with unknown
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    }
    else {
        authorText.textContent = quote.author;
    }

    // check Quote Length to determine styling
    quoteText.textContent = quote.text;
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('long-quote');
    }
    complete();
}

// Get Quote from API

async function getQuotess() {
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote()
    }
    catch (error) {
        // alert(error)
        // //catch error
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');

}

// Event Listener
newQuoteBtn.addEventListener('click', getQuotess);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotess();

// newQuote();