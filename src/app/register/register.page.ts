import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  register_akun={
    nik: null,
    no_hp: null,
    email: '',
    password:''
  }

  verifikasi_password= null;

  constructor() { }

  ngOnInit() {
  }

  register() {
    if(this.register_akun.password == this.verifikasi_password){
      axios.post("http://localhost/TA_DB/register.php", this.register_akun)
      .then(  
        (response) => {
          console.log(response.data);
        }
      )
      .catch((error) => {
        console.log(error);
      })
    }
    else{
      console.log('Password != Verifikasi');
    }
  }
}
