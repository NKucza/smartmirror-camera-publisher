#!/usr/bin/env python2


from subprocess import PIPE, Popen
import time, sys, os, json
import signal

BASE_DIR = os.path.dirname(__file__) + '/'
os.chdir(BASE_DIR)

def to_node(type, message):
	# convert to json and print (node helper will read from stdout)
	try:
		print(json.dumps({type: message}))
	except Exception:
		pass
	# stdout has to be flushed manually to prevent delays in the node helper communication
	sys.stdout.flush()

def shutdown(self, signum):
	to_node("status", 'Shutdown: Cleaning up camera...')
	p.kill()
	if os.path.exists("/tmp/camera_image") is True:
		os.remove("/tmp/camera_image")
	if os.path.exists("/tmp/camera_1m") is True:
		os.remove("/tmp/camera_1m")
	to_node("status", 'Shutdown: Done.')
	exit()

signal.signal(signal.SIGINT, shutdown)

p = Popen('./realsense_cplusplus/build/camera_publisher',shell=True)

p.wait()

while(True):
	time.sleep(10)
	print ("test")
