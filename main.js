// Generated by CoffeeScript 1.7.0
var Item, Stream, addone, read, rows, sentence, stream, streams, word, _i, _results,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

stream = d3.select('#visual').append("div").attr({
  id: "stream",
  "class": "fullscreen"
});

rows = [5, 8, 12, 18].map(function(d, i) {
  if (window.matchMedia("(max-width: " + (d * 100) + "px)").matches) {
    return i + 1;
  }
}).filter(function(d) {
  return d !== void 0;
}).shift();

word = function() {
  if (m.r(0, 1) < 0.8) {
    return Math.round(m.r(0, 1000 * 10).toString());
  } else if (m.r(0, 1) > 0.5) {
    return Math.round(m.r(0, 9).toString());
  } else {
    return Math.round(m.r(0, 1000 * 1000).toString());
  }
};

sentence = function() {
  var _i, _ref, _results;
  return (function() {
    _results = [];
    for (var _i = 0, _ref = d3.round(m.r(3, 30)); 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this).map(word).join(" ").substr(0, 140);
};

Item = (function() {
  function Item(div) {
    this.addBasics = __bind(this.addBasics, this);
    this.addFrames = __bind(this.addFrames, this);
    this.addContent = __bind(this.addContent, this);
    this.item = div.insert('div', 'div').attr('class', 'closed');
    this.addFrames();
    this.addBasics();
    this.addContent();
    if (m.r(0, 1) < 0.2) {
      this.addMedia();
    }
  }

  Item.prototype.addContent = function() {
    this.right.append("p").attr('class', 'content').text(sentence());
    return this.right.append("p").attr('class', 'details').text("A " + "A " + word());
  };

  Item.prototype.addFrames = function() {
    this.left = this.item.append("div").attr('class', 'left');
    return this.right = this.item.append("div").attr('class', 'right');
  };

  Item.prototype.addBasics = function() {
    var svg, t;
    t = textures.lines().heavier(m.r(1, 4)).thinner(m.r(0.3, 0.7));
    svg = this.left.append("svg").attr('viewBox', '0 0 100 100').attr('preserveAspectRatio', 'xMinYMin meet').attr('class', 'avatar').call(t);
    svg.append("rect").style("fill", t.url()).attr({
      width: "100%",
      height: "100%"
    });
    this.right.append("p").attr('class', 'name').text(word());
    return this.right.append("p").attr('class', 'username').text(word());
  };

  Item.prototype.addMedia = function() {
    var pics, rec, t;
    t = textures.lines().heavier(m.r(1, 4)).thinner(m.r(0.3, 0.7));
    pics = d3.round(Math.random);
    rec = this.right.append("svg").call(t).attr({
      'viewBox': '0 0 700 700',
      'preserveAspectRatio': 'xMaxYMid slice',
      'class': 'pic',
      "fill": t.url()
    });
    if (Math.random() > 0.3) {
      return rec.append("rect").attr({
        width: "100%",
        height: "100%"
      });
    } else {
      if (Math.random() > 0.3) {
        rec.append("rect").attr({
          width: "50%",
          height: "100%"
        });
        return rec.append("rect").attr({
          x: "52%",
          width: "50%",
          height: "100%"
        });
      } else if (Math.random() > 0.5) {
        rec.append("rect").attr({
          width: "50%",
          height: "100%"
        });
        rec.append("rect").attr({
          x: "52%",
          width: "50%",
          height: "50%"
        });
        return rec.append("rect").attr({
          x: "52%",
          y: "52%",
          width: "50%",
          height: "50%"
        });
      } else {
        rec.append("rect").attr({
          width: "50%",
          height: "50%"
        });
        rec.append("rect").attr({
          width: "50%",
          y: "52%",
          height: "50%"
        });
        rec.append("rect").attr({
          x: "52%",
          width: "50%",
          height: "50%"
        });
        return rec.append("rect").attr({
          x: "52%",
          y: "52%",
          width: "50%",
          height: "50%"
        });
      }
    }
  };

  return Item;

})();

Stream = (function() {
  function Stream() {
    this.add = __bind(this.add, this);
    this.remove = __bind(this.remove, this);
    this.changeSpeed = __bind(this.changeSpeed, this);
    this.g = stream.append('div');
    if (rows > 1) {
      this.g.style('width', Math.floor(100 / rows) + "%");
    }
    this.changeSpeed();
    this.add();
  }

  Stream.prototype.changeSpeed = function() {
    this.speed = [m.r(100, 500), m.r(1000, 3 * 1000)];
    return setTimeout(this.changeSpeed, 2000);
  };

  Stream.prototype.remove = function() {
    this.g.selectAll('#stream>div>div').filter(function(d, i) {
      return i > 15;
    }).remove();
    if (m.r(0, 1) < 0.2) {
      return this.g.selectAll('#stream>div>div').filter(function() {
        return Math.random() < 0.05;
      }).classed("kill", true).transition().duration(1500).each("end", function() {
        return d3.select(this).remove();
      });
    }
  };

  Stream.prototype.add = function() {
    new Item(this.g);
    this.remove();
    return setTimeout(this.add, m.r(this.speed[0], this.speed[1]));
  };

  return Stream;

})();

(read = function() {
  var uh;
  uh = stream.selectAll('.closed').filter(function() {
    return Math.random() > 0.9;
  }).classed('closed', false);
  return setTimeout(read, 700);
})();

streams = (function() {
  _results = [];
  for (var _i = 0; 0 <= rows ? _i < rows : _i > rows; 0 <= rows ? _i++ : _i--){ _results.push(_i); }
  return _results;
}).apply(this).map(function() {
  return new Stream();
});

addone = function() {
  return streams.map(function(s) {
    return s.speed = [m.r(10, 50), m.r(100, 100)];
  });
};

window.trigger = addone;

document.getElementById("visual").addEventListener("click", addone);
