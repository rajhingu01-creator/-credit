// 1. Loading Screen Hide
window.onload = function () {
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => document.getElementById('loader').style.display = 'none', 500);
    }, 1500);
};

// 2. Scroll Progress Bar
window.onscroll = function () {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
};

// 3. Shop Status (Open/Close Logic) - Fixed Background Colors
let hr = new Date().getHours();
let statusEl = document.getElementById('shopStatus');
if ((hr >= 8 && hr < 12) || (hr >= 15 && hr < 20)) {
    statusEl.innerHTML = "<i class='fa-solid fa-door-open'></i> અત્યારે Office ( ઓફિસ ) ચાલુ છે";
    statusEl.style.background = "#10b981"; // પાક્કો લીલો કલર
    statusEl.style.border = "2px solid #ffffff";
} else {
    statusEl.innerHTML = "<i class='fa-solid fa-door-closed'></i> અત્યારે Office ( ઓફિસ ) બંધ છે";
    statusEl.style.background = "#e3342f"; // પાક્કો લાલ કલર
    statusEl.style.border = "2px solid #ffffff";
}

// 4. Auto Typing
const words = [" 💻 ઓનલાઇન સેવાઓનું વિશ્વાસપાત્ર કેન્દ્ર"];
let i = 0, j = 0, isDeleting = false;
function typeText() {
    let text = words[i];
    document.getElementById('typingText').innerText = text.substring(0, j) + "|";
    if (!isDeleting && j === text.length) { isDeleting = true; setTimeout(typeText, 3000); return; }
    if (isDeleting && j === 0) { isDeleting = false; i = (i + 1) % words.length; }
    j += isDeleting ? -1 : 1;
    setTimeout(typeText, isDeleting ? 30 : 100);
}
typeText();

// 5. Category Tabs Filter
function filterCategory(cat, btn) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    let cards = document.getElementsByClassName('service-card');
    for (let i = 0; i < cards.length; i++) {
        let c = cards[i].getAttribute('data-category');
        cards[i].style.display = (cat === 'all' || c === cat) ? "" : "none";
    }
}

// 6. Voice Search
function startVoiceSearch() {
    if ('webkitSpeechRecognition' in window) {
        let recognition = new webkitSpeechRecognition();
        recognition.lang = "gu-IN";
        recognition.start();
        document.getElementById('searchInput').placeholder = "સાંભળી રહ્યા છીએ...";
        recognition.onresult = function (e) {
            document.getElementById('searchInput').value = e.results[0][0].transcript;
            searchService();
            document.getElementById('searchInput').placeholder = "યોજના અથવા સેવાનું નામ શોધો...";
        };
    } else { alert("તમારો ફોન વોઇસ સર્ચ સપોર્ટ કરતો નથી."); }
}

// 7. Text To Speech (Read Aloud)
function speakText(element) {
    let text = element.parentElement.parentElement.innerText.replace('🔊 સાંભળો', '').replace('સાંભળો', '');
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'gu-IN';
    speechSynthesis.speak(utterance);
    event.stopPropagation();
}

// 8. Confetti & Inquiry Submit
function sendInquiry() {
    let name = document.getElementById('cName').value.trim();
    let msg = document.getElementById('cMsg').value.trim();
    if (!name || !msg) { alert("કૃપા કરીને વિગતો ભરો!"); return; }

    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

    setTimeout(() => {
        let waText = "નમસ્કાર,%0A👤 નામ: " + encodeURIComponent(name) + "%0A📝 કામ: " + encodeURIComponent(msg) + "%0A📎 (મારા ડોક્યુમેન્ટ્સ હું આની સાથે મોકલી રહ્યો/રહી છું)";
        window.open("https://wa.me/919638730186?text=" + waText, '_blank');
    }, 1000);
}

// 9. Settings: Theme, Color, Share
function toggleSettings() {
    document.getElementById('settingsMenu').classList.toggle('show');
}
function toggleTheme() {
    let current = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    toggleSettings();
}
function changeColor(color) {
    document.documentElement.style.setProperty('--primary', color);
    toggleSettings();
}
function shareWebsite() {
    if (navigator.share) {
        navigator.share({ title: 'અલ-અકશા કમ્પ્યુટર સેન્ટર', text: 'તમામ સરકારી યોજનાઓ અને ઓનલાઈન કામ માટે મુલાકાત લો:', url: window.location.href });
    } else { alert("તમારા બ્રાઉઝરમાં શેર સપોર્ટ નથી, લિંક કોપી કરો."); }
    toggleSettings();
}

// 10. Normal Search
function searchService() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('service-card');
    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getAttribute('data-title').toLowerCase();
        cards[i].style.display = title.includes(input) ? "" : "none";
    }
}
function setLanguage(lang) {

    localStorage.setItem("lang", lang);

    if (lang === "gu") {

        document.querySelectorAll(".gu").forEach(el => {
            el.style.setProperty("display", "block", "important");
        });

        document.querySelectorAll(".en").forEach(el => {
            el.style.setProperty("display", "none", "important");
        });

    } else {

        document.querySelectorAll(".gu").forEach(el => {
            el.style.setProperty("display", "none", "important");
        });

        document.querySelectorAll(".en").forEach(el => {
            el.style.setProperty("display", "block", "important");
        });

    }
}
function toggleDrawer() {
        document.getElementById("mobileDrawer").classList.toggle("active");
    }