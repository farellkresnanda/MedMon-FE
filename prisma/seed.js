const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const opdData = [
    { no: 1, namaOpd: "DINAS PENDIDIKAN DAN KEBUDAYAAN", username: "@disdikbudsubangofficial" },
    { no: 2, namaOpd: "DINAS PARIWISATA, KEPEMUDAAN DAN OLAHRAGA", username: "@disparpora.kabsubang_official" },
    { no: 3, namaOpd: "DINAS KESEHATAN", username: "@dinkessubang" },
    { no: 4, namaOpd: "DINAS PERHUBUNGAN", username: "@dishubsbg" },
    { no: 5, namaOpd: "DINAS KOMUNIKASI DAN INFORMATIKA", username: "@diskominfosubangofficial" },
    { no: 6, namaOpd: "DINAS PEKERJAAN UMUM DAN PENATAAN RUANG", username: "@dinas.pupr.subang" },
    { no: 7, namaOpd: "DINAS PERUMAHAN, KAWASAN PERMUKINAN DAN PERTANAHAN", username: "@disperkimtansubang.official" },
    { no: 8, namaOpd: "DINAS KOPERASI, UMKM, PERDAGANGAN DAN PERINDUSTRIAN", username: "@dkupp_subang" },
    { no: 9, namaOpd: "DINAS PERTANIAN", username: "@dinaspertanian_official" },
    { no: 10, namaOpd: "DINAS PETERNAKAN DAN KESEHATAN HEWAN", username: "@disnakeswan_sbg" },
    { no: 11, namaOpd: "DINAS KETAHANAN PANGAN", username: "@disketpan.kabsubang" },
    { no: 12, namaOpd: "DINAS PERIKANAN", username: "@dinasperikanansubang" },
    { no: 13, namaOpd: "DINAS KEPENDUDUKAN DAN PENCATANAN SIPIL", username: "@disdukcapil_subang" },
    { no: 14, namaOpd: "DINAS SOSIAL", username: "@dinsossubangofficial" },
    { no: 15, namaOpd: "DINAS TENAGA KERJA, TRANSMIGRASI, ENERGI DAN SUMBER DAYA MINERAL", username: "@disnakertranssubangofficial" },
    { no: 16, namaOpd: "DINAS LINGKUNGAN HIDUP", username: "@dlhsubangofficial" },
    { no: 17, namaOpd: "DINAS PEMBERDAYAAN MASYARAKAT DAN DESA", username: "@dpmdsubangofficial" },
    { no: 18, namaOpd: "DINAS PENGENDALIAN PENDUDUK, KB, PEMBERDAYAAN PEREMPUAN, DAN PERLINDUNGAN ANAK", username: "@dp2kbp3a_subang" },
    { no: 19, namaOpd: "DINAS PENANAMAN MODAL DAN PELAYANAN TERPADU SATU PINTU", username: "@dpmptspsubangofficial" },
    { no: 20, namaOpd: "DINAS KEARSIPAN DAN PERPUSTAKAAN", username: "@disarsipussubangofficial" },
    { no: 21, namaOpd: "SATUAN POLISI PAMONG PRAJA DAN PEMADAM KEBAKARAN", username: "@satpoldamsubangofficial" },
    { no: 22, namaOpd: "BADAN KEUANGAN DAN ASET DAERAH", username: "@bkadsubangofficial" },
    { no: 23, namaOpd: "BADAN PENDAPATAN DAERAH", username: "@bapendasubangofficial" },
    { no: 24, namaOpd: "BADAN PERENCANAAN PEMBANGUNAN, PENELITIAN DAN PENGEMBANGAN DAERAH", username: "@bp4dsubangofficial" },
    { no: 25, namaOpd: "BADAN KEPEGAWAIAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA", username: "@bkpsdmkabsubangofficial" },
    { no: 26, namaOpd: "BADAN PENANGGULANGAN BENCANA DAERAH", username: "@bpbdsubangofficial" },
    { no: 27, namaOpd: "BADAN KESATUAN BANGSA DAN POLITIK", username: "@bakesbangpol_subang_official" },
    { no: 28, namaOpd: "SEKRETARIAT DAERAH SUBANG", username: "@setda.subang" },
    { no: 29, namaOpd: "INSPEKTORAT DAERAH SUBANG", username: "@inspektorat_subang" },
    { no: 30, namaOpd: "SEKRETARIAT DPRD KABUPATEN SUBANG", username: "@setwansubangofficial" },
    { no: 31, namaOpd: "RSUD KABUPATEN SUBANG", username: "@rsudsubangofficial" },
    { no: 32, namaOpd: "KEC. SUBANG", username: "@kec.subangofficial" },
    { no: 33, namaOpd: "KEC. KALIJATI", username: "@kecamatan_kalijati_official" },
    { no: 34, namaOpd: "KEC. CIBOGO", username: "@cibogo_ngabret" },
    { no: 35, namaOpd: "KEC. PAGADEN", username: "@kec.pagadensubangofficial" },
    { no: 36, namaOpd: "KEC. BINONG", username: "@kec.binongsubangofficial" },
    { no: 37, namaOpd: "KEC. COMPRENG", username: "@kecamatan.compreng.official" },
    { no: 38, namaOpd: "KEC. CIPUNAGARA", username: "@kec.cipunagaraofficial" },
    { no: 39, namaOpd: "KEC. PAMANUKAN", username: "@kec.pamanukansubangofficial" },
    { no: 40, namaOpd: "KEC. PUSAKANAGARA", username: "@kecamatanpusakanagara" },
    { no: 41, namaOpd: "KEC. LEGONKULON", username: "@kec.legonkulonsubangofficial" },
    { no: 42, namaOpd: "KEC. CIASEM", username: "@kec.ciasemsubangofficial" },
    { no: 43, namaOpd: "KEC. BLANAKAN", username: "@kec_blanakan" },
    { no: 44, namaOpd: "KEC. PATOKBEUSI", username: "@kec.patokbeusisubangofficial" },
    { no: 45, namaOpd: "KEC. PABUARAN", username: "@kec.pabuaransubangofficial" },
    { no: 46, namaOpd: "KEC. CIPEUNDEUY", username: "@kecamatan.cipeundeuy" },
    { no: 47, namaOpd: "KEC. PURWADADI", username: "@kecamatan_purwadadi" },
    { no: 48, namaOpd: "KEC. CIKAUM", username: "@kec.cikaumsubangofficial" },
    { no: 49, namaOpd: "KEC. CIJAMBE", username: "@kec.cijambesubangofficial" },
    { no: 50, namaOpd: "KEC. JALANCAGAK", username: "@kecamatanjalancagak" },
    { no: 51, namaOpd: "KEC. CISALAK", username: "@kec.cisalaksubangofficial" },
    { no: 52, namaOpd: "KEC. TANJUNGSIANG", username: "@kec.tanjungsiangsubangofficial" },
    { no: 53, namaOpd: "KEC. SAGALAHERANG", username: "@kec.sagalaherangsubangofficial" },
    { no: 54, namaOpd: "KEC. SERANGPANJANG", username: "@kec.serangpanjangsbgofficial" },
    { no: 55, namaOpd: "KEC. SUKASARI", username: "@kec.sukasarisubangoffcial" },
    { no: 56, namaOpd: "KEC. TAMBAKDAHAN", username: "@kec.tambakdahansubangofficial" },
    { no: 57, namaOpd: "KEC. KASOMALANG", username: "@kec.kasomalangsubangoffcial" },
    { no: 58, namaOpd: "KEC. DAWUAN", username: "@kec_dawuansubangofficial" },
    { no: 59, namaOpd: "KEC. PAGADEN BARAT", username: "@kec.pagadenbaratsubangofficial" },
    { no: 60, namaOpd: "KEC. CIATER", username: "@kec.ciatersubangofficial" },
    { no: 61, namaOpd: "KEC. PUSAKAJAYA", username: "@kec.pusakajaysubangofficial" }
  ]

  console.log('Starting OPD listAkun seeding...')

  for (const opd of opdData) {
    const cleanUsername = opd.username.replace('@', '')

    await prisma.listAkun.create({
      data: {
        client_account: 'subang@focuson.com',
        platform: 'instagram',
        kategori: 'subang@focuson.com',
        username: cleanUsername
      }
    })

    console.log(`Created listAkun: ${cleanUsername}`)
  }

  console.log('OPD listAkun seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
