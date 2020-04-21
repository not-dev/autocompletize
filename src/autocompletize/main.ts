/*! Be licensed under the terms of the MIT license. */

import { css } from 'emotion' /* MIT LICENSE */

const wrapperStyles = css({
  position: 'relative',
  '& *': {
    boxSizing: 'border-box'
  }
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

class Form {
  target: HTMLInputElement
  state: number
  shift: boolean
  runObserve: boolean

  constructor (target:HTMLInputElement){
    this.target = target
    this.state = -1
    this.shift = false
    this.runObserve = false
    this.init()
  }
  clear (){
    const listBox = this.target.nextElementSibling
    if (listBox) { listBox.remove() }
  }
  initSync (){
    console.log('initializing')
    const selectDown = (e:KeyboardEvent) => {
      const input = <HTMLInputElement>e.target
      if (input && input.nextElementSibling) {
        e.preventDefault()
        const listItems = input.nextElementSibling.children
        if (this.state > -1) { listItems[this.state].classList.remove('active') }
        const length = listItems.length
        this.state = (this.state === length - 1) ? 0 : this.state + 1
        listItems[this.state].scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
          inline: 'nearest'
        })
        listItems[this.state].classList.add('active')
      }
    }
    const selectUp = (e:KeyboardEvent) => {
      const input = <HTMLInputElement>e.target
      if (input && input.nextElementSibling) {
        e.preventDefault()
        const listItems = input.nextElementSibling.children
        if (this.state > -1) { listItems[this.state].classList.remove('active') }
        const length = listItems.length
        this.state = (this.state === 0) ? length - 1 : this.state - 1
        listItems[this.state].scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
          inline: 'nearest'
        })
        listItems[this.state].classList.add('active')
      }
    }
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        console.log(`resize: ${entry.target.outerHTML}`)
        const parent = entry.target.parentElement
        parent && parent.setAttribute('style', `width:${(entry.target as HTMLInputElement).offsetWidth}px`)
      }
    })
    const inputs = document.getElementsByTagName('input')
    for (const input of Array.from(inputs)) {
      if (input.type === 'text') {
        const inputWrapper = document.createElement('div')
        inputWrapper.id = (input.id || input.name) && `${input.id || input.name}-wrapper`
        inputWrapper.classList.add(wrapperStyles)
        inputWrapper.setAttribute('style', `width:${input.clientWidth}px`)
        const parent = input.parentNode ? input.parentNode : document.body
        parent.insertBefore(inputWrapper, input)
        inputWrapper.appendChild(input)
        resizeObserver.observe(input)
        document.documentElement.addEventListener('click', (e:MouseEvent) => {
          (<HTMLElement>e.target).parentNode === inputWrapper
            ? input.classList.remove(closeState)
            : input.classList.add(closeState)
        })
        input.addEventListener('keyup', (e:KeyboardEvent) => {
          if (e.key === 'Shift') {
            this.shift = false
          }
        })
        input.addEventListener('keydown', (e:KeyboardEvent) => {
          if (e.key === 'Shift') {
            this.shift = true
          }
          if (e.key === 'ArrowDown') {
            console.log(e.key)
            selectDown(e)
            console.log(this.state)
          } else if (e.key === 'ArrowUp') {
            console.log(e.key)
            selectUp(e)
            console.log(this.state)
          } else if (e.key === 'Tab') {
            console.log(e.key)
            if (this.shift) {
              console.log('&Shift')
              selectUp(e)
            } else {
              selectDown(e)
            }
            console.log(this.state)
          } else if (e.key === 'Enter') {
            console.log(e.key)
            if (input.nextElementSibling && this.state !== -1) {
              input.value = input.nextElementSibling.children[this.state].innerHTML
              this.state = -1
              this.clear()
            }
            console.log(this.state)
          } else if (e.key === 'Escape') {
            console.log(e.key)
            if (input.nextElementSibling) {
              this.state = -1
              input.classList.add(closeState)
              input.blur()
            }
            console.log(this.state)
          }
        })
      }
    }
    console.log('initialized')
  }
  init (){
    return new Promise((resolve) => {
      window.setTimeout(() => resolve(this.initSync()))
    })
  }
  updateSync (data:Array<string>){
    this.clear()
    if (data.length) {
      const inputWrapper = this.target.parentNode
      if (inputWrapper) {
        const listBox = document.createElement('div')
        listBox.id = (this.target.id || this.target.name) && `${this.target.id || this.target.name}-listBox`
        listBox.classList.add(listBoxStyles)
        inputWrapper.appendChild(listBox)
        for (const item of data) {
          const listItem = document.createElement('div')
          listItem.innerHTML = item
          listItem.addEventListener('click', (e:MouseEvent) => {
            this.target.value = (e.target as HTMLElement).innerHTML
            this.target.classList.add(closeState)
          })
          listBox.appendChild(listItem)
        }
      }
    } else {
      this.clear()
    }
  }
  update (data:Array<string>){
    return new Promise((resolve) => {
      window.setTimeout(() => resolve(this.updateSync(data)))
    })
  }

}

export default Form
