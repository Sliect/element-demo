class Transition {
  beforeEnter(el) {

  }

  enter(el) {

  }

  afterEnter(el) {

  }

  beforeLeave(el) {

  }

  leave(el) {

  }

  afterLeave(el) {

  }
}

export default {
  name: 'ElCollapseTransition',
  functional: true,
  render(h, { children }) {
    console.log(children)
  }
}