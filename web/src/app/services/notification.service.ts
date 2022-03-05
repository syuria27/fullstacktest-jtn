import { Injectable } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  webSocketEndPoint: string = 'http://localhost:8080/api/jtn-notification-endpoint';
  topic: string = "/topic/notification";
  stompClient?: Stomp.CompatClient;

  // Observable string sources
  private componentMethodCallSource = new Subject<any>();

  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  // Service message commands
  callComponentMethod(value: any) {
    this.componentMethodCallSource.next(value);
  }

  constructor(){}

  connect() {
      console.log("Initialize WebSocket Connection");
      let ws = new SockJS(this.webSocketEndPoint);
      this.stompClient = Stomp.Stomp.over(ws);
      // Add the following if you need automatic reconnect (delay is in milli seconds)
      this.stompClient.reconnect_delay = 5000;
      const _this = this;
      _this.stompClient?.connect({}, () => {
        _this.stompClient?.subscribe(_this.topic, (message) => {
          _this.callComponentMethod(message.body);
          _this.onMessageReceived(message);
        });
        //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  }

  disconnect() {
    if (this.stompClient !== null) {
        this.stompClient?.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error: any) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
        this.connect();
    }, 5000);
  }

  /**
  * Send message to sever via web socket
  * @param {*} message
  */
  sendNotif(message: any) {
    console.log("calling notif api via web socket");
    this.stompClient?.send("/jtn/notification", {}, message);
  }

  onMessageReceived(message: any) {
    const audio = new Audio();
    audio.src = '../../assets/audio/notification.wav';
    audio.load();
    audio.play();
    console.log("Message Recieved from Server :: " + message.body);
  }

}
