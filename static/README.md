# Static

> This directory of project's auxiliary files

## Manifest.json

A manifest.json file is mandatory and provides:

* A description of the extension
* Configuration
  * The first three keys: manifest_version, name, and version, are mandatory and contain basic metadata for the extension.
  * description is optional, but recommended: it's displayed in the Add-ons Manager.
  * icons is optional, but recommended: it allows you to specify an icon for the extension, that will be shown in the Add-ons Manager.

### Templates:

#### Content Scripts
```json
{
  "content_scripts": [{
    "matches": [ "*://*/*" ],
    "js": [ "content.js" ],
    "css": [ "css/content.css" ]
  }]
}
```

#### Devtools
```json
{
  "devtools_page": "devtools.html" 
}
```

### Links:
* [MDN. Your first WebExtension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension)
* [Get Started](https://developer.chrome.com/docs/extensions/mv3/getstarted/#manifest)
* [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/)

