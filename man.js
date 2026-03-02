/* ============================================================
   BU Social — Main JavaScript
   Babcock University Social Media Platform
   ============================================================ */

// ===== STATE =====
let currentUser = { name: '', handle: '', initials: '', dept: '', color: '' };
let selectedDept = null;
let posts = [];
let followState = {};

// ===== DATA: DEPARTMENTS =====
const departments = [
  { id: 'cs',          name: 'Computer Science',         faculty: 'Computing & Engineering Sciences', icon: '💻', color: '#1565c0' },
  { id: 'medicine',    name: 'Medicine & Surgery',       faculty: 'Basic Medical Sciences',           icon: '🩺', color: '#c62828' },
  { id: 'law',         name: 'Law',                      faculty: 'Law',                              icon: '⚖️', color: '#4a148c' },
  { id: 'masscomm',    name: 'Mass Communication',       faculty: 'Communication & Media Studies',    icon: '📡', color: '#1b5e20' },
  { id: 'accounting',  name: 'Accounting',               faculty: 'Management Sciences',              icon: '📊', color: '#e65100' },
  { id: 'nursing',     name: 'Nursing',                  faculty: 'Nursing Sciences',                 icon: '💊', color: '#880e4f' },
  { id: 'biochem',     name: 'Biochemistry',             faculty: 'Basic Medical Sciences',           icon: '🔬', color: '#006064' },
  { id: 'engineering', name: 'Electrical Engineering',   faculty: 'Computing & Engineering Sciences', icon: '⚡', color: '#f57f17' },
  { id: 'psychology',  name: 'Psychology',               faculty: 'Social & Management Sciences',     icon: '🧠', color: '#4527a0' },
  { id: 'business',    name: 'Business Administration',  faculty: 'Management Sciences',              icon: '💼', color: '#bf360c' },
  { id: 'english',     name: 'English & Literary Studies', faculty: 'Humanities',                    icon: '📚', color: '#2e7d32' },
  { id: 'theology',    name: 'Theology',                 faculty: 'Theology',                         icon: '✝️', color: '#1a237e' },
];

