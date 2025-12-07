// Ad tracking and management
document.addEventListener('DOMContentLoaded', function() {
    // Load books
    loadBooks();
    
    // Track ad clicks
    document.querySelectorAll('.ad-link, .ad-btn, .floating-ad a').forEach(ad => {
        ad.addEventListener('click', function(e) {
            const adType = this.classList.contains('ad-btn') ? 'in-content' : 
                          this.classList.contains('floating-ad') ? 'floating' : 'banner';
            
            // Send analytics (simulated)
            console.log(`Ad clicked: ${adType}`);
            
            // You can add real analytics here
            // Example: Google Analytics
            // gtag('event', 'ad_click', {
            //     'event_category': 'advertisement',
            //     'event_label': adType
            // });
        });
    });
    
    // Show ad after 5 seconds
    setTimeout(() => {
        showNotificationAd();
    }, 5000);
});

function showNotificationAd() {
    const notification = document.createElement('div');
    notification.className = 'notification-ad';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="close-notification">&times;</span>
            <h4>🎁 Special Offer!</h4>
            <p>Get access to premium books library</p>
            <a href="https://publisher.linkvertise.com/ac/1458681" target="_blank" class="notification-btn">
                Claim Now
            </a>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Close notification
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 10000);
}

// Add this CSS for notification
const notificationCSS = `
.notification-ad {
    position: fixed;
    top: 80px;
    right: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 25px rgba(0,0,0,0.15);
    z-index: 1001;
    animation: slideInRight 0.5s ease-out;
    max-width: 300px;
}

.notification-content {
    padding: 15px;
    position: relative;
}

.close-notification {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
    font-size: 1.2rem;
    color: #666;
}

.notification-btn {
    display: inline-block;
    background: #FF6B6B;
    color: white;
    padding: 8px 15px;
    border-radius: 5px;
    text-decoration: none;
    margin-top: 10px;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;

// Add notification CSS to page
const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);
