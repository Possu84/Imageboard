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
