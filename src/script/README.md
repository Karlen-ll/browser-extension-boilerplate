# Scripts

## Directory structure

      utils/      Helpers and utils scripts
      vendor/     Libraries vendor scripts
      README      this file

We only need to create the background or event script files 
— Chrome will create the page they run in automatically

## Background

A background.js is useful and commonly used:
  * Runs in the background when the extension is used
  * Contains the main logic for the extension
  * Can take up a lot of memory

## Event

An event.js is a light-weight alternative to a background.js:
  * Just like a background.js in that it contains state for the extension
  * Doesn't run all the time, just when required

## Content

All files for an extension run in a single process
  * Can call functions from in one file from another in the extension
  * Any files can modify the DOM of an extension

The only exception is a content script:
  * Used to interact with the page loaded in the browser
  * Runs in the context of the page, not the extension
  * Can communicate with the extension via messages if required

## localStorage

Common to use localStorage for an extension to store state or options.
Need to consider Incognito mode:
  * Store no information about the user
  * Easy to detect 
