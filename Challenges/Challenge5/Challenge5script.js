document.addEventListener("DOMContentLoaded", () => {
    fetch('/dropdown-data')
        .then(response => response.json())
        .then(data => {
            const categoryDropdown = document.getElementById('category');
            for (const category in data) {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryDropdown.appendChild(option);
            }
        });

    document.getElementById('category').addEventListener('change', (event) => {
        const selectedCategory = event.target.value;
        fetch('/get-options', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category: selectedCategory })
        })
            .then(response => response.json())
            .then(options => {
                const optionsDropdown = document.getElementById('options');
                optionsDropdown.innerHTML = '<option value="">--Select an option--</option>';
                options.forEach(option => {
                    const optElement = document.createElement('option');
                    optElement.value = option;
                    optElement.textContent = option;
                    optionsDropdown.appendChild(optElement);
                });
            });
    });
});
