# Menghitung hasil deposito dengan saldo Rp1.000.000 selama 12 bulan dengan bunga 6% per tahun

saldo_awal = 1000000  # Saldo awal dalam rupiah
bunga_tahunan = 0.07  # Bunga 6% per tahun
tenor_bulan = 12  # Lama tenor dalam bulan

# Menghitung bunga tahunan
bunga_total = saldo_awal * bunga_tahunan * (tenor_bulan / 12)
total_saldo = saldo_awal + bunga_total

saldo_awal, bunga_total, total_saldo
print (total_saldo)
