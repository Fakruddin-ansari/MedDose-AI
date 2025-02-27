// Show/hide extra fields for doctor and pharmacist
function showExtraFields() {
    var role = document.getElementById("role").value;
    var extraFields = document.getElementById("extraFields");
    extraFields.style.display = (role === "Doctor" || role === "Pharmacist") ? "block" : "none";
}

// Dummy Biometric Verification
function biometricVerification() {
    alert("Biometric Verification Successful!");
}

// Login Function
function login() {
    var role = document.getElementById("role").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var license = document.getElementById("license").value;

    var users = {
        "patient@example.com": { password: "patient123", role: "Patient" },
        "doctor@example.com": { password: "doctor123", role: "Doctor", license: "D123" },
        "pharmacist@example.com": { password: "pharma123", role: "Pharmacist", license: "P123" }
    };

    if (users[email] && users[email].password === password &&
        (role !== "Doctor" && role !== "Pharmacist" || users[email].license === license)) {
        if (role === "Patient") window.location.href = "patient.html";
        else if (role === "Doctor") window.location.href = "doctor.html";
        else if (role === "Pharmacist") window.location.href = "pharmacist.html";
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

// Generate Dose
function generateDose() {
    const condition = document.getElementById("condition").value.toLowerCase();
    const doseMapping = {
        "diabetes": "Metformin 500mg",
        "hypertension": "Losartan 50mg",
        "fever": "Paracetamol 500mg",
        "infection": "Amoxicillin 250mg"
    };
    document.getElementById("dose").value = doseMapping[condition] || "Consult Doctor";
}

// Submit to Doctor
function submitToDoctor() {
    const patientData = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        weight: document.getElementById("weight").value,
        height: document.getElementById("height").value,
        condition: document.getElementById("condition").value,
        dose: document.getElementById("dose").value
    };

    let storedData = JSON.parse(localStorage.getItem("patients")) || [];
    storedData.push(patientData);
    localStorage.setItem("patients", JSON.stringify(storedData));
    alert("Data sent to Doctor.");
}

// Load Patient Data in Doctor and Pharmacist Dashboards
window.onload = function () {
    const storedData = JSON.parse(localStorage.getItem("patients")) || [];
    let patientTable = document.getElementById("patientData");

    // Doctor Dashboard
    if (patientTable) {
        patientTable.innerHTML = ""; // Clear existing rows
        storedData.forEach((patient, index) => {
            let row = patientTable.insertRow();
            row.innerHTML = `
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.gender}</td>
                <td>${patient.weight}</td>
                <td>${patient.height}</td>
                <td>${patient.condition}</td>
                <td>${patient.dose}</td>
                <td>
                    <button onclick="approve(${index})">Approve</button>
                    <button onclick="reject(${index})">Reject</button>
                    <button onclick="alter(${index})">Alter</button>
                </td>
            `;
        });
    }

    // Pharmacist Dashboard
    const approvedData = JSON.parse(localStorage.getItem("approvedPatients")) || [];
    let approvedTable = document.getElementById("approvedData");

    if (approvedTable) {
        approvedTable.innerHTML = ""; // Clear existing rows
        approvedData.forEach((patient, index) => {
            let row = approvedTable.insertRow();
            row.innerHTML = `
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.gender}</td>
                <td>${patient.weight}</td>
                <td>${patient.height}</td>
                <td>${patient.condition}</td>
                <td>${patient.dose}</td>
                <td><button onclick="dispense(${index})">Dispense</button></td>
            `;
        });
    }
};

// Approve, Reject, Alter
function approve(index) {
    const storedData = JSON.parse(localStorage.getItem("patients")) || [];
    const approvedData = JSON.parse(localStorage.getItem("approvedPatients")) || [];

    approvedData.push(storedData[index]);
    localStorage.setItem("approvedPatients", JSON.stringify(approvedData));
    storedData.splice(index, 1); // Remove approved data from patients
    localStorage.setItem("patients", JSON.stringify(storedData));
    alert("Approved and sent to Pharmacist.");
    window.location.reload();
}

function reject(index) {
    let storedData = JSON.parse(localStorage.getItem("patients")) || [];
    storedData.splice(index, 1);
    localStorage.setItem("patients", JSON.stringify(storedData));
    alert("Rejected.");
    window.location.reload();
}

function alter(index) {
    alert("Altered!");
}

// Dispense Medication
function dispense(index) {
    let approvedData = JSON.parse(localStorage.getItem("approvedPatients")) || [];
    approvedData.splice(index, 1);
    localStorage.setItem("approvedPatients", JSON.stringify(approvedData));
    alert("Medication Dispensed.");
    window.location.reload();
}

// Back Button
function goBack() {
    window.location.href = "index.html";
}