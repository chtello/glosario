document.addEventListener('DOMContentLoaded', function() {
    const glossaryTable = document.getElementById('glossary-table').getElementsByTagName('tbody')[0];

    document.getElementById('add-word-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        let wordInput = document.getElementById('wordInput').value.trim();
        wordInput = capitalizeFirstLetter(wordInput);
        
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

            const definitionEn = await getDefinition(wordEn, 'en');
            const definitionEs = await getDefinition(wordEs, 'es');
            const description = isSpanish ? definitionEs : definitionEn;

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

    function capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    async function translateToEnglish(wordEs) {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${wordEs}&langpair=es|en`);
        const data = await response.json();
        return data.responseData.translatedText;
    }

    async function translateToSpanish(wordEn) {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${wordEn}&langpair=en|es`);
        const data = await response.json();
        return data.responseData.translatedText;
    }

    async function getDefinition(word, lang) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${lang}/${word}`);
        const data = await response.json();
        return data[0]?.meanings[0]?.definitions[0]?.definition || "Definición no encontrada";
    }
});
    