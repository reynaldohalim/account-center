import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { Observable, catchError, throwError } from 'rxjs';
import { api_address } from 'src/app/api-address';

@Component({
  selector: 'app-input-izin',
  templateUrl: './input-izin.page.html',
  styleUrls: ['./input-izin.page.scss'],
})
export class InputIzinPage implements OnInit {
  izin = {
    no_ijin: '',
    nip: '',
    jenis_izin: '',
    tgl_izin: '',
    jam_in: null,
    jam_out: null,
    keterangan: '',
  };

  jenis_izin = {
    kode_jenis_izin: '',
    jenis_izin: '',
    durasi_max: ''
  };

  jenis_izins: any = [];
  title = 'Input Izin';
  btn_kirim = 'Kirim';
  updatable = false;
  status = '';
  hide_button = false;
  selectedFile: File | null = null;
  selectedFileUrl: string | ArrayBuffer | null = null;
  imageUrl: SafeUrl | undefined;
  no_ijin: any;
  sanitizer: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nip']) {
        this.izin.nip = params['nip'];
      }
      else {
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

  updateMode() {
    if (this.title == 'Input Izin') this.title = 'Perbarui Izin';
    else this.title = 'Input Izin';

    this.updatable = !this.updatable;
  }

  loadImage() {
    const extensions = ['png', 'jpg', 'jpeg'];
    let imageLoaded = false;

    // Try to load image with different extensions
    extensions.forEach(extension => {
      const imageUrl = `https://account-center.my.id/TA_DB/lampiran/${this.izin.no_ijin}.${extension}`;
      if(!imageLoaded){
        this.http.get(imageUrl, { responseType: 'blob' })
        .subscribe(() => {
          imageLoaded = true; // Stop further attempts
          this.imageUrl = imageUrl
        });
      }
    });

    // If no image was found with any extension, set an error message
    // setTimeout(() => {
    //   if (!imageLoaded) {
    //     this.errorMessage = 'Image not found';
    //   }
    // }, extensions.length * 1000); // Adjust timeout based on number of extensions
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFileUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }

  }

  uploadFile(newName: String): void {
    if (!this.selectedFile) {
      alert('Tidak ada lampiran.');
      return;
    }

    let extension = this.selectedFile.name.split('.').pop(); // This assumes there's exactly one '.' in the filename
    // Create the new filename with the new name and the original extension
    let newFileName = `${newName}.${extension}`;

    const formData = new FormData();
    formData.append('file', this.selectedFile, newFileName);
    console.log(this.selectedFile);


    this.http.post(api_address, formData)
      .subscribe(
        response => {
          console.log(response);
          alert('File uploaded successfully.');
        },
        error => {
          console.error(error);
          alert('File upload failed.');
        }
      );
  }

  send() {
    let config;
    config = {
      'nip': this.izin.nip,
      'tabel': 'ijin',
      'data': this.izin,
    }

    console.log('send');

    if (this.izin.tgl_izin != '' && this.izin.jenis_izin != '') {
      axios.post(api_address, config)
        .then(
          (response) => {
            if(this.selectedFile){
              this.uploadFile(response.data);
              this.imageUrl = undefined;
            }
            console.log(response);
            this.sendNotifikasi(response.data);
            this.updateMode();
          }
        )
        .catch((error) => {
          console.log(error);
        })
    }
  }

  getJenisIzin() {
    const config = {
      params: {
        'nip': this.izin.nip,
        'data': 'jenis_izin'
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

  getIzin() {
    let config = {
      params: {
        'data': 'ijin',
        'nip': this.izin.nip,
        'no_ijin': this.izin.no_ijin
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

          if (response.data[0].approve1 != '' && response.data[0].approve1 != null) {
            this.status = 'Menunggu Approve 2';
            this.hide_button = true;
          }
          else {
            this.status = 'Menunggu Approve 1';
            this.hide_button = false;
            this.updatable = true;
          }
          this.loadImage();
        }
      )
      .catch((error) => {
        console.log(error);
      })
  }

  sendNotifikasi(no_ijin: string) {
    const config = {
      params: {
        'data': 'token',
        'nip': this.izin.nip,
      }
    }

    axios.get(api_address, config)
      .then((response) => {
        console.log(response.data['token']);

        const body = {
          params: {
            title: 'Pengajuan Izin - ' + response.data['nama'] + ' - ' + response.data['divisi'],
            message:
              'No. Ijin: ' + no_ijin +
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

  //test
  sendNotif() {
    let config = {
      params: {
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
