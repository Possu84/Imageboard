////stays local scope --- must be ///////

(function() {
    window.app = new Vue({
        el: '#main',
        data: {
            heading: 'Ninja Turtles',
            color: 'tomato',
            headingClassName: 'heading',
            gretee: null
        }
    });
})();


/////////////////////////////


(function() {
    var app = new Vue({
        el: '#main',
        data: {
            greetee: null,
            heading: 'Turtles',
            greetee: 'cat',
            cities: []
        },
        mounted: function() {
            axios.get('/cities').then(function(res) {
                console.log(res);
                app.cities = res.data.cities;
            });

            console.log('mounted!!!!!');
        },
        methods: {
            handleClick: function(name) {
                this.changeGreetee(name);
            },
            changeGreetee: function(name) {
                this.greetee = 'Turtles are cool';
            }
        }
    });
})();

///////////////////////////////

<div id="main">
    <h1 v-on:click="handleClick"> Hello , <span> {{ greetee || "hello"}} </h1>
    <h1 v-bind:class="headingClassName" :style="color">   <!-- colon by its self works too -->

        {{ heading }}
        {{ 10*2 }}

        <input type="text" name="" v-model="greteee">     <!-- two way data bindin-->
    </h1>
    <ul v-if="cities.length > 0">
        <li v-for="city in cities">  {{city.name}}, {{city.country}}
    </ul>
 </div>



 app.post('/upload', uploader.single('file'), s3.upload, function(req, res) {
     console.log(__dirname, 'upload app.post ');
     // If nothing went wrong the file is already in the uploads directory
     if (req.file) {
         db.saveFile(
             config.s3Url + req.file.filename,
             req.body.title,
             req.body.desc,
             req.body.username
         ).then(({rows}) => {
             res.json({
                 image: rows[0]
             });
         }).catch(() => {
             res.status(500).json({
                 success: false
             })
         })
 });


 /////////////////////



 //// can be passed a string which is the name of the component in html <some-component></some-component>
 Vue.component('some-component', {
     //  data, methods, etc. go here  can´t be an object but a function that returns an object
     // there is no el: (element)
     // data belongs only to the componen
     data: function() {
         return {
             heading: 'Hello world'
         };
     },
     template: '#tmpl',
     props: ['whatever', 'greetee']
 });

//////////

 //<!-- works bit like partials. has to be outside main-->
// <!-- this tags are important so the browser knows its not actual html. Also only one elemnt alowd per component -->
         <script id="tmpl" type="text/template">
             <div>
                 <h1>{{heading}}</h1>
                 <p>This is a component</p>
             </div>
         </script>


        // <!-- left is the refrence and right is the render. With v-bind you can make the right side dynamic-->
                             <some-component v-bind:greetee="greetee" whatever="42"></some-component>
