$(document).ready(function() {
    // Set default value for date input to today's date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();
  
    var formattedDate = yyyy + '-' + mm + '-' + dd;
    $('#date-book').val(formattedDate);

    // Set minimum date to today
    $('#date-book').attr('min', formattedDate);
  
    // Toggle dropdown
    function toggleDropdown(button) {
        var $schedule = $(button).next();
        $('.schedule').not($schedule).css('display', 'none');
        if ($schedule.css('display') === 'none' || $schedule.css('display') === '') {
            $schedule.css('display', 'flex');
        } else {
            $schedule.css('display', 'none');
        }
    }
  
    $('.dropdown-btn').on('click', function() {
        toggleDropdown(this);
    });
  
    // Update available count
    $('.container').each(function() {
        var $container = $(this);
        var $availableElements = $container.find('.status');
        var availableCount = 0;
  
        $availableElements.each(function() {
            if ($(this).text().trim() === 'Available') {
                availableCount++;
            }
        });
  
        var $button = $container.find('.dropdown-btn');
        $button.text(availableCount + ' Jadwal Tersedia');
    });
  
    // Update item count
    var $checkboxes = $('.checkbox-input');
    var $itemCountElement = $('#itemCount');
  
    function updateItemCount() {
        let totalItems = 0;
  
        $checkboxes.each(function() {
            if ($(this).prop('checked')) {
                totalItems++;
            }
        });
  
        $itemCountElement.text(totalItems + ' Item Dipilih');
    }
  
    $checkboxes.on('change', function() {
        var $list = $(this).closest('.form-element').find('.list');
        if ($(this).prop('checked')) {
            $list.text('1');
        } else {
            $list.text('0');
        }
        updateItemCount();
    });
  
    // Initial update on page load
    updateItemCount();
  
    // Show/Hide quantity forms
    var $checkboxesWithQuantityForms = $('.checkbox-input');
    var $quantityForms = $('.quantity-form');
  
    $checkboxesWithQuantityForms.each(function(index) {
        $(this).on('change', function() {
            if ($(this).prop('checked')) {
                $quantityForms.eq(index).css('display', 'block');
            } else {
                $quantityForms.eq(index).css('display', 'none');
            }
        });
    });
  
    // Disable checkboxes with status other than "Available"
    $('.checkbox-input').each(function() {
      var $status = $(this).closest('.form-element').find('.status');
      if ($status.text().trim() !== 'Available') {
          $(this).prop('disabled', true); // Disable the checkbox input
          $(this).closest('label').css('color', 'var(--darkW-color)'); // Optionally, grey out the label
          // Additional styling for the checkbox itself (if needed)
          $(this).next('label').css({
              'cursor': 'not-allowed', // Change cursor to not-allowed
              'opacity': '0.4' // Reduce opacity to indicate disabled state
          });
      }
  });
  
  // Check login status
  var isLoggedIn = false; // Assume user is not logged in by default. Replace this with actual logic to check login status.

  $('.buttonPesan').on('click', function() {
    var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    var currentUser = localStorage.getItem('currentUser'); // Get the current user

    if (!isLoggedIn || !currentUser) {
        // Show login prompt
        alert('Anda harus login terlebih dahulu untuk melakukan pemesanan.');
        // Redirect to Login.html
        window.location.href = 'Login.html';
        return; // Stop further execution
    }
    // Ambil nama gor
    var gorName = $('#gor-name').text().trim(); 
  
    // Ambil nilai tanggal yang dipilih
    var tanggalTerpilih = $('#date-book').val();
  
    // Validasi apakah tanggal telah dipilih
    if (!tanggalTerpilih) {
        alert('Anda harus memilih tanggal sebelum melakukan pemesanan.');
        return; // Berhenti eksekusi fungsi jika tanggal tidak dipilih
    }
  
    var selectedItems = [];
    var lapanganDipilih = false; // Flag untuk menandai apakah minimal satu lapangan dipilih
  
    // Loop untuk setiap checkbox yang dicek
    $('.checkbox-input:checked').each(function() {
        var container = $(this).closest('.form-element');
        var quantity = container.find('.durasi').text().trim(); // Mengambil teks durasi sebagai quantity
        var price = container.find('.harga').text().trim(); // Mengambil teks harga dari elemen .harga yang terkait dengan checkbox
  
        // Construct the item object hanya untuk checkbox yang dipilih
        var item = {
            checkbox: $(this).val(),
            quantity: quantity,
            price: price,
            tanggal: tanggalTerpilih // Tambahkan nilai tanggal ke dalam objek item
        };
  
        selectedItems.push(item);
        lapanganDipilih = true; // Set flag menjadi true karena minimal satu lapangan dipilih
    });
  
    // Validasi apakah minimal satu lapangan dipilih
    if (!lapanganDipilih) {
        alert('Anda harus memilih minimal satu lapangan sebelum melakukan pemesanan.');
        return; // Berhenti eksekusi fungsi jika tidak ada lapangan yang dipilih
    }

    // Save booking history
    var bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    selectedItems.forEach(item => {
        bookings.push({
            user: currentUser,
            gor: gorName,
            lapangan: item.checkbox,
            tanggal: item.tanggal,
            price: item.price
        });
    });
    localStorage.setItem('bookings', JSON.stringify(bookings));
  
    // Construct the URL for orderBook.html with selectedItems as a query parameter
    var baseUrl = 'OrderBook.html';
    var queryParams = encodeURIComponent(JSON.stringify(selectedItems));
    var url = baseUrl + '?selectedItems=' + queryParams + '&gorName=' + encodeURIComponent(gorName);
  
    // Buka orderBook.html di jendela/tab baru
    window.location.href = url;
  });

  // Logika untuk menyimpan pengguna yang sedang login
function loginUser(username) {
    localStorage.setItem('currentUser', username);
}

// Contoh pengguna login (simulasikan login)
loginUser('user1');

// Logika untuk menambahkan pemesanan baru dengan informasi pengguna
function addBooking(gor, lapangan, tanggal, price) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Anda harus login terlebih dahulu.');
        return;
    }

    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push({
        user: currentUser,
        gor: gor,
        lapangan: lapangan,
        tanggal: tanggal,
        price: price
    });
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

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

    if (userBookings.length === 0) {
        bookingHistoryDiv.html('<p>Tidak ada riwayat pemesanan.</p>');
    } else {
        userBookings.forEach(booking => {
            const bookingDiv = $('<div>').addClass('booking');

            const gorP = $('<h1>').text(`GOR: ${booking.gor}`);
            bookingDiv.append(gorP);

            const lapanganP = $('<h2>').text(`Lapangan: ${booking.lapangan}`);
            bookingDiv.append(lapanganP);

            const tanggalP = $('<h3>').text(`Tanggal: ${booking.tanggal}`);
            bookingDiv.append(tanggalP);

            const priceP = $('<p>').text(`Harga: ${booking.price}`);
            bookingDiv.append(priceP);

            bookingHistoryDiv.append(bookingDiv);
        });
    }
}

// Panggil fungsi untuk menampilkan riwayat pemesanan
displayBookingHistory();
 });