// ===============================
// DOM READY
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const heroPage = document.getElementById("hero-page");
    const authOverlay = document.getElementById("auth-overlay");
    const dashboardLayout = document.getElementById("dashboard-layout");
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");
    const loginForm = document.getElementById("loginForm");
    const analyzerForm = document.getElementById("analyzerForm");
    const resultDiv = document.getElementById("result");
    const userDisplay = document.getElementById("user-display");
    const dashScore = document.getElementById("dash-score");
    const getStartedBtn = document.getElementById("getStartedBtn");

    // ===============================
    // HERO BUTTON
    // ===============================

    if (getStartedBtn) {
        getStartedBtn.addEventListener("click", () => {
            authOverlay.style.display = "flex";
        });
    }

    // ===============================
    // AUTH CLOSE (CLICK OUTSIDE)
    // ===============================

    authOverlay?.addEventListener("click", (e) => {
        if (e.target === authOverlay) {
            authOverlay.style.display = "none";
        }
    });

    // ===============================
    // LOGIN
    // ===============================

    loginForm?.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        if (!username) return;

        userDisplay.innerText = username;

        heroPage.style.display = "none";
        authOverlay.style.display = "none";
        dashboardLayout.classList.add("active");
    });

    // ===============================
    // SIDEBAR TOGGLE
    // ===============================

    const sidebarOverlay = document.getElementById("sidebar-overlay");
    const menuBtn = document.getElementById("menuToggle");

    // ===============================
    // SIDEBAR TOGGLE
    // ===============================

    function openSidebar() {
        sidebar.classList.add("active");
        sidebarOverlay?.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeSidebar() {
        sidebar.classList.remove("active");
        sidebarOverlay?.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    function toggleSidebar() {
        sidebar.classList.contains("active")
            ? closeSidebar()
            : openSidebar();
    }

    menuBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSidebar();
    });

    sidebarOverlay?.addEventListener("click", closeSidebar);

    // Close sidebar when clicking nav item (mobile)
    document.querySelectorAll("nav li").forEach(item => {
        item.addEventListener("click", () => {
            if (window.innerWidth < 992) {
                closeSidebar();
            }
        });
    });

    // Close on ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeSidebar();
    });

    // ===============================
    // SECTION SWITCHING
    // ===============================

    window.switchSection = function (event, sectionId) {

        document.querySelectorAll("nav li").forEach(li =>
            li.classList.remove("active")
        );

        event.currentTarget.classList.add("active");

        document.querySelectorAll(".content-section").forEach(sec =>
            sec.classList.remove("active")
        );

        document.getElementById(sectionId + "-section")
            ?.classList.add("active");

        const titles = {
            overview: "Dashboard Overview",
            analyzer: "Placement Analyzer",
            jobs: "Recommended Jobs",
            resources: "Learning Resources"
        };

        document.getElementById("section-title").innerText =
            titles[sectionId] || "Dashboard";
    };

    // ===============================
    // ANALYZER LOGIC
    // ===============================

    analyzerForm?.addEventListener("submit", (e) => {

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
        else if (cgpa >= 7) {
            score += 15;
            suggestions.push("Improve CGPA above 8.");
        } else {
            score += 5;
            suggestions.push("Focus on academic improvement.");
        }

        const highDemand = ["python", "java", "react", "node", "aws", "sql"];
        let matched = highDemand.filter(skill =>
            skills.includes(skill)
        ).length;

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
                ${suggestions.length
                ? suggestions.map(s => `<li>${s}</li>`).join("")
                : "<li>Your profile is market ready 🚀</li>"
            }
            </ul>
        `;

        resultDiv.scrollIntoView({ behavior: "smooth" });
    });

});