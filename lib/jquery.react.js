/*
 * React JQuery plugin
 * https://github.com/natedavisolds/react.js
 *
 * Copyright 2011, Nathan Davis Olds
 * Distributed under the MIT license.
*/

(function($){
  var className = 'reactor',
      dataName = 'reactor',
      reactEvent = 'react.reactor'

  var DefaultReactions = {
    compliant: function() {
      $(this).show();
    },
    uncompliant: function() {
      $(this).hide();
    }
  }

  var Matchers = {
    NotBlank: function() {
      return( this.val().toString() !== "" );
    },

    Blank: function() {
      return( this.val().toString() === "" );
    },

    Disabled: function() {
      return( this.filter(':disabled').length > 0 );
    },

    Enabled: function() {
      return( this.filter(':enabled').length > 0 );
    },

    EqualTo: function(matchStr) {
      var _func = function() {
        var v = this.val();
        if (v) { return( v.toString() == matchStr ); }
        else { return false; }
      };

      return _func;
    },

    LessThan: function(number) {
      var _func = function() {
        var v = this.filter('span').length > 0 ? this.text() : this.val();
        return( parseInt(v) < number );
      }

      return _func;
    },

    MoreThan: function(number) {
      var _func = function() {
        var v = this.filter('span').length > 0 ? this.text() : this.val();
        return( parseInt(v) > number );
      }

      return _func;
    },

    Between: function(min, max) {
        var _func = function() {
            var v = this.val();
            return(!(v && (parseInt(v, 10) > max || parseInt(v, 10) < min)));
        };

        return _func;
    },

    BetweenSameLength: function(min, max) {
        var len = min.toString().length,
            _func = function() {
              var v = this.val();
              return(!(v && v.length == len && (parseInt(v, 10) > max || parseInt(v, 10) < min)));
            };

        return _func;
    },

    IsChecked: function() {
      return this.is(':checked');
    },

    IsNotChecked: function() {
      return !this.is(':checked');
    },

    NumberOfDigitsIs: function(number) {
      var comparisonString = this.val().toString().replace(/[^\d]+/g,''),
          passing = false,
          length = comparisonString.length

      for(index in arguments) {
        if (length == arguments[index]) {
          passing = true
        }
      }

      return passing
    },

    HasElements: function() {
      return this.size() > 0
    },

    HasValueWhenVisible: function() {
      if (this.is(':visible')) {
        return( this.val().toString() != "" && parseFloat(this.val()) != 0.0)
      } else {
        return true
      }
    }
  };

  function condition(conditional, $selection, args) {
    return function() {
      var result = (typeof(conditional) == 'string') ? Matchers[conditional] : conditional

      while($.isFunction(result)) {
        result = result.apply($selection, args)
      }

      return result;
    }
  }

  function getConditionSets($reactor) {
    var conditions = $reactor.data(dataName);

    if (!$.isArray(conditions)) { conditions = [[]]; }

    return conditions
  }

  function storeConditionSets($reactor, conditions) {
    if (!conditions) { conditions = [[]] }
    $reactor.data(dataName, conditions)
  }

  function addCondition($reactor, condition) {
    var conditions = getConditionSets($reactor)

    conditions[0].push(condition)

    storeConditionSets($reactor, conditions)
  }

  function newCondition($reactor, conditional, $selection, args) {
    if (conditional) {
      addCondition($reactor, condition(conditional, $selection, args));
    }
  }

  function newConditionSet($reactor) {
    var conditions = getConditionSets($reactor);

    conditions.unshift([])

    storeConditionSets($reactor, conditions)
  }

  function initializeReactor($element, settings) {
    $element.addClass(className);
    storeConditionSets($element)

    var allConditionsPass = function(conditionSet) {
      var length = conditionSet.length;

      for (var i = 0; i < length; i++) {
        if (!(conditionSet[i].call())) { return false }
      }

      return true
    }

    var isReactionary = function() {
      var conditionSets = getConditionSets($(this)),
          length = conditionSets.length;

      for (var i = 0; i < length; i++) {
        if (allConditionsPass(conditionSets[i])) { return true }
      }

      return false
    };

    var reaction = function(evt) {
      if (isReactionary.apply(this)) {
        settings.compliant.apply($element);
      } else {
        settings.uncompliant.apply($element);
      }
    };

    $element
      .off(reactEvent)
      .on(reactEvent, reaction);
  }

  $.fn.reactTo = function(selector) {
    var $elements = $(selector);

    $.each(this, function() {
      var $reactorElement = $(this)

      var triggerReaction = function() {
        $reactorElement.trigger(reactEvent);
        return true
      };

      $elements.filter(':not(:text), :not(:password), :text.date-picker')
        .on('change.reactor', triggerReaction);

      $elements.filter(':text, :password')
        .on('keyup.reactor', triggerReaction);
    })

    return this;
  };

  $.fn.reactIf = function(selection, conditional) {
    var $selection = $(selection),
        args = Array.prototype.slice.call(arguments, 2);

    this.each(function() {
      var $element = $(this);

      $element
        .reactor()
        .reactTo($selection)

      newCondition($element, conditional, $selection, args);
    });

    return this;
  };

  $.fn.orReactIf = function(selection, conditional, arg1, arg2) {
    this.each(function() {
      var $reactor = $(this);

      newConditionSet($reactor)

      $reactor.reactIf(selection, conditional, arg1, arg2);
    })

    return this;
  }

  $.fn.react = function() {
    this.each(function() {
      $(this).trigger(reactEvent);
    });

    return this;
  };

  $.fn.reactor = function(options) {
    var settings = $.extend({}, DefaultReactions, options);

    this.each(function() {
      var $element = $(this);

      if (reactorNotInitialized()) { initializeReactor($element, settings) }

      function reactorNotInitialized() {
        return (!$element.hasClass(className))
      }
    });

    return this;
  };
})(jQuery);