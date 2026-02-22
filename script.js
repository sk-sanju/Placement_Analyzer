document.getElementById("analyzerForm").addEventListener("submit", function(e) {
e.preventDefault();

let name = document.getElementById("name").value;
let cgpa = parseFloat(document.getElementById("cgpa").value);
let qualification = document.getElementById("qualification").value;
let skills = document.getElementById("skills").value.toLowerCase();
let experience = document.getElementById("experience").value;

let score = 0;
let suggestions = [];

// CGPA Score
if (cgpa >= 8) {
    score += 30;
} else if (cgpa >= 6) {
    score += 20;
    suggestions.push("Improve your CGPA");
} else {
    suggestions.push("Your CGPA is low");
}

// Qualification
if (qualification === "degree") {
    score += 20;
} else {
    suggestions.push("Higher qualification preferred");
}

// Skills
if (skills.includes("python") || skills.includes("java") || skills.includes("web")) {
    score += 30;
} else {
    suggestions.push("Add technical skills (Python, Java, Web)");
}

// Experience
if (experience === "yes") {
    score += 20;
} else {
    suggestions.push("Do some projects for experience");
}

let resultDiv = document.getElementById("result");

let status = "";
let className = "";

if (score >= 70) {
    status = "✅ Eligible for Internship";
    className = "success";
} else if (score >= 40) {
    status = "⚠️ Needs Improvement";
    className = "average";
} else {
    status = "❌ Not Eligible";
    className = "fail";
}

resultDiv.className = "resultBox " + className;

resultDiv.innerHTML = `
    Hello <b>${name}</b> <br><br>
    Score: ${score} / 100 <br>
    Status: ${status} <br><br>
    Suggestions: <br> ${suggestions.join("<br>")}
`;

});
