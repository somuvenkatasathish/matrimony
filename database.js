// SVGs of beautifully stylized Indian brides and grooms for avatars
const AVATARS = {
  bride_red: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%234A0E17"/><circle cx="50" cy="45" r="22" fill="%23F3C68F"/><path d="M50 23 C30 23 28 35 28 45 C28 50 32 55 35 55 C38 55 42 45 50 45 C58 45 62 55 65 55 C68 55 72 50 72 45 C72 35 70 23 50 23 Z" fill="%23800B1B"/><path d="M35 23 L65 23 L62 27 L38 27 Z" fill="%23D4AF37"/><circle cx="50" cy="21" r="3" fill="%23D4AF37"/><circle cx="50" cy="35" r="2.5" fill="%23D4AF37"/><circle cx="42" cy="43" r="1.5" fill="%23000"/><circle cx="58" cy="43" r="1.5" fill="%23000"/><path d="M48 48 Q50 50 52 48" stroke="%23800B1B" stroke-width="1.5" fill="none"/><path d="M38 52 Q50 56 62 52" stroke="%23800B1B" stroke-width="2" fill="none"/><rect x="25" y="67" width="50" height="33" rx="10" fill="%23800B1B"/><path d="M30 67 L70 67 L65 100 L35 100 Z" fill="%23D4AF37" opacity="0.3"/><circle cx="50" cy="74" r="5" fill="%23D4AF37"/><line x1="25" y1="80" x2="35" y2="80" stroke="%23D4AF37" stroke-width="2"/><line x1="65" y1="80" x2="75" y2="80" stroke="%23D4AF37" stroke-width="2"/></svg>`,
  bride_gold: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%233b2a2c"/><circle cx="50" cy="45" r="22" fill="%23E5A670"/><path d="M50 23 C32 23 30 35 30 45 C30 50 34 53 36 53 C38 53 41 45 50 45 C59 45 62 53 64 53 C66 53 70 50 70 45 C70 35 68 23 50 23 Z" fill="%23D4AF37"/><circle cx="50" cy="33" r="2" fill="%23A81827"/><circle cx="42" cy="43" r="1.5" fill="%23000"/><circle cx="58" cy="43" r="1.5" fill="%23000"/><path d="M48 48 Q50 50 52 48" stroke="%23A81827" stroke-width="1.5" fill="none"/><path d="M38 52 Q50 55 62 52" stroke="%23A81827" stroke-width="2" fill="none"/><rect x="25" y="67" width="50" height="33" rx="10" fill="%23A81827"/><path d="M25 67 L75 67 L70 100 L30 100 Z" fill="%23D4AF37" opacity="0.4"/><circle cx="50" cy="74" r="4" fill="%23D4AF37"/></svg>`,
  bride_pink: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%23520b13"/><circle cx="50" cy="45" r="22" fill="%23F7D2A9"/><path d="M50 23 C30 23 28 35 28 45 C28 50 32 55 35 55 C38 55 42 45 50 45 C58 45 62 55 65 55 C68 55 72 50 72 45 C72 35 70 23 50 23 Z" fill="%23E05C75"/><circle cx="50" cy="34" r="2" fill="%23D4AF37"/><circle cx="42" cy="43" r="1.5" fill="%23000"/><circle cx="58" cy="43" r="1.5" fill="%23000"/><path d="M48 48 Q50 50 52 48" stroke="%23E05C75" stroke-width="1.5" fill="none"/><path d="M38 52 Q50 56 62 52" stroke="%23E05C75" stroke-width="2" fill="none"/><rect x="25" y="67" width="50" height="33" rx="10" fill="%23E05C75"/><path d="M30 67 L70 67 L65 100 L35 100 Z" fill="%23D4AF37" opacity="0.35"/><circle cx="50" cy="73" r="4" fill="%23D4AF37"/></svg>`,
  bride_purple: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%232D2627"/><circle cx="50" cy="45" r="22" fill="%23E0A370"/><path d="M50 23 C30 23 28 35 28 45 C28 50 32 55 35 55 C38 55 42 45 50 45 C58 45 62 55 65 55 C68 55 72 50 72 45 C72 35 70 23 50 23 Z" fill="%23581845"/><circle cx="50" cy="34" r="2" fill="%23D4AF37"/><circle cx="43" cy="43" r="1.5" fill="%23000"/><circle cx="57" cy="43" r="1.5" fill="%23000"/><path d="M48 48 Q50 50 52 48" stroke="%23D4AF37" stroke-width="1.5" fill="none"/><path d="M38 52 Q50 56 62 52" stroke="%23581845" stroke-width="2" fill="none"/><rect x="25" y="67" width="50" height="33" rx="10" fill="%23581845"/><path d="M30 67 L70 67 L65 100 L35 100 Z" fill="%23D4AF37" opacity="0.3"/><circle cx="50" cy="74" r="4" fill="%23D4AF37"/></svg>`,
  groom_gold: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%234A0E17"/><circle cx="50" cy="45" r="21" fill="%23EAC090"/><path d="M28 28 C28 20 40 12 50 12 C60 12 72 20 72 28 C72 32 68 32 50 32 C32 32 28 32 28 28 Z" fill="%23D4AF37"/><rect x="47" y="5" width="6" height="10" rx="3" fill="%23A81827"/><circle cx="50" cy="8" r="2.5" fill="%23D4AF37"/><circle cx="42" cy="43" r="1.5" fill="%23000"/><circle cx="58" cy="43" r="1.5" fill="%23000"/><path d="M48 49 Q50 51 52 49" stroke="%234A0E17" stroke-width="1.5" fill="none"/><path d="M40 53 Q50 55 60 53" stroke="%234A0E17" stroke-width="2" fill="none"/><path d="M30 68 L70 68 L65 100 L35 100 Z" fill="%23D4AF37"/><rect x="42" y="68" width="16" height="32" fill="%234A0E17"/><circle cx="50" cy="76" r="2.5" fill="%23D4AF37"/><circle cx="50" cy="86" r="2.5" fill="%23D4AF37"/></svg>`,
  groom_maroon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%23FDFBF7"/><circle cx="50" cy="45" r="21" fill="%23DFB080"/><path d="M28 28 C28 20 40 12 50 12 C60 12 72 20 72 28 C72 32 68 32 50 32 C32 32 28 32 28 28 Z" fill="%23800B1B"/><rect x="47" y="5" width="6" height="10" rx="3" fill="%23D4AF37"/><circle cx="50" cy="8" r="2" fill="%23fff"/><circle cx="42" cy="43" r="1.5" fill="%23000"/><circle cx="58" cy="43" r="1.5" fill="%23000"/><path d="M48 49 Q50 51 52 49" stroke="%23800B1B" stroke-width="1.5" fill="none"/><path d="M42 53 Q50 55 58 53" stroke="%23800B1B" stroke-width="2" fill="none"/><path d="M30 68 L70 68 L68 100 L32 100 Z" fill="%23800B1B"/><rect x="44" y="68" width="12" height="32" fill="%23D4AF37"/><circle cx="50" cy="75" r="2" fill="%23fff"/><circle cx="50" cy="85" r="2" fill="%23fff"/></svg>`,
  groom_cream: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%232D2627"/><circle cx="50" cy="45" r="21" fill="%23ECC49C"/><path d="M28 28 C28 20 40 12 50 12 C60 12 72 20 72 28 C72 32 68 32 50 32 C32 32 28 32 28 28 Z" fill="%23EADBC8"/><rect x="47" y="5" width="6" height="10" rx="3" fill="%23D4AF37"/><circle cx="42" cy="43" r="1.5" fill="%23000"/><circle cx="58" cy="43" r="1.5" fill="%23000"/><path d="M48 49 Q50 51 52 49" stroke="%232D2627" stroke-width="1.5" fill="none"/><path d="M40 53 Q50 55 60 53" stroke="%232D2627" stroke-width="2" fill="none"/><path d="M30 68 L70 68 L65 100 L35 100 Z" fill="%23EADBC8"/><rect x="42" y="68" width="16" height="32" fill="%232D2627"/><circle cx="50" cy="76" r="2" fill="%23D4AF37"/><circle cx="50" cy="86" r="2" fill="%23D4AF37"/></svg>`,
  groom_blue: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%231a1415"/><circle cx="50" cy="45" r="21" fill="%23E5B585"/><path d="M28 28 C28 20 40 12 50 12 C60 12 72 20 72 28 C72 32 68 32 50 32 C32 32 28 32 28 28 Z" fill="%231E3D59"/><rect x="47" y="5" width="6" height="10" rx="3" fill="%23D4AF37"/><circle cx="42" cy="43" r="1.5" fill="%23000"/><circle cx="58" cy="43" r="1.5" fill="%23000"/><path d="M48 49 Q50 51 52 49" stroke="%231a1415" stroke-width="1.5" fill="none"/><path d="M41 53 Q50 55 59 53" stroke="%231a1415" stroke-width="2" fill="none"/><path d="M30 68 L70 68 L65 100 L35 100 Z" fill="%231E3D59"/><rect x="43" y="68" width="14" height="32" fill="%23D4AF37"/><circle cx="50" cy="76" r="2" fill="%23fff"/><circle cx="50" cy="86" r="2" fill="%23fff"/></svg>`
};