// ===== DATA: RECOMMENDATIONS PER DEPARTMENT =====
const recommendations = {
  cs: [
    { icon: '💻', name: 'BU Tech Hub',         desc: 'Programming resources, hackathons & CS job alerts',       badge: 'Community' },
    { icon: '🤖', name: 'AI/ML Study Group',   desc: 'Explore machine learning with fellow students',           badge: 'Group'     },
    { icon: '🌐', name: 'Web Dev Babcock',      desc: 'Full-stack projects & open source collabs',              badge: 'Community' },
    { icon: '☁️', name: 'Cloud Computing Club', desc: 'AWS, Azure & GCP learning resources',                    badge: 'Club'      },
  ],
  medicine: [
    { icon: '🩺', name: 'BU Medical Forum',     desc: 'Case studies, exams prep & clinical tips',               badge: 'Community' },
    { icon: '📋', name: 'Anatomy Study Circle', desc: 'Weekly anatomy review sessions',                         badge: 'Group'     },
    { icon: '🏥', name: 'BU Teaching Hospital', desc: 'Clinical updates from BABCOCK Teaching Hospital',        badge: 'Official'  },
    { icon: '💊', name: 'Pharmacology Notes',   desc: 'Shared lecture notes & mnemonics',                       badge: 'Resource'  },
  ],
  law: [
    { icon: '⚖️', name: 'Babcock Law Review',   desc: 'Legal essays, moot court prep & case law',              badge: 'Journal'   },
    { icon: '🏛️', name: 'Law Students Society', desc: 'Events, internships & networking',                       badge: 'Society'   },
    { icon: '📜', name: 'Human Rights Club',    desc: 'Advocacy, seminars & legal clinics',                     badge: 'Club'      },
    { icon: '🔍', name: 'Legal Research Group', desc: 'Collaborative research & mock trials',                   badge: 'Group'     },
  ],
  masscomm: [
    { icon: '📡', name: 'Babcock FM',           desc: 'Campus radio station news & updates',                    badge: 'Official'  },
    { icon: '🎥', name: 'BU Film Society',      desc: 'Screenings, filmmaking workshops & critiques',           badge: 'Society'   },
    { icon: '📰', name: 'The Ignite Magazine',  desc: 'Student-run campus newspaper',                           badge: 'Media'     },
    { icon: '📸', name: 'BU Photography Club',  desc: 'Photography tips & campus photo essays',                 badge: 'Club'      },
  ],
  accounting: [
    { icon: '📊', name: 'BU Finance Hub',       desc: 'ICAN prep resources & financial news',                   badge: 'Resource'  },
    { icon: '🧾', name: 'Accounting Study Group', desc: 'Past questions, tutorials & exam tips',                badge: 'Group'     },
    { icon: '💹', name: 'BU Investment Club',   desc: 'Personal finance & stock market education',              badge: 'Club'      },
    { icon: '🏦', name: 'ACCA Resource Bank',   desc: 'ACCA materials for Babcock students',                    badge: 'Resource'  },
  ],
  nursing: [
    { icon: '💊', name: 'BU Nursing Community', desc: 'Clinical skills, exams prep & nursing news',             badge: 'Community' },
    { icon: '🫀', name: 'Anatomy Nursing Group', desc: 'Practical anatomy tips for nurses',                     badge: 'Group'     },
    { icon: '📋', name: 'Care Plan Hub',        desc: 'Templates & guides for nursing care plans',              badge: 'Resource'  },
    { icon: '🩹', name: 'First Aid & Skills Lab', desc: 'Practical skills practice schedule',                   badge: 'Lab'       },
  ],
  biochem: [
    { icon: '🔬', name: 'BU Science Society',   desc: 'Lab techniques, research & seminar alerts',              badge: 'Society'   },
    { icon: '🧪', name: 'Biochemistry Forum',   desc: 'Metabolic pathways, MCQ practice & notes',              badge: 'Community' },
    { icon: '🧬', name: 'Genetics Study Circle', desc: 'Weekly genetics problem-solving sessions',              badge: 'Group'     },
    { icon: '🏆', name: 'Research Opportunities', desc: 'Undergraduate research positions & grants',            badge: 'Opportunity' },
  ],
  engineering: [
    { icon: '⚡', name: 'EEE Society Babcock',  desc: 'Project showcase, competitions & workshops',             badge: 'Society'   },
    { icon: '🔧', name: 'Engineering Lab',      desc: 'Lab schedules, projects & equipment tips',               badge: 'Official'  },
    { icon: '🤖', name: 'Robotics Club BU',     desc: 'Build robots and compete nationally',                    badge: 'Club'      },
    { icon: '📐', name: 'STEM Study Hub',       desc: 'Math, physics & circuit problem-solving',                badge: 'Resource'  },
  ],
  psychology: [
    { icon: '🧠', name: 'BU Psychology Society', desc: 'Research, clinical placements & seminars',              badge: 'Society'   },
    { icon: '💬', name: 'Counselling & Wellness', desc: 'Mental health resources on campus',                    badge: 'Wellness'  },
    { icon: '📖', name: 'Abnormal Psych Group', desc: 'DSM-5 study sessions & case discussions',                badge: 'Group'     },
    { icon: '🎯', name: 'Behavioural Research Lab', desc: 'Undergraduate research in psychology',               badge: 'Research'  },
  ],
  business: [
    { icon: '💼', name: 'BU Business Society',  desc: 'Entrepreneurship, networking & case comps',              badge: 'Society'   },
    { icon: '🚀', name: 'Startup Hub Babcock',  desc: 'Launch your idea with BU entrepreneurs',                 badge: 'Incubator' },
    { icon: '📈', name: 'Marketing Forum',      desc: 'Digital marketing, branding & business tips',            badge: 'Community' },
    { icon: '🌍', name: 'HR & Management Circle', desc: 'Career tips, internship & management skills',          badge: 'Group'     },
  ],
  english: [
    { icon: '📚', name: 'BU Literary Society',  desc: 'Poetry slams, book clubs & creative writing',            badge: 'Society'   },
    { icon: '✍️', name: 'Creative Writing Hub', desc: 'Share your writing & get feedback',                      badge: 'Community' },
    { icon: '🎭', name: 'Drama & Theatre Club', desc: 'Performances, scripts & audition alerts',                badge: 'Club'      },
    { icon: '🗣️', name: 'Debate & Public Speaking', desc: 'Sharpen your oratory & argumentation skills',       badge: 'Club'      },
  ],
  theology: [
    { icon: '✝️', name: 'Theology Students Forum', desc: 'Exegesis, church history & theology discussions',     badge: 'Community' },
    { icon: '📖', name: 'Bible Study Group',    desc: 'In-depth weekly scripture study sessions',               badge: 'Group'     },
    { icon: '🕊️', name: 'Campus Chaplaincy',   desc: 'Chapel programs, counselling & prayer',                  badge: 'Official'  },
    { icon: '🌍', name: 'Mission & Evangelism Club', desc: 'Campus outreach & global missions',                 badge: 'Club'      },
  ],
};

