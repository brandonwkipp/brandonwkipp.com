function Knob(array) {
    var self = this;

    this.color = 'rgb(126,38,36)';
    this.diameter = 50;
    this.knobValue = 0;
    this.min = 0;
    this.max = 100;
    this.markerColor = 'black';
    this.orientation = 'normal';
    this.onLeftTurn = function(value) {
        console.log(value);
    }
    this.onRightTurn = function(value) {
        console.log(value);
    }
    this.onReset = function(value) {
        console.log(value);
    }
    this.xAxis = true;

    for(var key in array)
    {
        if(array.hasOwnProperty(key))
        {
            if(array[key] != null)
            {
                this[key] = array[key];
            }
        }
    }

    if(this.xAxis == null || typeof this.xAxis != 'boolean') { this.xAxis = true; }

    if(this.color == null || typeof this.color != 'string') { console.error('Knobject Error: this.color must be a string'); }

    var colorTest = document.createElement('div');
    colorTest.style.color = this.color;
    if(!colorTest.style.color) { console.error('Knobject.js Error: this.color is an invalid color'); }

    if(this.markerColor == null || typeof this.markerColor != 'string') { console.error('Knobject Error: this.markerColor must be a string'); }

    colorTest.style.color = this.markerColor;
    if(!colorTest.style.color) { console.error('Knobject.js Error: this.markerColor is an invalid color'); }

    if(this.diameter == null || typeof this.diameter != 'number') { this.diameter = 50; }

    if(this.containerId == null || typeof this.containerId != 'string') {
        var div = document.createElement("div");

        div.setAttribute("width", this.diameter);
        div.setAttribute("height", this.diameter);
        div.setAttribute('id', 'knobContainer');

        document.body.appendChild(div);

        this.containerId = 'knobContainer';
    }
    if(this.knobId == null || typeof this.knobId != 'string') { this.knobId = 'knob'; }

    function createClass(name, rules){
        var style = document.createElement('style');
        style.type = 'text/CSS';
        document.getElementsByTagName('head')[0].appendChild(style);
        if(!(style.sheet || {}).insertRule)
        {
            (style.styleSheet || style.sheet).addRule(name, rules);
        }else
        {
            style.sheet.insertRule(name + "{" + rules + "}", 0);
        }
    }
    createClass('.panKnob',"-webkit-user-drag:none;-khtml-user-drag:none;-moz-user-drag:none;-o-user-drag:none;ser-drag:none;text-decoration:none;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default;");

    var canvas = document.createElement("canvas");

    canvas.setAttribute("width", this.diameter);
    canvas.setAttribute("height", this.diameter);
    canvas.setAttribute('id', this.knobId);
    canvas.className = '';

    document.getElementById(this.containerId).appendChild(canvas);

    document.getElementById(this.knobId).addEventListener('mousedown', function(event) {
        event.stopPropagation();
        self.capture(event);
    });

    if(this.knobValue == null || typeof this.knobValue != 'number') { this.knobValue = 0; }
    if(this.max == null || typeof this.max != 'number') { this.max = 100; }
    if(this.min == null || typeof this.max != 'number') { this.min = 0; }
    if(this.max < this.min) { return console.error('Knobject.js Error: Max value cannot be higher than Min value'); }
    if(this.max == this.min) { return console.error('Knobject.js Error: Max value and Min value cannot be equal')}
    if(this.orientation == null || typeof this.orientation != 'string') { this.orientation = 'normal'; }

    if(this.defaultValue == null || typeof this.defaultValue != 'number')
    {
        if(this.orientation == 'normal')
        {
            this.defaultValue = this.min;
        }else
        {
            if(this.min > 0)
            {
                this.defaultValue = (this.max - this.min)/2;
            }else
            {
               this.defaultValue = (this.max + Math.abs(this.min))/2 + this.min;
            }
        }
    }
    if(this.defaultValue > this.max) { this.defaultValue = this.max; }
    if(this.defaultValue < this.min) { this.defaultValue = this.min; }
    if(this.value == null || typeof this.value != 'number') { this.value = this.defaultValue; }

    if(this.value > this.max) { this.value = this.max; }
    if(this.value < this.min) { this.value = this.min; }

    this.context = document.getElementById(this.knobId).getContext('2d');

    this.preRotate();

    return this;
}
Knob.prototype.capture = function(event) {
    if(this.xAxis == null || typeof this.xAxis != 'boolean') { this.xAxis = true; }
    var self = this;
    if(!event.altKey) {
        var x = event.clientX;
        var y = event.clientY;
        function knobUpdate(event) {
            var newX = event.clientX;
            var newY = event.clientY;
            if(self.xAxis)
            {
                var greaterThan = newX > x;
                var lessThan = newX < x;
            }else
            {
                var greaterThan = newY < y;
                var lessThan = newY > y;
            }
            if(greaterThan)
            {
                if(self.orientation == 'normal')
                {
                    if(!event.ctrlKey)
                    {
                        self.right();
                        self.right();
                    }else
                    {
                        self.right();
                    }
                }else
                {
                    if(!event.ctrlKey)
                    {
                        self.right();
                        self.right();
                        self.right();
                        self.right();
                    }else
                    {
                        self.right();
                    }
                }
            y = newY;
            x = newX;
            }
            if(lessThan)
            {
                if(self.orientation == 'normal')
                {
                    if(!event.ctrlKey)
                    {
                        self.left();
                        self.left();
                    }else
                    {
                        self.left();
                    }
                }else
                {
                    if(!event.ctrlKey)
                    {
                        self.left();
                        self.left();
                        self.left();
                        self.left();
                    }else
                    {
                        self.left();
                    }
                }
            y = newY;
            x = newX;
            }
        }
        window.addEventListener("mousemove", knobUpdate);
        window.onmouseup = function() {
            window.removeEventListener("mousemove", knobUpdate);
        }
    }else {
        this.knobValue = 0;
        this.value = this.defaultValue;

        if(this.context != null)
        {
            var ctx = this.context;
            ctx.clearRect(0,0,this.diameter,this.diameter);
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            this.preRotate();

            if(this.onReset != null)
            {
                if(typeof this.onReset == 'function')
                {
                    this.onReset(this.defaultValue);
                }else
                {
                    console.error('Knobject.js Error: this.onReset is not a function')
                }
            }else
            {
                if(typeof this.onLeftTurn == 'function')
                {
                    this.onLeftTurn(this.defaultValue);
                }
            }
        }
    }
}
Knob.prototype.drawKnob = function() {
    if(this.context != null)
    {
        if(this.color == null || typeof this.color != 'string') { this.color = 'rgb(126,38,36)'; }
        if(this.diameter == null || typeof this.diameter != 'number') { this.diameter = 50; }
        if(this.markerColor == null || typeof this.markerColor != 'string') { this.markerColor = 'black'; }

        var ctx = this.context;
        ctx.beginPath();
        ctx.arc(this.diameter/2,this.diameter/2,this.diameter/2,0,2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(this.diameter/2,0);
        ctx.lineTo(this.diameter/2,this.diameter/3);
        ctx.lineWidth = this.diameter/7.5;
        ctx.strokeStyle = this.markerColor;
        ctx.stroke();
        ctx.closePath();
    }
}
Knob.prototype.left = function() {
    if(this.knobValue == null || typeof this.knobValue != 'number') { this.knobValue = 0; }
    if(this.min == null || typeof this.min != 'number') { this.min = 0; }
    if(this.step == null || typeof this.step != 'number') { this.step = 1; }

    var value = this.orientation == 'normal' ? 0 : -100;

    if(this.knobValue > value)
    {
        this.knobValue -= this.STEP;

        if(this.onLeftTurn != null && typeof this.onLeftTurn == 'function')
        {
            switch(this.orientation)
            {
                case 'normal':
                    if(this.max > 0 && this.min >= 0)
                    {
                        this.value = this.knobValue * (this.max - this.min)/100 + this.min;
                    }else if(this.max > 0 && this.min < 0)
                    {
                        this.value = this.knobValue * (Math.abs(this.max - this.min)/100) + this.min;
                    }else if(this.max == 0)
                    {
                        this.value = this.knobValue * (this.max - this.min)/100 + this.min;
                    }else
                    {
                        this.value = this.knobValue * (Math.abs(this.max - this.min)/100) + this.min;
                    }
                break;
                case 'centered':
                    if(this.knobValue >= 0)
                    {
                        this.value = (this.max - this.defaultValue)/100 * this.knobValue + this.defaultValue;
                    }else
                    {
                        this.value = (this.defaultValue - this.min)/100 * this.knobValue + this.defaultValue;
                    }

                break;
            }
            this.onLeftTurn(this.value);
        }else
        {
            console.error('Knobect.js Error: this.onLeftTurn is not a function')
        }
        this.rotate('left');
        this.drawKnob();
    }
}
Knob.prototype.right = function() {
    if(this.knobValue == null || typeof this.knobValue != 'number') { this.knobValue = 0; }
    if(this.max == null || typeof this.max != 'number') { this.max = 100; }
    if(this.step == null || typeof this.step != 'number') { this.step = 1; }

    var value = this.orientation == 'normal' ? 100 : 100;
    if(this.knobValue < value)
    {
        this.knobValue += this.STEP;

        if(this.onRightTurn != null && typeof this.onRightTurn == 'function')
        {
            switch(this.orientation)
            {
                case 'normal':
                    if(this.max > 0 && this.min >= 0)
                    {
                        this.value = this.knobValue * (this.max - this.min)/100 + this.min;
                    }else if(this.max > 0 && this.min < 0)
                    {
                        this.value = this.knobValue * (Math.abs(this.max - this.min)/100) + this.min;
                    }else if(this.max == 0)
                    {
                        this.value = this.knobValue * (this.max - this.min)/100 + this.min;
                    }else
                    {
                        this.value = this.knobValue * (Math.abs(this.max - this.min)/100) + this.min;
                    }
                break;
                case 'centered':
                    if(this.knobValue >= 0)
                    {
                        this.value = this.knobValue * Math.abs(this.max - this.defaultValue)/100 + this.defaultValue;
                    }else
                    {
                        this.value = this.knobValue * Math.abs(this.defaultValue - this.min)/100  + this.defaultValue;
                    }
                break;
            }
            this.onRightTurn(this.value);
        }else
        {
            console.error('Knobect.js Error: this.onRightTurn is not a function')
        }
        this.rotate('right');
        this.drawKnob();
    }
}
Knob.prototype.preRotate = function() {
    if(this.context != null)
    {
        var ctx = this.context;

        if(this.diameter == null || typeof this.diameter != 'number') { this.diameter = 50; }

        ctx.clearRect(0,0,this.diameter,this.diameter);
        ctx.translate(this.diameter/2, this.diameter/2);

        if(this.defaultValue == null || typeof this.defaultValue != 'number') { this.defaultValue = this.min; }
        if(this.max == null || typeof this.max != 'number') { this.max = 100; }
        if(this.min == null || typeof this.min != 'number') { this.min = 0; }
        if(this.orientation == null || typeof this.orientation != 'string') { this.orientation = 'normal'; }

        switch(this.orientation)
        {
            case 'normal':
                if(this.value == null || typeof this.value != 'number') { this.value = 0; }

                if(this.min == this.value)
                {
                    ctx.rotate(145*Math.PI/-180);
                }else
                {
                    if(this.min <= 0)
                    {
                        var rotation = 50 - ((this.max - this.value)/Math.abs(this.max - this.min) * 100);
                        ctx.rotate(rotation * 2.9 * Math.PI/180);
                        this.knobValue = 100 - (100 * (this.max - this.value)/(this.max - this.min));
                    }else if(this.max > 0)
                    {
                        var rotation = (-100 + ((this.max - this.value)/Math.abs(this.max - this.min)) * 100) + 50;
                        ctx.rotate(rotation * 2.9 * Math.PI/-180);
                        this.knobValue = 100 - ((this.max - this.value)/Math.abs(this.max - this.min)*100);
                    }else if(this.max == 0)
                    {
                        var rotation = (-100 + (this.value/(this.max + this.min)) * 100) + 50;
                        ctx.rotate(rotation * 2.9 * Math.PI/-180);
                        this.knobValue = 100 - ((this.max - this.value)/Math.abs(this.max - this.min)*100);
                    }else
                    {
                        var rotation = (-100 + ((this.max - this.value)/Math.abs(this.max - this.min) * 100)) + 50;
                        ctx.rotate(rotation * 2.9 * Math.PI/-180);
                        this.knobValue = 100 - (100 * (this.max - this.value)/Math.abs(this.max - this.min));
                    }
                }
            break;
            case 'centered':
                if(this.value == null || typeof this.value != 'number') { this.value = this.defaultValue; }

                if(this.value == this.min)
                {
                    ctx.rotate(145*Math.PI/-180);
                    this.knobValue = -100;
                }else if(this.value != this.min && this.value < this.defaultValue)
                {
                    var rotation = Math.abs(this.defaultValue - this.value)/Math.abs(this.min - this.defaultValue) * 145;
                    ctx.rotate(rotation*Math.PI/-180);
                    this.knobValue = Math.abs(this.defaultValue - this.value)/Math.abs(this.min - this.defaultValue) * -100;
                }else if(this.value == this.max)
                {
                    ctx.rotate(145*Math.PI/180);
                    this.knobValue = 100;
                }
                if(this.value != this.max && this.value > this.defaultValue)
                {
                    var rotation = Math.abs(this.defaultValue - this.value)/(Math.abs(this.max - this.defaultValue)) * 145;
                    ctx.rotate(rotation*Math.PI/180);
                    this.knobValue = Math.abs(this.defaultValue - this.value)/Math.abs(this.max - this.defaultValue) * 100;
                }
            break;
        }
        ctx.translate(-this.diameter/2, -this.diameter/2);
        this.drawKnob();
    }
}
Knob.prototype.rotate = function(direction) {
    if(this.context != null)
    {
        var ctx = this.context;

        if(this.diameter == null || typeof this.diameter != 'number') { this.diameter = 50; }

        ctx.clearRect(0,0,this.diameter,this.diameter);
        ctx.translate(this.diameter/2, this.diameter/2);

        if(this.orientation == null || typeof this.orientation != 'string') { this.orientation = 'normal'; }

        switch(this.orientation)
        {
            case 'normal':
                if(Math.abs(this.min) == Math.abs(this.max))
                {
                    direction == 'left' ? ctx.rotate(2.9*Math.PI/-180) : ctx.rotate(2.9*Math.PI/180)
                }else
                {
                    direction == 'left' ? ctx.rotate(2.9*Math.PI/-180) : ctx.rotate(2.9*Math.PI/180);
                }
            break;
            case 'centered':
                direction == 'left' ? ctx.rotate(1.45*Math.PI/-180) : ctx.rotate(1.45*Math.PI/180);
            break;
        }
        ctx.translate(-this.diameter/2, -this.diameter/2);
    }
}

Object.defineProperty(Knob.prototype, "STEP", {
    value: 1,
    writable: false,
    enumerable: true,
    configurable: true
});
