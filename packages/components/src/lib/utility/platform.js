import { PsEvent, Logger } from 'alpheios-data-models'

export default class Platform {
  constructor ({ setRootAttributes = false, appType = Platform.appTypes.OTHER } = {}) {
    this.getData()
    // It's a caller responsibility to set a correct application type
    this._appType = appType

    if (setRootAttributes) {
      this.setRootAttributes()
    }

    // Detect device's orientation change in order to update panel layout
    window.addEventListener('orientationchange', this.getData.bind(this), { passive: true })

    // Some platforms fires no `orientationchange` event
    // For them, a `resize` event can provide a substitute
    window.addEventListener('resize', this.getData.bind(this), { passive: true })
  }

  /**
   * Retrieves data about a platform. Need to run it after each on of platform characteristics
   * may change (such as orientation, viewport size, etc.).
   */
  getData () {
    this.deviceType = this.constructor.getDeviceType()

    const prevOrientation = this.orientation
    this.orientation = this.constructor.getOrientation()
    if (this.orientation !== prevOrientation) {
      // Orientation has been changed
      this.constructor.evt.ORIENTATION_CHANGE.pub({ orientation: this.orientation })
    }

    /*
    If document is in a quirks mode (see https://www.w3.org/TR/2016/WD-cssom-view-1-20160317/#dom-element-clientheight)
    then `document.body.clientHeight` should be used instead of `document.documentElement.clientHeight`.
    In a quirks mode a value of `document.compatMode` will be "BackCompat"
    (see https://developer.mozilla.org/en-US/docs/Web/API/Document/compatMode)
     */
    const clientHeight = (document.compatMode === 'BackCompat')
      ? document.body.clientHeight
      : document.documentElement.clientHeight

    this.scrollbars = {
      horizontal: {
        width: window.innerHeight - clientHeight
      },
      vertical: {
        width: window.innerWidth - document.documentElement.clientWidth
      }
    }

    this.viewport = {
      // A width of the viewport that includes the width of the scrollbars, if they are shown
      width: window.innerWidth,
      // A height of the viewport that includes the width of the scrollbars, if they are shown
      height: window.innerHeight,
      /*
      A width of the viewport that does not include the width of the scrollbars.
      If a vertical scrollbar is shown, `innerWidth` will be smaller than `width`.
      If a vertical scrollbar is hidden, `innerWidth` will have the same value as `width`.
       */
      innerWidth: window.innerWidth - this.scrollbars.vertical.width,
      /*
      A height of the viewport that does not include the width of the scrollbars.
      If a horizontal scrollbar is shown, `innerHeight` will be smaller than `height`.
      If a horizontal scrollbar is hidden, `innerHeight` will have the same value as `height`.
       */
      innerHeight: window.innerHeight - this.scrollbars.horizontal.width
    }

    this.dpr = window.devicePixelRatio
  }

  /**
   * Determines what version of a UI shall be used.
   *
   * @returns {string} - A name of one of the deviceTypes defined in {@link Platform@deviceTypes}.
   */
  static getDeviceType () {
    // TODO: Probably need a more complex algorithm for the future
    const screenWidthThreshold = 900
    return Math.max(window.screen.width, window.screen.width) <= screenWidthThreshold
      ? this.deviceTypes.MOBILE
      : this.deviceTypes.DESKTOP
  }

  /**
   * Determines if the page is on google.docs.com
   *
   * @returns {boolean} - true if it is on google.docs
   */
  static getIsGoogleDocs () {
    return window.location.hostname === 'docs.google.com'
  }

  /**
   * Determines a screen orientation of a device.
   *
   * @returns {string} - A name of the screen orientation as defined in {@link Platform@orientations}.
   */
  static getOrientation () {
    if (typeof window.screen.orientation === 'object') {
      // ScreenOrienation API is supported
      return window.screen.orientation.type
    } else if ('orientation' in window) {
      // This is most likely an iOS or MacOS device. There is no ScreenOrienation API support.
      // We'll use the `orientation` property which returns an angole of rotation.
      return (Math.abs(parseInt(window.orientation, 10)) === 90) ? this.orientations.LANDSCAPE : this.orientations.PORTRAIT
    } else {
      Logger.getInstance().warn('Alpheios cannot determine the orientation of this device, assuming "portrait"')
      return this.orientations.PORTRAIT
    }
  }

  setRootAttributes () {
    if (document && document.documentElement) {
      document.documentElement.dataset.apScreenOrientation = this.isPortrait ? 'portrait' : 'landscape'
      document.documentElement.dataset.apLayoutType = this.isDesktop ? 'large' : 'compact'

      const bodyOrientationClass = this.isPortrait ? 'alpheios-layout-portrait' : 'alpheios-layout-landscape'
      document.body.classList.add(bodyOrientationClass)
    } else {
      Logger.getInstance().warn('Alpheios cannot determine what platform this is - either document or documentElement are not defined')
    }
  }

  get isDesktop () {
    return this.deviceType === this.constructor.deviceTypes.DESKTOP
  }

  get isMobile () {
    return this.deviceType === this.constructor.deviceTypes.MOBILE
  }

  get isAny () {
    return this.deviceType === this.constructor.deviceTypes.ANY
  }

  get isPortrait () {
    // Portrait is a default orientation, so we assume that if it is not a landscape, it is a portrait
    return !this.isLandscape
  }

  get isLandscape () {
    return /landscape/.test(this.orientation)
  }

  get isWebextension () {
    return this._appType === Platform.appTypes.WEBEXTENSION
  }

  get isSafariAppExtension () {
    return this._appType === Platform.appTypes.SAFARI_APP_EXTENSION
  }

  get isEmbeddedLibrary () {
    return this._appType === Platform.appTypes.EMBEDDED_LIBRARY
  }

  get isGoogleDocs () {
    return this.constructor.getIsGoogleDocs()
  }

  /**
   * Returns orientation in its simple form (either "portrait" or "landscape"), not taking into
   * consideration an exact rotation angle (as in "primary" or "secondary").
   *
   * @returns {string} Orientation string which is either "portrait" or "landscape"
   */
  get simpleOrientation () {
    return this.isLandscape ? this.constructor.orientations.LANDSCAPE : this.constructor.orientations.PORTRAIT
  }
}

/**
 * Constants that determines types of devices where an app is running.
 * Used by modules and components to tweak their appearance.
 */
Platform.deviceTypes = {
  /**
   * An environment with limited screen estate with finger-based interactions.
   */
  MOBILE: 'mobile',

  /**
   * Environment with larger screens and mouse-based interactions.
   */
  DESKTOP: 'desktop',

  /**
   * Indicates a platform agnostic value.
   */
  ANY: 'any'
}

/**
 * Constants that determines types of applications which uses the Alpheios libraries..
 * Used by modules and components to tweak their appearance.
 */
Platform.appTypes = {
  /**
   * A webextension for either Chrome or Firefox.
   */
  WEBEXTENSION: 'webextension',

  /**
   * A Safari App Extension.
   */
  SAFARI_APP_EXTENSION: 'safari app extension',

  /**
   * An Alpheios embedded library.
   */
  EMBEDDED_LIBRARY: 'embedded library',

  /**
   * Other or unknown application type.
   */
  OTHER: 'other'
}

/**
 * Constants for screen orientations.
 */
Platform.orientations = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape'
}

/**
 * Description of a Platform event interface.
 */
Platform.evt = {
  /**
   * Published when device orientation is changed.
   * Data: {
   *  {Platform.orientations} orientation - A device orientation string.
   * }
   */
  ORIENTATION_CHANGE: new PsEvent('Platform Orientation Change', Platform)
}