const INITIAL_PROFILES = [
  {
    id: "p1",
    name: "Priya Sharma",
    gender: "female",
    age: 26,
    height: "5'4\"",
    religion: "Hindu",
    community: "Brahmin",
    motherTongue: "Hindi",
    city: "New Delhi",
    state: "Delhi",
    education: "B.Tech in Computer Science",
    profession: "Software Engineer",
    company: "Google India",
    income: "₹24 LPA",
    horoscope: {
      rashi: "Mithun (Gemini)",
      nakshatra: "Chitra",
      manglik: "No"
    },
    about: "A blend of traditional values and modern outlook. I love coding, hiking, and trying new cuisines. Seeking a partner who is career-oriented, family-loving, and has a good sense of humor.",
    avatar: AVATARS.bride_red,
    premium: true,
    compatibilityScore: 92
  },
  {
    id: "p2",
    name: "Rahul Verma",
    gender: "male",
    age: 28,
    height: "5'11\"",
    religion: "Hindu",
    community: "Kshatriya",
    motherTongue: "Punjabi",
    city: "Mumbai",
    state: "Maharashtra",
    education: "MBA",
    profession: "Product Manager",
    company: "Paytm",
    income: "₹30 LPA",
    horoscope: {
      rashi: "Simha (Leo)",
      nakshatra: "Magha",
      manglik: "Yes"
    },
    about: "Energetic, ambitious, and down-to-earth person. Passionate about startup ecosystems, traveling, and cooking. Looking for an independent woman who values communication and loves life.",
    avatar: AVATARS.groom_gold,
    premium: false,
    compatibilityScore: 88
  },
  {
    id: "p3",
    name: "Ananya Iyer",
    gender: "female",
    age: 25,
    height: "5'2\"",
    religion: "Hindu",
    community: "Iyer",
    motherTongue: "Tamil",
    city: "Chennai",
    state: "Tamil Nadu",
    education: "B.Des in Fashion Design",
    profession: "Creative Director",
    company: "Self-Employed / Studio",
    income: "₹15 LPA",
    horoscope: {
      rashi: "Tula (Libra)",
      nakshatra: "Swati",
      manglik: "No"
    },
    about: "Art enthusiast, trained classical singer, and free spirit. I love designing dresses and listening to Carnatic music. Seeking a supportive partner who understands arts and respects individuality.",
    avatar: AVATARS.bride_gold,
    premium: true,
    compatibilityScore: 95
  },
  {
    id: "p4",
    name: "Amit Patel",
    gender: "male",
    age: 29,
    height: "5'8\"",
    religion: "Hindu",
    community: "Vaishnav",
    motherTongue: "Gujarati",
    city: "Ahmedabad",
    state: "Gujarat",
    education: "M.Com",
    profession: "Business Owner",
    company: "Patel Textiles & Exports",
    income: "₹45 LPA",
    horoscope: {
      rashi: "Vrishabha (Taurus)",
      nakshatra: "Rohini",
      manglik: "No"
    },
    about: "Managing a family textile business. I am a vegetarian, family-first person who loves visiting heritage places. Seeking a warm-hearted girl who will comfortably integrate into our loving family.",
    avatar: AVATARS.groom_maroon,
    premium: false,
    compatibilityScore: 82
  },
  {
    id: "p5",
    name: "Dr. Sneha Reddy",
    gender: "female",
    age: 28,
    height: "5'6\"",
    religion: "Hindu",
    community: "Reddy",
    motherTongue: "Telugu",
    city: "Hyderabad",
    state: "Telangana",
    education: "MD in Pediatrics",
    profession: "Pediatrician",
    company: "Apollo Hospitals",
    income: "₹20 LPA",
    horoscope: {
      rashi: "Kanya (Virgo)",
      nakshatra: "Uttaraphalguni",
      manglik: "No"
    },
    about: "Dedicated doctor who loves kids. Outside of work, I enjoy playing badminton, playing keyboard, and reading fantasy fiction. Seeking an educated, progressive partner who understands a doctor's schedule.",
    avatar: AVATARS.bride_pink,
    premium: true,
    compatibilityScore: 90
  },
  {
    id: "p6",
    name: "Arjun Nair",
    gender: "male",
    age: 27,
    height: "6'0\"",
    religion: "Hindu",
    community: "Nair",
    motherTongue: "Malayalam",
    city: "Kochi",
    state: "Kerala",
    education: "B.Tech in Marine Eng.",
    profession: "Merchant Navy Officer",
    company: "Maersk Line",
    income: "₹36 LPA",
    horoscope: {
      rashi: "Vrishchik (Scorpio)",
      nakshatra: "Anuradha",
      manglik: "No"
    },
    about: "Officer sailing around the globe. When on land, I love photography, riding superbikes, and playing football. Looking for a confident partner who shares a love for travel, nature, and adventure.",
    avatar: AVATARS.groom_cream,
    premium: true,
    compatibilityScore: 85
  },
  {
    id: "p7",
    name: "Meera Sen",
    gender: "female",
    age: 27,
    height: "5'5\"",
    religion: "Hindu",
    community: "Kayastha",
    motherTongue: "Bengali",
    city: "Kolkata",
    state: "West Bengal",
    education: "Ph.D in Biotechnology",
    profession: "Research Scientist",
    company: "Biocon",
    income: "₹18 LPA",
    horoscope: {
      rashi: "Meen (Pisces)",
      nakshatra: "Revati",
      manglik: "No"
    },
    about: "Scientist with a love for Rabindra Sangeet, book cafes, and classic movies. Strongly believe in intellectual compatibility. Seeking an open-minded, educated partner who loves deep conversations.",
    avatar: AVATARS.bride_purple,
    premium: false,
    compatibilityScore: 89
  },
  {
    id: "p8",
    name: "Vikram Malhotra",
    gender: "male",
    age: 30,
    height: "5'10\"",
    religion: "Hindu",
    community: "Punjabi",
    motherTongue: "Hindi",
    city: "Bangalore",
    state: "Karnataka",
    education: "Chartered Accountant",
    profession: "Financial Analyst",
    company: "Goldman Sachs",
    income: "₹28 LPA",
    horoscope: {
      rashi: "Dhanu (Sagittarius)",
      nakshatra: "Mula",
      manglik: "Yes"
    },
    about: "A finance professional living in Bangalore. Love playing guitar, standard investments, and hosting weekend barbecues. Seeking a partner who is passionate, family-loving, and expressive.",
    avatar: AVATARS.groom_blue,
    premium: true,
    compatibilityScore: 86
  }
];

