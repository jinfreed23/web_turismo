const Handlebars = require('handlebars');

Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});

Handlebars.registerHelper('length', function(array) {
    return array.length;
});

Handlebars.registerHelper('first', function(array) {
    return array && array.length > 0 ? array[0] : null;
});

module.exports = {
    eq: Handlebars.helpers.eq,
    length: Handlebars.helpers.length,
    first: Handlebars.helpers.first,
};
