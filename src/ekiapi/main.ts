/*! Be licensed under the terms of the MIT license. */

import axios from 'axios' /*! MIT LICENSE */

const getEkiList = (apiKey: string, target:HTMLInputElement) => {
  return new Promise((resolve) => {
    const url = 'https://api.ekispert.jp/v1/json/station/light'
    const name = target.value
    if (name) {
      if (apiKey) {
        const data = {
          params: {
            key: apiKey,
            name: name
          }
        }
        axios.get(url, data)
          .then(res => {
            const obj = JSON.parse((JSON.stringify(res.data)))
            const ekiList = obj.ResultSet
              ? obj.ResultSet.Point
                ? Array.isArray(obj.ResultSet.Point)
                  ? obj.ResultSet.Point
                  : [obj.ResultSet.Point]
                : []
              : []
            const ekiNames = ekiList.reduce((obj:Array<String>, d:{Station:{Name:String}}) => {
              obj.push(d.Station.Name)
              return obj
            }, [])
            console.log(ekiNames)
            resolve(ekiNames)
          })
          .catch((err) => console.error(err))
      } else {
        const obj = { ResultSet: { apiVersion: '1.27.0.0', engineVersion: '202004_02a', Point: [{ Station: { code: '22492', Name: '秋葉原', Type: 'train', Yomi: 'あきはばら' }, Prefecture: { code: '13', Name: '東京都' } }, { Station: { code: '22496', Name: '浅草橋', Type: 'train', Yomi: 'あさくさばし' }, Prefecture: { code: '13', Name: '東京都' } }, { Station: { code: '22507', Name: '飯田橋', Type: 'train', Yomi: 'いいだばし' }, Prefecture: { code: '13', Name: '東京都' } }, { Station: { code: '22513', Name: '池袋', Type: 'train', Yomi: 'いけぶくろ' }, Prefecture: { code: '13', Name: '東京都' } }, { Station: { code: '22520', Name: '市ケ谷', Type: 'train', Yomi: 'いちがや' }, Prefecture: { code: '13', Name: '東京都' } }, { Station: { code: '22528', Name: '上野', Type: 'train', Yomi: 'うえの' }, Prefecture: { code: '13', Name: '東京都' } }, { Station: { code: '22531', Name: '鶯谷', Type: 'train', Yomi: 'うぐいすだに' }, Prefecture: { code: '13', Name: '東京都' } }, { Station: { code: '22548', Name: '恵比寿', Type: 'train', Yomi: 'えびす' }, Prefecture: { code: '13', Name: '東京都' } }, { Station: { code: '22558', Name: '大久保(東京都)', Type: 'train', Yomi: 'おおくぼ' }, Prefecture: { code: '13', Name: '東京都' } }, { Station: { code: '22559', Name: '大崎', Type: 'train', Yomi: 'おおさき' }, Prefecture: { code: '13', Name: '東京都' } }, { Station: { code: '22570', Name: '御徒町', Type: 'train', Yomi: 'おかちまち' }, Prefecture: { code: '13', Name: '東京都' } }] } }
        const ekiList = Array.isArray(obj.ResultSet.Point) ? obj.ResultSet.Point : [obj.ResultSet.Point]
        const ekiNames = ekiList.reduce((obj:Array<string>, d:{Station:{Name:string}}) => {
          obj.push(d.Station.Name)
          return obj
        }, [])
        resolve(ekiNames)
      }
    } else {
      resolve([])
    }
  })
}

export { getEkiList }
