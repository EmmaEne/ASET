/* ============================================
   ASET STUDENT PORTAL - FUNCTIONALITY LOGIC
   Handles: Navigation, Modals, Wizard, Forms, Uploads, Payments, Chat
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    console.log('ASET Student Portal Logic Initialized');
});

/* ============================
   VIEW MANAGEMENT (NAVIGATION)
   ============================ */
function switchView(viewId, btn) {
    // 1. Reset all views
    document.querySelectorAll('.app-view').forEach(view => {
        view.classList.remove('active');
        view.style.opacity = '0';
    });

    // 2. Show target view
    const targetView = document.getElementById('view-' + viewId);
    if (targetView) {
        targetView.classList.add('active');
        // Slight delay for fade-in effect
        setTimeout(() => {
            targetView.style.opacity = '1';
        }, 10);
    }

    // 3. Update Nav Buttons
    if (btn) {
        document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
    } else {
        // Find matching nav button if switched programmatically
        document.querySelectorAll('.nav-btn').forEach(el => {
            const onclick = el.getAttribute('onclick');
            if (onclick && onclick.includes(`'${viewId}'`)) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================
   NEW REQUEST WIZARD FLOW
   =========================== */
let currentRequestData = {
    type: '',
    description: '',
    fileName: ''
};

function openNewRequestModal() {
    // Reset wizard to step 1
    goToStep(1);

    // Reset success/main states
    document.getElementById('requestMain').classList.remove('d-none');
    document.getElementById('requestSuccess').classList.add('d-none');

    // Reset file badge
    document.getElementById('wizUploadBadge').classList.add('d-none');
    document.getElementById('requestDesc').value = '';

    const modal = new bootstrap.Modal(document.getElementById('newRequestModal'));
    modal.show();
}

function goToStep(stepNum, type = null) {
    // Hide all steps
    document.querySelectorAll('.wizard-step').forEach(step => step.classList.add('d-none'));

    // Show target step
    document.getElementById('step' + stepNum).classList.remove('d-none');

    if (type) {
        currentRequestData.type = type;
        document.getElementById('selectedRequestType').innerText = type;
    }
}

function handleWizardUpload(input) {
    if (!input.files.length) return;

    const file = input.files[0];
    currentRequestData.fileName = file.name;

    // Update UI
    document.getElementById('fileName').innerText = file.name;
    document.getElementById('wizUploadBadge').classList.remove('d-none');
}

function processWizardPayment() {
    const payBtn = document.getElementById('wizPayBtn');
    const originalText = payBtn.innerHTML;

    // Loading State
    payBtn.disabled = true;
    payBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Processing...`;

    // Simulated Processing
    setTimeout(() => {
        document.getElementById('requestMain').classList.add('d-none');
        document.getElementById('requestSuccess').classList.remove('d-none');

        // Add to activity feed
        addActivityItem(currentRequestData.type, 'Case submitted and fee paid.', 'Just now');

        // Reset button
        payBtn.disabled = false;
        payBtn.innerHTML = originalText;
    }, 2200);
}

/* ============================
   LEGACY MODAL HANDLERS (Simplified Actions)
   =========================== */
function openUploadModal() {
    // For standalone "Upload Doc" quick action
    const modal = new bootstrap.Modal(document.getElementById('uploadDocModal'));
    modal.show();
}

function startSimulatedUpload(input) {
    if (!input.files.length) return;

    const progressArea = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const statusText = document.getElementById('uploadStatusText');

    progressArea.classList.remove('d-none');
    statusText.innerText = 'Uploading ' + input.files[0].name + '...';

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            setTimeout(() => {
                document.getElementById('uploadMain').classList.add('d-none');
                document.getElementById('uploadSuccess').classList.remove('d-none');
                addActivityItem('Document Upload', input.files[0].name + ' verified', 'Just now');
            }, 500);
        }
        progressBar.style.width = progress + '%';
        progressText.innerText = progress + '%';
    }, 200);
}

function openPaymentModal() {
    // For standalone "Pay Fee" quick action
    const modal = new bootstrap.Modal(document.getElementById('paymentModal'));
    modal.show();
}

function handlePayment(btn) {
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Connecting...`;

    setTimeout(() => {
        document.getElementById('paymentMain').classList.add('d-none');
        document.getElementById('paymentSuccess').classList.remove('d-none');
        addActivityItem('Manual Payment', '₦5,000 confirmed', 'Just now');
        btn.disabled = false;
        btn.innerHTML = originalText;
    }, 2000);
}

/* ============================
   PROFILE & SECURITY HANDLERS
   =========================== */
function handleProfileUpdate(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    btn.innerText = 'Saving...';

    setTimeout(() => {
        btn.disabled = false;
        btn.innerText = 'Saved Successfully!';
        setTimeout(() => {
            bootstrap.Modal.getInstance(document.getElementById('editProfileModal')).hide();
            btn.innerText = 'Save Changes';
        }, 1000);
    }, 1500);
}

function handlePasswordUpdate(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    btn.innerText = 'Updating...';

    setTimeout(() => {
        btn.disabled = false;
        btn.innerText = 'Password Updated!';
        setTimeout(() => {
            bootstrap.Modal.getInstance(document.getElementById('passwordModal')).hide();
            btn.innerText = 'Update Password';
        }, 1000);
    }, 1500);
}

function handleLogout() {
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    modal.show();
}

function markAllAsRead() {
    const badge = document.querySelector('.notify-badge');
    if (badge) badge.style.display = 'none';

    document.querySelectorAll('#notificationModal .list-group-item').forEach(item => {
        item.classList.remove('bg-light-subtle');
    });
}

/* ============================
   CHAT FLOW
   =========================== */
function openChat(sender, avatar) {
    document.getElementById('chatSender').innerText = sender;
    document.getElementById('chatAvatar').src = avatar;

    const chatBody = document.getElementById('chatBody');
    chatBody.innerHTML = `
        <div class="bg-white p-2 px-3 rounded-4 small align-self-start shadow-sm border" style="max-width: 85%;">
            Hello Adebayo, regarding your case <strong>ASET-2024-00847</strong>, how can I assist you today?
        </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('chatDetailModal'));
    modal.show();
}

function sendChatMessage() {
    const input = document.getElementById('chatInputArea');
    const chatBody = document.getElementById('chatBody');
    const msg = input.value.trim();

    if (!msg) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'bg-primary text-white p-2 px-3 rounded-4 small align-self-end shadow-sm';
    userMsg.style.maxWidth = '85%';
    userMsg.innerText = msg;
    chatBody.appendChild(userMsg);

    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        const reply = document.createElement('div');
        reply.className = 'bg-white p-2 px-3 rounded-4 small align-self-start shadow-sm border';
        reply.style.maxWidth = '85%';
        reply.innerText = "Understood. I've noted your response and will update the case officer.";
        chatBody.appendChild(reply);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1200);
}

/* ============================
   UTILS
   =========================== */
function addActivityItem(title, text, time) {
    const feed = document.querySelector('.activity-feed');
    if (!feed) return;

    const item = document.createElement('div');
    item.className = 'feed-item animate-in';
    item.innerHTML = `
        <div class="feed-icon"><i class="bi bi-info-circle"></i></div>
        <div class="feed-content">
            <h4>${title}</h4>
            <p>${text}</p>
            <span class="time">${time}</span>
        </div>
    `;
    feed.prepend(item);
}
