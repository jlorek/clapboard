import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// import { Observable } from 'rxjs/Observable';
import { Clipboard } from '../../providers/clipboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private messages = [];
  private text: string;

  constructor(public navCtrl: NavController, public service: Clipboard) {
    service.getMessages().subscribe(message => {
      this.messages.unshift(message);
    });

    // this.messages = [
    //   {text: "one"},
    //   {text: "two"},
    //   {text: "three"},
    // ];
  }

  sendText() {
    this.service.sendText(this.text);
    this.text = "";
  }
}
