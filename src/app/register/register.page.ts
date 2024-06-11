import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { api_address } from '../api-address';

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

  errorMessage = '';
  success = true;
  verifikasi_password= null;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  setSuccess(isSuccess: boolean) {
    this.success = isSuccess;
  }

  register() {
    if(this.register_akun.password == this.verifikasi_password){
      axios.post(api_address, this.register_akun)
      .then(
        (response) => {
          console.log(response.data);

          this.setSuccess(response.data['success']);
          if(this.success) this.router.navigate(['login']);
          else this.errorMessage = response.data['message'];
        }
      )
      .catch((error) => {
        console.log(error);
      })
      this.setSuccess(true);
    }
    else{
      this.setSuccess(false);
      this.errorMessage = 'Kata sandi dan verifikasi kata sandi tidak cocok!';
      this.router.navigate(['login']);
    }
  }
}
