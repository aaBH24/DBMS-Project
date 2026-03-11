// MASTER FUNCTION
async function showTab(e, tabId) {
    // Hides all the tables on screen 
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.style.display = 'none');
    
    // This removes any pre-exisitng active highlihghters around buttons in the navbar
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    // Shows selected tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) selectedTab.style.display = 'block';
    
    // Highlight active link 
    if (e && e.currentTarget) {
        e.currentTarget.classList.add('active');
    }

    // This calls the specific DQL routes in ther server file
    loadTableData(tabId);
}

// Builder Code
async function loadTableData(tabId) {
    const container = document.getElementById(tabId);
    
    try {
        // Fetches from the API route
        const response = await fetch(`/api/${tabId}`);
        const data = await response.json();

        if (data.length === 0) {
            container.innerHTML = `<h2>${tabId.toUpperCase()}</h2><p>No records found.</p>`;
            return;
        }

        // Build the Table dynamically
        let html = `<h2>${tabId.toUpperCase()} List</h2>`;
        html += `<table class="table table-striped table-dark mt-3"><thead><tr>`;
        
        // Use keys from the first object to create the headers
        Object.keys(data[0]).forEach(key => {
            html += `<th>${key.replace('_', ' ').toUpperCase()}</th>`;
        });
        html += `</tr></thead><tbody>`;

        // Create Rows
        data.forEach(row => {
            html += `<tr>`;
            Object.values(row).forEach(value => {
                html += `<td>${value || 'N/A'}</td>`;
            });
            html += `</tr>`;
        });

        html += `</tbody></table>`;
        container.innerHTML = html;

    } catch (err) {
        container.innerHTML = `<div class="alert alert-danger">Error connecting to server.</div>`;
        console.error("Fetch error:", err);
    }
}

// 3. Initial Load
window.onload = () => {

    // Passing a default null value upon load
    showTab(null, 'employee');
};