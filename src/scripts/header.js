document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        const trackingValue = link.getAttribute('data-tracking');
        if (trackingValue) {
            link.addEventListener('click', () => {
                //Send tracking here
                console.log(`I have tracking: ${trackingValue}`);
            });
        }
    });
});