/*! Be licensed under the terms of the MIT license. */

import { css } from 'emotion' /* MIT LICENSE */

interface AutocompleteDatalist {
  target: HTMLInputElement;
  data: Array<string>;
}

const wrapperStyles = css({
  position: 'relative',
  display: 'block',
  width: '100%'
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

const autocomplete = {
  state: -1,
  shift: false,
  init: () => {
    const inputs = document.getElementsByTagName('input')
    for (const input of Array.from(inputs)) {
      const inputWrapper = document.createElement('div')
      inputWrapper.classList.add(wrapperStyles)
      inputWrapper.id = (input.id || input.name) && `${input.id || input.name}-wrapper`
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
          autocomplete.shift = false
        }
      })
      input.addEventListener('keydown', (e:KeyboardEvent) => {
        const selectDown = () => {
          if (input.nextElementSibling) {
            e.preventDefault()
            let state = autocomplete.state
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
            autocomplete.state = state
          }
        }
        const selectUp = () => {
          if (input.nextElementSibling) {
            e.preventDefault()
            let state = autocomplete.state
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
            autocomplete.state = state
          }
        }
        if (e.key === 'Shift') {
          autocomplete.shift = true
        }
        if (e.key === 'ArrowDown') {
          console.log(e.key)
          selectDown()
          console.log(autocomplete.state)
        } else if (e.key === 'ArrowUp') {
          console.log(e.key)
          selectUp()
          console.log(autocomplete.state)
        } else if (e.key === 'Tab') {
          console.log(e.key)
          if (autocomplete.shift) {
            console.log('&Shift')
            selectUp()
          } else {
            selectDown()
          }
          console.log(autocomplete.state)
        } else if (e.key === 'Enter') {
          console.log(e.key)
          if (input.nextElementSibling) {
            input.value = input.nextElementSibling.children[autocomplete.state].innerHTML
            autocomplete.state = -1
            autocomplete.clear(input)
          }
          console.log(autocomplete.state)
        } else if (e.key === 'Escape') {
          console.log(e.key)
          if (input.nextElementSibling) {
            autocomplete.state = -1
            input.value = ''
            input.blur()
            autocomplete.clear(input)
          }
          console.log(autocomplete.state)
        }
      })
    }
  },
  clear: (target:HTMLInputElement) => {
    const listBox = target.nextElementSibling
    if (listBox) { listBox.remove() }
  },
  update: ({ target, data = [] }:AutocompleteDatalist) => {
    autocomplete.clear(target)
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
      autocomplete.clear(target)
    }
  }
}

window.addEventListener('load', () => {
  autocomplete.init()
})

export default autocomplete
