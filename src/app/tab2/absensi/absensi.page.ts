import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

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
  karyawan_aktif: boolean = true;

  absensi={
    nip:0,
    absen_full:0,
    cuti:0,
    tugas:0,
    absen_error:0
  }

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
    const config={
      params:{
        'nip' : this.absensi.nip,
        'data' : 'absensi'
      }
    }

    axios.get(`http://localhost/TA_DB/data.php`, config)
    .then(
      (response) => {
        // this.absensi ={
        //   nip: response.data[0].nip,
        //   absen_full: response.data[0].absen_full,
        //   cuti: response.data[0].cuti,
        //   tugas: response.data[0].tugas,
        //   absen_error: response.data[0].absen_error,
        // }
      }
    )
    .catch((error) => {
      console.log(error);
    })
  }

  navigateToIzin(){
    const data ={
      nip: `${this.absensi.nip}`,
    };

    this.router.navigate(['tabs/tab2/izin'], {queryParams: data});
  }
}
