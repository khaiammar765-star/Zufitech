const PC_BUILDS = [
  { id: "corepro-1000", name: "CorePro 1000", basePrice: 2000, category: "gaming", badge: "Best Starter",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800",
    specs: "AMD Ryzen 5 7600 | RTX 4060 | 16 GB DDR5 | 1 TB NVMe SSD | 240mm AIO",
    upgradeGroups: {
      Memory: [{ label: "Upgrade to 32GB DDR5", price: 450 }],
      Storage: [{ label: "Add 2TB Secondary HDD", price: 250 }]
    }},
  { id: "strikepro-1500", name: "StrikePro 1500", basePrice: 3000, category: "gaming", badge: "",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800",
    specs: "AMD Ryzen 5 7600X | RTX 4060 Ti | 32 GB DDR5 | 1 TB NVMe SSD | 240mm AIO",
    upgradeGroups: {
      Memory: [{ label: "Upgrade to 64GB DDR5", price: 700 }],
      Storage: [{ label: "Upgrade to 2TB NVMe SSD", price: 400 }]
    }},
  { id: "zufipro-3000", name: "ZufiPro 3000", basePrice: 4000, category: "gaming", badge: "Most Popular",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
    specs: "Intel Core i7-14700K | RTX 4070 Ti | 32 GB DDR5 | 2 TB NVMe SSD | 360mm AIO",
    upgradeGroups: {
      Cooling: [{ label: "Lian Li LCD AIO Upgrade", price: 600 }],
      Storage: [{ label: "Upgrade to 4TB Gen4 NVMe", price: 900 }]
    }},
  { id: "nexus-elite", name: "Nexus Elite", basePrice: 5000, category: "gaming", badge: "",
    image: "https://images.unsplash.com/photo-1603481546238-487240415921?auto=format&fit=crop&q=80&w=800",
    specs: "Intel Core i7-14700KF | RTX 4080 | 32 GB DDR5 | 2 TB NVMe SSD | 360mm AIO",
    upgradeGroups: {
      Memory: [{ label: "Upgrade to 64GB DDR5", price: 700 }],
      Display: [{ label: "Add 4K 144Hz Monitor Bundle", price: 1800 }]
    }},
  { id: "zufi-studio", name: "ZufiStudio Pro", basePrice: 6000, category: "workstation", badge: "Creator Pick",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800",
    specs: "AMD Threadripper 7960X | RTX 4080 | 128 GB DDR5 ECC | 8 TB NVMe RAID | 420mm AIO",
    upgradeGroups: {
      Storage: [{ label: "Add 10G NAS Network Card", price: 550 }],
      Display: [{ label: "Dual 4K Monitor Stand Bundle", price: 1200 }]
    }},
  { id: "apex-server", name: "Apex Server X", basePrice: 20000, category: "server", badge: "Enterprise",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    specs: "Dual AMD EPYC 9354 | 256 GB DDR5 ECC | 8x 4TB NVMe RAID | Redundant 1600W PSU | IPMI Remote",
    upgradeGroups: {
      Memory: [{ label: "Upgrade to 512GB DDR5 ECC", price: 3000 }],
      Storage: [{ label: "Add 4x 8TB Enterprise HDD", price: 2500 }]
    }}
];

const ORDER_STATUSES = {
  pending:   { label: 'Pending Review', color: '#92400E', bg: '#FEF3C7', icon: '🟡' },
  building:  { label: 'Building',       color: '#1E40AF', bg: '#DBEAFE', icon: '🔧' },
  testing:   { label: 'Stress Testing', color: '#3730A3', bg: '#E0E7FF', icon: '🧪' },
  shipped:   { label: 'Shipped',        color: '#065F46', bg: '#D1FAE5', icon: '📦' },
  delivered: { label: 'Delivered',      color: '#14532D', bg: '#DCFCE7', icon: '✅' },
  cancelled: { label: 'Cancelled',      color: '#991B1B', bg: '#FEE2E2', icon: '❌' }
};

