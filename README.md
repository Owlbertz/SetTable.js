SetTable.js
===========

If you came here because you were looking for a possibility to easily create dynamic tables for your website, your journey is over!
SetTable.js is a simply plugin that generates HTML tables from a given JSON data structure. But there is more: it is designed to be as flexible as possible - for example with lots of callback functions during the rendering process to customize the outcome.

Usage
=====

**Set up SetTable.js for a specific table:**
```
<table id="table" data-source="example.json"></table>
$('#table').setTable();
```

**Set up SetTable.js for multiple tables:**
```
<table id="table" data-source="example.json" setTable></table>
$(document).setTable();
```