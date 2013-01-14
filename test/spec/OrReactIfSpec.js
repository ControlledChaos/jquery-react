describe("orReactIf", function() {
  var isVisible = function() {
    return $('.cities').is(':visible')
  }

  beforeEach(function() {
    loadFixtures('react.html')

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
})