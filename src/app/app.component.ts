import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'
import * as firebase from "firebase"; firebase;

var config = {
  apiKey: "AIzaSyABhiVZu3LTkjqZiIPYCfDRwdMUWVvCNQ0",
  authDomain: "ionic-email.firebaseapp.com",
  databaseURL: "https://ionic-email.firebaseio.com",
  projectId: "ionic-email",
  storageBucket: "ionic-email.appspot.com",
  messagingSenderId: "359460408420"
};


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });

  }
}

