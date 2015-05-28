SetTable.js
===========

If you came here because you were looking for a possibility to easily create dynamic tables for your website, your journey is over!
SetTable.js is a simply plugin that generates HTML tables from a given JSON data structure. But there is more: it is designed to be as flexible as possible - for example with lots of callback functions during the rendering process to customize the outcome.

Usage
=====


**Set up SetTable.js for multiple tables:**
```
<table id="table" data-source="example.json" data-settable></table>
$(document).setTable();
```

**Set up SetTable.js for a specific table:**
```
<table id="table" data-source="example.json"></table>
$('#table').setTable();
```


Advanced configuration
======================
**Set up SetTable.js for a specific table:**
```
$('#table').setTable({// These are the defaults.
      start: 0, //row to start displaying
      limit: 10, //amount of rows to display
      source: null, //source of data in JSON format
      before: function() {}, //callback at beginning
      structure: function() {}, //callback per row (rowId, values)
      success: function() {}, //callback on success on the table itself
      fail: function() {}, //callback when AJAX fails on the table itself
      refresh: function() {} //callback when refreshing, switchting page on the table itself
  });
```