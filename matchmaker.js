// Matchmaker AI Component
const MatchmakerView = {
  currentQuestionIdx: 0,
  userAnswers: [],

  questions: [
    {
      text: "What is your ideal weekend plan?",
      options: [
        { text: "Quiet evening reading, cooking, or watching movies at home", category: "introvert" },
        { text: "Going out for dinner, attending social events or family gatherings", category: "family" },
        { text: "Adventure sports, hiking, or road tripping to nature escapes", category: "adventure" },
        { text: "Attending workshops, coding, or visiting museums/art galleries", category: "intellectual" }
      ]
    },
    {
      text: "How do you define the perfect work-life balance?",
      options: [
        { text: "Career is primary; putting in long hours now secures our future", category: "ambitious" },
        { text: "Work is just work; evening and weekend family time is non-negotiable", category: "family" },
        { text: "Flexible or creative careers that let us travel and work from anywhere", category: "adventure" },
        { text: "Building a business or side-hustle together as partners", category: "intellectual" }
      ]
    },
    {
      text: "Which partner trait is most important to you?",
      options: [
        { text: "Intellectual connection, deep conversations, and curiosity", category: "intellectual" },
        { text: "Shared religious, traditional values and family respect", category: "family" },
        { text: "Strong ambition, financial prudence, and growth mindset", category: "ambitious" },
        { text: "Empathy, humor, warmth, and matching lifestyle hobbies", category: "introvert" }
      ]
    },
    {
      text: "What is your preferred living arrangement post-marriage?",
      options: [
        { text: "Joint family layout, living together with parents and siblings", category: "family" },
        { text: "Nuclear family layout in a peaceful, quiet green suburb", category: "introvert" },
        { text: "Modern high-rise apartment in a bustling metropolitan city center", category: "ambitious" },
        { text: "Relocating abroad or traveling to different regions frequently", category: "adventure" }
      ]
    },
    {
      text: "How do you make major financial or life decisions?",
      options: [
        { text: "Analytical approach: spreadsheets, research, and long-term planning", category: "intellectual" },
        { text: "Consultative approach: discussing everything with elders and parents", category: "family" },
        { text: "Equal partnership: only between me and my partner through mutual agreement", category: "ambitious" },
        { text: "Adaptive approach: keeping it flexible and deciding as we go", category: "adventure" }
      ]
    }
  ],

  render(container) {
    this.currentQuestionIdx = 0;
    this.userAnswers = [];
    
    container.innerHTML = `
      <section class="section-padding container">
        <div class="glass-card matchmaker-card">
          <div id="matchmaker-intro" style="text-align: center; padding: 30px 0;">
            <div style="font-size: 3.5rem; color: var(--secondary); margin-bottom: 24px; animation: float 3s ease infinite;">
              <i class="fas fa-magic"></i>
            </div>
            <h2 style="font-size: 2.2rem; margin-bottom: 16px;">Vivaham Compatibility Matchmaker</h2>
            <p style="color: var(--text-muted); max-width: 500px; margin: 0 auto 36px; font-size: 1.05rem;">
              Unlock your astrological and values-based compatibility match. Our quiz evaluates your lifestyle preferences to find highly compatible soulmates.
            </p>
            <button class="btn btn-secondary btn-primary" id="start-quiz-btn" style="padding: 14px 32px; font-size: 1rem;">
              <i class="fas fa-heart-pulse"></i> Start Compatibility Test
            </button>
          </div>
          
          <div id="quiz-container" style="display: none;">
            <div class="quiz-progress-bar">
              <div class="quiz-progress-fill" id="quiz-progress"></div>
            </div>
            
            <div class="question-container">
              <div style="font-size: 0.85rem; font-weight: 700; color: var(--secondary); text-transform: uppercase; margin-bottom: 8px;" id="question-counter">
                Question 1 of 5
              </div>
              <h3 class="question-text" id="question-text">Question Text</h3>
              
              <div class="options-list" id="options-list">
                <!-- Buttons rendered dynamically -->
              </div>
            </div>
          </div>

          <div id="quiz-loading" style="display: none; text-align: center; padding: 60px 0;">
            <i class="fa-solid fa-heart-pulse match-heart-icon" style="font-size: 4rem; color: var(--accent); margin-bottom: 24px;"></i>
            <h3 style="font-size: 1.5rem; margin-bottom: 8px;">Analyzing Match Chemistry...</h3>
            <p style="color: var(--text-muted);">Calculating star constellations and lifestyle alignment...</p>
          </div>

          <div id="quiz-results" style="display: none;">
            <!-- Rendered dynamically -->
          </div>
        </div>
      </section>
    `;

    this.bindEvents();
  },

  bindEvents() {
    const startBtn = document.getElementById("start-quiz-btn");
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        document.getElementById("matchmaker-intro").style.display = "none";
        document.getElementById("quiz-container").style.display = "block";
        this.showQuestion();
      });
    }
  },

  showQuestion() {
    const q = this.questions[this.currentQuestionIdx];
    const progressFill = document.getElementById("quiz-progress");
    const counterText = document.getElementById("question-counter");
    const questionText = document.getElementById("question-text");
    const optionsList = document.getElementById("options-list");

    // Update progress bar
    const progressPct = ((this.currentQuestionIdx + 1) / this.questions.length) * 100;
    progressFill.style.width = `${progressPct}%`;

    counterText.textContent = `Question ${this.currentQuestionIdx + 1} of ${this.questions.length}`;
    questionText.textContent = q.text;

    optionsList.innerHTML = q.options.map((opt, idx) => `
      <button class="option-btn" data-category="${opt.category}">
        ${opt.text}
      </button>
    `).join("");

    // Option clicks
    const btns = optionsList.querySelectorAll(".option-btn");
    btns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        // Highlight selection briefly
        e.target.classList.add("selected");
        
        // Save choice
        this.userAnswers.push(e.target.dataset.category);

        setTimeout(() => {
          this.nextQuestion();
        }, 300);
      });
    });
  },

  nextQuestion() {
    this.currentQuestionIdx++;
    if (this.currentQuestionIdx < this.questions.length) {
      this.showQuestion();
    } else {
      this.showLoading();
    }
  },

  showLoading() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("quiz-loading").style.display = "block";

    setTimeout(() => {
      this.showResults();
    }, 2000);
  },

  showResults() {
    document.getElementById("quiz-loading").style.display = "none";
    const resultsContainer = document.getElementById("quiz-results");
    resultsContainer.style.display = "block";

    // Count categories of answers to get the user's primary archetype
    const counts = {};
    this.userAnswers.forEach(cat => {
      counts[cat] = (counts[cat] || 0) + 1;
    });

    // Find the category with maximum count
    let primaryArchetype = "family"; // Default fallback
    let maxCount = 0;
    for (const cat in counts) {
      if (counts[cat] > maxCount) {
        maxCount = counts[cat];
        primaryArchetype = cat;
      }
    }

    // Archetype definitions
    const archetypes = {
      family: {
        title: "The Traditional Guardian",
        desc: "You prioritize family respect, deep roots, joint-family values, and traditional alignment. You seek a partner who honors heritage, shows high respect to elders, and enjoys warm family bonding.",
        compatScore: 94,
        suggestedOccupations: ["Business Owner", "Doctor", "Software Engineer"]
      },
      intellectual: {
        title: "The Curious Philosopher",
        desc: "You thrive on deep intellectual communication, career progress, curiosity, and creative exploration. For you, marriage is a union of matching minds. You need someone with strong opinions, educational background, and unique hobbies.",
        compatScore: 96,
        suggestedOccupations: ["Research Scientist", "Creative Director", "Software Engineer"]
      },
      ambitious: {
        title: "The Dynamic Builder",
        desc: "You are highly career-driven, structured, and goal-oriented. You seek an equal partner who has a strong finance mindset, balances active career targets with support, and wants to build a comfortable life in major metropolitan hubs.",
        compatScore: 91,
        suggestedOccupations: ["Product Manager", "Financial Analyst", "Software Engineer"]
      },
      adventure: {
        title: "The Free Voyager",
        desc: "You view life as an open book of travel and experiences. You love the outdoors, flexible lifestyle design, and adaptive plans. You seek a partner who is confident, spontaneous, and willing to travel the world.",
        compatScore: 89,
        suggestedOccupations: ["Merchant Navy Officer", "Creative Director"]
      },
      introvert: {
        title: "The Peaceful Thinker",
        desc: "You value a quiet, peaceful home life, personal spaces, and quality quiet time with your partner. You prefer a supportive, warm nuclear family arrangement where mutual respect and simple pleasures take precedence.",
        compatScore: 95,
        suggestedOccupations: ["Software Engineer", "Research Scientist", "Pediatrician"]
      }
    };

    const result = archetypes[primaryArchetype];
    
    // Find matching profiles in the database
    const profiles = window.db.getAllProfiles();
    const matches = profiles.filter(p => 
      result.suggestedOccupations.includes(p.profession) || p.compatibilityScore >= 90
    ).slice(0, 3);

    resultsContainer.innerHTML = `
      <div class="matchmaker-results">
        <h2 style="font-size: 1.8rem; margin-bottom: 8px;">Your Match Results</h2>
        <p style="color: var(--secondary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Archetype: ${result.title}
        </p>

        <div class="compatibility-score-display">
          <i class="fa-solid fa-heart match-heart-icon"></i>
          <span class="results-score-num">${result.compatScore}%</span>
        </div>

        <p class="results-message">${result.desc}</p>
        
        <div style="border-top: 1px solid var(--border-color); padding-top: 32px; margin-top: 16px;">
          <h3 style="font-size: 1.25rem; margin-bottom: 20px;">Top Recommended Matches for You</h3>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; text-align: left;">
            ${matches.map(p => `
              <div class="glass-card" style="padding: 16px; text-align: center; cursor: pointer; border-color: var(--border-color);" onclick="window.ProfileDetailModal.open('${p.id}')">
                <img src="${p.avatar}" alt="${p.name}" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover; border: 2px solid var(--secondary); margin-bottom: 10px;">
                <h4 style="font-size: 0.95rem; margin-bottom: 4px;">${p.name}</h4>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 8px;">${p.age} Yrs &bull; ${p.profession}</p>
                <span style="font-size: 0.75rem; font-weight: 700; color: #2ea44f; background-color: rgba(46,164,79,0.1); padding: 2px 8px; border-radius: var(--radius-full);">
                  ${p.compatibilityScore}% Match
                </span>
              </div>
            `).join("")}
          </div>
        </div>

        <div style="margin-top: 40px; display: flex; justify-content: center; gap: 16px;">
          <button class="btn btn-outline" id="retake-quiz-btn"><i class="fas fa-undo"></i> Retake Test</button>
          <button class="btn btn-secondary" id="explore-matches-btn"><i class="fas fa-search"></i> View All Matches</button>
        </div>
      </div>
    `;

    // Bind results page buttons
    document.getElementById("retake-quiz-btn").addEventListener("click", () => {
      this.render(resultsContainer.parentElement);
    });

    document.getElementById("explore-matches-btn").addEventListener("click", () => {
      window.appRouter.navigateTo("search");
    });
  }
};

window.MatchmakerView = MatchmakerView;
