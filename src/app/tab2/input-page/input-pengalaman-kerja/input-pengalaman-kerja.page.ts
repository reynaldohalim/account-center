import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-input-pengalaman-kerja',
  templateUrl: './input-pengalaman-kerja.page.html',
  styleUrls: ['./input-pengalaman-kerja.page.scss'],
})
export class InputPengalamanKerjaPage implements OnInit {

  pengalaman_kerja={
    id: null,
    nip:0,
    nama_perusahaan:'',
    alamat:'',
    tahun_awal:'',
    tahun_akhir:'',
    alasan_pindah:'',
    total_karyawan:'',
    uraian_pekerjaan:'',
    nama_atasan:'',
    no_telepon:'',
    gaji:'',
    jabatan_awal:'',
    jabatan_akhir:'',
    total_bawahan:'',
    approved_by: ''
  }

  old_data: any;
  title: string = 'Pengalaman Kerja';
  updatable = true;
  btn_kirim = 'Kirim';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nip']) {
        this.pengalaman_kerja.nip = params['nip'];
      }
      else{
        this.router.navigate(['/login']);
      }

      if (params && params['id']) {
        this.pengalaman_kerja.id = params['id'];
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
        'nip' : this.pengalaman_kerja.nip,
        'id' : this.pengalaman_kerja.id,
        'data' : 'pengalaman_kerja'
      }
    }

    axios.get(`http://localhost/TA_DB/data.php`, config)
    .then(
      (response) => {
        this.pengalaman_kerja ={
          id: response.data[0].id,
          nip: response.data[0].nip,
          nama_perusahaan: response.data[0].nama_perusahaan,
          alamat: response.data[0].alamat,
          tahun_awal: response.data[0].tahun_awal,
          tahun_akhir: response.data[0].tahun_akhir,
          alasan_pindah: response.data[0].alasan_pindah,
          total_karyawan: response.data[0].total_karyawan,
          uraian_pekerjaan: response.data[0].uraian_pekerjaan,
          nama_atasan: response.data[0].nama_atasan,
          no_telepon: response.data[0].no_telepon,
          gaji: response.data[0].gaji,
          jabatan_awal: response.data[0].jabatan_awal,
          jabatan_akhir: response.data[0].jabatan_akhir,
          total_bawahan: response.data[0].total_bawahan,
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

    if(this.pengalaman_kerja.id != null){
      config ={
        'nip' : this.pengalaman_kerja.nip,
        'tabel' : 'pengalaman_kerja',
        'data' : this.pengalaman_kerja,
        'data_lama' : this.pengalaman_kerja.id,
      }
    }
    else {
      config ={
        'nip' : this.pengalaman_kerja.nip,
        'tabel' : 'pengalaman_kerja',
        'data' : this.pengalaman_kerja,
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
    if(this.title == 'Perbarui Pengalaman Kerja') this.title = 'Pengalaman Kerja';
    else this.title = 'Perbarui Pengalaman Kerja';
    
    this.updatable = !this.updatable;
  }
}
