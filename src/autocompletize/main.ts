/*! Be licensed under the terms of the MIT license. */

import { css } from 'emotion' /*! MIT LICENSE */

const asyncFunc = (func:(...args:any) => any) => {
  return new Promise((resolve) => {
    setTimeout(resolve)
  })
    .then(func)
    .catch(err => console.error(err))
}

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
  selected: number
  shift: boolean
  timeId: number

  constructor (target:HTMLInputElement) {
    if (new.target !== Form) { throw new Error('Form() must be called with new') }
    this.target = target
    this.selected = -1
    this.shift = false
    this.timeId = 0
    this.init()
  }

  clear () {
    const listBox = this.target.nextElementSibling
    if (listBox) { listBox.remove() }
  }

  initSync () {
    console.log('initializing: ', this.target)
    const input = this.target
    const selectDown = (e:KeyboardEvent) => {
      if (input && input.nextElementSibling) {
        e.preventDefault()
        const listItems = input.nextElementSibling.children
        if (this.selected >= 0) { listItems[this.selected].classList.remove('active') }
        const length = listItems.length
        this.selected = (this.selected === length - 1) ? 0 : this.selected + 1
        listItems[this.selected].scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
          inline: 'nearest'
        })
        listItems[this.selected].classList.add('active')
      }
    }
    const selectUp = (e:KeyboardEvent) => {
      if (input && input.nextElementSibling && (this.selected !== -1)) {
        e.preventDefault()
        const listItems = input.nextElementSibling.children
        listItems[this.selected].classList.remove('active')
        const length = listItems.length
        this.selected = (this.selected === 0) ? length - 1 : this.selected - 1
        listItems[this.selected].scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
          inline: 'nearest'
        })
        listItems[this.selected].classList.add('active')
      }
    }
    const inputWrapper = document.createElement('div')
    inputWrapper.id = `${input.id || input.name || Math.random().toString(32).substring(2)}-wrapper`
    inputWrapper.classList.add(wrapperStyles)
    const parent = input.parentNode ? input.parentNode : document.body
    parent.insertBefore(inputWrapper, input)
    inputWrapper.appendChild(input)
    /* resizeObserver */
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        console.log('resize: ', entry.target)
        inputWrapper.removeAttribute('style')
        inputWrapper.setAttribute('style', `width:${(input as HTMLInputElement).offsetWidth}px`)
      }
    })
    inputWrapper.parentElement && resizeObserver.observe(inputWrapper.parentElement)
    /* addEventListener */
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
        console.log(this.selected)
      } else if (e.key === 'ArrowUp') {
        console.log(e.key)
        selectUp(e)
        console.log(this.selected)
      } else if (e.key === 'Tab') {
        console.log(e.key)
        if (this.shift) {
          console.log('&Shift')
          selectUp(e)
        } else {
          selectDown(e)
        }
        console.log(this.selected)
      } else if (e.key === 'Enter') {
        console.log(e.key)
        if (input.nextElementSibling && this.selected !== -1) {
          input.value = input.nextElementSibling.children[this.selected].innerHTML
          this.selected = -1
          this.clear()
        }
        console.log(this.selected)
      } else if (e.key === 'Escape') {
        console.log(e.key)
        if (input.nextElementSibling) {
          this.selected = -1
          input.classList.add(closeState)
          input.blur()
        }
        console.log(this.selected)
      }
    })
    console.log('initialized: ', this.target)
  }

  init () {
    asyncFunc(() => this.initSync())
  }

  updateSync (data:Array<string>) {
    this.clear()
    const input = this.target
    if (data.length) {
      const inputWrapper = input.parentNode
      if (inputWrapper) {
        const listBox = document.createElement('div')
        listBox.id = `${input.id || input.name || Math.random().toString(32).substring(2)}-listBox`
        listBox.classList.add(listBoxStyles)
        inputWrapper.appendChild(listBox)
        for (const item of data) {
          const listItem = document.createElement('div')
          listItem.innerHTML = item
          listItem.addEventListener('click', (e:MouseEvent) => {
            input.value = (e.target as HTMLElement).innerHTML
            input.classList.add(closeState)
          })
          listBox.appendChild(listItem)
        }
      }
    } else {
      this.clear()
    }
  }

  update (data:Array<string>) {
    asyncFunc(() => this.updateSync(data))
  }

  observe ():Promise<string> {
    return new Promise((resolve) => {
      const input = this.target
      const prevValue = input.value
      if (this.timeId) {
        window.clearTimeout(this.timeId)
        this.timeId = 0
      }
      this.timeId = window.setInterval(() => {
        // console.log('observer:', this.timeId)
        if (input.value !== prevValue) {
          window.clearTimeout(this.timeId)
          resolve(input.value)
        }
      }, 600)
    })
  }

  async changed (func:(res?: string) => void) {
    const res = await this.observe().catch(err => { throw new Error(err) })
    await asyncFunc(() => func(res))
    this.changed(func)
  }
}

export default Form
