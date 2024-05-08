import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-input-izin',
  templateUrl: './input-izin.page.html',
  styleUrls: ['./input-izin.page.scss'],
})
export class InputIzinPage implements OnInit {
  izin = {
    no_ijin:'',
    nip:0,
    jenis_izin:'',
    tgl_izin:'',
    jam_in:null,
    jam_out:null,
    keterangan: '',
    };

    jenis_izin = {
      kode_jenis_izin:'',
      jenis_izin:'',
      durasi_max:''
    };

    jenis_izins : any = [];
    title = 'Input Izin';
    btn_kirim = 'Kirim';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getJenisIzin();

      if (params && params['no_ijin']) {
        this.izin.no_ijin = params['no_ijin'];
        this.getIzin();
        this.title = this.izin.no_ijin;
        this.btn_kirim = 'Perbarui';
      }

      if (params && params['nip']) {
        this.izin.nip = params['nip']
      }
      else{
        this.router.navigate(['/login']);
      }
    });
  }

  send() {
    let config;

    if(this.izin.no_ijin != ''){
      config = {
        'nip' : this.izin.nip,
        'tabel' : 'izin',
        'data' : this.izin,
        'update' : true
      }
    }
    else {
      config = {
        'nip' : this.izin.nip,
        'tabel' : 'izin',
        'data' : this.izin,
        'update' : false
      };
    }

    axios.post("http://localhost/TA_DB/data.php", config)
      .then(
        (response) => {
          console.log(response);
        }
      )
      .catch((error) => {
        console.log(error);
      })
  }


  getJenisIzin(){
    const config={
      params:{
        'nip' : this.izin.nip,
        'data' : 'jenis_izin'
      }
    }

    axios.get("http://localhost/TA_DB/data.php", config)
    .then(
      (response) => {
        this.jenis_izins = response.data;
      }
    )
    .catch((error) => {
      console.log(error);
    })
  }

  getIzin(){
    let config={
      params:{
        'data' : 'izin',
        'nip' : this.izin.nip,
        'no_ijin' : this.izin.no_ijin
      }
    }

    axios.get(`http://localhost/TA_DB/data.php`, config)
    .then(
      (response) => {
        this.izin = {
          no_ijin: response.data[0].no_ijin,
          nip: response.data[0].nip,
          jenis_izin: response.data[0].jenis_ijin,
          tgl_izin: response.data[0].tgl_ijin,
          jam_in: response.data[0].jam_in,
          jam_out: response.data[0].jam_out,
          keterangan: response.data[0].keterangan,
        }
      }
    )
    .catch((error) => {
      console.log(error);
    })
  }
}
