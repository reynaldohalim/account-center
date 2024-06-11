import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { api_address } from 'src/app/api-address';

@Component({
  selector: 'app-input-keluarga',
  templateUrl: './input-keluarga.page.html',
  styleUrls: ['./input-keluarga.page.scss'],
})
export class InputKeluargaPage implements OnInit {

  data_keluarga={
    id: null,
    nip:0,
    nama:'',
    hubungan:'',
    jenis_kelamin:'',
    tgl_lahir:'',
    tempat_lahir:'',
    pendidikan:'',
    pekerjaan:'',
    keterangan:'',
    approved_by: ''
  }

  old_data: any;
  title: string = 'Data Keluarga';
  updatable = true;
  btn_kirim = 'Kirim';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nip']) {
        this.data_keluarga.nip = params['nip'];
      }
      else{
        this.router.navigate(['/login']);
      }

      if (params && params['id']) {
        this.data_keluarga.id = params['id'];
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
        'nip' : this.data_keluarga.nip,
        'id' : this.data_keluarga.id,
        'data' : 'keluarga'
      }
    }

    axios.get(api_address, config)
    .then(
      (response) => {
        this.data_keluarga ={
          id: response.data[0].id,
          nip: response.data[0].nip,
          nama: response.data[0].nama,
          hubungan: response.data[0].hubungan,
          jenis_kelamin: response.data[0].jenis_kelamin,
          tgl_lahir: response.data[0].tgl_lahir,
          tempat_lahir: response.data[0].tempat_lahir,
          pendidikan: response.data[0].pendidikan,
          pekerjaan: response.data[0].pekerjaan,
          keterangan: response.data[0].keterangan,
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

    if(this.data_keluarga.id != null){
      config ={
        'nip' : this.data_keluarga.nip,
        'tabel' : 'data_keluarga',
        'data' : this.data_keluarga,
        'data_lama' : this.data_keluarga.id,
      }
    }
    else {
      config ={
        'nip' : this.data_keluarga.nip,
        'tabel' : 'data_keluarga',
        'data' : this.data_keluarga,
        'data_lama' : ''
      }
      console.log('that');

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
    if(this.title == 'Perbarui Data Keluarga') this.title = 'Data Keluarga';
    else this.title = 'Perbarui Data Keluarga';

    this.updatable = !this.updatable;
  }
}
