/*!
    ===================================================================
    RAD: Responsive Ads (for Google Adsense)
    rad.js
    ===================================================================
    Copyright 2013 Matt Nish
    -------------------------------------------------------------------

    BASIC INFO:
    This plugin is meant to add responsive sizing to Google Ads.
    It uses CSS3 transforms to scale the ad up/down to the proper size,
    while resizing the ad's containing div as well.
    This keeps a layout from breaking because of ads failing to resize.

    This plugin works off the parent container of the ad div.
    This means that it'll work better within divs where the children 
    can comfortably expand 100% of the width.

    It wraps the ad div in 2 containers, ".radWrapper" & ".radAbsoluter".
    You can style these individually for different layouts if need be.
    ".radWrapper" gets the new width/height as the screen resizes.
    ".radAbsoluter" is meant to just ensure that the inner ad is taking
    up 100% of the inner space using position:absolute.

    OPTIONS:
    allowBiggerSizing   // accepts true or false, whether or not to 
                        // allow the ad to expand larger 
                        // than its original size
    maxWidth    // accepts a number of pixels, will set a maximum 
                // width for the ad to display at

    //COMING SOON
    WrapperOverrideCSS     //css to be applied after default css
    AbsoluterOverrideCSS   //css to be applied after default css
    WrapperAddClass         //class name to be added to default wrapper created
    AbsoluterAddClass         //class name to be added to default absoluter created

    EX USAGE:
    $('#google-ad2').rad();

    EX USAGE WITH OPTIONS:
    $('#google-ad2').rad({
        allowBiggerSizing:"true", //default false
        maxWidth:"300" //default null, must be in number of pixels
    });

    NOTE:
    The Adsense iframes don't like plugins that wrap the body tag.
    If your ads seem to be disappearing when used with rad.js, it may
    be because of another plugin affecting the entire body.

    -------------------------------------------------------------------
    ===================================================================

 */


// the semi-colon before the function invocation is a safety 
// net against concatenated scripts and/or other plugins 
// that are not closed properly.
;(function ( $, window, document, undefined ) {
    
    // Create the defaults once
    var pluginName = 'rad',
        defaults = {
            allowBiggerSizing: "false",
            maxWidth: null
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;

        var self = this;
        
        self.init();
        self.setScale();

        $(window).resize(function(){
            self.setScale();
        });
    }

    Plugin.prototype.init = function () {

        var self = this;
        
        this.id = this.element.id;
        var $elem = $(this.element);
        this.adWidth = $elem.width(); //save original width and height
        this.adHeight = $elem.height();
        $elem.wrap('<div class="radWrapper" style="overflow:hidden;position:relative;width:'+this.adWidth+'px;height:'+this.adHeight+'px;max-width: 100%;"></div>').wrap('<div class="radAbsoluter" style="position:absolute;left:0;top:0;width:100%;height:100%;"></div>');
        this.adParent = $elem.closest('div[class^="radWrapper"]').parent(); //save parent for updating container width value
        
        if(this.options.maxWidth){
            this.options.maxWidth = parseFloat(this.options.maxWidth);
        }
        // I tried to just use jquery to wrap the necessary containers around the ad, but it seems to break the ad from completely loading
        //$elem.wrap('<div class="radWrapper" style="overflow:hidden;position:relative;width:'+this.adWidth+'px;height:'+this.adHeight+'px;max-width: 100%;"></div>').wrap('<div class="radAbsoluter" style="position:absolute;left:0;top:0;width:100%;height:100%;"></div>');
        
        $elem.css({
            '-webkit-transform-origin':'0 0',
            '-moz-transform-origin':'0 0',
            '-ms-transform-origin':'0 0',
            '-o-transform-origin':'0 0',
            'transform-origin':'0 0',
            'position':'absolute'
        });
        
                
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