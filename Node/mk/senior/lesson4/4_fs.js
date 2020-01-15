const fs = require('fs')

// fs.writeFile('./file.txt', 'hello world', { encoding: 'utf8'}, (err) => {
//   if (err) throw err
  
//   console.log('写入成功!')
// })


// fs.rename('./file.txt', './fuck.pdf', () => {
//   console.log('改名成功!')
// })


// fs.unlink('./fuck.pdf', () => {
//   console.log('删除文件成功!')
// })


fs.stat('./file.txt', (err, stats) => {
  if (err) {
    return console.log('文件不存在')
  }

  console.log(stats.isDirectory())
  console.log(stats.isFile())
  console.log(stats)
})
