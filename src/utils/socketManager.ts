import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import lodash from 'lodash';

function subscribeCallBack(data: any, subscribes: any) {
    if (data) {
        let topic = data.headers.destination;
        let funces = subscribes.get(topic);
        funces.forEach((func: any) => {
            func(data);
        });
    }
}
interface ClientManagerObj {
    client: any,
    connecting: boolean,
    subscribes: any,
    subscribe: (topic: any, onMessage: any) => void,
    subscribesAll: any,
    disconnect: any,
    connect: any,
    errorCallBack: any

}

let clientManager: ClientManagerObj = {
    client: null,
    connecting: false, 
    subscribes: new Map(), 
    subscribe(topic: any, onMessage: any) {
        if (this.client != null && this.client.connected == true) {  
            if (!this.subscribes.has(topic)) {
                this.client.subscribe(topic, (data: any) => subscribeCallBack(data, this.subscribes));
                this.subscribes.set(topic, [onMessage]);
            } else {
                let funces = this.subscribes.get(topic);
                funces.push(onMessage);
            }
        } else { 
            if (!this.subscribes.has(topic)) {
                this.subscribes.set(topic, [onMessage]);
            } else {
                let funces = this.subscribes.get(topic);
                funces.push(onMessage);
            }
        }
    },
    subscribesAll() { 
        if (lodash.isEmpty(this.client) || this.client.connected != true) {
            return;
        }
        let subscribes = this.subscribes;
        for (let topic of subscribes.keys()) {
            this.client.subscribe(topic, (data: any) => subscribeCallBack(data, subscribes));
        }
    },
    disconnect() { 
        if (lodash.isEmpty(this.client) || this.client.connected != true) {
            return;
        }
        this.client.disconnect();
        this.subscribes = new Map();
    },
    connect(onSuccess: any, onDisconnect: any) {
        try {
            if (this.connecting == true) { 
                return;
            }
            this.connecting = true;
            if (lodash.isEmpty(this.client) || this.client.connected != true) { 
                let socket = new SockJS('/bond/notification', null, { timeout: 6000 });
                let stompClient = Stomp.over(socket);
                // stompClient.debug; 
                stompClient.connect
                    ({},
                        () => {
                            this.client = stompClient; 
                            this.subscribesAll(); 
                            if (onSuccess != null && onSuccess != undefined) {
                                onSuccess();
                            };
                        },
                        (error) => this.errorCallBack(error, onSuccess, onDisconnect)
                    );
            } else if (this.client != null && this.client.connected == true) { 
                onSuccess();
            }
        }
        catch (err) {
            console.log(err);
        }
        finally {
            this.connecting = false;
        }
    },
    errorCallBack(error: any, onSuccess: any, onDisconnect: any) { 
        if (onDisconnect != null && onDisconnect != undefined) {
            onDisconnect();
        }
        setTimeout(() => { 
            this.connect(onSuccess, onDisconnect);
        }, 10000);
    },
};

export default clientManager;