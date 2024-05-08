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

  success = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
  }

  login() {
    axios.post("http://localhost/TA_DB/login.php", this.akun)
      .then(
        (response) => {
          this.success = response.data['success'];
          console.log(response.data);
          

          //navigate to home
          if(this.success){
            const data ={
              nip: `${this.akun.nip}`,
              nama: `${response.data.nama}`,
              jabatan: `${response.data.jabatan}`,
              bagian: `${response.data.bagian}`
            }
            this.router.navigate(['tabs/tab2'], {queryParams: data});
          }
        }
      )
      .catch((error) => {
        console.log(error);
      })
  }
}
