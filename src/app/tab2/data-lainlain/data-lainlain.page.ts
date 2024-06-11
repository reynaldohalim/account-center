import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { api_address } from 'src/app/api-address';

@Component({
  selector: 'app-data-lainlain',
  templateUrl: './data-lainlain.page.html',
  styleUrls: ['./data-lainlain.page.scss'],
})
export class DataLainlainPage implements OnInit {

  data_lainlain={
    nip:0,
    no_kpj:'',
    no_hld:'',
    no_ktp:'',
    no_npwp:'',
    potong_astek:0,
    asuransi:'',
    no_asuransi: null,
    kode_wings:'',
    bank:'',
    no_rekening:'',
    no_kendaraan:'',
    jari_bermasalah:0,
    jumlah_sp:null,
    email:'',
    catatan:'',
  }

  old_data: any;
  title: string = 'Data Lain-lain';
  updatable : boolean = true;
  jumlah_anak: boolean = false;

  public update_mode_alert = [
    {
      text: 'Tidak',
      cssClass: 'alert-button-cancel',
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
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Ya',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.update();
        this.updateMode();
      },
    },
  ];


  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
        if (params && params['nip']) {
          this.data_lainlain.nip = params['nip'];
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
        'nip' : this.data_lainlain.nip,
        'data' : 'lainlain'
      }
    }

    axios.get(api_address, config)
    .then(
      (response) => {
        this.data_lainlain ={
          nip: response.data[0].nip,
          no_kpj: response.data[0].no_kpj,
          no_hld: response.data[0].no_no_hld,
          no_ktp: response.data[0].no_ktp,
          no_npwp: response.data[0].no_npwp,
          potong_astek: response.data[0].potong_astek,
          asuransi: response.data[0].asuransi,
          no_asuransi: response.data[0].no_asuransi,
          kode_wings: response.data[0].kode_wings,
          bank: response.data[0].bank,
          no_rekening: response.data[0].no_rekening,
          no_kendaraan: response.data[0].no_kendaraan,
          jari_bermasalah: response.data[0].jari_bermasalah,
          jumlah_sp: response.data[0].jumlah_sp,
          email: response.data[0].email,
          catatan: response.data[0].catatan,
        }
      }
    )
    .catch((error) => {
      console.log(error);
    })
  }

  updateMode(){
    if(this.title == 'Data Lain-lain') this.title = 'Perbarui Data Lain-lain';
    else this.title = 'Data Lain-lain';
    this.updatable = !this.updatable;
    this.old_data = Object.assign({}, this.data_lainlain);
  }

  update(){
    const config={
      'nip' : this.data_lainlain.nip,
      'tabel' : 'data_lainlain',
      'label': '',
      'data_lama' : '',
      'data_baru': ''
    }

    // no kpj
    if(this.old_data.no_kpj != this.data_lainlain.no_kpj){
      config.label = 'no_kpj';
      config.data_lama = this.old_data.no_kpj;
      config.data_baru = this.data_lainlain.no_kpj;
      this.send_update(config);
    }

    // no hld
    if(this.old_data.no_hld != this.data_lainlain.no_hld){
      config.label = 'no_hld';
      config.data_lama = this.old_data.no_hld;
      config.data_baru = this.data_lainlain.no_hld;
      this.send_update(config);
    }

    // no hld
    if(this.old_data.no_npwp != this.data_lainlain.no_npwp){
      config.label = 'no_npwp';
      config.data_lama = this.old_data.no_npwp;
      config.data_baru = this.data_lainlain.no_npwp;
      this.send_update(config);
    }

    // bank
    if(this.old_data.bank != this.data_lainlain.bank){
      config.label = 'bank';
      config.data_lama = this.old_data.bank;
      config.data_baru = this.data_lainlain.bank;
      this.send_update(config);
    }

    // no rekening
    if(this.old_data.no_rekening != this.data_lainlain.no_rekening){
      config.label = 'no_rekening';
      config.data_lama = this.old_data.no_rekening;
      config.data_baru = this.data_lainlain.no_rekening;
      this.send_update(config);
    }

    // no kendaraan
    if(this.old_data.no_kendaraan != this.data_lainlain.no_kendaraan){
      config.label = 'no_kendaraan';
      config.data_lama = this.old_data.no_kendaraan;
      config.data_baru = this.data_lainlain.no_kendaraan;
      this.send_update(config);
    }

    // email
    if(this.old_data.email != this.data_lainlain.email){
      config.label = 'email';
      config.data_lama = this.old_data.email;
      config.data_baru = this.data_lainlain.email;
      this.send_update(config);
    }
  }

  send_update(config : any){
    axios.post(api_address, config)
    .then(
      (response) => {
        console.log(response);
      }
    )
    .catch((error) => {
      console.log(error);
    })
  }
}
