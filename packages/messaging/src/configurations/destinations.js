/**
 * This is a configuration of a WindowsIframeDestination that can be used to connect to CEDICT client service.
 *
 * @type {{targetIframeID: string, name: string, targetURL: string}}
 */
export const CedictDestinationConfig = {
  name: 'cedict',
  targetURL: 'https://lexis-dev.alpheios.net',
  targetIframeID: 'alpheios-lexis-cs'
}
/**
 * This is a development version of the above configuration
 *
 * @type {{targetIframeID: string, name: string, targetURL: string}}
 */
export const CedictDestinationDevConfig = {
  name: 'cedict',
  targetURL: 'https://lexis-dev.alpheios.net/index-dev.html',
  targetIframeID: 'alpheios-lexis-cs'
}
