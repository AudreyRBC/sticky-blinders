import gsap from 'gsap';
import Lenis from '@studio-freight/lenis';
import ScrollTrigger from 'gsap/ScrollTrigger';

class initializedLenis {
  lenis: any;
  playing: boolean;
  $scrolls: NodeListOf<HTMLElement>;

  constructor() {
    this.$scrolls = document.querySelectorAll('[data-scroll]');
    this.raf = this.raf.bind(this);

    this.init();
    this.bindEvents();
  }

  init() {
    if (window.innerWidth >= 1024 && !this.lenis && !this.playing) {
      this.lenis = new Lenis({ lerp: .1, duration: .4 });
      gsap.ticker.add(this.raf)
      this.playing = true
    }
  }

  bindEvents() {
    if (this.lenis) this.lenis.on('scroll', ScrollTrigger.update)
    window.addEventListener('resized', () => this._onResized());

    this.$scrolls.forEach($scroll => {

      $scroll.addEventListener('click', (evt) => {
        const attr = $scroll.dataset.scroll
        this.lenis.scrollTo(+attr, { duration: 2 })
      })
    })
  }
  
  _onClick() {
    this.lenis.scrollTo
  }

  _onResized() {
    if (window.innerWidth < 1024 && this.lenis && this.playing) {
      this.lenis.destroy()
      this.lenis = null
    }
    if (window.innerWidth >= 1024 && !this.lenis && !this.playing) {
      this.init();
    }
    if (window.innerWidth >= 1024 && this.lenis && !this.playing) {
      gsap.ticker.add(this.raf)
      this.playing = true
    }
  }
  raf(time: number) {
    if (this.lenis) this.lenis.raf(time * 1000)
  }
}



export default initializedLenis
