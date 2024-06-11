import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { api_address } from 'src/app/api-address';

@Component({
  selector: 'app-input-bahasa',
  templateUrl: './input-bahasa.page.html',
  styleUrls: ['./input-bahasa.page.scss'],
})
export class InputBahasaPage implements OnInit {
  bahasa={
    id: null,
    nip:0,
    bahasa:'',
    mendengar:'',
    membaca:'',
    bicara:'',
    menulis:'',
    approved_by:'',
  }

  old_data: any;
  title: string = 'Data Bahasa';
  updatable = true;
  btn_kirim = 'Kirim';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nip']) {
        this.bahasa.nip = params['nip'];
      }
      else{
        this.router.navigate(['/login']);
      }

      if (params && params['id']) {
        this.bahasa.id = params['id'];
        this.getData();
        this.btn_kirim = 'Perbarui';
      }
      else {
        this.updatable = false;
      }
    });
  }

  public update_mode_alert = [
    {
      text: 'Tidak',
      cssClass: 'btn-modal-no',
    },
    {
      text: 'Ya',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.updateMode();
      },
    },
  ];

  public send_update_alert = [
    {
      text: 'Tidak',
      cssClass: 'btn-modal-no',
    },
    {
      text: 'Ya',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.send();
      },
    },
  ];

  ngOnInit() {
  }

  getData(){
    const config={
      params:{
        'nip' : this.bahasa.nip,
        'id' : this.bahasa.id,
        'data' : 'bahasa'
      }
    }

    axios.get(api_address, config)
    .then(
      (response) => {
        this.bahasa ={
          id: response.data[0].id,
          nip: response.data[0].nip,
          bahasa: response.data[0].bahasa,
          mendengar: response.data[0].mendengar,
          membaca: response.data[0].membaca,
          bicara: response.data[0].bicara,
          menulis: response.data[0].menulis,
          approved_by: response.data[0].approved_by,
        }
      }
    )
    .catch((error) => {
      console.log(error);
    })
  }

  send() {
    let config;

    if(this.bahasa.id != null){
      config ={
        'nip' : this.bahasa.nip,
        'tabel' : 'bahasa',
        'data' : this.bahasa,
        'data_lama' : this.bahasa.id,
      }
    }
    else {
      config ={
        'nip' : this.bahasa.nip,
        'tabel' : 'bahasa',
        'data' : this.bahasa,
        'data_lama' : ''
      }
    }

    axios.post(api_address, config)
      .then(
        (response) => {
          console.log(response);
        }
      )
      .catch((error) => {
        console.log(error);
      }
    )

    this.updateMode();
  }

  updateMode(){
    if(this.title == 'Perbarui Data Bahasa') this.title = 'Data Bahasa';
    else this.title = 'Perbarui Data Bahasa';

    this.updatable = !this.updatable;
  }
}