function formatStatus(status) {
  const s = ORDER_STATUSES[status] || ORDER_STATUSES.pending;
  return `<span class="badge badge-${status}">${s.icon} ${s.label}</span>`;
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString('en-MY', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function formatPrice(amount) {
  return 'RM ' + Number(amount || 0).toLocaleString('en-MY');
}

const ORDERS_KEY = 'zufitech_orders';

function _loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function _saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function getOrder(orderNumber) {
  return _loadOrders()[orderNumber] || null;
}

function updateOrderStatus(orderNumber, newStatus, note) {
  const orders = _loadOrders();
  const order = orders[orderNumber];
  if (!order) throw new Error('Order not found');
  order.statusHistory = order.statusHistory || [];
  order.statusHistory.push({ status: newStatus, note, timestamp: Date.now() });
  order.status = newStatus;
  order.updatedAt = Date.now();
  _saveOrders(orders);
}

function getAllOrders() {
  return Object.values(_loadOrders()).sort((a, b) => b.createdAt - a.createdAt);
}

function seedSampleOrders() {
  if (localStorage.getItem('zufitech_seeded_v2')) return;

  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const samples = [
    {
      orderNumber: 'ZT-7K2MQ', status: 'building',
      customerName: 'Aiman Hakim', customerPhone: '012-3456789',
      customerEmail: 'aiman@example.com', customerAddress: '12 Jalan Damai, 50000 Kuala Lumpur',
      buildId: 'zufipro-3000', buildName: 'ZufiPro 3000', buildCategory: 'gaming',
      buildSpecs: 'Intel Core i7-14700K | RTX 4070 Ti | 32 GB DDR5 | 2 TB NVMe SSD | 360mm AIO',
      basePrice: 4000, upgrades: [{ label: 'Upgrade to 4TB Gen4 NVMe', price: 900 }],
      totalPrice: 4900, customerNotes: 'Please cable-manage neatly.',
      createdAt: now - 2 * day, updatedAt: now - 1 * day,
      statusHistory: [
        { status: 'pending', note: 'Order received and pending review', timestamp: now - 2 * day },
        { status: 'building', note: 'Parts arrived, assembly started', timestamp: now - 1 * day }
      ]
    },
    {
      orderNumber: 'ZT-4XN8P', status: 'pending',
      customerName: 'Nurul Izzah', customerPhone: '019-8765432',
      customerEmail: 'nurul@example.com', customerAddress: '88 Lorong Kenanga, 11900 Bayan Lepas, Pulau Pinang',
      buildId: 'corepro-1000', buildName: 'CorePro 1000', buildCategory: 'gaming',
      buildSpecs: 'AMD Ryzen 5 7600 | RTX 4060 | 16 GB DDR5 | 1 TB NVMe SSD | 240mm AIO',
      basePrice: 2000, upgrades: [], totalPrice: 2000, customerNotes: '',
      createdAt: now - 6 * 60 * 60 * 1000, updatedAt: now - 6 * 60 * 60 * 1000,
      statusHistory: [
        { status: 'pending', note: 'Order received and pending review', timestamp: now - 6 * 60 * 60 * 1000 }
      ]
    },
    {
      orderNumber: 'ZT-9TBR3', status: 'delivered',
      customerName: 'Daniel Tan', customerPhone: '011-22334455',
      customerEmail: 'daniel@example.com', customerAddress: '5 Persiaran Setia, 40170 Shah Alam, Selangor',
      buildId: 'apex-server', buildName: 'Apex Server X', buildCategory: 'server',
      buildSpecs: 'Dual AMD EPYC 9354 | 256 GB DDR5 ECC | 8x 4TB NVMe RAID | Redundant 1600W PSU | IPMI Remote',
      basePrice: 20000, upgrades: [{ label: 'Upgrade to 512GB DDR5 ECC', price: 3000 }],
      totalPrice: 23000, customerNotes: 'For virtualization & web hosting.',
      createdAt: now - 10 * day, updatedAt: now - 3 * day,
      statusHistory: [
        { status: 'pending',   note: 'Order received and pending review',  timestamp: now - 10 * day },
        { status: 'building',  note: 'Rack assembly & RAID configuration', timestamp: now - 8 * day },
        { status: 'testing',   note: '48h burn-in test passed',            timestamp: now - 5 * day },
        { status: 'shipped',   note: 'Handed to courier',                  timestamp: now - 4 * day },
        { status: 'delivered', note: 'Delivered and signed for',           timestamp: now - 3 * day }
      ]
    }
  ];

  const orders = _loadOrders();
  samples.forEach(o => { orders[o.orderNumber] = o; });
  _saveOrders(orders);
  localStorage.setItem('zufitech_seeded_v2', '1');
}
