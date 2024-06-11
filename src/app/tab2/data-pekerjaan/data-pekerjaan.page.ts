import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { api_address } from 'src/app/api-address';

@Component({
  selector: 'app-data-pekerjaan',
  templateUrl: './data-pekerjaan.page.html',
  styleUrls: ['./data-pekerjaan.page.scss'],
})
export class DataPekerjaanPage implements OnInit {
  karyawan_aktif: boolean = true;

  data_pekerjaan={
    nip:0,
    divisi:'',
    bagian:'',
    detail_posisi:'',
    jabatan:'',
    group:'',
    kode_admin:'',
    kode_kontrak:'',
    kode_periode:'',
    sales_office:'',
    tgl_masuk:'',
    tgl_penetapan:'',
    status_karyawan: 1,
    tgl_keluar:'',
    alasan_keluar:'',
    gaji_perbulan:null,
    pengalaman:'',
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nip']) {
        this.data_pekerjaan.nip = params['nip'];
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
        'nip' : this.data_pekerjaan.nip,
        'data' : 'pekerjaan'
      }
    }

    axios.get(api_address, config)
    .then(
      (response) => {
        this.data_pekerjaan ={
          nip: response.data[0].nip,
          divisi: response.data[0].divisi,
          bagian: response.data[0].bagian,
          detail_posisi: response.data[0].detail_posisi,
          jabatan: response.data[0].jabatan,
          group: response.data[0].group,
          kode_admin: response.data[0].kode_admin,
          kode_kontrak: response.data[0].kode_kontrak,
          kode_periode: response.data[0].kode_periode,
          sales_office: response.data[0].sales_office,
          tgl_masuk: response.data[0].tgl_masuk,
          tgl_penetapan: response.data[0].tgl_penetapan,
          status_karyawan: response.data[0].status_karyawan,
          tgl_keluar: response.data[0].tgl_keluar,
          alasan_keluar: response.data[0].alasan_keluar,
          gaji_perbulan: response.data[0].gaji_perbulan,
          pengalaman: response.data[0].pengalaman,
        }
        if(this.data_pekerjaan.status_karyawan == 0){
          this.karyawan_aktif = false;
        }
      }
    )
    .catch((error) => {
      console.log(error);
    })
  }
}
