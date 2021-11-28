import time
import hashlib
from flask import Flask, flash, json, request, redirect, url_for, session, jsonify
from werkzeug.utils import secure_filename
import pyrebase
import random
import webbrowser
random.seed(5)

# import {initializeApp} from "firebase/app"
annotation_no = 1

def hash(s):
	return int(hashlib.md5(s.encode()).hexdigest(), 16)

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
    collection = db.collection('videos') 
    global video_no
    # target=os.path.join(UPLOAD_FOLDER,'test_docs')
    # if not os.path.isdir(target):
    #     os.mkdir(target)
    # logger.info("welcome to upload`")
    file = request.files['file'] 
    fname = request.form['filename']
    print(fname)
    name = request.form['name']
    id = request.form['id']
    print(name)
    video_no = random.randint(1,1000)
    filename = "video_" + str(video_no)
    storage.child("videos/" + filename + fname).put(file)
    link = storage.child("videos/" + filename + fname).get_url(None)
    # teacher = request.teacher
    res = collection.document(str(hash(link))).set({
        'url': link,
        'id' : id,
        'name' : name,
        'title' : fname,
        'comments' : []
    })
    
    collection = db.collection('teacher_queries')
    doc = collection.document(id).get()
    if(not(doc.exists)):
        collection.document(id).set({
            'queries' : []
        })   
    return ""    


@app.route('/comment', methods = ['POST'])
def addComment():
    comment = request.form['comment']
    url = request.form['url']
    time = request.form['timestamp']
    print("time" , time)

    collection = db.collection('annotations') 
    h = hash(comment+url+time)
    collection.document(str(h)).set({
        'comment' : comment,
        'answers' : [],
        'time' : time
    })

    print(hash(url))
    collection = db.collection('videos')
    doc = collection.document(str(hash(url)))
    record = doc.get().to_dict()
    res = record['comments']
    res.append(str(h))
    doc.update({
        'comments' : res
    })

    teacher = record['id']
    doc = db.collection('teacher_queries').document(teacher)
    record = doc.get().to_dict()
    res = record['queries']
    res.append(str(h))
    doc.update({
        'queries' : res
    })    
    return "success"


@app.route('/answer', methods = ['POST','GET'])
def addAnswer():
    print(request.form)
    comment = request.form['comment']
    url = request.form['url']
    ans = request.form['answer']

    collection = db.collection('annotations') 
    # h = str(hash(comment))
    h = comment
    print(h)
    res = collection.document(h).get().to_dict()
    arr = res['answers']
    arr.append(ans)
    res = collection.document(h).update({
        'answers' : arr
    })

    collection = db.collection('videos')
    doc = collection.document(str(hash(url))).get()
    record = doc.to_dict()
    teacher = record['id']
    collection = db.collection('teacher_queries') 
    res = collection.document(teacher).get().to_dict()
    arr = res['queries']
    print(arr, h)
    arr.remove(h)
    res = collection.document(teacher).update({
        'queries' : arr
    })
    d = dict()
    d['id'] = teacher
    response = jsonify(d)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print(d)
    return response


# @app.route('/remove', methods = ['POST','GET'])
# def removeComment():
#     request_data = request.get_json()
#     url = request_data['url']
#     comment = request_data['comment']
#     # comment = request.get()
#     # url = get_url()
#     collection = db.collection('teacher_queries') 
#     h = hash(comment)
#     teacher = db.collection('videos').document(hash(url)).get('id')
#     res = collection.document(teacher).get('queries')
#     res.remove(h)
#     res = collection.document(h).update({
#         'queries' : res
#     })  

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
            if(doc.to_dict()):
                temp = dict()
                temp['url'] = doc.get('url')
                temp['title'] = doc.get('title')
                temp['name'] = doc.get('name')
                res.append(temp)
            d = dict()
        d['urls'] = res
        response = jsonify(d)
        response.headers.add('Access-Control-Allow-Origin', '*')
        print(d)
        return response

# get all annotations for a video
@app.route('/retrieveAnnotations', methods = ['POST','GET'])
def retrieveAnnotations():
    with app.app_context():
        url = request.form['url']
        print("url : ", url)
        print(hash(url))
        docs = db.collection('videos').document(str(hash(url))).get()
        print("doc : " , docs.to_dict())
        an = db.collection('annotations')
        record = docs.to_dict()
        queries = record['comments']
        res = []
        for i in queries:
            if(i):
                res.append(an.document(i).get().to_dict())
        d = dict()
        d['comments'] = res
        response = jsonify(d)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

# get all annotations for a video
@app.route('/retrieveTeacherAnnotations', methods = ['POST','GET'])
def retrieveTeacherAnnotations():
    with app.app_context():
        url = request.form['url']
        print("url : ", url)
        print(hash(url))
        docs = db.collection('videos').document(str(hash(url))).get()
        id = docs.to_dict()['id']
        an = db.collection('annotations')
        te = db.collection('teacher_queries')
        # record = docs.to_dict()
        # queries = record['comments']
        res = []
        for i in te.document(id).to_dict()['queries']:
            res.append(an.document(i).get().to_dict())
        d = dict()
        d['comments'] = res
        response = jsonify(d)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
# @app.route('/retrieveTeacher', methods = ['POST','GET'])
# def retrieveTeacher():
#     with app.app_context():
#         id = request.form['id']
#         docs = db.collection('videos').where('id', '==', id).stream() 
#         print(docs)
#         res = []
#         queries = []
#         for doc in docs:
#             res.append(doc.get('url'))
            
#         d = dict()
#         d['urls'] = res

#         # collection = db.collection()
#         # for i in d['urls']:

#         # url = request.form['url']
#         # print("url : ", url)
#         # print(hash(url))
#         # docs = db.collection('videos').document(str(hash(url))).get()
#         # id = docs.to_dict()['id']
#         an = db.collection('annotations')
#         te = db.collection('teacher_queries')
#         # record = docs.to_dict()
#         # queries = record['comments']
#         res = []
#         for i in te.document(id).get().to_dict()['queries']:
#             if(i):
#                 res.append(an.document(i).get().to_dict())
#         d['comments'] = res
#         response = jsonify(d)
#         response.headers.add('Access-Control-Allow-Origin', '*')
#         return response

@app.route('/retrieveTeacher', methods = ['POST','GET'])
def retrieveTeacher():
    with app.app_context():
        id = request.form['id']
        te = db.collection('teacher_queries')
        l = []
        doc = te.document(id).get().to_dict()
        if(doc):
            for i in doc['queries']:
                if(i):
                    l.append(i)

        docs = db.collection('videos').where('id', '==', id).stream() 
        an = db.collection('annotations')
        res = []
        res2 = []
        for doc in docs:
            temp = dict()
            temp['url'] = doc.get('url')
            temp['title'] = doc.get('title')
            temp['name'] = doc.get('name')
            res.append(temp)
            for c in doc.get('comments'):
                if(c and (c in l)):
                    temp = an.document(c).get().to_dict()
                    temp['url'] = doc.get('url')
                    temp['name'] = doc.get('name')
                    temp['title'] = doc.get('title')
                    temp['comment_id'] = c
                    res2.append(temp)
        d = dict()
        d['urls'] = res
        d['comments'] = res2
        response = jsonify(d)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    
if __name__ == "__main__":
    app.run()

