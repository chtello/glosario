document.addEventListener('DOMContentLoaded', function() {
    // Función para capitalizar la primera letra
    function capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    document.getElementById('add-word-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        let wordEn = document.getElementById('wordEn').value.trim();
        wordEn = capitalizeFirstLetter(wordEn);

        try {
            // Llamada a la API en inglés
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordEn.toLowerCase()}`);
            const data = await response.json();
            
            const definition = data[0]?.meanings[0]?.definitions[0]?.definition || 'Definition not found';

            // Agregar la palabra y definición a la tabla
            const glossaryTable = document.getElementById('glossary-table').getElementsByTagName('tbody')[0];
            const newRow = glossaryTable.insertRow();

            const wordCell = newRow.insertCell(0);
            const definitionCell = newRow.insertCell(1);

            wordCell.textContent = wordEn;
            definitionCell.textContent = definition;

        } catch (error) {
            console.error("Error retrieving definition:", error);
            alert("Failed to retrieve definition. Please try again.");
        }

        document.getElementById('wordEn').value = '';
    });
});
