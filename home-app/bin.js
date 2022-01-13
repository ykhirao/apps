#! /usr/bin/env node

var readlineSync = require('readline-sync'),
  MAX = 100,
  MIN = 0,
  man = 80,
  home = 20,
  key,
  cnt = 0

console.log('\n\n')
console.log(new Array(10).join(' ') + '家が逃げるので捕まえよう！！')
console.log(
  new Array(10).join(' ') + '[H] <- -> [L]  ↓[J]  ↑[K]  途中終了[Space!!]\n'
)
console.log('\n\n')

while (true) {
  cnt++
  const manIcon = man % 2 === 0 ? '🚶' : '🏃'
  arr = new Array(MAX).fill('-')
  arr[man] = manIcon
  arr[home] = '🏠'
  const text = `\x1B[1A\x1B[K|${arr.join('')}|`
  console.log(text)
  console.log('')

  if (man === home) break

  key = readlineSync.keyIn('', { hideEchoBack: true, mask: '', limit: 'hljk ' })
  if (key === 'h') {
    if (man > MIN) {
      man--
    }
  } else if (key === 'l') {
    if (man < MAX) {
      man++
    }
  } else if (key === 'j' || key === 'k') {
    // no move
  } else {
    break
  }

  for (var i = 0; i < 8; i++) {
    const num = Math.floor(Math.random() * 2) + 1
    if (num === 1) {
      if (home > MIN) {
        home--
      }
    } else if (num === 2) {
      if (home < MAX) {
        home++
      }
    }
  }
}
console.log('\n\n')

console.log(`${cnt}歩で家に帰れました🎉🎉🎉🎉\n\n\n`)

console.log(`::::::／＼::::::
::::／／＼＼::::
::／／田田＼＼::
／／┌─┬┐＼＼
￣││ o││∥￣
爻││_ ││∥彡 
""'""'""'""'""'"'""" '" '" " 

`)
