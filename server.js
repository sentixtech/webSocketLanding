const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Store connected clients
const clients = new Set();

// Store subscriptions
const subscriptions = new Map();

wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.add(ws);

    // Send welcome message
    ws.send(JSON.stringify({
        type: 'system',
        channel: 'notifications',
        text: 'Welcome to the chat!',
        timestamp: new Date().toISOString(),
        user: 'System'
    }));

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            // Handle subscriptions
            if (data.type === 'subscribe') {
                if (!subscriptions.has(data.channel)) {
                    subscriptions.set(data.channel, new Set());
                }
                subscriptions.get(data.channel).add(ws);
                console.log(`Client subscribed to ${data.channel}`);
                return;
            }

            // Broadcast message to all clients subscribed to the channel
            if (data.channel && subscriptions.has(data.channel)) {
                subscriptions.get(data.channel).forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(data));
                    }
                });
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
        
        // Remove from all subscriptions
        subscriptions.forEach((subscribers) => {
            subscribers.delete(ws);
        });
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
