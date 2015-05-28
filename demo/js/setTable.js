;(function($) {
  $.fn.setTable = function(options) {
    var settings = $.extend({// These are the defaults.
      start: 0, //row to start displaying
      limit: 10, //amount of rows to display
      source: null, //source of data in JSON format
      before: function() {}, //callback at beginning
      structure: function() {}, //callback per row (rowId, values)
      success: function() {}, //callback on success on the table itself
      fail: function() {}, //callback when AJAX fails on the table itself
      refresh: function() {} //callback when refreshing, switchting page on the table itself
    }, options);
    
   

    if ($(this).is(document)) { //this is called on the document, set all tables
      $tables = this.find('table[data-settable]');   
    }
    else { //this is a table
      $tables = this;
    }
    var beforeCallback = $.Callbacks();
    beforeCallback.add(settings.before);
    beforeCallback.fireWith($tables);
    $tables.setThisTable(settings);
    
  }; //end setTable
  
  /*
   * Uses setTable on a single table
   */
  $.fn.setThisTable = function(settings) {
    var $table = this;
    var rowCount = 0;
    $table.find('tbody').remove();
    if ($table.find('tbody').length == 0) $table.append('<tbody></tbody>');
    var $tbody = $table.find('tbody');
    

    var tableCallback = $.Callbacks();
    tableCallback.add(settings.success);
    var failedCallback = $.Callbacks();
    failedCallback.add(settings.fail);
    
    var source = settings.source ? settings.source : $table.attr('data-source');
    if (!source) { //no source attached, cancel
      failedCallback.fireWith($table);
      return false; 
    }
    if ($.type(settings.source) === 'array') { //source is an JSON object
      rowCount = settings.source.length;
      $tbody.buildTable(settings.source, settings);
      tableCallback.fireWith($table); //success callback
    }
    else { //source is not JSON object, try an AJAX call
      $.get(source, function(data) {
        rowCount = data.length;
        $tbody.buildTable(data, settings);
        tableCallback.fireWith($table); //success callback
        
      }).fail(function() { //AJAX failed
        failedCallback.fireWith($table);
        return false;
      });      
    }

    
    //attach custom events to the table
    $table.each(function() {
      $(this).on('setTable:refresh', function() { //refresh (same settings)
        $(this).css('height',$(this).height());
        $(this).setThisTable(settings);
      });
      
      $(this).on('setTable:next', function() { //next page (adapted start setting)
        $(this).css('height',$(this).height());
        settings.start = Math.min((rowCount - settings.limit), (settings.start + settings.limit));
        $(this).setThisTable(settings);
      });

      $(this).on('setTable:prev', function() { //previous page (adapted start setting)
        $(this).css('height',$(this).height());
        settings.start = Math.max(0,(settings.start - settings.limit));
        $(this).setThisTable(settings);
      });
      
    });
    
    return $table;
  }; //End setThisTable
  
  /*
   * Build a table using the data
   */
  $.fn.buildTable = function(data, settings) {
    var rowCallback = $.Callbacks();
    rowCallback.add(settings.structure);
    for (var r in data) {
      //skip if this row is not in the scope
      if (r < settings.start || r >= settings.start + settings.limit) continue;
      
      var row = data[r];
      var $row = $('<tr></tr>');
      for (var c in row) {
        var col = row[c];
        var $col = $('<td></td>');
        $col.text(col);
        $col.appendTo($row);
      }
      
      rowCallback.fireWith($row, [r, row]); //Callback per row
      $row.appendTo(this);
    }
  }; //End buildTable
  

}(jQuery));