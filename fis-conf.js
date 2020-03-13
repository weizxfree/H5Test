require("fis3-media-extend")(fis)

var html_minify = require('html-minifier').minify
var fs = require('fs')

// 不产出一些文件
var unReleaseFiles = [
  'mock/**',
  'api/**',
  '*.md',
  'partials/*',
  'bin/*',
  'pages/_layout/*',
  'node_modules/**',
  'package.json',
  'fis-conf.js',
  'Makefile',
  'yarn.lock',
  'var_config.js'
]

function config_replace(content, define) {
  for (var name in define) {
    content = content.replace("##" + name + "##", define[name])
  }
  return content
}

fis.set('project.md5Connector', '.')
fis.set('project.ignore', [
  '*.json',
  '*.md',
  '*.markdown',
  'demo/**',
  'dist/**',
  'output/**',
  '*.log',
  'node_modules/**',
  'test/**',
  'front/**'
])

fis.match('*.less', {
  // fis-parser-less 插件进行解析
  parser: fis.plugin('less'),
  postprocessor: fis.plugin('postcss', {
    sourceMap: false
  }),
  // .less 文件后缀构建后被改成 .css 文件
  rExt: '.css'
})

fis.match('*.js', {
  parser: fis.plugin('babel-5.x', {
    blacklist: ['useStrict'],
    stage: 3
  })
})

fis.match('*.tmpl', {
  isHtmlLike: true
})

// 模块化
fis.hook('commonjs')
fis.match('/libs/**.js', {
  isMod: true
})
fis.match('/utils/**.js', {
  isMod: true
})
fis.match('/modules/**.js', {
  isMod: true
})

fis.match('/mock/**', {
  release: '$0'
})

fis.match('/mock/server.conf', {
  release: '/config/server.conf'
})

// page里的业务JS增加包裹
fis.match('/pages/**/index.js', {
  preprocessor: function(content) {
    return '!function(window, document, undefined){SA.apply(function() {' + content + '})}(window, document)'
  }
})

fis.media("dist")
  .match('::packager', {
    spriter: fis.plugin('csssprites')
  })

  .match('*.{js,css,png,jpg,gif,less}', {
    useHash: true
  })

  .match('*.js', {
    optimizer: fis.plugin('uglify-js', {
      // 文档：http://lisperator.net/uglifyjs/compress
      compress: {
        // 去除console的代码
        drop_console: true,
        // discard unreachable code
        dead_code: true,
        unused: true,
        // 变量提前
        hoist_vars: true,
        hoist_funs: true,

        evaluate: true,
        booleans: true,
        conditionals: true
      }
    })
  })

  .match('*.{css,less}', {
    useSprite: true,
    optimizer: fis.plugin('clean-css', {
      // keepSpecialComments: false
    })
  })

  .match('*.png', {
    optimizer: fis.plugin('png-compressor')
  })

  .match('*.html', {
    parser: fis.plugin('jdists', {
      remove: "debug,test"
    }),
    optimizer: function(content) {
      return html_minify(content, {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        useShortDoctype: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
      })
    }
  })
  .match('*.html', {
    parser: fis.plugin('jdists', {
      remove: "debug,test"
    })
  })

fis.media("qa")
  .match('*.{js,css,less,png,gif,jpg,svg}', {
    release : '$0',
    url : '/h5$0'
  })
  .match('pages/(**/*.*)', {
    release : '$1'
  })


unReleaseFiles.forEach(function(item) {
  fis.media("qa").match(item, {
    release: false
  })
})

// QA环境
fis.extendMedia("dist", "qa")
// 线上环境
fis.extendMedia("qa", "prod")