// ===== DATA: SEED POSTS =====
const seedPosts = [
  {
    id: 1, name: 'Ngozi Eze', handle: 'ngozi_eze', initials: 'NE',
    color: '#c62828', dept: 'Medicine', verified: true,
    text: 'Just finished my anatomy practical! The human body is absolutely incredible 🧬 Every system is so elegantly designed. Never stops amazing me. #MedLife #BabcockMedical',
    time: '15m', likes: 142, retweets: 23, comments: 18, liked: false, retweeted: false, bookmarked: false,
  },
  {
    id: 2, name: 'Adaeze Nwosu', handle: 'ada_nwosu', initials: 'AN',
    color: '#1565c0', dept: 'Computer Science', verified: false,
    text: 'Our CS department just got new MacBook Pros for the lab! Finally can run proper ML models 💻🔥 @BabcockUniversity really investing in us! #BabcockCS #TechLife',
    time: '45m', likes: 89, retweets: 31, comments: 12, liked: true, retweeted: false, bookmarked: false,
  },
  {
    id: 3, name: 'Tunde Adeyemi', handle: 'tunde_a', initials: 'TA',
    color: '#4a148c', dept: 'Law', verified: false,
    text: 'Student Union meeting was 🔥 today. Big announcements coming for the campus social calendar. Mark your calendars, people! 📢 #BabcockSU #CampusLife',
    time: '1h', likes: 205, retweets: 67, comments: 43, liked: false, retweeted: true, bookmarked: true,
  },
  {
    id: 4, name: 'Babcock University', handle: 'BabcockUniversity', initials: 'BU',
    color: '#1565c0', dept: 'Official', verified: true,
    text: '🎓 Congratulations to all our final year students who successfully defended their projects this week! Your dedication and excellence reflect the Babcock spirit. The future is bright! ✨ #BabcockProud #Convocation2025',
    time: '2h', likes: 1240, retweets: 312, comments: 156, liked: false, retweeted: false, bookmarked: false,
  },
  {
    id: 5, name: 'Chinaza Okoye', handle: 'chinaza_ok', initials: 'CO',
    color: '#006064', dept: 'Biochemistry', verified: false,
    text: "Pro tip for Babcock freshers: Always keep your ID card AND clearance docs handy. Trust me, you'll need them more than your lecture notes some days 😅 #BabcockLife #FresherTips",
    time: '3h', likes: 312, retweets: 89, comments: 56, liked: false, retweeted: false, bookmarked: false,
  },
  {
    id: 6, name: 'Babcock FM', handle: 'BabcockFM', initials: '📻',
    color: '#1b5e20', dept: 'Media', verified: true,
    text: '🎙️ Tonight on BU Social Hour at 8PM: We talk campus life, mental health & the upcoming inter-faculty debate. Tune in at 88.9FM or stream on our app! #BabcockFM #CampusRadio',
    time: '4h', likes: 178, retweets: 54, comments: 27, liked: false, retweeted: false, bookmarked: false,
  },
];

// ===== DATA: WHO TO FOLLOW =====
const whoToFollow = [
  { initials: 'BU', name: 'Babcock Official',  handle: '@BabcockUniversity', color: '#1565c0' },
  { initials: '📻', name: 'Babcock FM',         handle: '@BabcockFM',         color: '#1b5e20' },
  { initials: 'SU', name: 'Student Union',      handle: '@BUStuUnion',        color: '#4a148c' },
  { initials: '⚽', name: 'BU Sports Club',     handle: '@BabcockSports',     color: '#c62828' },
];

