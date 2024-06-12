document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/glossary')
        .then(response => response.json())
        .then(data => renderGlossary(data));

    const form = document.getElementById('add-word-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const wordEs = document.getElementById('wordEs').value;

        fetch('/api/glossary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ wordEs }),
        })
        .then(response => response.json())
        .then(() => {
            // Reiniciar el formulario
            form.reset();
            // Volver a cargar el glosario
            return fetch('/api/glossary');
        })
        .then(response => response.json())
        .then(data => renderGlossary(data));
    });

    function renderGlossary(glossary) {
        const glossaryDiv = document.getElementById('glossary');
        glossaryDiv.innerHTML = '';
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        alphabet.forEach(letter => {
            const section = document.createElement('div');
            section.className = 'letter-section';
            section.innerHTML = `<h2>${letter}</h2>`;
            if (glossary[letter]) {
                glossary[letter].forEach(word => {
                    const wordDiv = document.createElement('div');
                    wordDiv.className = 'word';
                    wordDiv.innerHTML = `<span>${word.wordEs}</span>`;
                    section.appendChild(wordDiv);
                });
            }
            glossaryDiv.appendChild(section);
        });
    }
});
  