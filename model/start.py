import subprocess

# Start app1.py in the background
subprocess.Popen(["python", "app1.py"])

# Start app2.py in the background
subprocess.Popen(["python", "app2.py"])

# Keep the script running
while True:
    pass
