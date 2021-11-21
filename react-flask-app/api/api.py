import time
from flask import Flask, flash, json, request, redirect, url_for, session, jsonify
from werkzeug.utils import secure_filename
import pyrebase
import webbrowser

# import {initializeApp} from "firebase/app"
video_no = 1
annotation_no = 1

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
#collection = db.collection('videos')  # opens 'places' collection
#doc = collection.document('rome')  # specifies the 'rome' document
# upload video
app = pyrebase.initialize_app(firebaseConfig)
storage = app.storage()
# #storage.child("videos/hi.jpg").put(None)
# link = storage.child("videos/Akhila.mp4").get_url(None)
# print(link)
# webbrowser.open(link)

# res = collection.document('video_' + str(video_no)).set({
#     'url': link
# })
# c = db.collection('videos')
# docs = c.get()
# print(docs)
# print(res)





app = Flask(__name__)
#@app.route('/time')
#def get_current_time():
 #   print("hello")
  #  return {'time': time.time()}

# def test():
#     with app.app_context():
#         docs = db.collection('videos').stream() 
#         res = []
#         for doc in docs:
#             res.append(doc.get('url'))
#         d = dict()
#         d['urls'] = res
#         return (jsonify(d))
# print(test())

@app.route('/upload', methods=['POST','GET'])
def fileUpload():
    print(request.args)
    d = get_dict(request.args)
    collection = db.collection('videos') 
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
    # teacher = request.teacher
    res = collection.document(filename).set({
        'url': link,
        'id' : d['id']
    })
    print(file)
    # destination="/".join([target, filename])
    # file.save(destination)
    # session['uploadFilePath']=destination
    response="Whatever you wish too return"
    return response

@app.route('/comment', methods = ['POST'])
def addComment():
    request_data = request.get_json()
    comment = request_data['comment']
    url = request_data['url']
    time = request_data['timestamp']
    student = request_data['student']
    # comment = request.get()
    # url = get_url()
    collection = db.collection('annotations') 
    res = collection.document(url).set({
        'comment' : comment,
        'student' : student,
        'answers' : [],
        'time' : time
    })

def get_dict(multi_dict):
    req_dic = {}
    for key, value in multi_dict.items():
        
        # checking for any nested dictionary
        l = key.split(".")
        
        # if nested dictionary is present
        if len(l) > 1:  
            i = l[0]
            j = l[1]
            if req_dic.get(i) is None:
                req_dic[i] = {}
                req_dic[i][j] = []
                req_dic[i][j].append(value)
            else:
                if req_dic[i].get(j) is None:
                    req_dic[i][j] = []
                    req_dic[i][j].append(value)
                else:
                    req_dic[i][j].append(value)
    
        else:  # if single dictonary is there
            if req_dic.get(l[0]) is None:
                req_dic[l[0]] = value
            else:
                req_dic[l[0]] = value
    return req_dic

# get all videos
@app.route('/retrieve', methods = ['POST','GET'])
def retrieve():
    with app.app_context():
        print("working")

        #print(d)
        docs = db.collection('videos').stream() 
        res = []
        for doc in docs:
            res.append(doc.get('url'))
        d = dict()
        d['urls'] = res
        response = jsonify(d)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    
if __name__ == "__main__":
    app.run()

