import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bahasa-dan-organisasi',
  templateUrl: './bahasa-dan-organisasi.page.html',
  styleUrls: ['./bahasa-dan-organisasi.page.scss'],
})
export class BahasaDanOrganisasiPage implements OnInit {
  nip = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['nip']) {
        this.nip = params['nip'];
      }
      else{
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
  }

  navigateToData(page: string){
    const data ={
      nip: `${this.nip}`,
    };

    this.router.navigate([''+page], {queryParams: data});
  }
}
