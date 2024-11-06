document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("resumeform");
    var resumeOutput = document.getElementById("resumeoutput");
    var resumeData = null;
    var urlParams = new URLSearchParams(window.location.search);
    var encodedData = urlParams.get("data");
    if (encodedData) {
        try {
            var decodedData = JSON.parse(decodeURIComponent(encodedData));
            displayResume(decodedData, resumeOutput);
        }
        catch (error) {
            console.error("Error decoding resume data from URL:", error);
        }
    }
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var experience = document.getElementById("experience").value;
        var skills = document.getElementById("skills").value;
        var profilePictureInput = document.getElementById("profilePicture");
        var profilePicture;
        if (profilePictureInput.files && profilePictureInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                profilePicture = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                resumeData = { name: name, email: email, phone: phone, experience: experience, skills: skills, profilePicture: profilePicture };
                displayResume(resumeData, resumeOutput);
            };
            reader.readAsDataURL(profilePictureInput.files[0]);
        }
        else {
            resumeData = { name: name, email: email, phone: phone, experience: experience, skills: skills };
            displayResume(resumeData, resumeOutput);
        }
    });
    function displayResume(data, outputElement) {
        outputElement.innerHTML = "\n            <h2>Generated Resume</h2>\n            ".concat(data.profilePicture ? "<img src=\"".concat(data.profilePicture, "\" alt=\"Profile Picture\" style=\"width:100px; height:auto;\"><br>") : "", "\n            <p><strong>Name:</strong> ").concat(data.name, "</p>\n            <p><strong>Email:</strong> ").concat(data.email, "</p>\n            <p><strong>Phone:</strong> ").concat(data.phone, "</p>\n            <h3>Experience</h3>\n            <p>").concat(data.experience, "</p>\n            <h3>Skills</h3>\n            <p>").concat(data.skills, "</p>\n            <button id=\"editResume\">Edit Resume</button>\n            <button id=\"shareResume\">Generate Shareable Link</button>\n            <button id=\"downloadPDF\" style=\"background-color: red; color: white;\">Download as PDF</button>\n            <p id=\"shareLink\"></p>\n        ");
        var editButton = document.getElementById("editResume");
        editButton.addEventListener("click", function () {
            populateForm(data);
        });
        var shareButton = document.getElementById("shareResume");
        shareButton.addEventListener("click", function () {
            generateShareableLink(data);
        });
        var downloadButton = document.getElementById("downloadPDF");
        downloadButton.addEventListener("click", function () {
            downloadAsPDF(outputElement);
        });
    }
    function populateForm(data) {
        document.getElementById("name").value = data.name;
        document.getElementById("email").value = data.email;
        document.getElementById("phone").value = data.phone;
        document.getElementById("experience").value = data.experience;
        document.getElementById("skills").value = data.skills;
    }
    function generateShareableLink(data) {
        var shareableData = encodeURIComponent(JSON.stringify(data));
        var shareableLink = "".concat(window.location.origin).concat(window.location.pathname, "?data=").concat(shareableData);
        var shareLinkElement = document.getElementById("shareLink");
        shareLinkElement.innerHTML = "<a href=\"".concat(shareableLink, "\" target=\"_blank\">Click here to view/share your resume</a>");
    }
    function downloadAsPDF(element) {
        var options = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(options).save();
    }
});
