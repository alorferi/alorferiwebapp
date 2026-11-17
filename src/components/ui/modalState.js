import Vue from "vue";

export const modalState = Vue.observable({ layers: [] });
let previousOverflow = "";
let background = [];

export function registerModal(id) {
    if (modalState.layers.includes(id)) return;
    if (!modalState.layers.length) {
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        background = [...document.querySelectorAll("#app > :not(.ui-modal-target)")].map((element) => {
            const value = element.getAttribute("aria-hidden");
            element.setAttribute("aria-hidden", "true");
            return { element, value };
        });
    }
    modalState.layers.push(id);
}

export function unregisterModal(id) {
    const index = modalState.layers.indexOf(id);
    if (index === -1) return;
    modalState.layers.splice(index, 1);
    if (!modalState.layers.length) {
        document.body.style.overflow = previousOverflow;
        background.forEach(({ element, value }) => {
            if (value === null) element.removeAttribute("aria-hidden");
            else element.setAttribute("aria-hidden", value);
        });
        background = [];
    }
}
