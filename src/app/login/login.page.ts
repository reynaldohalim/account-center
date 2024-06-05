import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

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

  constructor(private router: Router) {}

  ngOnInit() {
  }

  setSuccess(isSuccess: boolean) {
    this.success = isSuccess;
  }

  login() {
    axios.post("http://localhost/TA_DB/data.php", this.akun)
      .then(
        (response) => {
          console.log(response);

          this.errorMessage = response.data['message'];
          this.setSuccess(response.data['success']);

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
