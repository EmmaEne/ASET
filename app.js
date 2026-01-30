/* ============================================
   ASET PLATFORM - CORE LOGIC (MVP)
   Handles: Auth, Data Simulation (LocalStorage), Global UI State
   ============================================ */

const ASET = {
    // Database Defaults
    defaults: {
        users: [
            { id: 'u1', name: 'Adebayo Oluwaseun', email: 'student@aset.edu.ng', role: 'student', avatar: 'https://ui-avatars.com/api/?name=Adebayo+O&background=f0f9ff&color=0284c7&bold=true' },
            { id: 'u2', name: 'Dr. Okonkwo', email: 'mentor@aset.edu.ng', role: 'mentor', avatar: 'https://ui-avatars.com/api/?name=Dr+Okonkwo&background=e0f2fe&color=0369a1&bold=true' },
            { id: 'u3', name: 'Mrs. Adekoya F.', email: 'officer@aset.edu.ng', role: 'officer', avatar: 'https://ui-avatars.com/api/?name=Mrs+Adekoya&background=fef3c7&color=d97706&bold=true' },
            { id: 'u4', name: 'System Admin', email: 'admin@aset.edu.ng', role: 'admin', avatar: 'https://ui-avatars.com/api/?name=Admin&background=fee2e2&color=991b1b&bold=true' },
            { id: 'u5', name: 'Super Admin', email: 'super@aset.edu.ng', role: 'superadmin', avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=1e293b&color=fff&bold=true' }
        ],
        cases: [
            {
                id: 'ASET-2024-00847',
                studentId: 'u1',
                studentName: 'Adebayo Oluwaseun',
                type: 'Change of Programme',
                status: 'Under Review',
                stage: 'Faculty Stage',
                assignedTo: 'u3',
                date: 'Jan 15, 2024',
                timeline: [
                    { stage: 'Submitted', date: 'Jan 15, 10:30 AM', status: 'completed' },
                    { stage: 'Department Stage', date: 'Jan 18, 02:15 PM', status: 'completed' }
                ]
            },
            {
                id: 'ASET-2024-00623',
                studentId: 'u1',
                studentName: 'Adebayo Oluwaseun',
                type: 'Matric Generation',
                status: 'Done',
                stage: 'Completed',
                assignedTo: null,
                date: 'Dec 10, 2023',
                timeline: []
            }
        ],
        activity: [
            { id: 1, text: 'Admin moved Case #ASET-2024-00847 to Faculty stage', time: '2h ago', icon: 'bi-arrow-right-circle' },
            { id: 2, text: 'Officer added note to Case #ASET-2024-00847', time: '5h ago', icon: 'bi-sticky' },
            { id: 3, text: 'System verified payment for Case #ASET-2024-00847', time: '1d ago', icon: 'bi-credit-card' }
        ]
    },

    // Initialization
    init() {
        if (!localStorage.getItem('aset_users')) {
            localStorage.setItem('aset_users', JSON.stringify(this.defaults.users));
        }
        if (!localStorage.getItem('aset_cases')) {
            localStorage.setItem('aset_cases', JSON.stringify(this.defaults.cases));
        }
        if (!localStorage.getItem('aset_activity')) {
            localStorage.setItem('aset_activity', JSON.stringify(this.defaults.activity));
        }
        if (!localStorage.getItem('aset_currentUser')) {
            // No default logged in user
        }
    },

    // Auth
    login(email, password) {
        // Simple mock auth
        const users = JSON.parse(localStorage.getItem('aset_users'));
        const user = users.find(u => u.email === email);
        if (user) {
            localStorage.setItem('aset_currentUser', JSON.stringify(user));
            return user;
        }
        return null;
    },

    logout() {
        localStorage.removeItem('aset_currentUser');
        window.location.href = 'index.html';
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('aset_currentUser'));
    },

    // Data Access
    getCases(role, userId) {
        const cases = JSON.parse(localStorage.getItem('aset_cases'));
        if (role === 'student') return cases.filter(c => c.studentId === userId);
        if (role === 'officer') return cases.filter(c => c.assignedTo === userId);
        if (role === 'mentor') return cases; // Mentors see all for demo or specific assigned
        return cases; // Admin/Superadmin see all
    },

    addActivity(text, icon = 'bi-info-circle') {
        const activity = JSON.parse(localStorage.getItem('aset_activity'));
        const newActivity = { id: Date.now(), text, time: 'Just now', icon };
        activity.unshift(newActivity);
        localStorage.setItem('aset_activity', JSON.stringify(activity));
        return newActivity;
    }
};

// Initialize on Load
ASET.init();

// Global View Switcher (for all dashboards)
function switchView(viewId, btn) {
    // Hide all views
    document.querySelectorAll('.app-view').forEach(view => {
        view.classList.remove('active');
        view.style.opacity = '0';
    });

    // Show target
    const target = document.getElementById('view-' + viewId);
    if (target) {
        target.classList.add('active');
        // Fade in
        setTimeout(() => target.style.opacity = '1', 10);
    }

    // Update Nav
    document.querySelectorAll('.nav-item, .nav-btn').forEach(el => el.classList.remove('active'));

    // Highlight clicked button and its counterparts
    if (btn) {
        const onclick = btn.getAttribute('onclick');
        document.querySelectorAll(`[onclick="${onclick}"]`).forEach(el => el.classList.add('active'));
    }
}

// Common Logout Handler
function handleLogout() {
    // Direct logout without native confirm() to adhere to design rules
    ASET.logout();
}
