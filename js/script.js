;
(function () {
  'use strict'
  const ul = document.getElementsByTagName('ul')[0]
  const inputs = [...document.getElementsByTagName('input')]
  let begin = 0
  computeRadius()

  function reset (e) {
    if (e.target.id === 'close' || e.target.id === 'toggle') document.getElementById('text-wrap').classList.toggle('hide')
    if (e.target.id !== 'laberls') return
    ul.innerHTML = ''
    getInputs()
    computeRadius()
    const randomTime = rand(3000, 7777)
    if (!e.target.previousElementSibling.disabled) {
      e.target.previousElementSibling.disabled = true
      e.target.innerText = 'Please wait...'
      const ro = begin + rand(720, 9999)
      begin = ro
      // ul.style.transitionDuration = '0s'
      // ul.style.transform = 'rotate(0deg)'
      // ul.style['transform'].match(/\d+/gi).join('')
      ul.style.transform = `rotate(${ro}deg)`
      ul.style.transitionDuration = randomTime / 1000 + 's'
      // ul.classList.add('rotate')
      const tim = setTimeout(() => {
        inputs.forEach((e) => {
          e.checked = false
          e.disabled = false
        })
        clearTimeout(tim)
        // ul.style.transitionDuration = '0s'
        // ul.classList.remove('rotate')
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
