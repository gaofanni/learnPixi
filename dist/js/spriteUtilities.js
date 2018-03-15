"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),SpriteUtilities=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:PIXI;if(_classCallCheck(this,e),void 0===t)throw new Error("Please supply a reference to PIXI in the SpriteUtilities constructor before using spriteUtilities.js");this.renderer="",t.ParticleContainer&&t.Sprite&&(this.renderer="pixi",this.Container=t.Container,this.ParticleContainer=t.ParticleContainer,this.TextureCache=t.utils.TextureCache,this.Texture=t.Texture,this.Rectangle=t.Rectangle,this.MovieClip=t.extras.MovieClip,this.BitmapText=t.extras.BitmapText,this.Sprite=t.Sprite,this.TilingSprite=t.extras.TilingSprite,this.Graphics=t.Graphics,this.Text=t.Text,this.shakingSprites=[])}return _createClass(e,[{key:"update",value:function(){if(this.shakingSprites.length>0)for(var e=this.shakingSprites.length-1;e>=0;e--){var t=this.shakingSprites[e];t.updateShake&&t.updateShake()}}},{key:"sprite",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=arguments[4],o=arguments[5],l=void 0,a=void 0;if("string"==typeof e){if(!(a=this.TextureCache[e]?this.TextureCache[e]:this.Texture.fromImage(e)))throw new Error(e+" cannot be found");l=n?new this.TilingSprite(a,r,o):new this.Sprite(a)}else e instanceof this.Texture?l=n?new this.TilingSprite(e,r,o):new this.Sprite(e):e instanceof Array&&("string"==typeof e[0]?l=this.TextureCache[e[0]]?this.MovieClip.fromFrames(e):this.MovieClip.fromImages(e):e[0]instanceof this.Texture&&(l=new this.MovieClip(e)));if(l)return l.x=t,l.y=i,r&&(l.width=r),o&&(l.height=o),l instanceof this.MovieClip&&this.addStatePlayer(l),l}},{key:"addStatePlayer",value:function(e){function t(t){o(),e.gotoAndStop(t)}function i(){o(),e.gotoAndStop(e.currentFrame)}function n(t){o(),t?(h=t[0],u=t[1]):(h=0,u=e.totalFrames-1),a=u-h,e.fps||(e.fps=12);var i=1e3/e.fps;e.gotoAndStop(h),l=1,e.animating||(s=setInterval(r.bind(this),i),e.animating=!0)}function r(){l<a+1?(e.gotoAndStop(e.currentFrame+1),l+=1):e.loop&&(e.gotoAndStop(h),l=1)}function o(){void 0!==s&&!0===e.animating&&(e.animating=!1,l=0,h=0,u=0,a=0,clearInterval(s))}var l=0,a=0,h=0,u=0,s=void 0;e.show=t,e.stopAnimation=i,e.playAnimation=n}},{key:"tilingSprite",value:function(e,t,i,n,r){if(void 0===t)throw new Error("Please define a width as your second argument for the tiling sprite");if(void 0===i)throw new Error("Please define a height as your third argument for the tiling sprite");var o=this.sprite(e,n,r,!0,t,i);return Object.defineProperties(o,{tileX:{get:function(){return o.tilePosition.x},set:function(e){o.tilePosition.x=e},enumerable:!0,configurable:!0},tileY:{get:function(){return o.tilePosition.y},set:function(e){o.tilePosition.y=e},enumerable:!0,configurable:!0},tileScaleX:{get:function(){return o.tileScale.x},set:function(e){o.tileScale.x=e},enumerable:!0,configurable:!0},tileScaleY:{get:function(){return o.tileScale.y},set:function(e){o.tileScale.y=e},enumerable:!0,configurable:!0}}),o}},{key:"filmstrip",value:function(e,t,i){for(var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,r=[],o=this.TextureCache[e].width,l=this.TextureCache[e].height,a=o/t,h=l/i,u=a*h,s=0;s<u;s++){var c=s%a*t,f=Math.floor(s/a)*i;n>0&&(c+=n+n*s%a,f+=n+n*Math.floor(s/a)),r.push([c,f])}return this.frames(e,r,t,i)}},{key:"frame",value:function(e,t,i,n,r){var o=void 0,l=void 0;if("string"==typeof e?this.TextureCache[e]&&(o=new this.Texture(this.TextureCache[e])):e instanceof this.Texture&&(o=new this.Texture(e)),o)return l=new this.Rectangle(t,i,n,r),o.frame=l,o;throw new Error("Please load the "+e+" texture into the cache.")}},{key:"frames",value:function(e,t,i,n){var r=this,o=void 0;if("string"==typeof e?this.TextureCache[e]&&(o=new this.Texture(this.TextureCache[e])):e instanceof this.Texture&&(o=new this.Texture(e)),o){return t.map(function(e){var t=e[0],l=e[1],a=new r.Rectangle(t,l,i,n),h=new r.Texture(o);return h.frame=a,h})}throw new Error("Please load the "+e+" texture into the cache.")}},{key:"frameSeries",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",r=[],o=e;o<t+1;o++){var l=this.TextureCache[""+(i+o+n)];r.push(l)}return r}},{key:"text",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"message",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"16px sans",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"red",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=new this.Text(e,{font:t,fill:i});return o.x=n,o.y=r,o._content=e,Object.defineProperty(o,"content",{get:function(){return this._content},set:function(e){this._content=e,this.text=e},enumerable:!0,configurable:!0}),o}},{key:"bitmapText",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"message",t=arguments[1],i=arguments[2],n=arguments[3],r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,l=new this.BitmapText(e,{font:t,align:i,tint:n});return l.x=r,l.y=o,l._content=e,Object.defineProperty(l,"content",{get:function(){return this._content},set:function(e){this._content=e,this.text=e},enumerable:!0,configurable:!0}),l}},{key:"rectangle",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:32,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:16724736,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:13260,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,l=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,a=new this.Graphics;a._sprite=void 0,a._width=e,a._height=t,a._fillStyle=this.color(i),a._strokeStyle=this.color(n),a._lineWidth=r;var h=function(e,t,i,n,r){a.clear(),a.beginFill(i),r>0&&a.lineStyle(r,n,1),a.drawRect(0,0,e,t),a.endFill()};h(a._width,a._height,a._fillStyle,a._strokeStyle,a._lineWidth);var u=a.generateTexture(),s=new this.Sprite(u);s.x=o,s.y=l;var c=this;return Object.defineProperties(s,{fillStyle:{get:function(){return a._fillStyle},set:function(e){a._fillStyle=c.color(e),h(a._width,a._height,a._fillStyle,a._strokeStyle,a._lineWidth,a._x,a._y);var t=a.generateTexture();a._sprite.texture=t},enumerable:!0,configurable:!0},strokeStyle:{get:function(){return a._strokeStyle},set:function(e){a._strokeStyle=c.color(e),h(a._width,a._height,a._fillStyle,a._strokeStyle,a._lineWidth,a._x,a._y);var t=a.generateTexture();a._sprite.texture=t},enumerable:!0,configurable:!0},lineWidth:{get:function(){return a._lineWidth},set:function(e){a._lineWidth=e,h(a._width,a._height,a._fillStyle,a._strokeStyle,a._lineWidth,a._x,a._y);var t=a.generateTexture();a._sprite.texture=t},enumerable:!0,configurable:!0}}),a._sprite=s,s}},{key:"circle",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:16724736,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:13260,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,l=new this.Graphics;l._diameter=e,l._fillStyle=this.color(t),l._strokeStyle=this.color(i),l._lineWidth=n;var a=function(e,t,i,n){l.clear(),l.beginFill(t),n>0&&l.lineStyle(n,i,1),l.drawCircle(0,0,e/2),l.endFill()};a(l._diameter,l._fillStyle,l._strokeStyle,l._lineWidth);var h=l.generateTexture(),u=new this.Sprite(h);u.x=r,u.y=o;var s=this;return Object.defineProperties(u,{fillStyle:{get:function(){return l._fillStyle},set:function(e){l._fillStyle=s.color(e),a(l._diameter,l._fillStyle,l._strokeStyle,l._lineWidth);var t=l.generateTexture();l._sprite.texture=t},enumerable:!0,configurable:!0},strokeStyle:{get:function(){return l._strokeStyle},set:function(e){l._strokeStyle=s.color(e),a(l._diameter,l._fillStyle,l._strokeStyle,l._lineWidth);var t=l.generateTexture();l._sprite.texture=t},enumerable:!0,configurable:!0},diameter:{get:function(){return l._diameter},set:function(e){l._lineWidth=10,a(l._diameter,l._fillStyle,l._strokeStyle,l._lineWidth);var t=l.generateTexture();l._sprite.texture=t},enumerable:!0,configurable:!0},radius:{get:function(){return l._diameter/2},set:function(e){a(2*e,l._fillStyle,l._strokeStyle,l._lineWidth);var t=l.generateTexture();l._sprite.texture=t},enumerable:!0,configurable:!0}}),l._sprite=u,u}},{key:"line",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:32,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:32,l=new this.Graphics;l._strokeStyle=this.color(e),l._width=t,l._ax=i,l._ay=n,l._bx=r,l._by=o;var a=function(e,t,i,n,r,o){l.clear(),l.lineStyle(t,e,1),l.moveTo(i,n),l.lineTo(r,o)};a(l._strokeStyle,l._width,l._ax,l._ay,l._bx,l._by);var h=this;return Object.defineProperties(l,{ax:{get:function(){return l._ax},set:function(e){l._ax=e,a(l._strokeStyle,l._width,l._ax,l._ay,l._bx,l._by)},enumerable:!0,configurable:!0},ay:{get:function(){return l._ay},set:function(e){l._ay=e,a(l._strokeStyle,l._width,l._ax,l._ay,l._bx,l._by)},enumerable:!0,configurable:!0},bx:{get:function(){return l._bx},set:function(e){l._bx=e,a(l._strokeStyle,l._width,l._ax,l._ay,l._bx,l._by)},enumerable:!0,configurable:!0},by:{get:function(){return l._by},set:function(e){l._by=e,a(l._strokeStyle,l._width,l._ax,l._ay,l._bx,l._by)},enumerable:!0,configurable:!0},strokeStyle:{get:function(){return l._strokeStyle},set:function(e){l._strokeStyle=h.color(e),a(l._strokeStyle,l._width,l._ax,l._ay,l._bx,l._by)},enumerable:!0,configurable:!0},width:{get:function(){return l._width},set:function(e){l._width=e,a(l._strokeStyle,l._width,l._ax,l._ay,l._bx,l._by)},enumerable:!0,configurable:!0}}),l}},{key:"grid",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:32,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:32,r=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,l=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,a=arguments.length>7&&void 0!==arguments[7]?arguments[7]:void 0,h=arguments.length>8&&void 0!==arguments[8]?arguments[8]:void 0,u=new this.Container;return function(){for(var s=e*t,c=0;c<s;c++){var f=c%e*i,d=Math.floor(c/e)*n,g=a();u.addChild(g),r?(g.x=f+i/2-g.width/2+o,g.y=d+n/2-g.width/2+l):(g.x=f+o,g.y=d+l),h&&h(g)}}(),u}},{key:"shoot",value:function(e,t,i,n,r,o,l,a){var h=a();h.anchor.set(.5,.5),e.addChild(h),h.x=i,h.y=n;var u=h.getGlobalPosition().x,s=h.getGlobalPosition().y;r.addChild(h),h.x=u,h.y=s,h.vx=Math.cos(t)*o,h.vy=Math.sin(t)*o,l.push(h)}},{key:"grid",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:32,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:32,r=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,l=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,a=arguments.length>7&&void 0!==arguments[7]?arguments[7]:void 0,h=arguments.length>8&&void 0!==arguments[8]?arguments[8]:void 0,u=this.group();return function(){for(var s=e*t,c=0;c<s;c++){var f=c%e*i,d=Math.floor(c/e)*n,g=a();u.addChild(g),r?(g.x=f+i/2-g.halfWidth+o,g.y=d+n/2-g.halfHeight+l):(g.x=f+o,g.y=d+l),h&&h(g)}}(),u}},{key:"shake",value:function(e){function t(){l<a&&(e.x=h,e.y=u,n-=c,e.x+=f(-n,n),e.y+=f(-n,n),l+=1),l>=a&&(e.x=h,e.y=u,o.shakingSprites.splice(o.shakingSprites.indexOf(e),1))}function i(){l<a&&(e.rotation=s,n-=c,e.rotation=n*d,l+=1,d*=-1),l>=a&&(e.rotation=s,o.shakingSprites.splice(o.shakingSprites.indexOf(e),1))}var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:16,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=this,l=1,a=10,h=e.x,u=e.y,s=e.rotation,c=n/a,f=function(e,t){return Math.floor(Math.random()*(t-e+1))+e};-1===o.shakingSprites.indexOf(e)&&(o.shakingSprites.push(e),e.updateShake=function(){r?i():t()});var d=1}},{key:"_getCenter",value:function(e,t,i){return void 0!==e.anchor?0!==e.anchor[i]?0:t/2:t}},{key:"group",value:function(){for(var e=new this.Container,t=arguments.length,i=Array(t),n=0;n<t;n++)i[n]=arguments[n];return i.forEach(function(t){e.addChild(t)}),e}},{key:"batch",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:15e3,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{rotation:!0,alpha:!0,scale:!0,uvs:!0};return new this.ParticleContainer(e,t)}},{key:"remove",value:function(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];if(t[0]instanceof Array){var n=t[0];if(n.length>0)for(var r=n.length-1;r>=0;r--){var o=n[r];o.parent.removeChild(o),n.splice(n.indexOf(o),1)}}else t.length>1?t.forEach(function(e){e.parent.removeChild(e)}):t[0].parent.removeChild(t[0])}},{key:"colorToRGBA",value:function(e){var t,i;return t=document.createElement("canvas"),t.height=1,t.width=1,i=t.getContext("2d"),i.fillStyle=e,i.fillRect(0,0,1,1),i.getImageData(0,0,1,1).data}},{key:"byteToHex",value:function(e){return("0"+e.toString(16)).slice(-2)}},{key:"colorToHex",value:function(e){var t,i=this;return t=this.colorToRGBA(e),"0x"+[0,1,2].map(function(e){return i.byteToHex(t[e])}).join("")}},{key:"color",value:function(e){return isNaN(e)?parseInt(this.colorToHex(e)):e}}]),e}();