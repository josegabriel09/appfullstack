import 'package:eduvision_client/components/theme_provider.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:provider/provider.dart';

class ConfigurationScreen extends StatefulWidget {
  final ValueNotifier<ThemeData> themeNotifier;
  ConfigurationScreen({required this.themeNotifier});

  @override
  _ConfigurationScreenState createState() => _ConfigurationScreenState();
}

class _ConfigurationScreenState extends State<ConfigurationScreen> {
  double _fontSize = 16.0; // Initial font size
  late bool isSwitched;

  @override
  void initState() {
    super.initState();
    _loadFontSize();
    _loadIsSwitched();
    isSwitched = false;
  }

  void _loadFontSize() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _fontSize = prefs.getDouble('fontSize') ?? 16.0;
    });
  }

  void _saveFontSize(double fontSize) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setDouble('fontSize', fontSize);

    ThemeData currentTheme = widget.themeNotifier.value;

    ThemeData newTheme = currentTheme.copyWith(
      textTheme: currentTheme.textTheme.copyWith(
        bodySmall: currentTheme.textTheme.bodySmall?.copyWith(fontSize: fontSize),
        bodyMedium: currentTheme.textTheme.bodySmall?.copyWith(fontSize: fontSize),
        bodyLarge: currentTheme.textTheme.bodySmall?.copyWith(fontSize: fontSize),
        headlineSmall: currentTheme.textTheme.headlineSmall?.copyWith(fontSize: fontSize),
        headlineMedium: currentTheme.textTheme.headlineMedium?.copyWith(fontSize: fontSize),
        labelLarge: currentTheme.textTheme.labelLarge?.copyWith(fontSize: fontSize),
        labelMedium: currentTheme.textTheme.labelMedium?.copyWith(fontSize: fontSize),
        labelSmall: currentTheme.textTheme.labelSmall?.copyWith(fontSize: fontSize),
        titleLarge: currentTheme.textTheme.titleLarge?.copyWith(fontSize: fontSize),
        titleMedium: currentTheme.textTheme.titleMedium?.copyWith(fontSize: fontSize),
        titleSmall: currentTheme.textTheme.titleSmall?.copyWith(fontSize: fontSize),
        displayLarge: currentTheme.textTheme.displayLarge?.copyWith(fontSize: fontSize),
        displayMedium: currentTheme.textTheme.displayMedium?.copyWith(fontSize: fontSize),
        displaySmall: currentTheme.textTheme.displaySmall?.copyWith(fontSize: fontSize),
        headlineLarge: currentTheme.textTheme.headlineLarge?.copyWith(fontSize: fontSize),
      ),
    );

    widget.themeNotifier.value = newTheme;
  }

  void saveColorScheme(bool isSwitched, ColorScheme scheme) async {
    ThemeData currentTheme = widget.themeNotifier.value;
    ThemeData newTheme = ThemeData(
      useMaterial3: currentTheme.useMaterial3,
      colorScheme: scheme,
      textTheme: currentTheme.textTheme.copyWith(
        bodySmall: currentTheme.textTheme.bodySmall?.copyWith(color: scheme.onBackground),
        bodyLarge: currentTheme.textTheme.bodyLarge?.copyWith(color: scheme.onBackground),
        bodyMedium: currentTheme.textTheme.bodyMedium?.copyWith(color: scheme.onBackground),
      ),
    );

    widget.themeNotifier.value = newTheme;

    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setBool("isSwitched", isSwitched);

    // Show SnackBar when dark mode is turned on
    if(isSwitched) {
      final snackBar = SnackBar(
        content: Text('O Modo Escuro está em manutenção, ele não está usável no momento.'),
        duration: Duration(seconds: 5),
      );
      ScaffoldMessenger.of(context).showSnackBar(snackBar);
    }
  }

  void _loadIsSwitched() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      isSwitched = prefs.getBool('isSwitched') ?? false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Configurações')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              height: 100,
              child: Text(
                'Arraste Para Aumentar Ou Diminuir O Tamanho Da Fonte',
                style: TextStyle(fontSize: _fontSize),
              ),
            ),
            SizedBox(height: 20),
            Slider(
              value: _fontSize,
              min: 10.0,
              max: 30.0,
              onChanged: (value) {
                setState(() {
                  _fontSize = value;
                });
              },
              onChangeEnd: _saveFontSize,
            ),
            Padding(
              padding: EdgeInsets.all(4.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text("Alto Contraste E Modo Escuro"),
                  SizedBox(width: 20),
                  Switch(
                    value: isSwitched,
                    onChanged: (value) {
                      setState(() {
                        isSwitched = value;
                        saveColorScheme(isSwitched, isSwitched
                          ? ColorScheme.highContrastDark(primary: Colors.blue)
                          : ColorScheme.fromSeed(seedColor: Colors.blue));
                      });
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}