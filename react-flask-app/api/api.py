import time
from flask import Flask, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
import pyrebase
import webbrowser

# import {initializeApp} from "firebase/app"
video_no = 1

firebaseConfig = {
  "apiKey": "AIzaSyDB4buUQAb2XsoJPvLAy7ehSuFZb8DEUwo",
  "authDomain": "video-annotator-5f64c.firebaseapp.com",
  "projectId": "video-annotator-5f64c",
  "databaseURL": "https://video-annotator-5f64c-default-rtdb.asia-southeast1.firebasedatabase.app",
  "storageBucket": "video-annotator-5f64c.appspot.com",
  "messagingSenderId": "219474015998",
  "appId": "1:219474015998:web:315ce53d3df5c6b4e757af"
}

# authenticate firestore
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# connect to firestore
db = firestore.client()  # this connects to our Firestore database
collection = db.collection('videos')  # opens 'places' collection
#doc = collection.document('rome')  # specifies the 'rome' document

# upload video
app = pyrebase.initialize_app(firebaseConfig)
storage = app.storage()
#storage.child("videos/hi.jpg").put(None)
link = storage.child("videos/Akhila.mp4").get_url(None)
print(link)
webbrowser.open(link)

res = collection.document('video_' + str(video_no)).set({
    'url': link
})
c = db.collection('videos')
docs = c.get()
print(docs)
print(res)





app = Flask(__name__)
#@app.route('/time')
#def get_current_time():
 #   print("hello")
  #  return {'time': time.time()}

@app.route('/upload', methods=['POST'])
def fileUpload():
    global video_no
    # target=os.path.join(UPLOAD_FOLDER,'test_docs')
    # if not os.path.isdir(target):
    #     os.mkdir(target)
    # logger.info("welcome to upload`")
    file = request.files['file'] 
    filename = "video_" + str(video_no)
    video_no += 1 
    storage.child("videos/" + filename).put(file)
    link = storage.child("videos/" + filename).get_url(None)
    res = collection.document(filename).set({
        'url': link
    })
    print(file)
    # destination="/".join([target, filename])
    # file.save(destination)
    # session['uploadFilePath']=destination
    response="Whatever you wish too return"
    return response
    print("hello")
if __name__ == "__main__":
    app.run()

