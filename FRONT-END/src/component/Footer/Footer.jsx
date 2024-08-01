function Footer() {

    return (
        <>
            <footer class="bg-dark text-white mt-0">
                <div class="container py-4">
                    <div class="row">
                        <div class="col-md-6">
                            <h5>Hakkımızda</h5>
                            <p>Her telefoncunun hayali olan bir uygulama.</p>
                        </div>
                        <div class="col-md-3">
                            <h5>Bağlantılar</h5>
                            <ul class="list-unstyled">
                                <li><a href="/phonelist" class="text-white">Telefonlar</a></li>
                                <li><a href="/addphone" class="text-white">Telefon Ekle/Sil</a></li>
                                <li><a href="/sell-phone" class="text-white">Satış Yap</a></li>
                                <li><a href="/sell-list" class="text-white">Satışlar</a></li>
                            </ul>
                        </div>
                        <div class="col-md-3">
                            <h5>İletişim</h5>
                            <ul class="list-unstyled">
                                <li><i class="fas fa-map-marker-alt"></i> Adres: XYZ Cad., İstanbul</li>
                                <li><i class="fas fa-phone"></i> Telefon: +90 123 456 78 90</li>
                                <li><i class="fas fa-envelope"></i> Email: info@example.com</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="bg-secondary text-center py-3">
                    © 2024 Tüm hakları saklıdır.
                </div>
            </footer>
        </>
    );
}

export default Footer
