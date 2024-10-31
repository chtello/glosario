document.addEventListener('DOMContentLoaded', function() {
    const glossaryTable = document.getElementById('glossary-table').getElementsByTagName('tbody')[0];

    document.getElementById('add-word-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        let wordInput = document.getElementById('wordInput').value.trim();
        wordInput = capitalizeFirstLetter(wordInput);
        
        // Identificar el idioma de la palabra (simple detección: si contiene caracteres acentuados, asumimos español)
        const isSpanish = /[áéíóúüñ]/i.test(wordInput);
        
        try {
            let wordEn, wordEs;

            if (isSpanish) {
                wordEs = wordInput;
                wordEn = await translateToEnglish(wordEs);
            } else {
                wordEn = wordInput;
                wordEs = await translateToSpanish(wordEn);
            }

            // Obtener las definiciones en inglés y español
            const definitionEn = await getDefinition(wordEn, 'en');
            const definitionEs = await getDefinition(wordEs, 'es');
            const description = isSpanish ? definitionEs : definitionEn;

            // Añadir la palabra y sus traducciones/definiciones a la tabla
            const newRow = glossaryTable.insertRow();
            newRow.insertCell(0).textContent = wordEn;
            newRow.insertCell(1).textContent = wordEs;
            newRow.insertCell(2).textContent = description;

        } catch (error) {
            console.error("Error retrieving data:", error);
            alert("No se pudo obtener la definición. Inténtalo nuevamente.");
        }

        document.getElementById('wordInput').value = '';
    });

    // Función para capitalizar la primera letra
    function capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    // Función para traducir una palabra del español al inglés
    async function translateToEnglish(wordEs) {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${wordEs}&langpair=es|en`);
        const data = await response.json();
        return data.responseData.translatedText;
    }

    // Función para traducir una palabra del inglés al español
    async function translateToSpanish(wordEn) {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${wordEn}&langpair=en|es`);
        const data = await response.json();
        return data.responseData.translatedText;
    }

    // Función para obtener la definición en el idioma especificado
    async function getDefinition(word, lang) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${lang}/${word}`);
        const data = await response.json();
        return data[0]?.meanings[0]?.definitions[0]?.definition || "Definición no encontrada";
    }
});
    