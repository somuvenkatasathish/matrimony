// Search View Component
const SearchView = {
  activeFilters: {},

  render(container, initialFilters = {}) {
    // Merge initial filters with default search behavior (e.g. opposite gender of current user)
    const currentUser = window.db.getCurrentUser();
    const defaultGender = currentUser.gender === 'male' ? 'female' : 'male';
    
    this.activeFilters = {
      gender: defaultGender,
      ageMin: 20,
      ageMax: 35,
      religion: "all",
      motherTongue: "all",
      state: "all",
      manglik: "all",
      occupation: "all",
      ...initialFilters
    };

    container.innerHTML = `
      <section class="section-padding container">
        <div class="search-page-layout">
          
          <!-- Advanced Filters Panel -->
          <aside class="glass-card filters-panel">
            <div class="filters-title">
              <h3><i class="fas fa-sliders-h"></i> Refine Search</h3>
              <button id="reset-filters" class="btn-text">Reset</button>
            </div>
            
            <div class="filter-group">
              <label class="filter-label" for="filter-gender">Looking For</label>
              <select id="filter-gender" class="filter-select">
                <option value="female" ${this.activeFilters.gender === 'female' ? 'selected' : ''}>Bride (Female)</option>
                <option value="male" ${this.activeFilters.gender === 'male' ? 'selected' : ''}>Groom (Male)</option>
              </select>
            </div>

            <div class="filter-group">
              <label class="filter-label">Age Range</label>
              <div style="display: flex; gap: 8px; align-items: center;">
                <select id="filter-age-min" class="filter-select">
                  ${[20,21,22,23,24,25,26,27,28,29,30].map(a => `<option value="${a}" ${this.activeFilters.ageMin == a ? 'selected' : ''}>${a}</option>`).join('')}
                </select>
                <span style="color: var(--text-muted);">to</span>
                <select id="filter-age-max" class="filter-select">
                  ${[25,26,27,28,29,30,31,32,33,34,35,40].map(a => `<option value="${a}" ${this.activeFilters.ageMax == a ? 'selected' : ''}>${a}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="filter-group">
              <label class="filter-label" for="filter-religion">Religion</label>
              <select id="filter-religion" class="filter-select">
                <option value="all">Any Religion</option>
                <option value="Hindu" ${this.activeFilters.religion === 'Hindu' ? 'selected' : ''}>Hindu</option>
                <option value="Muslim" ${this.activeFilters.religion === 'Muslim' ? 'selected' : ''}>Muslim</option>
                <option value="Christian" ${this.activeFilters.religion === 'Christian' ? 'selected' : ''}>Christian</option>
                <option value="Sikh" ${this.activeFilters.religion === 'Sikh' ? 'selected' : ''}>Sikh</option>
              </select>
            </div>

            <div class="filter-group">
              <label class="filter-label" for="filter-mother-tongue">Mother Tongue</label>
              <select id="filter-mother-tongue" class="filter-select">
                <option value="all">Any Language</option>
                <option value="Hindi" ${this.activeFilters.motherTongue === 'Hindi' ? 'selected' : ''}>Hindi</option>
                <option value="Tamil" ${this.activeFilters.motherTongue === 'Tamil' ? 'selected' : ''}>Tamil</option>
                <option value="Telugu" ${this.activeFilters.motherTongue === 'Telugu' ? 'selected' : ''}>Telugu</option>
                <option value="Punjabi" ${this.activeFilters.motherTongue === 'Punjabi' ? 'selected' : ''}>Punjabi</option>
                <option value="Bengali" ${this.activeFilters.motherTongue === 'Bengali' ? 'selected' : ''}>Bengali</option>
                <option value="Malayalam" ${this.activeFilters.motherTongue === 'Malayalam' ? 'selected' : ''}>Malayalam</option>
                <option value="Gujarati" ${this.activeFilters.motherTongue === 'Gujarati' ? 'selected' : ''}>Gujarati</option>
              </select>
            </div>

            <div class="filter-group">
              <label class="filter-label" for="filter-state">State / Region</label>
              <select id="filter-state" class="filter-select">
                <option value="all">Any State</option>
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Telangana">Telangana</option>
                <option value="Kerala">Kerala</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>

            <div class="filter-group">
              <label class="filter-label" for="filter-manglik">Manglik Status</label>
              <select id="filter-manglik" class="filter-select">
                <option value="all">Doesn't Matter</option>
                <option value="No">Non-Manglik</option>
                <option value="Yes">Manglik</option>
              </select>
            </div>

            <div class="filter-group">
              <label class="filter-label" for="filter-occupation">Occupation Area</label>
              <select id="filter-occupation" class="filter-select">
                <option value="all">Any Occupation</option>
                <option value="Software Engineer">Tech / Engineering</option>
                <option value="Product Manager">Management</option>
                <option value="Doctor">Medical</option>
                <option value="Creative Director">Arts / Design</option>
                <option value="Financial Analyst">Finance</option>
                <option value="Merchant Navy Officer">Merchant Navy</option>
                <option value="Business Owner">Business / Self-Employed</option>
              </select>
            </div>
          </aside>

          <!-- Search Results Column -->
          <div class="results-column">
            <div class="profiles-header">
              <h2 style="font-size: 1.8rem;" id="results-count">Matches For You</h2>
              <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-muted);">
                Showing verified profiles
              </div>
            </div>

            <div class="profiles-grid" id="search-results-grid">
              <!-- Dynamically populated matches -->
            </div>
          </div>

        </div>
      </section>
    `;

    this.bindEvents();
    this.filterProfiles();
  },

  bindEvents() {
    // Handle filter adjustments
    const selectors = [
      "filter-gender",
      "filter-age-min",
      "filter-age-max",
      "filter-religion",
      "filter-mother-tongue",
      "filter-state",
      "filter-manglik",
      "filter-occupation"
    ];

    selectors.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("change", (e) => {
          const key = id.replace("filter-", "").replace("-min", "Min").replace("-max", "Max");
          let val = e.target.value;
          if (key === 'ageMin' || key === 'ageMax') {
            val = parseInt(val);
          }
          this.activeFilters[key] = val;
          this.filterProfiles();
        });
      }
    });

    // Reset filters
    const resetBtn = document.getElementById("reset-filters");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        const currentUser = window.db.getCurrentUser();
        const defaultGender = currentUser.gender === 'male' ? 'female' : 'male';
        
        this.activeFilters = {
          gender: defaultGender,
          ageMin: 20,
          ageMax: 35,
          religion: "all",
          motherTongue: "all",
          state: "all",
          manglik: "all",
          occupation: "all"
        };

        // Sync dropdown values in UI
        document.getElementById("filter-gender").value = defaultGender;
        document.getElementById("filter-age-min").value = 20;
        document.getElementById("filter-age-max").value = 35;
        document.getElementById("filter-religion").value = "all";
        document.getElementById("filter-mother-tongue").value = "all";
        document.getElementById("filter-state").value = "all";
        document.getElementById("filter-manglik").value = "all";
        document.getElementById("filter-occupation").value = "all";

        this.filterProfiles();
      });
    }

    // Grid interaction delegation
    const grid = document.getElementById("search-results-grid");
    if (grid) {
      grid.addEventListener("click", (e) => {
        // Shortlist button click
        const shortlistBtn = e.target.closest(".btn-shortlist");
        if (shortlistBtn) {
          e.stopPropagation();
          const profileId = shortlistBtn.dataset.id;
          const isAdded = window.db.toggleShortlist(profileId);
          
          if (isAdded) {
            shortlistBtn.classList.add("active");
            shortlistBtn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
            window.appRouter.showToast("Shortlisted!", `Added to your shortlisted matches.`);
          } else {
            shortlistBtn.classList.remove("active");
            shortlistBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
          }
          return;
        }

        // Express interest button click
        const interestBtn = e.target.closest(".btn-interest");
        if (interestBtn) {
          e.stopPropagation();
          const profileId = interestBtn.dataset.id;
          const success = window.db.sendInterest(profileId);
          if (success) {
            interestBtn.innerHTML = `<i class="fas fa-check"></i> Interest Sent`;
            interestBtn.classList.replace("btn-secondary", "btn-outline");
            interestBtn.disabled = true;
            window.appRouter.showToast("Interest Sent!", `We've notified ${interestBtn.dataset.name}.`);
          }
          return;
        }

        // View Profile trigger (Card or Button)
        const profileCard = e.target.closest(".profile-card");
        if (profileCard) {
          const profileId = profileCard.dataset.id;
          // Open profile detail modal
          window.ProfileDetailModal.open(profileId);
        }
      });
    }
  },

  filterProfiles() {
    const allProfiles = window.db.getAllProfiles();
    const shortlist = window.db.getShortlist();
    const interests = window.db.getInterests();

    const filtered = allProfiles.filter(p => {
      // Gender Filter
      if (p.gender !== this.activeFilters.gender) return false;
      
      // Age Range Filter
      if (p.age < this.activeFilters.ageMin || p.age > this.activeFilters.ageMax) return false;
      
      // Religion Filter
      if (this.activeFilters.religion !== 'all' && p.religion !== this.activeFilters.religion) return false;
      
      // Language Filter
      if (this.activeFilters.motherTongue !== 'all' && p.motherTongue !== this.activeFilters.motherTongue) return false;
      
      // Location Filter
      if (this.activeFilters.state !== 'all' && p.state !== this.activeFilters.state) return false;
      
      // Horoscope Filter
      if (this.activeFilters.manglik !== 'all' && p.horoscope.manglik !== this.activeFilters.manglik) return false;
      
      // Occupation Filter
      if (this.activeFilters.occupation !== 'all' && p.profession !== this.activeFilters.occupation) return false;

      return true;
    });

    this.renderGrid(filtered, shortlist, interests);
  },

  renderGrid(profiles, shortlist, interests) {
    const grid = document.getElementById("search-results-grid");
    const countTitle = document.getElementById("results-count");
    
    if (!grid) return;

    countTitle.textContent = `${profiles.length} Matched Profiles`;

    if (profiles.length === 0) {
      grid.style.display = 'block';
      grid.innerHTML = `
        <div class="glass-card" style="text-align: center; padding: 60px 40px; border-color: var(--secondary);">
          <div style="font-size: 3rem; color: var(--secondary); margin-bottom: 20px;"><i class="fas fa-heart-broken"></i></div>
          <h3 style="margin-bottom: 12px; font-size: 1.5rem;">No Matches Found</h3>
          <p style="color: var(--text-muted); max-width: 450px; margin: 0 auto 24px;">
            We couldn't find profiles matching your exact criteria. Try broadening your location, age range, or occupation settings.
          </p>
          <button class="btn btn-primary" onclick="document.getElementById('reset-filters').click();">Reset Filters</button>
        </div>
      `;
      return;
    }

    grid.style.display = 'grid';
    grid.innerHTML = profiles.map(p => {
      const isShortlisted = shortlist.includes(p.id);
      const isInterested = interests.includes(p.id);

      return `
        <div class="profile-card" data-id="${p.id}" style="cursor: pointer;">
          <div class="profile-img-container">
            <img src="${p.avatar}" alt="${p.name}">
            <div class="profile-overlay">
              ${p.premium ? `<span class="profile-badge badge-gold"><i class="fas fa-crown"></i> Premium</span>` : ''}
              <span class="profile-badge badge-match">${p.compatibilityScore}% Match</span>
            </div>
          </div>
          <div class="profile-card-body">
            <div class="profile-title">
              ${p.name}
              <i class="fa-solid fa-circle-check profile-verified" title="Verified Profile"></i>
            </div>
            <div class="profile-meta">${p.age} Yrs &bull; ${p.height} &bull; ${p.motherTongue}</div>
            
            <ul class="profile-details-list">
              <li><i class="fas fa-ring"></i> ${p.religion} - ${p.community}</li>
              <li><i class="fas fa-briefcase"></i> ${p.profession}</li>
              <li><i class="fas fa-map-marker-alt"></i> ${p.city}, ${p.state}</li>
            </ul>

            <div class="profile-card-actions">
              ${isInterested 
                ? `<button class="btn btn-outline btn-interest" data-id="${p.id}" data-name="${p.name}" disabled style="padding: 8px 16px;"><i class="fas fa-check"></i> Interest Sent</button>`
                : `<button class="btn btn-secondary btn-interest" data-id="${p.id}" data-name="${p.name}" style="padding: 8px 16px;"><i class="fas fa-heart-pulse"></i> Connect</button>`
              }
              <button class="btn-shortlist ${isShortlisted ? 'active' : ''}" data-id="${p.id}" title="Shortlist Profile">
                <i class="${isShortlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }
};

window.SearchView = SearchView;
