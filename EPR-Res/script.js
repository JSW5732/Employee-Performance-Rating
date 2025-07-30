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
    setupCharCounter('performance-goals-textarea', 'performance-goals-counter'); // New
    setupCharCounter('training-assistance-textarea', 'training-assistance-counter'); // New
    setupCharCounter('supervisors-comments-textarea', 'supervisors-comments-counter'); // New
    setupCharCounter('employees-comments-textarea', 'employees-comments-counter'); // New
});