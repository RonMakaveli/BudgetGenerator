document.addEventListener("DOMContentLoaded", () => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    if (prefersDarkScheme.matches) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.add("light");
    }

    prefersDarkScheme.addEventListener("change", (e) => {
        if (e.matches) {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
        }
    });
});
