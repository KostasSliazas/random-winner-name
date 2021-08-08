;
(function () {
  'use strict'
  const ul = document.getElementsByTagName('ul')[0]
  const inputs = [...document.getElementsByTagName('input')]
  computeRadius()

  function reset (e) {
    if (e.target.id === 'close' || e.target.id === 'toggle') document.getElementById('text-wrap').classList.toggle('hide')
    if (e.target.id !== 'laberls') return
    let begin = 0
    ul.innerHTML = ''
    getInputs()
    computeRadius()
    const randomTime = rand(2540, 9990)
    if (!e.target.previousElementSibling.disabled) {
      e.target.previousElementSibling.disabled = true
      e.target.innerText = 'Please wait...'
      const ro = begin + rand(0, 360)
      begin = ro
      ul.style.transform = `rotate(${ro}deg`
      ul.classList.add('rotate')
      const tim = setTimeout(() => {
        inputs.forEach((e) => {
          e.checked = false
          e.disabled = false
        })
        clearTimeout(tim)
        ul.classList.remove('rotate')
        e.target.innerText = typeof computeElementPositions() !== 'undefined' ? computeElementPositions().innerText : 'No winners'
      }, randomTime)
    }
  }

  function computeRadius () {
    const li = [...ul.getElementsByTagName('li')]
    const eachRotate = 360 / li.length
    let rotate = 0
    li.forEach(e => {
      e.style.transform = `rotateZ(${rotate}deg)`
      rotate += eachRotate
    })
  }

  function computeElementPositions () {
    const allList = Array.from(ul.getElementsByTagName('span'))
    const max = allList.reduce((acc, shot) =>
      (acc = acc.getBoundingClientRect().top > shot.getBoundingClientRect().top ? acc : shot), allList[0])
    return max
  }

  function rand (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }

  function getInputs () {
    const textInput = document.getElementById('text-input')
    const text = textInput.value
    const filters = text.trim().replace(/\s/g, ' ').split(' ').filter(e => (e.length > 1) && e.replace(/\s+/, ''))
    filters.forEach(n => {
      const li = document.createElement('li')
      const a = document.createElement('span')
      a.innerText = n
      li.appendChild(a)
      ul.appendChild(li)
    })
  }

  document.addEventListener('click', reset)
})()
