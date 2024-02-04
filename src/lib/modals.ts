export const showSigninModal = () => {
    const el = document.getElementById("signin_modal") as HTMLDialogElement;

    if(!el) return;

    el.showModal();
}
export const hideSigninModal = () => {
    const el = document.getElementById("signin_modal") as HTMLDialogElement;

    if(!el) return;

    el.close();
}

export const showPayModal = () => {
    const el = document.getElementById("pay_modal") as HTMLDialogElement;

    if (!el) return;

    el.showModal();

    // Add a click event listener to the modal
    el.addEventListener('click', function(event) {
        // Check if the clicked element is the modal itself, not its children
        if (event.target === el) {
            hidePayModal();
        }
    }, { once: true }); // The listener is removed after it's executed once
}

export const hidePayModal = () => {
    const el = document.getElementById("pay_modal") as HTMLDialogElement;

    if(!el) return;

    el.close();
}

