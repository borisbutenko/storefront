import JSZip from 'jszip'
import saveAs from 'save-as'
import { getImageBlob, cleanDOM, gtagSetup } from '../util'

/**
 * Adds a service worker that caches the static assets.
 */
function createSW (output, { images = [] } = {}) {
  output.file('sw.js', `
    const staticCacheName = 'bbuilder-static-v1';

    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
          return cache.addAll([
            '/',
            '/assets/js/main.js',
            ${images.map(i => "'/public/image/" + i.name + "'").join(',').trim(',')}
          ]);
        })
      );
    });

    function serveAsset(request) {
      return caches.open(staticCacheName).then(function(cache) {
        return cache.match(request).then(function(response) {
          if (response) return response;

          return fetch(request).then(function(networkResponse) {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      });
    }

    self.addEventListener('fetch', function(event) {
      const requestUrl = new URL(event.request.url);

      if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/') {
          event.respondWith(caches.match('/'));
          return;
        }
        if (requestUrl.pathname.startsWith('/public/')) {
          event.respondWith(serveAsset(event.request));
          return;
        }
      }

      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });
  `)

  const scripts = output.folder('assets/js')
  scripts.file('main.js', `
    function registerSW () {
      if (!navigator.serviceWorker) return;
      if (location.protocol !== 'http:' || location.protocol !== 'https:') return;
      navigator.serviceWorker.register('/sw.js').then(function (reg) {
        console.log('SW registered!');
      });
    }

    registerSW();
  `)
}

/**
 * Adds some PWA features.
 */
function createPWA (output, payload) {
  createSW(output, payload)
}

function download (assets) {
  const frag = this.outputFragment()
  const artboard = frag.querySelector('#artboard')
  const title = this.settings.title
  const zip = new JSZip()
  const output = zip.folder('project')
  const jsFolder = output.folder('js/')

  var promise = new Promise((resolve, reject) => {
    const assetsClient = new XMLHttpRequest()
    assetsClient.open('GET', assets.js)
    assetsClient.onload = function () {
      resolve(this.response)
    }
    assetsClient.send(null)
  })
    .then((content) => {
      jsFolder.file('cjs.js', content)
      return content
    })
    .then(() => {
      cleanDOM(frag)
      let styles = this.getCss(frag)
      let bodyStyles = this.getBodyStyles()
      let video = this.settings.video ? this.getVideoBg(this.settings.video) : ''
      let og = this.settings.ogTags ? this.getOgMetaTags(this.settings.ogTags) : ''
      let icon = this.settings.favicon
      let scrollSetup = this.getScrollSetup()
      let gtm = this.gtmSetup(this.settings.gtmId)
      let gtag = gtagSetup(this.settings.gtag)
      output.file('index.html',
        `<html>
          <head>
            ${gtm.head}
            ${gtag}
            <title>${title}</title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="shortcut icon" href="${icon}"/>
            <link href="https://fonts.googleapis.com/css?family=Lato|Heebo|PT+Serif|Montserrat:400,800&amp;subset=cyrillic" rel="stylesheet">
            ${scrollSetup.style}
            ${og}
            <style>
              ${styles}
            </style>
          </head>
          <body style="${bodyStyles}">
            ${gtm.body}
            <div class="main">
              ${artboard.innerHTML}
            </div>
            ${video}
          <script src="js/cjs.js"></script>
          ${scrollSetup.setup}
          </body>
        </html>`)

      zip.generateAsync({ type: 'blob' }).then((blob) => {
        saveAs(blob, 'project.zip')
      })
    })
}

export default function install ({ builder }) {
  builder.download = download
};
