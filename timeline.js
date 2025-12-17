const threshold = 0.5
const ANIMATED_CLASS = "in-view"

function callback(entries, observer) {
  entries.forEach(entry => {
    const elem = entry.target
    if (entry.intersectionRatio >= threshold) {
      elem.classList.add(ANIMATED_CLASS)
      observer.unobserve(elem)
    }
  })
}

const vue_app = Vue.createApp({
  data() {
    return {
      events: [],
      owner: "Zahr Evans",
      github: "https://github.com/zahrevans/NJIT-3_StarterFiles"
    }
  },
  mounted() {
    fetch("timeline.json")
      .then(response => response.json())
      .then(json => {
        this.events = json

        // Run observer AFTER Vue renders list
        this.$nextTick(() => {
          const targets = document.querySelectorAll(".timeline ol li")
          const observer = new IntersectionObserver(callback, { threshold })
          targets.forEach(target => observer.observe(target))
        })
      })
  }
})

vue_app.mount("#app")