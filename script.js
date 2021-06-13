const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const quoteAuthor = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

// loading
function loading() {
    loader.hidden = false
    quoteContainer.hidden = true
}

// loading finished
function complete() {
    loader.hidden = true
    quoteContainer.hidden = false
}

// fetch quote from api
async function fetchQuote() {
    // api url
    const url = 'https://api.quotable.io/random'
    try {
        // send request to api
        const response = await fetch(url)
        // format response to json
        return await response.json()
    } catch (error) {
        console.error({ fetchQuoteError: error.message })
    }
}

// set quote
async function newQuote() {
    loading()
    // fetch a random quote
    const quote = await fetchQuote()
    console.log({ quote })
    // set author name and check if author is null
    quoteAuthor.textContent = quote.author || 'Unknown'
    // set quote style considering quote length
    if (quote.length > 100) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // set quote, hide loader
    quoteText.textContent = quote.content
    complete()
}

// tweet quote
function tweetQuote() {
    const url = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`
    // open in new window
    window.open(url, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

newQuote()
