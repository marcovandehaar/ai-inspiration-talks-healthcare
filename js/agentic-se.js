/**
 * Agentic Software Engineering Presentation
 * JavaScript for Reveal.js initialization and progress bar
 */

// Initialize reveal.js
Reveal.initialize({
    hash: true,
    plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
    transition: 'slide',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',
    keyboard: {
        39: 'next',  // Right arrow
        37: 'prev'   // Left arrow
    }
});

// Progress indicator functionality
function updateProgressIndicator() {
    const slideIndex = Reveal.getIndices().h;
    
    // Define section mappings based on horizontal slide index
    // Index 0: Start (title)
    // Index 1: Real World section
    // Index 2: Demo section
    // Index 3: Custom Agent Profiles section
    // Index 4: MCP section
    // Index 5: Skills section
    const sections = ['start', 'realworld', 'demo', 'profiles', 'mcp', 'skills', 'context'];
    const currentSection = sections[Math.min(slideIndex, sections.length - 1)] || 'context';
    
    // Update body data attribute
    document.body.setAttribute('data-section', currentSection);
}

// Update progress on ready and slide change
Reveal.on('ready', updateProgressIndicator);
Reveal.on('slidechanged', updateProgressIndicator);

// Video playback keyboard handler
// Prevents keyboard shortcuts from interfering with video playback
document.addEventListener('keydown', function(event) {
    // Check if R key is pressed
    if (event.code === 'KeyR') {
        // First check for video overlays
        const overlay = document.querySelector('.r-overlay[data-state="loaded"]');
        if (overlay) {
            const video = overlay.querySelector('video');
            if (video) {
                event.preventDefault();
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
                return;
            }
        }
        
        // If no overlay, check for regular video on current slide
        const currentSlide = Reveal.getCurrentSlide();
        if (currentSlide) {
            const video = currentSlide.querySelector('video');
            if (video) {
                event.preventDefault();
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        }
    }
});
