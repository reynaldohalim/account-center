<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wings_employee";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) die("" . $conn->connect_error);


if ($_SERVER['REQUEST_METHOD'] === "POST") {
  $rawPostData = file_get_contents('php://input');
  $postData = json_decode($rawPostData, true);
  $response;

  if (isset($postData['nik'])) {
    $nik = $postData['nik'];
    //obtain nip
    $query = "select * from data_lainlain where no_ktp='$nik'";
    if ($is_query_run = mysqli_query($conn, $query)) {
      $select_datalainlain = mysqli_fetch_assoc($is_query_run);

      if ($select_datalainlain) {
        $nip = $select_datalainlain["nip"];

        //avoid account duplication
        $query = "select * from akun where nip='$nip'";
        $select_akun = mysqli_fetch_assoc(mysqli_query($conn, $query));
        if ($select_akun) {
          $response = array('success' => false, 'message' => 'Sudah memiliki akun', 'nik' => $nik);
        } else {
          $no_hp = $postData['no_hp'];
          $email = $postData['email'];
          $password = $postData['password'];
          $hashed_password = password_hash($password, PASSWORD_DEFAULT);

          //insert new account
          $query = "INSERT INTO akun (nip, password) VALUES ('$nip', '$hashed_password')";
          if (mysqli_query($conn, $query)) {
            $response = array('success' => true);

            //update email
            $query = "UPDATE data_lainlain set email='$email' where nip='$nip'";
            if (mysqli_query($conn, $query)) $response = array('success' => true, 'message' => 'Email terupdate');
            else $response = array('success' => true, 'message' => 'Update email error');

            //update no.hp
            $query = "UPDATE data_pribadi set no_hp='$no_hp' where nip='$nip'";
            if (mysqli_query($conn, $query)) $response = array('success' => true, 'message' => 'No. Hp terupdate');
            else $response = array('success' => true, 'message' => 'Update no.hp error');
          } else $response = array('success' => false, 'message' => 'Pembuatan akun baru Error');
        }
      } else $response = array('success' => false, 'message' => 'NIK tidak terdaftar sebagai karyawan', 'nik' => $nik);
    } else $response = array('success' => false, 'message' => 'Error select data lain-lain');
  } else if (isset($postData['nip'])) {
    $nip = $postData["nip"];
    $query = '';
    $tabel;

    if (isset($postData['tabel'])) $tabel = $postData['tabel'];

    if (isset($postData['password'])) { //login
      $password = $postData['password'];
      $response = array('success' => false);

      $query = "select * from akun where nip='$nip'";

      if ($is_query_run = mysqli_query($conn, $query)) {
        $row = mysqli_fetch_assoc($is_query_run);
        if ($row) {
          $hashedPassword = $row['password'];

          // Verify hashed password
          if (password_verify($password, $hashedPassword)) {
            $query = "select nama from data_pribadi where nip='$nip'";
            $data_pribadi = mysqli_fetch_assoc(mysqli_query($conn, $query));

            if (isset($postData['token'])) {
              $token = $postData['token'];
              $query = "UPDATE akun set token='$token' where nip='$nip'";
              mysqli_query($conn, $query);
            }

            $query = "select * from data_pekerjaan where nip='$nip'";
            $data_pekerjaan = mysqli_fetch_assoc(mysqli_query($conn, $query));

            $response = array('success' => true, 'nama' => $data_pribadi['nama'], 'bagian' => $data_pekerjaan['bagian'], 'jabatan' => $data_pekerjaan['jabatan']);
          } else $response = array('success' => false, 'message' => 'Kata sandi tidak valid'); //salah password
        } else $response = array('success' => false, 'message' => 'NIP atau kata sandi tidak valid'); // Username not found
      } else echo "Error cari NIP: " . mysqli_error($conn); //error select akun
    } else if ($tabel == 'ijin') {
      $tgl_ijin = $postData["data"]["tgl_izin"];
      // $tgl_ijin_end = $postData["data"]["tgl_izin_end"];
      $jenis_ijin = $postData["data"]["jenis_izin"];
      $keterangan = $postData["data"]["keterangan"];
      $jam_in = $postData["data"]["jam_in"];
      $jam_out = $postData["data"]["jam_out"];

      if ($jam_in == '')
        $jam_in = 'null';
      if ($jam_out == '')
        $jam_out = 'null';


      if ($postData["data"]["no_ijin"] != '') {
        $no_ijin = $postData["data"]["no_ijin"];
        $query = "UPDATE $tabel set tgl_ijin='$tgl_ijin', jenis_ijin='$jenis_ijin', keterangan='$keterangan', jam_in='$jam_in', jam_out='$jam_out', tgl_entry=CURRENT_TIMESTAMP where no_ijin='$no_ijin' AND approve1 is null";
        $response = $no_ijin;
      } else {
        //obtain no ijin
        $no_ijin = "I000000000";
        $query = "select no_ijin from ijin ORDER by no_ijin DESC LIMIT 1";
        if ($is_query_run = mysqli_query($conn, $query)) {
          $select_no_ijin = mysqli_fetch_assoc($is_query_run);

          if ($select_no_ijin) {
            $no_ijin = $select_no_ijin["no_ijin"];
          }
        }
        $number_part = substr($no_ijin, 1);
        $number_int = (int)$number_part;
        $number_int += 1;
        $new_number_part = str_pad($number_int, strlen($number_part), '0', STR_PAD_LEFT);
        $new_no_ijin = $no_ijin[0] . $new_number_part;

        // obtain gaji_dibayar, potong cuti
        $gaji_dibayar = 0;
        $potong_cuti = 1;
        $query = "select * from jenis_izin where kode_jenis_izin='$jenis_ijin'";
        if ($is_query_run = mysqli_query($conn, $query)) {
          $select_jenis_izin = mysqli_fetch_assoc($is_query_run);

          if ($select_jenis_izin) {
            $gaji_dibayar = $select_jenis_izin["gaji_dibayar"];
            $potong_cuti = $select_jenis_izin["potong_cuti"];
          }
        }
        // $query = "INSERT INTO $tabel (nip, no_ijin, tgl_ijin, jenis_ijin, keterangan, jam_in, jam_out, gaji_dibayar, potong_cuti, tgl_entry) VALUES ('$nip', '$new_no_ijin', '$tgl_ijin', '$jenis_ijin', '$keterangan', '$jam_in', '$jam_out', '$gaji_dibayar', '$potong_cuti', CURRENT_TIMESTAMP)";
        $response = $new_no_ijin;
      }
    } else if ($tabel == "data_keluarga") {
      $nama = $postData["data"]["nama"];
      $hubungan = $postData["data"]["hubungan"];
      $jenis_kelamin = $postData["data"]["jenis_kelamin"];
      $tgl_lahir = $postData["data"]["tgl_lahir"];
      $tempat_lahir = $postData["data"]["tempat_lahir"];
      $pendidikan = $postData["data"]["pendidikan"];
      $keterangan = $postData["data"]["keterangan"];
      $approved_by = $postData["data"]["approved_by"];

      $data_lama = $postData["data_lama"];

      //insert new data
      if ($data_lama == "") {
        //insert $tabel
        $query = "INSERT INTO $tabel (nip, nama, hubungan, jenis_kelamin, tgl_lahir, tempat_lahir, pendidikan, keterangan) VALUES ('$nip', '$nama', '$hubungan', '$jenis_kelamin', '$tgl_lahir', '$tempat_lahir', '$pendidikan', '$keterangan');";
        mysqli_query($conn, $query);

        //insert pembaruan
        $query = "SELECT LAST_INSERT_ID() as id;";
        $is_query_run = mysqli_query($conn, $query);
        $fetched_data = mysqli_fetch_assoc($is_query_run);
        $data_baru = $fetched_data["id"];
        $query = "INSERT INTO `pembaruan_data`(`nip`, `tabel`, `data_baru`, `tgl_pengajuan`) VALUES ('$nip','$tabel','$data_baru',CURRENT_TIMESTAMP)";
      } else {
        //Update not approved data
        if ($approved_by == "") {
          // update data baru
          $query = "Update $tabel set nama = '$nama', jenis_kelamin = '$jenis_kelamin', tgl_lahir = '$tgl_lahir', tempat_lahir = '$tempat_lahir', pendidikan = '$pendidikan', keterangan = '$keterangan' where id = '$data_lama';";
          mysqli_query($conn, $query);

          //update pembaruan
          $query = "UPDATE pembaruan_data set tgl_pengajuan=CURRENT_TIMESTAMP where nip='$nip' AND tabel='$tabel' AND data_lama='$data_lama'";
        }
        //Update approved data
        else {
          //check if there is not-approved request
          $query = "SELECT * FROM pembaruan_data where nip='$nip' and tabel='$tabel' and data_lama='$data_lama' and approved_by is null";
          if ($is_query_run = mysqli_query($conn, $query)) {
            if ($fetched_data = mysqli_fetch_assoc($is_query_run)) {
              //update tabel
              $data_baru = $fetched_data["data_baru"];
              $query = "Update $tabel set nama = '$nama', jenis_kelamin = '$jenis_kelamin', tgl_lahir = '$tgl_lahir', tempat_lahir = '$tempat_lahir', pendidikan = '$pendidikan', keterangan = '$keterangan' where id = '$data_baru';";
              mysqli_query($conn, $query);

              //update pembaruan
              $query = "UPDATE pembaruan_data set tgl_pengajuan=CURRENT_TIMESTAMP where nip='$nip' AND tabel='$tabel' AND data_baru='$data_baru'";
            } else {
              //insert tabel
              $query = "INSERT INTO $tabel (nip, nama, hubungan, jenis_kelamin, tgl_lahir, tempat_lahir, pendidikan, keterangan) VALUES ('$nip', '$nama', '$hubungan', '$jenis_kelamin', '$tgl_lahir', '$tempat_lahir', '$pendidikan', '$keterangan');";
              mysqli_query($conn, $query);
              echo 'xxxxx';

              //insert pembaruan
              $query = "SELECT LAST_INSERT_ID() as id;";
              $is_query_run = mysqli_query($conn, $query);
              $fetched_data = mysqli_fetch_assoc($is_query_run);
              $data_baru = $fetched_data["id"];
              $query = "INSERT INTO `pembaruan_data`(`nip`, `tabel`, `data_lama`, `data_baru`, `tgl_pengajuan`) VALUES ('$nip','$tabel','$data_lama','$data_baru',CURRENT_TIMESTAMP)";
            }
          }
        }
      }
    } else if ($tabel == "pendidikan") {
      $tingkat = $postData["data"]["tingkat"];
      $sekolah = $postData["data"]["sekolah"];
      $kota = $postData["data"]["kota"];
      $jurusan = $postData["data"]["jurusan"];
      $tahun = $postData["data"]["tahun"];
      $ipk = $postData["data"]["ipk"];
      $approved_by = $postData["data"]["approved_by"];

      $data_lama = $postData["data_lama"];

      //insert new data
      if ($data_lama == "") {
        //insert $tabel
        $query = "INSERT INTO $tabel (nip, tingkat, sekolah, kota, jurusan, tahun, ipk) VALUES ('$nip', '$tingkat', '$sekolah', '$kota', '$jurusan', '$tahun', '$ipk');";
        mysqli_query($conn, $query);

        //insert pembaruan
        $query = "SELECT LAST_INSERT_ID() as id;";
        $is_query_run = mysqli_query($conn, $query);
        $fetched_data = mysqli_fetch_assoc($is_query_run);
        $data_baru = $fetched_data["id"];
        $query = "INSERT INTO `pembaruan_data`(`nip`, `tabel`, `data_baru`, `tgl_pengajuan`) VALUES ('$nip','$tabel','$data_baru',CURRENT_TIMESTAMP)";
      } else {
        //Update not approved data
        if ($approved_by == "") {
          // update data baru
          $query = "Update $tabel set tingkat = '$tingkat', kota = '$kota', jurusan = '$jurusan', tahun = '$tahun', ipk = '$ipk' where id = '$data_lama';";
          mysqli_query($conn, $query);

          //update pembaruan
          $query = "UPDATE pembaruan_data set tgl_pengajuan=CURRENT_TIMESTAMP where nip='$nip' AND tabel='$tabel' AND data_lama='$data_lama'";
        }
        //Update approved data
        else {
          //check if requested but not approved
          $query = "SELECT * FROM pembaruan_data where nip='$nip' and tabel='$tabel' and data_lama='$data_lama' and approved_by is null";
          if ($is_query_run = mysqli_query($conn, $query)) {
            if ($fetched_data = mysqli_fetch_assoc($is_query_run)) {
              //update tabel
              $data_baru = $fetched_data["data_baru"];
              $query = "Update $tabel set tingkat = '$tingkat', kota = '$kota', jurusan = '$jurusan', tahun = '$tahun', ipk = '$ipk' where id = '$data_baru';";
              mysqli_query($conn, $query);

              //update pembaruan
              $query = "UPDATE pembaruan_data set tgl_pengajuan=CURRENT_TIMESTAMP where nip='$nip' AND tabel='$tabel' AND data_baru='$data_baru'";
            } else {
              //insert tabel
              $query = "INSERT INTO $tabel (nip, tingkat, sekolah, kota, jurusan, tahun, ipk) VALUES ('$nip', '$tingkat', '$sekolah', '$kota', '$jurusan', '$tahun', '$ipk');";
              mysqli_query($conn, $query);

              //insert pembaruan
              $query = "SELECT LAST_INSERT_ID() as id;";
              $is_query_run = mysqli_query($conn, $query);
              $fetched_data = mysqli_fetch_assoc($is_query_run);
              $data_baru = $fetched_data["id"];
              $query = "INSERT INTO `pembaruan_data`(`nip`, `tabel`, `data_lama`, `data_baru`, `tgl_pengajuan`) VALUES ('$nip','$tabel','$data_lama','$data_baru',CURRENT_TIMESTAMP)";
            }
          }
        }
      }
    } else if ($tabel == "bahasa") {
      $bahasa = $postData["data"]["bahasa"];
      $mendengar = $postData["data"]["mendengar"];
      $membaca = $postData["data"]["membaca"];
      $bicara = $postData["data"]["bicara"];
      $menulis = $postData["data"]["menulis"];
      $approved_by = $postData["data"]["approved_by"];

      $data_lama = $postData["data_lama"];

      //insert new data
      if ($data_lama == "") {
        //insert $tabel
        $query = "INSERT INTO $tabel (nip, bahasa, mendengar, membaca, bicara, menulis) VALUES ('$nip', '$bahasa', '$mendengar', '$membaca', '$bicara', '$menulis');";
        mysqli_query($conn, $query);

        //insert pembaruan
        $query = "SELECT LAST_INSERT_ID() as id;";
        $is_query_run = mysqli_query($conn, $query);
        $fetched_data = mysqli_fetch_assoc($is_query_run);
        $data_baru = $fetched_data["id"];
        $query = "INSERT INTO `pembaruan_data`(`nip`, `tabel`, `data_baru`, `tgl_pengajuan`) VALUES ('$nip','$tabel','$data_baru',CURRENT_TIMESTAMP)";
      } else {
        //Update not approved data
        if ($approved_by == "") {
          // update data baru
          $query = "Update $tabel set bahasa = '$bahasa', membaca = '$membaca', bicara = '$bicara', menulis = '$menulis' where id = '$data_lama';";
          mysqli_query($conn, $query);

          //update pembaruan
          $query = "UPDATE pembaruan_data set tgl_pengajuan=CURRENT_TIMESTAMP where nip='$nip' AND tabel='$tabel' AND data_lama='$data_lama'";
        }
        //Update approved data
        else {
          //check if requested but not approved
          $query = "SELECT * FROM pembaruan_data where nip='$nip' and tabel='$tabel' and data_lama='$data_lama' and approved_by is null";
          if ($is_query_run = mysqli_query($conn, $query)) {
            if ($fetched_data = mysqli_fetch_assoc($is_query_run)) {
              //update tabel
              $data_baru = $fetched_data["data_baru"];
              $query = "Update $tabel set bahasa = '$bahasa', membaca = '$membaca', bicara = '$bicara', menulis = '$menulis' where id = '$data_baru';";
              mysqli_query($conn, $query);

              //update pembaruan
              $query = "UPDATE pembaruan_data set tgl_pengajuan=CURRENT_TIMESTAMP where nip='$nip' AND tabel='$tabel' AND data_baru='$data_baru'";
            } else {
              //insert tabel
              $query = "INSERT INTO $tabel (nip, bahasa, mendengar, membaca, bicara, menulis) VALUES ('$nip', '$bahasa', '$mendengar', '$membaca', '$bicara', '$menulis');";
              mysqli_query($conn, $query);

              //insert pembaruan
              $query = "SELECT LAST_INSERT_ID() as id;";
              $is_query_run = mysqli_query($conn, $query);
              $fetched_data = mysqli_fetch_assoc($is_query_run);
              $data_baru = $fetched_data["id"];
              $query = "INSERT INTO `pembaruan_data`(`nip`, `tabel`, `data_lama`, `data_baru`, `tgl_pengajuan`) VALUES ('$nip','$tabel','$data_lama','$data_baru',CURRENT_TIMESTAMP)";
            }
          }
        }
      }
    } else if ($tabel == "organisasi") {
      $macam_kegiatan = $postData["data"]["macam_kegiatan"];
      $jabatan = $postData["data"]["jabatan"];
      $tahun = $postData["data"]["tahun"];
      $approved_by = $postData["data"]["approved_by"];

      $data_lama = $postData["data_lama"];

      //insert new data
      if ($data_lama == "") {
        //insert $tabel
        $query = "INSERT INTO $tabel (nip, macam_kegiatan, jabatan, tahun) VALUES ('$nip', '$macam_kegiatan', '$jabatan', '$tahun');";
        mysqli_query($conn, $query);

        //insert pembaruan
        $query = "SELECT LAST_INSERT_ID() as id;";
        $is_query_run = mysqli_query($conn, $query);
        $fetched_data = mysqli_fetch_assoc($is_query_run);
        $data_baru = $fetched_data["id"];
        $query = "INSERT INTO `pembaruan_data`(`nip`, `tabel`, `data_baru`, `tgl_pengajuan`) VALUES ('$nip','$tabel','$data_baru',CURRENT_TIMESTAMP)";
      } else {
        //Update not approved data
        if ($approved_by == "") {
          // update data baru
          $query = "Update $tabel set macam_kegiatan = '$macam_kegiatan', jabatan = '$jabatan', tahun = '$tahun' where id = '$data_lama';";
          mysqli_query($conn, $query);

          //update pembaruan
          $query = "UPDATE pembaruan_data set tgl_pengajuan=CURRENT_TIMESTAMP where nip='$nip' AND tabel='$tabel' AND data_lama='$data_lama'";
        }
        //Update approved data
        else {
          //check if requested but not approved
          $query = "SELECT * FROM pembaruan_data where nip='$nip' and tabel='$tabel' and data_lama='$data_lama' and approved_by is null";
          if ($is_query_run = mysqli_query($conn, $query)) {
            if ($fetched_data = mysqli_fetch_assoc($is_query_run)) {
              //update tabel
              $data_baru = $fetched_data["data_baru"];
              $query = "Update $tabel set macam_kegiatan = '$macam_kegiatan', jabatan = '$jabatan', tahun = '$tahun' where id = '$data_baru';";
              mysqli_query($conn, $query);

              //update pembaruan
              $query = "UPDATE pembaruan_data set tgl_pengajuan=CURRENT_TIMESTAMP where nip='$nip' AND tabel='$tabel' AND data_baru='$data_baru'";
            } else {
              //insert tabel
              $query = "INSERT INTO $tabel (nip, macam_kegiatan, jabatan, tahun) VALUES ('$nip', '$macam_kegiatan', '$jabatan', '$tahun');";
              mysqli_query($conn, $query);

              //insert pembaruan
              $query = "SELECT LAST_INSERT_ID() as id;";
              $is_query_run = mysqli_query($conn, $query);
              $fetched_data = mysqli_fetch_assoc($is_query_run);
              $data_baru = $fetched_data["id"];
              $query = "INSERT INTO `pembaruan_data`(`nip`, `tabel`, `data_lama`, `data_baru`, `tgl_pengajuan`) VALUES ('$nip','$tabel','$data_lama','$data_baru',CURRENT_TIMESTAMP)";
            }
          }
        }
      }
    } else if ($tabel == "pengalaman_kerja") {
      $nama_perusahaan = $postData["data"]["nama_perusahaan"];
      $alamat = $postData["data"]["alamat"];
      $tahun_awal = $postData["data"]["tahun_awal"];
      $tahun_akhir = $postData["data"]["tahun_akhir"];
      $alasan_pindah = $postData["data"]["alasan_pindah"];
      $total_karyawan = $postData["data"]["total_karyawan"];
      $uraian_pekerjaan = $postData["data"]["uraian_pekerjaan"];
      $nama_atasan = $postData["data"]["nama_atasan"];
      $no_telepon = $postData["data"]["no_telepon"];
      $gaji = $postData["data"]["gaji"];
      $jabatan_awal = $postData["data"]["jabatan_awal"];
      $jabatan_akhir = $postData["data"]["jabatan_akhir"];
      $total_bawahan = $postData["data"]["total_bawahan"];
      $approved_by = $postData["data"]["approved_by"];

      $data_lama = $postData["data_lama"];

      //insert new data
      if ($data_lama == "") {
        //insert $tabel
        $query = "INSERT INTO $tabel (nip, nama_perusahaan, alamat, tahun_awal, tahun_akhir, alasan_pindah, total_karyawan, uraian_pekerjaan, nama_atasan, no_telepon, gaji, jabatan_awal, jabatan_akhir, total_bawahan) VALUES ('$nip', '$nama_perusahaan', '$alamat', '$tahun_awal', '$tahun_akhir', '$alasan_pindah', '$total_karyawan', '$uraian_pekerjaan', '$nama_atasan', '$no_telepon', '$gaji', '$jabatan_awal', '$jabatan_akhir', '$total_bawahan');";
        mysqli_query($conn, $query);

        //insert pembaruan
        $query = "SELECT LAST_INSERT_ID() as id;";
        $is_query_run = mysqli_query($conn, $query);
        $fetched_data = mysqli_fetch_assoc($is_query_run);
        $data_baru = $fetched_data["id"];
        $query = "INSERT INTO `pembaruan_data`(`nip`, `tabel`, `data_baru`, `tgl_pengajuan`) VALUES ('$nip','$tabel','$data_baru',CURRENT_TIMESTAMP)";
      } else {
        //Update not approved data
        if ($approved_by == "") {
          // update data baru
          $query = "Update $tabel set nama_perusahaan = '$nama_perusahaan', tahun_awal = '$tahun_awal', tahun_akhir = '$tahun_akhir', alasan_pindah = '$alasan_pindah', total_karyawan = '$total_karyawan', uraian_pekerjaan = '$uraian_pekerjaan', nama_atasan = '$nama_atasan', no_telepon = '$no_telepon', gaji = '$gaji', jabatan_awal = '$jabatan_awal', jabatan_akhir = '$jabatan_akhir', total_bawahan = '$total_bawahan' where id = '$data_lama';";
          mysqli_query($conn, $query);

          //update pembaruan
          $query = "UPDATE pembaruan_data set tgl_pengajuan=CURRENT_TIMESTAMP where nip='$nip' AND tabel='$tabel' AND data_lama='$data_lama'";
        }
        //Update approved data
        else {
          //check if requested but not approved
          $query = "SELECT * FROM pembaruan_data where nip='$nip' and tabel='$tabel' and data_lama='$data_lama' and approved_by is null";
          if ($is_query_run = mysqli_query($conn, $query)) {
            if ($fetched_data = mysqli_fetch_assoc($is_query_run)) {
              //update tabel
              $data_baru = $fetched_data["data_baru"];
              $query = "Update $tabel set nama_perusahaan = '$nama_perusahaan', tahun_awal = '$tahun_awal', tahun_akhir = '$tahun_akhir', alasan_pindah = '$alasan_pindah', total_karyawan = '$total_karyawan', uraian_pekerjaan = '$uraian_pekerjaan', nama_atasan = '$nama_atasan', no_telepon = '$no_telepon', gaji = '$gaji', jabatan_awal = '$jabatan_awal', jabatan_akhir = '$jabatan_akhir', total_bawahan = '$total_bawahan' where id = '$data_baru';";
              mysqli_query($conn, $query);

              //update pembaruan
              $query = "UPDATE pembaruan_data set tgl_pengajuan=CURRENT_TIMESTAMP where nip='$nip' AND tabel='$tabel' AND data_baru='$data_baru'";
            } else {
              //insert tabel
              $query = "INSERT INTO $tabel (nip, nama_perusahaan, alamat, tahun_awal, tahun_akhir, alasan_pindah, total_karyawan, uraian_pekerjaan, nama_atasan, no_telepon, gaji, jabatan_awal, jabatan_akhir, total_bawahan) VALUES ('$nip', '$nama_perusahaan', '$alamat', '$tahun_awal', '$tahun_akhir', '$alasan_pindah', '$total_karyawan', '$uraian_pekerjaan', '$nama_atasan', '$no_telepon', '$gaji', '$jabatan_awal', '$jabatan_akhir', '$total_bawahan');";
              mysqli_query($conn, $query);

              //insert pembaruan
              $query = "SELECT LAST_INSERT_ID() as id;";
              $is_query_run = mysqli_query($conn, $query);
              $fetched_data = mysqli_fetch_assoc($is_query_run);
              $data_baru = $fetched_data["id"];
              $query = "INSERT INTO `pembaruan_data`(`nip`, `tabel`, `data_lama`, `data_baru`, `tgl_pengajuan`) VALUES ('$nip','$tabel','$data_lama','$data_baru',CURRENT_TIMESTAMP)";
            }
          }
        }
      }
    } else { //Data pribadi, data lain-lain
      $label = $postData['label'];
      $data_lama = $postData['data_lama'];
      $data_baru = $postData['data_baru'];

      //Check if there is any request
      $query = "select * from pembaruan_data where nip='$nip' AND label='$label' AND  approved_by is null";
      if ($is_query_run = mysqli_query($conn, $query)) {
        if (mysqli_fetch_assoc($is_query_run)) {
          $query = "UPDATE pembaruan_data set data_baru='$data_baru', tgl_pengajuan=CURRENT_TIMESTAMP where nip='$nip' AND label='$label'";
        } else {
          $query = "INSERT INTO `pembaruan_data`(`nip`, `tabel`, `label`, `data_lama`, `data_baru`, `tgl_pengajuan`) VALUES ('$nip','$tabel','$label','$data_lama','$data_baru',CURRENT_TIMESTAMP)";
        }
      }
    }

    if ($is_query_run = mysqli_query($conn, $query)) {
    } else echo "Error: " . mysqli_error($conn);
  } else if (isset($_FILES['file'])) {
    $targetDirectory = 'lampiran/';
    $fileName = basename($_FILES['file']['name']);
    $targetFile = $targetDirectory . $fileName;
    $uploadOk = 1;
    $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Check if file already exists (ignoring extension)
    $fileInfo = pathinfo($targetFile);
    $baseName = $fileInfo['filename'];
    $existingFile = glob($targetDirectory . $baseName . ".*");

    if (!empty($existingFile)) {
      // Delete existing file
      unlink($existingFile[0]);
      $response['rewrite'] = 'The file ' . $baseName . ' rewrited.';
    }

    // Check file size (e.g., limit to 5MB)
    if ($_FILES['file']['size'] > 5000000) {
      $response['message'] = 'Sorry, your file is too large (Max 5mb).';
      $uploadOk = 0;
    }

    // Allow certain file formats
    $allowedTypes = array('jpg', 'png', 'jpeg');
    if (!in_array($fileType, $allowedTypes)) {
      $response['message'] = 'Sorry, only JPG, JPEG, & PNG files are allowed.';
      $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
      $response['success'] = false;
    } else {
      // Move uploaded file to target directory
      if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
        $response['success'] = true;
        $response['message'] = 'The file ' . htmlspecialchars($fileName) . ' has been uploaded.';
      } else {
        $response['message'] = 'Sorry, there was an error uploading your file.';
      }
    }
  }

  if (isset($response))
    echo json_encode($response);
}

