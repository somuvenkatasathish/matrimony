// Home Page Renderer
const HomeView = {
  render(container) {
    container.innerHTML = `
      <!-- Hero Section -->
      <section class="hero">
        <div class="container hero-grid">
          <div class="hero-content">
            <div class="hero-badge">
              <i class="fas fa-sparkles"></i> Trusted Matchmaking
            </div>
            <h1 class="hero-title">
              Find Your Eternal <span>Perfect Match</span> Here
            </h1>
            <p class="hero-desc">
              Vivaham is the most exquisite matrimony platform crafted with tradition and powered by modern compatibility matchmaking. Start your beautiful journey today.
            </p>
            <div style="display: flex; gap: 16px;">
              <button class="btn btn-primary" id="hero-get-started">
                <i class="fas fa-heart"></i> Get Started
              </button>
              <button class="btn btn-outline" id="hero-read-stories">
                Success Stories
              </button>
            </div>
          </div>
          
          <div class="hero-image-wrapper">
            <div class="hero-img-backdrop"></div>
            <!-- Traditional wedding couple illustration avatar -->
            <svg class="hero-img" viewBox="0 0 100 100" style="background-color: var(--primary); border: 4px solid var(--secondary);">
              <rect width="100%" height="100%" fill="#520b13"/>
              <!-- Groom side (Left) -->
              <circle cx="35" cy="48" r="16" fill="#ECC49C"/>
              <path d="M18 35 C18 28 28 20 35 20 C42 20 52 28 52 35 C52 38 48 38 35 38 C22 38 18 38 18 35 Z" fill="#D4AF37"/>
              <rect x="33" y="14" width="4" height="7" fill="#800B1B"/>
              <circle cx="35" cy="15" r="1.5" fill="#fff"/>
              <circle cx="29" cy="46" r="1" fill="#000"/>
              <circle cx="41" cy="46" r="1" fill="#000"/>
              <path d="M33 51 Q35 52 37 51" stroke="#800B1B" stroke-width="1" fill="none"/>
              <path d="M20 66 L50 66 L46 95 L24 95 Z" fill="#D4AF37"/>
              <rect x="30" y="66" width="10" height="29" fill="#800B1B"/>
              
              <!-- Bride side (Right) -->
              <circle cx="65" cy="52" r="16" fill="#F7D2A9"/>
              <path d="M65 35 C50 35 48 44 48 52 C48 56 51 60 53 60 C55 60 59 52 65 52 C71 52 75 60 77 60 C79 60 82 56 82 52 C82 44 80 35 65 35 Z" fill="#800B1B"/>
              <circle cx="65" cy="33" r="2" fill="#D4AF37"/>
              <circle cx="59" cy="50" r="1" fill="#000"/>
              <circle cx="71" cy="50" r="1" fill="#000"/>
              <circle cx="65" cy="44" r="1.5" fill="#D4AF37"/>
              <path d="M63 55 Q65 56 67 55" stroke="#800B1B" stroke-width="1" fill="none"/>
              <path d="M61 58 Q65 61 69 58" stroke="#800B1B" stroke-width="1.5" fill="none"/>
              <rect x="50" y="68" width="30" height="27" rx="8" fill="#800B1B"/>
              <path d="M54 68 L76 68 L72 95 L58 95 Z" fill="#D4AF37" opacity="0.4"/>
              <circle cx="65" cy="74" r="3.5" fill="#D4AF37"/>
            </svg>
            <div class="hero-decor-badge hero-badge-1">
              <div class="hero-badge-icon"><i class="fas fa-ring"></i></div>
              <div class="hero-badge-text">
                <h4>10,000+</h4>
                <p>Happy Marriages</p>
              </div>
            </div>
            <div class="hero-decor-badge hero-badge-2">
              <div class="hero-badge-icon"><i class="fas fa-shield-halved"></i></div>
              <div class="hero-badge-text">
                <h4>100%</h4>
                <p>Verified Profiles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Search Widget -->
      <section class="container quick-search-container">
        <div class="quick-search">
          <div class="search-field">
            <label for="search-gender">I am looking for a</label>
            <select id="search-gender">
              <option value="female">Woman</option>
              <option value="male">Man</option>
            </select>
          </div>
          
          <div class="search-field">
            <label for="search-age-min">Age</label>
            <div style="display: flex; align-items: center; gap: 8px;">
              <select id="search-age-min" style="flex: 1;">
                <option value="20">20</option>
                <option value="22" selected>22</option>
                <option value="24">24</option>
                <option value="26">26</option>
                <option value="28">28</option>
              </select>
              <span style="color: var(--text-muted);">to</span>
              <select id="search-age-max" style="flex: 1;">
                <option value="26">26</option>
                <option value="28">28</option>
                <option value="30" selected>30</option>
                <option value="32">32</option>
                <option value="35">35</option>
              </select>
            </div>
          </div>

          <div class="search-field">
            <label for="search-religion">Religion</label>
            <select id="search-religion">
              <option value="all">Any Religion</option>
              <option value="Hindu" selected>Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
              <option value="Sikh">Sikh</option>
            </select>
          </div>

          <div class="search-field">
            <label for="search-mother-tongue">Mother Tongue</label>
            <select id="search-mother-tongue">
              <option value="all">Any Language</option>
              <option value="Hindi">Hindi</option>
              <option value="Tamil">Tamil</option>
              <option value="Telugu">Telugu</option>
              <option value="Punjabi">Punjabi</option>
              <option value="Bengali">Bengali</option>
              <option value="Gujarati">Gujarati</option>
            </select>
          </div>

          <button class="btn btn-secondary" id="quick-search-btn" style="height: 46px; min-width: 140px;">
            <i class="fas fa-search"></i> Search
          </button>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats-section">
        <div class="container stats-grid">
          <div class="stat-card">
            <div class="stat-num" data-val="10">10k+</div>
            <div class="stat-label">Active Matches</div>
          </div>
          <div class="stat-card">
            <div class="stat-num" data-val="100">100%</div>
            <div class="stat-label">Secure Profiles</div>
          </div>
          <div class="stat-card">
            <div class="stat-num" data-val="15">15+</div>
            <div class="stat-label">Communities</div>
          </div>
          <div class="stat-card">
            <div class="stat-num" data-val="2500">2,500+</div>
            <div class="stat-label">Weddings This Year</div>
          </div>
        </div>
      </section>

      <!-- Steps Section -->
      <section class="section-padding container">
        <div class="section-title-wrapper">
          <h2 class="section-title">Three Steps To Your Forever</h2>
          <p class="section-subtitle">Establishing a lifelong connection on Vivaham is simple, secure, and satisfying.</p>
        </div>
        
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-num">1</div>
            <h3>Create Profile</h3>
            <p>Register in 2 minutes, fill out your details, horoscope information, and upload your traditional avatar.</p>
          </div>
          <div class="step-card">
            <div class="step-num">2</div>
            <h3>Check Compatibility</h3>
            <p>Use our Matchmaker AI or filter system to find profiles matching your values, horoscope stars, and lifestyle.</p>
          </div>
          <div class="step-card">
            <div class="step-num">3</div>
            <h3>Express Interest & Chat</h3>
            <p>Send a secure interest request. Once accepted, start chatting instantly to take the next step together.</p>
          </div>
        </div>
      </section>

      <!-- Success Stories Section -->
      <section class="section-padding" style="background-color: var(--surface-hover); border-top: 1px solid var(--border-color);" id="success-stories-section">
        <div class="container">
          <div class="section-title-wrapper">
            <h2 class="section-title">Vivaham Success Stories</h2>
            <p class="section-subtitle">Real relationships, real marriages. Read how these beautiful couples found each other here.</p>
          </div>

          <div class="carousel-container">
            <div class="story-card">
              <div class="story-img-wrapper">
                <!-- SVG traditional couple drawing -->
                <svg width="100%" height="100%" viewBox="0 0 100 100" style="background-color: #520b13;">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" stroke-width="0.5" opacity="0.3"/>
                  <circle cx="35" cy="45" r="14" fill="#F3C68F"/>
                  <path d="M22 35 C22 28 30 22 35 22 C40 22 48 28 48 35 L45 38 L25 38 Z" fill="#D4AF37"/>
                  <circle cx="62" cy="48" r="14" fill="#F7D2A9"/>
                  <path d="M62 35 C50 35 48 42 48 48 C48 52 52 54 62 54 C72 54 76 52 76 48 C76 42 74 35 62 35 Z" fill="#800B1B"/>
                  <path d="M15 80 Q50 65 85 80 L80 100 L20 100 Z" fill="#800B1B" opacity="0.8"/>
                </svg>
              </div>
              <div class="story-content">
                <div class="story-names">Anoop &amp; Sneha</div>
                <div class="story-date">Married Oct 2025</div>
                <p class="story-text">"We matched on Vivaham. The compatibility indicator was 94%, and when we spoke, it really clicked. Thank you Vivaham for bringing us together across two different cities!"</p>
              </div>
            </div>

            <div class="story-card">
              <div class="story-img-wrapper">
                <svg width="100%" height="100%" viewBox="0 0 100 100" style="background-color: #3b2a2c;">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" stroke-width="0.5" opacity="0.3"/>
                  <circle cx="35" cy="45" r="14" fill="#ECC49C"/>
                  <path d="M22 35 C22 28 30 22 35 22 C40 22 48 28 48 35 L45 38 L25 38 Z" fill="#EADBC8"/>
                  <circle cx="62" cy="48" r="14" fill="#E5A670"/>
                  <path d="M62 35 C50 35 48 42 48 48 C48 52 52 54 62 54 C72 54 76 52 76 48 C76 42 74 35 62 35 Z" fill="#D4AF37"/>
                  <path d="M15 80 Q50 65 85 80 L80 100 L20 100 Z" fill="#d4af37" opacity="0.8"/>
                </svg>
              </div>
              <div class="story-content">
                <div class="story-names">Ravi &amp; Divya</div>
                <div class="story-date">Married Feb 2026</div>
                <p class="story-text">"Finding someone with identical cultural and career values felt impossible until I joined Vivaham. Within two weeks, I matched with Ravi. Our families got along immediately."</p>
              </div>
            </div>

            <div class="story-card">
              <div class="story-img-wrapper">
                <svg width="100%" height="100%" viewBox="0 0 100 100" style="background-color: #581845;">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" stroke-width="0.5" opacity="0.3"/>
                  <circle cx="35" cy="45" r="14" fill="#ECC49C"/>
                  <path d="M22 35 C22 28 30 22 35 22 C40 22 48 28 48 35 L45 38 L25 38 Z" fill="#1E3D59"/>
                  <circle cx="62" cy="48" r="14" fill="#F7D2A9"/>
                  <path d="M62 35 C50 35 48 42 48 48 C48 52 52 54 62 54 C72 54 76 52 76 48 C76 42 74 35 62 35 Z" fill="#581845"/>
                  <path d="M15 80 Q50 65 85 80 L80 100 L20 100 Z" fill="#581845" opacity="0.8"/>
                </svg>
              </div>
              <div class="story-content">
                <div class="story-names">Rajesh &amp; Meera</div>
                <div class="story-date">Married May 2026</div>
                <p class="story-text">"I registered for my daughter on Vivaham. The search filters were extremely precise and the horoscope details saved us a lot of time. Meera and Rajesh are perfect for each other."</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    this.bindEvents();
  },

  bindEvents() {
    // Quick Search button click
    const searchBtn = document.getElementById("quick-search-btn");
    if (searchBtn) {
      searchBtn.addEventListener("click", () => {
        const filters = {
          gender: document.getElementById("search-gender").value,
          ageMin: parseInt(document.getElementById("search-age-min").value),
          ageMax: parseInt(document.getElementById("search-age-max").value),
          religion: document.getElementById("search-religion").value,
          motherTongue: document.getElementById("search-mother-tongue").value
        };
        // Switch to search view with pre-set filters
        window.appRouter.navigateTo("search", filters);
      });
    }

    // Hero buttons
    const getStartedBtn = document.getElementById("hero-get-started");
    if (getStartedBtn) {
      getStartedBtn.addEventListener("click", () => {
        document.getElementById("register-modal").style.display = "flex";
      });
    }

    const readStoriesBtn = document.getElementById("hero-read-stories");
    if (readStoriesBtn) {
      readStoriesBtn.addEventListener("click", () => {
        const storiesSec = document.getElementById("success-stories-section");
        if (storiesSec) {
          storiesSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
};

window.HomeView = HomeView;
