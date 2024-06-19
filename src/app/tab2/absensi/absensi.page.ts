import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { api_address } from 'src/app/api-address';

declare var google: { visualization: {
  PieChart: any;
  arrayToDataTable(arg0: ((string | number)[] | (string | { role: string; })[])[]): unknown; DataTable: new () => any; BarChart: new (arg0: HTMLElement | null) => any;
}; };

@Component({
  selector: 'app-absensi',
  templateUrl: './absensi.page.html',
  styleUrls: ['./absensi.page.scss'],
})


export class AbsensiPage implements OnInit{
  satu_periode = 'true';
  show_pilih_bulan = false;
  tgl_awal = '';
  tgl_akhir = '';
  min_tgl = '2023-06';
  min_tgl_akhir = this.min_tgl;
  max_tgl = this.getCurrentYearMonth();

  full_count = 0;
  arr_cuti = [];
  arr_tugas = [];
  arr_error = [];


  absensi = {
    nip:'',
    full:0,
    cuti:0,
    tugas:0,
    error:0
  }

  full_isActive = true;
  cuti_isActive = true;
  tugas_isActive = true;
  error_isActive = true;
  show_detail = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nip']) {
        this.absensi.nip = params['nip'];
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
    let config;

    if (this.satu_periode == 'true'){
      config={
        params:{
          'nip' : this.absensi.nip,
          'data' : 'absensi',
        }
      }
    }
    else{
      config={
        params:{
          'nip' : this.absensi.nip,
          'data' : 'absensi',
          'tgl_awal' : this.tgl_awal,
          'tgl_akhir' : this.tgl_akhir,
        }
      }
    }

    axios.get(api_address, config)
    .then(
      (response) => {
        // console.log(response.data.error);
        this.full_count = response.data.full_count;
        this.arr_cuti = response.data.cuti;
        this.arr_tugas = response.data.tugas;
        this.arr_error = response.data.error;

        const total = response.data.full_count + this.arr_cuti.length + this.arr_tugas.length + this.arr_error.length;
        const full = parseFloat((response.data.full_count / total *100).toFixed(1));
        const cuti = parseFloat((this.arr_cuti.length / total *100).toFixed(1));
        const tugas = parseFloat((this.arr_tugas.length / total *100).toFixed(1));
        const error = parseFloat((this.arr_error.length / total *100).toFixed(1));

        this.absensi ={
          nip: response.data.nip,
          full: full,
          cuti: cuti,
          tugas: tugas,
          error: error,
        }
        this.showAll();
      }
    )
    .catch((error) => {
      console.log(error);
    })
  }

  navigateToIzin(){
    const data ={
      nip: `${this.absensi.nip}`
    };

    this.router.navigate(['izin'], {queryParams: data});
  }

  navigateToDetailAbsen(param: string){
    const data ={
      nip: `${this.absensi.nip}`,
      detail: `${param}`
    };

    this.router.navigate(['absensi/detail-absen'], {queryParams: data});
  }

  periode_change() {
    if(this.satu_periode == 'false') this.show_pilih_bulan = true;
    else this.show_pilih_bulan = false;
    this.getData()
  }

  tgl_awal_change(){
    this.min_tgl_akhir = this.tgl_awal;
    this.tgl_akhir = this.tgl_awal;
    this.getData();
  }

  tgl_akhir_change(){
    this.getData();
  }

  getCurrentYearMonth(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0 for January)
    const monthString = month < 10 ? '0' + month : '' + month; // Add leading zero if month is single digit
    return year + '-' + monthString;
  }

  formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }

  showFull(){
    this.full_isActive = true;
    this.cuti_isActive = false;
    this.tugas_isActive = false;
    this.error_isActive = false;
    this.show_detail = true;
  }

  showCuti(){
    this.full_isActive = false;
    this.cuti_isActive = true;
    this.tugas_isActive = false;
    this.error_isActive = false;
    this.show_detail = true;
  }

  showTugas(){
    this.full_isActive = false;
    this.cuti_isActive = false;
    this.tugas_isActive = true;
    this.error_isActive = false;
    this.show_detail = true;
  }

  showError(){
    this.full_isActive = false;
    this.cuti_isActive = false;
    this.tugas_isActive = false;
    this.error_isActive = true;
    this.show_detail = true;
  }

  showAll(){
    this.full_isActive = true;
    this.cuti_isActive = true;
    this.tugas_isActive = true;
    this.error_isActive = true;
    this.show_detail = false;
  }
}
