// App Router & Global Controller
class AppRouter {
  constructor() {
    this.currentView = null;
    this.viewContainer = document.getElementById("app-view");
    this.init();
  }

  init() {
    this.bindGlobalEvents();
    this.syncHeaderUser();
    this.updateNotificationBadge();
    this.restoreTheme();

    // Default route
    this.navigateTo("home");
  }

  // View routing
  navigateTo(viewName, params = {}) {
    // Scroll to top
    window.scrollTo(0, 0);

    // Call destroy on active view if it supports cleanups
    if (this.currentView && typeof this.currentView.destroy === 'function') {
      this.currentView.destroy();
    }

    // Add page transition fade-out feel
    this.viewContainer.style.opacity = 0;

    setTimeout(() => {
      // Clear view container
      this.viewContainer.innerHTML = "";

      // Mount view
      switch (viewName) {
        case "home":
          window.HomeView.render(this.viewContainer);
          this.currentView = window.HomeView;
          break;
        case "search":
          window.SearchView.render(this.viewContainer, params);
          this.currentView = window.SearchView;
          break;
        case "matchmaker":
          window.MatchmakerView.render(this.viewContainer);
          this.currentView = window.MatchmakerView;
          break;
        case "inbox":
          window.InboxView.render(this.viewContainer, params);
          this.currentView = window.InboxView;
          break;
        case "dashboard":
          window.DashboardView.render(this.viewContainer);
          this.currentView = window.DashboardView;
          break;
        default:
          window.HomeView.render(this.viewContainer);
          this.currentView = window.HomeView;
      }

      // Sync navigation header links active state
      const navLinks = document.querySelectorAll(".nav-link");
      navLinks.forEach(link => {
        if (link.dataset.view === viewName) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      // Animate fade-in
      this.viewContainer.style.transition = "opacity 0.4s ease";
      this.viewContainer.style.opacity = 1;
    }, 150);
  }

  // Global event bindings (Header toggles, Registration, Toasts)
  bindGlobalEvents() {
    // Nav links clicks
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const view = link.dataset.view;
        this.navigateTo(view);
      });
    });

    // Logo brand click
    const logo = document.getElementById("logo-home");
    if (logo) {
      logo.addEventListener("click", (e) => {
        e.preventDefault();
        this.navigateTo("home");
      });
    }

    // Redirect redirects in footer or elsewhere
    document.addEventListener("click", (e) => {
      const redirect = e.target.closest(".nav-redirect");
      if (redirect) {
        e.preventDefault();
        this.navigateTo(redirect.dataset.view);
      }
    });

    // Dark/Light Theme Toggle
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        const icon = themeBtn.querySelector("i");
        const isDark = document.body.classList.contains("dark-theme");
        
        if (isDark) {
          icon.className = "fas fa-sun";
          localStorage.setItem("vivaham_dark_theme", "true");
        } else {
          icon.className = "fas fa-moon";
          localStorage.setItem("vivaham_dark_theme", "false");
        }
      });
    }

    // Notifications Dropdown Toggle
    const notifBtn = document.getElementById("notification-btn");
    const notifDropdown = document.getElementById("notif-dropdown");
    if (notifBtn && notifDropdown) {
      notifBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = notifDropdown.style.display === "flex";
        
        // Hide other dropdowns
        document.getElementById("profile-dropdown").style.display = "none";

        if (isOpen) {
          notifDropdown.style.display = "none";
        } else {
          notifDropdown.style.display = "flex";
          this.renderNotificationsList();
          window.db.markNotificationsRead();
          this.updateNotificationBadge();
        }
      });
    }

    // Clear notifications click
    const clearNotifBtn = document.getElementById("clear-notif");
    if (clearNotifBtn) {
      clearNotifBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        localStorage.setItem("vivaham_notifications", JSON.stringify([]));
        this.renderNotificationsList();
        this.updateNotificationBadge();
      });
    }

    // User Profile Dropdown Toggle
    const profileBtn = document.getElementById("profile-dropdown-btn");
    const profileDropdown = document.getElementById("profile-dropdown");
    if (profileBtn && profileDropdown) {
      profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = profileDropdown.style.display === "flex";
        
        // Hide other dropdowns
        document.getElementById("notif-dropdown").style.display = "none";

        if (isOpen) {
          profileDropdown.style.display = "none";
        } else {
          profileDropdown.style.display = "flex";
        }
      });
    }

    // Profile Dropdown Actions
    const goDashboard = document.getElementById("go-dashboard-btn");
    if (goDashboard) {
      goDashboard.addEventListener("click", (e) => {
        e.preventDefault();
        profileDropdown.style.display = "none";
        this.navigateTo("dashboard");
      });
    }

    const regTrigger = document.getElementById("register-trigger-btn");
    if (regTrigger) {
      regTrigger.addEventListener("click", (e) => {
        e.preventDefault();
        profileDropdown.style.display = "none";
        document.getElementById("register-modal").style.display = "flex";
      });
    }

    // Close dropdowns on outer clicks
    document.addEventListener("click", () => {
      if (notifDropdown) notifDropdown.style.display = "none";
      if (profileDropdown) profileDropdown.style.display = "none";
    });

    // Close modals click actions
    const regModal = document.getElementById("register-modal");
    const closeRegBtn = document.getElementById("close-register-modal");
    if (closeRegBtn) {
      closeRegBtn.addEventListener("click", () => {
        regModal.style.display = "none";
      });
    }
    if (regModal) {
      regModal.addEventListener("click", (e) => {
        if (e.target === regModal) {
          regModal.style.display = "none";
        }
      });
    }

    // Intercept Registration form submit
    const regForm = document.getElementById("registration-form");
    if (regForm) {
      regForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("reg-name").value;
        const gender = document.getElementById("reg-gender").value;
        const age = parseInt(document.getElementById("reg-age").value);
        const height = document.getElementById("reg-height").value;
        const motherTongue = document.getElementById("reg-mother-tongue").value;
        const community = document.getElementById("reg-community").value;
        const city = document.getElementById("reg-city").value;
        const state = document.getElementById("reg-state").value;
        const profession = document.getElementById("reg-profession").value;
        const income = document.getElementById("reg-income").value;
        const about = document.getElementById("reg-about").value;

        // Auto-assign matching traditional wedding avatar based on gender
        const avatarsList = gender === "male" 
          ? [`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%234A0E17"/><circle cx="50" cy="45" r="21" fill="%23EAC090"/><path d="M28 28 C28 20 40 12 50 12 C60 12 72 20 72 28 C72 32 68 32 50 32 C32 32 28 32 28 28 Z" fill="%23D4AF37"/><circle cx="42" cy="43" r="1.5" fill="%23000"/><circle cx="58" cy="43" r="1.5" fill="%23000"/><path d="M48 49 Q50 51 52 49" stroke="%234A0E17" stroke-width="1.5" fill="none"/><path d="M40 53 Q50 55 60 53" stroke="%234A0E17" stroke-width="2" fill="none"/><path d="M30 68 L70 68 L65 100 L35 100 Z" fill="%23D4AF37"/></svg>`] 
          : [`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%234A0E17"/><circle cx="50" cy="45" r="22" fill="%23F3C68F"/><path d="M50 23 C30 23 28 35 28 45 C28 50 32 55 35 55 C38 55 42 45 50 45 C58 45 62 55 65 55 C68 55 72 50 72 45 C72 35 70 23 50 23 Z" fill="%23800B1B"/><circle cx="42" cy="43" r="1.5" fill="%23000"/><circle cx="58" cy="43" r="1.5" fill="%23000"/><path d="M48 48 Q50 50 52 48" stroke="%23800B1B" stroke-width="1.5" fill="none"/><path d="M38 52 Q50 56 62 52" stroke="%23800B1B" stroke-width="2" fill="none"/><rect x="25" y="67" width="50" height="33" rx="10" fill="%23800B1B"/></svg>`];
        const avatar = avatarsList[0];

        const rashiOptions = ["Mesha (Aries)", "Vrishabha (Taurus)", "Mithun (Gemini)", "Karka (Cancer)", "Simha (Leo)", "Kanya (Virgo)"];
        const randomRashi = rashiOptions[Math.floor(Math.random() * rashiOptions.length)];

        const newUser = {
          name,
          gender,
          age,
          height,
          religion: "Hindu",
          community,
          motherTongue,
          city,
          state,
          education: "Graduate Degree",
          profession,
          income,
          about,
          avatar,
          profileCompleteness: 95,
          rashi: randomRashi,
          nakshatra: "Ashwini"
        };

        window.db.saveCurrentUser(newUser);
        this.syncHeaderUser();
        
        regModal.style.display = "none";
        regForm.reset();

        this.showToast("Registration Successful!", `Welcome to Vivaham, ${newUser.name}!`);
        this.navigateTo("dashboard");
      });
    }

    // Dynamic database events listener
    window.addEventListener("vivaham_notification_added", () => {
      this.updateNotificationBadge();
      
      // If notifications dropdown is open, render live list update
      if (document.getElementById("notif-dropdown").style.display === "flex") {
        this.renderNotificationsList();
      }
      
      // Pull latest notification to flash a Toast message
      const list = window.db.getNotifications();
      if (list.length > 0) {
        const latest = list[0];
        if (latest.unread) {
          this.showToast("New Notification", latest.message);
        }
      }
    });
  }

  // Restore dark theme settings
  restoreTheme() {
    const isDark = localStorage.getItem("vivaham_dark_theme") === "true";
    const themeBtn = document.getElementById("theme-toggle");
    const icon = themeBtn ? themeBtn.querySelector("i") : null;

    if (isDark) {
      document.body.classList.add("dark-theme");
      if (icon) icon.className = "fas fa-sun";
    } else {
      document.body.classList.remove("dark-theme");
      if (icon) icon.className = "fas fa-moon";
    }
  }

  // Sync navigation header avatar & fields
  syncHeaderUser() {
    const user = window.db.getCurrentUser();
    const avatarImg = document.getElementById("nav-user-avatar");
    const dropdownName = document.getElementById("dropdown-user-name");
    const dropdownProfession = document.getElementById("dropdown-user-profession");

    if (avatarImg) {
      avatarImg.src = user.avatar;
    }
    if (dropdownName) {
      dropdownName.textContent = user.name;
    }
    if (dropdownProfession) {
      dropdownProfession.textContent = `${user.profession} • ${user.city}`;
    }
  }

  // Sync red notification badge
  updateNotificationBadge() {
    const list = window.db.getNotifications();
    const unread = list.filter(n => n.unread);
    const badge = document.getElementById("notif-badge");

    if (badge) {
      if (unread.length > 0) {
        badge.style.display = "block";
      } else {
        badge.style.display = "none";
      }
    }
  }

  // Render notifications in menu list
  renderNotificationsList() {
    const listContainer = document.getElementById("notif-list");
    if (!listContainer) return;

    const notifs = window.db.getNotifications();

    if (notifs.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 0.85rem;">
          No notifications yet.
        </div>
      `;
      return;
    }

    listContainer.innerHTML = notifs.map(n => `
      <div class="notif-item ${n.unread ? 'unread' : ''}" data-id="${n.id}" data-profile-id="${n.profileId}" data-type="${n.type}">
        <p>${n.message}</p>
        <span>${n.time}</span>
      </div>
    `).join("");

    // Bind clicks to items to redirect appropriately
    const items = listContainer.querySelectorAll(".notif-item");
    items.forEach(item => {
      item.addEventListener("click", () => {
        const type = item.dataset.type;
        const profileId = item.dataset.profileId;
        
        document.getElementById("notif-dropdown").style.display = "none";

        if (type === "message") {
          this.navigateTo("inbox", { activeChatId: profileId });
        } else if (type === "interest" || type === "accept") {
          // Open profile detail card directly
          window.ProfileDetailModal.open(profileId);
        }
      });
    });
  }

  // Slide-in global toast messages
  showToast(title, message) {
    const toast = document.getElementById("notification-toast");
    const tTitle = document.getElementById("toast-title");
    const tMsg = document.getElementById("toast-message");

    if (!toast || !tTitle || !tMsg) return;

    // Reset display
    toast.style.display = "none";
    
    // Set text
    tTitle.textContent = title;
    tMsg.textContent = message;

    // Show with animation
    toast.style.display = "flex";

    // Play heart vibration if it has icon
    const icon = toast.querySelector(".toast-icon i");
    if (icon) {
      icon.style.animation = "heartbeat 0.8s ease 3";
    }

    // Auto close
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.toastTimeout = setTimeout(() => {
      toast.style.display = "none";
    }, 4500);
  }
}

// Instantiate router on DOM Load
document.addEventListener("DOMContentLoaded", () => {
  window.appRouter = new AppRouter();
});
