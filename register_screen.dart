import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dashboard_screen.dart';
import 'package:eduvision_client/services/user_API_service.dart';

class RegisterPasswordScreen extends StatefulWidget {
  @override
  _RegisterPasswordScreenState createState() => _RegisterPasswordScreenState();
}

class _RegisterPasswordScreenState extends State<RegisterPasswordScreen> {
  String? selectedOption;
  final TextEditingController _RAController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _passwordConfirmationController = TextEditingController();
  bool _obscureText = true;
  bool _obscureConfirmationText = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Registrar Senha'),
        backgroundColor: Colors.blue,
      ),
      body: Padding(
        padding: EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Selecione Seu Perfil', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.blue)),
            SizedBox(height: 20),
            Container(
              decoration: BoxDecoration(
                color: Colors.blue.shade50,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                children: [
                  RadioListTile(
                    title: Text('Sou Estudante ou Responsável'),
                    value: 'true',
                    groupValue: selectedOption,
                    onChanged: (value) {
                      setState(() {
                        selectedOption = value.toString();
                      });
                    },
                    activeColor: Colors.blue,
                    secondary: Icon(Icons.school, color: Colors.blue),
                  ),
                  Divider(),
                  RadioListTile(
                    title: Text('Sou Colaborador'),
                    value: 'false',
                    groupValue: selectedOption,
                    onChanged: (value) {
                      setState(() {
                        selectedOption = value.toString();
                      });
                    },
                    activeColor: Colors.blue,
                    secondary: Icon(Icons.work, color: Colors.blue),
                  ),
                ],
              ),
            ),
            SizedBox(height: 20),
            TextField(
              controller: _RAController,
              decoration: InputDecoration(
                labelText: 'RA',
                prefixIcon: Icon(Icons.account_circle, color: Colors.blue),
                filled: true,
                fillColor: Colors.blue.shade50,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(30.0),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
            SizedBox(height: 20),
            TextField(
              controller: _passwordController,
              obscureText: _obscureText,
              decoration: InputDecoration(
                labelText: 'Senha',
                prefixIcon: Icon(Icons.lock_outline, color: Colors.blue),
                filled: true,
                fillColor: Colors.blue.shade50,
                suffixIcon: IconButton(
                  icon: Icon(_obscureText ? Icons.visibility_off : Icons.visibility, color: Colors.blue),
                  onPressed: () {
                    setState(() {
                      _obscureText = !_obscureText;
                    });
                  },
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(30.0),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
            SizedBox(height: 20),
            TextField(
              controller: _passwordConfirmationController,
              obscureText: _obscureConfirmationText,
              decoration: InputDecoration(
                labelText: 'Confirmação de senha',
                prefixIcon: Icon(Icons.lock_outline, color: Colors.blue),
                filled: true,
                fillColor: Colors.blue.shade50,
                suffixIcon: IconButton(
                  icon: Icon(_obscureConfirmationText ? Icons.visibility_off : Icons.visibility, color: Colors.blue),
                  onPressed: () {
                    setState(() {
                      _obscureConfirmationText = !_obscureConfirmationText;
                    });
                  },
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(30.0),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
            SizedBox(height: 40),
            ElevatedButton(
              onPressed: () async {
                String id = _RAController.text;
                String password = _passwordController.text;
                String confirmationPassword = _passwordConfirmationController.text;
                String message = await UserAPIService().editPassword(id: id, password: password, confirmationPassword: confirmationPassword, isStudent: selectedOption ?? '');
              
                showDialog(
                  context: context,
                  builder: (BuildContext context) {
                    return AlertDialog(
                      title: Text('Resultado'),
                      content: Text(message),
                      actions: <Widget>[
                        TextButton(
                          onPressed: () {
                            Navigator.pop(context);
                          },
                          child: Text('OK'),
                        ),
                      ],
                    );
                  },
                );
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blue,
                padding: EdgeInsets.symmetric(horizontal: 50, vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30.0),
                ),
              ),
              child: Text('Confirmar alterações', style: TextStyle(color: Colors.white, fontSize: 16)),
            ),
          ],
        ),
      ),
    );
  }
}