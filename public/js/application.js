$(document).ready(function() {
  let input = $('#query');
  var options = {

    url: function(phrase) {
      return '/search/autocomplete?q=' + phrase;
    },

    getValue: "title",
    categories: [
      {
        listLocation: 'tasks',
        header: '<strong>tasks</strong>'
      }
    ],
    list: {
      onChooseEvent: function() {
        var url = input.getSelectedItemData().url;
        console.log(url);
      }
    }
  };

  input.easyAutocomplete(options);
});