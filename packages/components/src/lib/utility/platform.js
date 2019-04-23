import HTMLPage from '@/lib/utility/html-page.js'

export default class Platform {
  constructor () {
    this.deviceType = HTMLPage.getDeviceType()
    this.orientation = HTMLPage.getOrientation()
  }

  get isDesktop () {
    return this.deviceType === HTMLPage.deviceTypes.DESKTOP
  }

  get isMobile () {
    return this.deviceType === HTMLPage.deviceTypes.MOBILE
  }

  get isAny () {
    return this.deviceType === HTMLPage.deviceTypes.ANY
  }

  get isPortrait () {
    return this.orientation === HTMLPage.orientations.PORTRAIT
  }

  get isLandscape () {
    return this.orientation === HTMLPage.orientations.LANDSCAPE
  }
}
