const pcProducts = [
    {
        id: "entry-rig",
        name: "The Entry Rig",
        basePrice: 2599,
        category: "gaming",
        // LINK GAMBAR BARU DI SINI
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80",
        specs: "AMD Ryzen 5 5600 | NVIDIA RTX 3060 12GB | 16GB DDR4 | 512GB NVMe SSD",
        description: "The perfect starting point for 1080p gaming and competitive esports titles at high settings.",
        upgradeGroups: {
            Ram: [
                { label: "Upgrade to 32GB DDR4 (2x16GB)", price: 250 }
            ],
            Storage: [
                { label: "Upgrade to 1TB NVMe SSD (Gen4)", price: 180 },
                { label: "Add secondary 2TB HDD", price: 120 }
            ]
        }
    },
    {
        id: "streamer-pro",
        name: "The Streamer Pro",
        basePrice: 5200,
        category: "gaming",
        // LINK GAMBAR BARU DI SINI
        image: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&w=800&q=80",
        specs: "Intel i5-14600K | NVIDIA RTX 4070 Super | 32GB DDR5 | 1TB NVMe SSD",
        description: "Designed for simultaneous high-quality gaming and streaming without compromise.",
        upgradeGroups: {
            Cooling: [
                { label: "Upgrade to 360mm AIO Liquid Cooler", price: 350 }
            ],
            Storage: [
                { label: "Upgrade to 2TB NVMe SSD (Gen4)", price: 300 }
            ],
            Aesthetics: [
                { label: "Lian Li Strimer Plus V2 Cables (RGB)", price: 250 }
            ]
        }
    },
    {
        id: "workstation-beast",
        name: "Creator Studio Beast",
        basePrice: 9500,
        category: "workstation",
        // LINK GAMBAR BARU DI SINI
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800",
        specs: "AMD Ryzen 9 7950X | NVIDIA RTX 4080 Super | 64GB DDR5 | 2TB NVMe SSD",
        description: "Ultimate horsepower for 4K video editing, 3D rendering, and heavy computational workloads.",
        upgradeGroups: {
            Ram: [
                { label: "Upgrade to 128GB DDR5 (4x32GB)", price: 1200 }
            ],
            Gpu: [
                { label: "Upgrade to RTX 4090 24GB", price: 3500 }
            ],
            Storage: [
                { label: "Add secondary 4TB NVMe SSD", price: 900 }
            ]
        }
    }
];