# smartmirror-camera-publisher

To provide a camera stream to several modules this process writes to a gstreamer shared memory object.
The RGB image is accessible as /tmp/camera_image, the depth image as /tmp/camera_depth and a image with a substracted background as /tmp/camera_1m.
