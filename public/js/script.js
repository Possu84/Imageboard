////////SCRIPTS/////////////////

////// this is an iffi remember to call in the end

(function() {
    // referencing to the html component name
    /////////VUE COMPONENT/////////////////////////////
    Vue.component("modal-wrap", {
        props: ["imageId"],
        data: function() {
            return {
                heading: "Junk Pic´s",
                // image:[]
                image: {
                    url: "",
                    title: "",
                    username: "",
                    description: ""
                },
                newcomment: {
                    comment: "",
                    username: ""
                },
                comments: []
            };
        },
        // refrence to script id
        template: "#modal-wrap",
        methods: {
            click: function() {
                console.log("clickclik");
                this.$emit("close");
            },
            uploadComment: function() {
                var app = this;
                var pushnewcomment = {
                    comment: this.newcomment.comment,
                    username: this.newcomment.username,
                    imageId: this.imageId
                };
                console.log("upload comment fun", pushnewcomment, this.imageId);
                axios.post("/newComment", pushnewcomment).then(function(resp) {
                    console.log(resp.data, "we are in newcomment axion post");
                    app.newcomment = resp.data.commetnts;
                    console.log(app.newcomment, "new commetn");
                });
            }
        },
        mounted: function() {
            console.log("running mounted in modal-warap");
            var component = this;
            axios.get("/pic/" + this.imageId).then(function(resp) {
                console.log("componen mounted", resp.data);
                component.image = resp.data.images;
                component.comments = resp.data.comments;
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

    ///////////VUE APP////////////////////////

    var app = new Vue({
        el: "#main",
        data: {
            imageId: null,
            counter: 0,
            heading: "My ImageBoard App",
            headingClassName: "heading",
            imageData: null,
            images: [],
            form: {
                title: "",
                username: "",
                description: ""
            },
            show: false
        },
        mounted: function() {
            axios.get("/user").then(function(resp) {
                app.imageData = resp.data;
            });
        }, ////// close mounted
        methods: {
            uploadFile: function(e) {
                console.log("in upload method");
                e.preventDefault();
                var file = $('input[type="file"]').get(0).files[0];
                console.log("vue instance", this, app, this.form, file);

                // FormData is used when dealing with FILES
                var formData = new FormData();
                formData.append("file", file); // refers to file variable up
                formData.append("title", this.form.title);
                formData.append("description", this.form.description);
                formData.append("username", this.form.username);

                console.log("this is this.", this.form.description);

                axios.post("/upload", formData).then(function(resp) {
                    console.log(resp.data, "we are in axion post");
                    app.imageData.unshift(resp.data);
                }); /// write good description

                // console.log('formData:', formData);
            }, // close uploadFile
            showImage: function(id) {
                this.imageId = id; ///// this references to the Vue instance
                console.log(this.imageId, "this is the id");
            }, // close showImage
            closeModal: function(id) {
                this.imageId = null;
            },
            morePictures: function(id) {
                var lastImage = this.imageData[this.imageData.length - 1].id;

                axios.get("/more/" + lastImage).then(function(resp) {
                    console.log(resp.data, "this is resp.data");
                    // app.imageData = resp.data;
                    app.imageData = app.imageData.concat(resp.data);
                });
            }
        } // close methods
    });
})(); ////<=====HERE CALL IT!!!!
