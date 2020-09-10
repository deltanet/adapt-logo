# adapt-logo

**Logo** is an *extension* for the [Adapt framework](https://github.com/adaptlearning/adapt_framework).   

This extension allows an image and/or a title to be added into the top navigation bar.

## Installation

This extension must be manually installed.

If **Logo** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).  

## Settings Overview

**Logo** may be configured at course (*course.json*) level.

The attributes listed below are properly formatted as JSON in [*example.json*](https://github.com/deltanet/adapt-logo/blob/master/example.json).  

### Attributes

The Logo attribute group contains values for **_isEnabled**, **_position**, **_graphic**, **_title**, and **_link**.

>**_isEnabled** (boolean):  Turns on and off the **Logo** extension. Can be set to disable **Logo** when not required.

>**_position** (string):  Defines the location of the Logo elements within the top navigation bar. It contains preset values for **left**, **center**, and **right**.

>**_graphic** (object): This `_graphic` attributes group stores the properties for the image/logo. It contains values for **_isEnabled**, **_large**, **_medium**, and **_small**.  

>>**_isEnabled** (boolean):  If set to `true`, the specified asset will be added as a logo.

>>**_large** (string): File name (including path) of the image for the logo on a large sized device. Path should be relative to the *src* folder.  

>>**_medium** (string): File name (including path) of the image for the logo on a medium sized device. Path should be relative to the *src* folder.

>>**_small** (string): File name (including path) of the image for the logo on a small sized device. Path should be relative to the *src* folder.

>**_title** (object): This `_title` attributes group stores the properties for the title added to the navigation bar. It contains values for **_isEnabled**, **large**, **medium**, and **small**.  

>>**_isEnabled** (boolean):  If set to `true`, the specified text will be added as a title.

>>**large** (string): Defines the title on a large sized device.  

>>**medium** (string): Defines the title on a medium sized device.  

>>**small** (string): Defines the title on a small sized device.  

>**_link** (object): This `_link` attributes group stores the properties for a link on the button. It contains values for **_isEnabled**, and **_parentPage**.  

>>**_isEnabled** (boolean):  If set to `true`, the link button will be active.

>>**_parentPage** (boolean):  If set to `true`, the link will be the parent of the current page.

----------------------------
**Version number:**  3.0.0    
**Framework versions supported:**  5+    
**Author / maintainer:** DeltaNet with [contributors](https://github.com/deltanet/adapt-logo/graphs/contributors)     
**Accessibility support:** Yes  
**RTL support:** Yes  
**Authoring tool support:** yes
