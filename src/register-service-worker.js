import { config } from './config';

let endpoint;
let key;
let authSecret;
let publicKey = config.NotificationPublicKey;

const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const updateSubscriptionOnServer = (subscription) => {
    console.log("send to server", JSON.stringify(subscription));
}

export const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(`${process.env.PUBLIC_URL}\sw.js`)
            .then((register) => {
                console.log("woker:", register);
                register.pushManager.getSubscription()
                    .then((subscription) => {
                        if (subscription != null) {
                            updateSubscriptionOnServer(subscription);
                            console.log("send subscription to server");
                        }
                        else {
                            console.log("get new subscription ");
                            register.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: urlB64ToUint8Array(publicKey)
                            }).then(subscription => {
                                updateSubscriptionOnServer(subscription);
                                console.log("send subscription to server");
                            })
                        }
                    });
            }).catch((err) => {
                console.log("error:", err);
            });
    }
}