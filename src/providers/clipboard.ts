import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import SocketIOClient from 'socket.io-client';
import * as io from 'socket.io-client';

/*
  Generated class for the Clipboard provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Clipboard {
  socket: SocketIOClient.Socket;
  socketUrl: string = 'http://localhost:8080';

  constructor(/*public http: Http*/) {
    console.log('Hello Clipboard Provider');
    this.socket = io.connect(this.socketUrl);
  }

  sendText(text) {
    console.log("Clipboard.sendText: " + text);
    this.socket.emit('add-data', { text: text })
  }

  getMessages() : Observable<any>{
    let observable = new Observable(observer => {
      this.socket.on('data', (message) => {
        observer.next(message);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
