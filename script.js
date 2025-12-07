// Sample book data
const books = [
    {
        id: 1,
        title: "The Art of Programming",
        author: "Jane Smith",
        category: "Technology",
        pages: 320,
        icon: "fas fa-code"
    },
    {
        id: 2,
        title: "History of Civilizations",
        author: "Robert Johnson",
        category: "History",
        pages: 450,
        icon: "fas fa-landmark"
    },
    {
        id: 3,
        title: "Business Strategies",
        author: "Alice Williams",
        category: "Business",
        pages: 280,
        icon: "fas fa-chart-line"
    },
    {
        id: 4,
        title: "Scientific Discoveries",
        author: "Dr. Michael Chen",
        category: "Science",
        pages: 380,
        icon: "fas fa-flask"
    },
    {
        id: 5,
        title: "The Mystery House",
        author: "Emily Davis",
        category: "Mystery",
        pages: 310,
        icon: "fas fa-user-secret"
    },
    {
        id: 6,
        title: "Digital Revolution",
        author: "Mark Wilson",
        category: "Technology",
        pages: 290,
        icon: "fas fa-microchip"
    }
];

// Load books into the grid
function loadBooks() {
    const booksContainer = document.getElementById('booksContainer');
    booksContainer.innerHTML = '';
    
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        
        bookCard.innerHTML = `
            <div class="book-cover">
                <i class="${book.icon}"></i>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <p class="book-category">${book.category} • ${book.pages} pages</p>
                <button class="download-btn" onclick="downloadBook(${book.id})">
                    <i class="fas fa-download"></i> Download PDF
                </button>
            </div>
        `;
        
        booksContainer.appendChild(bookCard);
    });
}

// Ad Management
function showAdPopup() {
    // Show ad popup after 10 seconds
    setTimeout(() => {
        const popup = document.createElement('div');
        popup.className = 'ad-popup';
        popup.innerHTML = `
            <button class="close-ad">&times;</button>
            <h4>Special Offer!</h4>
            <p>Get premium books with 50% discount</p>
            <button class="ad-button" onclick="visitSponsor()">Claim Offer</button>
        `;
        document.body.appendChild(popup);
        
        // Close button functionality
        popup.querySelector('.close-ad').addEventListener('click', () => {
            popup.remove();
        });
    }, 10000);
}

function visitSponsor() {
    window.open('https://publisher.linkvertise.com/ac/1458681', '_blank');
}

// Track ad clicks
document.querySelectorAll('.ad-link, .ad-button').forEach(link => {
    link.addEventListener('click', function(e) {
        // يمكنك إضافة تتبع للإعلانات هنا
        console.log('Ad clicked:', this.href);
        
        // إرسال بيانات للتتبع
        fetch('/api/track-ad-click', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                adId: '1458681',
                timestamp: new Date().toISOString(),
                page: window.location.href
            })
        });
    });
});

// Show ads randomly
function showRandomAd() {
    const adPositions = ['top', 'middle', 'bottom'];
    const randomPosition = adPositions[Math.floor(Math.random() * adPositions.length)];
    
    // يمكنك تغيير الإعلان بناء على الموضع
    console.log(`Showing ad at: ${randomPosition}`);
}

// Initialize ads when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadBooks();
    showAdPopup();
    showRandomAd();
    
    // Rotate ads every 30 seconds
    setInterval(showRandomAd, 30000);
});

// Simulate book download
function downloadBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        alert(`Starting download: "${book.title}" by ${book.author}\n\nNote: This is a demo. In a real website, this would download the PDF file.`);
        
        // In a real implementation, you would:
        // 1. Track download count
        // 2. Redirect to actual PDF file
        // 3. Or open PDF in new tab
        // window.open(`/books/${bookId}.pdf`, '_blank');
    }
}

// Search functionality
document.querySelector('.search-bar input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach(card => {
        const title = card.querySelector('.book-title').textContent.toLowerCase();
        const author = card.querySelector('.book-author').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || author.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Upload button functionality
document.querySelector('.upload-btn').addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'application/pdf') {
                if (file.size <= 50 * 1024 * 1024) { // 50MB limit
                    alert(`File "${file.name}" selected for upload!\n\nIn a real implementation, this would upload to the server.`);
                    // Here you would typically:
                    // 1. Upload to server using FormData and fetch
                    // 2. Show upload progress
                    // 3. Add to database
                } else {
                    alert('File size must be less than 50MB');
                }
            } else {
                alert('Please select a PDF file');
            }
        }
    };
    
    input.click();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Category card click handler
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const category = this.querySelector('h3').textContent;
        alert(`Showing books in: ${category}\n\nIn a real website, this would filter books by category.`);
    });
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', loadBooks);
