// Global Auth Functions
function showAuth() {
    document.getElementById('auth-overlay').style.display = 'flex';
    document.getElementById('username').focus();
}

function hideAuth() {
    document.getElementById('auth-overlay').style.display = 'none';
}

function scrollToFeatures() {
    // For now, scroll to top as a placeholder for a features section
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Section Switching
function switchSection(sectionId) {
    // Update Nav
    document.querySelectorAll('nav li').forEach(li => li.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Update Content
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(`${sectionId}-section`).classList.add('active');

    // Update Title
    const titleMap = {
        'overview': 'Dashboard Overview',
        'analyzer': 'Placement Analyzer'
    };
    document.getElementById('section-title').innerText = titleMap[sectionId] || 'Dashboard';
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const heroPage = document.getElementById('hero-page');
    const authOverlay = document.getElementById('auth-overlay');
    const dashboardLayout = document.getElementById('dashboard-layout');
    const analyzerForm = document.getElementById('analyzerForm');
    const resultDiv = document.getElementById('result');
    const userDisplay = document.getElementById('user-display');
    const dashScore = document.getElementById('dash-score');

    // Login Handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        userDisplay.innerText = username.split('@')[0];

        // Final transition
        authOverlay.style.opacity = '0';
        heroPage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroPage.style.opacity = '0';
        heroPage.style.transform = 'scale(1.1)';

        setTimeout(() => {
            authOverlay.style.display = 'none';
            heroPage.style.display = 'none';
            dashboardLayout.style.display = 'grid';
            dashboardLayout.style.opacity = '0';

            // Trigger reflow
            dashboardLayout.offsetHeight;

            dashboardLayout.style.transition = 'opacity 0.6s ease';
            dashboardLayout.style.opacity = '1';
        }, 600);
    });

    // Analyzer Handler (Updated for Dashboard)
    analyzerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const cgpa = parseFloat(document.getElementById('cgpa').value);
        const skills = document.getElementById('skills').value.toLowerCase();
        const experience = document.getElementById('experience').value;
        const internship = document.getElementById('internship').value;
        const communication = document.getElementById('communication').value;

        let score = 0;
        let suggestions = [];

        // Analysis Logic (Same as before but refined)
        if (cgpa >= 9) score += 30;
        else if (cgpa >= 8) score += 25;
        else if (cgpa >= 7) { score += 15; suggestions.push("Aim for a CGPA above 8.0."); }
        else { score += 5; suggestions.push("Prioritize academic improvement."); }

        const highDemand = ['python', 'java', 'react', 'node', 'aws', 'sql'];
        let matched = 0;
        highDemand.forEach(s => { if (skills.includes(s)) matched++; });

        if (matched >= 3) score += 30;
        else if (matched >= 1) { score += 15; suggestions.push("Expand tech stack (React/Node)."); }
        else { suggestions.push("Start core technical training."); }

        if (experience === 'yes') score += 20;
        else suggestions.push("Work on portfolio projects.");

        if (internship === 'yes') score += 10;
        else suggestions.push("Look for summer internships.");

        if (communication === 'excellent') score += 10;

        // Sync with Dashboard
        dashScore.innerText = `${score}/100`;
        dashScore.nextElementSibling.innerText = "Analysis Complete";

        // Result Display
        let status = score >= 80 ? "Elite" : (score >= 60 ? "Strong" : "Growth Needed");
        let className = score >= 80 ? "success" : (score >= 60 ? "average" : "fail");

        resultDiv.style.display = 'block';
        resultDiv.className = `resultBox ${className}`;
        resultDiv.innerHTML = `
            <div class="score-badge">${status} Candidate</div>
            <h3>Analysis for ${name}</h3>
            <p style="font-size: 2rem; font-weight: 800; margin: 10px 0;">${score}/100</p>
            <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 12px; margin-top: 20px;">
                <p style="color: var(--accent-blue); font-weight: 600; margin-bottom: 10px;">Roadmap Items:</p>
                <ul style="font-size: 0.9rem; color: var(--text-secondary); padding-left: 20px;">
                    ${suggestions.length ? suggestions.map(s => `<li style="margin-bottom: 5px;">${s}</li>`).join('') : '<li>Profile is market-ready. Keep it up!</li>'}
                </ul>
            </div>
        `;

        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});