// ===== REFRESH FEED =====
const newPostsPool = [
  { name: 'BU Student Affairs', handle: 'BUStudentAffairs', initials: 'SA', color: '#1565c0', dept: 'Official', verified: true,  text: '📣 Reminder: Chapel attendance is compulsory this Wednesday. Theme: Excellence in All Things. See you there! #BabcockChapel' },
  { name: 'Emeka Obi',          handle: 'emeka_obi',       initials: 'EO', color: '#4a148c', dept: 'Mass Communication', verified: false, text: 'Just submitted my final year project! 4 years of hard work in 80 pages 😅📄 God is faithful. #FYP #MassComm #BabcockUniversity' },
  { name: 'BU Cafeteria',       handle: 'BUCafeteria',     initials: '🍽️', color: '#2e7d32', dept: 'Campus',  verified: true,  text: "Today's special: Jollof rice + chicken + plantain 🍛🔥 Come early before it finishes! Open 7AM–8PM. #CampusBites" },
  { name: 'Amaka Eze',          handle: 'amaka_eze22',     initials: 'AE', color: '#880e4f', dept: 'Nursing', verified: false, text: 'Night shift study session in the library just hit different 🌙📚 Shoutout to everyone grinding right now. You got this! #NursingLife' },
  { name: 'BU Sports Club',     handle: 'BabcockSports',   initials: '⚽', color: '#c62828', dept: 'Sports',  verified: true,  text: '🏆 Inter-faculty football final this Saturday 4PM at the sports complex. CS vs Medicine. Who are you rooting for? #BabcockFC' },
  { name: 'Chidi Nwosu',        handle: 'chidi_nwosu',     initials: 'CN', color: '#006064', dept: 'Computer Science', verified: false, text: 'Hot take: Babcock Wi-Fi is actually decent if you connect between 5–7AM 😂 Certified early bird trick. #BabcockCS #CampusLife' },
  { name: 'BU Library',         handle: 'BULibrary',       initials: '📖', color: '#1b5e20', dept: 'Academic', verified: true, text: '📚 New journals and textbooks now available on the e-library portal. Log in with your matric number. #BabcockLibrary' },
];

let poolIndex = 0;
let pendingNewPosts = [];

function checkForNewPosts() {
  // Simulate new posts arriving every 30 seconds
  const post = newPostsPool[poolIndex % newPostsPool.length];
  poolIndex++;
  pendingNewPosts.unshift({
    ...post,
    id: Date.now() + Math.random(),
    time: 'just now',
    likes: Math.floor(Math.random() * 40),
    retweets: Math.floor(Math.random() * 10),
    comments: Math.floor(Math.random() * 8),
    liked: false, retweeted: false, bookmarked: false,
  });
  showNewPostsBanner();
}

function showNewPostsBanner() {
  // Remove existing banner first
  const existing = document.getElementById('newPostsBanner');
  if (existing) existing.remove();

  const count = pendingNewPosts.length;
  const banner = document.createElement('div');
  banner.id = 'newPostsBanner';
  banner.className = 'new-posts-toast';
  banner.textContent = `↑ ${count} new post${count > 1 ? 's' : ''} — click to load`;
  banner.onclick = loadNewPosts;

  const feedPosts = document.getElementById('feedPosts');
  feedPosts.parentElement.insertBefore(banner, feedPosts);
}

function loadNewPosts() {
  // Remove banner
  const banner = document.getElementById('newPostsBanner');
  if (banner) banner.remove();

  // Prepend new posts to feed and state
  const container = document.getElementById('feedPosts');
  pendingNewPosts.forEach((post, i) => {
    posts.unshift(post);
    const el = createPostElement(post, i);
    el.style.animationDelay = `${i * 0.08}s`;
    container.insertBefore(el, container.firstChild);
  });
  pendingNewPosts = [];

  // Scroll to top smoothly
  container.parentElement.scrollTo({ top: 0, behavior: 'smooth' });
}

function refreshFeed() {
  const icon = document.getElementById('refreshIcon');
  const text = document.getElementById('refreshText');

  icon.classList.add('spinning');
  text.textContent = 'Refreshing…';

  setTimeout(() => {
    icon.classList.remove('spinning');
    text.textContent = 'Pull to refresh';

    // Load any pending posts, or add a fresh one
    if (pendingNewPosts.length > 0) {
      loadNewPosts();
    } else {
      checkForNewPosts();
      loadNewPosts();
    }
    showToast('Feed refreshed! ✓');
  }, 1000);
}

// Auto-check for new posts every 30 seconds once logged in
function startNewPostsInterval() {
  setInterval(checkForNewPosts, 30000);
}

// ===== AUTH FUNCTIONS =====
function doLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pw    = document.getElementById('loginPassword').value;
  if (!email || !pw) { alert('Please fill in all fields'); return; }
  const rawName = email.split('@')[0].replace(/[._]/g, ' ');
  const name = rawName.replace(/\b\w/g, c => c.toUpperCase());
  setupUser(name);
  showCourseScreen();
}

