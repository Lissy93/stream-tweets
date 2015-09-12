expect = require('chai').expect

process.env.NODE_ENV = 'test'

streamTweets = require '../index'


describe 'Check the private utility methods of the module', ()->

  it 'Should be able to check is a string is valid JSON or not', ()->
    isStrValidJson = streamTweets._private.isStrValidJson

    expect(isStrValidJson("{}")).equal(true)
    expect(isStrValidJson('[]')).equal(true)
    expect(isStrValidJson('{"hello": "World"}')).equal(true)
    expect(isStrValidJson('{"meaning_of_life": 42}')).equal(true)
    expect(isStrValidJson('{"created_at":"Sat Sep 12 22:47:42 +0000 2015","id":642831981466652672,"id_str":"642831981466652672"}')).equal(true)

    expect(isStrValidJson('')).equal(false)
    expect(isStrValidJson('{hello}')).equal(false)
    expect(isStrValidJson('{"hello":"world')).equal(false)
    expect(isStrValidJson('{"dinosaurs":"are":"awesome"')).equal(false)


