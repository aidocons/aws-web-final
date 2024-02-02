if (typeof window !== 'undefined') {
  // Browser environment
  document.addEventListener('DOMContentLoaded', () => {
    fetchData();
  });
}

async function fetchData() {
  const response = await fetch('http://localhost:3000/api/data');
  const data = await response.json();

  const dataContainer = document.getElementById('server-data');
  if (dataContainer) {
    dataContainer.textContent = data.message;
  }
}

// Rest of the code...


// Rest of the code...


async function getStudentById() {
  const studentIdInput = document.getElementById('student-id');
  const studentId = studentIdInput.value;

  if (!studentId) {
    alert('Please enter a valid student ID');
    return;
  }

  const response = await fetch(`http://localhost:3000/api/student/${studentId}`);
  const result = await response.json();

  const resultContainer = document.getElementById('student-details-result');
  if (resultContainer) {
    const studentDetails = result.message;
    resultContainer.textContent = `Student ID: ${studentDetails.ID}, Name: ${studentDetails.Name}, Age: ${studentDetails.Age}`;
  }
}