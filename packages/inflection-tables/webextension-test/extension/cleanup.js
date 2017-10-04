window.existingContainer = document.querySelector('#wext-container');
if (window.existingContainer) {
    console.log('hiding');
    window.existingContainer.classList.add('hidden');
}