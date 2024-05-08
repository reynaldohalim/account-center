import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';


@Component({
  selector: 'app-izin',
  templateUrl: './izin.page.html',
  styleUrls: ['./izin.page.scss'],
})
export class IzinPage implements OnInit {
  arr_izin: any = [];
  nip= 0;
  no_data= true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nip']) {
        this.nip = params['nip'];
      }
      else{
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    this.getIzin()
  }

  getIzin(){
    const config={
      params:{
        'data' : 'izin',
        'nip' : this.nip,
      }
    }

    axios.get("http://localhost/TA_DB/data.php", config)
    .then(
      (response) => {
        this.arr_izin = response.data;
        if(this.arr_izin.length > 0) this.no_data = false;
      }
    )
    .catch((error) => {
      console.log(error);
    })
  }

  navigateToEdit(no_ijin: string){
    let data ={}

    if(no_ijin != '') {
      data ={ 
        no_ijin: `${no_ijin}`,
        nip: this.nip,
      }
    }
    else{
      data ={
        nip: this.nip,
      }
    }
    this.router.navigate(['tabs/tab2/input-izin'], {queryParams: data});
  }
}
