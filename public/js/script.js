////////SCRIPTS/////////////////

////// this is an iffi remember to call in the end

(function() {
    var app = new Vue({
        el: '#main',
        data: {
            heading: 'My ImageBoard App',
            headingClassName: 'heading',
            imageData: null,
            images: [],
            form: {
                title: '',
                username: '',
                description: ''
            }
        },
        mounted: function() {
            axios.get('/user').then(function(resp) {
                app.imageData = resp.data;
                console.log('vue mounted', this, app);
            });
        }, ////// close mounted
        methods: {
            uploadFile: function(e) {
                console.log('in upload method');
                e.preventDefault();
                var file = $('input[type="file"]').get(0).files[0];
                console.log('vue instance', this, app, this.form, file);

                // FormData is used when dealing with FILES
                var formData = new FormData();
                formData.append('file', file); // refers to file variable up

                formData.append('title', this.form.title);

                console.log('this is this.', this.form.description);

                formData.append('description', this.form.description);
                formData.append('username', this.form.username);

                axios.post('/upload', formData).then(function(resp) {
                    console.log(resp.data, 'we are in axion post');
                    app.imageData.unshift(resp.data);
                }); /// write good description

                // console.log('formData:', formData);
            } // close uploadFile
        } // close methods
    });
})(); ////<=====HERE CALL IT!!!!
