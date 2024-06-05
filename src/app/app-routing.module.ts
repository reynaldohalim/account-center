import { Tab2PageModule } from './tab2/tab2.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'data-pribadi',
    loadChildren: () => import('./tab2/data-pribadi/data-pribadi.module').then( m => m.DataPribadiPageModule)
  },
  {
    path: 'data-pekerjaan',
    loadChildren: () => import('./tab2/data-pekerjaan/data-pekerjaan.module').then( m => m.DataPekerjaanPageModule)
  },
  {
    path: 'data-lainlain',
    loadChildren: () => import('./tab2/data-lainlain/data-lainlain.module').then( m => m.DataLainlainPageModule)
  },
  {
    path: 'data-keluarga',
    loadChildren: () => import('./tab2/data-keluarga/data-keluarga.module').then( m => m.DataKeluargaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'input-keluarga',
    loadChildren: () => import('./tab2/input-page/input-keluarga/input-keluarga.module').then( m => m.InputKeluargaPageModule)
  },
  {
    path: 'pendidikan',
    loadChildren: () => import('./tab2/pendidikan/pendidikan.module').then( m => m.PendidikanPageModule)
  },
  {
    path: 'bahasa-dan-organisasi',
    loadChildren: () => import('./tab2/bahasa-dan-organisasi/bahasa-dan-organisasi.module').then( m => m.BahasaDanOrganisasiPageModule)
  },
  {
    path: 'pengalaman-kerja',
    loadChildren: () => import('./tab2/pengalaman-kerja/pengalaman-kerja.module').then( m => m.PengalamanKerjaPageModule)
  },
  {
    path: 'data-training',
    loadChildren: () => import('./tab2/data-training/data-training.module').then( m => m.DataTrainingPageModule)
  },
  {
    path: 'absensi',
    loadChildren: () => import('./tab2/absensi/absensi.module').then( m => m.AbsensiPageModule)
  },
  {
    path: 'input-pendidikan',
    loadChildren: () => import('./tab2/input-page/input-pendidikan/input-pendidikan.module').then( m => m.InputPendidikanPageModule)
  },
  {
    path: 'input-bahasa',
    loadChildren: () => import('./tab2/input-page/input-bahasa/input-bahasa.module').then( m => m.InputBahasaPageModule)
  },
  {
    path: 'input-organisasi',
    loadChildren: () => import('./tab2/input-page/input-organisasi/input-organisasi.module').then( m => m.InputOrganisasiPageModule)
  },
  {
    path: 'input-pengalaman-kerja',
    loadChildren: () => import('./tab2/input-page/input-pengalaman-kerja/input-pengalaman-kerja.module').then( m => m.InputPengalamanKerjaPageModule)
  },
  {
    path: 'input-izin',
    loadChildren: () => import('./tab2/input-page/input-izin/input-izin.module').then( m => m.InputIzinPageModule)
  },
  {
    path: 'bahasa',
    loadChildren: () => import('./tab2/bahasa/bahasa.module').then( m => m.BahasaPageModule)
  },
  {
    path: 'organisasi',
    loadChildren: () => import('./tab2/organisasi/organisasi.module').then( m => m.OrganisasiPageModule)
  },
  {
    path: 'izin',
    loadChildren: () => import('./tab2/izin/izin.module').then( m => m.IzinPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
