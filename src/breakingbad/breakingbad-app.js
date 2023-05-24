
/**
 * @returns {Promise<Object>} quote information
 */
const fetchQuote = async() => {
    //  Para realizar peticiones http, estaba el antiguo xhr
    // Y desde el ecma6 está el fetch()
    const res = await fetch('https://api.breakingbadquotes.xyz/v1/quotes'); // res = response
    // esta response es todo lo que devuelve, es decir, el 200, la forma, contenido...

    console.log(res);
    // veo las partes que tiene el response, para acceder al body:
    const data = await res.json(); // hago el await porque el json() es una promesa.
    console.log(data[0]);
    return data[0];
}


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakindBadApp = async( element ) => {
    // Lo ponemos en mayúsucla porque queremos que sea considerado la app como tal.
    // podria ser minúscula, pero es algo común en el uso de framworks.

    console.log('Holi');
    document.querySelector('#app-title').innerHTML = 'Breaking Bad app';
    
    element.innerHTML = 'Cargando datos..';
    // await fetchQuote();

    // Para mostrarlo:

    const quoteLabel = document.createElement('blockquote');
    const authorLabel = document.createElement('h3');
    const nextQuoteButton = document.createElement('button');
    nextQuoteButton.innerText = 'Next Quote';
    // Todavia esto no se está insertando en nigún sitio.

    const renderQuote = (data) => {
        quoteLabel.innerHTML = data.quote;
        authorLabel.innerHTML = data.author
        // Y lo añadimos al html
        element.replaceChildren(quoteLabel,authorLabel,nextQuoteButton);
    }

    nextQuoteButton.addEventListener( 'click', async() => {
        element.innerHTML = 'Cargando datos..';

        const quote = await fetchQuote();
        renderQuote(quote);
/*         nextQuoteButton.disabled = true;
        fetchQuote()
        .then( renderQuote); */
    })

    // Y llamo a la funcion:
    fetchQuote()
        .then( renderQuote);
}