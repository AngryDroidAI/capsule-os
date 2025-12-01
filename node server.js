// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { spawn } = require('child_process');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for models and history
let models = {
    'llama3': { status: 'loaded' },
    'mistral': { status: 'loading' },
    'phi3': { status: 'loaded' },
    'gemma': { status: 'error' }
};

// Simulate resource usage
function getSystemResources() {
    const cpus = os.cpus();
    const cpuUsage = Math.floor(Math.random() * 30) + 50; // 50-80%
    const memoryUsage = Math.floor(Math.random() * 40) + 30; // 30-70%
    const storageUsage = Math.floor(Math.random() * 20) + 20; // 20-40%
    
    return {
        cpu: cpuUsage,
        memory: memoryUsage,
        storage: storageUsage
    };
}

// Simulate AI response
function generateAIResponse(prompt, model) {
    // In a real implementation, this would call the Ollama API
    const responses = [
        `I've analyzed your request about "${prompt}". Based on my ${model} model, here's a comprehensive response...`,
        `Thanks for asking about "${prompt}". Here's what I can help with using the ${model} model...`,
        `Regarding "${prompt}", I've generated the following insights using ${model}...`,
        `I've processed your query on "${prompt}" with the ${model} model. Here are the results...`
    ];
    
    // Simulate processing time
    const processingTime = Math.floor(Math.random() * 2000) + 1000; // 1-3 seconds
    
    return new Promise((resolve) => {
        setTimeout(() => {
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            resolve(randomResponse);
        }, processingTime);
    });
}

// API Routes

// Query endpoint
app.post('/query', async (req, res) => {
    const { prompt, model } = req.body;
    
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }
    
    try {
        const response = await generateAIResponse(prompt, model);
        res.json({ response });
    } catch (error) {
        console.error('Error generating AI response:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

// Resources endpoint
app.get('/resources', (req, res) => {
    const resources = getSystemResources();
    res.json(resources);
});

// Models endpoint
app.get('/models', (req, res) => {
    res.json(models);
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Capsule OS Backend running on http://localhost:${PORT}`);
});
```

## Setup Instructions

1. Create a new directory for your project:
```bash
mkdir capsule-os
cd capsule-os
```

2. Initialize a Node.js project:
```bash
npm init -y
```

3. Install dependencies:
```bash
npm install express cors
```

4. Create the directory structure:
```
capsule-os/
├── server.js
├── public/
│   └── index.html
```

5. Place the HTML code in `public/index.html`

6. Place the server code in `server.js`

7. Run the server:
```bash
node server.js
```

8. Open your browser and navigate to `http://localhost:3000`

