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