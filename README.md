https://rubicon2.github.io/odin-weather-app-mk2/

In future projects, be sure to split up the components into their own files/folders. 
Do NOT load all the dom-related functions into one file as I originally did (dom.js). 
It makes the project difficult to navigate and leads to bad designs where things 
aren't as interoperable as they should be, it is difficult to find what part of 
the code does what, etc. 

The pubsub module is good, and the weatherAPI and weatherPhotosAPI are fine. 
The original plan was to use another API to dynamically grab background images, 
but in the end I only implemented the fallback I had planned in case the fetch 
failed. 

I spent quite a lot of time on animating the dom elements/sequencing css transitions 
even though that wasn't the focus of the project. 

The functions in domFade.js are useful for sequencing the fading out, replacement 
of content and fade back in, and delaying transitions, but I ended up re-doing 
them a few times as I realised, "if I made this more general it would be able to 
do more". So plan ahead next time and try to make general helper functions as 
generic as possible. Even now, the fade function could probably be modified quite 
easily to time and sequence the transitions of any css property. 

Also ran into some strange trouble with the icons provided by the weatherAPI loaded
fine on the devserver but the links were broken on the build version. Even though 
you could copy and paste the image src into your browser and it would load fine,
the build version just wouldn't link to the icons. The icon src provided by the API 
starts with '//' instead of e.g. 'http://'. Prepending 'http' fixed it, until uploading 
to github pages where it broke again. Github pages uses https, so it seems the issue is 
possibly something to do with 'protocol-relative URLs'? Thought it may be because I forgot 
to include { mode: 'cors' } in the fetch call, but issue persisted when I tried that. 
Look into this!

Lessons: 
- One script file/folder per component.
- Each function should do exactly one thing.
- Spend the majority of the time on the focal point of the project, not tangential stuff. Maybe it would be useful to work out a time budget for each feature at the start of the project?
- Be cognizant of any changes to the availablility of info from the API as the plan changes (in this case, from the pro trial (7 days forecast) to the free version (3 days forecast), and make sure the code can handle it. 

To Do:
- Go over SOLID design principles (as I clearly didn't practice them very well on this project). Perhaps on the next project, every time I go to write a class or function, refer to the SOLID principles and see if it meets them. 
- Look into 'protocol-relative URLs' and try to figure out why the image links were breaking on the build version.
