// Initialize Dashboard (load saved data, if any)
function initDashboard() {
    loadSubjectAllocations();
    // Attendance data is processed per session.
  }
  
  // --------------------
  // TAB SWITCHING LOGIC
  // --------------------
  function showTab(tabId) {
    // Hide all tab panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    // Show the selected tab panel
    document.getElementById(tabId).classList.add('active');
  
    // Update active state for tab buttons
    document.querySelectorAll('.tab-link').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
  }
  
  // --------------------
  // ATTENDANCE MODULE
  // --------------------
  
  // Sample data: attendance data structured by Year and Section
  const attendanceData = {
    Year1: {
      "Section A": ['Alice', 'Bob', 'Charlie'],
      "Section B": ['David', 'Eve', 'Frank']
    },
    Year2: {
      "Section A": ['Grace', 'Heidi', 'Ivan'],
      "Section B": ['Judy', 'Mallory', 'Niaj']
    },
    Year3: {
      "Section A": ['Olivia', 'Peggy', 'Quentin'],
      "Section B": ['Rupert', 'Sybil', 'Trent']
    },
    Year4: {
      "Section A": ['Uma', 'Victor', 'Wendy'],
      "Section B": ['Xander', 'Yvonne', 'Zack']
    }
  };
  
  // Populate section dropdown based on selected Year
  function populateSections() {
    const yearSelect = document.getElementById('yearSelect');
    const sectionSelect = document.getElementById('sectionSelect');
    const selectedYear = yearSelect.value;
    
    // Clear previous sections
    sectionSelect.innerHTML = '<option value="">--Select Section--</option>';
    
    if (selectedYear && attendanceData[selectedYear]) {
      // Populate sections from keys of the selected year
      Object.keys(attendanceData[selectedYear]).forEach(section => {
        const option = document.createElement('option');
        option.value = section;
        option.textContent = section;
        sectionSelect.appendChild(option);
      });
    }
    // Clear the attendance list when year changes
    document.getElementById('attendanceList').innerHTML = '';
  }
  
  // Load student checkboxes based on selected Year and Section
  function loadAttendanceList() {
    const yearSelect = document.getElementById('yearSelect');
    const sectionSelect = document.getElementById('sectionSelect');
    const selectedYear = yearSelect.value;
    const selectedSection = sectionSelect.value;
    const attendanceList = document.getElementById('attendanceList');
    
    attendanceList.innerHTML = '';
    
    if (selectedYear && selectedSection && attendanceData[selectedYear] && attendanceData[selectedYear][selectedSection]) {
      attendanceData[selectedYear][selectedSection].forEach((student, index) => {
        const div = document.createElement('div');
        div.classList.add('student-item');
        div.innerHTML = `
          <input type="checkbox" id="student-${index}" data-student-name="${student}" />
          <label for="student-${index}">${student}</label>
        `;
        attendanceList.appendChild(div);
      });
    }
  }
  
  function submitAttendance() {
    const yearSelect = document.getElementById('yearSelect');
    const sectionSelect = document.getElementById('sectionSelect');
    const selectedYear = yearSelect.value;
    const selectedSection = sectionSelect.value;
    
    if (!selectedYear || !selectedSection) {
      alert('Please select both Year and Section.');
      return;
    }
  
    const checkboxes = document.querySelectorAll('#attendanceList input[type="checkbox"]');
    let present = [];
    let absent = [];
  
    checkboxes.forEach(cb => {
      const studentName = cb.getAttribute('data-student-name');
      if (cb.checked) {
        present.push(studentName);
      } else {
        absent.push(studentName);
      }
    });
  
    const attendanceMessage = document.getElementById('attendanceMessage');
    attendanceMessage.innerHTML = `
      <strong>Attendance for ${selectedYear} - ${selectedSection}:</strong><br>
      Present: ${present.join(', ') || 'None'}<br>
      Absent: ${absent.join(', ') || 'None'}
    `;
  }
  
  // --------------------
  // SUBJECT ALLOCATION MODULE
  // --------------------
  document.getElementById('subjectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const facultyName = document.getElementById('facultyName').value.trim();
    const subjectName = document.getElementById('subjectName').value.trim();
    const subjectCredits = parseInt(document.getElementById('subjectCredits').value);
    
    if (!facultyName || !subjectName || subjectCredits < 1) {
      alert('Please enter valid data for subject allocation.');
      return;
    }
    
    const allocation = { facultyName, subjectName, subjectCredits };
    let allocations = JSON.parse(localStorage.getItem('allocations')) || [];
    allocations.push(allocation);
    localStorage.setItem('allocations', JSON.stringify(allocations));
    loadSubjectAllocations();
    this.reset();
  });
  
  function loadSubjectAllocations() {
    let allocations = JSON.parse(localStorage.getItem('allocations')) || [];
    const ul = document.querySelector('#subjectList ul');
    ul.innerHTML = '';
    allocations.forEach((alloc, index) => {
      const li = document.createElement('li');
      li.textContent = `${alloc.facultyName} is allocated ${alloc.subjectName} (${alloc.subjectCredits} credits)`;
      ul.appendChild(li);
    });
  }
  
  // --------------------
  // REPORTS MODULE
  // --------------------
  function generateReport() {
    let allocations = JSON.parse(localStorage.getItem('allocations')) || [];
    const reportContent = document.getElementById('reportContent');
    reportContent.innerHTML = `
      <h3>Summary Report</h3>
      <p>Total Allocated Subjects: ${allocations.length}</p>
    `;
    // Additional reports (e.g., attendance summaries) can be added here.
  }
  
  // --------------------
  // LOGOUT FUNCTION
  // --------------------
  function logout() {
    // Optionally clear local storage or perform any cleanup
    window.location.href = 'index.html';  // Redirect to login page (or landing page)
  }
  