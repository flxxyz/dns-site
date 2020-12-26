((window) => {
    function angleBetweenPointsInDegrees(x1, y1, x2, y2) {
        var angle = Math.atan2(y2 - y1, x2 - x1) * 180.0 / Math.PI;
        angle = 180 + angle;
        return angle;
    }

    function distanceBetweenPoints(x1, y1, x2, y2) {
        var a = x1 - x2;
        var b = y1 - y2;
        return Math.sqrt((a * a) + (b * b));
    }

    class App {
        constructor(text) {
            if (!text) {
                text = new Blotter.Text("IPv4: 106.15.93.198", {
                    family: "'Helvetica', Arial, sans-serif",
                    style: 'italic',
                    weight: 400,
                    height: 100,
                    size: 64,
                    fill: "#171717",
                    paddingLeft: 24,
                    paddingRight: 24,
                });
            }
            this.blotterText = text;
            this.material = new Blotter.ChannelSplitMaterial();
            this.blotter = new Blotter(this.material, { texts: this.blotterText });
            this.scope = this.blotter.forText(this.blotterText);
            this.setListener();
        }
        setListener() {
            $(document).mousemove(this.handleMousemove.bind(this));
        }
        setInitialCenter() {
            var parentWidth = $(document).width();
            var parentHeight = $(document).height();
            var exampleWidth = this.$el.width();
            var exampleHeight = this.$el.height();
            var examplePosition = this.$el.offset();

            this.handleNewCenter(
                (examplePosition.left + (exampleWidth / 2.0)) / parentWidth,
                (examplePosition.top + (exampleHeight / 2.0)) / parentHeight
            );
        }
        handleMousemove(e) {
            var parentWidth = $(document).width();
            var parentHeight = $(document).height();

            var posX = e.pageX / parentWidth;
            var posY = e.pageY / parentHeight;

            this.handleNewCenter(posX, posY);
        }
        handleNewCenter(posX, posY) {
            var parentWidth = $(document).width();
            var parentHeight = $(document).height();

            var element = $(this.scope.domElement);
            var position = element.offset();
            var x = (position.left + (element.width() / 2.0)) / parentWidth;
            var y = (position.top + (element.height() / 2.0)) / parentHeight;

            var angle = angleBetweenPointsInDegrees(x, y, posX, posY);
            var blur = Math.min(0.2, distanceBetweenPoints(x, y, posX, posY));

            this.scope.material.uniforms.uRotation.value = angle;
            this.scope.material.uniforms.uOffset.value = blur;
            this.scope.appendTo(document.body);
        }
    };
    window.App = App;
})(this);
