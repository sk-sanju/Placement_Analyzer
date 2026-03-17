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
    const closeBtn = document.getElementById("closeSidebar");
    const topBar = document.querySelector(".top-bar");
    const scrollTopBtn = document.getElementById("scrollTopBtn");

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

    menuBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        openSidebar();
    });

    closeBtn?.addEventListener("click", closeSidebar);
    sidebarOverlay?.addEventListener("click", closeSidebar);

    // Close sidebar when clicking nav item (mobile)
    document.querySelectorAll("nav li").forEach(item => {
        item.addEventListener("click", () => {
            if (window.innerWidth < 1200) {
                closeSidebar();
            }
        });
    });

    // ===============================
    // SCROLL EFFECTS
    // ===============================

    window.addEventListener("scroll", () => {
        // Sticky Header Glass Effect
        if (window.scrollY > 20) {
            topBar?.classList.add("scrolled");
        } else {
            topBar?.classList.remove("scrolled");
        }

        // Scroll to Top Visibility
        if (window.scrollY > 400) {
            scrollTopBtn?.classList.add("visible");
        } else {
            scrollTopBtn?.classList.remove("visible");
        }
    });

    scrollTopBtn?.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
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

    analyzerForm?.addEventListener("submit", handleFormSubmit);

        function handleFormSubmit(event) {
            event.preventDefault();

            const formData = getFormData();
            const analysis = analyzeCandidate(formData);
            displayResult(formData.name, analysis, formData);

            resultDiv.scrollIntoView({ behavior: "smooth" });
        }

        function getFormData() {
            return {
                name: document.getElementById("name")?.value.trim() || "Candidate",
                cgpa: parseFloat(document.getElementById("cgpa")?.value) || 0,
                skills: document.getElementById("skills")?.value.toLowerCase().trim() || "",
                experience: document.getElementById("experience")?.value || "no",
                internship: document.getElementById("internship")?.value || "no",
                internshipStart: document.getElementById("internship-start")?.value || "",
                internshipEnd: document.getElementById("internship-end")?.value || "",
                communication: document.getElementById("communication")?.value || "average"
            };
        }

        function analyzeCandidate({ cgpa, skills, experience, internship, communication }) {
            let score = 0;
            const suggestions = [];

            score += calculateCgpaScore(cgpa, suggestions);
            score += calculateSkillScore(skills, suggestions);
            score += calculateExperienceScore(experience, suggestions);
            score += calculateInternshipScore(internship, suggestions);
            score += calculateCommunicationScore(communication, suggestions);

            const status = getCandidateStatus(score);

            return { score, status, suggestions };
        }

        function calculateCgpaScore(cgpa, suggestions) {
            if (cgpa >= 9) return 30;

            if (cgpa >= 8) return 25;

            if (cgpa >= 7) {
                suggestions.push("Strengthen your profile with certifications, projects, and practical skills.");
                return 15;
            }

            suggestions.push("Focus on building strong practical skills, certifications, and project experience.");
            return 5;
        }

        function calculateSkillScore(skills, suggestions) {
            const highDemandSkills = ["python", "java", "react", "node", "aws", "sql", "data analysis", "machine learning", "ai", "cybersecurity", "devops", "docker", "cloud computing", "blockchain", "flutter"];

            const matchedSkills = highDemandSkills.filter((skill) =>
                skills.includes(skill)
            ).length;

            if (matchedSkills >= 3) return 30;

            if (matchedSkills >= 1) {
                suggestions.push("Expand your technical stack with more in-demand tools and technologies.");
                return 15;
            }

            suggestions.push("Start learning core industry technologies such as Python, SQL, React, or AWS.");
            return 0;
        }

        function calculateExperienceScore(experience, suggestions) {
            if (experience === "yes") return 20;

            suggestions.push("Build real-world portfolio projects to demonstrate your practical ability.");
            return 0;
        }

        function calculateInternshipScore(internship, suggestions) {
            if (internship === "yes") return 10;

            suggestions.push("Apply for internships, freelance work, or virtual experience programs.");
            return 0;
        }

        function calculateCommunicationScore(communication, suggestions) {
            if (communication === "excellent") return 10;

            if (communication === "good") return 7;

            if (communication === "average") {
                suggestions.push("Improve communication through mock interviews, presentations, and group discussions.");
                return 5;
            }

            suggestions.push("Work on communication skills to perform better in interviews and team environments.");
            return 0;
        }

        function getCandidateStatus(score) {
            if (score >= 80) return "Elite Candidate";
            if (score >= 60) return "Strong Candidate";
            return "Growth Needed";
        }

        function displayResult(name, { score, status, suggestions }, formData) {
            dashScore.innerText = `${score}/100`;

            let internshipDateHtml = "";
            if (formData.internship === "yes" && formData.internshipStart && formData.internshipEnd) {
                const fmt = (d) => new Date(d).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" });
                internshipDateHtml = `<p style="margin-top:8px;"><strong>Internship Period:</strong> ${fmt(formData.internshipStart)} &ndash; ${fmt(formData.internshipEnd)}</p>`;
            }

            resultDiv.style.display = "block";
            resultDiv.innerHTML = `
                <h3>Analysis for ${name}</h3>
                <h2 style="margin:10px 0;">${score}/100</h2>
                <p><strong>Status:</strong> ${status}</p>
                ${internshipDateHtml}
                <ul style="margin-top:15px;">
                    ${
                        suggestions.length > 0
                            ? suggestions.map((item) => `<li>${item}</li>`).join("")
                            : "<li>Your profile is market ready 🚀</li>"
                    }
                </ul>
            `;
        }

    // ===============================
    // TOGGLE INTERNSHIP DATES
    // ===============================

    window.toggleInternshipDates = function (value) {
        const datesRow = document.getElementById("internship-dates");
        if (datesRow) {
            datesRow.style.display = value === "yes" ? "block" : "none";
        }
    };

});