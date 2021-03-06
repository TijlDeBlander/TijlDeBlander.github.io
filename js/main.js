!(function() {
  function t() {
    return b.pageYOffset || x.scrollTop;
  }
  function e() {
    return Math.max(
      R.scrollHeight,
      R.offsetHeight,
      x.clientHeight,
      x.scrollHeight,
      x.offsetHeight
    );
  }
  function n(t, e, n) {
    "undefined" == typeof n && (n = A);
    var i = T.createElement("canvas");
    return l("width", t * n, i), l("height", e * n, i), i;
  }
  function i(t, e, n, i, r) {
    r.save(),
      r.translate(t, e),
      r.scale(i, i),
      r.rotate(Math.PI / 4),
      r.fillRect(-n / 2, -n / 2, n, n),
      r.restore();
  }
  function r(t) {
    return T.querySelector(t);
  }
  function a(t) {
    var e = T.querySelectorAll(t);
    return [].slice.call(e);
  }
  function o(t) {
    return t.getContext("2d", {});
  }
  function u(t) {
    return t.getBoundingClientRect();
  }
  function l(t, e, n) {
    n.setAttribute(t, e);
  }
  function s(t, e) {
    e.fillStyle = t;
  }
  function c(t) {
    return Math.random() * t;
  }
  function f(t) {
    return t * t * (3 - 2 * t);
  }
  function h(t, e) {
    for (var n = 0; n < t; n++) e(n);
  }
  function d(t, e) {
    for (var n = 0; n < t.length; n++) e(t[n], n);
  }
  function p(t, e, n) {
    l("width", t.width * e, n), l("height", t.height * e, n);
  }
  function g() {
    var i = !1,
      r = a(".Scene-mountains"),
      l = null;
    return (
      d(r, function(r) {
        function a() {
          function n() {
            function t() {
              return v.getUniformLocation.apply(v, arguments);
            }
            function e() {
              return v.texParameteri.apply(v, arguments);
            }
            try {
              v = r.getContext("experimental-webgl", {
                premultipliedAlpha: !0,
                alpha: !0
              });
            } catch (t) {}
            if (!v) return !1;
            if (
              ((k = v.createBuffer()),
              v.bindBuffer(v.ARRAY_BUFFER, k),
              v.bufferData(
                v.ARRAY_BUFFER,
                new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1]),
                v.STATIC_DRAW
              ),
              (s = a(j, m)),
              null == s)
            )
              return !1;
            (c = t(s, "t")),
              (d = t(s, "r")),
              (p = t(s, "s")),
              (h = t(s, "sunSize"));
            var n = v.TEXTURE_2D,
              i = v.createTexture();
            return (
              v.bindTexture(n, i),
              e(n, v.TEXTURE_WRAP_S, v.CLAMP_TO_EDGE),
              e(n, v.TEXTURE_WRAP_T, v.CLAMP_TO_EDGE),
              e(n, v.TEXTURE_MIN_FILTER, v.LINEAR),
              e(n, v.TEXTURE_MAG_FILTER, v.LINEAR),
              v.texImage2D(n, 0, v.RGBA, v.RGBA, v.UNSIGNED_BYTE, g),
              !0
            );
          }
          function a(t, e) {
            var n = v.createProgram(),
              i = o(t, v.VERTEX_SHADER),
              r = o(
                "#ifdef GL_ES\nprecision highp float;\n#endif\n\n" + e,
                v.FRAGMENT_SHADER
              );
            return null == i || null == r
              ? null
              : (v.attachShader(n, i),
                v.attachShader(n, r),
                v.deleteShader(i),
                v.deleteShader(r),
                v.linkProgram(n),
                v.getProgramParameter(n, v.LINK_STATUS) ? n : null);
          }
          function o(t, e) {
            var n = v.createShader(e);
            return (
              v.shaderSource(n, t),
              v.compileShader(n),
              v.getShaderParameter(n, v.COMPILE_STATUS) ? n : null
            );
          }
          function u() {
            var n = "true" == r.getAttribute("data-stop-on-scroll"),
              a = t();
            ((n && a < b.innerHeight) ||
              (!n && a > e() - b.innerHeight - 200)) &&
              l(),
              i || _(u);
          }
          function l() {
            if (s) {
              var e = Math.max(0, 1 - t() / (0.5 * b.innerHeight));
              if (0 != e || 0 != E) {
                (E = e),
                  (y = new Date().getTime() - w),
                  v.clearColor(0, 0, 0, 0),
                  v.clear(v.COLOR_BUFFER_BIT | v.DEPTH_BUFFER_BIT),
                  v.useProgram(s),
                  v.uniform1f(c, y / 1e3),
                  v.uniform1f(
                    p,
                    "true" == r.getAttribute("data-stop-on-scroll") ? e : 0
                  ),
                  v.uniform2f(d, f.width * A, f.height * A),
                  v.uniform1f(h, S),
                  v.bindBuffer(v.ARRAY_BUFFER, k);
                var n;
                v.vertexAttribPointer(n, 2, v.FLOAT, !1, 0, 0),
                  v.enableVertexAttribArray(n),
                  v.drawArrays(v.TRIANGLES, 0, 6),
                  v.disableVertexAttribArray(n),
                  v.viewport(0, 0, f.width * A, f.height * A);
              }
            }
          }
          var s,
            c,
            h,
            d,
            p,
            k,
            v,
            j = L.vert,
            m = L.frag,
            w = new Date().getTime(),
            y = 0;
          if (!n()) return !1;
          u();
          var E = -1;
          return !0;
        }
        function c() {
          function t(t, e, n) {
            r.beginPath();
            var i = 0,
              a = !1;
            h(t.length, function(o) {
              var u = t.charAt(o);
              (i += "." == u ? 0 : "j" == u ? -1 : 1),
                0 == i ||
                  a ||
                  ((a = !0), r.moveTo((d.x + (o - 1) * l * e) * A, d.y * A)),
                r.lineTo((d.x + o * l * e) * A, (d.y + i * l * n) * A);
            }),
              r.closePath(),
              r.fill();
          }
          function e(e, n, i) {
            s(n, r),
              (r.strokeStyle = n),
              (r.lineWidth = 4),
              (r.lineJoin = "round"),
              t(c.left[e], -1, -1),
              t(c.right[e], 1, -1),
              s(i, r),
              (r.strokeStyle = i),
              t(c.left[e], -1, 1),
              t(c.right[e], 1, 1),
              (r.strokeStyle = "transparent");
          }
          var i = n(f.width, f.height);
          p(f, A, i);
          var r = o(i),
            a = 20;
          b.innerWidth < 700 && (a = 15);
          var u = Math.round(f.width / a),
            l = f.width / u,
            c = {
              left: [
                "......kkkkjjjkkjjkjkkjjkkkkkjjjjjj..kkjj",
                "....kkkjjj..kkkkjkkjjjj.......kkkkjjjjj",
                "...kkjj...kkkkjjj..kkkjkjjjj.....kkkkjjkjjj"
              ],
              right: [
                "......kkkkjjjkkjjjkkkjjkkkkkjjjjjkjj..kkkjjj",
                "....kkkjjjkkkkjjjkkjj.......kkkkjjjjj",
                "...kkjj.kkkkjjkkjjjjkkkkjkjjjj...kkkkjkjjjj"
              ]
            };
          e(2, w.pink, w.green),
            e(1, w.purple, w.pink),
            e(0, w.blackish, w.purple);
          var g = n(f.width, f.height),
            k = o(g);
          return (
            k.drawImage(i, 0, 0),
            r.save(),
            (r.globalCompositeOperation = "source-atop"),
            r.drawImage(g, 0, 0),
            k.clearRect(0, 0, f.width * A, f.height * A),
            k.restore(),
            k.drawImage(i, 0, 0),
            r.clearRect(0, 0, f.width * A, f.height * A),
            r.restore(),
            s(w.whiteish, r),
            r.beginPath(),
            (S = 2.5 * l * A),
            r.arc(d.x * A, d.y * A, S, Math.PI, 2 * Math.PI),
            r.fill(),
            r.drawImage(g, 0, 0),
            i
          );
        }
        var f = u(r);
        p(f, A, r);
        var d = { x: f.width / 2, y: f.height / 2 };
        null == l && (l = c());
        var g = l;
        a(), (r.style.opacity = 0.9999);
      }),
      {
        stop: function() {
          i = !0;
        }
      }
    );
  }
  function k() {
    function e() {
      return {
        x: c(h.width),
        y: c(h.height),
        s: 0,
        speed: 0.01 + c(0.035),
        growing: !0,
        maxSize: 1 + 10 * Math.pow(c(1), 4)
      };
    }
    var n = r(".Scene-stars"),
      a = !1,
      l = o(n),
      h = u(n);
    p(h, A, n);
    var g = [],
      k = [
        { p: 2.1, a: 0.01, s: 50 },
        { p: 1.7, a: 0.01, s: 30 },
        { p: 1.5, a: 0.01, s: 350 },
        { p: 1.3, a: 0.012, s: 35 },
        { p: 1, a: 0.02, s: 100 },
        { p: 0.94, a: 0.025, s: 50 },
        { p: 0.85, a: 0.036, s: 60 },
        { p: 0.65, a: 0.03, s: 50 },
        { p: 0.5, a: 0.035, s: 150 },
        { p: 0.47, a: 0.05, s: 40 },
        { p: 0.4, a: 0.055, s: 50 },
        { p: 0.25, a: 0.07, s: 70 },
        { p: -0.19, a: 0.06, s: 30 },
        { p: -0.3, a: 0.06, s: 70 },
        { p: -0.6, a: 0.04, s: 45 },
        { p: -0.9, a: 0.07, s: 30 },
        { p: -1.2, a: 0.06, s: 25 },
        { p: -1.5, a: 0.04, s: 50 },
        { p: -1.9, a: 0.02, s: 100 }
      ];
    return (
      (function n(r) {
        var o = t();
        if (o < b.innerHeight) {
          l.clearRect(0, 0, h.width * A, h.height * A), s(w.whiteish, l);
          var u = [];
          d(g, function(t) {
            (t.s += t.speed * (t.growing ? 1 : -1)),
              t.s > 1 && (t.growing = !1),
              t.s < 0 ||
                (u.push(t), i(t.x * A, t.y * A, 1, f(t.s) * t.maxSize * A, l));
          }),
            c(1) < 5e-7 * (b.innerWidth * b.innerHeight) && u.push(e()),
            (g = u);
          var p = 0.75 * E - o;
          d(k, function(t) {
            l.globalAlpha = t.a;
            var e = t.p,
              n = 1 - e,
              r = o + p * n + (E - p) * e;
            i(h.width / 2 * A, r * A, 1, t.s * A, l);
          }),
            (l.globalAlpha = 1);
        }
        a || _(n);
      })(),
      {
        stop: function() {
          a = !0;
        }
      }
    );
  }

  function v() {
    var t = document.createElement("div");
    (t.style.position = "absolute"),
      (t.style.height = "100vh"),
      document.body.appendChild(t);
    var e = t.getBoundingClientRect().height;
    return t.remove(), 0 == e && (e = b.innerHeight), e;
  }
  
  function j(e) {
    var n = u(e.video);
    (n = { top: n.top + t(), height: n.height }), (e.bounds = n);
  }
  function m() {
    "undefined" != typeof F && d(F, j);
  }
  var w = {
      whiteish: "#FFEDDB",
      yellow: "#F7F7B6",
      pink: "#E96F92",
      purple: "#75517D",
      blackish: "#1B2947",
      green: "#54fad4"
    },
    y = 120,
    E = 0,
    b = window,
    A = b.devicePixelRatio,
    T = document,
    R = T.body,
    x = T.documentElement,
    S = 100,
    L = {
      vert:
        "attribute vec3 position;void main(){gl_Position=vec4(position,1.0);}",
      frag:
        "uniform float t;uniform float s;uniform vec2 r;uniform sampler2D i;void main(){vec2 pixel=vec2(1.0)/r;vec2 p=gl_FragCoord.xy/r;p=vec2(p.x,1.0-p.y);if(p.y>0.5){float dist=(p.y-0.5)/0.5;float w=(dist*8.5)-t*1.0;float x=(sin(w*3.0-(t*4.0))+3.0)*0.5;w-=x*0.15;w=w-floor(w);w=(floor(w*4.0)-0.4)/4.0;p.y+=w*0.35*dist*s;}gl_FragColor=texture2D(i,p);}"
    };
  L.frag = document.getElementById("fs").textContent;
  var _ = requestAnimationFrame;
  !(function() {
    var t = g(),
      e = k(),
      n = b.innerWidth,
      i = b.innerHeight,
      r = null;
    b.addEventListener("resize", function() {
      function o() {
        var r = b.innerWidth,
          o = b.innerHeight;
        if (r != n) {
          (n = r), t.stop(), e.stop();
          var u = a(".Scene-mountains");
          d(u, function(t) {
            t.removeAttribute("width"), t.removeAttribute("height");
          }),
            _(function() {
              (t = g()), (e = k());
            });
        }
        Math.abs(o - i) > y &&
          ((i = o),
          e.stop(),
          _(function() {
            e = k();
          }));
      }
      null != r && (clearTimeout(r), (r = null)), (r = setTimeout(o, 1e3));
    });
  })(),
    (function() {
      function t() {
        var t = v();
        d(a(".js-HasVH"), function(e) {
          e.style.height = t * parseFloat(e.getAttribute("data-vh")) + "px";
        }),
          (E = t),
          m();
      }
      var e = b.innerHeight;
      t(),
        b.addEventListener("resize", function() {
          var n = b.innerHeight;
          Math.abs(n - e) > y && (t(), (e = n));
        });
    })(),
    (function() {
      d(a(".js-Lazyload"), function(t) {
        t.classList.remove("js-Lazyload--hidden");
        var e = document.createElement("img"),
          n = "true" == t.getAttribute("data-hires") && A > 1,
          i = t.getAttribute("data-image");
        if (n) {
          var r = i.lastIndexOf(".");
          i = i.substr(0, r) + "@2x" + i.substr(r);
        }
        l("src", i, e), l("role", "presentation", e), t.appendChild(e);
      });
    })();
  var F = a(".Work-video").map(function(t) {
    
      var n = { video: t, bounds: null, initialized: !1, playing: !1 };
      return (
        j(n),
        t.addEventListener("play", function() {
          (n.playing = !0),
            t.classList.add("Work-video--playing"),
            t.classList.remove("Work-video--paused");
        }),
        t.addEventListener("pause", function() {
            (n.playing = !1),
              t.classList.remove("Work-video--playing"),
              t.classList.add("Work-video--paused");
        }),
        t.classList.add("Work-video--paused"),
        document.addEventListener("touchstart", function t() {
          e(), document.removeEventListener("touchstart", t);
        }),
        n
      );
    });
  !(function() {
    var e = 0;
    !(function n() {
      var i = t();
      if (i != e) {
        var r = i + E / 2;
        d(F, function(t) {
          var e = 120,
            n = t.bounds.top + t.bounds.height / 2;
          r > n - e && r < n + e
            ? t.playing || t.video.play()
            : t.playing && t.video.pause();
        });
      }
      _(n);
    })();
  })(),
    (function() {
      var t = r(".Email");
      l("href", "mailto:Tijldeblander@gmail.com", t),
        (t.innerHTML =
          "<strong>tijldeblander</strong>@<strong>gmail</strong>.com");
    })();
  var H = !1;
  window.addEventListener("hashchange", function(t) {
    H && t.preventDefault();
  }),
    (function() {
      var t = a(".Nav-link");
      d(t, function(t) {
        t.addEventListener("click", function(n) {
          n.preventDefault();
          var i = r(".ScrollWrapper"),
            a = t.getAttribute("href"),
            o = b.innerWidth <= 768 ? 60 : 80;
          "#about" != a && (o = 30),
            (H = !0),
            window.history.pushState("", {}, a),
            requestAnimationFrame(function() {
              H = !1;
            }),
            (a = r(a));
          var l = u(a),
            s = Math.round(l.top) - o,
            c = e();
          s + b.innerHeight > c && (s = c - b.innerHeight),
            b.scrollTo(0, s),
            (i.style.transform = "translate3d(0," + s + "px,0)");
          var f = 300 + 0.3 * s,
            h = 0,
            d = s,
            p = 0,
            g = p - d,
            k = d,
            v = function(t) {
              return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            },
            j = function(t) {
              return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
            },
            m = s > 1e3,
            w = function(t) {
              return m ? j(t) : v(t);
            };
          _(function() {
            var t = Date.now(),
              e = Date.now(),
              n = 0,
              r = [];
            !(function a() {
              var o = Date.now();
              (e = o), (h = (e - t) / f), h > 1 && (h = 1);
              var u = d + w(h) * g,
                l = Math.min(0, u - k + 5);
              (r =
                h < 1 ? [l].concat(r.slice(0, 2)) : r.slice(0, r.length - 1)),
                (k = u),
                (n += l),
                (i.style.transform = "translate3d(0," + u + "px,0)"),
                (h < 1 || r.length > 0) && _(a);
            })();
          });
        });
      });
    })();
})();
