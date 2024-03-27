import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  { 
    path: 'data-pribadi',
    loadChildren: () => import('./data-pribadi/data-pribadi.module').then( m => m.DataPribadiPageModule)
  },
  { 
    path: 'data-pekerjaan',
    loadChildren: () => import('./data-pekerjaan/data-pekerjaan.module').then( m => m.DataPekerjaanPageModule)
  },
  {
    path: 'data-lainlain',
    loadChildren: () => import('./data-lainlain/data-lainlain.module').then( m => m.DataLainlainPageModule)
  },
  {
    path: 'data-keluarga',
    loadChildren: () => import('./data-keluarga/data-keluarga.module').then( m => m.DataKeluargaPageModule)
  },
  {
    path: 'input-keluarga',
    loadChildren: () => import('./input-page/input-keluarga/input-keluarga.module').then( m => m.InputKeluargaPageModule)
  },
  {
    path: 'pendidikan',
    loadChildren: () => import('./pendidikan/pendidikan.module').then( m => m.PendidikanPageModule)
  },
  {
    path: 'bahasa-dan-organisasi',
    loadChildren: () => import('./bahasa-dan-organisasi/bahasa-dan-organisasi.module').then( m => m.BahasaDanOrganisasiPageModule)
  },
  {
    path: 'pengalaman-kerja',
    loadChildren: () => import('./pengalaman-kerja/pengalaman-kerja.module').then( m => m.PengalamanKerjaPageModule)
  },
  {
    path: 'data-training',
    loadChildren: () => import('./data-training/data-training.module').then( m => m.DataTrainingPageModule)
  },
  {
    path: 'absensi',
    loadChildren: () => import('./absensi/absensi.module').then( m => m.AbsensiPageModule)
  },
  {
    path: 'input-pendidikan',
    loadChildren: () => import('./input-page/input-pendidikan/input-pendidikan.module').then( m => m.InputPendidikanPageModule)
  },
  {
    path: 'input-bahasa',
    loadChildren: () => import('./input-page/input-bahasa/input-bahasa.module').then( m => m.InputBahasaPageModule)
  },
  {
    path: 'input-organisasi',
    loadChildren: () => import('./input-page/input-organisasi/input-organisasi.module').then( m => m.InputOrganisasiPageModule)
  },
  {
    path: 'input-pengalaman-kerja',
    loadChildren: () => import('./input-page/input-pengalaman-kerja/input-pengalaman-kerja.module').then( m => m.InputPengalamanKerjaPageModule)
  },
  {
    path: 'input-izin',
    loadChildren: () => import('./input-page/input-izin/input-izin.module').then( m => m.InputIzinPageModule)
  },
  {
    path: 'bahasa',
    loadChildren: () => import('./bahasa/bahasa.module').then( m => m.BahasaPageModule)
  },
  {
    path: 'organisasi',
    loadChildren: () => import('./organisasi/organisasi.module').then( m => m.OrganisasiPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
