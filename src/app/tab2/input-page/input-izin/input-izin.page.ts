import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { api_address } from 'src/app/api-address';

@Component({
  selector: 'app-input-izin',
  templateUrl: './input-izin.page.html',
  styleUrls: ['./input-izin.page.scss'],
})
export class InputIzinPage implements OnInit {
  izin = {
    no_ijin:'',
    nip:'',
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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nip']) {
        this.izin.nip = params['nip'];
      }
      else{
        this.router.navigate(['/login']);
      }

      this.getJenisIzin();

      if (params && params['no_ijin']) {
        this.izin.no_ijin = params['no_ijin'];
        this.getIzin();
        this.title = this.izin.no_ijin;
        this.btn_kirim = 'Perbarui';
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log('Original File selected:', file);

      // Rename the file
      const newFileName = 'new-filename' + file.name.slice(file.name.lastIndexOf('.'));
      const newFile = new File([file], newFileName, { type: file.type });

      console.log('Renamed File:', newFile);

      const formData = new FormData();
      formData.append('file', newFile);

      this.http.post('http://localhost:3000/upload', formData, { responseType: 'text' }).subscribe(
        response => {
          console.log('Upload success:', response);
        },
        error => {
          console.error('Upload error:', error);
        }
      );
    }
  }

  ngOnInit() {
  }

  send() {
    let config;

    if(this.izin.no_ijin != ''){
      config = {
        'nip' : this.izin.nip,
        'tabel' : 'ijin',
        'data' : this.izin,
        'update' : true
      }
    }
    else {
      config = {
        'nip' : this.izin.nip,
        'tabel' : 'ijin',
        'data' : this.izin,
        'update' : false
      };
    }

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


  getJenisIzin(){
    const config={
      params:{
        'nip' : this.izin.nip,
        'data' : 'jenis_izin'
      }
    }

    axios.get(api_address, config)
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
        'data' : 'ijin',
        'nip' : this.izin.nip,
        'no_ijin' : this.izin.no_ijin
      }
    }

    axios.get(api_address, config)
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
