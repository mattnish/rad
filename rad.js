;(function ( $, window, document, undefined ) {
    var pluginName = 'rad',
        defaults = {
            allowBiggerSizing: "false",
            maxWidth: null
        };

    function Plugin( element, options ) {
        this.element = element;
    	
	Plugin._index = ( Plugin._index || 0 ) + 1;
		
	this.uid = Plugin._index;

        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;

        var self = this;
        
        self.init();
        self.setScale();

	self.__setScale = $.proxy( self.setScale, self );

        $(window).on( 'resize.rad.' + this.uid + 'orientationchange.rad.' + this.uid , self.__setScale );

    }

    Plugin.prototype.init = function () {
        
        this.id = this.element.id;
        var $elem = $(this.element);
        this.adWidth = $elem.width(); //save original width and height
        this.adHeight = $elem.height();
        $elem.closest('div[class^="radWrapper"]').css({position:'relative', width:this.adWidth+'px', height:this.adHeight+'px', maxWidth: '100%'});
        this.adParent = $elem.closest('div[class^="radWrapper"]').parent(); //save parent for updating container width value
        
        if(this.options.maxWidth){
            this.options.maxWidth = parseFloat(this.options.maxWidth);
        }        
        $elem.css({
            '-webkit-transform-origin':'0 0',
            '-moz-transform-origin':'0 0',
            '-ms-transform-origin':'0 0',
            '-o-transform-origin':'0 0',
            'transform-origin':'0 0',
            'position':'absolute'
        });
    };
	
    Plugin.prototype.destroy = function(){
        $(window).off( 'resize.rad.' + this.uid + 'orientationchange.rad.' + this.uid , self.__setScale );
	this.adParent = null;
	this.element = null;
    };

    //set new scale
    Plugin.prototype.setScale = function(pWidth, adWidth){ 
        $elem = $(this.element);
        var pWidth = this.adParent.width();
        //if maxWidth option set, check before rescaling
        if(this.options.maxWidth){
            if(pWidth > this.options.maxWidth){
                return false;
            }
        }
        if((pWidth < this.adWidth) || (this.options.allowBiggerSizing === "true")){
            var newScale = (pWidth / this.adWidth) -.001; //scale .001 smaller to fix a minor paint issue by the browser
            var newHeight = (pWidth * this.adHeight ) / this.adWidth;
            var newWidth = (this.adWidth * newHeight) / this.adHeight;
            // set newScale & newHeight (and pWidth if needed) to ad div
            $elem.closest('div[class^="radWrapper"]').css({
                'height': newHeight+'px',
                'width' : newWidth+'px'
            });
            $elem.css({
                '-moz-transform': 'scale(' + newScale + ')',
                '-webkit-transform': 'scale(' + newScale + ')',
                '-o-transform': 'scale(' + newScale + ')',
                '-ms-transform': 'scale(' + newScale + ')',
                'transform': 'scale(' + newScale + ')'
            });
        }
    }

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );
