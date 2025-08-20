document.addEventListener('DOMContentLoaded', function() {
    /**
     * Sets up a character counter for a given textarea.
     * @param {string} textareaId The ID of the textarea element.
     * @param {string} counterId The ID of the span element that will display the counter.
     */
    function setupCharCounter(textareaId, counterId) {
        const textarea = document.getElementById(textareaId);
        const counter = document.getElementById(counterId);

        if (!textarea || !counter) {
            console.warn(`Textarea or counter element not found for IDs: ${textareaId}, ${counterId}`);
            return; // Exit if elements are not found
        }

        const maxLength = textarea.getAttribute('maxlength');

        // Function to update the counter display
        const updateCounter = () => {
            const currentLength = textarea.value.length;
            counter.textContent = `${currentLength}/${maxLength}`;

            // Optional: Change color when approaching limit (e.g., 90%)
            if (maxLength && currentLength >= maxLength * 0.9) {
                counter.style.color = 'red';
            } else {
                counter.style.color = '#a0a0a0'; // Revert to light gray
            }
        };

        // Initial update when the page loads
        updateCounter();

        // Update on every input (typing, pasting, deleting)
        textarea.addEventListener('input', updateCounter);
    }

    // Setup counters for each textarea
    setupCharCounter('comments', 'comments-counter');
    setupCharCounter('e1', 'attached-response-counter');
    setupCharCounter('job-description-textarea', 'job-description-counter');
    setupCharCounter('performance-goals-textarea', 'performance-goals-counter');
    setupCharCounter('training-assistance-textarea', 'training-assistance-counter');
    setupCharCounter('supervisors-comments-textarea', 'supervisors-comments-counter');
    setupCharCounter('employees-comments-textarea', 'employees-comments-counter');

    // Setup event listeners for file inputs
    handleFileSelection('commentsFile', 'commentsFileDisplay');
    handleFileSelection('jobDescriptionFile', 'jobDescriptionFileDisplay');
    handleFileSelection('performanceGoalsFile', 'performanceGoalsFileDisplay');
    handleFileSelection('trainingFile', 'trainingFileDisplay');
    handleFileSelection('supervisorsCommentsFile', 'supervisorsCommentsFileDisplay');
    handleFileSelection('employeesCommentsFile', 'employeesCommentsFileDisplay');
});

function bindTextBoxes(sourceId, ...targetIds) {
    const sourceElement = document.getElementById(sourceId);
    if (!sourceElement) return;

    sourceElement.addEventListener('input', (event) => {
        const value = event.target.value;
        targetIds.forEach(targetId => {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.value = value;
            }
        });
    });
}

// Function to toggle the file attachment section
function toggleFileAttach(divId) {
    const fileDiv = document.getElementById(divId);
    if (fileDiv) {
        fileDiv.style.display = fileDiv.style.display === "block" ? "none" : "block";
    }
}

/**
 * Handles the file selection for a given input and displays the file name as a downloadable link.
 * @param {string} fileInputId The ID of the file input element.
 * @param {string} displayDivId The ID of the div to display the link in.
 */
function handleFileSelection(fileInputId, displayDivId) {
    const fileInput = document.getElementById(fileInputId);
    const displayDiv = document.getElementById(displayDivId);

    if (!fileInput || !displayDiv) {
        console.warn(`File input or display div not found for IDs: ${fileInputId}, ${displayDivId}`);
        return;
    }

    fileInput.addEventListener('change', (event) => {
        // Clear any previous file name
        displayDiv.innerHTML = '';
        const file = event.target.files[0];
        
        if (file) {
            // New check for file type
            if (file.type !== 'application/pdf') {
                alert('Only PDF documents can be attached to the final output. Please convert your file to PDF and try again.');
                fileInput.value = ''; // Clear the file input
                return; // Exit the function
            }

            const fileName = file.name;
            const fileURL = URL.createObjectURL(file);

            const fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.download = fileName; // This makes the link a download link
            fileLink.textContent = `Attached: ${fileName}`;
            fileLink.classList.add('attached-file-link');

            displayDiv.appendChild(fileLink);
        }
    });
}