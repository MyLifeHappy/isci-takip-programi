# FEHA GRUP İşçi Takip ve Maaş Bordro Programı

## Kurulum

```bash
npm install
npm run dev
```

## Demo kullanıcıları

- Admin: `admin` / `admin123`
- Personel: `personel` / `1234`

## Özellikler

- FEHA GRUP İNŞAAT A.Ş. şirket bilgileri
- Modern yönetim paneli teması
- Admin/personel kullanıcı girişi
- Admin: işçi ekleme, düzenleme, pasif yapma, maaş görme, bordro alma
- Personel: sadece puantaj/devamsızlık girişi; maaş bilgilerini göremez
- Ay seçilince hafta içi günlerden otomatik çalışma günü hesabı
- Bayram/tatil günü veya ekstra çalışma günü tanımlama
- Maaş tam kabul edilir; sadece gelinmeyen saat düşülür, mesai eklenir
- Detaylı bordro ekranı ve tarayıcıdan PDF/yazdırma

## Not

Bu sürüm verileri tarayıcı localStorage alanında saklar. Gerçek şirkette çok kullanıcılı kullanım için sonraki adımda SQLite/Supabase/PostgreSQL veritabanına bağlanmalıdır.
