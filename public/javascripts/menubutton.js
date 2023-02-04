function menuButton() {
    var x = document.getElementById("header");
    if (x.className === "computer-header") {
        x.className += " mobile-header";
    } else {
        x.className = "computer-header";
    }
}