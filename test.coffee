expect = require 'Chai'
  .expect

request = require 'request'
fs = require 'fs'

baseUrl = 'http://www.polidog.jp'

file = fs.readFileSync './list.txt',
  encoding: 'UTF-8'
.split "\n"

line = (file)->
  for line in file
    target = line.replace '\~\^', ''
        .replace '.*', ''
        .replace ';', ''
        .split ' '
    if target[0].length > 0
      uri = baseUrl + target[0]
      recirectUri = target[1]
      yield {
        uri
        recirectUri
      }
  null

describe 'redirect 302 checks', ->
  for uri of line(file)
    it 'should return 301:' +  uri, (done)->
      request.get
        followRedirect: false
        uri: uri
      , (err, res, body) ->
        expect res.statusCode
          .to.equal 301

        done()

  null

describe 'redirected site 200 checks', ->
  for uri of line(file)
    it 'should return 200:' + uri, (done)->
      request.get
        followRedirect: false
        uri: uri
      , (err, res, body) ->
        expect res.statusCode
          .to.equal 301

        done()

  null
