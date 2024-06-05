import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  karyawan={
    nip:0,
    nama:'',
    jabatan:'',
    bagian:''
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nip']) {
        this.karyawan.nip = params['nip'];
        this.karyawan.nama = params['nama'];
        this.karyawan.jabatan = params['jabatan'];
        this.karyawan.bagian = params['bagian'];
      }
      else{
        this.router.navigate(['/login']);
      }
    });
  }

  navigateToData(page: string){
    const data ={
      nip: `${this.karyawan.nip}`,
    };

    this.router.navigate([''+page], {queryParams: data});
  }
}
