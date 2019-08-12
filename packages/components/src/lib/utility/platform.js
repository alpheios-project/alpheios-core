import { PsEvent } from 'alpheios-data-models'

export default class Platform {
  constructor (setRootAttributes = false) {
    this.getData()

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

    this.viewport = {
      width: window.innerWidth && document.documentElement.clientWidth && document.body.clientWidth
        ? Math.min(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth)
        : document.body.clientWidth || window.innerWidth || document.documentElement.clientWidth,

      height: window.innerHeight && document.documentElement.clientHeight
        ? Math.min(window.innerHeight, document.documentElement.clientHeight)
        : window.innerHeight || document.documentElement.clientHeight
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
      console.warn(`Alpheios cannot determine the orientation of this device, assuming "portrait"`)
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
      console.warn(`Alpheios cannot determine what platform this is - either document or documentElement are not defined`)
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
