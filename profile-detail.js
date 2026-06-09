// Profile Detail Modal Manager
const ProfileDetailModal = {
  activeProfileId: null,

  open(profileId) {
    this.activeProfileId = profileId;
    const profile = window.db.getProfileById(profileId);
    if (!profile) return;

    const modal = document.getElementById("profile-detail-modal");
    const body = document.getElementById("profile-modal-body");
    if (!modal || !body) return;

    const isShortlisted = window.db.getShortlist().includes(profileId);
    const isInterested = window.db.getInterests().includes(profileId);

    body.innerHTML = `
      <div class="profile-detail-grid">
        <!-- Sidebar with Photo & Compatibility -->
        <div class="profile-detail-sidebar">
          <div class="profile-detail-photo">
            <img src="${profile.avatar}" alt="${profile.name}">
          </div>
          
          <div class="profile-detail-sidebar-content">
            <h3 style="font-size: 1.5rem; margin-bottom: 6px;">${profile.name}</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
              Profile ID: VIV-${profile.id.toUpperCase()}
            </p>

            <!-- Compatibility Gauge -->
            <div class="compatibility-gauge-wrapper">
              <svg class="compatibility-svg" viewBox="0 0 100 100">
                <circle class="compatibility-circle-bg" cx="50" cy="50" r="45"></circle>
                <circle class="compatibility-circle-fill" id="compat-circle" cx="50" cy="50" r="45"></circle>
              </svg>
              <div class="compatibility-value">
                <span id="compat-percentage-num">0%</span>
                <span>Match</span>
              </div>
            </div>
            
            <p style="font-size: 0.8rem; color: var(--text-muted); font-style: italic; margin-bottom: 24px;">
              Based on Horoscope star Nakshatra &amp; values.
            </p>

            <!-- Actions -->
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${isInterested 
                ? `<button class="btn btn-outline" id="modal-interest-btn" disabled style="width: 100%;"><i class="fas fa-check"></i> Interest Sent</button>`
                : `<button class="btn btn-secondary" id="modal-interest-btn" style="width: 100%;"><i class="fas fa-heart-pulse"></i> Express Interest</button>`
              }
              <button class="btn btn-primary" id="modal-message-btn" style="width: 100%;">
                <i class="fas fa-comment-dots"></i> Send Message
              </button>
              <button class="btn btn-outline" id="modal-shortlist-btn" style="width: 100%;">
                <i class="${isShortlisted ? 'fa-solid' : 'fa-regular'} fa-heart" style="color: ${isShortlisted ? '#e05c75' : 'inherit'}"></i> 
                ${isShortlisted ? 'Shortlisted' : 'Add to Shortlist'}
              </button>
            </div>
          </div>
        </div>

        <!-- Main Profile Info -->
        <div class="profile-detail-main">
          
          <!-- Bio -->
          <div class="detail-section">
            <h3><i class="fas fa-user"></i> About Candidate</h3>
            <p class="profile-bio">${profile.about}</p>
          </div>

          <!-- Basics -->
          <div class="detail-section">
            <h3><i class="fas fa-info-circle"></i> Basics &amp; Lifestyle</h3>
            <div class="detail-info-grid">
              <div class="info-item">
                <span>Age</span>
                <p>${profile.age} Years</p>
              </div>
              <div class="info-item">
                <span>Height</span>
                <p>${profile.height}</p>
              </div>
              <div class="info-item">
                <span>Mother Tongue</span>
                <p>${profile.motherTongue}</p>
              </div>
              <div class="info-item">
                <span>Marital Status</span>
                <p>Never Married</p>
              </div>
              <div class="info-item">
                <span>Diet Preference</span>
                <p>${profile.religion === 'Hindu' && (profile.community === 'Brahmin' || profile.community === 'Iyer' || profile.community === 'Vaishnav') ? 'Vegetarian' : 'Non-Vegetarian'}</p>
              </div>
              <div class="info-item">
                <span>Religion / Caste</span>
                <p>${profile.religion} - ${profile.community}</p>
              </div>
            </div>
          </div>

          <!-- Career -->
          <div class="detail-section">
            <h3><i class="fas fa-briefcase"></i> Education &amp; Profession</h3>
            <div class="detail-info-grid">
              <div class="info-item">
                <span>Highest Degree</span>
                <p>${profile.education}</p>
              </div>
              <div class="info-item">
                <span>Occupation</span>
                <p>${profile.profession}</p>
              </div>
              <div class="info-item">
                <span>Employer / Company</span>
                <p>${profile.company}</p>
              </div>
              <div class="info-item">
                <span>Annual Income</span>
                <p>${profile.income}</p>
              </div>
            </div>
          </div>

          <!-- Horoscope details -->
          <div class="detail-section">
            <h3><i class="fa-solid fa-gopuram"></i> Horoscope &amp; Astro Details</h3>
            <div class="detail-info-grid">
              <div class="info-item">
                <span>Rashi (Moon Sign)</span>
                <p>${profile.horoscope.rashi}</p>
              </div>
              <div class="info-item">
                <span>Nakshatra (Star)</span>
                <p>${profile.horoscope.nakshatra}</p>
              </div>
              <div class="info-item">
                <span>Manglik Status</span>
                <p>${profile.horoscope.manglik === 'Yes' ? 'Manglik' : 'Non-Manglik'}</p>
              </div>
              <div class="info-item">
                <span>Gothra</span>
                <p>Shandilya / Haritha</p>
              </div>
            </div>
          </div>

          <!-- Family Background -->
          <div class="detail-section" style="margin-bottom: 0;">
            <h3><i class="fas fa-users"></i> Family Background</h3>
            <div class="detail-info-grid">
              <div class="info-item">
                <span>Father's Occupation</span>
                <p>Retired Officer / Business Executive</p>
              </div>
              <div class="info-item">
                <span>Mother's Occupation</span>
                <p>Homemaker / Educator</p>
              </div>
              <div class="info-item">
                <span>Family Type &amp; Values</span>
                <p>Nuclear &amp; Liberal Traditional</p>
              </div>
              <div class="info-item">
                <span>Family Location</span>
                <p>${profile.city}, ${profile.state}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    modal.style.display = "flex";
    this.bindModalEvents(profile);

    // Animate compatibility gauge circle
    setTimeout(() => {
      const fillCircle = document.getElementById("compat-circle");
      const textNum = document.getElementById("compat-percentage-num");
      if (fillCircle && textNum) {
        const score = profile.compatibilityScore;
        // SVG circle perimeter is 2 * PI * r = 2 * 3.14159 * 45 = ~282.74
        const offset = 282.74 - (score / 100) * 282.74;
        fillCircle.style.strokeDashoffset = offset;
        
        // Count up text animation
        let count = 0;
        const interval = setInterval(() => {
          if (count >= score) {
            textNum.textContent = `${score}%`;
            clearInterval(interval);
          } else {
            count++;
            textNum.textContent = `${count}%`;
          }
        }, 15);
      }
    }, 100);
  },

  close() {
    const modal = document.getElementById("profile-detail-modal");
    if (modal) {
      modal.style.display = "none";
    }
    this.activeProfileId = null;
  },

  bindModalEvents(profile) {
    // Modal interest express button
    const interestBtn = document.getElementById("modal-interest-btn");
    if (interestBtn) {
      interestBtn.addEventListener("click", () => {
        const success = window.db.sendInterest(profile.id);
        if (success) {
          interestBtn.innerHTML = `<i class="fas fa-check"></i> Interest Sent`;
          interestBtn.classList.replace("btn-secondary", "btn-outline");
          interestBtn.disabled = true;
          window.appRouter.showToast("Interest Sent!", `We've notified ${profile.name}.`);
          
          // Re-render search grid if visible
          if (window.appRouter.currentView === "search") {
            window.SearchView.filterProfiles();
          }
        }
      });
    }

    // Modal message button (starts direct chat)
    const messageBtn = document.getElementById("modal-message-btn");
    if (messageBtn) {
      messageBtn.addEventListener("click", () => {
        this.close();
        // Redirect to Inbox and load this profile's thread
        window.appRouter.navigateTo("inbox", { activeChatId: profile.id });
      });
    }

    // Modal shortlist button
    const shortlistBtn = document.getElementById("modal-shortlist-btn");
    if (shortlistBtn) {
      shortlistBtn.addEventListener("click", () => {
        const isAdded = window.db.toggleShortlist(profile.id);
        const icon = shortlistBtn.querySelector("i");
        
        if (isAdded) {
          icon.className = "fa-solid fa-heart";
          icon.style.color = "#e05c75";
          shortlistBtn.childNodes[2].textContent = " Shortlisted";
          window.appRouter.showToast("Shortlisted!", `Added to your shortlisted matches.`);
        } else {
          icon.className = "fa-regular fa-heart";
          icon.style.color = "inherit";
          shortlistBtn.childNodes[2].textContent = " Add to Shortlist";
        }

        // Re-render search grid if active
        if (window.appRouter.currentView === "search") {
          window.SearchView.filterProfiles();
        }
      });
    }
  }
};

// Bind modal close events globally
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("profile-detail-modal");
  const closeBtn = document.getElementById("close-profile-modal");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => ProfileDetailModal.close());
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        ProfileDetailModal.close();
      }
    });
  }
});

window.ProfileDetailModal = ProfileDetailModal;
