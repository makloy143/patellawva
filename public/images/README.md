# Image Assets

Drop image files into this folder to host them locally instead of relying on
remote URLs (Unsplash, Sanity CDN, etc.).

## How to use

1. Add the image file here, e.g. `public/images/hero-portrait.jpg`.
2. Open `src/images.js` and update the corresponding entry to the new local
   path (anything in `public/` is served from the site root):

   ```js
   attorney: {
     portrait: '/images/hero-portrait.jpg',
   },
   ```

3. That's it — every page that references `attorney.portrait` automatically
   picks up the new file. No other code changes needed.

## Reference in markup

```html
<img data-image="attorney.portrait" alt="Bhavik D. Patel, Esq." />
```

For background images on a container, use `data-image-bg`:

```html
<div class="banner" data-image-bg="home.aboutLibrary"></div>
```

## Recommended specs

| Purpose                 | Width   | Format       | Notes                            |
| ----------------------- | ------- | ------------ | -------------------------------- |
| Attorney hero portrait  | 1200px+ | JPG / WebP   | Vertical orientation             |
| About / practice splits | 1200px+ | JPG / WebP   | Landscape, ~16:10 or 3:2         |
| Logos / icons           | any     | SVG          | Already in `public/` root        |

Keep file sizes under ~250 KB where possible — use a tool like Squoosh or
ImageOptim. Modern browsers handle WebP everywhere we need it.
