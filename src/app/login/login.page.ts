import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { api_address } from '../api-address';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  akun = {
    nip:null,
    password:''
  };

  success = true;
  errorMessage = '';
  // toastMessage=api_address;

  constructor(private router: Router) {}
  ngOnInit() {

    console.log('Initializing HomePage');

    if(Capacitor.getPlatform() !== 'web') {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );
    }
  }

  addListeners = async()=>{
    // On success, we should be able to receive notifications
    await PushNotifications.addListener('registration',
      (token: Token) => {
        alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    await PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    await PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    await PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

  async registerPN(){
    let permStatus = await PushNotifications.checkPermissions();
    alert(JSON.stringify(permStatus));

    if(permStatus.receive === 'prompt')
      permStatus = await PushNotifications.requestPermissions();

    if (permStatus.receive !== 'granted')
        alert('user denied permissions!')

    if (permStatus.receive === 'granted'){
      try{
        await PushNotifications.register();
      }
      catch(e){alert(JSON.stringify(e));
      }
    }
  }
  async getDeliveredN (){
    const notificationsList = await PushNotifications.getDeliveredNotifications
    alert('delivered notifications ' + JSON.stringify(notificationsList));
  }

  setSuccess(isSuccess: boolean) {
    this.success = isSuccess;
  }

  login() {
    axios.post(api_address, this.akun)
      .then(
        (response) => {
          console.log(response);

          this.errorMessage = response.data['message'];
          this.setSuccess(response.data['success']);
          // this.toastMessage = response.data['message'];

          //navigate to home
          if(this.success){
            const data ={
              nip: `${this.akun.nip}`,
              nama: `${response.data.nama}`,
              jabatan: `${response.data.jabatan}`,
              bagian: `${response.data.bagian}`
            }
            this.router.navigate(['tab2'], {queryParams: data});
          }
        }
      )
      .catch((error) => {
        console.log(error);
      })
      this.setSuccess(true);
  }
}