const MOCK_MESSAGES = {
  p1: [
    { sender: "p1", text: "Hi! Thanks for expressing interest. I liked your profile as well.", time: "10:30 AM" },
    { sender: "user", text: "Hello Priya, nice to connect with you! I read that you love hiking, where was your last trip?", time: "10:35 AM" },
    { sender: "p1", text: "My last trip was to Triund in Himachal. It was beautiful! Do you like trekking?", time: "10:37 AM" }
  ],
  p2: [
    { sender: "p2", text: "Hello there! Glad to connect. I see we have some common interests.", time: "Yesterday" }
  ],
  p3: [
    { sender: "p3", text: "Hi! I saw your profile and noticed you enjoy music too. I am currently working on a designer collection.", time: "3 Hours ago" }
  ]
};

const MOCK_AI_RESPONSES = {
  p1: [
    "Yes, I think outdoor activities are great for weekend escapes. Where have you hiked before?",
    "That sounds interesting! By the way, what are your professional goals for the near future?",
    "I completely agree. Family support is very important. Tell me more about your family.",
    "Haha, that's true! I'm glad we see eye-to-eye on this. Let's plan to speak on call sometime soon?"
  ],
  p2: [
    "Thanks for asking! I love cooking pasta and traditional Punjabi curries. What about you?",
    "Awesome. Product management is demanding but very rewarding. What kind of work do you do?",
    "I believe trust and communication are the pillars of marriage. What are your thoughts on that?",
    "Absolutely. I would love to connect with your family once we get to know each other better."
  ],
  p3: [
    "Thank you! Classical music gives me peace of mind after a busy day. What genres do you listen to?",
    "Design is all about expression. I'm glad you liked my work!",
    "That's lovely. I think we have matching creative wavelengths.",
    "Let me know if you want to meet up for coffee sometime since we both are based out of similar cities."
  ],
  p5: [
    "Being a pediatrician is tough but seeing kids smile makes it all worth it!",
    "Haha, yes, balancing night shifts is a challenge. That's why support is key.",
    "I enjoy playing keyboard in my free time, it is very therapeutic.",
    "That's wonderful to hear. I would love to know more about your lifestyle and values."
  ],
  p6: [
    "A life at sea is adventurous, but it makes you value your time at home much more.",
    "I travel a lot for work, but for leisure, I prefer quiet hill stations.",
    "Biking is my ultimate therapy! Do you ride too?",
    "Sounds great. I will be on land for the next two months, so let's connect!"
  ],
  p7: [
    "Biotechnology research holds the key to the future of healthcare.",
    "I'm currently reading a book on philosophy. Do you enjoy reading?",
    "Intellectual connection is very important for me. Glad you feel the same.",
    "Let's schedule a call this weekend if you are free."
  ],
  p8: [
    "Yes, Goldman Sachs is busy, but Bangalore has a great work-life balance.",
    "I play acoustic guitar, mostly classical rock and Bollywood songs.",
    "Managing finance is crucial for a secure future, indeed.",
    "I'm Manglik too, so it's good that we are compatible on that front!"
  ],
  p4: [
    "Our textile business is growing. We supply to major brands globally.",
    "Yes, being vegetarian is a personal choice for health and values.",
    "Family is everything to me. I live with my parents in Ahmedabad.",
    "Nice to hear that. Let's arrange a family meeting soon."
  ]
};

