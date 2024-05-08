import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-input-organisasi',
  templateUrl: './input-organisasi.page.html',
  styleUrls: ['./input-organisasi.page.scss'],
})
export class InputOrganisasiPage implements OnInit {

  organisasi={
    id: null,
    nip:0,
    macam_kegiatan:'',
    jabatan:'',
    tahun:'',
    approved_by: ''
  }

  old_data: any;
  title: string = 'Data Organisasi';
  updatable = true;
  btn_kirim = 'Kirim';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nip']) {
        this.organisasi.nip = params['nip'];
      }
      else{
        this.router.navigate(['/login']);
      }

      if (params && params['id']) {
        this.organisasi.id = params['id'];
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
        'nip' : this.organisasi.nip,
        'id' : this.organisasi.id,
        'data' : 'organisasi'
      }
    }

    axios.get(`http://localhost/TA_DB/data.php`, config)
    .then(
      (response) => {
        this.organisasi ={
          id: response.data[0].id,
          nip: response.data[0].nip,
          macam_kegiatan: response.data[0].macam_kegiatan,
          jabatan: response.data[0].jabatan,
          tahun: response.data[0].tahun,
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

    if(this.organisasi.id != null){
      config ={
        'nip' : this.organisasi.nip,
        'tabel' : 'organisasi',
        'data' : this.organisasi,
        'data_lama' : this.organisasi.id,
      }
    }
    else {
      config ={
        'nip' : this.organisasi.nip,
        'tabel' : 'organisasi',
        'data' : this.organisasi,
        'data_lama' : ''
      }
    }

    axios.post("http://localhost/TA_DB/data.php", config)
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
    if(this.title == 'Perbarui Data Organisasi') this.title = 'Data Organisasi';
    else this.title = 'Perbarui Data Organisasi';
    
    this.updatable = !this.updatable;
  }
}
