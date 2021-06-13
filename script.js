const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const quoteAuthor = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let quotes = []

// loading
function loading() {
    loader.hidden = false
    quoteContainer.hidden = true
}

// loading finished
function complete() {
    quoteContainer.hidden = false
    loader.hidden = true
}

// fetch all quotes
async function fetchQuotes() {
    loading()
    const url = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(url)
        quotes = await response.json()
        newQuote()
    } catch (error) {
        console.log({ fetchQuotesError: error.message })
    }
}

// fetch a single quote
function fetchQuote() {
    // Pick a random quote from quotes array
    const index = Math.floor(Math.random() * quotes.length)
    return quotes[index]
}

// set quote
function newQuote() {
    loading()
    // fetch a single quote
    const quote = fetchQuote()
    // set author name and check if author field is blank and replace it with Unknown
    quoteAuthor.textContent = quote.author || 'Unknown'
    // check quote length to determine styling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // set quote and hide loader
    quoteText.textContent = quote.text
    complete()
}

// Tweet quote
function tweetQuote() {
    // configure tweet url
    const url = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`
    // open twitter page
    window.open(url, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// Load Quotes
fetchQuotes()
