import 'package:flutter/material.dart';
import 'package:todowebapp/services/auth.dart';
import 'package:todowebapp/widgets/widget.dart';

class SignIn extends StatefulWidget {
  SignIn({Key key}) : super(key: key);

  @override
  _SignInState createState() => _SignInState();
}

class _SignInState extends State<SignIn> {
  AuthService authService = new AuthService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: Widgets().mainAppBar(),
      body: Container(
        alignment: Alignment.center,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Image.asset("assets/images/todos.png", height: 250),
            SizedBox(height: 8),
            Text(
              "ToDo App For Awesome People",
              style: TextStyle(fontSize: 17),
            ),
            SizedBox(height: 16),
            GestureDetector(
              onTap: () {
                authService.signInWithGoogle(context);
              },
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                    color: Color(0xffFF5964),
                    borderRadius: BorderRadius.circular(30)),
                child: Text(
                  "Sign in with Google",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