function doSignup() {
  const name   = document.getElementById('signupName').value.trim();
  const matric = document.getElementById('signupMatric').value.trim();
  const email  = document.getElementById('signupEmail').value.trim();
  const pw     = document.getElementById('signupPassword').value;
  if (!name || !email || !pw) { alert('Please fill in all required fields'); return; }
  setupUser(name);
  showCourseScreen();
}

function setupUser(name) {
  const words    = name.trim().split(' ');
  const initials = words.length >= 2
    ? words[0][0] + words[words.length - 1][0]
    : words[0].slice(0, 2);
  const handle = name.toLowerCase().replace(/\s+/g, '_') + Math.floor(Math.random() * 99);
  currentUser  = { name, handle, initials: initials.toUpperCase(), dept: '', color: '#1565c0' };
}

// ===== SLIDE PANEL CONTROLS =====
function slideOpenPanel(form) {
  document.getElementById('slidePanel').classList.add('open');
  document.getElementById('scrollHint').style.opacity = '0';
  switchSlideForm(form);
}

function slideClosePanel() {
  document.getElementById('slidePanel').classList.remove('open');
  setTimeout(() => { document.getElementById('scrollHint').style.opacity = '1'; }, 400);
}

function switchSlideForm(form) {
  document.getElementById('loginForm').classList.toggle('hidden', form !== 'login');
  document.getElementById('signupForm').classList.toggle('hidden', form !== 'signup');
}

// Keep old showLogin/showSignup wired up in case called from elsewhere
function showLogin()  { switchSlideForm('login'); }
function showSignup() { switchSlideForm('signup'); }

function showCourseScreen() {
  const wrapper = document.getElementById('authWrapper');
  wrapper.style.transition = 'opacity 0.4s ease';
  wrapper.style.opacity = '0';
  setTimeout(() => {
    wrapper.style.display = 'none';
    document.getElementById('courseScreen').classList.remove('hidden');
    buildDeptGrid();
  }, 400);
}

// ===== COURSE SELECTION =====
function buildDeptGrid() {
  const grid = document.getElementById('deptGrid');
  grid.innerHTML = '';
  departments.forEach(dept => {
    const card = document.createElement('div');
    card.className = 'dept-card';
    card.id = 'dept-' + dept.id;
    card.onclick = () => selectDept(dept);
    card.innerHTML = `
      <div class="dept-check">✓</div>
      <div class="dept-icon">${dept.icon}</div>
      <div class="dept-name">${dept.name}</div>
      <div class="dept-faculty">${dept.faculty}</div>
    `;
    grid.appendChild(card);
  });
}

function selectDept(dept) {
  // Deselect previous
  if (selectedDept) {
    document.getElementById('dept-' + selectedDept.id)?.classList.remove('selected');
  }
  selectedDept = dept;
  document.getElementById('dept-' + dept.id).classList.add('selected');
  document.getElementById('continueBtn').classList.add('active');
}

function finishCourseSelection() {
  if (!selectedDept) return;
  currentUser.dept  = selectedDept.name;
  currentUser.color = selectedDept.color;
  document.getElementById('courseScreen').classList.add('hidden');
  launchApp();
}

// ===== APP LAUNCH =====
function launchApp() {
  posts = JSON.parse(JSON.stringify(seedPosts)); // deep copy

  const app = document.getElementById('app');
  app.classList.add('visible');

  // Set user info
  document.getElementById('sidebarAvatar').textContent   = currentUser.initials;
  document.getElementById('sidebarAvatar').style.background = `linear-gradient(135deg, ${currentUser.color}, #1e88e5)`;
  document.getElementById('sidebarName').textContent     = currentUser.name;
  document.getElementById('sidebarHandle').textContent   = '@' + currentUser.handle;
  document.getElementById('composeAvatar').textContent   = currentUser.initials;
  document.getElementById('composeAvatar').style.background = `linear-gradient(135deg, ${currentUser.color}, #1e88e5)`;
  document.getElementById('modalAvatar').textContent     = currentUser.initials;
  document.getElementById('modalAvatar').style.background   = `linear-gradient(135deg, ${currentUser.color}, #1e88e5)`;

  renderFeed();
  renderRecommendations();
  renderWhoToFollow();
   startNewPostsInterval():
}

