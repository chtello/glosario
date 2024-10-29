document.addEventListener('DOMContentLoaded', function() {
    // Función para capitalizar la primera letra
    function capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    // Manejar el envío del formulario
    document.getElementById('add-word-form').addEventListener('submit', async function(event) {
        event.preventDefault(); 
        let wordEs = document.getElementById('wordEn').value.trim();
        
        // Capitalizar la primera letra de la palabra
        wordEs = capitalizeFirstLetter(wordEs);

        try {
            // Llamada a la API para obtener la definición de la palabra en español
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/es/${wordEs.toLowerCase()}`);
            
            if (!response.ok) {
                throw new Error('Error al obtener la definición'); // Manejo de errores si la respuesta no es 200
            }

            const data = await response.json();

            // Obtener la definición de la palabra
            const definition = data[0]?.meanings[0]?.definitions[0]?.definition || 'Definición no encontrada';

            // Crear una nueva fila en la tabla para la palabra y su definición
            const glossaryTable = document.getElementById('glossary-table').getElementsByTagName('tbody')[0];
            const newRow = glossaryTable.insertRow();

            const wordCell = newRow.insertCell(0);
            const definitionCell = newRow.insertCell(1);

            wordCell.textContent = wordEs;
            definitionCell.textContent = definition;

        } catch (error) {
            console.error("Error al obtener la definición:", error);
            alert("No se pudo obtener la definición. Intenta nuevamente.");
        }

        // Limpiar el campo de entrada
        document.getElementById('wordEn').value = '';
    });
});
