/* eslint-disable no-restricted-globals */
/* eslint-env browser, serviceworker, es6 */

self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
    var data = JSON.parse(event.data.text());

    const title = data.name;
    const options = {
        body: data.message,
        icon: 'images/icon.png',
        badge: 'images/badge.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});