let isLightMode = true
const toggleMode = document.querySelector('#toggleMode')

toggleMode.addEventListener('click', function(event) {
    document.documentElement.classList.toggle('dark')

    const mode = isLightMode ? 'dark' : 'light'

    event.currentTarget
    .querySelector('span').textContent = `${mode} mode ativado!`

    isLightMode = !isLightMode

})