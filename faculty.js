document.addEventListener("DOMContentLoaded", function () {
    loadSubjects();
});

function addSubject() {
    let subjectName = document.getElementById("subjectName").value.trim();
    let subjectCredits = parseInt(document.getElementById("subjectCredits").value);
    
    if (!subjectName || subjectCredits < 1) {
        alert("Please enter valid subject and credits!");
        return;
    }

    let teachingHours = subjectCredits * 2;  // 1 Credit = 2 Hours

    let newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${subjectName}</td>
        <td>${subjectCredits}</td>
        <td>${teachingHours} hrs</td>
        <td><button onclick="removeSubject(this)">Remove</button></td>
    `;

    document.querySelector("#subjectTable tbody").appendChild(newRow);
    saveSubject(subjectName, subjectCredits);

    document.getElementById("subjectName").value = "";
    document.getElementById("subjectCredits").value = "";
    updateTotal();
}

function removeSubject(button) {
    let row = button.parentElement.parentElement;
    let subjectCredits = parseInt(row.cells[1].textContent);

    row.remove();
    removeStoredSubject(subjectCredits);
    updateTotal();
}

function saveSubject(subjectName, subjectCredits) {
    let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    subjects.push({ name: subjectName, credits: subjectCredits });
    localStorage.setItem("subjects", JSON.stringify(subjects));
}

function removeStoredSubject(creditsToRemove) {
    let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    subjects = subjects.filter(subject => subject.credits !== creditsToRemove);
    localStorage.setItem("subjects", JSON.stringify(subjects));
}

function loadSubjects() {
    let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    subjects.forEach(subject => {
        let teachingHours = subject.credits * 2;
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${subject.name}</td>
            <td>${subject.credits}</td>
            <td>${teachingHours} hrs</td>
            <td><button onclick="removeSubject(this)">Remove</button></td>
        `;
        document.querySelector("#subjectTable tbody").appendChild(newRow);
    });
    updateTotal();
}

function updateTotal() {
    let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    let totalCredits = subjects.reduce((sum, sub) => sum + sub.credits, 0);
    let totalHours = totalCredits * 2;

    document.getElementById("totalCredits").textContent = totalCredits;
    document.getElementById("totalHours").textContent = totalHours;
}

function logout() {
    localStorage.removeItem("subjects");
    window.location.href = "index.html";
}
