// Dashboard View Component
const DashboardView = {
  activeTab: "matches", // matches, shortlist, requests

  render(container) {
    const user = window.db.getCurrentUser();
    
    container.innerHTML = `
      <section class="section-padding container">
        <div class="dashboard-grid">
          
          <!-- Sidebar: User Profile Summary -->
          <aside class="dashboard-sidebar">
            <div class="glass-card">
              <div class="user-card">
                <img class="user-avatar" src="${user.avatar}" alt="${user.name}">
                <h3 class="user-name">${user.name}</h3>
                <p style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">
                  ${user.profession} &bull; ${user.city}
                </p>
                
                <div class="profile-completeness">
                  <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700;">
                    <span>Profile Completeness</span>
                    <span>${user.profileCompleteness}%</span>
                  </div>
                  <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${user.profileCompleteness}%;"></div>
                  </div>
                </div>
              </div>

              <!-- Dashboard Tab Nav Links -->
              <nav class="dashboard-nav">
                <div class="dashboard-nav-item ${this.activeTab === 'matches' ? 'active' : ''}" data-tab="matches">
                  <i class="fas fa-sparkles"></i> Curated Matches
                </div>
                <div class="dashboard-nav-item ${this.activeTab === 'shortlist' ? 'active' : ''}" data-tab="shortlist">
                  <i class="fas fa-heart"></i> Shortlisted (${window.db.getShortlist().length})
                </div>
                <div class="dashboard-nav-item ${this.activeTab === 'requests' ? 'active' : ''}" data-tab="requests">
                  <i class="fas fa-envelope-open-text"></i> Interest Requests
                </div>
              </nav>
            </div>
          </aside>

          <!-- Main Dashboard Content -->
          <div class="dashboard-main" id="dashboard-tab-content">
            <!-- Rendered dynamically -->
          </div>

        </div>
      </section>
    `;

    this.renderTabContent();
    this.bindEvents();
  },

  bindEvents() {
    const sidebar = document.querySelector(".dashboard-sidebar");
    if (sidebar) {
      sidebar.addEventListener("click", (e) => {
        const item = e.target.closest(".dashboard-nav-item");
        if (item) {
          this.activeTab = item.dataset.tab;
          
          // Toggle active class in UI nav
          sidebar.querySelectorAll(".dashboard-nav-item").forEach(el => el.classList.remove("active"));
          item.classList.add("active");

          this.renderTabContent();
        }
      });
    }
  },

  renderTabContent() {
    const container = document.getElementById("dashboard-tab-content");
    if (!container) return;

    if (this.activeTab === "matches") {
      this.renderDailyMatches(container);
    } else if (this.activeTab === "shortlist") {
      this.renderShortlist(container);
    } else if (this.activeTab === "requests") {
      this.renderRequests(container);
    }
  },

  renderDailyMatches(container) {
    const profiles = window.db.getAllProfiles();
    const currentUser = window.db.getCurrentUser();
    
    // Curate matches: filter by opposite gender and select top 3 compatibility
    const matches = profiles
      .filter(p => p.gender !== currentUser.gender)
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
      .slice(0, 3);

    container.innerHTML = `
      <div class="glass-card">
        <h3 style="font-size: 1.5rem; margin-bottom: 8px;"><i class="fas fa-sparkles" style="color: var(--secondary);"></i> Your Daily Recommendations</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 24px;">
          Matches are handpicked daily based on your Rashi star constellations (${currentUser.rashi}) and professional preferences.
        </p>

        <div class="profiles-grid" style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px;">
          ${matches.map(p => `
            <div class="profile-card" data-id="${p.id}" style="cursor: pointer;">
              <div class="profile-img-container" style="height: 200px;">
                <img src="${p.avatar}" alt="${p.name}">
                <div class="profile-overlay">
                  <span class="profile-badge badge-match">${p.compatibilityScore}%</span>
                </div>
              </div>
              <div class="profile-card-body" style="padding: 16px;">
                <h4 style="font-family: var(--font-serif); font-size: 1.1rem; margin-bottom: 4px;">${p.name}</h4>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 8px;">
                  ${p.age} Yrs &bull; ${p.city}
                </p>
                <p style="font-size: 0.75rem; font-weight: 700; color: var(--primary-light); margin-bottom: 12px;">
                  ${p.profession}
                </p>
                <button class="btn btn-secondary btn-outline" style="width: 100%; padding: 8px; font-size: 0.8rem;">
                  View Profile
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    // Bind card clicks
    container.querySelectorAll(".profile-card").forEach(card => {
      card.addEventListener("click", () => {
        window.ProfileDetailModal.open(card.dataset.id);
      });
    });
  },

  renderShortlist(container) {
    const list = window.db.getShortlist();

    if (list.length === 0) {
      container.innerHTML = `
        <div class="glass-card" style="text-align: center; padding: 48px;">
          <div style="font-size: 3rem; color: var(--border-color); margin-bottom: 16px;"><i class="fas fa-heart-broken"></i></div>
          <h3>No Shortlisted Profiles</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 8px; margin-bottom: 20px;">
            Shortlist candidate cards while browsing matches to save them here for quick access later.
          </p>
          <button class="btn btn-secondary" onclick="window.appRouter.navigateTo('search')">Browse Profiles</button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="glass-card">
        <h3 style="font-size: 1.5rem; margin-bottom: 20px;"><i class="fas fa-heart" style="color: #e05c75;"></i> Shortlisted Candidates</h3>
        <div class="profiles-grid" style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px;" id="dashboard-shortlist-grid">
          ${list.map(id => {
            const p = window.db.getProfileById(id);
            if (!p) return "";
            return `
              <div class="profile-card" data-id="${p.id}" style="cursor: pointer;">
                <div class="profile-img-container" style="height: 200px;">
                  <img src="${p.avatar}" alt="${p.name}">
                </div>
                <div class="profile-card-body" style="padding: 16px;">
                  <h4 style="font-family: var(--font-serif); font-size: 1.1rem; margin-bottom: 4px;">${p.name}</h4>
                  <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 8px;">
                    ${p.age} Yrs &bull; ${p.city}
                  </p>
                  <p style="font-size: 0.75rem; font-weight: 700; color: var(--secondary); margin-bottom: 12px;">
                    ${p.compatibilityScore}% Compatibility
                  </p>
                  
                  <div style="display: flex; gap: 8px;">
                    <button class="btn btn-outline btn-remove-shortlist" data-id="${p.id}" style="padding: 8px; flex: 1; font-size: 0.75rem;" title="Remove Shortlist">
                      <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn btn-secondary" style="padding: 8px 16px; flex: 3; font-size: 0.75rem;">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;

    // Bind shortlist interactions
    const grid = document.getElementById("dashboard-shortlist-grid");
    if (grid) {
      grid.addEventListener("click", (e) => {
        const removeBtn = e.target.closest(".btn-remove-shortlist");
        if (removeBtn) {
          e.stopPropagation();
          const profileId = removeBtn.dataset.id;
          window.db.toggleShortlist(profileId);
          this.renderShortlist(container);
          
          // Update shortlist count indicator
          const shortlistTabBtn = document.querySelector('[data-tab="shortlist"]');
          if (shortlistTabBtn) {
            shortlistTabBtn.innerHTML = `<i class="fas fa-heart"></i> Shortlisted (${window.db.getShortlist().length})`;
          }
          return;
        }

        const profileCard = e.target.closest(".profile-card");
        if (profileCard) {
          window.ProfileDetailModal.open(profileCard.dataset.id);
        }
      });
    }
  },

  renderRequests(container) {
    // For demonstration, render mock connection requests
    const initialRequests = [
      { id: "req_1", profileId: "p1", message: "Priya Sharma wants to establish a connection with your profile.", status: "pending" }
    ];

    if (!localStorage.getItem("vivaham_incoming_requests")) {
      localStorage.setItem("vivaham_incoming_requests", JSON.stringify(initialRequests));
    }

    const requests = JSON.parse(localStorage.getItem("vivaham_incoming_requests")) || [];
    const pending = requests.filter(r => r.status === "pending");

    if (pending.length === 0) {
      container.innerHTML = `
        <div class="glass-card" style="text-align: center; padding: 48px;">
          <div style="font-size: 3rem; color: var(--border-color); margin-bottom: 16px;"><i class="fas fa-envelope-open"></i></div>
          <h3>No Pending Interests</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 8px;">
            When other candidates express interest in your profile, their requests will appear here for your approval.
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="glass-card">
        <h3 style="font-size: 1.5rem; margin-bottom: 20px;"><i class="fas fa-envelope-open-text" style="color: var(--secondary);"></i> Pending Connection Requests</h3>
        
        <div class="activity-list" id="dashboard-requests-list">
          ${pending.map(r => {
            const p = window.db.getProfileById(r.profileId);
            if (!p) return "";
            return `
              <div class="activity-item" style="justify-content: space-between; gap: 24px;" data-req-id="${r.id}" data-profile-id="${p.id}">
                <div style="display: flex; align-items: center; gap: 16px;">
                  <img src="${p.avatar}" alt="${p.name}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid var(--secondary);">
                  <div>
                    <h4 style="font-size: 1.05rem;">${p.name}</h4>
                    <p style="font-size: 0.8rem; color: var(--text-muted);">${p.age} Yrs &bull; ${p.profession} &bull; ${p.city}</p>
                    <span style="font-size: 0.75rem; color: var(--secondary); font-weight: 700;">${p.compatibilityScore}% Compatibility Match</span>
                  </div>
                </div>
                
                <div style="display: flex; gap: 10px;">
                  <button class="btn btn-outline btn-decline-request" style="padding: 8px 16px; font-size: 0.8rem;">Decline</button>
                  <button class="btn btn-secondary btn-accept-request" style="padding: 8px 20px; font-size: 0.8rem;"><i class="fas fa-check"></i> Accept</button>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;

    // Bind action events
    const list = document.getElementById("dashboard-requests-list");
    if (list) {
      list.addEventListener("click", (e) => {
        const acceptBtn = e.target.closest(".btn-accept-request");
        const declineBtn = e.target.closest(".btn-decline-request");
        const item = e.target.closest(".activity-item");
        
        if (!item) return;
        const profileId = item.dataset.profileId;
        const reqId = item.dataset.reqId;

        if (acceptBtn) {
          // Update status in local storage
          const reqs = JSON.parse(localStorage.getItem("vivaham_incoming_requests")) || [];
          const idx = reqs.findIndex(r => r.id === reqId);
          if (idx > -1) {
            reqs[idx].status = "accepted";
            localStorage.setItem("vivaham_incoming_requests", JSON.stringify(reqs));
          }

          // Create active chat thread in database by sending first message
          const chats = window.db.getChats();
          if (!chats[profileId]) {
            chats[profileId] = [
              { sender: profileId, text: "Hello! Thank you for accepting my connection request. Let's get to know each other.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            ];
            localStorage.setItem("vivaham_chats", JSON.stringify(chats));
          }

          // Toast notifications
          window.appRouter.showToast("Connection Accepted!", "A chat thread has been unlocked in your Inbox.");

          // Add dynamic activity log to notifications
          window.db.addNotification({
            type: "accept",
            profileId: profileId,
            message: `You accepted Priya Sharma's connection request!`,
            time: "Just now",
            unread: false
          });

          this.renderRequests(container);
        }

        if (declineBtn) {
          const reqs = JSON.parse(localStorage.getItem("vivaham_incoming_requests")) || [];
          const idx = reqs.findIndex(r => r.id === reqId);
          if (idx > -1) {
            reqs.splice(idx, 1);
            localStorage.setItem("vivaham_incoming_requests", JSON.stringify(reqs));
          }
          this.renderRequests(container);
          window.appRouter.showToast("Request Declined", "Interest request was removed.");
        }
      });
    }
  }
};

window.DashboardView = DashboardView;
