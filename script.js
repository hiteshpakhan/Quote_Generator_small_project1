const quoteContainer = document.getElementById('quote-container');    //this will cover the container
const quoteText = document.getElementById('quote');     //this is for the quote be written
const authorText = document.getElementById('author');       //this is where the author name will be displayed
const twitterBtn = document.getElementById('twitter');      //this the twitter button 
const newQuoteBtn = document.getElementById('new-quote');       //this is the new quote button

let apiQuots = [];

function newQuote() {
    // to pick the randome number 
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    quoteText.textContent = quote.text;
    
    if(!quote.author){    //it will check wheather the author name present or not
        authorText.textContent = "unknown";
    } else {
        authorText.textContent = quote.author;
    }

    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
}

async function getQuots(){
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();   //we already assign the apiQuotes as a globle variable
        newQuote();  //it will bring the any single quote out of them all
    }catch(error){
        console.log(error);
    }
}

function tweetQuote(){
    const twitterUrl = "https://twitter.com/intent/tweet?text="+quoteText.textContent+"-"+authorText.textContent;   //there the url that we copyed from the twitter site 
    // const twitterUrl = `https://twitter.com/intent/tweet=${quoteText.textContent}-${authorText.textContent}`;
    window.open(twitterUrl,'_blank');   //it will open the url into another page
}

//event listener
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

getQuots();


// // ----------another method is this following:
// const getQuots = async () =>{
//     const response =await fetch('https://type.fit/api/quotes');
//     const apiQuots = await response.json();
//     return console.log(apiQuots[12]);
// }
// getQuots();