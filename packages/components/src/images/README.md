In Jest testing all SVG files are transformed by `vue-svg-loader` before they are supplied into the `babel-jest`. 
During regular builds all SVG files are processed by SVGO that cleans them up. We cannot, however, use
SVGO during Jest transpiling: Jest transformers are synchronous and SVGO is not. As a result, all SVG files need to be cleaned up manually before they can be processed with
Jest `vue-svg-loader` transformer. This, among other things, requires:
* Not having any `<style>` elements within SVG files;
* SVGs must have only one root element, namely, the `<svg>`.
Not meeting these conditions will make the Jest transformer to fail.

As an alternative, all SVG files can go through SVGO before being stored in VCS.

Please see https://github.com/visualfanatic/vue-svg-loader/issues/38 for more details.

`svgTransform.js` in the root directory of the package has the code that does the transformation.