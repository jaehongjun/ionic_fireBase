import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private userName: any;
  private userEmail: any;
  private userId: any;

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController) {

    this.initPage();
  }

  initPage(){
    firebase.auth().onAuthStateChanged((user) =>{
      if (user) {
       console.log(user);
        this.userName = user.displayName;
        this.userEmail = user.email;
        this.userId = user.uid;
      } else {
        // No user is signed in.
      }
    });
  }
  logout() {
    const confirm = this.alertCtrl.create({
      title: 'Log out',
      message: 'log out 하시겠습니까?',
      buttons: [
        {
          text: '아니요',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '예',
          handler: () => {
            console.log('Agree clicked');
            firebase.auth().signOut().then(() =>{
              // Sign-out successful.
              console.log("log-out")
            }).catch((error) =>{
              // An error happened.
              console.log(error.errorMessage)
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
