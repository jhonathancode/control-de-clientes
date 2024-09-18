document.addEventListener('DOMContentLoaded', () => {
    const clientForm = document.getElementById('clientForm');
    const clientList = document.getElementById('clientList');

    // Fetch all clients on load
    fetchClients();

    clientForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        const client = { name, email, phone };
        
        // Add client to database
        const response = await fetch('/api/clients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(client)
        });
        const newClient = await response.json();

        addClientToList(newClient);
        clientForm.reset();
    });

    function addClientToList(client) {
        const li = document.createElement('li');
        li.innerHTML = `${client.name} (${client.email}) <button class="delete" data-id="${client._id}">Delete</button>`;
        clientList.appendChild(li);

        li.querySelector('.delete').addEventListener('click', () => {
            deleteClient(client._id, li);
        });
    }

    async function fetchClients() {
        const response = await fetch('/api/clients');
        const clients = await response.json();
        clients.forEach(client => addClientToList(client));
    }

    async function deleteClient(id, element) {
        await fetch(`/api/clients/${id}`, { method: 'DELETE' });
        element.remove();
    }
});
