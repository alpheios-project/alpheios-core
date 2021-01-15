import Language from '@dmodels/language.js'
import User from '@dmodels/user-identity/user.js'

export default class Comment {
  /**
   * @param {string} text - A text of a comment.
   * @param {Language} language - A language of a comment.
   * @param {User} author - An author of a comment.
   * @param {object} options - Optional parameters.
   * @param {Date} [options.dateTime] - When the comment was made.
   * @param {Comment} [options.inReplyTo] - If this comment is a replay, then this parameter is a comment
   *        to which this reply was made.
   */
  constructor (text, language, author, { dateTime = new Date(), inReplyTo: comment } = {}) {
    if (!text) { throw new Error(Comment.errMsgs.TEXT_IS_MISSING) }
    if (typeof text !== 'string') { throw new Error(Comment.errMsgs.TEXT_TYPE_MISMATCH) }
    if (!language) { throw new Error(Comment.errMsgs.LANGUAGE_IS_MISSING) }
    if (!(language instanceof Language)) { throw new Error(Comment.errMsgs.LANGUAGE_TYPE_MISMATCH) }
    if (!author) { throw new Error(Comment.errMsgs.AUTHOR_IS_MISSING) }
    if (!(author instanceof User)) { throw new Error(Comment.errMsgs.AUTHOR_TYPE_MISMATCH) }
    if (!dateTime) { throw new Error(Comment.errMsgs.DATETIME_IS_MISSING) }
    if (!(dateTime instanceof Date)) { throw new Error(Comment.errMsgs.DATETIME_TYPE_MISMATCH) }
    if (comment && !(comment instanceof Comment)) { throw new Error(Comment.errMsgs.COMMENT_TYPE_MISMATCH) }

    /** @type {string} */
    this._text = text
    /** @type {Language} */

    this._language = language
    /** @type {User} */
    this._author = author
    /** @type {Date} */
    this._dateTime = dateTime
    /** @type {Comment[]} */
    this._replies = []
    if (comment) { comment.addReply(this) }
  }

  get text () {
    return this._text
  }

  get language () {
    return this._language
  }

  get author () {
    return this._author
  }

  get dateTime () {
    return this._dateTime
  }

  get replies () {
    return this._replies
  }

  /**
   * Adds a reply to the current comment.
   *
   * @param {Comment} reply - An instance of comment to be added as the reply.
   * @returns {Comment} - An instance of the current comment.
   */
  addReply (reply) {
    if (!reply) { throw new Error(Comment.errMsgs.REPLY_IS_MISSING) }
    if (!(reply instanceof Comment)) { throw new Error(Comment.errMsgs.REPLY_TYPE_MISMATCH) }
    this._replies.push(reply)
    return this
  }
}

Comment.errMsgs = {
  TEXT_IS_MISSING: 'The required text argument is not provided',
  TEXT_TYPE_MISMATCH: 'The text argument is not of the String type',
  LANGUAGE_IS_MISSING: 'The required language argument is not provided',
  LANGUAGE_TYPE_MISMATCH: 'The language argument is not of the Language type',
  AUTHOR_IS_MISSING: 'The required author argument is not provided',
  AUTHOR_TYPE_MISMATCH: 'The author argument is not of the User type',
  DATETIME_IS_MISSING: 'The required dateTime argument is not provided',
  DATETIME_TYPE_MISMATCH: 'The dateTime argument is not of the Date type',
  COMMENT_TYPE_MISMATCH: 'The comment argument is not of the Comment type',
  REPLY_IS_MISSING: 'The required reply argument is not provided',
  REPLY_TYPE_MISMATCH: 'The reply argument is not of the Comment type'
}
