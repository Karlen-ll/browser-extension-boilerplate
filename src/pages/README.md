# Architecture

      _layouts/     Supporting html components
      README        this file

> Subfolders whose names begin with `_` will not be included in the build

Use HTML files as views for:
* A popup
* An options page
* Any other view that we want to present to the user

The popup and options pages are special pages we can configure using the manifest.

Accessed via Chrome's UI instead of the extension directly:
* Popup is accessed via a button in the toolbar or Omnibox
* Options page is accessed from the context menu of the extension

Another special page is an override page:
* Bookmarks manager
* History page
* New tab page

# Usage <include>

index.html
```html
<html>
<head>
    <title>index.html</title>
</head>
<body>
    <include src="components/button.html" locals='{
        "text": "Button"
    }'></include>
</body>
</html>
```

components/button.html
```html
<button class="button"><div class="button__text">{{ text }}</div></button>
```

# Links:
* About package [PostHTML-include](https://www.npmjs.com/package/posthtml-include)
