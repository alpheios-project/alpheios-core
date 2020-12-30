/** @module iriProvider */
import Sha1 from '@dmodels/sha1.js'
import { v4 as uuidv4 } from 'uuid'

export default class IRIProvider {
  /**
   * Creates an Internationalized Resource Identifier (IRI) according to the options provided.
   *
   * @param identityData.identityData
   * @param {object} [identityData] - an object containing information that will be used
   * to generate content-based IRI, such as MD5 hash. identityData keys will be sorted in
   * an ascending alphanumerical order and the values will be concatenated into a string.
   * This string will then be used to compute an IRI. Same identityData objects
   * will have the same IRI.
   * @param {IRIProvider.IRITypes} [type=IRIProvider.IRITypes.AUTO] - A type of the IRI to create.
   * Possible values:
   * - IRIProvider.IRITypes.AUTO: if identityData is provided, will calculate the MD5 Hash IRI.
   * Otherwise, will return a UUID version 4.
   * @param identityData.type
   * @returns {string} - A newly created IRI.
   */
  static getIRI ({ identityData = {}, type = IRIProvider.IRITypes.AUTO } = {}) {
    const getActions = new Map([
      [IRIProvider.IRITypes.AUTO,
        () => IRIProvider._isValidIdentityData(identityData)
          ? IRIProvider._getMD5Hash(identityData)
          : IRIProvider._getUUIDv4()],

      [IRIProvider.IRITypes.MD5_HASH, () => IRIProvider._getMD5Hash(identityData)],

      [IRIProvider.IRITypes.UUID_V4, () => IRIProvider._getUUIDv4()]
    ])

    if (!getActions.has(type)) { throw new Error(IRIProvider.errMsgs.UNKNOWN_IRI_TYPE) }
    return getActions.get(type)()
  }

  /**
   * Checks wither the identity data is valid.
   * The object is valid if it contain at least one key-value pair with a non-empty string value.
   *
   * @param {object} identityData - An identity data object.
   * @returns {boolean} - True if the object is valid, false otherwise.
   * @private
   */
  static _isValidIdentityData (identityData = {}) {
    return Boolean(
      identityData &&
      Object.keys(identityData).length > 0 &&
      Object.values(identityData).every(v => typeof v === 'string' && v.length > 0)
    )
  }

  /**
   * Computes an MD5 hash of values from the identity data object.
   *
   * @param {object} identityData - An identity data object. Its keys will be sorted in
   *        an ascending alphanumerical order and the values will be concatenated into a string.
   *        This string will then be used to compute an MD5 hash. Same identityData objects
   *        will produce the same MD5 hashes.
   * @returns {string} - An MD5 hash of the identity data.
   * @private
   */
  static _getMD5Hash (identityData) {
    if (!IRIProvider._isValidIdentityData(identityData)) {
      throw new Error(IRIProvider.errMsgs.INCORRECT_IDENTITY_DATA)
    }
    const keys = Object.keys(identityData).sort()
    let text = ''
    for (const key of keys) {
      text += identityData[key]
    }
    return Sha1.hash(text)
  }

  /**
   * Returns a random UUID version 4 string.
   *
   * @returns {string} - A string containing a random UUID version 4 value.
   * @private
   */
  static _getUUIDv4 () {
    return uuidv4()
  }
}

/**
 * Describes how IRIs be calculated.
 *
 * @enum {string} */
IRIProvider.IRITypes = {
  /** An IRI type will be selected automatically, based on the presence of the identity data */
  AUTO: 'auto',
  /** An IRI will be an MD5 hash */
  MD5_HASH: 'MD5 Hash',
  /** An IRI will be a UUID version 4 */
  UUID_V4: 'UUID Version 4'
}

IRIProvider.errMsgs = {
  INCORRECT_IDENTITY_DATA: 'Incorrect identity data',
  UNKNOWN_IRI_TYPE: 'Unknown IRI type'
}
