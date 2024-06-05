import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-pendidikan',
  templateUrl: './pendidikan.page.html',
  styleUrls: ['./pendidikan.page.scss'],
})

export class PendidikanPage implements OnInit {
  arr_pendidikan: any = [];
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
    this.getData();


  }

  getData(){
    const config={
      params:{
        'data' : 'pendidikan',
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
              this.arr_pendidikan.push(data);
            }
            else{
              this.arr_data_belum_terverifikasi.push(data);
            }
          }
        }
        if (this.arr_pendidikan.length > 0) this.data_terverifikasi=true;
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
    this.router.navigate(['input-pendidikan'], {queryParams: data});
  }
}
