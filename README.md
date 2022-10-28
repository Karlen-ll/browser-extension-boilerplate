# Browser extension boilerplate

## Project directory

      dist/         Distribution files
      srs/          Resource files
      static/       Assert files
      README        this file
      
## Upload to Chrome:

The directory holding the manifest file can be added as an extension in developer mode in its current state.

- Open the Extension Management page by navigating to `chrome://extensions`.
    * Alternatively, open this page by clicking on the Extensions menu button
      and selecting **Manage Extensions** at the bottom of the menu.
    * Alternatively, open this page by clicking on the Chrome menu,
      hovering over **More Tools** than selecting **Extensions**.
- Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
- Click the **Load unpacked** button and select the extension directory.

![Upload Chrome extension](/assert/chrome.png)


# Instruction

### Project setup
```
npm install
```

### Compiles

Compiles for **development**:
```
npm run dev
```

Compiles and minifies for **production**
```
npm run build
```

### Live server
```
npm run start
```

### Linters
```
eslint:inspect
eslint:fix
```
```
stylelint:inspect
stylelint:fix
```
```
linters:inspect
linters:fix
```

### Testing
```
npm run test
```


## Links:
* [Chrome extensions samples](https://github.com/GoogleChrome/chrome-extensions-samples)
