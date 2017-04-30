import Pusher from 'pusher';

export default function makePusher() {
  return new Pusher({
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    encrypted: true
  });
}