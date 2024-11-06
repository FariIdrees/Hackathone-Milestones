interface ResumeData {
    name: string;
    email: string;
    phone: string;
    experience: string;
    skills: string;
    profilePicture?: string;
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resumeform") as HTMLFormElement;
    const resumeOutput = document.getElementById("resumeoutput") as HTMLDivElement;
    let resumeData: ResumeData | null = null;

    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get("data");
    if (encodedData) {
        try {
            const decodedData = JSON.parse(decodeURIComponent(encodedData));
            displayResume(decodedData, resumeOutput);
        } catch (error) {
            console.error("Error decoding resume data from URL:", error);
        }
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value;
        const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
        const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
        
        const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
        let profilePicture: string | undefined;

        if (profilePictureInput.files && profilePictureInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePicture = e.target?.result as string;
                resumeData = { name, email, phone, experience, skills, profilePicture };
                displayResume(resumeData, resumeOutput);
            };
            reader.readAsDataURL(profilePictureInput.files[0]);
        } else {
            resumeData = { name, email, phone, experience, skills };
            displayResume(resumeData, resumeOutput);
        }
    });

    function displayResume(data: ResumeData, outputElement: HTMLDivElement) {
        outputElement.innerHTML = `
            <h2>Generated Resume</h2>
            ${data.profilePicture ? `<img src="${data.profilePicture}" alt="Profile Picture" style="width:100px; height:auto;"><br>` : ""}
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <h3>Experience</h3>
            <p>${data.experience}</p>
            <h3>Skills</h3>
            <p>${data.skills}</p>
            <button id="editResume">Edit Resume</button>
            <button id="shareResume">Generate Shareable Link</button>
            <button id="downloadPDF" style="background-color: red; color: white;">Download as PDF</button>
            <p id="shareLink"></p>
        `;

        const editButton = document.getElementById("editResume") as HTMLButtonElement;
        editButton.addEventListener("click", () => {
            populateForm(data);
        });

        const shareButton = document.getElementById("shareResume") as HTMLButtonElement;
        shareButton.addEventListener("click", () => {
            generateShareableLink(data);
        });

        const downloadButton = document.getElementById("downloadPDF") as HTMLButtonElement;
        downloadButton.addEventListener("click", () => {
            downloadAsPDF(outputElement);
        });
    }

    function populateForm(data: ResumeData) {
        (document.getElementById("name") as HTMLInputElement).value = data.name;
        (document.getElementById("email") as HTMLInputElement).value = data.email;
        (document.getElementById("phone") as HTMLInputElement).value = data.phone;
        (document.getElementById("experience") as HTMLTextAreaElement).value = data.experience;
        (document.getElementById("skills") as HTMLTextAreaElement).value = data.skills;
    }

    function generateShareableLink(data: ResumeData) {
        const shareableData = encodeURIComponent(JSON.stringify(data));
        const shareableLink = `${window.location.origin}${window.location.pathname}?data=${shareableData}`;
        const shareLinkElement = document.getElementById("shareLink") as HTMLParagraphElement;
        shareLinkElement.innerHTML = `<a href="${shareableLink}" target="_blank">Click here to view/share your resume</a>`;
    }

    function downloadAsPDF(element: HTMLElement) {
        const options = {
            margin:       1,
            filename:     'resume.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(options).save();
    }    
});
