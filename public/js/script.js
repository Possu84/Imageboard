(function() {
    ////// this is an iffi remember to call in the end
    var app = new Vue({
        el: '#main',
        data: {
            heading: 'My Image Board',
            headingClassName: 'heading'
        },
        mounted: function() {
            $.ajax({
                url: '/users',
                method: 'GET',
                data: {
                    limit: 20
                },
                success: function(data) {
                    console.log(data);
                }
            });
        }
    });
})(); /////// remember to call!!!!
