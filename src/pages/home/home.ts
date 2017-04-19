import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// import { Observable } from 'rxjs/Observable';
import { Clipboard } from '../../providers/clipboard';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private messages = [];
  private text: string;

  constructor(public navCtrl: NavController, public service: Clipboard, private barcodeScanner: BarcodeScanner, private socialSharing: SocialSharing) {
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

  scanCode() {
    console.log("barcodeScanner.scan()");
    var options = {
      preferFrontCamera: true, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      torchOn: true, // Android, launch with the torch switched on (if available)
      prompt: "Place a barcode inside the scan area", // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations: true, // iOS
      disableSuccessBeep: false // iOS
    };

    this.barcodeScanner.scan(options).then((barcodeData) => {
      console.log("Scan OK");
      // Success! Barcode data is here
    }, (err) => {
      console.log("Scan FAIL");
      console.log(JSON.stringify(err));
      // An error occurred
    });
  }

  share() {
    console.log("socialSharing.shareViaEmail()");

    var options = {
      message: 'share this', // not supported on some apps (Facebook, Instagram)
      subject: 'the subject', // fi. for email
      files: ['', ''], // an array of filenames either locally or remotely
      url: 'https://www.website.com/foo/#bar?a=b',
      chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    }

    var onSuccess = function (result) {
      console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    }

    var onError = function (msg) {
      console.log("Sharing failed with message: " + msg);
    }

    this.socialSharing.shareWithOptions(options).then(onSuccess).catch(onError);
  }
}
