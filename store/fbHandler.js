/* global ekiapi, autocompletize */
/* global fb */

const process = {
  env: {
    ekiApiKey: ''/* Leave blank or Put your api key (駅すぱあと) */
  }
}

fb.events.form.mounted = [function (state) {
  console.log(state)
  const inputs = ['dep0', 'dep1']
  inputs.map((input) => {
    const target = fb.getElementByCode(input)
    /* オートコンプリートの初期化 */
    /* +++ */ const form = new autocompletize.Form(target)
    /* valueの変化を監視して、引数の関数を実行 */
    /* +++ */ form.changed((res) => console.log(res))
    const getChildren = (nodes) => {
      for (const node of nodes.children) {
        if (node.tagName === 'INPUT') {
          /* idがない場合自動生成します */
          /* --- */ // node.id = 'dep'
          const handleEvent = () => {
            /* --- */ // ekiapi.get(process.env.ekiApiKey, node, autocompletize.update)
            /* ekiapi.get(apiKey, target, callback) >> ekiapi.get(apiKey, target) */
            /* +++ */ ekiapi.get(process.env.ekiApiKey, node)
              /* 駅名リスト取得後に実行する処理 */
              /* --- */ // autocompletize.update
              /* autocompletize.update >> autocompletize.Form().update(Array) */
              /* +++ */ .then(res => form.update(res))
              /* エラー処理 */
              /* +++ */ .catch(err => console.error(err))
          }
          node.addEventListener('input', handleEvent)
          node.addEventListener('focus', handleEvent)
        } else {
          getChildren(node)
        }
      }
    }
    getChildren(target)
  })
  return state
}]
