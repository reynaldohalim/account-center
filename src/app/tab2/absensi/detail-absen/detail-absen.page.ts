import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { api_address } from 'src/app/api-address';

@Component({
  selector: 'app-detail-absen',
  templateUrl: './detail-absen.page.html',
  styleUrls: ['./detail-absen.page.scss'],
})
export class DetailAbsenPage implements OnInit {
  title = 'Detail Absen'
  detail_absen={
    nip:0,
    no_ijin:'',
    jenis_ijin:'',
    tgl_ijin:'',
    approve1:'',
    tgl_approve1:'',
    approve2:'',
    tgl_approve2:'',
    keterangan:''
  }

  error = false;
  icon_name = 'alert-circle';
  icon_color = 'cuti_color_true';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nip'] && params['detail']) {
        this.detail_absen.nip = params['nip'];
        this.detail_absen.no_ijin = params['detail'];
      }
      else{
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    this.getData()
  }

  getData(){
    const config={
      params:{
        'data' : 'detail_absen',
        'nip' : this.detail_absen.nip,
        'detail_absen' : this.detail_absen.no_ijin,
      }
    }

    axios.get(api_address, config)
    .then(
      (response) => {
        const jenis_detail = response.data.jenis_detail;
        if(jenis_detail == 'error'){
          this.error = true;
          this.icon_name = 'close-circle';
          this.icon_color = 'error_color_true';

          this.detail_absen ={
            nip: response.data.nip,
            no_ijin: '',
            jenis_ijin: '',
            tgl_ijin: this.detail_absen.no_ijin,
            approve1: '',
            tgl_approve1: '',
            approve2: '',
            tgl_approve2: '',
            keterangan: response.data.keterangan
          }
        }
        else{
          if (jenis_detail == 'cuti'){
            this.icon_name = 'alert-circle';
            this.icon_color = 'cuti_color_true'
          }
          else if(jenis_detail == 'tugas'){
            this.icon_name = 'disc';
            this.icon_color = 'tugas_color_true';
          }

          this.detail_absen ={
            nip: response.data.nip,
            no_ijin: response.data.izin[0].no_ijin,
            jenis_ijin: response.data.izin[0].jenis_ijin,
            tgl_ijin: response.data.izin[0].tgl_ijin,
            approve1: response.data.izin[0].approve1,
            tgl_approve1: response.data.izin[0].tgl_approve1,
            approve2: response.data.izin[0].approve2,
            tgl_approve2: response.data.izin[0].tgl_approve2,
            keterangan: response.data.izin[0].keterangan
          }
        }
      }
    )
    .catch((error) => {
      console.log(error);
    })
  }

  formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }

  formatDateTime(input: string): string {
    const [datePart, timePart] = input.split(' ');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');

    // Format date as day-month-year
    const formattedDate = `${day}-${month}-${year}`;
    // Format time and adjust minute
    const formattedTime = `${hour}:${String(Number(minute) - 1).padStart(2, '0')}`;

    return `${formattedDate}, ${formattedTime}`;
}
}
