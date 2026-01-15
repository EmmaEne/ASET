/**
 * ═══════════════════════════════════════════════════════════════
 * ASET TAMP - Transfer Assistance & Mentorship Platform
 * Main Application JavaScript
 * ═══════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════
// DATA STORAGE & INITIALIZATION
// ═══════════════════════════════════════════════════════════════

const STORAGE_KEYS = {
  USERS: 'aset_users',
  CASES: 'aset_cases',
  PAYMENTS: 'aset_payments',
  ACTIVITY_LOG: 'aset_activity_log',
  CURRENT_USER: 'aset_current_user'
};

// Request Types
const REQUEST_TYPES = [
  { id: 'change_programme', label: 'Change of Programme', icon: 'fas fa-exchange-alt' },
  { id: 'probation', label: 'On Probation', icon: 'fas fa-exclamation-triangle' },
  { id: 'transfer_uni', label: 'Transfer to Another University', icon: 'fas fa-university' },
  { id: 'withdrawal', label: 'Withdrawal', icon: 'fas fa-sign-out-alt' },
  { id: 'deferment', label: 'Deferment / Suspension', icon: 'fas fa-pause-circle' },
  { id: 'matric_gen', label: 'Matric Number Generation', icon: 'fas fa-id-card' }
];

// Case Stages
const CASE_STAGES = [
  { id: 'submitted', label: 'Submitted', color: 'secondary' },
  { id: 'under_review', label: 'Under Review', color: 'info' },
  { id: 'department', label: 'Department Stage', color: 'warning' },
  { id: 'faculty', label: 'Faculty Stage', color: 'warning' },
  { id: 'registry', label: 'Registry Stage', color: 'primary' },
  { id: 'completed', label: 'Completed', color: 'success' },
  { id: 'not_approved', label: 'Not Approved', color: 'danger' }
];

// Faculties and Departments
const FACULTIES = {
  'Science': ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Microbiology'],
  'Engineering': ['Mechanical Eng.', 'Electrical Eng.', 'Civil Eng.', 'Chemical Eng.', 'Computer Eng.'],
  'Arts': ['English', 'History', 'Philosophy', 'Theatre Arts', 'Music', 'Fine Arts'],
  'Social Sciences': ['Economics', 'Political Science', 'Sociology', 'Psychology', 'Mass Communication'],
  'Medicine': ['Medicine & Surgery', 'Nursing', 'Pharmacy', 'Medical Lab Science'],
  'Law': ['Law'],
  'Education': ['Education', 'Science Education', 'Arts Education']
};

// Initialize default data
function initializeData() {
  // Default admin users
  const defaultUsers = [
    {
      id: 'admin-001',
      fullName: 'Admin User',
      email: 'admin@aset.edu.ng',
      password: 'admin123',
      role: 'admin',
      createdAt: new Date().toISOString()
    },
    {
      id: 'superadmin-001',
      fullName: 'Super Administrator',
      email: 'superadmin@aset.edu.ng',
      password: 'super123',
      role: 'superadmin',
      createdAt: new Date().toISOString()
    },
    {
      id: 'officer-001',
      fullName: 'John Okafor',
      email: 'officer@aset.edu.ng',
      password: 'officer123',
      role: 'officer',
      createdAt: new Date().toISOString()
    },
    {
      id: 'mentor-001',
      fullName: 'Dr. Amina Ibrahim',
      email: 'mentor@aset.edu.ng',
      password: 'mentor123',
      role: 'mentor',
      createdAt: new Date().toISOString()
    },
    {
      id: 'student-001',
      fullName: 'Chukwudi Emeka',
      email: 'student@aset.edu.ng',
      matricNumber: 'CSC/2020/001',
      password: 'student123',
      faculty: 'Science',
      department: 'Computer Science',
      level: '300',
      role: 'student',
      createdAt: new Date().toISOString()
    }
  ];

  // Default sample cases
  const defaultCases = [
    {
      id: 'CASE-2026-0001',
      studentId: 'student-001',
      studentName: 'Chukwudi Emeka',
      matricNumber: 'CSC/2020/001',
      faculty: 'Science',
      department: 'Computer Science',
      requestType: 'change_programme',
      currentStage: 'faculty',
      assignedOfficer: 'officer-001',
      assignedMentor: 'mentor-001',
      paymentStatus: 'paid',
      documents: ['result_slip.pdf', 'application_letter.pdf'],
      notes: [],
      timeline: [
        { stage: 'submitted', timestamp: '2026-01-10T09:00:00', note: 'Case submitted by student' },
        { stage: 'under_review', timestamp: '2026-01-11T10:30:00', note: 'Case assigned to officer' },
        { stage: 'department', timestamp: '2026-01-12T14:00:00', note: 'Forwarded to department' },
        { stage: 'faculty', timestamp: '2026-01-14T11:00:00', note: 'Under faculty review' }
      ],
      createdAt: '2026-01-10T09:00:00',
      isLocked: false
    },
    {
      id: 'CASE-2026-0002',
      studentId: 'student-002',
      studentName: 'Fatima Abubakar',
      matricNumber: 'ENG/2021/045',
      faculty: 'Engineering',
      department: 'Electrical Eng.',
      requestType: 'probation',
      currentStage: 'under_review',
      assignedOfficer: 'officer-001',
      assignedMentor: null,
      paymentStatus: 'paid',
      documents: ['result_slip.pdf'],
      notes: [],
      timeline: [
        { stage: 'submitted', timestamp: '2026-01-13T08:00:00', note: 'Case submitted by student' },
        { stage: 'under_review', timestamp: '2026-01-14T09:00:00', note: 'Under initial review' }
      ],
      createdAt: '2026-01-13T08:00:00',
      isLocked: false
    }
  ];

  // Initialize only if data doesn't exist
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.CASES)) {
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(defaultCases));
  }

  if (!localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOG)) {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOG, JSON.stringify([
      {
        id: 'log-001',
        action: 'case_created',
        userId: 'student-001',
        userName: 'Chukwudi Emeka',
        caseId: 'CASE-2026-0001',
        details: 'New case submitted for Change of Programme',
        timestamp: '2026-01-10T09:00:00'
      },
      {
        id: 'log-002',
        action: 'case_assigned',
        userId: 'admin-001',
        userName: 'Admin User',
        caseId: 'CASE-2026-0001',
        details: 'Case assigned to John Okafor',
        timestamp: '2026-01-11T10:30:00'
      }
    ]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.PAYMENTS)) {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify([
      {
        id: 'PAY-001',
        studentId: 'student-001',
        caseId: 'CASE-2026-0001',
        amount: 5000,
        status: 'paid',
        reference: 'ASET-PAY-2026-001',
        paidAt: '2026-01-10T08:55:00'
      }
    ]));
  }
}

// ═══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function generateId(prefix = 'ID') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateCaseId() {
  const year = new Date().getFullYear();
  const cases = JSON.parse(localStorage.getItem(STORAGE_KEYS.CASES) || '[]');
  const caseNumber = String(cases.length + 1).padStart(4, '0');
  return `CASE-${year}-${caseNumber}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(amount);
}

function getRequestTypeLabel(typeId) {
  const type = REQUEST_TYPES.find(t => t.id === typeId);
  return type ? type.label : typeId;
}

function getStageInfo(stageId) {
  return CASE_STAGES.find(s => s.id === stageId) || CASE_STAGES[0];
}

function getStageIndex(stageId) {
  return CASE_STAGES.findIndex(s => s.id === stageId);
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;
  
  // Add toast styles if not exists
  if (!document.querySelector('#toast-styles')) {
    const styles = document.createElement('style');
    styles.id = 'toast-styles';
    styles.textContent = `
      .toast {
        position: fixed;
        bottom: 24px;
        right: 24px;
        padding: 16px 24px;
        background: #1e293b;
        color: white;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
      }
      .toast-success { background: #059669; }
      .toast-error { background: #dc2626; }
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(styles);
  }
  
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ═══════════════════════════════════════════════════════════════
// AUTHENTICATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function getCurrentUser() {
  const userData = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return userData ? JSON.parse(userData) : null;
}

function setCurrentUser(user) {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  window.location.href = 'index.html';
}

function login(email, password) {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const user = users.find(u => 
    (u.email === email || u.matricNumber === email) && u.password === password
  );
  
  if (user) {
    const { password: _, ...safeUser } = user;
    setCurrentUser(safeUser);
    logActivity('login', user.id, user.fullName, null, 'User logged in');
    return { success: true, user: safeUser };
  }
  
  return { success: false, message: 'Invalid credentials' };
}

function register(userData) {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  
  // Check if email or matric already exists
  if (users.find(u => u.email === userData.email)) {
    return { success: false, message: 'Email already registered' };
  }
  
  if (userData.matricNumber && users.find(u => u.matricNumber === userData.matricNumber)) {
    return { success: false, message: 'Matric number already registered' };
  }
  
  const newUser = {
    id: generateId('student'),
    ...userData,
    role: 'student',
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  
  const { password: _, ...safeUser } = newUser;
  setCurrentUser(safeUser);
  logActivity('register', newUser.id, newUser.fullName, null, 'New student registered');
  
  return { success: true, user: safeUser };
}

function requireAuth(allowedRoles = []) {
  const user = getCurrentUser();
  
  if (!user) {
    window.location.href = 'index.html';
    return null;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard
    redirectToDashboard(user.role);
    return null;
  }
  
  return user;
}

function redirectToDashboard(role) {
  const dashboards = {
    student: 'student.html',
    admin: 'admin.html',
    officer: 'officer.html',
    mentor: 'mentor.html',
    superadmin: 'superadmin.html'
  };
  
  window.location.href = dashboards[role] || 'index.html';
}

// ═══════════════════════════════════════════════════════════════
// CASE MANAGEMENT FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function getCases(filters = {}) {
  let cases = JSON.parse(localStorage.getItem(STORAGE_KEYS.CASES) || '[]');
  
  if (filters.studentId) {
    cases = cases.filter(c => c.studentId === filters.studentId);
  }
  
  if (filters.assignedOfficer) {
    cases = cases.filter(c => c.assignedOfficer === filters.assignedOfficer);
  }
  
  if (filters.assignedMentor) {
    cases = cases.filter(c => c.assignedMentor === filters.assignedMentor);
  }
  
  if (filters.faculty) {
    cases = cases.filter(c => c.faculty === filters.faculty);
  }
  
  if (filters.department) {
    cases = cases.filter(c => c.department === filters.department);
  }
  
  if (filters.requestType) {
    cases = cases.filter(c => c.requestType === filters.requestType);
  }
  
  if (filters.status) {
    cases = cases.filter(c => c.currentStage === filters.status);
  }
  
  return cases.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function getCaseById(caseId) {
  const cases = JSON.parse(localStorage.getItem(STORAGE_KEYS.CASES) || '[]');
  return cases.find(c => c.id === caseId);
}

function createCase(caseData, user) {
  const cases = JSON.parse(localStorage.getItem(STORAGE_KEYS.CASES) || '[]');
  
  const newCase = {
    id: generateCaseId(),
    studentId: user.id,
    studentName: user.fullName,
    matricNumber: user.matricNumber,
    faculty: user.faculty,
    department: user.department,
    requestType: caseData.requestType,
    currentStage: 'submitted',
    assignedOfficer: null,
    assignedMentor: null,
    paymentStatus: 'pending',
    documents: caseData.documents || [],
    notes: [],
    timeline: [{
      stage: 'submitted',
      timestamp: new Date().toISOString(),
      note: 'Case submitted by student'
    }],
    createdAt: new Date().toISOString(),
    isLocked: false
  };
  
  cases.push(newCase);
  localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
  logActivity('case_created', user.id, user.fullName, newCase.id, 
    `New case submitted for ${getRequestTypeLabel(caseData.requestType)}`);
  
  return newCase;
}

function updateCaseStage(caseId, newStage, note, userId, userName) {
  const cases = JSON.parse(localStorage.getItem(STORAGE_KEYS.CASES) || '[]');
  const caseIndex = cases.findIndex(c => c.id === caseId);
  
  if (caseIndex === -1) return null;
  
  if (cases[caseIndex].isLocked) {
    return { error: 'Case is locked and cannot be modified' };
  }
  
  cases[caseIndex].currentStage = newStage;
  cases[caseIndex].timeline.push({
    stage: newStage,
    timestamp: new Date().toISOString(),
    note: note || `Case moved to ${getStageInfo(newStage).label}`,
    updatedBy: userName
  });
  
  localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
  logActivity('stage_updated', userId, userName, caseId, 
    `Case stage updated to ${getStageInfo(newStage).label}`);
  
  return cases[caseIndex];
}

function assignOfficer(caseId, officerId, adminId, adminName) {
  const cases = JSON.parse(localStorage.getItem(STORAGE_KEYS.CASES) || '[]');
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const caseIndex = cases.findIndex(c => c.id === caseId);
  const officer = users.find(u => u.id === officerId);
  
  if (caseIndex === -1 || !officer) return null;
  
  cases[caseIndex].assignedOfficer = officerId;
  cases[caseIndex].timeline.push({
    stage: cases[caseIndex].currentStage,
    timestamp: new Date().toISOString(),
    note: `Case assigned to ${officer.fullName}`,
    updatedBy: adminName
  });
  
  localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
  logActivity('case_assigned', adminId, adminName, caseId, 
    `Case assigned to ${officer.fullName}`);
  
  return cases[caseIndex];
}

function assignMentor(caseId, mentorId, adminId, adminName) {
  const cases = JSON.parse(localStorage.getItem(STORAGE_KEYS.CASES) || '[]');
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const caseIndex = cases.findIndex(c => c.id === caseId);
  const mentor = users.find(u => u.id === mentorId);
  
  if (caseIndex === -1 || !mentor) return null;
  
  cases[caseIndex].assignedMentor = mentorId;
  
  localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
  logActivity('mentor_assigned', adminId, adminName, caseId, 
    `Mentor ${mentor.fullName} assigned to case`);
  
  return cases[caseIndex];
}

function addCaseNote(caseId, note, userId, userName, isInternal = true) {
  const cases = JSON.parse(localStorage.getItem(STORAGE_KEYS.CASES) || '[]');
  const caseIndex = cases.findIndex(c => c.id === caseId);
  
  if (caseIndex === -1) return null;
  
  const newNote = {
    id: generateId('note'),
    content: note,
    authorId: userId,
    authorName: userName,
    isInternal: isInternal,
    createdAt: new Date().toISOString()
  };
  
  cases[caseIndex].notes.push(newNote);
  localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
  logActivity('note_added', userId, userName, caseId, 'Added a note to case');
  
  return cases[caseIndex];
}

function toggleCaseLock(caseId, lock, userId, userName) {
  const cases = JSON.parse(localStorage.getItem(STORAGE_KEYS.CASES) || '[]');
  const caseIndex = cases.findIndex(c => c.id === caseId);
  
  if (caseIndex === -1) return null;
  
  cases[caseIndex].isLocked = lock;
  localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
  logActivity(lock ? 'case_locked' : 'case_unlocked', userId, userName, caseId, 
    `Case ${lock ? 'locked' : 'unlocked'}`);
  
  return cases[caseIndex];
}

// ═══════════════════════════════════════════════════════════════
// PAYMENT FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function getPaymentStatus(caseId) {
  const payments = JSON.parse(localStorage.getItem(STORAGE_KEYS.PAYMENTS) || '[]');
  return payments.find(p => p.caseId === caseId);
}

function simulatePayment(caseId, studentId) {
  const payments = JSON.parse(localStorage.getItem(STORAGE_KEYS.PAYMENTS) || '[]');
  const cases = JSON.parse(localStorage.getItem(STORAGE_KEYS.CASES) || '[]');
  
  const payment = {
    id: generateId('PAY'),
    studentId: studentId,
    caseId: caseId,
    amount: 5000,
    status: 'paid',
    reference: `ASET-PAY-${Date.now()}`,
    paidAt: new Date().toISOString()
  };
  
  payments.push(payment);
  localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
  
  // Update case payment status
  const caseIndex = cases.findIndex(c => c.id === caseId);
  if (caseIndex !== -1) {
    cases[caseIndex].paymentStatus = 'paid';
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
  }
  
  return payment;
}

// ═══════════════════════════════════════════════════════════════
// ACTIVITY LOG FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function logActivity(action, userId, userName, caseId, details) {
  const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOG) || '[]');
  
  logs.unshift({
    id: generateId('log'),
    action: action,
    userId: userId,
    userName: userName,
    caseId: caseId,
    details: details,
    timestamp: new Date().toISOString()
  });
  
  // Keep only last 500 logs
  if (logs.length > 500) {
    logs.splice(500);
  }
  
  localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOG, JSON.stringify(logs));
}

function getActivityLogs(filters = {}) {
  let logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOG) || '[]');
  
  if (filters.caseId) {
    logs = logs.filter(l => l.caseId === filters.caseId);
  }
  
  if (filters.userId) {
    logs = logs.filter(l => l.userId === filters.userId);
  }
  
  if (filters.action) {
    logs = logs.filter(l => l.action === filters.action);
  }
  
  return logs;
}

// ═══════════════════════════════════════════════════════════════
// USER MANAGEMENT
// ═══════════════════════════════════════════════════════════════

function getUsers(role = null) {
  let users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  
  if (role) {
    users = users.filter(u => u.role === role);
  }
  
  return users.map(({ password, ...user }) => user);
}

function getUserById(userId) {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const user = users.find(u => u.id === userId);
  if (user) {
    const { password, ...safeUser } = user;
    return safeUser;
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════
// UI HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function renderCaseTimeline(timeline) {
  return timeline.map((item, index) => {
    const stageInfo = getStageInfo(item.stage);
    const isLast = index === timeline.length - 1;
    const statusClass = isLast ? 'current' : 'completed';
    
    return `
      <div class="timeline-item ${statusClass}">
        <div class="timeline-marker">
          <i class="fas ${isLast ? 'fa-circle' : 'fa-check'}"></i>
        </div>
        <div class="timeline-content">
          <div class="timeline-title">${stageInfo.label}</div>
          <div class="timeline-date">${formatDateTime(item.timestamp)}</div>
          ${item.note ? `<div class="timeline-note">${item.note}</div>` : ''}
          ${item.updatedBy ? `<div class="timeline-note">Updated by: ${item.updatedBy}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function renderStepper(currentStage) {
  const currentIndex = getStageIndex(currentStage);
  const mainStages = CASE_STAGES.slice(0, -1); // Exclude "not_approved"
  
  return mainStages.map((stage, index) => {
    let statusClass = 'pending';
    if (index < currentIndex) statusClass = 'completed';
    if (index === currentIndex) statusClass = 'current';
    if (currentStage === 'not_approved' && index === mainStages.length - 1) {
      statusClass = 'rejected';
    }
    
    return `
      <div class="stepper-step ${statusClass}">
        <div class="step-marker">
          ${statusClass === 'completed' ? '<i class="fas fa-check"></i>' : index + 1}
        </div>
        <div class="step-label">${stage.label}</div>
      </div>
    `;
  }).join('');
}

function renderStatusBadge(stage) {
  const stageInfo = getStageInfo(stage);
  return `<span class="badge badge-${stageInfo.color}">${stageInfo.label}</span>`;
}

function renderPaymentBadge(status) {
  const badges = {
    pending: '<span class="badge badge-warning">Pending Payment</span>',
    paid: '<span class="badge badge-success">Paid</span>',
    not_verified: '<span class="badge badge-danger">Not Verified</span>'
  };
  return badges[status] || badges.pending;
}

function populateFacultyDropdown(selectId, selectedValue = '') {
  const select = document.getElementById(selectId);
  if (!select) return;
  
  select.innerHTML = '<option value="">Select Faculty</option>';
  Object.keys(FACULTIES).forEach(faculty => {
    const selected = faculty === selectedValue ? 'selected' : '';
    select.innerHTML += `<option value="${faculty}" ${selected}>${faculty}</option>`;
  });
}

function populateDepartmentDropdown(selectId, faculty, selectedValue = '') {
  const select = document.getElementById(selectId);
  if (!select) return;
  
  select.innerHTML = '<option value="">Select Department</option>';
  
  if (faculty && FACULTIES[faculty]) {
    FACULTIES[faculty].forEach(dept => {
      const selected = dept === selectedValue ? 'selected' : '';
      select.innerHTML += `<option value="${dept}" ${selected}>${dept}</option>`;
    });
  }
}

function populateRequestTypeDropdown(selectId, selectedValue = '') {
  const select = document.getElementById(selectId);
  if (!select) return;
  
  select.innerHTML = '<option value="">Select Request Type</option>';
  REQUEST_TYPES.forEach(type => {
    const selected = type.id === selectedValue ? 'selected' : '';
    select.innerHTML += `<option value="${type.id}" ${selected}>${type.label}</option>`;
  });
}

function setupSidebar() {
  const toggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      if (overlay) overlay.classList.toggle('active');
    });
  }
  
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });
  }
}

function renderUserInfo(user) {
  const userMenus = document.querySelectorAll('.user-menu');
  userMenus.forEach(menu => {
    const initials = user.fullName.split(' ').map(n => n[0]).join('').toUpperCase();
    menu.innerHTML = `
      <div class="user-avatar">${initials}</div>
      <div class="user-info">
        <div class="user-name">${user.fullName}</div>
        <div class="user-role">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
      </div>
      <button onclick="logout()" class="btn btn-icon" title="Logout">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    `;
  });
}

// ═══════════════════════════════════════════════════════════════
// MODAL FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = '';
}

// Close modal on backdrop click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllModals();
  }
});

// ═══════════════════════════════════════════════════════════════
// STATISTICS FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function getStatistics() {
  const cases = JSON.parse(localStorage.getItem(STORAGE_KEYS.CASES) || '[]');
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  
  return {
    totalCases: cases.length,
    pendingCases: cases.filter(c => ['submitted', 'under_review'].includes(c.currentStage)).length,
    inProgressCases: cases.filter(c => ['department', 'faculty', 'registry'].includes(c.currentStage)).length,
    completedCases: cases.filter(c => c.currentStage === 'completed').length,
    rejectedCases: cases.filter(c => c.currentStage === 'not_approved').length,
    totalStudents: users.filter(u => u.role === 'student').length,
    totalOfficers: users.filter(u => u.role === 'officer').length,
    totalMentors: users.filter(u => u.role === 'mentor').length,
    casesByType: REQUEST_TYPES.map(type => ({
      type: type.label,
      count: cases.filter(c => c.requestType === type.id).length
    })),
    casesByFaculty: Object.keys(FACULTIES).map(faculty => ({
      faculty: faculty,
      count: cases.filter(c => c.faculty === faculty).length
    }))
  };
}

// ═══════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  initializeData();
  setupSidebar();
});

// Export functions for use in other scripts
window.ASET = {
  // Auth
  login,
  register,
  logout,
  getCurrentUser,
  requireAuth,
  redirectToDashboard,
  
  // Cases
  getCases,
  getCaseById,
  createCase,
  updateCaseStage,
  assignOfficer,
  assignMentor,
  addCaseNote,
  toggleCaseLock,
  
  // Payments
  getPaymentStatus,
  simulatePayment,
  
  // Users
  getUsers,
  getUserById,
  
  // Activity
  getActivityLogs,
  logActivity,
  
  // Statistics
  getStatistics,
  
  // UI Helpers
  renderCaseTimeline,
  renderStepper,
  renderStatusBadge,
  renderPaymentBadge,
  renderUserInfo,
  populateFacultyDropdown,
  populateDepartmentDropdown,
  populateRequestTypeDropdown,
  
  // Modals
  openModal,
  closeModal,
  closeAllModals,
  
  // Utilities
  formatDate,
  formatDateTime,
  formatCurrency,
  getRequestTypeLabel,
  getStageInfo,
  showToast,
  
  // Constants
  REQUEST_TYPES,
  CASE_STAGES,
  FACULTIES
};
