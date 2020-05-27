import 'package:flutter/material.dart';
import 'package:todowebapp/helper_functions/helper_finctions.dart';
import 'package:todowebapp/services/database.dart';
import 'package:todowebapp/widgets/widget.dart';

class Home extends StatefulWidget {
  final String username;
  final String userEmail;
  Home({this.username, this.userEmail});

  @override
  _HomeState createState() => _HomeState();
}

String uid = "9gEiKx0zToe4DQOvG7mOIdPmuWH2";

Stream taskStream;

DatabaseServices databaseServices = new DatabaseServices();

class _HomeState extends State<Home> {
  String date;
  TextEditingController taskEditingController = new TextEditingController();

  @override
  void initState() {
    var now = DateTime.now();
    date =
        "${HelperFunctions.getWeekDay(now.weekday)} ${HelperFunctions.getMonth(now.month)} ${now.day}";

    databaseServices.getTasks(uid).then((val) {
      taskStream = val;
      setState(() {});
    });
    super.initState();
  }

  Widget taskList() {
    return StreamBuilder(
      stream: taskStream,
      builder: (context, snapshot) {
        return snapshot.hasData
            ? ListView.builder(
                padding: EdgeInsets.only(top: 16),
                itemCount: snapshot.data.documents.length,
                shrinkWrap: true,
                itemBuilder: (context, index) {
                  return TaskTile(
                    snapshot.data.documents[index].data["isCompleted"],
                    snapshot.data.documents[index].data["task"],
                    snapshot.data.documents[index].documentID,
                  );
                })
            : Container();
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: Widgets().mainAppBar(),
      body: Container(
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 24, vertical: 32),
          width: 600,
          child: Container(
            child: Column(
              children: [
                Text(
                  "My Day",
                  style: TextStyle(fontSize: 18),
                ),
                Text("$date"),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: taskEditingController,
                        decoration: InputDecoration(
                          hintText: "task",
                        ),
                        onChanged: (val) {
                          setState(() {});
                        },
                      ),
                    ),
                    SizedBox(width: 16),
                    taskEditingController.text.isNotEmpty
                        ? GestureDetector(
                            onTap: () {
                              Map<String, dynamic> taskMap = {
                                "task": taskEditingController.text,
                                "isCompleted": false
                              };
                              databaseServices.createTask(uid, taskMap);
                              taskEditingController.text = '';
                            },
                            child: Text("ADD"))
                        : Container()
                  ],
                ),
                taskList()
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class TaskTile extends StatefulWidget {
  final bool isCompleted;
  final String task;
  final String documentId;
  TaskTile(this.isCompleted, this.task, this.documentId);

  @override
  _TaskTileState createState() => _TaskTileState();
}

class _TaskTileState extends State<TaskTile> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(bottom: 16),
      child: Row(
        children: [
          GestureDetector(
            onTap: () {
              Map<String, dynamic> taskMap = {
                "isCompleted": !widget.isCompleted
              };

              DatabaseServices().updateTask(uid, taskMap, widget.documentId);
            },
            child: Container(
              width: 24,
              height: 24,
              decoration: BoxDecoration(
                  border: Border.all(color: Colors.black87, width: 1),
                  borderRadius: BorderRadius.circular(30)),
              child: widget.isCompleted
                  ? Icon(
                      Icons.check,
                      color: Colors.green,
                    )
                  : Container(),
            ),
          ),
          SizedBox(
            width: 8,
          ),
          Text(
            widget.task,
            style: TextStyle(
                color: widget.isCompleted
                    ? Colors.black87
                    : Colors.black87.withOpacity(0.7),
                fontSize: 17,
                decoration: widget.isCompleted
                    ? TextDecoration.lineThrough
                    : TextDecoration.none),
          ),
          Spacer(),
          GestureDetector(
            onTap: () {
              DatabaseServices().deleteTask(uid, widget.documentId);
            },
            child: Icon(Icons.close,
                size: 13, color: Colors.black87.withOpacity(0.7)),
          )
        ],
      ),
    );
  }
}
