describe("react.js", function() {
  beforeEach(function() {
    loadFixtures('react.html');
  });

  var isVisible = function() {
    return $('.cities').is(':visible');
  }

  describe("watching an input", function() {
    beforeEach(function() {
      $('.cities').reactIf('#zip', 'EqualTo', 1);
    });

    it("visible when between two numbers", function() {
      $('#zip').val('1').trigger('keyup');

      expect(isVisible($('.cities'))).toBeTruthy();
    });

    it("hidden if value is between two numbers", function() {
      $('#zip').val('2').trigger('keyup');

      expect(isVisible()).toBeFalsy();
    });
  });

  describe("watching a select", function() {
    beforeEach(function() {
      $('.cities').reactIf('#select_choice', 'EqualTo', 1)
    });

    it("visible when between two numbers", function() {
      $('#select_choice').val('1').trigger('change')
      expect(isVisible()).toBeTruthy()
    });

    it("hidden if value is between two numbers", function() {
      $('#select_choice').val('2').trigger('change')
      expect(isVisible()).toBeFalsy()
    });
  });

  describe("watching a checkbox", function() {
    beforeEach(function() {
      $('.cities').reactIf('#test_checked', 'IsChecked')
    });

    it("visible if checked", function() {
      $('#test_checked').attr('checked', 'checked').trigger('change')
      expect(isVisible()).toBeTruthy()
    });

    it("hidden if unchecked", function() {
      $('#test_checked').removeAttr('checked').trigger('change')

      expect(isVisible()).toBeFalsy()
    });
  });
});