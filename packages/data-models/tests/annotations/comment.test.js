/* eslint-env jest */
import User from '@dmodels/user-identity/user.js'
import Language from '@dmodels/language.js'
import Comment from '@dmodels/annotations/comment.js'

describe('Comment', () => {
  const identityData = {
    ID: 'User ID',
    name: 'User name',
    nickname: 'User nickname'
  }
  const commentText = 'A comment text'
  let user
  let dateTime

  beforeAll(() => {
    user = new User(identityData.ID, { name: identityData.name, nickname: identityData.nickname })
    dateTime = new Date()
  })

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('constructor: should be able to create an instance with a full set of arguments', () => {
    const comment = new Comment(commentText, Language.PERSIAN, user, { dateTime })
    expect(comment.text).toBe(commentText)
    expect(comment.language.equals(Language.PERSIAN)).toBeTruthy()
    expect(comment.author).toBe(user)
    expect(comment.dateTime).toBe(dateTime)
  })

  it('constructor: should be able to create an instance without optional arguments', () => {
    const comment = new Comment(commentText, Language.ARABIC, user)
    expect(comment.dateTime).toBeInstanceOf(Date)
  })

  it('constructor: should be able to attach comment as a reply', () => {
    const comment = new Comment(commentText, Language.PERSIAN, user, { dateTime })
    const reply = new Comment(commentText, Language.GREEK, user, { dateTime, inReplyTo: comment })
    expect(comment.replies).toEqual([reply])
  })

  it('constructor: should not proceed with the missing text argument', () => {
    expect(() => new Comment()).toThrowError(Comment.errMsgs.TEXT_IS_MISSING)
  })

  it('constructor: should not proceed with the incorrect text argument', () => {
    expect(() => new Comment(1)).toThrowError(Comment.errMsgs.TEXT_TYPE_MISMATCH)
  })

  it('constructor: should not proceed with the missing language argument', () => {
    expect(() => new Comment(commentText)).toThrowError(Comment.errMsgs.LANGUAGE_IS_MISSING)
  })

  it('constructor: should not proceed with the incorrect language argument', () => {
    expect(() => new Comment(commentText, user)).toThrowError(Comment.errMsgs.LANGUAGE_TYPE_MISMATCH)
  })

  it('constructor: should not proceed with the missing author argument', () => {
    expect(() => new Comment(commentText, Language.LATIN)).toThrowError(Comment.errMsgs.AUTHOR_IS_MISSING)
  })

  it('constructor: should not proceed with the incorrect author argument', () => {
    expect(() => new Comment(commentText, Language.LATIN, 3)).toThrowError(Comment.errMsgs.AUTHOR_TYPE_MISMATCH)
  })

  it('constructor: should not proceed with the missing dateTime argument', () => {
    expect(() => new Comment(commentText, Language.LATIN, user, { dateTime: null }))
      .toThrowError(Comment.errMsgs.DATETIME_IS_MISSING)
  })

  it('constructor: should not proceed with the incorrect dateTime argument', () => {
    expect(() => new Comment(commentText, Language.LATIN, user, { dateTime: 3 }))
      .toThrowError(Comment.errMsgs.DATETIME_TYPE_MISMATCH)
  })

  it('constructor: should not proceed with the incorrect inReplyTo argument', () => {
    expect(() => new Comment(commentText, Language.LATIN, user, { inReplyTo: 7 }))
      .toThrowError(Comment.errMsgs.COMMENT_TYPE_MISMATCH)
  })

  it('text getter: should return the value of the text', () => {
    const comment = new Comment(commentText, Language.PERSIAN, user)
    expect(comment.text).toBe(commentText)
  })

  it('text getter: should return the value of the text', () => {
    const comment = new Comment(commentText, Language.PERSIAN, user)
    expect(comment.text).toBe(commentText)
  })

  it('language getter: should return the value of the language', () => {
    const comment = new Comment(commentText, Language.GREEK, user)
    expect(comment.language.equals(Language.GREEK)).toBeTruthy()
  })

  it('author getter: should return the value of the author', () => {
    const comment = new Comment(commentText, Language.PERSIAN, user)
    expect(comment.author).toBe(user)
  })

  it('dateTime getter: should return the value of the dateTime', () => {
    const comment = new Comment(commentText, Language.PERSIAN, user, { dateTime })
    expect(comment.dateTime).toBe(dateTime)
  })

  it('replies getter: should return all the replies', () => {
    const comment = new Comment(commentText, Language.PERSIAN, user, { dateTime })
    const reply = new Comment(commentText, Language.GREEK, user, { dateTime, inReplyTo: comment })
    const replyTwo = new Comment(commentText, Language.LATIN, user, { dateTime })
    comment.addReply(replyTwo)
    expect(comment.replies).toEqual([reply, replyTwo])
  })

  it('addReply: should add a reply comment', () => {
    const comment = new Comment(commentText, Language.PERSIAN, user)
    const reply = new Comment(commentText, Language.GREEK, user)
    comment.addReply(reply)
    expect(comment.replies).toEqual([reply])
  })
})
