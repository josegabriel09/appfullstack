import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dashboard_screen.dart';
import 'package:eduvision_client/services/user_API_service.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  String? selectedOption;
  UserAPIService apiService = UserAPIService();
  TextEditingController _raController = TextEditingController();
  TextEditingController _passwordController = TextEditingController();
  bool _obscureText = true;
  bool _rememberMe = false;

  @override
  void initState() {
    super.initState();
    _loadUserPreferences();
  }

  Future<void> _loadUserPreferences() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    bool rememberMe = prefs.getBool('rememberMe') ?? false;
    String ra = prefs.getString('ra') ?? '';
    String password = prefs.getString('password') ?? '';

    setState(() {
      _rememberMe = rememberMe;
      if (rememberMe) {
        _raController.text = ra;
        _passwordController.text = password;
      }
    });
  }

  Future<void> _updateUserPreferences() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setBool('rememberMe', _rememberMe);
    if (_rememberMe) {
      prefs.setString('ra', _raController.text);
      prefs.setString('password', _passwordController.text);
    } else {
      prefs.remove('ra');
      prefs.remove('password');
    }
  }

@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: Text('Login'),
      backgroundColor: Colors.blue,
    ),
    body: Container(
      decoration: BoxDecoration(
        image: DecorationImage(
          image: AssetImage('-'),
          fit: BoxFit.cover,
          colorFilter: ColorFilter.mode(
            Colors.white.withOpacity(0.1), // Ajuste a transparência aqui para torná-lo quase imperceptível
            BlendMode.dstATop,
          ),
        ),
      ),
      child: Center(
        child: SingleChildScrollView(
          padding: EdgeInsets.all(20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(height: 20),
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
                      value: 'student',
                      groupValue: selectedOption,
                      onChanged: (value) {
                        setState(() {
                          selectedOption = value;
                        });
                      },
                      activeColor: Colors.blue,
                      secondary: Icon(Icons.school, color: Colors.blue),
                    ),
                    Divider(),
                    RadioListTile(
                      title: Text('Sou Colaborador'),
                      value: 'collaborator',
                      groupValue: selectedOption,
                      onChanged: (value) {
                        setState(() {
                          selectedOption = value;
                        });
                      },
                      activeColor: Colors.blue,
                      secondary: Icon(Icons.work, color: Colors.blue),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 20),
              TextFormField(
                controller: _raController,
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
              TextFormField(
                controller: _passwordController,
                obscureText: _obscureText,
                decoration: InputDecoration(
                  labelText: 'Senha',
                  prefixIcon: Icon(Icons.lock_outline, color: Colors.blue),
                  filled: true,
                  fillColor: Colors.blue.shade50,
                  suffixIcon: IconButton(
                    icon: Icon(_obscureText ? Icons.visibility_off : Icons.visibility, color: Colors.blue),
                    onPressed: () => setState(() => _obscureText = !_obscureText),
                  ),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30.0),
                    borderSide: BorderSide.none,
                  ),
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Checkbox(
                    value: _rememberMe,
                    onChanged: (bool? value) {
                      setState(() {
                        _rememberMe = value!;
                      });
                    },
                    activeColor: Colors.blue,
                  ),
                  Text('Lembrar de Mim'),
                ],
              ),
              SizedBox(height: 30),
              ElevatedButton(
                onPressed: () async {
                  await _updateUserPreferences();
                  String id = _raController.text;
                  String password = _passwordController.text;
                  String role = selectedOption ?? '';

                  // Call the sign-in method from the API service
                  await apiService.signIn(id: id, password: password, role: role);

                  // Save selected role to SharedPreferences
                  SharedPreferences prefs = await SharedPreferences.getInstance();
                  await prefs.setString('isStudent', selectedOption ?? '');
                  print('User preference saved');

                  // Navigate to DashboardScreen
                  String? token = prefs.getString('token');
                  var userProfile = await apiService.fetchUserProfile(token!);
                  print(userProfile?.id);

                  if (prefs.getString("isStudent") == "student" && prefs.getString("token") != '') {
                    prefs.setString('rastud', userProfile!.id);
                    print(userProfile.idClass);
                    prefs.setInt('idClass', userProfile.idClass!);
                    print(prefs.getInt('idClass'));

                    print(prefs.getString('rastud'));
                    _raController.text = "";
                    _passwordController.text = "";
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => DashboardScreen(fullName: userProfile.name, studentClass: userProfile.idClass.toString())),
                    );
                  } else if (prefs.getString("isStudent") == "collaborator" && prefs.getString("token") != '') {
                    _raController.text = "";
                    _passwordController.text = "";
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => DashboardScreen(fullName: userProfile!.name, occupation: userProfile.occupation)),
                    );
                  } else {
                    // Token does not exist, handle accordingly
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: Text('Falha no Login'),
                          content: Text('Usuário, senha ou opção escolhida estão errados ou não existem.'),
                          actions: <Widget>[
                            TextButton(
                              onPressed: () {
                                Navigator.of(context).pop(); // Close the dialog
                              },
                              child: Text('Close'),
                            ),
                          ],
                        );
                    });
                    print('Token not found in SharedPreferences');
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  padding: EdgeInsets.symmetric(horizontal: 50),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30.0),
                  ),
                ),
                child: Text('Entrar', style: TextStyle(fontSize: 16, color: Colors.white)),
              ),
            ],
          ),
        ),
      ),
    )
  );
  }
}