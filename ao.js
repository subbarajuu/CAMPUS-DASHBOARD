// Initialize Dashboard and load stored data
function initDashboard() {
    loadAdmissions();
    loadFees();
    loadEvents();
  }
  
  // Logout function (for demo purposes, simply redirect)
  function logout() {
    window.location.href = 'index.html';
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
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
  
  // --------------------
  // ADMISSIONS MODULE
  // --------------------
  document.getElementById('admissionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('studentName').value;
    const id = document.getElementById('studentID').value;
    const email = document.getElementById('studentEmail').value;
    const student = { name, id, email };
  
    let admissions = JSON.parse(localStorage.getItem('admissions')) || [];
    admissions.push(student);
    localStorage.setItem('admissions', JSON.stringify(admissions));
    loadAdmissions();
    this.reset();
  });
  
  function loadAdmissions() {
    let admissions = JSON.parse(localStorage.getItem('admissions')) || [];
    const ul = document.querySelector('#admissionsList ul');
    ul.innerHTML = '';
    admissions.forEach((student, index) => {
      const li = document.createElement('li');
      li.textContent = `${student.name} (ID: ${student.id}, Email: ${student.email})`;
      ul.appendChild(li);
    });
  }
  
  // --------------------
  // FEE COLLECTION MODULE
  // --------------------
  document.getElementById('feeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const studentID = document.getElementById('feeStudentID').value;
    const feeAmount = document.getElementById('feeAmount').value;
    const feeRecord = { studentID, feeAmount };
    
    let fees = JSON.parse(localStorage.getItem('fees')) || [];
    fees.push(feeRecord);
    localStorage.setItem('fees', JSON.stringify(fees));
    loadFees();
    this.reset();
  });
  
  function loadFees() {
    let fees = JSON.parse(localStorage.getItem('fees')) || [];
    const ul = document.querySelector('#feeList ul');
    ul.innerHTML = '';
    fees.forEach((record, index) => {
      const li = document.createElement('li');
      li.textContent = `Student ID: ${record.studentID} – Fee: $${record.feeAmount}`;
      ul.appendChild(li);
    });
  }
  
  // --------------------
  // EVENTS SCHEDULING MODULE
  // --------------------
  document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const eventTitle = document.getElementById('eventTitle').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventRecord = { eventTitle, eventDate };
  
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(eventRecord);
    localStorage.setItem('events', JSON.stringify(events));
    loadEvents();
    this.reset();
  });
  
  function loadEvents() {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    const ul = document.querySelector('#eventList ul');
    ul.innerHTML = '';
    events.forEach((event, index) => {
      const li = document.createElement('li');
      li.textContent = `${event.eventTitle} – Date: ${event.eventDate}`;
      ul.appendChild(li);
    });
  }
  
  // --------------------
  // REPORTS MODULE
  // --------------------
  function generateReport() {
    let admissions = JSON.parse(localStorage.getItem('admissions')) || [];
    let fees = JSON.parse(localStorage.getItem('fees')) || [];
    let events = JSON.parse(localStorage.getItem('events')) || [];
    const reportContent = document.getElementById('reportContent');
    reportContent.innerHTML = `
      <h3>Summary Report</h3>
      <p>Total Registered Students: ${admissions.length}</p>
      <p>Total Fee Records: ${fees.length}</p>
      <p>Total Scheduled Events: ${events.length}</p>
    `;
  }
  