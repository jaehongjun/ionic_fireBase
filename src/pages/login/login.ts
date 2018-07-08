import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup'
import * as firebase from 'firebase';
import { LoaderProvider } from '../../providers/loader/loader';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private account : any = {
    email: '',
    password: '',
  }

  constructor(public navCtrl: NavController,
              private loader: LoaderProvider,
             private alertCtrl: AlertController) {
  }
  login() {
    this.loader.show()
    firebase.auth().signInWithEmailAndPassword(this.account.email, this.account.password)
      .then((result) =>{
        console.log(result)
      })

      .catch((error) =>{
      // Handle Errors here.
      var errorMessage = error.message;
      console.log(errorMessage)

      // ...
    });
    this.loader.hide();
  }
  signUp(){
    this.navCtrl.push(SignupPage);
  }

  resetEmail() {

    let alert = this.alertCtrl.create({
      title: 'Reset password',
      message: '패스워드를 재설정하기위해 이메일정보를 입력하세요',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
      ],
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '보내기',
          handler: data => {
            var auth = firebase.auth();
            var emailAddress = data.email;

            auth.sendPasswordResetEmail(emailAddress).then(() => {
              // Email sent.
              let alert = this.alertCtrl.create({
                title: 'Password Reset email',
                subTitle: '사용자가 입력한 이메일로 패스워드 재설정 메일이 전송되었습니다.',
                buttons: ['확인']
              });
              alert.present();
            }).catch((error) => {
              // An error happened.
            });
          }
        }
      ]
    });
    alert.present();


  }
}
