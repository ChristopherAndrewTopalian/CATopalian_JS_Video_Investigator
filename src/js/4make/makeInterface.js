// makeInterface.js

function makeInterface()
{
    let mainDiv = ce('div');
    mainDiv.id = 'mainDiv';
    mainDiv.style.display = 'flex';
    mainDiv.style.width = '100vw';  // 100% of the Viewport Width
    mainDiv.style.height = '100vh'; // 100% of the Viewport Height
    ba(mainDiv);

    //-//

    // THE STAGE (Left Side)
    let leftContainer = ce('div');
    leftContainer.id = 'leftContainer';
    leftContainer.style.width = '70%';
    leftContainer.style.display = 'flex';
    //leftContainer.style.justifyContent = 'center'; // Centers video horizontally
    leftContainer.style.alignItems = 'center';     // Centers video vertically
    leftContainer.style.backgroundColor = '#000';  // Creates a nice "Theater" background

    leftContainer.style.flexDirection = 'column'; // Stacks video on top, scrubber on bottom
    leftContainer.style.justifyContent = 'center';
    //leftContainer.style.alignItems = 'center';
    mainDiv.append(leftContainer);

    //-//

    let rightContainer = ce('div');
    rightContainer.id = 'rightContainer';
    //rightContainer.style.marginLeft = '360px'; 
    // THE INTERFACE (Right Side)
    rightContainer.style.width = '30%';
    rightContainer.style.height = '100%';          
    rightContainer.style.overflowY = 'auto';       // Adds a scrollbar ONLY to the UI side
    rightContainer.style.padding = '0px 10px';
    rightContainer.style.backgroundColor = 'rgb(39, 39, 39)'; // Slightly lighter than the stage
    mainDiv.append(rightContainer);

    //-//

    let theVideo = ce('video');
    theVideo.id = 'video1';
    theVideo.className = 'videoLook';
    theVideo.controls = true;
    theVideo.src = nameOfVideo;
    theVideo.style.width = '100%';
    theVideo.style.flex = '1';          // "Expand to fill the remaining space above the scrubber"
    theVideo.style.minHeight = '0';     // "Never overflow past the bottom of the screen!"
    //theVideo.style.objectFit = 'contain';
    leftContainer.append(theVideo);

    //-//

    // THE CUSTOM FORENSIC SCRUBBER ---

    // Create a wrapper so we can style it nicely
    let scrubberContainer = ce('div');
    scrubberContainer.style.width = '100%';
    scrubberContainer.style.padding = '10px 20px';
    scrubberContainer.style.boxSizing = 'border-box';
    scrubberContainer.style.backgroundColor = 'rgb(40, 40, 40);'; 

    // Create the Range Slider
    let customScrubber = ce('input');
    customScrubber.type = 'range';
    customScrubber.min = 0;
    customScrubber.value = 0;
    // CRITICAL: step="0.001" gives us exact millisecond precision for micro-expressions
    customScrubber.step = 0.001; 
    customScrubber.style.width = '100%';
    customScrubber.style.cursor = 'pointer';

    scrubberContainer.append(customScrubber);
    leftContainer.append(scrubberContainer);

    // Event: When a new video loads, set the scrubber's max to the video's total duration
    let mainPlayer = ge('video1');
    mainPlayer.addEventListener('loadedmetadata', function() 
    {
        customScrubber.max = mainPlayer.duration;
    });

    // The Syncing Logic (Video -> Scrubber -> TopLeft Time)
    let isScrubbing = false;

    // When the video plays natively, move the slider to match
    mainPlayer.addEventListener('timeupdate', function() 
    {
        // Only auto-move the slider if the user IS NOT actively dragging it
        if (!isScrubbing) 
        {
            customScrubber.value = mainPlayer.currentTime;
        }

        // Update our existing top-left timecode display
        let topTimeDisplay = ge('currentTimeTopLeft');
        if (topTimeDisplay)
        {
            topTimeDisplay.innerText = formatTimecode(mainPlayer.currentTime);
        }
    });

    // The Syncing Logic (Scrubber -> Video)
    // When the user clicks the scrubber, pause the video so it doesn't fight them
    customScrubber.addEventListener('mousedown', function()
    {
        isScrubbing = true;
        mainPlayer.pause();
    });

    // When they let go, log the time (and optionally play it)
    customScrubber.addEventListener('mouseup', function()
    {
        isScrubbing = false;
        mainPlayer.play(); // Uncomment this if we want it to auto-play after scrubbing
    });

    // While they are dragging, force the video frame to instantly update
    customScrubber.addEventListener('input', function()
    {
        mainPlayer.currentTime = customScrubber.value;

        // Update top-left time instantly while dragging
        let topTimeDisplay = ge('currentTimeTopLeft');
        if (topTimeDisplay)
        {
            topTimeDisplay.innerText = formatTimecode(customScrubber.value);
        }
    });

    //-//

    //ba(makeTitleOfApp());
    rightContainer.append(makeTitleOfApp());

    //-//

    let videoDetails = ce('details');
    videoDetails.style.marginTop = '0px';
    rightContainer.append(videoDetails);

    //-//

    let videoSummary = ce('summary');
    videoSummary.textContent = 'Videos';
    videoDetails.append(videoSummary);

    // HIDDEN FILE INPUT
    let fileInput = ce('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.style.display = 'none';

    // The core engine for processing the selected videos
    fileInput.addEventListener('change', function(theEvent)
    {
        inputSound();

        let fileList = theEvent.target.files;

        if (fileList && fileList.length > 0)
        {
            cl("Files loaded: ", fileList.length);

            for (let i = 0; i < fileList.length; i++)
            {
                let file = fileList[i];
                let fileName = file.name;
                
                // Create the instant, RAM-free URL
                let blobUrl = URL.createObjectURL(file);

                // Only process Video files for the visual playlist
                if (fileName.toLowerCase().endsWith(".mp4") || fileName.toLowerCase().endsWith(".webm") || fileName.toLowerCase().endsWith(".ogg"))
                {
                    // Create the Playlist Button Container
                    let btnVideo = ce('button');
                    btnVideo.style.display = 'flex';
                    btnVideo.style.alignItems = 'center'; // Vertically centers icon and text
                    btnVideo.style.gap = '10px';          // Space between icon and text
                    btnVideo.style.padding = '5px';
                    btnVideo.style.margin = '2px 0';
                    btnVideo.style.cursor = 'pointer';
                    btnVideo.style.backgroundColor = '#222';
                    btnVideo.style.color = '#fff';
                    btnVideo.style.border = '1px solid #444';
                    btnVideo.style.textAlign = 'left';
                    btnVideo.style.width = '100%'; // Make it fill the playlist box nicely

                    // Create the Video Thumbnail (The Icon Trick)
                    let thumbVideo = ce('video');
                    thumbVideo.src = blobUrl + "#t=5.1"; // Grab frame at 5.1 seconds
                    thumbVideo.style.width = '60px';     
                    thumbVideo.style.height = '40px';
                    thumbVideo.style.objectFit = 'cover'; 
                    thumbVideo.style.pointerEvents = 'none'; 
                    thumbVideo.preload = 'metadata';   

                    // Stop the thumbnail from messing up the Flexbox math
                    thumbVideo.style.flexShrink = '0';  

                    btnVideo.append(thumbVideo);

                    // Create the Text Label
                    let labelText = ce('span');
                    labelText.textContent = fileName;
                    labelText.title = fileName;
                    labelText.style.fontSize = '12px';
                    labelText.style.color = '#ffffff';

                    // The Flexbox Armor
                    labelText.style.flex = '1';
                    labelText.style.minWidth = '0';
                    labelText.style.textAlign = 'left';
                    labelText.style.whiteSpace = 'nowrap'; 
                    labelText.style.overflow = 'hidden';
                    labelText.style.textOverflow = 'ellipsis';
                    btnVideo.append(labelText);

                    // The Click Event (Update the Main Player)
                    btnVideo.onclick = function()
                    {
                        clickSound();
                        
                        // Update our worldwide tracker
                        nameOfVideo = fileName;

                        theTitle = fileName;

                        // VIDEO
                        let mainPlayer = ge('video1');

                        if (mainPlayer)
                        {
                            mainPlayer.src = blobUrl;
                            mainPlayer.play(); 
                        }
                        else
                        {
                            cl("Error: Could not find 'mainVideoPlayer' on the screen!");
                        }
                    };

                    // Append button to the playlist container
                    ge('videoFilesContainer').append(btnVideo);

                    // Auto-select if it's the only video
                    if (fileList.length === 1) 
                    {
                        btnVideo.click(); 
                    }
                }
                else 
                {
                    cl('Skipped unsupported file type: ' + fileName);
                }
            }
        }
    });

    rightContainer.append(fileInput);

    //-//

    // VISIBLE LOAD BUTTON
    let fileButton = ce('button');
    fileButton.id = 'fileButton';
    fileButton.innerText = 'Load Video Files';
    
    fileButton.onmouseover = function()
    {
        hoverSound();
    };
    
    fileButton.onclick = function()
    {
        clickSound();
        // Route the click to the hidden input
        fileInput.click();
    };
    videoDetails.append(fileButton);

    //-//

    // THE PLAYLIST UI CONTAINER
    let videoFilesContainer = ce('div');
    videoFilesContainer.id = 'videoFilesContainer';
    videoFilesContainer.style.border = 'solid 1px white';
    videoFilesContainer.style.display = 'flex';
    videoFilesContainer.style.flexDirection = 'column';
    videoFilesContainer.style.width = '100%';
    videoFilesContainer.style.height = '150px'; // Made slightly taller to fit a nice list
    videoFilesContainer.style.overflow = 'scroll';
    videoFilesContainer.style.flexShrink = '0'; // Defends against Flexbox squishing
    
    videoDetails.append(videoFilesContainer);

    //-//

    // HIDDEN FILE INPUT FOR RECORDS
    let recordFileInput = ce('input');
    recordFileInput.type = 'file';
    recordFileInput.multiple = true;
    recordFileInput.accept = '.js'; // Only allow JS files to be picked
    recordFileInput.style.display = 'none';

    // The Core Engine for Processing Selected Record Files
    recordFileInput.addEventListener('change', function(theEvent)
    {
        inputSound();
        let fileList = theEvent.target.files;

        if (fileList && fileList.length > 0)
        {
            cl("Record files loaded: ", fileList.length);

            for (let i = 0; i < fileList.length; i++)
            {
                let file = fileList[i];
                let fileName = file.name;

                if (fileName.toLowerCase().endsWith(".js"))
                {
                    // Create the Record Button
                    let btnRecord = ce('div');
                    btnRecord.style.display = 'flex';
                    btnRecord.style.alignItems = 'center';
                    btnRecord.style.padding = '8px';
                    btnRecord.style.margin = '2px 0';
                    btnRecord.style.cursor = 'pointer';
                    btnRecord.style.backgroundColor = '#1a3a1a'; // A subtle green to distinguish from videos
                    btnRecord.style.color = '#fff';
                    btnRecord.style.border = '1px solid #2a5a2a';
                    btnRecord.style.fontSize = '12px';

                    // The Label
                    let labelText = ce('span');
                    labelText.textContent = fileName;
                    labelText.style.display = 'block';
                    labelText.style.flex = '1';
                    labelText.style.whiteSpace = 'nowrap';
                    labelText.style.overflow = 'hidden';
                    labelText.style.textOverflow = 'ellipsis';
                    btnRecord.append(labelText);

                    // The Click Event (The Script Injection Magic)
                    btnRecord.onclick = function()
                    {
                        clickSound();

                        // Create the instant, RAM-free URL for the selected file
                        let blobUrl = URL.createObjectURL(file);

                        // Clean up any previously loaded dynamic scripts to keep the DOM clean
                        let oldScript = ge('dynamicRecordScript');
                        if (oldScript)
                        {
                            oldScript.remove();
                        }

                        // Create the new script tag
                        let script = ce('script');
                        script.id = 'dynamicRecordScript';

                        // When the script finishes loading, the global 'records' variable is updated. 
                        // Now we redraw the UI!
                        script.onload = function()
                        {
                            cl("Successfully loaded database: " + fileName);
                            // we call our function to draw the updated records to the screen
                            printRecords(); 
                        };

                        // Point the script to the Blob URL and inject it
                        script.src = blobUrl;
                        document.getElementsByTagName('head')[0].append(script);
                    };

                    // Append button to the record playlist container
                    ge('recordFilesContainer').append(btnRecord);

                    if (fileList.length === 1) 
                    {
                        btnRecord.click(); 
                    }
                }
            }
        }
    });
    rightContainer.append(recordFileInput);

    //----//

    let recordFilesDetails = ce('details');
    rightContainer.append(recordFilesDetails);

    let recordFilesSummary = ce('summary');
    recordFilesSummary.textContent = 'Records';
    recordFilesDetails.append(recordFilesSummary);

    // VISIBLE LOAD BUTTON FOR RECORDS
    let recordFileButton = ce('button');
    recordFileButton.id = 'recordFileButton';
    recordFileButton.innerText = 'Load Record Drafts';
    
    recordFileButton.onmouseover = function() { hoverSound(); };
    recordFileButton.onclick = function()
    {
        clickSound();
        recordFileInput.click();
    };
    recordFilesDetails.append(recordFileButton);

    //-//

    // THE RECORD PLAYLIST UI CONTAINER
    let recordFilesContainer = ce('div');
    recordFilesContainer.id = 'recordFilesContainer';
    recordFilesContainer.style.border = 'solid 1px #2a5a2a';
    recordFilesContainer.style.display = 'flex';
    recordFilesContainer.style.flexDirection = 'column';
    recordFilesContainer.style.width = '100%'; 
    recordFilesContainer.style.boxSizing = 'border-box'; // The Magic Box
    recordFilesContainer.style.height = '150px'; // Shorter than the video list
    recordFilesContainer.style.overflow = 'scroll';
    recordFilesContainer.style.flexShrink = '0'; 
    recordFilesContainer.style.marginTop = '10px';
    
    recordFilesDetails.append(recordFilesContainer);

    //-//

    let captionsDetails = ce('details');
    rightContainer.append(captionsDetails);

    let captionsSummary = ce('summary');
    captionsSummary.textContent = 'Captions';
    captionsDetails.append(captionsSummary);

    // HIDDEN FILE INPUT FOR CAPTIONS
    let captionFileInput = ce('input');
    captionFileInput.type = 'file';
    captionFileInput.multiple = true;
    captionFileInput.accept = '.vtt'; // Only allow VTT files
    captionFileInput.style.display = 'none';

    // The Core Engine for Processing Selected Caption Files
    captionFileInput.addEventListener('change', function(theEvent)
    {
        inputSound();
        let fileList = theEvent.target.files;

        if (fileList && fileList.length > 0)
        {
            cl("Caption files loaded: ", fileList.length);

            for (let i = 0; i < fileList.length; i++)
            {
                let file = fileList[i];
                let fileName = file.name;

                if (fileName.toLowerCase().endsWith(".vtt"))
                {
                    // A. Create the Caption Button
                    let btnCaption = ce('div');
                    btnCaption.style.display = 'flex';
                    btnCaption.style.alignItems = 'center';
                    btnCaption.style.padding = '8px';
                    btnCaption.style.margin = '2px 0';
                    btnCaption.style.cursor = 'pointer';
                    // A subtle blue background to distinguish from videos (black) and records (green)
                    btnCaption.style.backgroundColor = '#1a1a3a'; 
                    btnCaption.style.color = '#fff';
                    btnCaption.style.border = '1px solid #2a2a5a';
                    btnCaption.style.fontSize = '12px';

                    // The Label
                    let labelText = ce('span');
                    labelText.textContent = fileName;
                    labelText.style.display = 'block';
                    labelText.style.flex = '1';
                    labelText.style.whiteSpace = 'nowrap';
                    labelText.style.overflow = 'hidden';
                    labelText.style.textOverflow = 'ellipsis';
                    btnCaption.append(labelText);

                    // The Click Event (The Subtitle Injection Magic)
                    btnCaption.onclick = function()
                    {
                        clickSound();
                        
                        // Explicitly targeting 'video1'
                        let mainPlayer = ge('video1'); 
                        if (mainPlayer)
                        {
                            // Create the instant, RAM-free URL
                            let blobUrl = URL.createObjectURL(file);

                            // Find ALL existing tracks in the video and destroy them
                            let existingTracks = mainPlayer.querySelectorAll('track');
                            for (let t = 0; t < existingTracks.length; t++) 
                            {
                                existingTracks[t].remove();
                            }

                            // Build the new track element
                            let track = ce('track');
                            track.id = 'dynamicCaptionTrack';
                            track.kind = 'subtitles';
                            track.label = fileName;
                            track.srclang = 'en';
                            track.src = blobUrl;
                            track.default = true; 

                            // Inject it into the video player
                            mainPlayer.append(track);

                            // Force the browser's hidden text-track engine to display it
                            if (mainPlayer.textTracks && mainPlayer.textTracks.length > 0) 
                            {
                                // Turn off any hidden ghost tracks the browser might be holding onto
                                for (let i = 0; i < mainPlayer.textTracks.length; i++) {
                                    mainPlayer.textTracks[i].mode = 'hidden';
                                }
                                // Force the newest track (the one we just appended) to show
                                mainPlayer.textTracks[mainPlayer.textTracks.length - 1].mode = 'showing';
                            }
                            
                            cl("Captions swapped and active: " + fileName);
                        }
                        else 
                        {
                            cl("Error: Could not find 'video1' element.");
                        }
                    };

                    // Append button to the caption container
                    ge('captionFilesContainer').append(btnCaption);
                

                    // If they only loaded exactly ONE file, auto-click it for them
                    if (fileList.length === 1) 
                    {
                        btnCaption.click(); 
                    }
                }
            }
        }
    });
    rightContainer.append(captionFileInput);

    //-//

    // VISIBLE LOAD BUTTON FOR CAPTIONS
    let captionFileButton = ce('button');
    captionFileButton.id = 'captionFileButton';
    captionFileButton.innerText = 'Load VTT Captions';
    
    captionFileButton.onmouseover = function() { hoverSound(); };
    captionFileButton.onclick = function()
    {
        clickSound();
        captionFileInput.click();
    };
    captionsDetails.append(captionFileButton);

    //-//

    // THE CAPTION PLAYLIST UI CONTAINER
    let captionFilesContainer = ce('div');
    captionFilesContainer.id = 'captionFilesContainer';
    captionFilesContainer.style.border = 'solid 1px #2a2a5a';
    captionFilesContainer.style.display = 'flex';
    captionFilesContainer.style.flexDirection = 'column';
    captionFilesContainer.style.width = '100%'; 
    captionFilesContainer.style.boxSizing = 'border-box'; // The Magic Box
    captionFilesContainer.style.height = '150px'; 
    captionFilesContainer.style.overflow = 'scroll';
    captionFilesContainer.style.flexShrink = '0'; 
    captionFilesContainer.style.marginTop = '10px';
    captionsDetails.append(captionFilesContainer);

    //-//

    let currentTimeTopLeftDiv = ce('div');
    currentTimeTopLeftDiv.id = 'currentTimeTopLeft';
    currentTimeTopLeftDiv.className = 'currentTimeStyle';
    currentTimeTopLeftDiv.title = 'Current Time of Video';
    rightContainer.append(currentTimeTopLeftDiv);

    //-//

    let continueButton = ce('button');
    continueButton.id = 'continueButton';
    continueButton.className = 'videoButtons';
    continueButton.title = 'continueVideo(\'video1\')'; // note the escaping quotes
    continueButton.textContent = 'Plays to End';
    continueButton.onclick = function()
    {
        continueVideo();
        // Reset the play buttons back to BLACK
        setIsolationModeVisuals(false);
    };
    rightContainer.append(continueButton);

    //-//

    let skipContainer = ce('div');
    skipContainer.style.display = 'flex';
    skipContainer.style.flexDirection = 'row';
    rightContainer.append(skipContainer);

    //-//

    let backButton = ce('button');
    backButton.id = 'back2SecondsButton100';
    backButton.className = 'videoButtons skipColor';
    backButton.title = 'back2Seconds(StartTimeEntered, EndTimeEntered, \'video1\', 1.0)';
    backButton.textContent = '<100';
    backButton.onclick = function()
    {
        back2Seconds(StartTimeEntered, EndTimeEntered, 'video1', 1.0);
    };
    skipContainer.append(backButton);

    //-//

    let backButton50 = ce('button');
    backButton50.id = 'back2SecondsButton50';
    backButton50.className = 'videoButtons skipColor';
    backButton50.title = 'back2Seconds(StartTimeEntered, EndTimeEntered, \'video1\', 0.5)';
    backButton50.textContent = '<50';
    backButton50.onclick = function()
    {
        back2Seconds(StartTimeEntered, EndTimeEntered, 'video1', 0.5);
    };
    skipContainer.append(backButton50);

    //-//

    let forwardButton50 = ce('button');
    forwardButton50.id = 'forward2SecondsButton50';
    forwardButton50.className = 'videoButtons skipColor';
    forwardButton50.title = 'forward2Seconds(StartTimeEntered, EndTimeEntered, \'video1\', 0.5)';
    forwardButton50.textContent = '>50';
    forwardButton50.onclick = function()
    {
        forward2Seconds(StartTimeEntered, EndTimeEntered, 'video1', 0.5);
    };
    skipContainer.append(forwardButton50);

    //-//

    let forwardButton100 = ce('button');
    forwardButton100.id = 'forward2SecondsButton100';
    forwardButton100.className = 'videoButtons skipColor';
    forwardButton100.title = 'forward2Seconds(StartTimeEntered, EndTimeEntered, \'video1\', 1.0)';
    forwardButton100.textContent = '>100';
    forwardButton100.onclick = function()
    {
        forward2Seconds(StartTimeEntered, EndTimeEntered, 'video1', 1.0);
    };
    skipContainer.append(forwardButton100);

    //-//

    // startContainer
    let startContainer = ce('div');
    startContainer.style.display = 'flex';
    startContainer.style.flexDirection = 'row';
    rightContainer.append(startContainer);

    //-//

    let markStartBtn = ce('button');
    markStartBtn.id = 'markStartVideoButton';
    markStartBtn.className = 'videoButtons';
    markStartBtn.title = 'markStartVideo()';
    //markStartBtn.style.width = '80px';
    markStartBtn.textContent = 'Start'; // 🕑
    markStartBtn.onclick = function()
    {
        markStartVideo();
        setIsolationModeVisuals(true);
    };
    startContainer.append(markStartBtn);

    //-//

    let decreaseBtn = ce('button');
    decreaseBtn.id = 'decreaseItStartButton';
    decreaseBtn.className = 'videoButtons';
    decreaseBtn.title = 'decreaseItStart()';
    decreaseBtn.textContent = '▼';
    decreaseBtn.onclick = function()
    {
        decreaseItStart();
        setIsolationModeVisuals(true);
    };
    startContainer.append(decreaseBtn);

    //-//

    let increaseBtn = ce('button');
    increaseBtn.id = 'increaseItStartButton';
    increaseBtn.className = 'videoButtons';
    increaseBtn.title = 'increaseItStart()';
    increaseBtn.textContent = '▲';
    increaseBtn.onclick = function()
    {
        increaseItStart();
        setIsolationModeVisuals(true);
    };
    startContainer.append(increaseBtn);

    //-//

    let startInput = ce('input');
    startInput.id = 'startInput';
    startInput.type = 'text';
    startInput.title = 'setStartTime()';
    startInput.style.width = '100%';
    startInput.value = '00:00:00';
    startInput.onchange = function()
    {
        setStartTime();
    };
    startContainer.append(startInput);

    //-//

    let endContainer = ce('div');
    endContainer.style.display = 'flex';
    endContainer.flexDirection = 'row';
    rightContainer.append(endContainer);

    //-//

    let markEndBtn = ce('button');
    markEndBtn.id = 'markEndVideoButton';
    markEndBtn.className = 'videoButtons';
    markEndBtn.title = "markEndVideo('video1')";
    //markEndBtn.style.width = '80px';
    markEndBtn.textContent = 'End'; // 🕔
    markEndBtn.onclick = function()
    {
        markEndVideo();
        setIsolationModeVisuals(true);
    };
    endContainer.append(markEndBtn);

    //-//

    let decreaseEndBtn = ce('button');
    decreaseEndBtn.id = 'decreaseItEndButton';
    decreaseEndBtn.className = 'videoButtons';
    decreaseEndBtn.title = 'decreaseItEnd()';
    decreaseEndBtn.textContent = '▼';
    decreaseEndBtn.onclick = function()
    {
        decreaseItEnd();
        setIsolationModeVisuals(true);
    };
    endContainer.append(decreaseEndBtn);

    //-//

    let increaseEndBtn = ce('button');
    increaseEndBtn.id = 'increaseItEndButton';
    increaseEndBtn.className = 'videoButtons';
    increaseEndBtn.title = 'increaseItEnd()';
    increaseEndBtn.textContent = '▲';
    increaseEndBtn.onclick = function()
    {
        increaseItEnd();
        setIsolationModeVisuals(true);
    };
    endContainer.append(increaseEndBtn);

    //-//

    let endInput = ce('input');
    endInput.id = 'endInput';
    endInput.type = 'text';
    endInput.title = 'setEndTime()';
    endInput.style.width = '100%';
    endInput.value = '00:00:00';
    endInput.onchange = function()
    {
        setEndTime();
    };
    endContainer.append(endInput);

    //-//

    let playContainer = ce('div');
    playContainer.style.display = 'flex';
    playContainer.style.flexDirection = 'row';
    rightContainer.append(playContainer);

    //-//

    let playVideo100Btn = ce('button');
    playVideo100Btn.id = 'playVideo100Button';
    playVideo100Btn.className = 'playButtons';
    playVideo100Btn.title = 'playVideo(StartTimeEntered, EndTimeEntered, \'video1\', 1.0 )';
    playVideo100Btn.textContent = '▶100';
    playVideo100Btn.onclick = function()
    {
        playVideoMAIN(StartTimeEntered, EndTimeEntered, 'video1', 1.0);
    };
    playContainer.append(playVideo100Btn);

    //-//

    let playVideo50Btn = ce('button');
    playVideo50Btn.id = 'playVideo50Button';
    playVideo50Btn.className = 'playButtons';
    playVideo50Btn.title = 'playVideo(StartTimeEntered, EndTimeEntered, \'video1\', 0.5 )';
    playVideo50Btn.textContent = '▶50';
    playVideo50Btn.onclick = function()
    {
        playVideoMAIN(StartTimeEntered, EndTimeEntered, 'video1', 0.5);
    };
    playContainer.append(playVideo50Btn);

    //-//

    let playVideo25Btn = ce('button');
    playVideo25Btn.id = 'playVideo25Button';
    playVideo25Btn.className = 'playButtons';
    playVideo25Btn.title = 'playVideo(StartTimeEntered, EndTimeEntered, \'video1\', 0.25 )';
    playVideo25Btn.textContent = '▶25';
    playVideo25Btn.onclick = function()
    {
        playVideoMAIN(StartTimeEntered, EndTimeEntered, 'video1', 0.25);
    };
    playContainer.append(playVideo25Btn);

    //-//

    let noteTextarea = ce('textarea');
    noteTextarea.id = 'noteInput';
    noteTextarea.placeholder = 'Write Notes';
    noteTextarea.style.width = '100%';
    noteTextarea.style.minHeight = '50px';
    noteTextarea.onkeyup = function()
    {
        setNote();
    };
    rightContainer.append(noteTextarea);

    //-//

    let wordsTextarea = ce('textarea');
    wordsTextarea.id = 'wordsInput';
    wordsTextarea.placeholder = 'Write Words Spoken';
    wordsTextarea.style.width = '100%';
    wordsTextarea.style.minHeight = '50px';
    wordsTextarea.onkeyup = function()
    {
        setWords();
    };
    rightContainer.append(wordsTextarea);

    //-//

    let conclusionTextarea = ce('textarea');
    conclusionTextarea.id = 'conclusionInput';
    conclusionTextarea.placeholder = 'Write Conclusion';
    conclusionTextarea.style.width = '100%';
    conclusionTextarea.style.minHeight = '50px';
    conclusionTextarea.onkeyup = function()
    {
        setConclusion();
    };
    rightContainer.append(conclusionTextarea);

    //-//

    let currentTimeBtn = ce('button');
    currentTimeBtn.className = 'videoButtons';
    currentTimeBtn.id = 'videoCurrentTimeToLastEntry';
    currentTimeBtn.title = 'videoCurrentTimeToLastEntry';
    currentTimeBtn.textContent = 'Set Time to Last Entry';
    currentTimeBtn.onclick = function()
    {
        videoCurrentTimeToLastEntry();
    };
    rightContainer.append(currentTimeBtn);

    //-//

    let clearTextBtn = ce('button');
    clearTextBtn.className = 'videoButtons myVideoButtonSmaller';
    clearTextBtn.id = 'clearTextButton';
    clearTextBtn.title = 'clearText()';
    clearTextBtn.textContent = 'Clear All Text ⌦';
    clearTextBtn.onclick = function()
    {
        clearText();
    };
    rightContainer.append(clearTextBtn);

    //-//

    let volumeDetails = ce('details');
    rightContainer.append(volumeDetails);

    //-//

    let summary = ce('summary');
    summary.className = 'summaryStyle';
    summary.textContent = 'VOLUME';
    volumeDetails.append(summary);

    //-//

    let soundIcon = ce('font');
    soundIcon.className = 'fontColor';
    soundIcon.textContent = '🔊';
    volumeDetails.append(soundIcon);

    // define volume buttons data
    let volumeButtonsData = [
    { id: 'volume100Button', label: '100', volume: 1.0, title: 'setVolume(1.0)' },
    { id: 'volume50Button', label: '50', volume: 0.5, title: 'setVolume(0.5)' },
    { id: 'volume25Button', label: '25', volume: 0.25, title: 'setVolume(0.25)' },
    { id: 'volume15Button', label: '15', volume: 0.15, title: 'setVolume(0.15)' },
    { id: 'volume5Button', label: '5', volume: 0.05, title: 'setVolume(0.05)' },
    { id: 'volume0Button', label: '🔇', volume: 0.0, title: 'setVolume(0.0)' }
    ];

    //-//

    for (let i = 0; i < volumeButtonsData.length; i++)
    {
        let btnData = volumeButtonsData[i];
        let btn = ce('button');
        btn.id = btnData.id;
        btn.className = 'videoButtons';
        btn.title = btnData.title;
        btn.textContent = btnData.label;
        btn.onclick = (function(volume)
        {
            return function()
            {
                setVolume(volume);
            };
        })(btnData.volume);
        volumeDetails.append(btn);
    }

    //-//

    let timeCodeDiv = ce('div');
    timeCodeDiv.className = 'timeCode';
    timeCodeDiv.id = 'theStartMinutes2';
    timeCodeDiv.textContent = '00:00:00';
    rightContainer.append(timeCodeDiv);

    //-//

    let endTimeCodeDiv = ce('div');
    endTimeCodeDiv.className = 'timeCode';
    endTimeCodeDiv.id = 'theEndMinutes2';
    endTimeCodeDiv.textContent = '00:00:00';
    rightContainer.append(endTimeCodeDiv);

    //-//

    let displayNoteDiv = ce('div');
    displayNoteDiv.className = 'displayNote';
    displayNoteDiv.id = 'displayNote';
    displayNoteDiv.textContent = 'Note Info';
    rightContainer.append(displayNoteDiv);

    //-//

    let displayWordsDiv = ce('div');
    displayWordsDiv.className = 'displayWords';
    displayWordsDiv.id = 'displayWords';
    displayWordsDiv.textContent = 'Words Said';
    rightContainer.append(displayWordsDiv);

    //-//

    let displayConclusionDiv = ce('div');
    displayConclusionDiv.className = 'displayConclusion';
    displayConclusionDiv.id = 'displayConclusion';
    displayConclusionDiv.textContent = 'Conclusion';
    rightContainer.append(displayConclusionDiv);

    //-//

     rightContainer.append(ce('hr'));

    //-//

    let addRecordBtn = ce('button');
    addRecordBtn.id = 'addRecordButton';
    addRecordBtn.title = 'addRecord()';
    addRecordBtn.textContent = 'Add Record Ѫ';
    addRecordBtn.onclick = function()
    {
        addRecord();
    };
    rightContainer.append(addRecordBtn);

    //-//

    rightContainer.append(ce('hr'));

    //-//

    let displayCountBtn = ce('button');
    displayCountBtn.id = 'displayCount';
    displayCountBtn.align = 'center';
    displayCountBtn.title = 'Total # of Records';
    displayCountBtn.textContent = '';
    displayCountBtn.onclick = function()
    {
        //addRecord();
    };
    rightContainer.append(displayCountBtn);

    //-//

    let jsonDownloadBtn = ce('button');
    jsonDownloadBtn.id = 'jsonDownloadButton';
    jsonDownloadBtn.className = 'videoButtons';
    jsonDownloadBtn.value = 'download';
    jsonDownloadBtn.title = 'jsonDownload(records)';
    jsonDownloadBtn.textContent = '⎙ Download Records';
    jsonDownloadBtn.onclick = function()
    {
        jsonDownload();
    };
    rightContainer.append(jsonDownloadBtn);

    //-//

    let downloadAnchor = ce('a');
    downloadAnchor.id = 'downloadAnchorElem';
    downloadAnchor.style.display = 'none';
    rightContainer.append(downloadAnchor);

    //-//

    let fullReportBtn = ce('button');
    //fullReportBtn.className = 'videoButtons';
    fullReportBtn.id = 'fullReportNewWindowButton';
    fullReportBtn.title = 'fullReportCodeNewWindow()';
    fullReportBtn.textContent = 'Report - New Window';
    fullReportBtn.onclick = function()
    {
        fullReportCodeNewWindow();
    };
    rightContainer.append(fullReportBtn);

    //-//

    let fullReportCodeBtn = ce('button');
    //fullReportCodeBtn.className = 'videoButtons';
    fullReportCodeBtn.id = 'fullReportCodeButton';
    fullReportCodeBtn.title = 'fullReportCode()';
    fullReportCodeBtn.textContent = 'Report Console (F12)';
    fullReportCodeBtn.onclick = function()
    {
        fullReportCode();
    };
    rightContainer.append(fullReportCodeBtn);

    //-//

    let deleteRecordInput = ce('input');
    deleteRecordInput.id = 'deleteRecordInput';
    deleteRecordInput.type = 'number';
    deleteRecordInput.title = 'deleteThisRecord(i)';
    deleteRecordInput.min = 0;
    deleteRecordInput.style.width = '100px';
    rightContainer.append(deleteRecordInput);

    //-//

    let deleteRecordBtn = ce('button');
    deleteRecordBtn.className = 'videoButtons';
    deleteRecordBtn.id = 'deleteThisRecordButton';
    deleteRecordBtn.title = 'deleteThisRecord()';
    deleteRecordBtn.textContent = 'Record # to Delete';
    deleteRecordBtn.onclick = function()
    {
        deleteThisRecord();
    };
    rightContainer.append(deleteRecordBtn);

    //-//

    let clearAllRecordsBtn = ce('button');
    clearAllRecordsBtn.className = 'videoButtons';
    clearAllRecordsBtn.id = 'clearAllRecordsButton';
    clearAllRecordsBtn.title = 'clearAllRecords()';
    clearAllRecordsBtn.textContent = 'Clear All Records';
    clearAllRecordsBtn.onclick = function()
    {
        clearAllRecords();
    };
    rightContainer.append(clearAllRecordsBtn);

    //-//

    let displayDeletedRecordDiv = ce('div');
    displayDeletedRecordDiv.className = 'note';
    displayDeletedRecordDiv.id = 'displayDeletedRecord';
    ba(displayDeletedRecordDiv);

    //-//

    let showReverseOrderBtn = ce('button');
    showReverseOrderBtn.className = 'videoButtons';
    showReverseOrderBtn.id = 'showReverseOrderButton';
    showReverseOrderBtn.title = 'showReverseOrder()';
    showReverseOrderBtn.textContent = 'Reverse Record Order';
    showReverseOrderBtn.onclick = function() {
        showReverseOrder();
    };
    rightContainer.append(showReverseOrderBtn);

    //-//

    let displayRecordDiv = ce('div');
    displayRecordDiv.id = 'displayRecord';
    rightContainer.append(displayRecordDiv);
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

