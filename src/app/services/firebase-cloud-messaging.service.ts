import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCloudMessagingService {

  constructor(public firebaseNative: Firebase,
              public firestore: AngularFirestore,
              private platform: Platform) { }

  async getToken(){

    let token;

    if(this.platform.is('android')){
      token = await this.firebaseNative.getToken();
    }

    if(this.platform.is('ios')){
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }

    if(!this.platform.is('cordova')){
      //TODO
    }

    return this.saveTokenToFirestore(token);

  }

  saveTokenToFirestore(token: any) {
    if(!token) return;

    const devicesReference = this.firestore.collection('devices');

    const docData = {
      token,
      userId: 'testUser'
    }

    return devicesReference.doc(token).set(docData);
  }

  listenToNotifications(){
    return this.firebaseNative.onNotificationOpen();
  }

}
