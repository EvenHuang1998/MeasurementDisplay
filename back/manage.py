
# from socket import socket
from flask import Flask
from flask_socketio import SocketIO
import random
from time import sleep
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, cors_allowed_origins="*")
socketio = SocketIO(app, cors_allowed_origins='*')
# , cors_allowed_origins='*')
# socketio=SocketIO(app)
thread_flowsize=None
thread_flowcount=None
thread_flowcoord=None
thread_test=None
chart_name=[]

def process():
    data=[]
    for _ in range(7):
        data.append(round(random.random(),2))
    return data

def test_sleep():
    sleep(10)
    socketio.emit("compileDone")
    print("test sleep done")

def get_rank():
    data=[]
    for i in range(16):
        data.append({
            "count":round(random.random(),2),
            "flow":"src:xxx     dest:xxx    {0}".format(i)
        })
    # data.sort(reverse=True)
    return data

def update_flow_size():
    while True:
        socketio.sleep(1)
        result = process()
        socketio.emit('updateFlowSize', {'flow_size': result})

def update_flow_count():
    while True:
        socketio.sleep(1)
        result=process()
        socketio.emit('updateFlowCount',{'flow_count':result})

def update_flow_coord():
    while True:
        socketio.sleep(1)
        result=get_rank()
        socketio.emit('updateFlowCoord',{'rank':result})

def display():
    while True:
        socketio.sleep(1)
        result=process()
        # print("update chart data")
        socketio.emit('updateChartData',
                      [
                          [1, 2, 3],
                          [4, 5, 6],
                          [
                              {
                                  "count": 12,
                                  "flow": "srcip: dstip:"
                              },
                              {
                                  "count": 19,
                                  "flow": "srcip: dstip:"
                              }
                          ]
                      ])

@socketio.on('connect')
def handle_message():
    print("连接成功！！！")

@socketio.on('disconnect', namespace='/chat')
def test_disconnect():
    print('Client disconnected')
    

@socketio.on('flowsize')
def measure_flow_size():
    print("服务器端 flowsize")
    global thread_flowsize
    if thread_flowsize is None:
        thread_flowsize = socketio.start_background_task(target=update_flow_size)

@socketio.on('flowcount')
def measure_flow_count():
    print("服务器端 flowcount")
    global thread_flowcount
    if thread_flowcount is None:
        thread_flowcount=socketio.start_background_task(target=update_flow_count)

@socketio.on('flowcoord')
def measure_flow_coord():
    print("服务器端 flowcoord")
    global thread_flowcoord
    if not thread_flowcoord:
        thread_flowcoord=socketio.start_background_task(target=update_flow_coord)

@socketio.on('command')
def process_command(val):
    global chart_name
    chart_name=[]   #清空之前提交的chartname
    random_name="chart"+str(random.randint(1,10))
    chart_name.append(random_name)   #保存此次提交需要绘制的chartname
    with open("./test.txt","w") as f:
        for line in val:
            f.write(line)
    socketio.start_background_task(test_sleep)
    print("process command完成")


@socketio.on("pre-set")
def process_preset(val):
    print(val)
    print("process select")
    
    socketio.emit('updatePrimitive', "backend data")

@socketio.on("run_switch")
def process_run_switch():
    # socketio.emit('updateChartName',[['chart1','chart2','chart3','char4'],
    #                                  ['c9','c0'],
    #                                  True])
    socketio.emit('updateChartName', [['chart1', 'chart2', 'chart3', 'char4'],
                                      ['c2','c9'],
                                      True])


@socketio.on('display')
def measure_flow_coord():
    print("服务器端 display")
    global thread_flowcoord
    if not thread_flowcoord:
        thread_flowcoord=socketio.start_background_task(target=display)

if __name__ == '__main__':
    socketio.run(app, debug=True, host="127.0.0.1", port=10020)