// ===== FEED RENDERING =====
function renderFeed() {
  const container = document.getElementById('feedPosts');
  container.innerHTML = '';
  posts.forEach((post, index) => {
    const el = createPostElement(post, index);
    container.appendChild(el);
  });
}

function createPostElement(post, index) {
  const div = document.createElement('div');
  div.className = 'post-card';
  div.style.animationDelay = `${index * 0.06}s`;

  const formattedText = post.text
    .replace(/#(\w+)/g, '<span class="hashtag">#$1</span>')
    .replace(/@(\w+)/g, '<span class="mention">@$1</span>');

  div.innerHTML = `
    <div class="post-avatar" style="background: ${post.color}">${post.initials}</div>
    <div class="post-body">
      <div class="post-header">
        <span class="post-name">${post.name}</span>
        ${post.verified ? '<span class="verified-badge">✓ BU Verified</span>' : ''}
        <span class="post-handle">@${post.handle}</span>
        <span class="post-time">${post.time}</span>
      </div>
      <div class="post-tag">${post.dept}</div>
      <div class="post-text">${formattedText}</div>
      <div class="post-actions">
        <button class="action-btn" onclick="commentPost(event, ${post.id})">
          <span class="action-icon">💬</span> ${post.comments}
        </button>
        <button class="action-btn ${post.retweeted ? 'retweeted' : ''}" id="rt-${post.id}" onclick="toggleRetweet(event, ${post.id})">
          <span class="action-icon">🔁</span>
          <span id="rt-count-${post.id}">${post.retweets}</span>
        </button>
        <button class="action-btn ${post.liked ? 'liked' : ''}" id="like-${post.id}" onclick="toggleLike(event, ${post.id})">
          <span class="action-icon">${post.liked ? '❤️' : '🤍'}</span>
          <span id="like-count-${post.id}">${post.likes}</span>
        </button>
        <button class="action-btn ${post.bookmarked ? 'bookmarked' : ''}" id="bm-${post.id}" onclick="toggleBookmark(event, ${post.id})">
          <span class="action-icon">${post.bookmarked ? '🔖' : '🏷️'}</span>
        </button>
        <button class="action-btn" onclick="sharePost(event, ${post.id})">
          <span class="action-icon">↗️</span>
        </button>
      </div>
    </div>
  `;
  return div;
}

// ===== POST INTERACTIONS =====
function toggleLike(event, postId) {
  event.stopPropagation();
  const post = posts.find(p => p.id === postId);
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;

  const btn = document.getElementById('like-' + postId);
  const count = document.getElementById('like-count-' + postId);
  btn.className = 'action-btn ' + (post.liked ? 'liked' : '');
  btn.querySelector('.action-icon').textContent = post.liked ? '❤️' : '🤍';
  count.textContent = post.likes;

  // Micro-animation
  btn.style.transform = 'scale(1.3)';
  setTimeout(() => btn.style.transform = 'scale(1)', 200);
}

function toggleRetweet(event, postId) {
  event.stopPropagation();
  const post = posts.find(p => p.id === postId);
  if (!post) return;
  post.retweeted = !post.retweeted;
  post.retweets += post.retweeted ? 1 : -1;

  const btn = document.getElementById('rt-' + postId);
  const count = document.getElementById('rt-count-' + postId);
  btn.className = 'action-btn ' + (post.retweeted ? 'retweeted' : '');
  count.textContent = post.retweets;

  btn.style.transform = 'scale(1.3)';
  setTimeout(() => btn.style.transform = 'scale(1)', 200);
}

function toggleBookmark(event, postId) {
  event.stopPropagation();
  const post = posts.find(p => p.id === postId);
  if (!post) return;
  post.bookmarked = !post.bookmarked;
  const btn = document.getElementById('bm-' + postId);
  btn.className = 'action-btn ' + (post.bookmarked ? 'bookmarked' : '');
  btn.querySelector('.action-icon').textContent = post.bookmarked ? '🔖' : '🏷️';

  btn.style.transform = 'scale(1.3)';
  setTimeout(() => btn.style.transform = 'scale(1)', 200);
}

function commentPost(event, postId) {
  event.stopPropagation();
  openModal();
  document.getElementById('modalTextarea').placeholder = 'Post your reply...';
}

function sharePost(event, postId) {
  event.stopPropagation();
  const post = posts.find(p => p.id === postId);
  if (!post) return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(`${post.text} — shared from BU Social`);
    showToast('Link copied to clipboard!');
  }
}