// Database class to manage data
class MatrimonyDB {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem("vivaham_profiles")) {
      localStorage.setItem("vivaham_profiles", JSON.stringify(INITIAL_PROFILES));
    }
    if (!localStorage.getItem("vivaham_shortlist")) {
      localStorage.setItem("vivaham_shortlist", JSON.stringify(["p3", "p5"]));
    }
    if (!localStorage.getItem("vivaham_interests")) {
      localStorage.setItem("vivaham_interests", JSON.stringify(["p1", "p3"]));
    }
    if (!localStorage.getItem("vivaham_chats")) {
      localStorage.setItem("vivaham_chats", JSON.stringify(MOCK_MESSAGES));
    }
    if (!localStorage.getItem("vivaham_notifications")) {
      const initialNotifications = [
        { id: "n1", type: "interest", profileId: "p1", message: "Priya Sharma expressed interest in your profile!", time: "2 hours ago", unread: true },
        { id: "n2", type: "accept", profileId: "p3", message: "Ananya Iyer accepted your interest request!", time: "1 day ago", unread: false },
        { id: "n3", type: "message", profileId: "p1", message: "New message from Priya Sharma", time: "10:37 AM", unread: true }
      ];
      localStorage.setItem("vivaham_notifications", JSON.stringify(initialNotifications));
    }
  }

  // Get logged-in user or guest
  getCurrentUser() {
    const user = localStorage.getItem("vivaham_user");
    if (user) {
      return JSON.parse(user);
    }
    // Return a default mock user for demonstration
    return {
      name: "Sathish Kumar",
      gender: "male",
      age: 27,
      height: "5'9\"",
      religion: "Hindu",
      community: "Kshatriya",
      motherTongue: "Tamil",
      city: "Chennai",
      state: "Tamil Nadu",
      education: "M.S. in Software Systems",
      profession: "Senior Engineer",
      income: "₹25 LPA",
      about: "Creative, tech-savvy, and family-oriented person. Love traveling and playing badminton.",
      avatar: AVATARS.groom_maroon,
      profileCompleteness: 85,
      rashi: "Mesha (Aries)",
      nakshatra: "Ashwini"
    };
  }

  saveCurrentUser(userData) {
    localStorage.setItem("vivaham_user", JSON.stringify(userData));
  }

  // Profiles
  getAllProfiles() {
    return JSON.parse(localStorage.getItem("vivaham_profiles"));
  }

  getProfileById(id) {
    const profiles = this.getAllProfiles();
    return profiles.find(p => p.id === id);
  }

  // Shortlists
  getShortlist() {
    return JSON.parse(localStorage.getItem("vivaham_shortlist")) || [];
  }

  toggleShortlist(id) {
    const list = this.getShortlist();
    const index = list.indexOf(id);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(id);
    }
    localStorage.setItem("vivaham_shortlist", JSON.stringify(list));
    return list.includes(id);
  }

  // Interests
  getInterests() {
    return JSON.parse(localStorage.getItem("vivaham_interests")) || [];
  }

  sendInterest(id) {
    const interests = this.getInterests();
    if (!interests.includes(id)) {
      interests.push(id);
      localStorage.setItem("vivaham_interests", JSON.stringify(interests));

      // Add a mock activity notification
      this.addNotification({
        type: "accept",
        profileId: id,
        message: `You expressed interest in ${this.getProfileById(id).name}'s profile.`,
        time: "Just now",
        unread: false
      });
      return true;
    }
    return false;
  }

  // Notifications
  getNotifications() {
    return JSON.parse(localStorage.getItem("vivaham_notifications")) || [];
  }

  addNotification(notif) {
    const notifs = this.getNotifications();
    notif.id = "notif_" + Date.now();
    notif.unread = true;
    notifs.unshift(notif);
    localStorage.setItem("vivaham_notifications", JSON.stringify(notifs));
    
    // Dispatch custom event to update header indicator if active
    window.dispatchEvent(new CustomEvent("vivaham_notification_added"));
  }

  markNotificationsRead() {
    const notifs = this.getNotifications();
    notifs.forEach(n => n.unread = false);
    localStorage.setItem("vivaham_notifications", JSON.stringify(notifs));
  }

  // Chats
  getChats() {
    return JSON.parse(localStorage.getItem("vivaham_chats")) || {};
  }

  getMessages(profileId) {
    const chats = this.getChats();
    return chats[profileId] || [];
  }

  sendMessage(profileId, text) {
    const chats = this.getChats();
    if (!chats[profileId]) {
      chats[profileId] = [];
    }

    const newMsg = {
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    chats[profileId].push(newMsg);
    localStorage.setItem("vivaham_chats", JSON.stringify(chats));

    // Trigger AI response simulation
    setTimeout(() => {
      this.simulateReply(profileId);
    }, 2000);

    return newMsg;
  }

  simulateReply(profileId) {
    const chats = this.getChats();
    const responses = MOCK_AI_RESPONSES[profileId] || [
      "Thanks for your message! Let's talk more soon.",
      "That is wonderful. I'd love to know your thoughts on this.",
      "How is your week going?"
    ];

    // Select response based on current message count or random
    const messageIndex = (chats[profileId].filter(m => m.sender === profileId).length) % responses.length;
    const replyText = responses[messageIndex];

    const replyMsg = {
      sender: profileId,
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    chats[profileId].push(replyMsg);
    localStorage.setItem("vivaham_chats", JSON.stringify(chats));

    // Add notification
    const profile = this.getProfileById(profileId);
    this.addNotification({
      type: "message",
      profileId: profileId,
      message: `New message from ${profile.name}: "${replyText.substring(0, 30)}..."`,
      time: "Just now",
      unread: true
    });

    // Dispatch custom event to notify chat UI or toast
    window.dispatchEvent(new CustomEvent("vivaham_chat_received", { detail: { profileId, message: replyMsg } }));
  }
}

// Export database instance
window.db = new MatrimonyDB();
