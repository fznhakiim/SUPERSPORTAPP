document.addEventListener('DOMContentLoaded', function() {
    // Ambil query parameter selectedItems
    const urlParams = new URLSearchParams(window.location.search);
    const selectedItemsParam = urlParams.get('selectedItems');
    const gorName = urlParams.get('gorName');

    // Validasi selectedItemsParam
    if (!selectedItemsParam) {
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Tidak ada item yang dipilih.';
        document.body.appendChild(errorDiv);
        return;
    }

    // Parse JSON dari selectedItemsParam menjadi array objek
    const selectedItems = JSON.parse(decodeURIComponent(selectedItemsParam));

    // Membuat elemen untuk menampilkan detail pesanan
    const orderDetailsDiv = document.getElementById('orderDetails');

    // Variabel untuk menyimpan total harga
    let totalHarga = 0;

    // Loop untuk setiap item yang dipilih
    selectedItems.forEach(function(item, index) {
        const div = document.createElement('div');
        div.classList.add('order-item');

        const checkboxLabel = document.createElement('p');
        checkboxLabel.textContent = `Lapangan ${item.checkbox}`;
        div.appendChild(checkboxLabel);

        // Tambahkan informasi hari, tanggal, tahun di sini
        const dateLabel = document.createElement('p');
        dateLabel.textContent = `Tanggal: ${item.tanggal || 'Informasi tanggal belum tersedia'}`;
        div.appendChild(dateLabel);

        // Tambahkan informasi harga
        const price = document.createElement('p');
        const itemPrice = parseFloat(item.price.replace(/[,.]/g, '')); // Hapus titik atau koma
        if (!isNaN(itemPrice)) {
            totalHarga += itemPrice; // Tambahkan hanya jika harga valid
            price.textContent = `Price: Rp ${item.price}`; // Tampilkan harga dalam teks
        } else {
            price.textContent = `Price: Informasi harga belum tersedia`;
        }
        div.appendChild(price);

        // Tambahkan div ke orderDetailsDiv
        orderDetailsDiv.appendChild(div);
    });

    // Menambahkan elemen untuk menampilkan total harga dengan format mata uang
    const totalHargaElement = document.createElement('p');
    totalHargaElement.textContent = `Total Harga: Rp ${totalHarga.toLocaleString('id-ID')}`;
    orderDetailsDiv.appendChild(totalHargaElement);

    // Menambahkan bullet (titik tengah) sebelum nama gor
    const h1 = document.querySelector('h1');
    const gor = document.createElement('span');
    gor.textContent = ` • ${gorName || 'Informasi harga belum tersedia'}`;
    h1.appendChild(gor);

    // Event listener untuk tombol "Kembali"
    const btnKembali = document.getElementById('btnKembali');
    btnKembali.addEventListener('click', function() {
        history.back(); // Kembali ke halaman sebelumnya dalam sejarah navigasi
    });

    // Event listener untuk tombol "Lanjutkan Pembayaran"
    const btnLanjutkan = document.getElementById('btnLanjutkan');
    btnLanjutkan.addEventListener('click', function() {
        // Tampilkan modal konfirmasi pembayaran
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';

        // Event listener untuk tombol "Lanjutkan" di dalam modal pertama
        const btnModalLanjutkan = document.getElementById('btnModalLanjutkan');
        btnModalLanjutkan.addEventListener('click', function() {
            modal.style.display = 'none'; // Sembunyikan modal pertama
            const modalTerimaKasih = document.getElementById('modalTerimaKasih');
            modalTerimaKasih.style.display = 'block'; // Tampilkan modal ucapan terima kasih

            // Save booking details to localStorage
            const currentUser = localStorage.getItem('currentUser'); // Ambil pengguna yang sedang login
            if (!currentUser) {
                alert('Anda harus login terlebih dahulu.');
                return;
            }

            const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            selectedItems.forEach(item => {
                const booking = {
                    user: currentUser, // Tambahkan informasi pengguna yang sedang login
                    gor: gorName, 
                    lapangan: item.checkbox,
                    tanggal: item.tanggal,
                    price: item.price
                };
                bookings.push(booking);
            });
            localStorage.setItem('bookings', JSON.stringify(bookings));
        });

        // Event listener untuk tombol "Kembali" di dalam modal pertama
        const btnModalKembali = document.getElementById('btnModalKembali');
        btnModalKembali.addEventListener('click', function() {
            modal.style.display = 'none'; // Sembunyikan modal pertama
        });
    });

    // Event listener untuk tombol "Ok" di modal ucapan terima kasih
    const btnTerimaKasihOk = document.getElementById('btnTerimaKasihOk');
    btnTerimaKasihOk.addEventListener('click', function() {
        // Aksi saat tombol "Ok" ditekan
        // Misalnya, kembali ke halaman utama atau halaman lain
        window.location.href = 'Home.html'; // Ganti dengan halaman tujuan Anda
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedItemsParam = urlParams.get('selectedItems');
    const gorName = urlParams.get('gorName');
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        alert('Anda harus login terlebih dahulu.');
        return;
    }

    if (!selectedItemsParam) {
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Tidak ada item yang dipilih.';
        document.body.appendChild(errorDiv);
        return;
    }

    const selectedItems = JSON.parse(decodeURIComponent(selectedItemsParam));
    const orderDetailsDiv = document.getElementById('orderDetails');
    let totalHarga = 0;

    selectedItems.forEach(function(item) {
        const div = document.createElement('div');
        div.classList.add('order-item');

        const checkboxLabel = document.createElement('p');
        checkboxLabel.textContent = `Lapangan ${item.checkbox}`;
        div.appendChild(checkboxLabel);

        const dateLabel = document.createElement('p');
        dateLabel.textContent = `Tanggal: ${item.tanggal || 'Informasi tanggal belum tersedia'}`;
        div.appendChild(dateLabel);

        const price = document.createElement('p');
        const itemPrice = parseFloat(item.price.replace(/[,.]/g, ''));
        if (!isNaN(itemPrice)) {
            totalHarga += itemPrice;
            price.textContent = `Price: Rp ${item.price}`;
        } else {
            price.textContent = `Price: Informasi harga belum tersedia`;
        }
        div.appendChild(price);

        orderDetailsDiv.appendChild(div);
    });

    const totalHargaElement = document.createElement('p');
    totalHargaElement.textContent = `Total Harga: Rp ${totalHarga.toLocaleString('id-ID')}`;
    orderDetailsDiv.appendChild(totalHargaElement);

    const h1 = document.querySelector('h1');
    const gor = document.createElement('span');
    gor.textContent = ` • ${gorName || 'Informasi harga belum tersedia'}`;
    h1.appendChild(gor);

    const btnKembali = document.getElementById('btnKembali');
    btnKembali.addEventListener('click', function() {
        history.back();
    });

    const btnLanjutkan = document.getElementById('btnLanjutkan');
    btnLanjutkan.addEventListener('click', function() {
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';

        const btnModalLanjutkan = document.getElementById('btnModalLanjutkan');
        btnModalLanjutkan.addEventListener('click', function() {
            modal.style.display = 'none';
            const modalTerimaKasih = document.getElementById('modalTerimaKasih');
            modalTerimaKasih.style.display = 'block';

            const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            selectedItems.forEach(item => {
                const booking = {
                    user: currentUser,
                    gor: gorName,
                    lapangan: item.checkbox,
                    tanggal: item.tanggal,
                    price: item.price
                };
                bookings.push(booking);
            });
            localStorage.setItem('bookings', JSON.stringify(bookings));
        });

        const btnModalKembali = document.getElementById('btnModalKembali');
        btnModalKembali.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    });

    const btnTerimaKasihOk = document.getElementById('btnTerimaKasihOk');
    btnTerimaKasihOk.addEventListener('click', function() {
        window.location.href = 'Home.html';
    });

    displayBookingHistory();
});

function loginUser(username) {
    localStorage.setItem('currentUser', username);
}

loginUser('user1');

// Fungsi untuk menampilkan riwayat pemesanan
function displayBookingHistory() {
    const bookingHistoryDiv = $('#bookingHistory');
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        bookingHistoryDiv.html('<p>Anda harus login untuk melihat riwayat pemesanan.</p>');
        return;
    }

    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const userBookings = bookings.filter(booking => booking.user === currentUser);

    
    if (bookings.length === 0) {
        bookingHistoryDiv.innerHTML = '<p>Tidak ada riwayat pemesanan.</p>';
    } else {
        bookings.forEach(booking => {
            const bookingDiv = document.createElement('div');
            bookingDiv.classList.add('booking');

            const lapanganP = document.createElement('h1');
            lapanganP.textContent = `Lapangan: ${booking.lapangan}`;
            bookingDiv.appendChild(lapanganP);

            const tanggalP = document.createElement('h2');
            tanggalP.textContent = `Tanggal: ${booking.tanggal}`;
            bookingDiv.appendChild(tanggalP);

            const priceP = document.createElement('p');
            priceP.textContent = `Harga: ${booking.price}`;
            bookingDiv.appendChild(priceP);

            bookingHistoryDiv.appendChild(bookingDiv);
        });
    }
    }

  // Panggil fungsi untuk menampilkan riwayat pemesanan
  displayBookingHistory();
