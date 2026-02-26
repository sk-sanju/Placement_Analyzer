// ===============================
// GLOBAL FUNCTIONS
// ===============================

function scrollToFeatures() {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
}

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}

function hideAuth() {
    document.getElementById("auth-overlay").style.display = "none";
}

function switchSection(event, sectionId) {

    document.querySelectorAll("nav li").forEach(li =>
        li.classList.remove("active")
    );

    event.currentTarget.classList.add("active");

    document.querySelectorAll(".content-section").forEach(sec =>
        sec.classList.remove("active")
    );

    document.getElementById(sectionId + "-section").classList.add("active");

    const titles = {
        overview: "Dashboard Overview",
        analyzer: "Placement Analyzer"
    };

    document.getElementById("section-title").innerText =
        titles[sectionId] || "Dashboard";
}


// ===============================
// MAIN LOGIC
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const heroPage = document.getElementById("hero-page");
    const authOverlay = document.getElementById("auth-overlay");
    const dashboardLayout = document.getElementById("dashboard-layout");
    const loginForm = document.getElementById("loginForm");
    const analyzerForm = document.getElementById("analyzerForm");
    const resultDiv = document.getElementById("result");
    const userDisplay = document.getElementById("user-display");
    const dashScore = document.getElementById("dash-score");
    const getStartedBtn = document.getElementById("getStartedBtn");

    // ===============================
    // OPEN LOGIN
    // ===============================

    if (getStartedBtn) {
        getStartedBtn.addEventListener("click", () => {
            authOverlay.style.display = "flex";
        });
    }

    // ===============================
    // LOGIN
    // ===============================

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("username").value;

            if (!username) return;

            userDisplay.innerText = username;

            heroPage.style.display = "none";
            authOverlay.style.display = "none";
            dashboardLayout.style.display = "grid";
        });
    }

    // ===============================
    // ANALYZER
    // ===============================

    if (analyzerForm) {
        analyzerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const cgpa = parseFloat(document.getElementById("cgpa").value);
            const skills = document.getElementById("skills").value.toLowerCase();
            const experience = document.getElementById("experience").value;
            const internship = document.getElementById("internship").value;
            const communication = document.getElementById("communication").value;

            let score = 0;
            let suggestions = [];

            if (cgpa >= 9) score += 30;
            else if (cgpa >= 8) score += 25;
            else if (cgpa >= 7) { score += 15; suggestions.push("Improve CGPA above 8."); }
            else { score += 5; suggestions.push("Focus on academic improvement."); }

            const highDemand = ["python", "java", "react", "node", "aws", "sql"];
            let matched = 0;
            highDemand.forEach(skill => {
                if (skills.includes(skill)) matched++;
            });

            if (matched >= 3) score += 30;
            else if (matched >= 1) {
                score += 15;
                suggestions.push("Expand technical stack.");
            } else {
                suggestions.push("Start learning core technologies.");
            }

            if (experience === "yes") score += 20;
            else suggestions.push("Build portfolio projects.");

            if (internship === "yes") score += 10;
            else suggestions.push("Apply for internships.");

            if (communication === "excellent") score += 10;

            // Update dashboard
            dashScore.innerText = score + "/100";

            let status =
                score >= 80 ? "Elite Candidate" :
                score >= 60 ? "Strong Candidate" :
                "Growth Needed";

            resultDiv.style.display = "block";
            resultDiv.innerHTML = `
                <h3>Analysis for ${name}</h3>
                <h2 style="margin:10px 0;">${score}/100</h2>
                <p><strong>Status:</strong> ${status}</p>
                <ul style="margin-top:15px;">
                    ${
                        suggestions.length
                        ? suggestions.map(s => `<li>${s}</li>`).join("")
                        : "<li>Your profile is market ready 🚀</li>"
                    }
                </ul>
            `;

            resultDiv.scrollIntoView({ behavior: "smooth" });
        });
    }

});