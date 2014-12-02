# gimme-files by [@michalbe](http://github.com/michalbe) #
Scraper for the file search engine

### What? ###
This is a successor of the [filestube-client](https://www.npmjs.org/package/filestube-client) package I worked on earlier this year. Since 01.12.2014 filestube.to is no longer a search engine, because of what `gimme-files` uses [generalfil.es](http://generalfil.es) instead.

### How to use: ###
```
npm install gimme-files
```
then:
```javascript
var gf = require('gimme-files');

// grab all the files
gf("Stawka wieksza niz zycie", function(err, links) {
  if (err) {
    return;
  }

  console.log(links);
  // [
  //  'http://yoelo.jczc.hwdp/t92s9ocbxxiu',
  //  'http://yoelo.jczc.hwdp/1p1vn4z4tywt',
  //  'http://yoelo.jczc.hwdp/2pv7itp15bro',
  //  'http://yoelo.jczc.hwdp/1hp502a4azc3',
  //  'http://yoelo.jczc.hwdp/i61g6rdtjzsx',
  //  'http://yoelo.jczc.hwdp/uegqx6j6ksh0',
  //  'http://yoelo.jczc.hwdp/gvtrzlv9nadv',
  //  'http://yoelo.jczc.hwdp/stxsc5spt21z',
  //  'http://yoelo.jczc.hwdp/eaz48aa6psbn',
  //  'http://yoelo.jczc.hwdp/rexpk547h0em',
  //  'http://yoelo.jczc.hwdp/03l1d169voq0'
  // ]
});
  ```

### To Do ###
All the search options [filestube-client](https://www.npmjs.org/package/filestube-client) supported:
 * hosting
 * file size
 * file type
