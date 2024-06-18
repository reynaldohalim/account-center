import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { Observable } from 'rxjs';
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

    if(this.izin.tgl_izin != '' && this.izin.jenis_izin != ''){
      axios.post(api_address, config)
      .then(
        (response) => {
          console.log(response.data);
          this.sendNotifikasi(response.data);
        }
      )
      .catch((error) => {
        console.log(error);
      })
    }
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

  sendNotifikasi(no_ijin: string){
    const config={
      params:{
        'data' : 'token',
        'nip' : this.izin.nip,
      }
    }

    axios.get(api_address, config)
      .then((response) => {
        console.log(response.data['token']);

        const body = {
          params:{
            title : 'Pengajuan Izin - '+ response.data['nama'] + ' - ' + response.data['divisi'],
            message :
            'No. Ijin: '+ no_ijin +
            '\r\nNIP: ' + this.izin.nip +
            '\r\nTanggal: ' + this.izin.tgl_izin +
            '\r\nJenis Izin: ' + this.izin.jenis_izin +
            '\r\nKeterangan:\r\n' + this.izin.keterangan,
            token: response.data['token']
          }
        };
        console.log(body.params);

        axios.get('https://account-center.my.id/send-notification', body)
        .then(
          (response) => {
            console.log(response)
          }
        )
        .catch((error) => {
          console.log(error);
        });

      })
      .catch((error) => {
        console.log(error);
      });
    }

  sendNotif() {
    let config={
      params:{
        title: 'coba haloooo2',
        message: 'coba message',
        deviceToken: 'e-hDMOuSTa-IUjtgkU1b_j:APA91bGTGZiQ6gU68f5UaVpj6-mg9g4eMK0DXhvquTdjC_DX4xumjNCpsmA2UDokBEtL_e8UY8dZO2qc4p4O-KbXyTpzEea0cg9B4jj7Utr52K6rQdQkd8g6d27TBiNBMO93W1ac7XJe' // Replace with actual device token
      }
    }

    axios.get('http://localhost:8000/send-notification', config)
    .then(
      (response) => {
        console.log(response)
      }
    )
    .catch((error) => {
      console.log(error);
    });
  }

  // private sendNotificationUrl = 'https://account-center.my.id/TA_DB/send_notification.php'; // Replace with your server URL

  // sendNotification(title: string, message: string, deviceToken: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   const body = {
  //     title: title,
  //     message: message,
  //     deviceToken: deviceToken
  //   };

  //   return this.http.post(this.sendNotificationUrl, body, { headers: headers });
  // }

  // sendNotif() {
  //   const title = 'Test Notification';
  //   const message = 'This is a test notification from Ionic';
  //   const deviceToken = 'e-hDMOuSTa-IUjtgkU1b_j:APA91bGTGZiQ6gU68f5UaVpj6-mg9g4eMK0DXhvquTdjC_DX4xumjNCpsmA2UDokBEtL_e8UY8dZO2qc4p4O-KbXyTpzEea0cg9B4jj7Utr52K6rQdQkd8g6d27TBiNBMO93W1ac7XJe'; // Replace with the actual device token

  //   this.sendNotification(title, message, deviceToken).subscribe(
  //     response => {
  //       console.log('Notification sent successfully', response);
  //     },
  //     error => {
  //       console.error('Error sending notification', error);
  //     }
  //   );
  // }

  // sendNotif() {
  //   const notification = {
  //     title: 'cobaa title',
  //     message: 'coba message',
  //     token: 'e-hDMOuSTa-IUjtgkU1b_j:APA91bGTGZiQ6gU68f5UaVpj6-mg9g4eMK0DXhvquTdjC_DX4xumjNCpsmA2UDokBEtL_e8UY8dZO2qc4p4O-KbXyTpzEea0cg9B4jj7Utr52K6rQdQkd8g6d27TBiNBMO93W1ac7XJe'
  //   };

  //   // Check if CSRF token is available before making the request

  //   axios.post('http://localhost:8000/send-notification', notification, {})
  //   .then(response => {
  //     console.log('Push notification sent successfully:', response.data);
  //   })
  //   .catch(error => {
  //     console.error('Error sending push notification:', error);
  //   });
  // }


}
