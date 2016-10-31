var a = $('<div>');
document.getElementById('content').appendChild(a.element);
a.html('This div was created with the selector and this content was added with .html()');
$('#content').append('The value of #testinput is' + $('#testinput').val() + ' change the value to see thee bound event.');
$('#content').prepend('<p>Im prepended</p>');
$('#content').append('<p>Im appended</p>');
$('#testinput').on('change',function(){alert("The value of #testinput changed");})