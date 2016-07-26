/* global afterEach, beforeEach, chai, describe, it, sinon */
'use strict';


var EventSearchView = require('EventSearchView');


var expect = chai.expect;


describe('EventSearchView', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof EventSearchView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(EventSearchView).to.not.throw(Error);
    });

    it('can be destroyed', function () {
      var view;

      view = EventSearchView();

      expect(view.destroy).to.not.throw(Error);

      view.destroy();
    });
  });

  describe('onHuidKeyUp', function () {
    var evt,
        view;

    beforeEach(function () {
      view = EventSearchView();
      sinon.spy(view, 'search');
      evt = {
        keyCode: null,
        which: null,
        preventDefault: sinon.spy()
      };
    });

    afterEach(function () {
      view.search.restore();
      view.destroy();

      evt = null;
      view = null;
    });

    it('does nothing if not the enter key', function () {
      evt.keyCode = 0;

      view.onHuidKeyUp(evt);

      expect(view.search.callCount).to.equal(0);
      expect(evt.preventDefault.callCount).to.equal(0);
    });

    it('behaves as expected if the enter key', function () {
      evt.keyCode = 13; // "Enter" key

      view.onHuidKeyUp(evt);

      expect(view.search.callCount).to.equal(1);
      expect(evt.preventDefault.callCount).to.equal(1);
    });
  });

  describe('onMagnitudeSelect', function () {
    var view;

    beforeEach(function () {
      view = EventSearchView();
      sinon.stub(view.magnitudeCollection, 'getSelected',
          function () { return {}; });
    });

    afterEach(function () {
      view.magnitudeCollection.getSelected.restore();
      view.destroy();
    });

    it('checks the selected magnitude', function () {
      view.onMagnitudeSelect();

      expect(view.magnitudeCollection.getSelected.callCount).to.equal(1);
    });

    it('calls open magnitude display', function () {
      sinon.stub(view, 'openMagnitudeDisplay', function () {});
      view.onMagnitudeSelect();

      expect(view.openMagnitudeDisplay.callCount).to.equal(1);
    });
  });

  describe('onSearchClick', function () {
    it('calls search method', function () {
      var view;

      view = EventSearchView();

      sinon.spy(view, 'search');

      view.onSearchClick();
      expect(view.search.callCount).to.equal(1);

      view.search.restore();
      view.destroy();
    });
  });
});
