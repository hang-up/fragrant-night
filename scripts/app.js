Vue.config.debug = true;


// Need to fade out the timer
// Customize the color and the background as properties.
var timer = Vue.component("timer", {
  template: "#timer-template",

  props: ['year', 'month', 'day', 'message', 'color', 'background'],

  data: function() {
    return {
      months: "",
      days: "",
      hours: "",
      minutes: "",
      seconds: ""
    }
  },

  ready: function() {
    this.getTimer(this.year, this.month, this.day);
    this.setColor(this.color);
    this.setBackground(this.background);
  },

  methods: {
    setColor: function(color) {
      // We make a very very basic check to see if the color entered is a valid hex one.
      if ( /^#[0-9A-F]{6}$/i.test(color) ) {
        document.getElementById('wrapper').style.color = color;
      }
    },

    setBackground: function(background) {
      document.getElementById('wrapper').style.background = background;
    },

    getTimer: function(year, month, day) {

      setInterval(() => {
        var c = countdown(new Date(), new Date(year, month, day));

        this.months = c.months;
        this.days = c.days;
        this.hours = c.hours;
        this.minutes = c.minutes;
        this.seconds = c.seconds;
      }, 1000);

    }
  }
});

Vue.component("coming-soon", {
  template: "#coming-soon-template",

  props:  ['image', 'background'],

  ready: function() {
    // We know it takes 1 second for the timer script to fire up, so we fade out
    // this dimmer after 1.5second.
    setTimeout(() => {
      this.fade(document.getElementsByClassName('dimmer')[0]);
    }, 1500);
  },

  methods: {

    // Courtesy of http://stackoverflow.com/a/6121270
    fade(element) {
      var op = 1;  // initial opacity
      var timer = setInterval(function () {
          if (op <= 0.01){
              clearInterval(timer);
              element.style.display = 'none';
          }
          element.style.opacity = op;
          element.style.filter = 'alpha(opacity=' + op * 100 + ")";
          op -= op * 0.1;
      }, 50);
    }
  }
});


var wrapper = new Vue({
  el: "#wrapper",
});
