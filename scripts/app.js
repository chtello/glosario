document.addEventListener('DOMContentLoaded', function() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const glossaryDiv = document.getElementById('glossary');
    alphabet.split('').forEach(letter => {
        const letterSection = document.createElement('div');
        letterSection.id = `letter-${letter}`;
        letterSection.innerHTML = `<h3>${letter}</h3>`;
        glossaryDiv.appendChild(letterSection);
    });

    document.getElementById('add-word-form').addEventListener('submit', function(event) {
        event.preventDefault(); 
        const wordEs = document.getElementById('wordEs').value.toUpperCase();
        const firstLetter = wordEs.charAt(0);
        const letterSection = document.getElementById(`letter-${firstLetter}`);
        if (letterSection) {
            const newWord = document.createElement('p');
            newWord.textContent = wordEs;
            letterSection.appendChild(newWord);
        }
        document.getElementById('wordEs').value = '';
    });
});
