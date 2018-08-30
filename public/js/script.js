////////SCRIPTS/////////////////

////// this is an iffi remember to call in the end

(function() {
    // referencing to the html component name
    Vue.component('modal-wrap', {
        props: ['imageId'],
        data: function() {
            return {
                heading: 'Picture Modal',
                // image:[]
                image: {
                    url: '',
                    title: '',
                    username: '',
                    description: ''
                }
            };
        },
        // refrence to script id
        template: '#modal-wrap',
        methods: {
            click: function() {
                this.$emit('true', this.show, false);
            }
        },
        mounted: function() {
            console.log('running mounted in modal-warap');
            var component = this;
            axios.get('/pic/' + this.imageId).then(function(resp) {
                console.log('in mounted', resp.data);
                component.image = resp.data.rows[0];
            });
        }
    });

    // Vue.component('popmodal', {
    //     data: function() {},
    //     template: '#tmpl2',
    //     methods: {
    //         click: function() {
    //             this.$emit('close');
    //         }
    //     }
    // });
    var app = new Vue({
        el: '#main',
        data: {
            imageId: null,
            counter: 0,
            heading: 'My ImageBoard App',
            headingClassName: 'heading',
            imageData: null,
            images: [],
            form: {
                title: '',
                username: '',
                description: ''
            },
            show: false
        },
        mounted: function() {
            axios.get('/user').then(function(resp) {
                app.imageData = resp.data;
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
            }, // close uploadFile
            showImage: function(id) {
                this.imageId = id; ///// this references to the Vue instance
                console.log(this.imageId, 'this is the id');
            } // close showImage
        } // close methods
    });
})(); ////<=====HERE CALL IT!!!!
