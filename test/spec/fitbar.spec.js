/**
 * @file
 *
 * ### Responsibilities
 * - unit test fitbar.js
 *
 */
'use strict';

/*global fitbar*/
describe('fitbar.js', function () {
  var sandbox;

  beforeEach(function () {
    // create a sandbox
    sandbox = sinon.sandbox.create();

    // stub some methods
  });

  afterEach(function () {
    // restore the environment as it was before
    sandbox.restore();
  });

  it('should have a working test harness', function () {
    // arrange
    // act
    // assert
    expect(true).to.not.equal(false);
  });

  it('should exist', function () {
    // arrange
    // act
    // assert
    expect(typeof fitbar).to.equal('function');
  });

  it('should return nothing', function () {
    // arrange
    // act
    var result = fitbar();
    // assert
    expect(result).to.equal(undefined);
  });

});
