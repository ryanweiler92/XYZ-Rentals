function checkUncheck(){
    const checkbox = document.querySelectorAll(".answer-box")

    if (checkbox.value === true) {
        checkbox.setAttribute('checked', 'checked')
    }
}

checkUncheck();