// ===== COMPOSE & POST =====
function submitPost() {
  const input = document.getElementById('composeInput');
  const text  = input.value.trim();
  if (!text) return;
  publishPost(text);
  input.value = '';
}

function submitModalPost() {
  const input = document.getElementById('modalTextarea');
  const text  = input.value.trim();
  if (!text) return;
  publishPost(text);
  input.value = '';
  document.getElementById('modalCharCount').textContent = '280';
  closeModal();
}

function publishPost(text) {
  const newPost = {
    id: Date.now(),
    name:       currentUser.name,
    handle:     currentUser.handle,
    initials:   currentUser.initials,
    color:      currentUser.color,
    dept:       currentUser.dept || 'Student',
    verified:   false,
    text:       text,
    time:       'just now',
    likes:      0,
    retweets:   0,
    comments:   0,
    liked:      false,
    retweeted:  false,
    bookmarked: false,
  };
  posts.unshift(newPost);
  const container = document.getElementById('feedPosts');
  const el = createPostElement(newPost, 0);
  el.style.animationDelay = '0s';
  container.insertBefore(el, container.firstChild);
  showToast('Your post is live! 🚀');
}

// ===== CHARACTER COUNT =====
function updateCharCount() {
  const input = document.getElementById('composeInput');
  const remaining = 280 - input.value.length;
  // Could add a counter display if needed
}

function updateModalChar() {
  const input   = document.getElementById('modalTextarea');
  const counter = document.getElementById('modalCharCount');
  const remaining = 280 - input.value.length;
  counter.textContent = remaining;
  counter.className = 'char-count' + (remaining < 20 ? ' warning' : '');
}

// ===== MODAL =====
function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
  setTimeout(() => document.getElementById('modalTextarea').focus(), 100);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

