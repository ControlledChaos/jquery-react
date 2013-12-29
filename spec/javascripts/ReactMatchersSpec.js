describe("React js matchers", function() {
  beforeEach(function() {
    loadFixtures('react.html');
  });

  var isVisible = function() {
    return $('.cities').is(':visible');
  }

  describe("Custom Condition", function() {
    beforeEach(function() {
      $('.cities').reactIf('#zip', function() {
        var $element = $(this);

        return $element.val() == '19101'
      })
    });

    it("visible when between two numbers", function() {
      $('#zip').val('19101').trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });

    it("hidden if value is between two numbers", function() {
      $('#zip').val('18000').trigger('keyup')
      expect(isVisible()).toBeFalsy()
    });

    it("changes with the value of the selection", function() {
      $('#zip').val('19101').trigger('keyup')
      expect(isVisible()).toBeTruthy()
      $('#zip').val('18000').trigger('keyup')
      expect(isVisible()).toBeFalsy()
    })
  });

  describe("Between", function() {
    beforeEach(function() {
      $('.cities').reactIf('#zip', 'Between', 19100, 19400)
    });

    it("visible when between two numbers", function() {
      $('#zip').val('19101').trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });

    it("hidden if value is between two numbers", function() {
      $('#zip').val('18000').trigger('keyup')
      expect(isVisible()).toBeFalsy()
    });

    it("reacts to both", function() {
      $('#zip').val('19101').trigger('keyup')
      expect(isVisible()).toBeTruthy()
      $('#zip').val('18000').trigger('keyup')
      expect(isVisible()).toBeFalsy()
    });
  });

  describe("BetweenSameLength", function() {
    beforeEach(function() {
      $('.cities').reactIf('#zip', 'BetweenSameLength', 19100, 19400)
    });

    it("visible when between two numbers", function() {
      $('#zip').val('19101').trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });

    it("visible when number of digits is less", function() {
      $('#zip').val('191').trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });

    it("visible when number of digits is more", function() {
      $('#zip').val('191444').trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });

    it("hidden if value is between two numbers and has the same number of digits", function() {
      $('#zip').val('18000').trigger('keyup')
      expect(isVisible()).toBeFalsy()
    });
  });

  describe("Blank", function() {
    beforeEach(function() {
      $('.cities').reactIf('#zip', 'Blank')
    });

    it("visible when blank", function() {
      $('#zip').val('').trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });

    it("hidden when not blank", function() {
      $('#zip').val('foo').trigger('keyup')
      expect(isVisible()).toBeFalsy()
    });
  });

  describe("NotBlank", function() {
    beforeEach(function() {
      $('.cities').reactIf('#zip', 'NotBlank')
    });

    it("visible when not blank", function() {
      $('#zip').val('19101').trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });

    it("hidden when blank", function() {
      $('#zip').val('').trigger('keyup')
      expect(isVisible()).toBeFalsy()
    });
  });

  describe("Disabled", function() {
    beforeEach(function() {
      $('.cities').reactIf('#zip', 'Disabled')
    });

    it("visible when disabled", function() {
      $('#zip').attr('disabled', 'disabled').trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });

    it("hidden when enabled", function() {
      $('#zip').removeAttr('disabled').trigger('keyup')
      expect(isVisible()).toBeFalsy()
    });
  });

  describe("Enabled", function() {
    beforeEach(function() {
      $('.cities').reactIf('#zip', 'Enabled')
    });

    it("visible when enabled", function() {
      $('#zip').removeAttr('disabled').trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });

    it("hidden when disabled", function() {
      $('#zip').attr('disabled', 'disabled').trigger('keyup')
      expect(isVisible()).toBeFalsy()
    });
  });

  describe("IsChecked", function() {
    beforeEach(function() {
      $('.cities').reactIf('#yes', 'IsChecked')
    });

    it("visible when checked", function() {
      $('#yes').attr('checked', 'checked').trigger('change')
      expect(isVisible()).toBeTruthy()
    });

    it("hidden when not checked", function() {
      $('#yes').removeAttr('checked').trigger('change')
      expect(isVisible()).toBeFalsy()
    });
  });

  describe("IsNotChecked", function() {
    beforeEach(function() {
      $('.cities').reactIf('#yes', 'IsNotChecked')
    });

    it("visible when checked", function() {
      $('#yes').attr('checked', 'checked').trigger('change')
      expect(isVisible()).toBeFalsy()
    });

    it("hidden when not checked", function() {
      $('#yes').removeAttr('checked').trigger('change')
      expect(isVisible()).toBeTruthy()
    });
  });

  describe("EqualTo", function() {
    beforeEach(function() {
      $('.cities').reactIf('#zip', 'EqualTo', 1)
    });

    it("visible when 1", function() {
      $('#zip').val('1').trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });

    it("hidden if 2", function() {
      $('#zip').val('2').trigger('keyup')
      expect(isVisible()).toBeFalsy()
    });
  });

  describe("NumberOfDigitsIs", function() {
    beforeEach(function() {
      $('.cities').reactIf('#zip', 'NumberOfDigitsIs', 5)
    });

    it("visible when 11111", function() {
      $('#zip').val('11111').trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });

    it("hidden if 2", function() {
      $('#zip').val('2').trigger('keyup')
      expect(isVisible()).toBeFalsy()
    });

    it("visible when (111A11)", function() {
      $('#zip').val('(111A11)').trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });

    it("hidden when (111A4)", function() {
      $('#zip').val('(111A4)').trigger('keyup')
      expect(isVisible()).toBeFalsy()
    });

    it("hidden when 1911923", function() {
      $('#zip').val('1911923').trigger('keyup')
      expect(isVisible()).toBeFalsy()
    });
  });

  describe("NumberOfDigitsIs multiple values", function() {
    beforeEach(function() {
      $('.cities').reactIf('#zip', 'NumberOfDigitsIs', 5, 9, 0)
    });

    it("visible when 12345", function() {
      $('#zip').val('12345').trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });

    it("visible when blank", function() {
      $('#zip').val('').trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });

    it("visible when 123456789", function() {
      $('#zip').val('123456789').trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });
  });

  describe("HasElements", function() {
    it("visible when it has elements", function() {
      $('#zip').addClass('testing_empty')
      $('.cities').reactIf('.testing_empty', 'HasElements').react()
      expect(isVisible()).toBeTruthy()
    });

    it("hidden when it has no elements", function() {
      $('.cities').reactIf('.testing_empty', 'HasElements').react()
      expect(isVisible()).toBeFalsy()
    });
  });

  describe("LessThan", function() {
    beforeEach(function() {
      $('.cities').reactIf('#zip', 'LessThan', 10)
    });

    it("visible when less", function() {
      $('#zip').val('5').trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });

    it("hidden if more", function() {
      $('#zip').val('15').trigger('keyup')
      expect(isVisible()).toBeFalsy()
    });

    it("hidden if equal", function() {
      $('#zip').val('10').trigger('keyup')
      expect(isVisible()).toBeFalsy()
    });
  });

  describe("MoreThan", function() {
    beforeEach(function() {
      $('.cities').reactIf('#zip', 'MoreThan', 10)
    });

    it("visible when more", function() {
      $('#zip').val('15').trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });

    it("hidden if less", function() {
      $('#zip').val('5').trigger('keyup')
      expect(isVisible()).toBeFalsy()
    });

    it("hidden if equal", function() {
      $('#zip').val('10').trigger('keyup')
      expect(isVisible()).toBeFalsy()
    });
  });

  describe("HasValueWhenVisible", function() {
    beforeEach(function() {
      $('.cities').reactIf('#zip', 'HasValueWhenVisible')
    });

    it("visible when it has a value and is shown", function() {
      $('#zip').val('15').show().trigger('keyup')
      expect(isVisible()).toBeTruthy()
    });

    it("hidden if blank", function() {
      $('#zip').val('').show().trigger('keyup')
      expect(isVisible()).toBeFalsy()
    });

    it("hidden if it has a value but is hidden", function() {
      $('#zip')
        .val('10')
        .hide()
        .trigger('keyup')

      expect(isVisible()).toBeTruthy()
    });

    it("visible if it is blank but is hidden", function() {
      $('#zip')
        .val('')
        .hide()
        .trigger('keyup')

      expect(isVisible()).toBeTruthy()
    });
  });
});