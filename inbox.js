// Inbox View Component
const InboxView = {
  activeChatId: null,

  render(container, params = {}) {
    const chats = window.db.getChats();
    const profiles = window.db.getAllProfiles();
    
    // Determine which chat to open
    const chatKeys = Object.keys(chats);
    this.activeChatId = params.activeChatId || chatKeys[0] || null;

    container.innerHTML = `
      <section class="section-padding container">
        <div class="chat-layout">
          
          <!-- Sidebar: Chats List -->
          <aside class="chat-sidebar">
            <div class="chat-sidebar-header">
              <h3 style="font-size: 1.3rem;">Conversations</h3>
            </div>
            
            <div class="chat-list" id="chat-threads-list">
              <!-- Rendered via JS -->
            </div>
          </aside>

          <!-- Main Chat Window -->
          <div class="chat-main" id="chat-window-main">
            <!-- Rendered dynamically -->
          </div>

        </div>
      </section>
    `;

    this.renderThreads();
    this.renderActiveChat();
    this.bindEvents();
    
    // Listen for incoming messages simulated by DB
    window.addEventListener("vivaham_chat_received", this.handleIncomingMessage);
  },

  destroy() {
    window.removeEventListener("vivaham_chat_received", this.handleIncomingMessage);
  },

  renderThreads() {
    const threadsContainer = document.getElementById("chat-threads-list");
    if (!threadsContainer) return;

    const chats = window.db.getChats();
    const chatKeys = Object.keys(chats);

    if (chatKeys.length === 0) {
      threadsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--text-muted); font-size: 0.9rem;">
          No active chats yet. Connect with matches to start chatting!
        </div>
      `;
      return;
    }

    threadsContainer.innerHTML = chatKeys.map(profileId => {
      const profile = window.db.getProfileById(profileId);
      if (!profile) return "";

      const messages = chats[profileId];
      const lastMsg = messages[messages.length - 1];
      const isSelected = profileId === this.activeChatId;

      return `
        <div class="chat-user-item ${isSelected ? 'active' : ''}" data-id="${profile.id}">
          <div class="chat-user-avatar">
            <img src="${profile.avatar}" alt="${profile.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
            <div class="chat-user-status"></div>
          </div>
          <div class="chat-user-info">
            <div class="chat-user-name">${profile.name}</div>
            <div class="chat-user-preview">${lastMsg ? (lastMsg.sender === 'user' ? 'You: ' : '') + lastMsg.text : 'Click to start chat'}</div>
          </div>
        </div>
      `;
    }).join("");

    // Bind thread select clicks
    const items = threadsContainer.querySelectorAll(".chat-user-item");
    items.forEach(item => {
      item.addEventListener("click", () => {
        this.activeChatId = item.dataset.id;
        this.renderThreads();
        this.renderActiveChat();
      });
    });
  },

  renderActiveChat() {
    const chatMain = document.getElementById("chat-window-main");
    if (!chatMain) return;

    if (!this.activeChatId) {
      chatMain.innerHTML = `
        <div style="flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted); padding: 40px; text-align: center;">
          <div style="font-size: 3rem; color: var(--secondary); margin-bottom: 16px;"><i class="far fa-comments"></i></div>
          <h3>Your Inbox</h3>
          <p style="max-width: 350px; margin-top: 8px; font-size: 0.9rem;">
            Select a conversation on the left, or express interest on matches to unlock chatting!
          </p>
        </div>
      `;
      return;
    }

    const profile = window.db.getProfileById(this.activeChatId);
    if (!profile) return;

    const messages = window.db.getMessages(this.activeChatId);

    chatMain.innerHTML = `
      <!-- Chat Header -->
      <div class="chat-header">
        <div class="chat-header-user">
          <div class="chat-user-avatar" style="width: 42px; height: 42px;">
            <img src="${profile.avatar}" alt="${profile.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
            <div class="chat-user-status"></div>
          </div>
          <div class="chat-header-name">
            <h4>${profile.name}</h4>
            <p>Active now</p>
          </div>
        </div>
        <button class="btn btn-outline" id="chat-view-profile" style="padding: 6px 16px; font-size: 0.8rem;">
          <i class="fas fa-user-circle"></i> View Candidate
        </button>
      </div>

      <!-- Chat Messages Body -->
      <div class="chat-body" id="chat-messages-container">
        ${messages.map(m => `
          <div class="chat-bubble ${m.sender === 'user' ? 'chat-bubble-sent' : 'chat-bubble-received'}">
            <div>${m.text}</div>
            <span class="chat-time">${m.time}</span>
          </div>
        `).join("")}
      </div>

      <!-- Chat Message Composer Footer -->
      <div class="chat-footer">
        <input type="text" id="chat-message-input" class="chat-input" placeholder="Type a secure matrimonial message...">
        <button class="btn btn-primary btn-icon" id="chat-send-btn" aria-label="Send Message">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    `;

    this.scrollToBottom();

    // Bind inside chat header profile button
    document.getElementById("chat-view-profile").addEventListener("click", () => {
      window.ProfileDetailModal.open(this.activeProfileId || this.activeChatId);
    });

    // Handle send message keys
    const input = document.getElementById("chat-message-input");
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.submitMessage();
      }
    });

    const sendBtn = document.getElementById("chat-send-btn");
    sendBtn.addEventListener("click", () => {
      this.submitMessage();
    });
  },

  submitMessage() {
    const input = document.getElementById("chat-message-input");
    if (!input) return;

    const text = input.value.trim();
    if (!text) return;

    // Save & trigger simulated reply
    const newMsg = window.db.sendMessage(this.activeChatId, text);
    
    // Render immediate message bubble
    const container = document.getElementById("chat-messages-container");
    if (container) {
      const bubble = document.createElement("div");
      bubble.className = "chat-bubble chat-bubble-sent";
      bubble.innerHTML = `
        <div>${newMsg.text}</div>
        <span class="chat-time">${newMsg.time}</span>
      `;
      container.appendChild(bubble);
      this.scrollToBottom();
    }

    input.value = "";
    this.renderThreads(); // Update last message preview
  },

  scrollToBottom() {
    const container = document.getElementById("chat-messages-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  },

  handleIncomingMessage: (e) => {
    // Arrow function preserves context reference for event listener remove
    const { profileId, message } = e.detail;
    
    // Update threads preview list
    InboxView.renderThreads();

    // If active chat matches the incoming message source, append it
    if (InboxView.activeChatId === profileId) {
      const container = document.getElementById("chat-messages-container");
      if (container) {
        // Simple delay animation feel
        const bubble = document.createElement("div");
        bubble.className = "chat-bubble chat-bubble-received";
        bubble.innerHTML = `
          <div>${message.text}</div>
          <span class="chat-time">${message.time}</span>
        `;
        container.appendChild(bubble);
        InboxView.scrollToBottom();
      }
    }
  },

  bindEvents() {
    // Nav bar sync indicator or other hooks if needed
  }
};

window.InboxView = InboxView;
