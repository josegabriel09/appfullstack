import 'package:eduvision_client/model/classes_structure.dart';
import 'package:eduvision_client/services/classes_api_service.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:eduvision_client/model/dashboard_options.dart';
import 'package:eduvision_client/services/navigation_service.dart'; // Import the NavigatorService
import 'package:eduvision_client/screens/feed_screen.dart';

class DashboardScreen extends StatelessWidget {
  final String? fullName;
  final String? studentClass;
  final String? occupation;

  DashboardScreen({required this.fullName, this.studentClass, this.occupation});

@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: PreferredSize(
      preferredSize: Size.fromHeight(130), // Ajuste a altura conforme necessário
      child: AppBar(
        backgroundColor: Colors.blue[800], // Cor do AppBar para um azul escuro
        title: Text(
          'Início',
          style: TextStyle(color: Colors.white, fontSize: 20),
        ),
        centerTitle: true,  // Título centralizado
        flexibleSpace: FutureBuilder<String>(
          future: getClassName(studentClass),
          builder: (context, snapshot) {
            if (snapshot.hasError) {
              return Center(
                child: Text(
                  'Erro: ${snapshot.error}',
                  style: TextStyle(color: Colors.white, fontSize: 14),
                ),
              );
            } else {
              return Container(
                color: Colors.blue[600], // Cor do container para um azul médio
                alignment: Alignment.center, // Conteúdo centralizado verticalmente e horizontalmente
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 40),
                  child: Column(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.center, // Conteúdo centralizado verticalmente
                    crossAxisAlignment: CrossAxisAlignment.center, // Conteúdo centralizado horizontalmente
                    children: [
                      Text(
                        'Nome: $fullName',
                        style: TextStyle(color: Colors.white, fontSize: 14),
                      ),
                      Text(
                        studentClass != null ? 'Classe: ${snapshot.data}' : 'Cargo: $occupation',
                        style: TextStyle(color: Colors.white, fontSize: 14),
                      ),
                      SizedBox(height: 4),
                    ],
                  ),
                ),
              );
            }
          },
        ),
      ),
    ),
      body: SingleChildScrollView(
        child: Container(
          padding: EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Recursos',
                    style: TextStyle(fontSize: 30,fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Align(
                    alignment: Alignment.centerLeft,
                    child: FutureBuilder<List<DashboardOption>>(
                      future: _getDashboardOptions1stRow(),
                      builder: (context, snapshot) {
                        if (snapshot.connectionState == ConnectionState.waiting) {
                          return CircularProgressIndicator();
                        } else if (snapshot.hasError) {
                          return Text('Error: ${snapshot.error}');
                        } else {
                          return SingleChildScrollView(
                            scrollDirection: Axis.horizontal,
                            child: Row(
                              children: snapshot.data!.map((option) {
                                return GestureDetector(
                                  onTap: () {
                                    NavigatorService.navigateToScreen(context, option.title);
                                  },
                                  child: Padding(
                                    padding: EdgeInsets.all(4.0),
                                    child: Card(
                                      elevation: 5,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(8),
                                        side: BorderSide(color: Colors.blue, width: 2),
                                      ),
                                      child: SizedBox(
                                        width: MediaQuery.of(context).size.width * 0.3,
                                        height: MediaQuery.of(context).size.height * 0.2,
                                        child: Column(
                                          mainAxisAlignment: MainAxisAlignment.center,
                                          children: [
                                            Icon(
                                              option.icon,
                                              size: 64,
                                            ),
                                            SizedBox(height: 16),
                                            Text(
                                              option.title,
                                              style: TextStyle(fontSize: 14),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                );
                              }).toList(),
                            ),
                          );
                        }
                      },
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (studentClass == null)
                    Text(
                      'Ver E Editar',
                      style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
                    ),
                  SizedBox(height: 8),
                  Align(
                    alignment: Alignment.centerLeft,
                    child: FutureBuilder<List<DashboardOption>>(
                      future: _getDashboardOptions2ndRow(),
                      builder: (context, snapshot) {
                        if (snapshot.connectionState == ConnectionState.waiting) {
                          return CircularProgressIndicator();
                        } else if (snapshot.hasError) {
                          return Text('Error: ${snapshot.error}');
                        } else {
                          return SingleChildScrollView(
                            scrollDirection: Axis.horizontal,
                            child: Row(
                              children: snapshot.data!.map((option) {
                                return GestureDetector(
                                  onTap: () {
                                    NavigatorService.navigateToScreen(context, option.title);
                                  },
                                  child: Padding(
                                    padding: EdgeInsets.all(4.0),
                                    child: Card(
                                      elevation: 5,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(8),
                                        side: BorderSide(color: Colors.blue, width: 2),
                                      ),
                                      child: SizedBox(
                                        width: MediaQuery.of(context).size.width * 0.3,
                                        height: MediaQuery.of(context).size.height * 0.2,
                                        child: Column(
                                          mainAxisAlignment: MainAxisAlignment.center,
                                          children: [
                                            Icon(
                                              option.icon,
                                              size: 64,
                                            ),
                                            SizedBox(height: 16),
                                            Text(
                                              option.title,
                                              style: TextStyle(fontSize: 14),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                );
                              }).toList(),
                            ),
                          );
                        }
                      },
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
Future<List<DashboardOption>> _getDashboardOptions1stRow() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  if (prefs.getString("isStudent") == "student" && prefs.getString("token") != '') {
    return [...StudentsDashboardItems().presetOptions, DashboardOption(icon: Icons.article, title: 'Feed')];
  }
  return StaffDashboardItems().presetOptions1stRow;
}

Future<List<DashboardOption>> _getDashboardOptions2ndRow() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  if (prefs.getString("isStudent") == "student" && prefs.getString("token") != '') {
    return [];
  }
  return [...StaffDashboardItems().presetOptions2ndRow, DashboardOption(icon: Icons.article, title: 'Meu Feed')];
}

  Future<bool> isStudent() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    if (prefs.getString("isStudent") == "student" && prefs.getString("token") != '') {
      return false;
    }
    return true;
  }

  Future<String> getClassName(String? idClass) async {
    try {
      ClassesStructure? classOfStudent = await ClassesAPIService().getClassById(idClass!);
      return "${classOfStudent!.className} - ${classOfStudent.letter}";
    } catch (e) {
      print(e);
      return "";
    }
  }
}