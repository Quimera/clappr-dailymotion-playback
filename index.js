import {Playback, Mediator, Events} from 'clappr'
import DailyHTML from './dailymotion.html'
import template from './template.js'
import './dailymotion.css'

export default class DailymotionPlayback extends Playback {
  get name() { return 'dailymotion' }
  get template() { 
    return template(DailyHTML) 
  }
  get attributes() {
    return {
      'data-dailymotion-playback': '',
      class: 'clappr-dailymotion-playback',
      id: this.cid
    }
  }

  constructor(options) {
    super(options)
    this.options = options
    this.settings = {
      seekEnabled: true,
      left: ['playpause', 'position', 'duration'],
      default: ['seekbar'],
      right:['fullscreen','volume', 'hd-indicator']
    }
    Mediator.on(Events.PLAYER_RESIZE, this.updateSize, this)
    this.render()
  }

  setupDailymotionPlayer() {
    if (window.DM && window.DM.Player) {
      this.embedDailymotionPlayer()
    } else {
      this.embedDailymotionApiScript()
    }
  }

  embedDailymotionApiScript() {
      
      var e = document.createElement('script')
      e.setAttribute('type', 'text/javascript')
      e.setAttribute('async', 'async')
      e.setAttribute('src', 'http://api.dmcdn.net/all.js')
      var s = document.getElementsByTagName('script')[0]
      
      s.parentNode.insertBefore(e, s);
      window.dmAsyncInit = () => this.embedDailymotionPlayer()
      // document.body.appendChild(script)
  }

  embedDailymotionPlayer() {
    var playerVars = {
      api:'postMessage',
      chromeless: 1,
      wmode:'opaque',
      logo: 0,
      info: 0
    }
    DM.init()
    var src_id = isDailymotionSrc(this.options.src)
    this.player = new DM.player('yt'+this.cid, {
      video: src_id,
      autoplay: 1,
      params: playerVars,
      events : {
        apiready: () => this.ready(),
        timeupdate: () => this.timeupdate(),
        ended: () => this.stateStop(),
        playing: () => this.statePlaying(),
        progress: () => this.progress()
      }
    })
  }

  updateSize() {
    this.player && this.player.setSize(this.$el.width(), this.$el.height())
  }

  ready(event) {
    this._ready = true
    this.trigger(Events.PLAYBACK_READY)
  }

  qualityChange(event) {
    this.trigger(Events.PLAYBACK_HIGHDEFINITIONUPDATE)
  }

  statePlaying(){
    this.enableMediaControl()
    this.trigger(Events.PLAYBACK_PLAY)
  }

  stateStop() {
    this.trigger(Events.PLAYBACK_ENDED)
  }

  play() {
    if (this._ready) {
      // this._progressTimer = this._progressTimer || setInterval(() => this.progress(), 100)
      this.playing = true
      this.player.togglePlay()
      // this.player.play()
      this.trigger(Events.PLAYBACK_PLAY)
      this.trigger(Events.PLAYBACK_BUFFERFULL)
    } else {
      this.listenToOnce(this, Events.PLAYBACK_READY, this.play)
    }
  }

  pause() {
    this.playing = false
    this.player.togglePlay()
    // this.player.pause()
    this.trigger(Events.PLAYBACK_PAUSE)
  }

  seek(position) {
    if (!this.player) return
    this.player.seek(this.player.duration / 100 * position)
  }

  volume(value) {
    this.player && this.player.setVolume(value/100)
  }

  progress() {
    var buffered = this.player.bufferedTime
    this.trigger(Events.PLAYBACK_PROGRESS, 0, buffered, this.player.duration)
  }

  timeupdate() {
    this.playing = true
    var buffered = this.player.bufferedTime
    this.trigger(Events.PLAYBACK_PROGRESS, 0, buffered, this.player.duration)

    this.trigger(Events.PLAYBACK_TIMEUPDATE, this.player.currentTime, this.player.duration)
  }

  isPlaying() {
    return this.player && this.playing
  }

  isHighDefinitionInUse() {
    return this.player && !!this.player.getPlaybackQuality().match(/^hd\d+/)
  }

  getDuration() {
    var duration = 0
    if (this.player) {
      duration = this.player.duration
    }
    return duration
  }

  disableMediaControl() {
    this.$el.css({'pointer-events': 'auto'})
    this.trigger(Events.PLAYBACK_MEDIACONTROL_DISABLE)
  }

  enableMediaControl() {
    this.$el.css({'pointer-events': 'none'})
    this.trigger(Events.PLAYBACK_MEDIACONTROL_ENABLE)
  }

  render() {
    var templateOptions = {id: 'yt'+this.cid}
    this.$el.html(this.template(templateOptions))

    this.setupDailymotionPlayer()
    return this
  }
}

DailymotionPlayback.canPlay = function(source) {
  var result = isDailymotionSrc(source)
  if (result !== null) {
    return true
  } else {
    return false
  }
};

var isDailymotionSrc = function(source) {
  var regExp = /^.+dailymotion.com\/((video|hub)\/([^_]+))?[^#]*(#video=([^_&]+))?/
  var result = source.match(regExp)

  return result ? result[5] || result[3] : null;
}
