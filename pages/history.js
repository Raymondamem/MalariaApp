const historyResult = document.querySelector('#historyResults')
const loadHistorys = document.querySelector('#loadHistorys')
let counter = 0
loadHistorys.addEventListener('click', e => {
    counter++
    if (counter >= 2) {
        e.preventDefault()
        alert("Database Empty!")
    } else {
        window.electronAPI.getHistorys()
    }
})
window.electronAPI.viewResult((event, result) => {
    result.forEach(items => {
        historyResult.innerHTML += `<li class="liCls">Persons' Id was: ${items.id} and persons' message was: ${items.message}</li>`
    })
})