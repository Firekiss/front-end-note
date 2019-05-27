const fs = require('fs');


fs.open('./3.txt', 'a', function(err, fd) {
    let buff = Buffer.from('海门');
    fs.write(fd, buff, 0, 3, function(err, written){});
});