//Select
if ($_SERVER["REQUEST_METHOD"] === "GET") {
  if (isset($_GET['nip']) && isset($_GET['data'])) {
    $nip = $_GET['nip'];
    $data = $_GET['data'];

    $response = [];
    $query = '';

    if ($data == 'pribadi') {
      $query = "select * from data_pribadi where nip='$nip'";
    } else if ($data == 'pekerjaan') {
      $query = "select * from data_pekerjaan where nip='$nip'";
    } else if ($data == 'lainlain') {
      $query = "select * from data_lainlain where nip='$nip'";
    } else if ($data == 'keluarga') {
      if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $query = "select * from data_keluarga where id='$id'";
      } else {
        $query = "select * from data_keluarga where nip='$nip'";
      }
    } else if ($data == 'pendidikan') {
      if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $query = "select * from pendidikan where id='$id'";
      } else {
        $query = "select * from pendidikan where nip='$nip'";
      }
    } else if ($data == 'bahasa') {
      if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $query = "select * from bahasa where id='$id'";
      } else {
        $query = "select * from bahasa where nip='$nip'";
      }
    } else if ($data == 'organisasi') {
      if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $query = "select * from organisasi where id='$id'";
      } else {
        $query = "select * from organisasi where nip='$nip'";
      }
    } else if ($data == 'pengalaman_kerja') {
      if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $query = "select * from pengalaman_kerja where id='$id'";
      } else {
        $query = "select * from pengalaman_kerja where nip='$nip'";
      }
    } else if ($data == 'ijin') {
      if (isset($_GET['no_ijin'])) {
        $no_ijin = $_GET['no_ijin'];
        $query = "select * from ijin where no_ijin='$no_ijin'";

        // $targetDirectory = __DIR__.'/../../account-center-admin/lampiran/';
      } else {
        $query = "select * from ijin where nip='$nip' and approve2 is null";
      }
    } else if ($data == 'jenis_izin') {
      $query = "select * from jenis_izin";
    } else if ($data == 'absensi') {
      $full_count = 0;
      $cuti = [];
      $tugas = [];
      $error = [];
      $tgl_awal = '2023-11';
      $tgl_akhir = date("Y-m");

      if (isset($_GET['tgl_awal'])) {
        $tgl_awal = $_GET['tgl_awal'];
        $tgl_akhir = $_GET['tgl_akhir'];
      }

      $tgl_awal = date('Y-m-01', strtotime($tgl_awal));
      $tgl_akhir = date('Y-m-t', strtotime($tgl_akhir));
      $jam_datang = '08:07:00';
      $jam_pulang = '17:00:00';

      //testing
      $tgl_awal = '2023-06-01';
      $tgl_akhir = '2023-12-18';
      //testing

      $sql_tgl_akhir = date('Y-m-d', strtotime($tgl_akhir . ' +1 day')); // Increment the end date by one day
      // query izin
      $izin = [];
      $query = "select * from ijin where nip='$nip' AND approve2 is not null AND tgl_ijin between '$tgl_awal' AND '$sql_tgl_akhir'";
      if ($is_query_run = mysqli_query($conn, $query)) {
        while ($select = mysqli_fetch_assoc($is_query_run)) {
          $izin[] = $select;
        }
      }

      //query absensi
      $absensi = [];
      $query = "select * from absensi where nip='$nip' AND tgl between '$tgl_awal' AND '$sql_tgl_akhir'";
      if ($is_query_run = mysqli_query($conn, $query)) {
        while ($select = mysqli_fetch_assoc($is_query_run)) {
          $absensi[] = $select;
        }
      }

      $query = "select * from libur_karyawan where tgl between '$tgl_awal' AND '$sql_tgl_akhir'";
      $libur = [];
      if ($is_query_run = mysqli_query($conn, $query)) {
        while ($select = mysqli_fetch_assoc($is_query_run)) {
          $libur[] = $select;
        }
      }

      //cek workdays/weekend
      $dt_tgl_awal = new DateTime($tgl_awal);
      $dt_tgl_akhir = new DateTime($tgl_akhir);
      $workdays_count = 0;

      //foreach here
      foreach (new DatePeriod($dt_tgl_awal, new DateInterval('P1D'), $dt_tgl_akhir->modify('+1 day')) as $date) {
        $date_str = $date->format('Y-m-d');
        // echo '<br><br>'.$date_str.'<br>';

        //check weekends
        $weekends = [6, 7]; //1=mon, 2=tues, 3=wed... 7=sun
        if (!in_array($date->format('N'), $weekends)) {
          $workdays_count++;

          //check approved izin/cuti bersama
          if ($filtered_array = array_filter($izin, function ($item) use ($date_str) {
            return $item['tgl_ijin'] === $date_str;
          })) {
            sort($filtered_array);
            $no_ijin = $filtered_array ? $filtered_array[0]['no_ijin'] : '';
            $jenis_ijin = $filtered_array ? $filtered_array[0]['jenis_ijin'] : '';
            $firstchar_jenis_ijin = $filtered_array ? substr($filtered_array[0]['jenis_ijin'], 0, 1) : '';

            if ($firstchar_jenis_ijin == 'A') $cuti[] = $no_ijin; //izin cuti
            else if ($firstchar_jenis_ijin == 'C') $tugas[] = $no_ijin; //izin tugas
            else if ($firstchar_jenis_ijin == 'D') $full_count++; //izin dispensasi
            else if ($firstchar_jenis_ijin == 'B') {
              if ($jenis_ijin == 'B.360') $full_count++; //ijin error absen
              else {
                //cek data absen
                if ($filtered_array = array_filter($absensi, function ($item) use ($date_str) {
                  return substr($item['tgl'], 0, 10) === $date_str;
                })) {
                  // cari time absen
                  $times = array_map(
                    function ($item) {
                      return substr($item['tgl'], 11);
                    },
                    $filtered_array
                  );
                  sort($times);

                  if ($jenis_ijin == 'B.310' || $jenis_ijin == 'B.340' || $jenis_ijin == 'B.370') { //tidak absen datang, ijin terlambat, terlambat dispensasi
                    //cek jam pulang
                    if ($times[0] < $jam_pulang) $error[] = $date_str;
                    else $full_count++;
                  } else if ($jenis_ijin == 'B.320' || $jenis_ijin == 'B.350') { //tidak absen pulang, ijin pulang awal
                    //cek jam datang
                    if ($times[0] >= $jam_datang) $error[] = $date_str;
                    else $full_count++;
                  }
                }
                // tdk ada data absen => error
                else $error[] = $date_str;
              }
            }
          } else {
            //cek data absen
            if ($filtered_array = array_filter(
              $absensi,
              function ($item) use ($date_str) {
                return substr($item['tgl'], 0, 10) === $date_str;
              }
            )) {
              // cari time absen
              $times = array_map(
                function ($item) {
                  return substr($item['tgl'], 11);
                },
                $filtered_array
              );

              sort($times);
              if (sizeof($times) < 2) $error[] = $date_str; //absen tidak lengkap
              else {
                //cek absen datang-pulang
                if ($times[0] >= $jam_datang && $times[1] < $jam_pulang)
                  $error[] = $date_str;
                else $full_count++;
              }
            }
            //tidak ada data absen
            else $error[] = $date_str;
          }
        }
      }

      // echo '<br>full: '.$full_count;
      // echo '<br><br>Cuti: '. sizeof($cuti) .'<br>';
      // print_r($cuti);
      // echo '<br><br>Tugas: '. sizeof($tugas) .'<br>';
      // print_r($tugas);
      // echo '<br><br>Error: '. sizeof($error) .'<br>';
      // print_r($error);

      // echo '<br><br>Total: '. $full_count+sizeof($cuti)+sizeof($tugas)+sizeof($error) .'<br>';

      // echo "workdays between {$dt_tgl_awal ->format('Y-m-d')} and {$dt_tgl_akhir->format('Y-m-d')}: $workdays_count<br>";
      $response = array(
        'nip' => $nip,
        'full_count' => $full_count,
        'cuti' => $cuti,
        'tugas' => $tugas,
        'error' => $error
      );
    } else if ($data == 'detail_absen') {
      $detail_absen = $_GET['detail_absen'];
      $jenis_detail = '';
      $jam_datang = '08:07:00';
      $jam_pulang = '17:00:00';

      if ($detail_absen[0] == 'I') {
        $jenis_detail = 'izin';
        $query = "select * from ijin where no_ijin='$detail_absen'";
        if ($is_query_run = mysqli_query($conn, $query)) {
          while ($select = mysqli_fetch_assoc($is_query_run)) $izin[] = $select;

          $firstchar_jenis_ijin = $izin ? substr($izin[0]['jenis_ijin'], 0, 1) : '';
          if ($firstchar_jenis_ijin == 'A') $jenis_detail = 'cuti'; //izin cuti
          else if ($firstchar_jenis_ijin == 'C') $jenis_detail = 'tugas'; //izin tugas

          $response = array(
            'nip' => $nip,
            'jenis_detail' => $jenis_detail,
            'izin' => $izin,
          );
        } else echo "Error: " . mysqli_error($conn);
      } else {
        $jenis_detail = 'error';
        $keterangan  = '';

        $absensi = [];
        $query = "select * from absensi where nip='$nip' AND tgl like '$detail_absen%'";
        if ($is_query_run = mysqli_query($conn, $query)) {
          while ($select = mysqli_fetch_assoc($is_query_run)) $absensi[] = $select;

          if (sizeof($absensi) == 0) $keterangan = 'Tidak absen';
          else {
            $times = array_map(
              function ($item) {
                return substr($item['tgl'], 11);
              },
              $absensi
            );

            sort($times);
            if (sizeof($times) < 2) {
              $izin = [];
              $query = "select * from ijin where nip='$nip' AND approve2 is not null AND tgl_ijin ='$detail_absen'";
              if ($is_query_run = mysqli_query($conn, $query)) {
                while ($select = mysqli_fetch_assoc($is_query_run)) $izin[] = $select;

                if (sizeof($izin) == 0) $keterangan = 'Absen tidak lengkap';
                else {
                  $jenis_ijin = $izin[0]['jenis_ijin'];
                  if ($jenis_ijin == 'B.310' || $jenis_ijin == 'B.340' || $jenis_ijin == 'B.370') { //tidak absen datang, ijin terlambat, terlambat dispensasi
                    if ($times[0] < $jam_pulang) $keterangan = 'Pulang awal (' . $times[0] . ').'; //cek jam pulang
                  } else if ($jenis_ijin == 'B.320' || $jenis_ijin == 'B.350') { //tidak absen pulang, ijin pulang awal
                    if ($times[0] >= $jam_datang) $keterangan = 'Terlambat (' . $times[0] . ').'; //cek jam datang
                  }
                }
              }
            } else {
              //cek absen datang-pulang
              if ($times[0] >= $jam_datang) $keterangan = 'Terlambat (' . $times[0] . '). ';
              if ($times[1] < $jam_pulang) $keterangan .= 'Pulang awal (' . $times[1] . ').';
            }
          }
        } else echo "Error: " . mysqli_error($conn);

        $response = array(
          'nip' => $nip,
          'jenis_detail' => $jenis_detail,
          'keterangan' => $keterangan,
        );
      }
    } else if ($data == 'token') {
      $divisi = '';
      $query = "select divisi from data_pekerjaan where nip='$nip'";
      if ($is_query_run = mysqli_query($conn, $query)) {
        $select_datapekerjaan = mysqli_fetch_assoc($is_query_run);
        if ($select_datapekerjaan) {
          $divisi = $select_datapekerjaan["divisi"];
        }
      }

      $nip_admin = [];
      $query = "select nip from akses_admin where divisi='$divisi' or tipe_admin = 0";
      if ($query != '' && $is_query_run = mysqli_query($conn, $query)) {
        while ($select = mysqli_fetch_assoc($is_query_run)) {
          $nip_admin[] = $select['nip'];
        }
      }

      $str_nip_admin = "'" . implode("','", $nip_admin) . "'";
      $token = [];
      $query = "SELECT token FROM akun WHERE nip IN ($str_nip_admin)";
      if ($query != '' && $is_query_run = mysqli_query($conn, $query)) {
        while ($select = mysqli_fetch_assoc($is_query_run)) {
          $token[] = $select['token'];
        }
      }

      $query = "SELECT SUBSTRING_INDEX(nama, ' ', 1) AS nama FROM data_pribadi where nip='$nip'";
      if ($is_query_run = mysqli_query($conn, $query)) {
        $select_datapribadi = mysqli_fetch_assoc($is_query_run);
        if ($select_datapribadi) {
          $nama = $select_datapribadi["nama"];
        }
      }

      $str_token = implode(", ", $token);
      $response = array('token' => $str_token, 'nama' => $nama, 'divisi' => $divisi);
    }

    if ($query != '' && $is_query_run = mysqli_query($conn, $query)) {
      while ($select = mysqli_fetch_assoc($is_query_run)) {
        $response[] = $select;
      }
    } else echo "Error: " . mysqli_error($conn);
    echo json_encode($response);
  }
}
