import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:flutter/services.dart'; // Importe esta linha para usar o método canLaunch

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String path(String str) {
    return (kIsWeb) ? 'web/assets/$str' : str;
  }

  // Variável para controlar se o pop-up já foi mostrado
  static bool _popupShown = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!_popupShown) {
        _mostrarPopupLogin();
        _popupShown = true;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
              child: Image(
                image: AssetImage(path("logo-4.jpeg")), 
                width: MediaQuery.of(context).size.height * 0.4,
              ),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.all(Radius.circular(12.0)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    spreadRadius: 5,
                    blurRadius: 7,
                    offset: Offset(0, 3),
                  ),
                ],
              ),
              clipBehavior: Clip.antiAlias,
            ),
            SizedBox(height: 36),
            _buildButton(context, '/login', 'Login'),
            SizedBox(height: 20),
            _buildButton(context, '/register', 'Registre sua senha'),
            SizedBox(height: 20),
            _buildButton(context, '/configurations', 'Acessibilidade'),
            SizedBox(height: 20),
            _buildButton(context, null, 'Política de Privacidade', showPrivacyPolicy: true),
          ],
        ),
      ),
    );
  }

  Widget _buildButton(BuildContext context, String? route, String text, {bool showPrivacyPolicy = false}) {
    return SizedBox(
      width: MediaQuery.of(context).size.width > MediaQuery.of(context).size.height ? MediaQuery.of(context).size.width * 0.2 : MediaQuery.of(context).size.width * 0.65,
      height: 60,
      child: ElevatedButton(
        onPressed: () {
          if (showPrivacyPolicy) {
            _mostrarPoliticaPrivacidade();
          } else if (route != null) {
            Navigator.pushNamed(context, route);
          }
        },
        style: ButtonStyle(
          backgroundColor: MaterialStateProperty.all<Color>(Colors.white),
          side: MaterialStateProperty.all<BorderSide>(BorderSide(color: Colors.blue, width: 2)),
        ),
        child: Text(text, style: TextStyle(color: Colors.black)),
      ),
    );
  }

  void _mostrarPopupLogin() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text("Login e Senha"),
          content: Column(
            children: [
              Text("Bem-vindo ao App Demonstração da EduVision Brazil"),
              Text("É um prazer te-lo conosco!"),
              SizedBox(height: 8),
              Text("Para acessar o app, utilize as seguintes credenciais:"),
              SizedBox(height: 8),
              Text("Estudante ou Responsável:"),
              Text("RA: 11283"),
              Text("Senha: 123"),
              SizedBox(height: 8),
              Text("Colaborador:"),
              Text("RA: dev"),
              Text("Senha: 123"),
            ],
          ),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text('Fechar'),
            ),
          ],
        );
      },
    );
  }

  void _mostrarPoliticaPrivacidade() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Política de Privacidade'),
          content: SingleChildScrollView(
            child: Text(
              'Esta política de privacidade descreve como as informações pessoais são coletadas, usadas e compartilhadas quando você usa o nosso aplicativo.',
            ),
          ),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('Fechar'),
            ),
            TextButton(
              onPressed: _abrirPoliticaPrivacidadeCompleta,
              child: Text('Ver Mais'),
            ),
          ],
        );
      },
    );
  }

  void _abrirPoliticaPrivacidadeCompleta() async {
    const url = 'https://eduvision.app/politicadeprivacidade';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Não foi possível abrir $url';
    }
  }
}