/********** SAMPLE DATA FOR ATTENDANCE VIEW **********/
const sampleStudents = [
    {
      name: "subbaraju",
      id: "s190801",
      attendance: {
        Monday: true,
        Tuesday: false,
        Wednesday: true,
        Thursday: true,
        Friday: true
      }
    },
    {
      name: "Bob",
      id: "S002",
      attendance: {
        Monday: true,
        Tuesday: true,
        Wednesday: false,
        Thursday: false,
        Friday: true
      }
    },
    {
      name: "Charlie",
      id: "S003",
      attendance: {
        Monday: true,
        Tuesday: true,
        Wednesday: true,
        Thursday: true,
        Friday: true
      }
    }
  ];
  
  /********** INITIALIZATION FUNCTION **********/
  function initDashboard() {
    console.log("Dashboard initialized");
    populateStudentSelect();
    loadSubjects();
    // Future backend integrations for other modules can be added here.
  }
  
  /********** ATTENDANCE VIEW FUNCTIONS **********/
  function populateStudentSelect() {
    const studentSelect = document.getElementById('studentSelect');
    studentSelect.innerHTML = '<option value="">--Select Student--</option>';
    sampleStudents.forEach((student, index) => {
      const option = document.createElement('option');
      // Use the index as the value for later reference.
      option.value = index;
      option.textContent = student.name;
      studentSelect.appendChild(option);
    });
  }
  
  function viewAttendance() {
    const studentSelect = document.getElementById('studentSelect');
    const selectedIndex = studentSelect.value;
    const studentIdInput = document.getElementById('studentIdInput').value.trim();
    const resultDiv = document.getElementById('attendanceResult');
  
    // Check if a student was selected.
    if (selectedIndex === "") {
      alert("Please select a student.");
      return;
    }
  
    const student = sampleStudents[selectedIndex];
  
    // Validate that the entered ID matches the sample data.
    if (student.id !== studentIdInput) {
      resultDiv.innerHTML = `<p style="color: red;">ID Number does not match for ${student.name}. Please check and try again.</p>`;
      return;
    }
  
    // Calculate attendance details (assuming a 5-day week).
    const attendanceRecord = student.attendance;
    const days = Object.keys(attendanceRecord);
    const totalDays = days.length;
    let presentCount = 0;
    days.forEach(day => {
      if (attendanceRecord[day]) presentCount++;
    });
    const absentCount = totalDays - presentCount;
    const attendancePercentage = ((presentCount / totalDays) * 100).toFixed(2);
  
    // Display the attendance details.
    resultDiv.innerHTML = `
      <h3>Attendance Details for ${student.name} (ID: ${student.id})</h3>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${days.map(day => `
            <tr>
              <td>${day}</td>
              <td>${attendanceRecord[day] ? "Present" : "Absent"}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p><strong>Present:</strong> ${presentCount} day(s)</p>
      <p><strong>Absent:</strong> ${absentCount} day(s)</p>
      <p><strong>Total Attendance:</strong> ${attendancePercentage}%</p>
    `;
  }
  
  /********** SUBJECT MANAGEMENT FUNCTIONS **********/
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
  
  /********** GRADING SECTION **********/
  document.getElementById('gradingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Placeholder: Process the file and simulate grading.
    const gradingResult = document.getElementById('gradingResult');
    gradingResult.innerHTML = "<p>Assignment graded successfully. (This is a placeholder result.)</p>";
  });
  
  /********** TAB SWITCHING LOGIC **********/
  function showTab(tabId) {
    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    
    // Update active state for tab buttons
    const tabButtons = document.querySelectorAll('.tab-menu button');
    tabButtons.forEach(btn => {
      if(btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
  
  /********** LOGOUT FUNCTION **********/
  function logout() {
    // Clear subjects from localStorage (or implement further cleanup)
    localStorage.removeItem("subjects");
    window.location.href = 'index.html';
  }
  
  /********** INITIALIZE DASHBOARD ON WINDOW LOAD **********/
  window.onload = initDashboard;
  
