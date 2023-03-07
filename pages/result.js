const seeResult = document.querySelector('#seeResult')
const malariaArr = document.querySelectorAll('.answer')
let count = 0
for (const malaria of malariaArr) {
    malaria.addEventListener('click', () => {
        if (malaria.checked) {
            count += parseInt(malaria.dataset.rate);
            if (count > 100) count = 100
        }
        if (!malaria.checked) {
            count -= parseInt(malaria.dataset.rate);
            if (count < 0) count = 0
        }
        console.log(count)
    });
}
const resultTemplate = document.querySelector('.modelOne')
const resultModel = document.querySelector('#result')
let filters = ''
seeResult.addEventListener('click', e => {
    e.preventDefault()
    if (count === 0) {
        alert("Please read and select from the options carefully.")
    } else {
        switch (count) {
            case 10:
                filters = 'You are not infected with malaria, come back after one week pleace'
                break
            case 20:
                filters = 'You are not infected with malaria, come back after one week please'
                break
            case 30:
                filters = 'You might be infected with malaria, come back after two days please'
                break
            case 40:
                filters = 'You might be infected with malaria, come back tomorrow'
                break
            case 50:
                filters = 'You are likely to be surffering from malaria, go and meet a doctor or come back tomorrow please'
                break
            case 60:
                filters = 'You are likely to be surffering from malaria, go and meet a doctor please'
                break
            case 70:
                filters = 'You are surffering from minor malaria, go and meet a doctor please'
                break
            case 80:
                filters = 'You are surffering from minor malaria, you should go and meet a doctor please'
                break
            case 90:
                filters = 'You are surffering from malaria, you should go and meet a doctor please'
                break
            case 100:
                filters = 'You have cronic malaria and need a doctor please'
                break
        }
        resultTemplate.style.display = 'flex'
        resultModel.textContent = `${filters}`
        let data = [count, filters]
        const notifyMe = (data) => {
            if (!("Notification" in window)) {
                alert("This App or browser does not support desktop notification")
            }
            else if (Notification.permission === "granted") {
                const notification = new Notification("Malaria Report App", { body: `Says ${data[1]}` })
                notification()
            }
            else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                    if (permission === "granted") {
                        const notification = new Notification("Malaria Report App", { body: `Says ${data[1]}` })
                        notification()
                    }
                });
            }
        }
        const dbrunner = async (data) => {
            await window.electronAPI.sendToMySQL(data);
            notifyMe(data)
            console.log(data)
            count = 0
            filters = ''
        }
        dbrunner(data)
    }
})