// ===== NAV TABS =====
function switchTab(tab, btn) {
  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
  btn.classList.add('active');
  document.querySelector('.feed-title').textContent =
    tab === 'home'          ? 'Home'          :
    tab === 'explore'       ? 'Explore'       :
    tab === 'notifications' ? 'Notifications' :
    tab === 'messages'      ? 'Messages'      :
    tab === 'bookmarks'     ? 'Bookmarks'     :
    tab === 'profile'       ? 'Profile'       : 'Home';

  if (tab === 'bookmarks') {
    const bookmarked = posts.filter(p => p.bookmarked);
    const container = document.getElementById('feedPosts');
    container.innerHTML = '';
    if (bookmarked.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:60px 20px;color:var(--text-muted)">
          <div style="font-size:48px;margin-bottom:16px">🔖</div>
          <div style="font-family:'Sora',sans-serif;font-size:20px;font-weight:700;color:var(--text-primary);margin-bottom:8px">No bookmarks yet</div>
          <div>Posts you bookmark will appear here</div>
        </div>`;
    } else {
      bookmarked.forEach((post, i) => container.appendChild(createPostElement(post, i)));
    }
  } else if (tab === 'home') {
    renderFeed();
  } else if (tab === 'profile') {
    showProfile();
  } else {
    renderFeed();
  }
}

function showProfile() {
  const container = document.getElementById('feedPosts');
  const userPosts = posts.filter(p => p.handle === currentUser.handle);
  container.innerHTML = `
    <div style="background:linear-gradient(135deg,${currentUser.color},#1e88e5);height:140px;"></div>
    <div style="padding:16px 20px;border-bottom:1px solid var(--border);background:var(--white)">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:-50px;margin-bottom:16px">
        <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,${currentUser.color},#1e88e5);display:flex;align-items:center;justify-content:center;font-family:Sora,sans-serif;font-weight:800;font-size:28px;color:#fff;border:4px solid #fff">${currentUser.initials}</div>
        <button style="border:2px solid var(--blue-primary);border-radius:20px;padding:8px 20px;background:none;color:var(--blue-primary);font-family:Sora,sans-serif;font-weight:700;cursor:pointer">Edit Profile</button>
      </div>
      <div style="font-family:Sora,sans-serif;font-size:20px;font-weight:800;color:var(--text-primary)">${currentUser.name}</div>
      <div style="color:var(--text-muted);font-size:14px;margin-bottom:8px">@${currentUser.handle}</div>
      <div style="display:inline-block;background:var(--blue-ultra);color:var(--blue-primary);font-size:12px;font-weight:700;padding:4px 12px;border-radius:20px;margin-bottom:12px">📚 ${currentUser.dept || 'Babcock Student'}</div>
      <div style="display:flex;gap:20px;color:var(--text-muted);font-size:14px">
        <span><strong style="color:var(--text-primary)">${userPosts.length}</strong> Posts</span>
        <span><strong style="color:var(--text-primary)">0</strong> Following</span>
        <span><strong style="color:var(--text-primary)">0</strong> Followers</span>
      </div>
    </div>
  `;
  userPosts.forEach((post, i) => container.appendChild(createPostElement(post, i)));
  if (userPosts.length === 0) {
    container.innerHTML += `
      <div style="text-align:center;padding:60px 20px;color:var(--text-muted)">
        <div style="font-size:48px;margin-bottom:16px">✍️</div>
        <div style="font-size:18px;font-weight:700;color:var(--text-primary);margin-bottom:8px">No posts yet</div>
        <div>Share what's happening on campus!</div>
      </div>`;
  }
}

// ===== RECOMMENDATIONS =====
function renderRecommendations() {
  const widget = document.getElementById('recoWidget');
  const list   = document.getElementById('recoList');
  const recos  = recommendations[selectedDept?.id];
  if (!recos) { widget.style.display = 'none'; return; }

  widget.style.display = 'block';
  document.querySelector('#recoWidget .widget-title').textContent = `✨ For ${selectedDept.icon} ${selectedDept.name}`;
  list.innerHTML = '';
  recos.forEach(reco => {
    const card = document.createElement('div');
    card.className = 'reco-card';
    card.innerHTML = `
      <div class="reco-icon">${reco.icon}</div>
      <div class="reco-info">
        <div class="reco-name">${reco.name}</div>
        <div class="reco-desc">${reco.desc}</div>
      </div>
      <span class="reco-badge">${reco.badge}</span>
    `;
    list.appendChild(card);
  });
}

// ===== WHO TO FOLLOW =====
function renderWhoToFollow() {
  const list = document.getElementById('followList');
  list.innerHTML = '';
  whoToFollow.forEach(person => {
    const card = document.createElement('div');
    card.className = 'follow-card';
    const btnId = 'follow-' + person.handle.replace('@', '');
    card.innerHTML = `
      <div class="follow-avatar" style="background:${person.color}">${person.initials}</div>
      <div>
        <div class="follow-name">${person.name}</div>
        <div class="follow-handle">${person.handle}</div>
      </div>
      <button class="follow-btn" id="${btnId}" onclick="toggleFollow('${btnId}')">Follow</button>
    `;
    list.appendChild(card);
  });
}
function toggleFollow(btnId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  const isFollowing = btn.classList.contains('following');
  btn.classList.toggle('following');
  btn.textContent = isFollowing ? 'Follow' : 'Following';
  if (!isFollowing) showToast('Following! 🎉');
}

// ===== FEED TABS =====
function switchFeedTab(btn) {
  document.querySelectorAll('.feed-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
  // Remove existing toast
  const existing = document.getElementById('buToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'buToast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '32px', left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: 'var(--blue-primary)',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '30px',
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: '600',
    fontSize: '15px',
    zIndex: '9999',
    boxShadow: '0 8px 24px rgba(21,101,192,0.4)',
    transition: 'all 0.3s ease',
    opacity: '0',
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ===== DARK MODE TOGGLE =====
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  const thumb  = document.getElementById('toggleThumb');
  thumb.textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('buSocialTheme', isDark ? 'dark' : 'light');
}

// Apply saved theme on load
(function applyTheme() {
  const saved = localStorage.getItem('buSocialTheme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
    document.addEventListener('DOMContentLoaded', () => {
      const thumb = document.getElementById('toggleThumb');
      if (thumb) thumb.textContent = '🌙';
    });
  }
})();

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    slideClosePanel();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    if (document.getElementById('modalOverlay').classList.contains('open')) {
      submitModalPost();
    }
  }
});

// ===== ENTER KEY ON AUTH FORMS =====
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginPassword')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doLogin();
  });
  document.getElementById('signupPassword')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSignup();
  });

  // Touch swipe-down to close slide panel
  const panel = document.getElementById('slidePanel');
  let touchStartY = 0;
  panel?.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  panel?.addEventListener('touchend', (e) => {
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (dy > 80 && panel.scrollTop === 0) slideClosePanel();
  }, { passive: true });

});
