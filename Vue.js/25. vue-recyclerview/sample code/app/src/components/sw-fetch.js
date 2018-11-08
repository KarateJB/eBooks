
const MAX_LIMIT=10;

const baseData = [
    {id: 1, name:'Luke Skywalker',gender:'male', img:'https://goo.gl/KEUxHN'},
    {id: 2,name:'Leia Skywalker',gender:'female',img:'https://goo.gl/rNJhLU'},
    {id: 3,name:'Anakin Skywalker',gender:'male',img:'https://goo.gl/rvcqJN'},
    {id: 4,name:'Padme (Amidala)',gender:'female',img:'https://goo.gl/CNr4WK'},
    {id: 5,name:'Rey',gender:'female',img:'https://goo.gl/NEfjfi'},
    {id: 6,name:'Obi Wan Kenobi',gender:'male',img:'https://goo.gl/7c5NkR'},
    {id: 7,name:'Mace Windu',gender:'male',img:'https://goo.gl/VZsqrH'},
    {id: 8,name:'Yoda',gender:'male',img:'https://goo.gl/uJQRGX'},
    {id: 9,name:'Darth Vader',gender:'male',img:'https://goo.gl/xcMHqj'},
    {id: 10,name:'Darth Sidious',gender:'male',img:'https://goo.gl/QJiJWx'},
    {id: 11,name:'Count Dooku',gender:'male',img:'https://goo.gl/sm76q7'},
    {id: 12,name:'Darth Maul',gender:'male',img:'https://goo.gl/ikbM7n'}
]

let id = 0

function pickeOne () {
    return baseData[Math.floor(Math.random() * baseData.length)]
}

function getItem () {
  return new Promise(resolve => {
    var item = pickeOne()
    item.id = ++id
    var image = new Image()
    image.src = item.img_url
    image.addEventListener('load', () => {
      resolve(item)
    })
    image.addEventListener('error', () => {
      item.img_url = ''
      resolve(item)
    })
  })
}

function query (limit, skip) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var items = []
      for (var i = 0; i < limit; i++) {
        items[i] = getItem()
      }
      resolve(Promise.all(items))
    }, 200)
  })
}

export default function fetch (limit, skip) {
  limit = Math.max(MAX_LIMIT, limit)
  return query(limit, skip)
  .then(list => {
    return {
      list: list,
      count: 1000
    }
  })
}

