/*! Be licensed under the terms of the MIT license. */

import { css } from 'emotion' /* MIT LICENSE */

interface autocompletizeDatalist {
  target: HTMLInputElement;
  data: Array<string>;
}

const wrapperStyles = css({
  position: 'relative'
})

const listBoxStyles = css({
  position: 'absolute',
  border: '1px solid #bdbdbd',
  zIndex: 900,
  boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
  top: 'calc(100% + 4px)',
  left: 0,
  right: 0,
  maxHeight: 280,
  backgroundColor: '#fafafa',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: 4
  },
  '&::-webkit-scrollbar-track': {
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#bdbdbd',
    borderRadius: 2
  },
  '& div': {
    fontSize: 14,
    letterSpacing: 0.25,
    textRendering: 'optimizeLegibility',
    fontFamily: '"Roboto","Helvetica","Arial",YuGothic,"Yu Gothic Medium",sans-serif',
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.87)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    padding: 8,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.12)'
    },
    '&.active': {
      backgroundColor: 'rgba(0, 0, 0, 0.12)'
    }
  }
})

const closeState = css({
  '& ~ div': {
    visibility: 'hidden'
  }
})

const autocompletize = {
  state: -1,
  shift: false,
  init: () => {
    const inputs = document.getElementsByTagName('input')
    for (const input of Array.from(inputs)) {
      const inputWrapper = document.createElement('div')
      inputWrapper.id = (input.id || input.name) && `${input.id || input.name}-wrapper`
      inputWrapper.classList.add(wrapperStyles)
      inputWrapper.setAttribute('style', `width:${input.clientWidth}px`)
      const parent = input.parentNode ? input.parentNode : document.body
      parent.insertBefore(inputWrapper, input)
      inputWrapper.appendChild(input)
      document.documentElement.addEventListener('click', (e:MouseEvent) => {
        (e.target as HTMLElement).parentNode === inputWrapper
          ? input.classList.remove(closeState)
          : input.classList.add(closeState)
      })
      input.addEventListener('keyup', (e:KeyboardEvent) => {
        if (e.key === 'Shift') {
          autocompletize.shift = false
        }
      })
      input.addEventListener('keydown', (e:KeyboardEvent) => {
        const selectDown = () => {
          if (input.nextElementSibling) {
            e.preventDefault()
            let state = autocompletize.state
            const listItems = input.nextElementSibling.children
            if (state > -1) { listItems[state].classList.remove('active') }
            const length = listItems.length
            state = (state === length - 1) ? 0 : state + 1
            listItems[state].scrollIntoView({
              behavior: 'auto',
              block: 'nearest',
              inline: 'nearest'
            })
            listItems[state].classList.add('active')
            autocompletize.state = state
          }
        }
        const selectUp = () => {
          if (input.nextElementSibling) {
            e.preventDefault()
            let state = autocompletize.state
            const listItems = input.nextElementSibling.children
            if (state > -1) { listItems[state].classList.remove('active') }
            const length = listItems.length
            state = (state === 0) ? length - 1 : state - 1
            listItems[state].scrollIntoView({
              behavior: 'auto',
              block: 'nearest',
              inline: 'nearest'
            })
            listItems[state].classList.add('active')
            autocompletize.state = state
          }
        }
        if (e.key === 'Shift') {
          autocompletize.shift = true
        }
        if (e.key === 'ArrowDown') {
          console.log(e.key)
          selectDown()
          console.log(autocompletize.state)
        } else if (e.key === 'ArrowUp') {
          console.log(e.key)
          selectUp()
          console.log(autocompletize.state)
        } else if (e.key === 'Tab') {
          console.log(e.key)
          if (autocompletize.shift) {
            console.log('&Shift')
            selectUp()
          } else {
            selectDown()
          }
          console.log(autocompletize.state)
        } else if (e.key === 'Enter') {
          console.log(e.key)
          if (input.nextElementSibling) {
            input.value = input.nextElementSibling.children[autocompletize.state].innerHTML
            autocompletize.state = -1
            autocompletize.clear(input)
          }
          console.log(autocompletize.state)
        } else if (e.key === 'Escape') {
          console.log(e.key)
          if (input.nextElementSibling) {
            autocompletize.state = -1
            input.value = ''
            input.blur()
            autocompletize.clear(input)
          }
          console.log(autocompletize.state)
        }
      })
    }
  },
  clear: (target:HTMLInputElement) => {
    const listBox = target.nextElementSibling
    if (listBox) { listBox.remove() }
  },
  update: ({ target, data = [] }:autocompletizeDatalist) => {
    autocompletize.clear(target)
    if (data.length) {
      const inputWrapper = target.parentNode
      if (inputWrapper) {
        const listBox = document.createElement('div')
        listBox.id = (target.id || target.name) && `${target.id || target.name}-listBox`
        listBox.classList.add(listBoxStyles)
        inputWrapper.appendChild(listBox)
        for (const item of data) {
          const listItem = document.createElement('div')
          listItem.innerHTML = item
          listItem.addEventListener('click', (e:MouseEvent) => {
            target.value = (e.target as HTMLElement).innerHTML
            target.classList.add(closeState)
          })
          listBox.appendChild(listItem)
        }
      }
    } else {
      autocompletize.clear(target)
    }
  }
}

window.addEventListener('load', () => {
  autocompletize.init()
})

export default autocompletize
