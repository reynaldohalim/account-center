import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { api_address } from 'src/app/api-address';

@Component({
  selector: 'app-input-pendidikan',
  templateUrl: './input-pendidikan.page.html',
  styleUrls: ['./input-pendidikan.page.scss'],
})
export class InputPendidikanPage implements OnInit {

  pendidikan = {
    id: null,
    nip:0,
    tingkat:'',
    sekolah:'',
    kota:'',
    jurusan:'',
    tahun:0,
    ipk:0,
    approved_by: ''
  }

  old_data: any;
  title: string = 'Data Pendidikan';
  updatable = true;
  btn_kirim = 'Kirim';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nip']) {
        this.pendidikan.nip = params['nip'];
      }
      else{
        this.router.navigate(['/login']);
      }

      if (params && params['id']) {
        this.pendidikan.id = params['id'];
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
        'nip' : this.pendidikan.nip,
        'id' : this.pendidikan.id,
        'data' : 'pendidikan'
      }
    }

    axios.get(api_address, config)
    .then(
      (response) => {
        this.pendidikan ={
          id: response.data[0].id,
          nip: response.data[0].nip,
          tingkat: response.data[0].tingkat,
          sekolah: response.data[0].sekolah,
          kota: response.data[0].kota,
          jurusan: response.data[0].jurusan,
          tahun: response.data[0].tahun,
          ipk: response.data[0].ipk,
          approved_by:  response.data[0].approved_by,
        }
      }
    )
    .catch((error) => {
      console.log(error);
    })
  }

  send() {
    let config;

    if(this.pendidikan.id != null){
      config ={
        'nip' : this.pendidikan.nip,
        'tabel' : 'pendidikan',
        'data' : this.pendidikan,
        'data_lama' : this.pendidikan.id,
      }
    }
    else {
      config ={
        'nip' : this.pendidikan.nip,
        'tabel' : 'pendidikan',
        'data' : this.pendidikan,
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
    if(this.title == 'Perbarui Data Pendidikan') this.title = 'Data Pendidikan';
    else this.title = 'Perbarui Data Pendidikan';

    this.updatable = !this.updatable;
  }
}
