/* ============================================
   ASET UI STATES MANAGER
   Handles: Toasts, Loading, Skeleton, Empty States, Offline
   ============================================ */

const UIStates = {
    // Toast notification system
    toasts: [],
    toastContainer: null,

    init() {
        // Create toast container if not exists
        if (!document.querySelector('.toast-container')) {
            this.toastContainer = document.createElement('div');
            this.toastContainer.className = 'toast-container';
            document.body.appendChild(this.toastContainer);
        } else {
            this.toastContainer = document.querySelector('.toast-container');
        }

        // Setup offline detector
        this.setupOfflineDetector();

        // Check for first-time user (welcome panel)
        this.checkFirstTimeUser();

        // Initialize skeleton loaders - simulate loading then reveal content
        this.initSkeletonLoaders();
    },

    // ============================
    // SKELETON LOADING SYSTEM
    // ============================
    initSkeletonLoaders() {
        // Automatically find all skeleton wrappers in the page
        const skeletonWrappers = document.querySelectorAll('[id$="Skeleton"]');

        skeletonWrappers.forEach(skeleton => {
            const rootId = skeleton.id.replace('Skeleton', '');
            const content = document.getElementById(rootId + 'Content');

            if (content) {
                // Initial state: hide content, show skeleton
                content.style.display = 'none';

                // Simulate data loading
                const loadTime = 700 + Math.random() * 500; // 700-1200ms

                setTimeout(() => {
                    this.revealContent(skeleton.id, rootId + 'Content');
                }, loadTime);
            }
        });
    },

    revealContent(skeletonId, contentId) {
        const skeleton = document.getElementById(skeletonId);
        const content = document.getElementById(contentId);

        if (skeleton && content) {
            // Fade out skeleton
            skeleton.classList.add('hidden');

            // Show content with animation
            content.style.display = 'block';
            content.classList.add('content-loaded');

            // Remove skeleton from DOM after animation
            setTimeout(() => {
                skeleton.remove();
            }, 300);
        }
    },

    // Show skeleton for a specific component (for lazy loading components)
    showComponentSkeleton(containerId, type = 'card') {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Store original content
        container.dataset.originalContent = container.innerHTML;

        let skeletonHtml = this.getSkeletonHtml(type);
        container.innerHTML = skeletonHtml;
    },

    // Hide skeleton and restore/show new content
    hideComponentSkeleton(containerId, newContent = null) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (newContent) {
            container.innerHTML = newContent;
        } else if (container.dataset.originalContent) {
            container.innerHTML = container.dataset.originalContent;
            delete container.dataset.originalContent;
        }

        container.classList.add('content-loaded');
    },

    getSkeletonHtml(type) {
        switch (type) {
            case 'status-card':
                return `
                    <div class="skeleton-status-card">
                        <div class="skeleton-status-header">
                            <div class="skeleton skeleton-text"></div>
                            <div class="skeleton skeleton-badge"></div>
                        </div>
                        <div class="skeleton-case-info">
                            <div class="skeleton skeleton-title"></div>
                            <div class="skeleton skeleton-text"></div>
                        </div>
                        <div class="skeleton skeleton-progress"></div>
                        <div class="skeleton skeleton-button"></div>
                    </div>
                `;
            case 'feed':
                return `
                    <div class="skeleton-activity-feed">
                        ${this.getSkeletonFeedItem()}
                        ${this.getSkeletonFeedItem()}
                        ${this.getSkeletonFeedItem()}
                    </div>
                `;
            case 'table':
                return `
                    <div class="skeleton-table">
                        <div class="skeleton-table-header">
                            <div class="skeleton skeleton-text" style="flex: 0.5;"></div>
                            <div class="skeleton skeleton-text" style="flex: 1;"></div>
                            <div class="skeleton skeleton-text" style="flex: 0.7;"></div>
                            <div class="skeleton skeleton-text" style="flex: 0.5;"></div>
                        </div>
                        ${this.getSkeletonTableRow()}
                        ${this.getSkeletonTableRow()}
                        ${this.getSkeletonTableRow()}
                        ${this.getSkeletonTableRow()}
                    </div>
                `;
            case 'messages':
                return `
                    <div class="skeleton-thread-list">
                        ${this.getSkeletonThreadItem()}
                        ${this.getSkeletonThreadItem()}
                        ${this.getSkeletonThreadItem()}
                    </div>
                `;
            case 'profile':
                return `
                    <div class="skeleton-profile-hero">
                        <div class="skeleton skeleton-avatar xl" style="margin: 0 auto 1rem;"></div>
                        <div class="skeleton skeleton-title" style="margin: 0 auto 8px;"></div>
                        <div class="skeleton skeleton-text" style="margin: 0 auto;"></div>
                    </div>
                    <div class="skeleton-settings-list">
                        ${this.getSkeletonSettingsItem()}
                        ${this.getSkeletonSettingsItem()}
                        ${this.getSkeletonSettingsItem()}
                        ${this.getSkeletonSettingsItem()}
                    </div>
                `;
            case 'case-cards':
                return `
                    <div>
                        ${this.getSkeletonCaseCard()}
                        ${this.getSkeletonCaseCard()}
                    </div>
                `;
            default:
                return `
                    <div class="skeleton-side-card">
                        <div class="skeleton skeleton-title"></div>
                        <div class="skeleton skeleton-text w-100"></div>
                        <div class="skeleton skeleton-text w-75"></div>
                    </div>
                `;
        }
    },

    getSkeletonFeedItem() {
        return `
            <div class="skeleton-feed-item">
                <div class="skeleton skeleton-icon md"></div>
                <div class="skeleton-feed-content">
                    <div class="skeleton skeleton-text" style="width: 70%;"></div>
                    <div class="skeleton skeleton-text" style="width: 50%;"></div>
                </div>
            </div>
        `;
    },

    getSkeletonTableRow() {
        return `
            <div class="skeleton-table-row">
                <div class="skeleton-table-cell narrow"><div class="skeleton skeleton-text"></div></div>
                <div class="skeleton-table-cell"><div class="skeleton skeleton-text"></div></div>
                <div class="skeleton-table-cell"><div class="skeleton skeleton-text"></div></div>
                <div class="skeleton-table-cell narrow"><div class="skeleton skeleton-badge"></div></div>
            </div>
        `;
    },

    getSkeletonThreadItem() {
        return `
            <div class="skeleton-thread-item">
                <div class="skeleton skeleton-avatar-square" style="width: 40px; height: 40px;"></div>
                <div class="skeleton-thread-content">
                    <div class="skeleton-thread-header">
                        <div class="skeleton skeleton-text" style="width: 100px;"></div>
                        <div class="skeleton skeleton-text xs" style="width: 40px;"></div>
                    </div>
                    <div class="skeleton skeleton-text" style="width: 90%;"></div>
                </div>
            </div>
        `;
    },

    getSkeletonSettingsItem() {
        return `
            <div class="skeleton-settings-item">
                <div class="skeleton skeleton-icon sm"></div>
                <div class="skeleton skeleton-text" style="flex: 1;"></div>
            </div>
        `;
    },

    getSkeletonCaseCard() {
        return `
            <div class="skeleton-case-card">
                <div class="skeleton-case-header">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
                <div class="skeleton skeleton-text" style="width: 50%;"></div>
                <div class="skeleton-case-footer">
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                </div>
            </div>
        `;
    },

    // ============================
    // TOAST NOTIFICATIONS
    // ============================
    showToast(message, type = 'info', duration = 4000) {
        const icons = {
            success: 'bi-check-lg',
            error: 'bi-x-lg',
            warning: 'bi-exclamation-lg',
            info: 'bi-info-lg'
        };

        const toast = document.createElement('div');
        toast.className = `aset-toast ${type}`;
        toast.innerHTML = `
            <div class="aset-toast-icon">
                <i class="bi ${icons[type]}"></i>
            </div>
            <span class="aset-toast-message">${message}</span>
            <button class="aset-toast-close" onclick="UIStates.closeToast(this.parentElement)">
                <i class="bi bi-x"></i>
            </button>
        `;

        this.toastContainer.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto-dismiss
        if (duration > 0) {
            setTimeout(() => {
                this.closeToast(toast);
            }, duration);
        }

        return toast;
    },

    closeToast(toast) {
        toast.classList.add('hiding');
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    },

    // ============================
    // BUTTON LOADING STATES
    // ============================
    setButtonLoading(btn, loading = true, loadingText = 'Processing...') {
        if (loading) {
            btn.dataset.originalText = btn.innerHTML;
            btn.classList.add('btn-loading');
            btn.disabled = true;
            // Keep text for accessibility but hide it visually
            btn.setAttribute('aria-busy', 'true');
        } else {
            btn.classList.remove('btn-loading');
            btn.disabled = false;
            btn.innerHTML = btn.dataset.originalText || btn.innerHTML;
            btn.removeAttribute('aria-busy');
        }
    },

    setButtonSuccess(btn, successText = 'Done!', duration = 1500) {
        const original = btn.innerHTML;
        btn.classList.add('btn-success-state');
        btn.innerHTML = successText;

        setTimeout(() => {
            btn.classList.remove('btn-success-state');
            btn.innerHTML = original;
        }, duration);
    },

    // ============================
    // PAGE LOADING
    // ============================
    showPageLoader() {
        let overlay = document.querySelector('.page-loading-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'page-loading-overlay';
            overlay.innerHTML = `
                <div class="page-loader">
                    <div class="spinner"></div>
                    <span class="loading-text">Loading...</span>
                </div>
            `;
            document.body.prepend(overlay);
        }
        overlay.classList.remove('hide');
    },

    hidePageLoader() {
        const overlay = document.querySelector('.page-loading-overlay');
        if (overlay) {
            overlay.classList.add('hide');
            setTimeout(() => overlay.remove(), 300);
        }
    },

    // ============================
    // SKELETON LOADERS
    // ============================
    showSkeleton(containerId, type = 'card') {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.dataset.originalContent = container.innerHTML;

        let skeletonHtml = '';

        switch (type) {
            case 'dashboard':
                skeletonHtml = `
                    <div class="skeleton-dashboard">
                        <div class="skeleton-status-card">
                            <div class="skeleton"></div>
                            <div class="skeleton"></div>
                            <div class="skeleton"></div>
                            <div class="skeleton"></div>
                            <div class="skeleton"></div>
                        </div>
                        <div class="d-flex flex-column gap-3">
                            ${this.getSkeletonFeedItem()}
                            ${this.getSkeletonFeedItem()}
                            ${this.getSkeletonFeedItem()}
                        </div>
                    </div>
                `;
                break;
            case 'table':
                skeletonHtml = `
                    <div class="skeleton-table">
                        ${this.getSkeletonTableRow()}
                        ${this.getSkeletonTableRow()}
                        ${this.getSkeletonTableRow()}
                    </div>
                `;
                break;
            case 'cards':
                skeletonHtml = `
                    <div class="row g-3">
                        <div class="col-6"><div class="skeleton skeleton-stat"></div></div>
                        <div class="col-6"><div class="skeleton skeleton-stat"></div></div>
                    </div>
                `;
                break;
            default:
                skeletonHtml = `
                    <div class="skeleton-card">
                        <div class="skeleton skeleton-title"></div>
                        <div class="skeleton skeleton-text"></div>
                        <div class="skeleton skeleton-text short"></div>
                    </div>
                `;
        }

        container.innerHTML = skeletonHtml;
    },

    hideSkeleton(containerId) {
        const container = document.getElementById(containerId);
        if (container && container.dataset.originalContent) {
            container.innerHTML = container.dataset.originalContent;
            delete container.dataset.originalContent;
        }
    },

    getSkeletonFeedItem() {
        return `
            <div class="skeleton-feed-item">
                <div class="skeleton skeleton-avatar"></div>
                <div class="skeleton-feed-content">
                    <div class="skeleton skeleton-text" style="width: 60%;"></div>
                    <div class="skeleton skeleton-text short" style="width: 40%;"></div>
                </div>
            </div>
        `;
    },

    getSkeletonTableRow() {
        return `
            <div class="skeleton-table-row">
                <div class="skeleton" style="flex: 0.5;"></div>
                <div class="skeleton" style="flex: 1;"></div>
                <div class="skeleton" style="flex: 0.7;"></div>
                <div class="skeleton" style="flex: 0.5;"></div>
            </div>
        `;
    },

    // ============================
    // EMPTY STATES
    // ============================
    showEmptyState(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const {
            icon = 'bi-inbox',
            title = 'Nothing here yet',
            message = 'Start by creating something new.',
            actionText = null,
            actionCallback = null
        } = options;

        const actionHtml = actionText ? `
            <button class="empty-state-action" onclick="${actionCallback}">
                <i class="bi bi-plus-lg"></i>
                ${actionText}
            </button>
        ` : '';

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <i class="bi ${icon}"></i>
                </div>
                <h3 class="empty-state-title">${title}</h3>
                <p class="empty-state-text">${message}</p>
                ${actionHtml}
            </div>
        `;
    },

    // ============================
    // ERROR STATES
    // ============================
    showErrorState(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const {
            title = 'Something went wrong',
            message = 'We couldn\'t load this content. Please try again.',
            retryCallback = null
        } = options;

        const retryHtml = retryCallback ? `
            <button class="error-state-retry" onclick="${retryCallback}">
                <i class="bi bi-arrow-clockwise me-1"></i> Try Again
            </button>
        ` : '';

        container.innerHTML = `
            <div class="error-state">
                <div class="error-state-icon">
                    <i class="bi bi-exclamation-triangle"></i>
                </div>
                <h3 class="error-state-title">${title}</h3>
                <p class="error-state-text">${message}</p>
                <div class="error-state-actions">
                    ${retryHtml}
                </div>
            </div>
        `;
    },

    // ============================
    // OFFLINE DETECTION
    // ============================
    setupOfflineDetector() {
        let banner = document.querySelector('.offline-banner');
        if (!banner) {
            banner = document.createElement('div');
            banner.className = 'offline-banner';
            banner.innerHTML = `
                <i class="bi bi-wifi-off"></i>
                <span>You're offline. Some features may not work.</span>
            `;
            document.body.prepend(banner);
        }

        const updateOnlineStatus = () => {
            if (!navigator.onLine) {
                banner.classList.add('show');
            } else {
                banner.classList.remove('show');
                // Show reconnected toast
                if (banner.classList.contains('was-offline')) {
                    this.showToast('Back online!', 'success', 3000);
                }
            }
            banner.classList.toggle('was-offline', !navigator.onLine);
        };

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        // Initial check
        updateOnlineStatus();
    },

    // ============================
    // WELCOME PANEL (First-time user)
    // ============================
    checkFirstTimeUser() {
        const dismissed = localStorage.getItem('aset_welcome_dismissed');
        const welcomePanel = document.querySelector('.welcome-panel');

        if (dismissed && welcomePanel) {
            welcomePanel.remove();
        }
    },

    dismissWelcome() {
        localStorage.setItem('aset_welcome_dismissed', 'true');
        const welcomePanel = document.querySelector('.welcome-panel');
        if (welcomePanel) {
            welcomePanel.style.opacity = '0';
            welcomePanel.style.transform = 'translateY(-10px)';
            setTimeout(() => welcomePanel.remove(), 300);
        }
    },

    // ============================
    // PROGRESS INDICATORS
    // ============================
    updateProgress(containerId, current, total) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let stepsHtml = '';
        for (let i = 1; i <= total; i++) {
            let stepClass = 'progress-step';
            if (i < current) stepClass += ' completed';
            if (i === current) stepClass += ' current';
            stepsHtml += `<div class="${stepClass}"></div>`;
        }

        container.innerHTML = stepsHtml;
    },

    // ============================
    // DISABLED STATE WITH REASON
    // ============================
    setDisabledWithReason(btn, reason) {
        btn.disabled = true;
        btn.classList.add('disabled-with-reason');

        // Remove existing reason if any
        const existingReason = btn.parentNode.querySelector('.disabled-reason');
        if (existingReason) existingReason.remove();

        // Add reason text
        const reasonEl = document.createElement('div');
        reasonEl.className = 'disabled-reason';
        reasonEl.innerHTML = `<i class="bi bi-info-circle"></i> ${reason}`;
        btn.parentNode.insertBefore(reasonEl, btn.nextSibling);
    },

    enableButton(btn) {
        btn.disabled = false;
        btn.classList.remove('disabled-with-reason');
        const reason = btn.parentNode.querySelector('.disabled-reason');
        if (reason) reason.remove();
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    UIStates.init();
});

// Export for use
window.UIStates = UIStates;
