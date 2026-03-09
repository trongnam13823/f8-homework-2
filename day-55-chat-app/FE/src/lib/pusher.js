import Pusher from 'pusher-js';
import config from '@/config/config';

const pusher = new Pusher(config.pusher.appKey, {
    wsHost: config.pusher.host,
    wsPort: config.pusher.port,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    cluster: 'mt1' // arbitrary
});

export default pusher;
