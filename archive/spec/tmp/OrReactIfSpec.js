describe("orReactIf", function() {
  beforeEach(function() {
    loadFixtures('react.html');
  });

  var isVisible = function() {
    return $('.cities').is(':visible')
  }

  describe("Using simple or syntax", function() {

    beforeEach(function() {
      $('.cities')
        .reactIf('#zip', 'EqualTo', 1)
        .orReactIf('#income_2011', 'EqualTo', 1)
    })

    it("is visible when only first condition is met", function() {
      $('#income_2011').val('2')
      $('#zip').val('1').trigger('keyup')

      expect(isVisible()).toBeTruthy()
    })

    it("is visible when only second condition is met", function() {
      $('#income_2011').val('1')
      $('#zip').val('2').trigger('keyup')

      expect(isVisible()).toBeTruthy()
    })

    it("is hidden when neither condition is met", function() {
      $('#income_2011').val('2')
      $('#zip').val('2').trigger('keyup')

      expect(isVisible()).toBeFalsy()
    })

    it("is uncompliant when neither are passing", function() {
      $('#income_2011').val('2')
      $('#zip').val('2').trigger('keyup')

      expect(isVisible()).toBeFalsy()
    })
  })

  describe("Using complex syntax", function() {
    beforeEach(function() {
      $('.cities')
        .reactIf('#zip', 'EqualTo', 1)
        .orReactIf('#income_2011', 'EqualTo', 1)
    })

    it("is compliant when first is passing", function() {
      $('#income_2011').val('1')
      $('#zip').val('2').trigger('keyup')

      expect(isVisible()).toBeTruthy()
    })

    it("is compliant when second is passing", function() {
      $('#income_2011').val('2')
      $('#zip').val('1').trigger('keyup')

      expect(isVisible()).toBeTruthy()
    })

    it("is uncompliant when neither are passing", function() {
      $('#income_2011').val('2')
      $('#zip').val('2').trigger('keyup')

      expect(isVisible()).toBeFalsy()
    })
  })
})