/**
 * ZUFITECH ADVANCE ENGINE
 * Core Logic for Filtering, Dynamic Rendering, and Price Calculation
 */

// 1. ELEMEN DOM
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

// 2. INITIALIZATION (Jalankan bila website dibuka)
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all'); // Paparkan semua produk sebagai permulaan
    setupFilters();
});

// 3. SISTEM FILTERING
function setupFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Tukar gaya butang aktif
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Tapis produk
            const category = btn.getAttribute('data-filter');
            renderProducts(category);
        });
    });
}

// 4. RENDERING ENGINE (Fungsi Melukis UI)
function renderProducts(filter) {
    // Tapis data dari data.js
    const filteredData = filter === 'all' 
        ? pcProducts 
        : pcProducts.filter(pc => pc.category === filter);

    // Jika tiada produk
    if (filteredData.length === 0) {
        productGrid.innerHTML = `<p style="grid-column: 1/-1;">No systems found in this category.</p>`;
        return;
    }

    // Lukis Kad Produk
    productGrid.innerHTML = filteredData.map(pc => {
        
        // Render Group Upgrade (RAM, Storage, etc.)
        const upgradeHtml = Object.keys(pc.upgradeGroups).map(groupName => `
            <div class="config-group">
                <span class="group-title">${groupName.toUpperCase()}</span>
                ${pc.upgradeGroups[groupName].map(opt => `
                    <label class="upgrade-option">
                        <input type="checkbox" 
                               class="cb-${pc.id}" 
                               data-price="${opt.price}" 
                               data-label="[${groupName}] ${opt.label}"
                               onchange="updatePrice('${pc.id}')">
                        <span class="opt-label">${opt.label}</span>
                        <span class="opt-price">+RM ${opt.price}</span>
                    </label>
                `).join('')}
            </div>
        `).join('');

        return `
            <div class="pc-card">
                <img src="${pc.image}" alt="${pc.name}" class="card-image">
                <div class="card-header">
                    <h3>${pc.name}</h3>
                    <div class="specs-preview">${pc.specs}</div>
                </div>
                <div class="card-body">
                    <p class="description">${pc.description}</p>
                    <div class="config-menu">
                        ${upgradeHtml}
                    </div>
                </div>
                <div class="card-footer">
                    <span class="price-display">
                        RM <span id="total-${pc.id}">${pc.basePrice.toLocaleString()}</span>
                    </span>
                    <button class="btn btn-primary btn-full" onclick="checkout('${pc.id}')">
                        ORDER VIA WHATSAPP
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// 5. LOGIK HARGA LIVE
function updatePrice(pcId) {
    const pc = pcProducts.find(p => p.id === pcId);
    let total = pc.basePrice;
    
    // Cari semua checkbox yang ditanda untuk PC spesifik ini
    const checkboxes = document.querySelectorAll(`.cb-${pcId}:checked`);
    checkboxes.forEach(cb => {
        total += parseInt(cb.getAttribute('data-price'));
    });

    // Update nombor kat skrin
    const display = document.getElementById(`total-${pcId}`);
    display.innerText = total.toLocaleString();
}

// 6. WHATSAPP CHECKOUT
function checkout(pcId) {
    const pc = pcProducts.find(p => p.id === pcId);
    const finalPrice = document.getElementById(`total-${pcId}`).innerText;
    
    // Ambil senarai upgrade yang dipilih
    const selected = Array.from(document.querySelectorAll(`.cb-${pcId}:checked`))
                          .map(cb => cb.getAttribute('data-label'));

    let message = `*ZUFITECH ORDER CONFIRMATION*\n`;
    message += `---------------------------\n`;
    message += `*Model:* ${pc.name}\n`;
    message += `*Base Specs:* ${pc.specs}\n\n`;
    
    if (selected.length > 0) {
        message += `*Upgrades Selected:*\n`;
        selected.forEach(item => message += `- ${item}\n`);
        message += `\n`;
    }

    message += `*TOTAL ESTIMATE: RM ${finalPrice}*\n`;
    message += `---------------------------\n`;
    message += `Please contact me for the next step.`;

    const phone = "60139293619";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}