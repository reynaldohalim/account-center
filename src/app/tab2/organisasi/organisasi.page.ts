import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import axios from 'axios';
import { Subscription, filter } from 'rxjs';
import { api_address } from 'src/app/api-address';

@Component({
  selector: 'app-organisasi',
  templateUrl: './organisasi.page.html',
  styleUrls: ['./organisasi.page.scss'],
})
export class OrganisasiPage implements OnInit {
  arr_organisasi: any = [];
  arr_data_belum_terverifikasi: any = [];
  nip= 0;
  no_data = true;
  data_terverifikasi = false;
  data_belum_terverifikasi = false;
  private subscription: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nip']) {
        this.nip = params['nip'];
      }
      else{
        this.router.navigate(['/login']);
      }
    });

    this.subscription = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd && event.url === '/organisasi')
    ).subscribe(() => {
      this.getData();
    });
  }

  ngOnInit() {
    this.getData()
  }

  getData(){
    const config={
      params:{
        'data' : 'organisasi',
        'nip' : this.nip,
      }
    }

    let rawData : any = [];
    axios.get(api_address, config)
    .then(
      (response) => {
        rawData = response.data;
        if(rawData.length > 0){
          this.no_data = false;

          for (let data of rawData) {
            if(data.approved_by != null){
              this.arr_organisasi.push(data);
            }
            else{
              this.arr_data_belum_terverifikasi.push(data);
            }
          }
        }
        if (this.arr_organisasi.length > 0) this.data_terverifikasi=true;
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
    this.router.navigate(['input-organisasi'], {queryParams: data});
  }
}
