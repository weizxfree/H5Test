# fis3-media-extend

继承一个FIS3的media到另一个media

## 安装

```
npm install fis3-media-extend --save-dev
```

## API

```
require("fis3-media-extend")(fis);

fis.media("dist")
  .match('::packager', {
    spriter: fis.plugin('csssprites')
  })

  .match('*.{js,css,png,jpg,gif,less}', {
    useHash: true
  })

fis.media("prod")
	.match('*.js', {
    optimizer: fis.plugin('uglify-js', {})
  })

fis.extendMedia("dist", "prod");
```






