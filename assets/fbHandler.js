/* global ekiapi, autocomplete */
/* global fb */

const process = {
  env: {
    ekiApiKey: ''/* Leave blank or Put your api key (駅すぱあと) */
  }
}

fb.events.form.mounted = [function (state) {
  console.log(state)
  const target = fb.getElementByCode('dep1')
  const getChildren = (nodes) => {
    for (const node of nodes.children) {
      if (node.tagName === 'INPUT') {
        node.id = 'dep1'
        node.addEventListener('input', (e) => {
          ekiapi.get(process.env.ekiApiKey, node, autocomplete.update)
        })
      } else {
        getChildren(node)
      }
    }
  }
  getChildren(target)
  return state
}]
