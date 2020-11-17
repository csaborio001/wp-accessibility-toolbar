/*!
 * jquery fontsize 插件
 * author: xiaolong
 * 20170530
 */
(function (b) {
    function e(a, c) {
        this.settings = b.extend({}, {
            step: 2,
            increaseTimes: 2,
            reduceTimes: 2,
            increaseBtn: ".zoomin",
            reduceBtn: ".zoomout"
        }, c);
        this.container = a;
        this.noFontTags = "svg IMG use BR VIDEO AUDIO STYLE SCRIPT".split(" ");
        this._init(this.container);
        this.$increaseBtn = b(this.settings.increaseBtn);
        this.$reduceBtn = b(this.settings.reduceBtn);
        var d = this;
        this.$increaseBtn.on("click", function () {
            !1 === d.fontIncrease() && d.$increaseBtn.addClass("disable");
            d.$reduceBtn.removeClass("disable")
        });
        this.$reduceBtn.on("click", function () {
            !1 === d.fontReduce() && d.$reduceBtn.addClass("disable");
            d.$increaseBtn.removeClass("disable")
        })
    }
    e.prototype._init = function () {
        this._loopNode(this.container, function () {
            b(this).css("font-size", b(this).css("font-size"))
        });
        this.zoom = 0;
        this.maxZoom = this.settings.step * this.settings.increaseTimes;
        this.minZoom = -this.settings.step * this.settings.reduceTimes
    };
    e.prototype._loopNode = function (a, b) {
        var d, c = this.noFontTags;
        if (1 === a.nodeType) {
            d = a.childNodes; - 1 === c.indexOf(a.nodeName) && b && b.call(a);
            for (var c = 0, e = d.length; c < e; c++) this._loopNode(d[c], b)
        }
    };
    e.prototype.fontIncrease = function (a) {
        a = a ? a : this.settings.step;
        if (this.zoom >= this.maxZoom) return !1;
        this.zoom + a > this.maxZoom && (a = this.maxZoom - this.zoom);
        this._loopNode(this.container, function () {
            b(this).css("font-size", b(this).css("font-size").slice(0, -2) - 0 + a + "px")
        });
        this.zoom += a
    };
    e.prototype.fontReduce = function (a) {
        a = a ? a : this.settings.step;
        if (this.zoom <= this.minZoom) return !1;
        this.zoom - a < this.minZoom && (a = Math.abs(this.zoom - this.minZoom));
        this._loopNode(this.container, function () {
            b(this).css("font-size", b(this).css("font-size").slice(0, -2) - 0 - a + "px")
        });
        this.zoom -= a
    };
    e.prototype.clearZoom = function () {
        var a = this.zoom;
        console.log(this.zoom);
        this._loopNode(this.container, function () {
            b(this).css("font-size", b(this).css("font-size").slice(0, -2) - 0 - a + "px")
        });
        this.zoom = 0
    };
    b.fn.FontSize = function (a, c) {
        if ("string" == typeof a) {
            var d = b.fn.FontSize.methods[a];
            if (d) return d(this, c)
        }
        return this.each(function () {
            b.data(this, "FontSize") || b.data(this, "FontSize", new e(this, a))
        })
    };
    b.fn.FontSize.methods = {
        fontIncrease: function (a, c) {
            return a.each(function () {
                b.data(this, "FontSize").fontIncrease(c)
            })
        },
        fontReduce: function (a, c) {
            return a.each(function () {
                b.data(this, "FontSize").fontReduce(c)
            })
        },
        clearZoom: function (a) {
            return a.each(function () {
                b.data(this, "FontSize").clearZoom()
            })
        }
    }
})(jQuery);