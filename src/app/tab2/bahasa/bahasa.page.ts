import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-bahasa',
  templateUrl: './bahasa.page.html',
  styleUrls: ['./bahasa.page.scss'],
})
export class BahasaPage implements OnInit {
  arr_bahasa: any = [];
  arr_data_belum_terverifikasi: any = [];
  nip= 0;
  no_data = true;
  data_terverifikasi = false;
  data_belum_terverifikasi = false;

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
    this.getDataBahasa();
    }

  getDataBahasa(){
    const config={
      params:{
        'data' : 'bahasa',
        'nip' : this.nip,
      }
    }

    let rawData : any = [];
    axios.get("http://localhost/TA_DB/data.php", config)
    .then(
      (response) => {
        rawData = response.data;
        if(rawData.length > 0){
          this.no_data = false;

          for (let data of rawData) {
            if(data.approved_by != null){
              this.arr_bahasa.push(data);
            }
            else{
              this.arr_data_belum_terverifikasi.push(data);
            }
          }      
        } 
        if (this.arr_bahasa.length > 0) this.data_terverifikasi=true;
        if (this.arr_data_belum_terverifikasi.length > 0) this.data_belum_terverifikasi=true;           
      }
    )
    .catch((error) => {
      console.log(error);
    })
  }

  navigateToEdit(id: string){
    let data ={}

    if(id != '') {
        data ={
          id: `${id}`,
          nip: this.nip,
        }
    }
    else {
      data ={
        nip: this.nip,
      }
    }
    this.router.navigate(['tabs/tab2/input-bahasa'], {queryParams: data});
  }
}
