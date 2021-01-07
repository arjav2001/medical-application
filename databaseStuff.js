const myIP = "http://172.17.40.136:3000/api"

export const getPatientByID = async id => {
    const patient = await fetch(`${myIP}/getPatientByID/${id}`)
    return patient.json()
}

export const getPatientsByName = async name => {
    const patients = await fetch(`${myIP}/getPatientsByName/${name}`)
    return patients.json()
}

export const getHistory = async id => {
    const complaints = await fetch(`${myIP}/getComplaintsByID/${id}`)
    return complaints.json()
}

export const addPatient = async (name, age, address) => {
    let patientData = {name, age, address}
    const attempt = await fetch(`${myIP}/addPatient`, {
        method: 'POST',
        body: JSON.stringify(patientData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const addComplaint = async (patient_id, complaint, meds, labTest, provD, refer) => {
    let complaintData = {patient_id, complaint, meds, labTest, provD, refer}
    const attempt = await fetch(`${myIP}/addComplaint`, {
        method: 'POST',
        body: JSON.stringify(complaintData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const getComplaintsByDate = async date => {
    const complaints = await fetch(`${myIP}/getComplaintsByDate/${date}`)
    return complaints.json()
}

export const getMedicines = async () => {
    const medicines = await fetch(`${myIP}/getMedicines`)
    return medicines.json()
}

export const getComplaintByID = async id => {
    const complaint = await fetch(`${myIP}/getComplaintByID/${id}`)
    return complaint.json()
}

export const addMedicine = async (name, amount) => {
    let medicineData = {name, amount}
    const attempt = await fetch(`${myIP}/addMedicine`, {
        method: 'POST',
        body: JSON.stringify(medicineData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const updateAmount = async (medicine_id, amount, oldAmount, total) => {
    if (amount > oldAmount) {
        total = total + amount - oldAmount
    }
    let amountData = {medicine_id, amount, total}
    const attempt = await fetch(`${myIP}/updateAmount`, {
        method: 'POST',
        body: JSON.stringify(amountData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const getMedicineByID = async medicine_id => {
    const medicine = await fetch(`${myIP}/getMedicineByID`)
    return medicine.json()
}