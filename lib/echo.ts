import Echo from 'laravel-echo';
import { broadcastAuthInstance } from './apiCalls';

const EchoConfig = (token: string) => {
  //@ts-ignore
  window.Pusher = require('pusher-js');
  broadcastAuthInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${token}`;

  //@ts-ignore
  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.ECHO_APP_KEY,
    host: process.env.ECHO_HOST,
    wsHost: process.env.ECHO_HOST,
    wsPort: process.env.ECHO_PORT,
    disableStats: true,
    cluster: process.env.ECHO_CLUSTER,
    forceTLS: false,
    authorizer: (channel, option) => {
      return {
        authorize: (socketId, callback) => {
          broadcastAuthInstance
            .post('auth', {
              socket_id: socketId,
              channel_name: channel.name,
            })
            .then(response => {
              callback(false, response.data);
            })
            .catch(error => {
              callback(true, error);
            });
        },
      };
    },
  });
};

export default EchoConfig;
