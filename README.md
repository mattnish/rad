===================================================================
Rad: Responsive Ads jQuery Plugin (for Google Adsense)
Rad.js
===================================================================

BASIC INFO:
This plugin is meant to add responsive sizing to Google Ads.
It uses CSS3 transforms to scale the ad up/down to the proper size,
while resizing the ad's containing div as well.
This keeps a layout from breaking because of ads failing to resize.

This plugin works off the parent container of the ad div.
This means that it'll work better within divs where the children 
can comfortably expand 100% of the width.

To use this, you need to wrap the ad div in a container, 
`.radWrapper`, which is used to help retain a natural layout in 
the DOM.  Unfortunately, iframes sometimes stop loading or break 
if you try to wrap it using jQuery, so for now, we just have to 
add the container beforehand.  You can style this individually 
for different layouts if need be to in your CSS.

QUICK DEMO:

https://primary-colored.5apps.com/


OPTIONS:
```
allowBiggerSizing   // accepts true or false, whether or not to 
                    // allow the ad to expand larger 
                    // than its original size (default false)
maxWidth    // accepts a number of pixels, will set a maximum 
            // width for the ad to display at
```

COMING SOON
```
WrapperOverrideCSS     //css to be applied after default css
WrapperAddClass         //class name to be added to default wrapper created

A throttle on the resizing...
```

EX USAGE:
```javascript
$(function(){
  $('#google-ad2').rad();
});

<div class="rapWrapper">
  <!-- Your Ad Here -->
</div>
```
EX USAGE WITH OPTIONS:
```javascript
$(function(){
  $('#google-ad2').rad({
    allowBiggerSizing:"true", //default false
    maxWidth:"300" //default null, must be in number of pixels
  });
});

<div class="rapWrapper">
  <!-- Your Ad Here -->
</div>
```

NOTES:

I'm not sure if it is against AdSense policies, or not.  
It seems like it okay based on this link below, but I'm 
talking with people on the Google Adsense team to make sure
this is either acceptable or a better solution is created.
https://support.google.com/adsense/answer/1354736?hl=en

The Adsense iframes don't like plugins that wrap the body tag.
If your ads seem to be disappearing when used with rad.js, it may
be because of another plugin affecting the entire body.

** DON'T FORGET TO WRAP THE AD IN THE `.radWrapper` CONTAINER


===================================================================
