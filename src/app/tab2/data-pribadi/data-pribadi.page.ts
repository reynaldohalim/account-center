import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-data-pribadi',
  templateUrl: './data-pribadi.page.html',
  styleUrls: ['./data-pribadi.page.scss'],
})
export class DataPribadiPage implements OnInit {
  data_pribadi={
    nip:0,
    nama:'',
    jenis_kelamin:'',
    alamat_ktp:'',
    alamat_domisili:'',
    no_hp:0,
    tempat_lahir:'',
    tgl_lahir:'',
    agama:'',
    status_nikah:'',
    jumlah_anak:0,
    pendidikan_terakhir:'',
  }

  old_data: any;
  title: string = 'Data Pribadi';
  updatable : boolean = true;
  jumlah_anak: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nip']) {
        this.data_pribadi.nip = params['nip'];
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
        'nip' : this.data_pribadi.nip,
        'data' : 'pribadi'
      }
    }

    axios.get(`http://localhost/TA_DB/data.php`, config)
    .then(
      (response) => {
        this.data_pribadi ={
          nip: response.data[0].nip,
          nama: response.data[0].nama,
          jenis_kelamin: response.data[0].jenis_kelamin,
          alamat_ktp: response.data[0].alamat_ktp,
          alamat_domisili: response.data[0].alamat_domisili,
          no_hp: response.data[0].no_hp,
          tempat_lahir: response.data[0].tempat_lahir,
          tgl_lahir: response.data[0].tgl_lahir,
          agama: response.data[0].agama,
          status_nikah: response.data[0].status_nikah,
          jumlah_anak: response.data[0].jumlah_anak,
          pendidikan_terakhir: response.data[0].pendidikan_terakhir,
        }
      }
    )
    .catch((error) => {
      console.log(error);
    })
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
        this.update();
      },
    },
  ];

  updateMode(){
    this.title = 'Perbarui Data Pribadi';
    this.updatable = !this.updatable;
    this.old_data = Object.assign({}, this.data_pribadi);
  }

  update(){
    const config={
      'nip' : this.data_pribadi.nip,
      'tabel' : 'data_pribadi',
      'label': '',
      'data_lama' : '',
      'data_baru': ''
    }

    //alamat KTP
    if(this.old_data.alamat_ktp != this.data_pribadi.alamat_ktp){
      config.label = 'alamat_ktp';
      config.data_lama = this.old_data.alamat_ktp;
      config.data_baru = this.data_pribadi.alamat_ktp;
      this.send_update(config);
    }

    //alamat domisili
    if(this.old_data.alamat_domisili != this.data_pribadi.alamat_domisili){
      config.label = 'alamat_domisili';
      config.data_lama = this.old_data.alamat_domisili;
      config.data_baru = this.data_pribadi.alamat_domisili;
      this.send_update(config);
    }

    //no hp
    if(this.old_data.no_hp != this.data_pribadi.no_hp){
      config.label = 'no_hp';
      config.data_lama = this.old_data.no_hp + '';
      config.data_baru = this.data_pribadi.no_hp + '';
      this.send_update(config);
    }

    //tempat lahir
    if(this.old_data.tempat_lahir != this.data_pribadi.tempat_lahir){
      config.label = 'tempat_lahir';
      config.data_lama = this.old_data.tempat_lahir;
      config.data_baru = this.data_pribadi.tempat_lahir;
      this.send_update(config);
    }

    //tgl lahir
    if(this.old_data.tgl_lahir != this.data_pribadi.tgl_lahir){
      config.label = 'tgl_lahir';
      config.data_lama = this.old_data.tgl_lahir;
      config.data_baru = this.data_pribadi.tgl_lahir;
      this.send_update(config);
    }
    
    //agama
    if(this.old_data.agama != this.data_pribadi.agama){
      config.label = 'agama';
      config.data_lama = this.old_data.agama;
      config.data_baru = this.data_pribadi.agama;
      this.send_update(config);
    }

    //status nikah
    if(this.old_data.status_nikah != this.data_pribadi.status_nikah){
      config.label = 'status_nikah';
      config.data_lama = this.old_data.status_nikah;
      config.data_baru = this.data_pribadi.status_nikah;
      this.send_update(config);
    }

    //jumlah anak
    if(this.old_data.jumlah_anak != this.data_pribadi.jumlah_anak){
      config.label = 'jumlah_anak';
      config.data_lama = this.old_data.jumlah_anak + '';
      config.data_baru = this.data_pribadi.jumlah_anak + '';
      this.send_update(config);
    }
    
    //pendidikan terakhir
    if(this.old_data.pendidikan_terakhir != this.data_pribadi.pendidikan_terakhir){
      config.label = 'pendidikan_terakhir';
      config.data_lama = this.old_data.pendidikan_terakhir;
      config.data_baru = this.data_pribadi.pendidikan_terakhir;
      this.send_update(config);
    }
  }

  send_update(config : any){
    axios.post(`http://localhost/TA_DB/data.php`, config)
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
