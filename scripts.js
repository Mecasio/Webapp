const buttonsAndContainers = [
    { button: '.create-task-btn', container: '.task-creation-container' },
    { button: '.notification-btn', container: '.notification-view-container' },
    { button: '.inventory-btn', container: '.inventory-view-container' },
    { button: '.profile-btn', container: '.profile-view-container' },
    { button: '.shop-btn', container: '.shop-view-container' },
    { button: '.history-btn', container: '.history-view-container' },
    { button: '.tasklist-btn', container: '.tasklist-view-container' },
    { button: '.info-btn', container: '.profile-view-container' },
    { button: '.settings-btn', container: '.profile-view-container1' },
];

const containers = buttonsAndContainers.map(item => document.querySelector(item.container));

const toggleContainer = (buttonSelector, container) => {
    const button = document.querySelector(buttonSelector);
    if (button) {
        button.addEventListener('click', () => {
            console.log(`Button ${buttonSelector} clicked`);
            containers.forEach(cont => {
                if (cont !== container) cont?.classList?.remove('is-active');
            });
            container?.classList?.toggle('is-active');
        });
    } else {
        console.error(`Button ${buttonSelector} not found`);
    }
};

buttonsAndContainers.forEach(({ button, container }) => {
    const containerElement = document.querySelector(container);
    toggleContainer(button, containerElement);
});

window.onclick = (event) => {
    containers.forEach(container => {
        if (event.target === container) {
            container.classList.remove('is-active');
        }
    });

    buttonsAndContainers.forEach(({ container }) => {
        const containerElement = document.querySelector(container);
        if (event.target == containerElement) {
            containerElement.classList.remove('is-active');
        }
    });

    if (!event.target.closest('.menu li') && !event.target.closest('.user-img')) {
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
    }
}   

const menuItems = document.querySelectorAll('.menu li');
const user = document.querySelector('.user-img');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        if (item.classList.contains('active')) {
            item.classList.remove('active');
        } else {
            menuItems.forEach(el => el.classList.remove('active'));
            item.classList.add('active');
        }
    });
});

user.addEventListener('click', () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    containers.forEach(container => {
        container.classList.remove('is-active');
    });
});