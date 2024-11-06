document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("resumeform");
    var resumeOutput = document.getElementById("resumeoutput");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var experience = document.getElementById("experience").value;
        var skills = document.getElementById("skills").value;
        if (!name || !email || !phone || !experience || !skills) {
            alert("Please fill out all fields");
            return;
        }
        var resumeData = { name: name, email: email, phone: phone, experience: experience, skills: skills };
        displayResume(resumeData, resumeOutput);
    });
});
function displayResume(data, outputElement) {
    outputElement.innerHTML = "\n        <h2>Generated Resume</h2>\n        <p><strong>Name:</strong> ".concat(data.name, "</p>\n        <p><strong>Email:</strong> ").concat(data.email, "</p>\n        <p><strong>Phone:</strong> ").concat(data.phone, "</p>\n        <h3>Experience</h3>\n        <p>").concat(data.experience, "</p>\n        <h3>Skills</h3>\n        <p>").concat(data.skills, "</p>\n        <button id=\"editResume\">Edit Resume</button>\n    ");

    var editButton = document.getElementById("editResume");
    editButton.addEventListener("click", function () {
        populateForm(data);
    });
}
function populateForm(data) {
    document.getElementById("name").value = data.name;
    document.getElementById("email").value = data.email;
    document.getElementById("phone").value = data.phone;
    document.getElementById("experience").value = data.experience;
    document.getElementById("skills").value = data.skills;
}
