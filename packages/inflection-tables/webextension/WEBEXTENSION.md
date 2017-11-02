#Development Notes

## WebExtension ID
Explicit WebExtension ID is not necessary ([https://developer.mozilla.org/en-US/Add-ons/WebExtensions/WebExtensions_and_the_Add-on_ID]).

However, Mozilla Firefox does not support `storage.local` and `storage.sync` for extensions with a temporary ID 
(i.e. for temporary extensions that are used during development, [https://bugzil.la/1323228]). Because of
that, ID must be provided in the `applications` section of `manifest.json`. However, Google Chrome will ignore it and produce
a warning (but `storage.local` and `storage.sync` will work in Chrome even with a temporary extension's ID
so not a big deal).

`applications` section can be removed once development is complete.

## `sendResponse` callback in `onMessage`
It seems that sendResponse is not supported by webextension-polyfill: 
[https://github.com/mozilla/webextension-polyfill/issues/16/#issuecomment-296693219]
The reason seems to be that a response callback might be removed from `onMessage` some time later. 
Because of that, we have to implement our own request-response matching mechanism with `MessagingService`.